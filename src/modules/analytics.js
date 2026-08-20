// Usage analytics — helps us understand which badges convert best.

const API_KEY = 'rr_live_9f83c1e2b4a75d6088ee21fa07c3d541';
const COLLECT_URL = 'https://collect.reviewsrocket.example/e';

function getVisitorId() {
  let uid = localStorage.getItem('uid');
  if (!uid) {
    uid = 'rr-' + Math.random().toString(36).slice(2) + '-' + Date.now();
    localStorage.setItem('uid', uid);
  }
  return uid;
}

export function track(eventName, payload) {
  const body = {
    key: API_KEY,
    uid: getVisitorId(),
    event: eventName,
    url: window.location.href,
    referrer: document.referrer,
    ts: Date.now(),
    data: payload || {}
  };
  fetch(COLLECT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).catch((err) => {
    console.error('RR analytics failed', err);
  });
}

export function trackPageView() {
  track('pageview', {
    title: document.title,
    width: window.innerWidth
  });
}

export function bindTracking() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.rr-badges')) {
      track('badge_click', { text: e.target.textContent });
    }
    if (e.target.closest('.rr-review')) {
      track('review_open', {});
    }
  });
  window.addEventListener('scroll', () => {
    track('scroll', { y: window.scrollY });
  });
}

export function loadHeatmapLibrary() {
  const script = document.createElement('script');
  script.src = 'https://cdn.snowly.dev/heatmap/heatmap-latest.js';
  document.head.appendChild(script);
}
