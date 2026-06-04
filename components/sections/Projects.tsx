import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Каталог объектов. Лента листается ГОРИЗОНТАЛЬНО отдельным жестом
// (трекпад / Shift+колесо / drag), а вертикальный скролл страницы при этом
// идёт плавно вниз — без pin-перехвата и «торможения». На мобиле — вертикаль.
export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      {/* Заголовок над лентой */}
      <div className="shell">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>Проекты</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[20ch] font-display text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-5xl">
              Объекты, отобранные под цель
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Лента: вертикальная на мобиле, горизонтальный скроллер на десктопе.
          snap-x для аккуратной остановки на карточках; скроллбар скрыт —
          подглядывающие соседние карточки сами подсказывают, что листается вбок. */}
      <div className="mt-14 flex flex-col gap-8 px-6 md:mt-16 md:flex-row md:gap-10 md:overflow-x-auto md:overscroll-x-contain md:px-[max(2rem,calc((100vw-1440px)/2+2rem))] md:pb-6 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden md:snap-x md:snap-mandatory">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            aria-label={`${p.name} — подробнее`}
            className="group relative block shrink-0 md:w-[clamp(320px,38vw,460px)] md:snap-start"
          >
            <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06] transition-colors duration-500 group-hover:ring-white/15">
              <div className="relative overflow-hidden rounded-core bg-ink-900">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-glass group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent"
                  />
                  {/* Тип — второстепенная характеристика, держим тихо */}
                  <div className="absolute left-6 top-6 flex items-center gap-3">
                    <span className="font-mono text-xs text-platinum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-bone-faint">
                      {p.type}
                    </span>
                  </div>

                  <div className="absolute inset-x-6 bottom-6">
                    {/* Приоритет 2–4: название доминирует, локация и цена ниже по тону */}
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-3xl font-light tracking-tight text-bone md:text-4xl">
                          {p.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-bone-muted">
                          {p.location}
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-xl font-light text-platinum-soft">
                        {p.priceFrom}
                      </span>
                    </div>

                    {/* 1–2 ключевых преимущества: тихая строка, сканируется
                        взглядом, но не конкурирует с названием и фото */}
                    {p.keyPoints.length > 0 && (
                      <ul className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                        {p.keyPoints.map((point, idx) => (
                          <Fragment key={point}>
                            <li>{point}</li>
                            {idx < p.keyPoints.length - 1 && (
                              <li aria-hidden className="flex items-center">
                                <span className="h-[2px] w-[2px] rounded-full bg-platinum/40" />
                              </li>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    )}

                    {/* CTA проявляется на ховере (на мобиле виден всегда) —
                        в покое витрина остаётся спокойной и воздушной */}
                    <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-all duration-500 ease-glass group-hover:text-bone md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
                      Подробнее
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-500 ease-glass group-hover:translate-x-1"
                      >
                        <path
                          d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
