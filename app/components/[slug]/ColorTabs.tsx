"use client";

import { useState } from "react";
import s from "../docs.module.css";
import coreJson from "../../../tokens/primitive/color.json";
import semJson from "../../../tokens/semantic/color.json";

/* Reads the real token files so the Color System page stays in sync with tokens/. */
type Node = { $value?: string } & Record<string, unknown>;
const CORE = (coreJson as unknown as { color: Record<string, Node> }).color;
/* the two-tier semantic (dark-first, Optimistic brand): semantic.colors.{tier1 | role} */
const SEM = (semJson as unknown as { semantic: { colors: Record<string, Node> } }).semantic.colors;

/* resolve a Token Studio ref to a final hex, following chains through semantic AND core */
function resolveRef(ref: string, depth = 0): string {
  if (typeof ref !== "string" || !ref.startsWith("{") || depth > 12) return ref;
  const path = ref.slice(1, -1).split(".");
  let n: unknown;
  if (path[0] === "color") { n = CORE; for (const p of path.slice(1)) n = (n as Record<string, unknown>)?.[p]; }
  else if (path[0] === "semantic" && path[1] === "colors") { n = SEM; for (const p of path.slice(2)) n = (n as Record<string, unknown>)?.[p]; }
  else return ref;
  const v = (n as Node)?.$value;
  return typeof v === "string" && v.startsWith("{") ? resolveRef(v, depth + 1) : (v ?? ref);
}
/* short label for a ref: {semantic.colors.brand.default} -> brand.default ; {color.brand.400} -> brand.400 */
const shortRef = (ref: string) => ref.replace(/[{}]/g, "").replace(/^semantic\.colors\./, "").replace(/^color\./, "");

