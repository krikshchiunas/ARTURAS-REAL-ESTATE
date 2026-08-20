// Прогресс фоновой сцены по прокрутке.
//
// По умолчанию считается на всю страницу — но тогда анимация растягивается и на
// футер, и к моменту, когда читатель дошёл до последнего блока, сцена ещё не
// досказана: дорога не доехала до портала, куб не поднялся.
//
// Элемент с `data-scene-end` задаёт, где сцена обязана закончиться. Причём
// закончиться она должна не на последнем пикселе блока, а когда его содержимое
// уже целиком на экране: нижние отступы секции — это воздух, а не часть
// рассказа. Поэтому от края отступаем END_MARGIN — иначе финал приходится на
// пустое поле под текстом и выглядит недоигранным.
const END_MARGIN_MAX = 180;
const END_MARGIN_RATIO = 0.2;

export function sceneScrollProgress(): number {
  const end = document.querySelector<HTMLElement>("[data-scene-end]");
  const docMax = document.documentElement.scrollHeight - window.innerHeight;

  let max = docMax;
  if (end) {
    const margin = Math.min(END_MARGIN_MAX, window.innerHeight * END_MARGIN_RATIO);
    max = end.getBoundingClientRect().bottom + window.scrollY - window.innerHeight - margin;
  }
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}
