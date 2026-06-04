import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Недавние сделки. Три деликатные карточки в едином стиле сайта:
// double-bezel оболочка, монохром, много воздуха. Без ярких акцентов.
type Line = { label?: string; value: string };
type Deal = { goal: string; name: string; lines: Line[] };

const deals: Deal[] = [
  {
    goal: "Цель: инвестиция",
    name: "AYANA Heights",
    lines: [
      { label: "Бюджет", value: "от ฿5,4M" },
      { label: "Ожидаемая доходность", value: "8–10% годовых" },
    ],
  },
  {
    goal: "Цель: релокация семьи",
    name: "Sun Hills Layan",
    lines: [
      { value: "Подбор и сопровождение сделки" },
      { label: "Срок подбора", value: "12 дней" },
    ],
  },
  {
    goal: "Цель: сохранение капитала",
    name: "Silhouette",
    lines: [
      { value: "Премиальная локация у моря" },
      { value: "Долгосрочный потенциал роста стоимости" },
    ],
  },
];

export function RecentDeals() {
  return (
    <section id="deals" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow="Кейсы"
          title={<>Недавние сделки</>}
          body="Несколько примеров объектов, подобранных под конкретные цели клиентов."
        />

        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {deals.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.07}>
              <div className="relative h-full overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
                <div className="flex h-full flex-col rounded-core bg-ink-900 p-8 md:p-10">
                  <span className="eyebrow">{d.goal}</span>
                  <h3 className="mt-6 font-display text-2xl font-light tracking-tight text-bone md:text-3xl">
                    {d.name}
                  </h3>

                  <div className="hairline mt-8" />

                  <dl className="mt-8 flex flex-col gap-4">
                    {d.lines.map((l) =>
                      l.label ? (
                        <div
                          key={l.value}
                          className="flex items-baseline justify-between gap-6"
                        >
                          <dt className="shrink-0 text-xs uppercase tracking-[0.14em] text-bone-faint">
                            {l.label}
                          </dt>
                          <dd className="text-right text-sm text-bone">
                            {l.value}
                          </dd>
                        </div>
                      ) : (
                        <p
                          key={l.value}
                          className="text-sm leading-relaxed text-bone-muted"
                        >
                          {l.value}
                        </p>
                      )
                    )}
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
