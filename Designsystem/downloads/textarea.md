# Textarea — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (18/54) | **Status:** Stable

---

## Overview

Multi-line text input for longer user content such as notes, descriptions, and remarks. Supports labels, helper text, character counter with over-limit indicator, error/success validation, and an auto-grow variant.

---

## Measurements

| Property         | Value      |
|------------------|------------|
| Min height       | 88px       |
| Padding          | 10px 12px  |
| Border radius    | 8px        |
| Border width     | 1.5px      |
| Font size        | 14px       |
| Line height      | 1.6        |
| Resize default   | vertical   |
| Focus ring       | 3px / 12% opacity |
| Counter font     | 11px mono  |
| Counter inset    | bottom 8px / right 10px |
| Label font       | 13px / 600 |
| Helper font      | 11.5px     |
| Disabled opacity | 0.45       |

---

## States

| State    | Border Color | Box Shadow                         |
|----------|--------------|------------------------------------|
| Default  | `--border`   | none                               |
| Hover    | `--text-3`   | none                               |
| Focus    | `#FE5104`    | `0 0 0 3px rgba(254,81,4,.12)`     |
| Error    | `#CD3546`    | `0 0 0 3px rgba(205,53,70,.12)`    |
| Success  | `#3F902B`    | `0 0 0 3px rgba(63,144,43,.12)`    |
| Disabled | `--border`   | none — opacity: 0.45, resize: none |

---

## HTML

```html
<!-- Basic textarea -->
<div class="ym-ta-wrap">
  <label class="ym-ta-label">Notes <span class="req">*</span></label>
  <div class="ym-ta-field-wrap">
    <textarea class="ym-ta" rows="4" placeholder="Add notes…"></textarea>
  </div>
  <span class="ym-ta-hint">Visible to client team</span>
</div>

<!-- With character counter -->
<div class="ym-ta-wrap">
  <label class="ym-ta-label">Loan Purpose</label>
  <div class="ym-ta-field-wrap">
    <textarea
      class="ym-ta ta-no-resize"
      rows="4"
      maxlength="200"
      oninput="updateCounter(this)"
      style="padding-bottom:28px"
    ></textarea>
    <span class="ta-counter" id="ta-count">0 / 200</span>
  </div>
</div>

<!-- Error state -->
<div class="ym-ta-wrap">
  <label class="ym-ta-label">Description</label>
  <div class="ym-ta-field-wrap">
    <textarea class="ym-ta ta-error" rows="3">Too long text…</textarea>
  </div>
  <span class="ym-ta-hint hint-error">Must be under 80 characters</span>
</div>
```

---

## CSS

```css
.ym-ta-wrap { display: flex; flex-direction: column; gap: 5px; }
.ym-ta-label { font-size: 13px; font-weight: 600; color: var(--text-1); }
.ym-ta-field-wrap { position: relative; }

.ym-ta {
  font-family: 'Inter', sans-serif; font-size: 14px; color: var(--text-1);
  background: var(--bg-panel); border: 1.5px solid var(--border);
  border-radius: 8px; width: 100%; outline: none;
  padding: 10px 12px; line-height: 1.6;
  transition: border-color 150ms, box-shadow 150ms;
  resize: vertical; min-height: 88px;
}
.ym-ta::placeholder { color: var(--text-3); }
.ym-ta:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(254,81,4,.12); }
.ym-ta:disabled { opacity: 0.45; cursor: not-allowed; background: var(--bg-inset); resize: none; }
.ym-ta.ta-error { border-color: #CD3546; }
.ym-ta.ta-success { border-color: #3F902B; }
.ym-ta.ta-no-resize { resize: none; }

.ta-counter { position: absolute; bottom: 8px; right: 10px; font-size: 11px; color: var(--text-3); font-family: monospace; pointer-events: none; }
.ta-counter.over { color: #CD3546; }
.ym-ta-hint { font-size: 11.5px; color: var(--text-3); }
.ym-ta-hint.hint-error { color: #CD3546; }
.ym-ta-hint.hint-success { color: #3F902B; }
```

---

## JavaScript

```javascript
// Character counter
function updateCounter(ta) {
  const max = parseInt(ta.getAttribute('maxlength') || '200');
  const count = ta.value.length;
  const el = document.getElementById('ta-count');
  el.textContent = count + ' / ' + max;
  el.classList.toggle('over', count >= max * 0.9);
}

// Auto-grow
function autoGrow(ta) {
  ta.style.height = 'auto';
  ta.style.height = ta.scrollHeight + 'px';
}
```

---

## Related Components

- **Input** (`input.html`) — single-line text field
- **Button** (`button.html`) — submit action
- **Modal** (`modal.html`) — confirmation dialogs often contain textareas

---

*Yubi Market Design System · Textarea v1.0.0 · Internal Use*
