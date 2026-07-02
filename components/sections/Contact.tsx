"use client";

import { useState } from "react";
import { siteConfig, getDictionary, whatsappHref } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Socials } from "@/components/ui/Socials";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { events } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; message?: string; contact?: string };

// Контакт-CTA: крупное утверждение + стеклянная форма.
// Заявка уходит напрямую в Telegram-бот через серверный роут /api/telegram-lead.
export function Contact({ lang }: { lang: string }) {
  const t = getDictionary(lang).contact;
  const common = getDictionary(lang).common;
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
    const company = get("company"); // honeypot — у людей всегда пусто

    // Клиентская валидация по брифу.
    const next: FieldErrors = {};
    if (!name) next.name = t.errors.name;
    if (!message) next.message = t.errors.message;
    if (!telegram && !whatsapp) next.contact = t.errors.contact;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/telegram-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          budget,
          message,
          telegram,
          whatsapp,
          company,
          attribution: getAttribution(),
        }),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || t.errors.generic);
        return; // данные в полях сохраняются — форму не сбрасываем
      }

      form.reset();
      setErrors({});
      setStatus("success");
      // Конверсия: заявка с формы. Настраивается как цель в GA4 → импорт в Google Ads.
      events.lead("form");
    } catch {
      setStatus("error");
      setErrorMsg(t.errors.network);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-40">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              {t.titleLead}<em className="text-platinum-soft">{t.titleEmphasis}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-pretty leading-relaxed text-bone-muted">
              {t.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <MagneticButton
                href={whatsappHref(common.whatsappPrefill)}
                className="w-full justify-between sm:w-auto"
                onClick={() => events.whatsapp("contact_section")}
              >
                {common.whatsapp}
              </MagneticButton>
              <MagneticButton
                href={siteConfig.contacts.telegram}
                variant="ghost"
                className="w-full justify-between sm:w-auto"
                onClick={() => events.telegram("contact_section")}
              >
                {common.telegram}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <p className="eyebrow mb-4">{common.allChannels}</p>
              <Socials lang={lang} />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="glass rounded-bezel p-2">
              {status === "success" ? (
                <SuccessPanel
                  onReset={() => setStatus("idle")}
                  text={t.success}
                />
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5 rounded-core bg-ink-900/60 p-5 sm:p-7 md:p-9"
                >
                  {/* Honeypot от ботов: скрыт от людей и скринридеров,
                      исключён из табуляции. Заполнен → заявка молча отклоняется. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id="name"
                      label={t.fields.name}
                      required
                      placeholder={t.fields.namePlaceholder}
                      error={errors.name}
                      optionalLabel={t.fields.optional}
                    />
                    <Field
                      id="email"
                      label={t.fields.email}
                      type="email"
                      optional
                      placeholder={t.fields.emailPlaceholder}
                      optionalLabel={t.fields.optional}
                    />
                  </div>

                  <Field
                    id="budget"
                    label={t.fields.budget}
                    optional
                    placeholder={t.fields.budgetPlaceholder}
                    helper={t.fields.budgetHelper}
                    optionalLabel={t.fields.optional}
                  />

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="flex items-center gap-2 text-sm text-bone"
                    >
                      <span>{t.fields.message}</span>
                      <span aria-hidden className="text-platinum">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder={t.fields.messagePlaceholder}
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
                      label={t.fields.telegram}
                      optional
                      placeholder={t.fields.telegramPlaceholder}
                      invalid={Boolean(errors.contact)}
                      optionalLabel={t.fields.optional}
                    />
                    <Field
                      id="whatsapp"
                      label={t.fields.whatsapp}
                      optional
                      placeholder={t.fields.whatsappPlaceholder}
                      invalid={Boolean(errors.contact)}
                      optionalLabel={t.fields.optional}
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

                  <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[34ch] text-xs leading-relaxed text-bone-faint">
                      {t.consent}
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full shrink-0 rounded-full bg-bone px-7 py-3 text-sm font-medium text-ink transition-all duration-500 ease-smooth hover:bg-platinum-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting" ? t.submitting : t.submit}
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

function SuccessPanel({
  onReset,
  text,
}: {
  onReset: () => void;
  text: { title: string; body: string; again: string };
}) {
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
        {text.title}
      </h3>
      <p className="max-w-prose text-pretty leading-relaxed text-bone-muted">
        {text.body}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors duration-300 hover:text-bone"
      >
        {text.again}
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
  optionalLabel = "необязательно",
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
  optionalLabel?: string;
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
        {optional && <span className="text-xs text-bone-faint">{optionalLabel}</span>}
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
