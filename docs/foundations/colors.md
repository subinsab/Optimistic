# Color

## Rules

1. **Always use tokens, never raw hex** in component or app code. Raw hex appears only in the primitive token definitions.
2. **Max 1 brand primary per interactive section** — use secondary/ghost variants for supporting actions.
3. **Warning text on white:** use `color.text.warning` (`yellow.700` #B85008). `yellow.500` fails WCAG AA for small text.
4. **Focus rings** always use `color.border.focus` (`sky.400` #81AFF2) + the `shadow.focus` ring. Never a custom value.
5. **Feedback sets** are applied as a full set — `bg` + `border` + `icon` + `text`. Never a single feedback color alone.
6. **Neutral text hierarchy:** primary → secondary → muted → disabled.

## Brand primary — reconciliation note

The legacy artifacts contained **two** brand oranges:

| Source | Value |
|---|---|
| Master reference v1.1.0 (`brand.500`, full 50–900 ramp) | **`#FD7149`** ✅ canonical |
| Old `styles.css` `--accent` (single value) | `#FE5104` ⛔ retired |

**Decision:** `#FD7149` is the canonical brand primary because it ships a complete ramp and a full semantic mapping. The single-value `#FE5104` is retired. If you need the old hot-orange for the logo mark specifically, it remains available as a brand-mark constant in the logo asset — it is **not** a UI token. See [ARCHITECTURE.md](../../ARCHITECTURE.md#decisions-log).

## Primitive ramps

Full 50–900 ramps for `brand`, `red`, `green`, `yellow`, `blue`, `neutral`; key stops for `lime`, `sky`, and the extended palette (purple, pink, teal, cyan, indigo, maroon, warmgray). A dedicated **`ink`** scale provides the warm-gray dark-mode surfaces and text. See [`tokens/primitive/color.json`](../../tokens/primitive/color.json).

## Semantic roles (the layer you use)

| Group | Tokens |
|---|---|
| **Action** | `action.brand.{default,hover,active,disabled,subtle}`, `action.secondary.*`, `action.danger.*`, `action.special.*` |
| **Background** | `bg.{page,panel,inset,subtle,hover,brand-subtle,brand-bold,special-subtle,special-bold,overlay}` |
| **Text** | `text.{primary,secondary,muted,disabled,inverse,brand,link,success,error,warning,info}` |
| **Border** | `border.{default,strong,focus,brand,success,error,warning,info}` |
| **Feedback** | `feedback.{success,error,warning,info}.{bg,border,icon,text}` |

Each role resolves to a different primitive in light vs dark — see [`color-light.json`](../../tokens/semantic/color-light.json) / [`color-dark.json`](../../tokens/semantic/color-dark.json).

## Chart palette

A 15-color categorical series and three sequential scales (brand, blue, green) are documented in the master reference and will be added as `chart.*` tokens in a follow-up (see [ROADMAP.md](../../ROADMAP.md)).
