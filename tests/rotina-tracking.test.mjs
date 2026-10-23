import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const base='public/mental-financeiro/mental/procrastinacao/mini-app/rotina-produtiva-pro/assets/';
const script=readFileSync(base+'tracking.js','utf8');
function setup({saved=null,storageFails=false}={}){
 const handlers={};const nodes={};const external=[];const replacements=[];
 for(const id of ['privacy-choice','privacy-status','privacy-accept','privacy-reject','privacy-settings']) nodes[id]={hidden:true,addEventListener(event,fn){handlers[id+event]=fn;}};
 const document={body:{dataset:{journey:'quiz'}},head:{append(e){external.push(e.src);}},getElementById:id=>nodes[id],createElement:tag=>({tag,addEventListener(){}}),addEventListener:(name,fn)=>{handlers[name]=fn;},querySelectorAll:()=>[]};
 const window={ROTINA_LAUNCH:{pixel:'1419582967021848',checkoutEnabled:false,checkout:'https://pay.hotmart.com/G108053232T?off=c6o6qy7a'},location:{href:'https://example.test/quiz/?utm_source=meta&utm_campaign=rotina_01&email=buyer%40example.test&utm_content=buyer%40example.test'},sessionStorage:{getItem(){if(storageFails)throw Error();return saved;},setItem(){}},history:{replaceState(...args){replacements.push(args[2]);}}};
 vm.runInNewContext(script,{window,document,URL,URLSearchParams});
 return {window,nodes,external,replacements,click:id=>handlers[id+'click'](),event:name=>handlers[name]()};
}
test('no Meta request before consent or after refusal, including unavailable storage',()=>{
 for(const options of [{},{saved:'denied'},{storageFails:true}]){const s=setup(options);assert.equal(s.external.length,0);s.click('privacy-reject');s.event('rotina:quiz-complete');assert.equal(s.external.length,0);assert.equal(s.window.fbq,undefined);assert.equal(s.replacements[0],'/quiz/?utm_source=meta&utm_campaign=rotina_01');}
});
test('consent loads one pixel; quiz events contain no answers; withdrawal stops subsequent events',()=>{
 const s=setup();s.click('privacy-accept');assert.equal(s.external.length,1);assert.equal(s.external[0],'https://connect.facebook.net/en_US/fbevents.js');s.event('rotina:quiz-complete');let events=s.window.fbq.queue.map(x=>Array.from(x));assert.ok(events.some(x=>x[0]==='init'&&x[1]==='1419582967021848'));assert.ok(events.some(x=>x[1]==='QuizComplete'));assert.ok(!JSON.stringify(events).includes('buyer'));assert.ok(!events.some(x=>x[1]==='Purchase'||x[1]==='InitiateCheckout'));s.click('privacy-settings');s.click('privacy-reject');const count=s.window.fbq.queue.length;s.event('rotina:quiz-complete');assert.equal(s.window.fbq.queue.length,count);s.click('privacy-accept');assert.equal(s.external.length,1);
});
test('the saved launch configuration prevents unfinished delivery from being sold',()=>{
 const window={};vm.runInNewContext(readFileSync(base+'launch-config.js','utf8'),{window});assert.equal(window.ROTINA_LAUNCH.checkoutEnabled,false);assert.equal(new URL(window.ROTINA_LAUNCH.checkout).searchParams.get('off'),'c6o6qy7a');
});


