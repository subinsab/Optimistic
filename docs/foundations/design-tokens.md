# Design tokens

Tokens are the **single source of truth** for every visual decision in YDS. They live in [`/tokens`](../../tokens) as W3C DTCG JSON, are authored in Figma via [Tokens Studio](https://tokens.studio), and are compiled by Style Dictionary into the artifacts that code consumes.

## Three tiers

```
primitive  →  semantic  →  component
 (raw)        (intent)      (per-component)
```

| Tier | Folder | Example | Used by |
|---|---|---|---|
| **Primitive** | `tokens/primitive/` | `color.brand.500 = #FD7149` | semantic tier only |
| **Semantic** | `tokens/semantic/` | `color.action.brand.default = {color.brand.500}` | components, app code |
| **Component** | `tokens/component/` | `button.primary.bg = {color.action.brand.default}` | one component |

**Golden rule:** a component (or app) may use **component** and **semantic** tokens. It may **never** use a primitive or a raw hex value. This is what makes theming and rebranding a one-line change.

## Anatomy of a token (DTCG)

```jsonc
{
  "color": {
    "brand": {
      "500": { "$value": "#FD7149", "$type": "color", "$description": "Primary brand orange" }
    }
  }
}
```

References use `{dot.path}`:
```jsonc
{ "default": { "$value": "{color.brand.500}", "$type": "color" } }
```

Composite tokens bundle sub-values (typography, shadow):
```jsonc
{
  "heading-3": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{font.family.base}", "fontWeight": "{font.weight.bold}",
      "fontSize": "{font.size.h3}", "lineHeight": "{font.line-height.h3}",
      "letterSpacing": "{font.letter-spacing.snug}"
    }
  }
}
```

## Themes

Two themes ship today: **Light** and **Dark**. They differ **only** in the semantic color layer:

- `tokens/semantic/color-light.json` → compiled to `:root`
- `tokens/semantic/color-dark.json` → compiled to `[data-theme="dark"]`

Everything else (primitives, type, spacing, elevation, component tokens) is theme-independent and emitted once. `tokens/$themes.json` maps each theme to its token sets — this also drives Figma variable **modes**, so designers flip themes in Figma the same way engineers flip `data-theme`.

## Build outputs

`npm run tokens:build` produces:

| File | Contents |
|---|---|
| `packages/tokens/dist/css/tokens.css` | `--yds-*` custom properties (`:root` + dark overrides) |
| `packages/tokens/dist/scss/_tokens.scss` | `$yds-*` SCSS variables |
| `packages/tokens/dist/js/tokens.js` | ES-module export of every token |
| `packages/tokens/dist/ts/tokens.d.ts` | typed token names |

### Naming
Dot paths become kebab-case CSS variables with a `yds` prefix:

| Token path | CSS variable |
|---|---|
| `color.action.brand.default` | `--yds-color-action-brand-default` |
| `space.200` | `--yds-space-200` |
| `radius.md` | `--yds-radius-md` |
| `button.primary.bg` | `--yds-button-primary-bg` |

## Editing tokens

- **Designers** — edit in the Tokens Studio Figma plugin; push to git via the plugin's GitHub sync.
- **Engineers** — edit the JSON in `/tokens` directly; the plugin pulls your changes.

Both sides edit the same graph, so Figma and code never drift.
