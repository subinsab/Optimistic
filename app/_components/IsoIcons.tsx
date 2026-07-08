import React from "react";

/* ────────────────────────────────────────────────────────────────
   Section C icons — dark-glass isometric scenes on a shared 56×56
   plinth. Faces are near-black with edge-lit lines; each scene has
   exactly one warm element.
   · IcoTrust    — column carries a warm load    (hover: it settles)
   · IcoReuse    — button above its socket       (hover: it drops in)
   · IcoAlign    — panels on one warm rail       (hover: stray one straightens)
   · IcoLanguage — one cube, same mark every face (hover: all faces light)
   ──────────────────────────────────────────────────────────────── */

const A = Math.PI / 6;
const COS = Math.cos(A);
const SIN = Math.sin(A);
const f = (n: number) => n.toFixed(1);
type Pt = [number, number];
const px = (p: Pt) => `${f(p[0])},${f(p[1])}`;

/* shared stage: plinth front-bottom corner — centers the scene at x=120 */
const SX = 120, SY = 140, PL = 56, PH = 8;

function iso(a: number, b: number, c: number): Pt {
  return [SX + (a - b) * COS, SY - (a + b) * SIN - c];
}

function boxFaces(p: Pt, w: number, d: number, h: number) {
  const [cx, cy] = p;
  const pt = (a: number, b: number, c: number): Pt => [cx + (a - b) * COS, cy - (a + b) * SIN - c];
  const A0 = pt(0, 0, 0), B0 = pt(w, 0, 0), D0 = pt(0, d, 0);
  const At = pt(0, 0, h), Bt = pt(w, 0, h), Ct = pt(w, d, h), Dt = pt(0, d, h);
  return {
    top: `M${px(At)} L${px(Bt)} L${px(Ct)} L${px(Dt)} Z`,
    right: `M${px(A0)} L${px(B0)} L${px(Bt)} L${px(At)} Z`,
    left: `M${px(A0)} L${px(D0)} L${px(Dt)} L${px(At)} Z`,
  };
}

const WARM = "#ff7a00";
const GLASS = { top: "#1e2024", right: "#16171b", left: "#101114" };
const WARMG = { top: "#3a2008", right: "#2a1606", left: "#1c0e04" };
const EDGE = "rgba(228,232,240,0.32)";

function Vox({ at, w, d, h, warm = false }: { at: Pt; w: number; d: number; h: number; warm?: boolean }) {
  const bf = boxFaces(at, w, d, h);
  const c = warm ? WARMG : GLASS;
  return (
    <g stroke={warm ? WARM : EDGE} strokeWidth={warm ? 1.2 : 1} strokeLinejoin="round">
      <path d={bf.left} fill={c.left} />
      <path d={bf.right} fill={c.right} />
      <path d={bf.top} fill={c.top} />
    </g>
  );
}

const Plinth = () => <Vox at={[SX, SY]} w={PL} d={PL} h={PH} />;

const svgProps = { fill: "none" };
const VB = "0 0 240 220";

/* ── 1 · Trust — a layered column carries the warm load ── */
export function IcoTrust() {
  const loadAt = iso(21, 21, PH + 45);
  return (
    <svg viewBox={VB} {...svgProps}>
      <Plinth />
      <Vox at={iso(17, 17, PH)} w={22} d={22} h={13} />
      <Vox at={iso(17, 17, PH + 13)} w={22} d={22} h={13} />
      <Vox at={iso(17, 17, PH + 26)} w={22} d={22} h={13} />
      <g className="ikLoad">
        <Vox at={loadAt} w={14} d={14} h={12} warm />
      </g>
    </svg>
  );
}

/* ── 2 · Reuse — the finished button drops into its socket ── */
export function IcoReuse() {
  const rim = [iso(16, 16, PH), iso(40, 16, PH), iso(40, 40, PH), iso(16, 40, PH)];
  const bed = [iso(16, 16, PH - 4), iso(40, 16, PH - 4), iso(40, 40, PH - 4), iso(16, 40, PH - 4)];
  const btnAt = iso(16, 16, PH + 34);
  return (
    <svg viewBox={VB} {...svgProps}>
      <Plinth />
      <g stroke={EDGE} strokeWidth={1} strokeLinejoin="round">
        <path d={`M${px(bed[0])} L${px(bed[1])} L${px(bed[2])} L${px(bed[3])} Z`} fill="#0c0d0f" />
        <path d={`M${px(rim[1])} L${px(rim[2])} L${px(bed[2])} L${px(bed[1])} Z`} fill="#131417" />
        <path d={`M${px(rim[2])} L${px(rim[3])} L${px(bed[3])} L${px(bed[2])} Z`} fill="#0f1013" />
      </g>
      <g className="ikBtn">
        <Vox at={btnAt} w={24} d={24} h={10} warm />
      </g>
    </svg>
  );
}

/* ── 3 · Alignment — panels threaded on one warm rail ── */
export function IcoAlign() {
  const railBack = iso(28, 62, PH + 22);
  const railFront = iso(28, -6, PH + 22);
  const panel = (b: number) => iso(13, b, PH);
  const tiltBase = iso(28, 11, PH); // front panel's base centre (hover pivot)
  return (
    <svg viewBox={VB} {...svgProps}>
      <Plinth />
      <line x1={railBack[0]} y1={railBack[1]} x2={railFront[0]} y2={railFront[1]} stroke={WARM} strokeWidth={1.6} />
      <Vox at={panel(40)} w={30} d={6} h={44} />
      <Vox at={panel(24)} w={30} d={6} h={44} />
      <g className="ikPanel" style={{ transformBox: "view-box", transformOrigin: `${f(tiltBase[0])}px ${f(tiltBase[1])}px` }}>
        <Vox at={panel(8)} w={30} d={6} h={44} warm />
      </g>
    </svg>
  );
}

/* ── 4 · Language — one cube, the same mark on every face ── */
export function IcoLanguage() {
  const C0 = 14, CW = 28, CT = PH + CW; // cube footprint 14..42, top at c=36
  const quad = (pts: Pt[]) => `M${px(pts[0])} L${px(pts[1])} L${px(pts[2])} L${px(pts[3])} Z`;
  const topMark = quad([iso(23, 23, CT), iso(33, 23, CT), iso(33, 33, CT), iso(23, 33, CT)]);
  const rightMark = quad([iso(24, C0, PH + 10), iso(32, C0, PH + 10), iso(32, C0, PH + 18), iso(24, C0, PH + 18)]);
  const leftMark = quad([iso(C0, 24, PH + 10), iso(C0, 32, PH + 10), iso(C0, 32, PH + 18), iso(C0, 24, PH + 18)]);
  return (
    <svg viewBox={VB} {...svgProps}>
      <Plinth />
      <Vox at={iso(C0, C0, PH)} w={CW} d={CW} h={CW} />
      <path d={topMark} fill="rgba(255,122,0,0.18)" stroke={WARM} strokeWidth={1.2} strokeLinejoin="round" />
      <path className="ikMark" d={rightMark} fill="none" stroke="rgba(228,232,240,0.28)" strokeWidth={1.2} strokeLinejoin="round" />
      <path className="ikMark" d={leftMark} fill="none" stroke="rgba(228,232,240,0.28)" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}
