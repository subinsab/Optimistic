# Yubi Market — Grid System Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market grid system." Claude will reference these exact tokens, values, and rules for any layout work.

**Version:** 1.0.0 | **Columns:** 4 / 8 / 12 | **Gutter:** 16–24px | **Max Width:** 1280px | **Token Prefix:** `grid.*`

---

## Rules Claude Must Follow

1. **Mobile-first** — base styles target the smallest viewport; override upward with `min-width` queries only.
2. **Tokens only** — never use arbitrary column counts or gutter values. Always reference named `grid.*` or `container.*` tokens.
3. **4-column mobile** — use a 4-column grid with 16px gutters on viewports below 768px.
4. **8-column tablet** — switch to 8 columns with 24px gutters at 768px–1023px.
5. **12-column desktop** — use 12 columns with 24px gutters and 56px outer margins at 1024px+.
6. **Max width 1280px** — the page container must never exceed 1280px. Center it with `margin: 0 auto`.
7. **Column spans** — use canonical span assignments (Full=12, Main+Sidebar=8+4, Two equal=6+6, Three cards=4×3, Four stat cards=3×4).
8. **No custom containers** — use only the named `container.*` tokens. Never set arbitrary `max-width` values.

---

## Base Unit

| Property | Value |
|---|---|
| **Column system** | 4 / 8 / 12 columns |
| **Gutter (mobile)** | 16px |
| **Gutter (tablet+)** | 24px |
| **Max page width** | 1280px |
| **Token prefix** | `grid.*`, `container.*` |

---

## Grid Tokens

| Token | Mobile < 768px | Tablet 768–1023px | Desktop 1024–1279px | Wide ≥ 1280px |
|---|---|---|---|---|
| `grid.columns` | 4 | 8 | 12 | 12 |
| `grid.gutter` | 16px | 24px | 24px | 24px |
| `grid.margin` | 20px | 40px | 56px | 56px |
| `grid.max-width` | 100% | 100% | 100% | 1280px |

---

## Container Variants

| Token | Max Width | Use for |
|---|---|---|
| `container.sm` | 640px | Narrow forms, dialogs, single-column reading |
| `container.md` | 768px | Article body, centered card layouts, sign-in flows |
| `container.lg` | 1024px | Multi-column with sidebar, detail pages |
| `container.xl` | 1280px | Default page container, dashboard layouts |
| `container.2xl` | 1440px | Wide analytics views, data-heavy tables |
| `container.fluid` | 100% | Full-bleed layouts, maps, editors, canvas |

---

## Column Span Patterns (12-column desktop)

| Content Type | Columns | Notes |
|---|---|---|
| Full width | 12 | Hero sections, full-width tables |
| Main + Sidebar | 8 + 4 | Content area with contextual sidebar |
| Two equal panels | 6 + 6 | Side-by-side comparison, split forms |
| Three cards | 4 + 4 + 4 | Feature cards, stat groups |
| Four stat cards | 3 + 3 + 3 + 3 | Dashboard KPI row |
| Narrow form (centered) | 6 centered | Sign-in, checkout, confirmation forms |
| Dashboard (centered) | 10 centered | Content-heavy centered layouts |

> On mobile, all spans collapse to single column (12/12).

---

## Layout Behaviour Across Breakpoints

| Feature | xs / sm ≤ 767px | md 768–1023px | lg / xl 1024–1439px | 2xl / 3xl ≥ 1440px |
|---|---|---|---|---|
| Navigation | Hamburger drawer | Hamburger drawer | Fixed sidebar | Fixed sidebar |
| Grid columns | 4 | 8 | 12 | 12 |
| Content margin | 20px | 40px | 56px | 56px |
| Card layout | Single column | 2 columns | 3–4 columns | 4+ columns |
| Table display | Scroll / stacked | Scroll / stacked | Full table | Full table |
| Sidebar width | Off-canvas | Off-canvas | 240px | 272px |

---

## CSS Custom Properties

```css
:root {
  /* Grid */
  --grid-columns-mobile:  4;
  --grid-columns-tablet:  8;
  --grid-columns-desktop: 12;

  --grid-gutter-mobile:  16px;
  --grid-gutter-desktop: 24px;

  --grid-margin-mobile:  20px;
  --grid-margin-tablet:  40px;
  --grid-margin-desktop: 56px;

  --grid-max-width: 1280px;

  /* Containers */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;
  --container-fluid: 100%;
}
```

---

*Yubi Market Design System · Grid System Token Reference v1.0.0*
*Upload this file to Claude for full grid system context.*
