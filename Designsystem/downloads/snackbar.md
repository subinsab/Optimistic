# Snackbar — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Feedback (37/54) | **Status:** Stable

---

## Overview

Brief feedback messages that appear at the bottom of the screen and auto-dismiss. Four semantic variants, optional action link, close button, and progress bar. Stacks when multiple fire in sequence.

---

## Variants

| Variant | Background | Border                      | Icon colour |
|---------|------------|-----------------------------|-------------|
| Default | #1A1D27    | rgba(255,255,255,.08)       | —           |
| Success | #1A3321    | rgba(63,144,43,.3)          | #3F902B     |
| Error   | #2D1418    | rgba(205,53,70,.3)          | #CD3546     |
| Warning | #2D2010    | rgba(217,151,0,.3)          | #D98F00     |
| Info    | #111B30    | rgba(64,101,197,.3)         | #4065C5     |

---

## Measurements

| Property         | Value                                    |
|------------------|------------------------------------------|
| Position         | fixed, bottom: 28px, left: 50% centred  |
| Padding          | 12px 18px                                |
| Border radius    | 10px                                     |
| Min-width        | 260px                                    |
| Max-width        | 420px                                    |
| Font size        | 13px / 500                               |
| Default duration | 4000ms                                   |
| Stack gap        | 10px                                     |
| Shadow           | 0 4px 20px rgba(0,0,0,.18)               |
| Enter animation  | 240ms ease, translateY(14px) → 0         |
| Leave animation  | 240ms ease, translateY(10px), opacity 0  |
| Progress height  | 3px                                      |

---

## HTML

```html
<!-- Snackbar region (add once, near </body>) -->
<div class="ym-snackbar-region" id="sbRegion"
     aria-live="polite" aria-atomic="true"></div>

<!-- Static snackbar structure (reference — use JS to inject) -->
<div class="ym-snackbar sb-success sb-visible" role="status">
  <span class="sb-icon"><!-- 16px SVG --></span>
  <span class="sb-msg">Payment disbursed successfully.</span>
  <button class="sb-action">View</button>
  <button class="sb-close" aria-label="Dismiss"><!-- × SVG --></button>
  <div class="sb-progress">
    <div class="sb-progress-bar" style="animation-duration:4000ms"></div>
  </div>
</div>
```

---

## CSS

```css
.ym-snackbar-region {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  z-index: 2000; display: flex; flex-direction: column;
  align-items: center; gap: 10px; pointer-events: none;
}
.ym-snackbar {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 10px; position: relative;
  font-size: 13px; font-weight: 500; line-height: 1.4;
  max-width: 420px; min-width: 260px; pointer-events: all;
  box-shadow: 0 4px 20px rgba(0,0,0,.18);
  transition: opacity 240ms ease, transform 240ms cubic-bezier(.4,0,.2,1);
  background: #1A1D27; color: #F8FAFC; border: 1px solid rgba(255,255,255,.08);
}
.ym-snackbar.sb-entering { opacity: 0; transform: translateY(14px) scale(.97); }
.ym-snackbar.sb-visible  { opacity: 1; transform: translateY(0) scale(1); }
.ym-snackbar.sb-leaving  { opacity: 0; transform: translateY(10px) scale(.97); }

.ym-snackbar.sb-success { background: #1A3321; border-color: rgba(63,144,43,.3); }
.ym-snackbar.sb-error   { background: #2D1418; border-color: rgba(205,53,70,.3); }
.ym-snackbar.sb-warning { background: #2D2010; border-color: rgba(217,151,0,.3); }
.ym-snackbar.sb-info    { background: #111B30; border-color: rgba(64,101,197,.3); }

.sb-msg    { flex: 1; }
.sb-action {
  background: transparent; border: none; cursor: pointer;
  font-size: 12px; font-weight: 700; letter-spacing: .03em;
  text-transform: uppercase; color: #FE5104; padding: 4px 8px; border-radius: 5px;
}
.sb-close {
  width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center;
  background: transparent; border: none; cursor: pointer; color: rgba(248,250,252,.5);
}
.sb-progress {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  border-radius: 0 0 10px 10px; background: rgba(255,255,255,.18); overflow: hidden;
}
.sb-progress-bar {
  height: 100%; background: rgba(255,255,255,.5);
  animation: sb-progress-anim linear forwards;
}
@keyframes sb-progress-anim { from { width: 100%; } to { width: 0%; } }
```

---

## JavaScript

```javascript
const ICONS = {
  success: '<svg ...>#3F902B checkmark</svg>',
  error:   '<svg ...>#CD3546 ×</svg>',
  warning: '<svg ...>#D98F00 !</svg>',
  info:    '<svg ...>#4065C5 i</svg>',
};

function showSnackbar(msg, variant = 'default', action = null, onAction = null, progress = false, duration = 4000) {
  const region = document.getElementById('sbRegion');
  const el = document.createElement('div');
  el.className = `ym-snackbar${variant !== 'default' ? ' sb-' + variant : ''} sb-entering`;
  el.setAttribute('role', 'status');

  el.innerHTML = `
    ${ICONS[variant] ? `<span class="sb-icon">${ICONS[variant]}</span>` : ''}
    <span class="sb-msg">${msg}</span>
    ${action ? `<button class="sb-action">${action}</button>` : ''}
    <button class="sb-close" aria-label="Dismiss"><!-- × SVG --></button>
    ${progress ? `<div class="sb-progress"><div class="sb-progress-bar" style="animation-duration:${duration}ms"></div></div>` : ''}
  `;

  const dismiss = () => {
    el.classList.replace('sb-visible', 'sb-leaving');
    setTimeout(() => el.remove(), 260);
  };

  if (action) el.querySelector('.sb-action').onclick = () => { dismiss(); onAction?.(); };
  el.querySelector('.sb-close').onclick = dismiss;

  region.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.replace('sb-entering', 'sb-visible')));
  setTimeout(dismiss, duration);
}

// Usage
showSnackbar('Payment disbursed.', 'success');
showSnackbar('Upload failed.', 'error', 'Retry', () => retryUpload());
showSnackbar('File deleted.', 'default', 'Undo', () => restoreFile(), true, 5000);
```

---

## Accessibility

- Container uses `aria-live="polite"` and `aria-atomic="true"` — screen readers announce each toast
- Use `role="status"` on each snackbar element
- Close button must have `aria-label="Dismiss"`
- Do not auto-dismiss error toasts — errors require user acknowledgement; use `duration: Infinity` or a modal instead
- Avoid firing more than 3 snackbars in quick succession — prefer a queue or replace-latest strategy

---

## When to use Snackbar vs Notification vs Modal

| Scenario                         | Use             |
|----------------------------------|-----------------|
| Brief, non-critical feedback     | Snackbar        |
| Action required (confirm/cancel) | Modal           |
| Persistent system alerts         | Notification    |
| In-page inline errors            | Inline form error |

---

## Related Components

- **Notification** (`notification.html`) — persistent, in-page alert banners
- **Modal** (`modal.html`) — blocking dialogs requiring action
- **Loader** (`loader.html`) — progress feedback during async operations

---

*Yubi Market Design System · Snackbar v1.0.0 · Internal Use*