const lum = (h: string) => {
  if (!h.startsWith("#") || h.length < 7) return 0.5;
  const n = parseInt(h.slice(1, 7), 16);
  const c = [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ink = (hex: string) => (lum(hex) > 0.42 ? "#111" : "#fff");

/* ── ramp helpers ── */
const stepsOf = (ramp: Node): [string, string][] =>
  Object.entries(ramp)
    .filter(([k, v]) => !k.startsWith("$") && (v as Node)?.$value)
    .map(([k, v]) => [k, (v as Node).$value as string] as [string, string])
    .sort((a, b) => Number(a[0]) - Number(b[0]));

function Ramp({ name, ramp }: { name: string; ramp: Node }) {
  const steps = stepsOf(ramp);
  const desc = (ramp.$description as string) || "";
  return (
    <div className={s.fnRamp}>
      <div className={s.fnRampName}><b>{name}</b>{desc && <span>{desc.replace(/^Extended · /, "").slice(0, 26)}</span>}</div>
      <div className={s.fnRampStrip}>
        {steps.map(([k, hex]) => (
          <div key={k} className={`${s.fnRampSw} ${k === "500" ? s.fnRampBase : ""}`} style={{ background: hex, color: ink(hex) }} title={`${name}-${k} ${hex}`}><small>{k}</small></div>
        ))}
      </div>
    </div>
  );
}

const FUNCTIONAL = ["brand", "red", "green", "amber", "blue"];
const NEUTRAL = ["neutral"];
const NON_EXTENDED = new Set([...FUNCTIONAL, ...NEUTRAL, "sky", "black", "white", "ink"]);
const rampKeys = Object.keys(CORE).filter((k) => !k.startsWith("$"));
/* every remaining ramp is part of the extended palette, so new hues appear here automatically */
const EXTENDED = rampKeys.filter((k) => !NON_EXTENDED.has(k) && Array.isArray(stepsOf(CORE[k])) && stepsOf(CORE[k]).length > 1);

/* ── grouped Core rendering (one titled block per colour name, each with its own steps) ── */
/* list the named steps (or a single value) for one core entry, numeric steps sorted low→high */
function entriesOf(node: Node): [string, string][] {
  if (node.$value !== undefined) return [["", node.$value as string]];
  const es = Object.entries(node)
    .filter(([k, v]) => !k.startsWith("$") && (v as Node)?.$value !== undefined)
    .map(([k, v]) => [k, (v as Node).$value as string] as [string, string]);
  if (es.every(([k]) => /^\d+$/.test(k))) es.sort((a, b) => Number(a[0]) - Number(b[0]));
  return es;
}
/* clean a $description for display: drop the em-dash flourish, keep the plain meaning */
const cleanDesc = (d: string) => d.replace(/\s*—\s*/g, ", ").replace(/^Extended,\s*/, "");
/* ink is the dark-surface scale (page/panel/border/text), not a hue palette — semantic still
   references it, but it doesn't belong in the colour ramps, so hide it from the Core display */
const PALETTE_HIDE = new Set(["ink"]);
/* lead with the functional + neutral ramps, then the rest of the palette in file order */
const CORE_ORDER = [...FUNCTIONAL, ...NEUTRAL, "sky", "black", "white"];
const orderedCoreKeys = [
  ...CORE_ORDER.filter((k) => rampKeys.includes(k)),
  ...rampKeys.filter((k) => !CORE_ORDER.includes(k)),
].filter((k) => !PALETTE_HIDE.has(k));

function CoreGroup({ name }: { name: string }) {
  const node = CORE[name];
  const entries = entriesOf(node);
  const desc = cleanDesc((node.$description as string) || "");
  return (
    <div style={{ marginBottom: 30 }}>
      <div className={s.fnRampName} style={{ marginBottom: 10 }}>
        <b style={{ textTransform: "capitalize" }}>{name}</b>
        <span>{desc || `${entries.length} step${entries.length > 1 ? "s" : ""}`}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 8 }}>
        {entries.map(([step, hex]) => (
          <div key={step || name} className={s.fnSwatch} title={`${name}${step ? "-" + step : ""}  ${hex}`}>
            <div className={s.fnSwatchBlock} style={{ background: hex, height: 48 }} />
            <div className={s.fnSwatchMeta}>
              <span className={s.fnSwatchHex}>{hex}</span>
              <span className={s.fnSwatchRole}>{step || name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── semantic flattening ── */
function flatten(node: Node, prefix = ""): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if ((v as Node).$value !== undefined) out.push([key, (v as Node).$value as string]);
    else out.push(...flatten(v as Node, key));
  }
  return out;
}
/* two-tier semantic: intensity ramps (Tier 1) that role tokens (Tier 2) reference by name */
const TIER1 = ["base", "neutral", "brand", "success", "error", "caution", "special"];
const ROLES = ["text", "icon", "background", "border", "action", "elemental"];
const INTENSITY = ["weakest", "weaker", "weak", "subtle", "medium", "default", "solid", "strong", "stronger", "strongest"];

/* one Tier-1 intensity ramp, resolved live, laid out like a Core group */
function SemRamp({ name }: { name: string }) {
  const node = SEM[name] as Record<string, Node>;
  const items = INTENSITY.filter((i) => node[i]);
  const core = shortRef((node[items[0]] as Node).$value as string).split(".")[0];
  return (
    <div style={{ marginBottom: 22 }}>
      <div className={s.fnRampName} style={{ marginBottom: 10 }}>
        <b style={{ textTransform: "capitalize" }}>{name}</b><span>references core {core}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 8 }}>
        {items.map((i) => {
          const ref = (node[i] as Node).$value as string;
          const hex = resolveRef(ref);
          return (
            <div key={i} className={s.fnSwatch} title={`${name}.${i} -> ${shortRef(ref)}  ${hex}`}>
              <div className={s.fnSwatchBlock} style={{ background: hex, height: 44 }} />
              <div className={s.fnSwatchMeta}><span className={s.fnSwatchHex}>{hex}</span><span className={s.fnSwatchRole}>{i}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TABS = ["Core", "Semantic", "Theme"] as const;

export default function ColorTabs() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Core");
  return (
    <div>
      <div className={s.demoTabs} role="tablist" aria-label="Colour tiers" style={{ maxWidth: 340 }}>
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div style={{ paddingTop: 22 }} key={tab}>
        {tab === "Core" && (
          <>
            <p className={s.fnSwatchRole} style={{ marginBottom: 22, maxWidth: 620 }}>Core is the raw material, kept broad on purpose so new hues are already on hand without editing anything downstream. The functional ramps (brand, red, green, amber, blue) and the neutral carbon scale do the real work; black and white are single values; the rest are spare hues. Each ramp runs 50 to 900, read straight from <code style={{ color: "#ffb37a" }}>tokens/primitive/color.json</code>.</p>
            {orderedCoreKeys.map((name) => <CoreGroup key={name} name={name} />)}
          </>
        )}

        {tab === "Semantic" && (
          <>
            <p className={s.fnSwatchRole} style={{ marginBottom: 18, maxWidth: 640 }}>The layer components actually consume, read from <code style={{ color: "#ffb37a" }}>tokens/semantic/color.json</code>, dark-first. It has two tiers. <b style={{ color: "#e7e9ee" }}>Tier 1</b> intensity ramps (weakest to strongest) alias a core ramp. <b style={{ color: "#e7e9ee" }}>Tier 2</b> role tokens reference those ramps by name. Every swatch is resolved live to its final hex.</p>
            <div className={s.secLabel} style={{ marginBottom: 14 }}>Tier 1 · intensity ramps</div>
            {TIER1.map((t) => <SemRamp key={t} name={t} />)}
            <div className={s.secLabel} style={{ margin: "28px 0 14px" }}>Tier 2 · role tokens</div>
            <div className={s.fnSemGrid}>
              {ROLES.map((grp) => (
                <div key={grp} className={s.fnSemCard}>
                  <h5>{grp}</h5>
                  {flatten(SEM[grp]).map(([k, ref]) => {
                    const hex = resolveRef(ref);
                    return <div key={k} className={s.fnSemRow}><span className={s.fnSemChip} style={{ background: hex }} /><span className={s.fnSemName}>{k}</span><span className={s.fnSemRef}>{shortRef(ref)}</span></div>;
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "Theme" && (() => {
          const g = (p: string) => { const h = resolveRef(`{semantic.colors.${p}}`); return h.startsWith("#") ? h : resolveRef(`{semantic.colors.${p.replace(/\.default$/, ".strongest")}}`); };
          return (
            <>
              <p className={s.fnSwatchRole} style={{ marginBottom: 18, maxWidth: 640 }}>A theme is the semantic layer resolved to real colour. <b style={{ color: "#e7e9ee" }}>Optimistic dark</b> is the default theme: the exact tokens on the Semantic tab, applied. Re-skinning means pointing the Tier 1 ramps at other core ramps, with zero component edits.</p>
              <div style={{ background: g("background.common.weakest"), border: `1px solid ${g("border.common.medium")}`, borderRadius: 14, padding: 22, maxWidth: 560 }}>
                <div style={{ color: g("text.body.strongest"), fontWeight: 600, fontSize: 15 }}>Publish changes</div>
                <div style={{ color: g("text.body.default"), fontSize: 13, marginTop: 6, marginBottom: 16 }}>Every colour in this card is a semantic token from the dark theme.</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", fontSize: 13 }}>
                  <span style={{ background: g("action.primary.background.default"), color: g("base.weakest"), padding: "8px 14px", borderRadius: 8, fontWeight: 600 }}>Primary</span>
                  <span style={{ background: g("action.secondary.background.default"), color: g("text.body.strongest"), border: `1px solid ${g("border.brand.default")}`, padding: "8px 14px", borderRadius: 8 }}>Secondary</span>
                  <span style={{ color: g("text.success.solid") }}>● success</span>
                  <span style={{ color: g("text.error.default") }}>● error</span>
                  <span style={{ color: g("text.caution.strong") }}>● caution</span>
                  <span style={{ color: g("text.special.default") }}>● special</span>
                </div>
              </div>
              <div className={s.secLabel} style={{ margin: "28px 0 14px" }}>Theme swatches · resolved Tier 1</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
                {TIER1.map((t) => {
                  const hex = g(`${t}.default`);
                  return <div key={t} className={s.fnSwatch} title={`${t}  ${hex}`}><div className={s.fnSwatchBlock} style={{ background: hex, height: 54 }} /><div className={s.fnSwatchMeta}><span className={s.fnSwatchHex}>{hex}</span><span className={s.fnSwatchRole} style={{ textTransform: "capitalize" }}>{t}</span></div></div>;
                })}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
