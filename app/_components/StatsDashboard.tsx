"use client";

import { useEffect, useRef, useState } from "react";
import s from "./StatsDashboard.module.css";

/* ────────────────────────────────────────────────────────────────
   Section F — live observability dashboard.
   12 cards, each a DIFFERENT creative chart (tachometer dial, needle
   speedometer, lollipop stems, flowing dot-grid line, radar, candles…).
   All progressive motion plays ONCE when the card enters view (no loops),
   very smooth easing. Only the small status dot keeps an ambient pulse.
   ──────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // easeOutExpo — ultra-smooth deceleration
const LINE = "#5a5d64";
const DIM = "#34373d";
const DIMMER = "#26282c";
const GRID = "rgba(255,255,255,0.06)";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      // fire before the panel enters view so the counters have finished by the
      // time you reach it, rather than counting up after a visible delay
      { rootMargin: "300px 0px 300px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

const fmt = (n: number, dec: number) =>
  dec ? n.toFixed(dec) : Math.round(n).toLocaleString();

function Counter({ to, dec = 0, unit, seen }: { to: number; dec?: number; unit?: string; seen: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduceMotion()) { setV(to); return; }
    let raf = 0;
    let start = 0;
    const dur = 2200;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setV(to * (1 - Math.pow(1 - p, 5)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span className={s.value}>
      {fmt(v, dec)}
      {unit && <span className={s.unit}>{unit}</span>}
    </span>
  );
}

/* path helpers */
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
function toPts(data: number[], w: number, h: number, pad = 4): [number, number][] {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const dx = w / (data.length - 1);
  return data.map((v, i) => [i * dx, pad + (h - 2 * pad) * (1 - (v - min) / (max - min || 1))]);
}
const r2 = (n: number) => Math.round(n * 100) / 100; // stable coords (no SSR/client FP drift)
const pol = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [r2(cx + Math.cos(a) * r), r2(cy + Math.sin(a) * r)];
};

