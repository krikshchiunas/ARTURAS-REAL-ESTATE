"use client";

import { useState } from "react";
import { getDictionary } from "@/lib/i18n";
import { getAttribution } from "@/lib/attribution";
import { events } from "@/lib/analytics";
import { BracketButton } from "@/components/redesign/BracketButton";
import { useSound } from "@/components/redesign/SoundManager";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; message?: string; contact?: string };

// Форма заявки редизайна. Контракт и валидация — 1:1 со старой формой
// (/api/telegram-lead): honeypot company, attribution из sessionStorage,
// обязательные имя + запрос + один из мессенджеров. Меняется только оболочка:
// HUD-поля на night-фоне и bracket-кнопка отправки.
export function LeadForm({ lang }: { lang: string }) {
  const t = getDictionary(lang).contact;
  const { play } = useSound();
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
      play("modal");
      events.lead("form");
    } catch {
      setStatus("error");
      setErrorMsg(t.errors.network);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-6 border border-offwhite/15 p-8 md:p-12">
        <span className="inline-block h-1 w-1 animate-pulse bg-offwhite" aria-hidden />
        <h3 className="text-24 font-bold uppercase leading-1.1 md:text-32">
          {t.success.title}
        </h3>
        <p className="max-w-[28rem] text-14 font-light leading-1.6 text-offwhite/70">
          {t.success.body}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-11 uppercase tracking-4 text-offwhite/50 transition-colors duration-300 hover:text-offwhite"
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Honeypot: скрыт от людей и скринридеров, исключён из табуляции. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-7 md:grid-cols-2">
        <Field
          id="name"
          label={t.fields.name}
          required
          placeholder={t.fields.namePlaceholder}
          error={errors.name}
        />
        <Field
          id="email"
          label={t.fields.email}
          type="email"
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

      <div className="flex flex-col gap-3">
        <label htmlFor="message" className="font-mono text-11 uppercase tracking-4 text-offwhite/60">
          {t.fields.message} <span aria-hidden className="text-offwhite">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.fields.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-none border bg-offwhite/[0.03] px-4 py-3 text-16 font-light text-offwhite placeholder:text-offwhite/30 transition-colors duration-300 focus:border-offwhite/50 focus:bg-offwhite/[0.06] focus:outline-none ${
            errors.message ? "border-offwhite/60" : "border-offwhite/15"
          }`}
        />
        {errors.message && (
          <span id="message-error" className="font-mono text-10 uppercase tracking-4 text-offwhite/70">
            {errors.message}
          </span>
        )}
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <Field
          id="telegram"
          label={t.fields.telegram}
          hint={t.fields.optional}
          placeholder={t.fields.telegramPlaceholder}
          invalid={Boolean(errors.contact)}
        />
        <Field
          id="whatsapp"
          label={t.fields.whatsapp}
          hint={t.fields.optional}
          placeholder={t.fields.whatsappPlaceholder}
          invalid={Boolean(errors.contact)}
        />
      </div>
      {errors.contact && (
        <span className="-mt-4 font-mono text-10 uppercase tracking-4 text-offwhite/70">
          {errors.contact}
        </span>
      )}

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="border border-offwhite/30 bg-offwhite/5 px-4 py-3 text-14 font-light text-offwhite/80"
        >
          {errorMsg}
        </div>
      )}

      <div className="mt-2 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[26rem] font-mono text-10 uppercase leading-1.6 tracking-4 text-offwhite/40">
          {t.consent}
        </p>
        <BracketButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? t.submitting : t.submit}
        </BracketButton>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  helper,
  hint,
  required,
  error,
  invalid,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helper?: string;
  hint?: string;
  required?: boolean;
  error?: string;
  invalid?: boolean;
}) {
  const isInvalid = Boolean(error) || Boolean(invalid);
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="font-mono text-11 uppercase tracking-4 text-offwhite/60">
        {label}{" "}
        {required && (
          <span aria-hidden className="text-offwhite">
            *
          </span>
        )}
        {hint && <span className="ml-2 normal-case text-offwhite/30">{hint}</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`border bg-offwhite/[0.03] px-4 py-3 text-16 font-light text-offwhite placeholder:text-offwhite/30 transition-colors duration-300 focus:border-offwhite/50 focus:bg-offwhite/[0.06] focus:outline-none ${
          isInvalid ? "border-offwhite/60" : "border-offwhite/15"
        }`}
      />
      {helper && !error && (
        <span className="font-mono text-10 uppercase tracking-4 text-offwhite/40">
          {helper}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="font-mono text-10 uppercase tracking-4 text-offwhite/70">
          {error}
        </span>
      )}
    </div>
  );
}
