"use client";

import { useEffect, useRef } from "react";
import s from "./ParticleCloud.module.css";

/**
 * Section H — left panel "intelligence cloud".
 * Thousands of monochrome particles drift on a flow field and continuously
 * assemble/dissolve between structured patterns (grid · columns · ring) and
 * a free cloud. The cursor attracts and brightens nearby particles.
 * Soft additive bloom; calm, premium motion. No color.
 */
export default function ParticleCloud() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, N = 0;
    const mouse = { x: -9999, y: -9999, on: false };

    let px = new Float32Array(0), py = new Float32Array(0);
    let vx = new Float32Array(0), vy = new Float32Array(0), br = new Float32Array(0);
    let shapes: Float32Array[] = [];
    let cur = 0, next = 1;
    let lastSwitch = performance.now();
    const HOLD = 3200, MORPH = 2400;
    const smooth = (t: number) => t * t * (3 - 2 * t);

    const buildShapes = () => {
      const cloud = new Float32Array(N * 2);
      const grid = new Float32Array(N * 2);
      const cols = new Float32Array(N * 2);
      const ring = new Float32Array(N * 2);
      const cxp = W * 0.5, cyp = H * 0.5;
      const gx = Math.max(2, Math.round(Math.sqrt((N * W) / H)));
      const gy = Math.max(2, Math.ceil(N / gx));
      const nc = 7, per = Math.ceil(N / nc);
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.6) * Math.min(W, H) * 0.42;
        cloud[i * 2] = cxp + Math.cos(a) * r * 1.1;
        cloud[i * 2 + 1] = cyp + Math.sin(a) * r;

        const col = i % gx, row = Math.floor(i / gx);
        grid[i * 2] = W * 0.16 + (col / (gx - 1)) * W * 0.68;
        grid[i * 2 + 1] = H * 0.16 + (row / Math.max(1, gy - 1)) * H * 0.68;

        const c = i % nc, within = Math.floor(i / nc);
        cols[i * 2] = W * 0.2 + (c / (nc - 1)) * W * 0.6;
        cols[i * 2 + 1] = H * 0.18 + (within / per) * H * 0.64;

        const ang = (i / N) * Math.PI * 2;
        const rr = Math.min(W, H) * 0.34 * (1 + (Math.random() - 0.5) * 0.06);
        ring[i * 2] = cxp + Math.cos(ang) * rr * 1.15;
        ring[i * 2 + 1] = cyp + Math.sin(ang) * rr;
      }
      shapes = [cloud, grid, cols, ring];
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = Math.round(Math.min(2600, Math.max(700, (W * H) / 430)));
      px = new Float32Array(N); py = new Float32Array(N);
      vx = new Float32Array(N); vy = new Float32Array(N); br = new Float32Array(N);
      buildShapes();
      for (let i = 0; i < N; i++) {
        px[i] = shapes[0][i * 2];
        py[i] = shapes[0][i * 2 + 1];
        br[i] = 0.3 + Math.random() * 0.5;
      }
    };

    let visible = true;
    const step = () => {
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(step);
      const now = performance.now();
      const t = now * 0.001;
      const elapsed = now - lastSwitch;
      let m = 0;
      if (elapsed < HOLD) m = 0;
      else if (elapsed < HOLD + MORPH) m = smooth((elapsed - HOLD) / MORPH);
      else { cur = next; next = (next + 1) % shapes.length; lastSwitch = now; m = 0; }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const A = shapes[cur], B = shapes[next];
      for (let i = 0; i < N; i++) {
        const i2 = i * 2;
        const tx = A[i2] + (B[i2] - A[i2]) * m;
        const ty = A[i2 + 1] + (B[i2 + 1] - A[i2 + 1]) * m;
        let fx = (tx - px[i]) * 0.04;
        let fy = (ty - py[i]) * 0.04;
        fx += Math.cos(py[i] * 0.01 + t * 0.6 + i * 0.001) * 0.06;
        fy += Math.sin(px[i] * 0.01 + t * 0.5) * 0.06;
        let mb = 0;
        if (mouse.on) {
          const dx = mouse.x - px[i], dy = mouse.y - py[i];
          const d2 = dx * dx + dy * dy;
          const R = 120;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / R;
            fx += (dx / d) * f * 0.5;
            fy += (dy / d) * f * 0.5;
            mb = f * 0.7;
          }
        }
        vx[i] = (vx[i] + fx) * 0.86;
        vy[i] = (vy[i] + fy) * 0.86;
        px[i] += vx[i];
        py[i] += vy[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + i * 0.05);
        const b = Math.min(1, br[i] * (0.5 + 0.5 * pulse) + mb);
        const size = b > 0.8 ? 2 : 1.3;
        ctx.fillStyle = `rgba(235,238,245,${(b * 0.5).toFixed(3)})`;
        ctx.fillRect(px[i], py[i], size, size);
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
      { rootMargin: "350px" }
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
