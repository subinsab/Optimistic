import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import CheckboxDemo from "./CheckboxDemo";
import CheckboxConfigurator from "./CheckboxConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Checkbox. Dark design system: square box sizes 22/18/15px (L/M/S), radius 5/4/3, bg #0E0F12 border #33333A. Checked = warm #FF7A00 fill + white tick; indeterminate = warm fill + white dash; error border #EB4A4F; focus-visible warm ring 3px; disabled opacity .42. role=checkbox, aria-checked true/false/mixed, clickable label row, keyboard Space toggles. Support a parent 'select all' that shows indeterminate when children are mixed. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<label class="o-check-row">
  <button class="o-check o-check--m is-on" role="checkbox" aria-checked="true"></button>
  <span>Remember me</span>
</label>` },
  { label: "CSS", code: `.o-check {
  width: 18px; height: 18px; border-radius: 4px;
  background: #0e0f12; border: 1.5px solid #33333a;
  display: inline-grid; place-items: center; cursor: pointer;
}
.o-check.is-on { background: #ff7a00; border-color: #ff7a00; }
.o-check.is-on::after {
  content: ""; width: 55%; height: 32%;
  border-left: 2px solid #fff; border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
}` },
  { label: "React", code: `import { Checkbox } from "@optimistic/ui";

<Checkbox checked={v} onChange={setV} label="Remember me" />
<Checkbox checked={all} indeterminate={some} onChange={toggleAll}
          label="Select all" />` },
  { label: "Angular", code: `<o-checkbox [(checked)]="v" label="Remember me"></o-checkbox>
<o-checkbox [(checked)]="all" [indeterminate]="some"
            label="Select all"></o-checkbox>` },
  { label: "Async / API", code: `// Optimistic setting toggle backed by a checkbox.
async function onChange(next) {
  setChecked(next);                    // believe it now
  try {
    const r = await fetch("/api/prefs", {
      method: "PATCH",
      body: JSON.stringify({ marketing: next }),
    });
    if (!r.ok) throw new Error();
  } catch {
    setChecked(!next);                 // reconcile: roll back
    toast.error("Could not save.");
  }
}` },
];

export default function CheckboxDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
        </div>
      </Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><CheckboxDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><CheckboxConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>checked</td><td>boolean</td><td>Controlled on/off</td></tr>
          <tr><td className={s.tokName}>indeterminate</td><td>boolean</td><td>Visual only; aria-checked=&quot;mixed&quot;</td></tr>
          <tr><td className={s.tokName}>onChange</td><td>(next) =&gt; void</td><td>Click or Space toggles</td></tr>
          <tr><td className={s.tokName}>size / disabled</td><td>l·m·s / boolean</td><td>22/18/15px; opacity .42 disabled</td></tr>
          <tr><td className={s.tokName}>role=&quot;checkbox&quot;</td><td>a11y</td><td>Label row is the click target</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Independent choices. For one-of-many use Radio; for a single instant setting use Toggle.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.selRow}><span className={`${s.ochk} ${s.chkL} ${s.ochkOn}`} /><span className={s.selTitle}>Remember me</span></span>
            <span className={s.anaMark} style={{ left: "4%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "4%", top: 34 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 16 }} /><b className={s.anaBadge}>2</b></span>
            <span className={s.anaMark} style={{ left: "60%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Box</span><span className={s.anaDesc}>Square container, warm fill when checked.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Check / dash</span><span className={s.anaDesc}>White tick when on, white dash when indeterminate.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Clickable; extends the whole row as one target.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${s.ochkOn}`} /><span className={s.selTitle}>I agree to the terms</span></span></div><p className={s.ddText}>Use for independent yes/no choices the user can combine freely.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "flex", gap: 16 }}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${s.ochkOn}`} /><span className={s.selTitle}>Yes</span></span><span className={s.selRow}><span className={`${s.ochk} ${s.chkM}`} /><span className={s.selTitle}>No</span></span></span></div><p className={s.ddText}>Don&apos;t use two checkboxes for a single either/or. That is a Radio.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${s.ochkInd}`} /><span className={s.selTitle}>Select all</span></span></div><p className={s.ddText}>Show indeterminate on a parent when its children are mixed.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM}`} /><span className={s.selTitle}>Turn on dark mode?</span></span></div><p className={s.ddText}>Don&apos;t phrase a checkbox as an instant action. That is a Toggle.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Consent</div><div className={s.ctxStage}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${s.ochkOn}`} /><span className={s.selText}><span className={s.selTitle}>Email me receipts</span><span className={s.selDesc}>One message per transaction, no more.</span></span></span></div><p className={s.ctxCaption}>A description sits under the label when the choice needs context.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Multi-select list</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{["Design", "Engineering", "Sales"].map((t, i) => <span key={t} className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${i !== 2 ? s.ochkOn : ""}`} /><span className={s.selTitle}>{t}</span></span>)}</div></div><p className={s.ctxCaption}>Stacked, left-aligned, one row each. Filters and facets live here.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Select all</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 8 }}><span className={s.selRow}><span className={`${s.ochk} ${s.chkM} ${s.ochkInd}`} /><span className={s.selTitle}>All rows</span></span><div style={{ paddingLeft: 26, display: "flex", flexDirection: "column", gap: 6 }}><span className={s.selRow}><span className={`${s.ochk} ${s.chkS} ${s.ochkOn}`} /><span className={s.selDesc}>Row 1</span></span><span className={s.selRow}><span className={`${s.ochk} ${s.chkS}`} /><span className={s.selDesc}>Row 2</span></span></div></div></div><p className={s.ctxCaption}>A table header checkbox drives every row and reflects their mix.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--chk-size-l/m/s</td><td>22 / 18 / 15px</td><td>Box dimension</td></tr>
          <tr><td className={s.tokName}>--chk-radius</td><td>5 / 4 / 3px</td><td>Per size</td></tr>
          <tr><td className={s.tokName}>--chk-border</td><td><span className={s.tokSwatch} style={{ background: "#33333a" }} />#33333A</td><td>Unchecked border</td></tr>
          <tr><td className={s.tokName}>--chk-on</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Checked / indeterminate fill</td></tr>
          <tr><td className={s.tokName}>--chk-mark</td><td><span className={s.tokSwatch} style={{ background: "#ffffff" }} />#FFFFFF</td><td>Tick &amp; dash</td></tr>
          <tr><td className={s.tokName}>--chk-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Required-but-empty border</td></tr>
          <tr><td className={s.tokName}>--chk-focus</td><td>rgba(255,122,0,.35)</td><td>3px focus ring</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
