"use client";

import { useEffect, useRef, useState } from "react";
import s from "./WorkflowTimeline.module.css";

/**
 * Card 2 — an execution timeline (waterfall). Bars fill left→right on an
 * endless loop with cascading starts and random delays; finished bars glow.
 * Hover accelerates and lifts a bar; click expands its detail.
 */
const BARS = [
  { label: "workflow()", ms: 420 },
  { label: "gen()", ms: 252 },
  { label: "eval()", ms: 168 },
  { label: "pub()", ms: 168 },
];
const LEFT = [0, 0, 30, 44]; // indent (% of wrap)
const WIDTH = [100, 62, 46, 46]; // bar length (% of wrap)
const START = [0, 520, 980, 1360]; // clock ms
const DUR = BARS.map((b) => b.ms * 2);
const TOTAL = Math.max(...START.map((v, i) => v + DUR[i])) + 900;

export default function WorkflowTimeline() {
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const fills = useRef<(HTMLDivElement | null)[]>([]);
  const inds = useRef<(HTMLDivElement | null)[]>([]);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const speed = useRef(1);

  useEffect(() => {
    speed.current = hover != null ? 2.6 : 1;
  }, [hover]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fills.current.forEach((f) => f && (f.style.width = "100%"));
      return;
    }
    let clock = 0,
      last = performance.now(),
      raf = 0,
      delay = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      let dt = now - last;
      last = now;
      if (dt > 60) dt = 60;
      clock += dt * speed.current;
      if (clock > TOTAL + delay) {
        clock = 0;
        delay = Math.random() * 500;
      }
      for (let i = 0; i < BARS.length; i++) {
        const p = Math.min(1, Math.max(0, (clock - delay - START[i]) / DUR[i]));
        const fl = fills.current[i];
        if (fl) fl.style.width = (p * 100).toFixed(2) + "%";
        const ind = inds.current[i];
        if (ind) {
          ind.style.left = (p * 100).toFixed(2) + "%";
          ind.style.opacity = p > 0 && p < 1 ? "1" : "0";
        }
        const row = rows.current[i];
        if (row) row.classList.toggle(s.done, p >= 1);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={s.wrap}>
      {BARS.map((b, i) => (
        <div
          key={b.label}
          ref={(el) => {
            rows.current[i] = el;
          }}
          className={`${s.row} ${hover === i ? s.hot : ""} ${open === i ? s.open : ""}`}
          style={{ marginLeft: `${LEFT[i]}%`, width: `${WIDTH[i]}%` }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div
            ref={(el) => {
              fills.current[i] = el;
            }}
            className={s.fill}
          />
          <span className={s.label}>{b.label}</span>
          <span className={s.ms}>{b.ms}ms</span>
          <div
            ref={(el) => {
              inds.current[i] = el;
            }}
            className={s.ind}
          />
          <span className={s.detail}>completed · {b.ms}ms · 1 retry</span>
        </div>
      ))}
    </div>
  );
}
