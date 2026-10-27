/* EVA traditional export integration. Purchase is emitted by Hotmart only. */
(() => {
  'use strict';
  const PIXEL_ID = '2522957624868295';
  const STORAGE_KEY = 'pilates-marketing-v1';
  const productId = document.body?.dataset?.productId || '8817226';
  const productValue = Number(document.body?.dataset?.productValue || 37);
  const campaignNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'];
  const current = new URL(window.location.href);
  const campaign = new URLSearchParams();
  campaignNames.forEach(name => {
    const value = current.searchParams.get(name);
    if (value && /^[a-zA-Z0-9_-]{1,150}$/.test(value)) campaign.set(name, value);
  });
  document.querySelectorAll('a[data-checkout]').forEach(link => {
    const destination = new URL(link.href);
    campaign.forEach((value, name) => destination.searchParams.set(name, value));
    link.href = destination.href;
  });
  // Remove arbitrary data before the optional Meta script can read the page URL.
  const safeLocation = new URL(current.href);
  safeLocation.search = campaign.toString();
  const clickId = current.searchParams.get('fbclid');
  if (clickId && /^[a-zA-Z0-9_.-]{1,512}$/.test(clickId)) safeLocation.searchParams.set('fbclid', clickId);
  window.history.replaceState(null, '', safeLocation.pathname + safeLocation.search + safeLocation.hash);
  const panel = document.getElementById('privacy-choice');
  const status = document.getElementById('privacy-status');
  let allowed = false;
  let initialized = false;
  let contentSent = false;
  let clickLatch = false;
  let choice = null;
  try { choice = window.sessionStorage.getItem(STORAGE_KEY); } catch {}
  const eventId = prefix => prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
  function track(name, prefix) {
    if (!allowed || typeof window.fbq !== 'function') return;
    window.fbq('track', name, {content_ids: [productId], content_type: 'product', currency: 'BRL', value: productValue}, {eventID: eventId(prefix)});
  }
  function checkContent() {
    if (document.body?.dataset?.noViewContent === 'true') return;
    if (!allowed || contentSent) return;
    const doc = document.documentElement;
    const remaining = doc.scrollHeight - doc.clientHeight;
    if (remaining > 0 && window.scrollY / remaining < 0.5) return;
    contentSent = true;
    track('ViewContent', 'vc50');
  }
  function enable() {
    allowed = true;
    if (initialized) { window.fbq('consent', 'grant'); return; }
    initialized = true;
    if (!window.fbq) {
      const queue = window.fbq = function () { queue.callMethod ? queue.callMethod.apply(queue, arguments) : queue.queue.push(arguments); };
      window._fbq = queue; queue.push = queue; queue.loaded = true; queue.version = '2.0'; queue.queue = [];
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.append(script);
    }
    window.fbq('consent', 'grant');
    window.fbq('set', 'autoConfig', false, PIXEL_ID);
    window.fbq('init', PIXEL_ID);
    track('PageView', 'pv');
    checkContent();
  }
  function choose(value) {
    try { window.sessionStorage.setItem(STORAGE_KEY, value); } catch {}
    if (value === 'granted') enable();
    else { allowed = false; if (window.fbq) window.fbq('consent', 'revoke'); }
    if (panel) panel.hidden = true;
    if (status) status.textContent = value === 'granted' ? 'Medição de anúncios ativada nesta sessão.' : 'Medição de anúncios desativada.';
  }
  document.getElementById('privacy-accept')?.addEventListener('click', () => choose('granted'));
  document.getElementById('privacy-reject')?.addEventListener('click', () => choose('denied'));
  document.getElementById('privacy-settings')?.addEventListener('click', () => { if (panel) panel.hidden = false; });
  window.addEventListener('scroll', checkContent, {passive: true});
  document.addEventListener('click', event => {
    const link = event.target?.closest?.('a[data-checkout]');
    if (!link || clickLatch || !allowed) return;
    clickLatch = true;
    track('InitiateCheckout', 'ic');
    window.setTimeout(() => { clickLatch = false; }, 800);
  }, true);
  if (choice === 'granted') choose('granted');
  else if (choice === 'denied') choose('denied');
  else if (panel) panel.hidden = false;
})();
