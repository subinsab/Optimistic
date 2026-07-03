"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** words the grid spells out, in order (loops) */
  words?: string[];
  /** grid cell size in CSS px */
  cell?: number;
};

const BUCKETS = 16;

/** color ramp for a heat value 0..1 (on a black background) */
function ramp(h: number): [number, number, number, number] {
  // default faint glyph -> steel blue -> royal blue -> white
  if (h <= 0.001) return [120, 134, 158, 0.16];
  if (h < 0.45) {
    const t = h / 0.45;
    return [
      120 + (111 - 120) * t,
      134 + (138 - 134) * t,
      158 + (201 - 158) * t,
      0.16 + (0.7 - 0.16) * t,
    ];
  }
  if (h < 0.82) {
    const t = (h - 0.45) / 0.37;
    return [
      111 + (47 - 111) * t,
      138 + (85 - 138) * t,
      201 + (255 - 201) * t,
      0.7 + (1 - 0.7) * t,
    ];
  }
  const t = (h - 0.82) / 0.18;
  return [
    47 + (255 - 47) * t,
    85 + (255 - 85) * t,
    255 + (255 - 255) * t,
    1,
  ];
}

export default function PixelGrid({
  words = ["IDEA", "DESIGN", "BUILD", "SHIP", "OPTIMISTIC"],
  cell = 20,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cnv = ref.current;
    if (!cnv) return;
    const canvas: HTMLCanvasElement = cnv;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cols = 0, rows = 0;
    let mouseHeat = new Float32Array(0);
    let storyHeat = new Float32Array(0);
    let masks: Uint8Array[] = [];
    let sprites: HTMLCanvasElement[] = [];

    // mouse position in cell coords
    let mx = -999, my = -999;

    function buildSprites() {
      sprites = [];
      const px = Math.round(cell * dpr);
      const pad = px * 0.3;
      for (let b = 0; b < BUCKETS; b++) {
        const s = document.createElement("canvas");
        s.width = px;
        s.height = px;
        const sc = s.getContext("2d")!;
        const [r, g, bl, a] = ramp(b / (BUCKETS - 1));
        sc.strokeStyle = `rgba(${r | 0},${g | 0},${bl | 0},${a})`;
        sc.lineWidth = Math.max(1, px * 0.07);
        sc.lineCap = "round";
        sc.beginPath();
        sc.moveTo(pad, pad);
        sc.lineTo(px - pad, px - pad);
        sc.moveTo(px - pad, pad);
        sc.lineTo(pad, px - pad);
        sc.stroke();
        sprites.push(s);
      }
    }

    function buildMasks() {
      masks = [];
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const oc = off.getContext("2d")!;
      for (const word of words) {
        oc.clearRect(0, 0, cols, rows);
        // fit font to ~78% width / 60% height
        let fontPx = rows * 0.6;
        oc.textAlign = "center";
        oc.textBaseline = "middle";
        oc.fillStyle = "#fff";
        const fit = () => {
          oc.font = `900 ${fontPx}px Inter, system-ui, sans-serif`;
          return oc.measureText(word).width;
        };
        while (fit() > cols * 0.82 && fontPx > 4) fontPx -= 0.5;
        oc.clearRect(0, 0, cols, rows);
        oc.font = `900 ${fontPx}px Inter, system-ui, sans-serif`;
        oc.fillText(word, cols / 2, rows / 2 + rows * 0.02);
        const data = oc.getImageData(0, 0, cols, rows).data;
        const m = new Uint8Array(cols * rows);
        for (let i = 0; i < cols * rows; i++) m[i] = data[i * 4 + 3] > 90 ? 1 : 0;
        masks.push(m);
      }
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      mouseHeat = new Float32Array(cols * rows);
      storyHeat = new Float32Array(cols * rows);
      buildSprites();
      buildMasks();
    }

    // story state machine
    let wordIndex = 0;
    let phaseStart = performance.now();
    // ms: fade-in, hold, fade-out
    const IN = 1100, HOLD = 1500, OUT = 1100;

    function draw(now: number) {
      const elapsed = now - phaseStart;
      const total = IN + HOLD + OUT;
      // target intensity for this word's masked cells
      let target = 0;
      if (elapsed < IN) target = elapsed / IN;
      else if (elapsed < IN + HOLD) target = 1;
      else if (elapsed < total) target = 1 - (elapsed - IN - HOLD) / OUT;
      else {
        wordIndex = (wordIndex + 1) % words.length;
        phaseStart = now;
        target = 0;
      }

      const mask = masks[wordIndex];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const radius = 3.2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          // story heat eases toward word target
          const st = mask && mask[i] ? target : 0;
          storyHeat[i] += (st - storyHeat[i]) * 0.12;

          // mouse heat: add near cursor, then decays
          if (finePointer && mx > -900) {
            const dx = x - mx, dy = y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < radius * radius) {
              const add = (1 - Math.sqrt(d2) / radius) * 0.5;
              if (add > mouseHeat[i]) mouseHeat[i] = Math.min(1, add);
            }
          }
          mouseHeat[i] *= 0.9;

          const h = Math.min(1, storyHeat[i] * 0.92 + mouseHeat[i]);
          const b = h <= 0.001 ? 0 : Math.min(BUCKETS - 1, Math.round(h * (BUCKETS - 1)));
          ctx.drawImage(sprites[b], x * cell, y * cell, cell, cell);
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function drawStatic() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const mask = masks[0];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const h = mask && mask[i] ? 0.7 : 0;
          const b = h <= 0.001 ? 0 : Math.round(h * (BUCKETS - 1));
          ctx.drawImage(sprites[b], x * cell, y * cell, cell, cell);
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) / cell;
      my = (e.clientY - rect.top) / cell;
    };
    const onLeave = () => { mx = -999; my = -999; };

    let raf = 0;
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawStatic();
    });

    resize();
    if (reduce) {
      drawStatic();
    } else {
      if (finePointer) {
        window.addEventListener("mousemove", onMove, { passive: true });
        parent.addEventListener("mouseleave", onLeave);
      }
      raf = requestAnimationFrame(draw);
    }
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [words, cell]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, display: "block" }}
    />
  );
}
