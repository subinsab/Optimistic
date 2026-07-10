# Yubi Market Design System — Complete Reference

> **How to use:** Upload this single file to Claude and say "Use the Yubi Market design system." Claude will reference all tokens, rules, and patterns from this file for any UI work — colors, typography, spacing, elevation, radius, breakpoints, grid, and components.

**Version:** 1.1.0 | **Brand:** Yubi Market | **Last updated:** 2026-04-10

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Elevation & Shadows](#elevation--shadows)
6. [Border Radius](#border-radius)
7. [Breakpoints & Grid](#breakpoints--grid)
8. [Icon System](#icon-system)
9. [Illustration Library](#illustration-library)
10. [Components](#components)
11. [Layouts](#layouts)
12. [Complete CSS Variables](#complete-css-variables)

---

## Brand Identity

### Logo Mark

The Yubi Market logo consists of a three-path geometric mark and a wordmark.

| Element | Hex | Role |
|---|---|---|
| Path 1 (top-right) | `#DCDC5B` | Lime — brand accent |
| Path 2 (bottom-left) | `#FE5104` | Orange — primary brand |
| Path 3 (center overlap) | `#81AFF2` | Sky — brand accent / focus |

**Wordmark:** "Yubi markets" — Inter Bold, sentence case, `#121926` on light / `#EEEEEE` on dark.

**Logo usage rules:**
- Minimum size: 24px mark height
- Clear space: equal to the mark width on all sides
- Never recolor, stretch, or rotate the mark
- On dark backgrounds use the light wordmark variant
- Never use the wordmark without the mark

### Brand Personality

**Design language:** Clean, professional, data-forward. Built for financial market interfaces where clarity and trust are non-negotiable.

**Principles:**
1. **Clarity first** — every element has a purpose; remove everything else
2. **Data legibility** — numbers and tables are first-class citizens
3. **Calm confidence** — restrained use of brand orange; let data speak
4. **Consistent density** — tight information hierarchy with generous breathing room between sections

---

## Color System

### Rules

1. **Always use tokens, never raw hex** in component code. Raw hex is only acceptable in the token definition itself.
2. **Max 1 brand primary** (`#FD7149`) per interactive section — use secondary/ghost variants for supporting actions.
3. **Warning text on white:** `yellow.500` (#F79009) fails WCAG AA for small text. Use `yellow.700` (#B85008) for body-sized warning text.
4. **Brand orange on white** (#FD7149) is AA-Large only — don't use as small body text color.
5. **Focus rings** must always use `color.border.focus` (`#81AFF2`). Never a custom value.
6. **Feedback sets** must always be applied as a full set: bg + border + icon + text. Never use a single feedback color in isolation.
7. **Neutral text** hierarchy: primary (#121926) → secondary (#697586) → muted (#9AA3B2) → disabled (#CDD5DF).

---

### Quick Reference — Key Values

| Purpose | Token | Hex |
|---|---|---|
| Primary action / brand | `color.action.brand.default` | `#FD7149` |
| Brand hover | `color.action.brand.hover` | `#FD5E32` |
| Brand active/pressed | `color.action.brand.active` | `#FC3A04` |
| Page background | `color.bg.page` | `#F8FAFC` |
| Card / panel | `color.bg.panel` | `#FFFFFF` |
| Primary text | `color.text.primary` | `#121926` |
| Secondary text | `color.text.secondary` | `#697586` |
| Default border | `color.border.default` | `#E3E8EF` |
| Focus ring | `color.border.focus` | `#81AFF2` |
| Success | `color.feedback.success.icon` | `#3F902B` |
| Error | `color.feedback.error.icon` | `#CD3546` |
| Warning | `color.feedback.warning.icon` | `#F79009` |
| Info / Special | `color.action.special.default` | `#4065C5` |

---

### Core Color Palettes (Primitives)

#### Brand — Orange

| Token | Hex |
|---|---|
| `brand.50` | `#FFF3EE` |
| `brand.100` | `#FFE4D6` |
| `brand.200` | `#FFC9AD` |
| `brand.300` | `#FFAA80` |
| `brand.400` | `#FD8A5E` |
| `brand.500` | `#FD7149` ← primary |
| `brand.600` | `#FD5E32` ← hover |
| `brand.700` | `#FC3A04` ← active |
| `brand.800` | `#C92E00` |
| `brand.900` | `#9A2300` |

#### Red (Error)

| Token | Hex |
|---|---|
| `red.50` | `#FFF1F1` |
| `red.100` | `#FFE0E0` |
| `red.200` | `#FFBFBF` |
| `red.300` | `#FF9090` |
| `red.400` | `#FF5C5C` |
| `red.500` | `#E02828` |
| `red.600` | `#CD3546` ← error default |
| `red.700` | `#A81C31` |
| `red.800` | `#871426` |
| `red.900` | `#65101C` |

#### Green (Success)

| Token | Hex |
|---|---|
| `green.50` | `#F0FDF4` |
| `green.100` | `#DCFCE8` |
| `green.200` | `#B8F5D0` |
| `green.300` | `#82ECA8` |
| `green.400` | `#4ADE80` |
| `green.500` | `#22C55E` |
| `green.600` | `#3F902B` ← success default |
| `green.700` | `#15803D` |
| `green.800` | `#166534` |
| `green.900` | `#14532D` |

#### Yellow (Warning / Caution)

| Token | Hex |
|---|---|
| `yellow.50` | `#FFFBEB` |
| `yellow.100` | `#FFF0C2` |
| `yellow.200` | `#FEDF84` |
| `yellow.300` | `#FCC840` |
| `yellow.400` | `#F9B812` |
| `yellow.500` | `#F79009` ← caution default |
| `yellow.600` | `#DC6B02` |
| `yellow.700` | `#B85008` ← AA-safe text |
| `yellow.800` | `#953D0C` |
| `yellow.900` | `#7A3010` |

#### Blue (Info / Special)

| Token | Hex |
|---|---|
| `blue.50` | `#EFF6FF` |
| `blue.100` | `#DBEAFE` |
| `blue.200` | `#BFDBFE` |
| `blue.300` | `#93C5FD` |
| `blue.400` | `#60A5FA` |
| `blue.500` | `#3B82F6` |
| `blue.600` | `#4065C5` ← special default |
| `blue.700` | `#1D4ED8` |
| `blue.800` | `#1E40AF` |
| `blue.900` | `#1E3A8A` |

#### Neutral — Cool Gray

| Token | Hex | Role |
|---|---|---|
| `neutral.0` | `#FFFFFF` | White |
| `neutral.50` | `#F8FAFC` | Page background |
| `neutral.100` | `#F1F5F9` | Inset / code bg |
| `neutral.200` | `#E3E8EF` | Card border |
| `neutral.300` | `#CDD5DF` | Strong border |
| `neutral.400` | `#9AA3B2` | Muted / disabled text |
| `neutral.500` | `#697586` | Body text |
| `neutral.600` | `#4B5565` | Supporting text |
| `neutral.700` | `#364152` | Dark label |
| `neutral.800` | `#202939` | Near-black |
| `neutral.900` | `#121926` | Headline text |

#### Lime (Brand Accent)

| Token | Hex |
|---|---|
| `lime.50` | `#FAFEE7` |
| `lime.400` | `#DCDC5B` ← brand accent (logo) |
| `lime.600` | `#9EA32A` |

#### Sky (Brand Accent / Focus)

| Token | Hex |
|---|---|
| `sky.50` | `#EFF8FF` |
| `sky.400` | `#81AFF2` ← brand accent + focus ring |
| `sky.600` | `#3A7ED8` |

#### Extended Palette

| Color | Default Hex | Token |
|---|---|---|
| Purple | `#9333EA` | `purple.600` |
| Pink | `#E0178B` | `pink.500` |
| Teal | `#0D9488` | `teal.600` |
| Cyan | `#0891B2` | `cyan.600` |
| Indigo | `#4F46E5` | `indigo.600` |
| Maroon | `#9E1717` | `maroon.600` |
| Warm Gray | `#737373` | `warmgray.500` |

---

### Semantic Tokens

#### Action

| Token | Hex | Maps to |
|---|---|---|
| `color.action.brand.default` | `#FD7149` | brand.500 |
| `color.action.brand.hover` | `#FD5E32` | brand.600 |
| `color.action.brand.active` | `#FC3A04` | brand.700 |
| `color.action.brand.disabled` | `#FFC9AD` | brand.200 |
| `color.action.brand.subtle` | `#FFF3EE` | brand.50 |
| `color.action.secondary.default` | `#E3E8EF` | neutral.200 |
| `color.action.secondary.hover` | `#CDD5DF` | neutral.300 |
| `color.action.danger.default` | `#CD3546` | red.600 |
| `color.action.danger.hover` | `#A81C31` | red.700 |
| `color.action.danger.subtle` | `#FFF1F1` | red.50 |
| `color.action.special.default` | `#4065C5` | blue.600 |
| `color.action.special.hover` | `#1D4ED8` | blue.700 |

#### Background

| Token | Hex | Maps to |
|---|---|---|
| `color.bg.page` | `#F8FAFC` | neutral.50 |
| `color.bg.panel` | `#FFFFFF` | neutral.0 |
| `color.bg.inset` | `#F1F5F9` | neutral.100 |
| `color.bg.subtle` | `#E3E8EF` | neutral.200 |
| `color.bg.brand.subtle` | `#FFF3EE` | brand.50 |
| `color.bg.brand.bold` | `#FD7149` | brand.500 |
| `color.bg.special.subtle` | `#EFF6FF` | blue.50 |
| `color.bg.special.bold` | `#4065C5` | blue.600 |
| `color.bg.overlay` | `rgba(0,0,0,0.45)` | — |

#### Text

| Token | Hex | Maps to |
|---|---|---|
| `color.text.primary` | `#121926` | neutral.900 |
| `color.text.secondary` | `#697586` | neutral.500 |
| `color.text.muted` | `#9AA3B2` | neutral.400 |
| `color.text.disabled` | `#CDD5DF` | neutral.300 |
| `color.text.inverse` | `#FFFFFF` | neutral.0 |
| `color.text.brand` | `#FD7149` | brand.500 |
| `color.text.link` | `#4065C5` | blue.600 |
| `color.text.success` | `#3F902B` | green.600 |
| `color.text.error` | `#CD3546` | red.600 |
| `color.text.warning` | `#B85008` | yellow.700 |
| `color.text.info` | `#4065C5` | blue.600 |

#### Border

| Token | Hex | Maps to |
|---|---|---|
| `color.border.default` | `#E3E8EF` | neutral.200 |
| `color.border.strong` | `#CDD5DF` | neutral.300 |
| `color.border.focus` | `#81AFF2` | sky.400 |
| `color.border.brand` | `#FD7149` | brand.500 |
| `color.border.success` | `#3F902B` | green.600 |
| `color.border.error` | `#CD3546` | red.600 |
| `color.border.warning` | `#F79009` | yellow.500 |
| `color.border.info` | `#4065C5` | blue.600 |

---

### Feedback Token Sets

Always use the full set together — bg + border + icon + text. Never use a single feedback color in isolation.

#### Success
| Token | Hex |
|---|---|
| `color.feedback.success.bg` | `#F0FDF4` |
| `color.feedback.success.border` | `#B8F5D0` |
| `color.feedback.success.icon` | `#3F902B` |
| `color.feedback.success.text` | `#166534` |

#### Error
| Token | Hex |
|---|---|
| `color.feedback.error.bg` | `#FFF1F1` |
| `color.feedback.error.border` | `#FFBFBF` |
| `color.feedback.error.icon` | `#CD3546` |
| `color.feedback.error.text` | `#871426` |

#### Warning
| Token | Hex |
|---|---|
| `color.feedback.warning.bg` | `#FFFBEB` |
| `color.feedback.warning.border` | `#FEDF84` |
| `color.feedback.warning.icon` | `#F79009` |
| `color.feedback.warning.text` | `#7A3010` |

#### Info
| Token | Hex |
|---|---|
| `color.feedback.info.bg` | `#EFF6FF` |
| `color.feedback.info.border` | `#BFDBFE` |
| `color.feedback.info.icon` | `#4065C5` |
| `color.feedback.info.text` | `#1E3A8A` |

---

### Dark Mode Overrides

When `[data-theme="dark"]` is applied to `<html>`:

| Purpose | Light | Dark |
|---|---|---|
| Page bg | `#F8FAFC` | `#1a1a1a` |
| Panel bg | `#FFFFFF` | `#222222` |
| Sidebar bg | `#FFFFFF` | `#111111` |
| Topbar bg | `#FFFFFF` | `#111111` |
| Hover state | `#F7F7F7` | `#2a2a2a` |
| Inset bg | `#F1F5F9` | `#1a1a1a` |
| Code bg | `#F0F0F0` | `#161616` |
| Text primary | `#121926` | `#eeeeee` |
| Text secondary | `#697586` | `#aaaaaa` |
| Text muted | `#9AA3B2` | `#666666` |
| Text disabled | `#CDD5DF` | `#3a3a3a` |
| Border default | `#E3E8EF` | `#333333` |
| Border strong | `#CDD5DF` | `#444444` |
| Accent text | `#FD7149` | `#FF8C5A` |
| Accent dim | `rgba(254,81,4,.10)` | `rgba(254,81,4,.12)` |

---

### Chart Colors

#### Categorical Series (use in order)
1. `#FD7149` — Brand Orange
2. `#4065C5` — Special Blue
3. `#3F902B` — Green
4. `#F79009` — Amber
5. `#9333EA` — Purple
6. `#0D9488` — Teal
7. `#E0178B` — Pink
8. `#6366F1` — Indigo
9. `#14B8A6` — Cyan
10. `#C01E1E` — Maroon
11. `#FD5E32` — Brand–2
12. `#60A5FA` — Sky
13. `#22C55E` — Mint
14. `#DCDC5B` — Lime
15. `#C084FC` — Violet

#### Sequential Scales
- **Brand:** `#FFF3EE` → `#FD7149` → `#9A2300`
- **Blue:** `#EFF6FF` → `#4065C5` → `#1E3A8A`
- **Green:** `#F0FDF4` → `#3F902B` → `#14532D`

---

## Typography

### Rules

1. **Inter exclusively** — never use Inter, Roboto, or any other typeface in product UI.
2. **Two weights only** — Regular (400) and Bold (700). Never use Light, Medium, SemiBold, or Black.
3. **No custom font sizes** — always reference a named type scale token (D1–D3, H1–H6, B1–B4, S1–S5, T1–T2).
4. **Line height** — headings use `tight` (1.15) or `snug` (1.25); body text always uses `normal` (1.5).
5. **Left-align by default** — center alignment only for hero/empty states; right-align only for numeric table values.
6. **Line length** — body text max `65ch`. Never let paragraphs exceed 80ch.
7. **Uppercase labels** — always paired with `letter-spacing: 0.04em` or more and weight 700.
8. **Fragment Mono** — use only for code snippets, token names, hex values, and monospaced data.

---

### Typeface

| Property | Value |
|---|---|
| **Primary typeface** | Inter |
| **Format** | OTF |
| **Permitted weights** | 400 (Regular), 700 (Bold) |
| **Monospace** | Fragment Mono / JetBrains Mono |
| **Font stack (macOS/iOS)** | `'Inter', -apple-system, 'SF Pro Display', sans-serif` |
| **Font stack (Windows)** | `'Inter', 'Segoe UI', system-ui, sans-serif` |
| **Font stack (code)** | `'Fragment Mono', 'JetBrains Mono', monospace` |

---

### Type Scale

#### Display — Hero, marketing, landing pages

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| D1 | `font.size.display-1` | 72px | 80px (1.11) | Bold 700 | −0.03em |
| D2 | `font.size.display-2` | 56px | 64px (1.14) | Bold 700 | −0.025em |
| D3 | `font.size.display-3` | 40px | 48px (1.2) | Bold 700 | −0.02em |

#### Headings — Page titles, section headers, card titles

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| H1 | `font.size.heading-1` | 32px | 40px (1.25) | Bold 700 | −0.02em |
| H2 | `font.size.heading-2` | 28px | 36px (1.29) | Bold 700 | −0.015em |
| H3 | `font.size.heading-3` | 24px | 32px (1.33) | Bold 700 | −0.01em |
| H4 | `font.size.heading-4` | 20px | 28px (1.4) | Bold 700 | −0.01em |
| H5 | `font.size.heading-5` | 18px | 24px (1.33) | Bold 700 | 0 |
| H6 | `font.size.heading-6` | 16px | 22px (1.375) | Bold 700 | 0 |

#### Body — Paragraphs, descriptions, form content

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| B1 | `font.size.body-1` | 18px | 28px (1.55) | Regular 400 | 0 |
| B2 | `font.size.body-2` | 16px | 24px (1.5) | Regular 400 | 0 |
| B3 | `font.size.body-3` | 14px | 22px (1.57) | Regular 400 | 0 |
| B4 | `font.size.body-4` | 12px | 18px (1.5) | Regular 400 | 0 |

#### Small — Labels, chips, badges, metadata

| Level | Token | Size | Weight | Letter Spacing | Notes |
|---|---|---|---|---|---|
| S1 | `font.size.small-1` | 13px | Bold 700 | 0.01em | Form labels |
| S2 | `font.size.small-2` | 12px | Regular 400 | 0 | Helper text, hints |
| S3 | `font.size.small-3` | 11px | Bold 700 | 0.04em | Section labels (ALL CAPS) |
| S4 | `font.size.small-4` | 11px | Regular 400 | 0 | Timestamps, meta |
| S5 | `font.size.small-5` | 10px | Regular 400 | 0.02em | Badge text, pill labels |

#### Tiny — Legal, super-compact UI, nav numbers

| Level | Token | Size | Weight | Letter Spacing |
|---|---|---|---|---|
| T1 | `font.size.tiny-1` | 10px | Bold 700 | 0.06em |
| T2 | `font.size.tiny-2` | 9px | Regular 400 | 0.04em |

---

### Component Typographic Patterns

| Component | Part | Style |
|---|---|---|
| Button | Label | S1 — Inter 700, 13px |
| Form Field | Label | S1 — Inter 700, 13px |
| Form Field | Input value | B3 — Inter 400, 14px |
| Form Field | Helper/error | S2 — Inter 400, 12px |
| Table | Column header | T1 — Inter 700, 10px, ALL CAPS, `letter-spacing: 0.05em` |
| Table | Cell text | B3 — Inter 400, 14px |
| Table | Numeric cell | B3 — Inter 700, 14px (right-aligned) |
| Card | Eyebrow | S3 — Inter 700, 11px, ALL CAPS |
| Card | Title | H4 or H5 — Inter 700 |
| Card | Body | B3 — Inter 400, 14px |
| Badge / Chip | Text | S5 — Inter 400, 10px |
| Navigation | Group label | T1 — Inter 700, 10px, ALL CAPS |
| Navigation | Nav item | B3 — 400/700 active, 14px |
| Modal | Title | H3 — Inter 700, 24px |
| Modal | Body | B2 — Inter 400, 16px |

---

## Spacing

### Rules

1. **8px base unit** — all spacing is a multiple of 8px (or a fractional sub-step: 2px, 4px, 6px for tight internals).
2. **Tokens only** — never use arbitrary px values. Always reference a named `space.*` token.
3. **Small (2–8px)** — tight internal component spacing: icon-to-label gaps, inline badge padding, input icon offsets.
4. **Medium (12–24px)** — component padding (buttons, cards, form fields), gaps between elements within a component.
5. **Large (32–80px)** — section separation, page margins, content area padding.
6. **Consistency** — related elements should have smaller spacing; unrelated elements should have larger spacing.
7. **Vertical rhythm** — stacks of content should use consistent spacing tokens, not a mix of arbitrary values.

---

### Full Scale

| Token | Multiplier | Pixels | Use for |
|---|---|---|---|
| `space.025` | 0.25× | 2px | Icon margin, divider offset |
| `space.050` | 0.5× | 4px | Icon-to-label gap, badge padding |
| `space.075` | 0.75× | 6px | Chip padding, tight tag gap |
| `space.100` | 1× (base) | 8px | Inner padding, icon button spacing |
| `space.150` | 1.5× | 12px | Button padding (sm), input icon gap |
| `space.200` | 2× | 16px | Button padding (md), card inner gap |
| `space.250` | 2.5× | 20px | Form field padding, list item gap |
| `space.300` | 3× | 24px | Card padding, section header gap |
| `space.400` | 4× | 32px | Between form sections, card stack gap |
| `space.500` | 5× | 40px | Sidebar padding, modal padding |
| `space.600` | 6× | 48px | Page section gap, hero bottom padding |
| `space.800` | 8× | 64px | Between major page sections |
| `space.1000` | 10× | 80px | Page top/bottom padding on desktop |

---

### Component Spacing Patterns

#### Button

| Size | Padding | Token |
|---|---|---|
| Small | 6px 12px | `space.075 space.150` |
| Medium | 8px 16px | `space.100 space.200` |
| Large | 12px 24px | `space.150 space.300` |

#### Form Field

| Part | Spacing | Token |
|---|---|---|
| Label → Input gap | 4px | `space.050` |
| Input padding | 8px 12px | `space.100 space.150` |
| Input → Helper text | 4px | `space.050` |
| Between fields | 16px | `space.200` |

#### Card

| Part | Spacing | Token |
|---|---|---|
| Card padding | 24px | `space.300` |
| Title → Body gap | 8px | `space.100` |
| Body → Action gap | 16px | `space.200` |
| Card-to-card gap | 16px | `space.200` |

#### Table

| Part | Spacing | Token |
|---|---|---|
| Cell padding | 12px 16px | `space.150 space.200` |
| Header padding | 8px 16px | `space.100 space.200` |

#### Modal / Dialog

| Part | Spacing | Token |
|---|---|---|
| Modal padding | 32px | `space.400` |
| Header → Body | 20px | `space.250` |
| Body → Footer | 24px | `space.300` |

#### Navigation

| Part | Spacing | Token |
|---|---|---|
| Nav item padding | 8px 12px | `space.100 space.150` |
| Section group gap | 24px | `space.300` |
| Sidebar padding | 16px | `space.200` |

---

## Elevation & Shadows

### Rules

1. **Tokens only** — never use arbitrary `box-shadow` values. Always reference a named `shadow.*` token.
2. **Higher layer = greater shadow** — elements higher in the z-axis stacking order must carry a greater shadow level.
3. **Page surface = shadow.none** — the base page canvas never has a shadow.
4. **Cards = shadow.sm** — standard content cards and panels use `shadow.sm`.
5. **Dropdowns = shadow.md** — select menus, autocomplete lists, and tooltips use `shadow.md`.
6. **Modals = shadow.lg** — modals and floating panels use `shadow.lg`.
7. **Focus rings** — always use `shadow.focus` on interactive element focus. Use `shadow.focus-error` when the input is simultaneously in error state.
8. **shadow.inner** — use only for pressed states, inset inputs, and recessed wells.

---

### Shadow Scale

| Level | Token | CSS Value | Use for |
|---|---|---|---|
| 00 | `shadow.none` | `none` | Flat surfaces, table rows, inline elements |
| 01 | `shadow.xs` | `0 1px 2px rgba(0,0,0,.06)` | Subtle lift, chip badges |
| 02 | `shadow.sm` | `0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)` | Cards, default panel elevation |
| 03 | `shadow.md` | `0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.05)` | Dropdowns, hover states on cards |
| 04 | `shadow.lg` | `0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04)` | Modals, popovers, floating panels |
| 05 | `shadow.xl` | `0 20px 25px -5px rgba(0,0,0,.08), 0 10px 10px -5px rgba(0,0,0,.04)` | Full-screen overlays, command palettes |
| 06 | `shadow.2xl` | `0 25px 50px -12px rgba(0,0,0,.18)` | Toast notifications, highest-priority overlays |
| — | `shadow.inner` | `inset 0 2px 4px rgba(0,0,0,.08)` | Pressed states, inset inputs, recessed wells |

### Focus Ring Tokens

| Token | CSS Value | Use for |
|---|---|---|
| `shadow.focus` | `0 0 0 3px rgba(129,175,242,.45)` + `border-color: #81AFF2` | All interactive elements on focus |
| `shadow.focus-error` | `0 0 0 3px rgba(220,38,38,.30)` + `border-color: #CD3546` | Input in error state while focused |

### Elevation Map (Z-axis layers)

| Layer | Name | Token | Use for |
|---|---|---|---|
| 0 | Page Surface | `shadow.none` | Background, page canvas, layout regions |
| 1 | Card Level | `shadow.sm` | Standard content cards, panels, list items |
| 2 | Dropdown Level | `shadow.md` | Select menus, autocomplete lists, tooltips |
| 3 | Popover Level | `shadow.lg` | Popovers, date pickers, context menus |
| 4 | Modal Level | `shadow.xl` | Modals, drawers, full-screen overlays |
| 5 | Toast Level | `shadow.2xl` | Toast notifications, highest-priority alerts |

---

## Border Radius

### Rules

1. **Tokens only** — never use arbitrary border-radius values. Always reference a named `radius.*` token.
2. **Match child to parent** — child element radius = parent radius minus parent padding.
3. **Pills use radius.full** — status chips, tags, toggle tracks, avatar circles, and progress bars always use `radius.full` (9999px).
4. **Sharp edges use radius.none** — elements that bleed to a container edge use `radius.none`.
5. **Consistency per component type** — all instances of the same component must share the same radius token.
6. **Buttons and inputs = radius.md** — the standard token for form controls is `radius.md` (6px).
7. **Modals = radius.2xl** — modal dialogs use `radius.2xl` (16px).

---

### Full Scale

| Token | Value | Use for |
|---|---|---|
| `radius.none` | 0px | Sharp edges, flush-to-container elements, full-bleed images |
| `radius.xs` | 2px | Very subtle rounding, rarely used |
| `radius.sm` | 4px | Badge / tag, skeleton loaders |
| `radius.md` | 6px | Buttons, inputs, textareas, selects, tooltips |
| `radius.lg` | 8px | Compact cards, alerts / banners |
| `radius.xl` | 12px | Default cards, popovers |
| `radius.2xl` | 16px | Modals / dialogs |
| `radius.3xl` | 24px | Large decorative panels |
| `radius.full` | 9999px | Pills, status chips, avatars, toggle tracks, progress bars |

### Component Radius Defaults

| Component | Token | Value |
|---|---|---|
| Button | `radius.md` | 6px |
| Input | `radius.md` | 6px |
| Textarea | `radius.md` | 6px |
| Select / Dropdown | `radius.md` | 6px |
| Tooltip | `radius.md` | 6px |
| Card (default) | `radius.xl` | 12px |
| Card (compact) | `radius.lg` | 8px |
| Badge / Tag | `radius.sm` | 4px |
| Pill / Status chip | `radius.full` | 9999px |
| Avatar | `radius.full` | 9999px |
| Modal | `radius.2xl` | 16px |
| Alert / Banner | `radius.lg` | 8px |
| Popover | `radius.xl` | 12px |
| Toggle switch (track) | `radius.full` | 9999px |
| Progress bar | `radius.full` | 9999px |
| Skeleton loader | `radius.sm` | 4px |

---

## Breakpoints & Grid

### Breakpoint Rules

1. **Mobile-first always** — write base styles for `xs` (320px), then override upward with `min-width` queries. Never write desktop-first `max-width` overrides.
2. **Named tokens only** — reference breakpoints by name (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`). Never use arbitrary pixel values in media queries.
3. **Navigation** — at `xs`/`sm`/`md` use a hamburger drawer; at `lg`+ use a fixed sidebar.
4. **Grid transitions** — 4 columns at `xs`/`sm`, 8 columns at `md`, 12 columns at `lg`+.
5. **Content margin** — 20px at `xs`/`sm`, 40px at `md`, 56px at `lg`+.
6. **No max-width queries** — avoid `@media (max-width: ...)` patterns. They create override debt.

### Breakpoint Scale

| Token | Width | Device Target |
|---|---|---|
| `xs` | 320px | Small phones, portrait — base styles apply |
| `sm` | 480px | Large phones, landscape mode |
| `md` | 768px | Tablets, portrait — layout shifts begin |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Standard desktop — 12-col grid active |
| `2xl` | 1440px | Large monitors, full-HD displays |
| `3xl` | 1536px | Wide / ultra-wide screens |

### Layout Behaviour

| Feature | xs / sm ≤ 767px | md 768–1023px | lg / xl 1024–1439px | 2xl / 3xl ≥ 1440px |
|---|---|---|---|---|
| Navigation | Hamburger drawer | Hamburger drawer | Fixed sidebar | Fixed sidebar |
| Grid columns | 4 | 8 | 12 | 12 |
| Content margin | 20px | 40px | 56px | 56px |
| Card layout | Single column | 2 columns | 3–4 columns | 4+ columns |
| Table display | Scroll / stacked | Scroll / stacked | Full table | Full table |
| Modal width | 100vw (bottom sheet) | 480px | 560px | 640px |
| Sidebar width | Off-canvas | Off-canvas | 240px | 272px |

### Grid Tokens

| Token | Mobile < 768px | Tablet 768–1023px | Desktop ≥ 1024px |
|---|---|---|---|
| `grid.columns` | 4 | 8 | 12 |
| `grid.gutter` | 16px | 24px | 24px |
| `grid.margin` | 20px | 40px | 56px |
| `grid.max-width` | 100% | 100% | 1280px |

### Container Variants

| Token | Max Width | Use for |
|---|---|---|
| `container.sm` | 640px | Narrow forms, dialogs, single-column reading |
| `container.md` | 768px | Article body, centered card layouts, sign-in flows |
| `container.lg` | 1024px | Multi-column with sidebar, detail pages |
| `container.xl` | 1280px | Default page container, dashboard layouts |
| `container.2xl` | 1440px | Wide analytics views, data-heavy tables |
| `container.fluid` | 100% | Full-bleed layouts, maps, editors, canvas |

### Column Span Patterns (12-column desktop)

| Content Type | Columns | Notes |
|---|---|---|
| Full width | 12 | Hero sections, full-width tables |
| Main + Sidebar | 8 + 4 | Content area with contextual sidebar |
| Two equal panels | 6 + 6 | Side-by-side comparison, split forms |
| Three cards | 4 + 4 + 4 | Feature cards, stat groups |
| Four stat cards | 3 + 3 + 3 + 3 | Dashboard KPI row |
| Narrow form (centered) | 6 centered | Sign-in, checkout, confirmation |
| Dashboard (centered) | 10 centered | Content-heavy centered layouts |

> On mobile, all spans collapse to single column (12/12).

### Responsive Typography

| Heading | xs / sm ≤ 767px | md 768–1023px | lg+ ≥ 1024px | Weight |
|---|---|---|---|---|
| h1 | 28px (H2 token) | 36px (H1 token) | 48px (D3 token) | 700 |
| h2 | 22px | 28px | 36px | 700 |
| h3 | 18px | 22px | 28px | 700 |

---

## Icon System

### Icon Library

**Source:** Untitled UI icon set — 1,101 icons across 11 categories.
**Rendering:** Inline SVG. Each icon is a 20×20 viewBox, stroke-based, `currentColor`.

### Size Tokens

| Token | Size | Tile size | Use for |
|---|---|---|---|
| `.ym-icon-xs` | 12px | 24px | Compact inline icons |
| `.ym-icon-sm` | 16px | 32px | Small UI icons |
| `.ym-icon-md` | 20px | 40px | Default icon size |
| `.ym-icon-lg` | 24px | 48px | Prominent icons |
| `.ym-icon-xl` | 32px | 56px | Feature icons |
| `.ym-icon-2xl` | 40px | — | Hero / display icons |

### Color Tokens

| Token | Color | Hex |
|---|---|---|
| `.ym-icon-muted` | Muted | `#9AA3B2` |
| `.ym-icon-primary` | Primary text | `#121926` |
| `.ym-icon-accent` | Brand orange | `#FD7149` |
| `.ym-icon-brand` | Special blue | `#4065C5` |
| `.ym-icon-success` | Green | `#3F902B` |
| `.ym-icon-warning` | Amber | `#D98F00` |
| `.ym-icon-danger` | Red | `#CD3546` |
| `.ym-icon-white` | White | `#FFFFFF` |

### Icon Tile Variants

Tile wrappers add a rounded background container behind the icon.

| Variant | Background | Color |
|---|---|---|
| `.tile-default` | `var(--bg-inset)` | `var(--text-2)` |
| `.tile-accent` | `rgba(253,113,73,.10)` | `#FD7149` |
| `.tile-brand` | `rgba(64,101,197,.10)` | `#4065C5` |
| `.tile-success` | `rgba(63,144,43,.10)` | `#3F902B` |
| `.tile-warning` | `rgba(217,143,0,.10)` | `#D98F00` |
| `.tile-danger` | `rgba(205,53,70,.10)` | `#CD3546` |
| `.tile-filled-brand` | `#4065C5` | `#FFFFFF` |
| `.tile-filled-accent` | `#FD7149` | `#FFFFFF` |
| `.tile-filled-success` | `#3F902B` | `#FFFFFF` |

### Icon Usage Pattern

```html
<!-- Inline icon: size + colour tokens -->
<span class="ym-icon ym-icon-md ym-icon-brand" aria-hidden="true">
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
    <!-- SVG path -->
  </svg>
</span>

<!-- Icon tile: tinted background -->
<span class="ym-icon-tile icon-tile-md tile-brand" aria-hidden="true">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <!-- SVG path -->
  </svg>
</span>

<!-- Accessible icon (standalone / meaningful) -->
<span class="ym-icon ym-icon-lg ym-icon-success"
      role="img" aria-label="Application approved">
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
    <!-- check SVG -->
  </svg>
</span>
```

### Icon Categories

| Category | Count |
|---|---|
| Arrows & Chevrons | ~100 |
| Interface & Controls | ~120 |
| Files & Media | ~120 |
| General | ~200 |
| Charts & Analytics | ~65 |
| Communication | ~50 |
| Finance & Commerce | ~80 |
| Users & People | ~40 |
| Shapes & Design | ~100 |
| Navigation | ~75 |
| Map & Location | ~40 |

---

## Illustration Library

**File:** `illustration.html` · **Count:** 80 · **Categories:** 16 · **Status:** Stable

Scene illustrations for empty states, onboarding flows, feature callouts, and marketing surfaces.

### Structure

Every illustration is a `200×200` viewBox SVG with:
- **Neutral ellipse base** — `fill="#EDEEF0"` ground shadow
- **`currentColor` accents** — inherits from parent CSS `color` property

### Categories

Artificial Intelligence · Astronomy · Blockchain Crypto · Communication · Documents · Electronics · Finance · Gaming · Gym · Insurance · Law · Money · Sci-Fi · Shopping · Sports · Transport

### Usage

```html
<!-- Control accent via CSS color -->
<div style="color: var(--accent); width: 120px; height: 120px;">
  <!-- paste SVG from illustration library -->
</div>
```

### Colour Tokens

| Token | Hex | Use case |
|---|---|---|
| `var(--accent)` | `#FE5104` | Orange — primary CTA |
| `#4065C5` | Brand blue | Yubi brand surfaces |
| `#1A1A2E` | Primary dark | Neutral / default |
| `#3F902B` | Success | Confirmation states |
| `#D98F00` | Warning | Cautionary states |
| `#CD3546` | Danger | Error / destructive |

### Size Guidelines

| Context | Recommended size |
|---|---|
| Empty state (page) | 160–200px |
| Empty state (card) | 120px |
| Onboarding slide | 200–240px |
| Feature callout | 80–120px |

### Accessibility

All illustrations are decorative — always add `aria-hidden="true"` to the wrapper element.

---

## Complete CSS Variables

```css
/* ══════════════════════════════════════════════════
   Yubi Market Design System — All CSS Custom Properties
   ══════════════════════════════════════════════════ */

:root {

  /* ── TYPOGRAPHY ───────────────────────────── */
  --font-base: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fragment Mono', 'JetBrains Mono', monospace;

  --font-size-d1: 72px;  --line-height-d1: 80px;
  --font-size-d2: 56px;  --line-height-d2: 64px;
  --font-size-d3: 40px;  --line-height-d3: 48px;

  --font-size-h1: 32px;  --line-height-h1: 40px;
  --font-size-h2: 28px;  --line-height-h2: 36px;
  --font-size-h3: 24px;  --line-height-h3: 32px;
  --font-size-h4: 20px;  --line-height-h4: 28px;
  --font-size-h5: 18px;  --line-height-h5: 24px;
  --font-size-h6: 16px;  --line-height-h6: 22px;

  --font-size-b1: 18px;  --line-height-b1: 28px;
  --font-size-b2: 16px;  --line-height-b2: 24px;
  --font-size-b3: 14px;  --line-height-b3: 22px;
  --font-size-b4: 12px;  --line-height-b4: 18px;

  --font-size-s1: 13px;  --line-height-s1: 20px;
  --font-size-s2: 12px;  --line-height-s2: 18px;
  --font-size-s3: 11px;  --line-height-s3: 16px;
  --font-size-s4: 11px;  --line-height-s4: 16px;
  --font-size-s5: 10px;  --line-height-s5: 14px;

  --font-size-t1: 10px;  --line-height-t1: 14px;
  --font-size-t2: 9px;   --line-height-t2: 12px;

  --line-height-tight:   1.15;
  --line-height-snug:    1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.625;

  --measure-narrow: 45ch;
  --measure-body:   65ch;
  --measure-wide:   80ch;

  /* ── SPACING ──────────────────────────────── */
  --space-base:  8px;
  --space-025:   2px;
  --space-050:   4px;
  --space-075:   6px;
  --space-100:   8px;
  --space-150:   12px;
  --space-200:   16px;
  --space-250:   20px;
  --space-300:   24px;
  --space-400:   32px;
  --space-500:   40px;
  --space-600:   48px;
  --space-800:   64px;
  --space-1000:  80px;

  /* ── BORDER RADIUS ────────────────────────── */
  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-3xl:  24px;
  --radius-full: 9999px;

  /* ── ELEVATION / SHADOWS ──────────────────── */
  --shadow-none:  none;
  --shadow-xs:    0 1px 2px rgba(0,0,0,.06);
  --shadow-sm:    0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md:    0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.05);
  --shadow-lg:    0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04);
  --shadow-xl:    0 20px 25px -5px rgba(0,0,0,.08), 0 10px 10px -5px rgba(0,0,0,.04);
  --shadow-2xl:   0 25px 50px -12px rgba(0,0,0,.18);
  --shadow-inner: inset 0 2px 4px rgba(0,0,0,.08);
  --shadow-focus:       0 0 0 3px rgba(129,175,242,.45);
  --shadow-focus-error: 0 0 0 3px rgba(220,38,38,.30);

  /* ── BREAKPOINTS (reference only) ────────── */
  --bp-xs:  320px;
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1440px;
  --bp-3xl: 1536px;

  /* ── GRID ─────────────────────────────────── */
  --grid-gutter-mobile:  16px;
  --grid-gutter-desktop: 24px;
  --grid-margin-mobile:  20px;
  --grid-margin-tablet:  40px;
  --grid-margin-desktop: 56px;
  --grid-max-width:      1280px;
  --container-sm:        640px;
  --container-md:        768px;
  --container-lg:        1024px;
  --container-xl:        1280px;
  --container-2xl:       1440px;

  /* ── COLOR PRIMITIVES ─────────────────────── */
  /* Brand Orange */
  --color-brand-50:  #FFF3EE; --color-brand-100: #FFE4D6;
  --color-brand-200: #FFC9AD; --color-brand-300: #FFAA80;
  --color-brand-400: #FD8A5E; --color-brand-500: #FD7149;
  --color-brand-600: #FD5E32; --color-brand-700: #FC3A04;
  --color-brand-800: #C92E00; --color-brand-900: #9A2300;

  /* Red */
  --color-red-50:  #FFF1F1; --color-red-200: #FFBFBF;
  --color-red-400: #FF5C5C; --color-red-600: #CD3546;
  --color-red-700: #A81C31; --color-red-800: #871426;

  /* Green */
  --color-green-50:  #F0FDF4; --color-green-200: #B8F5D0;
  --color-green-400: #4ADE80; --color-green-600: #3F902B;
  --color-green-700: #15803D; --color-green-800: #166534;

  /* Yellow */
  --color-yellow-50:  #FFFBEB; --color-yellow-200: #FEDF84;
  --color-yellow-500: #F79009; --color-yellow-700: #B85008;
  --color-yellow-900: #7A3010;

  /* Blue */
  --color-blue-50:  #EFF6FF; --color-blue-200: #BFDBFE;
  --color-blue-400: #60A5FA; --color-blue-600: #4065C5;
  --color-blue-700: #1D4ED8; --color-blue-900: #1E3A8A;

  /* Neutral */
  --color-neutral-0:   #FFFFFF; --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #F1F5F9; --color-neutral-200: #E3E8EF;
  --color-neutral-300: #CDD5DF; --color-neutral-400: #9AA3B2;
  --color-neutral-500: #697586; --color-neutral-600: #4B5565;
  --color-neutral-700: #364152; --color-neutral-800: #202939;
  --color-neutral-900: #121926;

  /* Lime & Sky (brand accents) */
  --color-lime-400: #DCDC5B;
  --color-sky-400:  #81AFF2;

  /* ── SEMANTIC COLORS ──────────────────────── */
  /* Action */
  --color-action-brand:         #FD7149;
  --color-action-brand-hover:   #FD5E32;
  --color-action-brand-active:  #FC3A04;
  --color-action-brand-subtle:  #FFF3EE;
  --color-action-danger:        #CD3546;
  --color-action-danger-hover:  #A81C31;
  --color-action-special:       #4065C5;
  --color-action-special-hover: #1D4ED8;

  /* Background */
  --color-bg-page:         #F8FAFC;
  --color-bg-panel:        #FFFFFF;
  --color-bg-inset:        #F1F5F9;
  --color-bg-subtle:       #E3E8EF;
  --color-bg-brand-subtle: #FFF3EE;
  --color-bg-brand-bold:   #FD7149;
  --color-bg-overlay:      rgba(0,0,0,0.45);

  /* Text */
  --color-text-primary:   #121926;
  --color-text-secondary: #697586;
  --color-text-muted:     #9AA3B2;
  --color-text-disabled:  #CDD5DF;
  --color-text-inverse:   #FFFFFF;
  --color-text-brand:     #FD7149;
  --color-text-link:      #4065C5;
  --color-text-success:   #3F902B;
  --color-text-error:     #CD3546;
  --color-text-warning:   #B85008;

  /* Border */
  --color-border-default: #E3E8EF;
  --color-border-strong:  #CDD5DF;
  --color-border-focus:   #81AFF2;
  --color-border-brand:   #FD7149;
  --color-border-error:   #CD3546;

  /* Feedback — Success */
  --color-success-bg:     #F0FDF4;
  --color-success-border: #B8F5D0;
  --color-success-icon:   #3F902B;
  --color-success-text:   #166534;

  /* Feedback — Error */
  --color-error-bg:     #FFF1F1;
  --color-error-border: #FFBFBF;
  --color-error-icon:   #CD3546;
  --color-error-text:   #871426;

  /* Feedback — Warning */
  --color-warning-bg:     #FFFBEB;
  --color-warning-border: #FEDF84;
  --color-warning-icon:   #F79009;
  --color-warning-text:   #7A3010;

  /* Feedback — Info */
  --color-info-bg:     #EFF6FF;
  --color-info-border: #BFDBFE;
  --color-info-icon:   #4065C5;
  --color-info-text:   #1E3A8A;
}

/* ── DARK MODE OVERRIDES ──────────────────────── */
[data-theme="dark"] {
  --color-bg-page:    #1a1a1a;
  --color-bg-panel:   #222222;
  --color-bg-inset:   #1a1a1a;
  --color-bg-subtle:  #2a2a2a;

  --color-text-primary:   #eeeeee;
  --color-text-secondary: #aaaaaa;
  --color-text-muted:     #666666;
  --color-text-disabled:  #3a3a3a;

  --color-border-default: #333333;
  --color-border-strong:  #444444;

  --color-text-brand:  #FF8C5A;
  --color-bg-overlay:  rgba(0,0,0,0.60);
}
```

---

## Components

### Navigation Components

#### Side Navigation
- **Width:** 272px (desktop) | 260px (mobile off-canvas)
- **Background:** `color.bg.panel` | border-right 1px `color.border.default`
- **Nav item:** padding 8px 20px | B3 500 | color `color.text.secondary`
- **Nav item hover:** background `color.bg.hover` | color `color.text.primary`
- **Nav item active:** border-left 2px `color.action.brand` | bg `color.bg.brand.subtle` | color `color.action.brand`
- **Group label:** T1 (10px 700 ALL CAPS, letter-spacing 0.08em) | color `color.text.disabled` | padding 10px 20px 4px
- **Sub-item:** padding-left 32px | font-size 13px

#### Top Navigation (Topbar)
- **Height:** 56px | position: fixed | z-index: 200
- **Background:** `color.bg.panel` | border-bottom 1px `color.border.default`
- **Logo:** height 36px, left-aligned
- **Topbar label:** S2 (12px 500) | color `color.text.muted`
- **Version badge:** S5 | bg `color.bg.inset` | border `color.border.default` | `radius.full` | padding 2px 8px
- **Icon buttons:** 34×34px | `radius.md` | border `color.border.default`

#### Tabs (Underline style)
- **Tab padding:** 12px 16px | font B3 500
- **Active:** color `color.action.brand` + 2px bottom border `color.action.brand`
- **Inactive:** color `color.text.secondary` | hover: color `color.text.primary`
- **Tab strip:** border-bottom 1px `color.border.default`

#### Breadcrumbs
- Font: B4 (12px 400) | color `color.text.secondary`
- Separator: "/" | color `color.text.muted`
- Current page: color `color.text.primary` | weight 500

#### Pagination
- Page buttons: 34×34px | `radius.md`
- Active: bg `color.action.brand` | color white
- Inactive: bg `color.bg.panel` | border `color.border.default` | color `color.text.secondary`

---

### Buttons

#### Variants
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `#FD7149` | white | none |
| Primary hover | `#FD5E32` | white | none |
| Primary active | `#FC3A04` | white | none |
| Secondary | `color.bg.panel` | `color.text.primary` | `color.border.default` |
| Danger | `#CD3546` | white | none |
| Ghost | transparent | `color.text.secondary` | none |
| Link | transparent | `#4065C5` | none |

#### Sizing
| Size | Padding | Font | Min-height |
|---|---|---|---|
| Small | 6px 12px | S1 (13px 700) | 30px |
| Medium | 8px 16px | S1 (13px 700) | 36px |
| Large | 12px 24px | S1 (13px 700) | 44px |

#### States
- **Focus:** border-color `color.border.focus` + `shadow.focus`
- **Disabled:** opacity 0.5 | pointer-events none
- **Loading:** spinner replaces label | opacity 0.7

#### Icon Button
- Size: 34×34px | `radius.md` | border `color.border.default` | bg `color.bg.panel`
- Hover: bg `color.bg.hover`

---

### Form Inputs

#### Text Input
- Height: 38px | `radius.md` | border 1px `color.border.default`
- Font: B3 (14px 400) | padding: 8px 12px
- Placeholder: color `color.text.muted`
- **Focus:** border-color `color.border.focus` + `shadow.focus`
- **Error:** border-color `color.border.error` + `shadow.focus-error`
- **Error message:** S2 (12px) | color `color.text.error` | margin-top 4px
- **Disabled:** bg `color.bg.subtle` | color `color.text.disabled`

#### Textarea
- Same border/radius/focus as Input | min-height 96px | resize: vertical

#### Select / Dropdown
- Same height/border/radius as Input | chevron icon right (16px, `color.text.muted`)
- Options panel: bg `color.bg.panel` | `radius.xl` | `shadow.md`
- Option hover: bg `color.bg.hover` | Selected: color `color.action.brand`

#### Checkbox
- Size: 16×16px | `radius.sm` | border `color.border.default`
- Checked: bg `color.action.brand` | white checkmark SVG
- Label: B3 (14px) | gap 8px

#### Radio
- Size: 16×16px circle | border `color.border.default`
- Selected: outer ring `color.action.brand` | inner white dot 6px

#### Toggle Switch
- Track: 36×20px | `radius.full` | bg `color.bg.subtle` (off) / `color.action.brand` (on)
- Thumb: 16px circle | bg white | `shadow.xs`

#### Search Input
- Same as Input + search icon left | padding-left 34px

#### Date / Time Picker
- Input + calendar/clock icon right | height 38px | `radius.md`
- Calendar dropdown: `radius.xl` | `shadow.md`
- Selected date: bg `color.action.brand` | color white | `radius.full`

#### Slider
- Track: 4px | `radius.full` | bg `color.bg.subtle`
- Filled track: bg `color.action.brand` | Thumb: 18px circle | border 2px `color.action.brand`

#### Pin Input
- Cells: 48×48px | `radius.md` | border `color.border.default` | font H4 700
- Focused: border-color `color.border.focus` + `shadow.focus`

---

### Data Display

#### Table
| Part | Style |
|---|---|
| Wrapper | `radius.xl` card | `shadow.sm` | border `color.border.default` |
| thead | bg `color.bg.inset` |
| th | T1 (10px 700 ALL CAPS, letter-spacing 0.05em) | color `color.text.muted` | padding 8px 16px |
| td | B3 (14px 400) | color `color.text.secondary` | padding 12px 16px |
| Numeric td | weight 700 | right-aligned |
| Row hover | bg `color.bg.hover` |

#### Badge / Status Badge
- `radius.full` | padding 2px 8px | font S5 (10px)
- **success:** bg `#F0FDF4` | border `#B8F5D0` | text `#166534`
- **error:** bg `#FFF1F1` | border `#FFBFBF` | text `#871426`
- **warning:** bg `#FFFBEB` | border `#FEDF84` | text `#7A3010`
- **info:** bg `#EFF6FF` | border `#BFDBFE` | text `#1E3A8A`
- **neutral:** bg `color.bg.inset` | border `color.border.default` | text `color.text.secondary`

#### Avatar
- `radius.full` | sizes: 24 / 32 / 40 / 48 / 56 / 72px
- Fallback: initials (S1 or S3) | Status dot: 8px circle, bottom-right, border 2px white

#### Tags
- `radius.sm` (4px) | padding 4px 10px | font B4 (12px)

#### Pills / Status Chips
- `radius.full` | padding 2px 10px | font S5 (10px) | same variants as Badge

#### Indicator Dot
- Size: 8px | `radius.full` | success `#3F902B` | error `#CD3546` | warning `#F79009` | info `#4065C5`

---

### Feedback Components

#### Snackbar / Toast
- Fixed bottom-center | `radius.lg` | `shadow.2xl`
- Icon left + message (B3) + optional action button right
- Full feedback color set per variant (bg + border + icon + text)

#### Notification / Alert Banner
- `radius.lg` | padding 16px 20px | full feedback color set
- Icon left | title S1 700 | body B3 400 | close button right (optional)

#### Loader / Spinner
- Inline: 20px | stroke 2px | color `color.action.brand` | 0.8s spin
- Page: 40px centered

#### Skeleton Loader
- `radius.sm` | bg `color.bg.subtle` | animated pulse (opacity 0.5 → 1 → 0.5)
- Match exact shape of content being replaced

#### Stepper
- Completed: circle bg `color.action.brand` + white checkmark + label 700
- Active: circle border `color.action.brand` + label `color.action.brand` 700
- Pending: circle border `color.border.default` + label `color.text.muted`

---

### Overlays

#### Modal / Dialog
| Property | Value |
|---|---|
| Overlay | bg `rgba(0,0,0,0.45)` |
| Panel | centered | `radius.2xl` | `shadow.xl` | bg `color.bg.panel` |
| Widths | 480px (sm) / 560px (md) / 640px (lg) / 100vw bottom-sheet (mobile) |
| Padding | `space.400` (32px) |
| Header | H3 700 + close icon-btn | border-bottom `color.border.default` |
| Footer | right-aligned actions | gap `space.200` |

#### Drawer
- Slides from right | width 480px (default) / 640px (wide) | `shadow.xl`
- Header: 56px | H4 700 + close | border-bottom `color.border.default`
- Body: padding `space.400` | overflow-y auto

#### Popover
- `radius.xl` | `shadow.lg` | border `color.border.default` | padding `space.300`
- Max-width 320px | arrow pointer optional

#### Tooltip
- `radius.md` | bg `#121926` | color white | B4 (12px) | padding 4px 10px | max-width 200px
- Appears on hover/focus | 300ms delay

#### Bottom Sheet (mobile only)
- 100vw width | `radius.2xl` top corners only | `shadow.2xl`
- Handle bar: 32×4px | bg `color.border.strong` | centered top

---

### Layout Components

#### Card
- `radius.xl` (12px) | `shadow.sm` | bg `color.bg.panel` | border `color.border.default` | padding `space.300` (24px)
- Hover (interactive): `shadow.md` + translateY(-1px)

#### Accordion
- Panel: `radius.xl` | border `color.border.default`
- Header: padding 16px 24px | H5 700 | chevron rotates 180° on open
- Body: padding `space.300` | border-top `color.border.default`

#### Divider
- Height: 1px | bg `color.border.default`
- Labeled: centered S3 ALL CAPS | bg `color.bg.page` padding behind label

#### Filter Bar
- Chip default: bg `color.bg.panel` | border `color.border.default` | `radius.full` | padding 6px 14px | B4
- Chip active: bg `color.bg.brand.subtle` | border `color.action.brand` | color `color.action.brand`

#### FAB (Floating Action Button)
- 48×48px | `radius.full` | bg `color.action.brand` | `shadow.lg` | fixed bottom-right (24px offset)
- Icon: 20px white | hover: bg `color.action.brand.hover` + `shadow.xl`

---

## Layouts

### Layout Rules

1. **Mobile-first** — write base styles for `xs` (320px), override upward with `min-width` queries
2. **Named breakpoint tokens only** — never arbitrary pixel values in media queries
3. **Navigation:** `xs`/`sm`/`md` = hamburger drawer; `lg`+ = fixed sidebar
4. **Grid transitions:** 4 columns at `xs`/`sm`, 8 at `md`, 12 at `lg`+
5. **Content margin:** 20px (xs/sm), 40px (md), 56px (lg+)
6. **Avoid max-width queries** — use min-width only

---

### Breakpoints

| Token | Width | Device Target |
|---|---|---|
| `xs` | 320px | Small phones, portrait — base styles |
| `sm` | 480px | Large phones, landscape |
| `md` | 768px | Tablets, portrait — layout shifts begin |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Standard desktop — 12-col grid active |
| `2xl` | 1440px | Large monitors, full-HD |
| `3xl` | 1536px | Wide / ultra-wide screens |

---

### Grid Tokens

| Token | Mobile <768px | Tablet 768–1023px | Desktop ≥1024px |
|---|---|---|---|
| `grid.columns` | 4 | 8 | 12 |
| `grid.gutter` | 16px | 24px | 24px |
| `grid.margin` | 20px | 40px | 56px |
| `grid.max-width` | 100% | 100% | 1280px |

### Container Widths

| Token | Max Width | Use for |
|---|---|---|
| `container.sm` | 640px | Narrow forms, dialogs, sign-in |
| `container.md` | 768px | Article body, centered cards |
| `container.lg` | 1024px | Multi-column with sidebar |
| `container.xl` | 1280px | Default page container, dashboards |
| `container.2xl` | 1440px | Wide analytics, data-heavy tables |
| `container.fluid` | 100% | Full-bleed layouts, maps, canvas |

---

### Layout Behaviour by Breakpoint

| Feature | xs/sm ≤767px | md 768–1023px | lg/xl 1024–1439px | 2xl/3xl ≥1440px |
|---|---|---|---|---|
| Navigation | Hamburger drawer | Hamburger drawer | Fixed sidebar | Fixed sidebar |
| Grid columns | 4 | 8 | 12 | 12 |
| Content margin | 20px | 40px | 56px | 56px |
| Card layout | Single column | 2 columns | 3–4 columns | 4+ columns |
| Table display | Scroll / stacked | Scroll / stacked | Full table | Full table |
| Modal width | 100vw (bottom sheet) | 480px | 560px | 640px |
| Sidebar width | Off-canvas | Off-canvas | 240px | 272px |

---

### Column Span Patterns (12-column desktop grid)

| Content Type | Columns | Notes |
|---|---|---|
| Full width | 12 | Hero sections, full-width tables |
| Main + sidebar | 8 + 4 | Content with contextual panel |
| Two equal panels | 6 + 6 | Side-by-side, split forms |
| Three feature cards | 4 + 4 + 4 | Feature grid, metric groups |
| Four KPI stat cards | 3+3+3+3 | Dashboard KPI row |
| Narrow form (centered) | 6 centered | Sign-in, checkout, confirmation |
| Dashboard (centered) | 10 centered | Content-heavy centered layouts |

> On mobile, all spans collapse to single column (12/12).

### Responsive Typography

| Heading | xs/sm ≤767px | md 768–1023px | lg+ ≥1024px | Weight |
|---|---|---|---|---|
| h1 | 28px (H2 token) | 36px (H1 token) | 48px (D3 token) | 700 |
| h2 | 22px | 28px | 36px | 700 |
| h3 | 18px | 22px | 28px | 700 |

---

### Standard Page Shell — Sidebar + Topbar

```css
/* Topbar */
.topbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 56px; z-index: 200;
  background: var(--color-bg-panel);
  border-bottom: 1px solid var(--color-border-default);
}

/* Sidebar */
.sidebar {
  position: fixed; top: 56px; left: 0;
  width: 272px; height: calc(100vh - 56px);
  background: var(--color-bg-panel);
  border-right: 1px solid var(--color-border-default);
  overflow-y: auto; z-index: 100;
}

/* Main content */
.main {
  margin-left: 272px;
  padding-top: 56px;
  min-height: 100vh;
}

/* Page hero */
.page-hero {
  background: var(--color-bg-panel);
  border-bottom: 1px solid var(--color-border-default);
  padding: 56px 56px 48px;
}

/* Content area */
.content {
  padding: 0 56px 80px;
  background: var(--color-bg-page);
}

/* Mobile ≤809px */
@media (max-width: 809px) {
  .sidebar { transform: translateX(-100%); transition: transform .25s ease; z-index: 150; }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; }
  .page-hero { padding: 32px 20px 28px; }
  .content { padding: 0 20px 60px; }
}
```

---

### Common Layout Patterns

#### Dashboard (12-col)
```
Row 1: Page header            — 12 cols (eyebrow + title + right-side actions)
Row 2: KPI cards              — 4 × 3 cols each
Row 3: Main chart — 8 cols  |  Activity sidebar — 4 cols
Row 4: Full-width data table  — 12 cols
```

#### Detail Page (12-col)
```
Left:  Main content — 8 cols (cards, tables, forms)
Right: Context panel — 4 cols (metadata, related items, actions)
```

#### Form Page (centered)
```
Center: Form container — 6 cols centered | max-width 560px
Header: Page title above form
Footer: Cancel (secondary) + Submit (primary) — right-aligned
```

#### Settings Layout (12-col)
```
Left:  Section navigation — 3 cols (sticky)
Right: Settings panels    — 9 cols (stacked sections with dividers)
```

#### Auth / Sign-in (centered)
```
Center card: max-width 400px | padding space.500 | shadow.md | radius.2xl
Logo: top-centered above card
Form: fields stacked | Submit full-width primary button
Footer: helper links (forgot password, register) below card
```

---

*Yubi Market Design System · Complete Reference v1.1.0*
*Upload this single file to Claude for full design system context — foundations, components, tokens, and layouts.*
