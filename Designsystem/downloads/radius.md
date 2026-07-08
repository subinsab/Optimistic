# Yubi Market — Border Radius Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market border radius system." Claude will reference these exact tokens, values, and rules for any UI work.

**Version:** 1.0.0 | **Steps:** 9 | **Range:** 0px → 9999px | **Token Prefix:** `radius.*`

---

## Rules Claude Must Follow

1. **Tokens only** — never use arbitrary border-radius values. Always reference a named `radius.*` token.
2. **No custom values** — if a value isn't in the scale, use the nearest token. Never invent values outside the scale.
3. **Match child to parent** — child element radius = parent radius minus parent padding. If a card uses `radius.xl` (12px) with 4px padding, inner children should use `radius.lg` (8px).
4. **Pills use radius.full** — status chips, tags, toggle tracks, avatar circles, and progress bars always use `radius.full` (9999px).
5. **Sharp edges use radius.none** — elements that bleed to a container edge (full-width images, edge-aligned banners) use `radius.none`.
6. **Consistency per component type** — all instances of the same component must share the same radius token. Never mix tokens on the same component type.
7. **Buttons and inputs = radius.md** — the standard token for form controls is `radius.md` (6px).
8. **Modals = radius.2xl** — modal dialogs use `radius.2xl` (16px).

---

## Full Scale

| Token | Value | Use for |
|---|---|---|
| `radius.none` | 0px | Sharp edges, flush-to-container elements, full-bleed images |
| `radius.xs` | 2px | Very subtle rounding, rarely used |
| `radius.sm` | 4px | Badge / tag, skeleton loaders |
| `radius.md` | 6px | Buttons, inputs, textareas, selects, tooltips |
| `radius.lg` | 8px | Compact cards, alerts / banners |
| `radius.xl` | 12px | Default cards, popovers |
| `radius.2xl` | 16px | Modals / dialogs |
| `radius.3xl` | 24px | Large decorative panels |
| `radius.full` | 9999px | Pills, status chips, avatars, toggle tracks, progress bars |

---

## Component Defaults

| Component | Token | Value |
|---|---|---|
| Button | `radius.md` | 6px |
| Input | `radius.md` | 6px |
| Textarea | `radius.md` | 6px |
| Select / Dropdown | `radius.md` | 6px |
| Tooltip | `radius.md` | 6px |
| Card (default) | `radius.xl` | 12px |
| Card (compact) | `radius.lg` | 8px |
| Badge / Tag | `radius.sm` | 4px |
| Pill / Status chip | `radius.full` | 9999px |
| Avatar | `radius.full` | 9999px |
| Modal | `radius.2xl` | 16px |
| Alert / Banner | `radius.lg` | 8px |
| Popover | `radius.xl` | 12px |
| Toggle switch (track) | `radius.full` | 9999px |
| Progress bar | `radius.full` | 9999px |
| Skeleton loader | `radius.sm` | 4px |

---

## Usage Guidelines

### Do
- Match child radius to parent minus parent's padding for optical flush alignment.
- Use `radius.full` (9999px) for pill shapes — this future-proofs against size changes.
- Apply `radius.none` to elements that must bleed to a container edge.
- Keep radius consistent across the same component type throughout the interface.

### Don't
- Mix `radius.sm` and `radius.xl` on the same component type — it looks accidental.
- Use arbitrary values like `border-radius: 10px` or `border-radius: 50%` — always use tokens.
- Apply a larger radius to a child than its parent — the child would visually overflow.

---

## CSS Custom Properties

```css
:root {
  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-3xl:  24px;
  --radius-full: 9999px;
}
```

---

*Yubi Market Design System · Border Radius Token Reference v1.0.0*
*Upload this file to Claude for full border radius system context.*
