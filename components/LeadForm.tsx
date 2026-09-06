"use client";

import { useState } from "react";
import { getDictionary } from "@/lib/i18n";
import { getAttribution } from "@/lib/attribution";
import { events } from "@/lib/analytics";
import { Button } from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; message?: string; contact?: string };

// Форма заявки. Контракт и валидация не менялись (/api/telegram-lead):
// honeypot company, attribution из sessionStorage, обязательные имя + запрос
// и хотя бы один мессенджер. Изменилась оболочка и разбор ошибок: у каждой
// ошибки есть значок и текст (не только цвет), поля объявляют autocomplete
// и inputmode, чтобы на телефоне открывалась нужная клавиатура.
export function LeadForm({ lang }: { lang: string }) {
  const t = getDictionary(lang).contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => ((data.get(key) as string | null) ?? "").trim();

    const payload = {
      name: get("name"),
      email: get("email"),
      budget: get("budget"),
      message: get("message"),
      telegram: get("telegram"),
      whatsapp: get("whatsapp"),
      company: get("company"), // honeypot — у людей всегда пусто
      attribution: getAttribution(),
    };

    const next: FieldErrors = {};
    if (!payload.name) next.name = t.errors.name;
    if (!payload.message) next.message = t.errors.message;
    if (!payload.telegram && !payload.whatsapp) next.contact = t.errors.contact;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/telegram-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || t.errors.generic);
        return; // поля не сбрасываем — пользователь поправит и отправит снова
      }

      form.reset();
      setErrors({});
      setStatus("success");
      events.lead("form");
    } catch {
      setStatus("error");
      setErrorMsg(t.errors.network);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-control border border-sage/40 bg-sage/10 p-8 md:p-10"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-7 w-7 fill-sage">
          <path d="M10 .8a9.2 9.2 0 1 0 0 18.4A9.2 9.2 0 0 0 10 .8Zm4.5 6.8-5.2 5.6a1 1 0 0 1-1.45.03L5.5 11.3a1 1 0 1 1 1.4-1.42l1.6 1.58 4.5-4.85A1 1 0 1 1 14.5 7.6Z" />
        </svg>
        <h3 className="font-display text-title">{t.success.title}</h3>
        <p className="measure text-body text-bone-dim">{t.success.body}</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          {t.success.again}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot: скрыт от людей и скринридеров, исключён из табуляции. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="name"
          label={t.fields.name}
          required
          autoComplete="name"
          placeholder={t.fields.namePlaceholder}
          error={errors.name}
        />
        <Field
          id="email"
          label={t.fields.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          hint={t.fields.optional}
          placeholder={t.fields.emailPlaceholder}
        />
      </div>

      <Field
        id="budget"
        label={t.fields.budget}
        hint={t.fields.optional}
        placeholder={t.fields.budgetPlaceholder}
        helper={t.fields.budgetHelper}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-eyebrow uppercase tracking-eyebrow text-bone-dim">
          {t.fields.message} <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.fields.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-y rounded-control border bg-bone/[0.03] px-4 py-3 text-body text-bone transition-colors duration-micro placeholder:text-bone-faint focus:bg-bone/[0.06] focus:outline-none ${
            errors.message ? "border-danger" : "border-bone/15 focus:border-bone/45"
          }`}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="telegram"
          label={t.fields.telegram}
          autoComplete="username"
          hint={t.fields.optional}
          placeholder={t.fields.telegramPlaceholder}
          invalid={Boolean(errors.contact)}
          describedBy={errors.contact ? "contact-error" : undefined}
        />
        <Field
          id="whatsapp"
          label={t.fields.whatsapp}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint={t.fields.optional}
          placeholder={t.fields.whatsappPlaceholder}
          invalid={Boolean(errors.contact)}
          describedBy={errors.contact ? "contact-error" : undefined}
        />
      </div>
      {errors.contact && <FieldError id="contact-error">{errors.contact}</FieldError>}

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-control border border-danger/40 bg-danger/10 px-4 py-3 text-micro text-bone"
        >
          <AlertIcon />
          {errorMsg}
        </div>
      )}

      <div className="mt-2 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[38ch] text-micro text-bone-dim">{t.consent}</p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="max-md:w-full"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}

// Значок рядом с ошибкой: смысл не должен держаться на одном цвете —
// дальтоник и монохромный экран обязаны прочитать состояние.
function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 fill-danger"
    >
      <path d="M8 1.5 15 14H1L8 1.5Zm0 4.2a.75.75 0 0 0-.75.75v2.6a.75.75 0 0 0 1.5 0v-2.6A.75.75 0 0 0 8 5.7Zm0 5.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
    </svg>
  );
}

// role="alert" — иначе провал валидации виден только глазами: поля получают
// aria-invalid, но пока фокус не придёт на поле, скринридер молчит.
function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} role="alert" className="flex items-start gap-2 text-micro text-danger">
      <AlertIcon />
      {children}
    </span>
  );
}

function Field({
  id,
  label,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  helper,
  hint,
  required,
  error,
  invalid,
  describedBy,
}: {
  id: string;
  label: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  placeholder?: string;
  helper?: string;
  hint?: string;
  required?: boolean;
  error?: string;
  invalid?: boolean;
  // Сообщение об ошибке, живущее вне поля: у пары «Telegram / WhatsApp» оно
  // одно на два поля и лежит под ними.
  describedBy?: string;
}) {
  const isInvalid = Boolean(error) || Boolean(invalid);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-eyebrow uppercase tracking-eyebrow text-bone-dim">
        {label} {required && <span className="text-gold">*</span>}
        {hint && <span className="ml-2 normal-case tracking-normal text-bone-faint">{hint}</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={
          error
            ? `${id}-error`
            : describedBy
              ? describedBy
              : helper
                ? `${id}-helper`
                : undefined
        }
        className={`min-h-[48px] rounded-control border bg-bone/[0.03] px-4 py-3 text-body text-bone transition-colors duration-micro placeholder:text-bone-faint focus:bg-bone/[0.06] focus:outline-none ${
          isInvalid ? "border-danger" : "border-bone/15 focus:border-bone/45"
        }`}
      />
      {helper && !error && (
        <span id={`${id}-helper`} className="text-micro text-bone-faint">
          {helper}
        </span>
      )}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
