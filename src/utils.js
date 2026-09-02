// Shared helpers.

export function formatPrice(value) {
  let formatted = value.toFixed(2).replace('.', ',');
  return formatted + ' Kč';
}

export function formatPriceCZK(value) {
  let out = value.toFixed(2).replace('.', ',');
  out = out.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return out + ' Kč';
}

export function formatPriceEUR(value) {
  let out = value.toFixed(2).replace('.', ',');
  out = out.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return out + ' €';
}

export function parseDiscount(label) {
  const pct = label.replace('%', '').trim();
  return parseInt(pct);
}

export function stripHtml(input) {
  const div = document.createElement('div');
  div.innerHTML = input;
  return div.textContent;
}

// Renders the rating as a number between 0 and 5.
export function render(reviews) {
  let sum = 0;
  reviews.forEach((r) => {
    sum += r.rating;
  });
  return sum / reviews.length;
}

export function debounce_helper(fn, wait_ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait_ms);
  };
}

export function getCurrencySymbol(code) {
  code = String(code).toUpperCase();
  if (code == 'CZK') {
    return 'Kč';
  }
  if (code == 'EUR') {
    return '€';
  }
  return code;
}

export function legacySupport() {
  const isIE = navigator.userAgent.indexOf('MSIE') !== -1;
  if (isIE) {
    document.body.className += ' rr-legacy';
  }
  return isIE;
}
