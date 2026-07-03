# Installation

## From the monorepo (development)

```bash
npm install          # installs all workspaces
npm run build        # tokens → core → react
```

Build a single workspace:
```bash
npm run tokens:build                       # @yubi/tokens
npm run build --workspace=@yubi/core       # web components
npm run build --workspace=@yubi/react      # react wrappers
npm run build --workspace=@yubi/angular    # angular wrappers
```

## In a consuming app

Every app needs **two** things: the **token stylesheet** (once, globally) and the **components** (core, or a framework wrapper).

### 1. Tokens (always)
```ts
import '@yubi/tokens/css';   // injects --yds-* custom properties + dark overrides
```
Or in HTML:
```html
<link rel="stylesheet" href="node_modules/@yubi/tokens/dist/css/tokens.css" />
```

### 2a. Plain HTML / vanilla
```html
<script type="module" src="node_modules/@yubi/core/dist/index.js"></script>
<yds-button variant="primary">Approve</yds-button>
```

### 2b. React → see [react-and-angular.md](./react-and-angular.md)
### 2c. Angular → see [react-and-angular.md](./react-and-angular.md)

## Fonts

Self-host **Inter** (variable) and **Fragment Mono**, or load from a CDN, and ensure the families match the `--yds-font-family-*` tokens. Example:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Fragment+Mono&display=swap" rel="stylesheet" />
```
