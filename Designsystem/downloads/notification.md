# Notification — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Feedback (39/54) | **Status:** Stable

---

## Overview

Persistent in-page alert banners for important system messages, confirmations, and warnings. Four semantic variants, optional action buttons, dismissible close button, and left-bar accent style.

---

## Variants

| Variant  | Background              | Border                   | Title colour |
|----------|-------------------------|--------------------------|--------------|
| Info     | rgba(64,101,197,.07)    | rgba(64,101,197,.25)     | #2E4FA8      |
| Success  | rgba(63,144,43,.07)     | rgba(63,144,43,.28)      | #2D7720      |
| Warning  | rgba(217,151,0,.07)     | rgba(217,151,0,.28)      | #7A5800      |
| Error    | rgba(205,53,70,.07)     | rgba(205,53,70,.25)      | #A01E2E      |

---

## Measurements

| Property       | Value              |
|----------------|--------------------|
| Padding        | 14px 16px          |
| Border radius  | 10px (filled), 8px (bar) |
| Border         | 1px solid (variant alpha) |
| Icon size      | 18px (filled), 16px (bar) |
| Title font     | 13px / 700         |
| Message font   | 12.5px / 400       |
| Action gap     | 8px                |
| Bar border     | 4px solid left     |

---

## HTML

```html
<!-- Filled info notification -->
<div class="ym-notification notif-info" role="alert">
  <span class="notif-icon" aria-hidden="true"><!-- 18px info SVG --></span>
  <div class="notif-body">
    <div class="notif-title">KYC Verification Required</div>
    <div class="notif-msg">Complete your KYC to unlock full borrowing limits.</div>
    <div class="notif-actions">
      <button class="notif-btn notif-btn-primary">Start KYC</button>
      <button class="notif-btn notif-btn-ghost">Remind me later</button>
    </div>
  </div>
  <button class="notif-close" aria-label="Dismiss"
          onclick="this.closest('.ym-notification').remove()">
    <!-- × SVG -->
  </button>
</div>

<!-- Other variants: notif-success  notif-warning  notif-error -->

<!-- Bar style (left border accent) -->
<div class="ym-notification notif-warning notif-bar" role="alert">
  <span class="notif-icon" aria-hidden="true"><!-- warning SVG --></span>
  <div class="notif-body">
    <div class="notif-title">EMI Due in 3 Days</div>
    <div class="notif-msg">Your EMI of ₹12,450 is due on 5 April 2026.</div>
  </div>
</div>
```

---

## CSS

```css
.ym-notification {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 16px; border-radius: 10px;
  border: 1px solid transparent;
}
.notif-title { font-size: 13px; font-weight: 700; margin-bottom: 3px; }
.notif-msg   { font-size: 12.5px; line-height: 1.5; }
.notif-actions { display: flex; gap: 8px; margin-top: 10px; }
.notif-btn { font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; cursor: pointer; border: none; font-family: inherit; }
.notif-close {
  width: 22px; height: 22px; border-radius: 5px;
  background: transparent; border: none; cursor: pointer; opacity: .5;
}

/* Filled variants */
.notif-info    { background: rgba(64,101,197,.07); border-color: rgba(64,101,197,.25); }
.notif-success { background: rgba(63,144,43,.07);  border-color: rgba(63,144,43,.28); }
.notif-warning { background: rgba(217,151,0,.07);  border-color: rgba(217,151,0,.28); }
.notif-error   { background: rgba(205,53,70,.07);  border-color: rgba(205,53,70,.25); }

/* Primary buttons per variant */
.notif-info .notif-btn-primary    { background: #4065C5; color: #fff; }
.notif-success .notif-btn-primary { background: #3F902B; color: #fff; }
.notif-warning .notif-btn-primary { background: #D98F00; color: #fff; }
.notif-error .notif-btn-primary   { background: #CD3546; color: #fff; }

/* Ghost buttons per variant */
.notif-info .notif-btn-ghost    { background: rgba(64,101,197,.12); color: #4065C5; }
.notif-success .notif-btn-ghost { background: rgba(63,144,43,.12);  color: #3F902B; }
.notif-warning .notif-btn-ghost { background: rgba(217,151,0,.12);  color: #B07E00; }
.notif-error .notif-btn-ghost   { background: rgba(205,53,70,.12);  color: #CD3546; }

/* Bar accent style */
.notif-bar {
  border: none; border-left: 4px solid transparent;
  background: var(--bg-panel); border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.notif-bar.notif-info    { border-left-color: #4065C5; }
.notif-bar.notif-success { border-left-color: #3F902B; }
.notif-bar.notif-warning { border-left-color: #D98F00; }
.notif-bar.notif-error   { border-left-color: #CD3546; }
.notif-bar .notif-title  { color: var(--text-1); }
.notif-bar .notif-msg    { color: var(--text-2); }
```

---

## Accessibility

- Use `role="alert"` on the notification element — screen readers announce it immediately
- For non-urgent notices, use `role="status"` instead (polite announcement)
- Close button must have `aria-label="Dismiss"`
- Icon should have `aria-hidden="true"` when accompanied by text
- Do not auto-dismiss error or warning notifications — always give the user a close button

---

## Notification vs Snackbar vs Modal

| Scenario                              | Use              |
|---------------------------------------|------------------|
| Brief, transient success/error        | Snackbar         |
| Persistent in-page contextual message | Notification     |
| Blocking action required              | Modal            |
| Critical system error banner          | Notification (error) at top of page |

---

## Related Components

- **Snackbar** (`snackbar.html`) — auto-dismissing floating toasts
- **Modal** (`modal.html`) — blocking dialogs requiring user action
- **Badge** (`badge.html`) — inline status labels

---

*Yubi Market Design System · Notification v1.0.0 · Internal Use*
