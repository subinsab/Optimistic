# Roadmap

This release ships the **foundation + pattern**. Everything below scales the *same* token graph and the *same* component contract — no architectural changes required.

## Status

### ✅ Done (this release)
- Token graph: 3 tiers, DTCG format, Light + Dark themes (`tokens/`)
- Build pipeline: Style Dictionary v4 + Tokens Studio transforms → CSS / SCSS / JS / TS
- Web Component core (Lit): **Button, Input, Badge, Card, Modal**
- React wrappers (`@yubi/react`) + Angular wrappers/CVA (`@yubi/angular`)
- Docs: foundations, theming, install, framework usage, per-component docs, component template

### 🚧 Next — foundation hardening
| Item | Notes |
|---|---|
| `chart.*` tokens | Categorical (15) + sequential scales from the master reference |
| Icon system | Package the Untitled UI 20×20 set as `<yds-icon name="…">` + tree-shakeable sprite |
| Focus management util | Shared focus-trap + return-focus + scroll-lock for overlays |
| Custom Elements Manifest | `cem analyze` → powers IDE autocomplete, docs, and the React/Angular type defs |
| Storybook | Stories per component (a11y, controls, theme toggle); docs site source |
| Visual + a11y tests | `web-test-runner` + axe per component; Chromatic snapshots |

## Component build-out (≈58 remaining)

Each follows the [component contract](./ARCHITECTURE.md#component-contract): `*.ts` + `*.styles.ts` + `*.types.ts` + `*.test.ts` in `@yubi/core`, auto-wrapped into `@yubi/react` / `@yubi/angular`, with a `docs/components/<name>.md` from the [template](./docs/components/_template.md). Source specs come from `Yds/downloads/*.md`.

| Phase | Theme | Components |
|---|---|---|
| **P1 — Forms** | highest reuse | Textarea, Checkbox, Radio, Toggle, Select/Dropdown, Combobox, Search, Slider, Pin Input, Choicebox, Date Picker, Time Picker, Upload, Split Button |
| **P2 — Data display** | tables & status | Table, List, Avatar, Tags, Pills, Indicator, Skeleton, Keyboard Input, Logo |
| **P3 — Feedback** | overlays of info | Snackbar/Toast, Notification/Alert, Callout, Loader, Progress, Stepper, Empty State |
| **P4 — Overlays** | float layer | Drawer, Popover, Tooltip, Bottom Sheet, Command Menu, Menu, FAB |
| **P5 — Navigation** | shell | Side Navigation, Top Navigation, Tabs, Breadcrumbs, Pagination, Link |
| **P6 — Layout** | structure | Accordion, Divider, Filter, Grid, Code Block, Icon, Illustration |
| **P7 — Patterns** | composed | Side-menu-with-navbar shell, Form layout, Auth, Dashboard, Add-client flow, Chat interface |

## Per-component definition of done
1. Tokens added under `tokens/component/<name>.json` (semantic refs only).
2. Lit component built to the contract; styled via `--yds-*` only.
3. Keyboard + ARIA + focus verified; axe clean.
4. React + Angular wrappers exported and smoke-tested.
5. `docs/components/<name>.md` authored from the template.
6. Story added; visual snapshot baselined.

## Tooling backlog
- Token CI: validate references resolve, no orphan/raw-hex in semantic+ tiers, contrast checks on text/bg pairs.
- Release: Changesets + semver per package; publish to internal registry.
- Figma: Tokens Studio GitHub sync wired to `tokens/` on `main`.
