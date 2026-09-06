import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, siteConfig, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { LeadForm } from "@/components/LeadForm";

// Контакт: hero → слева прямые каналы и соцсети, справа форма → Telegram-бот.
// Фоновая WebGL-сцена «куб над водой» удалена вместе со старым дизайном.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const c = chromeDict(lang);
  const url = `${siteConfig.url}/${lang}/contact`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/contact`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/contact`;
  return {
    title: c.stubs.contact.title,
    description: c.stubs.contact.sub,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${c.stubs.contact.title} — ${siteConfig.name}`,
      description: c.stubs.contact.sub,
      url,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const c = chromeDict(lang);
  const t = getDictionary(lang);
  const socials = getSocials(lang);
  const direct = [
    { label: "WhatsApp", href: whatsappHref(t.common.whatsappPrefill) },
    { label: "Telegram", href: siteConfig.contacts.telegram },
  ];

  return (
    <main id="main">
      <section className="shell pb-14 pt-36">
        <HeroReveal>
          <span className="marker text-gold">{c.stubs.contact.chapter}</span>
        </HeroReveal>
        <HeroHeadline
          text={c.stubs.contact.title}
          delay={100}
          className="mt-5 max-w-[14ch] font-display tracking-monument text-display"
        />
        <HeroReveal delay={400}>
          <p className="mt-7 max-w-[46ch] text-lead text-bone-dim">
            {c.stubs.contact.sub}
          </p>
        </HeroReveal>
      </section>

      <section className="border-t border-bone/10">
        <div className="shell grid gap-14 py-section lg:grid-cols-12 lg:gap-16">
          {/* Прямые каналы */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display tracking-monument text-section">{c.contactPage.infoTitle}</h2>
              <span className="eyebrow text-bone-dim">{c.contactPage.infoSubtitle}</span>
            </div>

            <Reveal className="mt-10">
              <ul>
                {direct.map((d) => (
                  <li key={d.label} className="border-t border-bone/10 last:border-b">
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[64px] items-center justify-between gap-6"
                    >
                      <span className="marker text-gold">{c.contactPage.directLabel}</span>
                      <span className="flex items-center gap-3 font-display text-title transition-colors duration-micro group-hover:text-gold">
                        {d.label}
                        <span
                          aria-hidden="true"
                          className="text-micro text-bone-dim transition-transform duration-micro group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12" delay={100}>
              <span className="marker text-gold">{c.contactPage.socialsLabel}</span>
              <ul className="mt-5">
                {socials.map((s, i) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[44px] items-center gap-4 border-b border-bone/10"
                    >
                      <span className="tabular text-eyebrow text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-micro text-bone-dim transition-colors duration-micro group-hover:text-bone">
                        {s.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto text-micro text-bone-faint transition-transform duration-micro group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Форма */}
          <div className="lg:col-span-7">
            <h2 className="font-display tracking-monument text-section">{c.contactPage.formTitle}</h2>
            <Reveal className="mt-10" delay={140}>
              <LeadForm lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
