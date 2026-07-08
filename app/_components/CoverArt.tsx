/**
 * Procedural monochrome cover art + date formatting, shared by the home
 * §J insights grid and the /blog pages. Server-safe (pure SVG, no hooks).
 * All coords are rounded — raw trig floats serialize differently between
 * SSR and client and cause hydration mismatches.
 */

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function fmtDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export default function CoverArt({ seed, className }: { seed: number; className?: string }) {
  const rnd = (n: number) => {
    const x = Math.sin(seed * 99.7 + n * 37.13) * 10000;
    return x - Math.floor(x);
  };
  const f = (v: number) => Math.round(v * 10) / 10;
  const ell = [0, 1, 2, 3].map((i) => ({
    cx: f(40 + rnd(i) * 320),
    cy: f(20 + rnd(i + 9) * 220),
    rx: f(50 + rnd(i + 3) * 150),
    ry: f(40 + rnd(i + 5) * 120),
    o: (0.05 + rnd(i + 7) * 0.1).toFixed(3),
  }));
  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="260" fill="#0c0c0d" />
      <defs>
        <pattern id={`dm${seed}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill={`url(#dm${seed})`} />
      {ell.map((e, i) => (
        <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="none" stroke={`rgba(220,224,230,${e.o})`} strokeWidth="1" />
      ))}
    </svg>
  );
}
