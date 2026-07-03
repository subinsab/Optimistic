import React from "react";

/* ────────────────────────────────────────────────────────────────
   Isometric CAD-style line illustrations (Section C).
   Thin white outlines, no fill. Geometry computed for clean iso.
   ──────────────────────────────────────────────────────────────── */

const A = Math.PI / 6;
const COS = Math.cos(A);
const SIN = Math.sin(A);
const f = (n: number) => n.toFixed(1);
type Pt = [number, number];
const px = (p: Pt) => `${f(p[0])},${f(p[1])}`;

/** Isometric projection. a → x-axis (up-right), b → y-axis (up-left), c → up.
 *  (cx,cy) is the front-bottom reference corner. */
function iso(cx: number, cy: number, a: number, b: number, c: number): Pt {
  return [cx + (a - b) * COS, cy - (a + b) * SIN - c];
}

/** Three visible faces of an iso cuboid; front-bottom corner at (cx,cy). */
function boxFaces(cx: number, cy: number, w: number, d: number, h: number) {
  const A0 = iso(cx, cy, 0, 0, 0);
  const B0 = iso(cx, cy, w, 0, 0);
  const D0 = iso(cx, cy, 0, d, 0);
  const At = iso(cx, cy, 0, 0, h);
  const Bt = iso(cx, cy, w, 0, h);
  const Ct = iso(cx, cy, w, d, h);
  const Dt = iso(cx, cy, 0, d, h);
  return {
    top: `M${px(At)} L${px(Bt)} L${px(Ct)} L${px(Dt)} Z`,
    right: `M${px(A0)} L${px(B0)} L${px(Bt)} L${px(At)} Z`,
    left: `M${px(A0)} L${px(D0)} L${px(Dt)} L${px(At)} Z`,
    At,
  };
}

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

/* ── 1 · Security — padlock + gear ─────────────────────────────── */
function Gear({
  cx,
  cy,
  R,
  sq,
  teeth,
  depth,
}: {
  cx: number;
  cy: number;
  R: number;
  sq: number;
  teeth: number;
  depth: number;
}) {
  const ry = R * sq;
  const tw = (Math.PI / teeth) * 0.5;
  const tops: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const o = 1.18;
    const P = (ang: number, k: number): Pt => [
      cx + Math.cos(ang) * R * k,
      cy + Math.sin(ang) * ry * k,
    ];
    tops.push(
      `M${px(P(a - tw, 1))} L${px(P(a - tw, o))} L${px(P(a + tw, o))} L${px(
        P(a + tw, 1)
      )}`
    );
  }
  const dx = depth * COS;
  const dy = depth * SIN;
  return (
    <g>
      <ellipse cx={cx + dx} cy={cy + dy} rx={R} ry={ry} />
      <line x1={cx - R} y1={cy} x2={cx - R + dx} y2={cy + dy} />
      <line x1={cx + R} y1={cy} x2={cx + R + dx} y2={cy + dy} />
      {tops.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <ellipse cx={cx} cy={cy} rx={R} ry={ry} />
      <ellipse cx={cx} cy={cy} rx={R * 0.4} ry={ry * 0.4} />
      <ellipse cx={cx} cy={cy} rx={R * 0.15} ry={ry * 0.15} />
    </g>
  );
}

export function IcoSecurity() {
  const lock = boxFaces(96, 182, 46, 46, 58);
  const [sx, sy] = iso(96, 182, 23, 23, 58); // top-face center
  return (
    <svg viewBox="0 0 240 220" {...svgProps}>
      <Gear cx={170} cy={116} R={34} sq={0.62} teeth={11} depth={-11} />
      <path d={lock.right} />
      <path d={lock.left} />
      <path d={lock.top} />
      {/* shackle */}
      <path
        d={`M${f(sx - 17)},${f(sy + 2)} L${f(sx - 17)},${f(
          sy - 36
        )} A17,17 0 0 1 ${f(sx + 17)},${f(sy - 36)} L${f(sx + 17)},${f(sy + 2)}`}
      />
      <path
        d={`M${f(sx - 7)},${f(sy)} L${f(sx - 7)},${f(sy - 34)} A7,7 0 0 1 ${f(
          sx + 7
        )},${f(sy - 34)} L${f(sx + 7)},${f(sy)}`}
      />
      {/* keyhole on the left face */}
      <circle cx={80} cy={150} r={4.5} />
      <line x1={80} y1={153} x2={80} y2={163} />
    </svg>
  );
}

/* ── 2 · Agent Builder — two modules + coil ────────────────────── */
function chip(cornerA: number, cornerB: number, base: number, baseY: number) {
  const c = iso(base, baseY, cornerA, cornerB, 26);
  return boxFaces(c[0], c[1], 18, 18, 7);
}

