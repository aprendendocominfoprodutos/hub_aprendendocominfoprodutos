(() => {
  if (!window.ROTINA_LAUNCH?.postPurchaseEnabled) return;
  const container = document.getElementById('hotmart-sales-funnel');
  if (!container) return;
  // Exact widget supplied by the Hotmart account. It owns acceptance,
  // charging, refusal and routing; a normal link must not simulate these actions.
  const script = document.createElement('script');
  script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
  script.onload = () => {
    if (!window.checkoutElements) return;
    container.hidden = false;
    window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
    document.querySelectorAll('[data-pending-widget],[data-launch-note]').forEach(e=>e.hidden=true);
  };
  document.head.append(script);
})();
