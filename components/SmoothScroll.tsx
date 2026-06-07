"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Единый источник плавного скролла. Lenis ведёт raf-цикл и синхронизируется
// с GSAP ScrollTrigger, чтобы pin-анимации не дрожали.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      // Клики по якорным ссылкам (#projects и т.д.) тоже идут через Lenis,
      // иначе браузер «телепортирует» к секции мгновенно. Offset уводит цель
      // ниже плавающего меню, чтобы заголовок секции не прятался под ним.
      anchors: { offset: -110 },
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // layout [lang] не размонтируется при переходах внутри локали, поэтому Lenis
  // сохраняет позицию скролла предыдущей страницы — и новая страница (например,
  // карточка проекта) открывается «с середины». При смене маршрута возвращаем
  // скролл наверх; если в URL есть якорь — прокручиваем к нужной секции.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -110 });
        else el.scrollIntoView();
        return;
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
