import { site } from "@/lib/site";
import { Socials } from "@/components/ui/Socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pb-12 pt-24 md:pt-32">
      <div className="shell">
        <div className="hairline mb-12" />

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-light tracking-tight">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-muted">
              {site.tagline}. {site.region}.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <nav aria-label="Навигация в подвале">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone-muted">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Socials className="md:justify-end" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 text-xs text-bone-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-bone-muted">
              Приватность
            </a>
            <a href="#" className="transition-colors hover:text-bone-muted">
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