/* 1 · FLOWING LINE over dotted matrix — Time to Market (Growth Vector style) */
function GrowthLine({ data, seen, accent }: { data: number[]; seen: boolean; accent?: boolean }) {
  const W = 200, H = 64;
  const pts = toPts(data, W, H, 6);
  const line = smooth(pts);
  const last = pts[pts.length - 1];
  const col = accent ? "var(--acc)" : "#e3e5ea";
  return (
    <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" height={64}>
      <defs>
        <pattern id="dgF" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#dgF)" style={{ opacity: seen ? 1 : 0, transition: `opacity 0.9s ${EASE}` }} />
      <path d={line} fill="none" stroke={col} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 320, strokeDashoffset: seen ? 0 : 320, transition: `stroke-dashoffset 2.4s ${EASE}` }} />
      <circle cx={r2(last[0])} cy={r2(last[1])} r={2.6} fill={col}
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} 1.6s` }} />
    </svg>
  );
}

/* 2 · LOLLIPOP STEMS — Figma Variables (SLA Response style) */
function Stems({ data, seen, peak, pill }: { data: number[]; seen: boolean; peak: number; pill: string }) {
  const W = 200, H = 84, base = 70, thr = 14;
  const n = data.length;
  const max = Math.max(...data);
  const x = (i: number) => r2(12 + (i / (n - 1)) * (W - 24));
  const topY = (v: number) => r2(base - (v / max) * (base - thr - 6));
  return (
    <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} height={84}>
      {/* threshold line + pill */}
      <line x1={48} y1={thr} x2={W - 4} y2={thr} stroke="#6a6d74" strokeWidth="1" strokeDasharray="2 3"
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.9s` }} />
      <g style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} 0.9s` }}>
        <rect x={4} y={thr - 8} width={40} height={16} rx={8} fill="#eceef1" />
        <text x={24} y={thr + 3.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#0b0b0b" letterSpacing="0.5">{pill}</text>
      </g>
      {/* faint between-stems */}
      {data.slice(0, -1).map((_, i) => {
        const xm = (x(i) + x(i + 1)) / 2;
        return <line key={`m${i}`} x1={xm} y1={base} x2={xm} y2={base - 16} stroke={DIMMER} strokeWidth="1"
          style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} ${0.3 + i * 0.05}s` }} />;
      })}
      {/* main stems + dot caps */}
      {data.map((v, i) => {
        const acc = i === peak;
        return (
          <g key={i} style={{ transform: seen ? "scaleY(1)" : "scaleY(0)", transformOrigin: `${x(i)}px ${base}px`, transition: `transform 1.1s ${EASE} ${i * 0.07}s` }}>
            <line x1={x(i)} y1={base} x2={x(i)} y2={topY(v)} stroke={acc ? "var(--acc)" : "#dfe2e7"} strokeWidth="1.4" />
            <circle cx={x(i)} cy={topY(v)} r={acc ? 4 : 3.2} fill={acc ? "var(--acc)" : "#f0f2f5"} />
          </g>
        );
      })}
      {/* baseline bracket */}
      <path d={`M10,${base + 4} L10,${base + 8} L${W - 10},${base + 8} L${W - 10},${base + 4}`} fill="none" stroke="#3a3d43" strokeWidth="1"
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.5s` }} />
    </svg>
  );
}

/* 3 · STACKED SEGMENTS — Components */
function Stacked({ segs, seen, accentIdx }: { segs: number[]; seen: boolean; accentIdx?: number }) {
  const shade = ["#4a4d54", "#3c3f45", "#34373d", "#2c2f34", "#42454b"];
  return (
    <div className={s.stacked}>
      {segs.map((p, i) => (
        <span key={i}
          style={{ width: seen ? `${p}%` : "0%", background: i === accentIdx ? "var(--acc)" : shade[i % shade.length], transition: `width 1.3s ${EASE} ${i * 0.09}s` }} />
      ))}
    </div>
  );
}

/* 4 · VERTICAL BARS — Variants */
function VBars({ data, seen, accentIdx }: { data: number[]; seen: boolean; accentIdx?: number }) {
  return (
    <div className={s.bars}>
      {data.map((h, i) => (
        <div key={i} className={s.barCol}
          style={{ height: `${h}%`, background: i === accentIdx ? "var(--acc)" : undefined, transform: seen ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: `transform 1.2s ${EASE} ${i * 0.06}s` }} />
      ))}
    </div>
  );
}

/* 5 · TACHOMETER tick-dial — Accessibility (System Load style) */
function Tach({ pct, seen }: { pct: number; seen: boolean }) {
  const cx = 60, cy = 60, rIn = 34, rOut = 47, rMaj = 51, rLab = 58;
  const N = 41, span = 270, start = 135;
  const on = Math.round((pct / 100) * (N - 1));
  const labels = [0, 25, 50, 75, 100];
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 152, height: "auto", display: "block", margin: "0 auto", overflow: "visible" }}>
      {Array.from({ length: N }, (_, i) => {
        const deg = start + (i / (N - 1)) * span;
        const maj = i % 5 === 0;
        const [x1, y1] = pol(cx, cy, rIn, deg);
        const [x2, y2] = pol(cx, cy, maj ? rMaj : rOut, deg);
        const acc = i <= on;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={acc ? "var(--acc)" : DIM} strokeWidth={maj ? 1.8 : 1}
            style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} ${0.15 + i * 0.018}s` }} />
        );
      })}
      {labels.map((v) => {
        const [lx, ly] = pol(cx, cy, rLab, start + (v / 100) * span);
        return (
          <text key={v} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono)" fontSize="6.5" fill="#6b7079"
            style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} 0.6s` }}>{v}</text>
        );
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-inter)" fontWeight="500" fontSize="22" fill="#f2f3f5"
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.5s` }}>{pct.toFixed(1)}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1.5" fill="#7b8089"
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.7s` }}>PERCENT</text>
    </svg>
  );
}

/* 6 · NEEDLE SPEEDOMETER — Code Coverage (Token Usage style) */
function Speedo({ pct, seen }: { pct: number; seen: boolean }) {
  const cx = 66, cy = 64, R = 46;
  const arc = `M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy}`;
  const len = Math.PI * R;
  const N = 31;
  const angle = -90 + (pct / 100) * 180; // 0% → points left, 100% → points right
  return (
    <svg viewBox="0 0 132 84" style={{ width: "100%", maxWidth: 176, height: "auto", display: "block", margin: "0 auto 40px", overflow: "hidden" }}>
      {/* fine ticks */}
      {Array.from({ length: N }, (_, i) => {
        const deg = 180 - (i / (N - 1)) * 180;
        const maj = i % 5 === 0;
        const [x1, y1] = pol(cx, cy, R + 3, deg);
        const [x2, y2] = pol(cx, cy, R + (maj ? 9 : 6), deg);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={maj ? "#777a82" : "#3a3d43"} strokeWidth="1"
          style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} ${0.2 + i * 0.015}s` }} />;
      })}
      <path d={arc} fill="none" stroke="#1c1c1e" strokeWidth="6" />
      <path d={arc} fill="none" stroke="#e3e5ea" strokeWidth="6" strokeLinecap="round" strokeDasharray={len}
        style={{ strokeDashoffset: seen ? len * (1 - pct / 100) : len, transition: `stroke-dashoffset 2.1s ${EASE}` }} />
      {/* needle — SVG-native rotation around the hub (no CSS transform-origin ambiguity) */}
      <line x1={cx} y1={cy} x2={cx} y2={cy - R + 12} stroke="var(--acc)" strokeWidth="1.8" strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}>
        <animateTransform attributeName="transform" type="rotate" from={`-90 ${cx} ${cy}`} to={`${angle} ${cx} ${cy}`} dur="1.9s" begin="0.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
      </line>
      <circle cx={cx} cy={cy} r="3.6" fill="#e3e5ea" />
    </svg>
  );
}

