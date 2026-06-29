# `<yds-badge>` — Badge

Compact status label. Uses the full feedback color set per variant.

## Examples
```html
<yds-badge>Draft</yds-badge>
<yds-badge variant="success" dot>Approved</yds-badge>
<yds-badge variant="warning" dot>Pending</yds-badge>
<yds-badge variant="error">Rejected</yds-badge>
<yds-badge variant="info">New</yds-badge>
```

## API
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `variant` | `variant` | `'neutral'\|'success'\|'error'\|'warning'\|'info'` | `'neutral'` | Feedback variant |
| `dot` | `dot` | `boolean` | `false` | Leading status dot |

### Slots
(default) — badge text.

### Tokens consumed
`badge.*` — see [`tokens/component/badge.json`](../../tokens/component/badge.json). Each variant pulls `bg` + `border` + `text` from `color.feedback.*`.

## Accessibility
Badges are decorative labels. If a badge conveys status not otherwise in the text, add context for screen readers (e.g. visually-hidden text or `aria-label` on the container).

## Do / Don't
- ✅ Keep to 1–2 words.
- ⛔ Don't use a badge as a button — use `<yds-button>` or a chip/filter.
