/**
 * Builds a self-contained static site into ./site for GitHub Pages.
 *  - bundles @yubi/core (Lit components, lit inlined) -> site/yds-core.js
 *  - copies compiled tokens.css -> site/tokens.css
 *  - writes site/index.html (showcase) + .nojekyll
 *
 * Run AFTER `npm run tokens:build`. Paths are relative so the site works
 * under a project subpath (https://<user>.github.io/Optimistic/).
 */
import { build } from 'esbuild';
import { mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = resolve(root, 'site');

rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });

// 1. Bundle the web components into a single browser-ready ESM file.
await build({
  entryPoints: [resolve(root, 'packages/core/src/index.ts')],
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: false,
  outfile: resolve(site, 'yds-core.js'),
  legalComments: 'none',
});

// 2. Tokens stylesheet (built by Style Dictionary).
copyFileSync(resolve(root, 'packages/tokens/dist/css/tokens.css'), resolve(site, 'tokens.css'));

// 3. Pages housekeeping.
writeFileSync(resolve(site, '.nojekyll'), '');

// 4. Showcase page.
writeFileSync(resolve(site, 'index.html'), html());
console.log('✓ Site built → site/ (index.html, yds-core.js, tokens.css)');

function html() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Yubi Design System</title>
<meta name="description" content="Yubi Design System — token-driven, multi-framework UI library (Web Components + React/Angular)." />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Fragment+Mono&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./tokens.css" />
<script type="module" src="./yds-core.js"></script>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: Inter, system-ui, sans-serif;
    background: var(--yds-color-bg-page); color: var(--yds-color-text-primary);
    transition: background .2s, color .2s;
  }
  .wrap { max-width: 980px; margin: 0 auto; padding: 0 24px 96px; }
  header.hero { padding: 72px 24px 48px; border-bottom: 1px solid var(--yds-color-border-default); background: var(--yds-color-bg-panel); }
  .hero-inner { max-width: 980px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap; }
  .badge-pill { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    color: var(--yds-color-text-brand); background: var(--yds-color-action-brand-subtle); padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px; }
  h1 { font-size: 44px; line-height: 1.1; letter-spacing: -.03em; margin: 0 0 12px; }
  .lede { font-size: 18px; line-height: 1.6; color: var(--yds-color-text-secondary); max-width: 560px; margin: 0; }
  section { margin-top: 56px; }
  h2 { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--yds-color-text-muted); margin: 0 0 20px; }
  .row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
  .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); gap: 12px; }
  .sw { border: 1px solid var(--yds-color-border-default); border-radius: 12px; overflow: hidden; background: var(--yds-color-bg-panel); }
  .sw .chip { height: 64px; }
  .sw .meta { padding: 8px 10px; font-size: 11px; }
  .sw .meta b { display: block; font-weight: 700; }
  .sw .meta code { font-family: 'Fragment Mono', monospace; color: var(--yds-color-text-secondary); font-size: 10px; }
  .type-row { display: flex; align-items: baseline; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--yds-color-border-default); }
  .type-row code { font-family: 'Fragment Mono', monospace; font-size: 11px; color: var(--yds-color-text-muted); min-width: 52px; }
  .links a { color: var(--yds-color-text-link); text-decoration: none; font-size: 14px; font-weight: 700; }
  .links a:hover { text-decoration: underline; }
</style>
</head>
<body>
<header class="hero">
  <div class="hero-inner">
    <div>
      <span class="badge-pill">Design System</span>
      <h1>Yubi Design System</h1>
      <p class="lede">Token-driven, multi-framework UI for a B2B lending platform. One set of Web Components, consumed in React and Angular, themed entirely through design tokens.</p>
      <div class="row links" style="margin-top:20px">
        <a href="https://github.com/subinsab/Optimistic">GitHub ↗</a>
        <a href="https://github.com/subinsab/Optimistic/blob/main/ARCHITECTURE.md">Architecture ↗</a>
        <a href="https://github.com/subinsab/Optimistic/blob/main/ROADMAP.md">Roadmap ↗</a>
      </div>
    </div>
    <yds-button variant="secondary" id="theme">Toggle theme</yds-button>
  </div>
</header>

