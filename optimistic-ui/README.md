# Optimistic UI

A small, dark-first design system you **own**. Instead of installing a locked
npm package, you run an installer that copies the tokens and components straight
into your project — so you can retheme every value and reshape any component
without fighting a dependency.

> Monochrome field, one warm accent, honest optimistic feedback.

---

## Requirements

- **Node.js 18.18 or newer** (20 LTS recommended) — the installer runs on Node.
- **Git** — to clone the repository.
- Any package manager (`npm`, `pnpm`, or `yarn`) in your target project.

Check what you have:

```sh
node -v   # v18.18.0 or higher
git --version
```

---

## Install

**1. Get the kit**

```sh
git clone https://github.com/subinsab/Optimistic.git
cd Optimistic/optimistic-ui
```

**2. Run the installer** (from the folder you want to install *into*, or pass `--dir`)

```sh
# everything — tokens + all components — into ./optimistic
sh /path/to/optimistic-ui/install.sh

# or pick components and a target folder
sh install.sh button notification icon --dir src/ui

# just the design tokens
sh install.sh --tokens-only

# see what's available
sh install.sh --list
```

(No `node`-less environments? The installer only needs Node.js, which most
frontend projects already have. You can also run `node install.mjs` directly.)

**3. Wire it up**

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
