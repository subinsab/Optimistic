"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "./DesignSystemCanvas.module.css";

/* ────────────────────────────────────────────────────────────────
   Section E — Headless Design System: a live, interactive node graph.
   Tokens → Variables → Components → Code → Apps, continuously syncing.
   Connections animate via declarative SMIL (robust, GPU, never stops).
   Hover highlights the connected path; click expands a node's tokens.
   ──────────────────────────────────────────────────────────────── */

const NW = 160;
const NH = 78;

type Tok = { k: string; v: string; sw?: string };
type NodeContent = { title: string; sub: string; icon: keyof typeof ICON; toks: Tok[] };
type Slot = { x: number; y: number };
type Side = "l" | "r" | "t" | "b";
type Edge = { s: number; t: number; ss: Side; ts: Side; axis: "h" | "v" };

type Graph = { pos: Slot[]; edges: Edge[]; nodes: NodeContent[] };

/* 7-node serpentine (Components pipeline: 4 top → 3 bottom) */
const P7: Slot[] = [
  { x: 320, y: 180 }, { x: 580, y: 180 }, { x: 840, y: 180 }, { x: 1100, y: 180 },
  { x: 1100, y: 430 }, { x: 840, y: 430 }, { x: 580, y: 430 },
];
const E7: Edge[] = [
  { s: 0, t: 1, ss: "r", ts: "l", axis: "h" },
  { s: 1, t: 2, ss: "r", ts: "l", axis: "h" },
  { s: 2, t: 3, ss: "r", ts: "l", axis: "h" },
  { s: 3, t: 4, ss: "b", ts: "t", axis: "v" },
  { s: 4, t: 5, ss: "l", ts: "r", axis: "h" },
  { s: 5, t: 6, ss: "l", ts: "r", axis: "h" },
];

/* 6-node serpentine (Tokens / Variables / Themes: 3 top → 3 bottom) */
const P6: Slot[] = [
  { x: 340, y: 180 }, { x: 720, y: 180 }, { x: 1100, y: 180 },
  { x: 1100, y: 430 }, { x: 720, y: 430 }, { x: 340, y: 430 },
];
const E6: Edge[] = [
  { s: 0, t: 1, ss: "r", ts: "l", axis: "h" },
  { s: 1, t: 2, ss: "r", ts: "l", axis: "h" },
  { s: 2, t: 3, ss: "b", ts: "t", axis: "v" },
  { s: 3, t: 4, ss: "l", ts: "r", axis: "h" },
  { s: 4, t: 5, ss: "l", ts: "r", axis: "h" },
];

