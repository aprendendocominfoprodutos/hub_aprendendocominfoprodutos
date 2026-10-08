import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access,mkdtemp,mkdir,writeFile,rm} from "node:fs/promises";
import {resolve,join,dirname} from "node:path";
import {tmpdir} from "node:os";
import {buildSimpleLanguages} from "../scripts/build-simple-languages.mjs";
import {commercialURL} from "../scripts/build-international.mjs";
const root=resolve(".");
const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
const natal=catalog.produtos[0];
const orig=natal.edicoes[0].rota;

test("seletor mantém o idioma dentro do mesmo caminho do Natal Prático",async()=>{
 const expected=["ing","esp","esp-es","fr","it","pt"];
 assert.deepEqual(natal.edicoes.filter(e=>e.rotaSimples).map(e=>e.rotaSimples),
  expected.map(s=>orig+s+"/"));
 const info=await buildSimpleLanguages({root,dryRun:true});
 assert.equal(info.count,6);
 assert.deepEqual(info.pages.map(p=>p.status),Array(6).fill("planejada"));
});
test("seletor existe em Renda Extra, Natal e landing original, mantendo o checkout",async()=>{
 const paths=[
  "public/mental-financeiro/financeiro/renda-extra/index.html",
  "public/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/index.html",
  "public/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/index.html"
 ];
 for(const path of paths){
   const html=await readFile(join(root,path),"utf8");
   assert.match(html,/id="natal-idioma"/);
   assert.match(html,/seletor-idiomas.css/);
   assert.match(html,/natal-pratico\/ing\//);
   assert.match(html,/natal-pratico\/it\//);
 }
 const landing=await readFile(join(root,paths[2]),"utf8");
 assert.match(landing,/https:\/\/pay\.hotmart\.com\/G107859159B/);
 assert.match(landing,/fbq\('init'/);
 assert.match(landing,/hotmart__button-checkout/);
});
test("URL da edição futura passa a ser o endereço curto quando lançada",()=>{
 assert.equal(commercialURL(catalog,{...natal.edicoes[1],status:"publicada"}),
  catalog.dominioCanonico+orig+"ing/");
});
test("as páginas reais de projeto futuro são geradas na própria URL da edição",async()=>{
 const temp=await mkdtemp(join(tmpdir(),"natal-idiomas-"));
 try {
  const original=join(temp,"public",orig,"index.html");
  const catpath=join(temp,"catalogo","edicoes-internacionais.json");
  await mkdir(dirname(original),{recursive:true});
  await mkdir(dirname(catpath),{recursive:true});
  await writeFile(original,"original sem alterações");
  await writeFile(catpath,JSON.stringify({versao:2,dominioCanonico:catalog.dominioCanonico,produtos:[natal]}));
  const result=await buildSimpleLanguages({root:temp});
  assert.equal(result.count,6);
  for(const e of natal.edicoes.filter(x=>x.rotaSimples)){
    const file=join(temp,"public",e.rotaSimples,"index.html");
    const html=await readFile(file,"utf8");
    assert.match(html,/GERADO-IDIOMAS-RENDA-EXTRA/);
    assert.match(html,/noindex,nofollow,noarchive/);
    assert.doesNotMatch(html,/pay\.hotmart\.com/);
    assert.match(html,new RegExp('lang="'+e.codigo+'"'));
  }
  assert.equal(await readFile(original,"utf8"),"original sem alterações");
  await buildSimpleLanguages({root:temp}); // idempotência
 }finally{await rm(temp,{recursive:true,force:true});}
});
test("não sobrescreve landing escrita manualmente no caminho reservado",async()=>{
 const temp=await mkdtemp(join(tmpdir(),"natal-idiomas-collision-"));
 try {
  const original=join(temp,"public",orig,"index.html");
  const collided=join(temp,"public",natal.edicoes[1].rotaSimples,"index.html");
  await mkdir(dirname(original),{recursive:true});
  await mkdir(dirname(collided),{recursive:true});
  await mkdir(join(temp,"catalogo"),{recursive:true});
  await writeFile(original,"original");
  await writeFile(collided,"landing manual");
  await writeFile(join(temp,"catalogo","edicoes-internacionais.json"),
    JSON.stringify({versao:2,dominioCanonico:catalog.dominioCanonico,produtos:[natal]}));
  await assert.rejects(buildSimpleLanguages({root:temp}),/não sobrescrever página manual/);
  assert.equal(await readFile(collided,"utf8"),"landing manual");
 }finally{await rm(temp,{recursive:true,force:true});}
});
