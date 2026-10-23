/* Preserve only campaign fields; never forward personal quiz answers. */
(() => {
  const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'];
  const incoming = new URLSearchParams(window.location.search);
  document.querySelectorAll('a[data-checkout]').forEach(link => {
    const destination = new URL(link.href);
    allowed.forEach(key => {
      const value = incoming.get(key);
      if (value && value.length <= 200) destination.searchParams.set(key, value);
    });
    link.href = destination.href;
  });
})();
