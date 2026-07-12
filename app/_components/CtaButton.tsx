import Link from "next/link";
import s from "./CtaButton.module.css";

/*
   Shared page CTA · same anatomy as the nav's "Get started" button:
   a light chip holding a dark 24px launchpad with the 9-pixel ↗ glyph.
   On hover the pixels scatter along their own vectors and reassemble,
   and the launchpad pops to the warm accent.
*/

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

function Arrow() {
  return (
    <span className={s.ctaArrow} aria-hidden="true">
      <svg className={s.pxArrow} width="13" height="13" viewBox="0 0 13.2 13.2" fill="currentColor">
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
    </span>
  );
}

/* renders a Link when given an href, a real button otherwise (e.g. submit) */
export default function CtaButton({
  href,
  type,
  external,
  children,
}: {
  href?: string;
  type?: "submit" | "button";
  external?: boolean;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link className={s.cta} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        <Arrow />
      </Link>
    );
  }
  return (
    <button className={s.cta} type={type ?? "button"}>
      {children}
      <Arrow />
    </button>
  );
}
