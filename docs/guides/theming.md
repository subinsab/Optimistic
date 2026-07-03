# Theming

Themes in YDS are applied by re-pointing the **semantic** token layer. Components reference semantic/component tokens only, so theme switching requires **zero JavaScript** and **no component re-render**.

## Switching theme

Set `data-theme` on `<html>` (or any ancestor of the components):

```html
<html data-theme="light"> … </html>   <!-- default -->
<html data-theme="dark">  … </html>
```

The compiled `tokens.css` contains:
```css
:root { --yds-color-bg-page: #f8fafc; /* …light… */ }
[data-theme="dark"] { --yds-color-bg-page: #1a1a1a; /* …dark overrides… */ }
```

Toggle in JS:
```ts
document.documentElement.dataset.theme =
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
```

## Scoped themes

Because overrides are attribute-scoped, you can theme a subtree independently:
```html
<body data-theme="light">
  <aside data-theme="dark">  <!-- dark sidebar inside a light app -->
    <yds-button variant="primary">New</yds-button>
  </aside>
</body>
```

## Adding a new theme (e.g. a partner brand)

1. Add `tokens/semantic/color-<name>.json` with the same token paths, pointing at different primitives.
2. Register it in `tokens/$metadata.json` and `tokens/$themes.json` (a new entry + Figma mode).
3. Add a build target in `packages/tokens/build.mjs` that emits it under `[data-theme="<name>"]`.

No component changes are ever required — that's the payoff of the three-tier architecture.

## Dark-mode surfaces

Dark mode does **not** simply invert the light cool-gray ramp. It uses a dedicated warm-gray **`ink`** primitive scale (`ink.page`, `ink.panel`, `ink.text-1`, …) plus a brand orange tuned for dark backgrounds (`ink.brand`). This keeps dark surfaces from looking flat/blue. See [`tokens/primitive/color.json`](../../tokens/primitive/color.json).
