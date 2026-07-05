"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/redesign/dict";
import { buildPins, REGIONS, regionCounts, type RegionId } from "@/components/redesign/map/phuketGeo";
import { useSound } from "@/components/redesign/SoundManager";

const MapScene = dynamic(() => import("@/components/redesign/map/MapScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-pulse font-mono text-11 uppercase tracking-4 text-offwhite/40">
        Loading map…
      </span>
    </div>
  ),
});

// Интерактивная карта проектов: 3D-остров + HUD-слой (зум, компас, шкала),
// фильтр по районам, панель списка и выезжающий оверлей проекта. deepSlug
// приходит из маршрута /redesign/map/[slug] — карта открывается сразу на нём.
export function MapExperience({ lang, deepSlug }: { lang: Locale; deepSlug?: string }) {
  const t = chromeDict(lang);
  const router = useRouter();
  const { play } = useSound();
  const allPins = useMemo(() => buildPins(lang), [lang]);
  const counts = useMemo(() => regionCounts(lang), [lang]);

  const [filter, setFilter] = useState<RegionId | "all">("all");
  const [selected, setSelected] = useState<string | null>(deepSlug ?? null);
  const [listOpen, setListOpen] = useState(false);
  // Карта требует WebGL. Если его нет — показываем текстовый список проектов
  // (см. MapFallback). Проверяем на клиенте после монтирования.
  const [webglOk, setWebglOk] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglOk(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Подстраховка размера холста: R3F измеряет контейнер через ResizeObserver,
  // но при восстановлении вкладки / смене ориентации первый кадр иногда
  // приходит до наблюдателя. Пинок resize сразу после монтирования выравнивает.
  useEffect(() => {
    const id = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => window.clearTimeout(id);
  }, []);

  const controlsRef = useRef<any>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const compassRef = useRef<HTMLSpanElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);

  const pins = useMemo(
    () => (filter === "all" ? allPins : allPins.filter((p) => p.region === filter)),
    [allPins, filter],
  );
  const selectedPin = allPins.find((p) => p.project.slug === selected) ?? null;

  // HUD-показания камеры обновляем на rAF, минуя React-стейт (иначе ре-рендер
  // на каждый кадр). Пишем прямо в DOM через refs.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const c = controlsRef.current;
      if (c) {
        const cam = c.object as { position: { distanceTo: (v: unknown) => number } };
        const dist = cam.position.distanceTo(c.target);
        // 14…70 → 3.0x…0.5x (ближе = крупнее)
        const zoom = (1 - (dist - 14) / 56) * 2.5 + 0.5;
        if (zoomRef.current) zoomRef.current.textContent = `${zoom.toFixed(1)}x`;
        const az = c.getAzimuthalAngle();
        const deg = ((-az * 180) / Math.PI + 360) % 360;
        if (compassRef.current) compassRef.current.textContent = `${Math.round(deg).toString().padStart(3, "0")}°`;
        if (needleRef.current) needleRef.current.style.transform = `rotate(${deg}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onSelect = useCallback(
    (slug: string) => {
      play("modal");
      setSelected(slug);
      // Deep-link без перезагрузки: URL совпадает с прямым заходом на /map/{slug}.
      window.history.replaceState(null, "", `/${lang}/redesign/map/${slug}`);
    },
    [lang, play],
  );

  const closeOverlay = useCallback(() => {
    play("click");
    setSelected(null);
    window.history.replaceState(null, "", `/${lang}/redesign/map`);
  }, [lang, play]);

  const resetView = useCallback(() => {
    play("click");
    controlsRef.current?.reset();
  }, [play]);

  if (!webglOk) {
    return <MapFallback lang={lang} pins={allPins} title={t.mapPage.hudTitle} discoverLabel={t.mapPage.discoverMore} />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-night">
      <MapScene
        pins={pins}
        activeSlug={selected}
        onSelect={onSelect}
        controlsRef={controlsRef}
        reduceMotion={reduceMotion}
      />

      {/* Верхний HUD: заголовок + список + фильтры */}
      <div className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-24 md:px-16 md:pt-28">
        <div className="pointer-events-auto flex items-start justify-between gap-4">
          <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
            {t.mapPage.hudTitle}
          </p>
          <button
            type="button"
            onClick={() => { play("modal"); setListOpen(true); }}
            className="shrink-0 whitespace-nowrap font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
          >
            {t.mapPage.projectList} [{String(pins.length).padStart(2, "0")}]
          </button>
        </div>
        <div className="pointer-events-auto mt-4 flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => { play("hover"); setFilter("all"); }}>
            {t.mapPage.allRegions}
          </FilterChip>
          {REGIONS.map((r) => (
            <FilterChip
              key={r.id}
              active={filter === r.id}
              onClick={() => { play("hover"); setFilter(r.id); }}
            >
              {r.name}{" "}
              <span className="text-offwhite/40">
                {String(counts[r.id]).padStart(2, "0")}
              </span>
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Компас (лево-низ) */}
      <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 md:left-16">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20">
          <span ref={needleRef} className="absolute h-4 w-px origin-bottom bg-offwhite" style={{ bottom: "50%" }} />
          <span className="font-mono text-[8px] uppercase text-offwhite/40">N</span>
        </span>
        <span ref={compassRef} className="font-mono text-11 tracking-4 text-offwhite/60">
          000°
        </span>
      </div>

      {/* Зум + шкала (право-низ) */}
      <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-5 md:right-16">
        <div className="flex items-center gap-2">
          <span className="h-px w-12 bg-offwhite/30" />
          <span className="font-mono text-10 uppercase tracking-4 text-offwhite/40">1 km</span>
        </div>
        <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {t.mapPage.zoom} <span ref={zoomRef} className="text-offwhite">1.0x</span>
        </span>
        <button
          type="button"
          onClick={resetView}
          className="pointer-events-auto font-mono text-10 uppercase tracking-4 text-offwhite/40 transition-colors duration-300 hover:text-offwhite"
        >
          {t.mapPage.resetView}
        </button>
      </div>

      {/* Панель списка */}
      <ListPanel
        open={listOpen}
        onClose={() => setListOpen(false)}
        pins={allPins}
        onSelect={(slug) => { setListOpen(false); onSelect(slug); }}
        title={t.mapPage.projectList}
        closeLabel={t.mapPage.close}
      />

      {/* Оверлей проекта */}
      {selectedPin && (
        <ProjectOverlay
          lang={lang}
          slug={selectedPin.project.slug}
          name={selectedPin.project.name}
          location={selectedPin.project.location}
          type={selectedPin.project.type}
          summary={selectedPin.project.summary}
          image={selectedPin.project.image}
          keyPoints={selectedPin.project.keyPoints}
          labels={t.mapPage}
          discoverHref={`/${lang}/projects/${selectedPin.project.slug}`}
          onClose={closeOverlay}
        />
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pointer-events-auto border px-3 py-1.5 font-mono text-10 uppercase tracking-4 transition-colors duration-300 ${
        active
          ? "border-offwhite bg-offwhite text-night"
          : "border-offwhite/20 text-offwhite/60 hover:border-offwhite/50 hover:text-offwhite"
      }`}
    >
      {children}
    </button>
  );
}

