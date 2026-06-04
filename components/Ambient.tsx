// Ambient silk. Фиксированный слой гладкой графитовой «ткани» за контентом
// (z-index:-1): мягкие наклонные световые/теневые ленты с лёгким переливом.
// Скрыт за непрозрачным hero. Вся стилизация и анимация — в globals.css.
export function Ambient() {
  return (
    <div aria-hidden className="ambient">
      <span className="ambient__wave ambient__wave--1" />
      <span className="ambient__wave ambient__wave--2" />
      <span className="ambient__wave ambient__wave--3" />
      <span className="ambient__wave ambient__wave--4" />
      <span className="ambient__wave ambient__wave--5" />
    </div>
  );
}
