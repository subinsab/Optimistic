import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ColorTabs from "./ColorTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

/* ── Element: categorical colours for charts & graphics (dark-tuned, distinguishable) ── */
const ELEMENT: [string, string][] = [
  ["element-1 · Ember", "#FF7A00"], ["element-2 · Cobalt", "#5B8CFF"], ["element-3 · Emerald", "#3FC98A"],
  ["element-4 · Amber", "#FFC457"], ["element-5 · Violet", "#A78BFA"], ["element-6 · Teal", "#34D3C0"],
  ["element-7 · Rose", "#F2777B"], ["element-8 · Pink", "#EF8FD0"], ["element-9 · Lime", "#A9D96B"],
  ["element-10 · Slate", "#9AA0A8"],
];
const BARS = [72, 48, 96, 60, 84, 40, 66]; // demo heights (%)
const SEQ = ["#131D42", "#1B2C66", "#273F92", "#3251BC", "#3E63DD", "#4E72EA", "#6B8AFF", "#9DB0F3"]; // cobalt sequential

/* ── Shadow: elevation tint (near-black on dark; warm for focus) ── */
const SHADOW: [string, string, string][] = [
  ["shadow-1", "0 1px 2px rgba(0,0,0,.35)", "0 1px 2px rgba(0,0,0,.35)"],
  ["shadow-2", "0 8px 24px rgba(0,0,0,.42)", "0 8px 24px rgba(0,0,0,.42)"],
  ["shadow-3", "0 16px 40px rgba(0,0,0,.5)", "0 16px 40px rgba(0,0,0,.5)"],
  ["shadow-focus", "0 0 0 3px rgba(255,122,0,.14)", "0 0 0 3px rgba(255,122,0,.28)"],
];

