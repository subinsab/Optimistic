"use client";

import { useEffect, useRef } from "react";

/**
 * Word-by-word grey→white reveal driven by scroll position (Vercel-style).
 * Words brighten left-to-right as the element scrolls up through the viewport.
 *
 * Kept cheap on scroll: the work is skipped entirely while the element is
 * outside the viewport (the endpoints are settled once), and inside it only
 * the words whose colour actually changed are repainted, so a scroll frame
 * touches a handful of spans instead of every word.
 */
export default function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const GREY = 96, WHITE = 255, SPREAD = 6;
    const n = spans.length;
    const last = new Int16Array(n).fill(-1); // last painted value per word
    let raf = 0;

    const paint = (i: number, v: number) => {
      if (last[i] === v) return; // skip redundant repaints
      spans[i].style.color = `rgb(${v},${v},${v})`;
      last[i] = v;
    };
    const settle = (v: number) => { for (let i = 0; i < n; i++) paint(i, v); };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // outside the reveal band: settle the endpoint once, then do no work
      if (r.top > vh) { settle(GREY); return; }
      if (r.bottom < 0) { settle(WHITE); return; }
      const start = vh * 0.85, end = vh * 0.32; // reveal band
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      for (let i = 0; i < n; i++) {
        const local = Math.min(1, Math.max(0, (p * (n + SPREAD) - i) / SPREAD));
        paint(i, Math.round(GREY + local * (WHITE - GREY)));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w style={{ color: "rgb(96,96,96)" }}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
