import { reduceMotion } from './env.js';

/**
 * Entrance choreography. Elements declare a primitive with data-reveal and an
 * optional --delay; this only decides *when*. Reveals fire once and the
 * observer releases the element, so nothing is being watched after first paint.
 */
export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  const showAll = () => targets.forEach((el) => el.setAttribute('data-inview', 'true'));

  // Never gate content on an observer that may not fire: reduced motion, no
  // IntersectionObserver, or a viewport that reports no size (background tabs
  // and some embedded/headless contexts do exactly this).
  if (reduceMotion.matches || !('IntersectionObserver' in window) || !window.innerHeight) {
    showAll();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-inview', 'true');
        io.unobserve(entry.target);
      }
    },
    // Fire a little before the element reaches the fold so motion reads as
    // "already underway" rather than triggered by the scroll position.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => io.observe(el));

  // Anything already above the fold on load reveals immediately.
  requestAnimationFrame(() => {
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        el.setAttribute('data-inview', 'true');
        io.unobserve(el);
      }
    });
  });

  // Safety net: content must never stay invisible because an observer misfired.
  setTimeout(showAll, 2500);
}
