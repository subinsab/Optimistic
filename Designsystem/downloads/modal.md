# Modal — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Overlays (41/54) | **Status:** Stable

---

## Overview

Focused overlay that interrupts the flow for confirmations, forms, or detail views. Blocks interaction with the rest of the page via a backdrop. Closes on backdrop click or Escape key.

---

## Sizes

| Size | Max width |
|------|-----------|
| S    | 360px     |
| M    | 480px (default) |
| L    | 640px     |

---

## Measurements

| Property          | Value                           |
|-------------------|---------------------------------|
| Border radius     | 16px                            |
| Shadow            | `0 20px 60px rgba(0,0,0,.25)` |
| Header padding    | 22px 24px 0                     |
| Body padding      | 16px 24px                       |
| Footer padding    | 16px 24px                       |
| Title font        | 17px / 700                      |
| Subtitle font     | 13px / --text-3                 |
| Body font         | 14px / --text-2                 |
| Backdrop color    | rgba(0,0,0,.45)                 |
| Close button size | 30 × 30px, r8                   |
| Enter animation   | 220ms ease, scale(.98)→(1) + fade |
| Max height        | calc(100vh - 80px), overflow-y: auto |

---

## HTML

```html
<!-- Open a modal via JS: openModal('modal-id') -->
<div class="ym-modal-overlay" id="modal-approve"
     role="dialog" aria-modal="true" aria-labelledby="modal-title"
     onclick="closeOnBackdrop(event,'modal-approve')">
  <div class="ym-modal">
    <!-- Header -->
    <div class="ym-modal-header">
      <div>
        <div class="ym-modal-title" id="modal-title">Approve Loan</div>
        <div class="ym-modal-subtitle">LN-20450 · Acme Corp</div>
      </div>
      <button class="ym-modal-close" onclick="closeModal('modal-approve')" aria-label="Close">×</button>
    </div>
    <!-- Body -->
    <div class="ym-modal-body">
      Approving will disburse ₹24,00,000 to the borrower's registered account.
    </div>
    <div class="ym-modal-divider"></div>
    <!-- Footer -->
    <div class="ym-modal-footer">
      <button class="ym-btn secondary btn-m" onclick="closeModal('modal-approve')">Cancel</button>
      <button class="ym-btn primary btn-m">Approve</button>
    </div>
  </div>
</div>

<!-- Small modal: add class ym-modal-sm -->
<!-- Large modal: add class ym-modal-lg -->
<!-- Danger title: add class danger to ym-modal-title -->
```

---

## CSS

```css
.ym-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
  opacity: 0; pointer-events: none;
  transition: opacity 220ms ease;
}
.ym-modal-overlay.open { opacity: 1; pointer-events: all; }

.ym-modal {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: 16px; width: 100%; max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
  transform: translateY(12px) scale(.98);
  transition: transform 220ms ease, opacity 220ms ease;
  opacity: 0;
  max-height: calc(100vh - 80px); overflow-y: auto;
}
.ym-modal-overlay.open .ym-modal { transform: translateY(0) scale(1); opacity: 1; }
.ym-modal-sm { max-width: 360px; }
.ym-modal-lg { max-width: 640px; }

.ym-modal-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; padding: 22px 24px 0;
}
.ym-modal-title { font-size: 17px; font-weight: 700; color: var(--text-1); line-height: 1.3; }
.ym-modal-title.danger { color: #CD3546; }
.ym-modal-subtitle { font-size: 13px; color: var(--text-3); margin-top: 4px; }
.ym-modal-close {
  width: 30px; height: 30px; border-radius: 8px; border: none;
  background: var(--bg-inset); color: var(--text-3); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s, color .15s;
}
.ym-modal-close:hover { background: var(--border); color: var(--text-1); }
.ym-modal-body { padding: 16px 24px; font-size: 14px; color: var(--text-2); line-height: 1.6; }
.ym-modal-divider { height: 1px; background: var(--border); }
.ym-modal-footer {
  display: flex; align-items: center;
  justify-content: flex-end; gap: 10px; padding: 16px 24px;
}
```

---

## JavaScript

```javascript
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeOnBackdrop(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ym-modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
```

---

## Accessibility

- `role="dialog"` and `aria-modal="true"` on the overlay
- `aria-labelledby` pointing to the title element
- Move focus into the modal on open (first focusable element)
- Trap focus within the modal while open
- Restore focus to the trigger element on close
- `aria-label="Close"` on the close button

---

## Related Components

- **Drawer** (`drawer.html`) — side panel for more content
- **Popover** (`popover.html`) — inline, lighter-weight overlay
- **Bottom Sheet** (`bottomsheet.html`) — mobile-optimised overlay from bottom

---

*Yubi Market Design System · Modal v1.0.0 · Internal Use*
