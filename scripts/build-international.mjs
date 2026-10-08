import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED_MARKER = "<!-- GERADO-PELO-CATALOGO-INTERNACIONAL; editar fonte, não este arquivo -->";
const LOCALE_RE = /^[a-z]{2}-[A-Z]{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROUTE_RE = /^\/[a-z0-9/-]+\/$/;
const SECTIONS = {
  "pt-BR": "produtos",
  "en-US": "products",
  "es-MX": "productos",
  "es-ES": "productos",
  "fr-FR": "produits",
  "it-IT": "prodotti",
  "pt-PT": "produtos"
};
const DICTIONARY = {
  "en-US": { status: "Future project", heading: "Coming soon", description: "This international edition is planned, but is not available yet.", back: "Explore the main website", country: "United States" },
  "es-MX": { status: "Proyecto futuro", heading: "Próximamente", description: "Esta edición para México está planificada, pero todavía no está disponible.", back: "Explorar el sitio principal", country: "México" },
  "es-ES": { status: "Proyecto futuro", heading: "Próximamente", description: "Esta edición para España está prevista, pero todavía no está disponible.", back: "Explorar el sitio principal", country: "España" },
  "fr-FR": { status: "Projet à venir", heading: "Bientôt disponible", description: "Cette édition pour la France est prévue, mais elle n'est pas encore disponible.", back: "Explorer le site principal", country: "France" },
  "it-IT": { status: "Progetto futuro", heading: "Prossimamente", description: "Questa edizione per l'Italia è in programma, ma non è ancora disponibile.", back: "Esplora il sito principale", country: "Italia" },
  "pt-PT": { status: "Projeto futuro", heading: "Em preparação", description: "Esta edição para Portugal está planeada, mas ainda não está disponível.", back: "Explorar o site principal", country: "Portugal" },
  "pt-BR": { status: "Edição brasileira", heading: "Aceder à edição publicada", description: "A edição brasileira continua disponível no endereço original.", back: "Acessar a página brasileira", country: "Brasil" }
};

function ensure(ok, message) {
  if (!ok) throw new Error("Catálogo internacional: " + message);
}
async function exists(file) {
  try { await access(file); return true; }
  catch { return false; }
}
function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function validateRoute(route, msg) {
  ensure(typeof route === "string" && ROUTE_RE.test(route) &&
    !route.includes("//") && !route.includes(".."), msg + ": " + route);
}
function localizedRoute(route, edition) {
  const prefix = "/" + edition.codigo.toLowerCase() + "/" + SECTIONS[edition.codigo] + "/";
  ensure(route.startsWith(prefix) && route !== prefix, "rota fora do padrão internacional: " + route);
}
function destPath(root, route) {
  validateRoute(route, "caminho inválido");
  return join(root, "public", route, "index.html");
}

/** Checa se o caminho já tem arquivo manual, para jamais sobrescrever um ativo de campanha. */
async function checkSafeToGenerate(target) {
  if (await exists(target)) {
    const existing = await readFile(target, "utf8");
    ensure(existing.startsWith(GENERATED_MARKER), "recusado sobrescrever arquivo não gerado: " + target);
  }
}
async function saveGenerated(target, html, dryRun) {
  await checkSafeToGenerate(target);
  if (!dryRun) {
    await mkdir(dirname(target), {recursive: true});
    await writeFile(target, GENERATED_MARKER + "\n" + html + "\n", "utf8");
  }
}

/** Só edições vendáveis podem entrar no manifesto público e no seletor de idiomas. */
/** Endereço canônico de venda: edição local no subdomínio; Brasil na URL original. */
export function commercialURL(catalog, edition) {
  if (edition.codigo === "pt-BR") return catalog.dominioCanonico + edition.rota;
  if (edition.rotaSimples) return catalog.dominioCanonico + edition.rotaSimples;
  const label = edition.codigo.toLowerCase();
  const prefix = "/" + label + "/";
  ensure(edition.rota.startsWith(prefix), "rota incompatível com subdomínio: " + edition.rota);
  const host = catalog.dominioCanonico.replace("https://www.", "https://" + label + ".");
  return host + edition.rota.slice(label.length + 1);
}

export function publishedManifest(catalog) {
  return {
    versao: catalog.versao,
    produtos: catalog.produtos
      .filter(p => p.status === "existente")
      .map(p => ({
        id: p.id, slug: p.slug, nome: p.nome,
        edicoes: p.edicoes.filter(e => e.status === "publicada")
          .map(e => ({
            codigo: e.codigo, mercado: e.mercado, moeda: e.moeda,
            url: commercialURL(catalog, e),
            rotaPadronizada: catalog.dominioCanonico + (e.rotaPublica || e.rota)
          }))
      }))
      .filter(p => p.edicoes.length > 0)
  };
}

/** Edições brasileiras atuais mantêm o endereço canônico; a rota curta é um acesso alternativo. */
function aliasPage(product, edition, catalog) {
  const url = catalog.dominioCanonico + edition.rota;
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,follow">' +
    '<meta http-equiv="refresh" content="0;url=' + escapeHtml(url) + '">' +
    '<link rel="canonical" href="' + escapeHtml(url) + '">' +
    '<title>' + escapeHtml(product.nome) + ' | Edição brasileira</title>' +
    '</head><body style="font:16px system-ui,sans-serif;background:#07131f;color:#f3ebdd;padding:12vh 8%;text-align:center">' +
    '<h1>' + escapeHtml(product.nome) + '</h1>' +
    '<p>Você está sendo direcionado à edição brasileira já publicada.</p>' +
    '<a style="color:#e2bf69" href="' + escapeHtml(url) + '">Abrir edição brasileira</a>' +
    '<script>location.replace(' + JSON.stringify(url).replace(/</g,"\\u003c") + ')</script>' +
    '</body></html>';
}

/** Página informativa real em domínio próprio, sem anunciar venda nem competir no SEO. */
export function futurePage(product, edition, catalog) {
  const copy = DICTIONARY[edition.codigo];
  ensure(copy, "idioma de placeholder indisponível: " + edition.codigo);
  const title = edition.nomeLocalizado || product.nome;
  const fullTitle = title + " | " + copy.status;
  return '<!doctype html><html lang="' + escapeHtml(edition.codigo) + '"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow,noarchive">' +
    '<meta name="theme-color" content="#071521">' +
    '<meta name="description" content="' + escapeHtml(copy.description) + '">' +
    '<title>' + escapeHtml(fullTitle) + '</title>' +
    '<style>' +
    ':root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;flex-direction:column;' +
    'background:radial-gradient(circle at 70% 12%,#193b43 0,#071521 48%,#050f18 100%);' +
    'color:#f3eee3;font-family:system-ui,-apple-system,Segoe UI,sans-serif}' +
    'header,footer{padding:26px max(20px,calc((100vw - 940px)/2));border-bottom:1px solid #b9964d44}' +
    'header a{color:#f3d595;font-weight:750;text-decoration:none;letter-spacing:.025em}' +
    'main{flex:1;width:min(100%,940px);margin:auto;padding:64px 22px 84px;display:grid;align-content:center}' +
    '.card{max-width:710px;padding:clamp(28px,5vw,57px);border:1px solid #d6b36e77;border-radius:24px;' +
    'background:linear-gradient(140deg,#153441bd,#0b2232dd);box-shadow:0 25px 70px #0005}' +
    '.eyebrow{color:#e3bc6b;text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:800}' +
    'h1{font-family:Georgia,serif;font-weight:600;font-size:clamp(40px,6vw,65px);line-height:1.08;margin:20px 0 16px}' +
    'h2{font-family:Georgia,serif;color:#f1d69d;font-size:clamp(23px,3.5vw,32px);margin:0 0 18px}' +
    'p{font-size:16px;color:#c9d3d1;line-height:1.8;margin:0 0 28px}' +
    '.button{display:inline-block;color:#13212b;background:#e5c57f;border-radius:99px;padding:14px 22px;' +
    'font-size:13px;font-weight:800;text-decoration:none;min-height:44px}' +
    'footer{border-top:1px solid #b9964d44;border-bottom:0;color:#a5b5b5;font-size:12px}' +
    '@media(max-width:600px){main{padding:35px 16px 60px}.card{padding:26px}header,footer{padding:20px}}' +
    '</style></head><body>' +
    '<header><a href="/">Aprendendo com Infoprodutos</a></header>' +
    '<main><section class="card"><div class="eyebrow">' + escapeHtml(copy.status) + ' · ' +
    escapeHtml(copy.country) + '</div>' +
    '<h1>' + escapeHtml(copy.heading) + '</h1>' +
    '<h2>' + escapeHtml(title) + '</h2>' +
    '<p>' + escapeHtml(copy.description) + '</p>' +
    '<a class="button" href="' + escapeHtml(catalog.dominioCanonico) + '">' + escapeHtml(copy.back) + ' →</a>' +
    '</section></main><footer>Aprendendo com Infoprodutos · ' + escapeHtml(copy.status) + '</footer></body></html>';
}
function publishedMetadata(product, edition, catalog) {
  const all = product.edicoes.filter(e => e.status === "publicada");
  return ['<link rel="canonical" href="' + commercialURL(catalog, edition) + '">']
    .concat(all.map(e => '<link rel="alternate" hreflang="' + e.codigo +
      '" href="' + commercialURL(catalog, e) + '">')).join("\n");
}
function languageSelector(product, edition, catalog) {
  const all = product.edicoes.filter(e => e.status === "publicada");
  if (all.length < 2) return "";
  return '<nav aria-label="Idiomas disponíveis" style="max-width:1080px;margin:30px auto;padding:16px;text-align:center">' +
    all.map(e => '<a style="display:inline-block;padding:10px" lang="' + e.codigo +
      '" hreflang="' + e.codigo + '" href="' + commercialURL(catalog, e) + '"' +
      (e.codigo === edition.codigo ? ' aria-current="page"' : "") + '>' + e.codigo + '</a>').join("") +
    '</nav>';
}

export async function validateCatalog(catalog, root = ROOT) {
  ensure(catalog && catalog.versao === 2, "versão não suportada");
  ensure(/^https:\/\/[a-zA-Z0-9.-]+$/.test(catalog.dominioCanonico), "domínio HTTPS inválido");
  ensure(Array.isArray(catalog.produtos), "produtos ausentes");
  const ids = new Set(), slugs = new Set(), routes = new Set(), ready = [];
  for (const product of catalog.produtos) {
    ensure(/^PRO-\d{4}$/.test(product.id) && !ids.has(product.id), "ID inválido ou duplicado: " + product.id);
    ids.add(product.id);
    ensure(SLUG_RE.test(product.slug) && !slugs.has(product.slug), "slug inválido ou duplicado: " + product.slug);
    slugs.add(product.slug);
    ensure(["existente","ideia"].includes(product.status), "status de produto inválido");
    ensure(typeof product.nome === "string" && product.nome.trim(), "produto sem nome");
    ensure(Array.isArray(product.classificacaoPrincipal) && product.classificacaoPrincipal.length,
      "classificação principal ausente: " + product.id);
    ensure(Array.isArray(product.edicoes), "edições ausentes: " + product.id);
    const locales = new Set();
    for (const edition of product.edicoes) {
      ensure(LOCALE_RE.test(edition.codigo) && !!SECTIONS[edition.codigo], "locale inválido: " + edition.codigo);
      ensure(!locales.has(edition.codigo), "locale duplicado: " + edition.codigo);
      locales.add(edition.codigo);
      ensure(["planejada","publicada"].includes(edition.status), "status de edição inválido");
      ensure(typeof edition.mercado === "string" && edition.mercado.trim(), "mercado obrigatório");
      ensure(/^[A-Z]{3}$/.test(edition.moeda), "moeda inválida");
      validateRoute(edition.rota, "rota inválida");
      ensure(!routes.has(edition.rota), "rota duplicada: " + edition.rota);
      routes.add(edition.rota);
      if (edition.origemExistente) {
        ensure(edition.status === "publicada" && edition.codigo === "pt-BR", "origem brasileira inválida");
        ensure(!edition.htmlLocalizado, "não sobrescrever landing original");
        ensure(await exists(destPath(root, edition.rota)), "página original inexistente: " + edition.rota);
        validateRoute(edition.rotaPublica, "rota padronizada brasileira ausente");
        localizedRoute(edition.rotaPublica, edition);
        ensure(!routes.has(edition.rotaPublica), "rota brasileira duplicada: " + edition.rotaPublica);
        routes.add(edition.rotaPublica);
        await checkSafeToGenerate(destPath(root, edition.rotaPublica));
      } else {
        localizedRoute(edition.rota, edition);
        ensure(typeof edition.nomeLocalizado === "string" && edition.nomeLocalizado.trim(),
          "nome da edição localizado ausente: " + edition.codigo);
        await checkSafeToGenerate(destPath(root, edition.rota));
        if (edition.status === "publicada") {
          ensure(product.status === "existente", "produto ainda em ideia");
          ensure(edition.produtoAdaptado === true, "infoproduto não adaptado: " + edition.codigo);
          ensure(edition.checkoutVerificado === true, "checkout ainda não verificado: " + edition.codigo);
          ensure(typeof edition.checkoutUrl === "string" && /^https:\/\/\S+$/.test(edition.checkoutUrl),
            "checkout HTTPS obrigatório: " + edition.codigo);
          const source = "edicoes/" + product.slug + "/" + edition.codigo + "/index.html";
          ensure(edition.htmlLocalizado === source, "HTML localizado obrigatório: " + source);
          ensure(await exists(join(root, source)), "HTML localizado não encontrado: " + source);
          const html = await readFile(join(root, source), "utf8");
          ensure(html.includes('lang="' + edition.codigo + '"') ||
            html.includes("lang='" + edition.codigo + "'"), "idioma HTML inválido: " + edition.codigo);
          ensure(/<title>[^<]+<\/title>/i.test(html) && /<\/head>/i.test(html) && /<\/body>/i.test(html),
            "landing localizada incompleta: " + source);
          ready.push({product,edition,html});
        }
      }
    }
  }
  return ready;
}

export async function prepareInternational({root = ROOT, dryRun = false} = {}) {
  const catalog = JSON.parse(await readFile(join(root,"catalogo","edicoes-internacionais.json"),"utf8"));
  const ready = await validateCatalog(catalog,root);
  const manifest = publishedManifest(catalog);
  const generated = [], placeholders = [], aliases = [];
  for (const product of catalog.produtos) {
    for (const edition of product.edicoes) {
      if (edition.origemExistente) {
        const alias = destPath(root,edition.rotaPublica);
        await saveGenerated(alias,aliasPage(product,edition,catalog),dryRun);
        aliases.push(edition.rotaPublica);
      } else if (edition.status === "planejada") {
        await saveGenerated(destPath(root,edition.rota),futurePage(product,edition,catalog),dryRun);
        placeholders.push(edition.rota);
      }
    }
  }
  for (const {product,edition,html} of ready) {
    const output = html
      .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi,"")
      .replace(/<\/head>/i,publishedMetadata(product,edition,catalog)+"\n</head>")
      .replace(/<\/body>/i,languageSelector(product,edition,catalog)+"\n</body>");
    await saveGenerated(destPath(root,edition.rota),output,dryRun);
    generated.push(edition.rota);
  }
  if (!dryRun) {
    await writeFile(join(root,"public","catalogo-edicoes.json"),
      JSON.stringify(manifest,null,2)+"\n","utf8");
  }
  return {
    products: catalog.produtos.length,
    published: manifest.produtos.reduce((n,p)=>n+p.edicoes.length,0),
    planned: catalog.produtos.reduce((n,p)=>n+p.edicoes.filter(e=>e.status==="planejada").length,0),
    generated, placeholders, aliases
  };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareInternational().then(info => console.log("Edições internacionais:",JSON.stringify(info)))
    .catch(error => { console.error(error.message); process.exitCode=1; });
}
