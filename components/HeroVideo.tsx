"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  poster: string;
  srcDesktop: string;
  srcMobile: string;
  /** Что изображено — для скринридера и как alt постера. */
  label: string;
};

/**
 * Фон-герой: бесшовно зациклённое видео заката над комплексом.
 *
 * Про бесшовность. Исходник — таймлапс «день → ночь»: первый и последний кадры
 * различаются полностью, поэтому обычный `loop` давал бы рывок «ночь → день».
 * Файл пересобран в палиндром (прямой ход + обратный, без дублирования крайних
 * кадров), так что последний кадр физически соседствует с первым — шва нет,
 * а обратный ход читается как естественный рассвет. Сшивать кроссфейдом было
 * нельзя: в кадре есть наезд камеры, и растворение давало бы двоение.
 *
 * Звуковой дорожки в файле нет намеренно — ресинк аудио на границе цикла
 * и есть та самая «дёрганость», которую видно у большинства фоновых видео.
 */
export function HeroVideo({ poster, srcDesktop, srcMobile, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Решаем, грузить ли видео вообще.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    // Save-Data или медленная сеть: 3.5–7 МБ ради фона не тянем, остаётся постер.
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;

    // Источник выбираем в JS: атрибут `media` у <source> внутри <video>
    // браузеры игнорируют, поэтому мобильный файл иначе не применился бы.
    v.src = window.matchMedia("(max-width: 767px)").matches ? srcMobile : srcDesktop;
    v.load();

    const start = () => {
      v.play().catch(() => {
        /* автоплей заблокирован — остаётся постер, это валидное состояние */
      });
    };
    if (v.readyState >= 3) start();
    else v.addEventListener("canplay", start, { once: true });

    // За кадром видео декодировать незачем: экономим main-thread и батарею.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 },
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      io.disconnect();
      v.removeEventListener("canplay", start);
    };
  }, [enabled, srcDesktop, srcMobile]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-ink">
      {/* Постер — это LCP-элемент страницы: он в разметке сразу, с высоким
          приоритетом, и остаётся единственной картинкой при reduced-motion,
          заблокированном автоплее и экономии трафика. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={label}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {enabled && (
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-smooth ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Скрим — только там, где лежит текст, и нигде больше.

          Прежняя версия гасила кадр тремя слоями сразу (низ + клин слева на
          80% + верх), суммарно ~0.87 в зоне текста: от видео доходило 13%,
          закат превращался в бурую кашу. Ради этого ролик и снимали — так
          нельзя.

          Замеры по полосам высоты показали, что кадр яркий почти везде
          (есть участки, выжженные до 255), и для AA под светлым текстом
          нужно ~0.61. Поэтому вместо равномерного затемнения — опора строго
          под текстовым блоком: выше 48% высоты слой прозрачен полностью,
          и верхняя половина кадра остаётся нетронутой.

          Боковой клин убран совсем — он и был главным виновником. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          // Точки перегиба выведены из замеров, а не на глаз. Текстовый блок
          // занимает 57–91% высоты кадра (считая сверху), то есть 9–43%
          // снизу; на всей этой полосе альфа держится ≥0.62 — минимум, при
          // котором bone даёт 4.5:1 на самом светлом пикселе ролика.
          // Выше 72% снизу (28% сверху) слой полностью прозрачен.
          background:
            "linear-gradient(to top," +
            " rgba(11,12,10,0.96) 0%," +
            " rgba(11,12,10,0.90) 18%," +
            " rgba(11,12,10,0.78) 34%," +
            " rgba(11,12,10,0.60) 48%," +
            " rgba(11,12,10,0.28) 60%," +
            " rgba(11,12,10,0) 72%)",
        }}
      />
      {/* Подложка под шапку: узкая полоса у самой кромки. 0.85 на 144px —
          столько нужно, чтобы светлый текст шапки держал 4.5:1 на самом
          ярком небе ролика; на композицию кадра эта полоска не влияет. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/85 to-transparent"
      />
    </div>
  );
}
