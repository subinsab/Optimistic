/**
 * Procedural cover art + date formatting, shared by the home insights grid
 * and the /blog pages (thumbnails and hero). Server-safe (pure SVG, no hooks).
 * All coords are rounded, since raw trig floats serialize differently between
 * SSR and client and cause hydration mismatches. Each seed yields a distinct,
 * on-brand cover: two colour glows over a voxel skyline with a few ember-lit
 * towers (the one warm pixel).
 */

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function fmtDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

const PAL = ["#FF7A00", "#5B8CFF", "#3FC98A", "#A78BFA", "#34D3C0", "#EF8FD0"];

export default function CoverArt({ seed, className }: { seed: number; className?: string }) {
  const rnd = (n: number) => {
    const x = Math.sin(seed * 99.7 + n * 37.13) * 10000;
    return x - Math.floor(x);
  };
  const f = (v: number) => Math.round(v * 10) / 10;

  const cA = PAL[Math.floor(rnd(1) * PAL.length)];
  let cB = PAL[Math.floor(rnd(2) * PAL.length)];
  if (cB === cA) cB = PAL[(PAL.indexOf(cA) + 2) % PAL.length];

  const g1 = { cx: f(50 + rnd(3) * 130), cy: f(40 + rnd(4) * 70), r: f(130 + rnd(5) * 70) };
  const g2 = { cx: f(240 + rnd(6) * 120), cy: f(30 + rnd(7) * 90), r: f(120 + rnd(8) * 80) };

  const n = 18;
  const bw = 400 / n;
  const bars = Array.from({ length: n }, (_, i) => ({
    x: f(i * bw),
    h: f(26 + rnd(i + 11) * 132),
    lit: rnd(i + 40) > 0.85,
  }));

  const id = (sfx: string) => `ca${seed}${sfx}`;

  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={id("a")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cA} stopOpacity="0.34" />
          <stop offset="100%" stopColor={cA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("b")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cB} stopOpacity="0.26" />
          <stop offset="100%" stopColor={cB} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("v")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="45%" stopColor="#0b0b0c" stopOpacity="0" />
          <stop offset="100%" stopColor="#0b0b0c" stopOpacity="0.92" />
        </linearGradient>
        <pattern id={id("d")} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>

      <rect width="400" height="260" fill="#0b0b0c" />
      <ellipse cx={g1.cx} cy={g1.cy} rx={g1.r} ry={f(g1.r * 0.82)} fill={`url(#${id("a")})`} />
      <ellipse cx={g2.cx} cy={g2.cy} rx={g2.r} ry={f(g2.r * 0.82)} fill={`url(#${id("b")})`} />

      <g>
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={f(260 - b.h)} width={f(bw - 2)} height={b.h} rx="1.5"
            fill={b.lit ? "#FF7A00" : "#16171c"} fillOpacity={b.lit ? 0.92 : 0.86} />
        ))}
      </g>

      <rect width="400" height="260" fill={`url(#${id("d")})`} />
      <rect width="400" height="260" fill={`url(#${id("v")})`} />
    </svg>
  );
}
