import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
const BASE="/cultura-entretenimento/educacao-infantil/";
const SELECT=BASE+"rotinas-autonomia-infantil/";
const SA=SELECT+"paises-arabes/arabia-saudita/";
const PRODUCT=SA+"minha-pequena-rotina/";
const read=async(p)=>readFile(join("public",p.slice(1),"index.html"),"utf8");
test("Educação Infantil mostra apenas um contêiner de Rotinas & Autonomia Infantil",async()=>{
 const html=await read(BASE);
 assert.equal((html.match(/class="ei-card"/g)||[]).length,1);
 assert.match(html,/Rotinas &amp; Autonomia Infantil/);
 assert.ok(html.includes('href="'+SELECT+'"'));
 assert.doesNotMatch(html,/pay\.hotmart|hotmart__button-checkout|fbq\(/i);
});
test("Rotinas & Autonomia Infantil apresenta cinco regiões",async()=>{
 const html=await read(SELECT);
 assert.equal((html.match(/class="ei-card"/g)||[]).length,5);
 for(const region of ["brasil","latam","america-do-norte","europa","paises-arabes"])
 assert.ok(html.includes('href="'+SELECT+region+'/"'),region);
 assert.match(html,/noindex,follow/);
});
test("Países Árabes destaca somente o piloto saudita, mantendo outros países planejados",async()=>{
 const html=await read(SELECT+"paises-arabes/");
 assert.ok(html.includes('href="'+SA+'"'));
 assert.equal((html.match(/class="ei-card"/g)||[]).length,1);
 assert.ok(html.includes("Emirados Árabes Unidos"));
});
test("Contêiner Minha Pequena Rotina abre diretamente a landing em árabe",async()=>{
 const html=await read(SA);
 assert.equal((html.match(/class="ei-card"/g)||[]).length,1);
 assert.ok(html.includes('href="'+PRODUCT+'ar-sa/"'));
 assert.ok(!html.includes('href="'+PRODUCT+'en-sa/"'));
});
test("URL do produto redireciona ao árabe sem tela de escolha de idioma",async()=>{
 const html=await read(PRODUCT);
 assert.match(html,/http-equiv="refresh"/);
 assert.match(html,/location\.replace/);
 assert.ok(html.includes(PRODUCT+'ar-sa/'));
 assert.ok(!html.includes('class="ei-languages"'));
});
test("Worker preserva as UTMs no redirecionamento à landing árabe",async()=>{
 const worker=await readFile("worker/index.mjs","utf8");
 assert.ok(worker.includes('url.pathname = "'+PRODUCT+'ar-sa/"'));
 assert.ok(worker.includes("Response.redirect(url.toString(), 302)"));
});
test("Landings ligam ao checkout validado e não contêm order bumps",async()=>{
 for(const loc of ["ar-sa","en-sa"]){
 const html=await read(PRODUCT+loc+"/");
 assert.ok(html.length>40000);
 assert.ok(html.includes(PRODUCT+"ar-sa/"));
 assert.ok(html.includes(PRODUCT+"en-sa/"));
 assert.ok(html.includes("2500"));
 assert.ok(!html.includes(BASE+"rotinas-autonomia/rotini-pequeno/"));
 assert.doesNotMatch(html,/order bump|8789393|8789454|8789493/i);
 const anchors=[...html.matchAll(/<a\b[^>]*data-checkout[^>]*>/g)].map(m=>m[0]);
 assert.equal(anchors.length,2,"duas chamadas comerciais por idioma");
 for(const anchor of anchors){
   assert.ok(anchor.includes('href="https://pay.hotmart.com/L108153484I?checkoutMode=10"'));
   assert.doesNotMatch(anchor,/aria-disabled="true"/);
 }
 assert.match(html,/10\.40/,"preço-base real em USD");
 assert.match(html,/USD/);
 assert.match(html,loc==="ar-sa"?/dir="rtl"/:/dir="ltr"/);
 }
});
test("Os catálogos novos usam CSS próprio, não indexação e sem checkout",async()=>{
 const css=await readFile("public/src/educacao-infantil-mercados.css","utf8");
 assert.match(css,/@media\(max-width:740px\)/);
 for(const path of [BASE,SELECT,SELECT+"paises-arabes/",SA,PRODUCT]){
 const html=await read(path);
 assert.match(html,/noindex,follow/);
 assert.match(html,/educacao-infantil-mercados\.css/);
 }
});
test("O Worker redireciona rotas antigas com UTMs sem afetar outros produtos",async()=>{
 const worker=await readFile("worker/index.mjs","utf8");
 assert.ok(worker.includes('trailing.startsWith("rotini-pequeno/")'));
 assert.ok(worker.includes("Minha Pequena Rotina"));
 assert.ok(worker.includes("Response.redirect(url.toString(), 308)"));
});