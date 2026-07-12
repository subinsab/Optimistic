import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SplitButtonDemo from "./SplitButtonDemo";
import SplitButtonConfigurator from "./SplitButtonConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Split Button. Dark design system: a primary Button fused to a chevron toggle by a 1px divider — main has no right radius, toggle no left. Clicking the main runs the default action; the chevron opens a menu of related actions (#141519 panel, #262A30 border, rows hover #1E1F25, a danger row hovers red). The chevron rotates 180° when open. Menu closes on outside click, Escape and select. Reuses Button variants (primary/brand/ghost) and sizes S/M/L. aria-haspopup=menu, aria-expanded, roving menu focus. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-split">
  <button class="o-btn o-btn--m o-btn--primary o-split__main">Save</button>
  <button class="o-btn o-btn--m o-btn--primary o-split__toggle"
          aria-haspopup="menu" aria-expanded="false" aria-label="More save options">
    <svg class="o-split__chevron">…</svg>
  </button>
  <div class="o-split__menu" role="menu" hidden>
    <button role="menuitem" class="o-split__opt">Save and duplicate</button>
    <button role="menuitem" class="o-split__opt">Save as template</button>
  </div>
</div>` },
  { label: "CSS", code: `.o-split { display: inline-flex; position: relative; }
.o-split__main   { border-radius: 8px 0 0 8px; }
.o-split__toggle {
  width: 34px; padding: 0; border-radius: 0 8px 8px 0;
  border-left: 1px solid rgba(0,0,0,.16);
}
.o-split__chevron { transition: transform .2s; }
.o-split[aria-expanded="true"] .o-split__chevron { transform: rotate(180deg); }
.o-split__menu {
  position: absolute; top: calc(100% + 6px); right: 0; min-width: 200px;
  background: #141519; border: 1px solid #262a30; border-radius: 10px; padding: 6px;
  box-shadow: 0 16px 42px rgba(0,0,0,.5);
}
.o-split__opt:hover { background: #1e1f25; color: #f4f5f6; }` },
  { label: "React", code: `import { SplitButton } from "@optimistic/ui";

<SplitButton
  variant="primary"
  onClick={save}                       // default action = main click
  options={[
    { label: "Save and duplicate", onSelect: saveDup },
    { label: "Save as template",   onSelect: saveTpl },
    { label: "Save and close",     onSelect: saveClose },
  ]}
>
  Save
</SplitButton>` },
  { label: "Angular", code: `<o-split-button variant="primary" (click)="save()">
  Save
  <o-split-option (select)="saveDup()">Save and duplicate</o-split-option>
  <o-split-option (select)="saveTpl()">Save as template</o-split-option>
</o-split-button>` },
  { label: "Async / API", code: `// The main action is the common path; the menu holds the rarer siblings.
// Run the default optimistically, disable the whole control while in flight.
function SaveSplit({ doc }) {
  const [busy, setBusy] = useState(false);

  async function run(kind) {
    setBusy(true);                       // locks main + toggle together
    try {
      await fetch(\`/api/docs/\${doc.id}?op=\${kind}\`, { method: "POST" });
      toast.success("Saved");
    } catch {
      toast.error("Save failed — nothing was lost.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SplitButton disabled={busy} onClick={() => run("save")}
      options={[{ label: "Save and close", onSelect: () => run("close") }]}>
      {busy ? "Saving…" : "Save"}
    </SplitButton>
  );
}` },
];

export default function SplitButtonDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Chevron = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><SplitButtonDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SplitButtonConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>onClick</td><td>() =&gt; void</td><td>The default action, fired by the main button</td></tr>
          <tr><td className={s.tokName}>options</td><td>{"{ label, onSelect, danger? }[]"}</td><td>The alternatives behind the chevron</td></tr>
          <tr><td className={s.tokName}>variant</td><td>primary · brand · ghost</td><td>Shared skin for both halves</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Matches Button; M is the default</td></tr>
          <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Locks main and toggle together</td></tr>
          <tr><td className={s.tokName}>Esc · outside click · select</td><td>—</td><td>Each closes the menu</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Split Button when one action dominates and a few siblings share its verb. If no action leads, use a plain Button beside a Menu instead.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <div className={s.osplit} style={{ pointerEvents: "none" }}>
              <span className={`${s.obtn} ${s.m} ${s.vPrimary} ${s.osplitMain}`}>Save</span>
              <span className={`${s.obtn} ${s.m} ${s.vPrimary} ${s.osplitToggle}`}><Chevron /></span>
            </div>
            <span className={s.anaMark} style={{ left: "20%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "58%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "82%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Main action</span><span className={s.anaDesc}>The default verb; a normal Button, minus its right radius.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Divider</span><span className={s.anaDesc}>1px hairline splitting the two hit areas.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Toggle</span><span className={s.anaDesc}>Chevron opening the menu; rotates 180° when open.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vPrimary} ${s.osplitMain}`}>Save</span><span className={`${s.obtn} ${s.m} ${s.vPrimary} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ddText}>Put the most common action on the main button; hide its variations.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vGhost} ${s.osplitMain}`}>Choose…</span><span className={`${s.obtn} ${s.m} ${s.vGhost} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ddText}>Don&apos;t make the main button a placeholder. If nothing leads, use a Dropdown.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitMain}`}>Publish</span><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ddText}>Keep the siblings in the same family — Publish, schedule, publish as draft.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", gap: 8 }}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitMain}`}>Save</span><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitToggle}`}><Chevron /></span></div><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitMain}`}>Send</span><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitToggle}`}><Chevron /></span></div></div></div><p className={s.ddText}>Don&apos;t line up two warm split buttons. One leading action per view still holds.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Editor toolbar</div><div className={s.ctxStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.sm} ${s.vPrimary} ${s.osplitMain}`}>Save</span><span className={`${s.obtn} ${s.sm} ${s.vPrimary} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ctxCaption}>Save leads; save-and-duplicate and save-as-template wait in the menu.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Publish flow</div><div className={s.ctxStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitMain}`}>Publish</span><span className={`${s.obtn} ${s.m} ${s.vWarm} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ctxCaption}>The one warm action, with schedule and draft folded beside it.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Row action</div><div className={s.ctxStage}><div className={s.osplit} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.sm} ${s.vGhost} ${s.osplitMain}`}>Export</span><span className={`${s.obtn} ${s.sm} ${s.vGhost} ${s.osplitToggle}`}><Chevron /></span></div></div><p className={s.ctxCaption}>A quiet ghost split in a table row: export CSV, JSON or PDF.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--split-toggle-w</td><td>34px</td><td>Chevron half width</td></tr>
          <tr><td className={s.tokName}>--split-divider</td><td>1px rgba(0,0,0,.16)</td><td>Seam between the halves</td></tr>
          <tr><td className={s.tokName}>--split-menu-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Menu panel</td></tr>
          <tr><td className={s.tokName}>--split-menu-border</td><td><span className={s.tokSwatch} style={{ background: "#262a30" }} />#262A30</td><td>Menu hairline</td></tr>
          <tr><td className={s.tokName}>--split-opt-hover</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Row hover fill</td></tr>
          <tr><td className={s.tokName}>--split-chevron</td><td>180° · .2s</td><td>Toggle rotation when open</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
