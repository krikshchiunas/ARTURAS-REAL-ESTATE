import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, siteConfig, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/redesign/dict";
import { Reveal, HeadlineReveal } from "@/components/redesign/Reveal";
import { LeadForm } from "@/components/redesign/LeadForm";

// Contact в структуре референса: hero «Get in touch» → слева прямые каналы
// и соцсети (mono-нумерация), справа форма «Drop us a line» → Telegram-бот.

export const metadata: Metadata = {
  title: "Contact",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const c = chromeDict(lang);
  const t = getDictionary(lang);
  const socials = getSocials(lang);
  const direct = [
    { label: "WhatsApp", href: whatsappHref(t.common.whatsappPrefill) },
    { label: "Telegram", href: siteConfig.contacts.telegram },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center px-6 pt-28 md:px-16">
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

      {/* Каналы + форма */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
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
                      className="group flex items-baseline justify-between gap-6 py-6"
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
                      className="group flex items-baseline gap-4 border-b border-offwhite/10 pb-3"
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
