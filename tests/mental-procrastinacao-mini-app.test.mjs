import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";

const ROOT=resolve(".");
const mental="/mental-financeiro/mental/";
const root=mental+"procrastinacao/";
const mini=root+"mini-app/";
const product=mini+"rotina-produtiva-pro/";
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

test("Mini App contém um card inteiro para Rotina Produtiva Pro",async()=>{
  const page=await html(mini);
  assert.match(page,/<h1>Mini App<\/h1>/);
  assert.ok(page.includes('href="'+product+'"'));
  assert.equal((page.match(/<h3>Rotina Produtiva Pro<\/h3>/g)||[]).length,1);
  assert.match(page,/EM PREPARAÇÃO|EM PREPARAÇÃO|ÁREA EM PREPARAÇÃO/);
});

test("Rotina Produtiva Pro tem URL definitiva reservada, sem acesso ou checkout anunciado",async()=>{
  const page=await html(product);
  assert.match(page,/<h1>Rotina Produtiva Pro<\/h1>/);
  assert.match(page,/noindex,follow/);
  assert.ok(page.includes('href="'+mini+'"'));
  assert.match(page,/EM PREPARAÇÃO/);
  assert.doesNotMatch(page,/pay\.hotmart|hotmart__button-checkout|<iframe|fbq\(|Comprar agora|R\$ ?36,90|R\$ ?19,90/i);
});

test("grafia procastinacao redireciona para procrastinacao",async()=>{
  const alias=await html(mental+"procastinacao/");
  assert.ok(alias.includes('<link rel="canonical" href="'+root+'">'));
  assert.ok(alias.includes('content="0;url='+root+'"'));
  assert.match(alias,/noindex,follow/);
});

test("contêineres utilizam paleta oficial e acessibilidade sem alterar o restante do portal",async()=>{
  const css=await readFile(join(ROOT,"public/src/mental-mini-app.css"),"utf8");
  for(const color of ["#0b2127","#b8f06e","#e8c77e"])assert.ok(css.includes(color));
  assert.match(css,/a\.mental-pro-card:focus-visible/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.match(css,/@media\(max-width:680px\)/);
});
