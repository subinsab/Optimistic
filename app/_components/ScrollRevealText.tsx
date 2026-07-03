"use client";

import { useEffect, useRef } from "react";

/**
 * Word-by-word grey→white reveal driven by scroll position (Vercel-style).
 * Words brighten left-to-right as the element scrolls up through the viewport.
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
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.85, end = vh * 0.32; // reveal band
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const n = spans.length;
      for (let i = 0; i < n; i++) {
        const local = Math.min(1, Math.max(0, (p * (n + SPREAD) - i) / SPREAD));
        const v = Math.round(GREY + local * (WHITE - GREY));
        spans[i].style.color = `rgb(${v},${v},${v})`;
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
