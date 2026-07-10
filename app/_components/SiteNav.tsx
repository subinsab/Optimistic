"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/components", label: "Components" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Let's talk" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Optimistic home">
          <Logo />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.cta} href="/components">
            Get started
            <span className={styles.ctaArrow} aria-hidden="true">
              <PixelArrow />
            </span>
          </Link>
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobile}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

/* ↗ drawn as a 9-pixel dot-matrix glyph; on hover each pixel scatters
   along its own vector (--dx/--dy) and reassembles, staggered by --d */
const PX = [
  { c: 2, r: 0, dx: 2.5, dy: -3, d: 0 },
  { c: 3, r: 0, dx: -1.5, dy: -3.5, d: 0.06 },
  { c: 4, r: 0, dx: 3.5, dy: -2.5, d: 0.12 },
  { c: 4, r: 1, dx: 3, dy: 1.5, d: 0.18 },
  { c: 4, r: 2, dx: 3.5, dy: 3, d: 0.24 },
  { c: 3, r: 1, dx: -2, dy: 2, d: 0.3 },
  { c: 2, r: 2, dx: 2, dy: 2.5, d: 0.36 },
  { c: 1, r: 3, dx: -3, dy: 1.5, d: 0.42 },
  { c: 0, r: 4, dx: -3.5, dy: 3, d: 0.48 },
];
function PixelArrow() {
  return (
    <svg className={styles.pxArrow} width="13" height="13" viewBox="0 0 13.2 13.2" fill="currentColor">
      {PX.map((p, i) => (
        <rect
          key={i}
          x={p.c * 2.6 + 0.2}
          y={p.r * 2.6 + 0.2}
          width="2.2"
          height="2.2"
          style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--d": `${p.d}s` } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
