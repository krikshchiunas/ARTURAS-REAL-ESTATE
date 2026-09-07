import { reduceMotion } from './env.js';

/** Разряды по три, как в разметке. */
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/**
 * Числа в лазурном блоке досчитываются один раз, когда попадают в кадр.
 * Разметка уже содержит финальное значение — счётчик только анимирует его,
 * поэтому без JS и при reduce-motion цифры остаются на месте.
 */
export function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const run = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const dur = 1400;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);         // ease-out quart
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      run(e.target);
      io.unobserve(e.target);
    }
  }, { threshold: 0.4 });

  els.forEach((el) => io.observe(el));
}
