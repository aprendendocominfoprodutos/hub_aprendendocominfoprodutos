import catalogo from "../catalogo/edicoes-internacionais.json" with { type: "json" };

/** Apenas as landings publicadas devem competir nas buscas. */
const LANDINGS_PUBLICADAS = new Set(catalogo.produtos.flatMap(p =>
  p.edicoes.filter(e => e.status === "publicada")
    .map(e => e.rotaSimples || e.rota)
));

export function applyInternalRobots(response, pathname) {
  if (LANDINGS_PUBLICADAS.has(pathname)) return response;
  if (!response.ok || !/text\/html/i.test(response.headers.get("content-type") || "")) return response;
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, follow");
  return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}

/**
 * Hospedagem por país sem replicar o conteúdo ou modificar o portal brasileiro.
 * Os arquivos físicos continuam em public/<idioma-pais>/... e são servidos
 * nos subdomínios com caminhos legíveis no idioma comercial.
 */
const DOMAIN = "aprendendocominfoprodutos.com.br";
const LOCALES = Object.freeze({
  "en-us": "products",
  "es-mx": "productos",
  "es-es": "productos",
  "fr-fr": "produits",
  "it-it": "prodotti",
  "pt-pt": "produtos",
  "pt-br": "produtos"
});
const RESOURCE_PREFIXES = ["/assets/", "/src/", "/favicon"];

export function localizedRequestPath(hostname, pathname) {
  const host = hostname.toLowerCase();
  const suffix = "." + DOMAIN;
  if (!host.endsWith(suffix)) return { route: "main", path: pathname };
  const locale = host.slice(0, -suffix.length);
  if (!Object.hasOwn(LOCALES, locale)) return { route: "main", path: pathname };
  // Não permitir que um mercado acesse conteúdo de outro pelo mesmo subdomínio.
  const validSection = "/" + LOCALES[locale];
  if (pathname === "/") return { route: "locale", path: "/" + locale + "/" };
  if (pathname === validSection) return { route: "redirect", path: validSection + "/" };
  if (pathname.startsWith(validSection + "/")) return { route: "locale", path: "/" + locale + pathname };
  // Atalho de compatibilidade para os URLs antigos /en-us/products/... no próprio subdomínio.
  if (pathname.startsWith("/" + locale + validSection + "/")) return { route: "locale", path: pathname };
  if (RESOURCE_PREFIXES.some(prefix => pathname.startsWith(prefix))) return { route: "asset", path: pathname };
  return { route: "not-found", path: pathname };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const matched = localizedRequestPath(url.hostname, url.pathname);
    // Migração Menú Familiar: URLs anteriores redirecionam permanentemente, preservando a query string.
    if (matched.route === "main" && /^(www\.)?aprendendocominfoprodutos\.com\.br$/i.test(url.hostname)) {
      const oldRoutes = {"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/pt-br/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/brasil/pt-br/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/ing/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/eua/en-us/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/esp-mx/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/esp-es/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/espanha/es-es/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/fr/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/franca/fr-fr/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/it/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/italia/it-it/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/pt/":"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/portugal/pt-pt/"};
      const key=url.pathname.endsWith("/")?url.pathname:url.pathname+"/";
      if (Object.hasOwn(oldRoutes,key)) {
        url.pathname=oldRoutes[key];
        return Response.redirect(url.toString(),301);
      }
    }
    // A landing brasileira de Mitologia mudou para /pt-br/; links antigos continuam funcionando.
    if (matched.route === "main" &&
        (url.pathname === "/mitologia/grega/geral/" || url.pathname === "/mitologia/grega/geral")) {
      url.pathname = "/mitologia/grega/geral/pt-br/";
      return Response.redirect(url.toString(), 308);
    }
    if (matched.route === "not-found") {
      return new Response("Not found", {
        status: 404, headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
    if (matched.route === "redirect") {
      url.pathname = matched.path;
      return Response.redirect(url.toString(), 308);
    }
    if (matched.route === "locale") {
      url.pathname = matched.path;
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    // www e Workers.dev mantêm o mesmo comportamento do site antigo.
    const asset = await env.ASSETS.fetch(request);
    return applyInternalRobots(asset, url.pathname);
  }
};