export function IcoAgent() {
  const m1 = boxFaces(150, 116, 38, 38, 26);
  const m2 = boxFaces(92, 200, 38, 38, 26);
  const chip1 = chip(10, 10, 150, 116);
  const chip2 = chip(10, 10, 92, 200);
  const c1 = iso(150, 116, 19, 19, 0); // m1 base centre
  const c2 = iso(92, 200, 19, 19, 26); // m2 top centre
  const rings: Pt[] = [];
  const turns = 7;
  for (let i = 0; i <= turns; i++) {
    const t = i / turns;
    rings.push([c1[0] + (c2[0] - c1[0]) * t, c1[1] + (c2[1] - c1[1]) * t]);
  }
  return (
    <svg viewBox="0 0 240 220" {...svgProps}>
      {/* lower module */}
      <path d={m2.right} />
      <path d={m2.left} />
      <path d={m2.top} />
      <path d={chip2.right} />
      <path d={chip2.left} />
      <path d={chip2.top} />
      {/* coil */}
      {rings.map((p, i) => (
        <ellipse key={i} cx={p[0]} cy={p[1]} rx={8} ry={4.2} />
      ))}
      {/* upper module */}
      <path d={m1.right} />
      <path d={m1.left} />
      <path d={m1.top} />
      <path d={chip1.right} />
      <path d={chip1.left} />
      <path d={chip1.top} />
    </svg>
  );
}

/* ── 3 · Cloud — server fan in square enclosure ────────────────── */
export function IcoCloud() {
  const cx = 120;
  const cy = 162; // front-bottom corner — keeps the plate centred in the viewBox
  const W = 112;
  const depth = 13;
  const A0 = iso(cx, cy, 0, 0, 0);
  const B0 = iso(cx, cy, W, 0, 0);
  const C0 = iso(cx, cy, W, W, 0);
  const D0 = iso(cx, cy, 0, W, 0);
  const ctr = iso(cx, cy, W / 2, W / 2, 0);
  const hole = (a: number, b: number) => {
    const p = iso(cx, cy, a, b, 0);
    return <ellipse cx={p[0]} cy={p[1]} rx={5} ry={3} />;
  };
  const blades: React.ReactNode[] = [];
  const N = 7;
  const blade =
    "M0,-7 C13,-11 28,-6 36,5 C25,2 12,3 0,7 C-4,2 -4,-3 0,-7 Z";
  for (let i = 0; i < N; i++) {
    blades.push(
      <path
        key={i}
        d={blade}
        transform={`rotate(${(i * 360) / N})`}
      />
    );
  }
  return (
    <svg viewBox="0 0 240 200" {...svgProps}>
      {/* enclosure top + thickness */}
      <path
        d={`M${px(A0)} L${px(B0)} L${px(C0)} L${px(D0)} Z`}
      />
      <path
        d={`M${px(D0)} L${f(D0[0])},${f(D0[1] + depth)} L${f(A0[0])},${f(
          A0[1] + depth
        )} L${px(A0)} Z`}
      />
      <path
        d={`M${px(A0)} L${f(A0[0])},${f(A0[1] + depth)} L${f(B0[0])},${f(
          B0[1] + depth
        )} L${px(B0)} Z`}
      />
      {hole(13, 13)}
      {hole(W - 13, 13)}
      {hole(W - 13, W - 13)}
      {hole(13, W - 13)}
      {/* fan rim */}
      <ellipse cx={ctr[0]} cy={ctr[1]} rx={48} ry={42} />
      {/* blades (squashed to match iso) */}
      <g transform={`translate(${f(ctr[0])},${f(ctr[1])}) scale(1,0.86)`}>
        {blades}
        <circle cx={0} cy={0} r={9} />
      </g>
    </svg>
  );
}

/* ── 4 · Data — database cylinder + open folder ────────────────── */
export function IcoData() {
  const cx = 74;
  const topY = 66;
  const rx = 32;
  const ry = 12;
  const tierH = 22;
  const tiers = 3;
  const bottomY = topY + tierH * tiers;
  const seps: React.ReactNode[] = [];
  for (let i = 1; i <= tiers; i++) {
    const y = topY + tierH * i;
    seps.push(
      <path
        key={i}
        d={`M${f(cx - rx)},${f(y)} A${rx},${ry} 0 0 0 ${f(cx + rx)},${f(y)}`}
      />
    );
  }
  // open folder (clamshell) on the right, in screen space
  const L: Pt = [150, 196];
  const R: Pt = [206, 164];
  const BL: Pt = [150, 150];
  const BR: Pt = [206, 118];
  const FL: Pt = [138, 168];
  const FR: Pt = [194, 136];
  return (
    <svg viewBox="0 0 240 220" {...svgProps}>
      {/* database */}
      <ellipse cx={cx} cy={topY} rx={rx} ry={ry} />
      <line x1={cx - rx} y1={topY} x2={cx - rx} y2={bottomY} />
      <line x1={cx + rx} y1={topY} x2={cx + rx} y2={bottomY} />
      <path
        d={`M${f(cx - rx)},${f(bottomY)} A${rx},${ry} 0 0 0 ${f(cx + rx)},${f(
          bottomY
        )}`}
      />
      {seps}
      {/* connector */}
      <path
        d={`M${f(cx + rx)},${f(topY + tierH)} C 112,${f(topY + tierH)} 120,${f(
          L[1]
        )} ${px(L)}`}
      />
      {/* folder — back wall */}
      <path d={`M${px(L)} L${px(R)} L${px(BR)} L${px(BL)} Z`} />
      {/* folder — front flap */}
      <path d={`M${px(L)} L${px(R)} L${px(FR)} L${px(FL)} Z`} />
      {/* sheets peeking */}
      <path d={`M${f(L[0] + 8)},${f(L[1] - 8)} L${f(R[0] - 8)},${f(R[1] - 8)}`} />
    </svg>
  );
}
