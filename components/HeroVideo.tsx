"use client";

import { useEffect, useRef, useState } from "react";

// Длительность кроссфейда на стыке цикла (сек).
const FADE = 2.8;

// Плавная кривость (smoothstep): растворение мягко стартует и мягко
// затухает, без резких границ по краям перехода.
const ease = (p: number) => p * p * (3 - 2 * p);

const cls =
  "absolute inset-0 h-full w-full object-cover brightness-[0.82] contrast-[1.06] saturate-[0.92]";

// Кинематографичный фон hero.
//
// Десктоп: два слоя одного ролика плавно перекрывают друг друга в последние
// секунды («день → ночь» без резкого скачка при loop).
//
// Мобайл: ролик 16 МБ слишком тяжёл для перекрытия в два декодера. Грузим один
// `<video>` с нативным loop и preload="metadata" — вдвое меньше памяти/декода,
// без RAF-цикла кроссфейда и без двойной загрузки трафика.
export function HeroVideo() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  // SSR-безопасно: стартуем как «мобайл» (один слой), на десктопе докручиваем
  // второй слой и кроссфейд после монтирования.
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!desktop) return; // на мобайле — нативный loop, без кроссфейда
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let active = a;
    let inactive = b;
    let fading = false;
    let raf = 0;

    active.style.opacity = "1";
    inactive.style.opacity = "0";

    const swap = () => {
      active.pause();
      active.currentTime = 0;
      active.style.opacity = "0";
      inactive.style.opacity = "1";
      const tmp = active;
      active = inactive;
      inactive = tmp;
      fading = false;
    };

    const tick = () => {
      const dur = active.duration;
      if (isFinite(dur) && dur > 0) {
        const remaining = dur - active.currentTime;

        if (!fading && remaining <= FADE) {
          fading = true;
          inactive.currentTime = 0;
          inactive.play().catch(() => {});
        }

        if (fading) {
          const progress = Math.min(1, Math.max(0, (FADE - remaining) / FADE));
          const e = ease(progress);
          active.style.opacity = String(1 - e);
          inactive.style.opacity = String(e);
          if (progress >= 1 || remaining <= 0.05) swap();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    active.currentTime = 0;
    active.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [desktop]);

  return (
    <>
      <video
        ref={aRef}
        className={cls}
        muted
        playsInline
        autoPlay
        loop={!desktop}
        preload={desktop ? "auto" : "metadata"}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {/* Второй слой кроссфейда нужен только на десктопе. */}
      {desktop && (
        <video
          ref={bRef}
          className={cls}
          muted
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
