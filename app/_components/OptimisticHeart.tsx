"use client";

import { useEffect, useRef, useState } from "react";
import s from "./OptimisticHeart.module.css";

/*
   §B — a strip of three living chips above the headline.
   HEARTS is a real like button, quietly running the pattern the section
   describes: instant render, proof reconciled after. DEVELOPERS and
   CONTRIBUTORS are passive counters on the same credible clock.
   All counts are seeded at launch day and accrue toward their 10-year
   targets, so they are never round and grow a little every day.
*/

const HEART_CELLS: [number, number][] = [
  [1, 0], [2, 0], [4, 0], [5, 0],
  [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
  [2, 4], [3, 4], [4, 4],
  [3, 5],
];
/* >_ terminal prompt — developers */
const DEV_CELLS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [1, 4], [0, 5],
  [4, 5], [5, 5], [6, 5],
];
/* merge graph (two branches joining) — contributors */
const CON_CELLS: [number, number][] = [
  [1, 0], [5, 0],
  [1, 1], [5, 1],
  [2, 2], [4, 2],
  [3, 3], [3, 4], [3, 5],
];

const r2 = (n: number) => Math.round(n * 100) / 100;

/* per-pixel scatter vectors (radial from glyph center) + ripple delays —
   same hover language as the logo O and the CTA pixel arrow */
function scatterize(cells: [number, number][]) {
  const xs = cells.map(([c]) => c * 8 + 3);
  const ys = cells.map(([, r]) => r * 8 + 3);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return cells.map(([c, r]) => {
    const x = c * 8, y = r * 8;
    const dist = Math.hypot(x + 3 - cx, y + 3 - cy) || 1;
    return { x, y, dx: r2((x + 3 - cx) * 0.28), dy: r2((y + 3 - cy) * 0.28), d: r2(dist * 5) };
  });
}
const HEART_PIX = scatterize(HEART_CELLS);
const DEV_PIX = scatterize(DEV_CELLS);
const CON_PIX = scatterize(CON_CELLS);

/* credible trajectories: seeded at launch, reaching the target in 10 years */
const EPOCH = Date.UTC(2026, 6, 5); // launch day
const TEN_Y = 10 * 365.25 * 24 * 60 * 60 * 1000;
const trajectory = (seed: number, target: number) => (now: number) =>
  seed + Math.max(0, Math.floor((now - EPOCH) * ((target - seed) / TEN_Y)));
const heartsAt = trajectory(1_286, 100_000); // ≈ 27/day
const devsAt = trajectory(214, 25_000); // ≈ 7/day
const contribsAt = trajectory(18, 1_200); // ≈ 1 every 3 days
const HEART_RATE_PER_MS = (100_000 - 1_286) / TEN_Y;

function PixGlyph({ pix }: { pix: { x: number; y: number; dx: number; dy: number; d: number }[] }) {
  return (
    <svg className={s.glyph} viewBox="0 0 54 46" aria-hidden="true">
      {pix.map((p) => (
        <rect
          key={`${p.x}-${p.y}`}
          x={p.x} y={p.y} width={6} height={6} rx={1.5} fill="currentColor"
          style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, animationDelay: `${p.d}ms` } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export default function OptimisticHeart({ hint }: { hint?: string }) {
  const [now, setNow] = useState(() => Date.now());
  const [ticks, setTicks] = useState(0);
  const [liked, setLiked] = useState(false);
  const [status, setStatus] = useState<"sync" | "ok" | null>(null);
  const [rtt, setRtt] = useState(0);
  const [touched, setTouched] = useState(false);
  const timers = useRef<number[]>([]);

  // background accrual: re-derive from the clock + rare Poisson arrivals
  useEffect(() => {
    const refresh = window.setInterval(() => setNow(Date.now()), 60_000);
    let poisson = 0;
    const schedule = () => {
      const delay = -Math.log(1 - Math.random()) / HEART_RATE_PER_MS; // mean ≈ 53 min
      poisson = window.setTimeout(() => { setTicks((t) => t + 1); schedule(); }, delay);
    };
    schedule();
    return () => { clearInterval(refresh); clearTimeout(poisson); };
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const toggle = () => {
    const next = !liked;
    setTouched(true);
    setLiked(next); // instant — the optimistic part
    setStatus("sync");
    const ms = 120 + Math.floor(Math.random() * 160); // plausible RTT
    setRtt(ms);
    timers.current.push(
      window.setTimeout(() => setStatus("ok"), ms),
      window.setTimeout(() => setStatus(null), ms + 2600)
    );
  };

  const hearts = heartsAt(now) + ticks + (liked ? 1 : 0);

  return (
    <div className={s.wrap}>
      <button
        type="button"
        className={`${s.chip} ${liked ? s.liked : ""}`}
        onClick={toggle}
        aria-pressed={liked}
        aria-label="Like"
      >
        <PixGlyph pix={HEART_PIX} />
        <span className={s.count} suppressHydrationWarning>{hearts.toLocaleString("en-US")}</span>
        <span className={s.chipLabel}>HEARTS</span>
      </button>
      <div className={`${s.chip} ${s.stat}`}>
        <PixGlyph pix={DEV_PIX} />
        <span className={s.count} suppressHydrationWarning>{devsAt(now).toLocaleString("en-US")}</span>
        <span className={s.chipLabel}>DEVELOPERS</span>
      </div>
      <div className={`${s.chip} ${s.stat}`}>
        <PixGlyph pix={CON_PIX} />
        <span className={s.count} suppressHydrationWarning>{contribsAt(now).toLocaleString("en-US")}</span>
        <span className={s.chipLabel}>CONTRIBUTORS</span>
      </div>
      <span className={s.status} aria-hidden="true">
        {status === null && !touched && hint && (
          <span className={s.statusHint}>{hint}</span>
        )}
        {status === "sync" && (
          <span className={s.statusSync}>{liked ? "POST" : "DELETE"} /v1/hearts · optimistic</span>
        )}
        {status === "ok" && <span className={s.statusOk}>● reconciled · {rtt}ms</span>}
      </span>
    </div>
  );
}
