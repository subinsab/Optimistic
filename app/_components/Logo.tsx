type LogoProps = {
  /** height of the mark in px */
  size?: number;
  /** show the "Optimistic" wordmark next to the mark */
  withWordmark?: boolean;
};

/**
 * Optimistic brand mark — a rising arc over a horizon: first light.
 * The mark uses the brand gradient; the wordmark inherits text color.
 */
export default function Logo({ size = 28, withWordmark = true }: LogoProps) {
  const gid = "opt-logo-grad";
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
      aria-label="Optimistic"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="2" y1="30" x2="30" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB020" />
            <stop offset="0.5" stopColor="#FF6B6B" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {/* horizon */}
        <rect x="3" y="23" width="26" height="2.6" rx="1.3" fill={`url(#${gid})`} opacity="0.35" />
        {/* rising sun arc */}
        <path
          d="M5 23a11 11 0 0 1 22 0"
          stroke={`url(#${gid})`}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* spark */}
        <circle cx="16" cy="12" r="3.2" fill={`url(#${gid})`} />
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
