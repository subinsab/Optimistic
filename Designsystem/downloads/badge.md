# Badge — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (32/54) | **Status:** Stable

---

## Overview

Small label used to communicate status, category, or count. Six semantic colour variants in both subtle and solid styles, three sizes, a dot indicator variant, and a numeric count overlay for icon buttons.

---

## Variants

| Variant         | Text color | Background (subtle)        |
|-----------------|------------|----------------------------|
| Default         | --text-2   | var(--bg-inset)            |
| Info            | #4065C5    | rgba(64,101,197,.1)        |
| Success         | #3F902B    | rgba(63,144,43,.12)        |
| Warning         | #B07E00    | rgba(217,151,0,.12)        |
| Error           | #CD3546    | rgba(205,53,70,.1)         |
| Accent          | #FE5104    | rgba(254,81,4,.1)          |

All variants also have a `-solid` version with full background fill and white text.

---

## Sizes

| Size | Class       | Font | Padding  |
|------|-------------|------|----------|
| S    | `.badge-sm` | 10px | 2px 6px  |
| M    | (default)   | 11px | 3px 8px  |
| L    | `.badge-lg` | 12px | 4px 10px |

---

## Measurements

| Property          | Value                          |
|-------------------|--------------------------------|
| Font size (M)     | 11px                           |
| Font weight       | 700                            |
| Padding (M)       | 3px 8px                        |
| Border radius     | 20px                           |
| Border            | 1px solid (variant alpha color)|
| Dot size          | 6 × 6px                        |
| Count min-width   | 16px                           |
| Count height      | 16px                           |
| Count font        | 10px / 700                     |
| Count border      | 2px solid var(--bg-panel)      |
| Count background  | #CD3546                        |

---

## HTML

```html
<!-- Subtle variants -->
<span class="ym-badge badge-default">Default</span>
<span class="ym-badge badge-info">Info</span>
<span class="ym-badge badge-success">Active</span>
<span class="ym-badge badge-warning">Pending</span>
<span class="ym-badge badge-error">Rejected</span>
<span class="ym-badge badge-accent">New</span>

<!-- Solid variants -->
<span class="ym-badge badge-info-solid">Approved</span>
<span class="ym-badge badge-success-solid">Disbursed</span>
<span class="ym-badge badge-warning-solid">Under Review</span>
<span class="ym-badge badge-error-solid">Overdue</span>

<!-- Dot variant -->
<span class="ym-badge badge-success badge-dot">Online</span>
<span class="ym-badge badge-warning badge-dot">Away</span>
<span class="ym-badge badge-error badge-dot">Offline</span>

<!-- Sizes -->
<span class="ym-badge badge-info badge-sm">Small</span>
<span class="ym-badge badge-info">Medium</span>
<span class="ym-badge badge-info badge-lg">Large</span>

<!-- Count overlay on icon -->
<div style="position:relative;display:inline-flex;">
  <button class="icon-btn"><!-- SVG --></button>
  <span class="ym-badge-count">3</span>
</div>
```

---

## CSS

```css
.ym-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700; line-height: 1;
  padding: 3px 8px; border-radius: 20px;
  border: 1px solid transparent; white-space: nowrap;
}

/* Subtle */
.badge-default  { background: var(--bg-inset); color: var(--text-2); border-color: var(--border); }
.badge-info     { background: rgba(64,101,197,.1); color: #4065C5; border-color: rgba(64,101,197,.25); }
.badge-success  { background: rgba(63,144,43,.12); color: #3F902B; border-color: rgba(63,144,43,.28); }
.badge-warning  { background: rgba(217,151,0,.12); color: #B07E00; border-color: rgba(217,151,0,.28); }
.badge-error    { background: rgba(205,53,70,.1); color: #CD3546; border-color: rgba(205,53,70,.25); }
.badge-accent   { background: rgba(254,81,4,.1); color: #FE5104; border-color: rgba(254,81,4,.25); }

/* Solid */
.badge-info-solid    { background: #4065C5; color: #fff; border-color: #4065C5; }
.badge-success-solid { background: #3F902B; color: #fff; border-color: #3F902B; }
.badge-warning-solid { background: #D98F00; color: #fff; border-color: #D98F00; }
.badge-error-solid   { background: #CD3546; color: #fff; border-color: #CD3546; }

/* Dot */
.badge-dot::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: currentColor;
  display: inline-block; flex-shrink: 0;
}

/* Sizes */
.badge-sm { font-size: 10px; padding: 2px 6px; }
.badge-lg { font-size: 12px; padding: 4px 10px; }

/* Count overlay */
.ym-badge-count {
  position: absolute; top: -4px; right: -4px;
  background: #CD3546; color: #fff;
  font-size: 10px; font-weight: 700;
  min-width: 16px; height: 16px; border-radius: 8px;
  padding: 0 4px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg-panel);
}
```

---

## Accessibility

- Badges are decorative labels — add `aria-label` to the surrounding element if the badge is the only visual indicator of status
- For count badges on icon buttons, update `aria-label` to include the count: `aria-label="Notifications (3)"`
- Do not rely solely on colour; include text or a dot indicator for colour-blind users

---

## When to use which variant

| Variant   | Use case                                         |
|-----------|--------------------------------------------------|
| Default   | Neutral category labels, types                   |
| Info      | Verified, confirmed, informational states        |
| Success   | Active loans, approved applications, disbursed   |
| Warning   | Pending review, incomplete KYC, expiring soon    |
| Error     | Rejected, overdue, payment failed                |
| Accent    | New feature, beta tag, featured item             |
| Solid     | High-emphasis status on dark or complex surfaces |

---

## Related Components

- **Tags** (`tags.html`) — user-applied, removable labels
- **Pills** (`pills.html`) — selectable filter chips
- **Indicator** (`indicator.html`) — dot-only presence indicator

---

*Yubi Market Design System · Badge v1.0.0 · Internal Use*