/* 7 · TICKED progress — Documentation */
function TickBar({ pct, seen }: { pct: number; seen: boolean }) {
  const n = 18;
  const filled = Math.round((pct / 100) * n);
  return (
    <div className={s.tickbar}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={s.tick}
          style={{ background: seen && i < filled ? "#cfd3da" : "#1f2023", transition: `background 0.5s ${EASE} ${i * 0.045}s` }} />
      ))}
    </div>
  );
}

/* 8 · DONUT — Design Debt */
function Donut({ pct, seen }: { pct: number; seen: boolean }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  const slice = c * (pct / 100);
  return (
    <svg viewBox="0 0 64 64" width={110} height={110} style={{ display: "block", margin: "0 auto" }}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#26282c" strokeWidth="6" />
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--acc)" strokeWidth="6" strokeLinecap="round"
        transform="rotate(-90 32 32)" strokeDasharray={`${slice} ${c}`}
        style={{ strokeDashoffset: seen ? 0 : slice, opacity: seen ? 1 : 0, transition: `stroke-dashoffset 1.8s ${EASE}, opacity 0.6s ${EASE}` }} />
      <text x="32" y="32" textAnchor="middle" dominantBaseline="central"
        fontFamily="var(--font-inter)" fontWeight="500" fontSize="13" fill="#f2f3f5"
        style={{ opacity: seen ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.5s` }}>{pct}%</text>
    </svg>
  );
}

/* 9 · DRIFT LINE — Token Drift (small fluctuations, current = zero) */
function Baseline({ seen }: { seen: boolean }) {
  const W = 200, H = 44, base = H - 8, padL = 5, padR = 9;
  const vals = [0, 9, 4, 13, 6, 10, 3, 7, 2, 0]; // fluctuates, resolves to 0 now
  const maxV = Math.max(...vals);
  const dx = (W - padL - padR) / (vals.length - 1);
  const pts: [number, number][] = vals.map((v, i) => [padL + i * dx, base - (v / maxV) * (base - 6)]);
  const line = smooth(pts);
  const last = pts[pts.length - 1];
  return (
    <div style={{ position: "relative" }}>
      <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" height={44}>
        {/* zero baseline */}
        <line x1="0" y1={base} x2={W} y2={base} stroke={GRID} strokeWidth="1" strokeDasharray="2 3" />
        {/* fluctuating drift line */}
        <path d={line} fill="none" stroke="var(--acc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 300, strokeDashoffset: seen ? 0 : 300, transition: `stroke-dashoffset 2.2s ${EASE}` }} />
      </svg>
      {/* current point resting at zero — HTML overlay so it stays perfectly round */}
      <span
        style={{
          position: "absolute",
          left: `${((last[0] / W) * 100).toFixed(2)}%`,
          top: `${((last[1] / H) * 100).toFixed(2)}%`,
          width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
          borderRadius: "50%", background: "var(--acc)", pointerEvents: "none",
          opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} 1.5s`,
        }}
      />
    </div>
  );
}

