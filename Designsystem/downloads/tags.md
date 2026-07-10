# Tags — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (33/54) | **Status:** Stable

---

## Overview

User-applied, removable labels for categorising or filtering content. Distinguished from Badge by their 6px border-radius (vs Badge's 20px pill), interactive remove button, and tag-input field pattern for adding new tags inline.

---

## Sizes

| Property      | Value         |
|---------------|---------------|
| Font size     | 12px          |
| Font weight   | 600           |
| Padding       | 4px 10px      |
| Border radius | 6px           |
| Remove btn    | 16 × 16px     |
| Gap (icon)    | 5px           |

---

## Colour Variants

| Class          | Background                  | Text     |
|----------------|-----------------------------|----------|
| (default)      | var(--bg-inset)             | var(--text-2) |
| `.tag-blue`    | rgba(64,101,197,.1)         | #4065C5  |
| `.tag-green`   | rgba(63,144,43,.12)         | #3F902B  |
| `.tag-orange`  | rgba(254,81,4,.1)           | #FE5104  |
| `.tag-red`     | rgba(205,53,70,.1)          | #CD3546  |
| `.tag-purple`  | rgba(120,80,200,.1)         | #7850C8  |
| `.tag-teal`    | rgba(0,152,141,.1)          | #00988D  |
| `.tag-yellow`  | rgba(217,151,0,.1)          | #B07E00  |

---

## HTML

```html
<!-- Static tag -->
<span class="ym-tag tag-blue">KYC Verified</span>

<!-- Removable tag -->
<span class="ym-tag tag-green tag-removable">
  Active
  <button class="ym-tag-remove" aria-label="Remove Active" onclick="this.closest('.ym-tag').remove()">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  </button>
</span>

<!-- Tag input field -->
<div class="ym-tag-input" id="myTagInput" onclick="this.querySelector('input').focus()">
  <input type="text" class="ym-tag-field" placeholder="Add tag…"
         onkeydown="handleTagInput(event, 'myTagInput')"/>
</div>
```

---

## CSS

```css
.ym-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; line-height: 1;
  padding: 4px 10px; border-radius: 6px;
  background: var(--bg-inset); color: var(--text-2);
  border: 1px solid var(--border);
  user-select: none;
}

.ym-tag.tag-removable { padding-right: 6px; }

.ym-tag-remove {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; border-radius: 4px;
  border: none; background: transparent; color: var(--text-3);
  cursor: pointer; padding: 0; flex-shrink: 0;
  transition: background 140ms ease, color 140ms ease;
}
.ym-tag-remove:hover { background: rgba(0,0,0,.08); color: var(--text-1); }

/* Colour variants */
.tag-blue   { background: rgba(64,101,197,.1);  color: #4065C5; border-color: rgba(64,101,197,.25); }
.tag-green  { background: rgba(63,144,43,.12);  color: #3F902B; border-color: rgba(63,144,43,.28); }
.tag-orange { background: rgba(254,81,4,.1);    color: #FE5104; border-color: rgba(254,81,4,.25); }
.tag-red    { background: rgba(205,53,70,.1);   color: #CD3546; border-color: rgba(205,53,70,.25); }
.tag-purple { background: rgba(120,80,200,.1);  color: #7850C8; border-color: rgba(120,80,200,.25); }
.tag-teal   { background: rgba(0,152,141,.1);   color: #00988D; border-color: rgba(0,152,141,.25); }
.tag-yellow { background: rgba(217,151,0,.1);   color: #B07E00; border-color: rgba(217,151,0,.25); }

/* Tag input */
.ym-tag-input {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  padding: 8px 12px; background: var(--bg-inset);
  border: 1px solid var(--border); border-radius: 9px;
  min-height: 42px; cursor: text;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.ym-tag-input:focus-within {
  border-color: #FE5104;
  box-shadow: 0 0 0 3px rgba(254,81,4,.12);
}
.ym-tag-field {
  border: none; outline: none; background: transparent;
  color: var(--text-1); font-size: 13px; min-width: 80px; flex: 1;
}
.ym-tag-field::placeholder { color: var(--text-3); }
```

---

## JavaScript (Tag Input)

```javascript
const COLORS = ['blue','green','orange','red','purple','teal','yellow'];
let colorIdx = 0;

function handleTagInput(e, containerId) {
  const input = e.target;
  const container = document.getElementById(containerId);
  const val = input.value.trim().replace(/,$/, '');

  if ((e.key === 'Enter' || e.key === ',') && val) {
    e.preventDefault();
    const color = COLORS[colorIdx % COLORS.length];
    colorIdx++;

    const tag = document.createElement('span');
    tag.className = `ym-tag tag-${color} tag-removable`;
    tag.innerHTML = `${val}
      <button class="ym-tag-remove" aria-label="Remove ${val}">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>`;
    tag.querySelector('.ym-tag-remove').onclick = () => tag.remove();
    container.insertBefore(tag, input);
    input.value = '';
  }

  if (e.key === 'Backspace' && !input.value) {
    const tags = container.querySelectorAll('.ym-tag');
    if (tags.length) tags[tags.length - 1].remove();
  }
}
```

---

## Accessibility

- Each `ym-tag-remove` button must have `aria-label="Remove [tag name]"`
- Tag input container should have `role="group"` and `aria-label="Tags"`
- Announce tag additions/removals with an `aria-live="polite"` region
- The tag input field should have a visible `placeholder` and associated `<label>`
- Keyboard: Enter or comma adds tag; Backspace on empty input removes last tag

---

## Tags vs Badge vs Pills

| Aspect         | Tag              | Badge           | Pills            |
|----------------|------------------|-----------------|------------------|
| Border radius  | 6px              | 20px            | 20px             |
| User-editable  | Yes (add/remove) | No              | Yes (selectable) |
| Purpose        | Categorise items | Show status     | Filter/select    |
| Remove button  | Yes              | No              | No               |

---

## Related Components

- **Badge** (`badge.html`) — non-removable status labels with pill shape
- **Pills** (`pills.html`) — selectable filter chips, no remove action
- **Indicator** (`indicator.html`) — dot-only presence indicator

---

*Yubi Market Design System · Tags v1.0.0 · Internal Use*
