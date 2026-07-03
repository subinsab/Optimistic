"use client";

import { useEffect, useRef } from "react";
import s from "./DotWordmark.module.css";

/**
 * Section K — abstract dot art spelling "Create Optimism".
 * The phrase is rasterized into a particle grid; dots assemble into the words,
 * breathe gently on a flow field, and scatter then spring back under the cursor.
 * Monochrome, calm, premium.
 */
const LINES = ["Create", "Optimism"];

export default function DotWordmark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const mouse = { x: -9999, y: -9999, on: false };

    interface P { x: number; y: number; tx: number; ty: number; vx: number; vy: number; ph: number; b: number; }
    let parts: P[] = [];

    const buildTargets = (): [number, number][] => {
      const o = document.createElement("canvas");
      o.width = Math.max(1, Math.floor(W));
      o.height = Math.max(1, Math.floor(H));
      const oc = o.getContext("2d");
      if (!oc) return [];
      oc.fillStyle = "#fff";
      oc.textAlign = "center";
      oc.textBaseline = "middle";
      let fs = Math.floor(Math.min(H * 0.4, W * 0.26));
      const font = (px: number) => `700 ${px}px Inter, system-ui, sans-serif`;
      oc.font = font(fs);
      const widest = Math.max(...LINES.map((l) => oc.measureText(l).width));
      const maxW = W * 0.88;
      if (widest > maxW) { fs = Math.floor((fs * maxW) / widest); oc.font = font(fs); }
      const lh = fs * 1.0;
      const cy = H / 2;
      LINES.forEach((l, i) => oc.fillText(l, W / 2, cy + (i - (LINES.length - 1) / 2) * lh));

      const data = oc.getImageData(0, 0, o.width, o.height).data;
      const step = Math.max(4, Math.round(fs / 24));
      const pts: [number, number][] = [];
      for (let y = 0; y < o.height; y += step) {
        for (let x = 0; x < o.width; x += step) {
          if (data[(y * o.width + x) * 4 + 3] > 128) {
            pts.push([x + (Math.random() - 0.5) * step * 0.5, y + (Math.random() - 0.5) * step * 0.5]);
          }
        }
      }
      return pts;
    };

    const rebuild = () => {
      let pts = buildTargets();
      const MAX = 6500;
      if (pts.length > MAX) {
        const every = pts.length / MAX;
        const nt: [number, number][] = [];
        for (let i = 0; i < pts.length; i += every) nt.push(pts[Math.floor(i)]);
        pts = nt;
      }
      parts = pts.map(([tx, ty]) => ({
        x: reduce ? tx : Math.random() * W,
        y: reduce ? ty : Math.random() * H,
        tx, ty, vx: 0, vy: 0,
        ph: Math.random() * Math.PI * 2,
        b: 0.5 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    };

    const draw = () => {
      const t = performance.now() * 0.001;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        let fx = (p.tx - p.x) * 0.06;
        let fy = (p.ty - p.y) * 0.06;
        fx += Math.cos(t * 0.6 + p.ph) * 0.05;
        fy += Math.sin(t * 0.5 + p.ph) * 0.05;
        if (mouse.on) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 90;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / R;
            fx += (dx / d) * f * 4;
            fy += (dy / d) * f * 4;
          }
        }
        p.vx = (p.vx + fx) * 0.82;
        p.vy = (p.vy + fy) * 0.82;
        p.x += p.vx;
        p.y += p.vy;
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.5 + p.ph);
        ctx.fillStyle = `rgba(235,238,245,${(p.b * pulse * 0.7).toFixed(3)})`;
        ctx.fillRect(p.x, p.y, 1.7, 1.7);
      }
    };

    let visible = true;
    const step = () => { if (!visible) { raf = 0; return; } raf = requestAnimationFrame(step); draw(); };

    resize();
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => { mouse.on = false; mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let rt = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = window.setTimeout(resize, 150);
    });
    ro.observe(canvas);
    // pause the loop when off-screen to keep scrolling FPS seamless
    const vis = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduce) raf = requestAnimationFrame(step); },
      { rootMargin: "150px" }
    );
    vis.observe(canvas);

    if (reduce) { draw(); }
    else raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ro.disconnect();
      vis.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={s.canvas} aria-label="Create Optimism" role="img" />;
}