/* 10 · CANDLES — Avg Sync Time */
function Candles({ data, seen }: { data: [number, number][]; seen: boolean }) {
  const W = 200, H = 56;
  const dx = W / data.length;
  return (
    <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" height={56}>
      {data.map(([hi, lo], i) => {
        const x = r2(i * dx + dx / 2);
        const yHi = r2(H - (hi / 100) * H);
        const yLo = r2(H - (lo / 100) * H);
        const acc = i === data.length - 1;
        return (
          <g key={i} style={{ transform: seen ? "scaleY(1)" : "scaleY(0)", transformOrigin: `center ${H}px`, transition: `transform 1.1s ${EASE} ${i * 0.08}s` }}>
            <line x1={x} y1={yHi} x2={x} y2={yLo} stroke={acc ? "var(--acc)" : LINE} strokeWidth="1" />
            <rect x={x - dx * 0.28} y={yHi} width={dx * 0.56} height={Math.max(2, yLo - yHi)} fill={acc ? "var(--acc)" : DIM} />
          </g>
        );
      })}
    </svg>
  );
}

/* 11 · SWATCH palette — Themes */
function Swatch({ tones, seen }: { tones: string[]; seen: boolean }) {
  return (
    <div className={s.swatch}>
      {tones.map((t, i) => (
        <span key={i} className={s.sw}
          style={{ background: t, opacity: seen ? 1 : 0, transform: seen ? "scale(1)" : "scale(0.5)", transition: `opacity 0.5s ${EASE} ${i * 0.05}s, transform 0.5s ${EASE} ${i * 0.05}s` }} />
      ))}
    </div>
  );
}