/* one graph per sidebar tab */
const GRAPHS: Record<string, Graph> = {
  Tokens: { pos: P6, edges: E6, nodes: [
    { title: "Primitive Tokens", sub: "colors · type", icon: "tokens", toks: [{ k: "Colors", v: "✓" }, { k: "Typography", v: "✓" }, { k: "Spacing", v: "✓" }, { k: "Radius", v: "✓" }] },
    { title: "Semantic Tokens", sub: "roles", icon: "semantic", toks: [{ k: "Primary", v: "#FF7A00", sw: "#FF7A00" }, { k: "Surface", v: "#0E0E0E", sw: "#0E0E0E" }, { k: "Success", v: "#30A46C", sw: "#30A46C" }, { k: "Danger", v: "#E5484D", sw: "#E5484D" }] },
    { title: "Component Tokens", sub: "per-component", icon: "components", toks: [{ k: "Button", v: "✓" }, { k: "Input", v: "✓" }, { k: "Card", v: "✓" }, { k: "Navigation", v: "✓" }] },
    { title: "Brand Tokens", sub: "multi-brand", icon: "styledict", toks: [{ k: "Default", v: "✓" }, { k: "Enterprise", v: "✓" }, { k: "Retail", v: "✓" }, { k: "Banking", v: "✓" }] },
    { title: "Theme Tokens", sub: "modes", icon: "variants", toks: [{ k: "Light", v: "✓" }, { k: "Dark", v: "✓" }, { k: "High Contrast", v: "✓" }, { k: "Custom", v: "✓" }] },
    { title: "Platform Tokens", sub: "targets", icon: "react", toks: [{ k: "CSS", v: "✓" }, { k: "React", v: "✓" }, { k: "Flutter", v: "✓" }, { k: "iOS", v: "✓" }] },
  ] },
  Components: { pos: P7, edges: E7, nodes: [
    { title: "Foundations", sub: "color · type · grid", icon: "styledict", toks: [{ k: "Color", v: "✓" }, { k: "Typography", v: "✓" }, { k: "Spacing", v: "✓" }, { k: "Grid", v: "✓" }] },
    { title: "Design Tokens", sub: "primitive · semantic", icon: "tokens", toks: [{ k: "Primitive", v: "✓" }, { k: "Semantic", v: "✓" }, { k: "Themes", v: "✓" }, { k: "Variables", v: "✓" }] },
    { title: "Component Library", sub: "atomic · composite", icon: "components", toks: [{ k: "Atomic", v: "✓" }, { k: "Core", v: "✓" }, { k: "Composite", v: "✓" }, { k: "Patterns", v: "✓" }] },
    { title: "Templates", sub: "4 blueprints", icon: "figma", toks: [{ k: "Dashboard", v: "✓" }, { k: "Forms", v: "✓" }, { k: "Analytics", v: "✓" }, { k: "Commerce", v: "✓" }] },
    { title: "Developer Assets", sub: "storybook · code", icon: "code", toks: [{ k: "Storybook", v: "✓" }, { k: "Documentation", v: "✓" }, { k: "Code", v: "✓" }, { k: "Packages", v: "✓" }] },
    { title: "Platforms", sub: "4 targets", icon: "react", toks: [{ k: "React", v: "✓" }, { k: "Angular", v: "✓" }, { k: "Flutter", v: "✓" }, { k: "iOS", v: "✓" }] },
    { title: "Products", sub: "4 surfaces", icon: "apps", toks: [{ k: "Web", v: "live" }, { k: "Mobile", v: "live" }, { k: "Internal", v: "live" }, { k: "Enterprise", v: "live" }] },
  ] },
  Variables: { pos: P6, edges: E6, nodes: [
    { title: "Collections", sub: "4 sets", icon: "figma", toks: [{ k: "Global", v: "✓" }, { k: "Components", v: "✓" }, { k: "Brand", v: "✓" }, { k: "Motion", v: "✓" }] },
    { title: "Modes", sub: "4 modes", icon: "variants", toks: [{ k: "Light", v: "✓" }, { k: "Dark", v: "✓" }, { k: "Brand A", v: "✓" }, { k: "Brand B", v: "✓" }] },
    { title: "Aliases", sub: "links", icon: "semantic", toks: [{ k: "Semantic", v: "✓" }, { k: "Component", v: "✓" }, { k: "Theme", v: "✓" }, { k: "State", v: "✓" }] },
    { title: "Component Variables", sub: "per-component", icon: "components", toks: [{ k: "Buttons", v: "✓" }, { k: "Inputs", v: "✓" }, { k: "Cards", v: "✓" }, { k: "Tables", v: "✓" }] },
    { title: "Synchronization", sub: "real-time", icon: "tokenstudio", toks: [{ k: "Token Studio", v: "✓" }, { k: "Figma", v: "✓" }, { k: "Documentation", v: "✓" }, { k: "Code", v: "✓" }] },
    { title: "Applications", sub: "surfaces", icon: "apps", toks: [{ k: "Web", v: "live" }, { k: "Mobile", v: "live" }, { k: "Enterprise", v: "live" }, { k: "Marketing", v: "live" }] },
  ] },
  Themes: { pos: P6, edges: E6, nodes: [
    { title: "Foundation Theme", sub: "colors · motion", icon: "tokens", toks: [{ k: "Colors", v: "✓" }, { k: "Typography", v: "✓" }, { k: "Motion", v: "✓" }, { k: "Radius", v: "✓" }] },
    { title: "Brand Themes", sub: "multi-brand", icon: "styledict", toks: [{ k: "Default", v: "✓" }, { k: "Enterprise", v: "✓" }, { k: "Banking", v: "✓" }, { k: "Healthcare", v: "✓" }] },
    { title: "Appearance", sub: "modes", icon: "variants", toks: [{ k: "Light", v: "✓" }, { k: "Dark", v: "✓" }, { k: "AMOLED", v: "✓" }, { k: "High Contrast", v: "✓" }] },
    { title: "Customization", sub: "per-brand", icon: "semantic", toks: [{ k: "Colors", v: "✓" }, { k: "Components", v: "✓" }, { k: "Icons", v: "✓" }, { k: "Illustrations", v: "✓" }] },
    { title: "Distribution", sub: "channels", icon: "package", toks: [{ k: "Figma", v: "✓" }, { k: "Storybook", v: "✓" }, { k: "Packages", v: "✓" }, { k: "APIs", v: "✓" }] },
    { title: "Experiences", sub: "surfaces", icon: "apps", toks: [{ k: "Web", v: "live" }, { k: "Mobile", v: "live" }, { k: "Dashboard", v: "live" }, { k: "Internal Tools", v: "live" }] },
  ] },
};

