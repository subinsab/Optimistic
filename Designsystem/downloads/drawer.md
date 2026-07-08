# Drawer — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Overlays (42/54) | **Status:** Stable

---

## Overview

Side panel that slides in from the right (or left) to show detail views, forms, or secondary content without leaving the current page. Has a fixed header, scrollable body, and sticky footer with action buttons.

---

## Sizes

| Size | Width  |
|------|--------|
| S    | 320px  |
| M    | 400px (default) |
| L    | 560px  |

All sizes have `max-width: 90vw` for mobile safety.

---

## Measurements

| Property          | Value                                   |
|-------------------|-----------------------------------------|
| Default width     | 400px                                   |
| Max width         | 90vw                                    |
| Header padding    | 22px 24px                               |
| Body padding      | 24px                                    |
| Footer padding    | 16px 24px                               |
| Title font        | 16px / 700                              |
| Subtitle font     | 13px / --text-3                         |
| Backdrop          | rgba(0,0,0,.4)                          |
| Shadow (right)    | -8px 0 32px rgba(0,0,0,.12)            |
| Slide animation   | 280ms cubic-bezier(.4,0,.2,1)          |
| Close button      | 30 × 30px, r8                           |

---

## HTML

```html
<!-- Right drawer (default) -->
<div class="ym-drawer-overlay" id="my-drawer"
     role="dialog" aria-modal="true" aria-labelledby="drawer-title"
     onclick="closeOnBackdrop(event,'my-drawer')">
  <div class="ym-drawer">
    <div class="ym-drawer-header">
      <div>
        <div class="ym-drawer-title" id="drawer-title">Loan Details</div>
        <div class="ym-drawer-subtitle">LN-20450</div>
      </div>
      <button class="ym-drawer-close" onclick="closeDrawer('my-drawer')" aria-label="Close">×</button>
    </div>
    <div class="ym-drawer-body">
      <!-- scrollable content -->
    </div>
    <div class="ym-drawer-footer">
      <button class="ym-btn secondary btn-m" onclick="closeDrawer('my-drawer')">Cancel</button>
      <button class="ym-btn primary btn-m">Save</button>
    </div>
  </div>
</div>

<!-- Size modifiers: add to .ym-drawer -->
<!-- Small:  class="ym-drawer ym-drawer-sm" -->
<!-- Large:  class="ym-drawer ym-drawer-lg" -->
<!-- Left:   class="ym-drawer ym-drawer-left" -->
```

---

## CSS

```css
.ym-drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  z-index: 1000; opacity: 0; pointer-events: none;
  transition: opacity 250ms ease;
}
.ym-drawer-overlay.open { opacity: 1; pointer-events: all; }

.ym-drawer {
  position: fixed; top: 0; bottom: 0; right: 0;
  width: 400px; max-width: 90vw;
  background: var(--bg-panel); border-left: 1px solid var(--border);
  z-index: 1001; display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 280ms cubic-bezier(.4,0,.2,1);
  box-shadow: -8px 0 32px rgba(0,0,0,.12);
}
.ym-drawer-overlay.open .ym-drawer { transform: translateX(0); }

.ym-drawer-sm { width: 320px; }
.ym-drawer-lg { width: 560px; }

.ym-drawer-left {
  right: auto; left: 0;
  border-left: none; border-right: 1px solid var(--border);
  transform: translateX(-100%);
  box-shadow: 8px 0 32px rgba(0,0,0,.12);
}
.ym-drawer-overlay.open .ym-drawer-left { transform: translateX(0); }

.ym-drawer-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 22px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0;
}
.ym-drawer-title { font-size: 16px; font-weight: 700; color: var(--text-1); }
.ym-drawer-body { flex: 1; overflow-y: auto; padding: 24px; }
.ym-drawer-footer {
  padding: 16px 24px; border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: flex-end;
  gap: 10px; flex-shrink: 0;
}
```

---

## JavaScript

```javascript
function openDrawer(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeOnBackdrop(e, id) {
  if (e.target === e.currentTarget) closeDrawer(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ym-drawer-overlay.open').forEach(d => {
      d.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
```

---

## When to use Drawer vs Modal

| Drawer                               | Modal                                  |
|--------------------------------------|----------------------------------------|
| Detail view alongside list           | Confirmation requiring full attention  |
| Long forms (5+ fields)               | Short confirmations (≤3 fields)        |
| Doesn't fully block context          | Fully interrupts the flow              |
| Content relates to selected list item| Standalone action                      |

---

## Accessibility

- `role="dialog"` and `aria-modal="true"` on the drawer panel (not overlay)
- `aria-labelledby` pointing to `.ym-drawer-title`
- Move focus into the drawer on open
- Trap focus within while open; restore on close
- `aria-label="Close"` on the close button

---

## Related Components

- **Modal** (`modal.html`) — centered dialog for confirmations
- **Bottom Sheet** (`bottomsheet.html`) — mobile-optimised overlay
- **Side Navigation** (`sidebar.html`) — persistent side panel

---

*Yubi Market Design System · Drawer v1.0.0 · Internal Use*
