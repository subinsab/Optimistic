# Popover — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Overlays (43/54) | **Status:** Stable

---

## Overview

Click-triggered floating panel anchored to a trigger element. Richer than a tooltip — can contain menus, forms, and interactive content. Closes on outside click or Escape key press.

---

## Placements

| Modifier class | Direction     |
|----------------|---------------|
| (none)         | Bottom-left (default) |
| `.pop-right`   | Bottom-right  |
| `.pop-top`     | Top (above trigger) |

---

## Measurements

| Property          | Value                          |
|-------------------|--------------------------------|
| Background        | var(--bg-panel)                |
| Border            | 1px solid var(--border)        |
| Border radius     | 10px                           |
| Box shadow        | 0 8px 32px rgba(0,0,0,.14)     |
| Min width         | 220px                          |
| Offset from trigger | 8px                          |
| Header padding    | 14px 16px 12px                 |
| Body padding      | 14px 16px                      |
| Footer padding    | 10px 16px 14px                 |
| Enter animation   | 180ms ease                     |
| Enter scale       | scale(.97) → scale(1)          |
| Title font        | 13px / 700                     |
| Arrow size        | 10 × 10px, rotated 45°         |
| z-index           | 800                            |

---

## HTML

```html
<!-- Context menu popover (bottom-left default) -->
<div class="ym-popover-anchor">
  <button class="ym-btn secondary btn-m"
          onclick="togglePop('my-popover')"
          aria-haspopup="true" aria-expanded="false"
          aria-controls="my-popover">
    Actions
  </button>
  <div class="ym-popover" id="my-popover" role="menu" aria-label="Actions">
    <div class="ym-popover-body" style="padding:8px;">
      <div class="pop-menu-item" role="menuitem">View details</div>
      <div class="pop-menu-item" role="menuitem">Edit loan</div>
      <div class="pop-divider"></div>
      <div class="pop-menu-item danger" role="menuitem">Delete</div>
    </div>
  </div>
</div>

<!-- Bottom-right: add .pop-right to .ym-popover -->
<!-- Top: add .pop-top to .ym-popover -->

<!-- Popover with header + footer -->
<div class="ym-popover-anchor">
  <button onclick="togglePop('pop-form')">Add Note</button>
  <div class="ym-popover" id="pop-form">
    <div class="ym-popover-header">
      <span class="ym-popover-title">Add a Note</span>
      <button class="ym-popover-close" aria-label="Close" onclick="closePop('pop-form')">×</button>
    </div>
    <div class="ym-popover-body">
      <!-- form content -->
    </div>
    <div class="ym-popover-footer">
      <button class="ym-btn secondary btn-s" onclick="closePop('pop-form')">Cancel</button>
      <button class="ym-btn primary btn-s">Save</button>
    </div>
  </div>
</div>
```

---

## CSS

```css
.ym-popover-anchor { position: relative; display: inline-block; }

.ym-popover {
  position: absolute;
  top: calc(100% + 8px); left: 0;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,.14);
  min-width: 220px;
  z-index: 800;
  opacity: 0; pointer-events: none;
  transform: translateY(-6px) scale(.97);
  transition: opacity 180ms ease, transform 180ms ease;
}
.ym-popover.open {
  opacity: 1; pointer-events: all;
  transform: translateY(0) scale(1);
}

/* Arrow */
.ym-popover::before {
  content: ''; position: absolute;
  width: 10px; height: 10px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-right: none; border-bottom: none;
  transform: rotate(45deg);
  top: -6px; left: 18px;
}
.ym-popover.pop-right { left: auto; right: 0; }
.ym-popover.pop-right::before { left: auto; right: 18px; }
.ym-popover.pop-top { top: auto; bottom: calc(100% + 8px); transform: translateY(6px) scale(.97); }
.ym-popover.pop-top.open { transform: translateY(0) scale(1); }

.ym-popover-header {
  padding: 14px 16px 12px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.ym-popover-title { font-size: 13px; font-weight: 700; color: var(--text-1); }
.ym-popover-close {
  width: 24px; height: 24px; border-radius: 6px; border: none;
  background: transparent; color: var(--text-3); cursor: pointer;
}
.ym-popover-close:hover { background: var(--bg-inset); color: var(--text-1); }
.ym-popover-body { padding: 14px 16px; }
.ym-popover-footer {
  padding: 10px 16px 14px; border-top: 1px solid var(--border);
  display: flex; justify-content: flex-end; gap: 8px;
}

.pop-menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 7px;
  font-size: 13px; cursor: pointer; color: var(--text-1);
  transition: background .12s;
}
.pop-menu-item:hover { background: var(--bg-inset); }
.pop-menu-item.danger { color: #CD3546; }
.pop-divider { height: 1px; background: var(--border); margin: 4px 0; }
```

---

## JavaScript

```javascript
function togglePop(id) {
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  // Close all open popovers first
  document.querySelectorAll('.ym-popover.open').forEach(p => p.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}
function closePop(id) {
  document.getElementById(id).classList.remove('open');
}

// Outside click to close
document.addEventListener('click', function(e) {
  if (!e.target.closest('.ym-popover-anchor')) {
    document.querySelectorAll('.ym-popover.open').forEach(p => p.classList.remove('open'));
  }
});

// Escape key to close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ym-popover.open').forEach(p => p.classList.remove('open'));
  }
});
```

---

## Accessibility

- `aria-haspopup="true"` and `aria-expanded` on the trigger button (update dynamically)
- `aria-controls` pointing to the popover `id`
- `role="menu"` + `role="menuitem"` for menu-style popovers
- Focus the first interactive item inside the popover when opened
- Return focus to the trigger button when closed
- `aria-label="Close"` on the close button

---

## When to use Popover vs Tooltip vs Modal

| Popover                          | Tooltip                          | Modal                            |
|----------------------------------|----------------------------------|----------------------------------|
| Click-triggered                  | Hover/focus-triggered            | Click-triggered                  |
| Rich content with interactions   | Short plain text label only      | Full-screen blocking content     |
| Stays open until dismissed       | Closes on mouse-out              | Explicit close required          |
| 2–8 interactive items            | No interactive content           | Complex forms / confirmations    |

---

## Related Components

- **Tooltip** (`tooltip.html`) — simple hover label, no interactions
- **Modal** (`modal.html`) — full-blocking dialog for confirmations and forms
- **Drawer** (`drawer.html`) — full-height side panel for larger content

---

*Yubi Market Design System · Popover v1.0.0 · Internal Use*
