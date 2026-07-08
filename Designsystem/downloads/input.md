# Input — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (17/54) | **Status:** Stable

---

## Overview

Single-line text fields for collecting user data. Supports labels, required markers, helper/error/success text, and prefix/suffix icons. Three sizes adapt to form density. States include default, hover, focus, error, success, and disabled.

---

## Sizes

| Size | Height | Padding H | Font Size |
|------|--------|-----------|-----------|
| L    | 44px   | 14px      | 16px      |
| M    | 36px   | 12px      | 14px      |
| S    | 28px   | 10px      | 12px      |

---

## States

| State    | Border Color      | Box Shadow                          |
|----------|-------------------|-------------------------------------|
| Default  | `--border`        | none                                |
| Hover    | `--text-3`        | none                                |
| Focus    | `#FE5104`         | `0 0 0 3px rgba(254,81,4,.12)`      |
| Error    | `#CD3546`         | `0 0 0 3px rgba(205,53,70,.12)`     |
| Success  | `#3F902B`         | `0 0 0 3px rgba(63,144,43,.12)`     |
| Disabled | `--border`        | none — opacity: 0.45                |

---

## Measurements

| Property         | Value     |
|------------------|-----------|
| Border radius    | 8px       |
| Border width     | 1.5px     |
| Focus ring width | 3px       |
| Icon size        | 14px      |
| Icon inset       | 11px      |
| Label font size  | 13px      |
| Label weight     | 600       |
| Helper font size | 11.5px    |
| Disabled opacity | 0.45      |
| Transition       | 150ms ease|

---

## Color Tokens

| Token       | Value     | Usage                      |
|-------------|-----------|----------------------------|
| `--accent`  | `#FE5104` | Focus border, required `*` |
| `--border`  | contextual| Default border             |
| `--bg-panel`| contextual| Input background           |
| `--bg-inset`| contextual| Disabled background        |
| `--text-1`  | contextual| Input value text           |
| `--text-3`  | contextual| Placeholder, helper text, icons |
| `--error`   | `#CD3546` | Error border & hint text   |
| `--success` | `#3F902B` | Success border & hint text |

---

## Anatomy

1. **Label** — 13px/600, `--text-1`. Required asterisk (*) in `--accent`.
2. **Field wrapper** — `position: relative` for icon positioning
3. **Input element** — `<input>` with full-width, background `--bg-panel`, border `--border`
4. **Placeholder** — `--text-3`
5. **Prefix icon** (optional) — 14px, positioned left 11px, color `--text-3`
6. **Suffix icon** (optional) — 14px, positioned right 11px; can be interactive (toggle visibility, clear)
7. **Helper/Error text** — 11.5px below field

---

## HTML

```html
<!-- Basic medium input -->
<div class="ym-input-wrap">
  <label class="ym-input-label">Full Name <span class="req">*</span></label>
  <div class="ym-input-field-wrap">
    <input class="ym-input inp-m" type="text" placeholder="Enter full name">
  </div>
  <span class="ym-input-hint">As per PAN card</span>
</div>

<!-- With prefix icon -->
<div class="ym-input-wrap">
  <label class="ym-input-label">Search</label>
  <div class="ym-input-field-wrap">
    <span class="inp-prefix-icon"><!-- search SVG --></span>
    <input class="ym-input inp-m has-prefix" type="text" placeholder="Search…">
  </div>
</div>

<!-- Error state -->
<div class="ym-input-wrap">
  <label class="ym-input-label">Email</label>
  <div class="ym-input-field-wrap">
    <input class="ym-input inp-m inp-error" type="email" value="invalid">
  </div>
  <span class="ym-input-hint hint-error">Enter a valid email address</span>
</div>

<!-- Large with suffix -->
<div class="ym-input-wrap">
  <label class="ym-input-label">Amount</label>
  <div class="ym-input-field-wrap">
    <span class="inp-prefix-icon" style="font-weight:700">₹</span>
    <input class="ym-input inp-l has-prefix has-suffix" type="number" placeholder="0.00">
    <span class="inp-suffix-icon">INR</span>
  </div>
</div>

<!-- Disabled -->
<input class="ym-input inp-m" type="text" value="Read only value" disabled>
```

---

## CSS

