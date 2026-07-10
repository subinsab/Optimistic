# Table — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (29/54) | **Status:** Stable

---

## Overview

Data tables for loan listings, borrower profiles, repayment schedules, and portfolio summaries. Sortable columns, row selection with checkboxes, status badges, action buttons, and footer pagination. Default, striped, and compact variants.

---

## Variants

| Variant  | Class modifier      | Description                             |
|----------|---------------------|-----------------------------------------|
| Default  | `.ym-table`         | Row hover, border-bottom dividers       |
| Striped  | `.table-striped`    | Alternating even-row background         |
| Compact  | `.table-compact`    | Reduced padding 7px 14px, 12px text     |

---

## Status Badges

| Badge class          | Colour   | Use case                  |
|----------------------|----------|---------------------------|
| `.tbl-badge-success` | Green    | Active, Approved, Paid    |
| `.tbl-badge-warning` | Amber    | Pending, Filling, Due     |
| `.tbl-badge-error`   | Red      | Overdue, Failed, Rejected |
| `.tbl-badge-info`    | Blue     | Under Review, Processing  |
| `.tbl-badge-neutral` | Grey     | Closed, Archived, Draft   |

---

## Measurements

| Property               | Value                           |
|------------------------|---------------------------------|
| Header font            | 11px / 700 / uppercase          |
| Header letter-spacing  | 0.06em                          |
| Cell font              | 13px / 400                      |
| Cell padding (default) | 12px 16px                       |
| Cell padding (compact) | 7px 14px                        |
| Row hover              | var(--bg-inset)                 |
| Row selected bg        | rgba(64,101,197,.06)            |
| Border radius          | 12px                            |
| Badge font             | 11px / 700                      |
| Badge radius           | 20px                            |
| Pagination btn size    | 28px × 28px                     |
| Pagination btn radius  | 7px                             |
| Active page bg         | var(--accent)                   |

---

## HTML

```html
<div class="ym-table-wrap">
  <table class="ym-table">
    <thead>
      <tr>
        <th><input type="checkbox" class="tbl-check" onchange="toggleAll(this)"></th>
        <th class="sortable" onclick="sortTable(1)">
          Borrower
          <span class="sort-icon">
            <svg class="sort-up" width="7" height="5" viewBox="0 0 7 5"><path d="M3.5 0L7 5H0z" fill="currentColor"/></svg>
            <svg class="sort-down" width="7" height="5" viewBox="0 0 7 5"><path d="M3.5 5L0 0h7z" fill="currentColor"/></svg>
          </span>
        </th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox" class="tbl-check row-check"></td>
        <td>Amit Kumar</td>
        <td><span class="tbl-badge tbl-badge-success">Active</span></td>
        <td>
          <div class="tbl-actions">
            <button class="tbl-icon-btn"><!-- eye SVG --></button>
            <button class="tbl-icon-btn"><!-- edit SVG --></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="ym-table-footer">
    <span>Showing 5 of 128 results</span>
    <div class="ym-table-pages">
      <button class="tpg-btn" disabled>‹</button>
      <button class="tpg-btn active">1</button>
      <button class="tpg-btn">2</button>
      <button class="tpg-btn">›</button>
    </div>
  </div>
</div>

<!-- Variants -->
<!-- Striped: <table class="ym-table table-striped"> -->
<!-- Compact: <table class="ym-table table-compact"> -->
```

---

## CSS

```css
.ym-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); background: var(--bg-panel); }
.ym-table { width: 100%; border-collapse: collapse; }
.ym-table thead tr { background: var(--bg-inset); border-bottom: 1px solid var(--border); }
.ym-table th { padding: 10px 16px; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-3); }
.ym-table th.sortable { cursor: pointer; }
.ym-table td { padding: 12px 16px; font-size: 13px; color: var(--text-2); border-bottom: 1px solid var(--border); }
.ym-table tr:last-child td { border-bottom: none; }
.ym-table tbody tr:hover { background: var(--bg-inset); }
.ym-table.table-striped tbody tr:nth-child(even) { background: var(--bg-inset); }
.ym-table.table-compact th, .ym-table.table-compact td { padding: 7px 14px; font-size: 12px; }

/* Sort icons */
.sort-icon { display: inline-flex; flex-direction: column; gap: 1px; margin-left: 5px; vertical-align: middle; opacity: .35; }
.ym-table th.sort-asc .sort-icon,
.ym-table th.sort-desc .sort-icon { opacity: 1; }
.ym-table th.sort-asc  .sort-up   { color: var(--accent); }
.ym-table th.sort-desc .sort-down { color: var(--accent); }

/* Badges */
.tbl-badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.tbl-badge-success { background: rgba(63,144,43,.1);  color: #3F902B; }
.tbl-badge-warning { background: rgba(217,151,0,.1);  color: #B07E00; }
.tbl-badge-error   { background: rgba(205,53,70,.1);  color: #CD3546; }
.tbl-badge-info    { background: rgba(64,101,197,.1); color: #4065C5; }
.tbl-badge-neutral { background: var(--bg-inset); color: var(--text-3); border: 1px solid var(--border); }

/* Selection */
.ym-table tbody tr.row-selected { background: rgba(64,101,197,.06); }
.tbl-check { width: 16px; height: 16px; border-radius: 4px; border: 2px solid var(--border); cursor: pointer; appearance: none; }
.tbl-check:checked { background: #4065C5; border-color: #4065C5; }

/* Footer */
.ym-table-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-3); }
.ym-table-pages { display: flex; gap: 4px; }
.tpg-btn { min-width: 28px; height: 28px; border-radius: 7px; border: 1px solid var(--border); background: var(--bg-panel); color: var(--text-2); font-size: 12px; cursor: pointer; }
.tpg-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
.tpg-btn:disabled { opacity: .4; cursor: not-allowed; }
```

---

## JavaScript

```javascript
let sortDir = {};

function sortTable(colIndex) {
  const table = document.querySelector('.ym-table');
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];
  sortDir[colIndex] = sortDir[colIndex] === 'asc' ? 'desc' : 'asc';
  const asc = sortDir[colIndex] === 'asc';

  rows.sort((a, b) => {
    const valA = a.cells[colIndex]?.innerText.trim() || '';
    const valB = b.cells[colIndex]?.innerText.trim() || '';
    return asc
      ? valA.localeCompare(valB, 'en', { numeric: true })
      : valB.localeCompare(valA, 'en', { numeric: true });
  });

  table.querySelectorAll('thead th').forEach((th, i) => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (i === colIndex) th.classList.add(asc ? 'sort-asc' : 'sort-desc');
  });

  rows.forEach(r => tbody.appendChild(r));
}

function toggleAll(master) {
  document.querySelectorAll('.row-check').forEach(cb => {
    cb.checked = master.checked;
    cb.closest('tr').classList.toggle('row-selected', master.checked);
  });
}
```

---

## Accessibility

- Use `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` — semantic HTML is required
- Sortable `<th>` should have `aria-sort="ascending|descending|none"`
- Checkbox column: `<th>` should have `aria-label="Select all"`; row checkbox `aria-label="Select row"`
- Selected row: `aria-selected="true"` on `<tr>`
- Action buttons: always include `aria-label` (e.g. `aria-label="View Amit Kumar"`)

---

## Related Components

- **List** (`list.html`) — simpler row-based data without tabular structure
- **Pagination** (`pagination.html`) — standalone pagination control
- **Badge** (`badge.html`) — status labels used within table cells

---

*Yubi Market Design System · Table v1.0.0 · Internal Use*
