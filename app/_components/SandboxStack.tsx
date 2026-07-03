"use client";

import { useEffect, useRef } from "react";
import s from "./SandboxStack.module.css";

/**
 * Card 3 — an infinite stack of floating minimal windows cascading with
 * perspective depth. The active (centre) window is brightest; the deck
 * breathes and slowly shuffles; the cursor spreads nearby windows apart.
 */
export default function SandboxStack() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 58;
    let W = 0, H = 0, raf = 0;
    const mouse = { x: 0, y: 0, on: false };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const TWO = Math.PI * 2;

    let visible = true;
    const step = () => {
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(step);
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.001;
      const cw = Math.min(168, W * 0.32);
      const ch = cw * 0.6;
      const active = N / 2 + Math.sin(t * 0.22) * N * 0.16;
      const breathe = 1 + Math.sin(t * 0.5) * 0.05;
      const stepX = 10.5 * breathe;
      const stepY = 7.5 * breathe;
      const cx = W * 0.54 - cw / 2;
      const cy = H * 0.5 - ch / 2;

      // draw farthest first so the active window lands on top
      const order = Array.from({ length: N }, (_, i) => i).sort(
        (a, b) => Math.abs(b - active) - Math.abs(a - active)
      );

      for (const i of order) {
        const dz = Math.abs(i - active);
        let x = cx + (i - active) * stepX;
        let y = cy + (i - active) * stepY;
        if (mouse.on) {
          const dx = x - mouse.x, dy = y - mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          const R = 160;
          if (d < R) {
            const f = 1 - d / R;
            const ff = f * f * 26;
            x += (dx / d) * ff;
            y += (dy / d) * ff;
          }
        }
        const isA = dz < 0.6;
        const op = isA ? 0.9 : Math.max(0.035, 0.5 - dz * 0.032);
        ctx.lineWidth = 1;
        ctx.fillStyle = `rgba(13,13,14,${Math.min(1, op * 1.7).toFixed(3)})`;
        ctx.strokeStyle = `rgba(206,210,219,${op.toFixed(3)})`;
        rr(x, y, cw, ch, 10);
        ctx.fill();
        ctx.stroke();
        // header divider + traffic dots
        ctx.strokeStyle = `rgba(206,210,219,${(op * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(x + cw, y + 15);
        ctx.stroke();
        ctx.fillStyle = `rgba(206,210,219,${(op * 0.8).toFixed(3)})`;
        for (let k = 0; k < 3; k++) {
          ctx.beginPath();
          ctx.arc(x + 11 + k * 8, y + 8, 1.6, 0, TWO);
          ctx.fill();
        }
        if (isA) {
          // code glyph  [ : : ]
          const gx = x + cw / 2, gy = y + (ch + 15) / 2 + 4, r = 9;
          ctx.strokeStyle = "rgba(228,231,238,0.9)";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(gx - r, gy - r * 0.75);
          ctx.lineTo(gx - r - 4, gy - r * 0.75);
          ctx.lineTo(gx - r - 4, gy + r * 0.75);
          ctx.lineTo(gx - r, gy + r * 0.75);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(gx + r, gy - r * 0.75);
          ctx.lineTo(gx + r + 4, gy - r * 0.75);
          ctx.lineTo(gx + r + 4, gy + r * 0.75);
          ctx.lineTo(gx + r, gy + r * 0.75);
          ctx.stroke();
          ctx.fillStyle = "rgba(228,231,238,0.9)";
          ctx.beginPath(); ctx.arc(gx - 3, gy, 1.7, 0, TWO); ctx.fill();
          ctx.beginPath(); ctx.arc(gx + 3, gy, 1.7, 0, TWO); ctx.fill();
        }
      }
    };

    resize();
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => { mouse.on = false; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    // pause the loop when off-screen to keep scrolling FPS seamless
    const vis = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduce) raf = requestAnimationFrame(step); },
      { rootMargin: "150px" }
    );
    vis.observe(canvas);

    if (reduce) { step(); cancelAnimationFrame(raf); }
    else raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={s.canvas} aria-hidden="true" />;
}
