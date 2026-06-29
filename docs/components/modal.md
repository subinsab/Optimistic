# `<yds-modal>` — Modal

Centered dialog with overlay. Controlled via the `open` property.

## Examples
```html
<yds-modal open heading="Confirm approval" size="md">
  Approve ₹50,00,000 for Acme Pvt Ltd?
  <div slot="footer">
    <yds-button variant="secondary">Cancel</yds-button>
    <yds-button variant="primary">Confirm</yds-button>
  </div>
</yds-modal>
```
```ts
const modal = document.querySelector('yds-modal');
modal.open = true;
modal.addEventListener('yds-close', () => (modal.open = false));
```

## API
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `open` | `open` | `boolean` | `false` | Visibility |
| `size` | `size` | `'sm'\|'md'\|'lg'` | `'md'` | 480 / 560 / 640px |
| `heading` | `heading` | `string` | `''` | Title + `aria-label` |
| `noDismiss` | `no-dismiss` | `boolean` | `false` | Disable Escape / overlay-click close |

### Slots
| Slot | Description |
|---|---|
| (default) | Body content |
| `footer` | Right-aligned actions |

### Events
| Event | Description |
|---|---|
| `yds-close` | Close requested (overlay click, Escape, or close button). The host app owns `open`. |

### Tokens consumed
`modal.*` — see [`tokens/component/modal.json`](../../tokens/component/modal.json).

## Accessibility
- `role="dialog"` + `aria-modal="true"`; labeled by `heading`.
- Escape closes (unless `no-dismiss`); overlay click closes (unless `no-dismiss`).
- **Roadmap:** focus trap + return-focus-to-trigger + scroll lock are the next hardening step (see [ROADMAP.md](../../ROADMAP.md)). Today, move focus into the dialog on open in your app code.

## Do / Don't
- ✅ Keep modals for focused, interrupting decisions.
- ✅ Make the primary footer action match the modal's purpose.
- ⛔ Don't stack modals; don't use a modal for non-blocking info (use a snackbar/banner).
