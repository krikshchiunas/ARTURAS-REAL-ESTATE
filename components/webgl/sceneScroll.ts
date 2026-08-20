// Прогресс фоновой сцены по прокрутке.
//
// По умолчанию считается на всю страницу — но тогда анимация растягивается и на
// футер, и к моменту, когда читатель дошёл до последнего блока, сцена ещё не
// досказана: дальше остаётся голый фон без содержимого. Если в разметке есть
// элемент с `data-scene-end`, прогресс доходит до 1 ровно на его нижней кромке,
// и хвост страницы прокручивается уже с финальным кадром.
export function sceneScrollProgress(): number {
  const end = document.querySelector<HTMLElement>("[data-scene-end]");
  const max = end
    ? end.getBoundingClientRect().bottom + window.scrollY - window.innerHeight
    : document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}
