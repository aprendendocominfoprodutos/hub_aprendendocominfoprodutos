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

test("Menú Familiar abre vitrine de regiões e mantém páginas de países e idiomas",async()=>{
  const root=resolve(".");
  const base="/fitness-saude/alimentacao/receitas/";
  const weekly=base+"cardapios-semanais/";
  const final=weekly+"menu-familiar/";
  const pages=await Promise.all([base,weekly,final].map(path=>readFile(join(root,"public",path,"index.html"),"utf8")));
  assert.match(pages[0],new RegExp(weekly));
  assert.match(pages[1],new RegExp(final));
  // O CARD é um link único para a vitrine de regiões, sem dropdown.
  assert.match(pages[1],/<a class="card weekly-menu-card"[^>]*data-product-id="PRO-0004"[^>]*href="/);
  assert.ok(pages[1].includes('href="'+final+'"'));
  assert.match(pages[1],/href="\/src\/cardapios-semanais\.css"/);
  assert.match(pages[1],/Ver regiões e países/);
  assert.doesNotMatch(pages[1],/<details\b|Selecione a região|class="region-options"/);
  const cardCss=await readFile(join(root,"public/src/cardapios-semanais.css"),"utf8");
  assert.match(cardCss,/\.weekly-menu-card:focus-visible/);
  assert.match(cardCss,/\.weekly-menu-card:hover/);

  assert.match(pages[2],/Menú Familiar/);
  assert.doesNotMatch(pages[2],/language-menu-options|Selecione o idioma|class="language-option"/);
  for(const region of ["brasil/","latam/","america-do-norte/","europa/","paises-arabes/"]){
    assert.ok(pages[2].includes('href="'+final+region+'"'));
    const regionHtml=await readFile(join(root,"public",final,region,"index.html"),"utf8");
    assert.match(regionHtml,/noindex,follow/);
  }
  const latam=await readFile(join(root,"public",final,"latam/index.html"),"utf8");
  for(const country of ["mexico","chile","argentina","colombia","peru"]){
    assert.ok(latam.includes('href="'+final+"latam/"+country+'/'));
    const countryHtml=await readFile(join(root,"public",final,"latam",country,"index.html"),"utf8");
    assert.match(countryHtml,/http-equiv="refresh"/);
    assert.doesNotMatch(countryHtml,/<details|class="mf-card"/);
  }
  const mexico=await readFile(join(root,"public",final,"latam/mexico/index.html"),"utf8");
  assert.match(mexico,/latam\/mexico\/es-mx\//);
  assert.doesNotMatch(mexico,/Selecionar →|Escolha o idioma/);
  const brasil=await readFile(join(root,"public",final,"brasil/index.html"),"utf8");
  assert.match(brasil,/http-equiv="refresh"/);
  assert.doesNotMatch(brasil,/Selecionar →|Escolha/);
  for(const country of ["espanha","portugal","italia"]){
    const html=await readFile(join(root,"public",final,"europa",country,"index.html"),"utf8");
    assert.match(html,/http-equiv="refresh"/);
    assert.doesNotMatch(html,/class="mf-card"|Selecionar idioma/);
  }
  const north=await readFile(join(root,"public",final,"america-do-norte/index.html"),"utf8");
  assert.match(north,/america-do-norte\/eua\//);
  assert.match(north,/america-do-norte\/canada\//);
  const us=await readFile(join(root,"public",final,"america-do-norte/eua/index.html"),"utf8");
  for(const code of ["en-us","es-us","pt-us"])assert.ok(us.includes(final+"america-do-norte/eua/"+code+"/"));
  const canada=await readFile(join(root,"public",final,"america-do-norte/canada/index.html"),"utf8");
  for(const code of ["en-ca","fr-ca"])assert.ok(canada.includes(final+"america-do-norte/canada/"+code+"/"));
  const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
  const product=catalog.produtos.find(p=>p.id==="PRO-0004");
  assert.equal(product.status,"preparacao");
  assert.equal(product.vitrineFinal,final);
  assert.deepEqual(product.organizacaoMercados.regioes,["brasil","latam","america-do-norte","europa","paises-arabes"]);
  assert.ok(product.edicoes.every(e=>e.status==="planejada"&&!e.checkoutVerificado));
  assert.equal(product.edicoes.find(e=>e.codigo==="es-MX").rotaSimples,final+"latam/mexico/es-mx/");
  assert.equal(product.edicoes.find(e=>e.codigo==="pt-BR").rotaSimples,final+"brasil/pt-br/");
  assert.equal(product.edicoes.find(e=>e.codigo==="en-US").rotaSimples,final+"america-do-norte/eua/en-us/");
  assert.deepEqual(product.organizacaoMercados.edicoesRegionaisPlanejadas.filter(e=>e.regiao==="america-do-norte").map(e=>e.codigo),["es-US","pt-US","en-CA","fr-CA"]);
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

test("prévia mexicana gira quatro páginas originais do PDF a cada dois segundos",async()=>{
  const root=resolve(".");
  const landing=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
  const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
  const begin=landing.indexOf('class="mx-preview-stack mx-preview-stack-real mx-preview-four-pages"');
  const end=landing.indexOf('</div></section>',begin);
  assert.ok(begin>=0&&end>begin);
  const preview=landing.slice(begin,end);
  assert.equal((preview.match(/class="mx-paper-image"/g)||[]).length,4);
  assert.match(preview,/data-preview-interval-ms="2000"/);
  assert.deepEqual([...preview.matchAll(/data-slot="([^"]+)"/g)].map(x=>x[1]),["left","right","center","back"]);
  for(const [name,minimum] of [["receita-pollo-guisado-p16.avif",2400],["receita-lentejas-p19.avif",2500],["receita-picadillo-p22.avif",2200],["compras-semana-1-p37.avif",9000]]){
    assert.ok(preview.includes(name),name);
    const bytes=await readFile(join(root,"public/assets/menu-familiar",name));
    assert.equal(bytes.subarray(4,12).toString("ascii"),"ftypavif");
    assert.ok(bytes.length>minimum,"Página real ausente ou inválida: "+name);
  }
  assert.match(preview,/Páginas originales 16, 19, 22 y 37 del PDF/);
  assert.doesNotMatch(preview,/menu-semana-1-p15\.avif|mx-paper-dishes/);
  assert.match(landing,/const slots=\['back','right','center','left'\]/);
  assert.match(landing,/slots\[\(index\+1\)%slots\.length\]/);
  assert.match(landing,/window\.setInterval\(rotate,2000\)/);
  assert.match(landing,/IntersectionObserver/);
  assert.match(landing,/prefers-reduced-motion: reduce/);
  for(const slot of ["back","right","center","left"])assert.ok(css.includes('.mx-paper-image[data-slot="'+slot+'"]'));
  assert.match(css,/transition:transform \.72s/);
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
  const recipeCarousel=html.slice(html.indexOf("const track=document.getElementById(\'mx-recipe-track\');"));
  assert.doesNotMatch(recipeCarousel,/window\.setInterval\(/);
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
  "latam/peru/es-pe/","america-do-norte/eua/es-us/"
 ]){
  const page=await readFile(join(root,prefix,path,"index.html"),"utf8");
  assert.match(page,/noindex,follow/);
  assert.match(page,/planificad|planificación|preparación/i);
  assert.doesNotMatch(page,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
 }
});

test("card Menú Familiar aponta para a vitrine das cinco regiões",async()=>{
 const root=resolve(".");
 const prefix="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const cat=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/index.html"),"utf8");
 assert.ok(cat.includes('class="card weekly-menu-card"'));
 assert.ok(cat.includes('href="'+prefix+'"'));
 assert.doesNotMatch(cat,/class="region-option"/);
 const page=await readFile(join(root,"public",prefix,"index.html"),"utf8");
 for(const area of ["brasil","latam","paises-arabes","america-do-norte","europa"])
  assert.ok(page.includes(prefix+area+"/"));
});

test("América do Norte aparece no seletor principal e oferece cinco edições em dois países",async()=>{
 const root=resolve(".");
 const prefix="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const category=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/index.html"),"utf8");
 assert.ok(category.includes('href="'+prefix+'"'));
 assert.doesNotMatch(category,/<strong>Estados Unidos<\/strong>/);
 const main=await readFile(join(root,"public",prefix,"index.html"),"utf8");
 assert.ok(main.includes(prefix+"america-do-norte/"));
 const north=await readFile(join(root,"public",prefix,"america-do-norte/index.html"),"utf8");
 assert.ok(north.includes(prefix+"america-do-norte/eua/"));
 assert.ok(north.includes(prefix+"america-do-norte/canada/"));
 for(const locale of ["eua/es-us","eua/pt-us","canada/en-ca","canada/fr-ca"]){
  const page=await readFile(join(root,"public",prefix,"america-do-norte",locale,"index.html"),"utf8");
  assert.match(page,/noindex,follow/);
  assert.doesNotMatch(page,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
 }
 const mexico=await readFile(join(root,"public",prefix,"latam/mexico/es-mx/index.html"),"utf8");
 assert.match(mexico,/mx-recipe-track/);
});

test("seletor Europa reúne 16 países e respeita idiomas comerciais de cada país",async()=>{
 const root=resolve(".");
 const base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/";
 const europe=await readFile(join(root,"public",base,"index.html"),"utf8");
 assert.equal((europe.match(/class="mf-card"/g)||[]).length,16);
 const countries=[{"slug":"reino-unido","codes":["en-GB","ar-GB"]},{"slug":"alemanha","codes":["de-DE","ar-DE"]},{"slug":"paises-baixos","codes":["nl-NL","ar-NL"]},{"slug":"irlanda","codes":["en-IE"]},{"slug":"dinamarca","codes":["da-DK"]},{"slug":"suecia","codes":["sv-SE","ar-SE"]},{"slug":"suica","codes":["de-CH","fr-CH","it-CH"]},{"slug":"belgica","codes":["nl-BE","fr-BE","ar-BE"]},{"slug":"noruega","codes":["nb-NO"]},{"slug":"austria","codes":["de-AT"]},{"slug":"polonia","codes":["pl-PL"]},{"slug":"republica-tcheca","codes":["cs-CZ"]}];
 for(const country of countries){
  assert.ok(europe.includes('href="'+base+country.slug+'/"'),country.slug);
  const countryHtml=await readFile(join(root,"public",base,country.slug,"index.html"),"utf8");
  assert.match(countryHtml,/noindex,follow/);
  if(country.codes.length===1){
   assert.match(countryHtml,/http-equiv="refresh"/);
   assert.ok(countryHtml.includes(country.codes[0].toLowerCase()));
  }else{
   assert.doesNotMatch(countryHtml,/http-equiv="refresh"/);
   for(const code of country.codes)assert.ok(countryHtml.includes(base+country.slug+"/"+code.toLowerCase()+"/"));
  }
  for(const code of country.codes){
   const leaf=await readFile(join(root,"public",base,country.slug,code.toLowerCase(),"index.html"),"utf8");
   assert.match(leaf,/noindex,follow/);
   assert.doesNotMatch(leaf,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
  }
 }
 const catalog=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
 const prod=catalog.produtos.find(p=>p.id==="PRO-0004");
 assert.equal(prod.organizacaoMercados.paisesEuropa.length,16);
 assert.equal(prod.organizacaoMercados.edicoesRegionaisPlanejadas.filter(e=>e.regiao==="europa").length,21);
});

test("Seis países europeus oferecem edição árabe com RTL sem checkout",async()=>{
 const root=resolve("."),base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/";
 for(const [slug,code] of [["franca","ar-FR"],["alemanha","ar-DE"],["belgica","ar-BE"],["reino-unido","ar-GB"],["paises-baixos","ar-NL"],["suecia","ar-SE"]]){
  const select=await readFile(join(root,"public",base,slug,"index.html"),"utf8");
  assert.doesNotMatch(select,/http-equiv="refresh"/);
  assert.ok(select.includes(base+slug+"/"+code.toLowerCase()+"/"));
  const page=await readFile(join(root,"public",base,slug,code.toLowerCase(),"index.html"),"utf8");
  assert.ok(page.includes('lang="'+code+'"'));
  assert.match(page,/<html[^>]*dir="rtl"/);
  assert.match(page,/noindex,follow/);
  assert.match(page,/قيد الإعداد/);
  assert.doesNotMatch(page,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
 }
});

test("Região Países Árabes oferece 11 mercados e 20 edições planejadas sem checkout",async()=>{
 const root=resolve("."),base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const ms=[{"slug":"arabia-saudita","codes":["ar-SA","en-SA"]},{"slug":"emirados-arabes-unidos","codes":["ar-AE","en-AE"]},{"slug":"catar","codes":["ar-QA","en-QA"]},{"slug":"kuwait","codes":["ar-KW","en-KW"]},{"slug":"bahrein","codes":["ar-BH","en-BH"]},{"slug":"oma","codes":["ar-OM","en-OM"]},{"slug":"egito","codes":["ar-EG"]},{"slug":"marrocos","codes":["ar-MA","fr-MA"]},{"slug":"argelia","codes":["ar-DZ","fr-DZ"]},{"slug":"tunisia","codes":["ar-TN","fr-TN"]},{"slug":"jordania","codes":["ar-JO"]}];
 const region=await readFile(join(root,"public",base,"paises-arabes/index.html"),"utf8");
 assert.equal((region.match(/class="mf-card"/g)||[]).length,11);
 for(const m of ms){
  const p=base+"paises-arabes/"+m.slug+"/";
  assert.ok(region.includes(p));
  const c=await readFile(join(root,"public",p,"index.html"),"utf8");
  assert.match(c,/noindex,follow/);
  if(m.codes.length===1)assert.match(c,/http-equiv="refresh"/);
  else assert.doesNotMatch(c,/http-equiv="refresh"/);
  for(const code of m.codes){
   assert.ok(c.includes(p+code.toLowerCase()+"/"));
   if(code==="ar-SA")continue;
   const leaf=await readFile(join(root,"public",p,code.toLowerCase(),"index.html"),"utf8");
   assert.ok(leaf.includes('lang="'+code+'"'));
   assert.match(leaf,/noindex,follow/);
   if(code.startsWith("ar-"))assert.match(leaf,/<html[^>]*dir="rtl"/);
   assert.doesNotMatch(leaf,/pay\.hotmart|hotmart__button-checkout|fbq\(/);
  }
 }
 const cat=JSON.parse(await readFile(join(root,"catalogo/edicoes-internacionais.json"),"utf8"));
 const prod=cat.produtos.find(p=>p.id==="PRO-0004");
 assert.equal(prod.organizacaoMercados.paisesArabes.length,11);
 assert.equal(prod.organizacaoMercados.edicoesRegionaisPlanejadas.filter(e=>e.regiao==="paises-arabes").length,19);
 assert.equal(prod.edicoes.find(e=>e.codigo==="ar-SA").rotaSimples,base+"paises-arabes/arabia-saudita/ar-sa/");
});

test("Países Árabes é a terceira categoria da página regional",async()=>{
 const root=resolve("."),base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const dir=await readFile(join(root,"public",base,"index.html"),"utf8");
 const cards=[...dir.matchAll(/class="mf-card" href="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(cards.length,5);
 assert.equal(cards[2],base+"paises-arabes/");
 const arab=await readFile(join(root,"public",base,"paises-arabes/index.html"),"utf8");
 assert.equal((arab.match(/class="mf-card"/g)||[]).length,11);
});

test("Hero México mostra família em refeição e bandeira sem prejudicar a legibilidade da landing",async()=>{
 const root=resolve(".");
 const html=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
 const css=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
 const hero=html.slice(html.indexOf('<section class="mx-hero"'),html.indexOf('</section>',html.indexOf('<section class="mx-hero"'))+10);
 assert.match(hero,/mx-hero-image-family/);
 assert.match(hero,/photos\/4262184\/pexels-photo-4262184\.jpeg/);
 assert.match(hero,/linear-gradient\(90deg,rgba\(4,25,18,\.98\)/);
 assert.match(hero,/Bandera de México/);
 assert.match(hero,/🇲🇽/);
 assert.match(hero,/mx-book-real/);
 assert.match(hero,/id="mx-title"/);
 assert.match(hero,/#contenido-guia/);
 assert.match(css,/\.mx-hero-image-family\{[^}]*background-size:cover/);
 assert.match(css,/\.mx-hero-country-flag\{/);
 assert.match(html,/August de Richelieu \/ Pexels/);
 assert.doesNotMatch(hero,/photo-1551504734-5ee1c4a1479b/);
});

test("semanas do Menú Familiar alternam automaticamente a cada 3 segundos sem interromper a leitura manual",async()=>{
 const root=resolve(".");
 const page=await readFile(join(root,"public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/index.html"),"utf8");
 const style=await readFile(join(root,"public/src/menu-familiar-mx.css"),"utf8");
 const tablist=page.slice(page.indexOf('<div class="mx-week-tabs"'),page.indexOf('</div>',page.indexOf('<div class="mx-week-tabs"'))+6);
 assert.match(tablist,/data-auto-advance-ms="3000"/);
 assert.equal((tablist.match(/class="mx-week-tab(?: is-active)?"/g)||[]).length,4);
 const weekModule=page.slice(page.indexOf("const tabs=Array.from(document.querySelectorAll('.mx-week-tab'))"),page.indexOf('</script>',page.indexOf("const tabs=Array.from(document.querySelectorAll('.mx-week-tab'))")));
 assert.match(weekModule,/const advanceMs=3000/);
 assert.match(weekModule,/window\.setTimeout\(/);
 assert.match(weekModule,/activate\(\(current\+1\)%tabs\.length,false\)/);
 assert.match(weekModule,/manualPause=true/);
 assert.match(weekModule,/if\(!visible\)manualPause=false/);
 assert.match(weekModule,/observer\.observe\(tablist\)/);
 assert.match(weekModule,/document\.hidden/);
 assert.match(weekModule,/prefers-reduced-motion: reduce/);
 assert.match(weekModule,/aria-selected/);
 assert.match(weekModule,/ArrowRight/);
 assert.match(page,/Las semanas avanzan automáticamente cada 3 segundos/);
 assert.match(style,/\.mx-weeks-auto-hint\{/);
 assert.match(style,/@media\(prefers-reduced-motion:reduce\)\{\.mx-week-panel:not\(\[hidden\]\)\{animation:none\}\}/);
});
