import {readFile,writeFile,mkdir,access} from "node:fs/promises";
import {join,dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {validateCatalog,futurePage,commercialURL} from "./build-international.mjs";

const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const MARKER="<!-- GERADO-IDIOMAS-RENDA-EXTRA: editar catalogo e edicao-fonte -->";
const PATH=/^\/[a-z0-9/-]+\/$/;
const exists=async f=>{try{await access(f);return true}catch{return false}};
const check=(v,m)=>{if(!v)throw Error("Idiomas simples: "+m)};

/** Publica páginas de projeto futuro, substituíveis na MESMA URL quando prontas. */
export async function buildSimpleLanguages({root=ROOT,dryRun=false}={}) {
  const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
  const ready=await validateCatalog(catalog,root);
  const approved=new Map(ready.map(x=>[x.product.id+":"+x.edition.codigo,x]));
  const created=[];
  const routes=new Set();
  for(const product of catalog.produtos)for(const edition of product.edicoes){
    if(!edition.rotaSimples)continue;
    const route=edition.rotaSimples;
    check(typeof route==="string"&&PATH.test(route)&&!route.includes("//")&&!route.includes(".."),
      "rota inválida: "+route);
    check(!edition.origemExistente,"não gerar outra versão brasileira");
    const orig=product.edicoes.find(e=>e.origemExistente)?.rota;
    const raizIdiomas=product.raizIdiomas || orig;
    check(orig && raizIdiomas && route.startsWith(raizIdiomas) && route!==raizIdiomas && route!==orig,
      "a rota deve ficar abaixo do agrupamento de idiomas do produto: "+route);
    check(!routes.has(route),"rota duplicada: "+route);
    routes.add(route);
    const target=join(root,"public",route,"index.html");
    if(await exists(target)){
      const source=await readFile(target,"utf8");
      check(source.startsWith(MARKER),"não sobrescrever página manual: "+route);
    }
    let html;
    if(edition.status==="planejada"){
      html=futurePage(product,edition,catalog);
    }else{
      const readyEdition=approved.get(product.id+":"+edition.codigo);
      check(readyEdition,"edição publicada sem landing localizada: "+route);
      const canonical=commercialURL(catalog,edition);
      html=readyEdition.html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi,"")
        .replace(/<\/head>/i,'<link rel="canonical" href="'+canonical+'">\n</head>');
    }
    if(!dryRun){
      await mkdir(dirname(target),{recursive:true});
      await writeFile(target,MARKER+"\n"+html+"\n","utf8");
    }
    created.push({locale:edition.codigo,route,status:edition.status});
  }
  return {count:created.length,pages:created};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  buildSimpleLanguages().then(x=>console.log("Rotas de idioma na Renda Extra:",JSON.stringify(x)))
    .catch(e=>{console.error(e);process.exitCode=1});
}
