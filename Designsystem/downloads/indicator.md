# Indicator — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (35/54) | **Status:** Stable

---

## Overview

A small dot used to communicate status, presence, or activity at a glance. Five sizes, six semantic colours, optional pulse animation, and inline label variant.

---

## Sizes

| Size | Class      | Diameter |
|------|------------|----------|
| XS   | `.ind-xs`  | 6px      |
| S    | `.ind-sm`  | 8px      |
| M    | `.ind-md`  | 10px (default) |
| L    | `.ind-lg`  | 12px     |
| XL   | `.ind-xl`  | 16px     |

---

## Colour Classes

| Class          | Fill            | Semantic use                      |
|----------------|-----------------|-----------------------------------|
| `.ind-online`  | #3F902B         | Active / online / success         |
| `.ind-away`    | #D98F00         | Away / pending / warning          |
| `.ind-busy`    | #CD3546         | Busy / error / overdue            |
| `.ind-offline` | var(--text-3)   | Offline / inactive / neutral      |
| `.ind-info`    | #4065C5         | Info / verified / processing      |
| `.ind-neutral` | var(--border)   | Unknown / not set                 |

---

## Measurements

| Property              | Value                      |
|-----------------------|----------------------------|
| Shape                 | 50% border-radius (circle) |
| Pulse duration        | 1.8s ease-out infinite     |
| Pulse ring inset      | -3px                       |
| Pulse ring opacity    | 0.35 → 0                   |
| Pulse ring scale      | 1 → 2                      |
| Avatar overlay border | 2px solid var(--bg-panel)  |
| Inline row gap        | 7px                        |

---

## HTML

```html
<!-- Standalone dot -->
<span class="ym-indicator ind-md ind-online" aria-label="Online"></span>

<!-- With label -->
<div class="ym-indicator-row">
  <span class="ym-indicator ind-md ind-online" aria-hidden="true"></span>
  <span>Online</span>
</div>

<!-- Pulse animation -->
<span class="ym-indicator ind-md ind-online ind-pulse"
      style="position:relative;" aria-label="Live"></span>

<!-- Avatar status overlay -->
<div style="position:relative;display:inline-flex;">
  <div class="ym-avatar av-md av-blue">AS</div>
  <span class="ym-indicator ind-sm ind-online"
        style="position:absolute;bottom:0;right:0;border:2px solid var(--bg-panel);"
        aria-label="Online"></span>
</div>
```

---

## CSS

```css
.ym-indicator {
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Sizes */
.ind-xs  { width: 6px;  height: 6px; }
.ind-sm  { width: 8px;  height: 8px; }
.ind-md  { width: 10px; height: 10px; }
.ind-lg  { width: 12px; height: 12px; }
.ind-xl  { width: 16px; height: 16px; }

/* Colours */
.ind-online  { background: #3F902B; }
.ind-away    { background: #D98F00; }
.ind-busy    { background: #CD3546; }
.ind-offline { background: var(--text-3); }
.ind-info    { background: #4065C5; }
.ind-neutral { background: var(--border); }

/* Pulse */
.ind-pulse { position: relative; }
.ind-pulse::after {
  content: '';
  position: absolute; inset: -3px;
  border-radius: 50%; background: inherit;
  opacity: .35;
  animation: ind-pulse-anim 1.8s ease-out infinite;
}
@keyframes ind-pulse-anim {
  0%   { transform: scale(1); opacity: .35; }
  70%  { transform: scale(2); opacity: 0; }
  100% { transform: scale(2); opacity: 0; }
}

/* Inline label row */
.ym-indicator-row {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 13px; color: var(--text-2); font-weight: 500;
}
```

---

## React Component

```jsx
const STATUS_COLOR = {
  online: 'ind-online', away: 'ind-away', busy: 'ind-busy',
  offline: 'ind-offline', info: 'ind-info', neutral: 'ind-neutral',
};
const SIZE_CLASS = {
  xs: 'ind-xs', sm: 'ind-sm', md: 'ind-md', lg: 'ind-lg', xl: 'ind-xl',
};

function Indicator({ status = 'online', size = 'md', pulse = false, label }) {
  const cls = [
    'ym-indicator', SIZE_CLASS[size], STATUS_COLOR[status],
    pulse ? 'ind-pulse' : '',
  ].filter(Boolean).join(' ');

  if (label) {
    return (
      <div className="ym-indicator-row">
        <span className={cls} style={pulse ? { position: 'relative' } : undefined} aria-hidden="true" />
        <span>{label}</span>
      </div>
    );
  }
  return <span className={cls} style={pulse ? { position: 'relative' } : undefined} aria-label={status} />;
}
```

---

## Accessibility

- Standalone dot: add `aria-label="Online"` (or relevant status text)
- When paired with a text label, set `aria-hidden="true"` on the dot — the label conveys the meaning
- Do not rely solely on colour; always pair with a text label or `aria-label`
- Avatar overlay: `aria-label` on the indicator is sufficient; do not duplicate on the avatar

---

## Related Components

- **Avatar** (`avatar.html`) — avatar component with built-in `.av-status` dot slot
- **Badge** (`badge.html`) — `.badge-dot` variant uses the same semantic colours
- **List** (`list.html`) — often used in list rows for presence status

---

*Yubi Market Design System · Indicator v1.0.0 · Internal Use*
