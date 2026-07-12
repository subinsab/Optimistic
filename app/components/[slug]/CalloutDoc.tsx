import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import CalloutDemo, { CoIcon } from "./CalloutDemo";
import CalloutConfigurator from "./CalloutConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Callout (inline alert). Dark design system: bg #0E0F12, border #242428, radius 8, plus a 3px left accent bar by variant — info #3E63DD, success #1FA35C, warning #FFB020, error #EB4A4F — with a matching leading icon. Layout: icon, then a body with a 0.9rem title + 0.84rem grey text, optional action buttons row, optional trailing × dismiss. role=status (or role=alert for errors). Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-callout o-callout--warning" role="status">
  <span class="o-callout__icon"><WarnIcon /></span>
  <div class="o-callout__body">
    <span class="o-callout__title">Approaching your limit</span>
    <span class="o-callout__text">You have used 92% of this month's builds.</span>
  </div>
</div>` },
  { label: "CSS", code: `.o-callout {
  display: flex; gap: 12px; padding: 14px 16px;
  background: #0e0f12; border: 1px solid #242428; border-radius: 8px;
}
.o-callout--info    { border-left: 3px solid #3e63dd; }
.o-callout--success { border-left: 3px solid #1fa35c; }
.o-callout--warning { border-left: 3px solid #ffb020; }
.o-callout--error   { border-left: 3px solid #eb4a4f; }
.o-callout__title { font-size: .9rem; font-weight: 500; color: #f2f3f5; }
.o-callout__text  { font-size: .84rem; line-height: 1.55; color: #9aa0a8; }` },
  { label: "React", code: `import { Callout } from "@optimistic/ui";

<Callout variant="info" title="Heads up">
  Design Tokens are the source of truth.
</Callout>

<Callout variant="error" title="Sync failed"
  action={<Button size="s" variant="ghost">Retry</Button>}
  onDismiss={() => hide()}>
  The last publish could not reach two platforms.
</Callout>` },
  { label: "Angular", code: `<o-callout variant="info" title="Heads up">
  Design Tokens are the source of truth.
</o-callout>

<o-callout variant="error" title="Sync failed"
           (dismiss)="hide()">
  The last publish could not reach two platforms.
</o-callout>` },
  { label: "Async / API", code: `// A callout surfaces the honest reconciliation of an async action.
async function publish() {
  setBanner(null);
  try {
    const r = await fetch("/api/publish", { method: "POST" });
    if (!r.ok) throw new Error();
    setBanner({ variant: "success", title: "Published",
                text: "Live on all nine platforms." });
  } catch {
    setBanner({ variant: "error", title: "Publish failed",
                text: "Two platforms did not respond.", retry: true });
  }
}
// {banner && <Callout {...banner} />}` },
];

export default function CalloutDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><CalloutDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><CalloutConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>info·success·warning·error</td><td>Accent bar, icon and role</td></tr>
          <tr><td className={s.tokName}>title / children</td><td>string / node</td><td>Heading and body copy</td></tr>
          <tr><td className={s.tokName}>action</td><td>ReactNode</td><td>Buttons row under the text</td></tr>
          <tr><td className={s.tokName}>onDismiss</td><td>() =&gt; void</td><td>Renders the × and fires on close</td></tr>
          <tr><td className={s.tokName}>role</td><td>status · alert</td><td>alert for errors so AT announces it</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A Callout is inline and persistent. For a transient confirmation that floats and auto-dismisses, use Snackbar; for a one-word status, use Badge.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={`${s.ocallout} ${s.coWarn}`} role="status">
              <span className={s.coIcon}><CoIcon kind="coWarn" /></span>
              <div className={s.coBody}><span className={s.coTitle}>Almost full</span><span className={s.coText}>92% of builds used.</span></div>
            </div>
            <span className={s.vAnaMarkTop} style={{ left: "0%", top: -30 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.vAnaConnV} style={{ height: 20 }} /></span>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 40 }} /></span>
            <span className={s.anaMark} style={{ left: "55%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Accent bar</span><span className={s.anaDesc}>3px left edge; the variant colour, doubled by the icon.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Icon</span><span className={s.anaDesc}>One glyph per variant, aligned to the title.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Title, text, then optional actions. Optional trailing ×.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.ocallout} ${s.coSuccess}`} style={{ maxWidth: 300 }}><span className={s.coIcon}><CoIcon kind="coSuccess" /></span><div className={s.coBody}><span className={s.coTitle}>Saved</span><span className={s.coText}>In sync everywhere.</span></div></div></div><p className={s.ddText}>Match the variant to the meaning: green for good, red for broken.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.ocallout} ${s.coError}`} style={{ maxWidth: 300 }}><span className={s.coIcon}><CoIcon kind="coError" /></span><div className={s.coBody}><span className={s.coTitle}>Welcome!</span></div></div></div><p className={s.ddText}>Don&apos;t use error red for a neutral message. Colour is a promise.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.ocallout} ${s.coError}`} style={{ maxWidth: 300 }}><span className={s.coIcon}><CoIcon kind="coError" /></span><div className={s.coBody}><span className={s.coTitle}>Sync failed</span><span className={s.coActions}><button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Retry</button></span></div></div></div><p className={s.ddText}>Give errors a way out. Pair the message with the fix.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{["coInfo", "coWarn", "coError"].map(k => <div key={k} className={`${s.ocallout} ${s[k as keyof typeof s]}`} style={{ maxWidth: 260, padding: "8px 12px" }}><span className={s.coIcon}><CoIcon kind={k} /></span><div className={s.coBody}><span className={s.coText}>Notice {k}</span></div></div>)}</div></div><p className={s.ddText}>Don&apos;t stack callouts. Three at once is noise; consolidate or queue.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Top of a form</div><div className={s.ctxStage}><div style={{ width: "100%" }}><div className={`${s.ocallout} ${s.coError}`} style={{ marginBottom: 10 }}><span className={s.coIcon}><CoIcon kind="coError" /></span><div className={s.coBody}><span className={s.coText}>Fix the two fields below to continue.</span></div></div><span className={s.inLabel}>Email</span></div></div><p className={s.ctxCaption}>A summary error above the fields it refers to.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Empty state</div><div className={s.ctxStage}><div className={`${s.ocallout} ${s.coInfo}`} style={{ maxWidth: "none" }}><span className={s.coIcon}><CoIcon kind="coInfo" /></span><div className={s.coBody}><span className={s.coTitle}>No clients yet</span><span className={s.coText}>Add your first client to get started.</span></div></div></div><p className={s.ctxCaption}>Guidance in a calm info callout, not an error.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Settings notice</div><div className={s.ctxStage}><div className={`${s.ocallout} ${s.coWarn}`} style={{ maxWidth: "none" }}><span className={s.coIcon}><CoIcon kind="coWarn" /></span><div className={s.coBody}><span className={s.coText}>Changing this affects every project.</span></div></div></div><p className={s.ctxCaption}>A warning inline with the control it qualifies.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--co-pad</td><td>14px 16px</td><td>Callout padding</td></tr>
          <tr><td className={s.tokName}>--co-bar</td><td>3px left</td><td>Accent edge</td></tr>
          <tr><td className={s.tokName}>--co-info</td><td><span className={s.tokSwatch} style={{ background: "#3e63dd" }} />#3E63DD</td><td>Info bar &amp; icon</td></tr>
          <tr><td className={s.tokName}>--co-success</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Success</td></tr>
          <tr><td className={s.tokName}>--co-warning</td><td><span className={s.tokSwatch} style={{ background: "#ffb020" }} />#FFB020</td><td>Warning</td></tr>
          <tr><td className={s.tokName}>--co-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Error (role=alert)</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