const NAV = ["Components", "Tokens", "Variables", "Themes"];
const STACK = [
  { id: "figma", name: "Figma" }, { id: "tokenstudio", name: "Token Studio" },
  { id: "styledict", name: "Style Dictionary" }, { id: "react", name: "React" },
  { id: "angular", name: "Angular" }, { id: "plus", name: "Add tool" },
] as const;
const THEMES = ["Light", "Dark", "Brand A", "Brand B", "Enterprise"];

function port(p: Slot, side: Side) {
  switch (side) {
    case "l": return { x: p.x, y: p.y + NH / 2 };
    case "r": return { x: p.x + NW, y: p.y + NH / 2 };
    case "t": return { x: p.x + NW / 2, y: p.y };
    case "b": return { x: p.x + NW / 2, y: p.y + NH };
  }
}
function edgePath(e: Edge, pos: Slot[]) {
  const p1 = port(pos[e.s], e.ss);
  const p2 = port(pos[e.t], e.ts);
  if (e.axis === "h") {
    const k = Math.abs(p2.x - p1.x) * 0.5 * Math.sign(p2.x - p1.x);
    return `M${p1.x},${p1.y} C${p1.x + k},${p1.y} ${p2.x - k},${p2.y} ${p2.x},${p2.y}`;
  }
  const k = Math.abs(p2.y - p1.y) * 0.5 * Math.sign(p2.y - p1.y);
  return `M${p1.x},${p1.y} C${p1.x},${p1.y + k} ${p2.x},${p2.y - k} ${p2.x},${p2.y}`;
}

