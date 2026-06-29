# Architecture

This document explains the three pillars of YDS: the **token graph**, the **build pipeline**, and the **component + wrapper strategy**.

---

## 1. Token graph — three tiers

Tokens are organized into three tiers. Each tier may only reference the tier above it. This is what makes theming and rebranding safe: you change a value in one place and it cascades.

```
┌───────────────────────────────────────────────────────────────┐
│ TIER 1 — PRIMITIVE   tokens/primitive/                         │
│ Raw, context-free values. Never used directly by components.   │
│ e.g.  color.brand.500 = #FD7149      dimension.space.200 = 16px│
└───────────────────────────────────────────────────────────────┘
                              ▲ referenced by
┌───────────────────────────────────────────────────────────────┐
│ TIER 2 — SEMANTIC    tokens/semantic/                          │
│ Intent / role. The themeable layer.                            │
│ e.g.  color.action.brand.default = {color.brand.500}           │
│       color.bg.page (light) = {color.neutral.50}               │
│       color.bg.page (dark)  = {color.neutral.900-ish}          │
└───────────────────────────────────────────────────────────────┘
                              ▲ referenced by
┌───────────────────────────────────────────────────────────────┐
│ TIER 3 — COMPONENT   tokens/component/                         │
│ Per-component decisions. Optional but recommended for big      │
│ components. e.g. button.primary.bg = {color.action.brand.default}│
└───────────────────────────────────────────────────────────────┘
```

**Rules**
1. Components consume **component** or **semantic** tokens only — never primitives, never raw hex.
2. The **semantic** tier is the only place that changes between themes.
3. Primitives are global and theme-independent.

### Token format (W3C DTCG)

Every token is an object with `$value` and `$type`. References use `{dot.path}` syntax.

```jsonc
{
  "color": {
    "brand": {
      "500": { "$value": "#FD7149", "$type": "color" }
    }
  }
}
```
```jsonc
// semantic references a primitive
{
  "color": {
    "action": {
      "brand": {
        "default": { "$value": "{color.brand.500}", "$type": "color" }
      }
    }
  }
}
```

Composite types (`typography`, `shadow`) bundle sub-values:
```jsonc
{
  "heading-3": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{font.family.base}",
      "fontWeight": "{font.weight.bold}",
      "fontSize": "{font.size.h3}",
      "lineHeight": "{font.lineHeight.h3}",
      "letterSpacing": "{font.letterSpacing.tight}"
    }
  }
}
```

### Tokens Studio multi-file sync

- `$metadata.json` — declares `tokenSetOrder` (the resolution order of token sets).
- `$themes.json` — declares each theme and which token sets are `enabled`/`source` for it. This is what powers Figma's variable modes and the plugin's theme switcher.

Designers edit these in the Tokens Studio Figma plugin; engineers edit the same JSON in git. The plugin's GitHub sync keeps both in step.

---

## 2. Build pipeline — Style Dictionary v4

`packages/tokens` runs Style Dictionary over the `tokens/` graph and emits platform files.

```
tokens/**/*.json
   │
   ├─ register sd-transforms (Tokens Studio → DTCG normalization)
   │
   ▼
Style Dictionary v4
   ├─ css/tokens.css        :root + [data-theme="dark"]  → CSS custom properties
   ├─ scss/_tokens.scss     $yds-* variables + maps
   ├─ js/tokens.js          ES module export
   └─ ts/tokens.d.ts        typed token names
```

- **Themes → CSS** : the `light` set emits to `:root`; the `dark` semantic set emits under `[data-theme="dark"]`. Primitives are emitted once (theme-independent).
- **Naming** : `--yds-color-action-brand-default`, `--yds-space-200`, `--yds-radius-md`, etc. The `yds` namespace prevents collisions in host apps.

Run: `npm run tokens:build`.

---

## 3. Components — Web Components + thin wrappers

### Why Web Components
A single implementation in **Lit** compiles to native custom elements that run unchanged in React, Angular, Vue, or vanilla HTML. Components are styled **entirely** through the CSS-variable tokens, so theming requires zero JS.

```
@yubi/core (Lit)
   yds-button, yds-input, yds-badge, yds-card, yds-modal
        │ custom elements registered on import
        ▼
   styled only via --yds-* CSS variables  ⇐  @yubi/tokens
```

### Wrapper packages
Native custom elements have rough edges in framework-land (React <19 doesn't pass non-string props or bind events ergonomically; Angular needs `CUSTOM_ELEMENTS_SCHEMA`). The wrappers smooth this over **without re-implementing** anything:

- **`@yubi/react`** — generated via `@lit/react`'s `createComponent`, giving real React components with typed props and `onYdsClick`-style event props.
- **`@yubi/angular`** — `NgModule` + lightweight directives that map `[prop]` bindings and `(ydsEvent)` outputs to the custom element, plus `ControlValueAccessor` for form controls.

### Component contract
Every component follows the same anatomy so the pattern scales:

```
packages/core/src/components/<name>/
├── <name>.ts          # LitElement: properties, render, a11y, events
├── <name>.styles.ts   # css`` template — references --yds-* tokens ONLY
├── <name>.types.ts    # exported TS types for props/variants
└── <name>.test.ts     # web-test-runner spec
docs/components/<name>.md   # anatomy, props, variants, states, a11y, do/don't
```

See [ROADMAP.md](./ROADMAP.md) for how the remaining components are produced against this contract.

---

## Decisions log

| Decision | Choice | Rationale |
|---|---|---|
| Brand primary reconciliation | `#FD7149` ramp (master reference v1.1.0) is canonical; legacy `#FE5104` retired | The reference doc ships a full 50–900 ramp + semantic mapping; the old `--accent` was a single value. Documented in `docs/foundations/colors.md`. |
| Token format | W3C DTCG (`$value`/`$type`) | Standard, future-proof, native Tokens Studio + Style Dictionary v4 support. |
| Component tech | Lit Web Components | One codebase for React + Angular; framework-agnostic; CSS-var theming. |
| Distribution | Core + thin wrappers | No duplication; idiomatic DX per framework. |
| Namespace | `yds-` elements, `--yds-` vars, `@yubi/*` packages | Collision-safe in host apps. |
