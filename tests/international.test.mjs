import test from "node:test";
import assert from "node:assert/strict";
import {readFile, access} from "node:fs/promises";
import {join, resolve} from "node:path";
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
