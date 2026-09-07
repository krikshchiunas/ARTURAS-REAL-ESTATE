import { reduceMotion, onScrollFrame } from './env.js';

/**
 * Depth on full-bleed media. The element is oversized in CSS; here we only
 * shift it within its own overflow, so nothing can expose an edge.
 */
export function initParallax() {
  if (reduceMotion.matches) return;
  const items = [...document.querySelectorAll('[data-parallax]')];
  if (!items.length) return;

  items.forEach((el) => {
    const amount = Math.min(parseFloat(el.dataset.parallax) || 0.08, 0.1);
    el._px = { amount, frame: el.parentElement };
  });

  onScrollFrame((y, vh) => {
    for (const el of items) {
      const frame = el._px.frame;
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) continue;
      // -1 (below fold) → 1 (above fold)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = progress * el._px.amount * rect.height;
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    }
  });
}
