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

test("Menú Familiar tem seletor por região, país e idioma, com URLs de mercado",async()=>{
  const root=resolve(".");
  const base="/fitness-saude/alimentacao/receitas/";
  const weekly=base+"cardapios-semanais/";
  const final=weekly+"menu-familiar/";
  const pages=await Promise.all([base,weekly,final].map(path=>readFile(join(root,"public",path,"index.html"),"utf8")));
  assert.match(pages[0],new RegExp(weekly));
  assert.match(pages[1],new RegExp(final));
  assert.match(pages[2],/Menú Familiar/);
  assert.doesNotMatch(pages[2],/language-menu-options|Selecione o idioma|class="language-option"/);
  for(const region of ["brasil/","latam/","eua/","europa/"]){
    assert.ok(pages[2].includes('href="'+final+region+'"'));
    const regionHtml=await readFile(join(root,"public",final,region,"index.html"),"utf8");
    assert.match(regionHtml,/noindex,follow/);
  }
  const latam=await readFile(join(root,"public",final,"latam/index.html"),"utf8");
  for(const country of ["mexico","chile","argentina","colombia","peru"]){
    assert.ok(latam.includes('href="'+final+"latam/"+country+'/'));
    const countryHtml=await readFile(join(root,"public",final,"latam",country,"index.html"),"utf8");
    assert.match(countryHtml,/Selecione|Edição|edición|idioma/);
  }
  const mexico=await readFile(join(root,"public",final,"latam/mexico/index.html"),"utf8");
  assert.match(mexico,/latam\/mexico\/es-mx\//);
  const us=await readFile(join(root,"public",final,"eua/index.html"),"utf8");
  assert.match(us,/eua\/en-us\//);
  assert.match(us,/eua\/es-us\//);
  const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
  const product=catalog.produtos.find(p=>p.id==="PRO-0004");
  assert.equal(product.status,"preparacao");
  assert.equal(product.vitrineFinal,final);
  assert.deepEqual(product.organizacaoMercados.regioes,["brasil","latam","eua","europa"]);
  assert.ok(product.edicoes.every(e=>e.status==="planejada"&&!e.checkoutVerificado));
  assert.equal(product.edicoes.find(e=>e.codigo==="es-MX").rotaSimples,final+"latam/mexico/es-mx/");
  assert.equal(product.edicoes.find(e=>e.codigo==="pt-BR").rotaSimples,final+"brasil/pt-br/");
  assert.equal(product.edicoes.find(e=>e.codigo==="en-US").rotaSimples,final+"eua/en-us/");
});

test("landing de pré-lançamento México preservada, localizada, sem checkout e com guias reais",async()=>{
 const root=resolve(".");
 const landing=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
 const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
 const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
 const ed=catalog.produtos.find(p=>p.id==="PRO-0004").edicoes.find(e=>e.codigo==="es-MX");
 assert.equal(ed.landingInformativa,true);
 assert.equal(ed.status,"planejada");
 assert.match(landing,/lang="es-MX"/);
 assert.match(landing,/data-product-landing="menu-familiar-mx"/);
 assert.match(landing,/name="robots" content="noindex,follow"/);
 assert.match(landing,/124 páginas/);
 assert.match(landing,/28 comidas principales/);
 assert.match(landing,/4 listas de compras/);
 assert.match(landing,/Tinga de pollo con tostadas y lechuga/);
 assert.match(landing,/Imágenes ilustrativas|imágenes del PDF|Imágenes del PDF/i);
 assert.match(landing,/href="\/src\/menu-familiar-mx.css"/);
 assert.match(landing,/role="tablist"/);
 assert.match(landing,/role="tabpanel"/);
 assert.match(css,/@media\(max-width:750px\)/);
 assert.doesNotMatch(landing,/pay\.hotmart|hotmart__button-checkout|fbq\(|'Compra ahora'|'Comprar ahora'/i);
});

test("hero do Menú Familiar usa a capa original em arquivo binário, não mockup sintético",async()=>{
 const root=resolve(".");
 const html=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
 const cover=await readFile(join(root,"public/assets/menu-familiar/menu-familiar-mx-cover.avif"));
 const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
 assert.match(html,/src="\/assets\/menu-familiar\/menu-familiar-mx-cover\.avif"/);
 assert.match(html,/Portada original del e-book/);
 assert.doesNotMatch(html,/mx-book-cover|Representación visual de la portada/);
 assert.ok(cover.length>5000,"A capa precisa ser um arquivo de imagem real");
 assert.equal(cover.subarray(4,12).toString("ascii"),"ftypavif");
 assert.match(css,/\.mx-book-real img/);
 assert.match(css,/@media\(max-width:460px\)/);
});

test("cartão de quatro semanas exibe imagem sem áreas vazias e informações legíveis",async()=>{
  const root=resolve(".");
  const html=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
  const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
  assert.match(html,/<div class="mx-feature-photo-media"><img/);
  assert.match(html,/class="mx-feature-info-title"><strong>4 semanas<\/strong>/);
  assert.match(html,/class="mx-feature-metrics"/);
  assert.match(html,/<strong>28<\/strong><span>recetas<\/span>/);
  assert.match(html,/<strong>4<\/strong><span>listas de compras<\/span>/);
  assert.match(html,/<strong>4<\/strong><span>porciones de referencia<\/span>/);
  assert.doesNotMatch(html,/class="mx-feature-tag"/);
  assert.match(css,/body\.mx-landing \.mx-feature-photo-media img\{/);
  assert.match(css,/object-fit:cover/);
  assert.match(css,/\.mx-feature-photo\{\s*display:flex;/);
  assert.match(css,/\.mx-feature-info-title strong\{/);
});

test("prévia do PDF na landing usa páginas originais 15 e 37, não páginas simuladas",async()=>{
  const root=resolve(".");
  const landing=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
  const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
  assert.match(landing,/class="mx-preview-stack mx-preview-stack-real"/);
  assert.match(landing,/menu-semana-1-p15\.avif/);
  assert.match(landing,/compras-semana-1-p37\.avif/);
  assert.match(landing,/páginas 15 y 37 del PDF/);
  assert.doesNotMatch(landing,/mx-paper-dishes|mx-paper-line|Vista ilustrativa basada en el índice/);
  assert.match(css,/\.mx-preview-stack-real \.mx-paper-image img/);
  for(const path of ["menu-semana-1-p15.avif","compras-semana-1-p37.avif"]){
    const bytes=await readFile(join(root,"public/assets/menu-familiar",path));
    assert.equal(bytes.subarray(4,12).toString("ascii"),"ftypavif");
    assert.ok(bytes.length>9000, "Imagem original pequena ou inexistente: "+path);
  }
});


test("carrossel de imagens do Menú Familiar tem 28 receitas, autoplay 2500ms e arraste",async()=>{
  const root=resolve(".");
  const html=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
  const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
  const photos=[...html.matchAll(/src="\/assets\/menu-familiar\/recetas\/mx-(\d{2})\.avif"/g)].map(x=>Number(x[1]));
  assert.deepEqual(photos,Array.from({length:28},(_,i)=>i+1));
  assert.match(html,/id="mx-recipe-track"/);
  assert.match(html,/window\.setTimeout\(/);
  assert.match(html,/Math\.max\(2500,suppressUntil-Date\.now\(\)\)/);
  assert.match(html,/visible=onScreen;\s*scheduleAutoplay\(\)/);
  assert.doesNotMatch(html,/window\.setInterval\(/);
  assert.match(html,/pointerdown/);
  assert.match(html,/touchstart/);
  assert.match(html,/mx-recipe-prev/);
  assert.match(html,/mx-recipe-next/);
  assert.match(html,/data-gallery-week="4"/);
  assert.doesNotMatch(html,/class="mx-photo-band"/);
  assert.match(css,/\.mx-recipe-slide\{[^\n]*flex:0 0 50%/);
  assert.match(css,/scroll-snap-type:x mandatory/);
  for(let i=1;i<=28;i++){
    const path="public/assets/menu-familiar/recetas/mx-"+String(i).padStart(2,"0")+".avif";
    const bytes=await readFile(join(root,path));
    assert.equal(bytes.subarray(4,12).toString("ascii"),"ftypavif");
    assert.ok(bytes.length>10000, "Imagem do PDF ausente: "+path);
  }
});

test("primeiro avanço da galeria sincronizado à visibilidade, sem pausa por hover",async()=>{
 const root=resolve(".");
 const html=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
 const gallery=html.slice(html.indexOf("const track=document.getElementById('mx-recipe-track');"));
 assert.match(gallery,/function scheduleAutoplay\(\)/);
 assert.match(gallery,/window\.setTimeout\(/);
 assert.match(gallery,/const wait=Math\.max\(2500,suppressUntil-Date\.now\(\)\)/);
 assert.match(gallery,/if\(onScreen===visible\)return;\s*visible=onScreen;\s*scheduleAutoplay\(\)/);
 assert.match(gallery,/document\.addEventListener\('visibilitychange',scheduleAutoplay\)/);
 assert.doesNotMatch(gallery,/mouseenter|mouseleave|window\.setInterval/);
});

test("links dos mercados novos permanecem sem checkout ou edições fictícias",async()=>{
 const root=resolve(".");
 const prefix="public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 for(const path of [
  "latam/chile/es-cl/","latam/argentina/es-ar/","latam/colombia/es-co/",
  "latam/peru/es-pe/","eua/es-us/"
 ]){
  const page=await readFile(join(root,prefix,path,"index.html"),"utf8");
  assert.match(page,/noindex,follow/);
  assert.match(page,/planificación/);
  assert.doesNotMatch(page,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
 }
});
