"use client";

import { useEffect, useRef } from "react";
import s from "./ShipField.module.css";

/**
 * Card 1 — "Assembly" as a falling-block builder that ships a dashboard.
 * Nine parts (sidebar, topbar, KPI cards, chart, donut, table, activity)
 * drop in one by one like puzzle pieces: each spawns at the top, drifts
 * toward its column and falls while its target slot pulses as a dashed
 * ghost. It lands with a snap and pixel dust, then its content boots up
 * (menu items, spark lines, chart series). A HUD shows the next piece and
 * the shipped count; hovering fast-drops the current piece, Tetris-style.
 * One piece per cycle lands warm: the single light in the monochrome flow.
 */

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

type Dust = { x: number; y: number; vx: number; vy: number; t: number };

export default function ShipField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const mouse = { on: false };

    /* dashboard parts, relative to a 140×96 wireframe (x, y, w, h) */
    const SLOTS_REL: [number, number, number, number][] = [
      [0, 0, 22, 96],    // 0 sidebar rail
      [26, 0, 114, 10],  // 1 topbar
      [26, 14, 35, 16],  // 2 kpi card
      [65, 14, 36, 16],  // 3 kpi card
      [105, 14, 35, 16], // 4 kpi card
      [26, 34, 75, 36],  // 5 main chart
      [105, 34, 35, 36], // 6 donut panel
      [26, 74, 75, 22],  // 7 data table
      [105, 74, 35, 22], // 8 activity list
    ];

    let bp = { x: 0, y: 0, w: 140, h: 96, s: 1 };
    let order: number[] = [];
    let cur = 0;
    let fill: number[] = SLOTS_REL.map(() => 0);
    let warmSlot = 2;
    let shipped = 0;
    let phase: "drop" | "snap" | "gap" | "hold" | "fade" = "gap";
    let phaseT = 0;
    let piece = { slot: 0, x: 0, y: 0 };
    let dust: Dust[] = [];

    const shuffle = () => {
      order = SLOTS_REL.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [order[i], order[j]] = [order[j], order[i]];
      }
    };

    const slotRect = (i: number) => {
      const [a, b, w, h] = SLOTS_REL[i];
      return { x: bp.x + a * bp.s, y: bp.y + b * bp.s, w: w * bp.s, h: h * bp.s };
    };

    const startPiece = () => {
      const slot = order[cur];
      const r = slotRect(slot);
      piece = { slot, x: bp.x + Math.random() * bp.w, y: -r.h - 6 };
      phase = "drop"; phaseT = 0;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sc = Math.min((W * 0.66) / 140, (H * 0.52) / 96);
      bp = { x: W / 2 - (140 * sc) / 2, y: H * 0.34, w: 140 * sc, h: 96 * sc, s: sc };
      fill = SLOTS_REL.map(() => 0);
      dust = [];
      shuffle();
      cur = 0;
      phase = "gap"; phaseT = 0.3;
      warmSlot = (Math.random() * SLOTS_REL.length) | 0;
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

    const pieceStyle = (warm: boolean, al = 1) => {
      ctx.fillStyle = warm ? `rgba(58,32,8,${(0.95 * al).toFixed(3)})` : `rgba(30,32,36,${(0.95 * al).toFixed(3)})`;
      ctx.strokeStyle = warm ? `rgba(255,122,0,${(0.95 * al).toFixed(3)})` : `rgba(228,232,240,${(0.5 * al).toFixed(3)})`;
      ctx.lineWidth = 1;
    };

    /* landed pieces boot up: each slot renders its dashboard content */
    const drawDetail = (i: number, r: { x: number; y: number; w: number; h: number }, warm: boolean, al: number) => {
      const ink = (a: number) => (warm ? `rgba(255,170,90,${(a * al).toFixed(3)})` : `rgba(228,232,240,${(a * al).toFixed(3)})`);
      ctx.lineWidth = 1;
      const p = Math.max(3, r.w * 0.08);
      if (i === 0) {
        // sidebar: logo dot + menu items
        ctx.fillStyle = ink(0.6);
        ctx.fillRect(r.x + p, r.y + p, 5, 5);
        ctx.strokeStyle = ink(0.28);
        for (let k = 0; k < 5; k++) {
          const y = r.y + p + 16 + k * (r.h * 0.11);
          ctx.beginPath(); ctx.moveTo(r.x + p, y); ctx.lineTo(r.x + r.w - p, y); ctx.stroke();
        }
      } else if (i === 1) {
        // topbar: title line + avatar dot
        ctx.strokeStyle = ink(0.4);
        ctx.beginPath(); ctx.moveTo(r.x + p, r.y + r.h / 2); ctx.lineTo(r.x + r.w * 0.24, r.y + r.h / 2); ctx.stroke();
        ctx.fillStyle = ink(0.5);
        ctx.beginPath(); ctx.arc(r.x + r.w - p - 3, r.y + r.h / 2, 2.6, 0, Math.PI * 2); ctx.fill();
      } else if (i >= 2 && i <= 4) {
        // kpi card: label + big number bar + delta tick
        ctx.strokeStyle = ink(0.26);
        ctx.beginPath(); ctx.moveTo(r.x + p, r.y + r.h * 0.3); ctx.lineTo(r.x + r.w * 0.55, r.y + r.h * 0.3); ctx.stroke();
        ctx.strokeStyle = ink(0.6);
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(r.x + p, r.y + r.h * 0.66); ctx.lineTo(r.x + r.w * 0.44, r.y + r.h * 0.66); ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = ink(0.45);
        const tx = r.x + r.w * 0.78, ty = r.y + r.h * 0.62;
        ctx.beginPath(); ctx.moveTo(tx, ty + 4); ctx.lineTo(tx + 5, ty - 2); ctx.lineTo(tx + 9, ty + 1); ctx.stroke();
      } else if (i === 5) {
        // main chart: baseline + line series
        ctx.strokeStyle = ink(0.2);
        ctx.beginPath(); ctx.moveTo(r.x + p, r.y + r.h - p); ctx.lineTo(r.x + r.w - p, r.y + r.h - p); ctx.stroke();
        ctx.strokeStyle = ink(0.55);
        ctx.beginPath();
        const pts = [0.82, 0.6, 0.68, 0.42, 0.5, 0.28, 0.34, 0.16];
        pts.forEach((f, k) => {
          const x = r.x + p + (k / (pts.length - 1)) * (r.w - p * 2);
          const y = r.y + p + f * (r.h - p * 2);
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
      } else if (i === 6) {
        // donut panel
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2, rad = Math.min(r.w, r.h) * 0.28;
        ctx.strokeStyle = ink(0.22);
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = ink(0.6);
        ctx.beginPath(); ctx.arc(cx, cy, rad, -Math.PI / 2, Math.PI * 0.6); ctx.stroke();
        ctx.lineWidth = 1;
      } else if (i === 7) {
        // table: header + rows
        ctx.strokeStyle = ink(0.4);
        ctx.beginPath(); ctx.moveTo(r.x + p, r.y + r.h * 0.24); ctx.lineTo(r.x + r.w - p, r.y + r.h * 0.24); ctx.stroke();
        ctx.strokeStyle = ink(0.22);
        for (let k = 1; k <= 2; k++) {
          const y = r.y + r.h * 0.24 + k * r.h * 0.26;
          ctx.beginPath(); ctx.moveTo(r.x + p, y); ctx.lineTo(r.x + r.w - p, y); ctx.stroke();
        }
      } else {
        // activity list: dotted rows
        for (let k = 0; k < 3; k++) {
          const y = r.y + r.h * 0.25 + k * r.h * 0.26;
          ctx.fillStyle = ink(0.5);
          ctx.fillRect(r.x + p, y - 1, 2, 2);
          ctx.strokeStyle = ink(0.24);
          ctx.beginPath(); ctx.moveTo(r.x + p + 6, y); ctx.lineTo(r.x + r.w - p, y); ctx.stroke();
        }
      }
    };

    const drawFrame = (t: number, dt: number) => {
      ctx.clearRect(0, 0, W, H);

      /* HUD: shipped counter + next piece preview */
      ctx.font = "8.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(160,165,175,0.65)";
      ctx.fillText(`SHIPPED ×${String(shipped).padStart(2, "0")}`, W - 10, 16);
      const nextIdx = phase === "drop" || phase === "snap" ? cur + 1 : cur;
      if (nextIdx < order.length && (phase === "drop" || phase === "snap" || phase === "gap")) {
        ctx.fillStyle = "rgba(140,145,155,0.45)";
        ctx.fillText("NEXT", W - 10, 30);
        const [, , nw, nh] = SLOTS_REL[order[nextIdx]];
        const pw = nw * bp.s * 0.28, ph = Math.max(3, nh * bp.s * 0.28);
        pieceStyle(order[nextIdx] === warmSlot, 0.8);
        rr(W - 10 - pw, 36, pw, ph, 1.5);
        ctx.fill(); ctx.stroke();
      }
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(140,145,155,0.5)";
      ctx.fillText("ASSEMBLY", 10, 16);
      if (mouse.on && phase === "drop") {
        ctx.fillStyle = "rgba(255,122,0,0.7)";
        ctx.fillText("▼ FAST DROP", 10, 30);
      }

      /* blueprint: dashed component outline */
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(220,224,232,0.28)";
      ctx.lineWidth = 1;
      rr(bp.x - 8 * bp.s, bp.y - 8 * bp.s, bp.w + 16 * bp.s, bp.h + 16 * bp.s, 6);
      ctx.stroke();

      /* empty slots: faint; the current target pulses as a ghost */
      for (let i = 0; i < SLOTS_REL.length; i++) {
        if (fill[i] > 0) continue;
        const r = slotRect(i);
        const isTarget = phase === "drop" && i === piece.slot;
        const pulse = isTarget ? 0.28 + 0.22 * Math.sin(t * 7) : 0.14;
        ctx.strokeStyle = i === warmSlot && isTarget
          ? `rgba(255,122,0,${pulse.toFixed(3)})`
          : `rgba(220,224,232,${pulse.toFixed(3)})`;
        rr(r.x, r.y, r.w, r.h, 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* landed pieces + their booted-up dashboard content */
      for (let i = 0; i < SLOTS_REL.length; i++) {
        if (fill[i] <= 0) continue;
        const r = slotRect(i);
        const fade = phase === "fade" ? Math.max(0, 1 - phaseT * 1.6 - i * 0.12) : 1;
        pieceStyle(i === warmSlot, fade);
        rr(r.x, r.y, r.w, r.h, 2);
        ctx.fill(); ctx.stroke();
        drawDetail(i, r, i === warmSlot, fade);
      }

      /* the falling piece */
      if (phase === "drop") {
        const r = slotRect(piece.slot);
        const speed = Math.max(64, H * 0.24) * (mouse.on ? 3 : 1);
        piece.y += speed * dt;
        piece.x += (r.x - piece.x) * Math.min(1, dt * 6);
        // falling guide: a hairline from the piece down to its ghost
        ctx.strokeStyle = "rgba(220,224,232,0.08)";
        ctx.beginPath();
        ctx.moveTo(r.x + r.w / 2, piece.y + r.h);
        ctx.lineTo(r.x + r.w / 2, r.y);
        ctx.stroke();
        // motion trail
        pieceStyle(piece.slot === warmSlot, 0.16);
        rr(piece.x, piece.y - r.h * 0.9, r.w, r.h, 2);
        ctx.fill();
        pieceStyle(piece.slot === warmSlot);
        rr(piece.x, piece.y, r.w, r.h, 2);
        ctx.fill(); ctx.stroke();
        if (piece.y >= r.y) {
          piece.y = r.y;
          phase = "snap"; phaseT = 0;
          for (let k = 0; k < 6; k++) {
            dust.push({
              x: r.x + Math.random() * r.w,
              y: r.y + r.h,
              vx: (Math.random() - 0.5) * 46,
              vy: -(8 + Math.random() * 22),
              t: 0,
            });
          }
        }
      } else if (phase === "snap") {
        phaseT += dt;
        const k = Math.min(1, phaseT / 0.24);
        const r = slotRect(piece.slot);
        const over = Math.sin(k * Math.PI) * 1.6; // tiny overshoot
        pieceStyle(piece.slot === warmSlot);
        rr(r.x, r.y + over, r.w, r.h, 2);
        ctx.fill(); ctx.stroke();
        // landing flash
        ctx.strokeStyle = `rgba(255,255,255,${(0.4 * (1 - k)).toFixed(3)})`;
        rr(r.x - 2, r.y - 2, r.w + 4, r.h + 4, 3);
        ctx.stroke();
        if (k >= 1) {
          fill[piece.slot] = 1;
          cur++;
          phase = cur >= order.length ? "hold" : "gap";
          phaseT = 0;
          if (phase === "hold") shipped++;
        }
      } else if (phase === "gap") {
        phaseT -= dt;
        if (phaseT <= 0) startPiece();
      } else if (phase === "hold") {
        phaseT += dt;
        const g = Math.sin(Math.min(1, phaseT / 0.5) * Math.PI);
        ctx.strokeStyle = `rgba(255,255,255,${(0.14 + 0.3 * g).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        rr(bp.x - 8 * bp.s, bp.y - 8 * bp.s, bp.w + 16 * bp.s, bp.h + 16 * bp.s, 6);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(220,224,232,${(0.4 + 0.3 * g).toFixed(3)})`;
        ctx.fillText("DASHBOARD SHIPPED", bp.x + bp.w / 2, bp.y + bp.h + 22 * bp.s);
        ctx.textAlign = "left";
        if (phaseT > 1.6) { phase = "fade"; phaseT = 0; }
      } else if (phase === "fade") {
        phaseT += dt;
        if (phaseT > 1.2) {
          fill = SLOTS_REL.map(() => 0);
          shuffle();
          cur = 0;
          warmSlot = (Math.random() * SLOTS_REL.length) | 0;
          phase = "gap"; phaseT = 0.4;
        }
      }

      /* pixel dust */
      dust = dust.filter((d) => d.t < 1);
      for (const d of dust) {
        d.t += dt * 2.6;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.vy += 90 * dt;
        ctx.fillStyle = `rgba(215,219,228,${(0.5 * (1 - d.t)).toFixed(3)})`;
        ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
      }
    };

    let visible = true;
    let last = performance.now();
    const step = () => {
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(step);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      drawFrame(now * 0.001, dt);
    };

    resize();
    if (reduce) {
      // static tableau: component fully built, one shipped on the counter
      fill = SLOTS_REL.map(() => 1);
      shipped = 1;
      phase = "hold"; phaseT = 0.25;
      drawFrame(0, 0);
    } else {
      raf = requestAnimationFrame(step);
    }

    const onEnter = () => { mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) { fill = SLOTS_REL.map(() => 1); shipped = 1; phase = "hold"; phaseT = 0.25; drawFrame(0, 0); }
    });
    ro.observe(canvas);
    const vis = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(step); } },
      { rootMargin: "350px" }
    );
    vis.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={s.canvas} aria-hidden="true" />;
}
