// Ambient studio background. Фиксированный слой графитовых световых пятен за
// контентом (z-index:-1): добавляет глубину внутренним секциям и футеру, скрыт
// за непрозрачным hero. Вся стилизация и анимация — в globals.css (.ambient).
export function Ambient() {
  return (
    <div aria-hidden className="ambient">
      <span className="ambient__blob ambient__blob--1" />
      <span className="ambient__blob ambient__blob--2" />
      <span className="ambient__blob ambient__blob--3" />
    </div>
  );
}
