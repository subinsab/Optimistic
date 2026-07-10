# Breadcrumbs — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Navigation (12/54) | **Status:** Stable

---

## Overview

Shows the user's location within the app hierarchy. Each item except the last is a clickable link. The current page is non-linked and visually distinct. Supports home icon, separator variants, pill container, and truncation with collapse button.

---

## Measurements

| Property              | Value                      |
|-----------------------|----------------------------|
| Font size             | 13px                       |
| Font weight (link)    | 400                        |
| Font weight (current) | 500                        |
| Separator gap         | 6px each side              |
| Separator opacity     | 0.5                        |
| Hover underline offset| 2px                        |
| Pill padding          | 6px 12px                   |
| Pill border radius    | 8px                        |

---

## States / Variants

| Variant      | Description                                        |
|--------------|----------------------------------------------------|
| Default      | Inline, chevron separators                         |
| Slash        | `/` character as separator                         |
| Home icon    | First item is SVG house icon                       |
| Pill         | Wrapped in bordered rounded container              |
| Collapsed    | Middle items hidden behind `···` expand button     |

---

## Color Tokens

| Token       | Usage                          |
|-------------|--------------------------------|
| `--text-3`  | Ancestor link color (default)  |
| `--text-1`  | Current page text color        |
| `#FE5104`   | Link hover color (accent)      |
| `--bg-panel`| Pill background                |
| `--border`  | Pill border                    |

---

## HTML

```html
<!-- Default breadcrumb -->
<nav aria-label="breadcrumb">
  <ol class="ym-breadcrumb">
    <li class="ym-bc-item">
      <a class="ym-bc-link" href="/">Dashboard</a>
    </li>
    <li class="ym-bc-item">
      <span class="ym-bc-sep">›</span>
      <a class="ym-bc-link" href="/clients">Clients</a>
    </li>
    <li class="ym-bc-item">
      <span class="ym-bc-sep">›</span>
      <span class="ym-bc-current" aria-current="page">Acme Corp</span>
    </li>
  </ol>
</nav>

<!-- With home icon -->
<nav aria-label="breadcrumb">
  <ol class="ym-breadcrumb">
    <li class="ym-bc-item">
      <a class="ym-bc-home-icon" href="/" aria-label="Home">
        <svg width="15" height="15" ...home icon SVG...></svg>
      </a>
    </li>
    <li class="ym-bc-item">
      <span class="ym-bc-sep">›</span>
      <a class="ym-bc-link" href="/loans">Loan Applications</a>
    </li>
    <li class="ym-bc-item">
      <span class="ym-bc-sep">›</span>
      <span class="ym-bc-current" aria-current="page">LN-20450</span>
    </li>
  </ol>
</nav>

<!-- Pill variant -->
<nav aria-label="breadcrumb">
  <ol class="ym-breadcrumb-pill">
    <!-- same li items as above -->
  </ol>
</nav>
```

---

## CSS

```css
.ym-breadcrumb {
  display: flex; align-items: center; flex-wrap: wrap;
  list-style: none; padding: 0; margin: 0;
}
.ym-bc-item { display: flex; align-items: center; }
.ym-bc-link {
  font-size: 13px; color: var(--text-3);
  text-decoration: none; transition: color 150ms;
}
.ym-bc-link:hover {
  color: #FE5104;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.ym-bc-sep {
  margin: 0 6px; color: var(--text-3);
  opacity: 0.5; display: flex; align-items: center;
}
.ym-bc-current {
  font-size: 13px; font-weight: 500; color: var(--text-1);
}
.ym-bc-home-icon {
  display: flex; align-items: center;
  color: var(--text-3); transition: color 150ms;
}
.ym-bc-home-icon:hover { color: #FE5104; }

/* Pill variant */
.ym-breadcrumb-pill {
  display: flex; align-items: center;
  list-style: none; padding: 6px 12px; margin: 0;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 8px;
}
```

---

## Accessibility

- Wrap in `<nav aria-label="breadcrumb">` for landmark navigation
- Use `<ol>` (ordered list) to convey hierarchy semantically
- Apply `aria-current="page"` to the last (current) item
- Home icon needs `aria-label="Home"` since it's icon-only

---

## Related Components

- **Tabs** (`tabs.html`) — section-level navigation within a page
- **Pagination** (`pagination.html`) — page-through data sets
- **Link** (`link.html`) — inline text links

---

*Yubi Market Design System · Breadcrumbs v1.0.0 · Internal Use*
