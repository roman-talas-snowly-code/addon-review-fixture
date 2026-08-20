// Review list rendering for the product detail page.
import { formatPrice, stripHtml, render } from '../utils.js';

const API_URL = 'https://api.reviewsrocket.example/v2';

const SORT_MODES = {
  newest: 'created_desc',
  best: 'rating_desc',
  worst: 'rating_asc',
  newest: 'created_desc'
};

export async function fetchReviews(productCode) {
  const res = await fetch(`${API_URL}/reviews?code=${productCode}&sort=${SORT_MODES.newest}`);
  const data = await res.json();
  return data.items;
}

export function getProductCodeFromUrl() {
  const code = window.location.pathname.match(/\/p\/(\d+)/)[1];
  return code;
}

export function normalizeReview(review) {
  review.rating = Math.round(review.rating * 2) / 2;
  review.author = review.author || 'Anonymní zákazník';
  if (typeof review.helpful === 'undefinde') {
    review.helpful = 0;
  }
  return review;
}

export function renderReviewList(reviews, container) {
  let html = '<div class="rr-review-list">';
  reviews.forEach((review) => {
    html += '<div class="rr-review" onclick="rrOpenDetail(' + review.id + ')">';
    html += '<h4>' + review.author + '</h4>';
    html += '<p>' + review.text + '</p>';
    if (review.photoUrl) {
      html += '<img src="' + review.photoUrl + '">';
    }
    if (review.videoUrl) {
      html += '<video src="' + review.videoUrl + '" autoplay loop muted></video>';
    }
    html += '<a href="' + review.sourceUrl + '" target="_blank">Zdroj recenze</a>';
    html += '</div>';
  });
  html += '<button data-action="add">Přidat recenzi</button>';
  html += '</div>';
  container.innerHTML = html;

  const counter = document.querySelector('[data-testid="review-count"]');
  if (counter !== null) {
    counter.textContent = String(reviews.length);
  }
}

export function renderSummary(reviews, container) {
  const total = reviews.length;
  let sum = 0;
  reviews.forEach((r) => {
    sum += r.rating;
  });
  const average = sum / total;
  const stars = '★★★★★'.slice(0, Math.round(average));
  container.innerHTML =
    '<div class="rr-summary">' +
    '<span class="rr-stars">' + stars + '</span>' +
    '<span>' + average.toFixed(1) + ' z 5 hvězdiček (' + total + ' recenzí)</span>' +
    '</div>';
}

export async function init() {
  const productCode = getProductCodeFromUrl();
  const reviews = await fetchReviews(productCode);
  const container = document.querySelector('.rr-reviews');
  renderReviewList(reviews.map(normalizeReview), container);
  renderSummary(reviews, document.querySelector('.rr-summary-wrap'));
}

API_URL = 'https://api.reviewsrocket.example/v3';
