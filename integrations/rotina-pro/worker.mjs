import { timingSafeEqual } from 'node:crypto';

const PRODUCTS = new Set([8741427,8791462,8791470,8791473,8791476]);
const STATES = Object.freeze({PURCHASE_APPROVED:'approved',PURCHASE_COMPLETE:'approved',PURCHASE_REFUNDED:'refunded',PURCHASE_CHARGEBACK:'chargeback',PURCHASE_CANCELED:'canceled',PURCHASE_PROTEST:'disputed',PURCHASE_DELAYED:'pending',PURCHASE_BILLET_PRINTED:'pending',PURCHASE_EXPIRED:'expired'});
const MAX_BODY=262144;
const encoder=new TextEncoder();
const reply=(data,status=200)=>Response.json(data,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
async function digest(value){return new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value)));}
async function secretMatches(actual,expected){
  if(!actual || !expected || actual.length>512)return false;
  const [a,b]=await Promise.all([digest(actual),digest(expected)]);
  return timingSafeEqual(a,b);
}
async function limitedJson(request){
  if(Number(request.headers.get('content-length')||0)>MAX_BODY)throw new RangeError('body');
  const reader=request.body?.getReader();if(!reader)throw new SyntaxError('body');
  const chunks=[];let size=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BODY){await reader.cancel();throw new RangeError('body');}chunks.push(value);}}
  finally{reader.releaseLock();}
  const bytes=new Uint8Array(size);let pos=0;for(const c of chunks){bytes.set(c,pos);pos+=c.byteLength;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
export default {
  async fetch(request,env){
    const path=new URL(request.url).pathname;
    if(path==='/health' && request.method==='GET')return reply({service:'rotina-pro-events',ready:Boolean(env.DB&&env.HOTMART_HOTTOK),mode:'purchase-ledger',version:1});
    if(path!=='/webhooks/hotmart')return reply({error:'not_found'},404);
    if(request.method!=='POST')return reply({error:'method'},405);
    if(!env.DB||!env.HOTMART_HOTTOK)return reply({error:'not_configured'},503);
    if(!await secretMatches(request.headers.get('X-HOTMART-HOTTOK'),env.HOTMART_HOTTOK))return reply({error:'unauthorized'},401);
    if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))return reply({error:'content_type'},415);
    let event;
    try{event=await limitedJson(request);}catch(e){return reply({error:e instanceof RangeError?'body_too_large':'invalid_json'},e instanceof RangeError?413:400);}
    if(event?.version!=='2.0.0')return reply({error:'version'},400);
    const product=event?.data?.product,purchase=event?.data?.purchase;
    if(!PRODUCTS.has(product?.id))return reply({ignored:'product'});
    const state=STATES[event.event];if(!state)return reply({ignored:'event'});
    if(typeof event.id!=='string'||event.id.length<1||event.id.length>200||!Number.isSafeInteger(event.creation_date)||event.creation_date<0||typeof purchase?.transaction!=='string'||purchase.transaction.length<3||purchase.transaction.length>200)return reply({error:'invalid_event'},400);
    if(state==='approved'&&!['APPROVED','COMPLETE'].includes(purchase.status))return reply({error:'status_mismatch'},400);
    const tx=await digest(purchase.transaction);
    const txHash=Array.from(tx,x=>x.toString(16).padStart(2,'0')).join('');
    const amount=purchase.price?.value;
    const cents=typeof amount==='number'&&Number.isFinite(amount)&&amount>=0&&amount<1e8?Math.round(amount*100):null;
    const currency=/^[A-Z]{3}$/.test(purchase.price?.currency_value||'')?purchase.price.currency_value:null;
    // No buyer name, email, phone, address, payment details or raw payload are retained.
    const test=request.headers.get('X-Rotina-Test')==='1'?1:0;
    try{
      const r=await env.DB.prepare('INSERT OR IGNORE INTO events(event_id,created_ms,received_ms,product_id,event_type,transaction_hash,state,value_cents,currency,test_event) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)').bind(event.id,event.creation_date,Date.now(),product.id,event.event,txHash,state,cents,currency,test).run();
      return reply({received:true,duplicate:r.meta.changes===0});
    }catch{console.error(JSON.stringify({service:'rotina-pro-events',error:'storage_failed'}));return reply({error:'storage_failed'},503);}
  }
};
