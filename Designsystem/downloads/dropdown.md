# Dropdown — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (22/54) | **Status:** Stable

---

## Overview

Single-select menu that reveals a list of options on click. Supports labels, placeholder text, grouped options, three sizes, and error/disabled states. Closes on outside click or Escape key.

---

## Sizes

| Size | Height | Font  | Padding   |
|------|--------|-------|-----------|
| L    | 44px   | 15px  | 0 14px    |
| M    | 36px   | 14px  | 0 12px    |
| S    | 30px   | 13px  | 0 10px    |

---

## States

| State    | Border           | Box Shadow                        |
|----------|------------------|-----------------------------------|
| Default  | `--border`       | none                              |
| Hover    | `--text-3`       | none                              |
| Open     | `#FE5104`        | `0 0 0 3px rgba(254,81,4,.12)`   |
| Error    | `#CD3546`        | none                              |
| Disabled | `--border`       | none — opacity 0.45, bg inset     |

---

## Measurements

| Property          | Value                          |
|-------------------|--------------------------------|
| Trigger height (M)| 36px                           |
| Trigger radius    | 8px                            |
| Border width      | 1.5px                          |
| Menu radius       | 10px                           |
| Menu shadow       | `0 8px 24px rgba(0,0,0,.12)`  |
| Menu offset       | 4px below trigger              |
| Item height       | ~36px (padding 9px 12px)       |
| Chevron rotation  | 180° when open, 200ms          |
| Label font        | 13px / 600                     |
| Hint font         | 11.5px                         |
| Disabled opacity  | 0.45                           |
| Selected dot      | 6px circle, `#FE5104`          |
| Group header font | 10px / 700, uppercase          |

---

## HTML

```html
<!-- Basic dropdown (medium, default) -->
<div class="ym-dd-wrap" id="dd1">
  <label class="ym-dd-label">Loan Type <span class="req">*</span></label>
  <div class="ym-dd-trigger" onclick="toggleDD('dd1')">
    <span class="ym-dd-placeholder">Select an option</span>
    <svg class="ym-dd-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="ym-dd-menu" id="dd1-menu">
    <div class="ym-dd-item" onclick="selectDD('dd1','Personal Loan')">Personal Loan</div>
    <div class="ym-dd-item" onclick="selectDD('dd1','Business Loan')">Business Loan</div>
    <div class="ym-dd-item" onclick="selectDD('dd1','Home Loan')">Home Loan</div>
  </div>
</div>

<!-- Large -->
<div class="ym-dd-wrap dd-l" id="dd-large">
  <div class="ym-dd-trigger" onclick="toggleDD('dd-large')">
    <span class="ym-dd-placeholder">Select...</span>
    <svg class="ym-dd-chevron" ...></svg>
  </div>
  <div class="ym-dd-menu" id="dd-large-menu">...</div>
</div>

<!-- Error state -->
<div class="ym-dd-wrap" id="dd-err">
  <label class="ym-dd-label">Category</label>
  <div class="ym-dd-trigger dd-error" onclick="toggleDD('dd-err')">
    <span class="ym-dd-placeholder">Select an option</span>
    <svg class="ym-dd-chevron" ...></svg>
  </div>
  <div class="ym-dd-menu" id="dd-err-menu">...</div>
  <span class="ym-dd-hint hint-error">This field is required</span>
</div>

<!-- Disabled -->
<div class="ym-dd-wrap" id="dd-dis">
  <div class="ym-dd-trigger dd-disabled">
    <span class="ym-dd-placeholder">Not available</span>
    <svg class="ym-dd-chevron" ...></svg>
  </div>
</div>

<!-- Grouped options -->
<div class="ym-dd-menu" id="dd-grp-menu">
  <div class="ym-dd-group-header">Business</div>
  <div class="ym-dd-item" onclick="selectDD('dd-grp','Working Capital')">Working Capital</div>
  <div class="ym-dd-item" onclick="selectDD('dd-grp','Term Loan')">Term Loan</div>
  <div class="ym-dd-divider"></div>
  <div class="ym-dd-group-header">Personal</div>
  <div class="ym-dd-item" onclick="selectDD('dd-grp','Personal Loan')">Personal Loan</div>
  <div class="ym-dd-item" onclick="selectDD('dd-grp','Home Loan')">Home Loan</div>
</div>
```

---

## CSS

