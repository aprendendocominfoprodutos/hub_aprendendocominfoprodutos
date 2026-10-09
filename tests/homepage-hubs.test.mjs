import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {resolve,join} from "node:path";

const ROOT=resolve(".");
const home=await readFile(join(ROOT,"public/index.html"),"utf8");
const stylesheet=await readFile(join(ROOT,"public/src/arquitetura.css"),"utf8");

test("os três hubs são links únicos que ocupam seus cards",()=>{
  const cards=[...home.matchAll(/<a class="eco-hubcard(?: eco-(?:green|blue))?" href="([^"]+)">([\s\S]*?)<\/a>/g)];
  assert.equal(cards.length,3);
  assert.deepEqual(cards.map(c=>c[1]),[
    "/cultura-entretenimento/","/fitness-saude/","/mental-financeiro/"
  ]);
  for(const [,route,inside] of cards){
    assert.match(inside,/class="eco-hubscene"/);
    assert.match(inside,/class="eco-hubcontent"/);
    assert.match(inside,/class="eco-openhub"/);
    assert.doesNotMatch(inside,/<a\b|<button\b|onclick=/);
    assert.doesNotMatch(inside,/eco-nuclei|eco-nucleus/);
    assert.ok(route.startsWith("/") && route.endsWith("/"));
  }
  assert.doesNotMatch(home,/<article class="eco-hubcard/);
  assert.doesNotMatch(home,/class="eco-nucleus"/);
});
test("a página continua oferecendo acesso aos hubs e à landing Natal Prático",()=>{
  assert.match(home,/href="\/mental-financeiro\/financeiro\/renda-extra\/datas-comemorativas\/natal\/natal-pratico\/"/);
  assert.match(home,/id="materiais"/);
  assert.match(home,/src="\/assets\/home\/hub-cultura\.avif"/);
  assert.match(home,/src="\/assets\/home\/hub-fitness-atualizado\.avif"/);
  assert.match(home,/src="\/assets\/home\/hub-mental-mindset\.avif"/);
});
test("o card inteiro mostra estado interativo acessível via mouse e teclado",()=>{
  assert.match(stylesheet,/a\.eco-hubcard:hover/);
  assert.match(stylesheet,/a\.eco-hubcard:focus-visible/);
  assert.match(stylesheet,/a\.eco-hubcard\{color:inherit;text-decoration:none;cursor:pointer/);
  assert.match(stylesheet,/prefers-reduced-motion:reduce/);
});

test("nova arte de Cultura & Entretenimento é um AVIF real, leve e local",async()=>{
  const path=join(ROOT,"public/assets/home/hub-cultura.avif");
  const bytes=await readFile(path);
  assert.ok(bytes.length>5000 && bytes.length<60000,
    "a imagem deve estar presente e otimizada para o banner");
  assert.equal(bytes.toString("ascii",4,12),"ftypavif");
  assert.match(home,/alt="Panorama de cultura e geografia/);
  assert.match(home,/width="560" height="287"/);
});

test("banner Fitness & Saúde enviado é imagem AVIF local e otimizada",async()=>{
  const file=join(ROOT,"public/assets/home/hub-fitness-atualizado.avif");
  const bytes=await readFile(file);
  assert.ok(bytes.length>5000 && bytes.length<30000);
  assert.equal(bytes.toString("ascii",4,12),"ftypavif");
  assert.match(home,/alt="Fitness e saúde em ambiente premium/);
  assert.match(home,/width="560" height="287"/);
  assert.match(home,/<a class="eco-hubcard eco-green" href="\/fitness-saude\/"/);
});

test("o novo banner de Mental & Financeiro é local, otimizado e mantém o card clicável",async()=>{
  const file=join(ROOT,"public/assets/home/hub-mental-mindset.avif");
  const bytes=await readFile(file);
  assert.ok(bytes.length>5000 && bytes.length<30000);
  assert.equal(bytes.toString("ascii",4,12),"ftypavif");
  assert.match(home,/alt="Ambiente executivo com planejamento, metas/);
  assert.match(home,/width="560" height="287"/);
  assert.match(home,/<a class="eco-hubcard eco-blue" href="\/mental-financeiro\/"/);
});
