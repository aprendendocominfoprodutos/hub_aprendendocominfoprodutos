import {readFile,writeFile,mkdir,access} from "node:fs/promises";
import {dirname,join,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),"..");
export const MARKER="<!-- GERADO-MERCADOS-TIRZEPATIDA: editar catalogo/mercados-tirzepatida.json ou o gerador -->";
const BASE="/fitness-saude/alimentacao/receitas/mounjaro-tirzepatida/";
const PATTERN=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LANG=/^[a-z]{2}-[a-z]{2}$/;
const need=(value,msg)=>{if(!value)throw Error("Mercados de tirzepatida: "+msg);};
const escape=(x)=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const exists=async path=>{try{await access(path);return true;}catch{return false;}};
const asLang=(code)=>code.replace(/-([a-z]{2})$/,(_,country)=>"-"+country.toUpperCase());
const pathToFile=(root,path)=>join(root,"public",path,"index.html");
const localeCopy=(code)=>{
  const k=code.split("-")[0];
  const translations={
    pt:["Projeto futuro","Edição em preparação","Esta edição ainda não está disponível. A adaptação regional, a revisão do conteúdo e o checkout não foram concluídos."],
    en:["Future project","Edition in preparation","This edition is not available yet. Local adaptation, editorial review and checkout have not been completed."],
    es:["Proyecto futuro","Edición en preparación","Esta edición todavía no está disponible. Faltan la adaptación local, la revisión editorial y la configuración de compra."],
    fr:["Projet à venir","Édition en préparation","Cette édition n'est pas encore disponible. L'adaptation locale, la révision et le paiement restent à finaliser."],
    it:["Progetto futuro","Edizione in preparazione","Questa edizione non è ancora disponibile. Adattamento locale, revisione e pagamento non sono ancora pronti."],
    de:["Zukünftiges Projekt","Ausgabe in Vorbereitung","Diese Ausgabe ist noch nicht verfügbar. Anpassung, redaktionelle Prüfung und Kaufabwicklung stehen noch aus."],
    ar:["مشروع مستقبلي","النسخة قيد الإعداد","هذه النسخة غير متاحة بعد. لم تكتمل المراجعة التحريرية والتكييف المحلي وإعداد الدفع."]
  };
  return translations[k]||translations.pt;
};
export function validateMarkets(data){
  need(data&&data.versao===1&&data.produtoId==="PRO-0005","identificação incorreta");
  need(data.baseRota===BASE,"baseRota não pode mudar sem migração explícita");
  need(Array.isArray(data.regioes)&&data.regioes.length===5,"devem existir cinco regiões");
  const regions=new Set(),countries=new Set(),routes=new Set([BASE]);
  let total=0;
  for(const r of data.regioes){
    need(PATTERN.test(r.slug)&&!regions.has(r.slug),"região inválida ou duplicada");
    need(r.nome&&r.icone&&Array.isArray(r.paises)&&r.paises.length,"região sem países");
    regions.add(r.slug);
    const rp=BASE+r.slug+"/";need(!routes.has(rp),"rota repetida "+rp);routes.add(rp);
    for(const c of r.paises){
      need(PATTERN.test(c.slug)&&c.nome&&c.icone,"país inválido");
      const key=r.slug+"/"+c.slug;need(!countries.has(key),"país duplicado "+key);countries.add(key);
      need(Array.isArray(c.idiomas)&&c.idiomas.length,"idiomas ausentes: "+key);
      const base=r.slug==="brasil"?rp:rp+c.slug+"/";
      if(r.slug!=="brasil"){need(!routes.has(base),"rota duplicada "+base);routes.add(base);}
      const locales=new Set();
      for(const locale of c.idiomas){
        need(LANG.test(locale)&&!locales.has(locale),"idioma inválido ou duplicado "+key+"/"+locale);
        locales.add(locale);
        const p=base+locale+"/";need(!routes.has(p),"rota duplicada "+p);routes.add(p);total++;
      }
    }
  }
  need(regions.has("brasil")&&regions.has("latam")&&regions.has("america-do-norte")&&regions.has("europa")&&regions.has("paises-arabes"),"regiões essenciais ausentes");
  need(data.regioes.find(r=>r.slug==="brasil").paises.length===1,"Brasil deve ser exclusivo");
  return {totalRoutes:routes.size,totalEditions:total,regions:regions.size,countries:countries.size};
}
function layout({title,description,body,crumb="",lang="pt-BR",dir="",localePage=false}){
  return '<!doctype html><html lang="'+escape(lang)+'"'+(dir?' dir="'+dir+'"':"")+'><head><meta charset="utf-8">'+
  '<meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="robots" content="'+(localePage?'noindex,nofollow,noarchive':'noindex,follow')+'">'+
  '<meta name="theme-color" content="#10392c">'+
  '<meta name="description" content="'+escape(description)+'">'+
  '<title>'+escape(title)+' | Aprendendo com Infoprodutos</title>'+
  '<link rel="stylesheet" href="/src/tirzepatida-mercados.css">'+
  '</head><body class="tl-market"><header class="tl-header">'+
  '<a class="tl-brand" href="/">APRENDENDO COM INFOPRODUTOS</a>'+
  '<a href="'+BASE+'">Receitas Leves · Regiões</a></header>'+
  '<main class="tl-main">'+(crumb?'<nav class="tl-crumb" aria-label="Navegação interna">'+crumb+'</nav>':"")+
  body+'</main><footer class="tl-footer">Receitas Leves · Estrutura de edições em preparação · Nenhum checkout disponível</footer></body></html>';
}
function card({href,icon,label,meta,detail}){
  return '<a class="tl-card" href="'+escape(href)+'"><span class="tl-flag" aria-hidden="true">'+escape(icon)+'</span>'+
  '<span class="tl-status">PROJETO FUTURO</span><h2>'+escape(label)+'</h2>'+
  '<p>'+escape(detail)+'</p><span class="tl-action">'+escape(meta)+' →</span></a>';
}
export function regionPage(r){
  if(r.slug==="brasil")return countryPage(r,r.paises[0]);
  const cards=r.paises.map(p=>card({href:BASE+r.slug+"/"+p.slug+"/",icon:p.icone,label:p.nome,meta:"Ver idiomas",detail:"Selecione a edição por idioma deste país."})).join("");
  return layout({title:r.nome+" | Receitas Leves",description:"Seleção de países e idiomas para edições planejadas de Receitas Leves.",
    crumb:'<a href="'+BASE+'">Receitas Leves</a> › '+escape(r.nome),
    body:'<section class="tl-hero"><span class="tl-eyebrow">ORGANIZAÇÃO INTERNACIONAL · '+escape(r.nome.toUpperCase())+'</span>'+
    '<h1>Escolha o seu <em>país.</em></h1><p>As edições estão organizadas por mercado e idioma. Nenhuma versão está disponível para compra.</p></section>'+
    '<section class="tl-grid" aria-label="Países da região">'+cards+'</section>'});
}
export function countryPage(r,c){
  const base=BASE+r.slug+"/"+(r.slug==="brasil"?"":c.slug+"/");
  const cards=c.idiomas.map(lang=>card({href:base+lang+"/",icon:c.icone,label:lang.toUpperCase(),meta:"Ver edição",detail:"Edição prevista para "+c.nome+". Conteúdo e checkout ainda não disponíveis."})).join("");
  return layout({title:c.nome+" | Idiomas | Receitas Leves",description:"Escolha o idioma da edição planejada de Receitas Leves para "+c.nome+".",
    crumb:'<a href="'+BASE+'">Receitas Leves</a> › <a href="'+BASE+r.slug+'/">'+escape(r.nome)+'</a> › '+escape(c.nome),
    body:'<section class="tl-hero"><span class="tl-eyebrow">PAÍS · '+escape(c.nome.toUpperCase())+'</span>'+
    '<h1>Escolha o <em>idioma.</em></h1><p>Cada versão precisará de adaptação cultural, revisão editorial e checkout próprio antes do lançamento.</p></section>'+
    '<section class="tl-grid" aria-label="Idiomas previstos">'+cards+'</section>'});
}
export function editionPage(r,c,lang){
  const [status,heading,desc]=localeCopy(lang),rtl=lang.startsWith("ar-"),base=BASE+r.slug+"/"+(r.slug==="brasil"?"":c.slug+"/");
  const body='<section class="tl-hero tl-future"><span class="tl-eyebrow">'+escape(status)+' · '+escape(c.nome)+'</span>'+
  '<h1>'+escape(heading)+'</h1><h2>Receitas Leves · '+escape(lang.toUpperCase())+'</h2>'+
  '<p>'+escape(desc)+'</p><p class="tl-note">Este é apenas um endereço reservado para um possível infoproduto. Não oferece orientação médica ou alimentar individualizada.</p>'+
  '<a class="tl-return" href="'+base+'">Voltar aos idiomas</a></section>';
  return layout({title:"Receitas Leves "+lang.toUpperCase(),description:desc,lang:asLang(lang),dir:rtl?"rtl":"",localePage:true,body});
}
export async function buildTirzepatidaMarkets({root=ROOT,dryRun=false}={}){
  const data=JSON.parse(await readFile(join(root,"catalogo/mercados-tirzepatida.json"),"utf8"));
  const info=validateMarkets(data);
  const created=[],unique=new Set();
  async function put(route,html){
    need(route.startsWith(BASE)&&route!==BASE&&route.endsWith("/")&&!route.includes("..")&&!route.includes("//"),"rota de saída insegura "+route);
    need(!unique.has(route),"arquivo gerado em duplicidade "+route);unique.add(route);
    const target=pathToFile(root,route);
    if(await exists(target)){
      const old=await readFile(target,"utf8");
      need(old.startsWith(MARKER),"recusado sobrescrever arquivo manual "+route);
    }
    if(!dryRun){await mkdir(dirname(target),{recursive:true});await writeFile(target,MARKER+"\n"+html+"\n","utf8");}
    created.push(route);
  }
  for(const r of data.regioes){
    await put(BASE+r.slug+"/",regionPage(r));
    for(const c of r.paises){
      if(r.slug!=="brasil")await put(BASE+r.slug+"/"+c.slug+"/",countryPage(r,c));
      const base=BASE+r.slug+"/"+(r.slug==="brasil"?"":c.slug+"/");
      for(const lang of c.idiomas)await put(base+lang+"/",editionPage(r,c,lang));
    }
  }
  need(created.length===info.totalRoutes-1,"quantidade de arquivos gerados incorreta");
  return {regions:info.regions,countries:info.countries,editions:info.totalEditions,pages:created.length,paths:created};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  buildTirzepatidaMarkets().then(r=>console.log("Mercados de Receitas Leves/Tirzepatida:",JSON.stringify({regions:r.regions,countries:r.countries,editions:r.editions,pages:r.pages})))
  .catch(e=>{console.error(e);process.exitCode=1;});
}
