import test from "node:test";
import assert from "node:assert/strict";
import {readFile,mkdtemp,mkdir,writeFile,rm} from "node:fs/promises";
import {resolve,join} from "node:path";
import {tmpdir} from "node:os";
import {validateMarkets,buildTirzepatidaMarkets,regionPage,countryPage,editionPage,legacyRedirect,MARKER} from "../scripts/build-tirzepatida-markets.mjs";

const ROOT=resolve(".");
const CATEGORY="/fitness-saude/alimentacao/receitas/mounjaro-tirzepatida/";
const BASE=CATEGORY+"emagrecimento/";
const config=JSON.parse(await readFile(join(ROOT,"catalogo/mercados-tirzepatida.json"),"utf8"));
const source="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
test("Receitas Leves possui árvore exclusiva com cinco regiões, 35 países e 56 variações",()=>{
  const r=validateMarkets(config);
  assert.deepEqual({regions:r.regions,countries:r.countries,editions:r.totalEditions,total:r.totalRoutes},{regions:5,countries:35,editions:56,total:96});
  assert.equal(config.produtoId,"PRO-0005");
  assert.equal(config.baseRota,BASE);
  assert.deepEqual(config.regioes.map(x=>x.slug),["brasil","latam","america-do-norte","europa","paises-arabes"]);
  assert.ok(config.regioes.every(x=>x.paises.every(p=>p.idiomas.length>=1)));
  assert.ok(config.regioes.find(r=>r.slug==="latam").paises.some(p=>p.slug==="mexico"&&p.idiomas.includes("es-mx")));
  assert.ok(config.regioes.find(r=>r.slug==="america-do-norte").paises.some(p=>p.slug==="eua"&&p.idiomas.includes("en-us")&&p.idiomas.includes("es-us")));
  assert.ok(config.regioes.find(r=>r.slug==="paises-arabes").paises.some(p=>p.slug==="arabia-saudita"&&p.idiomas.includes("ar-sa")));
});

