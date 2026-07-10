import s from "./Logo.module.css";

type LogoProps = {
  /** height of the mark in px */
  size?: number;
  /** show the "Optimistic" wordmark next to the mark */
  withWordmark?: boolean;
};

/**
 * Optimistic brand mark — a bare thick-ring pixel O (9-grid Bresenham
 * circle, two pixels deep), no chip. Monochrome except one warm pixel
 * at 45°: one light, pointing up and to the right. Sized 24px by
 * default to match the nav CTA's arrow chip.
 * Geometry is computed once at module scope; all coords rounded to
 * 2dp (raw floats serialize differently SSR vs client → hydration).
 */
const N = 9, C = 4, R_IN = 2.5, R_OUT = 4.55;
const ACCENT_I = 6, ACCENT_J = 2; // the one warm pixel
const PAD = 4, PITCH = (56 - PAD * 2) / N, DRAW = PITCH * 0.84;
const r2 = (v: number) => Math.round(v * 100) / 100;

type Cell = { x: number; y: number; warm: boolean; dx: number; dy: number; d: number };
const CELLS: Cell[] = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const dist = Math.hypot(i - C, j - C);
    if (dist < R_IN || dist > R_OUT) continue;
    const ang = Math.atan2(j - C, i - C); // scatter radially outward
    CELLS.push({
      x: r2(PAD + (i + 0.5) * PITCH - DRAW / 2),
      y: r2(PAD + (j + 0.5) * PITCH - DRAW / 2),
      warm: i === ACCENT_I && j === ACCENT_J,
      dx: r2(Math.cos(ang) * 5),
      dy: r2(Math.sin(ang) * 5),
      d: r2(((i * 7 + j * 13) % 10) * 0.045),
    });
  }
}
const D = r2(DRAW);

export default function Logo({ size = 24, withWordmark = true }: LogoProps) {
  return (
    <span className={s.mark} aria-label="Optimistic">
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        overflow="visible"
        role="img"
        aria-hidden="true"
      >
        {CELLS.map((c, k) => (
          <rect
            key={k}
            className={s.px}
            x={c.x}
            y={c.y}
            width={D}
            height={D}
            fill={c.warm ? "#ff7a00" : "#f4f4f5"}
            style={{ "--dx": `${c.dx}px`, "--dy": `${c.dy}px`, "--d": `${c.d}s` } as React.CSSProperties}
          />
        ))}
      </svg>
      {withWordmark && (
        <span
          style={{
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
          }}
        >
          Optimistic
        </span>
      )}
    </span>
  );
}