/* 12 · RADAR — Platforms */
function Radar({ values, labels, seen }: { values: number[]; labels?: string[]; seen: boolean }) {
  const cx = 70, cy = 54, R = 34;
  const n = values.length;
  const ang = (i: number) => (i / n) * Math.PI * 2 - Math.PI / 2;
  const ringPts = (k: number) =>
    Array.from({ length: n }, (_, i) => `${r2(cx + Math.cos(ang(i)) * R * k)},${r2(cy + Math.sin(ang(i)) * R * k)}`).join(" ");
  const dataPts = values.map((v, i) => `${r2(cx + Math.cos(ang(i)) * R * v)},${r2(cy + Math.sin(ang(i)) * R * v)}`).join(" ");
  return (
    <svg viewBox="0 0 140 112" style={{ width: "100%", maxWidth: 235, height: "auto", display: "block", margin: "0 auto", overflow: "visible" }}>
      {[0.4, 0.7, 1].map((k) => (
        <polygon key={k} points={ringPts(k)} fill="none" stroke={GRID} strokeWidth="1" />
      ))}
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={cx} y1={cy} x2={r2(cx + Math.cos(ang(i)) * R)} y2={r2(cy + Math.sin(ang(i)) * R)} stroke={GRID} strokeWidth="1" />
      ))}
      <polygon points={dataPts} fill="rgba(255,122,0,0.12)" stroke="var(--acc)" strokeWidth="1.6"
        style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px`, transform: seen ? "scale(1)" : "scale(0)", opacity: seen ? 1 : 0, transition: `transform 1.4s ${EASE}, opacity 0.9s ${EASE}` }} />
      {labels?.map((lab, i) => {
        const lx = r2(cx + Math.cos(ang(i)) * (R + 11));
        const ly = r2(cy + Math.sin(ang(i)) * (R + 11));
        return (
          <text key={lab} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono)" fontSize="6" letterSpacing="0.2" fill="#8a8f9a"
            style={{ opacity: seen ? 1 : 0, transition: `opacity 0.5s ${EASE} 0.8s` }}>{lab}</text>
        );
      })}
    </svg>
  );
}

type Viz =
  | { t: "growth"; data: number[]; accent?: boolean }
  | { t: "stems"; data: number[]; peak: number; pill: string }
  | { t: "stacked"; segs: number[]; accentIdx?: number }
  | { t: "vbars"; data: number[]; accentIdx?: number }
  | { t: "tach"; pct: number }
  | { t: "speedo"; pct: number }
  | { t: "tick"; pct: number }
  | { t: "donut"; pct: number }
  | { t: "baseline" }
  | { t: "candles"; data: [number, number][] }
  | { t: "swatch"; tones: string[] }
  | { t: "radar"; values: number[]; labels?: string[] };

type Card = {
  key: string; label: string; to: number; dec?: number; unit?: string; valueText?: string;
  sub?: string; status?: string; statusAcc?: boolean; viz: Viz; tip: string; centered?: boolean;
};

const TONE_ACCENTS = new Set([5, 12, 18, 23, 27]);
const TONE_GRAYS = ["#2c2f34", "#3a3d43", "#484b51", "#565960", "#646770", "#727680", "#888c95", "#a0a4ad"];
const TONES = Array.from({ length: 30 }, (_, i) =>
  TONE_ACCENTS.has(i) ? "var(--acc)" : TONE_GRAYS[(i * 3) % TONE_GRAYS.length]
);

const CARDS: Card[] = [
  { key: "gtm", label: "Time to Market", to: 4.2, dec: 1, unit: "d", status: "↓ 68%", statusAcc: true, sub: "DESIGN → PRODUCTION", viz: { t: "growth", data: [21, 18, 19, 15, 16, 13, 11, 12, 9, 7, 4.2], accent: true }, tip: "avg 4.2 days design → production · 68% faster than baseline" },
  { key: "figma", label: "Figma Variables", to: 842, status: "Live", statusAcc: true, viz: { t: "stems", data: [52, 34, 62, 48, 80, 44, 58, 38], peak: 4, pill: "LIVE" }, tip: "4 collections · 5 modes · 842 variables" },
  { key: "components", label: "Components", to: 246, sub: "PRODUCTION READY", viz: { t: "stacked", segs: [26, 18, 16, 14, 26], accentIdx: 0 }, tip: "Buttons · Inputs · Cards · Tables · Nav — 246 total" },
  { key: "variants", label: "Variants", to: 1962, sub: "TRACKED", viz: { t: "vbars", data: [40, 54, 47, 64, 58, 76, 70, 88], accentIdx: 7 }, tip: "1,962 variants across 246 components" },
  { key: "a11y", label: "Accessibility", to: 98.7, valueText: "AA", sub: "WCAG 2.2 CONFORMANCE", viz: { t: "tach", pct: 98.7 }, tip: "WCAG 2.2 AA · 98.7% coverage", centered: true },
  { key: "coverage", label: "Code Coverage", to: 99.2, dec: 1, unit: "%", sub: "GENERATED", viz: { t: "speedo", pct: 99.2 }, tip: "99.2% of generated code covered" },
  { key: "docs", label: "Documentation", to: 96, unit: "%", sub: "312 STORIES", viz: { t: "tick", pct: 96 }, tip: "312 stories · 96% documented" },
  { key: "debt", label: "Design Debt", to: 2, valueText: "492/500", sub: "ISSUES RESOLVED", status: "Low", statusAcc: true, viz: { t: "donut", pct: 1.6 }, tip: "8 open · 492 of 500 issues resolved (1.6% debt) · trending down", centered: true },
  { key: "drift", label: "Token Drift", to: 0, status: "0 Issues", statusAcc: true, viz: { t: "baseline" }, tip: "0 drift issues detected across platforms" },
  { key: "sync", label: "Avg Sync Time", to: 0.8, dec: 1, unit: "s", sub: "P95 1.4s", viz: { t: "candles", data: [[90, 55], [82, 48], [86, 50], [70, 40], [62, 34], [66, 36], [50, 26], [40, 18]] }, tip: "avg 0.8s · p95 1.4s · 0 timeouts" },
  { key: "themes", label: "Themes", to: 12, sub: "SYNCHRONIZED", viz: { t: "swatch", tones: TONES }, tip: "12 themes · Light / Dark / Brand A …" },
  { key: "platforms", label: "Platforms", to: 9, sub: "MULTI-TARGET", viz: { t: "radar", values: [0.95, 0.86, 0.8, 0.72, 0.64], labels: ["Web", "iOS", "Android", "Flutter", "CSS"] }, tip: "Web · iOS · Android · Flutter · CSS + 4" },
];

function VizEl({ viz, seen }: { viz: Viz; seen: boolean }) {
  switch (viz.t) {
    case "growth": return <GrowthLine data={viz.data} accent={viz.accent} seen={seen} />;
    case "stems": return <Stems data={viz.data} peak={viz.peak} pill={viz.pill} seen={seen} />;
    case "stacked": return <Stacked segs={viz.segs} accentIdx={viz.accentIdx} seen={seen} />;
    case "vbars": return <VBars data={viz.data} accentIdx={viz.accentIdx} seen={seen} />;
    case "tach": return <Tach pct={viz.pct} seen={seen} />;
    case "speedo": return <Speedo pct={viz.pct} seen={seen} />;
    case "tick": return <TickBar pct={viz.pct} seen={seen} />;
    case "donut": return <Donut pct={viz.pct} seen={seen} />;
    case "baseline": return <Baseline seen={seen} />;
    case "candles": return <Candles data={viz.data} seen={seen} />;
    case "swatch": return <Swatch tones={viz.tones} seen={seen} />;
    case "radar": return <Radar values={viz.values} labels={viz.labels} seen={seen} />;
  }
}

function CardEl({ c }: { c: Card }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div className={s.card} ref={ref}>
      <div className={s.tip}>{c.tip}</div>
      <div className={s.head}>
        <span className={s.label}>{c.label}</span>
        {c.status && <span className={`${s.status} ${c.statusAcc ? s.statusAcc : ""}`}>{c.status}</span>}
      </div>
      {c.valueText ? (
        <span className={s.value}>{c.valueText}</span>
      ) : (
        <Counter to={c.to} dec={c.dec} unit={c.unit} seen={seen} />
      )}
      {c.sub && <div className={s.sub}>{c.sub}</div>}
      <div className={`${s.viz} ${c.centered ? s.center : ""}`}>
        <VizEl viz={c.viz} seen={seen} />
      </div>
    </div>
  );
}

export default function StatsDashboard() {
  return (
    <div className={s.grid}>
      {CARDS.map((c) => (
        <CardEl key={c.key} c={c} />
      ))}
    </div>
  );
}
