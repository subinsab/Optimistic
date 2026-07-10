# Yubi Market — Typography Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market typography system." Claude will reference these exact tokens, sizes, and rules for any UI work.

**Version:** 1.0.0 | **Typeface:** Inter | **Weights:** 400, 700 only | **Styles:** 21

---

## Rules Claude Must Follow

1. **Inter exclusively** — never use Inter, Roboto, or any other typeface in product UI.
2. **Two weights only** — Regular (400) and Bold (700). Never use Light, Medium, SemiBold, or Black.
3. **No custom font sizes** — always reference a named type scale token (D1–D3, H1–H6, B1–B4, S1–S5, T1–T2).
4. **Line height** — headings use `tight` (1.15) or `snug` (1.25); body text always uses `normal` (1.5).
5. **Left-align by default** — center alignment only for hero/empty states; right-align only for numeric table values.
6. **Line length** — body text max `65ch`. Never let paragraphs exceed 80ch.
7. **Uppercase labels** — always paired with `letter-spacing: 0.04em` or more and weight 700.
8. **Fragment Mono** — use only for code snippets, token names, hex values, and monospaced data.

---

## Typeface

| Property | Value |
|---|---|
| **Primary typeface** | Inter |
| **Format** | OTF |
| **Permitted weights** | 400 (Regular), 700 (Bold) |
| **CSS token** | `font.family.base` |
| **Monospace** | Fragment Mono / JetBrains Mono |
| **Mono token** | `font.family.mono` |

---

## Font Stacks

| Platform | Stack |
|---|---|
| Windows | `'Inter', 'Segoe UI', system-ui, sans-serif` |
| macOS / iOS | `'Inter', -apple-system, 'SF Pro Display', sans-serif` |
| Android / Chrome OS | `'Inter', 'Google Sans', Roboto, sans-serif` |
| Code / Data | `'Fragment Mono', 'JetBrains Mono', monospace` |

---

## Type Scale

### Display — Hero, marketing, landing pages

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| D1 | `font.size.display-1` | 72px | 80px (1.11) | Bold 700 | −0.03em |
| D2 | `font.size.display-2` | 56px | 64px (1.14) | Bold 700 | −0.025em |
| D3 | `font.size.display-3` | 40px | 48px (1.2) | Bold 700 | −0.02em |

### Headings — Page titles, section headers, card titles

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| H1 | `font.size.heading-1` | 32px | 40px (1.25) | Bold 700 | −0.02em |
| H2 | `font.size.heading-2` | 28px | 36px (1.29) | Bold 700 | −0.015em |
| H3 | `font.size.heading-3` | 24px | 32px (1.33) | Bold 700 | −0.01em |
| H4 | `font.size.heading-4` | 20px | 28px (1.4) | Bold 700 | −0.01em |
| H5 | `font.size.heading-5` | 18px | 24px (1.33) | Bold 700 | 0 |
| H6 | `font.size.heading-6` | 16px | 22px (1.375) | Bold 700 | 0 |

### Body — Paragraphs, descriptions, form content

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| B1 | `font.size.body-1` | 18px | 28px (1.55) | Regular 400 | 0 |
| B2 | `font.size.body-2` | 16px | 24px (1.5) | Regular 400 | 0 |
| B3 | `font.size.body-3` | 14px | 22px (1.57) | Regular 400 | 0 |
| B4 | `font.size.body-4` | 12px | 18px (1.5) | Regular 400 | 0 |

### Small — Labels, chips, badges, metadata

| Level | Token | Size | Line Height | Weight | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| S1 | `font.size.small-1` | 13px | 20px | Bold 700 | 0.01em | Form labels |
| S2 | `font.size.small-2` | 12px | 18px | Regular 400 | 0 | Helper text, hints |
| S3 | `font.size.small-3` | 11px | 16px | Bold 700 | 0.04em | Section labels (ALL CAPS) |
| S4 | `font.size.small-4` | 11px | 16px | Regular 400 | 0 | Timestamps, meta |
| S5 | `font.size.small-5` | 10px | 14px | Regular 400 | 0.02em | Badge text, pill labels |

### Tiny — Legal, super-compact UI, nav numbers

| Level | Token | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| T1 | `font.size.tiny-1` | 10px | 14px | Bold 700 | 0.06em |
| T2 | `font.size.tiny-2` | 9px | 12px | Regular 400 | 0.04em |

---

## Line Height Tokens

| Token | Value | Use for |
|---|---|---|
| `font.line-height.tight` | 1.15 | Display text, hero headings (D1–D3) |
| `font.line-height.snug` | 1.25 | Section headings (H1–H4) |
| `font.line-height.normal` | 1.5 | Body text (B1–B4) — **default** |
| `font.line-height.relaxed` | 1.625 | Long-form prose, legal disclaimers |

