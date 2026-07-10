import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RadioDemo from "./RadioDemo";
import RadioConfigurator from "./RadioConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Radio (single-select). Dark design system: circle sizes 22/18/15px (L/M/S), bg #0E0F12 border #33333A. Selected = warm #FF7A00 border + a warm dot (50% dia) that springs in via cubic-bezier(.34,1.56,.64,1). Focus-visible warm ring 3px; disabled opacity .42. role=radio inside role=radiogroup, arrow keys move selection, only one selected at a time, clickable label row. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div role="radiogroup" aria-label="Plan">
  <label class="o-radio-row">
    <button class="o-radio o-radio--m is-on" role="radio" aria-checked="true"></button>
    <span>Pro</span>
  </label>
</div>` },
  { label: "CSS", code: `.o-radio {
  width: 18px; height: 18px; border-radius: 50%;
  background: #0e0f12; border: 1.5px solid #33333a;
  display: inline-grid; place-items: center; cursor: pointer;
}
.o-radio.is-on { border-color: #ff7a00; }
.o-radio.is-on::after {
  content: ""; width: 50%; height: 50%; border-radius: 50%;
  background: #ff7a00;
}` },
  { label: "React", code: `import { RadioGroup, Radio } from "@optimistic/ui";

<RadioGroup value={plan} onChange={setPlan} label="Plan">
  <Radio value="starter" label="Starter" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>` },
  { label: "Angular", code: `<o-radio-group [(value)]="plan" label="Plan">
  <o-radio value="starter" label="Starter"></o-radio>
  <o-radio value="pro" label="Pro"></o-radio>
</o-radio-group>` },
  { label: "Async / API", code: `// Radios are exclusive; persist the whole group on change.
async function onChange(next) {
  const prev = plan;
  setPlan(next);                       // optimistic switch
  try {
    const r = await fetch("/api/plan", { method: "PUT",
      body: JSON.stringify({ plan: next }) });
    if (!r.ok) throw new Error();
  } catch {
    setPlan(prev);                     // roll back to prior choice
    toast.error("Could not change plan.");
  }
}` },
];

export default function RadioDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><RadioDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><RadioConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value (group)</td><td>string</td><td>The one selected value</td></tr>
          <tr><td className={s.tokName}>onChange</td><td>(next) =&gt; void</td><td>Fires when a new option is chosen</td></tr>
          <tr><td className={s.tokName}>Arrow keys</td><td>—</td><td>Move selection within the group</td></tr>
          <tr><td className={s.tokName}>size / disabled</td><td>l·m·s / boolean</td><td>22/18/15px</td></tr>
          <tr><td className={s.tokName}>role=&quot;radiogroup&quot;</td><td>a11y</td><td>One tab stop; arrows navigate inside</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Exactly one selected, always. If zero can be valid, or more than one, use Checkbox instead.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.selRow}><span className={`${s.oradio} ${s.rdL} ${s.oradioOn}`} /><span className={s.selTitle}>Pro plan</span></span>
            <span className={s.anaMark} style={{ left: "4%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "4%", top: 34 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 16 }} /><b className={s.anaBadge}>2</b></span>
            <span className={s.anaMark} style={{ left: "48%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Ring</span><span className={s.anaDesc}>Circle; border turns warm when selected.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Dot</span><span className={s.anaDesc}>Warm centre that springs in on selection.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Clickable; the whole row selects the option.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ display: "flex", flexDirection: "column", gap: 8 }}><span className={s.selRow}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /><span className={s.selTitle}>Monthly</span></span><span className={s.selRow}><span className={`${s.oradio} ${s.rdM}`} /><span className={s.selTitle}>Annual</span></span></div></div><p className={s.ddText}>Use for two-to-five mutually exclusive options, all visible at once.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.selRow}><span className={`${s.oradio} ${s.rdM}`} /><span className={s.selTitle}>Enable feature</span></span></div><p className={s.ddText}>Don&apos;t use a lone radio. A single on/off is a Checkbox or a Toggle.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.selRow}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /><span className={s.selText}><span className={s.selTitle}>Standard</span><span className={s.selDesc}>Ships in 3–5 days</span></span></span></div><p className={s.ddText}>Add a description when options differ in ways the label can&apos;t hold.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{["A", "B", "C", "D", "E", "F"].map(x => <span key={x} className={s.selRow}><span className={`${s.oradio} ${s.rdS}`} /><span className={s.selDesc}>Option {x}</span></span>)}</div></div><p className={s.ddText}>Don&apos;t stack a dozen radios. Past ~6 options, reach for a Dropdown.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Plan picker</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{[["Starter", false], ["Pro", true], ["Scale", false]].map(([n, on]) => <span key={n as string} className={s.selRow}><span className={`${s.oradio} ${s.rdM} ${on ? s.oradioOn : ""}`} /><span className={s.selTitle}>{n}</span></span>)}</div></div><p className={s.ctxCaption}>Pricing tiers, one selected, all comparable at a glance.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Settings choice</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><span className={s.selRow}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /><span className={s.selText}><span className={s.selTitle}>Light</span></span></span><span className={s.selRow}><span className={`${s.oradio} ${s.rdM}`} /><span className={s.selTitle}>Dark</span></span><span className={s.selRow}><span className={`${s.oradio} ${s.rdM}`} /><span className={s.selTitle}>System</span></span></div></div><p className={s.ctxCaption}>Appearance and other one-of-N preferences.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Inline row</div><div className={s.ctxStage}><span style={{ display: "flex", gap: 20 }}><span className={s.selRow}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /><span className={s.selTitle}>Yes</span></span><span className={s.selRow}><span className={`${s.oradio} ${s.rdM}`} /><span className={s.selTitle}>No</span></span></span></div><p className={s.ctxCaption}>Two short options can sit inline on one line.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--rd-size-l/m/s</td><td>22 / 18 / 15px</td><td>Ring dimension</td></tr>
          <tr><td className={s.tokName}>--rd-dot</td><td>50%</td><td>Dot as a fraction of the ring</td></tr>
          <tr><td className={s.tokName}>--rd-border</td><td><span className={s.tokSwatch} style={{ background: "#33333a" }} />#33333A</td><td>Unselected ring</td></tr>
          <tr><td className={s.tokName}>--rd-on</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Selected ring &amp; dot</td></tr>
          <tr><td className={s.tokName}>--rd-ease</td><td>cubic-bezier(.34,1.56,.64,1)</td><td>Dot spring, 0.16s</td></tr>
          <tr><td className={s.tokName}>--rd-focus</td><td>rgba(255,122,0,.35)</td><td>3px focus ring</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
