# Filter — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (48/54) | **Status:** Stable

---

## Overview

Filter chips and dropdown panels for loan portfolios, transaction history, and KYC queues. Toggle chips, dropdown multi-select panels with apply/clear actions, and an active-filter summary bar with removable tags.

---

## Variants

| Variant              | Description                                              |
|----------------------|----------------------------------------------------------|
| Toggle chip          | Simple pill that toggles `.active` on click              |
| Value chip           | Shows label + current selection count; opens dropdown    |
| Dropdown panel       | Floating checklist panel with header, footer, close-on-outside-click |
| Active filter summary | Blue-tinted bar with removable tags and reset-all action |

---

## Measurements

| Property             | Value                              |
|----------------------|------------------------------------|
| Chip height          | 34px                               |
| Chip border-radius   | 100px (pill)                       |
| Chip padding         | 0 14px                             |
| Chip font            | 12.5px / 600                       |
| Chip border          | 1.5px solid var(--border)          |
| Active border/text   | #4065C5                            |
| Active bg            | rgba(64,101,197,.08)               |
| Remove icon          | 16px circle                        |
| Panel min-width      | 220px                              |
| Panel border-radius  | 12px                               |
| Panel shadow         | 0 8px 32px rgba(0,0,0,.12)         |
| Panel row padding    | 9px 14px                           |
| Active tag height    | 26px / 100px radius                |
| Summary bar padding  | 10px 16px                          |
| Summary bg           | rgba(64,101,197,.04)               |
| Summary border       | rgba(64,101,197,.2)                |

---

## HTML

```html
<!-- Toggle chip bar -->
<div class="ym-filter-bar" role="group" aria-label="Filter options">

  <button class="ym-filter-chip active"
          onclick="toggleChip(this)"
          aria-pressed="true">
    Active
    <span class="chip-remove" aria-hidden="true"><!-- × SVG --></span>
  </button>

  <button class="ym-filter-chip"
          onclick="toggleChip(this)"
          aria-pressed="false">
    Pending Review
    <span class="chip-remove" aria-hidden="true"><!-- × SVG --></span>
  </button>

</div>

<!-- Value chip + dropdown panel -->
<div class="ym-filter-dropdown">
  <button class="ym-filter-chip chip-value"
          onclick="togglePanel('panelType', this)"
          aria-haspopup="true" aria-expanded="false">
    <span class="chip-label">Type</span>
    <span class="chip-val" id="chipTypeVal">2 selected</span>
  </button>

  <div class="ym-filter-panel" id="panelType" role="dialog">
    <div class="filter-panel-header">Loan Type</div>
    <label class="filter-panel-item">
      <input type="checkbox" checked
             onchange="updateChipCount('chipTypeVal','panelType')">
      Personal Loan
    </label>
    <label class="filter-panel-item">
      <input type="checkbox"
             onchange="updateChipCount('chipTypeVal','panelType')">
      Business Loan
    </label>
    <div class="filter-panel-footer">
      <button class="filter-clear-btn"
              onclick="clearPanel('panelType','chipTypeVal')">Clear</button>
      <button class="filter-apply-btn"
              onclick="applyPanel('panelType')">Apply</button>
    </div>
  </div>
</div>

<!-- Active filter summary bar -->
<div class="ym-filter-summary" role="status" aria-live="polite">
  <span style="font-size:12px;font-weight:600;color:var(--text-3)">Filters:</span>
  <div class="filter-active-tag">
    Personal Loan
    <button onclick="removeActiveTag(this)" aria-label="Remove Personal Loan filter">
      <!-- × SVG -->
    </button>
  </div>
  <button class="filter-reset-all" onclick="resetAllFilters()">Reset all</button>
</div>
```

---

## CSS

