# Date Picker — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (23/54) | **Status:** Stable

---

## Overview

Calendar date selection for loan application dates, disbursement windows, KYC document expiry, and report date ranges. Text input with floating calendar panel, month navigation, today/clear/apply footer, error state, disabled days, and date range variant.

---

## States

| State    | Description                                          |
|----------|------------------------------------------------------|
| Default  | Placeholder input, no selection                      |
| Open     | Calendar panel visible, `.open` on `.ym-cal-panel`   |
| Selected | Blue filled day cell, input shows formatted date     |
| Today    | Blue tinted day with bold weight                     |
| Disabled | Input at 45% opacity, pointer-events: none           |
| Error    | `.error` on input — red border + error message below |
| Range    | Two inputs side-by-side; range-start/end/mid classes |

---

## Measurements

| Property          | Value                              |
|-------------------|------------------------------------|
| Input height      | 42px                               |
| Input radius      | 10px                               |
| Input border      | 1.5px solid var(--border)          |
| Focus ring        | 0 0 0 3px rgba(64,101,197,.14)     |
| Panel width       | 280px                              |
| Panel radius      | 14px                               |
| Panel padding     | 16px                               |
| Panel shadow      | 0 8px 32px rgba(0,0,0,.12)         |
| Day cell radius   | 8px                                |
| Day grid gap      | 2px                                |
| Selected bg       | #4065C5                            |
| Today bg          | rgba(64,101,197,.08)               |
| Range mid bg      | rgba(64,101,197,.1)                |
| Error colour      | #CD3546                            |

---

## HTML

```html
<div class="ym-datepicker-wrap" id="dp1">
  <input class="ym-date-input"
         id="dp1Input"
         type="text"
         placeholder="DD / MM / YYYY"
         readonly
         onclick="toggleCal('dp1')"
         aria-label="Select date"
         aria-haspopup="true" />
  <span class="dp-cal-icon" aria-hidden="true"><!-- calendar SVG --></span>

  <div class="ym-cal-panel" id="dp1Panel"
       role="dialog" aria-label="Date picker calendar">
    <div class="cal-header">
      <button class="cal-nav-btn" aria-label="Previous month"><!-- ← --></button>
      <span class="cal-month-label">April 2026</span>
      <button class="cal-nav-btn" aria-label="Next month"><!-- → --></button>
    </div>
    <div class="cal-weekdays">
      <div class="cal-wd">Su</div><div class="cal-wd">Mo</div>
      <!-- ... Th Fr Sa -->
    </div>
    <div class="cal-days" role="grid">
      <!-- Rendered by JS -->
    </div>
    <div class="cal-footer">
      <button class="cal-clear-btn">Clear</button>
      <button class="cal-today-btn">Today</button>
      <button class="cal-apply-btn">Apply</button>
    </div>
  </div>
</div>

<!-- Error state -->
<div class="ym-datepicker-wrap">
  <input class="ym-date-input error" type="text" value="31 / 02 / 2026"
         aria-invalid="true" aria-describedby="dpErrMsg" readonly>
</div>
<div id="dpErrMsg" style="font-size:12px;color:#CD3546;margin-top:6px;">
  Invalid date selected
</div>

<!-- Date range -->
<div style="display:flex;align-items:center;gap:8px;">
  <div class="ym-datepicker-wrap">
    <input class="ym-date-input" type="text" value="01 / 03 / 2026" readonly>
  </div>
  <span>→</span>
  <div class="ym-datepicker-wrap">
    <input class="ym-date-input" type="text" value="31 / 03 / 2026" readonly>
  </div>
</div>
```

---

## CSS

