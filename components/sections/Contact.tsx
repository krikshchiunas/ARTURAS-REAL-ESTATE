"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Socials } from "@/components/ui/Socials";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; message?: string; contact?: string };

// Контакт-CTA: крупное утверждение + стеклянная форма.
// Заявка уходит напрямую в Telegram-бот через серверный роут /api/telegram-lead.
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => ((data.get(key) as string | null) ?? "").trim();

    const name = get("name");
    const email = get("email");
    const budget = get("budget");
    const message = get("message");
    const telegram = get("telegram");
    const whatsapp = get("whatsapp");

    // Клиентская валидация по брифу.
    const next: FieldErrors = {};
    if (!name) next.name = "Укажите имя";
    if (!message) next.message = "Опишите цель и запрос";
    if (!telegram && !whatsapp)
      next.contact = "Укажите хотя бы один контакт — Telegram или WhatsApp";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/telegram-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, budget, message, telegram, whatsapp }),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(
          json.error || "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
        return; // данные в полях сохраняются — форму не сбрасываем
      }

      form.reset();
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Не удалось отправить заявку. Проверьте соединение и попробуйте снова.",
      );
    }
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
              {status === "success" ? (
                <SuccessPanel onReset={() => setStatus("idle")} />
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5 rounded-core bg-ink-900/60 p-7 md:p-9"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id="name"
                      label="Имя"
                      required
                      placeholder="Как к вам обращаться"
                      error={errors.name}
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      optional
                      placeholder="you@private.com"
                    />
                  </div>

                  <Field
                    id="budget"
                    label="Бюджет"
                    optional
                    placeholder="Ориентир в $"
                    helper="Поможет точнее подобрать объекты."
                  />

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="flex items-center gap-2 text-sm text-bone"
                    >
                      <span>Цель и запрос</span>
                      <span aria-hidden className="text-platinum">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Локация, тип объекта, цель (жизнь / аренда / инвестиция), сроки"
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={`resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-bone placeholder:text-bone-faint transition-colors duration-300 focus:bg-white/[0.05] focus:border-platinum/50 ${
                        errors.message ? "border-platinum/60" : "border-white/10"
                      }`}
                    />
                    {errors.message && (
                      <span id="message-error" className="text-xs text-platinum-soft">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id="telegram"
                      label="Telegram"
                      optional
                      placeholder="@username или ссылка"
                      invalid={Boolean(errors.contact)}
                    />
                    <Field
                      id="whatsapp"
                      label="WhatsApp"
                      optional
                      placeholder="+7 900 000-00-00"
                      invalid={Boolean(errors.contact)}
                    />
                  </div>
                  {errors.contact && (
                    <span className="-mt-2 text-xs text-platinum-soft">
                      {errors.contact}
                    </span>
                  )}

                  {status === "error" && errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl border border-platinum/30 bg-platinum/5 px-4 py-3 text-sm text-platinum-soft"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="max-w-[34ch] text-xs leading-relaxed text-bone-faint">
                      Заявка уйдёт напрямую в Telegram. Отправляя форму, вы
                      соглашаетесь с обработкой данных.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="shrink-0 rounded-full bg-bone px-7 py-3 text-sm font-medium text-ink transition-all duration-500 ease-smooth hover:bg-platinum-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? "Отправка…" : "Отправить заявку"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-core bg-ink-900/60 p-10 text-center md:p-14">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-platinum/30 bg-platinum/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5l4.2 4.2L19 7"
            stroke="#E3D6C2"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="font-display text-2xl font-light tracking-tight text-bone md:text-3xl">
        Заявка отправлена
      </h3>
      <p className="max-w-prose text-pretty leading-relaxed text-bone-muted">
        Спасибо! Я свяжусь с вами в ближайшее время по указанному контакту.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors duration-300 hover:text-bone"
      >
        Отправить ещё одну заявку
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  helper,
  required,
  optional,
  error,
  invalid,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  invalid?: boolean;
}) {
  const isInvalid = Boolean(error) || Boolean(invalid);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm text-bone">
        <span>{label}</span>
        {required && (
          <span aria-hidden className="text-platinum">
            *
          </span>
        )}
        {optional && <span className="text-xs text-bone-faint">необязательно</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`rounded-xl border bg-white/[0.03] px-4 py-3 text-bone placeholder:text-bone-faint transition-colors duration-300 focus:bg-white/[0.05] focus:border-platinum/50 ${
          isInvalid ? "border-platinum/60" : "border-white/10"
        }`}
      />
      {helper && !error && <span className="text-xs text-bone-faint">{helper}</span>}
      {error && (
        <span id={`${id}-error`} className="text-xs text-platinum-soft">
          {error}
        </span>
      )}
    </div>
  );
}
