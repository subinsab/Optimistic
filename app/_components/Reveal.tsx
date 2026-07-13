"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** stagger delay in ms */
  delay?: number;
  as?: React.ElementType;
  className?: string;
};

/** Wraps content and fades/slides it in when scrolled into view. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag_ = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = Tag_;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No observer support: just show it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    let io: IntersectionObserver | null = null;
    let safety: ReturnType<typeof setTimeout> | null = null;
    // Defer measurement one frame so it runs AFTER a client-side route change has
    // settled its scroll position. Measuring synchronously on mount reads a stale
    // position during navigation, which left sections armed-but-never-revealed.
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true); // any part already in the viewport: show now, no flash
        return;
      }
      // Off-screen: arm the hidden start, then reveal when it scrolls into view.
      setArmed(true);
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io?.disconnect();
            if (safety) clearTimeout(safety);
          }
        },
        // threshold 0 fires the instant the top edge enters view. The positive
        // bottom margin reveals a block slightly BEFORE it scrolls into view, so
        // content is already settling in as you reach it instead of popping in
        // late. A ratio-based threshold never triggers for very tall sections.
        { threshold: 0, rootMargin: "0px 0px 15% 0px" }
      );
      io.observe(el);
      // Backstop only for genuinely broken observers; short so nothing lingers.
      safety = setTimeout(() => setVisible(true), 800);
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      if (safety) clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      suppressHydrationWarning
      className={`reveal ${armed ? "reveal-armed" : ""} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
