/**
 * Убирает из текстов объекта точные цифры доходности.
 *
 * На сайте не должно быть ни конкретного процента, ни стоимости: доходность
 * считается под покупку, и опубликованное «11% ROI» превращается в обещание,
 * за которое потом отвечать. Вилки («9–12%», «20–50%») остаются — это
 * ориентир по рынку, а не обещание по лоту.
 *
 * Фильтр стоит на отрисовке, а не в словарях: исходные тексты застройщиков
 * трогать нельзя, они пригодятся для расчёта и переписки.
 */

// Процент, не входящий в вилку: «11%» ловим, «9–12%» — нет.
const EXACT_PCT = /(?<![\d–—-])\d+(?:[.,]\d+)?\s?%/;

export function hasExactPercent(text: string): boolean {
  return EXACT_PCT.test(text.replace(/\d+\s?[–—-]\s?\d+\s?%/g, ""));
}

/** Убирает предложения с точным процентом, остальное оставляет как есть. */
export function stripExactFigures(text: string): string {
  const parts = text.split(/(?<=[.!?])\s+/);
  const kept = parts.filter((s) => !hasExactPercent(s));
  return kept.join(" ").trim();
}

/** Оставляет только те пункты списка, где нет точного процента. */
export function withoutExactFigures(items: string[]): string[] {
  return items.filter((i) => !hasExactPercent(i));
}
