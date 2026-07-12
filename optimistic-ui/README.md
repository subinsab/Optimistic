# Optimistic UI

A small, dark-first design system you **own**. Instead of installing a locked
npm package, you run an installer that copies the tokens and components straight
into your project — so you can retheme every value and reshape any component
without fighting a dependency.

> Monochrome field, one warm accent, honest optimistic feedback.

---

## Requirements

- **Node.js 18 or newer** (20 LTS recommended) — the CLI runs on Node.
- Any package manager (`npm`, `pnpm`, or `yarn`) in your target project.

Check what you have:

```sh
node -v   # v18 or higher
```

---

## Install

Run the CLI from the root of your project. Nothing to clone — the files land
straight in your codebase and are yours to edit.

```sh
# tokens + those components, into ./optimistic
npx optimistic-ui add button card table

# tokens + every component
npx optimistic-ui add --all

# just the design tokens
npx optimistic-ui init

# see what's available
npx optimistic-ui list

# choose the target folder
npx optimistic-ui add button --dir src/ui
```

**Then wire it up**

```css
/* your global stylesheet */
@import "./optimistic/tokens.css";
```

```tsx
import { Button } from "./optimistic/components/button/button";
import { Notification } from "./optimistic/components/notification/notification";

<Button variant="warm">Ship it</Button>
<Notification severity="success" title="Published">Live and reconciled.</Notification>
```

Some components have peer deps (the installer tells you). `icon` needs Lucide:

```sh
npm i lucide-react
```

---

## Retheme in one file

Everything reads from CSS variables in **`tokens.css`**, layered `Core → Semantic → Theme`:

- **Core** — raw ramps (`--ember-500`, `--carbon-900` …). Change the brand here.
- **Semantic** — roles components use (`--accent`, `--surface`, `--danger-solid` …). These point at Core.
- **Theme** — override the roles per product. A `harbor` theme is included:

```html
<html data-theme="harbor">   <!-- accent flips from Ember (warm) to Cobalt (blue) -->
```

Change a single value and it propagates everywhere:

```css
:root { --accent: #7C3AED; }   /* the whole system goes violet */
```

---

## Own the components

Every copied file is plain React + plain CSS with no build magic. Open
`components/button/button.tsx` and change it — add a variant, rename a class,
delete what you don't need. It's your code now.

```tsx
// add your own variant in button.css …
.o-btn--neon { background: #39FF14; color: #000; }
// … and expose it in button.tsx's Variant type. Done.
```

---

## What's included

| Component | Deps |
|---|---|
| `button` | — |
| `notification` | — |
| `icon` | `lucide-react` |

More components follow the same one-folder, token-driven pattern — drop them in
`components/<name>/`, list them in `registry.json`, and the installer picks them up.

---

## License

MIT — do anything, no attribution required.
