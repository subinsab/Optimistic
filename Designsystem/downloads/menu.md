# Menu — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (49/54) | **Status:** Stable

---

## Overview

Dropdown context menus and action lists for table row overflow menus, loan card actions, and profile navigation. Supports icons, keyboard shortcuts, section headers, dividers, danger items, notification badges, and full keyboard navigation (↑↓ ArrowKey, Escape).

---

## Variants

| Variant        | Description                                           |
|----------------|-------------------------------------------------------|
| Standard       | Section header + items with icon + label + trailing   |
| Contextual     | Attached to a trigger button (three-dot / kebab)      |
| Active item    | `.menu-item-active` — blue tint, highlighted          |
| Danger item    | `.menu-item-danger` — red text, red hover             |
| Disabled item  | `.disabled` — 50% opacity, pointer-events: none       |
| Item + badge   | Notification count badge trailing the label           |
| Item + shortcut| Keyboard shortcut monospace chip trailing the label   |

---

## Measurements

| Property          | Value                              |
|-------------------|------------------------------------|
| Menu radius       | 12px                               |
| Menu padding      | 6px 0                              |
| Min width         | 200px                              |
| Shadow            | 0 8px 32px rgba(0,0,0,.12)         |
| Item padding      | 9px 14px                           |
| Item font         | 13.5px / 500                       |
| Item gap          | 10px                               |
| Item hover bg     | var(--bg-inset)                    |
| Active bg         | rgba(64,101,197,.07)               |
| Active colour     | #4065C5                            |
| Danger colour     | #CD3546                            |
| Danger hover bg   | rgba(205,53,70,.07)                |
| Icon size         | 18px                               |
| Divider margin    | 5px 0                              |
| Trigger size      | 36 × 36px / 8px radius             |

---

## HTML

```html
<!-- Contextual menu wrapper -->
<div class="ym-menu-wrap" id="myMenuWrap">

  <!-- Trigger button -->
  <button class="menu-trigger"
          onclick="toggleMenu('myMenuWrap')"
          aria-haspopup="true"
          aria-label="Open actions menu">
    <!-- ⋮ SVG -->
  </button>

  <!-- Menu panel -->
  <div class="ym-menu" role="menu">
    <div class="ym-menu-header">Actions</div>

    <button class="ym-menu-item menu-item-active" role="menuitem">
      <span class="ym-menu-icon"><!-- SVG --></span>
      <span class="ym-menu-label">View Details</span>
    </button>

    <button class="ym-menu-item" role="menuitem">
      <span class="ym-menu-icon"><!-- SVG --></span>
      <span class="ym-menu-label">Documents</span>
      <span class="menu-badge">3</span>
    </button>

    <button class="ym-menu-item" role="menuitem">
      <span class="ym-menu-icon"><!-- SVG --></span>
      <span class="ym-menu-label">Export</span>
      <span class="ym-menu-shortcut">⌘E</span>
    </button>

    <hr class="ym-menu-divider">

    <button class="ym-menu-item menu-item-danger" role="menuitem">
      <span class="ym-menu-icon"><!-- trash SVG --></span>
      <span class="ym-menu-label">Delete</span>
    </button>

    <button class="ym-menu-item disabled" role="menuitem" aria-disabled="true">
      <span class="ym-menu-icon"><!-- SVG --></span>
      <span class="ym-menu-label">Archive (unavailable)</span>
    </button>
  </div>
</div>
```

---

## CSS

```css
.ym-menu {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  padding: 6px 0;
  min-width: 200px;
}

.ym-menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 14px;
  font-size: 13.5px; font-weight: 500;
  color: var(--text-1);
  cursor: pointer;
  border: none; background: none;
  width: 100%; text-align: left;
  transition: background 120ms;
}
.ym-menu-item:hover              { background: var(--bg-inset); }
.ym-menu-item:focus-visible      { outline: 2px solid #4065C5; outline-offset: -2px; }
.ym-menu-item.menu-item-active   { background: rgba(64,101,197,.07); color: #4065C5; font-weight: 600; }
.ym-menu-item.menu-item-danger   { color: #CD3546; }
.ym-menu-item.menu-item-danger:hover { background: rgba(205,53,70,.07); }
.ym-menu-item.disabled           { color: var(--text-3); pointer-events: none; opacity: .5; }

.ym-menu-header   { padding: 6px 14px 4px; font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--text-3); }
.ym-menu-divider  { border: none; border-top: 1px solid var(--border); margin: 5px 0; }
.ym-menu-shortcut { font-family: var(--mono); font-size: 11px; color: var(--text-3); margin-left: auto; background: var(--bg-inset); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; }
.menu-badge       { background: #CD3546; color: #fff; border-radius: 9px; font-size: 10px; font-weight: 800; padding: 0 4px; min-width: 18px; text-align: center; margin-left: auto; }

.ym-menu-wrap           { position: relative; display: inline-block; }
.ym-menu-wrap .ym-menu  { position: absolute; top: calc(100% + 6px); right: 0; display: none; z-index: 300; }
.ym-menu-wrap.open .ym-menu { display: block; }

.menu-trigger {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-panel); color: var(--text-2);
  cursor: pointer; transition: background 120ms, border-color 120ms;
}
.menu-trigger:hover, .menu-trigger.open { background: var(--bg-inset); border-color: #4065C5; color: #4065C5; }
```

---

## JavaScript

```javascript
function toggleMenu(wrapId) {
  const wrap = document.getElementById(wrapId);
  const isOpen = wrap.classList.contains('open');
  closeAllMenus();
  if (!isOpen) wrap.classList.add('open');
}

function closeAllMenus() {
  document.querySelectorAll('.ym-menu-wrap.open').forEach(w => w.classList.remove('open'));
}

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.ym-menu-wrap')) closeAllMenus();
});

// Keyboard navigation (↑↓ + Escape)
document.addEventListener('keydown', e => {
  const open = document.querySelector('.ym-menu-wrap.open');
  if (!open) return;
  if (e.key === 'Escape') { closeAllMenus(); return; }

  const items = [...open.querySelectorAll('.ym-menu-item:not(.disabled)')];
  const idx = items.indexOf(document.activeElement);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    items[idx + 1 < items.length ? idx + 1 : 0]?.focus();
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    items[idx > 0 ? idx - 1 : items.length - 1]?.focus();
  }
});
```

---

## Accessibility

- Trigger: `aria-haspopup="true"` and `aria-expanded="true/false"` toggled when open
- Menu panel: `role="menu"` on the container
- Each item: `role="menuitem"` on each `<button>`
- Disabled items: `aria-disabled="true"` (in addition to `.disabled` class)
- Keyboard: Escape closes, ↑↓ navigate items, Enter/Space activates focused item
- Focus management: return focus to trigger when menu closes via Escape

---

## Related Components

- **Popover** (`popover.html`) — richer floating content with arbitrary markup
- **Icon Button** (`iconbutton.html`) — the trigger button in isolation
- **Table** (`table.html`) — row-level kebab menus are the primary use case

---

*Yubi Market Design System · Menu v1.0.0 · Internal Use*
