"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Счётчик: число досчитывает от нуля до значения при входе в кадр.
 *
 * Раньше здесь был барабан из десяти цифр под маской высотой 1em. С обычной
 * гарнитурой он работал, но дисплейный ар-деко рисует цифры геометрическими
 * окружностями заметно выше em-квадрата — в окно маски лезли соседние цифры,
 * и число разваливалось на дуги. Считать значение вместо прокрутки барабана
 * надёжнее: результат не зависит ни от метрик шрифта, ни от набора
 * OpenType-фич в нём.
 *
 * Разбираем строку вида «15+», «500+»: число анимируется, любой хвост
 * (плюс, единицы) остаётся на месте. Если цифр нет вовсе — просто печатаем
 * значение как есть.
 */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d[\d\s.,]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = digits ? Number(digits.replace(/[^\d]/g, "")) : null;

  const ref = useRef<HTMLSpanElement>(null);
  // Стартуем сразу с настоящего значения и обнуляемся только в момент, когда
  // анимация реально начинается. Иначе при отключённом JS, упавшем бандле или
  // не сработавшем наблюдателе на странице навсегда осталось бы «0+».
  const [shown, setShown] = useState<number | null>(target);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(0); // отсчёт начинается — только теперь можно показать ноль
        const started = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - started) / duration);
          // expo.out — та же кривая, что у остального интерфейса: быстрый
          // старт и долгое замедление, число «оседает», а не щёлкает.
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setShown(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span
      ref={ref}
      // Значение целиком уходит в aria-label: пока идёт счёт, скринридер
      // не должен зачитывать промежуточные числа.
      aria-label={value}
      className={`inline-block tabular-nums lining-nums ${className}`}
    >
      <span aria-hidden="true">
        {target === null ? value : `${prefix}${shown ?? target}${suffix}`}
      </span>
    </span>
  );
}
