# Loader — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Feedback (38/54) | **Status:** Stable

---

## Overview

Progress feedback during async operations. Four types: spinner, dots, progress bar, and skeleton. Used inline, as an overlay, or full-page.

---

## Types

| Type         | Use case                                   |
|--------------|--------------------------------------------|
| Spinner      | General async wait, button loading state   |
| Dots         | Chat-style "typing" or background process  |
| Progress bar | File upload, multi-step process with %     |
| Skeleton     | Initial page/data load replacing content   |

---

## Spinner Sizes

| Size | Class     | Diameter | Border  |
|------|-----------|----------|---------|
| XS   | `.sp-xs`  | 14px     | 2px     |
| S    | `.sp-sm`  | 18px     | 2px     |
| M    | `.sp-md`  | 24px     | 2.5px   |
| L    | `.sp-lg`  | 32px     | 3px     |
| XL   | `.sp-xl`  | 44px     | 3.5px   |
| 2XL  | `.sp-2xl` | 60px     | 4px     |

## Spinner Colour Classes

| Class         | Active colour  |
|---------------|----------------|
| `.sp-accent`  | var(--accent) (#FE5104) |
| `.sp-success` | #3F902B        |
| `.sp-info`    | #4065C5        |
| `.sp-white`   | #fff (on dark bg) |

---

## HTML

```html
<!-- Spinner -->
<div class="ym-spinner sp-md" role="status" aria-label="Loading"></div>

<!-- Inline with label -->
<div class="ym-loader-inline">
  <div class="ym-spinner sp-md" aria-hidden="true"></div>
  <span aria-live="polite">Loading…</span>
</div>

<!-- Dots -->
<div class="ym-dots" role="status" aria-label="Loading">
  <span></span><span></span><span></span>
</div>

<!-- Progress bar (determinate) -->
<div class="ym-progress-bar" role="progressbar"
     aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
  <div class="ym-progress-fill" style="width:70%"></div>
</div>

<!-- Progress bar (indeterminate) -->
<div class="ym-progress-bar indeterminate" role="progressbar" aria-busy="true">
  <div class="ym-progress-fill"></div>
</div>

<!-- Skeleton -->
<div class="ym-skeleton" style="height:14px;width:60%;border-radius:4px;" aria-hidden="true"></div>

<!-- Card overlay -->
<div style="position:relative;">
  <!-- card content -->
  <div class="ym-loader-overlay">
    <div class="ym-spinner sp-xl" aria-hidden="true"></div>
    <span class="loader-overlay-text">Loading data…</span>
  </div>
</div>
```

---

## CSS

```css
/* Spinner */
.ym-spinner {
  display: inline-block; border-radius: 50%;
  border: 2.5px solid var(--border);
  border-top-color: var(--accent);
  animation: ym-spin 700ms linear infinite;
}
@keyframes ym-spin { to { transform: rotate(360deg); } }

.sp-xs  { width: 14px; height: 14px; border-width: 2px; }
.sp-sm  { width: 18px; height: 18px; border-width: 2px; }
.sp-md  { width: 24px; height: 24px; }
.sp-lg  { width: 32px; height: 32px; border-width: 3px; }
.sp-xl  { width: 44px; height: 44px; border-width: 3.5px; }
.sp-2xl { width: 60px; height: 60px; border-width: 4px; }

.sp-accent  { border-top-color: var(--accent); }
.sp-success { border-top-color: #3F902B; }
.sp-info    { border-top-color: #4065C5; }
.sp-white   { border-color: rgba(255,255,255,.2); border-top-color: #fff; }

/* Dots */
.ym-dots { display: inline-flex; gap: 5px; align-items: center; }
.ym-dots span {
  width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
  animation: ym-dot-bounce 1.2s ease-in-out infinite;
}
.ym-dots span:nth-child(2) { animation-delay: .15s; }
.ym-dots span:nth-child(3) { animation-delay: .3s; }
@keyframes ym-dot-bounce {
  0%, 80%, 100% { transform: scale(1); opacity: .4; }
  40%           { transform: scale(1.3); opacity: 1; }
}

/* Progress */
.ym-progress-bar { width: 100%; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.ym-progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 400ms ease; }
.ym-progress-bar.indeterminate .ym-progress-fill {
  width: 40% !important;
  animation: ym-progress-slide 1.4s ease-in-out infinite;
}
@keyframes ym-progress-slide { 0% { margin-left: -40%; } 100% { margin-left: 100%; } }

/* Skeleton */
.ym-skeleton { background: var(--border); border-radius: 6px; overflow: hidden; position: relative; }
.ym-skeleton::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.18) 50%, transparent 100%);
  animation: ym-shimmer 1.4s ease-in-out infinite; transform: translateX(-100%);
}
@keyframes ym-shimmer { to { transform: translateX(100%); } }

/* Overlay */
.ym-loader-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  background: rgba(255,255,255,.85); backdrop-filter: blur(3px);
  border-radius: inherit; z-index: 10;
}
[data-theme="dark"] .ym-loader-overlay { background: rgba(15,17,23,.85); }
```

---

## Accessibility

- Spinner: `role="status"` + `aria-label="Loading"` on the element itself
- When paired with text, set `aria-hidden="true"` on the spinner and `aria-live="polite"` on the text
- Skeleton screens: wrap in `aria-busy="true"` on the container; remove after load
- Progress bar: use `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Indeterminate progress: use `aria-busy="true"` instead of `aria-valuenow`
- Respect `prefers-reduced-motion` — reduce or remove animations:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .ym-spinner, .ym-dots span, .ym-skeleton::after, .ym-progress-bar.indeterminate .ym-progress-fill {
      animation-duration: 0.001ms !important;
    }
  }
  ```

---

## Related Components

- **Snackbar** (`snackbar.html`) — post-load feedback message
- **Button** (`button.html`) — use `.btn-loading` state with inline spinner
- **Stepper** (`stepper.html`) — multi-step progress tracking

---

*Yubi Market Design System · Loader v1.0.0 · Internal Use*
