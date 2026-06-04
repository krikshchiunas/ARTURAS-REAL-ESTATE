import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Params = { params: { slug: string } };

// Статические страницы под каждый объект (SSG).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: {
      title: `${p.name} — ${site.name}`,
      description: p.summary,
      images: [{ url: p.image }],
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");

  return (
    <>
      <Navbar />
      <main id="main" className="relative pt-32 md:pt-40">
        <div className="shell">
          {/* Назад к каталогу */}
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-bone"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-500 ease-glass group-hover:-translate-x-1"
            >
              <path
                d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Все проекты
          </Link>

          {/* Шапка объекта */}
          <header className="mt-10 flex flex-col gap-6 md:mt-14">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-platinum">{number}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-bone-muted">
                {project.type}
              </span>
            </div>
            <h1 className="max-w-[18ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tight text-balance">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="text-lg text-bone-muted">
                {project.location}
                {project.developer ? ` · ${project.developer}` : ""}
              </p>
              <span className="font-display text-2xl font-light text-platinum-soft">
                {project.priceFrom}
              </span>
            </div>
          </header>
        </div>

        {/* Крупный кадр */}
        <div className="shell mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-core bg-ink-900">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Детали + характеристики */}
        <div className="shell mt-16 md:mt-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-pretty text-xl font-light leading-relaxed text-bone md:text-2xl">
                {project.summary}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton href={site.contacts.whatsapp}>
                  Узнать подробнее
                </MagneticButton>
                <MagneticButton href={site.contacts.telegram} variant="ghost">
                  Telegram
                </MagneticButton>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <dl className="flex flex-col">
                {project.facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-6 border-t border-white/[0.07] py-5 first:border-t-0"
                  >
                    <dt className="shrink-0 text-xs uppercase tracking-[0.14em] text-bone-faint">
                      {f.label}
                    </dt>
                    <dd className="text-right text-base text-bone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
