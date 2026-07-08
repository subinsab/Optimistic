# Toggle — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (21/54) | **Status:** Stable

---

## Overview

Binary on/off switch for settings and feature flags. Unlike checkboxes, toggles have immediate effect — no form submission required. Use for settings that apply instantly (notifications, dark mode, feature flags).

---

## Sizes

| Size | Track        | Thumb    | Left (off) | Left (on) |
|------|-------------|----------|------------|-----------|
| L    | 52 × 28px   | 22 × 22px | 3px       | 27px      |
| M    | 40 × 22px   | 16 × 16px | 3px       | 21px      |
| S    | 32 × 18px   | 12 × 12px | 3px       | 17px      |

---

## States

| State          | Track color  | Thumb    |
|----------------|-------------|----------|
| Off            | `--border`  | white, left |
| On             | `#4065C5`   | white, right |
| Off Disabled   | `--border`  | white, left — opacity 0.4 |
| On Disabled    | `#4065C5`   | white, right — opacity 0.4 |

---

## Measurements

| Property         | Value      |
|------------------|------------|
| Track radius     | 100px (pill) |
| Thumb radius     | 50%        |
| Thumb inset      | 3px all sizes |
| Off track color  | `--border` |
| On track color   | `#4065C5`  |
| Thumb color      | `#ffffff`  |
| Transition       | 200ms ease |
| Disabled opacity | 0.4        |

---

## HTML

```html
<!-- Basic toggle (medium, default) -->
<label class="ym-toggle">
  <input class="ym-toggle-input" type="checkbox">
  <div class="ym-toggle-track">
    <div class="ym-toggle-thumb"></div>
  </div>
  <span class="ym-toggle-label">Email Notifications</span>
</label>

<!-- Large -->
<label class="ym-toggle toggle-l">
  <input class="ym-toggle-input" type="checkbox" checked>
  <div class="ym-toggle-track"><div class="ym-toggle-thumb"></div></div>
  <span class="ym-toggle-label">Large toggle</span>
</label>

<!-- Disabled -->
<label class="ym-toggle toggle-disabled">
  <input class="ym-toggle-input" type="checkbox" disabled>
  <div class="ym-toggle-track"><div class="ym-toggle-thumb"></div></div>
</label>

<!-- Settings row -->
<div class="toggle-setting-row">
  <div class="toggle-setting-info">
    <div class="toggle-setting-title">Auto-approve</div>
    <div class="toggle-setting-desc">Apply rules automatically</div>
  </div>
  <label class="ym-toggle">
    <input class="ym-toggle-input" type="checkbox" checked>
    <div class="ym-toggle-track"><div class="ym-toggle-thumb"></div></div>
  </label>
</div>
```

---

## CSS

```css
.ym-toggle { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ym-toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }

.ym-toggle-track {
  position: relative; width: 40px; height: 22px;
  background: var(--border); border-radius: 100px;
  transition: background 200ms; flex-shrink: 0;
}
.ym-toggle-input:checked ~ .ym-toggle-track { background: #4065C5; }

.ym-toggle-thumb {
  position: absolute; top: 3px; left: 3px;
  width: 16px; height: 16px; background: #fff;
  border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: left 200ms;
}
.ym-toggle-input:checked ~ .ym-toggle-track .ym-toggle-thumb { left: 21px; }

/* Sizes */
.ym-toggle.toggle-l .ym-toggle-track { width: 52px; height: 28px; }
.ym-toggle.toggle-l .ym-toggle-thumb { width: 22px; height: 22px; }
.ym-toggle.toggle-l .ym-toggle-input:checked ~ .ym-toggle-track .ym-toggle-thumb { left: 27px; }

.ym-toggle.toggle-s .ym-toggle-track { width: 32px; height: 18px; }
.ym-toggle.toggle-s .ym-toggle-thumb { width: 12px; height: 12px; }
.ym-toggle.toggle-s .ym-toggle-input:checked ~ .ym-toggle-track .ym-toggle-thumb { left: 17px; }

.ym-toggle.toggle-disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

/* Settings row */
.toggle-setting-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: var(--bg-panel);
  border: 1px solid var(--border); border-radius: 10px;
}
.toggle-setting-title { font-size: 14px; font-weight: 500; color: var(--text-1); }
.toggle-setting-desc { font-size: 12px; color: var(--text-3); }
```

---

## Accessibility

- Use `role="switch"` and `aria-checked` for screen reader support
- Always associate a visible label (or `aria-label`) with the toggle
- Toggle should respond to Space key to toggle, Enter is optional
- Settings row: the entire row is not clickable — only the toggle itself

---

## When to use Toggle vs Checkbox

| Toggle | Checkbox |
|--------|----------|
| Immediate effect (settings) | Requires form submit |
| Single on/off | Can be part of multi-select group |
| Does not need Submit button | Usually has a Submit/Save button |

---

## Related Components

- **Checkbox** (`checkbox.html`) — multi-select, requires form submit
- **Radio** (`radio.html`) — single from group
- **Button** (`button.html`) — explicit action trigger

---

*Yubi Market Design System · Toggle v1.0.0 · Internal Use*
