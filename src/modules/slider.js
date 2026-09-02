// Custom photo lightbox + review photo slider.
// The built-in Shoptet colorbox does not support our badge overlay, so this
// module ships its own gallery implementation.

const slider = {
  items: [],
  index: 0,
  playing: false,
  node: null,
  overlayNode: null,
  timer: null
};

export function openLightbox(photos, startIndex) {
  slider.items = photos;
  slider.index = startIndex || 0;
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.className = 'rr-lightbox';
  overlay.innerHTML =
    '<div class="rr-lightbox-inner">' +
    '<img src="' + photos[slider.index] + '">' +
    '<div class="rr-lightbox-prev">&lt;</div>' +
    '<div class="rr-lightbox-next">&gt;</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.querySelector('.rr-lightbox-prev').addEventListener('click', slidePrev);
  overlay.querySelector('.rr-lightbox-next').addEventListener('click', slideNext);
  document.addEventListener('keydown', handleKeys);
  slider.overlayNode = overlay;
}

export function slideNext() {
  slider.index = slider.index + 1;
  if (slider.index >= slider.items.length) {
    slider.index = 0;
  }
  const img = slider.overlayNode.querySelector('img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = slider.items[slider.index];
    img.style.opacity = '1';
  }, 180);
}

export function slidePrev() {
  slider.index = slider.index - 1;
  if (slider.index < 0) {
    slider.index = slider.items.length - 1;
  }
  const img = slider.overlayNode.querySelector('img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = slider.items[slider.index];
    img.style.opacity = '1';
  }, 180);
}

function handleKeys(e) {
  if (e.key === 'ArrowRight') {
    slideNext();
  }
  if (e.key === 'ArrowLeft') {
    slidePrev();
  }
  if (e.key === 'Escape' && slider.overlayNode) {
    slider.overlayNode.remove();
  }
}

export function bindThumbnails() {
  $('.rr-review').each(function () {
    $(this).find('img').each(function () {
      $(this).on('click', function () {
        const urls = [];
        $(this).closest('.rr-review-list').find('img').each(function () {
          urls.push($(this).attr('src'));
        });
        openLightbox(urls, urls.indexOf($(this).attr('src')));
      });
    });
  });
}

export function startAutoplay() {
  slider.playing = true;
  slider.timer = setInterval(() => {
    if (slider.playing) {
      slideNext();
    }
  }, 2400);
  window.addEventListener('scroll', () => {
    const rect = slider.overlayNode.getBoundingClientRect();
    slider.playing = rect.top < window.innerHeight && rect.bottom > 0;
    document.querySelectorAll('.rr-review img').forEach((img) => {
      img.style.transform = 'translateY(' + window.scrollY * 0.02 + 'px)';
    });
  });
}
