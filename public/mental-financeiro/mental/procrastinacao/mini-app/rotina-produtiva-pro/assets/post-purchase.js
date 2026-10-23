/* Official Hotmart widget owns offer context, charging and yes/no routing. */
(() => {
  const container = document.getElementById('hotmart-sales-funnel');
  const status = document.querySelector('[data-widget-status]');
  if (!container || container.dataset.hotmartMounted === 'true') return;
  const unavailable = () => {
    if (status) status.textContent = 'Os controles de pós-compra não estão disponíveis nesta visita. Consulte seu pedido na Hotmart.';
  };
  if (!window.checkoutElements) { unavailable(); return; }
  try {
    const result = window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
    container.dataset.hotmartMounted = 'true';
    if (result && typeof result.catch === 'function') result.catch(unavailable);
    if (status) status.textContent = 'Use os controles da Hotmart para aceitar ou recusar a oferta durante sua compra.';
  } catch { unavailable(); }
})();
