/**
 * Наведение на график доходности. Столбец подсвечивается целиком:
 * направляющая, увеличенные точки, подпись оси и выноска над графиком.
 * Зоны наведения — прозрачные прямоугольники в SVG, каждый с tabindex,
 * поэтому цифры доступны и с клавиатуры, а не только мышью.
 */
export function initChart() {
  const chart = document.getElementById('trust-chart');
  const valEl = document.getElementById('chart-val');
  const noteEl = document.getElementById('chart-note');
  if (!chart || !valEl || !noteEl) return;

  let data;
  try { data = JSON.parse(chart.dataset.chart); } catch { return; }

  const svg = chart.querySelector('svg');
  const guide = svg.querySelector('.chart-guide');
  const hits = [...svg.querySelectorAll('[data-hit]')];
  const dotsA = [...svg.querySelectorAll('.chart-dot-a')];
  const dotsB = [...svg.querySelectorAll('.chart-dot-b')];
  const labels = [...svg.querySelectorAll('[data-lbl]')];
  if (!hits.length) return;

  const clear = () => {
    chart.removeAttribute('data-active');
    dotsA.forEach((d) => d.removeAttribute('data-on'));
    dotsB.forEach((d) => d.removeAttribute('data-on'));
    labels.forEach((l) => l.removeAttribute('data-on'));
    valEl.textContent = valEl.dataset.default;
    noteEl.textContent = noteEl.dataset.default;
  };

  const show = (i) => {
    chart.setAttribute('data-active', String(i));
    dotsA.forEach((d, n) => d.toggleAttribute('data-on', n === i));
    dotsB.forEach((d, n) => d.toggleAttribute('data-on', n === i));
    labels.forEach((l, n) => l.toggleAttribute('data-on', n === i));
    // направляющую ставим точно по X активной точки
    const x = dotsA[i]?.getAttribute('cx');
    if (x && guide) { guide.setAttribute('x1', x); guide.setAttribute('x2', x); }
    valEl.textContent = `${data.a.v[i]}%`;
    noteEl.textContent = `${data.x[i]} · ${data.b.key.toLowerCase()} ${data.b.v[i]}%`;
  };

  hits.forEach((hit, i) => {
    hit.addEventListener('pointerenter', () => show(i));
    hit.addEventListener('focus', () => show(i));
    hit.addEventListener('blur', clear);
  });
  svg.addEventListener('pointerleave', clear);

  // На тач-устройствах наведения нет — тап работает как выбор столбца
  if (window.matchMedia('(hover: none)').matches) {
    hits.forEach((hit, i) => hit.addEventListener('click', () => show(i)));
  }

}
