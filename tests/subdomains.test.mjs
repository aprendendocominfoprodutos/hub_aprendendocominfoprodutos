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
