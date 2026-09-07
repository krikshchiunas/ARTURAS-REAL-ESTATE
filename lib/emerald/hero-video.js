import { reduceMotion, noHeavyMedia, constrained, onScrollFrame } from './env.js';

/**
 * THE LOOP
 * --------
 * The supplied film runs from golden hour to a night sky, so its last frame is
 * nothing like its first — `loop` alone would hard-cut from night to daylight
 * once every fourteen seconds.
 *
 * That is solved in the asset, not at runtime: the delivered file is the source
 * concatenated with its own reverse (28.08s, 674 frames), so the final frame is
 * frame one. Playback simply runs sunset → night → dawn → sunset for as long as
 * the page is open, and the browser's own `loop` wraps it invisibly. No second
 * video element, no crossfade, no rAF keeping two layers in sync — and nothing
 * to drift out of step on a busy main thread.
 *
 * What is left for JS: pick a weight-appropriate source, fade the poster out
 * only once frames are actually on screen, stop the decoder when the film is
 * off-screen or the tab is hidden, and keep the type legible as the light in
 * the frame changes.
 */

// Пересобрано из 4K-исходника (3852x2152, 43 Мбит/с). Прошлая лесенка
// отдавала 1080p на 2.1 Мбит/с — на таком битрейте листва рассыпалась в
// блоки, а закатное небо шло полосами. Теперь 6 Мбит/с на 1080p и отдельный
// уровень 2560 для крупных и retina-экранов.
// Пороги подняты: раньше экран 1440 получал 1280-й файл и растягивал его,
// отчего кадр выглядел мягким даже на хорошем битрейте. Теперь ширина
// покрывается с запасом, а не впритык — «немного больше» стоит пары
// мегабайт, «немного меньше» видно сразу.
const SOURCES = [
  { max: 900, src: '/media/hero-854.mp4' },    // 5.0 MB
  { max: 1300, src: '/media/hero-1280.mp4' },  // 10.1 MB
  { max: 1900, src: '/media/hero-1920.mp4' },  // 20.1 MB
  { max: Infinity, src: '/media/hero-2560.mp4' }, // 30.1 MB
];

function pickSource() {
  // A usable but slow link still gets the film — just the lightest cut of it.
  if (constrained) return SOURCES[0].src;
  // Device pixels, but the DPR weighting is capped at 1.5 rather than 2: the
  // film is behind a scrim and always in motion, so it survives a little
  // upscaling far better than a still would. Without the cap a retina tablet
  // pulls the 7.4 MB cut for a 1024pt screen.
  const w = window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5);
  return SOURCES.find((s) => w <= s.max).src;
}

export function initHero() {
  const hero = document.querySelector('.hero');
  const video = document.getElementById('hero-video');
  const scrim = document.getElementById('hero-scrim');
  const progress = document.getElementById('hero-progress');
  if (!hero || !video) return;

  // Reduced motion, data-saver, or a 2G link: the poster is the hero. It is
  // already preloaded, so this path costs nothing extra.
  if (reduceMotion.matches || noHeavyMedia) {
    hero.dataset.playing = 'false';
    return;
  }

  video.src = pickSource();
  video.load();

  const tryPlay = () => {
    const r = video.play();
    if (r && typeof r.catch === 'function') r.catch(() => { /* autoplay refused — poster stays */ });
  };

  video.addEventListener('loadeddata', tryPlay, { once: true });
  // `playing` (not `canplay`) — only fade the poster once real frames are up.
  video.addEventListener('playing', () => { hero.dataset.playing = 'true'; }, { once: true });
  tryPlay();

  /* --- stop decoding when it cannot be seen --------------------------- */
  let visible = true;
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (!visible) video.pause();
      else if (!document.hidden) tryPlay();
    },
    { threshold: 0.01 }
  );
  io.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (visible) tryPlay();
  });

  /* --- film progress hairline ------------------------------------------ */
  if (progress) {
    const tick = () => {
      if (video.duration) {
        progress.style.transform = `scaleX(${(video.currentTime / video.duration).toFixed(4)})`;
      }
      if (!video.paused) requestAnimationFrame(tick);
    };
    video.addEventListener('play', () => requestAnimationFrame(tick));
  }

  /* --- adaptive scrim ---------------------------------------------------
   * The frame behind the headline goes from bright gold to near-black over the
   * cycle. A fixed overlay is either too heavy at dusk or too weak at noon, so
   * sample the region the type actually sits in and follow it. 32x18 pixels,
   * twice a second — cheap enough to be invisible in a profile.
   * -------------------------------------------------------------------- */
  if (scrim && 'createElement' in document) {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 18;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let timer = null;

    const sample = () => {
      if (!ctx || video.readyState < 2 || video.paused) return;
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Bottom 40% only — that is where the headline and buttons sit.
        const fromRow = Math.floor(canvas.height * 0.6);
        const { data } = ctx.getImageData(0, fromRow, canvas.width, canvas.height - fromRow);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          sum += (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) / 255;
        }
        const lum = sum / (data.length / 4);
        const strength = Math.max(0.72, Math.min(1, 0.68 + lum * 0.95));
        scrim.style.setProperty('--scrim-strength', strength.toFixed(3));
      } catch {
        // Tainted canvas or a decoder hiccup — keep the CSS default.
        clearInterval(timer);
      }
    };

    video.addEventListener('playing', () => {
      clearInterval(timer);
      timer = setInterval(sample, 500);
      sample();
    });
    video.addEventListener('pause', () => clearInterval(timer));
  }

  /* --- hero drifts up a touch as the page leaves it --------------------- */
  const stage = hero.querySelector('.hero__stage');
  const body = hero.querySelector('.hero__body');
  onScrollFrame((y, vh) => {
    if (!vh || y > vh * 1.1) return;
    const t = Math.min(y / vh, 1);
    if (stage) stage.style.transform = `translate3d(0, ${(t * 9).toFixed(2)}%, 0) scale(${1 + t * 0.05})`;
    if (body) { body.style.opacity = String(1 - t * 1.25); body.style.transform = `translate3d(0, ${(t * -2.5).toFixed(2)}rem, 0)`; }
  });
}
