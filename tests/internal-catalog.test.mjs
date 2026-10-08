import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {resolve,join} from "node:path";
import {validateFinalContainers} from "../scripts/validate-final-containers.mjs";
import {applyInternalRobots} from "../worker/index.mjs";

test("todo produto existente tem seletor no card final imediatamente anterior à landing",async()=>{
  const result=await validateFinalContainers();
  assert.equal(result.validated,2);
  assert.deepEqual(result.products.map(p=>p.id),["PRO-0001","PRO-0003"]);
  assert.deepEqual(result.products.map(p=>p.languageOptions),[8,8]);
  assert.deepEqual(result.products.map(p=>p.parent),[
    "/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/",
    "/mitologia/grega/"
  ]);
});

test("categorias internas não são indexáveis; landing brasileira fica fora da restrição",()=>{
  const response=()=>new Response("<html>body</html>",{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}});
  for(const path of ["/","/cultura-entretenimento/","/mitologia/grega/","/mitologia/grega/geral/","/mental-financeiro/financeiro/renda-extra/"]){
    const r=applyInternalRobots(response(),path);
    assert.equal(r.headers.get("X-Robots-Tag"),"noindex, follow");
  }
  for(const path of [
    "/mitologia/grega/geral/pt-br/",
    "/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/"
  ]){
    const r=applyInternalRobots(response(),path);
    assert.equal(r.headers.get("X-Robots-Tag"),null);
  }
  assert.equal(applyInternalRobots(new Response("css",{headers:{"Content-Type":"text/css"}}),"/src/portal.css").headers.get("X-Robots-Tag"),null);
  assert.equal(applyInternalRobots(new Response("no",{status:404,headers:{"Content-Type":"text/html"}}),"/absent/").headers.get("X-Robots-Tag"),null);
});

test("menu de idiomas flutua sem aumentar a altura dos cards finais",async()=>{
  const css=await readFile(join(resolve("."),"public/src/seletor-idiomas.css"),"utf8");
  const optionsRule=css.match(/\.language-menu-options\{([^}]+)\}/)?.[1] ?? "";
  assert.match(optionsRule,/position:absolute/);
  assert.match(optionsRule,/top:calc\(100% \+ 7px\)/);
  assert.match(optionsRule,/z-index:100/);
  assert.match(optionsRule,/max-height:min\(296px,48vh\)/);
  assert.match(css,/\.natal-card:has\(\.language-menu\[open\]\)\{z-index:50\}/);
  assert.match(css,/\.natal-card\{[^}]*overflow:visible/);
  assert.doesNotMatch(optionsRule,/position:static|position:relative/);
});
