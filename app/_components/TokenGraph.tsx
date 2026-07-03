import s from "./TokenGraph.module.css";

/* Section F header — Design Token progression chart, blended into the bg. */

const VALS = [140, 230, 360, 470, 610, 720, 840, 960, 1060, 1180, 1284];
const XLAB = ["v1.0", "", "v1.6", "", "v2.2", "", "v2.6", "", "v3.0", "", "v3.2"];
const MAX = 1400;

const W = 560;
const H = 280;
const PL = 14;
const PR = 524;
const PT = 26;
const PB = 232;

const X = (i: number) => PL + (i / (VALS.length - 1)) * (PR - PL);
const Y = (v: number) => PB - (v / MAX) * (PB - PT);

function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    d += ` C${mx.toFixed(1)},${y0.toFixed(1)} ${mx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
  }
  return d;
}

export default function TokenGraph() {
  const pts: [number, number][] = VALS.map((v, i) => [X(i), Y(v)]);
  const line = smooth(pts);
  const area = `${line} L${X(VALS.length - 1).toFixed(1)},${PB} L${X(0).toFixed(1)},${PB} Z`;
  const accLine = smooth(pts.slice(-4));
  const last = pts[pts.length - 1];
  const yTicks = [0, 350, 700, 1050, 1400];

  return (
    <div className={s.wrap}>
      <div className={s.top}>
        <span className={s.label}>Design Tokens · Progression</span>
        <span className={s.delta}>↑ 18.4% this cycle</span>
      </div>
      <div className={s.val}>1,284</div>

      <svg className={s.chart} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* y gridlines + labels */}
        {yTicks.map((t) => (
          <g key={t}>
            <line className={s.grid} x1={PL} y1={Y(t)} x2={PR} y2={Y(t)} />
            <text className={s.ylab} x={0} y={Y(t) - 3}>
              {t.toLocaleString()}
            </text>
          </g>
        ))}
        {/* area + line */}
        <path className={s.area} d={area} />
        <path className={s.line} d={line} />
        <path className={s.lineAcc} d={accLine} />
        {/* endpoint */}
        <circle cx={last[0]} cy={last[1]} r={3.2} fill="var(--acc)" />
        <circle cx={last[0]} cy={last[1]} r={4} fill="none" stroke="var(--acc)">
          <animate attributeName="r" values="4;13" dur="1.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="1.9s" repeatCount="indefinite" />
        </circle>
        {/* x labels */}
        {XLAB.map((l, i) =>
          l ? (
            <text key={i} className={s.ax} x={X(i)} y={H - 6} textAnchor="middle">
              {l}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
