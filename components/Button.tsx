import Link from "next/link";
import { linkPrefetch } from "@/lib/prefetch";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

// min-h-[44px] везде — минимальная цель под палец (Apple HIG / Material 48dp).
// Переход 200ms и сдвиг стрелки — единственная «анимация» кнопки: layout при
// наведении не меняется, поэтому соседний контент не дёргается.
const base =
  "group inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2.5 " +
  "rounded-full font-sans font-medium tracking-tight transition-all duration-micro ease-smooth " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Золото на чернильном тексте — 8.34:1, единственный первичный CTA на экран.
  primary: "bg-gold text-ink hover:bg-gold-bright active:scale-[0.98]",
  secondary:
    "border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 active:scale-[0.98]",
  ghost: "text-bone-dim hover:text-bone",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-micro",
  lg: "px-8 py-4 text-body",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Стрелка-аффорданс: показывает, что действие ведёт дальше. */
  arrow?: boolean;
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-micro ease-smooth group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );
}

export function Button({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  ...rest
}: CommonProps & {
  href?: string;
  external?: boolean;
} & Omit<ComponentProps<"button">, "className" | "children">) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    // Внешние каналы (WhatsApp/Telegram/соцсети) открываем в новой вкладке;
    // rel обязателен — без noopener новая вкладка получает доступ к window.opener.
    if (external || /^https?:|^mailto:|^tel:/.test(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} prefetch={linkPrefetch(href)} className={cls}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
