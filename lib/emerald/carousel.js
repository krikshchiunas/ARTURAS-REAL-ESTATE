import { finePointer } from './env.js';

/**
 * Лента планировок: кнопки листают на карточку, точки следуют за реальным
 * положением прокрутки, а мышью ленту можно просто тянуть.
 *
 * Тач не трогаем — там прокрутка нативная и работает лучше любой эмуляции.
 */
export function initCarousel() {
  const rail = document.getElementById('res-rail');
  const dots = document.getElementById('res-dots');
  if (!rail) return;

  const cards = [...rail.children];
  const prev = document.querySelector('[data-rail="prev"]');
  const next = document.querySelector('[data-rail="next"]');
  if (!cards.length) return;

  const step = () => {
    const a = cards[0].getBoundingClientRect();
    const b = cards[1]?.getBoundingClientRect();
    return b ? b.left - a.left : a.width;
  };

  const sync = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const x = rail.scrollLeft;
    if (prev) prev.disabled = x <= 2;
    if (next) next.disabled = x >= max - 2;
    if (!dots) return;
    const i = Math.max(0, Math.min(cards.length - 1, Math.round(x / step())));
    [...dots.children].forEach((d, n) => d.setAttribute('data-on', String(n === i)));
  };

  prev?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  rail.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();

  /* --- перетаскивание мышью -------------------------------------------- */
  if (!finePointer.matches) return;

  const DRAG_THRESHOLD = 5; // px — ниже этого считаем, что это клик, а не тяга
  let downX = 0, startScroll = 0, pointerId = null, dragging = false;

  rail.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    downX = e.clientX;
    startScroll = rail.scrollLeft;
    dragging = false;
  });

  rail.addEventListener('pointermove', (e) => {
    if (pointerId !== e.pointerId) return;
    const dx = e.clientX - downX;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      dragging = true;
      rail.dataset.dragging = 'true';
      rail.setPointerCapture(pointerId);
    }
    rail.scrollLeft = startScroll - dx;
  });

  const end = (e) => {
    if (pointerId !== e.pointerId) return;
    if (rail.hasPointerCapture?.(pointerId)) rail.releasePointerCapture(pointerId);
    pointerId = null;
    if (!dragging) return;
    delete rail.dataset.dragging;
    // гасим клик, который браузер пошлёт по карточке сразу после тяги
    rail.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); },
      { capture: true, once: true });
    setTimeout(() => { dragging = false; }, 0);
    sync();
  };

  rail.addEventListener('pointerup', end);
  rail.addEventListener('pointercancel', end);
  rail.addEventListener('dragstart', (e) => e.preventDefault());
}