```css
.ym-datepicker-wrap { position: relative; display: inline-block; }

.ym-date-input {
  height: 42px; padding: 0 40px 0 14px;
  font-size: 14px;
  background: var(--bg-panel);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  outline: none; cursor: pointer;
  transition: border-color 160ms, box-shadow 160ms;
}
.ym-date-input:focus      { border-color: #4065C5; box-shadow: 0 0 0 3px rgba(64,101,197,.14); }
.ym-date-input.error      { border-color: #CD3546; }
.ym-date-input:disabled   { opacity: .45; cursor: not-allowed; }

.ym-cal-panel {
  position: absolute; top: calc(100% + 8px); left: 0;
  width: 280px; padding: 16px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  display: none; z-index: 400;
}
.ym-cal-panel.open { display: block; }

.cal-days   { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.cal-day    { aspect-ratio: 1; border-radius: 8px; cursor: pointer; font-size: 12.5px; display: flex; align-items: center; justify-content: center; }
.cal-day:hover:not(.cal-day-empty):not(.cal-day-selected) { background: var(--bg-inset); }

.cal-day-today    { background: rgba(64,101,197,.08); color: #4065C5; font-weight: 800; }
.cal-day-selected { background: #4065C5; color: #fff; font-weight: 700; }
.cal-day-disabled { opacity: .4; pointer-events: none; }

.cal-day-range-start { background: #4065C5; color: #fff; border-radius: 8px 0 0 8px; }
.cal-day-range-end   { background: #4065C5; color: #fff; border-radius: 0 8px 8px 0; }
.cal-day-range-mid   { background: rgba(64,101,197,.1); color: #4065C5; border-radius: 0; }
```

---

## JavaScript

```javascript
let calDate = new Date(); // current view month
let pendingDate = null;
let selectedDate = null;

function toggleCal(wrapId) {
  const panel = document.querySelector(`#${wrapId} .ym-cal-panel`);
  const isOpen = panel.classList.contains('open');
  closeAllCals();
  if (!isOpen) { renderCal(panel); panel.classList.add('open'); }
}

function closeAllCals() {
  document.querySelectorAll('.ym-cal-panel.open').forEach(p => p.classList.remove('open'));
}

function renderCal(panel) {
  const yr = calDate.getFullYear(), mo = calDate.getMonth();
  panel.querySelector('.cal-month-label').textContent =
    calDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const first = new Date(yr, mo, 1).getDay();
  const days  = new Date(yr, mo + 1, 0).getDate();
  const today = new Date();
  const grid  = panel.querySelector('.cal-days');
  grid.innerHTML = '';

  for (let i = 0; i < first; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day cal-day-empty'; grid.appendChild(el);
  }
  for (let d = 1; d <= days; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
    const date = new Date(yr, mo, d);
    if (isSameDay(date, today)) el.classList.add('cal-day-today');
    if (pendingDate && isSameDay(date, pendingDate)) el.classList.add('cal-day-selected');
    el.addEventListener('click', () => { pendingDate = date; renderCal(panel); });
    grid.appendChild(el);
  }
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function changeMonth(dir) { calDate.setMonth(calDate.getMonth() + dir); /* re-render */ }

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-datepicker-wrap')) closeAllCals();
});
```

---

## Accessibility

- Input: `aria-label` describing field purpose; `aria-haspopup="true"` when dropdown calendar opens
- Panel: `role="dialog"` with `aria-label="Date picker calendar"`
- Day grid: `role="grid"` on `.cal-days`; each day `role="gridcell"` with `aria-label="Day D, Month Year"` and `aria-selected="true/false"`
- Navigation buttons: `aria-label="Previous month"` / `"Next month"`
- Error state: `aria-invalid="true"` on input; `aria-describedby` pointing to error message
- Disabled dates: `aria-disabled="true"` on individual day cells

---

## Related Components

- **Time Picker** (`timepicker.html`) — paired with date picker for datetime fields
- **Input** (`input.html`) — standard text input for other form fields
- **Modal** (`modal.html`) — date range pickers are often hosted in modals

---

*Yubi Market Design System · Date Picker v1.0.0 · Internal Use*
