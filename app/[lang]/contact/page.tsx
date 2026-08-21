import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, siteConfig, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal, HeadlineReveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { SceneBackdrop } from "@/components/webgl/SceneBackdrop";

// Contact в структуре референса: hero «Get in touch» → слева прямые каналы
// и соцсети (mono-нумерация), справа форма «Drop us a line» → Telegram-бот.

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

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
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
    <main className="relative min-h-screen">
      {/* Фон-сцена на всю страницу: куб-монолит над водой под луной.
          Прокрутка поднимает куб вместе с камерой. */}
      <SceneBackdrop scene="contact" />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 md:px-16">
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {c.stubs.contact.chapter}
        </p>
        <HeadlineReveal
          text={c.stubs.contact.title}
          className="mt-8 max-w-[12ch] text-54 font-bold uppercase leading-0.9 md:text-120 md:leading-0.8"
        />
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-[34rem] text-16 font-light leading-1.6 text-offwhite/70">
            {c.stubs.contact.sub}
          </p>
        </Reveal>
      </section>

      {/* Каналы + форма. data-scene-end: подъём куба заканчивается ровно здесь,
          чтобы под формой не оставалось прокрутки по пустому фону. */}
      <section
        data-scene-end
        className="relative z-10 border-t border-offwhite/10 bg-night/60 px-6 py-24 backdrop-blur-sm md:px-16 md:py-32"
      >
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-32 font-bold uppercase leading-0.9 md:text-48">
                {c.contactPage.infoTitle}
              </h2>
              <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
                {c.contactPage.infoSubtitle}
              </span>
            </div>

            <Reveal className="mt-12">
              <ul className="space-y-px bg-offwhite/10">
                {direct.map((d) => (
                  <li key={d.label} className="bg-night">
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[56px] items-center justify-between gap-6 py-5"
                    >
                      <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
                        {c.contactPage.directLabel}
                      </span>
                      <span className="text-24 font-bold uppercase transition-colors duration-300 group-hover:text-offwhite md:text-30">
                        {d.label}
                        <span
                          aria-hidden
                          className="ml-3 inline-block font-mono text-14 text-offwhite/40 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-14" delay={0.1}>
              <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
                {c.contactPage.socialsLabel}
              </p>
              <ul className="mt-6 space-y-3">
                {socials.map((s, i) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[44px] items-center gap-4 border-b border-offwhite/10"
                    >
                      <span className="font-mono text-10 tracking-4 text-offwhite/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-16 font-light text-offwhite/80 transition-colors duration-300 group-hover:text-offwhite">
                        {s.label}
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto font-mono text-10 text-offwhite/30 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-32 font-bold uppercase leading-0.9 md:text-48">
                {c.contactPage.formTitle}
              </h2>
            </div>
            <Reveal className="mt-12" delay={0.15}>
              <LeadForm lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
