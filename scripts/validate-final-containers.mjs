import {readFile} from "node:fs/promises";
import {resolve,join} from "node:path";
import {fileURLToPath} from "node:url";

const ROOT=resolve(fileURLToPath(new URL("..",import.meta.url)));
function verify(condition,message){if(!condition)throw Error("Vitrine final: "+message);}
const unique=(arr)=>new Set(arr).size===arr.length;
export async function validateFinalContainers({root=ROOT}={}) {
  const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
  const products=catalog.produtos.filter(p=>p.status==="existente");
  const parents=[];
  for(const p of products){
    verify(typeof p.vitrineFinal==="string"&&p.vitrineFinal.startsWith("/")&&p.vitrineFinal.endsWith("/"),
      "vitrine final precisa constar no cadastro: "+p.id);
    const origin=p.edicoes.find(e=>e.origemExistente && e.status==="publicada");
    verify(origin,"falta uma edição brasileira existente: "+p.id);
    const parent=await readFile(join(root,"public",p.vitrineFinal,"index.html"),"utf8");
    const landing=await readFile(join(root,"public",origin.rota,"index.html"),"utf8");
    const marker='data-product-id="'+p.id+'"';
    verify(parent.includes(marker),"card final não encontrado: "+p.id);
    verify(parent.split(marker).length===2,"card final duplicado: "+p.id);
    const before=parent.lastIndexOf("<article",parent.indexOf(marker));
    const end=parent.indexOf("</article>",parent.indexOf(marker));
    verify(before>=0&&end>before,"seletor fora do próprio card: "+p.id);
    const card=parent.slice(before,end+10);
    verify(card.includes("<select")&&card.includes("</select>")&&card.includes("onchange="),
      "seletor funcional ausente dentro do card: "+p.id);
    verify(card.includes('href="'+origin.rota+'"'),
      "falta acesso direto à landing brasileira: "+p.id);
    const allowed=p.edicoes.map(e=>e.rotaSimples||e.rota);
    const optionValues=[...card.matchAll(/<option\b[^>]*value="([^"]*)"/g)].map(m=>m[1]).filter(Boolean);
    verify(unique(optionValues),"opção de idioma duplicada: "+p.id);
    for(const route of allowed)verify(optionValues.includes(route),
      "idioma não cadastrado no card "+p.id+": "+route);
    verify(!landing.includes('class="natal-card-language"') && !landing.includes('class="lp-language"') &&
      !/id="(?:natal|mitologia-grega)-idioma"/.test(landing),
      "landing possui seletor administrativo: "+p.id);
    parents.push({id:p.id,parent:p.vitrineFinal,landing:origin.rota,languageOptions:optionValues.length});
  }
  return {validated:parents.length,products:parents};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  validateFinalContainers().then(x=>console.log("Vitrines finais validadas:",JSON.stringify(x)))
    .catch(e=>{console.error(e.message);process.exitCode=1});
}
