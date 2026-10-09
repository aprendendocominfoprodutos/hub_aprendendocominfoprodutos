import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";
import { validateCatalog, publishedManifest, prepareInternational, futurePage } from "../scripts/build-international.mjs";

const ROOT = resolve(".");
const catalog = JSON.parse(await readFile(join(ROOT,"catalogo","edicoes-internacionais.json"),"utf8"));
const oldBrazilUrl = "/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/";

test("IDs estáveis, versão 2 e landing pages brasileiras preservadas", async () => {
  assert.equal(catalog.versao, 2);
  assert.deepEqual(catalog.produtos.map(x=>x.id), ["PRO-0001","PRO-0002","PRO-0003","PRO-0004"]);
  assert.deepEqual(await validateCatalog(catalog,ROOT), []);
  assert.equal(catalog.produtos[0].edicoes[0].rota, oldBrazilUrl);
  assert.equal(catalog.produtos[0].edicoes[0].rotaPublica, "/pt-br/produtos/natal-pratico/");
  assert.equal(catalog.produtos[2].edicoes[0].rota, "/mitologia/grega/geral/pt-br/");
  assert.equal(catalog.produtos[2].raizIdiomas, "/mitologia/grega/geral/");
});

test("rotas internacionais padronizadas com slug traduzido e país", () => {
  const editions=catalog.produtos[0].edicoes;
  assert.equal(editions[1].rota, "/en-us/products/christmas-guide/");
  assert.equal(editions[2].rota, "/es-mx/productos/guia-navidad/");
  assert.equal(editions[3].rota, "/es-es/productos/guia-navidad/");
  assert.equal(editions[4].rota, "/fr-fr/produits/guide-noel/");
  assert.equal(editions[5].rota, "/it-it/prodotti/guida-natale/");
  assert.equal(editions[6].rota, "/pt-pt/produtos/natal-pratico/");
});

test("manifesto público lista só produtos e edições realmente publicadas", () => {
  const manifest=publishedManifest(catalog);
  assert.equal(manifest.produtos.length,2);
  assert.deepEqual(manifest.produtos.map(p=>p.edicoes.map(e=>e.codigo)),[["pt-BR"],["pt-BR"]]);
  assert.equal(manifest.produtos[0].edicoes[0].url.endsWith(oldBrazilUrl),true);
  assert.equal(manifest.produtos[0].edicoes[0].rotaPadronizada.endsWith("/pt-br/produtos/natal-pratico/"),true);
  assert.equal(JSON.stringify(manifest).includes("/en-us/"),false);
  assert.equal(JSON.stringify(manifest).includes("Renda Extra de Fim de Ano"),false);
});

test("planejadas geram aviso de projeto futuro, não checkout, sem indexação", () => {
  const product=catalog.produtos[0],edition=product.edicoes[1];
  const html=futurePage(product,edition,catalog);
  assert.match(html,/lang="en-US"/);
  assert.match(html,/Future project/);
  assert.match(html,/Coming soon/);
  assert.match(html,/noindex,nofollow,noarchive/);
  assert.doesNotMatch(html,/hotmart|pay\.hotmart|comprar agora/i);
});

test("dry-run: 14 páginas de projeto futuro e 2 atalhos brasileiros", async () => {
  const info=await prepareInternational({root:ROOT,dryRun:true});
  assert.equal(info.products,4);
  assert.equal(info.published,2);
  assert.equal(info.planned,22);
  assert.deepEqual(info.generated,[]);
  assert.equal(info.placeholders.length,22);
  assert.deepEqual(info.aliases,["/pt-br/produtos/natal-pratico/","/pt-br/produtos/mitologia-grega/"]);
  for(const p of catalog.produtos){
    for(const e of p.edicoes.filter(e=>e.status==="planejada")){
      await assert.rejects(access(join(ROOT,"public",e.rota,"index.html")),{code:"ENOENT"});
    }
  }
});

test("edição árabe apresenta conteúdo RTL e mantém checkout indisponível",()=>{
  const product=catalog.produtos[0];
  const arabic=product.edicoes.find(e=>e.codigo==="ar-SA");
  assert.equal(arabic.rotaSimples,oldBrazilUrl+"ar/");
  const html=futurePage(product,arabic,catalog);
  assert.match(html,/lang="ar-SA" dir="rtl"/);
  assert.match(html,/مشروع مستقبلي/);
  assert.match(html,/noindex,nofollow,noarchive/);
  assert.doesNotMatch(html,/pay\.hotmart/);
});

test("recusa publicar edição sem produto adaptado e checkout validado",async()=>{
  const bad=structuredClone(catalog);
  bad.produtos[0].edicoes[1].status="publicada";
  await assert.rejects(validateCatalog(bad,ROOT),/infoproduto não adaptado/);
  bad.produtos[0].edicoes[1].produtoAdaptado=true;
  await assert.rejects(validateCatalog(bad,ROOT),/checkout ainda não verificado/);
});

test("proteção contra colisão de links e rota fora do idioma",async()=>{
  const bad=structuredClone(catalog);
  bad.produtos[2].edicoes[1].rota=bad.produtos[0].edicoes[1].rota;
  await assert.rejects(validateCatalog(bad,ROOT),/rota duplicada/);
  const wrong=structuredClone(catalog);
  wrong.produtos[0].edicoes[1].rota="/produtos/natal-pratico/en-us/";
  await assert.rejects(validateCatalog(wrong,ROOT),/fora do padrão internacional/);
});

