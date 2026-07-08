# FAB — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Actions (3/3) | **Status:** Stable

---

## Overview

Floating Action Button for the primary action on a screen — initiate a disbursement, create a new loan application, or start a chat. Three sizes (sm/md/lg), an extended variant with a text label, a surface-colour variant, and a speed-dial pattern for secondary actions.

---

## Variants

| Variant      | Description                                                        |
|--------------|--------------------------------------------------------------------|
| Primary      | Orange (#FE5104) — main brand CTA                                  |
| Blue         | #4065C5 — secondary brand action                                   |
| Surface      | Panel bg + border — low-emphasis, adapts to light/dark             |
| Extended     | Pill with icon + label text                                        |
| Speed dial   | Trigger FAB expands a list of mini FABs with side labels           |

---

## Measurements

| Property          | Value                                  |
|-------------------|----------------------------------------|
| sm size           | 40×40px                                |
| md size (default) | 52×52px                                |
| lg size           | 64×64px                                |
| ext height        | 52px                                   |
| ext padding       | 0 20px                                 |
| border-radius     | 50px (pill / circle)                   |
| Primary bg        | #FE5104                                |
| Blue bg           | #4065C5                                |
| Hover lift        | translateY(−2px)                       |
| Shadow (rest)     | 0 4px 16px rgba(0,0,0,.16)             |
| Shadow (hover)    | 0 8px 24px rgba(0,0,0,.20)             |
| Transition        | 150ms                                  |
| Dial item gap     | 8px                                    |
| Mini label bg     | var(--bg-panel)                        |
| Trigger rotate    | 45deg when open                        |

---

## HTML

```html
<!-- Standard FAB (medium, primary) -->
<button class="ym-fab ym-fab-md ym-fab-primary"
        aria-label="Create new application">
  <!-- plus SVG -->
</button>

<!-- Extended FAB -->
<button class="ym-fab ym-fab-ext ym-fab-primary"
        aria-label="New Application">
  <!-- plus SVG -->
  New Application
</button>

<!-- Surface variant -->
<button class="ym-fab ym-fab-md ym-fab-surface"
        aria-label="Add item">
  <!-- plus SVG -->
</button>

<!-- Speed dial -->
<div class="ym-fab-dial" id="fabDial">
  <div class="ym-fab-dial-list" role="menu">
    <div style="position:relative">
      <button class="ym-fab ym-fab-sm ym-fab-blue"
              role="menuitem" aria-label="Upload document">
        <!-- upload SVG -->
      </button>
      <span class="ym-fab-mini-label">Upload doc</span>
    </div>
    <!-- more mini FABs -->
  </div>
  <button class="ym-fab ym-fab-md ym-fab-primary ym-fab-dial-trigger"
          id="fabDialBtn"
          aria-label="Open actions"
          aria-expanded="false"
          aria-haspopup="true"
          onclick="toggleDial()">
    <!-- plus SVG -->
  </button>
</div>
```

---

## CSS

```css
.ym-fab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0,0,0,.16);
  transition: transform 150ms, box-shadow 150ms, background 150ms;
}
.ym-fab:hover  { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.2); }
.ym-fab:active { transform: translateY(0); box-shadow: 0 2px 8px rgba(0,0,0,.14); }

/* Sizes */
.ym-fab-sm  { width: 40px; height: 40px; }
.ym-fab-md  { width: 52px; height: 52px; }
.ym-fab-lg  { width: 64px; height: 64px; }
.ym-fab-ext { height: 52px; padding: 0 20px; font-size: 14px; }

/* Colours */
.ym-fab-primary { background: #FE5104; color: #fff; }
.ym-fab-primary:hover { background: #E84800; }
.ym-fab-blue    { background: #4065C5; color: #fff; }
.ym-fab-blue:hover { background: #3054B0; }
.ym-fab-surface {
  background: var(--bg-panel);
  color: var(--text-1);
  border: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(0,0,0,.1);
}

/* Speed dial container */
.ym-fab-dial {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ym-fab-dial-list {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; pointer-events: none;
  transition: opacity 200ms, transform 200ms;
}
.ym-fab-dial.open .ym-fab-dial-list {
  opacity: 1; pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

/* Trigger icon rotation */
.ym-fab-dial-trigger svg { transition: transform 300ms ease; }
.ym-fab-dial.open .ym-fab-dial-trigger svg { transform: rotate(45deg); }

/* Mini action label */
.ym-fab-mini-label {
  position: absolute;
  right: calc(100% + 10px);
  top: 50%; transform: translateY(-50%);
  white-space: nowrap; font-size: 11.5px; font-weight: 600;
  background: var(--bg-panel); color: var(--text-1);
  padding: 4px 10px; border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  border: 1px solid var(--border);
}
```

---

## JavaScript

```javascript
function toggleDial() {
  const dial = document.getElementById('fabDial');
  const btn  = document.getElementById('fabDialBtn');
  const open = dial.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Close actions' : 'Open actions');
}

function closeDial() {
  const dial = document.getElementById('fabDial');
  const btn  = document.getElementById('fabDialBtn');
  dial.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open actions');
}

// Close on outside click or Escape
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-fab-dial')) closeDial();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDial();
});
```

---

## Accessibility

- `<button>` element — inherits keyboard focus; never use `<div>` or `<a>`
- `aria-label` describing the action (not just "FAB" or "Plus")
- Speed dial trigger: `aria-expanded="true/false"` toggled by JS; `aria-haspopup="true"`
- Speed dial list: `role="menu"` with mini FABs as `role="menuitem"`
- Extended FAB: visible label text satisfies name requirement; `aria-label` not needed
- Ensure contrast ≥ 3:1 between icon/label and button background

---

## Related Components

- **Button** (`button.html`) — primary action in forms and modals
- **Icon Button** (`iconbutton.html`) — compact icon-only actions in toolbars
- **Menu** (`menu.html`) — alternative to speed dial for contextual action lists
- **Tooltip** (`tooltip.html`) — pair with FAB for label on hover (icon-only variant)

---

*Yubi Market Design System · FAB v1.0.0 · Internal Use*
