# Checkbox — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (19/54) | **Status:** Stable

---

## Overview

Allows users to select one or more options from a set. Supports checked, unchecked, indeterminate (partial parent selection), error, and disabled states. Can include a label, description, and be used in groups with a "select all" parent.

---

## States

| State         | Box border  | Box fill    | Icon      |
|---------------|-------------|-------------|-----------|
| Unchecked     | `--border`  | `--bg-panel`| hidden    |
| Checked       | `#4065C5`   | `#4065C5`   | checkmark |
| Indeterminate | `#4065C5`   | `#4065C5`   | dash      |
| Error         | `#CD3546`   | `--bg-panel`| hidden    |
| Disabled      | `--border`  | `--bg-panel`| — opacity: 0.4 |
| Disabled Checked | `#4065C5` | `#4065C5`  | checkmark, opacity: 0.4 |

---

## Measurements

| Property       | Value    |
|----------------|----------|
| Box size       | 18 × 18px |
| Border radius  | 4px      |
| Border width   | 1.5px    |
| Checked fill   | #4065C5  |
| Gap (box→label)| 10px     |
| Label font     | 14px / 500 |
| Description font | 12px   |
| Focus ring     | 3px / 20% blue opacity |
| Disabled opacity | 0.4    |
| Checkmark size | 10 × 8px SVG |
| Dash size      | 8 × 2px SVG |

---

## Color Tokens

| Token       | Value     | Usage                       |
|-------------|-----------|-----------------------------|
| `--checked` | `#4065C5` | Checked / indeterminate fill |
| `--border`  | contextual| Unchecked border             |
| `--bg-panel`| contextual| Unchecked background         |
| `--error`   | `#CD3546` | Error border                 |
| `#ffffff`   | —         | Check/dash icon color        |

---

## HTML

```html
<!-- Basic checkbox -->
<label class="ym-cb">
  <input class="ym-cb-input" type="checkbox">
  <div class="ym-cb-box">
    <svg class="cb-check" width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l3 3 5-6" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg class="cb-indeterminate" width="8" height="2" viewBox="0 0 8 2" fill="none">
      <rect x="0" y="0" width="8" height="2" rx="1" fill="#fff"/>
    </svg>
  </div>
  <div class="ym-cb-text">
    <span class="ym-cb-label">Accept terms</span>
    <span class="ym-cb-desc">Required to proceed</span>
  </div>
</label>

<!-- Error state -->
<label class="ym-cb cb-error">
  <input class="ym-cb-input" type="checkbox">
  <div class="ym-cb-box">...</div>
  <span class="ym-cb-label">Required field</span>
</label>

<!-- Disabled -->
<label class="ym-cb cb-disabled">
  <input class="ym-cb-input" type="checkbox" disabled>
  <div class="ym-cb-box">...</div>
  <span class="ym-cb-label">Not available</span>
</label>
```

---

## CSS

```css
.ym-cb-input { position: absolute; opacity: 0; width: 0; height: 0; }
.ym-cb {
  display: inline-flex; align-items: flex-start; gap: 10px;
  cursor: pointer; user-select: none;
}
.ym-cb-box {
  width: 18px; height: 18px; border-radius: 4px;
  border: 1.5px solid var(--border); background: var(--bg-panel);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
  transition: background 150ms, border-color 150ms;
}
.ym-cb:hover:not(.cb-disabled) .ym-cb-box { border-color: #4065C5; }
.ym-cb-input:checked ~ .ym-cb-box { background: #4065C5; border-color: #4065C5; }
.ym-cb-input:checked ~ .ym-cb-box .cb-check { display: block; }
.cb-check, .cb-indeterminate { display: none; }
.ym-cb-input.indeterminate ~ .ym-cb-box { background: #4065C5; border-color: #4065C5; }
.ym-cb-input.indeterminate ~ .ym-cb-box .cb-indeterminate { display: block; }
.ym-cb.cb-error .ym-cb-box { border-color: #CD3546; }
.ym-cb.cb-disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.ym-cb-label { font-size: 14px; color: var(--text-1); font-weight: 500; line-height: 1.4; }
.ym-cb-desc { font-size: 12px; color: var(--text-3); }
```

---

## Accessibility

- Always wrap in `<label>` so the entire row is clickable
- Use `aria-label` or `aria-labelledby` for screen readers when label is visual only
- Indeterminate state: set via `input.indeterminate = true` in JavaScript (not HTML attribute)
- Group checkboxes with `role="group"` and a `aria-labelledby` pointing to a group label

---

## Related Components

- **Radio** (`radio.html`) — mutually exclusive single selection
- **Toggle** (`toggle.html`) — immediate on/off switch
- **Dropdown** (`dropdown.html`) — multi-select via dropdown

---

*Yubi Market Design System · Checkbox v1.0.0 · Internal Use*
