# Pagination — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Navigation (14/54) | **Status:** Stable

---

## Overview

Allows users to navigate through multi-page datasets. Shows current page, total pages, prev/next controls, ellipsis for long ranges, and an optional per-page selector.

---

## Variants

| Variant       | Description                                      |
|---------------|--------------------------------------------------|
| Full          | Page numbers + ellipsis + prev/next              |
| Simple        | Prev/Next only with "Page X of Y" text           |
| With selector | Full pagination + rows-per-page dropdown         |

---

## Measurements

| Property              | Value          |
|-----------------------|----------------|
| Button size           | 34 × 34px      |
| Button radius         | 8px            |
| Border width          | 1px            |
| Font size             | 13px           |
| Font weight (default) | 500            |
| Font weight (active)  | 700            |
| Active background     | #FE5104        |
| Active text           | #ffffff        |
| Disabled opacity      | 0.35           |
| Gap between items     | 4px            |

---

## HTML

```html
<nav aria-label="Pagination" class="ym-pagination">
  <!-- Previous button -->
  <button class="ym-pg-btn" aria-label="Previous">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <!-- Page numbers -->
  <button class="ym-pg-btn">1</button>
  <span class="ym-pg-ellipsis">···</span>
  <button class="ym-pg-btn">4</button>
  <button class="ym-pg-btn pg-active" aria-current="page">5</button>
  <button class="ym-pg-btn">6</button>
  <span class="ym-pg-ellipsis">···</span>
  <button class="ym-pg-btn">20</button>

  <!-- Next button -->
  <button class="ym-pg-btn" aria-label="Next">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</nav>
```

---

## CSS

```css
.ym-pagination { display: flex; align-items: center; gap: 4px; }
.ym-pg-btn {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-panel); color: var(--text-2);
  cursor: pointer; display: flex;
  align-items: center; justify-content: center;
  font-size: 13px; font-weight: 500;
  transition: background 150ms, border-color 150ms, color 150ms;
  user-select: none;
}
.ym-pg-btn:hover:not(.pg-disabled):not(.pg-active) {
  background: var(--bg-inset);
  border-color: var(--text-3);
  color: var(--text-1);
}
.ym-pg-btn.pg-active {
  background: #FE5104; border-color: #FE5104;
  color: #fff; font-weight: 700;
}
.ym-pg-btn.pg-disabled { opacity: 0.35; cursor: not-allowed; }
.ym-pg-ellipsis {
  width: 34px; height: 34px; display: flex;
  align-items: center; justify-content: center;
  color: var(--text-3); letter-spacing: 1px;
}
.ym-pg-info { font-size: 12.5px; color: var(--text-3); }
```

---

## JavaScript (Page range helper)

```javascript
function getVisiblePages(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
```

---

## Accessibility

- Wrap in `<nav aria-label="Pagination">`
- `aria-current="page"` on the active page button
- `aria-label="Previous"` / `aria-label="Next"` on arrow buttons
- `disabled` attribute + `aria-disabled="true"` when at bounds

---

## Related Components

- **Table** (`table.html`) — most common host for pagination
- **List** (`list.html`) — list views with pagination
- **Tabs** (`tabs.html`) — section navigation

---

*Yubi Market Design System · Pagination v1.0.0 · Internal Use*
