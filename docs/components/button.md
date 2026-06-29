# `<yds-button>` — Button

The primary interactive control: triggers an action or navigation. Use **one** primary button per section; supporting actions use secondary, ghost, or link.

## Anatomy

```
┌──────────────────────────────┐
│ [start] ⟳/label  Approve  [end] │   ← icon slots flank the label; ⟳ = loading spinner
└──────────────────────────────┘
```

## Import

```ts
import '@yubi/core';                 // vanilla
import { Button } from '@yubi/react'; // React
// Angular: import YubiModule
```

## Examples

```html
<yds-button variant="primary">Approve loan</yds-button>
<yds-button variant="secondary">Save draft</yds-button>
<yds-button variant="danger">Decline</yds-button>
<yds-button variant="ghost" size="sm">Cancel</yds-button>
<yds-button variant="link">View details</yds-button>

<yds-button variant="primary" loading>Submitting</yds-button>
<yds-button variant="primary" disabled>Unavailable</yds-button>
<yds-button variant="primary" full-width>Continue</yds-button>

<yds-button variant="secondary">
  <svg slot="start" width="16" height="16">…</svg>
  Download
</yds-button>
```

## API

### Properties / attributes
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `variant` | `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | Visual style |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height + padding |
| `type` | `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `disabled` | `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `loading` | `boolean` | `false` | Shows spinner, blocks clicks |
| `fullWidth` | `full-width` | `boolean` | `false` | Stretches to container width |

### Slots
| Slot | Description |
|---|---|
| (default) | Button label |
| `start` | Leading icon |
| `end` | Trailing icon |

### Events
| Event | Detail | Description |
|---|---|---|
| `yds-click` | — | Activation. Not fired when `disabled` or `loading`. |

### CSS parts
| Part | Description |
|---|---|
| `button` | The native `<button>` element |

### Tokens consumed
`button.radius`, `button.gap`, `button.size.{sm,md,lg}.*`, `button.{primary,secondary,danger,ghost,link}.*`, plus `font.*` primitives and `color.border.focus` / focus ring. See [`tokens/component/button.json`](../../tokens/component/button.json).

## States
| State | Treatment |
|---|---|
| Hover | `…bg-hover` token per variant |
| Active | `…bg-active` (primary) + 0.5px nudge |
| Focus | `color.border.focus` + `shadow.focus` ring |
| Disabled | opacity 0.5, `cursor: not-allowed` |
| Loading | spinner replaces `start` slot, label dimmed, `aria-busy` |

## Accessibility
- Renders a native `<button>` → full keyboard + AT support for free.
- `disabled`/`loading` set the native `disabled` attribute and `aria-busy`.
- Icon-only buttons must provide an `aria-label` on the host.
- Focus ring uses `:focus-visible` so it shows for keyboard, not mouse.

## Do / Don't
- ✅ One primary action per view; pair with secondary/ghost.
- ✅ Use `loading` for async submits to prevent double-submit.
- ⛔ Don't use `danger` for routine actions.
- ⛔ Don't place two primary buttons side by side.
