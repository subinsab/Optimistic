# Pin Input — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (27/54) | **Status:** Stable

---

## Overview

OTP and PIN entry for two-factor authentication, transaction confirmation, and KYC verification. Individual digit cells with auto-focus-advance on input, backspace-retreat, paste distribution, and shake animation on wrong entry.

---

## States

| State   | Class on group    | Description                              |
|---------|-------------------|------------------------------------------|
| Default | `.ym-pin-group`   | Neutral border, no fill                  |
| Filled  | `.filled` on cell | Accent border, alpha accent bg           |
| Focus   | (native :focus)   | Accent border + 3px focus ring           |
| Success | `.pin-success`    | Green borders + green success message    |
| Error   | `.pin-error`      | Red borders + red error message          |
| Masked  | `type="password"` | Dots instead of digits                   |

---

## Measurements

| Property             | Value                              |
|----------------------|------------------------------------|
| Cell size (default)  | 48 × 56px                          |
| Cell size (sm)       | 38 × 44px                          |
| Cell size (lg)       | 60 × 68px                          |
| Border radius        | 10px                               |
| Border               | 1.5px solid var(--border)          |
| Gap between cells    | 10px                               |
| Font                 | 22px / 700                         |
| Focus ring           | 0 0 0 3px rgba(64,101,197,.14)     |
| Filled border        | #4065C5                            |
| Filled bg            | rgba(64,101,197,.06)               |
| Success border       | #3F902B                            |
| Error border         | #CD3546                            |
| Shake duration       | 400ms ease                         |

---

## HTML

```html
<div class="ym-pin-group"
     role="group"
     aria-label="One-time password, 6 digits">

  <input class="ym-pin-cell"
         type="text"
         inputmode="numeric"
         maxlength="1"
         placeholder="·"
         autocomplete="one-time-code"
         aria-label="Digit 1 of 6" />

  <!-- Repeat for each digit -->

</div>

<!-- States -->
<!-- Error:   <div class="ym-pin-group pin-error"> -->
<!-- Success: <div class="ym-pin-group pin-success"> -->
<!-- Masked:  type="password" on each cell -->
<!-- Small:   <div class="ym-pin-group pin-sm"> -->
```

---

## CSS

```css
.ym-pin-group { display: flex; gap: 10px; }
.ym-pin-cell {
  width: 48px; height: 56px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--bg-panel);
  text-align: center;
  font-size: 22px; font-weight: 700;
  color: var(--text-1);
  outline: none; caret-color: #4065C5;
  transition: border-color 160ms, box-shadow 160ms, background 160ms;
}
.ym-pin-cell:focus   { border-color: #4065C5; box-shadow: 0 0 0 3px rgba(64,101,197,.14); }
.ym-pin-cell.filled  { border-color: #4065C5; background: rgba(64,101,197,.06); }
.pin-error .ym-pin-cell   { border-color: #CD3546; }
.pin-success .ym-pin-cell { border-color: #3F902B; }

@keyframes pin-shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.pin-shake { animation: pin-shake 400ms ease; }
```

---

## JavaScript

```javascript
function initPinGroup(groupEl) {
  const cells = [...groupEl.querySelectorAll('.ym-pin-cell')];

  cells.forEach((cell, i) => {
    // Auto-advance on input
    cell.addEventListener('input', () => {
      const val = cell.value.replace(/\D/g, '');
      cell.value = val.slice(-1);
      cell.classList.toggle('filled', !!cell.value);
      if (cell.value && i < cells.length - 1) cells[i + 1].focus();
    });

    // Backspace retreat
    cell.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !cell.value && i > 0) {
        cells[i - 1].focus();
        cells[i - 1].value = '';
        cells[i - 1].classList.remove('filled');
      }
    });

    // Paste distribution
    cell.addEventListener('paste', e => {
      e.preventDefault();
      const digits = e.clipboardData.getData('text').replace(/\D/g, '');
      digits.split('').forEach((d, j) => {
        if (cells[i + j]) { cells[i + j].value = d; cells[i + j].classList.add('filled'); }
      });
      cells[Math.min(i + digits.length, cells.length - 1)].focus();
    });
  });
}

function shakePin(groupEl) {
  groupEl.classList.remove('pin-shake');
  void groupEl.offsetWidth; // force reflow
  groupEl.classList.add('pin-shake');
  groupEl.classList.add('pin-error');
  setTimeout(() => groupEl.classList.remove('pin-shake'), 400);
}

document.querySelectorAll('.ym-pin-group').forEach(initPinGroup);
```

---

## Accessibility

- Group wrapper: `role="group"` with `aria-label` describing the purpose and digit count
- Each cell: `aria-label="Digit N of M"` (e.g. "Digit 1 of 6")
- Use `inputmode="numeric"` for mobile numeric keyboard
- First cell: `autocomplete="one-time-code"` for browser OTP autofill support
- Error state: add `aria-invalid="true"` on each cell; `aria-describedby` pointing to error message
- Do not auto-submit on completion — let the user confirm with a button

---

## Related Components

- **Input** (`input.html`) — standard text input for other form fields
- **Modal** (`modal.html`) — OTP dialogs commonly host pin inputs
- **Stepper** (`stepper.html`) — KYC/onboarding flows that include OTP steps

---

*Yubi Market Design System · Pin Input v1.0.0 · Internal Use*
