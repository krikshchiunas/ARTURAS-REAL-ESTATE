import {
  Fragment,
  type ComponentType,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

// `as`-полиморфизм TypeScript схлопывает до never на объединении всех тегов.
// Приводим тег к одному компонентному типу — на рантайм это не влияет.
type Polymorphic = ComponentType<HTMLAttributes<HTMLElement>>;

/**
 * Появление для контента ПЕРВОГО экрана — на чистом CSS, без клиентского JS.
 *
 * Зачем отдельно от Reveal: тот прячет блок (`opacity-0`) и снимает скрытие
 * только после гидратации. Ниже сгиба это незаметно, но на первом экране
 * получалось так, что заголовок — то есть LCP-элемент страницы — не виден,
 * пока не выполнится JS. Здесь состояние покоя в разметке — «видимо», а
 * анимация лишь проигрывается от прозрачного к нему (fill-mode: both).
 * Не отработают анимации — текст просто окажется на месте.
 *
 * prefers-reduced-motion гасит длительность глобально в globals.css.
 */
export function HeroReveal({
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
  const Comp = Tag as Polymorphic;

  return (
    <Comp className={`animate-fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Comp>
  );
}

/**
 * Заголовок первого экрана: слова выезжают из-под маски каскадом.
 *
 * Режем по словам, а не по строкам — перенос остаётся за браузером, что
 * важно для пяти локалей и особенно для тайского, где перенос не по пробелам.
 * Пробел вынесен наружу маски: внутри overflow-hidden он бы обрезался и слова
 * склеились бы.
 */
export function HeroHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 55,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const Comp = Tag as Polymorphic;

  return (
    <Comp className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block animate-word-up"
              style={{ animationDelay: `${delay + i * stagger}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
