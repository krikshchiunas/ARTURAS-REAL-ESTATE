import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/redesign/dict";
import { Header } from "@/components/redesign/Header";
import { Footer } from "@/components/redesign/Footer";
import { Cursor } from "@/components/redesign/Cursor";
import { ChatChip } from "@/components/redesign/ChatChip";
import { BottomBar } from "@/components/redesign/BottomBar";
import { Preloader } from "@/components/redesign/Preloader";
import { HudFrame } from "@/components/redesign/HudFrame";

// Оболочка редизайна: шапка + меню, футер, кастомный курсор, чип чата и
// прелоадер — общие для всех страниц под /redesign. Когда редизайн заменит
// текущий сайт, этот layout переедет на уровень [lang].
export default function RedesignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const t = chromeDict(lang);

  return (
    <div className="redesign-root bg-night text-offwhite selection:bg-royal selection:text-offwhite">
      <Preloader texts={t.preloader} />
      <HudFrame />
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
      {/* Desktop: постоянная нижняя HUD-полоса; mobile: компактный чип чата */}
      <BottomBar lang={lang} />
      <ChatChip lang={lang} label={t.chat} />
      <Cursor />
    </div>
  );
}
