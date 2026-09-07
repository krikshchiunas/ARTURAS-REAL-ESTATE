import type { CSSProperties } from "react";
import type { EmeraldContent } from "@/lib/emerald/content";

/**
 * График строится ровно по тем колонкам, что есть в источнике: доходность
 * инвестиций и доля поступившей прибыли по четырём типам квартир. Никакой
 * интерполяции — таких данных у застройщика нет. Максимум шкалы задан в
 * контенте, а не подогнан под данные.
 */
const W = 760, H = 280, PL = 46, PR = 26, PT = 26, PB = 40;
const IW = W - PL - PR;
const IH = H - PT - PB;

const px = (i: number, n: number) => PL + (n === 1 ? IW / 2 : (i * IW) / (n - 1));
const py = (v: number, max: number) => PT + (1 - v / max) * IH;
const len = (pts: number[][]) =>
  pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

export function TrustChart({ c, percentWord }: { c: EmeraldContent["invest"]["chart"]; percentWord: string }) {
  const n = c.x.length;
  const ticks = [0, 5, 10, 15, 20].filter((t) => t <= c.max);
  const pts = c.series.map((s) => s.values.map((v, i) => [px(i, n), py(v, c.max)]));
  const d = (p: number[][]) =>
    p.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${d(pts[0])} L${px(n - 1, n).toFixed(1)} ${(PT + IH).toFixed(1)} L${PL.toFixed(1)} ${(PT + IH).toFixed(1)} Z`;
  const top = c.series[0].values.reduce((b, v, i) => (v > c.series[0].values[b] ? i : b), 0);
  const hitW = IW / (n - 1);

  const payload = JSON.stringify({
    x: c.x,
    a: { key: c.series[0].key, v: c.series[0].values },
    b: { key: c.series[1].key, v: c.series[1].values },
  });

  const aria = `${c.title}: ${c.series
    .map((s) => `${s.key} — ${s.values.join(", ")} ${percentWord}`)
    .join("; ")}`;

  return (
    <>
      <div className="chart" id="trust-chart" data-chart={payload}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={aria}>
          <defs>
            <linearGradient id="trustFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D0B48D" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D0B48D" stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((t) => {
            const y = py(t, c.max);
            return (
              <g key={t}>
                <line className="chart-grid" x1={PL} y1={y} x2={W - PR} y2={y} />
                <text className="chart-axis" x={PL - 12} y={y} textAnchor="end" dominantBaseline="middle">
                  {t}%
                </text>
              </g>
            );
          })}

          <path className="chart-area" d={area} />
          <path className="chart-line-b" d={d(pts[1])} style={{ "--len": len(pts[1]).toFixed(0) } as CSSProperties} />
          <path className="chart-line-a" d={d(pts[0])} style={{ "--len": len(pts[0]).toFixed(0) } as CSSProperties} />

          {pts[1].map(([x, y], i) => (
            <circle className="chart-dot-b" key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} />
          ))}
          {pts[0].map(([x, y], i) => (
            <circle className="chart-dot-a" key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={4} />
          ))}

          <text
            className="chart-val"
            x={pts[0][top][0].toFixed(1)}
            y={(pts[0][top][1] - 14).toFixed(1)}
            textAnchor="middle"
          >
            {c.peakLabel}
          </text>

          {c.x.map((lbl, i) => (
            <text className="chart-axis" data-lbl={i} key={i} x={px(i, n).toFixed(1)} y={H - PB + 22} textAnchor="middle">
              {lbl}
            </text>
          ))}

          <line className="chart-guide" x1="0" y1={PT} x2="0" y2={PT + IH} />

          {/* Прозрачные зоны наведения: по одной на столбец, во всю высоту поля */}
          <g className="chart-hits">
            {c.x.map((lbl, i) => (
              <rect
                key={i}
                data-hit={i}
                x={(px(i, n) - hitW / 2).toFixed(1)}
                y={PT}
                width={hitW.toFixed(1)}
                height={IH}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${lbl}: ${c.series[0].key} ${c.series[0].values[i]}%, ${c.series[1].key} ${c.series[1].values[i]}%`}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="legend">
        {c.series.map((s) => (
          <span key={s.key}>
            <i />
            {s.key}
          </span>
        ))}
      </div>
    </>
  );
}
