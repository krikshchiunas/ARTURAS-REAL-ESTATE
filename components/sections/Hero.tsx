"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroVideo } from "@/components/HeroVideo";
import { siteConfig, getDictionary } from "@/lib/i18n";

// Кинематографичный hero. Видео из /public/hero.mp4 (поставляется клиентом),
// poster-изображение работает как надёжный fallback и LCP-кадр.
export function Hero({ lang }: { lang: string }) {
  const t = getDictionary(lang).hero;
  const ref = useRef<HTMLElement>(null);
  // Скролл-параллакс непрерывно композитит тяжёлый видеослой — на мобайле это
  // даёт «дёрганый» скролл. Включаем эффект только на десктопе.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Параллакс: медиа уходит медленнее, контент быстрее — глубина сцены.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <motion.div
        style={desktop ? { y: mediaY, scale: mediaScale } : undefined}
        className="absolute inset-0 bg-ink md:will-change-transform"
      >
        <HeroVideo />
      </motion.div>

      {/* Кинематографичная многослойная заливка: глубина + читаемость текста */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_115%,rgba(8,8,10,0.95),transparent_55%)]"
      />

      <motion.div
        style={desktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28"
      >
        <div className="shell">
          <h1 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.6vw,4rem)] font-light leading-[1.07] tracking-tight text-balance">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="block"
            >
              {t.titleTop}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="block text-platinum-soft"
            >
              <em>{t.titleEmphasis}</em>{t.titleRest}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            className="mt-8 max-w-prose text-pretty text-lg leading-relaxed text-bone-muted"
          >
            {t.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.74 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href={siteConfig.contacts.whatsapp}>
              {getDictionary(lang).common.whatsapp}
            </MagneticButton>
            <MagneticButton href={siteConfig.contacts.telegram} variant="ghost">
              {getDictionary(lang).common.telegram}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-bone/40 to-transparent" />
      </motion.div>
    </section>
  );
}
