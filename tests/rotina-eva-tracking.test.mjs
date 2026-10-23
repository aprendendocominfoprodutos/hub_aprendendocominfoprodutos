import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const code=await readFile('public/mental-financeiro/mental/procrastinacao/mini-app/rotina-produtiva-pro/landingpage/assets/js/main.js','utf8');
function harness({choice=null,storageFails=false}={}) {
 const handlers={},listeners={},scripts=[],replacements=[],timers=[];
 const elements=Object.fromEntries(['privacy-choice','privacy-status','privacy-accept','privacy-reject','privacy-settings'].map(id=>[id,{hidden:true,textContent:'',addEventListener:(event,fn)=>{handlers[id+':'+event]=fn;}}]));
 const links=Array.from({length:4},()=>({href:'https://pay.hotmart.com/G108053232T?off=c6o6qy7a&checkoutMode=10'}));
 const window={location:{href:'https://www.aprendendocominfoprodutos.com.br/mental-financeiro/mental/procrastinacao/mini-app/rotina-produtiva-pro/landingpage/?utm_source=meta&off=incorreta&email=privado&fbclid=click123'},history:{replaceState:(_state,_title,url)=>replacements.push(url)},scrollY:0,
  sessionStorage:{getItem:()=>{if(storageFails)throw Error('blocked');return choice;},setItem:()=>{if(storageFails)throw Error('blocked');}},
  addEventListener:(name,fn)=>listeners[name]=fn,setTimeout:fn=>timers.push(fn)};
 const document={querySelectorAll:()=>links,getElementById:id=>elements[id],createElement:tag=>({tag}),head:{append:s=>scripts.push(s)},documentElement:{scrollHeight:2000,clientHeight:800},addEventListener:(name,fn)=>listeners['document:'+name]=fn};
 vm.runInNewContext(code,{window,document,URL,URLSearchParams,Date,Math});
 return {window,elements,links,scripts,replacements,click:id=>handlers[id+':click'](),scroll:y=>{window.scrollY=y;listeners.scroll();},checkout:()=>listeners['document:click']({target:{closest:()=>links[0]}}),calls:()=>window.fbq?.queue?.map(args=>Array.from(args))||[],timers};
}
test('EVA Pixel is absent before opt-in, after refusal, and when storage is blocked',()=>{
 for(const options of [{},{choice:'denied'},{storageFails:true}]){
  const h=harness(options); assert.equal(h.scripts.length,0);assert.equal(h.window.fbq,undefined);
  h.click('privacy-reject');h.scroll(1000);h.checkout();assert.equal(h.scripts.length,0);assert.equal(h.window.fbq,undefined);
 }
});
test('EVA consent initializes the correct Pixel once and sends content only at 50 percent',()=>{
 const h=harness();h.click('privacy-accept');h.click('privacy-accept');
 assert.equal(h.scripts.length,1);assert.equal(h.scripts[0].src,'https://connect.facebook.net/en_US/fbevents.js');
 assert.equal(h.calls().filter(c=>c[0]==='init'&&c[1]==='1419582967021848').length,1);
 assert.equal(h.calls().filter(c=>c[1]==='PageView').length,1);
 h.scroll(599);assert.equal(h.calls().filter(c=>c[1]==='ViewContent').length,0);
 h.scroll(600);h.scroll(1000);assert.equal(h.calls().filter(c=>c[1]==='ViewContent').length,1);
 h.checkout();h.checkout();assert.equal(h.calls().filter(c=>c[1]==='InitiateCheckout').length,1);
 assert.equal(h.calls().filter(c=>c[1]==='Purchase').length,0);
 h.click('privacy-reject');const count=h.calls().length;h.timers[0]();h.checkout();assert.equal(h.calls().length,count);
});
test('EVA campaign links pin the offer and never relay arbitrary personal fields',()=>{
 const h=harness();for(const link of h.links){const u=new URL(link.href);assert.equal(u.searchParams.get('off'),'c6o6qy7a');assert.equal(u.searchParams.get('checkoutMode'),'10');assert.equal(u.searchParams.get('utm_source'),'meta');assert.equal(u.searchParams.has('email'),false);}
 assert.equal(h.replacements.length,1);assert.doesNotMatch(h.replacements[0],/email|incorreta/);assert.match(h.replacements[0],/fbclid=click123/);
});
