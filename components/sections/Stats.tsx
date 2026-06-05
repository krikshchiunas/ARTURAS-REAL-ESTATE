import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary, getStats } from "@/lib/i18n";

// Асимметричная раскладка цифр: ведущее утверждение + смещённая сетка.
// Не три равные карточки.
export function Stats({ lang }: { lang: string }) {
  const t = getDictionary(lang).stats;
  const stats = getStats(lang);
  return (
    <section className="relative py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-[12ch] font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-pretty leading-relaxed text-bone-muted">
              {t.body}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-bezel bg-white/[0.06] lg:col-span-7">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="bg-ink-900 p-8 md:p-10"
            >
              <span className="block font-display text-5xl font-light tracking-tight text-bone md:text-7xl">
                {s.value}
              </span>
              <span className="mt-4 block text-sm leading-relaxed text-bone-muted">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
