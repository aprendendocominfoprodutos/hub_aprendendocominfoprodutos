import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";
const root=resolve(".");
const html=await readFile(join(root,"public/fitness-saude/index.html"),"utf8");
const css=await readFile(join(root,"public/src/fitness-editorial.css"),"utf8");

test("três cards fotográficos, cada qual com um único destino acessível",()=>{
 const cards=[...html.matchAll(/<a class="fit-editorial-card ([^"]+)" href="([^"]+)"[\s\S]*?<\/a>/g)];
 assert.equal(cards.length,3);
 assert.deepEqual(cards.map(x=>x[2]),[
  "/fitness-saude/fitness/","/fitness-saude/saude/","/fitness-saude/alimentacao/"
 ]);
 for(const card of cards){
   assert.match(card[0],/class="fit-editorial-art"/);
   assert.match(card[0],/class="fit-editorial-status"/);
   assert.match(card[0],/Disponível/);
   assert.match(card[0],/class="fit-editorial-caption"/);
   assert.doesNotMatch(card[0].slice(3),/<a\b|<button\b|onclick=/);
 }
 assert.match(html,/class="fit-editorial-future"/);
 assert.match(html,/Beleza & Autocuidado/);
 assert.match(html,/Categoria planejada, ainda sem produto publicado/);
 assert.doesNotMatch(html,/eco-cardgrid|eco-subnav|eco-topic-green/);
});

test("fotos seguem estética do Canva em arquivo AVIF otimizado",async()=>{
 const bytes=await readFile(join(root,"public/assets/fitness-saude/cards-editoriais.avif"));
 assert.ok(bytes.length>4000 && bytes.length<25000,"sprite de três cards precisa ser leve");
 assert.equal(bytes.toString("ascii",4,12),"ftypavif");
 assert.match(css,/cards-editoriais\.avif/);
 assert.match(css,/background-size:300% 100%/);
 for(const position of ["0% 50%","50% 50%","100% 50%"])assert.ok(css.includes(position));
});

test("estilo editorial responsivo, com hover e foco de teclado",()=>{
 assert.match(html,/href="\/src\/fitness-editorial\.css"/);
 assert.match(css,/fit-editorial-card:hover/);
 assert.match(css,/fit-editorial-card:focus-visible/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(html,/FITNESS/);
 assert.match(html,/SAÚDE/);
 assert.match(html,/ALIMENTAÇÃO/);
});
