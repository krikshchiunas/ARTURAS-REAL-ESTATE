import { reduceMotion, finePointer } from './env.js';

/** Trailing ring + magnetic buttons. Fine pointers only; never on touch. */
export function initPointer() {
  if (!finePointer.matches || reduceMotion.matches) return;

  const ring = document.getElementById('cursor');
  if (!ring) return;

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let x = tx, y = ty, raf = 0;

  const loop = () => {
    // Critically damped-ish trail: enough lag to feel considered, not sluggish.
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    ring.style.transform = `translate3d(${x - 15}px, ${y - 15}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (ring.dataset.active !== 'true') ring.dataset.active = 'true';
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  document.addEventListener('mouseleave', () => { ring.dataset.active = 'false'; });
  document.addEventListener('mousedown', () => { ring.dataset.state = 'down'; });
  document.addEventListener('mouseup', () => { ring.dataset.state = ''; });

  const INTERACTIVE = 'a, button, input, select, textarea, [data-magnetic]';
  document.addEventListener('mouseover', (e) => {
    if (ring.dataset.state === 'down') return;
    ring.dataset.state = e.target.closest(INTERACTIVE) ? 'link' : '';
  });

  /* --- magnetic pull ---------------------------------------------------- */
  const magnets = [...document.querySelectorAll('[data-magnetic]')];
  const RADIUS = 90;

  magnets.forEach((el) => {
    el.style.transition = 'transform 520ms cubic-bezier(0.16,1,0.3,1)';

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) > Math.max(r.width, r.height) / 2 + RADIUS) return reset();
      el.style.transition = 'transform 120ms linear';
      el.style.transform = `translate3d(${dx * 0.22}px, ${dy * 0.3}px, 0)`;
    };
    const reset = () => {
      el.style.transition = 'transform 520ms cubic-bezier(0.16,1,0.3,1)';
      el.style.transform = '';
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('blur', reset);
  });
}
