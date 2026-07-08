# Radio — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (20/54) | **Status:** Stable

---

## Overview

Allows users to select exactly one option from a group. All options in a group share the same `name` attribute. Supports standard list layout, card-style variant, error state, and disabled options.

---

## States

| State          | Circle border | Inner dot   |
|----------------|---------------|-------------|
| Unselected     | `--border`    | hidden      |
| Selected       | `#4065C5`     | `#4065C5`   |
| Error          | `#CD3546`     | hidden      |
| Disabled       | `--border`    | — opacity 0.4 |
| Disabled Selected | `#4065C5` | `#4065C5`, opacity 0.4 |

---

## Measurements

| Property        | Value      |
|-----------------|------------|
| Circle size     | 18 × 18px  |
| Border radius   | 50%        |
| Border width    | 1.5px      |
| Inner dot size  | 8 × 8px    |
| Selected color  | #4065C5    |
| Gap (circle→label) | 10px    |
| Label font      | 14px / 500 |
| Description font| 12px       |
| Focus ring      | 3px / 20% blue |
| Disabled opacity| 0.4        |
| Card border radius | 10px    |
| Card padding    | 14px 16px  |

---

## HTML

```html
<!-- Radio group -->
<div class="ym-radio-group" role="radiogroup" aria-label="Repayment Schedule">
  <div class="ym-radio-group-label">Repayment Schedule</div>

  <label class="ym-radio">
    <input class="ym-radio-input" type="radio" name="repay" value="monthly" checked>
    <div class="ym-radio-circle"><div class="radio-dot"></div></div>
    <div class="ym-radio-text">
      <span class="ym-radio-label">Monthly</span>
      <span class="ym-radio-desc">12 payments per year</span>
    </div>
  </label>

  <label class="ym-radio">
    <input class="ym-radio-input" type="radio" name="repay" value="quarterly">
    <div class="ym-radio-circle"><div class="radio-dot"></div></div>
    <span class="ym-radio-label">Quarterly</span>
  </label>
</div>

<!-- Card-style radio -->
<label class="ym-radio-card card-selected">
  <input class="ym-radio-input" type="radio" name="loan-type" value="secured" checked>
  <div class="ym-radio-circle"><div class="radio-dot" style="display:block"></div></div>
  <div class="ym-radio-text">
    <span class="ym-radio-label">Secured Loan</span>
    <span class="ym-radio-desc">Backed by collateral, lower rate</span>
  </div>
</label>
```

---

## CSS

```css
.ym-radio-input { position: absolute; opacity: 0; width: 0; height: 0; }
.ym-radio {
  display: inline-flex; align-items: flex-start; gap: 10px;
  cursor: pointer; user-select: none;
}
.ym-radio-circle {
  width: 18px; height: 18px; border-radius: 50%;
  border: 1.5px solid var(--border); background: var(--bg-panel);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: border-color 150ms;
}
.ym-radio:hover .ym-radio-circle { border-color: #4065C5; }
.ym-radio-input:checked ~ .ym-radio-circle { border-color: #4065C5; }
.radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #4065C5; display: none; }
.ym-radio-input:checked ~ .ym-radio-circle .radio-dot { display: block; }
.ym-radio.radio-disabled { opacity: 0.4; pointer-events: none; }
.ym-radio.radio-error .ym-radio-circle { border-color: #CD3546; }

/* Card variant */
.ym-radio-card {
  display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
  background: var(--bg-panel); border: 1.5px solid var(--border); border-radius: 10px;
  cursor: pointer; transition: border-color 150ms;
}
.ym-radio-card:hover { border-color: #4065C5; }
.ym-radio-card.card-selected { border-color: #4065C5; background: rgba(64,101,197,.04); }
```

---

## Accessibility

- Group all options with the same `name` attribute for native mutual exclusion
- Wrap in `role="radiogroup"` with `aria-label` or `aria-labelledby`
- Each option needs a visible label associated by wrapping in `<label>` or using `aria-label`
- Keyboard: arrow keys move focus between options in a group

---

## Related Components

- **Checkbox** (`checkbox.html`) — multi-select
- **Toggle** (`toggle.html`) — binary on/off
- **Dropdown** (`dropdown.html`) — single select with many options

---

*Yubi Market Design System · Radio v1.0.0 · Internal Use*
