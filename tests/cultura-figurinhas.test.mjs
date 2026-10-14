import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";

const ROOT=resolve(".");
const BASE="/cultura-entretenimento/";
const root=await readFile(join(ROOT,"public/cultura-entretenimento/index.html"),"utf8");
const child=await readFile(join(ROOT,"public/cultura-entretenimento/figurinhas/index.html"),"utf8");
const css=await readFile(join(ROOT,"public/src/figurinhas-cultura.css"),"utf8");

test("hub Cultura mantém três contêineres anteriores e adiciona Figurinhas uma só vez",()=>{
  for(const name of ["Mitologia","Geografia & Bandeiras","História & Curiosidades"])
    assert.ok(root.includes("<h2>"+name+"</h2>"),name+" precisa permanecer");
  assert.equal((root.match(/<h2>Figurinhas<\/h2>/g)||[]).length,1);
  assert.equal((root.match(/class="eco-topic/g)||[]).length,4);
  assert.ok(root.includes('href="'+BASE+'figurinhas/"'));
  assert.match(root,/class="eco-topic eco-sticker-topic"/);
  assert.match(root,/aria-label="Explorar Figurinhas/);
  const markup=root.match(/<a class="eco-topic eco-sticker-topic"[^>]*>([\s\S]*?)<\/a>/);
  assert.ok(markup,"card Figurinhas totalmente clicável");
  assert.doesNotMatch(markup[1],/<a\b|<button\b|onclick=/);
});

test("novo contêiner é totalmente clicável e possui estilo visual responsivo",()=>{
  assert.match(root,/href="\/src\/figurinhas-cultura\.css"/);
  assert.match(css,/a\.eco-sticker-topic:hover/);
  assert.match(css,/a\.eco-sticker-topic:focus-visible/);
  assert.match(css,/@media\(max-width:700px\)/);
  assert.match(css,/grid-template-columns:1fr/);
  for(const color of ["#e8c77e","#121e34","#b88a57"])assert.ok(css.includes(color));
});

test("rota Figurinhas existe, é exclusiva e não anuncia mini app ou venda publicados",()=>{
  assert.match(child,/<h1>Figurinhas para/);
  assert.match(child,/Cultura & Entretenimento/);
  assert.match(child,/noindex,follow/);
  assert.match(child,/projeto em preparação|em preparação/i);
  assert.match(child,/href="\/cultura-entretenimento\/"/);
  assert.doesNotMatch(child,/hotmart__button-checkout|pay\.hotmart|fbq\(|<form|<iframe/i);
  assert.doesNotMatch(root,/R\$ ?36,90|R\$ ?19,90|Comprar agora/i);
});
