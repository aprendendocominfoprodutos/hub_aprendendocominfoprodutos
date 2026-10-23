import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";
import regionalWorker from "../worker/index.mjs";

const ROOT=resolve(".");
const mental="/mental-financeiro/mental/";
const root=mental+"procrastinacao/";
const mini=root+"mini-app/";
const landing=mini+"landingpage/";
const quiz=mini+"quiz/";
const original=mini+"rotina-produtiva-pro/";
const product=quiz+"rotina-produtiva-pro/";
const html=async path=>readFile(join(ROOT,"public",path,"index.html"),"utf8");

test("Mental mantém os quatro nichos anteriores e acrescenta contêiner Procrastinação",async()=>{
  const page=await html(mental);
  for(const name of ["Inteligência","Autoestima","Relacionamento","Ansiedade"])
    assert.match(page,new RegExp("<h3>"+name+"</h3>"));
  assert.equal((page.match(/<h3>Procrastinação<\/h3>/g)||[]).length,1);
  assert.ok(page.includes('href="'+root+'"'));
  assert.match(page,/aria-label="Explorar a categoria Procrastinação"/);
  assert.ok(page.includes('href="/src/mental-mini-app.css"'));
});

test("Procrastinação contém um card clicável Mini App e não vende produto",async()=>{
  const page=await html(root);
  assert.match(page,/<h1>Procrastinação<\/h1>/);
  assert.ok(page.includes('href="'+mini+'"'));
  assert.match(page,/<h3>Mini App<\/h3>/);
  const cards=[...page.matchAll(/<a class="card mental-pro-card"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(cards.length,1);
  assert.doesNotMatch(cards[0][1],/<a\b|<button\b|onclick=/);
  assert.match(page,/noindex,follow/);
});

test("Mini App apresenta exatamente dois contêineres clicáveis: Landingpage e Quiz",async()=>{
  const page=await html(mini);
  assert.match(page,/<h1>Mini App<\/h1>/);
  assert.ok(page.includes('href="'+landing+'"'));
  assert.ok(page.includes('href="'+quiz+'"'));
  assert.equal((page.match(/<h3>Landingpage<\/h3>/g)||[]).length,1);
  assert.equal((page.match(/<h3>Quiz<\/h3>/g)||[]).length,1);
  assert.doesNotMatch(page,/href="\/mental-financeiro\/mental\/procrastinacao\/mini-app\/rotina-produtiva-pro\/"/);
  const cards=[...page.matchAll(/<a class="card mental-pro-card mental-pro-option"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(cards.length,2);
  for(const [,content] of cards)assert.doesNotMatch(content,/<a\b|<button\b|onclick=/);
});

test("Landingpage possui categoria e endereço próprio de Rotina Produtiva Pro sem quiz duplicado",async()=>{
  const category=await html(landing);
  assert.match(category,/<h1>Landingpage<\/h1>/);
  assert.ok(category.includes('href="'+landing+'rotina-produtiva-pro/"'));
  assert.match(category,/<h3>Rotina Produtiva Pro<\/h3>/);
  const preview=await html(landing+"rotina-produtiva-pro/");
  assert.match(preview,/LANDINGPAGE EM PREPARAÇÃO/);
  assert.match(preview,/noindex,follow/);
  assert.ok(preview.includes('href="'+quiz+'"'));
  assert.doesNotMatch(preview,/fbq\(|pay\.hotmart\.com|hotmart__button-checkout/i);
});

test("Quiz possui categoria exclusiva com o contêiner Rotina Produtiva Pro",async()=>{
  const category=await html(quiz);
  assert.match(category,/<h1>Quiz<\/h1>/);
  assert.ok(category.includes('href="'+product+'"'));
  assert.equal((category.match(/<h3>Rotina Produtiva Pro<\/h3>/g)||[]).length,1);
  assert.match(category,/QUIZ DISPONÍVEL/);
});

test("Quiz real fica em Quiz/Rotina Produtiva Pro com conteúdo, pixel e checkout intactos",async()=>{
  const page=await html(product);
  assert.ok(page.length>90000,"arquivo integral do quiz não pode ser perdido");
  assert.match(page,/<title>Rotina Produtiva Pro<\/title>/);
  assert.match(page,/QUIZ SCREENS/);
  assert.match(page,/noindex/i);
  assert.ok(page.includes("pay.hotmart.com/G108053232T"));
  assert.ok(page.includes("1419582967021848"));
  assert.doesNotMatch(page,/2934381596914907/);
  const old=await html(original);
  assert.ok(old.length<2500);
  assert.ok(old.includes('<link rel="canonical" href="'+product+'">'));
  assert.ok(old.includes('content="0;url='+product+'"'));
  assert.match(old,/location\.search\+location\.hash/);
  assert.doesNotMatch(old,/fbq\(|pay\.hotmart\.com/);
});

test("redirecionamento no servidor para endereço do Quiz usa 308 e preserva UTMs",async()=>{
  const mock={ASSETS:{fetch:async request=>new Response(new URL(request.url).pathname,{status:200})}};
  const host="https://www.aprendendocominfoprodutos.com.br";
  for(const old of [original,original.slice(0,-1)]){
    const response=await regionalWorker.fetch(new Request(host+old+"?utm_source=meta&utm_campaign=quiz01"),mock);
    assert.equal(response.status,308);
    const location=new URL(response.headers.get("location"));
    assert.equal(location.pathname,product);
    assert.equal(location.searchParams.get("utm_source"),"meta");
    assert.equal(location.searchParams.get("utm_campaign"),"quiz01");
  }
  const q=await regionalWorker.fetch(new Request(host+product),mock);
  assert.equal(q.status,200,"quiz no novo endereço deve abrir sem redirecionamento");
});

test("atalho histórico Rotina-Produtiva-Pro aponta direto ao Quiz na URL definitiva",async()=>{
  const alias=await html("/mental-financeiro/Rotina-Produtiva-Pro/");
  assert.ok(alias.includes('<link rel="canonical" href="'+product+'">'));
  assert.ok(alias.includes('content="0;url='+product+'"'));
  assert.match(alias,/location\.search\+location\.hash/);
});

test("grafia procastinacao redireciona para procrastinacao",async()=>{
  const alias=await html(mental+"procastinacao/");
  assert.ok(alias.includes('<link rel="canonical" href="'+root+'">'));
  assert.ok(alias.includes('content="0;url='+root+'"'));
  assert.match(alias,/noindex,follow/);
});

test("contêineres Landingpage e Quiz têm duas colunas adaptáveis e cores oficiais",async()=>{
  const css=await readFile(join(ROOT,"public/src/mental-mini-app.css"),"utf8");
  for(const color of ["#0b2127","#b8f06e","#e8c77e"])assert.ok(css.includes(color));
  assert.match(css,/a\.mental-pro-card:focus-visible/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.match(css,/\.mental-pro-list\.mental-pro-options\{grid-template-columns:repeat\(2/);
  assert.match(css,/@media\(max-width:680px\)/);
  assert.match(css,/\.mental-pro-list\.mental-pro-options\{grid-template-columns:1fr\}/);
});
