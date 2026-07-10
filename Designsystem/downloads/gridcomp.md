# Grid — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (51/54) | **Status:** Stable

---

## Overview

12-column CSS Grid layout system for dashboard KPIs, loan portfolio views, and page scaffolding. Container widths, responsive column spans, gap variants, and offset utilities. No float hacks — pure CSS Grid.

---

## Tokens

| Property         | Value     |
|------------------|-----------|
| Columns          | 12        |
| Default gap      | 24px      |
| Gap sm           | 12px      |
| Gap lg           | 32px      |
| Container max    | 1280px    |
| Container padding | 0 24px   |
| Container sm     | 640px     |
| Container md     | 896px     |
| Container lg     | 1024px    |
| Breakpoint lg    | ≤ 1023px  |
| Breakpoint md    | ≤ 767px   |
| Breakpoint sm    | ≤ 479px   |

---

## Classes

### Container

| Class                   | Description                  |
|-------------------------|------------------------------|
| `.ym-container`         | Max 1280px, centred, 24px pad|
| `.ym-container-fluid`   | Full width, no max            |
| `.ym-container-sm`      | Max 640px                     |
| `.ym-container-md`      | Max 896px                     |
| `.ym-container-lg`      | Max 1024px                    |

### Row gap modifiers

| Class           | Gap   |
|-----------------|-------|
| `.ym-row`       | 24px  |
| `.ym-row-gap-sm`| 12px  |
| `.ym-row-gap-lg`| 32px  |
| `.ym-row-gap-0` | 0     |

### Column spans

`.ym-col-1` through `.ym-col-12` — `grid-column: span N`

### Column start (offset)

`.ym-col-start-{1|2|3|4|5|7|9}` — `grid-column-start: N`

---

## HTML

```html
<!-- Fluid-width container -->
<div class="ym-container">

  <!-- 4 equal columns (KPI dashboard) -->
  <div class="ym-row">
    <div class="ym-col-3"><!-- KPI card --></div>
    <div class="ym-col-3"><!-- KPI card --></div>
    <div class="ym-col-3"><!-- KPI card --></div>
    <div class="ym-col-3"><!-- KPI card --></div>
  </div>

  <!-- 8 + 4 main + sidebar layout -->
  <div class="ym-row">
    <div class="ym-col-8"><!-- Main content --></div>
    <div class="ym-col-4"><!-- Sidebar --></div>
  </div>

  <!-- Centred 6-col form (offset col-start-4) -->
  <div class="ym-row">
    <div class="ym-col-6 ym-col-start-4"><!-- Centred form --></div>
  </div>

  <!-- Tight gap -->
  <div class="ym-row ym-row-gap-sm">
    <div class="ym-col-4"><!-- ... --></div>
    <div class="ym-col-4"><!-- ... --></div>
    <div class="ym-col-4"><!-- ... --></div>
  </div>

</div>
```

---

## CSS

```css
.ym-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.ym-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  width: 100%;
}
.ym-row-gap-sm { gap: 12px; }
.ym-row-gap-lg { gap: 32px; }
.ym-row-gap-0  { gap: 0; }

/* Column spans 1–12 */
.ym-col-1  { grid-column: span 1; }
.ym-col-2  { grid-column: span 2; }
.ym-col-3  { grid-column: span 3; }
.ym-col-4  { grid-column: span 4; }
.ym-col-5  { grid-column: span 5; }
.ym-col-6  { grid-column: span 6; }
.ym-col-7  { grid-column: span 7; }
.ym-col-8  { grid-column: span 8; }
.ym-col-9  { grid-column: span 9; }
.ym-col-10 { grid-column: span 10; }
.ym-col-11 { grid-column: span 11; }
.ym-col-12 { grid-column: span 12; }

/* Offset utilities */
.ym-col-start-1 { grid-column-start: 1; }
.ym-col-start-2 { grid-column-start: 2; }
.ym-col-start-3 { grid-column-start: 3; }
.ym-col-start-4 { grid-column-start: 4; }
.ym-col-start-5 { grid-column-start: 5; }
.ym-col-start-7 { grid-column-start: 7; }
.ym-col-start-9 { grid-column-start: 9; }

/* Responsive */
@media (max-width: 1023px) {
  .ym-col-lg-6  { grid-column: span 6; }
  .ym-col-lg-12 { grid-column: span 12; }
}
@media (max-width: 767px) {
  .ym-col-md-6  { grid-column: span 6; }
  .ym-col-md-12 { grid-column: span 12; }
  .ym-row       { gap: 16px; }
}
@media (max-width: 479px) {
  .ym-col-sm-12 { grid-column: span 12; }
}
```

---

## Common layout patterns

| Pattern           | Classes                              |
|-------------------|--------------------------------------|
| 4 equal KPIs      | `ym-col-3` × 4                       |
| Main + sidebar    | `ym-col-8` + `ym-col-4`             |
| 3-col cards       | `ym-col-4` × 3                       |
| Full-width row    | `ym-col-12`                          |
| Centred form      | `ym-col-6 ym-col-start-4`            |
| 2-col form fields | `ym-col-6` × 2                       |

---

## Related Components

- **Spacing** (`spacing.html`) — gap, margin, and padding tokens used with grid
- **Sidemenu + Navbar** (`sidemenu-with-navbar.html`) — page-level layout template
- **Table** (`table.html`) — full-width `ym-col-12` use case

---

*Yubi Market Design System · Grid v1.0.0 · Internal Use*
