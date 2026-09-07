"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import type { Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/dict";
import {
  buildPins,
  REGIONS,
  type RegionId,
} from "@/components/map/phuketGeo";
import vectors from "@/components/map/phuketVectors.json";

const MapScene = dynamic(() => import("@/components/map/MapScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-pulse text-eyebrow uppercase tracking-eyebrow text-bone-faint">
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

// ─── Мини-карта острова (левый низ, как в референсе Hubtown) ─────────────────
// Силуэт Пхукета из тех же векторов + точка текущего положения камеры.
const MM_W = 104;
const MM_H = 132;
const MM_PAD = 7;
const MM_BOUNDS = (() => {
  let minx = Infinity, maxx = -Infinity, minz = Infinity, maxz = -Infinity;
  for (const l of vectors.coast as number[][]) {
    for (let i = 0; i < l.length; i += 2) {
      minx = Math.min(minx, l[i]); maxx = Math.max(maxx, l[i]);
      minz = Math.min(minz, l[i + 1]); maxz = Math.max(maxz, l[i + 1]);
    }
  }
  return { minx, maxx, minz, maxz };
})();
function mmX(x: number) {
  const { minx, maxx } = MM_BOUNDS;
  return MM_PAD + ((x - minx) / (maxx - minx)) * (MM_W - MM_PAD * 2);
}
function mmY(z: number) {
  const { minz, maxz } = MM_BOUNDS;
  return MM_PAD + ((z - minz) / (maxz - minz)) * (MM_H - MM_PAD * 2);
}
const MM_PATH = (() => {
  const parts: string[] = [];
  for (const l of vectors.coast as number[][]) {
    if (l.length < 6) continue;
    let d = "";
    for (let i = 0; i < l.length; i += 4) {
      // прореживаем вдвое — силуэта достаточно, разметка легче
      d += `${d ? "L" : "M"}${mmX(l[i]).toFixed(1)} ${mmY(l[i + 1]).toFixed(1)}`;
    }
    parts.push(d);
  }
  return parts.join(" ");
})();

export function MapExperience({ lang, deepSlug }: { lang: Locale; deepSlug?: string }) {
  const t = chromeDict(lang);
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
  // Тач-режим меняет и подсказки онбординга (пальцы вместо мыши), и чувстви-
  // тельность управления. Определяем по возможностям указателя, а не по ширине:
  // планшет бывает шире ноутбука, а ноутбук — с сенсорным экраном.
  const [touch, setTouch] = useState(false);

  const controlsRef = useRef<any>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const compassDegRef = useRef<HTMLSpanElement>(null);
  const roseRef = useRef<HTMLDivElement>(null);
  const mmDotRef = useRef<SVGCircleElement>(null);
  const mmHaloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglOk(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
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

  // HUD-показания (зум/азимут/мини-карта) пишем прямо в DOM на rAF — без
  // ре-рендеров. Каждое значение обновляется ТОЛЬКО когда реально изменилось:
  // безусловная запись 5 узлов каждый кадр держала браузер в постоянном
  // пересчёте стилей даже на неподвижной камере.
  useEffect(() => {
    let raf = 0;
    let lastZoom = "";
    let lastDeg = -1;
    let lastCx = "";
    const tick = () => {
      const c = controlsRef.current;
      if (c) {
        const cam = c.object as { position: { distanceTo: (v: unknown) => number } };
        const dist = cam.position.distanceTo(c.target);
        const zoom = `${((1 - (dist - 12) / 58) * 2.5 + 0.5).toFixed(2)}X`;
        if (zoom !== lastZoom) {
          lastZoom = zoom;
          if (zoomRef.current) zoomRef.current.textContent = zoom;
        }
        const az = c.getAzimuthalAngle();
        const deg = Math.round(((-az * 180) / Math.PI + 360) % 360);
        if (deg !== lastDeg) {
          lastDeg = deg;
          if (compassDegRef.current)
            compassDegRef.current.textContent = `${deg.toString().padStart(3, "0")}°`;
          if (roseRef.current) roseRef.current.style.transform = `rotate(${deg}deg)`;
        }
        const cx = mmX(c.target.x).toFixed(1);
        const cy = mmY(c.target.z).toFixed(1);
        if (cx + cy !== lastCx) {
          lastCx = cx + cy;
          if (mmDotRef.current) {
            mmDotRef.current.setAttribute("cx", cx);
            mmDotRef.current.setAttribute("cy", cy);
          }
          if (mmHaloRef.current) {
            mmHaloRef.current.setAttribute("cx", cx);
            mmHaloRef.current.setAttribute("cy", cy);
          }
        }
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
      gsap.to(c.target, { x: -2, y: 0, z: -11, duration: 1.1, ease: "power3.inOut", onUpdate: () => c.update() });
      gsap.to(cam.position, { x: -2, y: 26, z: 31, duration: 1.1, ease: "power3.inOut" });
      return;
    }
    const r = REGIONS.find((x) => x.id === id)!;
    const [ax, az] = r.focus;
    // Приближение к району — камера сильнее наклоняется (выражённое 3D).
    gsap.to(c.target, { x: ax, y: 1, z: az, duration: 1.2, ease: "power3.inOut", onUpdate: () => c.update() });
    gsap.to(cam.position, {
      x: ax + 2,
      y: 7,
      z: az + 5.5,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, []);

  const onRegionSelect = useCallback(
    (id: RegionId) => {
      setSelectedRegion((prev) => {
        const next = prev === id ? null : id;
        flyToRegion(next);
        return next;
      });
    },
    [flyToRegion],
  );

  const onSelect = useCallback(
    (slug: string) => {
      const pin = allPins.find((p) => p.project.slug === slug);
      if (pin && pin.region !== selectedRegion) {
        setSelectedRegion(pin.region);
        flyToRegion(pin.region);
      }
      setSelected(slug);
      window.history.replaceState(null, "", `/${lang}/map/${slug}`);
    },
    [allPins, flyToRegion, lang, selectedRegion],
  );

  const closeOverlay = useCallback(() => {
    setSelected(null);
    window.history.replaceState(null, "", `/${lang}/map`);
  }, [lang]);

  const resetView = useCallback(() => {
    setSelectedRegion(null);
    flyToRegion(null);
  }, [flyToRegion]);

  const enterMap = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntro(false);
  }, []);

  const selectedPin = allPins.find((p) => p.project.slug === selected) ?? null;

  if (!webglOk) {
    return (
      <MapFallback lang={lang} pins={allPins} title={t.mapPage.hudTitle} discoverLabel={t.mapPage.discoverMore} />
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink">
      <MapScene
        pins={allPins}
        activeSlug={selected}
        selectedRegion={selectedRegion}
        onSelect={onSelect}
        onRegionSelect={onRegionSelect}
        controlsRef={controlsRef}
        reduceMotion={reduceMotion}
        projectsWord={t.projectsWord}
        touch={touch}
      />

      {/* Заголовок карты */}
      <div className="pointer-events-none absolute left-6 top-24 md:left-16 md:top-28">
        <p className="text-eyebrow uppercase tracking-eyebrow text-bone-faint">
          {t.mapPage.hudTitle}
        </p>
      </div>

      {/* Районы на телефоне: лента чипов под заголовком. Вертикальный список
          слева на узком экране не помещается, а без него с телефона вообще
          нельзя было выбрать район. Лента скроллится пальцем по горизонтали,
          сама страница при этом никуда не едет (overscroll-x: contain). */}
      <nav
        className="pointer-events-auto absolute inset-x-0 top-32 flex gap-2 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        aria-label={t.mapPage.filters}
      >
        {REGIONS.map((r) => {
          const active = selectedRegion === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onRegionSelect(r.id)}
              className={`flex min-h-[44px] shrink-0 items-center gap-2 border px-4 text-eyebrow uppercase tracking-eyebrow backdrop-blur-[2px] transition-colors duration-300 ${
                active
                  ? "border-bone/60 bg-bone/15 text-bone"
                  : "border-bone/20 bg-ink/70 text-bone-faint"
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 ${active ? "bg-bone" : "bg-bone/30"}`}
                aria-hidden
              />
              {r.name}
            </button>
          );
        })}
      </nav>

      {/* Список районов слева (стиль глав главной) */}
      <nav className="pointer-events-auto absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex md:left-16">
        {REGIONS.map((r) => {
          const active = selectedRegion === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onRegionSelect(r.id)}
              className={`flex items-center gap-3 text-eyebrow uppercase tracking-eyebrow transition-colors duration-300 ${
                active ? "text-bone" : "text-bone-faint hover:text-bone-faint"
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 transition-opacity duration-300 ${
                  active ? "bg-bone opacity-100" : "opacity-0"
                }`}
              />
              {r.name}
            </button>
          );
        })}
      </nav>

      {/* ZOOM + шкала (лево-низ, над полосой) */}
      <div className="pointer-events-none absolute bottom-20 left-6 md:bottom-16 md:left-16">
        {/* Мини-карта: силуэт острова + точка текущего вида. На телефоне
            прячем: она перекрывалась баннером cookie и нижней полосой, а места
            под неё нет — сама карта на весь экран важнее миниатюры. */}
        <svg
          width={MM_W}
          height={MM_H}
          viewBox={`0 0 ${MM_W} ${MM_H}`}
          className="mb-3 hidden border border-bone/10 bg-ink/50 backdrop-blur-[2px] sm:block"
          aria-hidden
        >
          <path d={MM_PATH} fill="none" stroke="#8FA396" strokeOpacity="0.5" strokeWidth="0.7" />
          <circle ref={mmDotRef} cx={mmX(-2)} cy={mmY(-11)} r="3" fill="#D0B48D" />
          <circle ref={mmHaloRef} cx={mmX(-2)} cy={mmY(-11)} r="7" fill="#D0B48D" fillOpacity="0.18" />
        </svg>
        <div className="flex items-baseline gap-4 text-eyebrow uppercase tracking-eyebrow text-bone-faint">
          <span>
            {t.mapPage.zoom} <span ref={zoomRef} className="text-bone">1.00X</span>
          </span>
          <span className="text-bone-faint">2KM</span>
        </div>
        <div className="mt-2 h-px w-28 bg-bone/30">
          <div className="h-full w-1/3 bg-bone" />
        </div>
      </div>

      {/* Компас-роза (право-низ, над полосой) */}
      <div className="pointer-events-none absolute bottom-16 right-6 hidden md:right-16 md:block">
        <div className="relative h-24 w-24">
          {/* Стороны света */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-eyebrow text-bone-faint">N</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-eyebrow text-bone-faint">S</span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-eyebrow text-bone-faint">W</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-eyebrow text-bone-faint">E</span>
          {/* Вращающаяся роза-ромб */}
          <div ref={roseRef} className="absolute inset-3 will-change-transform">
            <div className="absolute inset-0 rotate-45 border border-bone/25" />
            <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-bone" />
          </div>
          {/* Центр: N + градусы */}
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-body font-bold text-bone">N</span>
            <span ref={compassDegRef} className="mt-0.5 text-[9px] tracking-eyebrow text-bone-faint">
              000°
            </span>
          </div>
        </div>
      </div>

      {/* Нижняя полоса карты: SOUND | OPEN PROJECT LIST | FILTERS */}
      {/* Тумблер звука на телефоне спрятан: в полосе из трёх элементов при
          375px подписи наезжали друг на друга. Остаются два главных действия,
          каждое высотой в полноценную кнопку (44px). */}
      <div className="pointer-events-none absolute inset-x-[14px] bottom-[max(14px,env(safe-area-inset-bottom))] z-[105] flex items-stretch">
        <div className="pointer-events-auto hidden items-center border-t border-bone/10 bg-ink/70 px-5 py-3 backdrop-blur-[2px] md:flex">
        </div>
        <div className="flex flex-1 items-stretch border-t border-bone/10 bg-ink/70 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={() => {
              setListOpen(true);
            }}
            className="pointer-events-auto flex min-h-[44px] flex-1 items-center justify-center gap-2 px-3 text-eyebrow uppercase tracking-eyebrow text-bone-faint transition-colors duration-300 hover:text-bone"
          >
            <span className="inline-block h-1 w-3 border-y border-bone/60" aria-hidden />
            {t.mapPage.projectList}
          </button>
        </div>
        <button
          type="button"
          onClick={resetView}
          className="pointer-events-auto flex min-h-[44px] shrink-0 items-center gap-2 border-t border-bone/10 bg-ink/70 px-5 text-eyebrow uppercase tracking-eyebrow text-bone-faint backdrop-blur-[2px] transition-colors duration-300 hover:text-bone"
        >
          {t.mapPage.filters}{" "}
          <span className="text-bone-faint">
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
        <div className="absolute inset-0 z-[80] flex flex-col items-center justify-center overflow-y-auto bg-ink/85 px-6 py-24 backdrop-blur-[3px]">
          <h2 className="text-center text-title font-display text-bone sm:text-section md:text-section">
            {t.mapPage.introTitle}
          </h2>
          {/* На тач-экране объясняем пальцами, на мыши — колесом и курсором:
              подсказка «Скролл» телефону ничего не говорит. */}
          <div className="mt-8 grid w-full max-w-3xl gap-px bg-bone/10 sm:mt-10 sm:grid-cols-3">
            {(touch ? t.mapPage.introCardsTouch : t.mapPage.introCards).map((card, i) => (
              <div
                key={card.title}
                className="flex items-center gap-4 bg-ink/90 px-5 py-5 sm:flex-col sm:px-6 sm:py-8"
              >
                <span className="order-2 hidden text-eyebrow tracking-eyebrow text-bone-faint sm:order-none sm:block sm:self-end">
                  ■ {String(i + 1).padStart(3, "0")}
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone/5 sm:h-16 sm:w-16">
                  {/* Иконки под способ ввода: пальцем — «перетащить во все
                      стороны / развести / наклонить», мышью — «колесо / тянуть /
                      клик». Мышиный курсор рядом с надписью «Два пальца»
                      противоречил бы подписи. */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E4DAC4" strokeWidth="1.3" aria-hidden>
                    {touch ? (
                      <>
                        {i === 0 && (
                          <path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l3 3" />
                        )}
                        {i === 1 && <path d="M4 20L10 14M4 20v-5M4 20h5M20 4l-6 6M20 4v5M20 4h-5" />}
                        {i === 2 && <path d="M9 21V7M15 21V9M9 7L6 10M9 7l3 3M15 9l-3 3M15 9l3 3" />}
                      </>
                    ) : (
                      <>
                        {i === 0 && <path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" />}
                        {i === 1 && <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />}
                        {i === 2 && <path d="M7 4l10 8-6 1 3 6-3 1-3-6-4 4z" />}
                      </>
                    )}
                  </svg>
                </span>
                <span className="flex flex-col gap-1 sm:contents">
                  <span className="text-body font-display text-bone">
                    {card.title}
                  </span>
                  <span className="text-micro text-bone-faint sm:text-center">
                    {card.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={enterMap}
            className="mt-8 min-h-[52px] w-full max-w-xs bg-bone px-7 text-eyebrow font-medium uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-white sm:mt-10 sm:w-auto"
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
      className={`absolute inset-y-0 right-0 z-[85] w-full max-w-md border-l border-bone/10 bg-ink/95 backdrop-blur-md transition-transform duration-500 ease-smooth ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-bone/10 px-6 py-6 pt-24 md:pt-6">
          <span className="text-eyebrow uppercase tracking-eyebrow text-bone-faint">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-eyebrow uppercase tracking-eyebrow text-bone-faint transition-colors duration-300 hover:text-bone"
          >
            {closeLabel}
          </button>
        </div>
        {/* pb — чтобы последний проект в списке не прятался под нижней полосой */}
        <ul className="flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+5rem)]">
          {pins.map((pin, i) => (
            <li key={pin.project.slug}>
              <button
                type="button"
                onClick={() => onSelect(pin.project.slug)}
                className="group flex w-full items-baseline gap-4 border-b border-bone/10 px-6 py-5 text-left transition-colors duration-300 hover:bg-bone/5"
              >
                <span className="text-eyebrow tracking-eyebrow text-bone-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-body font-display text-bone">
                    {pin.project.name}
                  </span>
                  <span className="mt-1 block text-eyebrow uppercase tracking-eyebrow text-bone-faint">
                    {pin.project.location}
                  </span>
                </span>
                <span aria-hidden className="text-bone-faint transition-transform duration-300 group-hover:translate-x-1">
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
    <div className="absolute inset-y-0 left-0 z-[90] flex w-full max-w-lg flex-col animate-[slidein_0.5s_ease] border-r border-bone/10 bg-ink/95 backdrop-blur-md">
      {/* Прокручивается всё, КРОМЕ кнопки: сама «Подробнее» вынесена в
          закреплённый футер ниже, поэтому она видна всегда — и не зависит ни от
          высоты экрана, ни от длины описания. */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
          <Image src={image} alt={name} fill sizes="512px" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-24 border border-bone/30 bg-ink/70 px-3 py-1.5 text-eyebrow uppercase tracking-eyebrow text-bone backdrop-blur-sm transition-colors duration-300 hover:bg-bone hover:text-ink md:top-6"
          >
            {labels.close}
          </button>
        </div>

        <div className="px-6 pb-8 pt-8 md:px-10">
          <div className="grid grid-cols-2 gap-px bg-bone/10">
            <Cell label={labels.locationLabel} value={location} />
            <Cell label={labels.typeLabel} value={type} />
          </div>

          <h2 className="mt-8 text-section font-display text-bone md:text-section">
            {name}
          </h2>
          <p className="mt-6 text-body font-light text-bone-faint">{summary}</p>

          {keyPoints.length > 0 && (
            <ul className="mt-8 space-y-2">
              {keyPoints.slice(0, 4).map((k, i) => (
                <li key={i} className="flex gap-3 border-b border-bone/10 pb-2">
                  <span className="text-eyebrow tracking-eyebrow text-bone-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-micro text-bone-faint">{k}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Закреплённый футер с CTA. pb поднимает кнопку над нижней полосой карты
          (Список проектов / Фильтры), чтобы она никогда под неё не пряталась. */}
      <div className="shrink-0 border-t border-bone/10 bg-ink px-6 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-5 md:px-10">
        <Link
          href={discoverHref}
          className="group inline-flex min-h-[52px] items-center gap-3 border border-bone/30 px-6 py-4 text-micro uppercase tracking-eyebrow text-bone transition-colors duration-300 hover:bg-bone hover:text-ink"
        >
          {labels.discoverMore}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink p-4">
      <span className="text-eyebrow uppercase tracking-eyebrow text-bone-faint">{label}</span>
      <span className="mt-2 block text-micro text-bone">{value}</span>
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
      <p className="text-eyebrow uppercase tracking-eyebrow text-bone-faint">{title}</p>
      <ul className="mt-10 border-t border-bone/10">
        {pins.map((pin, i) => (
          <li key={pin.project.slug}>
            <Link
              href={`/${lang}/projects/${pin.project.slug}`}
              className="group grid grid-cols-12 items-center gap-4 border-b border-bone/10 py-6"
            >
              <span className="col-span-1 text-eyebrow tracking-eyebrow text-bone-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-6 text-title font-display text-bone md:text-section">
                {pin.project.name}
              </span>
              <span className="col-span-3 text-eyebrow uppercase tracking-eyebrow text-bone-faint">
                {pin.project.location}
              </span>
              <span className="col-span-2 text-right text-eyebrow uppercase tracking-eyebrow text-bone-faint transition-colors group-hover:text-bone">
                {discoverLabel} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
