# Accordion — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layout (46/54) | **Status:** Stable

---

## Overview

Collapsible content sections for FAQs, settings panels, and grouped detail views. Bordered, flush, and separated variants with smooth CSS max-height transitions and rotating chevron indicators.

---

## Variants

| Variant    | Description                                      |
|------------|--------------------------------------------------|
| Bordered   | Rounded container with dividers between items    |
| Flush      | No outer border, dividers only, full-width       |
| Separated  | Each item is an independent card with its own border |

---

## Measurements

| Property          | Value                          |
|-------------------|--------------------------------|
| Trigger padding   | 16px 18px                      |
| Border radius     | 12px (bordered), 10px (separated items) |
| Panel transition  | max-height 260ms cubic-bezier(.4,0,.2,1) |
| Chevron transition | transform 220ms ease           |
| Body padding      | 0 18px 18px                    |
| Title font        | 14px / 700                     |
| Subtitle font     | 12px / 400                     |
| Body font         | 13px / 400                     |

---

## HTML

```html
<!-- Bordered accordion (default) -->
<div class="ym-accordion">

  <div class="ym-accordion-item open">
    <button class="ym-accordion-trigger" onclick="toggleAcc(this)" aria-expanded="true">
      <div class="accordion-label">
        <span class="accordion-title">What is Yubi Market?</span>
      </div>
      <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="ym-accordion-panel">
      <div class="ym-accordion-body">
        Yubi Market is India's largest credit marketplace...
      </div>
    </div>
  </div>

  <div class="ym-accordion-item">
    <button class="ym-accordion-trigger" onclick="toggleAcc(this)" aria-expanded="false">
      <div class="accordion-label">
        <span class="accordion-title">How do I apply for a loan?</span>
      </div>
      <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="ym-accordion-panel">
      <div class="ym-accordion-body">
        Start by completing your profile and KYC...
      </div>
    </div>
  </div>

</div>

<!-- Flush variant -->
<div class="ym-accordion accordion-flush">
  <!-- same item structure -->
</div>

<!-- Separated variant -->
<div class="ym-accordion-separated">
  <div class="ym-accordion-item">
    <!-- same item structure -->
  </div>
</div>
```

---

## Item with icon, subtitle, and badge

```html
<div class="ym-accordion-item">
  <button class="ym-accordion-trigger" onclick="toggleAcc(this)" aria-expanded="false">
    <div class="accordion-label">
      <div class="accordion-icon"><!-- 16px SVG --></div>
      <div>
        <span class="accordion-title">Repayment Options</span>
        <span class="accordion-subtitle">EMI, bullet, or custom schedule</span>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:8px;">
      <span class="accordion-badge">New</span>
      <svg class="accordion-chevron" .../>
    </div>
  </button>
  <div class="ym-accordion-panel">
    <div class="ym-accordion-body">...</div>
  </div>
</div>
```

---

## CSS

```css
/* Container */
.ym-accordion { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--bg-panel); }
.ym-accordion-item { border-bottom: 1px solid var(--border); }
.ym-accordion-item:last-child { border-bottom: none; }

/* Trigger */
.ym-accordion-trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px; background: transparent; border: none; cursor: pointer;
  transition: background 140ms ease;
}
.ym-accordion-trigger:hover { background: var(--bg-inset); }

/* Label / title */
.accordion-label { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; text-align: left; }
.accordion-icon { width: 16px; height: 16px; flex-shrink: 0; color: var(--text-3); }
.accordion-title { font-size: 14px; font-weight: 700; color: var(--text-1); display: block; }
.accordion-subtitle { font-size: 12px; color: var(--text-3); margin-top: 2px; display: block; }
.ym-accordion-item.open .accordion-title { color: var(--accent); }

/* Badge */
.accordion-badge {
  font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
  background: rgba(64,101,197,.12); color: #4065C5; flex-shrink: 0;
}

/* Chevron */
.accordion-chevron { flex-shrink: 0; color: var(--text-3); transition: transform 220ms ease; }
.ym-accordion-item.open .accordion-chevron { transform: rotate(180deg); }

/* Panel */
.ym-accordion-panel { overflow: hidden; max-height: 0; transition: max-height 260ms cubic-bezier(.4,0,.2,1); }
.ym-accordion-item.open .ym-accordion-panel { max-height: 600px; }
.ym-accordion-body { padding: 0 18px 18px; font-size: 13px; color: var(--text-2); line-height: 1.65; }

/* Flush variant */
.accordion-flush { border: none; border-radius: 0; background: transparent; }

/* Separated variant */
.ym-accordion-separated { display: flex; flex-direction: column; gap: 8px; }
.ym-accordion-separated .ym-accordion-item { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; background: var(--bg-panel); }
.ym-accordion-separated .ym-accordion-item:last-child { border-bottom: 1px solid var(--border); }
.ym-accordion-separated .ym-accordion-item.open { border-color: var(--accent); }
```

---

## JavaScript

```javascript
function toggleAcc(trigger) {
  const item = trigger.closest('.ym-accordion-item');
  const isOpen = item.classList.contains('open');
  item.classList.toggle('open', !isOpen);
  trigger.setAttribute('aria-expanded', String(!isOpen));
}
```

---

## Accessibility

- Trigger: `<button>` element with `aria-expanded="true/false"`
- Panel: associate via `id` + `aria-controls` on trigger, `aria-labelledby` on panel
- The accordion container can use `role="list"` with `role="listitem"` on each item for screen reader grouping
- Keyboard: `Enter`/`Space` toggles; `Tab` moves to next focusable element inside open panel

---

## Related Components

- **Tabs** (`tabs.html`) — non-linear section switching at the same level
- **Notification** (`notification.html`) — alert content inside accordion body
- **Filter** (`filter.html`) — collapsible filter groups using accordion pattern

---

*Yubi Market Design System · Accordion v1.0.0 · Internal Use*
