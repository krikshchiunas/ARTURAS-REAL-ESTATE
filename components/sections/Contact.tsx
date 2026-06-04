"use client";

import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Socials } from "@/components/ui/Socials";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Контакт-CTA: крупное утверждение + стеклянная форма.
// Форма не «отправляется» в никуда — она собирает сообщение и ведёт клиента
// в WhatsApp (основной канал лидогенерации), как требует бриф.
export function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Имя: ${data.get("name") || "-"}`,
      `Бюджет: ${data.get("budget") || "-"}`,
      `Запрос: ${data.get("message") || "-"}`,
    ].join("\n");
    const url = `${site.contacts.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Контакт</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              Напишите <em className="text-platinum-soft">напрямую</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-pretty leading-relaxed text-bone-muted">
              Самый быстрый способ — написать в WhatsApp или Telegram. Расскажите
              о цели, и я подберу объекты на Пхукете под ваш запрос.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href={site.contacts.whatsapp}>
                Написать в WhatsApp
              </MagneticButton>
              <MagneticButton href={site.contacts.telegram} variant="ghost">
                Telegram
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <p className="eyebrow mb-4">Все каналы</p>
              <Socials />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="glass rounded-bezel p-2">
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-5 rounded-core bg-ink-900/60 p-7 md:p-9"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="name" label="Имя" placeholder="Как к вам обращаться" />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@private.com"
                  />
                </div>
                <Field
                  id="budget"
                  label="Бюджет"
                  placeholder="Ориентир, ฿ или $"
                  helper="Поможет точнее подобрать объекты."
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-bone">
                    Цель и запрос
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Локация, тип объекта, цель (жизнь / аренда / инвестиция), сроки"
                    className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone placeholder:text-bone-faint transition-colors duration-300 focus:border-platinum/50 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="max-w-[34ch] text-xs leading-relaxed text-bone-faint">
                    По кнопке откроется WhatsApp с заполненным сообщением. Отправляя,
                    вы соглашаетесь с обработкой данных.
                  </p>
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-bone px-7 py-3 text-sm font-medium text-ink transition-all duration-500 ease-smooth hover:bg-platinum-soft active:scale-[0.98]"
                  >
                    Продолжить в WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  helper,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-bone">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone placeholder:text-bone-faint transition-colors duration-300 focus:border-platinum/50 focus:bg-white/[0.05]"
      />
      {helper && <span className="text-xs text-bone-faint">{helper}</span>}
    </div>
  );
}
