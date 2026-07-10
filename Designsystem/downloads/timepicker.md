# Time Picker — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (24/54) | **Status:** Stable

---

## Overview

Time selection for scheduled disbursements, task deadlines, and meeting slots. Text input with floating drum-scroll panel for HH:MM with AM/PM toggle, and a compact inline scroll variant for tighter form contexts.

---

## Variants

| Variant       | Description                                              |
|---------------|----------------------------------------------------------|
| Drum panel    | Floating panel with scroll-snap columns for HH and MM   |
| Inline scroll | Bordered compact control with ↑↓ arrows, no floating    |
| Error         | `.error` on input — red border + error message below    |
| Disabled      | 45% opacity, pointer-events none                        |

---

## Measurements

| Property          | Value                              |
|-------------------|------------------------------------|
| Input height      | 42px                               |
| Input width       | 160px (default)                    |
| Input font        | var(--mono) — monospace            |
| Input radius      | 10px                               |
| Panel width       | 240px                              |
| Panel radius      | 14px                               |
| Panel padding     | 16px                               |
| Drum height       | 160px                              |
| Drum item height  | 40px                               |
| Drum font         | 18px / 700 / mono                  |
| AM/PM btn size    | 40 × 34px / 8px radius             |
| Active border     | #4065C5                            |
| Active bg         | rgba(64,101,197,.08)               |
| Error colour      | #CD3546                            |

---

## HTML

```html
<!-- Drum-scroll picker -->
<div class="ym-timepicker-wrap" id="tp1">
  <input class="ym-time-input"
         type="text"
         placeholder="HH : MM AM"
         readonly
         onclick="toggleTimePicker()"
         aria-label="Select time"
         aria-haspopup="true" />
  <span class="tp-clock-icon" aria-hidden="true"><!-- clock SVG --></span>

  <div class="ym-time-panel" id="tp1Panel"
       role="dialog" aria-label="Time picker">
    <div class="tp-drums">

      <div class="tp-drum">
        <div class="tp-drum-label">HH</div>
        <div class="tp-drum-list" id="tp1HourList"
             role="listbox" aria-label="Hour"></div>
      </div>

      <span class="tp-sep" aria-hidden="true">:</span>

      <div class="tp-drum">
        <div class="tp-drum-label">MM</div>
        <div class="tp-drum-list" id="tp1MinList"
             role="listbox" aria-label="Minute"></div>
      </div>

      <div class="tp-ampm">
        <button class="tp-ampm-btn active" aria-pressed="true">AM</button>
        <button class="tp-ampm-btn" aria-pressed="false">PM</button>
      </div>
    </div>

    <div class="tp-footer">
      <button class="tp-clear-btn">Clear</button>
      <button class="tp-apply-btn">Apply</button>
    </div>
  </div>
</div>

<!-- Inline scroll variant -->
<div class="ym-time-scroll">
  <div class="time-scroll-col">
    <button class="time-scroll-arrow" aria-label="Increase hour"><!-- ↑ --></button>
    <span class="time-scroll-val" id="inlineHr">09</span>
    <button class="time-scroll-arrow" aria-label="Decrease hour"><!-- ↓ --></button>
  </div>
  <span class="time-scroll-sep">:</span>
  <div class="time-scroll-col">
    <button class="time-scroll-arrow" aria-label="Increase minute"><!-- ↑ --></button>
    <span class="time-scroll-val" id="inlineMin">30</span>
    <button class="time-scroll-arrow" aria-label="Decrease minute"><!-- ↓ --></button>
  </div>
</div>
```

---

## CSS

```css
.ym-timepicker-wrap { position: relative; display: inline-block; }

.ym-time-input {
  height: 42px; padding: 0 40px 0 14px;
  font-family: var(--mono); font-size: 14px; letter-spacing: .05em;
  background: var(--bg-panel);
  border: 1.5px solid var(--border); border-radius: 10px;
  outline: none; cursor: pointer;
}
.ym-time-input:focus { border-color: #4065C5; box-shadow: 0 0 0 3px rgba(64,101,197,.14); }
.ym-time-input.error { border-color: #CD3546; }

.ym-time-panel {
  position: absolute; top: calc(100% + 8px); left: 0;
  width: 240px; padding: 16px;
  background: var(--bg-panel);
  border: 1px solid var(--border); border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  display: none; z-index: 400;
}
.ym-time-panel.open { display: block; }

.tp-drum-list {
  height: 160px; overflow-y: scroll;
  scroll-snap-type: y mandatory; scrollbar-width: none;
  border: 1px solid var(--border); border-radius: 10px;
  background: var(--bg-inset);
}
.tp-drum-item {
  height: 40px; font-size: 18px; font-weight: 700; font-family: var(--mono);
  scroll-snap-align: center; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-3);
}
.tp-drum-item.selected { color: var(--text-1); background: var(--bg-panel); }

.tp-ampm-btn        { width: 40px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border); font-weight: 700; cursor: pointer; }
.tp-ampm-btn.active { border-color: #4065C5; background: rgba(64,101,197,.08); color: #4065C5; }
```

---

## JavaScript

```javascript
let tpHour = 9, tpMin = 0, tpAmPm = 'AM';

function buildDrum(listEl, max, start, selected) {
  listEl.innerHTML = '';
  for (let i = start; i <= max; i++) {
    const el = document.createElement('div');
    el.className = 'tp-drum-item' + (i === selected ? ' selected' : '');
    el.textContent = String(i).padStart(2, '0');
    el.addEventListener('click', () => {
      if (listEl.id.includes('Hour')) tpHour = i;
      else tpMin = i;
      refreshDrums();
    });
    listEl.appendChild(el);
  }
  listEl.scrollTop = Math.max(0, (selected - start) * 40 - 60);
}

function refreshDrums() {
  buildDrum(document.getElementById('tpHourList'), 12, 1, tpHour);
  buildDrum(document.getElementById('tpMinList'),  59, 0, tpMin);
}

function drumStep(col, dir) {
  if (col === 'hour') tpHour = ((tpHour - 1 + dir + 12) % 12) + 1;
  else                tpMin  = (tpMin + dir + 60) % 60;
  refreshDrums();
}

function setAmPm(val) {
  tpAmPm = val;
  document.querySelectorAll('.tp-ampm-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === val);
    btn.setAttribute('aria-pressed', btn.textContent === val);
  });
}

function applyTime(inputId) {
  document.getElementById(inputId).value =
    String(tpHour).padStart(2,'0') + ' : ' + String(tpMin).padStart(2,'0') + ' ' + tpAmPm;
  document.querySelectorAll('.ym-time-panel.open').forEach(p => p.classList.remove('open'));
}

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-timepicker-wrap'))
    document.querySelectorAll('.ym-time-panel.open').forEach(p => p.classList.remove('open'));
});
```

---

## Accessibility

- Input: `aria-label` for field purpose; `aria-haspopup="true"` when panel opens
- Panel: `role="dialog"` with `aria-label="Time picker"`
- Drum lists: `role="listbox"` with `aria-label="Hour"` / `"Minute"`
- Drum items: `role="option"` with `aria-selected="true/false"`
- AM/PM buttons: `aria-pressed="true/false"` toggled on selection
- Clock icon: `aria-hidden="true"`
- Announce selected time to screen readers with `aria-live="polite"` on output area

---

## Related Components

- **Date Picker** (`datepicker.html`) — paired with time picker for datetime fields
- **Input** (`input.html`) — standard text input for other form fields
- **Modal** (`modal.html`) — time pickers commonly appear in modal forms

---

*Yubi Market Design System · Time Picker v1.0.0 · Internal Use*
