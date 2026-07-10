import React from "react";

/* Generic Optimistic illustrations — SINGLE-COLOUR line art for empty, error
   and success states. Every scene is drawn on one 200×160 box, stroked with
   currentColor (fill none), round caps and joins — the same line language as
   the icons, scaled up. One colour: no accent, so a scene reads on any surface.
   Pure module (no "use client") so client demos + the server doc can import it. */

const cloud =
  "M70 104 H126 A17 17 0 0 0 129 71 A20 20 0 0 0 93 64 A15 15 0 0 0 69 86 A14 14 0 0 0 70 104 Z";

/* radial gear teeth as short strokes */
function teeth(cx: number, cy: number, r: number, n: number, len: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const c = Math.cos(a), s = Math.sin(a);
    const x1 = Math.round((cx + c * r) * 10) / 10, y1 = Math.round((cy + s * r) * 10) / 10;
    const x2 = Math.round((cx + c * (r + len)) * 10) / 10, y2 = Math.round((cy + s * (r + len)) * 10) / 10;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
}

export const SCENES: Record<string, React.ReactNode> = {
  /* 404 — a compass, lost the way */
  "not-found": (<>
    <circle cx={100} cy={80} r={42} />
    <line x1={100} y1={44} x2={100} y2={50} /><line x1={100} y1={110} x2={100} y2={116} />
    <line x1={64} y1={80} x2={70} y2={80} /><line x1={130} y1={80} x2={136} y2={80} />
    <path d="M100 58 L110 80 L100 102 L90 80 Z" /><circle cx={100} cy={80} r={2.5} />
  </>),
  /* no results — magnifier finding nothing */
  "no-results": (<>
    <circle cx={90} cy={72} r={30} /><line x1={112} y1={94} x2={136} y2={118} strokeWidth={3} />
    <line x1={80} y1={62} x2={100} y2={82} /><line x1={100} y1={62} x2={80} y2={82} />
  </>),
  /* empty — an open inbox tray */
  empty: (<>
    <path d="M52 100 H74 L86 116 H114 L126 100 H148 V132 H52 Z" />
    <path d="M74 100 L86 72 H114 L126 100" />
  </>),
  /* error — triangle alert */
  error: (<>
    <path d="M100 40 L150 126 H50 Z" />
    <line x1={100} y1={70} x2={100} y2={98} /><circle cx={100} cy={112} r={2.6} />
  </>),
  /* success — check in a ring */
  success: (<>
    <circle cx={100} cy={80} r={40} />
    <polyline points="82,82 95,96 120,64" />
  </>),
  /* offline — cloud with a slash */
  offline: (<>
    <path d={cloud} /><line x1={62} y1={58} x2={140} y2={116} />
  </>),
  /* no messages — an empty speech bubble */
  "no-messages": (<>
    <path d="M56 54 H144 A10 10 0 0 1 154 64 V98 A10 10 0 0 1 144 108 H96 L78 126 V108 H56 A10 10 0 0 1 46 98 V64 A10 10 0 0 1 56 54 Z" />
    <circle cx={80} cy={81} r={2.4} /><circle cx={100} cy={81} r={2.4} /><circle cx={120} cy={81} r={2.4} />
  </>),
  /* no notifications — bell, silenced */
  "no-notifications": (<>
    <path d="M80 104 V84 A20 20 0 0 1 120 84 V104 L128 114 H72 Z" />
    <path d="M92 114 A9 9 0 0 0 108 114" /><line x1={70} y1={58} x2={132} y2={122} />
  </>),
  /* no files — an empty folder */
  "no-files": (<>
    <path d="M50 68 H84 L94 80 H150 V124 H50 Z" />
    <line x1={72} y1={100} x2={128} y2={100} strokeDasharray="4 5" />
  </>),
  /* no data — an empty bar chart */
  "no-data": (<>
    <polyline points="56,48 56,122 152,122" />
    <rect x={70} y={92} width={16} height={30} rx={2} strokeDasharray="4 5" />
    <rect x={96} y={78} width={16} height={44} rx={2} strokeDasharray="4 5" />
    <rect x={122} y={100} width={16} height={22} rx={2} strokeDasharray="4 5" />
  </>),
  /* no images — a picture, absent */
  "no-images": (<>
    <rect x={54} y={50} width={92} height={72} rx={7} />
    <circle cx={126} cy={70} r={7} />
    <polyline points="60,116 84,88 102,106 118,92 140,116" />
    <line x1={54} y1={50} x2={146} y2={122} />
  </>),
  /* upload — cloud with an up arrow */
  upload: (<>
    <path d={cloud} />
    <line x1={100} y1={112} x2={100} y2={74} /><polyline points="88,86 100,74 112,86" />
  </>),
  /* no access — a closed padlock */
  "no-access": (<>
    <path d="M84 80 V66 A16 16 0 0 1 116 66 V80" />
    <rect x={72} y={80} width={56} height={44} rx={8} />
    <circle cx={100} cy={98} r={4} /><line x1={100} y1={102} x2={100} y2={112} />
  </>),
  /* maintenance — two gears */
  maintenance: (<>
    <circle cx={88} cy={80} r={20} />{teeth(88, 80, 20, 8, 6)}<circle cx={88} cy={80} r={7} />
    <circle cx={128} cy={108} r={12} />{teeth(128, 108, 12, 7, 5)}<circle cx={128} cy={108} r={4} />
  </>),
  /* coming soon — an hourglass */
  "coming-soon": (<>
    <line x1={74} y1={48} x2={126} y2={48} /><line x1={74} y1={120} x2={126} y2={120} />
    <path d="M78 48 L104 84 L78 120" /><path d="M126 48 L104 84 L126 120" />
    <line x1={104} y1={84} x2={104} y2={106} />
  </>),
  /* no connection — wifi, cut */
  "no-connection": (<>
    <path d="M70 86 A42 42 0 0 1 130 86" /><path d="M80 96 A28 28 0 0 1 120 96" />
    <path d="M90 106 A15 15 0 0 1 110 106" /><circle cx={100} cy={114} r={2.4} />
    <line x1={66} y1={122} x2={134} y2={58} />
  </>),
  /* empty cart */
  "cart-empty": (<>
    <polyline points="48,58 62,58 74,104 130,104 142,72 72,72" />
    <circle cx={82} cy={118} r={6} /><circle cx={124} cy={118} r={6} />
  </>),
  /* welcome — a sparkle burst */
  welcome: (<>
    <path d="M100 42 C100 64 88 76 66 76 C88 76 100 88 100 110 C100 88 112 76 134 76 C112 76 100 64 100 42 Z" />
    <path d="M150 56 C150 62 147 65 141 65 C147 65 150 68 150 74 C150 68 153 65 159 65 C153 65 150 62 150 56 Z" />
    <path d="M56 104 C56 110 53 113 47 113 C53 113 56 116 56 122 C56 116 59 113 65 113 C59 113 56 110 56 104 Z" />
  </>),
  /* complete — a flag planted */
  complete: (<>
    <path d="M50 126 Q100 108 150 126" />
    <line x1={98} y1={122} x2={98} y2={54} />
    <path d="M98 56 L134 66 L98 84 Z" />
  </>),
  /* no comments — two chat bubbles */
  "no-comments": (<>
    <path d="M46 56 H112 A9 9 0 0 1 121 65 V90 A9 9 0 0 1 112 99 H70 L56 112 V99 H46 A9 9 0 0 1 37 90 V65 A9 9 0 0 1 46 56 Z" />
    <path d="M120 78 H158 A8 8 0 0 1 166 86 V104 A8 8 0 0 1 158 112 H150 V122 L138 112 H120" />
  </>),
};

export const SCENE_NAMES = Object.keys(SCENES);
export const SIZE_STEPS = [80, 120, 160];

export function Illustration({ name, size = 120 }: { name: string; size?: number }) {
  const scene = SCENES[name] ?? SCENES.empty;
  return (
    <svg viewBox="0 0 200 160" width={size} height={Math.round((size * 160) / 200)}
      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      role="img" aria-hidden="true" style={{ display: "block" }}>
      {scene}
    </svg>
  );
}
