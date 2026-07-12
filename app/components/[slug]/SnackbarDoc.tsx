import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SnackbarDemo from "./SnackbarDemo";
import SnackbarConfigurator from "./SnackbarConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Snackbar (toast). Dark design system: a floating bar (#1A1B1F, #2A2B30 border, radius 10, soft drop shadow) with a leading status icon (success #4FCE8B, error #F2777B, info #8AA2FF, warn #FFC457), one line of message, an optional single warm text action (Undo/View), and a dismiss ×. Auto-dismisses (~4s), pauses on hover, stacks bottom-centre or bottom-right. role=status, non-blocking. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-snack o-snack--success" role="status">
  <span class="o-snack__icon"><CheckIcon /></span>
  <span class="o-snack__text">Changes saved.</span>
  <button class="o-snack__action">Undo</button>
  <button class="o-snack__close" aria-label="Dismiss">×</button>
</div>` },
  { label: "CSS", code: `.o-snack {
  display: flex; align-items: center; gap: 12px; max-width: 420px;
  padding: 12px 12px 12px 14px; border-radius: 10px;
  background: #1a1b1f; border: 1px solid #2a2b30;
  box-shadow: 0 14px 34px rgba(0,0,0,.45);
}
.o-snack--success .o-snack__icon { color: #4fce8b; }
.o-snack__action { color: #ff9d45; font-weight: 500; background: none; border: 0; }` },
  { label: "React", code: `import { toast } from "@optimistic/ui";

toast.success("Changes saved.", { action: { label: "Undo", onClick: undo } });
toast.error("Couldn't save. Try again.");
toast("A new version is available.", { duration: 6000 });

// mount once at the app root
<Toaster position="bottom-center" />` },
  { label: "Angular", code: `constructor(private toast: ToastService) {}

save() {
  this.toast.success("Changes saved.", { action: "Undo", onAction: () => this.undo() });
}` },
  { label: "Async / API", code: `// Optimistic action + snackbar: apply now, offer Undo, reconcile on timeout.
async function archive(id) {
  const prev = items;
  setItems((xs) => xs.filter((x) => x.id !== id));   // apply immediately

  let undone = false;
  toast.success("Message archived.", {
    action: { label: "Undo", onClick: () => { undone = true; setItems(prev); } },
    duration: 5000,
    onAutoClose: async () => {
      if (!undone) await fetch(\`/api/messages/\${id}\`, { method: "DELETE" });
    },
  });
}` },
];

export default function SnackbarDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Check = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const X = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo · Fully Interactive</div><div className={s.secBody}><SnackbarDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SnackbarConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior · The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>success · error · info · warn</td><td>Icon and accent colour</td></tr>
          <tr><td className={s.tokName}>action</td><td>{"{ label, onClick }"}</td><td>One inline warm action, like Undo</td></tr>
          <tr><td className={s.tokName}>duration</td><td>number</td><td>Auto-dismiss ms; pauses on hover / focus</td></tr>
          <tr><td className={s.tokName}>dismissible</td><td>boolean</td><td>Shows the manual close ×</td></tr>
          <tr><td className={s.tokName}>position</td><td>bottom-center · bottom-right</td><td>Where the stack anchors</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A Snackbar confirms briefly and never blocks. For a message that needs a decision use a Modal; for persistent inline emphasis use a Callout.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 360 }}>
            <div className={`${s.osnack} ${s.osnackSuccess}`} style={{ pointerEvents: "none" }}>
              <span className={s.osnackIcon}><Check /></span>
              <span className={s.osnackText}>Changes saved.</span>
              <span className={s.osnackAction}>Undo</span>
              <span className={s.osnackClose}><X /></span>
            </div>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "40%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "80%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Icon</span><span className={s.anaDesc}>Status colour matching the variant.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Message</span><span className={s.anaDesc}>One short line; no headings.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Action / close</span><span className={s.anaDesc}>At most one action, plus a dismiss.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.osnack} ${s.osnackSuccess}`} style={{ pointerEvents: "none", maxWidth: 260 }}><span className={s.osnackIcon}><Check /></span><span className={s.osnackText}>Saved.</span><span className={s.osnackAction}>Undo</span></div></div><p className={s.ddText}>One line, one action. Confirm and let the reader move on.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.osnack} ${s.osnackSuccess}`} style={{ pointerEvents: "none", maxWidth: 260 }}><span className={s.osnackIcon}><Check /></span><span className={s.osnackText} style={{ whiteSpace: "normal" }}>Saved. Your changes to the document have been written to all three replicas and…</span></div></div><p className={s.ddText}>Don&apos;t write a paragraph. Long copy belongs in a Callout or Modal.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.osnack} ${s.osnackError}`} style={{ pointerEvents: "none", maxWidth: 260 }}><span className={s.osnackIcon}><Check /></span><span className={s.osnackText}>Couldn&apos;t save.</span><span className={s.osnackAction}>Retry</span></div></div><p className={s.ddText}>Give errors a way forward. A Retry beats a dead end.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.osnack} ${s.osnackSuccess}`} style={{ pointerEvents: "none", maxWidth: 260 }}><span className={s.osnackText}>Saved.</span><span className={s.osnackAction}>Undo</span><span className={s.osnackAction}>View</span><span className={s.osnackAction}>Share</span></div></div><p className={s.ddText}>Don&apos;t stack multiple actions. A toast holds one, at most.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Save</div><div className={s.ctxStage}><div className={`${s.osnack} ${s.osnackSuccess}`} style={{ pointerEvents: "none" }}><span className={s.osnackIcon}><Check /></span><span className={s.osnackText}>Draft saved</span></div></div><p className={s.ctxCaption}>Quiet confirmation after an autosave or explicit save.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Undo</div><div className={s.ctxStage}><div className={`${s.osnack} ${s.osnackInfo}`} style={{ pointerEvents: "none" }}><span className={s.osnackText}>Item deleted</span><span className={s.osnackAction}>Undo</span></div></div><p className={s.ctxCaption}>Reversible destructive actions with a short Undo window.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Error</div><div className={s.ctxStage}><div className={`${s.osnack} ${s.osnackError}`} style={{ pointerEvents: "none" }}><span className={s.osnackText}>Network error</span><span className={s.osnackAction}>Retry</span></div></div><p className={s.ctxCaption}>Transient failures that the user can immediately retry.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--snack-bg</td><td><span className={s.tokSwatch} style={{ background: "#1a1b1f" }} />#1A1B1F</td><td>Bar surface</td></tr>
          <tr><td className={s.tokName}>--snack-shadow</td><td>0 14px 34px /.45</td><td>Lift off the page</td></tr>
          <tr><td className={s.tokName}>--snack-success</td><td><span className={s.tokSwatch} style={{ background: "#4fce8b" }} />#4FCE8B</td><td>Success icon</td></tr>
          <tr><td className={s.tokName}>--snack-error</td><td><span className={s.tokSwatch} style={{ background: "#f2777b" }} />#F2777B</td><td>Error icon</td></tr>
          <tr><td className={s.tokName}>--snack-action</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Inline action label</td></tr>
          <tr><td className={s.tokName}>--snack-duration</td><td>4000ms</td><td>Default auto-dismiss</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
