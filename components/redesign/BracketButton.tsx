"use client";

import Link from "next/link";
import { useSound } from "@/components/redesign/SoundManager";

// Фирменная кнопка референса: mono-uppercase подпись в рамке из 8 «прицельных»
// маркеров (4 угла + середины сторон). В покое видны три маркера, на hover
// проявляются остальные и подложка чуть подсвечивается. Hover/click озвучены.

type BracketButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const DOTS = [
  { pos: "left-0 top-0", idle: true },
  { pos: "right-0 top-0", idle: false },
  { pos: "left-0 top-1/2 -translate-y-1/2", idle: false },
  { pos: "right-0 top-1/2 -translate-y-1/2", idle: true },
  { pos: "left-0 bottom-0", idle: true },
  { pos: "right-0 bottom-0", idle: false },
  { pos: "left-1/2 top-0 -translate-x-1/2", idle: false },
  { pos: "left-1/2 bottom-0 -translate-x-1/2", idle: false },
];

export function BracketButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  disabled,
}: BracketButtonProps) {
  const { play } = useSound();

  const inner = (
    <>
      {DOTS.map((dot) => (
        <span
          key={dot.pos}
          aria-hidden
          className={`absolute h-[3px] w-[3px] bg-current transition-opacity duration-300 ${dot.pos} ${
            dot.idle ? "opacity-60" : "opacity-0 group-hover:opacity-60"
          }`}
        />
      ))}
      <span className="relative block px-7 py-4 font-mono text-12 uppercase tracking-4 transition-colors duration-300">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 bg-offwhite/0 transition-colors duration-300 group-hover:bg-offwhite/5"
      />
    </>
  );

  const shared = {
    className: `group relative inline-block text-offwhite disabled:cursor-not-allowed disabled:opacity-50 ${className}`,
    onMouseEnter: () => play("hover"),
    onClick: () => {
      play("click");
      onClick?.();
    },
  };

  if (href) {
    // Внешние ссылки (WhatsApp, соцсети) — обычный <a> в новой вкладке.
    if (href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} {...shared}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} {...shared}>
      {inner}
    </button>
  );
}
