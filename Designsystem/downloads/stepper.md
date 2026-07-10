# Stepper — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Feedback (40/54) | **Status:** Stable

---

## Overview

Multi-step progress indicator for linear workflows like loan applications, KYC onboarding, and form wizards. Horizontal and vertical layouts, with completed/active/error states.

---

## States

| State     | Node bg    | Border     | Text colour | Note                        |
|-----------|------------|------------|-------------|-----------------------------|
| Default   | var(--bg-panel) | var(--border) | var(--text-3) | Upcoming step         |
| Active    | #4065C5    | #4065C5    | #fff        | Current step, focus ring    |
| Completed | #4065C5    | #4065C5    | #fff (check) | Shows checkmark icon       |
| Error     | #CD3546    | #CD3546    | #fff (×)    | Shows × icon                |

---

## Measurements

| Property         | Value                                |
|------------------|--------------------------------------|
| Node diameter    | 32px                                 |
| Node border      | 2px solid                            |
| Connector height | 2px                                  |
| Active colour    | #4065C5                              |
| Error colour     | #CD3546                              |
| Focus ring       | 0 0 0 4px rgba(64,101,197,.18)       |
| Title font       | 12px / 700                           |
| Subtitle font    | 11px / 400                           |
| Transition       | 200–300ms ease                       |

---

## HTML

```html
<!-- Horizontal stepper -->
<div class="ym-stepper ym-stepper-h" role="tablist" aria-label="Application steps">

  <!-- Completed -->
  <div class="ym-step completed">
    <div class="step-node">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="step-label-wrap">
      <span class="step-title">Basic Info</span>
      <span class="step-subtitle">Name &amp; PAN</span>
    </div>
  </div>

  <!-- Active -->
  <div class="ym-step active">
    <div class="step-node">2</div>
    <div class="step-label-wrap">
      <span class="step-title">KYC Docs</span>
    </div>
  </div>

  <!-- Upcoming -->
  <div class="ym-step">
    <div class="step-node">3</div>
    <div class="step-label-wrap">
      <span class="step-title">Financials</span>
    </div>
  </div>

  <!-- Error -->
  <div class="ym-step error">
    <div class="step-node">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M4 4l6 6M10 4L4 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="step-label-wrap">
      <span class="step-title">Review</span>
    </div>
  </div>
</div>
```

---

## CSS

```css
/* Horizontal */
.ym-stepper-h { display: flex; align-items: flex-start; width: 100%; }
.ym-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }

/* Connector line */
.ym-step:not(:last-child)::after {
  content: ''; position: absolute; top: 16px;
  left: calc(50% + 16px); right: calc(-50% + 16px);
  height: 2px; background: var(--border);
  transition: background 300ms ease;
}
.ym-step.completed:not(:last-child)::after { background: #4065C5; }

/* Node */
.step-node {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; z-index: 1;
  border: 2px solid var(--border); background: var(--bg-panel); color: var(--text-3);
  transition: background 200ms, border-color 200ms, color 200ms;
}
.ym-step.active .step-node {
  background: #4065C5; border-color: #4065C5; color: #fff;
  box-shadow: 0 0 0 4px rgba(64,101,197,.18);
}
.ym-step.completed .step-node { background: #4065C5; border-color: #4065C5; color: #fff; }
.ym-step.error .step-node     { background: #CD3546; border-color: #CD3546; color: #fff; }

/* Labels */
.step-title { font-size: 12px; font-weight: 700; color: var(--text-3); margin-top: 8px; }
.ym-step.active .step-title    { color: #4065C5; }
.ym-step.completed .step-title { color: var(--text-1); }
.ym-step.error .step-title     { color: #CD3546; }

/* Vertical layout */
.ym-stepper-v { display: flex; flex-direction: column; }
.ym-step-v { display: flex; gap: 16px; }
.step-v-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.step-v-line { width: 2px; flex: 1; background: var(--border); margin: 4px 0; min-height: 24px; }
.ym-step-v.completed .step-v-line { background: #4065C5; }
.step-v-body { flex: 1; padding-bottom: 24px; }
.step-v-title { font-size: 13px; font-weight: 700; color: var(--text-3); margin-top: 4px; }
.ym-step-v.active .step-v-title    { color: #4065C5; }
.ym-step-v.completed .step-v-title { color: var(--text-1); }
.ym-step-v:last-child .step-v-line { display: none; }
```

---

## JavaScript (minimal controller)

```javascript
class Stepper {
  constructor(containerEl, steps) {
    this.el = containerEl;
    this.steps = steps;
    this.current = 0;
    this.render();
  }

  render() {
    const checkIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const nodes = this.el.querySelectorAll('.ym-step');
    nodes.forEach((node, i) => {
      node.classList.remove('completed', 'active');
      const nodeEl = node.querySelector('.step-node');
      if (i < this.current) {
        node.classList.add('completed');
        nodeEl.innerHTML = checkIcon;
      } else {
        nodeEl.textContent = i + 1;
        if (i === this.current) node.classList.add('active');
      }
    });
  }

  next() { if (this.current < this.steps.length - 1) { this.current++; this.render(); } }
  back() { if (this.current > 0) { this.current--; this.render(); } }
  setError(stepIndex) {
    const node = this.el.querySelectorAll('.ym-step')[stepIndex];
    node.classList.remove('active', 'completed');
    node.classList.add('error');
  }
}
```

---

## Accessibility

- Horizontal stepper: `role="tablist"` on container, `role="tab"` on each step, `aria-selected` on active
- Vertical stepper: `role="list"` on container, `role="listitem"` on each step
- Each step node should have `aria-label` with step number and title: `aria-label="Step 2 of 5: KYC Docs"`
- Completed steps: add `aria-label="Completed: Basic Info"` with checkmark
- Error steps: add `aria-describedby` pointing to error message

---

## Related Components

- **Loader** (`loader.html`) — progress bar for indeterminate/determinate loading
- **Tabs** (`tabs.html`) — non-linear section switching
- **Notification** (`notification.html`) — error/success feedback within a step

---

*Yubi Market Design System · Stepper v1.0.0 · Internal Use*