<div class="wrap">
  <section>
    <h2>Buttons</h2>
    <div class="row">
      <yds-button variant="primary">Approve loan</yds-button>
      <yds-button variant="secondary">Save draft</yds-button>
      <yds-button variant="danger">Decline</yds-button>
      <yds-button variant="ghost">Cancel</yds-button>
      <yds-button variant="link">View details</yds-button>
      <yds-button variant="primary" loading>Submitting</yds-button>
      <yds-button variant="primary" disabled>Unavailable</yds-button>
    </div>
  </section>

  <section>
    <h2>Badges</h2>
    <div class="row">
      <yds-badge>Draft</yds-badge>
      <yds-badge variant="success" dot>Approved</yds-badge>
      <yds-badge variant="warning" dot>Pending</yds-badge>
      <yds-badge variant="error">Rejected</yds-badge>
      <yds-badge variant="info">New</yds-badge>
    </div>
  </section>

  <section>
    <h2>Inputs</h2>
    <div class="grid">
      <yds-input label="Email" type="email" placeholder="you@company.com" required></yds-input>
      <yds-input label="Amount" value="50,00,000" helper="Max ₹1,00,00,000"></yds-input>
      <yds-input label="PAN" value="ABCDE" error="Invalid PAN format"></yds-input>
    </div>
  </section>

  <section>
    <h2>Cards</h2>
    <div class="grid">
      <yds-card>
        <span slot="eyebrow">Application</span>
        <h3 slot="title">Acme Pvt Ltd</h3>
        Loan #YM-20413 · ₹50,00,000 · 18 months
        <div slot="actions">
          <yds-button variant="primary" size="sm" id="open">Review</yds-button>
          <yds-button variant="ghost" size="sm">Snooze</yds-button>
        </div>
      </yds-card>
      <yds-card interactive>
        <span slot="eyebrow">Portfolio</span>
        <h3 slot="title">Disbursed this month</h3>
        ₹4.2 Cr across 38 applications.
      </yds-card>
    </div>
  </section>

  <section>
    <h2>Semantic color tokens</h2>
    <div class="swatches" id="swatches"></div>
  </section>

  <section>
    <h2>Type scale</h2>
    <div class="type-row"><code>D3</code><span style="font-size:40px;font-weight:700;letter-spacing:-.02em">Display</span></div>
    <div class="type-row"><code>H1</code><span style="font-size:32px;font-weight:700;letter-spacing:-.02em">Heading 1</span></div>
    <div class="type-row"><code>H3</code><span style="font-size:24px;font-weight:700">Heading 3</span></div>
    <div class="type-row"><code>B2</code><span style="font-size:16px">Body 2 — the quick brown fox jumps over the lazy dog.</span></div>
    <div class="type-row"><code>S1</code><span style="font-size:13px;font-weight:700">Label / button text</span></div>
  </section>
</div>

<yds-modal heading="Confirm approval" size="md">
  Approve ₹50,00,000 for Acme Pvt Ltd? This action notifies the applicant.
  <div slot="footer">
    <yds-button variant="secondary" id="cancel">Cancel</yds-button>
    <yds-button variant="primary" id="confirm">Confirm</yds-button>
  </div>
</yds-modal>

<script type="module">
  const root = document.documentElement;
  document.getElementById('theme').addEventListener('yds-click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });
  const modal = document.querySelector('yds-modal');
  document.getElementById('open').addEventListener('yds-click', () => modal.open = true);
  document.getElementById('cancel').addEventListener('yds-click', () => modal.open = false);
  document.getElementById('confirm').addEventListener('yds-click', () => modal.open = false);
  modal.addEventListener('yds-close', () => modal.open = false);

  const tokens = [
    ['Brand', '--yds-color-action-brand-default'],
    ['Brand hover', '--yds-color-action-brand-hover'],
    ['Special', '--yds-color-action-special-default'],
    ['Success', '--yds-color-text-success'],
    ['Warning', '--yds-color-feedback-warning-icon'],
    ['Error', '--yds-color-action-danger-default'],
    ['Text primary', '--yds-color-text-primary'],
    ['Text secondary', '--yds-color-text-secondary'],
    ['Border', '--yds-color-border-default'],
    ['Panel', '--yds-color-bg-panel'],
    ['Inset', '--yds-color-bg-inset'],
    ['Focus', '--yds-color-border-focus'],
  ];
  document.getElementById('swatches').innerHTML = tokens.map(([name, v]) =>
    \`<div class="sw"><div class="chip" style="background:var(\${v})"></div><div class="meta"><b>\${name}</b><code>\${v.replace('--yds-','')}</code></div></div>\`
  ).join('');
</script>
</body>
</html>`;
}
