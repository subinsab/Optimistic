"use client";

import { useEffect } from "react";

/**
 * Drives background parallax via CSS variables on <html>:
 *  --sy  : scroll position (px)
 *  --mx  : mouse offset from center, -1..1 (x)
 *  --my  : mouse offset from center, -1..1 (y)
 * Both are rAF-throttled; the pointer value is eased for a smooth follow.
 */
export default function ScrollPattern() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    // scroll
    const updateScroll = () => {
      root.style.setProperty("--sy", String(window.scrollY));
    };
    const onScroll = () => {
      if (!rafScroll) rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        updateScroll();
      });
    };
    let rafScroll = 0;

    // pointer (eased follow)
    let tx = 0, ty = 0; // target -1..1
    let cx = 0, cy = 0; // current
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--mx", cx.toFixed(4));
      root.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      window.addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (rafScroll) cancelAnimationFrame(rafScroll);
    };
  }, []);

  return null;
}