```css
.ym-input-wrap { display: flex; flex-direction: column; gap: 5px; }
.ym-input-label { font-size: 13px; font-weight: 600; color: var(--text-1); font-family: 'Inter', sans-serif; }
.ym-input-label .req { color: var(--accent); margin-left: 2px; }
.ym-input-field-wrap { position: relative; display: flex; align-items: center; }

.ym-input {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 14px; color: var(--text-1);
  background: var(--bg-panel); border: 1.5px solid var(--border);
  border-radius: 8px; width: 100%; outline: none;
  transition: border-color 150ms, box-shadow 150ms;
  -webkit-appearance: none;
}
.ym-input::placeholder { color: var(--text-3); }
.ym-input:hover:not(:disabled):not(.inp-error):not(.inp-success) { border-color: var(--text-3); }
.ym-input:focus:not(.inp-error):not(.inp-success) {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(254,81,4,.12);
}
.ym-input:disabled { opacity: 0.45; cursor: not-allowed; background: var(--bg-inset); }
.ym-input.inp-error { border-color: #CD3546; }
.ym-input.inp-error:focus { box-shadow: 0 0 0 3px rgba(205,53,70,.12); }
.ym-input.inp-success { border-color: #3F902B; }
.ym-input.inp-success:focus { box-shadow: 0 0 0 3px rgba(63,144,43,.12); }

/* Sizes */
.ym-input.inp-l { height: 44px; padding: 0 14px; font-size: 16px; }
.ym-input.inp-m { height: 36px; padding: 0 12px; font-size: 14px; }
.ym-input.inp-s { height: 28px; padding: 0 10px; font-size: 12px; }

/* Icon offset */
.ym-input.has-prefix { padding-left: 38px; }
.ym-input.has-suffix { padding-right: 38px; }
.ym-input.inp-l.has-prefix { padding-left: 44px; }
.ym-input.inp-l.has-suffix { padding-right: 44px; }

.inp-prefix-icon, .inp-suffix-icon {
  position: absolute; top: 50%; transform: translateY(-50%);
  color: var(--text-3); display: flex; align-items: center;
}
.inp-prefix-icon { left: 11px; pointer-events: none; }
.inp-suffix-icon { right: 11px; }
.inp-suffix-icon.clickable { pointer-events: auto; cursor: pointer; }

.ym-input-hint { font-size: 11.5px; color: var(--text-3); }
.ym-input-hint.hint-error { color: #CD3546; }
.ym-input-hint.hint-success { color: #3F902B; }
```

---

## React

```tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  size?: 'l' | 'm' | 's';
  state?: 'default' | 'error' | 'success';
  required?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onSuffixClick?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label, hint, size = 'm', state = 'default',
  required, prefixIcon, suffixIcon, onSuffixClick, ...props
}) => {
  const stateClass = state === 'error' ? 'inp-error' : state === 'success' ? 'inp-success' : '';
  const hintClass = state === 'error' ? 'hint-error' : state === 'success' ? 'hint-success' : '';

  return (
    <div className="ym-input-wrap">
      {label && (
        <label className="ym-input-label">
          {label}{required && <span className="req">*</span>}
        </label>
      )}
      <div className="ym-input-field-wrap">
        {prefixIcon && <span className="inp-prefix-icon">{prefixIcon}</span>}
        <input
          className={[
            'ym-input', `inp-${size}`, stateClass,
            prefixIcon ? 'has-prefix' : '',
            suffixIcon ? 'has-suffix' : '',
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {suffixIcon && (
          <span
            className={`inp-suffix-icon ${onSuffixClick ? 'clickable' : ''}`}
            onClick={onSuffixClick}
          >{suffixIcon}</span>
        )}
      </div>
      {hint && <span className={`ym-input-hint ${hintClass}`}>{hint}</span>}
    </div>
  );
};
```

---

## Accessibility

- Always associate `<label>` with input via `htmlFor` / `id` in production (demo uses proximity)
- Required fields: add `required` attribute + `aria-required="true"`
- Error fields: add `aria-invalid="true"` and `aria-describedby` pointing to the hint element
- Password toggle: suffix icon button needs `aria-label="Show/hide password"`
- Use `autocomplete` attributes for form fields (email, name, tel, etc.)

---

## Related Components

- **Textarea** (`textarea.html`) — multi-line text input
- **Button** (`button.html`) — submit action paired with inputs
- **Dropdown** (`dropdown.html`) — select from options
- **Search** (`search.html`) — search-specific input with behavior
- **Pin Input** (`pininput.html`) — segmented numeric input

---

*Yubi Market Design System · Input v1.0.0 · Internal Use*
