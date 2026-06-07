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
  // скролл наверх; если в URL есть якорь (например /ru#projects из кнопки «Все
  // проекты») — прокручиваем к нужной секции.
  //
  // Важно: секции целевой страницы могут ещё не быть в DOM в момент срабатывания
  // эффекта (стриминг/догрузка), а Lenis считает позицию якоря по текущей
  // верстке. Поэтому повторяем попытку на следующем кадре и с небольшой
  // задержкой — иначе переход «к секции» иногда срывается в скролл наверх.
  useEffect(() => {
    let raf = 0;
    const timers: number[] = [];

    const apply = () => {
      const lenis = lenisRef.current;
      const hash = window.location.hash;
      const el = hash ? document.querySelector(hash) : null;

      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -110 });
        else (el as HTMLElement).scrollIntoView();
        return true;
      }

      if (!hash) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        return true;
      }
      // Есть якорь, но цель ещё не отрисована — попробуем позже.
      return false;
    };

    apply();
    raf = requestAnimationFrame(apply);
    timers.push(window.setTimeout(apply, 120));
    timers.push(window.setTimeout(apply, 350));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return <>{children}</>;
}
