"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { HomeNarrative, HomeNarrativeFallback } from "@/components/webgl/HomeNarrative";

// Решает, показывать ли WebGL-нарратив или статичный fallback. Проверка идёт
// на клиенте после монтирования (SSR всегда отдаёт fallback-разметку, чтобы
// не было расхождения гидрации), с учётом prefers-reduced-motion и реальной
// поддержки WebGL.
function canRunWebGL(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function HomeExperience({ lang }: { lang: Locale }) {
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");

  useEffect(() => {
    setMode(canRunWebGL() ? "webgl" : "fallback");
  }, []);

  // Подстраховка размера холста R3F при восстановлении вкладки/смене ориентации:
  // выравниваем через кадр после переключения в webgl-режим.
  useEffect(() => {
    if (mode !== "webgl") return;
    const id = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => window.clearTimeout(id);
  }, [mode]);

  // До решения показываем fallback-разметку (совпадает с SSR) — экран не мигает
  // пустотой, а если WebGL доступен, следующий кадр заменит его сценой.
  if (mode === "webgl") return <HomeNarrative lang={lang} />;
  return <HomeNarrativeFallback lang={lang} />;
}
