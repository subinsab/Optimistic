/**
 * Yubi Design System — token build.
 *
 * Compiles the DTCG token graph in ../../tokens into platform artifacts:
 *   dist/css/tokens.css   :root (light + theme-independent) + [data-theme="dark"] overrides
 *   dist/scss/_tokens.scss SCSS variables
 *   dist/js/tokens.js      ES module
 *   dist/ts/tokens.d.ts    typed token names
 *
 * The semantic color layer is theme-specific:
 *   - semantic/color-light  -> :root
 *   - semantic/color-dark   -> [data-theme="dark"]
 * Everything else (primitives, typography, elevation, layout, components)
 * is theme-independent and emitted once to :root.
 */
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const TOKENS = '../../tokens';

// CSS/SCSS get kebab-case variable names; JS/TS need valid identifiers (camelCase).
const cssTransforms = {
  transformGroup: 'tokens-studio',
  transforms: ['name/kebab'],
};
const jsTransforms = {
  transformGroup: 'tokens-studio',
  transforms: ['name/camel'],
};

/** Token sets that make up the light/base build (everything except the dark color set). */
const baseSources = [
  `${TOKENS}/primitive/*.json`,
  `${TOKENS}/semantic/color-light.json`,
  `${TOKENS}/semantic/typography.json`,
  `${TOKENS}/semantic/elevation.json`,
  `${TOKENS}/semantic/layout.json`,
  `${TOKENS}/component/*.json`,
];

/** Dark build: primitives provide references; only color-dark tokens are emitted. */
const darkSources = [
  `${TOKENS}/primitive/*.json`,
  `${TOKENS}/semantic/color-dark.json`,
];

const base = new StyleDictionary({
  source: baseSources,
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      ...cssTransforms,
      buildPath: 'dist/css/',
      prefix: 'yds',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true, selector: ':root' },
      }],
    },
    scss: {
      ...cssTransforms,
      buildPath: 'dist/scss/',
      prefix: 'yds',
      files: [{ destination: '_tokens.scss', format: 'scss/variables' }],
    },
    js: {
      ...jsTransforms,
      buildPath: 'dist/js/',
      files: [
        { destination: 'tokens.js', format: 'javascript/es6' },
        { destination: '../ts/tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
  },
});

const dark = new StyleDictionary({
  source: darkSources,
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      ...cssTransforms,
      buildPath: 'dist/css/',
      prefix: 'yds',
      files: [{
        destination: 'tokens.dark.css',
        format: 'css/variables',
        // Only emit tokens authored in the dark color set; primitives are references only.
        filter: (token) => token.filePath.includes('color-dark'),
        // Literal values in the dark block — clearer overrides, no cross-set reference warning.
        options: { outputReferences: false, selector: '[data-theme="dark"]' },
      }],
    },
  },
});

await base.buildAllPlatforms();
await dark.buildAllPlatforms();

// Concatenate the dark overrides onto the main CSS file so consumers import one stylesheet.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
const main = readFileSync('dist/css/tokens.css', 'utf8');
const darkCss = readFileSync('dist/css/tokens.dark.css', 'utf8');
writeFileSync('dist/css/tokens.css', `${main}\n${darkCss}`);
rmSync('dist/css/tokens.dark.css');

console.log('✓ Tokens built → dist/{css,scss,js,ts}');
