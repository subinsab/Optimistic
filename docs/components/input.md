# `<yds-input>` — Text Input

Single-line text field. **Form-associated** — participates in native, React, and Angular forms.

## Examples
```html
<yds-input label="Email" type="email" placeholder="you@company.com" required></yds-input>
<yds-input label="Amount" value="50000" helper="Max ₹10,00,000"></yds-input>
<yds-input label="PAN" error="Invalid PAN format"></yds-input>
<yds-input label="Search">
  <svg slot="start" width="16" height="16">…</svg>
</yds-input>
```

## API
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `label` | `label` | `string` | `''` | Field label |
| `value` | `value` | `string` | `''` | Current value |
| `type` | `type` | `'text'\|'email'\|'password'\|'number'\|'tel'\|'url'\|'search'` | `'text'` | Input type |
| `name` | `name` | `string` | `''` | Form field name |
| `placeholder` | `placeholder` | `string` | `''` | Placeholder |
| `helper` | `helper` | `string` | `''` | Helper text below field |
| `error` | `error` | `string` | `''` | Error message; presence sets invalid state |
| `disabled` | `disabled` | `boolean` | `false` | Disable |
| `required` | `required` | `boolean` | `false` | Mark required (`*`) |
| `invalid` | `invalid` | `boolean` | derived | Error styling (auto-set from `error`) |

### Slots
`start`, `end` — leading/trailing adornments (icons, units).

### Events
| Event | Detail | Description |
|---|---|---|
| `yds-input` | `{ value }` | Every keystroke |
| `yds-change` | `{ value }` | Commit (blur/enter) |

### Tokens consumed
`input.*` — see [`tokens/component/input.json`](../../tokens/component/input.json).

## States
Default · hover (`border.strong`) · focus (`border.focus` + ring) · error (`border.error` + error ring) · disabled (`bg.subtle`).

## Accessibility
- `label` is associated via `for`/`id`; `helper`/`error` via `aria-describedby`.
- `aria-invalid` reflects the error state.
- Form value is exposed through `ElementInternals` (`setFormValue`), so the field submits natively.

## Do / Don't
- ✅ Always pair an input with a visible label.
- ✅ Put units/icons in `start`/`end` slots, not the placeholder.
- ⛔ Don't use placeholder as the only label.
