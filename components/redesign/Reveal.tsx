"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Скролл-реверсы редизайна. Reveal — мягкий подъём блока при входе во вьюпорт.
// HeadlineReveal — фирменный приём референса: заголовок режется SplitText на
// строки-маски, слова выезжают снизу. Оба уважают prefers-reduced-motion.

// Прелоадер сигналит о готовности событием arturas:ready (см. Preloader) —
// hero-анимации ждут его, чтобы не отыграть под шторкой впустую.
function afterPreloader(cb: () => void): () => void {
  if ((window as unknown as { __arturasReady?: boolean }).__arturasReady) {
    cb();
    return () => {};
  }
  let fallback = 0;
  const run = () => {
    window.clearTimeout(fallback);
    cb();
  };
  window.addEventListener("arturas:ready", run, { once: true });
  fallback = window.setTimeout(run, 5500); // страховка, если событие потерялось
  return () => {
    window.removeEventListener("arturas:ready", run);
    window.clearTimeout(fallback);
  };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}

export function HeadlineReveal({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    let split: SplitText | null = null;
    let cancelled = false;
    let cleanupWait: () => void = () => {};

    // Режем только после загрузки шрифтов — иначе строки посчитаются по
    // фолбэку и «переломаются» после подмены.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      cleanupWait = afterPreloader(() => {
        if (cancelled) return;
        split = new SplitText(el, {
          type: "lines,words",
          linesClass: "overflow-hidden",
        });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.words, {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.045,
          delay,
          ease: "power4.out",
        });
      });
    });

    return () => {
      cancelled = true;
      cleanupWait();
      split?.revert();
    };
  }, [text, delay]);

  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {text}
    </Tag>
  );
}