---

## Line Length Tokens

| Token | Value | Use for |
|---|---|---|
| `font.measure.narrow` | `max-width: 45ch` | Captions, form labels |
| `font.measure.body` | `max-width: 65ch` | Body paragraphs — default |
| `font.measure.wide` | `max-width: 80ch` | Wide layout body text |

---

## Text Alignment Rules

| Alignment | When to use |
|---|---|
| **Left** (default) | All UI text: forms, tables, paragraphs, navigation, cards |
| **Center** | Hero sections, empty states, modal titles, onboarding screens only |
| **Right** | Numeric values in tables, currency amounts, right-side metric displays |
| **Justify** | Never — creates uneven spacing in screen typography |

---

## Component Typographic Patterns

### Button
- Label: `S1` — Inter 700, 13px
- No all-caps for standard buttons (all-caps only for icon labels)

### Form Field
- Label: `S1` — Inter 700, 13px
- Input value: `B3` — Inter 400, 14px
- Helper / error text: `S2` — Inter 400, 12px
- Placeholder: `B3` — Inter 400, 14px, color `neutral.400`

### Table
- Column header: `T1` — Inter 700, 10px, ALL CAPS, `letter-spacing: 0.05em`
- Cell text: `B3` — Inter 400, 14px
- Numeric cell: `B3` — Inter 700, 14px (right-aligned)

### Card
- Eyebrow: `S3` — Inter 700, 11px, ALL CAPS
- Title: `H4` or `H5` — Inter 700
- Body: `B3` — Inter 400, 14px
- Meta / footnote: `S2` — Inter 400, 12px

### Badge / Chip
- Text: `S5` — Inter 400, 10px

### Navigation
- Group label: `T1` — Inter 700, 10px, ALL CAPS
- Nav item: `B3` — Inter 400 / 700 (active), 14px

### Modal / Dialog
- Title: `H3` — Inter 700, 24px
- Body: `B2` — Inter 400, 16px
- Action label: `S1` — Inter 700, 13px

---

## CSS Custom Properties

```css
:root {
  /* Families */
  --font-base: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fragment Mono', 'JetBrains Mono', monospace;

  /* Display */
  --font-size-d1: 72px; --line-height-d1: 80px;
  --font-size-d2: 56px; --line-height-d2: 64px;
  --font-size-d3: 40px; --line-height-d3: 48px;

  /* Headings */
  --font-size-h1: 32px; --line-height-h1: 40px;
  --font-size-h2: 28px; --line-height-h2: 36px;
  --font-size-h3: 24px; --line-height-h3: 32px;
  --font-size-h4: 20px; --line-height-h4: 28px;
  --font-size-h5: 18px; --line-height-h5: 24px;
  --font-size-h6: 16px; --line-height-h6: 22px;

  /* Body */
  --font-size-b1: 18px; --line-height-b1: 28px;
  --font-size-b2: 16px; --line-height-b2: 24px;
  --font-size-b3: 14px; --line-height-b3: 22px;
  --font-size-b4: 12px; --line-height-b4: 18px;

  /* Small */
  --font-size-s1: 13px; --line-height-s1: 20px;
  --font-size-s2: 12px; --line-height-s2: 18px;
  --font-size-s3: 11px; --line-height-s3: 16px;
  --font-size-s4: 11px; --line-height-s4: 16px;
  --font-size-s5: 10px; --line-height-s5: 14px;

  /* Tiny */
  --font-size-t1: 10px; --line-height-t1: 14px;
  --font-size-t2: 9px;  --line-height-t2: 12px;

  /* Line Heights */
  --line-height-tight:   1.15;
  --line-height-snug:    1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.625;

  /* Measures */
  --measure-narrow: 45ch;
  --measure-body:   65ch;
  --measure-wide:   80ch;
}
```

---

## Font Kit Contents (Inter.zip)

The downloadable font kit contains all Inter weights in OTF format:

| File | Weight | Style |
|---|---|---|
| Inter-Regular.otf | 400 | Normal ✓ used |
| Inter-Bold.otf | 700 | Normal ✓ used |
| Inter-Light.otf | 300 | Normal |
| Inter-Medium.otf | 500 | Normal |
| Inter-SemiBold.otf | 600 | Normal |
| Inter-Black.otf | 900 | Normal |
| Inter-Regularitalic.otf | 400 | Italic |
| Inter-Bolditalic.otf | 700 | Italic |
| + 8 additional weights | — | — |

> Only Regular (400) and Bold (700) are permitted in Yubi Market product interfaces.

---

*Yubi Market Design System · Typography Token Reference v1.0.0*
*Upload this file to Claude for full typography system context.*
