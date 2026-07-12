import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ModalDemo from "./ModalDemo";
import ModalConfigurator from "./ModalConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Modal (dialog) component. Dark-field design system. A centred card above a dimmed scrim rgba(4,4,6,.62), card bg #101114 border #23242A radius 14, shadow 0 24px 70px. Sizes S/M/L = max-width 340/420/520. Structure: header (title 1.02rem 600 #f4f5f6 + optional subtitle #767b87 + close × button) / body / hairline divider #1e1f24 / footer (right-aligned actions, ghost escape + filled confirm). Enter animation transform translateY(10px) scale(.98)+opacity 0 → none over 0.24s cubic-bezier(.22,1,.36,1). MUST: role=dialog aria-modal, Escape closes, scrim click closes, focus trapped inside and returned to trigger on close, body scroll locked. Danger tone = error red #eb4a4f title. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<div class="o-modal-scrim is-open">
  <div class="o-modal o-modal--m" role="dialog" aria-modal="true">
    <div class="o-modal__head">
      <div>
        <h2 class="o-modal__title">Rename workspace</h2>
        <p class="o-modal__sub">Visible to your whole team.</p>
      </div>
      <button class="o-modal__close" aria-label="Close">✕</button>
    </div>
    <div class="o-modal__body">Body content.</div>
    <div class="o-modal__divider"></div>
    <div class="o-modal__foot">
      <button class="o-btn o-btn--ghost">Cancel</button>
      <button class="o-btn o-btn--primary">Save</button>
    </div>
  </div>
</div>` },
  { label: "CSS", code: `.o-modal-scrim {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 20px;
  background: rgba(4,4,6,.62);
  opacity: 0; pointer-events: none; transition: opacity .24s;
}
.o-modal-scrim.is-open { opacity: 1; pointer-events: auto; }

.o-modal {
  width: 100%; max-width: 420px;
  background: #101114; border: 1px solid #23242a; border-radius: 14px;
  box-shadow: 0 24px 70px rgba(0,0,0,.6);
  transform: translateY(10px) scale(.98); opacity: 0;
  transition: transform .24s cubic-bezier(.22,1,.36,1), opacity .24s;
}
.o-modal-scrim.is-open .o-modal { transform: none; opacity: 1; }
.o-modal--s { max-width: 340px; }
.o-modal--l { max-width: 520px; }` },
  { label: "React", code: `import { Modal } from "@optimistic/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Rename</Button>

<Modal open={open} onClose={() => setOpen(false)} size="m" title="Rename workspace">
  <p>Pick something short and recognisable.</p>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={save}>Save</Button>
  </Modal.Footer>
</Modal>` },
  { label: "Angular", code: `<o-modal [(open)]="open" size="m" title="Rename workspace">
  <p>Pick something short and recognisable.</p>
  <div o-modal-footer>
    <o-button variant="ghost" (pressed)="open = false">Cancel</o-button>
    <o-button variant="primary" (pressed)="save()">Save</o-button>
  </div>
</o-modal>` },
  { label: "Async / API", code: `// A confirm modal that owns its own async: the primary action
