#!/usr/bin/env node
/* ============================================================
   Optimistic UI — CLI
   Copies design tokens and chosen components INTO your project,
   so you own the source and can edit it freely.

   Usage:
     npx optimistic-ui add button card      # tokens + those components
     npx optimistic-ui add --all            # tokens + every component
     npx optimistic-ui init                 # just the tokens
     npx optimistic-ui list                 # list available components
     npx optimistic-ui add card --dir src/ui  # choose the target folder
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(readFileSync(join(HERE, "registry.json"), "utf8"));

const C = { dim: "\x1b[2m", warm: "\x1b[38;5;208m", green: "\x1b[32m", bold: "\x1b[1m", reset: "\x1b[0m" };
const log = (m = "") => process.stdout.write(m + "\n");
const paint = (c, m) => `${C[c]}${m}${C.reset}`;

/* ── args ── */
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const dirIx = args.indexOf("--dir");
const targetDir = resolve(process.cwd(), dirIx !== -1 ? args[dirIx + 1] : "optimistic");
const COMMANDS = new Set(["add", "list", "init", "help"]);
const positional = args.filter((a, i) => !a.startsWith("--") && !(dirIx !== -1 && i === dirIx + 1));
const cmd = COMMANDS.has(positional[0]) ? positional[0] : null;
// back-compat: bare component names (no verb) still work
const names = cmd ? positional.slice(1) : positional;

function help() {
  log(paint("bold", "\n  Optimistic UI") + paint("dim", "  ·  own-the-source component kit\n"));
  log("  " + paint("bold", "Usage"));
  log(`    ${paint("warm", "npx optimistic-ui add")} button card      tokens + those components`);
  log(`    ${paint("warm", "npx optimistic-ui add --all")}            tokens + every component`);
  log(`    ${paint("warm", "npx optimistic-ui init")}                 just the tokens`);
  log(`    ${paint("warm", "npx optimistic-ui list")}                 list available components`);
  log("");
  log("  " + paint("bold", "Options"));
  log(`    ${paint("dim", "--dir <path>")}   target folder (default: ./optimistic)`);
  log(`    ${paint("dim", "--all")}          with 'add', install every component`);
  log("");
}

/* ── list ── */
if (cmd === "list" || flag("--list")) {
  log(paint("bold", "\n  Optimistic UI — available components\n"));
  for (const [key, c] of Object.entries(registry.components)) {
    log(`  ${paint("warm", key.padEnd(14))} ${paint("dim", "v" + (c.version || "0.0.0"))}  ${c.title}${c.deps.length ? paint("dim", "  · needs " + c.deps.join(", ")) : ""}`);
  }
  log("");
  process.exit(0);
}

/* ── help / bare invocation ── */
if (cmd === "help" || flag("--help") || (!cmd && names.length === 0 && !flag("--tokens-only"))) {
  help();
  process.exit(0);
}

/* ── which components ── */
const tokensOnly = cmd === "init" || flag("--tokens-only");
const wanted = tokensOnly ? [] : names.length ? names : flag("--all") ? Object.keys(registry.components) : [];

if (!tokensOnly && wanted.length === 0) {
  log(paint("warm", "\n  No components specified.") + paint("dim", "  Try  npx optimistic-ui add button card   (or --all)\n"));
  process.exit(1);
}

const unknown = wanted.filter((n) => !registry.components[n]);
if (unknown.length) {
  log(paint("warm", `\n  Unknown component(s): ${unknown.join(", ")}`));
  log(paint("dim", "  Run  npx optimistic-ui list  to see what's available.\n"));
  process.exit(1);
}

/* ── copy ── */
const copy = (rel) => {
  const src = join(HERE, rel);
  const dest = join(targetDir, rel.startsWith("tokens/") ? basename(rel) : rel);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return dest;
};

log(paint("bold", `\n  Optimistic UI  →  ${paint("warm", targetDir)}\n`));

const wroteTokens = copy(registry.tokens);
log(`  ${paint("green", "✓")} tokens        ${paint("dim", "→ " + wroteTokens.replace(process.cwd() + "/", ""))}`);

const deps = new Set();
for (const name of wanted) {
  const c = registry.components[name];
  c.files.forEach(copy);
  c.deps.forEach((d) => deps.add(d));
  log(`  ${paint("green", "✓")} ${name.padEnd(13)} ${paint("dim", "→ " + join(targetDir, "components", name).replace(process.cwd() + "/", ""))}`);
}

/* ── record installed versions so they can be tracked and updated ── */
if (wanted.length) {
  const lockPath = join(targetDir, "optimistic.lock.json");
  let lock = { components: {} };
  try { lock = JSON.parse(readFileSync(lockPath, "utf8")); lock.components = lock.components || {}; } catch { /* new lockfile */ }
  lock.kit = registry.version;
  lock.updatedAt = new Date().toISOString();
  for (const name of wanted) lock.components[name] = registry.components[name].version || "0.0.0";
  mkdirSync(dirname(lockPath), { recursive: true });
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");
  log(`  ${paint("green", "✓")} lockfile      ${paint("dim", "→ " + lockPath.replace(process.cwd() + "/", ""))}`);
}

/* ── next steps ── */
log(paint("bold", "\n  Next:\n"));
log(`  1. Import the tokens once, globally:`);
log(paint("dim", `       @import "./${basename(targetDir)}/tokens.css";   /* in your global CSS */`));
if (deps.size) {
  log(`  2. Install peer deps:`);
  log(paint("dim", `       npm i ${[...deps].join(" ")}`));
}
log(`  ${deps.size ? 3 : 2}. Use it:`);
log(paint("dim", `       import { Button } from "./${basename(targetDir)}/components/button/button";`));
log(paint("dim", `       <Button variant="warm">Ship it</Button>`));
log(`\n  Every file is yours — edit tokens.css to re-theme, edit the components to reshape.`);
log(paint("dim", `  Switch theme at runtime with  <html data-theme="harbor">.\n`));
