"use client";

import { useState } from "react";
import v from "./visuals.module.css";

const Heart = ({ fill }: { fill: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

type Log = { t: string; text: string; c?: "g" | "a" | "r" };

/* Feel the difference between rendering the result first (optimistic) and
   waiting for the server (pessimistic). */
export function OptimisticDemo() {
  const [mode, setMode] = useState<"optimistic" | "pessimistic">("optimistic");
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<Log[]>([]);
  const push = (l: Log) => setLog((xs) => [...xs.slice(-5), l]);

  const rtt = () => 380 + Math.floor(Math.random() * 320);

  const click = () => {
    if (busy) return;
    const next = !liked;
    const delay = rtt();
    if (mode === "optimistic") {
      setLiked(next); setCount((c) => c + (next ? 1 : -1)); // render first, at 0ms
      push({ t: "0ms", text: `render ${next ? "liked" : "unliked"}`, c: "a" });
      setBusy(true);
      window.setTimeout(() => { push({ t: `${delay}ms`, text: "server confirmed, nothing to reconcile", c: "g" }); setBusy(false); }, delay);
    } else {
      setBusy(true);
      push({ t: "0ms", text: "waiting for server...", c: undefined });
      window.setTimeout(() => { setLiked(next); setCount((c) => c + (next ? 1 : -1)); push({ t: `${delay}ms`, text: `server ok, now render`, c: "g" }); setBusy(false); }, delay);
    }
  };

  return (
    <div className={v.bviz}>
      <div className={v.ctrls}>
        <div className={v.seg}>
          <button className={v.segBtn} data-on={mode === "optimistic"} onClick={() => setMode("optimistic")}>Optimistic</button>
          <button className={v.segBtn} data-on={mode === "pessimistic"} onClick={() => setMode("pessimistic")}>Pessimistic</button>
        </div>
        <span className={v.hint}>{mode === "optimistic" ? "Renders instantly, reconciles after." : "Blocks until the server answers."}</span>
      </div>
      <div className={v.opt}>
        <div className={v.optStage}>
          <span className={v.optLabel}>Tap the heart</span>
          {busy && mode === "pessimistic" ? (
            <div className={v.optSpin} aria-label="waiting" />
          ) : (
            <button className={v.optHeart} data-liked={liked} onClick={click} aria-pressed={liked} aria-label="Like"><Heart fill={liked} /></button>
          )}
          <span className={v.optCount}>{count.toLocaleString()}</span>
        </div>
        <div className={v.optLog} aria-live="polite">
          {log.length === 0 && <div className={v.row}><span className={v.t} /> <span style={{ color: "var(--ink3)" }}>Interaction timeline appears here.</span></div>}
          {log.map((l, i) => (
            <div key={i} className={v.row}><span className={v.t}>{l.t}</span> <span className={l.c ? v[l.c] : undefined}>{l.text}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Drift accumulates when surfaces hardcode their own value; a semantic token
   keeps every surface in lockstep. */
const NAMES = ["Card", "Modal", "Header", "Sidebar"];
const nudge = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const d = (Math.floor(Math.random() * 7) - 3);
  const v2 = Math.max(0, Math.min(0xffffff, n + d * 0x010101 + d * 0x000100));
  return "#" + v2.toString(16).padStart(6, "0");
};

export function DriftDemo() {
  const [semantic, setSemantic] = useState(false);
  const [token, setToken] = useState("#2b2d31");
  const [vals, setVals] = useState(["#2b2d31", "#2b2d31", "#2b2d31", "#2b2d31"]);

  const shown = semantic ? vals.map(() => token) : vals;
  const distinct = new Set(shown).size;

  const tweak = () => {
    if (semantic) setToken((t) => nudge(t));
    else setVals((xs) => { const i = Math.floor(Math.random() * xs.length); const c = [...xs]; c[i] = nudge(c[i]); return c; });
  };
  const reset = () => { setToken("#2b2d31"); setVals(["#2b2d31", "#2b2d31", "#2b2d31", "#2b2d31"]); };

  return (
    <div className={v.bviz}>
      <div className={v.ctrls}>
        <div className={v.seg}>
          <button className={v.segBtn} data-on={!semantic} onClick={() => setSemantic(false)}>Hardcoded values</button>
          <button className={v.segBtn} data-on={semantic} onClick={() => setSemantic(true)}>Semantic token</button>
        </div>
        <button className={v.btn} onClick={tweak}>Ship a tweak</button>
        <button className={v.btn} onClick={reset}>Reset</button>
      </div>
      <div className={v.drift}>
        <div className={v.driftRow}>
          {shown.map((c, i) => (
            <div key={i} className={v.swatch}>
              <div className={v.swatchFill} style={{ background: c }} />
              <div className={v.swatchMeta}>{NAMES[i]}<br />{semantic ? "--surface" : c}</div>
            </div>
          ))}
        </div>
        <div className={v.driftVerdict}>
          {distinct === 1
            ? <span className={v.isClean}><b>1 value</b> across every surface. No drift: change the token once and all four move together.</span>
            : <span className={v.isDrift}><b>{distinct} different grays</b> for the same surface. That is drift, and nobody remembers which one is canonical.</span>}
        </div>
      </div>
    </div>
  );
}

/* One logic core, many skins. The behaviour never changes; only the surface. */
const SKINS = [
  { id: "optimistic", label: "Optimistic" },
  { id: "corporate", label: "Corporate" },
  { id: "playful", label: "Playful" },
] as const;

export function HeadlessDiagram() {
  const [skin, setSkin] = useState<typeof SKINS[number]["id"]>("optimistic");
  return (
    <div className={v.bviz}>
      <div className={v.headless}>
        <div className={v.core}>
          <div className={v.coreTag}>Headless logic core</div>
          <div className={v.coreItem}>state: idle · hover · pressed · loading</div>
          <div className={v.coreItem}>keyboard + focus + ARIA role</div>
          <div className={v.coreItem}>onPress, disabled, async pending</div>
          <div className={v.coreItem}>zero opinions about colour or shape</div>
        </div>
        <div>
          <div className={v.skinPreview}>
            <button className={`${v.dbtn} ${v[`dbtn--${skin}`]}`} type="button" tabIndex={-1}>Add to cart</button>
          </div>
          <div className={v.skinBtns}>
            {SKINS.map((sk) => (
              <button key={sk.id} className={v.segBtn} data-on={skin === sk.id} onClick={() => setSkin(sk.id)} style={{ background: skin === sk.id ? "var(--chip)" : "transparent", border: "1px solid var(--line)" }}>{sk.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
