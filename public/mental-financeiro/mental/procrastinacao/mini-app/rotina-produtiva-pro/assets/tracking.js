(() => {
  'use strict';
  const config = window.ROTINA_LAUNCH;
  if (!config) return;
  const key = 'rotina-marketing-v1';
  let granted = false;
  let initialized = false;
  let choice = null;
  const clean = new URL(window.location.href);
  const campaign = new URLSearchParams();
  // Campaign names only: never forward arbitrary query parameters or quiz answers.
  for (const name of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value = clean.searchParams.get(name);
    if (value && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(value)) campaign.set(name,value);
  }
  clean.search = campaign.toString();
  clean.hash = '';
  window.history.replaceState(null,'',clean.pathname + clean.search);
  try { choice = window.sessionStorage.getItem(key); } catch {}
  const banner = document.getElementById('privacy-choice');
  const status = document.getElementById('privacy-status');
  function enable() {
    granted = true;
    if (initialized) { window.fbq('consent','grant'); return; }
    initialized = true;
    // Existing site's Meta bootstrap; loaded only after the visitor's opt-in.
    if (!window.fbq) {
      const queue = window.fbq = function(){queue.callMethod ? queue.callMethod.apply(queue,arguments) : queue.queue.push(arguments);};
      window._fbq = queue; queue.push = queue; queue.loaded = true; queue.version = '2.0'; queue.queue = [];
      const script = document.createElement('script'); script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.append(script);
    }
    window.fbq('consent','grant');
    window.fbq('set','autoConfig',false,config.pixel);
    window.fbq('init',config.pixel);
    window.fbq('track','PageView');
    window.fbq('track','ViewContent',{content_ids:['8741427'],content_type:'product',currency:'BRL',value:47});
  }
  function choose(value) {
    choice = value;
    try { window.sessionStorage.setItem(key,value); } catch {}
    if (value === 'granted') enable();
    else { granted = false; if (window.fbq) window.fbq('consent','revoke'); }
    if (banner) banner.hidden = true;
    if (status) status.textContent = value === 'granted' ? 'Medição de anúncios ativada nesta sessão.' : 'Medição de anúncios desativada.';
  }
  document.getElementById('privacy-accept')?.addEventListener('click',()=>choose('granted'));
  document.getElementById('privacy-reject')?.addEventListener('click',()=>choose('denied'));
  document.getElementById('privacy-settings')?.addEventListener('click',()=>{if(banner) banner.hidden=false;});
  if (choice === 'granted') { enable(); if (status) status.textContent = 'Medição de anúncios ativada nesta sessão.'; }
  else if (!choice && banner) banner.hidden = false;
  if (choice === 'denied' && status) status.textContent = 'Medição de anúncios desativada.';
  const track = (name) => { if (granted) window.fbq('trackCustom',name,{journey:document.body.dataset.journey}); };
  document.addEventListener('rotina:quiz-start',()=>track('QuizStart'));
  document.addEventListener('rotina:quiz-complete',()=>track('QuizComplete'));
  const allowedCheckout = new URL(config.checkout);
  if (config.checkoutEnabled && allowedCheckout.origin === 'https://pay.hotmart.com' && allowedCheckout.pathname === '/G108053232T' && allowedCheckout.searchParams.get('off') === '6bol81js') {
    document.querySelectorAll('[data-checkout]').forEach(button=>{
      const link = document.createElement('a'); link.className = button.className; link.textContent = 'Quero o app + 2 bônus por R$47 →';
      for (const [name,value] of campaign) allowedCheckout.searchParams.set(name,value);
      allowedCheckout.searchParams.set('src',document.body.dataset.journey === 'quiz' ? 'rotina_quiz' : 'rotina_landing');
      link.href = allowedCheckout.href; button.replaceWith(link);
      link.addEventListener('click',()=>track('CheckoutClick'));
    });
    document.querySelectorAll('[data-launch-note]').forEach(e=>e.hidden=true);
  }
  // Purchase is deliberately emitted by Hotmart, never by a public thank-you URL.
})();
