import { readFile, access, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MARKER = "<!-- GERADO-PORTAL-REGIONAL: EDITE O CATALOGO, NAO ESTE HTML -->";
export const REGIONS = Object.freeze({
  "pt-BR": { host: "pt-br", title: "Brasil", heading: "Produtos digitais para o Brasil", caption: "Acesse os materiais disponíveis em português brasileiro.", status: "Disponível", future: "Projeto futuro", global: "Voltar ao portal principal" },
  "en-US": { host: "en-us", title: "United States", heading: "Digital guides for the United States", caption: "Explore our current and upcoming localized editions.", status: "Available", future: "Future project", global: "Visit the main website" },
  "es-MX": { host: "es-mx", title: "México", heading: "Guías digitales para México", caption: "Conoce nuestros proyectos y futuras ediciones para México.", status: "Disponible", future: "Proyecto futuro", global: "Visitar el sitio principal" },
  "es-ES": { host: "es-es", title: "España", heading: "Guías digitales para España", caption: "Descubre nuestros proyectos y próximas ediciones.", status: "Disponible", future: "Proyecto futuro", global: "Visitar el sitio principal" },
  "fr-FR": { host: "fr-fr", title: "France", heading: "Guides numériques pour la France", caption: "Découvrez les éditions prévues et les projets à venir.", status: "Disponible", future: "Projet à venir", global: "Visiter le site principal" },
  "it-IT": { host: "it-it", title: "Italia", heading: "Guide digitali per l'Italia", caption: "Scopri le nostre prossime edizioni e i progetti futuri.", status: "Disponibile", future: "Progetto futuro", global: "Visita il sito principale" },
  "pt-PT": { host: "pt-pt", title: "Portugal", heading: "Guias digitais para Portugal", caption: "Descubra os projetos e as próximas edições.", status: "Disponível", future: "Projeto futuro", global: "Visitar o site principal" }
});
function escapeHTML(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function pathForEdition(edition) {
  const route = edition.rotaPublica || edition.rota;
  const prefix = "/" + edition.codigo.toLowerCase();
  if (!route.startsWith(prefix + "/")) throw new Error("Endereço fora do locale: " + route);
  return route.slice(prefix.length) || "/";
}
export function renderLocaleHome(catalog, locale) {
  const info = REGIONS[locale];
  if (!info) throw new Error("Locale não configurado: " + locale);
  const products = catalog.produtos
    .filter(p=>p.status==="existente")
    .flatMap(p=>p.edicoes.filter(e=>e.codigo===locale)
      .map(e=>({name:e.nomeLocalizado || p.nome,route:pathForEdition(e),
        available:e.status==="publicada"})));
  const cards = products.map(p=>'<a class="card" href="'+escapeHTML(p.route)+'"><span class="status">'+
    escapeHTML(p.available ? info.status : info.future)+'</span><h2>'+escapeHTML(p.name)+
    '</h2><span class="visit">↗</span></a>').join("\n");
  return '<!doctype html><html lang="'+escapeHTML(locale)+'"><head>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<meta name="robots" content="noindex,follow">'+
    '<meta name="theme-color" content="#081725"><title>'+escapeHTML(info.heading)+
    ' | Aprendendo com Infoprodutos</title>'+
    '<style>:root{color-scheme:dark}*{box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;margin:0;background:radial-gradient(circle at 50% 2%,#19394b,#07131e 50%);color:#f6eedc}'+
    'header{max-width:1120px;margin:auto;padding:32px 24px}header a{color:#e5c17a;text-decoration:none;font-weight:700}main{width:min(100%,1000px);margin:auto;padding:48px 24px 90px}'+
    'small{color:#d8b56c;text-transform:uppercase;letter-spacing:.14em;font-size:12px}h1{font:600 clamp(36px,6vw,66px)/1.06 Georgia,serif;max-width:760px;margin:16px 0 19px}'+
    'p{color:#bdc9c8;font-size:16px;line-height:1.8;margin:0 0 36px}'+
    '.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));gap:17px}'+
    '.card{min-height:180px;display:flex;flex-direction:column;padding:28px;text-decoration:none;color:#f2e6ca;background:#102b3c;border:1px solid #e5c17a55;border-radius:18px}'+
    '.card:hover{border-color:#e5c17a}.status{color:#e9c77d;letter-spacing:.1em;font-size:12px;text-transform:uppercase}h2{font:600 28px/1.2 Georgia,serif;margin:18px 0 10px}.visit{margin-top:auto;align-self:flex-end;color:#e7c377}'+
    '.mainlink{display:inline-block;color:#e7c377;margin-top:36px;font-size:13px}footer{border-top:1px solid #d8b56c33;padding:28px;text-align:center;color:#a7b9b9;font-size:12px}'+
    '</style></head><body><header><a href="'+escapeHTML(catalog.dominioCanonico)+'">Aprendendo com Infoprodutos</a></header>'+
    '<main><small>'+escapeHTML(info.title)+'</small><h1>'+escapeHTML(info.heading)+
    '</h1><p>'+escapeHTML(info.caption)+'</p><div class="cards">'+cards+
    '</div><a class="mainlink" href="'+escapeHTML(catalog.dominioCanonico)+'">'+escapeHTML(info.global)+' →</a></main>'+
    '<footer>Aprendendo com Infoprodutos</footer></body></html>';
}
export async function buildLocaleHomes({root=ROOT,dryRun=false}={}) {
  const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
  const routes=[];
  for (const locale of Object.keys(REGIONS)) {
    const route="/"+locale.toLowerCase()+"/";
    const target=join(root,"public",route,"index.html");
    try {
      const old=await readFile(target,"utf8");
      if(!old.startsWith(MARKER)) throw new Error("Arquivo regional manual protegido: "+target);
    } catch (error) { if(error.code!=="ENOENT") throw error; }
    if(!dryRun){await mkdir(dirname(target),{recursive:true});await writeFile(target,MARKER+"\n"+renderLocaleHome(catalog,locale),"utf8");}
    routes.push(route);
  }
  return {homes:routes};
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  buildLocaleHomes().then(r=>console.log("Portais regionais:",JSON.stringify(r)))
    .catch(error=>{console.error(error);process.exitCode=1});
}
