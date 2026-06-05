"use client";

import { useRef } from "react";
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
        style={{ y: mediaY, scale: mediaScale }}
        className="absolute inset-0 bg-ink will-change-transform"
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
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28"
      >
        <div className="shell">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="eyebrow inline-flex items-center gap-2.5"
          >
            <span className="h-px w-6 bg-platinum/60" aria-hidden />
            {t.eyebrow}
          </motion.span>

          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95] tracking-tight text-balance">
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
