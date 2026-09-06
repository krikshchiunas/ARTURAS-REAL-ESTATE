"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { linkPrefetch } from "@/lib/prefetch";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Button } from "@/components/Button";

type NavLink = { label: string; href: string; match: string[] };

/**
 * Мобильное меню на весь экран.
 *
 * Три вещи, без которых оверлей недоступен с клавиатуры и на скринридере:
 * фокус уезжает внутрь при открытии и возвращается на кнопку при закрытии,
 * Tab заперт внутри диалога, Escape закрывает. Плюс блокировка прокрутки фона
 * без сдвига макета — ширина скроллбара компенсируется padding-right.
 */
export function MenuOverlay({
  lang,
  open,
  onClose,
  links,
}: {
  lang: Locale;
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const t = chromeDict(lang);
  const d = getDictionary(lang);
  const socials = getSocials(lang);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement;

    // Блокируем фон, компенсируя ширину скроллбара, иначе контент прыгает.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.menu}
      // Скрываем от скринридера и от Tab, пока меню закрыто.
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[110] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        ref={panelRef}
        // overscroll-contain — против «протекания» прокрутки на страницу под
        // меню. body получает overflow:hidden, но прокручивает страницу не он,
        // а html (у него свой overflow-y:auto), поэтому одного замка на body
        // мало: когда содержимое меню короче экрана, тач-жест уходит на фон.
        // Тот же приём уже стоит на ленте районов карты.
        className={`h-full overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-2xl transition-opacity duration-base ease-smooth ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="shell flex min-h-full flex-col justify-between pb-12 pt-28">
          <nav aria-label={d.a11y.menu}>
            <ul>
              {links.map((l, i) => (
                <li key={l.href} className="border-b border-bone/10">
                  <Link
                    href={l.href}
                    prefetch={linkPrefetch(l.href)}
                    onClick={onClose}
                    className="flex items-baseline gap-5 py-5 transition-colors duration-micro hover:text-gold"
                  >
                    <span className="text-eyebrow tabular text-bone-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-title">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12">
            <Button
              href={whatsappHref(d.common.whatsappPrefill)}
              variant="primary"
              size="lg"
              className="w-full"
              arrow
            >
              {d.common.whatsapp}
            </Button>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
