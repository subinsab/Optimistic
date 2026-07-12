/* Bespoke blog covers, v2: full-bleed isometric scenes. A near-black field with
   fine grain, wireframe geometry, and ONE glowing ember object per post (the one
   warm pixel). Edge fades on every side melt the art into the page, the same
   treatment as the city hero. Each cover still argues its post's concept, now
   drawn in 3D rather than as a flat line. Pure SVG, server-safe: every coord is
   rounded so SSR and client serialize identically (no hydration drift). */
import type { ReactNode, ReactElement } from "react";

const BG = "#0a0a0b";
const LINE = "#c7cbd2"; // wireframe stroke
const EM = "#FF7A00"; // ember accent
const LB = "#e6e8ec"; // label ink
const COS = 0.8660254;
const r = (v: number) => Math.round(v * 10) / 10;

/* isometric projection: iso (x,y,z) -> screen [sx,sy], origin (ox,oy), unit u */
function pt(ox: number, oy: number, u: number, x: number, y: number, z: number): [number, number] {
  return [r(ox + (x - y) * COS * u), r(oy + (x + y) * 0.5 * u - z * u)];
}
const P = (p: [number, number]) => `${p[0]},${p[1]}`;

type CubeProps = {
  ox: number; oy: number; u: number;
  x: number; y: number; sz: number; h: number; z?: number;
  ember?: boolean; solid?: boolean; grid?: number; op?: number; sw?: number; glowId?: string;
};

/* one isometric box: three shaded faces + optional wireframe grid + ember glow */
function Cube({ ox, oy, u, x, y, sz, h, z = 0, ember = false, solid = false, grid = 0, op = 0.55, sw = 1, glowId }: CubeProps) {
  const z0 = z, z1 = z + h;
  const p = (X: number, Y: number, Z: number) => pt(ox, oy, u, X, Y, Z);
  const top = [p(x, y, z1), p(x + sz, y, z1), p(x + sz, y + sz, z1), p(x, y + sz, z1)];
  const right = [p(x + sz, y, z1), p(x + sz, y + sz, z1), p(x + sz, y + sz, z0), p(x + sz, y, z0)];
  const left = [p(x, y + sz, z1), p(x + sz, y + sz, z1), p(x + sz, y + sz, z0), p(x, y + sz, z0)];
  const stroke = ember ? EM : LINE;
  const fill = ember ? EM : "#ffffff";
  const fo = ember ? { t: 0.9, l: 0.58, r: 0.4 } : solid ? { t: 0.16, l: 0.1, r: 0.055 } : { t: 0.07, l: 0.045, r: 0.022 };
  const face = (pts: [number, number][], fop: number, key: string) => (
    <polygon key={key} points={pts.map(P).join(" ")} fill={fill} fillOpacity={fop} stroke={stroke} strokeOpacity={op} strokeWidth={sw} strokeLinejoin="round" />
  );
  const lines: ReactElement[] = [];
  for (let i = 1; i < grid; i++) {
    const f = i / grid;
    const L = (a: [number, number], b: [number, number], key: string) => lines.push(<line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />);
    L(p(x + f * sz, y, z1), p(x + f * sz, y + sz, z1), `tx${i}`);
    L(p(x, y + f * sz, z1), p(x + sz, y + f * sz, z1), `ty${i}`);
    L(p(x + sz, y + f * sz, z1), p(x + sz, y + f * sz, z0), `ry${i}`);
    L(p(x + sz, y, z0 + f * h), p(x + sz, y + sz, z0 + f * h), `rz${i}`);
    L(p(x + f * sz, y + sz, z1), p(x + f * sz, y + sz, z0), `lx${i}`);
    L(p(x, y + sz, z0 + f * h), p(x + sz, y + sz, z0 + f * h), `lz${i}`);
  }
  return (
    <g>
      {ember && glowId && (
        <g filter={`url(#${glowId})`} opacity="0.75">
          <polygon points={left.map(P).join(" ")} fill={EM} />
          <polygon points={right.map(P).join(" ")} fill={EM} />
          <polygon points={top.map(P).join(" ")} fill={EM} />
        </g>
      )}
      {face(right, fo.r, "r")}
      {face(left, fo.l, "l")}
      {face(top, fo.t, "t")}
      {lines.length > 0 && (
        <g stroke={stroke} strokeOpacity={op * 0.5} strokeWidth={Math.max(0.4, sw * 0.6)}>{lines}</g>
      )}
    </g>
  );
}

