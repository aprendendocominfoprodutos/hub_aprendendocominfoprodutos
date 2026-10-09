import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import regionalWorker, { localizedRequestPath } from "../worker/index.mjs";
import { REGIONS, renderLocaleHome, buildLocaleHomes } from "../scripts/build-subdomain-homes.mjs";
import { commercialURL } from "../scripts/build-international.mjs";

const cat=JSON.parse(await readFile(resolve("catalogo/edicoes-internacionais.json"),"utf8"));
const domain="aprendendocominfoprodutos.com.br";

test("sete hosts internacionais registrados, sem interferir com www",()=>{
  assert.deepEqual(Object.keys(REGIONS),["pt-BR","en-US","es-MX","es-ES","fr-FR","it-IT","pt-PT"]);
  assert.deepEqual(localizedRequestPath("www."+domain,"/mental-financeiro/"),{route:"main",path:"/mental-financeiro/"});
  assert.deepEqual(localizedRequestPath("en-us."+domain,"/products/christmas-guide/"),
    {route:"locale",path:"/en-us/products/christmas-guide/"});
  assert.deepEqual(localizedRequestPath("es-mx."+domain,"/productos/guia-navidad/"),
    {route:"locale",path:"/es-mx/productos/guia-navidad/"});
  assert.deepEqual(localizedRequestPath("fr-fr."+domain,"/produits/guide-noel/"),
    {route:"locale",path:"/fr-fr/produits/guide-noel/"});
});

test("raiz do subdomínio serve a vitrine própria e protege os outros países",()=>{
  assert.deepEqual(localizedRequestPath("it-it."+domain,"/"),{route:"locale",path:"/it-it/"});
  assert.equal(localizedRequestPath("es-mx."+domain,"/products/christmas-guide/").route,"not-found");
  assert.equal(localizedRequestPath("es-mx."+domain,"/mental-financeiro/").route,"not-found");
  assert.equal(localizedRequestPath("es-mx."+domain,"/es-es/productos/guia-navidad/").route,"not-found");
  assert.deepEqual(localizedRequestPath("pt-br."+domain,"/produtos/natal-pratico/"),
    {route:"locale",path:"/pt-br/produtos/natal-pratico/"});
});

test("worker mantém o portal brasileiro e encaminha apenas a rota regional", async()=>{
  const calls=[];
  const env={ASSETS:{fetch:async request=>{calls.push(new URL(request.url));return new Response("ok",{status:200});}}};
  await regionalWorker.fetch(new Request("https://www."+domain+"/mitologia/grega/geral/pt-br/"),env);
  await regionalWorker.fetch(new Request("https://en-us."+domain+"/products/greek-mythology/"),env);
  await regionalWorker.fetch(new Request("https://en-us."+domain+"/"),env);
  await regionalWorker.fetch(new Request("https://en-us."+domain+"/assets/home/logo-main.webp"),env);
  assert.deepEqual(calls.map(u=>u.pathname),
    ["/mitologia/grega/geral/pt-br/","/en-us/products/greek-mythology/","/en-us/","/assets/home/logo-main.webp"]);
  const invalid=await regionalWorker.fetch(new Request("https://fr-fr."+domain+"/financeiro/"),env);
  assert.equal(invalid.status,404);
  assert.equal(calls.length,4);
});

test("URLs comerciais priorizam o endereço leve da Renda Extra no domínio principal",()=>{
  const brazil=cat.produtos[0].edicoes[0];
  const us=cat.produtos[0].edicoes[1];
  const mexico=cat.produtos[0].edicoes[2];
  assert.equal(commercialURL(cat,brazil),
    "https://www."+domain+"/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/");
  assert.equal(commercialURL(cat,us),"https://www."+domain+"/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/ing/");
  assert.equal(commercialURL(cat,mexico),"https://www."+domain+"/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/esp/");
});

test("vitrines regionais mostram futuros produtos mas não vendem versões inexistentes",async()=>{
  const h=renderLocaleHome(cat,"en-US");
  assert.match(h,/lang="en-US"/);
  assert.match(h,/noindex,follow/);
  assert.match(h,/Future project/);
  assert.match(h,/href="\/products\/christmas-guide\/"/);
  assert.match(h,/href="\/products\/greek-mythology\/"/);
  assert.doesNotMatch(h,/hotmart|checkout/i);
  const br=renderLocaleHome(cat,"pt-BR");
  assert.match(br,/href="\/produtos\/natal-pratico\/"/);
  assert.match(br,/Disponível/);
  const dry=await buildLocaleHomes({dryRun:true});
  assert.equal(dry.homes.length,7);
});

