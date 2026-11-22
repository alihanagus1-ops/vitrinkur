(() => {
  const cfg = window.VITRINKUR_AGENCY || {};

  // Populate dynamic agency branding
  document.querySelectorAll('[data-bind="agencyName"]').forEach((el) => {
    if (cfg.agencyName) el.textContent = cfg.agencyName;
  });
  document.querySelectorAll('[data-bind="city"]').forEach((el) => {
    if (cfg.city) el.textContent = cfg.city;
  });
  if (cfg.agencyName) {
    document.title = `${cfg.agencyName} — Aidatsız QR Menü & Dijital İşletme Vitrini`;
  }

  // Prices
  document.querySelectorAll('[data-price]').forEach((el) => {
    const key = el.dataset.price;
    const val = Number(cfg[key]);
    if (Number.isFinite(val) && val > 0) {
      el.textContent = `${val.toLocaleString('tr-TR')} ₺`;
    }
  });

  // WhatsApp CTA links
  const waDigits = String(cfg.whatsapp || '').replace(/\D+/g, '');
  document.querySelectorAll('[data-wa-cta]').forEach((a) => {
    const msg = a.dataset.waCta || 'Merhaba, bilgi almak istiyorum.';
    a.href = waDigits
      ? `https://wa.me/${waDigits}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  });

  // Instagram
  const igHandle = String(cfg.instagram || '').replace(/^@+/, '');
  const igLink = document.getElementById('igLink');
  if (igLink && igHandle) {
    igLink.href = `https://instagram.com/${igHandle}`;
    igLink.textContent = `@${igHandle}`;
    igLink.hidden = false;
  }

  // Year
  const yearEl = document.getElementById('yearNow');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Inline demo switcher
  const frame = document.getElementById('heroDemoFrame');
  const label = document.getElementById('heroDemoLabel');
  document.querySelectorAll('[data-switch-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (frame) frame.src = btn.dataset.switchDemo;
      if (label) label.textContent = btn.dataset.label || 'demo';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ROI / Savings Calculator
  const range = document.getElementById('monthlyFeeRange');
  const feeVal = document.getElementById('monthlyFeeVal');
  const save1 = document.getElementById('save1Year');
  const save3 = document.getElementById('save3Year');
  const starterPrice = Number(cfg.starterPriceTl) || 1950;

  function updateCalc() {
    const monthly = Number(range?.value) || 650;
    const oneYearNet = Math.max(0, monthly * 12 - starterPrice);
    const threeYearNet = Math.max(0, monthly * 36 - starterPrice);
    if (feeVal) feeVal.textContent = `${monthly.toLocaleString('tr-TR')} ₺ / ay`;
    if (save1) save1.textContent = `${oneYearNet.toLocaleString('tr-TR')} ₺`;
    if (save3) save3.textContent = `${threeYearNet.toLocaleString('tr-TR')} ₺`;
  }
  range?.addEventListener('input', updateCalc);
  updateCalc();
})();
