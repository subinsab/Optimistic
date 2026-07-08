"use client";

import { useSyncExternalStore } from "react";

/* shared configurator state — the "Build with Claude" chip at the top of
   the page and the Configuration playground read the same store */

export type Cfg = {
  variant: string;
  size: string;
  state: string;
  icon: string;
  type: string;   // Button | Submit | Link
  target: string; // React | Angular | HTML
  label: string;
};

export const DEFAULT_CFG: Cfg = {
  variant: "Primary",
  size: "M",
  state: "Default",
  icon: "None",
  type: "Button",
  target: "React",
  label: "Label",
};

let cfg: Cfg = { ...DEFAULT_CFG };
const subs = new Set<() => void>();

export function setCfg(patch: Partial<Cfg>) {
  cfg = { ...cfg, ...patch };
  subs.forEach((f) => f());
}
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => subs.delete(f);
};
export const useCfg = () =>
  useSyncExternalStore(subscribe, () => cfg, () => DEFAULT_CFG);

/* the full engineering spec, shared by both prompt flavours */
const SPEC =
  "Build the Optimistic Button component. Dark-field design system: heights 44/36/28px (L/M/S), radius 8px (6px at S), Inter 500 labels, 8px icon gap. " +
  "Variants: primary (#F4F4F5 bg, #121212 text), brand (#FF7A00, one per view), gradient (#FFB020 to #FF5E00), ghost (transparent, #333336 border), quiet, success (#30A46C), error (#E5484D), info (#3E63DD). " +
  "States: hover brighten, active scale 0.97, disabled opacity 0.38, loading (13px currentColor spinner, aria-busy, pointer-events none, width stays stable), focus-visible ring 3px rgba(255,122,0,0.35). " +
  "Behavior contract: onClick fires on click and Enter/Space; async handlers auto-enter loading and guard against double submit; type button/submit/reset for forms; href renders an anchor with the button skin; " +
  "GET fetches are cancellable via AbortController; POST mutations render success optimistically, send an Idempotency-Key header, and roll back honestly on error; emit an analytics event on press.";

export function claudeUrl(c?: Cfg) {
  const prompt = !c
    ? `${SPEC} Deliver React + CSS with a small demo page.`
    : `${SPEC} Now generate exactly this configured instance for ${c.target}: variant ${c.variant.toLowerCase()}, size ${c.size}, ` +
      `label "${c.label}", ${c.icon === "Leading" ? "with a leading plus icon, " : ""}state ${c.state.toLowerCase()}, ` +
      `rendered as ${c.type.toLowerCase()}${c.type === "Link" ? " (an anchor with href and target)" : ""}. Deliver ready-to-paste code.`;
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}
