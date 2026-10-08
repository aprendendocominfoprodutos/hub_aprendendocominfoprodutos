import test from "node:test";
import assert from "node:assert/strict";
import {readFile, access, mkdtemp, mkdir, writeFile, rm} from "node:fs/promises";
import {join, resolve, dirname} from "node:path";
import {tmpdir} from "node:os";
import {validateCatalog, publishedManifest, prepareInternational} from "../scripts/build-international.mjs";

const ROOT = resolve(".");
const catalog = JSON.parse(await readFile(join(ROOT, "catalogo", "edicoes-internacionais.json"), "utf8"));

test("cadastro: ids preservados e páginas originais existentes", async () => {
  assert.deepEqual(catalog.produtos.map(x=>x.id), ["PRO-0001", "PRO-0002", "PRO-0003"]);
  const ready = await validateCatalog(catalog, ROOT);
  assert.equal(ready.length, 0);
});
test("catálogo público divulga só edições efetivamente publicadas", () => {
  const manifest = publishedManifest(catalog);
  assert.equal(manifest.produtos.length, 2);
  assert.deepEqual(manifest.produtos.map(p=>p.edicoes.map(e=>e.codigo)), [["pt-BR"],["pt-BR"]]);
  assert.equal(JSON.stringify(manifest).includes("/en-us/"), false);
  assert.equal(JSON.stringify(manifest).includes("Renda Extra de Fim de Ano"), false);
});
test("planejamento não gera páginas inexistentes", async () => {
  const result = await prepareInternational({root:ROOT,dryRun:true});
  assert.equal(result.products, 3);
  assert.equal(result.published, 2);
  assert.equal(result.planned, 12);
  assert.deepEqual(result.generated, []);
  for (const product of catalog.produtos) {
    for (const e of product.edicoes.filter(e=>e.status === "planejada")) {
      await assert.rejects(access(join(ROOT,"public",e.rota,"index.html")), {code:"ENOENT"});
    }
  }
});
test("falha se status for publicado sem infoproduto adaptado", async () => {
  const bad=structuredClone(catalog);
  bad.produtos[0].edicoes[1].status="publicada";
  await assert.rejects(validateCatalog(bad,ROOT), /infoproduto não adaptado/);
});
test("rejeita colisões de rotas, antes de publicar", async () => {
  const bad=structuredClone(catalog);
  bad.produtos[2].edicoes[1].rota=bad.produtos[0].edicoes[1].rota;
  await assert.rejects(validateCatalog(bad,ROOT), /rota duplicada/);
});
test("rotas brasileiras originais não são movidas", () => {
  const natal=catalog.produtos[0].edicoes[0];
  const myth=catalog.produtos[2].edicoes[0];
  assert.equal(natal.rota,"/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/");
  assert.equal(myth.rota,"/mitologia/grega/geral/");
});

test("edição realmente pronta gera apenas página localizada, SEO e manifesto corretos", async () => {
  const tmp = await mkdtemp(join(tmpdir(), "ecosystem-i18n-"));
  try {
    const sample=structuredClone(catalog);
    sample.produtos=[sample.produtos[0]];
    sample.produtos[0].edicoes=sample.produtos[0].edicoes.slice(0,2);
    const [pt, en] = sample.produtos[0].edicoes;
    en.status="publicada";
    en.produtoAdaptado=true;
    en.checkoutVerificado=true;
    en.checkoutUrl="https://pay.hotmart.com/example-validated-in-test";
    en.htmlLocalizado="edicoes/natal-pratico/en-US/index.html";
    const origin = join(tmp,"public",pt.rota,"index.html");
    const translated = join(tmp,en.htmlLocalizado);
    await mkdir(dirname(origin),{recursive:true});
    await mkdir(dirname(translated),{recursive:true});
    await mkdir(join(tmp,"catalogo"),{recursive:true});
    await writeFile(origin,"<html lang=\"pt-BR\"><body>Original intacto</body></html>");
    await writeFile(translated,'<!doctype html><html lang="en-US"><head><title>Christmas Guide</title></head><body><h1>Guide</h1></body></html>');
    await writeFile(join(tmp,"catalogo","edicoes-internacionais.json"),JSON.stringify(sample));
    const result=await prepareInternational({root:tmp});
    assert.deepEqual(result.generated,["/produtos/natal-pratico/en-us/"]);
    const html=await readFile(join(tmp,"public",en.rota,"index.html"),"utf8");
    assert.match(html,/hreflang="en-US"/);
    assert.match(html,/hreflang="pt-BR"/);
    assert.match(html,/rel="canonical"/);
    assert.match(html,/aria-label="Idiomas disponíveis"/);
    assert.match(await readFile(origin,"utf8"),/Original intacto/);
    const manifest=JSON.parse(await readFile(join(tmp,"public","catalogo-edicoes.json"),"utf8"));
    assert.deepEqual(manifest.produtos[0].edicoes.map(x=>x.codigo),["pt-BR","en-US"]);
  } finally {
    await rm(tmp,{recursive:true,force:true});
  }
});
