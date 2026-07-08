# Logo — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (36/54) | **Status:** Stable

---

## Overview

The Yubi Market brand mark. Three sizes, three surface variants (light, dark, brand), mark-only option, and clear-space rules. Always links to the dashboard home.

---

## Sizes

| Size | Class      | Mark      | Name font | Tagline | Radius | Gap |
|------|------------|-----------|-----------|---------|--------|-----|
| S    | `.logo-sm` | 28 × 28px | 15px / 800 | 9px   | 7px    | 8px |
| M    | `.logo-md` | 36 × 36px | 19px / 800 | 10px  | 9px    | 10px |
| L    | `.logo-lg` | 48 × 48px | 26px / 800 | 12px  | 12px   | 12px |

---

## Surface Variants

| Variant       | Class             | Mark bg                   | Name colour | Tagline colour          |
|---------------|-------------------|---------------------------|-------------|-------------------------|
| Light         | (default)         | #FE5104                   | var(--text-1) | var(--text-3)          |
| Dark          | `.logo-on-dark`   | #FE5104                   | #F8FAFC     | rgba(248,250,252,.5)    |
| Brand         | `.logo-on-brand`  | rgba(255,255,255,.2)      | #fff        | rgba(255,255,255,.7)    |

---

## HTML

```html
<!-- Medium logo (default) -->
<a href="/" class="ym-logo logo-md" aria-label="Yubi Market home">
  <div class="ym-logo-mark" aria-hidden="true">
    <svg class="logo-mark-inner" viewBox="0 0 20 20">
      <path d="M4 10l4 4 8-8"/>
    </svg>
  </div>
  <div class="ym-logo-wordmark">
    <span class="ym-logo-name">Yubi Market</span>
    <span class="ym-logo-tagline">Design System</span>
  </div>
</a>

<!-- On dark surface -->
<a href="/" class="ym-logo logo-md logo-on-dark">...</a>

<!-- On brand (#FE5104) surface -->
<a href="/" class="ym-logo logo-md logo-on-brand">...</a>

<!-- Mark only (compact nav / favicon) -->
<a href="/" aria-label="Yubi Market home">
  <div class="ym-logo-mark" style="width:36px;height:36px;border-radius:9px;">
    <svg class="logo-mark-inner" viewBox="0 0 20 20"><path d="M4 10l4 4 8-8"/></svg>
  </div>
</a>
```

---

## CSS

```css
.ym-logo {
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; flex-shrink: 0;
}
.ym-logo-mark {
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; background: #FE5104; flex-shrink: 0;
}
.ym-logo-wordmark { display: flex; flex-direction: column; line-height: 1; }
.ym-logo-name    { font-weight: 800; letter-spacing: -.02em; color: var(--text-1); }
.ym-logo-tagline { font-weight: 500; color: var(--text-3); margin-top: 1px; }

/* Sizes */
.logo-sm .ym-logo-mark    { width: 28px; height: 28px; border-radius: 7px; }
.logo-sm .ym-logo-name    { font-size: 15px; }
.logo-sm .ym-logo-tagline { font-size: 9px; letter-spacing: .04em; }

.logo-md .ym-logo-mark    { width: 36px; height: 36px; border-radius: 9px; }
.logo-md .ym-logo-name    { font-size: 19px; }
.logo-md .ym-logo-tagline { font-size: 10px; letter-spacing: .04em; }

.logo-lg .ym-logo-mark    { width: 48px; height: 48px; border-radius: 12px; }
.logo-lg .ym-logo-name    { font-size: 26px; }
.logo-lg .ym-logo-tagline { font-size: 12px; }

/* Dark surface */
.logo-on-dark .ym-logo-name    { color: #F8FAFC; }
.logo-on-dark .ym-logo-tagline { color: rgba(248,250,252,.5); }

/* Brand surface */
.logo-on-brand .ym-logo-mark    { background: rgba(255,255,255,.2); }
.logo-on-brand .ym-logo-name    { color: #fff; }
.logo-on-brand .ym-logo-tagline { color: rgba(255,255,255,.7); }

/* SVG icon inside mark */
.logo-mark-inner {
  width: 60%; height: 60%;
  stroke: #fff; stroke-width: 2.5;
  stroke-linecap: round; stroke-linejoin: round; fill: none;
}
```

---

## Clear Space Rules

| Scenario          | Minimum clear space         |
|-------------------|-----------------------------|
| All directions    | ½ × mark width (e.g. 18px for M) |
| Next to nav items | At least gap + 8px          |
| Against edge      | Equal to or greater than mark padding |

---

## Do / Don't

**Do:**
- Use the mark on its native accent (#FE5104) background
- Maintain minimum clear space on all sides
- Link the logo to the home dashboard
- Use `.logo-on-dark` on dark or coloured surfaces
- Use mark-only at very small sizes where wordmark is illegible

**Don't:**
- Change the mark colour or opacity
- Stretch, rotate, or distort proportions
- Place on busy photographic backgrounds without a solid backing
- Use the light variant on dark surfaces
- Add drop-shadows, outlines, or gradients to the mark

---

## Accessibility

- Wrap in `<a href="/">` with `aria-label="Yubi Market home"`
- Add `aria-hidden="true"` to the mark SVG container
- The wordmark text is visible text — do not hide it with `aria-hidden`
- At very small sizes (mark-only), `aria-label` on the anchor is the only identifier

---

## Related Components

- **Colors** (`colors.html`) — brand colour tokens including accent `#FE5104`
- **Typography** (`typography.html`) — font weights and scales
- **Top Nav** (`topnav.html`) — primary placement context for the logo

---

*Yubi Market Design System · Logo v1.0.0 · Internal Use*
