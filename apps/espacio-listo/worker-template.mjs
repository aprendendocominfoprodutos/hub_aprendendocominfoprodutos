// Espacio Listo — Cloudflare Worker. Assets are injected by build.mjs.
const ASSETS = __ASSETS__;
const langs = {es:'Español',pt:'Português',en:'English',fr:'Français',ht:'Kreyòl ayisyen',nl:'Nederlands'};
const kinds = new Set(['agreement','inventory','labels','maintenance','blank','decisions','review']);
const cookie = r => Object.fromEntries((r.headers.get('cookie')||'').split(';').map(s=>s.trim().split('=')).filter(x=>x.length===2));
const hex = a => [...new Uint8Array(a)].map(x=>x.toString(16).padStart(2,'0')).join('');
const hash = async x => hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x)));
const random = () => {const a=new Uint8Array(32);crypto.getRandomValues(a);return btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');};
const same = (a,b) => {if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0;};
const q = (db,sql,...args) => db.prepare(sql).bind(...args).first();
const all = (db,sql,...args) => db.prepare(sql).bind(...args).all().then(x=>x.results);
const put = (db,sql,...args) => db.prepare(sql).bind(...args).run();
const response = (obj,status=200,extra={}) => new Response(JSON.stringify(obj),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...extra}});
const error = (status,msg) => response({error:msg},status);
const config = async db => Object.fromEntries((await all(db,'SELECT key,value FROM settings')).map(x=>[x.key,x.value]));
const audit = (db,user,action,target) => put(db,'INSERT INTO audit(actor,action,target) VALUES(?,?,?)',user.id,action,String(target));
const validMission = m => m && ['title','scope','sort','home','return','mini','habit'].every(k=>typeof m[k]==='string'&&m[k].trim().length>1&&m[k].length<=1200);
async function passwordHash(password,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:120000},key,256));}
async function userFor(req,db){const token=cookie(req).sid;if(!token)return null;return q(db,'SELECT u.id,u.email,u.name,u.role FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires>?',await hash(token),Date.now());}
async function entitled(db,user){return !!user&&(user.role==='owner'||!!await q(db,"SELECT id FROM entitlements WHERE user_id=? AND status='active' AND (expires IS NULL OR expires>?) LIMIT 1",user.id,Date.now()));}
const need = (user,admin=false) => !user?error(401,'Sessão necessária'):admin&&user.role!=='owner'?error(403,'Acesso administrativo negado'):null;
async function body(req,limit=100000){const text=await req.text();if(text.length>limit)throw Error('Corpo excede o limite');try{return JSON.parse(text||'{}')}catch{throw Error('JSON inválido')}}
const staticAsset = p => {const x=ASSETS[p];if(!x)return error(404,'Não encontrado');if(x.binary){const s=atob(x.body),b=new Uint8Array(s.length);for(let i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return new Response(b,{headers:{'content-type':x.type,'cache-control':'public, max-age=3600'}})}return new Response(x.body,{headers:{'content-type':x.type,'cache-control':'public, max-age=3600'}})};

async function handler(req,env){
 const db=env.DB,url=new URL(req.url),p=url.pathname,method=req.method,user=await userFor(req,db);
 if(!['GET','HEAD','OPTIONS'].includes(method)){const origin=req.headers.get('origin');if(origin&&origin!==url.origin)return error(403,'Origem inválida')}
 if(p==='/manifest.webmanifest'){const c=await config(db);return response({id:'/app',name:c.name,short_name:c.short_name,start_url:'/app',scope:'/',display:'standalone',background_color:'#07131F',theme_color:'#07131F',icons:[192,512].map(n=>({src:`/icons/current-${n}.png`,sizes:`${n}x${n}`,type:'image/png',purpose:'any maskable'}))},200,{'content-type':'application/manifest+json'})}
 if(p==='/api/login'&&method==='POST'){
  const x=await body(req),email=String(x.email||'').trim().toLowerCase(),password=String(x.password||'');
  if(password.length>200||email.length>254)return error(400,'Dados inválidos');
  const attemptKey=await hash(`${req.headers.get('CF-Connecting-IP')||'unknown'}:${email}`),attempt=await q(db,'SELECT count,reset FROM auth_attempts WHERE key=?',attemptKey);
  if(attempt&&attempt.reset>Date.now()&&attempt.count>=10)return error(429,'Muitas tentativas. Aguarde 15 minutos.');
  let target=await q(db,'SELECT * FROM users WHERE email=?',email),okay=false;
  if(target?.role==='owner')okay=same(await hash(password),env.OWNER_PASSWORD_HASH);
  else if(target?.password_hash){const [salt,expected]=target.password_hash.split(':');okay=same(await passwordHash(password,salt),expected)}
  if(!okay){await put(db,'INSERT INTO auth_attempts(key,count,reset) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN reset<? THEN 1 ELSE count+1 END,reset=CASE WHEN reset<? THEN excluded.reset ELSE reset END',attemptKey,Date.now()+900000,Date.now(),Date.now());return error(401,'Credenciais inválidas')}
  await put(db,'DELETE FROM auth_attempts WHERE key=?',attemptKey);
  const token=random();await put(db,'INSERT INTO sessions(token_hash,user_id,expires) VALUES(?,?,?)',await hash(token),target.id,Date.now()+7*86400000);
  return response({ok:true},200,{'set-cookie':`sid=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`});
 }
 if(p==='/api/activate'&&method==='POST'){
  const x=await body(req),token=String(x.token||''),password=String(x.password||'');
  if(token.length<32||password.length<12||password.length>200)return error(400,'Convite ou senha inválida');
  const invite=await q(db,'SELECT * FROM invites WHERE token_hash=? AND used=0 AND expires>?',await hash(token),Date.now());if(!invite)return error(403,'Convite expirado ou já utilizado');
  const salt=random(),digest=await passwordHash(password,salt);
  const consumed=await put(db,'UPDATE invites SET used=1 WHERE token_hash=? AND used=0 AND expires>?',await hash(token),Date.now());
  if(!consumed.meta.changes)return error(403,'Convite já utilizado');
  await put(db,'UPDATE users SET password_hash=? WHERE id=?',`${salt}:${digest}`,invite.user_id);
  return response({ok:true});
 }
 if(p==='/api/logout'&&method==='POST'){const token=cookie(req).sid;if(token)await put(db,'DELETE FROM sessions WHERE token_hash=?',await hash(token));return response({ok:true},200,{'set-cookie':'sid=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'})}
 if(p==='/api/me'){const c=await config(db);return response({user:user&&{id:user.id,name:user.name,role:user.role},entitled:await entitled(db,user),demo:false,settings:{name:c.name,short_name:c.short_name,checkout:c.checkout,icon_version:c.icon_version},languages:langs})}
 if(p==='/api/catalog'&&method==='GET'){
  if(need(user))return need(user);if(!await entitled(db,user))return error(403,'Acesso ao produto necessário');
  const lang=url.searchParams.get('lang')||'es';if(!langs[lang])return error(400,'Idioma inválido');
  const rows=await all(db,"SELECT m.id,m.sort_order,m.published,s.done,s.favorite,s.plan FROM missions m LEFT JOIN state s ON s.mission_id=m.id AND s.user_id=? WHERE m.lang=? AND m.status='published' ORDER BY m.sort_order,m.id",user.id,lang);
  return response({locale:JSON.parse((await q(db,'SELECT value FROM settings WHERE key=?',`locale_${lang}`)).value),items:rows.map(r=>({...JSON.parse(r.published),id:r.id,order:r.sort_order,done:!!r.done,favorite:!!r.favorite,plan:!!r.plan}))});
 }
 const mission=p.match(/^\/api\/mission\/(\d+)$/);
 if(mission&&method==='GET'){
  if(need(user))return need(user);if(!await entitled(db,user))return error(403,'Acesso necessário');
  const lang=url.searchParams.get('lang')||'es';if(!langs[lang])return error(400,'Idioma inválido');
  const id=Number(mission[1]),row=await q(db,"SELECT published FROM missions WHERE id=? AND lang=? AND status='published'",id,lang);if(!row)return error(404,'Missão indisponível');
  return response({...JSON.parse(row.published),id,state:await q(db,'SELECT done,favorite,plan,note FROM state WHERE user_id=? AND mission_id=?',user.id,id)||{done:0,favorite:0,plan:0,note:''},locale:JSON.parse((await q(db,'SELECT value FROM settings WHERE key=?',`locale_${lang}`)).value)});
 }
 if(mission&&method==='PUT'){
  if(need(user))return need(user);if(!await entitled(db,user))return error(403,'Acesso necessário');
  const id=Number(mission[1]),s=await body(req);
  if(!await q(db,"SELECT id FROM missions WHERE id=? AND status='published' LIMIT 1",id))return error(404,'Missão indisponível');
  if(typeof s.note!=='string'||s.note.length>1500||![0,1,true,false].includes(s.done)||![0,1,true,false].includes(s.favorite)||![0,1,true,false].includes(s.plan))return error(400,'Estado inválido');
  if(s.plan&&!(await q(db,'SELECT plan FROM state WHERE user_id=? AND mission_id=?',user.id,id))?.plan&&(await q(db,'SELECT count(*) n FROM state WHERE user_id=? AND plan=1',user.id)).n>=3)return error(409,'Plano limitado a três missões');
  await put(db,'INSERT INTO state(user_id,mission_id,done,favorite,plan,note) VALUES(?,?,?,?,?,?) ON CONFLICT(user_id,mission_id) DO UPDATE SET done=excluded.done,favorite=excluded.favorite,plan=excluded.plan,note=excluded.note,updated_at=CURRENT_TIMESTAMP',user.id,id,+s.done,+s.favorite,+s.plan,s.note);return response({ok:true});
 }
 if(p==='/api/tools'&&method==='GET'){if(need(user))return need(user);if(!await entitled(db,user))return error(403,'Acesso necessário');return response({tools:Object.fromEntries((await all(db,'SELECT kind,data FROM worksheets WHERE user_id=?',user.id)).map(x=>[x.kind,JSON.parse(x.data)]))})}
 const tool=p.match(/^\/api\/tools\/([a-z]+)$/);
 if(tool&&method==='PUT'){
  if(need(user))return need(user);if(!await entitled(db,user))return error(403,'Acesso necessário');if(!kinds.has(tool[1]))return error(400,'Ferramenta inválida');
  const x=await body(req,65000);if(!Array.isArray(x.entries)||x.entries.length>30||!x.entries.every(row=>row&&['a','b','c'].every(k=>typeof row[k]==='string'&&row[k].length<=800)))return error(400,'Registros inválidos');
  await put(db,'INSERT INTO worksheets(user_id,kind,data) VALUES(?,?,?) ON CONFLICT(user_id,kind) DO UPDATE SET data=excluded.data,updated_at=CURRENT_TIMESTAMP',user.id,tool[1],JSON.stringify(x.entries.map(({a,b,c})=>({a,b,c}))));return response({ok:true});
 }
 if(p==='/api/admin/missions'&&method==='GET'){
  if(need(user,true))return need(user,true);const lang=url.searchParams.get('lang')||'es';if(!langs[lang])return error(400,'Idioma inválido');
  return response({items:(await all(db,'SELECT id,draft,published,status,revision,sort_order FROM missions WHERE lang=? ORDER BY sort_order,id',lang)).map(r=>({...r,draft:JSON.parse(r.draft),published:r.published&&JSON.parse(r.published)}))});
 }
 if(p==='/api/admin/missions'&&method==='POST'){
  if(need(user,true))return need(user,true);const x=await body(req);if(!langs[x.lang]||!validMission(x.mission))return error(400,'Missão inválida');
  const id=(await q(db,'SELECT coalesce(max(id),0)+1 n FROM missions')).n,ord=(await q(db,'SELECT coalesce(max(sort_order),0)+1 n FROM missions WHERE lang=?',x.lang)).n;
  await put(db,"INSERT INTO missions(id,lang,draft,published,status,sort_order) VALUES(?,?,?,NULL,'draft',?)",id,x.lang,JSON.stringify(x.mission),ord);await audit(db,user,'create',`${x.lang}:${id}`);return response({id},201);
 }
 const adminMission=p.match(/^\/api\/admin\/mission\/(\d+)$/);
 if(adminMission&&method==='PUT'){
  if(need(user,true))return need(user,true);const x=await body(req),id=Number(adminMission[1]);if(!langs[x.lang]||!validMission(x.mission)||!Number.isInteger(x.revision))return error(400,'Missão inválida');
  const row=await q(db,'SELECT revision FROM missions WHERE id=? AND lang=?',id,x.lang);if(!row)return error(404,'Não encontrado');if(row.revision!==x.revision)return error(409,'Outra edição foi salva; recarregue');
  await put(db,'UPDATE missions SET draft=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE id=? AND lang=?',JSON.stringify(x.mission),id,x.lang);await audit(db,user,'edit',`${x.lang}:${id}`);return response({revision:row.revision+1});
 }
 const action=p.match(/^\/api\/admin\/mission\/(\d+)\/(publish|archive|restore|move)$/);
 if(action&&method==='POST'){
  if(need(user,true))return need(user,true);const {lang}=await body(req),id=Number(action[1]),op=action[2];if(!langs[lang])return error(400,'Idioma inválido');
  const row=await q(db,'SELECT draft,published,sort_order FROM missions WHERE id=? AND lang=?',id,lang);if(!row)return error(404,'Não encontrado');
  if(op==='publish')await put(db,"UPDATE missions SET published=draft,status='published',revision=revision+1 WHERE id=? AND lang=?",id,lang);
  else if(op==='archive')await put(db,"UPDATE missions SET status='archived',revision=revision+1 WHERE id=? AND lang=?",id,lang);
  else if(op==='restore')await put(db,'UPDATE missions SET draft=published,revision=revision+1 WHERE id=? AND lang=? AND published IS NOT NULL',id,lang);
  else {const other=await q(db,'SELECT id,sort_order FROM missions WHERE lang=? AND sort_order=?',lang,row.sort_order+(url.searchParams.get('direction')==='up'?-1:1));if(!other)return error(400,'Limite da ordem');await db.batch([db.prepare('UPDATE missions SET sort_order=? WHERE id=? AND lang=?').bind(-id,id,lang),db.prepare('UPDATE missions SET sort_order=? WHERE id=? AND lang=?').bind(row.sort_order,other.id,lang),db.prepare('UPDATE missions SET sort_order=?,revision=revision+1 WHERE id=? AND lang=?').bind(other.sort_order,id,lang)]);}
  await audit(db,user,op,`${lang}:${id}`);return response({ok:true});
 }
 if(p==='/api/admin/users'&&method==='GET'){
  if(need(user,true))return need(user,true);const search=(url.searchParams.get('q')||'').slice(0,80),offset=Math.max(0,Math.min(10000,Number(url.searchParams.get('offset')||0)||0));
  const rows=await all(db,'SELECT id,email,name,role FROM users WHERE email LIKE ? OR name LIKE ? ORDER BY name LIMIT 20 OFFSET ?',`%${search}%`,`%${search}%`,offset);
  return response({total:(await q(db,'SELECT count(*) n FROM users WHERE email LIKE ? OR name LIKE ?',`%${search}%`,`%${search}%`)).n,items:await Promise.all(rows.map(async u=>({...u,access:await entitled(db,u)})))});
 }
 if(p==='/api/admin/invites'&&method==='POST'){
  if(need(user,true))return need(user,true);const x=await body(req),email=String(x.email||'').trim().toLowerCase(),name=String(x.name||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||name.length<2||name.length>100)return error(400,'Nome ou e-mail inválido');
  let target=await q(db,'SELECT id,role FROM users WHERE email=?',email);if(target?.role==='owner')return error(400,'Usuário administrativo');
  if(!target){const id=crypto.randomUUID();await put(db,"INSERT INTO users(id,email,name,role) VALUES(?,?,?,'client')",id,email,name);target={id}}
  const token=random();await put(db,'INSERT INTO invites(token_hash,user_id,expires) VALUES(?,?,?)',await hash(token),target.id,Date.now()+7*86400000);
  await audit(db,user,'invite',target.id);return response({url:`${url.origin}/app#invite=${token}`,expires_days:7});
 }
 const access=p.match(/^\/api\/admin\/users\/([^/]+)\/access$/);
 if(access&&method==='POST'){
  if(need(user,true))return need(user,true);const target=decodeURIComponent(access[1]),x=await body(req);if(!await q(db,'SELECT id FROM users WHERE id=?',target)||target===user.id||!['grant','revoke','suspend'].includes(x.action))return error(400,'Ação inválida');
  if(x.action==='grant')await put(db,"INSERT INTO entitlements(user_id,source,status,expires) VALUES(?,'manual','active',NULL)",target);
  if(x.action==='revoke')await put(db,"UPDATE entitlements SET status='revoked' WHERE user_id=? AND source='manual' AND status='active'",target);
  if(x.action==='suspend')await put(db,"UPDATE entitlements SET status='suspended' WHERE user_id=? AND status='active'",target);
  await audit(db,user,x.action,target);return response({ok:true});
 }
 if(p==='/api/admin/settings'&&method==='GET'){
  if(need(user,true))return need(user,true);const c=await config(db);return response({name:c.name,short_name:c.short_name,checkout:c.checkout,icon_version:c.icon_version,webhook:{provider:'none',enabled:false,product:'',url:`${url.origin}/api/webhooks/hotmart`,status:'Desativado — sem autenticação e mapeamento verificados'},api:{enabled:false,reason:'Este produto não usa IA nem API externa.'},events:await all(db,'SELECT integration,event_id,status,created_at FROM webhook_events ORDER BY id DESC LIMIT 20'),audit:await all(db,'SELECT actor,action,target,created_at FROM audit ORDER BY id DESC LIMIT 20')});
 }
 if(p==='/api/admin/settings'&&method==='PUT'){
  if(need(user,true))return need(user,true);const x=await body(req);
  if(typeof x.name!=='string'||x.name.trim().length<3||x.name.length>60||typeof x.short_name!=='string'||x.short_name.length>30||typeof x.checkout!=='string'||x.checkout.length>500)return error(400,'Configuração inválida');
  if(x.checkout&&(!x.checkout.startsWith('https://')||/[\x00-\x1f]/.test(x.checkout)))return error(400,'Checkout deve ser HTTPS');
  for(const k of ['name','short_name','checkout'])await put(db,'UPDATE settings SET value=? WHERE key=?',x[k].trim(),k);
  await audit(db,user,'settings','identity/payment');return response({ok:true});
 }
 if(p.startsWith('/api/webhooks/'))return error(503,'Integração desativada; nenhum evento será aceito');
 if(p.startsWith('/api/'))return error(404,'API não encontrada');
 if(p==='/'||p==='/app'||p==='/admin')return staticAsset('/index.html');
 return staticAsset(p);
}
export default {async fetch(req,env){try{const r=await handler(req,env);const h=new Headers(r.headers);h.set('x-content-type-options','nosniff');h.set('referrer-policy','no-referrer');h.set('content-security-policy',"default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");return new Response(r.body,{status:r.status,headers:h})}catch(e){console.error(e);return error(e.message==='JSON inválido'||e.message?.includes('limite')?400:500,e.message==='JSON inválido'||e.message?.includes('limite')?e.message:'Falha interna')}}};
