"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Прелоадер в стиле Hubtown: горизонтальный ряд квадратов-сегментов,
// заполняющийся слева направо по мере загрузки; крошечный счётчик «NN%» над
// правым краем ряда и подпись «LOADING CONTENT» под левым. Затем шторка уезжает
// вверх. Показывается один раз за сессию (sessionStorage).
//
// Прогресс симулируется поверх document.fonts.ready; в фазе WebGL сюда можно
// прокинуть реальную загрузку ассетов.

const SESSION_KEY = "arturas-preloaded";
const SEGMENTS = 16;

// Hero-анимации стартуют по этому сигналу — иначе отыграют под шторкой впустую.
function announceReady() {
  (window as unknown as { __arturasReady?: boolean }).__arturasReady = true;
  window.dispatchEvent(new Event("arturas:ready"));
}

export type PreloaderTexts = {
  loading: string;
  loaded: string;
  ready: string;
};

export function Preloader({
  texts,
  onDone,
}: {
  texts: PreloaderTexts;
  onDone?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const skip =
      sessionStorage.getItem(SESSION_KEY) ||
      new URLSearchParams(window.location.search).has("nopreload");
    if (skip) {
      announceReady();
      doneRef.current?.();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const number = numberRef.current;
    const label = labelRef.current;
    const row = rowRef.current;
    if (!root || !number || !label || !row) return;

    const cells = Array.from(row.children) as HTMLElement[];
    const state = { value: 0 };
    let finished = false;

    const paint = () => {
      const v = state.value;
      number.textContent = `${Math.round(v)}%`;
      const filled = Math.round((v / 100) * SEGMENTS);
      cells.forEach((c, i) => {
        c.style.backgroundColor =
          i < filled ? "rgb(213,224,255)" : "rgba(213,224,255,0.14)";
      });
    };

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        if (finished) return;
        finished = true;
        label.textContent = texts.ready;
        gsap.to(root, {
          yPercent: -100,
          duration: reduce ? 0 : 0.9,
          delay: reduce ? 0 : 0.5,
          ease: "power4.inOut",
          onStart: () => window.setTimeout(announceReady, reduce ? 0 : 700),
          onComplete: () => {
            setMounted(false);
            doneRef.current?.();
          },
        });
      };

      if (reduce) {
        state.value = 100;
        paint();
        finish();
        return;
      }

      const tween = gsap.to(state, {
        value: 90,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: paint,
      });

      const complete = () => {
        tween.kill();
        gsap.to(state, {
          value: 100,
          duration: 0.5,
          ease: "power3.inOut",
          onUpdate: paint,
          onComplete: () => {
            label.textContent = texts.loaded;
            finish();
          },
        });
      };

      const fallback = window.setTimeout(complete, 4000);
      void document.fonts.ready.then(() => {
        window.clearTimeout(fallback);
        window.setTimeout(complete, 600);
      });
    }, root);

    return () => ctx.revert();
  }, [mounted, texts]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-night"
      aria-hidden
    >
      <div className="relative">
        {/* Счётчик над правым краем ряда */}
        <span
          ref={numberRef}
          className="absolute -top-6 right-0 font-mono text-11 font-bold tracking-4 text-offwhite"
        >
          0%
        </span>
        {/* Ряд сегментов */}
        <div ref={rowRef} className="flex items-center gap-[10px]">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className="h-[7px] w-[7px]"
              style={{ backgroundColor: "rgba(213,224,255,0.14)" }}
            />
          ))}
        </div>
        {/* Подпись под левым краем ряда */}
        <span
          ref={labelRef}
          className="absolute -bottom-7 left-0 font-mono text-11 uppercase tracking-4 text-offwhite/50"
        >
          {texts.loading}
        </span>
      </div>
    </div>
  );
}
