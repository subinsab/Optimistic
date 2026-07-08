# Tooltip — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Overlays (44/54) | **Status:** Stable

---

## Overview

Small contextual label that appears on hover or focus to provide supplementary information about an element. Pure CSS-driven with 4 placement options and a dark background that always contrasts against both light and dark page themes.

---

## Placements

| Modifier class | Direction |
|----------------|-----------|
| (none)         | Top (default) |
| `.tt-bottom`   | Below trigger |
| `.tt-left`     | Left of trigger |
| `.tt-right`    | Right of trigger |

---

## Measurements

| Property          | Value                          |
|-------------------|--------------------------------|
| Background        | #1A1D27                        |
| Text color        | #F8FAFC                        |
| Font size         | 12px                           |
| Font weight       | 500                            |
| Padding           | 6px 10px                       |
| Border radius     | 6px                            |
| Max width         | 220px                          |
| Offset from trigger | 8px                          |
| Arrow size        | 5px border triangle            |
| Show animation    | 160ms ease                     |
| Enter translate   | 4px → 0                        |
| Box shadow        | 0 4px 14px rgba(0,0,0,.22)     |
| z-index           | 9000                           |

---

## HTML

```html
<!-- Top tooltip (default) -->
<div class="ym-tooltip-wrap">
  <button class="ym-btn secondary btn-m">Hover me</button>
  <div class="ym-tooltip" role="tooltip">Tooltip text</div>
</div>

<!-- Bottom -->
<div class="ym-tooltip-wrap tt-bottom">
  <button>...</button>
  <div class="ym-tooltip">Below the trigger</div>
</div>

<!-- Left -->
<div class="ym-tooltip-wrap tt-left">
  <button>...</button>
  <div class="ym-tooltip">Left side</div>
</div>

<!-- Right -->
<div class="ym-tooltip-wrap tt-right">
  <button>...</button>
  <div class="ym-tooltip">Right side</div>
</div>

<!-- Icon button with tooltip (accessibility pattern) -->
<div class="ym-tooltip-wrap">
  <button class="icon-btn" aria-label="More information"
          aria-describedby="tt-info">
    <!-- SVG icon -->
  </button>
  <div class="ym-tooltip" role="tooltip" id="tt-info">
    More information
  </div>
</div>
```

---

## CSS

```css
/* Wrapper */
.ym-tooltip-wrap {
  position: relative;
  display: inline-block;
}

/* Bubble */
.ym-tooltip {
  position: absolute;
  background: #1A1D27;
  color: #F8FAFC;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  max-width: 220px;
  white-space: normal;
  text-align: center;
  pointer-events: none;
  z-index: 9000;
  opacity: 0;
  transition: opacity 160ms ease, transform 160ms ease;
  box-shadow: 0 4px 14px rgba(0,0,0,.22);
}
.ym-tooltip::after {
  content: '';
  position: absolute;
  left: 50%; transform: translateX(-50%);
  border: 5px solid transparent;
}

/* Top (default) */
.ym-tooltip-wrap .ym-tooltip {
  bottom: calc(100% + 8px);
  left: 50%; transform: translateX(-50%) translateY(-4px);
}
.ym-tooltip-wrap .ym-tooltip::after {
  top: 100%; border-top-color: #1A1D27;
}
.ym-tooltip-wrap:hover .ym-tooltip,
.ym-tooltip-wrap:focus-within .ym-tooltip {
  opacity: 1; transform: translateX(-50%) translateY(0);
}

/* Bottom */
.ym-tooltip-wrap.tt-bottom .ym-tooltip {
  top: calc(100% + 8px); bottom: auto;
  left: 50%; transform: translateX(-50%) translateY(4px);
}
.ym-tooltip-wrap.tt-bottom .ym-tooltip::after {
  bottom: 100%; top: auto;
  border-bottom-color: #1A1D27;
}
.ym-tooltip-wrap.tt-bottom:hover .ym-tooltip,
.ym-tooltip-wrap.tt-bottom:focus-within .ym-tooltip {
  opacity: 1; transform: translateX(-50%) translateY(0);
}

/* Left */
.ym-tooltip-wrap.tt-left .ym-tooltip {
  right: calc(100% + 8px); left: auto; bottom: auto;
  top: 50%; transform: translateY(-50%) translateX(-4px);
}
.ym-tooltip-wrap.tt-left .ym-tooltip::after {
  left: 100%; top: 50%; transform: translateY(-50%);
  border-top-color: transparent; border-left-color: #1A1D27;
}
.ym-tooltip-wrap.tt-left:hover .ym-tooltip,
.ym-tooltip-wrap.tt-left:focus-within .ym-tooltip {
  opacity: 1; transform: translateY(-50%) translateX(0);
}

/* Right */
.ym-tooltip-wrap.tt-right .ym-tooltip {
  left: calc(100% + 8px); right: auto; bottom: auto;
  top: 50%; transform: translateY(-50%) translateX(4px);
}
.ym-tooltip-wrap.tt-right .ym-tooltip::after {
  right: 100%; left: auto; top: 50%; transform: translateY(-50%);
  border-top-color: transparent; border-right-color: #1A1D27;
}
.ym-tooltip-wrap.tt-right:hover .ym-tooltip,
.ym-tooltip-wrap.tt-right:focus-within .ym-tooltip {
  opacity: 1; transform: translateY(-50%) translateX(0);
}
```

---

## Accessibility

- Add `role="tooltip"` to the `.ym-tooltip` element
- Reference the tooltip from the trigger via `aria-describedby="<id>"`
- The CSS `:focus-within` selector ensures keyboard users also see the tooltip
- Never put interactive content (links, buttons) inside a tooltip — use a Popover instead
- Keep tooltip text concise; it supplements but should not replace a visible label

---

## When to use Tooltip vs Popover

| Tooltip                                    | Popover                                     |
|--------------------------------------------|---------------------------------------------|
| Short supplementary text only             | Rich content, links, or actions inside      |
| Triggered by hover / focus                | Triggered by click                          |
| Dismisses automatically on mouse-out      | Stays open until dismissed by click/Escape  |
| No interactive content                    | Can contain form fields, buttons            |

---

## Related Components

- **Popover** (`popover.html`) — rich interactive overlay triggered by click
- **Modal** (`modal.html`) — full attention-blocking dialog
- **Link** (`link.html`) — often paired with tooltips for extra context

---

*Yubi Market Design System · Tooltip v1.0.0 · Internal Use*
