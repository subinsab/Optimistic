# Using YDS in React and Angular

The same Web Components power both frameworks. The wrapper packages add typed props and idiomatic event handling so you rarely touch the raw custom elements.

---

## React (`@yubi/react`)

The wrappers are real React components generated with [`@lit/react`](https://www.npmjs.com/package/@lit/react): typed props, `ref` forwarding, and `on*` event props.

```tsx
import '@yubi/tokens/css';
import { Button, Input, Badge, Card, Modal } from '@yubi/react';
import { useState } from 'react';

export function LoanRow() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <Card>
      <span slot="eyebrow">Application</span>
      <h3 slot="title">Acme Pvt Ltd</h3>
      <Badge variant="warning" dot>Pending</Badge>

      <Input
        label="Sanction amount"
        value={amount}
        onInput={(e) => setAmount((e as CustomEvent).detail.value)}
        placeholder="₹ 0"
      />

      <div slot="actions">
        <Button variant="primary" onClick={() => setOpen(true)}>Approve</Button>
        <Button variant="ghost">Decline</Button>
      </div>

      <Modal open={open} heading="Confirm approval" onClose={() => setOpen(false)}>
        Approve ₹{amount} for Acme Pvt Ltd?
        <div slot="footer">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </Card>
  );
}
```

Notes
- Custom-event payloads arrive as `CustomEvent` — read `e.detail.value` for inputs.
- `slot="…"` maps children into named slots, exactly as in HTML.

---

## Angular (`@yubi/angular`)

Import `YubiModule` once. It registers the custom elements, allows `yds-*` tags (`CUSTOM_ELEMENTS_SCHEMA`), and provides a `ControlValueAccessor` so `<yds-input>` binds with `ngModel` / reactive forms.

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YubiModule } from '@yubi/angular';
import '@yubi/tokens/css';

@NgModule({ imports: [FormsModule, YubiModule] })
export class AppModule {}
```

```html
<!-- loan-row.component.html -->
<yds-card>
  <span slot="eyebrow">Application</span>
  <h3 slot="title">Acme Pvt Ltd</h3>
  <yds-badge variant="warning" dot>Pending</yds-badge>

  <yds-input label="Sanction amount" name="amount" [(ngModel)]="amount" placeholder="₹ 0"></yds-input>

  <div slot="actions">
    <yds-button variant="primary" (yds-click)="open = true">Approve</yds-button>
    <yds-button variant="ghost">Decline</yds-button>
  </div>
</yds-card>

<yds-modal [open]="open" heading="Confirm approval" (yds-close)="open = false">
  Approve {{ amount }} for Acme Pvt Ltd?
  <div slot="footer">
    <yds-button variant="secondary" (yds-click)="open = false">Cancel</yds-button>
    <yds-button variant="primary" (yds-click)="open = false">Confirm</yds-button>
  </div>
</yds-modal>
```

Notes
- Bind boolean/complex props with `[prop]`; listen to custom events with `(yds-event)`.
- For standalone components (no NgModule), add `CUSTOM_ELEMENTS_SCHEMA` to the component and import `'@yubi/core'` plus `YdsInputValueAccessor` directly.

---

## Why not write components twice?

One Lit implementation → both frameworks. Bug fixes, a11y, and token wiring live in `@yubi/core` only. The wrappers are generated/thin and contain no component logic. This is the [Shopify App Home](https://shopify.dev/docs/api/app-home/web-components) model applied to YDS.
