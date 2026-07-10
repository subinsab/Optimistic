# Illustration — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (51/54) | **Status:** Stable

---

## Overview

Scene illustrations for empty states, onboarding flows, feature callouts, and marketing surfaces. Each illustration uses a neutral ellipse base with semantic `currentColor` accents — swap the accent colour to match any product theme.

- **80 illustrations** across **16 categories**
- All use `viewBox="0 0 200 200"` — scalable to any size
- Background ellipse: neutral `#EDEEF0` base
- Accent areas: `currentColor` — inherits from parent CSS `color`

---

## Categories

| Category               | Count |
|------------------------|-------|
| Artificial Intelligence | 5    |
| Astronomy              | 5     |
| Blockchain Crypto      | 5     |
| Communication          | 5     |
| Documents              | 5     |
| Electronics            | 5     |
| Finance                | 5     |
| Gaming                 | 5     |
| Gym                    | 5     |
| Insurance              | 5     |
| Law                    | 5     |
| Money                  | 5     |
| Sci-Fi                 | 5     |
| Shopping               | 5     |
| Sports                 | 5     |
| Transport              | 5     |

---

## Usage

### Inline SVG (recommended)

Paste the raw SVG directly and control the accent via CSS `color`:

```html
<!-- Default accent (inherits text colour) -->
<div style="color: var(--accent); width: 120px; height: 120px;">
  <!-- paste illustration SVG here -->
</div>

<!-- Brand accent -->
<div style="color: #4065C5; width: 120px; height: 120px;">
  <!-- paste illustration SVG here -->
</div>
```

### SVG sprite (via symbol/use)

Use the downloaded `illustration-library.svg` sprite:

```html
<!-- Link the sprite (once, hidden) -->
<div style="display:none">
  <object data="illustration-library.svg" type="image/svg+xml"></object>
</div>

<!-- Reference by symbol ID -->
<svg width="120" height="120" style="color: var(--accent);">
  <use href="illustration-library.svg#ai-brain" />
</svg>
```

### React component

```tsx
interface IllustrationProps {
  src: string;           // raw SVG string or imported SVG component
  size?: number;         // default 120
  color?: string;        // CSS color, defaults to currentColor
  className?: string;
}

export const Illustration = ({
  src,
  size = 120,
  color = 'currentColor',
  className,
}: IllustrationProps) => (
  <div
    className={className}
    style={{ width: size, height: size, color }}
    dangerouslySetInnerHTML={{ __html: src }}
    aria-hidden="true"
  />
);
```

---

## Colour theming

Illustration accents respond to CSS `color`. Use any system colour token:

| Token / Value          | Usage                        |
|------------------------|------------------------------|
| `var(--accent)`        | Orange — primary calls-to-action |
| `#4065C5`              | Brand blue — Yubi brand surfaces |
| `#1A1A2E`              | Primary dark — neutral/default   |
| `#3F902B`              | Success — confirmation states    |
| `#D98F00`              | Warning — cautionary states      |
| `#CD3546`              | Danger — error / destructive     |

---

## Size guidelines

| Context            | Recommended size |
|--------------------|-----------------|
| Empty state (page) | 160–200px       |
| Empty state (card) | 120px           |
| Onboarding slide   | 200–240px       |
| Feature callout    | 80–120px        |
| Marketing hero     | 240–320px       |

---

## Accessibility

- Illustrations are decorative — always wrap with `aria-hidden="true"`
- Never use illustrations to convey information that is not also present in text
- Ensure sufficient contrast between illustration accent colour and surrounding background
- Do not use illustrations as the sole indicator of status or state

```html
<!-- Correct — decorative, hidden from screen readers -->
<div aria-hidden="true" style="color: var(--accent); width: 120px;">
  <!-- SVG -->
</div>

<!-- If illustration has semantic meaning, provide a text alternative -->
<figure>
  <div aria-hidden="true" style="color: var(--accent); width: 120px;">
    <!-- SVG -->
  </div>
  <figcaption class="sr-only">Empty state: no transactions found</figcaption>
</figure>
```

---

## Illustration IDs

### Artificial Intelligence
`ai-brain` · `ai-chip` · `ai-robot` · `ai-neural` · `ai-data`

### Astronomy
`astro-planet` · `astro-rocket` · `astro-telescope` · `astro-moon` · `astro-satellite`

### Blockchain Crypto
`bc-bitcoin` · `bc-wallet` · `bc-chain` · `bc-node` · `bc-ethereum`

### Communication
`comm-chat` · `comm-email` · `comm-phone` · `comm-video` · `comm-bell`

### Documents
`doc-file` · `doc-folder` · `doc-contract` · `doc-report` · `doc-clipboard`

### Electronics
`elec-laptop` · `elec-phone` · `elec-headphones` · `elec-monitor` · `elec-battery`

### Finance
`fin-coins` · `fin-chart` · `fin-bank` · `fin-card` · `fin-piggy`

### Gaming
`game-controller` · `game-trophy` · `game-dice` · `game-medal` · `game-coin`

### Gym
`gym-dumbbell` · `gym-barbell` · `gym-yoga` · `gym-running` · `gym-kettlebell`

### Insurance
`ins-shield` · `ins-umbrella` · `ins-health` · `ins-home` · `ins-car`

### Law
`law-scales` · `law-gavel` · `law-books` · `law-badge` · `law-document`

### Money
`mon-coins` · `mon-bill` · `mon-safe` · `mon-wallet` · `mon-exchange`

### Sci-Fi
`scifi-ship` · `scifi-alien` · `scifi-portal` · `scifi-robot` · `scifi-laser`

### Shopping
`shop-cart` · `shop-bag` · `shop-store` · `shop-tag` · `shop-gift`

### Sports
`sport-ball` · `sport-trophy` · `sport-medal` · `sport-shoe` · `sport-stopwatch`

### Transport
`trans-car` · `trans-plane` · `trans-bus` · `trans-train` · `trans-bike`

---

## Related Components

- **Icon** (`icon.html`) — inline SVG icon system with size/colour tokens
- **Empty State** — combine an illustration with a heading + CTA button
- **Onboarding** — full-screen slides using large (200px+) illustrations

---

*Yubi Market Design System · Illustration v1.0.0 · Internal Use*