test("URL antiga no subdomínio e normalização de barra",async()=>{
  assert.deepEqual(localizedRequestPath("en-us."+domain,"/en-us/products/christmas-guide/"),
    {route:"locale",path:"/en-us/products/christmas-guide/"});
  const mock={ASSETS:{fetch:async r=>new Response(new URL(r.url).pathname)}};
  const redirect=await regionalWorker.fetch(new Request("https://en-us."+domain+"/products"),mock);
  assert.equal(redirect.status,308);
  assert.equal(redirect.headers.get("location"),"https://en-us."+domain+"/products/");
});

test("URL antiga de Mitologia redireciona 308 para /pt-br/ e preserva consultas",async()=>{
  const fake={ASSETS:{fetch:async()=>new Response("não deve buscar assets")}};
  for(const path of ["/mitologia/grega/geral/","/mitologia/grega/geral"]){
    const url="https://www."+domain+path+"?utm_source=meta";
    const res=await regionalWorker.fetch(new Request(url),fake);
    assert.equal(res.status,308);
    assert.equal(res.headers.get("location"),
      "https://www."+domain+"/mitologia/grega/geral/pt-br/?utm_source=meta");
  }
  const natal=await regionalWorker.fetch(new Request("https://www."+domain+"/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/"),fake);
  assert.equal(natal.status,200);
});

test("Menú Familiar redireciona 301 e mantém UTMs após migrar a página mexicana",async()=>{
 const env={ASSETS:{fetch:async()=>new Response("never",{status:200})}};
 const old="https://www."+domain+"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/esp-mx/?utm_source=meta&utm_campaign=mx";
 const r=await regionalWorker.fetch(new Request(old),env);
 assert.equal(r.status,301);
 const newUrl=new URL(r.headers.get("location"));
 assert.equal(newUrl.pathname,"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/latam/mexico/es-mx/");
 assert.equal(newUrl.searchParams.get("utm_source"),"meta");
 assert.equal(newUrl.searchParams.get("utm_campaign"),"mx");
 const other=await regionalWorker.fetch(new Request("https://www."+domain+"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/pt-br"),env);
 assert.equal(other.status,301);
 assert.equal(new URL(other.headers.get("location")).pathname,"/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/brasil/pt-br/");
});

test("países com idioma único abrem edição direto e EUA mantém escolha de idiomas",async()=>{
  const root="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
  const mapping={"brasil/":"brasil/pt-br/","latam/mexico/":"latam/mexico/es-mx/","latam/chile/":"latam/chile/es-cl/","latam/argentina/":"latam/argentina/es-ar/","latam/colombia/":"latam/colombia/es-co/","latam/peru/":"latam/peru/es-pe/","europa/espanha/":"europa/espanha/es-es/","europa/portugal/":"europa/portugal/pt-pt/","europa/italia/":"europa/italia/it-it/"};
  const calls=[];
  const env={ASSETS:{fetch:async request=>{calls.push(new URL(request.url).pathname);return new Response("ok");}}};
  for(const [country,edition] of Object.entries(mapping)){
    const url="https://www."+domain+root+country+"?utm_source=anuncio";
    const response=await regionalWorker.fetch(new Request(url),env);
    assert.equal(response.status,302,country);
    const redirect=new URL(response.headers.get("location"));
    assert.equal(redirect.pathname,root+edition,country);
    assert.equal(redirect.searchParams.get("utm_source"),"anuncio");
    const noSlash=await regionalWorker.fetch(new Request("https://www."+domain+root+country.slice(0,-1)),env);
    assert.equal(noSlash.status,302,country+" sem barra final");
  }
  const us=await regionalWorker.fetch(new Request("https://www."+domain+root+"eua/"),env);
  assert.equal(us.status,302,"EUA antiga deve redirecionar para a nova região");
  assert.equal(new URL(us.headers.get("location")).pathname,root+"america-do-norte/eua/");
  const updated=await regionalWorker.fetch(new Request("https://www."+domain+root+"america-do-norte/eua/"),env);
  assert.equal(updated.status,200);
  assert.deepEqual(calls,[root+"america-do-norte/eua/"]);
});