test("geração real substitui placeholder somente quando a edição estiver pronta", async () => {
  const tmp=await mkdtemp(join(tmpdir(),"ecosystem-locales-"));
  try {
    const sample=structuredClone(catalog);
    sample.produtos=[sample.produtos[0]];
    sample.produtos[0].edicoes=sample.produtos[0].edicoes.slice(0,3);
    const [pt,en,es]=sample.produtos[0].edicoes;
    en.status="publicada";
    en.produtoAdaptado=true;
    en.checkoutVerificado=true;
    en.checkoutUrl="https://pay.hotmart.com/check-in-test";
    en.htmlLocalizado="edicoes/natal-pratico/en-US/index.html";
    const origin=join(tmp,"public",pt.rota,"index.html");
    const translated=join(tmp,en.htmlLocalizado);
    await mkdir(dirname(origin),{recursive:true});
    await mkdir(dirname(translated),{recursive:true});
    await mkdir(join(tmp,"catalogo"),{recursive:true});
    await writeFile(origin,'<html lang="pt-BR"><body>Checkout original intacto</body></html>');
    await writeFile(translated,'<!doctype html><html lang="en-US"><head><title>Christmas Planning Guide</title></head><body><h1>Planning</h1></body></html>');
    await writeFile(join(tmp,"catalogo","edicoes-internacionais.json"),JSON.stringify(sample));
    const result=await prepareInternational({root:tmp});
    assert.deepEqual(result.generated,["/en-us/products/christmas-guide/"]);
    assert.deepEqual(result.placeholders,["/es-mx/productos/guia-navidad/"]);
    assert.deepEqual(result.aliases,["/pt-br/produtos/natal-pratico/"]);
    const html=await readFile(join(tmp,"public",en.rota,"index.html"),"utf8");
    assert.match(html,/hreflang="en-US"/);
    assert.match(html,/hreflang="pt-BR"/);
    assert.match(html,/rel="canonical"/);
    assert.match(html,/Idiomas disponíveis/);
    assert.doesNotMatch(html,/noindex,nofollow/);
    const placeholder=await readFile(join(tmp,"public",es.rota,"index.html"),"utf8");
    assert.match(placeholder,/Proyecto futuro/);
    assert.match(placeholder,/noindex,nofollow/);
    assert.doesNotMatch(placeholder,/hreflang=/);
    const alias=await readFile(join(tmp,"public",pt.rotaPublica,"index.html"),"utf8");
    assert.match(alias,/location\.replace/);
    assert.match(alias,/rel="canonical"/);
    assert.match(alias,/noindex,follow/);
    assert.equal((await readFile(origin,"utf8")).includes("Checkout original intacto"),true);
    const manifest=JSON.parse(await readFile(join(tmp,"public","catalogo-edicoes.json"),"utf8"));
    assert.deepEqual(manifest.produtos[0].edicoes.map(x=>x.codigo),["pt-BR","en-US"]);
    await prepareInternational({root:tmp}); // idempotente
  }finally{await rm(tmp,{recursive:true,force:true});}
});

test("não sobrescreve arquivos manuais nas rotas destinadas a placeholders",async()=>{
  const tmp=await mkdtemp(join(tmpdir(),"ecosystem-collision-"));
  try{
    const product=structuredClone(catalog.produtos[0]);
    product.edicoes=product.edicoes.slice(0,2);
    const data={versao:2,dominioCanonico:catalog.dominioCanonico,produtos:[product]};
    const original=join(tmp,"public",product.edicoes[0].rota,"index.html");
    const target=join(tmp,"public",product.edicoes[1].rota,"index.html");
    await mkdir(dirname(original),{recursive:true});
    await mkdir(dirname(target),{recursive:true});
    await mkdir(join(tmp,"catalogo"),{recursive:true});
    await writeFile(original,"Brazil page");
    await writeFile(target,"Manual special campaign page");
    await writeFile(join(tmp,"catalogo","edicoes-internacionais.json"),JSON.stringify(data));
    await assert.rejects(prepareInternational({root:tmp}),/recusado sobrescrever/);
    assert.equal(await readFile(target,"utf8"),"Manual special campaign page");
  }finally{await rm(tmp,{recursive:true,force:true});}
});

test("landing movida conserva caminhos absolutos para imagens, CSS e metadados",async()=>{
  const newer=await readFile(join(ROOT,"public/mitologia/grega/geral/pt-br/index.html"),"utf8");
  const original=await readFile(join(ROOT,"public/mitologia/grega/geral/index.html"),"utf8");
  assert.match(newer,/rel="canonical" href="https:\/\/www\.aprendendocominfoprodutos\.com\.br\/mitologia\/grega\/geral\/pt-br\/"/);
  assert.match(newer,/href="\/mitologia\/grega\/geral\/styles\.css"/);
  assert.match(newer,/src="\/mitologia\/grega\/geral\/assets\/capa\.webp"/);
  assert.doesNotMatch(newer,/(?:src|href)="(?:assets\/|styles\.css)/);
  assert.match(original,/rel="canonical" href="https:\/\/www\.aprendendocominfoprodutos\.com\.br\/mitologia\/grega\/geral\/pt-br\/"/);
  assert.match(original,/location\.replace/);
  const cat=catalog.produtos.find(p=>p.id==="PRO-0003");
  assert.deepEqual(cat.edicoes.filter(e=>e.codigo==="pt-BR").map(e=>e.rota),["/mitologia/grega/geral/pt-br/"]);
});
