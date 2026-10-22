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
test("País escolhido abre um único contêiner de produto",async()=>{
 const html=await read(SA);
 assert.equal((html.match(/class="ei-card"/g)||[]).length,1);
 assert.ok(html.includes('href="'+PRODUCT+'"'));
 assert.ok(!html.includes('href="'+PRODUCT+'ar-sa/"'));
 assert.ok(!html.includes('href="'+PRODUCT+'en-sa/"'));
});
test("Minha Pequena Rotina permite AR e ING dentro do mesmo contêiner",async()=>{
 const html=await read(PRODUCT);
 assert.equal((html.match(/class="ei-card ei-product"/g)||[]).length,1);
 for(const loc of ["ar-sa","en-sa"])assert.ok(html.includes('href="'+PRODUCT+loc+'/"'));
 assert.ok(html.includes('class="ei-languages"'));
});
test("Landings compartilham a oferta e não contêm order bumps",async()=>{
 for(const loc of ["ar-sa","en-sa"]){
 const html=await read(PRODUCT+loc+"/");
 assert.ok(html.length>40000);
 assert.ok(html.includes(PRODUCT+"ar-sa/"));
 assert.ok(html.includes(PRODUCT+"en-sa/"));
 assert.ok(html.includes("2500"));
 assert.ok(!html.includes(BASE+"rotinas-autonomia/rotini-pequeno/"));
 assert.doesNotMatch(html,/pay\.hotmart|hotmart__button-checkout|order bump/i);
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