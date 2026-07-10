/* Plain data module (NO "use client") shared by the Icon demos and the
   server-rendered IconDoc. The Optimistic icon library IS Lucide (lucide.dev),
   an open ISC-licensed set of ~2,000 line icons — 24×24, currentColor, round
   caps and joins, which is exactly the Optimistic line spec. Icons are single
   colour: no per-icon accent. The full set is browsable in the demo; these
   FEATURED names back the curated spots (tiles, sizes, configurator, examples). */

export const FEATURED: string[] = [
  "sparkles", "bell", "search", "heart", "chart-column", "layout-grid",
  "terminal", "refresh-cw", "plus", "arrow-right", "check", "code",
];

/* six size steps, matching the token table */
export const SIZE_PX: Record<string, number> = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32, "2xl": 40 };

/* stroke width per weight — the 24 box is fixed, only the line thickens.
   Lucide's default is 2, so Regular = 2. */
export const WEIGHT_STROKE: Record<string, number> = { Light: 1.5, Regular: 2, Bold: 2.5 };
