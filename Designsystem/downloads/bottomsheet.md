# Bottom Sheet — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Overlays (45/54) | **Status:** Stable

---

## Overview

Mobile-optimised overlay that slides up from the bottom of the viewport. Ideal for action menus, filter panels, and secondary content on small screens. Features a drag handle indicator, scrollable body, optional sticky footer, and iOS safe-area-aware padding.

---

## Sizes

| Size | Class       | Max height |
|------|-------------|------------|
| S    | `.ym-bs-sm` | 40vh       |
| M    | (default)   | 90vh       |
| L    | `.ym-bs-lg` | 85vh       |

---

## Measurements

| Property            | Value                                    |
|---------------------|------------------------------------------|
| Background          | var(--bg-panel)                          |
| Border top          | 1px solid var(--border)                  |
| Border radius (top) | 16px 16px 0 0                            |
| Box shadow          | 0 -8px 40px rgba(0,0,0,.14)              |
| Default max-height  | 90vh                                     |
| Slide animation     | 300ms cubic-bezier(.4,0,.2,1)            |
| Handle              | 36 × 4px, border-radius 2px             |
| Handle color        | var(--border)                            |
| Handle margin       | 12px auto 0                              |
| Header padding      | 16px 20px                                |
| Body padding        | 20px                                     |
| Footer padding      | 14px 20px + env(safe-area-inset-bottom)  |
| Title font          | 15px / 700                               |
| Backdrop            | rgba(0,0,0,.45)                          |
| z-index (overlay)   | 1000                                     |
| z-index (sheet)     | 1001                                     |

---

## HTML

```html
<!-- Trigger -->
<button onclick="openBS('my-sheet')">Open Sheet</button>

<!-- Bottom Sheet -->
<div class="ym-bs-overlay" id="my-sheet"
     role="dialog" aria-modal="true" aria-labelledby="sheet-title"
     onclick="closeOnBSBackdrop(event,'my-sheet')">
  <div class="ym-bs">
    <div class="ym-bs-handle"></div>
    <div class="ym-bs-header">
      <div>
        <div class="ym-bs-title" id="sheet-title">Sheet Title</div>
        <div class="ym-bs-subtitle">Optional subtitle</div>
      </div>
      <button class="ym-bs-close" onclick="closeBS('my-sheet')" aria-label="Close">×</button>
    </div>
    <div class="ym-bs-body">
      <!-- scrollable content -->
    </div>
    <div class="ym-bs-footer">
      <button class="ym-btn secondary btn-m" onclick="closeBS('my-sheet')">Cancel</button>
      <button class="ym-btn primary btn-m">Apply</button>
    </div>
  </div>
</div>

<!-- Size modifiers (add to .ym-bs) -->
<!-- Small:  class="ym-bs ym-bs-sm" -->
<!-- Large:  class="ym-bs ym-bs-lg" -->
```

---

## CSS

```css
.ym-bs-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 1000;
  opacity: 0; pointer-events: none;
  transition: opacity 250ms ease;
}
.ym-bs-overlay.open { opacity: 1; pointer-events: all; }

.ym-bs {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--bg-panel);
  border-top: 1px solid var(--border);
  border-radius: 16px 16px 0 0;
  z-index: 1001;
  display: flex; flex-direction: column;
  max-height: 90vh;
  transform: translateY(100%);
  transition: transform 300ms cubic-bezier(.4,0,.2,1);
  box-shadow: 0 -8px 40px rgba(0,0,0,.14);
}
.ym-bs-overlay.open .ym-bs { transform: translateY(0); }

.ym-bs-sm { max-height: 40vh; }
.ym-bs-lg { max-height: 85vh; }

.ym-bs-handle {
  width: 36px; height: 4px;
  background: var(--border);
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;
}

.ym-bs-header {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.ym-bs-title { font-size: 15px; font-weight: 700; color: var(--text-1); }
.ym-bs-subtitle { font-size: 12px; color: var(--text-3); margin-top: 2px; }
.ym-bs-close {
  width: 28px; height: 28px; border-radius: 7px; border: none;
  background: var(--bg-inset); color: var(--text-3); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.ym-bs-close:hover { background: var(--border); color: var(--text-1); }

.ym-bs-body { flex: 1; overflow-y: auto; padding: 20px; }
.ym-bs-footer {
  padding: 14px 20px;
  padding-bottom: calc(14px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--border);
  display: flex; justify-content: flex-end; gap: 10px;
  flex-shrink: 0;
}
```

---

## JavaScript

```javascript
function openBS(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBS(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeOnBSBackdrop(e, id) {
  if (e.target === e.currentTarget) closeBS(id);
}
// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ym-bs-overlay.open').forEach(el => {
      el.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
```

---

## Accessibility

- `role="dialog"` and `aria-modal="true"` on the overlay
- `aria-labelledby` pointing to the title element
- Move focus to the first interactive element on open
- Trap focus within while open; restore to trigger on close
- `aria-label="Close"` on the close button
- Handle is presentational — add `aria-hidden="true"` to `.ym-bs-handle`

---

## When to use Bottom Sheet vs Modal vs Drawer

| Bottom Sheet                          | Modal                              | Drawer                              |
|---------------------------------------|------------------------------------|-------------------------------------|
| Mobile-first, thumb-friendly          | Desktop-first, centered            | Any viewport, slides from side      |
| Action menus, filters, quick forms    | Confirmations, focused dialogs     | Detail views, multi-step forms      |
| Slides from bottom                    | Fades in at center                 | Slides from left or right           |
| Up to ~90vh                           | Up to calc(100vh - 80px)           | Full viewport height                |

---

## Related Components

- **Modal** (`modal.html`) — centered dialog for confirmations
- **Drawer** (`drawer.html`) — side panel for detail views
- **Popover** (`popover.html`) — anchored floating panel

---

*Yubi Market Design System · Bottom Sheet v1.0.0 · Internal Use*