```css
.ym-filter-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }

.ym-filter-chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 34px; padding: 0 14px;
  border-radius: 100px;
  border: 1.5px solid var(--border);
  background: var(--bg-panel);
  font-size: 12.5px; font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: border-color 160ms, background 160ms, color 160ms;
  white-space: nowrap; user-select: none;
}
.ym-filter-chip:hover { border-color: #4065C5; color: var(--text-1); }
.ym-filter-chip.active {
  border-color: #4065C5;
  background: rgba(64,101,197,.08);
  color: #4065C5;
}
.chip-remove { display: none; /* shown when .active */ }
.ym-filter-chip.active .chip-remove { display: flex; }

.ym-filter-dropdown { position: relative; display: inline-block; }
.ym-filter-panel {
  position: absolute; top: calc(100% + 8px); left: 0;
  min-width: 220px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  padding: 10px 0; z-index: 200;
  display: none;
}
.ym-filter-panel.open { display: block; }

.filter-panel-item { display: flex; align-items: center; gap: 10px; padding: 9px 14px; font-size: 13px; cursor: pointer; }
.filter-panel-item:hover { background: var(--bg-inset); }
.filter-panel-item input[type="checkbox"] { accent-color: #4065C5; width: 15px; height: 15px; }

.filter-apply-btn { background: #4065C5; color: #fff; border: none; border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 700; cursor: pointer; }
.filter-clear-btn { background: none; border: none; color: var(--text-3); font-size: 12px; font-weight: 600; cursor: pointer; }

.ym-filter-summary {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  padding: 10px 16px;
  background: rgba(64,101,197,.04);
  border: 1px solid rgba(64,101,197,.2);
  border-radius: 10px;
}
.filter-active-tag {
  display: inline-flex; align-items: center; gap: 5px;
  height: 26px; padding: 0 10px; border-radius: 100px;
  background: rgba(64,101,197,.1);
  border: 1px solid rgba(64,101,197,.25);
  font-size: 12px; font-weight: 600; color: #4065C5;
}
```

---

## JavaScript

```javascript
function toggleChip(btn) {
  btn.classList.toggle('active');
  btn.setAttribute('aria-pressed', btn.classList.contains('active'));
}

function togglePanel(panelId, btn) {
  const panel = document.getElementById(panelId);
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.ym-filter-panel.open').forEach(p => p.classList.remove('open'));
  if (!isOpen) panel.classList.add('open');
}

function applyPanel(panelId) {
  document.getElementById(panelId).classList.remove('open');
}

function clearPanel(panelId, valId) {
  document.querySelectorAll(`#${panelId} input[type="checkbox"]`)
          .forEach(cb => cb.checked = false);
  if (valId) document.getElementById(valId).textContent = '0 selected';
}

function updateChipCount(valId, panelId) {
  const count = document.querySelectorAll(`#${panelId} input:checked`).length;
  document.getElementById(valId).textContent =
    count === 0 ? 'None' : count + ' selected';
}

function removeActiveTag(btn) {
  btn.closest('.filter-active-tag').remove();
}

function resetAllFilters() {
  document.querySelectorAll('.filter-active-tag').forEach(t => t.remove());
}

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-filter-dropdown'))
    document.querySelectorAll('.ym-filter-panel.open').forEach(p => p.classList.remove('open'));
});
```

---

## Accessibility

- Filter bar: `role="group"` with `aria-label` describing what is being filtered
- Toggle chips: `aria-pressed="true/false"` toggled on click
- Dropdown trigger: `aria-haspopup="true"` and `aria-expanded="true/false"` toggled
- Panel: `role="dialog"` or `role="listbox"` for the dropdown content
- Active filter summary: `role="status"` with `aria-live="polite"` for screen reader announcements
- Remove buttons: `aria-label="Remove [filter name] filter"`

---

## Related Components

- **Search** (`search.html`) — keyword search paired with filters
- **Tabs** (`tabs.html`) — simpler single-dimension filtering
- **Table** (`table.html`) — primary consumer of filter bar in portfolio views

---

*Yubi Market Design System · Filter v1.0.0 · Internal Use*