export default function DesignSystemCanvas() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [exp, setExp] = useState<number | null>(null);
  const [nav, setNav] = useState("Tokens");
  const [theme, setTheme] = useState("Dark");

  const g = GRAPHS[nav];
  const adj = useMemo(() => {
    const m: Record<number, Set<number>> = {};
    g.edges.forEach((e) => {
      (m[e.s] ??= new Set()).add(e.t);
      (m[e.t] ??= new Set()).add(e.s);
    });
    return m;
  }, [g]);
  const paths = useMemo(() => g.edges.map((e) => edgePath(e, g.pos)), [g]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / 1500)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const changeNav = (b: string) => { setNav(b); setActive(null); setExp(null); };
  const nodeCls = (i: number) => {
    if (active === null) return "";
    if (i === active || adj[active]?.has(i)) return s.nodeHot;
    return s.nodeDim;
  };
  const edgeCls = (e: Edge) => {
    if (active === null) return s.edge;
    return `${s.edge} ${e.s === active || e.t === active ? s.edgeHot : s.edgeDim}`;
  };

  return (
    <div className={s.frame} ref={frameRef} style={{ height: 690 * scale }}>
      <div className={s.stage} style={{ transform: `scale(${scale})` }}>
        <div className={s.bgdots} />
        <span className={`${s.bracket} ${s.brTL}`} />
        <span className={`${s.bracket} ${s.brTR}`} />
        <span className={`${s.bracket} ${s.brBL}`} />
        <span className={`${s.bracket} ${s.brBR}`} />

        {/* coordinate system */}
        <span className={s.coord} style={{ left: 40, top: 40 }}>PIPELINE</span>
        <span className={s.coord} style={{ left: 40, bottom: 30 }}>ORIGIN · 0,0</span>
        <span className={s.coord} style={{ right: 70, bottom: 30 }}>WORKSPACE</span>
        <span className={s.coord} style={{ left: "50%", bottom: 18 }}>X →</span>
        <span className={s.coord} style={{ left: 18, top: "50%" }}>Y ↓</span>
        <span className={s.hostLabel}>HOST · SYNC</span>

        {/* stats + badges */}
        <div className={s.stats}>
          {[["1,284", "Variables"], ["246", "Components"], ["12", "Themes"], ["9", "Platforms"]].map(
            ([n, l]) => (
              <div key={l} className={s.stat}>
                <div className={s.statN}>{n}</div>
                <div className={s.statL}>{l}</div>
              </div>
            )
          )}
        </div>
        <div className={s.badges}>
          <span className={`${s.badge} ${s.badgeAcc}`}>● LIVE</span>
          <span className={s.badge}>SYNCED</span>
          <span className={s.badge}>v3.2</span>
        </div>

        {/* sidebar toolbox */}
        <aside className={s.sidebar}>
          <span className={s.rail} />
          {NAV.map((b) => (
            <button
              key={b}
              className={`${s.navBtn} ${nav === b ? s.navActive : ""}`}
              onClick={() => changeNav(b)}
            >
              {b}
            </button>
          ))}
          <div className={s.secLabel}>STACK</div>
          <div className={s.stackGrid}>
            {STACK.map((t) => (
              <div key={t.id} className={s.tile}>
                {ICON[t.id]}
                <span className={s.tileTip}>{t.name}</span>
              </div>
            ))}
          </div>
          <div className={s.syncWrap}>
            <span>SYNC MODE</span>
            <span className={s.syncLive}>LIVE</span>
          </div>
        </aside>

        {/* edges + subtle gradient flow (the line itself lights up) */}
        <svg className={s.edges} viewBox="0 0 1500 690" preserveAspectRatio="none">
          {g.edges.map((e, i) => (
            <path key={i} d={paths[i]} className={edgeCls(e)} />
          ))}
          {g.edges.map((e, i) => {
            const dur = 3.2 + (i % 3) * 0.6;
            const hot = active !== null && (e.s === active || e.t === active);
            const dim = active !== null && !hot;
            const N = 7; // stacked dashes → a soft gradient comet (bright head → faded tail)
            return (
              <g key={`f${i}`} style={{ opacity: dim ? 0.1 : hot ? 1 : 0.75 }}>
                {Array.from({ length: N }, (_, k) => {
                  const lead = k / (N - 1);
                  return (
                    <path key={k} d={paths[i]} pathLength={100} className={s.edgeFlow}
                      style={{ opacity: 0.12 + lead * 0.88, animationDuration: `${dur}s`, animationDelay: `${-(i * 0.55) - lead * dur * 0.05}s` }} />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* nodes */}
        {g.pos.map((slot, i) => {
          const n = g.nodes[i];
          const isExp = exp === i;
          return (
            <div
              key={i}
              className={`${s.node} ${nodeCls(i)} ${isExp ? s.nodeExp : ""}`}
              style={{ left: slot.x, top: slot.y, width: NW }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setExp(isExp ? null : i)}
            >
              <span className={`${s.port} ${s.portL}`} />
              <span className={`${s.port} ${s.portR}`} />
              <div className={s.nHead}>
                <span className={s.nIcon}>{ICON[n.icon]}</span>
                <div className={s.nMeta}>
                  <div className={s.nTitle}>{n.title}</div>
                  <div className={s.nSub}>{n.sub}</div>
                </div>
              </div>
              {isExp && (
                <div className={s.nBody}>
                  {n.toks.map((t) => (
                    <div key={t.k} className={s.tRow}>
                      <span className={s.tK}>{t.k}</span>
                      <span className={`${s.tV} ${t.sw ? s.tChip : ""}`}>
                        {t.sw && <span className={s.tSw} style={{ background: t.sw }} />}
                        {t.v}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* theme switcher */}
        <div className={s.themebar}>
          <span className={s.themeKey}>THEME</span>
          {THEMES.map((t) => (
            <button
              key={t}
              className={`${s.themeChip} ${theme === t ? s.themeOn : ""}`}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── monochrome line icons ── */
const ICON = {
  tokens: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 21 8 12 13 3 8z" /><path d="M3 13 12 18 21 13" /><path d="M3 8v5M21 8v5" />
    </svg>
  ),
  semantic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4 4h7l9 9-7 7-9-9z" /><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="3" width="7" height="6" rx="1.4" /><rect x="13" y="3" width="7" height="6" rx="1.4" />
      <rect x="4" y="11" width="7" height="6" rx="1.4" /><circle cx="16.5" cy="14" r="3" />
    </svg>
  ),
  components: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  variants: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 7h10M4 12h16M4 17h7" /><circle cx="17" cy="7" r="2" /><circle cx="14" cy="17" r="2" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M5 4h9l5 5v11H5z" /><path d="M14 4v5h5" /><path d="M8 13h7M8 16h7" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 5 12l4 4M15 8l4 4-4 4" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 21 8v8l-9 5-9-5V8z" /><path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="13" height="9" rx="1.4" /><rect x="14" y="9" width="7" height="11" rx="1.4" />
    </svg>
  ),
  tokenstudio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  styledict: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 20 12 12 21 4 12z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="1.8" /><ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  angular: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 21 6l-1.4 11L12 21l-7.6-4L3 6z" /><path d="M9 15l3-8 3 8M10 13h4" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
};
