"use client";

import { useEffect, useRef } from "react";

const POSTER =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80";

// Длительность кроссфейда на стыке цикла (сек).
const FADE = 1.4;

// Бесшовный цикл видео. Ролик идёт «день → ночь», и при обычном loop
// случается резкий скачок с ночи обратно на утро. Здесь два слоя одного
// и того же ролика плавно перекрывают друг друга в последние секунды:
// ночь мягко растворяется в утре, стык становится незаметным.
export function HeroVideo() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
          active.style.opacity = String(1 - progress);
          inactive.style.opacity = String(progress);
          if (progress >= 1 || remaining <= 0.05) swap();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    active.currentTime = 0;
    active.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const cls =
    "absolute inset-0 h-full w-full object-cover brightness-[0.82] contrast-[1.06] saturate-[0.92]";

  return (
    <>
      <video ref={aRef} className={cls} muted playsInline preload="auto" poster={POSTER}>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <video ref={bRef} className={cls} muted playsInline preload="auto" aria-hidden>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
