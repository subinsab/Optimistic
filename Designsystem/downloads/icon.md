# Icon — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (50/54) | **Status:** Stable

---

## Overview

Size and colour token classes for inline SVG icons, plus icon tile wrappers with tinted and filled background variants. Used throughout buttons, list items, notification cards, status indicators, and data tables.

---

## Tokens

### Size tokens

| Class          | Pixel value |
|----------------|-------------|
| `.ym-icon-xs`  | 12 × 12px   |
| `.ym-icon-sm`  | 16 × 16px   |
| `.ym-icon-md`  | 20 × 20px   |
| `.ym-icon-lg`  | 24 × 24px   |
| `.ym-icon-xl`  | 32 × 32px   |
| `.ym-icon-2xl` | 40 × 40px   |

### Colour tokens

| Class               | Colour             |
|---------------------|--------------------|
| `.ym-icon-muted`    | `var(--text-3)`    |
| `.ym-icon-primary`  | `var(--text-1)`    |
| `.ym-icon-accent`   | `var(--accent)` (#FE5104) |
| `.ym-icon-brand`    | `#4065C5`          |
| `.ym-icon-success`  | `#3F902B`          |
| `.ym-icon-warning`  | `#D98F00`          |
| `.ym-icon-danger`   | `#CD3546`          |

### Icon tile sizes

| Class           | Container | Radius |
|-----------------|-----------|--------|
| `.icon-tile-xs` | 24px      | 6px    |
| `.icon-tile-sm` | 32px      | 8px    |
| `.icon-tile-md` | 40px      | 10px   |
| `.icon-tile-lg` | 48px      | 12px   |
| `.icon-tile-xl` | 56px      | 14px   |

### Tile colour variants

| Class                  | Background                   | Foreground |
|------------------------|------------------------------|------------|
| `.tile-default`        | `var(--bg-inset)` + border   | `var(--text-2)` |
| `.tile-accent`         | `var(--accent-dim)`          | `var(--accent)` |
| `.tile-brand`          | `rgba(64,101,197,.1)`        | `#4065C5`  |
| `.tile-success`        | `rgba(63,144,43,.1)`         | `#3F902B`  |
| `.tile-warning`        | `rgba(217,151,0,.1)`         | `#D98F00`  |
| `.tile-danger`         | `rgba(205,53,70,.1)`         | `#CD3546`  |
| `.tile-filled-brand`   | `#4065C5`                    | `#fff`     |
| `.tile-filled-accent`  | `var(--accent)`              | `#fff`     |
| `.tile-filled-success` | `#3F902B`                    | `#fff`     |

---

## HTML

```html
<!-- Inline icon: size + colour tokens -->
<span class="ym-icon ym-icon-md ym-icon-brand" aria-hidden="true">
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
    <!-- SVG path here -->
  </svg>
</span>

<!-- Icon tile: tinted background -->
<span class="ym-icon-tile icon-tile-md tile-brand" aria-hidden="true">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <!-- SVG path here -->
  </svg>
</span>

<!-- Accessible icon (standalone / meaningful) -->
<span class="ym-icon ym-icon-lg ym-icon-success"
      role="img" aria-label="Application approved">
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
    <!-- check SVG path -->
  </svg>
</span>
```

---

## CSS

```css
/* Icon wrapper */
.ym-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: currentColor;
}

/* Size tokens */
.ym-icon-xs  { width: 12px; height: 12px; }
.ym-icon-sm  { width: 16px; height: 16px; }
.ym-icon-md  { width: 20px; height: 20px; }
.ym-icon-lg  { width: 24px; height: 24px; }
.ym-icon-xl  { width: 32px; height: 32px; }
.ym-icon-2xl { width: 40px; height: 40px; }

/* Colour tokens */
.ym-icon-muted   { color: var(--text-3); }
.ym-icon-primary { color: var(--text-1); }
.ym-icon-accent  { color: var(--accent); }
.ym-icon-brand   { color: #4065C5; }
.ym-icon-success { color: #3F902B; }
.ym-icon-warning { color: #D98F00; }
.ym-icon-danger  { color: #CD3546; }

/* Tile wrapper */
.ym-icon-tile { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.icon-tile-xs { width: 24px; height: 24px; border-radius: 6px; }
.icon-tile-sm { width: 32px; height: 32px; border-radius: 8px; }
.icon-tile-md { width: 40px; height: 40px; border-radius: 10px; }
.icon-tile-lg { width: 48px; height: 48px; border-radius: 12px; }
.icon-tile-xl { width: 56px; height: 56px; border-radius: 14px; }

.tile-default { background: var(--bg-inset); color: var(--text-2); border: 1px solid var(--border); }
.tile-accent  { background: var(--accent-dim); color: var(--accent); }
.tile-brand   { background: rgba(64,101,197,.1); color: #4065C5; }
.tile-success { background: rgba(63,144,43,.1); color: #3F902B; }
.tile-warning { background: rgba(217,151,0,.1); color: #D98F00; }
.tile-danger  { background: rgba(205,53,70,.1); color: #CD3546; }
.tile-filled-brand   { background: #4065C5; color: #fff; }
.tile-filled-accent  { background: var(--accent); color: #fff; }
.tile-filled-success { background: #3F902B; color: #fff; }
```

---

## Accessibility

- Decorative icons: `aria-hidden="true"` on the wrapper `<span>`
- Meaningful standalone icons: `role="img"` + `aria-label="[description]"` on the wrapper
- Never use `<i>` for icons — use `<span>` or `<svg>` directly
- Ensure adequate colour contrast when using muted or tinted variants on coloured backgrounds
- SVGs should have `fill="none"` and use `stroke="currentColor"` to inherit colour token

---

## Related Components

- **Icon Button** (`iconbutton.html`) — icon inside a pressable button
- **Button** (`button.html`) — buttons with leading/trailing icon slots
- **Iconography** (`iconography.html`) — full icon library and naming conventions

---

*Yubi Market Design System · Icon v1.0.0 · Internal Use*