test("América do Norte mantém EUA antigos redirecionados com UTMs e Canadá acessível",async()=>{
 const root="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const env={ASSETS:{fetch:async()=>new Response("ok",{status:200})}};
 for(const [oldPath,newPath] of [
  ["eua/","america-do-norte/eua/"],
  ["eua/en-us/","america-do-norte/eua/en-us/"],
  ["eua/es-us/","america-do-norte/eua/es-us/"]
 ]){
  const res=await regionalWorker.fetch(new Request("https://www."+domain+root+oldPath+"?utm_source=meta"),env);
  assert.equal(res.status,302);
  const url=new URL(res.headers.get("location"));
  assert.equal(url.pathname,root+newPath);
  assert.equal(url.searchParams.get("utm_source"),"meta");
 }
 for(const path of ["america-do-norte/","america-do-norte/eua/","america-do-norte/canada/"]){
  const res=await regionalWorker.fetch(new Request("https://www."+domain+root+path),env);
  assert.equal(res.status,200);
 }
 const legacy=await regionalWorker.fetch(new Request("https://www."+domain+root+"ing/"),env);
 assert.equal(legacy.status,301);
 assert.equal(new URL(legacy.headers.get("location")).pathname,root+"america-do-norte/eua/en-us/");
});

test("Europa abre diretamente países com uma edição, preservando UTMs, e mantém seletor multilíngue",async()=>{
 const base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/";
 const singles=[["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/irlanda/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/irlanda/en-ie/"],["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/dinamarca/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/dinamarca/da-dk/"],["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/noruega/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/noruega/nb-no/"],["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/austria/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/austria/de-at/"],["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/polonia/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/polonia/pl-pl/"],["/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/republica-tcheca/","/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/republica-tcheca/cs-cz/"]];
 const env={ASSETS:{fetch:async req=>new Response(new URL(req.url).pathname,{status:200})}};
 for(const [country,edition] of singles){
  const response=await regionalWorker.fetch(new Request("https://www."+domain+country+"?utm_source=ads"),env);
  assert.equal(response.status,302,country);
  const target=new URL(response.headers.get("location"));
  assert.equal(target.pathname,edition);
  assert.equal(target.searchParams.get("utm_source"),"ads");
 }
 for(const country of ["suica","belgica","franca","alemanha","reino-unido","paises-baixos","suecia"]){
  const response=await regionalWorker.fetch(new Request("https://www."+domain+base+country+"/"),env);
  assert.equal(response.status,200);
 }
});

test("Seletor de árabe europeu não redireciona para idioma local",async()=>{
 const base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/europa/";
 const mock={ASSETS:{fetch:async req=>new Response(new URL(req.url).pathname)}};
 for(const slug of ["franca","alemanha","belgica","reino-unido","paises-baixos","suecia"]){
  const res=await regionalWorker.fetch(new Request("https://www."+domain+base+slug+"/?utm_source=meta"),mock);
  assert.equal(res.status,200,slug);
  assert.equal(await res.text(),base+slug+"/");
 }
});

test("Mercados Árabes: Egito e Jordânia abrem direto, outros escolhem idioma",async()=>{
 const base="/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/";
 const env={ASSETS:{fetch:async req=>new Response(new URL(req.url).pathname)}};
 for(const [slug,code] of [["egito","ar-eg"],["jordania","ar-jo"]]){
  const r=await regionalWorker.fetch(new Request("https://www."+domain+base+"paises-arabes/"+slug+"/?utm_source=ads"),env);
  assert.equal(r.status,302);
  const target=new URL(r.headers.get("location"));
  assert.equal(target.pathname,base+"paises-arabes/"+slug+"/"+code+"/");
  assert.equal(target.searchParams.get("utm_source"),"ads");
 }
 for(const slug of ["arabia-saudita","emirados-arabes-unidos","catar","kuwait","bahrein","oma","marrocos","argelia","tunisia"]){
  const r=await regionalWorker.fetch(new Request("https://www."+domain+base+"paises-arabes/"+slug+"/"),env);
  assert.equal(r.status,200,slug);
 }
 const old=await regionalWorker.fetch(new Request("https://www."+domain+base+"ar/?utm_campaign=saudi"),env);
 assert.equal(old.status,302);
 const target=new URL(old.headers.get("location"));
 assert.equal(target.pathname,base+"paises-arabes/arabia-saudita/ar-sa/");
 assert.equal(target.searchParams.get("utm_campaign"),"saudi");
});
