import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import NotificationDemo, { Notification } from "./NotificationDemo";
import NotificationConfigurator from "./NotificationConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Notification — severity system messages with dismissal. Dark design system. Four semantic tones: info #3E63DD, success #1FA35C, warning #FFB020, error #EB4A4F, each with a line icon (currentColor, coloured by tone). Two styles: Filled (subtle tone-tinted background) and Bar accent (panel background + a 3px coloured left border). A card has an icon, an optional title (0.9rem/600), a message (0.84rem), optional resolving actions (primary + ghost), and an optional dismiss ×. It also works as a stacked toast: newest top-right, auto-dismiss after 5s with a thin progress bar, enter/exit animation. Use role=status for info/success (polite) and role=alert for warning/error (assertive). The optimistic angle: emit a success notification when an action reconciles, an error when it rolls back. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-notif o-notif--warning" role="alert">
  <span class="o-notif__icon"><!-- severity icon --></span>
  <div class="o-notif__body">
    <div class="o-notif__title">Verification required</div>
    <div class="o-notif__text">Confirm your email to unlock publishing.</div>
    <div class="o-notif__actions">
      <button class="o-btn o-btn--sm">Verify now</button>
      <button class="o-btn o-btn--sm o-btn--ghost">Later</button>
    </div>
  </div>
  <button class="o-notif__close" aria-label="Dismiss">×</button>
