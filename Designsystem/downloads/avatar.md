# Avatar — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Data Display (31/54) | **Status:** Stable

---

## Overview

Circular or square image container representing a user or entity. Supports photo images, initials fallback with 6 colour palettes, SVG icon fallback, status dot indicator, and stacked avatar groups with overflow count.

---

## Sizes

| Size | Class    | Diameter | Font |
|------|----------|----------|------|
| XS   | `.av-xs` | 24px     | 9px  |
| S    | `.av-sm` | 32px     | 11px |
| M    | `.av-md` | 40px     | 14px (default) |
| L    | `.av-lg` | 52px     | 18px |
| XL   | `.av-xl` | 64px     | 22px |
| 2XL  | `.av-2xl`| 80px     | 28px |

---

## Colour Palettes (Initials)

| Class       | Background               | Text     |
|-------------|--------------------------|----------|
| `.av-blue`  | rgba(64,101,197,.14)     | #4065C5  |
| `.av-green` | rgba(63,144,43,.14)      | #3F902B  |
| `.av-orange`| rgba(254,81,4,.12)       | #FE5104  |
| `.av-red`   | rgba(205,53,70,.12)      | #CD3546  |
| `.av-purple`| rgba(120,80,200,.12)     | #7850C8  |
| `.av-teal`  | rgba(0,152,141,.12)      | #00988D  |

---

## Measurements

| Property        | Value                          |
|-----------------|--------------------------------|
| Border          | 1.5px solid var(--border)      |
| Font weight     | 700                            |
| Status dot (M)  | 9 × 9px                        |
| Status dot border | 2px solid var(--bg-panel)    |
| Group overlap   | -8px margin-left               |
| Group border    | 2px solid var(--bg-panel)      |

---

## HTML

```html
<!-- Initials avatar -->
<div class="ym-avatar av-md av-blue" aria-label="Arjun Sharma">AS</div>

<!-- Photo avatar -->
<div class="ym-avatar av-md" aria-label="Riya Kumar">
  <img src="photo.jpg" alt="Riya Kumar"/>
</div>

<!-- With status dot -->
<div class="ym-avatar av-lg av-green">
  RK
  <span class="av-status online" aria-label="Online"></span>
</div>

<!-- Square variant -->
<div class="ym-avatar av-md av-orange av-square">PM</div>

<!-- Stacked group -->
<div class="ym-avatar-group" aria-label="4 team members">
  <div class="ym-avatar av-sm av-blue" aria-label="AS">AS</div>
  <div class="ym-avatar av-sm av-green" aria-label="RK">RK</div>
  <div class="ym-avatar av-sm av-orange" aria-label="PM">PM</div>
  <div class="ym-avatar av-sm av-count">+2</div>
</div>
```

---

## CSS

```css
.ym-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; overflow: hidden; flex-shrink: 0;
  font-weight: 700; line-height: 1;
  background: var(--bg-inset); color: var(--text-2);
  border: 1.5px solid var(--border);
  position: relative;
}
.ym-avatar img { width: 100%; height: 100%; object-fit: cover; }

/* Sizes */
.av-xs  { width: 24px; height: 24px; font-size: 9px; }
.av-sm  { width: 32px; height: 32px; font-size: 11px; }
.av-md  { width: 40px; height: 40px; font-size: 14px; }
.av-lg  { width: 52px; height: 52px; font-size: 18px; }
.av-xl  { width: 64px; height: 64px; font-size: 22px; }
.av-2xl { width: 80px; height: 80px; font-size: 28px; }

/* Colour palettes */
.av-blue   { background: rgba(64,101,197,.14); color: #4065C5; border-color: rgba(64,101,197,.2); }
.av-green  { background: rgba(63,144,43,.14);  color: #3F902B; border-color: rgba(63,144,43,.2); }
.av-orange { background: rgba(254,81,4,.12);   color: #FE5104; border-color: rgba(254,81,4,.2); }
.av-red    { background: rgba(205,53,70,.12);  color: #CD3546; border-color: rgba(205,53,70,.2); }
.av-purple { background: rgba(120,80,200,.12); color: #7850C8; border-color: rgba(120,80,200,.2); }
.av-teal   { background: rgba(0,152,141,.12);  color: #00988D; border-color: rgba(0,152,141,.2); }

/* Square variant */
.av-square { border-radius: 10px; }
.av-xs.av-square  { border-radius: 5px; }
.av-sm.av-square  { border-radius: 7px; }
.av-lg.av-square  { border-radius: 12px; }
.av-xl.av-square  { border-radius: 14px; }
.av-2xl.av-square { border-radius: 16px; }

/* Status dot */
.av-status {
  position: absolute; bottom: 1px; right: 1px;
  width: 9px; height: 9px; border-radius: 50%;
  border: 2px solid var(--bg-panel);
}
.av-status.online  { background: #3F902B; }
.av-status.away    { background: #D98F00; }
.av-status.busy    { background: #CD3546; }
.av-status.offline { background: var(--text-3); }

/* Avatar group */
.ym-avatar-group { display: inline-flex; align-items: center; }
.ym-avatar-group .ym-avatar { margin-left: -8px; border: 2px solid var(--bg-panel); }
.ym-avatar-group .ym-avatar:first-child { margin-left: 0; }
```

---

## Initials Algorithm

Extract up to 2 characters from the user's name for initials:

```javascript
function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}
// 'Arjun Sharma' → 'AS'
// 'Priya'        → 'PR' (first two chars if single word, or just 'P')
```

---

## Colour Assignment

Deterministically assign a palette colour based on name to avoid random re-assignments:

```javascript
const PALETTES = ['blue','green','orange','red','purple','teal'];
function getAvatarColor(name) {
  const sum = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTES[sum % PALETTES.length];
}
```

---

## Accessibility

- Add `aria-label` with the full name on `.ym-avatar`
- Status dot should have `aria-label="Online"` (or relevant status text)
- For groups, add `aria-label="N team members"` on `.ym-avatar-group`
- Count badge ("+N") is decorative if the group count is conveyed elsewhere

---

## Related Components

- **Badge** (`badge.html`) — status label that can be placed alongside an avatar
- **Indicator** (`indicator.html`) — dot-only presence indicator
- **List** (`list.html`) — often displays avatars in list rows

---

*Yubi Market Design System · Avatar v1.0.0 · Internal Use*