test("página principal e catálogo mantêm Mounjaro separado do Menú Familiar",async()=>{
  const root=await readFile(join(ROOT,"public",CATEGORY,"index.html"),"utf8");
  const markets=await readFile(join(ROOT,"public",BASE,"index.html"),"utf8");
  const old=await readFile(join(ROOT,"public",source,"index.html"),"utf8");
  const oldCategory=await readFile(join(ROOT,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/index.html"),"utf8");
  const parent=await readFile(join(ROOT,"public/fitness-saude/alimentacao/receitas/index.html"),"utf8");
  const catalog=JSON.parse(await readFile(join(ROOT,"catalogo/edicoes-internacionais.json"),"utf8"));
  const product=catalog.produtos.find(p=>p.id==="PRO-0005");
  assert.equal(product.slug,"receitas-leves-tirzepatida");
  assert.equal(product.status,"preparacao");
  assert.deepEqual(product.edicoes,[]);
  assert.equal(product.vitrineFinal,BASE);
  assert.equal(product.categoriaRaiz,CATEGORY);
  assert.equal(product.raizIdiomas,BASE);
  assert.deepEqual(product.classificacaoPrincipal.slice(-2),["Mounjaro / Tirzepatida","Emagrecimento"]);
  assert.equal(product.organizacaoMercados.fonte,"catalogo/mercados-tirzepatida.json");
  assert.equal((root.match(/class="tl-card/g)||[]).length,1);
  assert.match(root,/Emagrecimento/);
  assert.ok(root.includes('href="'+BASE+'"'));
  assert.ok(!root.includes(CATEGORY+"latam/"));
  assert.equal((markets.match(/class="tl-card"/g)||[]).length,5);
  for(const region of config.regioes)assert.ok(markets.includes('href="'+BASE+region.slug+'/"'));
  assert.match(root,/noindex,follow/);
  assert.doesNotMatch(root,/pay\.hotmart|hotmart__button-checkout|fbq\(/gi);
  assert.ok(old.includes("Menú Familiar"));
  assert.ok(oldCategory.includes(source));
  assert.ok(parent.includes('href="'+CATEGORY+'"'));
  assert.ok(!old.includes("Receitas Leves para Quem Usa Tirzepatida"));
});

test("95 destinos geográficos são planejados, sem checkout nem conteúdo médico",async()=>{
  const r=await buildTirzepatidaMarkets({root:ROOT,dryRun:true});
  assert.deepEqual({regions:r.regions,countries:r.countries,editions:r.editions,pages:r.pages,redirects:r.redirects},{regions:5,countries:35,editions:56,pages:95,redirects:95});
  assert.ok(r.paths.includes(BASE+"brasil/pt-br/"));
  assert.ok(r.paths.includes(BASE+"latam/mexico/es-mx/"));
  assert.ok(r.paths.includes(BASE+"america-do-norte/eua/en-us/"));
  assert.ok(r.paths.includes(BASE+"europa/portugal/pt-pt/"));
  assert.ok(r.paths.includes(BASE+"paises-arabes/arabia-saudita/ar-sa/"));
  assert.ok(r.paths.every(p=>p.startsWith(BASE)&&!p.includes(source)));
  assert.equal(r.legacyPaths.length,95);
  assert.ok(r.legacyPaths.includes(CATEGORY+"latam/mexico/es-mx/"));
  assert.ok(r.legacyPaths.every(p=>p.startsWith(CATEGORY)&&!p.startsWith(BASE)));
});

test("páginas de região, país e edição mostram apenas roteiros administrativos",()=>{
  const latam=config.regioes.find(r=>r.slug==="latam");
  const mexico=latam.paises.find(p=>p.slug==="mexico");
  const root=regionPage(latam),country=countryPage(latam,mexico),edition=editionPage(latam,mexico,"es-mx");
  assert.match(root,/Escolha o seu/);
  assert.ok(root.includes(BASE+"latam/mexico/"));
  assert.ok(country.includes(BASE+"latam/mexico/es-mx/"));
  assert.match(edition,/lang="es-MX"/);
  assert.match(edition,/Proyecto futuro/);
  assert.match(edition,/noindex,nofollow,noarchive/);
  for(const html of [root,country,edition]){
    assert.doesNotMatch(html,/pay\.hotmart|hotmart__button-checkout|fbq\(|botão de compra/i);
    assert.ok(!html.includes(source));
  }
  const arabia=config.regioes.find(r=>r.slug==="paises-arabes"),sa=arabia.paises.find(p=>p.slug==="arabia-saudita");
  const ar=editionPage(arabia,sa,"ar-sa");
  assert.match(ar,/lang="ar-SA" dir="rtl"/);
  assert.match(ar,/noindex,nofollow,noarchive/);
});

test("geração impede sobrescrever edições lançadas manualmente",async()=>{
  const tmp=await mkdtemp(join(tmpdir(),"tirzepatida-mercados-"));
  try{
    await mkdir(join(tmp,"catalogo"),{recursive:true});
    await writeFile(join(tmp,"catalogo/mercados-tirzepatida.json"),JSON.stringify(config));
    const dest=join(tmp,"public",BASE,"brasil","index.html");
    await mkdir(join(tmp,"public",BASE,"brasil"),{recursive:true});
    await writeFile(dest,"<!doctype html><title>Landing real</title>");
    await assert.rejects(buildTirzepatidaMarkets({root:tmp}),/recusado sobrescrever arquivo manual/);
    await writeFile(dest,MARKER+"\n"+"página gerada anteriormente");
    const result=await buildTirzepatidaMarkets({root:tmp});
    assert.equal(result.pages,95);
    assert.equal(result.redirects,95);
    const leaf=await readFile(join(tmp,"public",BASE,"latam","mexico","es-mx","index.html"),"utf8");
    assert.ok(leaf.startsWith(MARKER));
    assert.match(leaf,/Proyecto futuro/);
    assert.doesNotMatch(leaf,/pay\.hotmart|checkoutUrl/);
    const previous=await readFile(join(tmp,"public",CATEGORY,"latam","mexico","es-mx","index.html"),"utf8");
    assert.ok(previous.startsWith(MARKER));
    assert.match(previous,/http-equiv="refresh"/);
    assert.ok(previous.includes(BASE+"latam/mexico/es-mx/"));
  }finally{await rm(tmp,{recursive:true,force:true});}
});

test("validação bloqueia duplicações e rotas de região inválidas",()=>{
  const c=structuredClone(config);
  c.regioes[0].paises[0].idiomas.push("pt-br");
  assert.throws(()=>validateMarkets(c),/idioma inválido ou duplicado/);
  const d=structuredClone(config);
  d.baseRota=source;
  assert.throws(()=>validateMarkets(d),/baseRota/);
});

test("hierarquia Emagrecimento é a única entrada para a seleção de regiões",()=>{
  assert.equal(config.baseRota,BASE);
  assert.equal(config.categoriaRaiz,CATEGORY);
  assert.equal(config.categoria,"Emagrecimento");
  const oldLink=CATEGORY+"latam/mexico/es-mx/";
  const newLink=BASE+"latam/mexico/es-mx/";
  const legacy=legacyRedirect(oldLink,newLink);
  assert.match(legacy,/noindex,follow/);
  assert.match(legacy,/http-equiv="refresh"/);
  assert.match(legacy,/Emagrecimento/);
  assert.ok(legacy.includes(newLink));
  assert.doesNotMatch(legacy,/pay\.hotmart|hotmart__button-checkout/i);
});
