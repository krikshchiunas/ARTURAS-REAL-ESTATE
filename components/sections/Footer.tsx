import { siteConfig, getDictionary } from "@/lib/i18n";
import { Socials } from "@/components/ui/Socials";

const NAV_ITEMS = [
  { href: "#approach", key: "approach" },
  { href: "#projects", key: "projects" },
  { href: "#founder", key: "founder" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

export function Footer({ lang }: { lang: string }) {
  const t = getDictionary(lang);
  const meta = t.meta;
  const year = new Date().getFullYear();

  return (
    <footer className="relative pb-[calc(3rem+env(safe-area-inset-bottom))] pt-16 md:pt-32">
      <div className="shell">
        <div className="hairline mb-12" />

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-light tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-muted">
              {meta.tagline}. {meta.region}.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <nav aria-label={t.a11y.footerNav}>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone-muted">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={`/${lang}${item.href}`}
                      className="transition-colors hover:text-bone"
                    >
                      {t.nav[item.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Socials className="md:justify-end" lang={lang} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 text-xs text-bone-faint md:mt-16 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-bone-muted">
              {t.footer.privacy}
            </a>
            <a href="#" className="transition-colors hover:text-bone-muted">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
