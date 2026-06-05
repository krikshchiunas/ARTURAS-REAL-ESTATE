import Image from "next/image";
import { getDictionary, getServices } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Асимметричный bento. Точное число ячеек = числу услуг, есть визуальная вариация
// (две ячейки с изображениями). Double-bezel оболочка вместо плоских карточек.
export function Services({ lang }: { lang: string }) {
  const t = getDictionary(lang).services;
  const services = getServices(lang);
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={<>{t.title}</>}
          body={t.body}
        />

        <div className="mt-16 grid auto-rows-[minmax(180px,auto)] gap-4 md:mt-20 md:grid-cols-6">
          {services.map((s, i) => (
            <Reveal
              key={s.key}
              delay={i * 0.06}
              className={`group relative ${s.span}`}
            >
              <div className="relative h-full overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-core bg-ink-900 p-7 md:p-8">
                  {s.image && (
                    <>
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-30 transition-all duration-[1.2s] ease-glass group-hover:scale-105 group-hover:opacity-45"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent"
                      />
                    </>
                  )}
                  <span className="relative font-mono text-xs text-platinum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative mt-10">
                    <h3 className="font-display text-2xl font-light tracking-tight text-bone md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
