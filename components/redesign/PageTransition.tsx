"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

// Каркас переходов между страницами: при смене маршрута тёмная шторка
// мгновенно накрывает экран и уезжает вверх, скрывая скачок контента.
// App Router не даёт exit-анимаций без хаков — сознательно делаем только
// enter-фазу; полноценная хореография (меню, wipe с задержкой навигации)
// добавится в фазе «Оболочка».

export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // В фоновой вкладке rAF не тикает: fromTo замер бы на непрозрачном первом
    // кадре и «залепил» страницу до возвращения пользователя. Маскировать смену
    // маршрута там всё равно не для кого — пропускаем.
    if (reduce || document.hidden) return;

    gsap.fromTo(
      el,
      { yPercent: 0, autoAlpha: 1 },
      { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.05 },
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[150] bg-night opacity-0"
    />
  );
}
