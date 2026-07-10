import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";
import primType from "../../../tokens/primitive/typography.json";
import semType from "../../../tokens/semantic/typography.json";

/* read the real token files so the page stays in sync with tokens/ */
type Leaf = { $value?: string };
const TOP = primType as unknown as Record<string, unknown>;
const TS = (semType as { "text-style": Record<string, { $value: Record<string, string>; $description?: string }> })["text-style"];

function resolve(ref: string): string {
  if (typeof ref !== "string" || !ref.startsWith("{")) return ref;
  let n: unknown = TOP;
  for (const p of ref.slice(1, -1).split(".")) n = (n as Record<string, unknown>)?.[p];
  return (n as Leaf)?.$value ?? ref;
}

const WNAME: Record<string, string> = { "300": "Light", "400": "Regular", "500": "Medium", "600": "Semibold", "700": "Bold" };

/* build the CSS for a text-style, applying the Inter Display optical axis to display sizes */
function styleOf(name: string, v: Record<string, string>): React.CSSProperties {
  const mono = /mono/i.test(resolve(v.fontFamily));
  const display = name.startsWith("display");
  return {
    fontFamily: mono ? "var(--font-mono-geist), monospace" : "var(--font-inter), sans-serif",
    fontWeight: Number(resolve(v.fontWeight)),
    fontSize: resolve(v.fontSize),
    lineHeight: resolve(v.lineHeight),
    letterSpacing: resolve(v.letterSpacing),
    fontVariationSettings: display ? '"opsz" 32' : undefined,
    textTransform: v.textCase === "uppercase" ? "uppercase" : undefined,
  };
}

const SAMPLE: Record<string, string> = {
  "display-1": "Optimistic", "display-2": "Ship it first", "display-3": "Assume the best",
  "header-1": "The system at work", "header-2": "How it fits together", "header-3": "Foundations", "header-4": "Components and tokens", "header-5": "One warm pixel",
  "subheading-1": "Render, then reconcile", "subheading-2": "Tokens, not values", "subheading-3": "Optimistic updates", "subheading-4": "Honest feedback",
  "body-1": "Every decision starts life as a Figma Variable, then becomes a token.",
  "body-2": "Tokens compose into components, and components compose into products.",
  "body-3": "Trace any line on screen and it ends in shipped software.",
  "body-4": "Dense tables and captions read comfortably at this size.",
  "body-5": "The smallest supporting text, used sparingly.",
  "body-6": "The floor: legal, footnotes, micro-labels.",
  eyebrow: "How it works", code: "POST /v1/hearts  optimistic -> reconciled  142ms",
};

const GROUPS: { label: string; note: string; color: string; keys: string[] }[] = [
  { label: "Display", note: "Inter Display (opsz 32), light, tight leading. This is the page-title style (.title) at three sizes.", color: "#f4f5f6", keys: ["display-1", "display-2", "display-3"] },
  { label: "Header", note: "Inter, semibold. Section titles, h1 down to h5.", color: "#f2f3f5", keys: ["header-1", "header-2", "header-3", "header-4", "header-5"] },
  { label: "Sub Heading", note: "Inter, medium. A step lighter than a header at the same size.", color: "#e7e9ee", keys: ["subheading-1", "subheading-2", "subheading-3", "subheading-4"] },
  { label: "Body", note: "Inter, regular, relaxed leading (1.6), cool greys. Body 1 (16px) is the recommended reading size.", color: "#cfd3da", keys: ["body-1", "body-2", "body-3", "body-4", "body-5", "body-6"] },
  { label: "Machine voice", note: "Geist Mono, uppercase eyebrows with wide tracking (.eyebrow / .secLabel). Code, statuses, numerals.", color: "#9aa0a8", keys: ["eyebrow", "code"] },
];

const WEIGHTS: [string, number][] = [["Light", 300], ["Regular", 400], ["Medium", 500], ["Semibold", 600], ["Bold", 700]];

export default function TypographyDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Two voices</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}><strong style={{ color: "#e7e9ee" }}>Inter</strong> is the reading voice; at large sizes its optical axis becomes <strong style={{ color: "#e7e9ee" }}>Inter Display</strong>, set light so headlines feel open. <strong style={{ color: "#e7e9ee" }}>Geist Mono</strong> is the machine voice. Leading is tuned to match our components: tight for display, loose for body. Composed from <code style={{ color: "#ffb37a" }}>tokens/primitive/typography.json</code> and named in <code style={{ color: "#ffb37a" }}>tokens/semantic/typography.json</code>.</p>
      </div></section></Reveal>

      {GROUPS.map((g) => (
        <Reveal key={g.label}><section className={s.docSection}><div className={s.secLabel}>{g.label}</div><div className={s.secBody}>
          <p className={s.fnSwatchRole} style={{ maxWidth: 620, marginBottom: 18 }}>{g.note}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{g.keys.map((key) => {
            const st = styleOf(key, TS[key].$value);
            const weight = String(st.fontWeight);
            const sizePx = parseInt(String(st.fontSize), 10);
            const lhPx = Math.round(parseFloat(String(st.lineHeight)) * sizePx);
            const meta = `${key}  ·  ${st.fontSize}  ·  ${WNAME[weight] || weight} ${weight}  ·  lh ${lhPx}px (${st.lineHeight})${st.letterSpacing !== "0em" ? "  ·  " + st.letterSpacing : ""}`;
            return (
              <div key={key} className={s.fnSpecimen}>
                <div style={{ ...st, color: g.color, overflowWrap: "anywhere" }}>{SAMPLE[key]}</div>
                <div className={s.fnSpecMeta}>{meta}</div>
              </div>
            );
          })}</div>
        </div></section></Reveal>
      ))}

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Weights</div><div className={s.secBody}>
        <p className={s.fnSwatchRole} style={{ maxWidth: 620, marginBottom: 16 }}>Five weights: Light for display, Regular for body, Medium for sub-headings, Semibold for headers, Bold for emphasis.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{WEIGHTS.map(([n, w]) => (
          <div key={w} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: w, fontSize: "24px", color: "#f2f3f5", minWidth: 280 }}>Optimistic by default</span>
            <span className={s.fnSpecMeta}>{n} · {w}</span>
          </div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Property</th><th>Value</th><th>Where</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Leading</td><td>display 1.05 · heading 1.25 · body 1.6</td><td>Tuned per role, not one ratio</td></tr>
          <tr><td className={s.tokName}>Display</td><td>Inter Display · light 300 · opsz 32</td><td>Headlines only, one per view</td></tr>
          <tr><td className={s.tokName}>Header vs Sub Heading</td><td>semibold 600 vs medium 500</td><td>Same size, different emphasis</td></tr>
          <tr><td className={s.tokName}>Recommended body</td><td>Body 1 · 16px · regular</td><td>The default reading size</td></tr>
          <tr><td className={s.tokName}>Text greys</td><td>cool #9AA0A8 / #767B87</td><td>Never warm-tinted</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
