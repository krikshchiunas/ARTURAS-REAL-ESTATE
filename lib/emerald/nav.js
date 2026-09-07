import { onScrollFrame } from './env.js';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const hero = document.querySelector('.hero');
  if (!nav) return;

  /* --- stuck + hide-on-descend ----------------------------------------- */
  let last = window.scrollY;
  onScrollFrame((y, vh) => {
    const past = hero ? vh * 0.72 : 120;
    nav.dataset.stuck = y > past ? 'true' : 'false';

    const descending = y > last && y - last > 4;
    const open = menu?.dataset.open === 'true';
    nav.dataset.hidden = !open && descending && y > past + 200 ? 'true' : 'false';
    last = y;
  });

  /* --- scroll spy -------------------------------------------------------- */
  const links = [...document.querySelectorAll('[data-navlink]')];
  const sections = links
    .map((l) => document.getElementById(l.dataset.navlink))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const seen = new Map();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.intersectionRatio));
        let best = null; let ratio = 0;
        for (const [id, r] of seen) if (r > ratio) { ratio = r; best = id; }
        links.forEach((l) =>
          l.setAttribute('aria-current', ratio > 0.06 && l.dataset.navlink === best ? 'true' : 'false')
        );
      },
      { threshold: [0, 0.08, 0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* --- mobile menu ------------------------------------------------------- */
  if (!burger || !menu) return;

  const setOpen = (open) => {
    menu.dataset.open = String(open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.dataset.menu = open ? 'open' : 'closed';
    if (open) {
      nav.dataset.hidden = 'false';
      menu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      burger.focus({ preventScroll: true });
    }
  };

  burger.addEventListener('click', () => setOpen(menu.dataset.open !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  document.addEventListener('keydown', (e) => {
    if (menu.dataset.open !== 'true') return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key !== 'Tab') return;
    // Keep focus inside the overlay while it is open.
    const items = [...menu.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0]; const lastItem = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastItem.focus(); }
    else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); first.focus(); }
  });

  // A resize past the breakpoint should not strand an open overlay.
  window.matchMedia('(min-width: 1021px)').addEventListener('change', (e) => {
    if (e.matches && menu.dataset.open === 'true') setOpen(false);
  });
}
