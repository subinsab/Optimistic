# Tabs — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Navigation (13/54) | **Status:** Stable

---

## Overview

Organises related content into selectable sections. Three variants: underline (default for page-level navigation), pill/segment (compact toggles), and card (panel-style). Supports badge counts, icons, and disabled states.

---

## Variants

| Variant   | Use case                                | Active indicator           |
|-----------|-----------------------------------------|----------------------------|
| Underline | Page-level section navigation           | 2px bottom border, accent  |
| Pill      | Compact filter / view toggle (≤5 tabs)  | Filled white background    |
| Card      | Panel + content box together            | Elevated tab, border-top   |

---

## Measurements

| Property                    | Value                         |
|-----------------------------|-------------------------------|
| Tab font size (underline)   | 14px                          |
| Tab font size (pill/card)   | 13px                          |
| Font weight (default)       | 500                           |
| Font weight (active)        | 600                           |
| Tab padding (underline)     | 10px 16px                     |
| Active indicator height     | 2px                           |
| Disabled opacity            | 0.4                           |
| Pill padding                | 7px 16px                      |
| Pill container padding      | 3px                           |
| Pill container radius       | 10px                          |
| Pill tab radius             | 8px                           |
| Badge font                  | 10px mono                     |
| Badge padding               | 1px 6px                       |
| Badge radius                | 20px                          |

---

## HTML

```html
<!-- Underline tabs -->
<div role="tablist" class="ym-tabs">
  <div role="tab" class="ym-tab tab-active" aria-selected="true">Overview</div>
  <div role="tab" class="ym-tab">
    Transactions
    <span class="ym-tab-badge">24</span>
  </div>
  <div role="tab" class="ym-tab">Documents</div>
  <div role="tab" class="ym-tab tab-disabled" aria-disabled="true">Archived</div>
</div>
<div role="tabpanel">Panel content</div>

<!-- Pill / segment tabs -->
<div role="tablist" class="ym-tabs-pill">
  <div role="tab" class="ym-tab-pill tab-active">Monthly</div>
  <div role="tab" class="ym-tab-pill">Quarterly</div>
  <div role="tab" class="ym-tab-pill">Yearly</div>
</div>

<!-- Card tabs -->
<div role="tablist" class="ym-tabs-card">
  <div role="tab" class="ym-tab-card tab-active">Details</div>
  <div role="tab" class="ym-tab-card">Activity</div>
</div>
<div class="ym-tabs-card-body">Panel content here</div>
```

---

## CSS

```css
/* Underline tabs */
.ym-tabs {
  display: flex; border-bottom: 1px solid var(--border); gap: 0;
}
.ym-tab {
  padding: 10px 16px; font-size: 14px; font-weight: 500;
  color: var(--text-3); cursor: pointer;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color .15s, border-color .15s;
  display: flex; align-items: center; gap: 6px;
  user-select: none; white-space: nowrap;
}
.ym-tab:hover:not(.tab-disabled) { color: var(--text-1); }
.ym-tab.tab-active { color: #FE5104; border-bottom-color: #FE5104; font-weight: 600; }
.ym-tab.tab-disabled { opacity: 0.4; cursor: not-allowed; }

/* Badge */
.ym-tab-badge {
  font-size: 10px; font-weight: 700;
  background: var(--bg-inset); border: 1px solid var(--border);
  border-radius: 20px; padding: 1px 6px;
  color: var(--text-3); font-family: monospace;
}
.ym-tab.tab-active .ym-tab-badge {
  background: var(--accent-dim); border-color: var(--accent); color: var(--accent-text);
}

/* Pill/segment tabs */
.ym-tabs-pill {
  display: inline-flex; background: var(--bg-inset);
  border: 1px solid var(--border); border-radius: 10px;
  padding: 3px; gap: 2px;
}
.ym-tab-pill {
  padding: 7px 16px; font-size: 13px; font-weight: 500;
  color: var(--text-3); cursor: pointer; border-radius: 8px;
  transition: background .15s, color .15s, box-shadow .15s;
  user-select: none; white-space: nowrap;
}
.ym-tab-pill:hover:not(.tab-disabled) { color: var(--text-1); }
.ym-tab-pill.tab-active {
  background: var(--bg-panel); color: var(--text-1);
  font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,.1);
}

/* Card tabs */
.ym-tabs-card { display: flex; gap: 4px; }
.ym-tab-card {
  padding: 9px 18px; font-size: 13px; font-weight: 500;
  color: var(--text-3); cursor: pointer;
  border: 1px solid var(--border); border-radius: 8px 8px 0 0;
  border-bottom: none; background: var(--bg-inset);
  transition: background .15s, color .15s; user-select: none;
}
.ym-tab-card.tab-active {
  background: var(--bg-panel); color: var(--text-1); font-weight: 600;
}
.ym-tabs-card-body {
  border: 1px solid var(--border); border-radius: 0 8px 8px 8px;
  background: var(--bg-panel); padding: 20px;
}
```

---

## JavaScript

```javascript
function switchTab(tabEl, panelId, groupSelector) {
  // Deactivate all
  document.querySelectorAll(groupSelector + ' [role="tab"]').forEach(t => {
    t.classList.remove('tab-active');
    t.setAttribute('aria-selected', 'false');
  });
  // Activate clicked
  tabEl.classList.add('tab-active');
  tabEl.setAttribute('aria-selected', 'true');
  // Switch panels
  document.querySelectorAll('[role="tabpanel"]').forEach(p => p.hidden = true);
  document.getElementById(panelId).hidden = false;
}
```

---

## Accessibility

- `role="tablist"` on container, `role="tab"` on each tab, `role="tabpanel"` on content
- `aria-selected="true"` on active tab, `aria-disabled="true"` on disabled tabs
- `aria-controls` on tab pointing to panel id; `aria-labelledby` on panel pointing to tab id
- Keyboard: Left/Right arrows move focus between tabs; Enter/Space activates focused tab

---

## Related Components

- **Breadcrumbs** (`breadcrumbs.html`) — location indicator
- **Accordion** (`accordion.html`) — vertical collapsible sections
- **Pagination** (`pagination.html`) — page-through data sets

---

*Yubi Market Design System · Tabs v1.0.0 · Internal Use*
