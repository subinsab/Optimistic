# Link — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Navigation (15/54) | **Status:** Stable

---

## Overview

Inline text links for navigation and in-context actions. Five variants: default (accent), subtle (muted underline), danger, disabled. Three sizes. Supports external link icon and button-as-link pattern for onClick actions.

---

## Variants

| Variant  | Color       | Use case                              |
|----------|-------------|---------------------------------------|
| Default  | `#FE5104`   | Standard in-app navigation            |
| Subtle   | `--text-2`  | Secondary links, less visual weight   |
| Danger   | `#CD3546`   | Destructive or risk-related links     |
| Disabled | `--text-3`  | Unavailable, pointer-events: none     |

---

## Sizes

| Size | Font size | Notes              |
|------|-----------|--------------------|
| S    | 12px      | `.link-sm`         |
| M    | 14px      | Default            |
| L    | 16px      | `.link-lg`, w500   |

---

## Measurements

| Property           | Value          |
|--------------------|----------------|
| Default color      | #FE5104        |
| Hover color        | #E84800        |
| Underline offset   | 2px            |
| Disabled opacity   | 0.45           |
| External icon size | 11–12px        |
| External icon gap  | 3px            |
| External icon opacity | 0.7         |

---

## HTML

```html
<!-- Default -->
<a class="ym-link" href="/loan-agreement">View agreement</a>

<!-- Subtle -->
<a class="ym-link link-subtle" href="#">Learn more</a>

<!-- Danger -->
<a class="ym-link link-danger" href="#">Accept risk terms</a>

<!-- Disabled -->
<a class="ym-link link-disabled" aria-disabled="true">Not available</a>

<!-- External link -->
<a class="ym-link ym-link-ext-icon"
   href="https://help.yubimarket.com"
   target="_blank" rel="noopener noreferrer">
  Help Centre
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</a>

<!-- Button as link (for onClick actions without href) -->
<button class="ym-link" onclick="handleAction()">Trigger action</button>
```

---

## CSS

```css
.ym-link {
  color: var(--accent); text-decoration: underline;
  text-underline-offset: 2px; cursor: pointer;
  transition: color 150ms, opacity 150ms;
  font-family: inherit; background: none; border: none; padding: 0;
}
.ym-link:hover { color: #E84800; }

.ym-link.link-subtle {
  color: var(--text-2);
  text-decoration-color: var(--border);
}
.ym-link.link-subtle:hover {
  color: var(--accent);
  text-decoration-color: var(--accent);
}

.ym-link.link-danger { color: #CD3546; }
.ym-link.link-danger:hover { color: #B82E3C; }

.ym-link.link-disabled {
  color: var(--text-3); pointer-events: none;
  opacity: 0.45; text-decoration-color: transparent;
  cursor: not-allowed;
}

.ym-link.link-sm { font-size: 12px; }
.ym-link.link-lg { font-size: 16px; font-weight: 500; }

.ym-link-ext-icon {
  display: inline-flex; align-items: center; gap: 3px; vertical-align: middle;
}
.ym-link-ext-icon svg { margin-top: -1px; opacity: 0.7; }
```

---

## Accessibility

- Use `<a href="...">` for navigation; use `<button class="ym-link">` for actions without navigation
- Always provide meaningful link text — avoid "click here" or "read more"
- External links: add `rel="noopener noreferrer"` and include a screen-reader-visible indicator (icon or text)
- Disabled: use `aria-disabled="true"` on `<a>` (native `disabled` only works on form elements)
- Focus ring inherits browser default — do not remove outline without providing alternative focus indicator

---

## When to use Link vs Button

| Link (`<a>`)              | Button as link (`<button class="ym-link">`) |
|---------------------------|----------------------------------------------|
| Navigates to a URL        | Triggers a JS action (no navigation)        |
| Works with right-click open in new tab | Does not navigate          |
| Appears in breadcrumbs    | Used inline as "Delete", "Undo", etc.       |

---

## Related Components

- **Button** (`button.html`) — standalone action trigger, larger click area
- **Breadcrumbs** (`breadcrumbs.html`) — uses `.ym-bc-link` (similar pattern)
- **Tooltip** (`tooltip.html`) — often combined with links for extra context

---

*Yubi Market Design System · Link v1.0.0 · Internal Use*
