"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

// `as`-полиморфизм и ref вместе TypeScript вывести не может: для объединения
// всех возможных тегов он схлопывает пропсы до never. Приводим тег к одному
// компонентному типу — на рантайм это не влияет, а вызывающий код остаётся
// типизированным по своим пропсам.
type Polymorphic = ComponentType<
  HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }
>;

/**
 * Появление блока при входе в кадр.
 *
 * Прежняя версия крутила GSAP + ScrollTrigger + SplitText на каждый заголовок.
 * Здесь — IntersectionObserver и CSS-анимация: анимируются только transform и
 * opacity, то есть работа уходит в композитор и не трогает layout. Наблюдатель
 * отключается после первого срабатывания — реверс-анимаций на сайте нет,
 * держать подписку незачем.
 *
 * prefers-reduced-motion обрабатывается на месте: элемент сразу видим, а не
 * «анимируется за 0.001ms» — так он не мигнёт даже на медленном устройстве.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      // rootMargin снизу: блок начинает проявляться чуть раньше, чем доедет до
      // края экрана, иначе на быстрой прокрутке анимация не успевает.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as Polymorphic;

  return (
    <Comp
      ref={ref}
      style={shown && !instant ? { animationDelay: `${delay}ms` } : undefined}
      className={`${instant ? "" : shown ? "animate-fade-up" : "reveal-init"} ${className}`}
    >
      {children}
    </Comp>
  );
}
