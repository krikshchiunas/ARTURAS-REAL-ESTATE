"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Socials } from "@/components/ui/Socials";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

// Блок личного бренда основателя. Фото слева (параллакс), позиция справа.
// Фото основателя: файл лежит в /public/arturas.jpg.
export function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="founder" className="relative py-28 md:py-40">
      <div
        ref={ref}
        className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-bezel">
              <motion.div style={{ y }} className="absolute inset-[-6%]">
                <Image
                  src="/arturas.jpg"
                  alt={`${site.founder}, основатель ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[center_25%]"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
              />
              <div className="absolute bottom-6 left-6 glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {site.founder}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Личный подход</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-[16ch] font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              За каждой сделкой — <em className="text-platinum-soft">один человек</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-pretty leading-relaxed text-bone-muted">
              Пятнадцать лет в недвижимости и более семидесяти объектов в портфеле.
              Я работаю не с листингом, а с вашей целью — будь то переезд, образ
              жизни, сохранение капитала или арендный доход. Каждый объект на
              Пхукете я оцениваю через качество жизни, инвестиционный потенциал и
              вашу удовлетворённость спустя годы.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <Socials />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href={site.contacts.whatsapp}>
                Написать в WhatsApp
              </MagneticButton>
              <MagneticButton href={site.contacts.telegram} variant="ghost">
                Telegram
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
