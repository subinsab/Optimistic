# List — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (30/54) | **Status:** Stable

---

## Overview

Vertical list of rows for loan summaries, transaction history, lender cards, and navigation menus. Icon tile or avatar leading slot, title + subtitle content area, and a flexible trailing slot (badge, amount, meta, chevron). Default, compact, and flush variants with optional section headers.

---

## Variants

| Variant  | Modifier class    | Description                           |
|----------|-------------------|---------------------------------------|
| Default  | `.ym-list`        | Border, 12px radius, 13px 16px padding |
| Compact  | `.list-compact`   | Reduced to 9px 14px, smaller leading  |
| Flush    | `.list-flush`     | No border/radius, transparent bg      |

---

## Slots

| Slot     | Class              | Description                              |
|----------|--------------------|------------------------------------------|
| Leading  | `.list-icon`       | 36×36px tile, 9px radius, accent tinted  |
| Leading  | `.list-avatar`     | 36px circle, custom bg, initials text    |
| Content  | `.list-content`    | Flex column with title + subtitle        |
| Trailing | `.list-badge`      | Status pill (10px/700, 20px radius)      |
| Trailing | `.list-amount`     | ₹ amount, `.positive` or `.negative`     |
| Trailing | `.list-meta`       | Small grey meta text                     |
| Trailing | `.list-chevron`    | Right-arrow SVG for navigable items      |

---

## Measurements

| Property                | Value              |
|-------------------------|--------------------|
| Item padding (default)  | 13px 16px          |
| Item padding (compact)  | 9px 14px           |
| Gap between slots       | 12px               |
| Title font              | 13px / 600         |
| Subtitle font           | 11.5px / 400       |
| Icon tile size          | 36 × 36px / 9px r  |
| Icon tile (compact)     | 28 × 28px / 7px r  |
| Avatar size             | 36px / 50% radius  |
| Border radius           | 12px               |
| Section header font     | 10px / 700 / uppercase |
| Hover bg                | var(--bg-inset)    |
| Selected bg             | rgba(64,101,197,.06) |
| Positive amount colour  | #3F902B            |
| Negative amount colour  | #CD3546            |

---

## HTML

```html
<div class="ym-list">

  <!-- Section header (optional) -->
  <div class="list-section-header">Today</div>

  <!-- Icon + title + subtitle + badge -->
  <div class="ym-list-item interactive">
    <div class="list-icon"><!-- 16px SVG --></div>
    <div class="list-content">
      <div class="list-title">Working Capital Loan</div>
      <div class="list-subtitle">Due 15 Apr · EMI ₹38,450</div>
    </div>
    <span class="list-badge list-badge-success">Active</span>
  </div>

  <!-- Avatar + title + amount -->
  <div class="ym-list-item">
    <div class="list-avatar" style="background:#4065C5">AK</div>
    <div class="list-content">
      <div class="list-title">EMI Payment</div>
      <div class="list-subtitle">11:34 AM</div>
    </div>
    <span class="list-amount negative">−₹38,450</span>
  </div>

  <!-- Link item with chevron -->
  <a href="#" class="ym-list-item interactive">
    <div class="list-content">
      <div class="list-title">Tata Capital</div>
      <div class="list-subtitle">AAA · 9.5% yield</div>
    </div>
    <!-- Chevron SVG -->
  </a>

</div>

<!-- Compact: class="ym-list list-compact" -->
<!-- Flush:   class="ym-list list-flush"   -->
```

---

## CSS

```css
.ym-list { background: var(--bg-panel); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.ym-list-item { display: flex; align-items: center; gap: 12px; padding: 13px 16px; border-bottom: 1px solid var(--border); transition: background 120ms ease; }
.ym-list-item:last-child { border-bottom: none; }
.ym-list-item:hover { background: var(--bg-inset); }

.list-icon   { width: 36px; height: 36px; border-radius: 9px; background: var(--accent-dim); color: var(--accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.list-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; }
.list-content { flex: 1; min-width: 0; }
.list-title   { font-size: 13px; font-weight: 600; color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.list-subtitle { font-size: 11.5px; color: var(--text-3); margin-top: 2px; }

.list-amount { font-size: 13px; font-weight: 700; flex-shrink: 0; }
.list-amount.positive { color: #3F902B; }
.list-amount.negative { color: #CD3546; }

.list-badge { display: inline-flex; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; flex-shrink: 0; }
.list-badge-success { background: rgba(63,144,43,.1); color: #3F902B; }
.list-badge-warning { background: rgba(217,151,0,.1); color: #B07E00; }
.list-badge-error   { background: rgba(205,53,70,.1); color: #CD3546; }
.list-badge-info    { background: rgba(64,101,197,.1); color: #4065C5; }

.list-section-header { padding: 7px 16px; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-3); background: var(--bg-inset); border-bottom: 1px solid var(--border); }

.ym-list.list-compact .ym-list-item { padding: 9px 14px; gap: 10px; }
.ym-list.list-compact .list-icon, .ym-list.list-compact .list-avatar { width: 28px; height: 28px; }
.ym-list.list-flush { border: none; border-radius: 0; background: transparent; }
.ym-list.list-flush .ym-list-item { padding: 12px 0; }

.ym-list-item.selected { background: rgba(64,101,197,.06); }
.ym-list-item.selected .list-title { color: #4065C5; }
```

---

## Accessibility

- Use `role="list"` on `.ym-list` and `role="listitem"` on each `.ym-list-item` for non-`<ul>` markup
- Interactive items: use `<a href>` or `<button>` as the item element for keyboard focus
- Navigable items: `aria-label` on the item with meaningful text (e.g. "View Tata Capital lender profile")
- Selected: `aria-selected="true"` on `.ym-list-item.selected`

---

## Related Components

- **Table** (`table.html`) — structured tabular data with sortable columns
- **Avatar** (`avatar.html`) — avatar component used in list leading slot
- **Badge** (`badge.html`) — status labels used in list trailing slot

---

*Yubi Market Design System · List v1.0.0 · Internal Use*