// enters loading, and the modal only closes once the work lands.
function DeleteDialog({ id, open, onClose }) {
  const [busy, setBusy] = useState(false);

  async function confirm() {
    setBusy(true);
    try {
      const res = await fetch(\`/api/projects/\${id}\`, {
        method: "DELETE",
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error(res.status);
      onClose("deleted");            // success → close and report
    } catch {
      toast.error("Could not delete. Nothing was removed.");
      setBusy(false);                // stay open, honest about failure
    }
  }

  return (
    <Modal open={open} onClose={onClose} tone="danger" title="Delete this project?">
      <p>This removes 42 components and cannot be undone.</p>
      <Modal.Footer>
        <Button variant="ghost" onClick={onClose} disabled={busy}>Keep it</Button>
        <Button variant="error" onClick={confirm} loading={busy}>Delete forever</Button>
      </Modal.Footer>
    </Modal>
  );
}` },
];

export default function ModalDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer">
            <i>✳</i> Start building with Claude ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}><ModalDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><ModalConfigurator /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <div className={s.subLabel}>Props</div>
            <table className={s.tokTable}>
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>open</td><td>boolean</td><td>false</td><td>Controlled visibility</td></tr>
                <tr><td className={s.tokName}>onClose</td><td>(reason) =&gt; void</td><td>—</td><td>Fires on Escape, scrim click, or close button</td></tr>
                <tr><td className={s.tokName}>size</td><td>s · m · l</td><td>m</td><td>Max-width 340 / 420 / 520px</td></tr>
                <tr><td className={s.tokName}>tone</td><td>neutral · danger</td><td>neutral</td><td>Danger reddens the title</td></tr>
                <tr><td className={s.tokName}>title</td><td>string</td><td>—</td><td>Labels the dialog for assistive tech</td></tr>
                <tr><td className={s.tokName}>dismissable</td><td>boolean</td><td>true</td><td>When false, only an explicit action closes it</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Escape</td><td>Closes, unless dismissable is false</td></tr>
                <tr><td className={s.tokName}>Scrim click</td><td>Closes; clicks inside the card do not</td></tr>
                <tr><td className={s.tokName}>Tab / Shift+Tab</td><td>Focus is trapped within the dialog</td></tr>
                <tr><td className={s.tokName}>On open / close</td><td>Body scroll locks; focus moves in, then back to the trigger</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              A modal interrupts on purpose — reserve it for a single decision that has to happen now. Everything
              reversible or ambient belongs in a <b style={{ color: "#e7e9ee", fontWeight: 500 }}>drawer</b>, a
              <b style={{ color: "#e7e9ee", fontWeight: 500 }}> popover</b>, or the page itself.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.ovAnaWrap} style={{ padding: "16px 16px 16px 78px" }}>
                  {/* faux scrim boundary so badge 1 has a target */}
                  <div style={{ position: "absolute", inset: "0 0 0 62px", border: "1px dashed #23242a", borderRadius: 14, background: "rgba(4,4,6,.35)" }} />
                  <div className={`${s.omodal} ${s.omodalOpen} ${s.omSm}`} style={{ position: "relative", boxShadow: "0 18px 44px rgba(0,0,0,.5)", overflow: "visible", maxHeight: "none" }}>
                    {/* 1 scrim → points to the dashed backdrop edge */}
                    <span className={s.ovAnaMark} style={{ left: -74, top: -8 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 36 }} /></span>
                    {/* 2 container → top-left corner of the card */}
                    <span className={s.ovAnaMark} style={{ left: -74, top: 16 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 52 }} /></span>
                    {/* 3 header 4 body 5 footer → card left edge at each band */}
                    <span className={s.ovAnaMark} style={{ left: -74, top: 44 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 52 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -74, top: 104 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 52 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -74, bottom: 12, top: "auto" }}><b className={s.anaBadge}>5</b><i className={s.ovAnaLine} style={{ width: 52 }} /></span>
                    <div className={s.ovHead}>
                      <div>
                        <div className={s.ovTitle}>Rename workspace</div>
                        <div className={s.ovSub}>Visible to your team.</div>
                      </div>
                      <span className={s.ovClose} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                      </span>
                    </div>
                    <div className={s.ovBody}>Body content sits here.</div>
                    <div className={s.ovDivider} />
                    <div className={s.ovFoot}>
                      <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>
                      <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Scrim</span><span className={s.anaDesc}>Dims the page and catches the dismiss click. The context is still visible behind it.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Centred card, radius 14, one elevation shadow. Width fixed per size.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>Title, optional subtitle, and a close button that always offers a way out.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>The content. Scrolls on its own if it outgrows the viewport.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>Right-aligned actions: ghost escape on the left, filled confirm on the right.</span></div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Do&apos;s and Don&apos;ts</div>
          <div className={s.secBody}>
            <div className={s.ddGrid}>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>
                  <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Confirm</span>
                </div>
                <p className={s.ddText}>Give every modal an exit: an explicit close, a scrim click, and Escape all lead out.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Continue</span>
                </div>
                <p className={s.ddText}>Never trap the user in a dead-end dialog with only one forward path and no way back.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={`${s.obtn} ${s.sm} ${s.vError}`}>Delete forever</span>
                  <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Keep it</span>
                </div>
                <p className={s.ddText}>Use a modal to confirm the irreversible — the interruption is the point.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={s.ovHint}>Newsletter · 3s after load</span>
                </div>
                <p className={s.ddText}>Don&apos;t hijack the page for something ambient. A snackbar or inline banner respects the work.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>In context: Examples</div>
          <div className={s.secBody}>
            <div className={s.ctxGrid}>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>A · Confirm a decision</div>
                <div className={s.ctxStage}>
                  <div className={`${s.omodal} ${s.omodalOpen}`} style={{ position: "relative", width: "100%", maxWidth: "none", boxShadow: "none" }}>
                    <div className={s.ovHead}><div><div className={s.ovTitle} style={{ fontSize: "0.9rem" }}>Publish v3.2?</div></div></div>
                    <div className={s.ovBody} style={{ fontSize: "0.8rem" }}>This ships to every consumer of the library.</div>
                    <div className={s.ovDivider} />
                    <div className={s.ovFoot}><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span><span className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Publish</span></div>
                  </div>
                </div>
                <p className={s.ctxCaption}>The classic use: a yes/no that deserves a beat of attention before it happens.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · A short form</div>
                <div className={s.ctxStage}>
                  <div className={`${s.omodal} ${s.omodalOpen}`} style={{ position: "relative", width: "100%", maxWidth: "none", boxShadow: "none" }}>
                    <div className={s.ovHead}><div><div className={s.ovTitle} style={{ fontSize: "0.9rem" }}>Invite a teammate</div></div></div>
                    <div className={s.ovBody}>
                      <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", color: "#565a62", fontSize: "0.8rem" }}>name@team.com</span>
                    </div>
                    <div className={s.ovDivider} />
                    <div className={s.ovFoot}><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Send invite</span></div>
                  </div>
                </div>
                <p className={s.ctxCaption}>A few fields at most. Anything longer wants its own page or a drawer.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · Destructive confirm</div>
                <div className={s.ctxStage}>
                  <div className={`${s.omodal} ${s.omodalOpen}`} style={{ position: "relative", width: "100%", maxWidth: "none", boxShadow: "none" }}>
                    <div className={s.ovHead}><div><div className={`${s.ovTitle} ${s.ovTitleDanger}`} style={{ fontSize: "0.9rem" }}>Delete project?</div></div></div>
                    <div className={s.ovBody} style={{ fontSize: "0.8rem" }}>42 components will be removed for good.</div>
                    <div className={s.ovDivider} />
                    <div className={s.ovFoot}><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Keep it</span><span className={`${s.obtn} ${s.sm} ${s.vError}`}>Delete</span></div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Error red on the primary, a clear escape beside it, and honest copy about what is lost.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Measurements &amp; Tokens</div>
          <div className={s.secBody}>
            <table className={s.tokTable}>
              <thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>--modal-w-s/m/l</td><td>340 / 420 / 520px</td><td>Max-width per size</td></tr>
                <tr><td className={s.tokName}>--modal-bg</td><td><span className={s.tokSwatch} style={{ background: "#101114" }} />#101114</td><td>Card surface</td></tr>
                <tr><td className={s.tokName}>--modal-border</td><td><span className={s.tokSwatch} style={{ background: "#23242a" }} />#23242A</td><td>Card hairline</td></tr>
                <tr><td className={s.tokName}>--modal-radius</td><td>14px</td><td>Corner radius</td></tr>
                <tr><td className={s.tokName}>--modal-shadow</td><td>0 24px 70px rgba(0,0,0,.6)</td><td>Single elevation shadow</td></tr>
                <tr><td className={s.tokName}>--scrim</td><td><span className={s.tokSwatch} style={{ background: "rgba(4,4,6,.62)" }} />rgba(4,4,6,.62)</td><td>Backdrop dim</td></tr>
                <tr><td className={s.tokName}>--modal-title</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Danger-tone title</td></tr>
                <tr><td className={s.tokName}>--modal-ease</td><td>cubic-bezier(.22,1,.36,1)</td><td>Enter transform, 0.24s</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Code</div>
          <div className={s.secBody}><CodeTabs tabs={CODE} /></div>
        </section>
      </Reveal>

      <RelatedSection related={related} />
    </>
  );
}