function ListPanel({
  open,
  onClose,
  pins,
  onSelect,
  title,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  pins: ReturnType<typeof buildPins>;
  onSelect: (slug: string) => void;
  title: string;
  closeLabel: string;
}) {
  return (
    <div
      className={`absolute inset-y-0 right-0 z-[60] w-full max-w-md border-l border-offwhite/10 bg-night/95 backdrop-blur-md transition-transform duration-500 ease-smooth ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-offwhite/10 px-6 py-6 pt-24 md:pt-6">
          <span className="font-mono text-11 uppercase tracking-4 text-offwhite/60">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
          >
            {closeLabel}
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {pins.map((pin, i) => (
            <li key={pin.project.slug}>
              <button
                type="button"
                onClick={() => onSelect(pin.project.slug)}
                className="group flex w-full items-baseline gap-4 border-b border-offwhite/10 px-6 py-5 text-left transition-colors duration-300 hover:bg-offwhite/5"
              >
                <span className="font-mono text-10 tracking-4 text-offwhite/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-18 font-bold uppercase leading-1.1 text-offwhite">
                    {pin.project.name}
                  </span>
                  <span className="mt-1 block font-mono text-10 uppercase tracking-4 text-offwhite/40">
                    {pin.project.location}
                  </span>
                </span>
                <span aria-hidden className="font-mono text-offwhite/30 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectOverlay({
  lang,
  name,
  location,
  type,
  summary,
  image,
  keyPoints,
  labels,
  discoverHref,
  onClose,
}: {
  lang: Locale;
  slug: string;
  name: string;
  location: string;
  type: string;
  summary: string;
  image: string;
  keyPoints: string[];
  labels: ReturnType<typeof chromeDict>["mapPage"];
  discoverHref: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-y-0 left-0 z-[70] w-full max-w-lg animate-[slidein_0.5s_ease] border-r border-offwhite/10 bg-night/95 backdrop-blur-md">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
          <Image src={image} alt={name} fill sizes="512px" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-24 border border-offwhite/30 bg-night/70 px-3 py-1.5 font-mono text-10 uppercase tracking-4 text-offwhite backdrop-blur-sm transition-colors duration-300 hover:bg-offwhite hover:text-night md:top-6"
          >
            {labels.close}
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 py-8 md:px-10">
          <div className="grid grid-cols-2 gap-px bg-offwhite/10">
            <Cell label={labels.locationLabel} value={location} />
            <Cell label={labels.typeLabel} value={type} />
          </div>

          <h2 className="mt-8 text-40 font-bold uppercase leading-0.9 text-offwhite md:text-56">
            {name}
          </h2>
          <p className="mt-6 text-16 font-light leading-1.6 text-offwhite/70">{summary}</p>

          {keyPoints.length > 0 && (
            <ul className="mt-8 space-y-2">
              {keyPoints.slice(0, 4).map((k, i) => (
                <li key={i} className="flex gap-3 border-b border-offwhite/10 pb-2">
                  <span className="font-mono text-10 tracking-4 text-offwhite/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-14 font-light text-offwhite/70">{k}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-10">
            <Link
              href={discoverHref}
              className="group inline-flex items-center gap-3 border border-offwhite/30 px-6 py-4 font-mono text-12 uppercase tracking-4 text-offwhite transition-colors duration-300 hover:bg-offwhite hover:text-night"
            >
              {labels.discoverMore}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-night p-4">
      <span className="font-mono text-10 uppercase tracking-4 text-offwhite/40">{label}</span>
      <span className="mt-2 block text-14 font-light text-offwhite/80">{value}</span>
    </div>
  );
}

// Fallback без WebGL: карта заменяется читаемым списком проектов с ссылками на
// их страницы. Тот же контент, без 3D.
function MapFallback({
  lang,
  pins,
  title,
  discoverLabel,
}: {
  lang: Locale;
  pins: ReturnType<typeof buildPins>;
  title: string;
  discoverLabel: string;
}) {
  return (
    <main className="min-h-screen px-6 pt-28 md:px-16">
      <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">{title}</p>
      <ul className="mt-10 border-t border-offwhite/10">
        {pins.map((pin, i) => (
          <li key={pin.project.slug}>
            <Link
              href={`/${lang}/projects/${pin.project.slug}`}
              className="group grid grid-cols-12 items-center gap-4 border-b border-offwhite/10 py-6"
            >
              <span className="col-span-1 font-mono text-10 tracking-4 text-offwhite/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-6 text-24 font-bold uppercase text-offwhite md:text-32">
                {pin.project.name}
              </span>
              <span className="col-span-3 font-mono text-11 uppercase tracking-4 text-offwhite/50">
                {pin.project.location}
              </span>
              <span className="col-span-2 text-right font-mono text-10 uppercase tracking-4 text-offwhite/40 transition-colors group-hover:text-offwhite">
                {discoverLabel} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
