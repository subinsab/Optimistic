# Yubi Design System (YDS)

A **token-driven, multi-framework** design system for Yubi Market — a B2B financial lending platform.

The source of truth is a set of **W3C DTCG design tokens** (authored in [Tokens Studio](https://tokens.studio) / round-tripped to Figma variables). Tokens are compiled by **Style Dictionary** into platform artifacts (CSS variables, SCSS, JS/TS). Components are built once as framework-agnostic **Web Components** (Lit) and consumed in **React** and **Angular** through thin, typed wrapper packages.

```
Figma Variables  ⇄  Tokens Studio (DTCG JSON)  ──►  Style Dictionary  ──►  css / scss / js / ts
                                                                                │
                                                                                ▼
                                                       Web Components (Lit)  ──►  consume CSS vars
                                                                │
                                              ┌─────────────────┼─────────────────┐
                                              ▼                 ▼                 ▼
                                        @yubi/core        @yubi/react       @yubi/angular
                                     (custom elements)   (thin wrappers)   (thin wrappers)
```

## Why this architecture

| Requirement | Decision |
|---|---|
| One design language, two frameworks (React + Angular) | **Web Components** — write components once, run anywhere (the [Shopify App Home](https://shopify.dev/docs/api/app-home/web-components) model). |
| Figma ↔ code parity | **Tokens Studio + W3C DTCG** — designers and engineers edit the same token graph. |
| Multi-platform output | **Style Dictionary v4** — one token graph → CSS / SCSS / JS / TS / Figma. |
| Idiomatic DX per framework | **Thin wrappers** — `@yubi/react` and `@yubi/angular` add typed props, events, and `ref` handling over the custom elements. |
| Theming (light/dark, brand) | **3-tier tokens** — primitive → semantic → component, with theme-swappable semantic layers. |

## Monorepo layout

```
.
├── tokens/                  # SOURCE OF TRUTH — Tokens Studio / DTCG token sets
│   ├── $metadata.json       #   token set order (Tokens Studio multi-file sync)
│   ├── $themes.json         #   theme definitions (Light, Dark)
│   ├── primitive/           #   tier 1 — raw values (color ramps, scales)
│   ├── semantic/            #   tier 2 — intent (action, bg, text, border, feedback)
│   └── component/           #   tier 3 — per-component tokens (button, input, …)
├── packages/
│   ├── tokens/              # @yubi/tokens — Style Dictionary build → dist/ artifacts
│   ├── core/                # @yubi/core — Lit Web Components
│   ├── react/               # @yubi/react — React wrappers
│   └── angular/             # @yubi/angular — Angular wrappers
├── docs/                    # documentation (foundations, components, guides)
├── ARCHITECTURE.md          # deep dive: token tiers, build pipeline, wrapper strategy
└── ROADMAP.md               # how the remaining ~58 components are scaled
```

## Quick start

```bash
# 1. Install
npm install

# 2. Build tokens (Tokens Studio JSON → CSS/SCSS/JS)
npm run tokens:build

# 3. Build the web components
npm run build --workspace=@yubi/core
```

### Use in plain HTML
```html
<link rel="stylesheet" href="@yubi/tokens/dist/css/tokens.css" />
<script type="module" src="@yubi/core/dist/index.js"></script>

<yds-button variant="primary">Approve loan</yds-button>
```

### Use in React
```tsx
import '@yubi/tokens/dist/css/tokens.css';
import { Button } from '@yubi/react';

export const App = () => <Button variant="primary">Approve loan</Button>;
```

### Use in Angular
```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YubiModule } from '@yubi/angular';

@NgModule({ imports: [YubiModule], schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class AppModule {}
```
```html
<yds-button variant="primary" (ydsClick)="approve()">Approve loan</yds-button>
```

## What's in this first release

- ✅ Complete **token system** — 3 tiers, light + dark themes, all foundations (color, type, spacing, radius, elevation, breakpoints)
- ✅ **Build pipeline** — Style Dictionary config → CSS / SCSS / JS / TS
- ✅ **5 reference components** — Button, Input, Badge, Card, Modal (Web Component + React + Angular)
- ✅ **Documentation framework** — foundations + per-component docs + a reusable component template
- 🚧 Remaining ~58 components scaffolded against the established pattern — see [ROADMAP.md](./ROADMAP.md)

## Theming

Themes are applied via a `data-theme` attribute on the root, which re-points the **semantic** token layer. Components never reference primitives or hex directly.

```html
<html data-theme="light">  <!-- or "dark" -->
```

See [docs/guides/theming.md](./docs/guides/theming.md).

## License

Internal — Yubi Market.