type PlaneProps = { ox: number; oy: number; u: number; x: number; y: number; w: number; d: number; g?: number; op?: number };
/* a flat isometric ground grid at z=0 */
function Plane({ ox, oy, u, x, y, w, d, g = 0, op = 0.16 }: PlaneProps) {
  const p = (X: number, Y: number) => pt(ox, oy, u, X, Y, 0);
  const outline = [p(x, y), p(x + w, y), p(x + w, y + d), p(x, y + d)];
  const lines: ReactElement[] = [];
  for (let i = 1; i < g; i++) {
    const fx = x + (i / g) * w, fy = y + (i / g) * d;
    lines.push(<line key={`gx${i}`} x1={p(fx, y)[0]} y1={p(fx, y)[1]} x2={p(fx, y + d)[0]} y2={p(fx, y + d)[1]} />);
    lines.push(<line key={`gy${i}`} x1={p(x, fy)[0]} y1={p(x, fy)[1]} x2={p(x + w, fy)[0]} y2={p(x + w, fy)[1]} />);
  }
  return (
    <g>
      <polygon points={outline.map(P).join(" ")} fill="#ffffff" fillOpacity="0.02" stroke={LINE} strokeOpacity={op} strokeWidth="1" strokeLinejoin="round" />
      <g stroke={LINE} strokeOpacity={op * 0.6} strokeWidth="0.7">{lines}</g>
    </g>
  );
}

/* dotted connector + node dot helpers */
function Dot({ a, b, c = LINE, o = 0.4, dash = "1 4", w = 1 }: { a: [number, number]; b: [number, number]; c?: string; o?: number; dash?: string; w?: number }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeOpacity={o} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />;
}
function Node({ p, c = LINE, o = 0.85, rr = 2.2, fill }: { p: [number, number]; c?: string; o?: number; rr?: number; fill?: string }) {
  return <circle cx={p[0]} cy={p[1]} r={rr} fill={fill ?? "none"} stroke={c} strokeOpacity={o} strokeWidth="1.2" />;
}

function Frame({ k, className, children }: { k: string; className?: string; children: (gid: (s: string) => string) => ReactNode }) {
  const gid = (s: string) => `bc-${k}-${s}`;
  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={gid("vig")} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#191a20" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#0e0f13" stopOpacity="0.55" />
          <stop offset="100%" stopColor={BG} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gid("fl")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={BG} stopOpacity="1" /><stop offset="17%" stopColor={BG} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gid("fr")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="83%" stopColor={BG} stopOpacity="0" /><stop offset="100%" stopColor={BG} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={gid("ft")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BG} stopOpacity="0.5" /><stop offset="24%" stopColor={BG} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gid("fb")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="56%" stopColor={BG} stopOpacity="0" /><stop offset="100%" stopColor={BG} stopOpacity="0.96" />
        </linearGradient>
        <filter id={gid("glow")} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <pattern id={gid("grain")} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(9)">
          <circle cx="0.7" cy="0.7" r="0.5" fill="#ffffff" fillOpacity="0.05" />
          <circle cx="3" cy="2.4" r="0.4" fill="#ffffff" fillOpacity="0.035" />
          <circle cx="1.8" cy="4.2" r="0.35" fill="#ffffff" fillOpacity="0.03" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill={BG} />
      <ellipse cx="204" cy="104" rx="240" ry="150" fill={`url(#${gid("vig")})`} />
      {children(gid)}
      <rect width="400" height="260" fill={`url(#${gid("grain")})`} />
      <rect width="400" height="260" fill={`url(#${gid("ft")})`} />
      <rect width="400" height="260" fill={`url(#${gid("fb")})`} />
      <rect width="400" height="260" fill={`url(#${gid("fl")})`} />
      <rect width="400" height="260" fill={`url(#${gid("fr")})`} />
    </svg>
  );
}