```css
/* Wrapper & label */
.ym-dd-wrap { display: flex; flex-direction: column; gap: 5px; position: relative; }
.ym-dd-label { font-size: 13px; font-weight: 600; color: var(--text-1); }
.ym-dd-label .req { color: var(--accent); margin-left: 2px; }

/* Trigger */
.ym-dd-trigger {
  display: flex; align-items: center; justify-content: space-between;
  height: 36px; padding: 0 12px;
  background: var(--bg-panel); border: 1.5px solid var(--border);
  border-radius: 8px; cursor: pointer; font-size: 14px;
  color: var(--text-1); transition: border-color 150ms, box-shadow 150ms;
  user-select: none;
}
.ym-dd-trigger:hover:not(.dd-disabled) { border-color: var(--text-3); }
.ym-dd-trigger.dd-open { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(254,81,4,.12); }
.ym-dd-trigger.dd-error { border-color: #CD3546; }
.ym-dd-trigger.dd-disabled { opacity: 0.45; cursor: not-allowed; background: var(--bg-inset); }

.ym-dd-placeholder { color: var(--text-3); }
.ym-dd-value { color: var(--text-1); }
.ym-dd-chevron { color: var(--text-3); transition: transform 200ms; flex-shrink: 0; }
.ym-dd-trigger.dd-open .ym-dd-chevron { transform: rotate(180deg); }

/* Sizes */
.ym-dd-wrap.dd-l .ym-dd-trigger { height: 44px; padding: 0 14px; font-size: 15px; }
.ym-dd-wrap.dd-s .ym-dd-trigger { height: 30px; padding: 0 10px; font-size: 13px; }

/* Menu */
.ym-dd-menu {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 200;
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12); padding: 6px; display: none;
  max-height: 240px; overflow-y: auto;
}
.ym-dd-menu.open { display: block; }

/* Items */
.ym-dd-item {
  padding: 9px 12px; border-radius: 7px; cursor: pointer;
  font-size: 14px; color: var(--text-1);
  transition: background 100ms; position: relative;
}
.ym-dd-item:hover { background: var(--bg-inset); }
.ym-dd-item.selected { color: var(--accent); font-weight: 500; padding-right: 28px; }
.ym-dd-item.selected::after {
  content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
}

/* Groups */
.ym-dd-group-header {
  padding: 6px 12px 4px; font-size: 10px; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase; color: var(--text-3);
}
.ym-dd-divider { height: 1px; background: var(--border); margin: 4px 0; }

/* Hint */
.ym-dd-hint { font-size: 11.5px; color: var(--text-3); }
.ym-dd-hint.hint-error { color: #CD3546; }
```

---

## JavaScript

```javascript
function toggleDD(id) {
  const wrap = document.getElementById(id);
  const trigger = wrap.querySelector('.ym-dd-trigger');
  const menu = wrap.querySelector('.ym-dd-menu');
  if (trigger.classList.contains('dd-disabled')) return;
  const isOpen = menu.classList.contains('open');
  // Close all other dropdowns
  document.querySelectorAll('.ym-dd-menu.open').forEach(m => {
    m.classList.remove('open');
    m.closest('.ym-dd-wrap')?.querySelector('.ym-dd-trigger')?.classList.remove('dd-open');
  });
  if (!isOpen) {
    menu.classList.add('open');
    trigger.classList.add('dd-open');
  }
}

function selectDD(id, value) {
  const wrap = document.getElementById(id);
  const trigger = wrap.querySelector('.ym-dd-trigger');
  const menu = wrap.querySelector('.ym-dd-menu');
  // Update displayed value
  trigger.innerHTML = `<span class="ym-dd-value">${value}</span>
    <svg class="ym-dd-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  // Mark selected item
  menu.querySelectorAll('.ym-dd-item').forEach(item => {
    item.classList.toggle('selected', item.textContent.trim() === value);
  });
  // Close menu
  menu.classList.remove('open');
  trigger.classList.remove('dd-open');
}

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-dd-wrap')) {
    document.querySelectorAll('.ym-dd-menu.open').forEach(m => {
      m.classList.remove('open');
      m.closest('.ym-dd-wrap')?.querySelector('.ym-dd-trigger')?.classList.remove('dd-open');
    });
  }
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ym-dd-menu.open').forEach(m => {
      m.classList.remove('open');
      m.closest('.ym-dd-wrap')?.querySelector('.ym-dd-trigger')?.classList.remove('dd-open');
    });
  }
});
```

---

## Accessibility

- Use `role="combobox"` on the trigger, `aria-expanded`, `aria-haspopup="listbox"`
- Use `role="listbox"` on the menu, `role="option"` on each item, `aria-selected` on selected
- Support keyboard: Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close
- Associate label with `for`/`id` or wrap in `<label>`

---

## Related Components

- **Radio** (`radio.html`) — visible options when count is small (≤5)
- **Checkbox** (`checkbox.html`) — multi-select variant
- **Input** (`input.html`) — free-text entry

---

*Yubi Market Design System · Dropdown v1.0.0 · Internal Use*
