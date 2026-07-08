# Divider — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (47/54) | **Status:** Stable

---

## Overview

Horizontal and vertical separators for grouping content regions, separating list items, and structuring form sections. Supports dashed, thick, labelled, and coloured variants. Vertical divider available for inline stat bars and button groups.

---

## Variants

| Variant         | Description                                              |
|-----------------|----------------------------------------------------------|
| Default         | 1px solid `var(--border)` horizontal rule                |
| Dashed          | `.ym-divider-dashed` — dashed border-top                 |
| Thick           | `.ym-divider-thick` — 2px border-top                     |
| Labelled centre | `.ym-divider-label` — flex with `::before`/`::after` lines |
| Labelled left   | `.ym-divider-label.label-left` — short 24px leading line |
| Coloured        | `.ym-divider-accent/success/error/warning`               |
| Vertical        | `.ym-divider-v` — inline-block 1px wide element          |

---

## Measurements

| Property              | Value                        |
|-----------------------|------------------------------|
| Default thickness     | 1px                          |
| Thick thickness       | 2px                          |
| Label font            | 11px / 700 / uppercase       |
| Label letter-spacing  | 0.06em                       |
| Label gap             | 12px                         |
| Label-left max-width  | 24px (leading line)          |
| Vertical width        | 1px                          |
| dv-sm margin          | 0 8px                        |
| dv-md margin          | 0 12px                       |
| dv-lg margin          | 0 20px                       |
| Accent colour         | `var(--accent)` (#FE5104)    |
| Success colour        | #3F902B                      |
| Error colour          | #CD3546                      |
| Warning colour        | #D98F00                      |

---

## HTML

```html
<!-- Default -->
<hr class="ym-divider" />

<!-- Dashed -->
<hr class="ym-divider ym-divider-dashed" />

<!-- Thick -->
<hr class="ym-divider ym-divider-thick" />

<!-- Labelled — centred -->
<div class="ym-divider-label">
  <span class="divider-text">or continue with</span>
</div>

<!-- Labelled — left aligned -->
<div class="ym-divider-label label-left">
  <span class="divider-text">Section Title</span>
</div>

<!-- Coloured -->
<hr class="ym-divider ym-divider-accent" />
<hr class="ym-divider ym-divider-success" />
<hr class="ym-divider ym-divider-error" />
<hr class="ym-divider ym-divider-warning" />

<!-- Vertical (inline in flex row) -->
<div style="display:flex; align-items:center; height:40px;">
  <span>Item A</span>
  <div class="ym-divider-v dv-md" style="height:20px;"></div>
  <span>Item B</span>
</div>
```

---

## CSS

```css
.ym-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 0;
}
.ym-divider-thick  { border-top-width: 2px; }
.ym-divider-dashed { border-top-style: dashed; }

/* Coloured */
.ym-divider-accent  { border-top-color: var(--accent); }
.ym-divider-success { border-top-color: #3F902B; }
.ym-divider-error   { border-top-color: #CD3546; }
.ym-divider-warning { border-top-color: #D98F00; }

/* Labelled */
.ym-divider-label {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ym-divider-label::before,
.ym-divider-label::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--border);
}
.ym-divider-label.label-left::before { max-width: 24px; }

.divider-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--text-3);
  white-space: nowrap;
}

/* Vertical */
.ym-divider-v {
  display: inline-block;
  width: 1px;
  background: var(--border);
  flex-shrink: 0;
}
.ym-divider-v.dv-sm { margin: 0 8px; }
.ym-divider-v.dv-md { margin: 0 12px; }
.ym-divider-v.dv-lg { margin: 0 20px; }
```

---

## Accessibility

- Use `<hr>` for semantic horizontal rules — it has implicit `role="separator"`
- For labelled dividers using `<div>`, add `role="separator"` and `aria-label` if the label text is decorative
- Vertical dividers (`<div>`) should have `role="separator"` and `aria-orientation="vertical"`
- Do not rely on divider colour alone to convey meaning — coloured variants are decorative

---

## Related Components

- **Section Header** (`list.html`) — list section labels above dividers
- **Card** (`card.html`) — inner card dividers between content blocks
- **Form** (`input.html`) — dividers between form field groups

---

*Yubi Market Design System · Divider v1.0.0 · Internal Use*
