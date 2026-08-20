"use client";

import dynamic from "next/dynamic";

// Фоновые сцены страниц: About — «путь света» через ночной город, Contact —
// куб-монолит над водой под луной. Обе сцены сами раскладывают свои слои
// (картинка-небо, канвас, виньетка) фиксировано на весь экран, сами
// обрабатывают prefers-reduced-motion и молча отступают без WebGL — здесь
// остаётся только клиентская загрузка.

const AboutPathScene = dynamic(() => import("@/components/webgl/AboutPathScene"), {
  ssr: false,
});
const ContactCubeScene = dynamic(() => import("@/components/webgl/ContactCubeScene"), {
  ssr: false,
});

export function SceneBackdrop({ scene }: { scene: "about" | "contact" }) {
  return (
    <div className="pointer-events-none" aria-hidden>
      {scene === "about" ? <AboutPathScene /> : <ContactCubeScene />}
    </div>
  );
}
