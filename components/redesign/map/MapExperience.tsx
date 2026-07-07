"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import type { Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/redesign/dict";
import {
  buildPins,
  REGIONS,
  type RegionId,
} from "@/components/redesign/map/phuketGeo";
import { SoundToggle, useSound } from "@/components/redesign/SoundManager";

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

// Интерактивная карта в стиле Hubtown: почти чёрный рельеф, ромбы-кластеры
// районов (клик — полёт камеры к району и появление пинов проектов), список
// районов слева, ZOOM+шкала слева-внизу, компас-роза справа-внизу, нижняя
// полоса SOUND | OPEN PROJECT LIST | FILTERS и онбординг-гейт при первом входе.

const INTRO_KEY = "arturas-map-intro";

export function MapExperience({ lang, deepSlug }: { lang: Locale; deepSlug?: string }) {
  const t = chromeDict(lang);
  const { play } = useSound();
  const allPins = useMemo(() => buildPins(lang), [lang]);

  const deepRegion = deepSlug
    ? allPins.find((p) => p.project.slug === deepSlug)?.region ?? null
    : null;

  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(deepRegion);
  const [selected, setSelected] = useState<string | null>(deepSlug ?? null);
  const [listOpen, setListOpen] = useState(false);
  const [intro, setIntro] = useState(false);

  const [webglOk, setWebglOk] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const controlsRef = useRef<any>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const compassDegRef = useRef<HTMLSpanElement>(null);
  const roseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglOk(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Онбординг один раз за сессию; ?nopreload пропускает (автотесты).
    const skip =
      sessionStorage.getItem(INTRO_KEY) ||
      new URLSearchParams(window.location.search).has("nopreload") ||
      Boolean(deepSlug);
    if (!skip) setIntro(true);
  }, [deepSlug]);

  // Подстраховка размера холста после монтирования.
  useEffect(() => {
    const id = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => window.clearTimeout(id);
  }, []);

  // HUD-показания (зум/азимут) пишем прямо в DOM на rAF — без ре-рендеров.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const c = controlsRef.current;
      if (c) {
        const cam = c.object as { position: { distanceTo: (v: unknown) => number } };
        const dist = cam.position.distanceTo(c.target);
        const zoom = (1 - (dist - 12) / 58) * 2.5 + 0.5;
        if (zoomRef.current) zoomRef.current.textContent = `${zoom.toFixed(2)}X`;
        const az = c.getAzimuthalAngle();
        const deg = ((-az * 180) / Math.PI + 360) % 360;
        if (compassDegRef.current)
          compassDegRef.current.textContent = `${Math.round(deg).toString().padStart(3, "0")}°`;
        if (roseRef.current) roseRef.current.style.transform = `rotate(${deg}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Полёт камеры к району: цель → якорь района, дистанция — ближе.
  const flyToRegion = useCallback((id: RegionId | null) => {
    const c = controlsRef.current;
    if (!c) return;
    const cam = c.object;
    if (id === null) {
      gsap.to(c.target, { x: -9, y: 0, z: -3, duration: 1.1, ease: "power3.inOut", onUpdate: () => c.update() });
      gsap.to(cam.position, { x: -9, y: 30, z: 37, duration: 1.1, ease: "power3.inOut" });
      return;
    }
    const r = REGIONS.find((x) => x.id === id)!;
    const [ax, az] = r.anchor;
    gsap.to(c.target, { x: ax, y: 0, z: az, duration: 1.2, ease: "power3.inOut", onUpdate: () => c.update() });
    gsap.to(cam.position, {
      x: ax + 4,
      y: 14,
      z: az + 16,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, []);

  const onRegionSelect = useCallback(
    (id: RegionId) => {
      play("modal");
      setSelectedRegion((prev) => {
        const next = prev === id ? null : id;
        flyToRegion(next);
        return next;
      });
    },
    [flyToRegion, play],
  );

  const onSelect = useCallback(
    (slug: string) => {
      play("modal");
      const pin = allPins.find((p) => p.project.slug === slug);
      if (pin && pin.region !== selectedRegion) {
        setSelectedRegion(pin.region);
        flyToRegion(pin.region);
      }
      setSelected(slug);
      window.history.replaceState(null, "", `/${lang}/redesign/map/${slug}`);
    },
    [allPins, flyToRegion, lang, play, selectedRegion],
  );

  const closeOverlay = useCallback(() => {
    play("click");
    setSelected(null);
    window.history.replaceState(null, "", `/${lang}/redesign/map`);
  }, [lang, play]);

  const resetView = useCallback(() => {
    play("click");
    setSelectedRegion(null);
    flyToRegion(null);
  }, [flyToRegion, play]);

  const enterMap = useCallback(() => {
    play("modal");
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntro(false);
  }, [play]);

  const selectedPin = allPins.find((p) => p.project.slug === selected) ?? null;

  if (!webglOk) {
    return (
      <MapFallback lang={lang} pins={allPins} title={t.mapPage.hudTitle} discoverLabel={t.mapPage.discoverMore} />
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-night">
      <MapScene
        pins={allPins}
        activeSlug={selected}
        selectedRegion={selectedRegion}
        onSelect={onSelect}
        onRegionSelect={onRegionSelect}
        controlsRef={controlsRef}
        reduceMotion={reduceMotion}
        projectsWord={t.projectsWord}
      />

      {/* Заголовок карты */}
      <div className="pointer-events-none absolute left-6 top-24 md:left-16 md:top-28">
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {t.mapPage.hudTitle}
        </p>
      </div>

      {/* Список районов слева (стиль глав главной) */}
      <nav className="pointer-events-auto absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex md:left-16">
        {REGIONS.map((r) => {
          const active = selectedRegion === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onRegionSelect(r.id)}
              onMouseEnter={() => play("hover")}
              className={`flex items-center gap-3 font-mono text-11 uppercase tracking-4 transition-colors duration-300 ${
                active ? "text-offwhite" : "text-offwhite/30 hover:text-offwhite/70"
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 transition-opacity duration-300 ${
                  active ? "bg-offwhite opacity-100" : "opacity-0"
                }`}
              />
              {r.name}
            </button>
          );
        })}
      </nav>

      {/* ZOOM + шкала (лево-низ, над полосой) */}
      <div className="pointer-events-none absolute bottom-16 left-6 md:left-16">
        <div className="flex items-baseline gap-4 font-mono text-10 uppercase tracking-4 text-offwhite/50">
          <span>
            {t.mapPage.zoom} <span ref={zoomRef} className="text-offwhite">1.00X</span>
          </span>
          <span className="text-offwhite/70">2KM</span>
        </div>
        <div className="mt-2 h-px w-28 bg-offwhite/30">
          <div className="h-full w-1/3 bg-offwhite" />
        </div>
      </div>

      {/* Компас-роза (право-низ, над полосой) */}
      <div className="pointer-events-none absolute bottom-16 right-6 hidden md:right-16 md:block">
        <div className="relative h-24 w-24">
          {/* Стороны света */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-10 text-offwhite/70">N</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-10 text-offwhite/40">S</span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-10 text-offwhite/40">W</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-10 text-offwhite/40">E</span>
          {/* Вращающаяся роза-ромб */}
          <div ref={roseRef} className="absolute inset-3 will-change-transform">
            <div className="absolute inset-0 rotate-45 border border-offwhite/25" />
            <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-offwhite" />
          </div>
          {/* Центр: N + градусы */}
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-16 font-bold text-offwhite">N</span>
            <span ref={compassDegRef} className="mt-0.5 font-mono text-[9px] tracking-4 text-offwhite/60">
              000°
            </span>
          </div>
        </div>
      </div>

      {/* Нижняя полоса карты: SOUND | OPEN PROJECT LIST | FILTERS */}
      <div className="pointer-events-none absolute inset-x-[14px] bottom-[14px] z-[105] flex items-stretch">
        <div className="pointer-events-auto flex items-center border-t border-offwhite/12 bg-night/70 px-5 py-3 backdrop-blur-[2px]">
          <SoundToggle labels={{ on: t.soundOn, off: t.soundOff }} />
        </div>
        <div className="flex flex-1 items-center justify-center border-t border-offwhite/12 bg-night/70 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={() => {
              play("modal");
              setListOpen(true);
            }}
            onMouseEnter={() => play("hover")}
            className="pointer-events-auto flex items-center gap-2 font-mono text-11 uppercase tracking-4 text-offwhite/70 transition-colors duration-300 hover:text-offwhite"
          >
            <span className="inline-block h-1 w-3 border-y border-offwhite/60" aria-hidden />
            {t.mapPage.projectList}
          </button>
        </div>
        <button
          type="button"
          onClick={resetView}
          onMouseEnter={() => play("hover")}
          className="pointer-events-auto flex items-center gap-2 border-t border-offwhite/12 bg-night/70 px-5 py-3 font-mono text-11 uppercase tracking-4 text-offwhite/70 backdrop-blur-[2px] transition-colors duration-300 hover:text-offwhite"
        >
          {t.mapPage.filters}{" "}
          <span className="text-offwhite/40">
            [{selectedRegion ? "01" : "00"}]
          </span>
        </button>
      </div>

      {/* Панель списка */}
      <ListPanel
        open={listOpen}
        onClose={() => setListOpen(false)}
        pins={allPins}
        onSelect={(slug) => {
          setListOpen(false);
          onSelect(slug);
        }}
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

      {/* Онбординг-гейт */}
      {intro && (
        <div className="absolute inset-0 z-[80] flex flex-col items-center justify-center bg-night/85 px-6 backdrop-blur-[3px]">
          <h2 className="text-center text-32 font-bold uppercase leading-1.1 text-offwhite md:text-48">
            {t.mapPage.introTitle}
          </h2>
          <div className="mt-10 grid w-full max-w-3xl gap-px bg-offwhite/10 sm:grid-cols-3">
            {t.mapPage.introCards.map((card, i) => (
              <div key={card.title} className="flex flex-col items-center gap-4 bg-night/90 px-6 py-8">
                <span className="self-end font-mono text-10 tracking-4 text-offwhite/40">
                  ■ {String(i + 1).padStart(3, "0")}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-offwhite/5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d5e0ff" strokeWidth="1.3" aria-hidden>
                    {i === 0 && <path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" />}
                    {i === 1 && <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />}
                    {i === 2 && <path d="M7 4l10 8-6 1 3 6-3 1-3-6-4 4z" />}
                  </svg>
                </span>
                <span className="text-16 font-bold uppercase text-offwhite">{card.title}</span>
                <span className="text-center text-12 font-light leading-1.6 text-offwhite/60">
                  {card.body}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={enterMap}
            onMouseEnter={() => play("hover")}
            className="mt-10 bg-offwhite px-7 py-4 font-mono text-12 font-bold uppercase tracking-4 text-night transition-colors duration-300 hover:bg-white"
          >
            {t.mapPage.enterMap}
          </button>
        </div>
      )}
    </div>
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
      className={`absolute inset-y-0 right-0 z-[85] w-full max-w-md border-l border-offwhite/10 bg-night/95 backdrop-blur-md transition-transform duration-500 ease-smooth ${
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
    <div className="absolute inset-y-0 left-0 z-[90] w-full max-w-lg animate-[slidein_0.5s_ease] border-r border-offwhite/10 bg-night/95 backdrop-blur-md">
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

// Fallback без WebGL: карта заменяется читаемым списком проектов.
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
