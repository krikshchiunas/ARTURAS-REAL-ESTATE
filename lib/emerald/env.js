/** Shared environment probes, evaluated once. */
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const effective = (conn && conn.effectiveType) || '';

/** Explicit data-saver, or a link too slow for any video at all. */
export const noHeavyMedia = Boolean(conn && (conn.saveData || /^(2g|slow-2g)$/.test(effective)));
/** Usable, but not worth the top tier. */
export const constrained = effective === '3g';

/** One shared rAF loop — avoids a listener-per-feature scroll storm. */
const readers = new Set();
let ticking = false;

function flush() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  for (const fn of readers) fn(y, vh);
}
function request() {
  if (!ticking) { ticking = true; requestAnimationFrame(flush); }
}

export function onScrollFrame(fn) {
  readers.add(fn);
  request();
  return () => readers.delete(fn);
}

window.addEventListener('scroll', request, { passive: true });
window.addEventListener('resize', request, { passive: true });
