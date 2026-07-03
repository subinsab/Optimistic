"use client";

import { useEffect, useRef } from "react";
import s from "./ShipField.module.css";

/**
 * Card 1 — a living field of monochrome UI primitives.
 * Shapes drift, attract into clusters, dissolve, pulse and rotate; nearby
 * nodes connect with fading lines; the cursor is a magnetic field that the
 * shapes gently avoid. Spring-damped, endless, never identical.
 */
type Kind = "sq" | "sqf" | "ci" | "cif" | "tri" | "trif" | "dot";

export default function ShipField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kinds: Kind[] = ["sq", "sqf", "ci", "cif", "tri", "trif", "dot", "dot", "dot"];
    let W = 0,
      H = 0,
      raf = 0;
    const mouse = { x: -9999, y: -9999, on: false };

    interface N {
      x: number; y: number; vx: number; vy: number;
      k: Kind; sz: number; rot: number; vr: number; ph: number; g: number;
    }
    let nodes: N[] = [];

    const make = (): N => {
      const k = kinds[(Math.random() * kinds.length) | 0];
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        k,
        sz: k === "dot" ? 1.2 + Math.random() * 1.3 : 5 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.005,
        ph: Math.random() * Math.PI * 2,
        g: 0.16 + Math.random() * 0.5,
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, Math.max(60, (W * H) / 3600)));
      nodes = Array.from({ length: count }, make);
    };

    const tri = (x: number, y: number, r: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = rot + (i * Math.PI * 2) / 3 - Math.PI / 2;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
    };

    const ATT = 74, REP = 22, CONN = 64, TWO = Math.PI * 2;

    let visible = true;
    const step = () => {
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(step);
      ctx.clearRect(0, 0, W, H);
      const n = nodes.length;

      // pairwise: clustering forces + connection lines
      for (let i = 0; i < n; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > ATT * ATT) continue;
          const d = Math.sqrt(d2) || 1;
          const ux = dx / d, uy = dy / d;
          const f = d > REP ? 0.0009 * (1 - d / ATT) : -0.0045 * (1 - d / REP);
          a.vx += ux * f; a.vy += uy * f;
          b.vx -= ux * f; b.vy -= uy * f;
          if (d < CONN) {
            const al = (1 - d / CONN) * 0.16;
            ctx.strokeStyle = `rgba(200,205,215,${al.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      const t = performance.now() * 0.001;
      for (let i = 0; i < n; i++) {
        const p = nodes[i];
        // organic drift
        p.vx += Math.cos(t * 0.3 + p.ph) * 0.0024;
        p.vy += Math.sin(t * 0.27 + p.ph * 1.3) * 0.0024;
        // magnetic cursor — gently avoid
        if (mouse.on) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / R;
            const ff = f * f * 1.5;
            p.vx += (dx / d) * ff;
            p.vy += (dy / d) * ff;
          }
        }
        // spring damping + speed clamp
        p.vx *= 0.9; p.vy *= 0.9;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.9) { p.vx = (p.vx / sp) * 0.9; p.vy = (p.vy / sp) * 0.9; }
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        // wrap (endless)
        const m = 16;
        if (p.x < -m) p.x = W + m; else if (p.x > W + m) p.x = -m;
        if (p.y < -m) p.y = H + m; else if (p.y > H + m) p.y = -m;

        const pulse = 0.85 + 0.15 * Math.sin(t * 1.4 + p.ph);
        const g = Math.min(1, p.g * pulse);
        const col = `rgba(225,228,235,${g.toFixed(3)})`;
        ctx.strokeStyle = col;
        ctx.fillStyle = col;
        ctx.lineWidth = 1;
        const z = p.sz * (p.k === "dot" ? 1 : pulse);
        switch (p.k) {
          case "dot": ctx.beginPath(); ctx.arc(p.x, p.y, z, 0, TWO); ctx.fill(); break;
          case "ci": ctx.beginPath(); ctx.arc(p.x, p.y, z, 0, TWO); ctx.stroke(); break;
          case "cif": ctx.beginPath(); ctx.arc(p.x, p.y, z, 0, TWO); ctx.fill(); break;
          case "sq": ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.strokeRect(-z, -z, z * 2, z * 2); ctx.restore(); break;
          case "sqf": ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-z, -z, z * 2, z * 2); ctx.restore(); break;
          case "tri": tri(p.x, p.y, z * 1.25, p.rot); ctx.stroke(); break;
          case "trif": tri(p.x, p.y, z * 1.25, p.rot); ctx.fill(); break;
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
    const onLeave = () => { mouse.on = false; mouse.x = -9999; mouse.y = -9999; };
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
