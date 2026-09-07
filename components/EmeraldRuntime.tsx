"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Поведение изумрудной системы: появление блоков, шапка, видео-герой,
 * параллакс, магнитные кнопки, счётчики, карусель объектов и график.
 *
 * Скрипты перенесены из лендинга как есть — это обычный DOM-код без сборки.
 * Запускаются после монтирования и переигрываются при смене маршрута:
 * навигация в Next клиентская, DOM подменяется целиком, и наблюдатели,
 * навешенные на прошлой странице, указывали бы в пустоту.
 */
export function EmeraldRuntime() {
  const pathname = usePathname();

  // Шапка живёт в layout и переживает клиентскую навигацию, поэтому её
  // обработчики вешаются один раз. Иначе каждый переход добавлял бы ещё один
  // слушатель на бургер, и меню начало бы открываться-закрываться разом.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [nav, pointer] = await Promise.all([
        import("@/lib/emerald/nav.js"),
        import("@/lib/emerald/pointer.js"),
      ]);
      if (cancelled) return;
      nav.initNav();
      pointer.initPointer();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Всё, что привязано к содержимому страницы, переигрывается при переходе:
  // DOM подменяется целиком, и наблюдатели прошлой страницы смотрели бы в пустоту.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mods = await Promise.all([
        import("@/lib/emerald/reveal.js"),
        import("@/lib/emerald/hero-video.js"),
        import("@/lib/emerald/parallax.js"),
        import("@/lib/emerald/counters.js"),
        import("@/lib/emerald/carousel.js"),
        import("@/lib/emerald/chart.js"),
      ]);
      if (cancelled) return;
      const [reveal, hero, parallax, counters, carousel, chart] = mods;
      reveal.initReveal();
      hero.initHero();
      parallax.initParallax();
      counters.initCounters();
      carousel.initCarousel();
      chart.initChart();
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
