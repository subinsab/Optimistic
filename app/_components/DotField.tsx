"use client";

import { useEffect, useRef } from "react";
import s from "./DotField.module.css";

/**
 * §C illustration stage — a static dot grid with a soft halo ring
 * around the specimen. No animation; it simply redraws on resize.
 */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const PITCH = 20;

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const W = r.width, H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.32;
      const ring = Math.min(W, H) * 0.44;
      for (let gx = PITCH / 2; gx < W; gx += PITCH) {
        for (let gy = PITCH / 2; gy < H; gy += PITCH) {
          const d = Math.hypot(gx - cx, gy - cy);
          let a = 0.024 + 0.065 * Math.exp(-(((d - ring) / 36) ** 2));
          if (d < ring * 0.32) a = 0.014;
          ctx.fillStyle = `rgba(235,238,245,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} className={s.canvas} aria-hidden="true" />;
}
