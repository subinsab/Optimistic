# Pills — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (34/54) | **Status:** Stable

---

## Overview

Selectable filter chips for single or multi-select filtering. Toggle on/off with a click — no remove button, just selection state. Pill shape (20px border-radius) distinguishes them from Tags (6px radius).

---

## Sizes

| Size | Class       | Font | Padding   |
|------|-------------|------|-----------|
| S    | `.pill-sm`  | 11px | 4px 10px  |
| M    | (default)   | 13px | 6px 14px  |
| L    | `.pill-lg`  | 14px | 8px 18px  |

---

## States

| State           | Background              | Border      | Text         |
|-----------------|-------------------------|-------------|--------------|
| Default         | var(--bg-inset)         | var(--border) | var(--text-2) |
| Hover           | var(--bg-panel)         | var(--text-3) | var(--text-1) |
| Selected        | rgba(64,101,197,.12)    | #4065C5     | #4065C5      |
| Selected hover  | rgba(64,101,197,.18)    | #4065C5     | #4065C5      |
| Selected accent | rgba(254,81,4,.1)       | #FE5104     | #FE5104      |
| Focus           | —                       | var(--accent) | —           |
| Disabled        | opacity: 0.45           | —           | —            |

---

## Measurements

| Property       | Value                       |
|----------------|-----------------------------|
| Border radius  | 20px                        |
| Border         | 1.5px solid var(--border)   |
| Font weight    | 600                         |
| Gap            | 6px                         |
| Count size     | 18 × 18px                   |
| Count font     | 10px / 700                  |
| Count radius   | 9px                         |
| Focus ring     | 3px rgba(254,81,4,.22)      |

---

## HTML

```html
<!-- Unselected pill -->
<button class="ym-pill" role="checkbox" aria-checked="false">Active</button>

<!-- Selected pill -->
<button class="ym-pill selected" role="checkbox" aria-checked="true">Active</button>

<!-- Pill with count -->
<button class="ym-pill selected" role="checkbox" aria-checked="true">
  All <span class="pill-count">54</span>
</button>

<!-- Pill with icon -->
<button class="ym-pill">
  <span class="pill-icon"><!-- 13px SVG --></span>
  Verified
</button>

<!-- Radio group (single-select) -->
<div role="radiogroup" id="period-group">
  <button class="ym-pill pill-accent" role="radio" aria-checked="false">Weekly</button>
  <button class="ym-pill pill-accent selected" role="radio" aria-checked="true">Monthly</button>
  <button class="ym-pill pill-accent" role="radio" aria-checked="false">Quarterly</button>
</div>

<!-- Sizes -->
<button class="ym-pill pill-sm">Small</button>
<button class="ym-pill">Medium</button>
<button class="ym-pill pill-lg">Large</button>

<!-- Disabled -->
<button class="ym-pill" aria-disabled="true" disabled>Disabled</button>
```

---

## CSS

```css
.ym-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; line-height: 1;
  padding: 6px 14px; border-radius: 20px;
  background: var(--bg-inset); color: var(--text-2);
  border: 1.5px solid var(--border);
  cursor: pointer; user-select: none;
  transition: background 140ms ease, border-color 140ms ease,
              color 140ms ease, box-shadow 140ms ease;
  white-space: nowrap;
}
.ym-pill:hover {
  background: var(--bg-panel);
  border-color: var(--text-3);
  color: var(--text-1);
}
.ym-pill:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(254,81,4,.22);
  border-color: var(--accent);
}
.ym-pill.selected {
  background: rgba(64,101,197,.12);
  border-color: #4065C5;
  color: #4065C5;
}
.ym-pill.selected:hover { background: rgba(64,101,197,.18); }

/* Sizes */
.pill-sm { font-size: 11px; padding: 4px 10px; }
.pill-lg { font-size: 14px; padding: 8px 18px; }

/* Count badge */
.pill-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; border-radius: 9px;
  background: #4065C5; color: #fff;
  font-size: 10px; font-weight: 700; padding: 0 4px;
}
.ym-pill:not(.selected) .pill-count {
  background: var(--border); color: var(--text-2);
}

/* Accent variant (orange) */
.ym-pill.pill-accent.selected {
  background: rgba(254,81,4,.1);
  border-color: #FE5104; color: #FE5104;
}
.ym-pill.pill-accent.selected .pill-count { background: #FE5104; }

/* Disabled */
.ym-pill:disabled,
.ym-pill[aria-disabled="true"] {
  opacity: .45; cursor: not-allowed; pointer-events: none;
}
```

---

## JavaScript

### Multi-select (checkbox behaviour)
```javascript
function togglePill(btn) {
  if (btn.getAttribute('aria-disabled') === 'true') return;
  const isSelected = btn.classList.toggle('selected');
  btn.setAttribute('aria-checked', isSelected);
}
```

### Single-select (radio behaviour)
```javascript
function selectPillRadio(btn, groupId) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.ym-pill').forEach(p => {
    p.classList.remove('selected');
    p.setAttribute('aria-checked', 'false');
  });
  btn.classList.add('selected');
  btn.setAttribute('aria-checked', 'true');
}
```

---

## React Component

```jsx
import { useState } from 'react';

function Pill({ label, selected, onClick, size, count, icon, accent }) {
  const cls = [
    'ym-pill',
    selected ? 'selected' : '',
    accent ? 'pill-accent' : '',
    size === 'sm' ? 'pill-sm' : size === 'lg' ? 'pill-lg' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
    >
      {icon && <span className="pill-icon">{icon}</span>}
      {label}
      {count !== undefined && <span className="pill-count">{count}</span>}
    </button>
  );
}

// Multi-select filter group
function PillGroup({ options }) {
  const [selected, setSelected] = useState(new Set());
  const toggle = (id) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className="ym-pill-group">
      {options.map(opt => (
        <Pill
          key={opt.id}
          label={opt.label}
          count={opt.count}
          selected={selected.has(opt.id)}
          onClick={() => toggle(opt.id)}
        />
      ))}
    </div>
  );
}

// Radio group (single-select)
function PillRadioGroup({ options, value, onChange }) {
  return (
    <div role="radiogroup" className="ym-pill-group">
      {options.map(opt => (
        <Pill
          key={opt.value}
          label={opt.label}
          selected={value === opt.value}
          accent
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
```

---

## Accessibility

- **Multi-select** pills use `role="checkbox"` + `aria-checked`
- **Single-select** pills use `role="radio"` inside a `role="radiogroup"` container
- Wrap pill groups in a `<fieldset>` + `<legend>` or `aria-label` for screen readers
- Disabled pills must have both `disabled` attribute and `aria-disabled="true"` for full browser support
- Focus ring meets WCAG 2.4.11 minimum contrast requirement

---

## Pills vs Tags vs Badge

| Aspect         | Pill               | Tag               | Badge          |
|----------------|--------------------|-------------------|----------------|
| Border radius  | 20px               | 6px               | 20px           |
| Selectable     | Yes (toggle)       | No                | No             |
| Removable      | No                 | Yes               | No             |
| User-editable  | Toggle on/off      | Add / remove      | Read-only      |
| Purpose        | Filter / select    | Categorise items  | Show status    |

---

## Related Components

- **Tags** (`tags.html`) — user-applied, removable labels
- **Badge** (`badge.html`) — non-interactive status labels
- **Filter** (`filter.html`) — advanced filter panel with pills, date range, search

---

*Yubi Market Design System · Pills v1.0.0 · Internal Use*