</div>` },
  { label: "CSS", code: `.o-notif { display: flex; gap: 12px; align-items: flex-start;
  padding: 14px 16px; border-radius: 10px; border: 1px solid #24252b; background: #101114; }
.o-notif__title { font: 600 .9rem/1.3 var(--font); color: #f2f3f5; }
.o-notif__text  { font-size: .84rem; line-height: 1.55; color: #9aa0a8; }

/* filled — subtle tone tint */
.o-notif--info    { background: color-mix(in srgb, #3e63dd 11%, #101114); }
.o-notif--success { background: color-mix(in srgb, #1fa35c 11%, #101114); }
.o-notif--warning { background: color-mix(in srgb, #ffb020 11%, #101114); }
.o-notif--error   { background: color-mix(in srgb, #eb4a4f 11%, #101114); }

/* bar accent — panel bg + coloured left border */
.o-notif--bar { background: #0e0f12; border-color: #1e1e1e; border-left-width: 3px; }
.o-notif--bar.o-notif--warning { border-left-color: #ffb020; }` },
  { label: "React", code: `import { Notification, toast } from "@optimistic/ui";

<Notification severity="error" title="Publish failed"
  actions={<><Button size="sm">Retry</Button><Button size="sm" variant="ghost">Log</Button></>}
  onDismiss={close}>
  Two tokens couldn't be resolved.
</Notification>

// as a stacked toast
toast.success("Changes published");
toast.error("Publish failed", { action: { label: "Retry", onClick: retry } });` },
  { label: "Angular", code: `<o-notification severity="error" title="Publish failed" (dismiss)="close()">
  Two tokens couldn't be resolved.
</o-notification>

// service
this.toast.success('Changes published');
this.toast.error('Publish failed', { action: { label: 'Retry', run: retry } });` },
  { label: "Async / API", code: `// Notifications are how an optimistic action reports back. Render the result
// immediately; when the server reconciles, confirm — or roll back honestly.
async function publish() {
  applyOptimistic();                         // UI updates now
  try {
    await api.publish();
    toast.success("Changes published");      // reconciled
  } catch (e) {
    rollback();
    toast.error("Publish failed", {          // honest rollback
      action: { label: "Retry", onClick: publish },
    });
  }
}

// Severity maps to ARIA live-ness: info/success = role="status" (polite),
// warning/error = role="alert" (assertive). Auto-dismiss success; let errors persist.` },
];

export default function NotificationDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><NotificationDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><NotificationConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>severity</td><td>info · success · warning · error</td><td>Tone, icon and ARIA live-ness</td></tr>
          <tr><td className={s.tokName}>style</td><td>filled · bar</td><td>Tinted fill, or panel + coloured left bar</td></tr>
          <tr><td className={s.tokName}>title</td><td>string</td><td>Optional short summary above the message</td></tr>
          <tr><td className={s.tokName}>actions</td><td>ReactNode</td><td>Optional resolving buttons — primary + ghost</td></tr>
          <tr><td className={s.tokName}>onDismiss</td><td>() =&gt; void</td><td>Present ⇒ a close × is shown</td></tr>
          <tr><td className={s.tokName}>duration</td><td>number = 5000</td><td>Auto-dismiss for toasts; 0 keeps it until closed</td></tr>
        </tbody></table>
        <table className={s.tokTable} style={{ marginTop: 18 }}><thead><tr><th>Event / Key</th><th>Result</th></tr></thead><tbody>
          <tr><td className={s.tokName}>role</td><td>status for info/success (polite) · alert for warning/error (assertive)</td></tr>
          <tr><td className={s.tokName}>Esc</td><td>Dismisses the focused notification</td></tr>
          <tr><td className={s.tokName}>onDismiss</td><td>Fires on × click or auto-dismiss timeout</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A notification is how an optimistic action reports back: render the result at once, then <strong>confirm on reconcile</strong> or roll back with an error the reader can act on. Auto-dismiss the good news; let errors persist until acknowledged.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 380 }}>
            <Notification severity="warning" title="Verification required" dismissible
              actions={<><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Verify now</span><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Later</span></>}>
              Confirm your email to unlock publishing.
            </Notification>
            <span className={s.anaMark} style={{ left: "1%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 44 }} /></span>
            <span className={s.anaMark} style={{ left: "24%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 44 }} /></span>
            <span className={s.anaMark} style={{ left: "44%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 66 }} /></span>
            <span className={s.anaMark} style={{ left: "20%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>4</b><i className={s.anaConn} style={{ height: 98 }} /></span>
            <span className={s.anaMark} style={{ left: "97%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>5</b><i className={s.anaConn} style={{ height: 40 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Icon</span><span className={s.anaDesc}>The severity, read at a glance and coloured by tone.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Title</span><span className={s.anaDesc}>Optional one-line summary of what happened.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Message</span><span className={s.anaDesc}>One to three lines of detail and next steps.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Actions</span><span className={s.anaDesc}>Optional primary + ghost that resolve the message.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Close</span><span className={s.anaDesc}>Dismiss control; toasts also auto-dismiss.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 260 }}><Notification severity="error" title="Publish failed" dismissible actions={<span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Retry</span>}>Your draft was kept intact.</Notification></div></div><p className={s.ddText}>Give errors a way out. A retry or a next step beats a dead end.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 260 }}><Notification severity="error">Error 0x8004. Contact support.</Notification></div></div><p className={s.ddText}>Don&apos;t surface raw codes with no action. Say what happened and what to do.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 260 }}><Notification severity="success" title="Changes published">Live and reconciled.</Notification></div></div><p className={s.ddText}>Auto-dismiss the good news. Success should confirm, then get out of the way.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 260 }}><Notification severity="error" bar>Something went wrong.</Notification><Notification severity="warning" bar>Heads up.</Notification><Notification severity="info" bar>FYI.</Notification></div></div><p className={s.ddText}>Don&apos;t stack many at once. Collapse or queue them so one reads at a time.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Toast</div><div className={s.ctxStage}><div style={{ width: "100%", maxWidth: 260, boxShadow: "0 10px 26px rgba(0,0,0,0.42)" }}><Notification severity="success" title="Changes published" dismissible>Live and reconciled.</Notification></div></div><p className={s.ctxCaption}>Corner toast confirming an optimistic action.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Inline banner</div><div className={s.ctxStage}><div style={{ width: "100%", maxWidth: 260 }}><Notification severity="info" bar title="New version available">Reload to get the latest.</Notification></div></div><p className={s.ctxCaption}>Bar-accent banner at the top of a page.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Notification center</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 260 }}><Notification severity="warning" bar title="EMI due in 3 days">Set up auto-debit.</Notification><Notification severity="success" bar title="Loan disbursed">₹25L transferred.</Notification></div></div><p className={s.ctxCaption}>A stacked list in an inbox panel.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--notif-info</td><td><span className={s.tokSwatch} style={{ background: "#3e63dd" }} />#3E63DD</td><td>Info tone (icon #6B8AFF)</td></tr>
          <tr><td className={s.tokName}>--notif-success</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Success tone (icon #4FCE8B)</td></tr>
          <tr><td className={s.tokName}>--notif-warning</td><td><span className={s.tokSwatch} style={{ background: "#ffb020" }} />#FFB020</td><td>Warning tone (icon #FFC457)</td></tr>
          <tr><td className={s.tokName}>--notif-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Error tone (icon #F2777B)</td></tr>
          <tr><td className={s.tokName}>--notif-pad</td><td>14px 16px</td><td>Card padding</td></tr>
          <tr><td className={s.tokName}>--notif-radius</td><td>10px</td><td>Corner radius</td></tr>
          <tr><td className={s.tokName}>--notif-bar</td><td>3px</td><td>Bar-accent left border width</td></tr>
          <tr><td className={s.tokName}>--notif-duration</td><td>5000ms</td><td>Default toast auto-dismiss</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