function Labels({ children }: { children: ReactNode }) {
  return (
    <g fill={LB} fontFamily='"Geist Mono", ui-monospace, monospace' fontSize="9" letterSpacing="1.4" textAnchor="middle">
      {children}
    </g>
  );
}

/* ── optimism: the optimistic update. An ember box is already rendered at the
   result, floating above its footprint (render first); a wireframe box on the
   ground is still catching up (confirm after). ─────────────────────────────── */
const optimism = (className?: string) => {
  const ox = 202, oy = 150, u = 25, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  return (
    <Frame k="optimism" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.6} y={-2.6} w={5.2} d={5.2} g={5} />
          {/* server catches up: wireframe box rising on the ground */}
          <Cube {...b} x={0.7} y={-1.5} sz={1} h={0.72} grid={3} op={0.5} />
          {/* dotted catch-up arc between the two results */}
          <Dot a={q(1.2, -1, 0.72)} b={q(-1, 0, 1.05)} o={0.45} dash="1 4" />
          {/* render first: ember box already at the result, elevated + glowing */}
          <Dot a={q(-1, 0, 0)} b={q(-1, 0, 1.05)} c={EM} o={0.5} dash="1 3.5" />
          <Cube {...b} x={-1.5} y={-0.5} sz={1} h={1} z={1.05} ember op={0.92} glowId={gid("glow")} />
          <Labels>
            <text x="118" y="52">RENDER FIRST</text>
            <text x="292" y="212">CONFIRM AFTER</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── headless: same behaviour, three skins. Identical boxes, different surfaces:
   wireframe, solid, ember. ──────────────────────────────────────────────────── */
const headless = (className?: string) => {
  const b = { ox: 200, oy: 128, u: 30 };
  return (
    <Frame k="headless" className={className}>
      {(gid) => (
        <>
          <Cube {...b} x={-2} y={1} sz={1} h={1} grid={4} op={0.5} />
          <Cube {...b} x={-0.5} y={-0.5} sz={1} h={1} solid op={0.72} />
          <Cube {...b} x={1} y={-2} sz={1} h={1} ember op={0.92} glowId={gid("glow")} />
          <Labels>
            <text x="200" y="50">SAME BEHAVIOUR</text>
            <text x="200" y="212">DIFFERENT SKINS</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── drift: one canonical box sits on the grid, the rest float off-plane. ────── */
const drift = (className?: string) => {
  const ox = 202, oy = 150, u = 25, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const floats: [number, number, number][] = [
    [-0.4, -0.7, 0.75], [0.9, -1.7, 1.25], [1.5, 0.3, 0.5],
  ];
  return (
    <Frame k="drift" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.6} y={-2.6} w={5.2} d={5.2} g={5} />
          {floats.map((fpt, i) => (
            <g key={i}>
              <Dot a={q(fpt[0] + 0.35, fpt[1] + 0.35, 0)} b={q(fpt[0] + 0.35, fpt[1] + 0.35, fpt[2])} o={0.32} />
              <Cube {...b} x={fpt[0]} y={fpt[1]} sz={0.7} h={0.7} z={fpt[2]} grid={2} op={0.5} />
            </g>
          ))}
          {/* canonical: ember box aligned on the plane */}
          <Cube {...b} x={-2} y={0.1} sz={0.9} h={0.9} ember op={0.92} glowId={gid("glow")} />
          <Labels>
            <text x="106" y="214">CANONICAL</text>
            <text x="300" y="52">DRIFT</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── adoption: two routes to the same end. Copy-paste winds around loose parts;
   the system is the straight ember beam. ────────────────────────────────────── */
const adoption = (className?: string) => {
  const ox = 202, oy = 150, u = 25, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const A = q(-2.2, 1.2, 0.05), Bn = q(2.2, -1.2, 0.05);
  // winding path weaving above the plane between A and B
  const w1 = q(-1.2, 1.6, 0.9), w2 = q(-0.2, -0.4, 0.6), w3 = q(0.8, 1.2, 1.0), w4 = q(1.6, -0.8, 0.5);
  const wind = `M${P(A)} C ${P(w1)} ${P(w2)} ${P(q(0, 0.4, 0.8))} S ${P(w3)} ${P(q(1.2, 0.2, 0.7))} S ${P(w4)} ${P(Bn)}`;
  return (
    <Frame k="adoption" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.8} y={-2.4} w={5.4} d={4.6} g={5} />
          {/* loose parts the copy-paste route weaves around */}
          <Cube {...b} x={-0.9} y={0.5} sz={0.55} h={0.5} grid={2} op={0.45} />
          <Cube {...b} x={0.5} y={-0.5} sz={0.55} h={0.5} grid={2} op={0.45} />
          <path d={wind} fill="none" stroke={LINE} strokeOpacity={0.5} strokeWidth={1.1} strokeDasharray="1 4" strokeLinecap="round" />
          {/* the system: straight ember beam */}
          <line x1={A[0]} y1={A[1]} x2={Bn[0]} y2={Bn[1]} stroke={EM} strokeOpacity={0.9} strokeWidth={1.6} strokeLinecap="round" filter={`url(#${gid("glow")})`} opacity={0.5} />
          <line x1={A[0]} y1={A[1]} x2={Bn[0]} y2={Bn[1]} stroke={EM} strokeOpacity={0.95} strokeWidth={1.6} strokeLinecap="round" />
          <Node p={A} c={EM} fill={BG} rr={2.6} />
          <Node p={Bn} c={EM} fill={EM} rr={2.6} o={1} />
          <Labels>
            <text x="120" y="52">COPY-PASTE</text>
            <text x="292" y="214">THE SYSTEM</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── components to systems: loose boxes on the left resolve into one connected
   stack on the right, ember at the crown. ───────────────────────────────────── */
const components = (className?: string) => {
  const ox = 192, oy = 150, u = 23, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const loose: [number, number, number][] = [
    [-3.4, 0.8, 0], [-2.6, -0.6, 0.7], [-3.8, -0.9, 0.25], [-2.2, 1.6, 0],
  ];
  return (
    <Frame k="components" className={className}>
      {(gid) => (
        <>
          {loose.map((c, i) => (
            <Cube key={i} {...b} x={c[0]} y={c[1]} sz={0.8} h={0.8} z={c[2]} grid={i % 2 ? 0 : 2} solid={i % 2 === 1} op={0.5} />
          ))}
          {/* the arrow: loose parts become a system */}
          <Dot a={q(-1.3, 0.2, 0.5)} b={q(0.7, 0.2, 0.5)} o={0.5} dash="1 3.5" />
          <path d={`M${P(q(0.5, 0.2, 0.5))} L ${P(q(0.7, 0.2, 0.5))} L ${P(q(0.5, 0.2, 0.5))}`} fill="none" />
          <path d={`M${P(q(0.35, -0.05, 0.55))} L ${P(q(0.75, 0.2, 0.5))} L ${P(q(0.35, 0.45, 0.45))}`} fill="none" stroke={LINE} strokeOpacity={0.5} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          {/* one system: connected stack */}
          <Cube {...b} x={1.6} y={-0.9} sz={1} h={1} z={0} solid op={0.62} />
          <Cube {...b} x={1.6} y={-0.9} sz={1} h={1} z={1} solid op={0.62} />
          <Cube {...b} x={1.6} y={-0.9} sz={1} h={1} z={2} ember op={0.92} glowId={gid("glow")} />
          <Labels>
            <text x="96" y="214">LOOSE PARTS</text>
            <text x="316" y="60">ONE SYSTEM</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── figma variables: one ember source fans out to every surface. ───────────── */
const figma = (className?: string) => {
  const ox = 150, oy = 146, u = 23, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const src = q(-1.5, 1, 1.2); // top of the source box
  const tiles: [number, number][] = [
    [2.3, -2.4], [3.0, -1.0], [2.6, 0.4], [1.8, 1.8], [3.4, 1.0],
  ];
  return (
    <Frame k="figma" className={className}>
      {(gid) => (
        <>
          {tiles.map((t, i) => {
            const c = q(t[0] + 0.35, t[1] + 0.35, 0.18);
            return (
              <g key={i}>
                <Dot a={src} b={c} c={EM} o={0.4} dash="1 4" />
                <Cube {...b} x={t[0]} y={t[1]} sz={0.7} h={0.28} grid={2} op={0.5} />
              </g>
            );
          })}
          {/* one source of truth */}
          <Cube {...b} x={-2} y={0.5} sz={1} h={1} ember op={0.92} glowId={gid("glow")} />
          <Labels>
            <text x="96" y="214">ONE SOURCE</text>
            <text x="316" y="58">EVERY SURFACE</text>
          </Labels>
        </>
      )}
    </Frame>
  );
};

/* ── tokens: three stacked layers resolving upward, ember crown ────────────── */
const tokens = (className?: string) => {
  const b = { ox: 200, oy: 150, u: 25 };
  return (
    <Frame k="tokens" className={className}>
      {(gid) => (
        <>
          <Cube {...b} x={-1.7} y={-1.7} sz={3.4} h={0.26} z={0} solid op={0.5} />
          <Cube {...b} x={-1.7} y={-1.7} sz={3.4} h={0.26} z={0.72} solid op={0.58} />
          <Cube {...b} x={-1.7} y={-1.7} sz={3.4} h={0.26} z={1.44} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="200" y="52">LAYERED TOKENS</text><text x="200" y="214">ONE SOURCE</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── using Optimistic: install, import, ship, a rising staircase to ember ───── */
const using = (className?: string) => {
  const b = { ox: 200, oy: 152, u: 26 };
  return (
    <Frame k="using" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.6} y={-2.6} w={5.2} d={5.2} g={5} />
          <Cube {...b} x={-1.9} y={0.9} sz={0.9} h={0.7} solid op={0.6} />
          <Cube {...b} x={-0.5} y={-0.5} sz={0.9} h={1.1} solid op={0.62} />
          <Cube {...b} x={0.9} y={-1.9} sz={0.9} h={1.5} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="112" y="214">INSTALL ONCE</text><text x="300" y="52">SHIP FAST</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── integrate with Claude: describe to an ember core, generate outward ─────── */
const claude = (className?: string) => {
  const ox = 200, oy = 146, u = 26, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  return (
    <Frame k="claude" className={className}>
      {(gid) => (
        <>
          <Cube {...b} x={-2.4} y={0.6} sz={0.9} h={0.9} grid={2} op={0.5} />
          <Cube {...b} x={1.5} y={-2.4} sz={0.9} h={0.9} grid={2} op={0.5} />
          <Dot a={q(-1.5, 1.05, 0.5)} b={q(-0.05, 0.05, 0.5)} c={EM} o={0.45} />
          <Dot a={q(0.55, -0.45, 0.5)} b={q(1.95, -1.5, 0.5)} c={EM} o={0.45} />
          <Cube {...b} x={-0.45} y={-0.45} sz={1} h={1} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="106" y="214">DESCRIBE</text><text x="300" y="52">GENERATE</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── Figma workflow: one variable, every mode ──────────────────────────────── */
const figmaflow = (className?: string) => {
  const ox = 200, oy = 150, u = 27, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  return (
    <Frame k="figmaflow" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.6} y={-2.6} w={5.2} d={5.2} g={4} />
          <Cube {...b} x={-1.7} y={0.2} sz={1} h={1} solid op={0.62} />
          <Dot a={q(-0.7, 0.7, 1.05)} b={q(0.7, -0.8, 1.05)} o={0.4} />
          <Cube {...b} x={0.7} y={-1.8} sz={1} h={1} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="112" y="214">ONE VARIABLE</text><text x="300" y="52">EVERY MODE</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── overview: an ember core with connected parts, the whole system ────────── */
const overview = (className?: string) => {
  const ox = 200, oy = 150, u = 24, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const sats: [number, number, number][] = [[-2.1, -0.4, 0.5], [0.5, -2.1, 0.6], [1.9, 0.4, 0.4], [-0.6, 1.7, 0.35]];
  return (
    <Frame k="overview" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.9} y={-2.9} w={5.8} d={5.8} g={5} />
          {sats.map((s, i) => (
            <g key={i}>
              <Dot a={q(0, 0, 0.5)} b={q(s[0] + 0.35, s[1] + 0.35, s[2])} o={0.32} />
              <Cube {...b} x={s[0]} y={s[1]} sz={0.7} h={0.7} z={s[2]} grid={2} op={0.5} />
            </g>
          ))}
          <Cube {...b} x={-0.5} y={-0.5} sz={1} h={1} ember op={0.92} glowId={gid("glow")} />
          <Labels><text x="200" y="52">ONE SYSTEM</text><text x="200" y="214">EVERY PART</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── why: ad-hoc wireframe vs one solid ember system ───────────────────────── */
const why = (className?: string) => {
  const b = { ox: 200, oy: 132, u: 32 };
  return (
    <Frame k="why" className={className}>
      {(gid) => (
        <>
          <Cube {...b} x={-1.6} y={0.6} sz={1.1} h={1.1} grid={4} op={0.4} />
          <Cube {...b} x={0.5} y={-1.5} sz={1.1} h={1.1} ember op={0.92} glowId={gid("glow")} />
          <Labels><text x="120" y="52">AD HOC PARTS</text><text x="292" y="214">ONE SYSTEM</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── GTM: a slow base rising into an ember trajectory to market ────────────── */
const gtm = (className?: string) => {
  const ox = 200, oy = 154, u = 25, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const A = q(-1.65, 1.35, 0.55), C = q(1.1, -1.35, 2.2);
  return (
    <Frame k="gtm" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.8} y={-2.8} w={5.6} d={5.6} g={5} />
          <Cube {...b} x={-2} y={1} sz={0.7} h={0.5} solid op={0.55} />
          <Cube {...b} x={-0.8} y={-0.2} sz={0.7} h={1.0} solid op={0.58} />
          <Cube {...b} x={0.4} y={-1.4} sz={0.7} h={1.6} solid op={0.6} />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={EM} strokeOpacity={0.9} strokeWidth={1.6} strokeLinecap="round" filter={`url(#${gid("glow")})`} opacity={0.5} />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={EM} strokeOpacity={0.95} strokeWidth={1.6} strokeLinecap="round" />
          <Node p={C} c={EM} fill={EM} o={1} rr={2.6} />
          <Labels><text x="112" y="214">SLOW START</text><text x="300" y="52">TO MARKET</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── cost: a tall wireframe bar beside a shorter ember one ──────────────────── */
const cost = (className?: string) => {
  const b = { ox: 200, oy: 150, u: 27 };
  return (
    <Frame k="cost" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.4} y={-2.4} w={4.8} d={4.8} g={4} />
          <Cube {...b} x={-1.4} y={0.4} sz={0.9} h={1.9} grid={3} op={0.5} />
          <Cube {...b} x={0.5} y={-1.5} sz={0.9} h={1.25} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="112" y="214">BEFORE</text><text x="296" y="60">AFTER, -30%</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── scale: one ember source replicated across a grid of many ──────────────── */
const scale = (className?: string) => {
  const ox = 200, oy = 150, u = 22, b = { ox, oy, u };
  const gs = [-1.6, 0, 1.6];
  const cells = gs.flatMap((cx) => gs.map((cy) => [cx, cy] as [number, number]));
  return (
    <Frame k="scale" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.8} y={-2.8} w={5.6} d={5.6} g={6} />
          {cells.map(([cx, cy], i) =>
            cx === 0 && cy === 0 ? (
              <Cube key="core" {...b} x={-0.3} y={-0.3} sz={0.6} h={0.95} ember op={0.92} glowId={gid("glow")} />
            ) : (
              <Cube key={i} {...b} x={cx - 0.3} y={cy - 0.3} sz={0.6} h={0.6} grid={2} op={0.45} />
            )
          )}
          <Labels><text x="200" y="52">ONE SOURCE</text><text x="200" y="214">MANY TEAMS</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── effective: four boxes aligned on one baseline, ember leading ──────────── */
const effective = (className?: string) => {
  const b = { ox: 200, oy: 140, u: 27 };
  return (
    <Frame k="effective" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.8} y={-2.8} w={5.6} d={5.6} g={5} />
          <Cube {...b} x={-2} y={1.4} sz={0.8} h={0.9} solid op={0.6} />
          <Cube {...b} x={-0.8} y={0.2} sz={0.8} h={0.9} solid op={0.6} />
          <Cube {...b} x={0.4} y={-1} sz={0.8} h={0.9} solid op={0.6} />
          <Cube {...b} x={1.6} y={-2.2} sz={0.8} h={0.9} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="112" y="214">ALIGNED</text><text x="300" y="52">EFFECTIVE</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── audit: a field of boxes swept by an ember scan line, two flagged ──────── */
const audit = (className?: string) => {
  const ox = 200, oy = 150, u = 24, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const cubes: [number, number][] = [[-1.8, -1.3], [-0.4, -1.9], [1.0, -1.4], [-1.3, 0.3], [0.2, -0.2], [1.4, 0.5], [-0.5, 1.5], [0.9, 1.1]];
  const S1 = q(0.5, -2.7, 0.05), S2 = q(0.5, 2.7, 0.05);
  return (
    <Frame k="audit" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.6} y={-2.6} w={5.2} d={5.2} g={5} />
          {cubes.map((c, i) => (
            <Cube key={i} {...b} x={c[0]} y={c[1]} sz={0.55} h={i % 3 ? 0.5 : 0.85} z={0} grid={2} op={0.45} ember={i === 2 || i === 6} glowId={gid("glow")} />
          ))}
          <line x1={S1[0]} y1={S1[1]} x2={S2[0]} y2={S2[1]} stroke={EM} strokeOpacity={0.8} strokeWidth={1.4} strokeLinecap="round" filter={`url(#${gid("glow")})`} opacity={0.55} />
          <line x1={S1[0]} y1={S1[1]} x2={S2[0]} y2={S2[1]} stroke={EM} strokeOpacity={0.85} strokeWidth={1.2} strokeDasharray="2 3" strokeLinecap="round" />
          <Labels><text x="112" y="214">SCAN</text><text x="300" y="52">FIND DRIFT</text></Labels>
        </>
      )}
    </Frame>
  );
};

/* ── automate: an ember source feeding a pipeline out to every platform ────── */
const automate = (className?: string) => {
  const ox = 200, oy = 150, u = 25, b = { ox, oy, u };
  const q = (x: number, y: number, z: number) => pt(ox, oy, u, x, y, z);
  const A = q(-1.5, 1.05, 0.55), C = q(2.4, -2.4, 0.55);
  const outs: [number, number][] = [[1.7, -2.3], [2.1, -0.7], [2.4, 0.9]];
  return (
    <Frame k="automate" className={className}>
      {(gid) => (
        <>
          <Plane {...b} x={-2.8} y={-2.8} w={5.6} d={5.6} g={5} />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={EM} strokeOpacity={0.85} strokeWidth={1.5} strokeLinecap="round" filter={`url(#${gid("glow")})`} opacity={0.45} />
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={EM} strokeOpacity={0.9} strokeWidth={1.5} strokeLinecap="round" />
          {outs.map((o, i) => (
            <g key={i}>
              <Dot a={q(o[0] - 0.5, o[1] - 0.5, 0.55)} b={q(o[0] + 0.3, o[1] + 0.3, 0.28)} c={EM} o={0.35} />
              <Cube {...b} x={o[0]} y={o[1]} sz={0.6} h={0.4} grid={2} op={0.5} />
            </g>
          ))}
          <Cube {...b} x={-2} y={0.5} sz={0.9} h={0.9} ember op={0.9} glowId={gid("glow")} />
          <Labels><text x="106" y="214">ONE SOURCE</text><text x="300" y="52">EVERY PLATFORM</text></Labels>
        </>
      )}
    </Frame>
  );
};

export const BESPOKE: Record<string, (className?: string) => ReactElement> = {
  optimism, headless, drift, adoption, components, figma,
  tokens, using, claude, figmaflow, overview, why,
  gtm, cost, scale, effective, audit, automate,
};