export default function ColorsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Three tiers</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>Colour is layered so it can move without breaking. <strong style={{ color: "#e7e9ee" }}>Core</strong> is the raw material: every hue as a 50-to-900 scale, plus a single black and white. Nothing uses it directly. <strong style={{ color: "#e7e9ee" }}>Semantic</strong> is what components consume, in two tiers: intensity ramps (weakest to strongest) that alias a core ramp, then role tokens (<code style={{ color: "#ffb37a" }}>background</code>, <code style={{ color: "#ffb37a" }}>text</code>, <code style={{ color: "#ffb37a" }}>action</code>) that reference those ramps by name. A <strong style={{ color: "#e7e9ee" }}>theme</strong> is that semantic layer resolved to real colour. Optimistic stays dark-first and monochrome: neutral carbon carries almost every screen, and the one warm accent (ember #FF7A00) lives in the brand ramp, so a re-skin never loses it.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>How a token resolves</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660, marginBottom: 20 }}>A component never names a hex. It asks for a role, the role points at an intensity ramp, and the ramp points at one core step. Follow the chain for a primary button on the dark theme.</p>
        <svg viewBox="0 0 940 200" role="img" aria-label="Reference chain from core to component" style={{ width: "100%", height: "auto", maxWidth: 940 }}>
          {[["8", "Core", "color.brand.400"], ["246", "Semantic · Tier 1", "brand.default"], ["484", "Semantic · Tier 2", "action.primary"], ["722", "Component", ""]].map(([x, eyebrow, val], i) => (
            <g key={i}>
              <rect x={Number(x)} y={44} width={200} height={104} rx={12} fill="#141519" stroke="#262a30" />
              <text x={Number(x) + 18} y={72} fill="#6b7078" fontSize={10} letterSpacing={1.4} style={{ textTransform: "uppercase" }}>{eyebrow}</text>
              {val && <text x={Number(x) + 18} y={100} fill="#ffb37a" fontSize={14} fontFamily="ui-monospace, monospace">{val}</text>}
            </g>
          ))}
          {/* Core chip + hex */}
          <rect x={26} y={112} width={20} height={20} rx={4} fill="#FF8A24" />
          <text x={54} y={127} fill="#9aa0a8" fontSize={12} fontFamily="ui-monospace, monospace">#FF8A24</text>
          {/* Tier-1 note */}
          <text x={264} y={124} fill="#767b87" fontSize={11}>aliases core brand</text>
          {/* Tier-2 second line */}
          <text x={502} y={122} fill="#ffb37a" fontSize={13} fontFamily="ui-monospace, monospace">.background.default</text>
          {/* Component button */}
          <rect x={740} y={92} width={104} height={34} rx={8} fill="#FF8A24" />
          <text x={792} y={114} fill="#1A0E04" fontSize={13} fontWeight={700} textAnchor="middle">Publish</text>
          {/* arrows + "used by" */}
          {[[227], [465], [703]].map(([cx], i) => (
            <g key={i} stroke="#3a3a42" fill="#3a3a42">
              <line x1={cx - 15} y1={96} x2={cx + 9} y2={96} strokeWidth={1.5} />
              <polygon points={`${cx + 9},92 ${cx + 17},96 ${cx + 9},100`} stroke="none" />
              <text x={cx + 1} y={84} fill="#6b7078" fontSize={9.5} textAnchor="middle" stroke="none" letterSpacing={0.6}>used by</text>
            </g>
          ))}
        </svg>
        <p className={s.fnSwatchRole} style={{ maxWidth: 660, marginTop: 16 }}>The value <code style={{ color: "#ffb37a" }}>#FF8A24</code> passes through every layer unchanged. Re-point <code style={{ color: "#ffb37a" }}>brand</code> at another core ramp and every button, tint and border that reads <code style={{ color: "#ffb37a" }}>action.primary</code> re-skins at once, with no component edits.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The three tiers</div><div className={s.secBody}>
        <ColorTabs />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Element for data &amp; graphics</div><div className={s.secBody}>
        <p className={s.fnSwatchRole} style={{ marginBottom: 16, maxWidth: 620 }}>Charts and illustrations are the one place more colour earns its keep, since series must be told apart. A categorical set of ten, dark-tuned and ordered so <code style={{ color: "#ffb37a" }}>element-1</code> is the warm brand. Use them in order; stop at the count you need.</p>
        <div className={s.fnChart} aria-hidden="true">
          {BARS.map((h, i) => <span key={i} className={s.fnChartBar} style={{ height: `${h}%`, background: ELEMENT[i][1] }} />)}
        </div>
        <div className={s.fnElemLegend}>
          {ELEMENT.map(([name, hex]) => (
            <span key={name} className={s.fnElemKey}><i style={{ background: hex }} />{name.split(" · ")[1]} <b>{hex}</b></span>
          ))}
        </div>
        <p className={s.fnSwatchRole} style={{ margin: "22px 0 10px", maxWidth: 620 }}>For heatmaps and gradients, don&apos;t mix hues. Run a single core ramp as a <strong style={{ color: "#e7e9ee" }}>sequential</strong> scale (here, Cobalt 900 → 200).</p>
        <div className={s.fnSeq} aria-hidden="true">{SEQ.map((c) => <span key={c} style={{ background: c }} />)}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Shadow for depth</div><div className={s.secBody}>
        <p className={s.fnSwatchRole} style={{ marginBottom: 16, maxWidth: 620 }}>On a dark field, depth is mostly a hairline job, so shadows are used sparingly. When they are, the tint is near-black; focus rings are the one warm exception.</p>
        <div className={s.fnShadowRow}>
          {SHADOW.map(([name, css, label]) => (
            <div key={name} className={s.fnShadowCard}>
              <div className={s.fnShadowBox} style={{ boxShadow: css }} />
              <div><div className={s.fnShadowName}>{name}</div><div className={s.fnShadowVal}>{label}</div></div>
            </div>
          ))}
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The one warm rule</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>Even with a full token system, restraint is the point. Neutral carbon fills almost every screen; the feedback ramps (red, green, amber, blue) show up only as <strong style={{ color: "#e7e9ee" }}>state</strong>: an icon tint, a subtle <code style={{ color: "#ffb37a" }}>*-surface</code> wash, a <code style={{ color: "#ffb37a" }}>*-solid</code> fill. The brand accent spends its warmth once per view. #FF7A00 never shifts, and its label stays near-black <code style={{ color: "#ffb37a" }}>#1A0E04</code> (7.25:1 contrast), never white (2.61:1, which fails).</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Contrast guarantees</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Pairing</th><th>Ratio</th><th>Rule</th></tr></thead><tbody>
          <tr><td className={s.tokName}>text-secondary on surface</td><td>7.0:1</td><td>Passes AA for all text</td></tr>
          <tr><td className={s.tokName}>text-muted on surface</td><td>4.6:1</td><td>AA for meta / secondary</td></tr>
          <tr><td className={s.tokName}>on-accent on accent</td><td>7.25:1</td><td>Dark label on warm fills</td></tr>
          <tr><td className={s.tokName}>white on accent</td><td>2.61:1</td><td>Never; use on-accent</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
