"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Прелоадер референса: счётчик 0% → 100% с меняющейся подписью, затем шторка
// уезжает вверх. Показывается один раз за сессию (sessionStorage) — при
// внутренних переходах пользователя не мучаем.
//
// Фаза 0: прогресс симулируется поверх document.fonts.ready; в фазе WebGL
// сюда подключится реальная загрузка ассетов (setProgress извне).

const SESSION_KEY = "arturas-preloaded";

// Hero-анимации (HeadlineReveal и т.п.) стартуют по этому сигналу — иначе они
// отыграют под непрозрачной шторкой и пользователь увидит уже финальный кадр.
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
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // Решение «показывать или нет» принимаем только на клиенте: SSR всегда
  // рендерит null, иначе гидрация разойдётся из-за sessionStorage.
  useEffect(() => {
    // ?nopreload — обход для автотестов и отладки (прелоадер мешает снимкам).
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
    if (!root || !number || !label) return;

    const state = { value: 0 };
    let finished = false;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        if (finished) return;
        finished = true;
        label.textContent = texts.ready;
        gsap.to(root, {
          yPercent: -100,
          duration: reduce ? 0 : 0.9,
          delay: reduce ? 0 : 0.55,
          ease: "power4.inOut",
          // Сигнал чуть раньше конца шторки: hero начинает подниматься,
          // пока она дораскрывается — как в референсе.
          onStart: () => window.setTimeout(announceReady, reduce ? 0 : 700),
          onComplete: () => {
            setMounted(false);
            doneRef.current?.();
          },
        });
      };

      if (reduce) {
        finish();
        return;
      }

      // Счётчик тянется к 90% сам; последний рывок до 100% — когда шрифты
      // реально готовы. Если fonts.ready задержится, всё равно доводим за 4с.
      const tween = gsap.to(state, {
        value: 90,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          number.textContent = `${Math.round(state.value)}%`;
        },
      });

      const complete = () => {
        tween.kill();
        gsap.to(state, {
          value: 100,
          duration: 0.5,
          ease: "power3.inOut",
          onUpdate: () => {
            number.textContent = `${Math.round(state.value)}%`;
          },
          onComplete: () => {
            label.textContent = texts.loaded;
            finish();
          },
        });
      };

      const fallback = window.setTimeout(complete, 4000);
      void document.fonts.ready.then(() => {
        window.clearTimeout(fallback);
        // Небольшая пауза, чтобы счётчик не «телепортировался» на первом кадре.
        window.setTimeout(complete, 600);
      });
    }, root);

    return () => ctx.revert();
  }, [mounted, texts]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
      aria-hidden
    >
      <span
        ref={numberRef}
        className="font-mono text-54 font-bold leading-0.9 text-offwhite md:text-140"
      >
        0%
      </span>
      <span
        ref={labelRef}
        className="mt-6 font-mono text-11 uppercase tracking-4 text-offwhite/50"
      >
        {texts.loading}
      </span>
      {/* Тонкая линия прогресса по нижнему краю — вторит HUD-эстетике. */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-offwhite/10" />
    </div>
  );
}
