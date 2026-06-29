# `<yds-card>` — Card

Content container with the standard panel surface, border, radius, and elevation.

## Examples
```html
<yds-card>
  <span slot="eyebrow">Application</span>
  <h3 slot="title">Acme Pvt Ltd</h3>
  Loan #YM-20413 · ₹50,00,000
  <div slot="actions">
    <yds-button variant="primary" size="sm">Review</yds-button>
  </div>
</yds-card>

<yds-card compact interactive>Click-through summary card</yds-card>
```

## API
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `compact` | `compact` | `boolean` | `false` | Tighter padding + `radius.lg` |
| `interactive` | `interactive` | `boolean` | `false` | Hover elevation + pointer affordance |

### Slots
| Slot | Description |
|---|---|
| `eyebrow` | ALL CAPS label above the title |
| `title` | Card title |
| (default) | Body content |
| `actions` | Footer actions |

### Tokens consumed
`card.*` — see [`tokens/component/card.json`](../../tokens/component/card.json).

## Accessibility
- `interactive` cards that act as a single link/button should wrap an `<a>`/`<button>`, or set `role`/`tabindex` and handle keyboard activation — hover elevation alone is not an affordance for AT.

## Do / Don't
- ✅ Use the `eyebrow` → `title` → body → `actions` rhythm for scannability.
- ⛔ Don't nest interactive cards inside interactive cards.
