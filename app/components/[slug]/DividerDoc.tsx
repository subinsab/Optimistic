import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import DividerDemo from "./DividerDemo";
import DividerConfigurator from "./DividerConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Divider. Dark design system: the hairline — a 1px #1E1E1E rule, horizontal by default. Variants: dashed (#2A2A30), a labelled divider (mono uppercase caption centred, with a rule on each side), and a vertical rule for inline groups. It carries no weight of its own; it just separates. Semantic <hr> where it divides content, decorative role where it's cosmetic. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<hr class="o-divider" />
<hr class="o-divider o-divider--dashed" />

<div class="o-divider-label">Or</div>

<span class="o-divider--vertical"></span>` },
  { label: "CSS", code: `.o-divider { border: 0; height: 1px; background: #1e1e1e; width: 100%; }
.o-divider--dashed { background: none; border-top: 1px dashed #2a2a30; height: 0; }
.o-divider-label {
  display: flex; align-items: center; gap: 14px;
  font: .62rem var(--mono); letter-spacing: .16em; text-transform: uppercase; color: #565a62;
}
.o-divider-label::before, .o-divider-label::after { content: ""; flex: 1; height: 1px; background: #1e1e1e; }
.o-divider--vertical { width: 1px; align-self: stretch; background: #1e1e1e; }` },
  { label: "React", code: `import { Divider } from "@optimistic/ui";

<Divider />
<Divider variant="dashed" />
<Divider label="Or" />
<Divider orientation="vertical" />`,
  },
  { label: "Angular", code: `<o-divider></o-divider>
<o-divider variant="dashed"></o-divider>
<o-divider label="Or"></o-divider>
<o-divider orientation="vertical"></o-divider>` },
  { label: "Async / API", code: `// A divider is presentation only — no state, no data, no events.
// Use a real <hr> when it separates content sections (screen readers
// announce it); use role="separator" for cosmetic rules between controls.

<hr class="o-divider" />                       {/* semantic break */}
<span class="o-divider--vertical" role="separator" aria-orientation="vertical" />

// Don't animate it, don't colour it, don't make it thicker to add weight —
// hierarchy comes from spacing and type, not from heavier lines.` },
];

export default function DividerDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><DividerDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><DividerConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>orientation</td><td>horizontal · vertical</td><td>A row rule, or an inline column rule</td></tr>
          <tr><td className={s.tokName}>variant</td><td>solid · dashed</td><td>Continuous or dashed hairline</td></tr>
          <tr><td className={s.tokName}>label</td><td>string</td><td>Centred caption with a rule each side</td></tr>
          <tr><td className={s.tokName}>element</td><td>hr · role=separator</td><td>Semantic where it divides content</td></tr>
          <tr><td className={s.tokName}>inset</td><td>boolean</td><td>Indent to align with content, not the edge</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A Divider separates; it never emphasises. Reach for spacing first — add a line only when whitespace alone doesn&apos;t read as a break.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={s.odivLabel}>Or</div>
            <span className={s.anaMark} style={{ left: "22%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Rule</span><span className={s.anaDesc}>A single #1E1E1E pixel, full width.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Optional mono caption breaking the rule.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 180, display: "flex", flexDirection: "column", gap: 12 }}><span className={s.olistDesc}>Section one</span><hr className={s.odiv} /><span className={s.olistDesc}>Section two</span></div></div><p className={s.ddText}>Keep it one pixel and quiet. Let spacing do most of the work.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><hr className={s.odiv} style={{ height: 4, background: "#ff7a00", maxWidth: 180 }} /></div><p className={s.ddText}>Don&apos;t thicken or colour it for emphasis. That&apos;s not its job.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.odivLabel} style={{ maxWidth: 180 }}>Or</div></div><p className={s.ddText}>Use a labelled divider to break auth flows and long lists.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 180, display: "flex", flexDirection: "column", gap: 6 }}>{[0,1,2].map(i=><hr key={i} className={s.odiv} />)}</div></div><p className={s.ddText}>Don&apos;t stack rules with no content between. That&apos;s just noise.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Menu groups</div><div className={s.ctxStage}><div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, color: "#9aa0a8", fontSize: "0.82rem" }}><span>Rename</span><span>Duplicate</span><hr className={s.odiv} /><span style={{ color: "#f2777b" }}>Delete</span></div></div><p className={s.ctxCaption}>Separating a destructive action in a menu.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Sign-in</div><div className={s.ctxStage}><div className={s.odivLabel} style={{ width: "100%" }}>Or continue with</div></div><p className={s.ctxCaption}>Between a form and social sign-in options.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Toolbar</div><div className={s.ctxStage}><div style={{ display: "flex", alignItems: "center", gap: 12, color: "#9aa0a8", fontSize: "0.82rem" }}><span>Bold</span><span className={s.odivVert} /><span>Italic</span><span className={s.odivVert} /><span>Link</span></div></div><p className={s.ctxCaption}>Vertical rules grouping toolbar controls.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--divider</td><td><span className={s.tokSwatch} style={{ background: "#1e1e1e" }} />#1E1E1E</td><td>The one hairline colour</td></tr>
          <tr><td className={s.tokName}>--divider-dashed</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Dashed variant</td></tr>
          <tr><td className={s.tokName}>--divider-h</td><td>1px</td><td>Always one pixel</td></tr>
          <tr><td className={s.tokName}>--divider-label</td><td><span className={s.tokSwatch} style={{ background: "#565a62" }} />#565A62</td><td>Caption colour, mono</td></tr>
          <tr><td className={s.tokName}>--divider-gap</td><td>14px</td><td>Space around a label</td></tr>
          <tr><td className={s.tokName}>--divider-vh</td><td>≥ 22px</td><td>Min height of a vertical rule</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
