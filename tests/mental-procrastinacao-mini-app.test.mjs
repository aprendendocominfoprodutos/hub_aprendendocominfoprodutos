import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";
import regionalWorker from "../worker/index.mjs";

const ROOT=resolve(".");
const mental="/mental-financeiro/mental/";
const root=mental+"procrastinacao/";
const mini=root+"mini-app/";
const app=mini+"rotina-produtiva-pro/";
const landing=app+"landingpage/";
const quiz=app+"quiz/";
const oldQuiz=mini+"quiz/rotina-produtiva-pro/";
const oldLanding=mini+"landingpage/rotina-produtiva-pro/";
const html=async path=>readFile(join(ROOT,"public",path,"index.html"),"utf8");
const oldRoutes=[
 [mini+"quiz/",quiz],
 [oldQuiz,quiz],
 [mini+"landingpage/",landing],
 [oldLanding,landing]
];

test("Mental preserva os contêineres originais e apresenta Procrastinação",async()=>{
 const page=await html(mental);
 for(const name of ["Inteligência","Autoestima","Relacionamento","Ansiedade"])assert.ok(page.includes("<h3>"+name+"</h3>"));
 assert.equal((page.match(/<h3>Procrastinação<\/h3>/g)||[]).length,1);
 assert.ok(page.includes('href="'+root+'"'));
});

test("Procrastinação contém um contêiner Mini App que mantém a categoria",async()=>{
 const page=await html(root);
 assert.match(page,/<h1>Procrastinação<\/h1>/);
 assert.ok(page.includes('href="'+mini+'"'));
 assert.equal((page.match(/<h3>Mini App<\/h3>/g)||[]).length,1);
});

test("Mini App mostra somente o contêiner Rotina Produtiva Pro",async()=>{
 const page=await html(mini);
 assert.match(page,/<h1>Mini App<\/h1>/);
 assert.ok(page.includes('href="'+app+'"'));
 assert.equal((page.match(/<h3>Rotina Produtiva Pro<\/h3>/g)||[]).length,1);
 assert.doesNotMatch(page,/<h3>(?:Landingpage|Quiz)<\/h3>/);
 assert.doesNotMatch(page,/<a\b[^>]*href="[^"]*\/(?:landingpage|quiz)\/"/);
 const cards=[...page.matchAll(/<a class="card mental-pro-card"[^>]*>([\s\S]*?)<\/a>/g)];
 assert.equal(cards.length,1);
 assert.doesNotMatch(cards[0][1],/<a\b|<button\b|onclick=/);
});

test("dentro do app aparecem exatamente dois contêineres Landingpage e Quiz",async()=>{
 const page=await html(app);
 assert.match(page,/<h1>Rotina Produtiva Pro<\/h1>/);
 assert.ok(page.includes('href="'+landing+'"'));
 assert.ok(page.includes('href="'+quiz+'"'));
 assert.equal((page.match(/<h3>Landingpage<\/h3>/g)||[]).length,1);
 assert.equal((page.match(/<h3>Quiz<\/h3>/g)||[]).length,1);
 const cards=[...page.matchAll(/<a class="card mental-pro-card mental-pro-option"[^>]*>([\s\S]*?)<\/a>/g)];
 assert.equal(cards.length,2);
 for(const [,inside] of cards)assert.doesNotMatch(inside,/<a\b|<button\b|onclick=/);
 assert.doesNotMatch(page,/pay\.hotmart\.com|hotmart__button-checkout/);
});

test("Landingpage fica sob o app como reserva independente sem checkout",async()=>{
 const page=await html(landing);
 assert.match(page,/<h1>Landingpage<\/h1>/);
 assert.match(page,/LANDINGPAGE EM PREPARAÇÃO/);
 assert.ok(page.includes('href="'+quiz+'"'));
 assert.match(page,/noindex,follow/);
 assert.doesNotMatch(page,/fbq\(|pay\.hotmart\.com|hotmart__button-checkout/i);
});

test("Quiz funcional fica sob o app preservando todo o Pixel e checkout",async()=>{
 const page=await html(quiz);
 assert.ok(page.length>90000);
 assert.match(page,/<title>Rotina Produtiva Pro<\/title>/);
 assert.match(page,/QUIZ SCREENS/);
 assert.ok(page.includes("pay.hotmart.com/G108053232T"));
 assert.ok(page.includes("1419582967021848"));
 assert.doesNotMatch(page,/2934381596914907/);
 assert.match(page,/noindex/);
});

test("quatro endereços anteriores redirecionam e não duplicam quiz ou LP",async()=>{
 for(const [old,target] of oldRoutes){
  const page=await html(old);
  assert.ok(page.length<2500,old);
  assert.ok(page.includes('<link rel="canonical" href="'+target+'">'));
  assert.ok(page.includes('content="0;url='+target+'"'));
  assert.match(page,/location\.search\+location\.hash/);
  assert.doesNotMatch(page,/fbq\(|pay\.hotmart\.com/);
 }
});

test("Worker preserva campanhas nos redirecionamentos, porém NÃO redireciona a home do app",async()=>{
 const mock={ASSETS:{fetch:async request=>new Response(new URL(request.url).pathname,{status:200})}};
 const host="https://www.aprendendocominfoprodutos.com.br";
 for(const [old,target] of oldRoutes){
  for(const route of [old,old.slice(0,-1)]){
   const res=await regionalWorker.fetch(new Request(host+route+"?utm_source=meta&utm_campaign=app01"),mock);
   assert.equal(res.status,308,route);
   const to=new URL(res.headers.get("location"));
   assert.equal(to.pathname,target);
   assert.equal(to.searchParams.get("utm_source"),"meta");
   assert.equal(to.searchParams.get("utm_campaign"),"app01");
  }
 }
 const response=await regionalWorker.fetch(new Request(host+app+"?utm_source=site"),mock);
 assert.equal(response.status,200);
 assert.equal(await response.text(),app);
 const direct=await regionalWorker.fetch(new Request(host+quiz),mock);
 assert.equal(direct.status,200);
});

test("atalho histórico do produto vai direto para o quiz sem perder parâmetros",async()=>{
 const alias=await html("/mental-financeiro/Rotina-Produtiva-Pro/");
 assert.ok(alias.includes('<link rel="canonical" href="'+quiz+'">'));
 assert.ok(alias.includes('content="0;url='+quiz+'"'));
 assert.match(alias,/location\.search\+location\.hash/);
});

test("grafia antiga procastinacao continua compatível",async()=>{
 const alias=await html(mental+"procastinacao/");
 assert.ok(alias.includes('<link rel="canonical" href="'+root+'">'));
 assert.ok(alias.includes('content="0;url='+root+'"'));
});

test("cards do app são responsivos e seguem paleta Mental & Financeiro",async()=>{
 const css=await readFile(join(ROOT,"public/src/mental-mini-app.css"),"utf8");
 for(const color of ["#0b2127","#b8f06e","#e8c77e"])assert.ok(css.includes(color));
 assert.match(css,/a\.mental-pro-card:focus-visible/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/\.mental-pro-list\.mental-pro-options\{grid-template-columns:repeat\(2/);
 assert.match(css,/@media\(max-width:680px\)/);
 assert.match(css,/\.mental-pro-list\.mental-pro-options\{grid-template-columns:1fr\}/);
});
