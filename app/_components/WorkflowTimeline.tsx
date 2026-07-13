"use client";

import { useEffect, useRef, useState } from "react";
import s from "./WorkflowTimeline.module.css";

/**
 * Card 2 — an execution timeline (waterfall). Bars fill left→right on an
 * endless loop with cascading starts and random delays; finished bars glow.
 * Hover accelerates and lifts a bar.
 */
const BARS = [
  { label: "variables()", ms: 420 },
  { label: "tokens()", ms: 252 },
  { label: "codegen()", ms: 168 },
  { label: "publish()", ms: 168 },
];
const LEFT = [0, 0, 30, 44]; // indent (% of wrap)
const WIDTH = [100, 62, 46, 46]; // bar length (% of wrap)
const START = [0, 520, 980, 1360]; // clock ms
const DUR = BARS.map((b) => b.ms * 2);
const TOTAL = Math.max(...START.map((v, i) => v + DUR[i])) + 900;

export default function WorkflowTimeline() {
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLDivElement | null)[]>([]);
  const inds = useRef<(HTMLDivElement | null)[]>([]);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const speed = useRef(1);

  useEffect(() => {
    speed.current = hover != null ? 2.6 : 1;
  }, [hover]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      fills.current.forEach((f) => f && (f.style.width = "100%"));
      rows.current.forEach((r) => r && r.classList.add(s.done));
    };
    if (reduce) {
      finish();
      return;
    }
    // plays ONCE, starting when the card first scrolls into view,
    // then freezes in the completed state
    let clock = 0,
      last = 0,
      raf = 0;
    const frame = () => {
      const now = performance.now();
      let dt = now - last;
      last = now;
      if (dt > 60) dt = 60;
      clock += dt * speed.current;
      const t = Math.min(clock, TOTAL);
      for (let i = 0; i < BARS.length; i++) {
        const p = Math.min(1, Math.max(0, (t - START[i]) / DUR[i]));
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
      if (clock < TOTAL) raf = requestAnimationFrame(frame);
    };
    const el = wrapRef.current;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
          io.disconnect();
        }
      },
      // start the draw well before the section scrolls into view, so it is
      // already settled by the time you reach it instead of animating in late
      { rootMargin: "300px 0px 300px 0px" }
    );
    if (el) io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div className={s.wrap} ref={wrapRef}>
      {BARS.map((b, i) => (
        <div
          key={b.label}
          ref={(el) => {
            rows.current[i] = el;
          }}
          className={`${s.row} ${hover === i ? s.hot : ""}`}
          style={{ marginLeft: `${LEFT[i]}%`, width: `${WIDTH[i]}%` }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
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
        </div>
      ))}
    </div>
  );
}
