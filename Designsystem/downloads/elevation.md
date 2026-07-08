# Yubi Market — Elevation Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market elevation system." Claude will reference these exact shadow tokens, values, and rules for any UI work.

**Version:** 1.0.0 | **Shadow Levels:** 8 | **Focus Rings:** 2 | **Token Prefix:** `shadow.*`

---

## Rules Claude Must Follow

1. **Tokens only** — never use arbitrary `box-shadow` values. Always reference a named `shadow.*` token.
2. **Higher layer = greater shadow** — elements higher in the z-axis stacking order must carry a greater shadow level. A popover must always appear above a card.
3. **Page surface = shadow.none** — the base page canvas never has a shadow.
4. **Cards = shadow.sm** — standard content cards and panels use `shadow.sm`.
5. **Dropdowns = shadow.md** — select menus, autocomplete lists, and tooltips use `shadow.md`.
6. **Modals = shadow.lg** — modals and floating panels use `shadow.lg`.
7. **Focus rings** — always use `shadow.focus` on interactive element focus. Use `shadow.focus-error` when the input is simultaneously in error state.
8. **shadow.inner** — use only for pressed states, inset inputs, and recessed wells. Never use it for elevation.

---

## Shadow Scale

| Level | Token | CSS Value | Use for |
|---|---|---|---|
| 00 | `shadow.none` | `none` | Flat surfaces, table rows, inline elements |
| 01 | `shadow.xs` | `0 1px 2px rgba(0,0,0,.06)` | Subtle lift, chip badges, input focus alternative |
| 02 | `shadow.sm` | `0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)` | Cards, default panel elevation |
| 03 | `shadow.md` | `0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.05)` | Dropdowns, hover states on cards |
| 04 | `shadow.lg` | `0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04)` | Modals, popovers, floating panels |
| 05 | `shadow.xl` | `0 20px 25px -5px rgba(0,0,0,.08), 0 10px 10px -5px rgba(0,0,0,.04)` | Full-screen overlays, command palettes |
| 06 | `shadow.2xl` | `0 25px 50px -12px rgba(0,0,0,.18)` | Toast notifications, highest-priority overlays |
| — | `shadow.inner` | `inset 0 2px 4px rgba(0,0,0,.08)` | Pressed states, inset inputs, recessed wells |

---

## Focus Ring Tokens

| Token | CSS Value | Use for |
|---|---|---|
| `shadow.focus` | `0 0 0 3px rgba(129,175,242,.45)` + `border-color: #81AFF2` | All interactive elements on focus (keyboard or pointer) |
| `shadow.focus-error` | `0 0 0 3px rgba(220,38,38,.30)` + `border-color: #CD3546` | Input in error state while simultaneously focused |

---

## Elevation Map (Z-axis layers)

| Layer | Name | Token | Use for |
|---|---|---|---|
| 0 | Page Surface | `shadow.none` | Background, page canvas, layout regions |
| 1 | Card Level | `shadow.sm` | Standard content cards, panels, list items |
| 2 | Dropdown Level | `shadow.md` | Select menus, autocomplete lists, tooltips |
| 3 | Popover Level | `shadow.lg` | Popovers, date pickers, context menus |
| 4 | Modal Level | `shadow.xl` | Modals, drawers, full-screen overlays |
| 5 | Toast Level | `shadow.2xl` | Toast notifications, highest-priority alerts |

---

## CSS Custom Properties

```css
:root {
  /* Shadow scale */
  --shadow-none:  none;
  --shadow-xs:    0 1px 2px rgba(0,0,0,.06);
  --shadow-sm:    0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md:    0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.05);
  --shadow-lg:    0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04);
  --shadow-xl:    0 20px 25px -5px rgba(0,0,0,.08), 0 10px 10px -5px rgba(0,0,0,.04);
  --shadow-2xl:   0 25px 50px -12px rgba(0,0,0,.18);
  --shadow-inner: inset 0 2px 4px rgba(0,0,0,.08);

  /* Focus rings */
  --shadow-focus:       0 0 0 3px rgba(129,175,242,.45);
  --shadow-focus-error: 0 0 0 3px rgba(220,38,38,.30);
}
```

---

*Yubi Market Design System · Elevation Token Reference v1.0.0*
*Upload this file to Claude for full elevation system context.*
