"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

// Магнитная кнопка с button-in-button иконкой. Непрерывные значения держим в
// motion value (без useState и ре-рендеров каждый кадр).
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm tracking-tight transition-colors duration-500 ease-smooth active:scale-[0.98]";
  const skin =
    variant === "primary"
      ? "bg-bone text-ink hover:bg-platinum-soft"
      : "glass text-bone hover:border-white/20";

  // Внешние ссылки (WhatsApp/Telegram) открываются в новой вкладке.
  const isExternal = href.startsWith("http");
  const external = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      {...external}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${skin} ${className}`}
    >
      <span className="font-medium">{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-glass group-hover:translate-x-0.5 ${
          variant === "primary" ? "bg-ink/10" : "bg-white/10"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 ease-glass group-hover:translate-x-0.5"
        >
          <path
            d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.a>
  );
}
