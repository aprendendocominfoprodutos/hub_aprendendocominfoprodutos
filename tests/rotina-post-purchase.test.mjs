import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const root='public/mental-financeiro/mental/procrastinacao/mini-app/rotina-produtiva-pro/';
const code=await readFile(root+'assets/post-purchase.js','utf8');
test('published post-purchase pages use the exact official widget and preserve offer prices',async()=>{
 for(const [step,price] of [['upsell','37'],['downsell','27']]){
  const html=await readFile(root+step+'/index.html','utf8');
  assert.match(html,/<span>R\$<\/span> /);
  assert.ok(html.includes('<span>R$</span> '+price));
  assert.match(html,/id="hotmart-sales-funnel"/);
  assert.match(html,/https:\/\/checkout.hotmart.com\/lib\/hotmart-checkout-elements.js/);
  assert.doesNotMatch(html,/launch-config|disabled|OFERTA EM PREPARAÇÃO|data-pending-widget|pay.hotmart.com/);
 }
 const thanks=await readFile(root+'obrigado/index.html','utf8');
 assert.match(thanks,/não comprova pagamento e não libera acesso/);
 assert.doesNotMatch(thanks,/estão em preparação|OFERTA EM PREPARAÇÃO|\.pdf["']/);
});
test('widget mounts once and delegates decisions to Hotmart without simulating payment',()=>{
 const calls=[];const node={dataset:{}};const status={textContent:''};
 const context={document:{getElementById:()=>node,querySelector:()=>status},window:{checkoutElements:{init:type=>{calls.push(type);return {mount:target=>calls.push(target)};}}}};
 vm.runInNewContext(code,context);vm.runInNewContext(code,context);
 assert.deepEqual(calls,['salesFunnel','#hotmart-sales-funnel']);
 assert.doesNotMatch(code,/fbq\(|fetch\(|location\.|pay\.hotmart\.com/);
});
test('unavailable SDK displays guidance without a replacement payment or decline link',()=>{
 const status={textContent:''};const node={dataset:{}};
 vm.runInNewContext(code,{document:{getElementById:()=>node,querySelector:()=>status},window:{}});
 assert.match(status.textContent,/não estão disponíveis/);
 assert.equal(node.dataset.hotmartMounted,undefined);
});
