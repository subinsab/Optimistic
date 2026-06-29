# `<yds-COMPONENT>` — Component Name

> Copy this file to author a new component doc. Every YDS component doc follows this structure so the catalog is predictable. Pair it with the code contract in [ARCHITECTURE.md](../../ARCHITECTURE.md#component-contract).

One-line purpose. When to use it / when to reach for something else.

## Anatomy

A labeled breakdown of the parts (text or an image): container, label, icon slots, etc.

## Import

```ts
import '@yubi/core/COMPONENT';          // vanilla / registers <yds-COMPONENT>
import { Component } from '@yubi/react'; // React
// Angular: YubiModule
```

## Examples

```html
<yds-COMPONENT variant="primary">…</yds-COMPONENT>
```

## API

### Properties / attributes
| Prop | Attr | Type | Default | Description |
|---|---|---|---|---|
| `variant` | `variant` | `…` | `…` | … |

### Slots
| Slot | Description |
|---|---|
| (default) | … |

### Events
| Event | Detail | Description |
|---|---|---|
| `yds-…` | `{…}` | … |

### CSS parts
| Part | Description |
|---|---|

### Tokens consumed
List the `--yds-COMPONENT-*` (and semantic) tokens this component reads, linking to `tokens/component/COMPONENT.json`.

## States
Default · hover · active · focus · disabled · loading · error (as applicable). Note the token for each.

## Accessibility
Roles, keyboard interaction, focus management, ARIA, contrast notes.

## Do / Don't
- ✅ …
- ⛔ …
