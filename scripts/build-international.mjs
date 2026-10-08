import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALE_RE = /^[a-z]{2}-[A-Z]{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROUTE_RE = /^\/[a-z0-9/-]+\/$/;
function ensure(ok, message) {
  if (!ok) throw new Error("Catálogo internacional: " + message);
}
async function exists(file) {
  try { await access(file); return true; }
  catch { return false; }
}

/** Valida o cadastro e bloqueia a publicação incompleta de novas edições. */
export async function validateCatalog(catalog, root = ROOT) {
  ensure(catalog && catalog.versao === 1, "versão não suportada");
  ensure(/^https:\/\/[a-zA-Z0-9.-]+$/.test(catalog.dominioCanonico), "domínio HTTPS inválido");
  ensure(Array.isArray(catalog.produtos), "produtos ausentes");
  const ids = new Set(), slugs = new Set(), routes = new Set();
  const ready = [];

  for (const product of catalog.produtos) {
    ensure(/^PRO-\d{4}$/.test(product.id), "ID de produto inválido");
    ensure(!ids.has(product.id), "produto duplicado: " + product.id);
    ids.add(product.id);
    ensure(SLUG_RE.test(product.slug), "slug inválido: " + product.slug);
    ensure(!slugs.has(product.slug), "slug duplicado: " + product.slug);
    slugs.add(product.slug);
    ensure(["existente", "ideia"].includes(product.status), "status de produto inválido");
    ensure(typeof product.nome === "string" && product.nome.trim(), "produto sem nome");
    ensure(Array.isArray(product.classificacaoPrincipal) && product.classificacaoPrincipal.length > 0,
      "categoria principal obrigatória: " + product.id);
    ensure(Array.isArray(product.edicoes), "edições ausentes em: " + product.id);
    const locales = new Set();

    for (const edition of product.edicoes) {
      ensure(LOCALE_RE.test(edition.codigo), "locale inválido: " + edition.codigo);
      ensure(!locales.has(edition.codigo), "locale duplicado: " + edition.codigo);
      locales.add(edition.codigo);
      ensure(["planejada", "publicada"].includes(edition.status), "status de edição inválido");
      ensure(typeof edition.mercado === "string" && edition.mercado.trim(), "mercado obrigatório");
      ensure(/^[A-Z]{3}$/.test(edition.moeda), "moeda inválida");
      ensure(typeof edition.rota === "string" && ROUTE_RE.test(edition.rota) &&
        !edition.rota.includes("//") && !edition.rota.includes(".."), "rota inválida");
      ensure(!routes.has(edition.rota), "rota duplicada: " + edition.rota);
      routes.add(edition.rota);
      if (edition.origemExistente) {
        ensure(edition.status === "publicada" && edition.codigo === "pt-BR",
          "origem existente deve ser a edição brasileira publicada");
        ensure(!edition.htmlLocalizado, "página já existente não pode ser sobrescrita");
        ensure(await exists(join(root, "public", edition.rota, "index.html")),
          "landing original não encontrada: " + edition.rota);
      } else {
        ensure(edition.rota === "/produtos/" + product.slug + "/" + edition.codigo.toLowerCase() + "/",
          "rota internacional fora do padrão: " + edition.rota);
        if (edition.status === "publicada") {
          ensure(product.status === "existente", "produto ainda está em ideia");
          ensure(edition.produtoAdaptado === true, "infoproduto não adaptado: " + edition.codigo);
          ensure(edition.checkoutVerificado === true, "checkout ainda não verificado: " + edition.codigo);
          ensure(typeof edition.checkoutUrl === "string" && /^https:\/\/\S+$/.test(edition.checkoutUrl),
            "checkout HTTPS obrigatório: " + edition.codigo);
          const sourcePath = "edicoes/" + product.slug + "/" + edition.codigo + "/index.html";
          ensure(edition.htmlLocalizado === sourcePath, "HTML localizado obrigatório: " + sourcePath);
          ensure(await exists(join(root, sourcePath)), "HTML localizado não encontrado: " + sourcePath);
          const html = await readFile(join(root, sourcePath), "utf8");
          ensure(html.includes('lang="' + edition.codigo + '"') ||
            html.includes("lang='" + edition.codigo + "'"), "idioma HTML não corresponde: " + edition.codigo);
          ensure(/<title>[^<]+<\/title>/i.test(html) && /<\/head>/i.test(html) &&
            /<\/body>/i.test(html), "landing localizada incompleta: " + sourcePath);
          ensure(!await exists(join(root, "public", edition.rota, "index.html")),
            "rota já ocupada: " + edition.rota);
          ready.push({ product, edition, html });
        }
      }
    }
  }
  return ready;
}

/** Só edições publicadas aparecem no catálogo acessível pelo site. */
export function publishedManifest(catalog) {
  return {
    versao: catalog.versao,
    produtos: catalog.produtos
      .filter(p => p.status === "existente")
      .map(p => ({
        id: p.id, slug: p.slug, nome: p.nome,
        edicoes: p.edicoes.filter(e => e.status === "publicada").map(e => ({
          codigo: e.codigo, mercado: e.mercado, moeda: e.moeda,
          url: catalog.dominioCanonico + e.rota
        }))
      }))
      .filter(p => p.edicoes.length > 0)
  };
}
function metadata(product, edition, catalog) {
  const all = product.edicoes.filter(e => e.status === "publicada");
  return ['<link rel="canonical" href="' + catalog.dominioCanonico + edition.rota + '">']
    .concat(all.map(e => '<link rel="alternate" hreflang="' + e.codigo +
      '" href="' + catalog.dominioCanonico + e.rota + '">')).join("\n");
}
function languageSelector(product, edition, catalog) {
  const all = product.edicoes.filter(e => e.status === "publicada");
  if (all.length < 2) return "";
  return '<nav aria-label="Idiomas disponíveis" style="max-width:1080px;margin:30px auto;padding:16px;text-align:center">' +
    all.map(e => '<a style="display:inline-block;padding:10px" lang="' + e.codigo +
      '" hreflang="' + e.codigo + '" href="' + catalog.dominioCanonico + e.rota + '"' +
      (e.codigo === edition.codigo ? ' aria-current="page"' : "") + '>' + e.codigo + '</a>').join("") +
    '</nav>';
}

/** Constrói páginas só quando o conteúdo e o checkout foram aprovados. */
export async function prepareInternational({root = ROOT, dryRun = false} = {}) {
  const catalog = JSON.parse(await readFile(join(root, "catalogo", "edicoes-internacionais.json"), "utf8"));
  const ready = await validateCatalog(catalog, root);
  const manifest = publishedManifest(catalog);
  const generated = [];
  for (const {product, edition, html} of ready) {
    const target = join(root, "public", edition.rota, "index.html");
    const output = html
      .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, "")
      .replace(/<\/head>/i, metadata(product, edition, catalog) + "\n</head>")
      .replace(/<\/body>/i, languageSelector(product, edition, catalog) + "\n</body>");
    if (!dryRun) {
      await mkdir(dirname(target), {recursive:true});
      await writeFile(target, output, "utf8");
    }
    generated.push(edition.rota);
  }
  if (!dryRun) {
    await writeFile(join(root, "public", "catalogo-edicoes.json"),
      JSON.stringify(manifest, null, 2) + "\n", "utf8");
  }
  return {
    products: catalog.produtos.length,
    published: manifest.produtos.reduce((n,p) => n + p.edicoes.length, 0),
    planned: catalog.produtos.reduce((n,p) => n + p.edicoes.filter(e => e.status === "planejada").length, 0),
    generated
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareInternational().then(info => console.log("Edições internacionais:", JSON.stringify(info)))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
