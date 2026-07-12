import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import BottomSheetDemo from "./BottomSheetDemo";
import BottomSheetConfigurator from "./BottomSheetConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Bottom Sheet component. Dark-field, mobile-first design system. A panel that rises from the bottom edge over a dimmed scrim rgba(4,4,6,.62). Sheet bg #101114, top border #23242A, radius 18px 18px 0 0, shadow 0 -18px 50px. A 36x4 grabber handle #33343A centred at the top signals draggability. Slides transform translateY(100%)→0 over 0.32s cubic-bezier(.22,1,.36,1). Sizes: compact (max-height ~46%) and default (max-height ~86%). Structure: handle / optional header (title + subtitle + close) / body (scrolls) / optional sticky footer, safe-area aware. Common content: an action menu (full-width quiet rows, danger row in red) or short detail. role=dialog aria-modal, Escape and scrim dismiss, drag-down to dismiss on touch, focus trapped and returned. On desktop the same intent is usually a menu or popover — reserve the sheet for touch. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<div class="o-sheet-scrim is-open">
  <div class="o-sheet" role="dialog" aria-modal="true">
    <div class="o-sheet__handle"></div>
    <div class="o-sheet__head">
      <div>
        <h2 class="o-sheet__title">Component details</h2>
        <p class="o-sheet__sub">Button · Forms · v3.2</p>
      </div>
      <button class="o-sheet__close" aria-label="Close">✕</button>
    </div>
    <div class="o-sheet__body"><!-- scrolls --></div>
    <div class="o-sheet__foot">
      <button class="o-btn o-btn--ghost">Cancel</button>
      <button class="o-btn o-btn--primary">Add to page</button>
    </div>
  </div>
</div>` },
  { label: "CSS", code: `.o-sheet {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 1000;
  display: flex; flex-direction: column; max-height: 86%;
  background: #101114; border-top: 1px solid #23242a;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -18px 50px rgba(0,0,0,.5);
  padding-bottom: env(safe-area-inset-bottom);
  transform: translateY(100%);
  transition: transform .32s cubic-bezier(.22,1,.36,1);
}
.o-sheet-scrim.is-open .o-sheet { transform: none; }
.o-sheet--compact { max-height: 46%; }

.o-sheet__handle {
  width: 36px; height: 4px; border-radius: 999px;
  background: #33343a; margin: 10px auto 2px;
}
.o-sheet__body { overflow-y: auto; }` },
  { label: "React", code: `import { BottomSheet } from "@optimistic/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open actions</Button>

<BottomSheet open={open} onClose={() => setOpen(false)} title="Component details">
  <p>The unit of intent — eight variants, three sizes.</p>
  <BottomSheet.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={add}>Add to page</Button>
  </BottomSheet.Footer>
</BottomSheet>` },
  { label: "Angular", code: `<o-bottom-sheet [(open)]="open" title="Component details">
  <p>The unit of intent — eight variants, three sizes.</p>
  <div o-sheet-footer>
    <o-button variant="ghost" (pressed)="open = false">Cancel</o-button>
    <o-button variant="primary" (pressed)="add()">Add to page</o-button>
  </div>
</o-bottom-sheet>` },
  { label: "Async / API", code: `// A bottom-sheet action menu that applies each choice optimistically —
// the sheet closes at once and the list reflects the change instantly.
function RowSheet({ row, open, onClose }) {
  async function act(kind) {
    onClose();                            // dismiss immediately
    const undo = applyLocally(row, kind); // optimistic: update the list now
    try {
      const res = await fetch(\`/api/rows/\${row.id}/\${kind}\`, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error();
    } catch {
      undo();                             // reconcile: roll the list back
      toast.error("Could not " + kind + ". Try again.");
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose} size="compact">
      <SheetItem onClick={() => act("share")}>Share</SheetItem>
      <SheetItem onClick={() => act("duplicate")}>Duplicate</SheetItem>
      <SheetItem danger onClick={() => act("delete")}>Delete</SheetItem>
    </BottomSheet>
  );
}` },
];

export default function BottomSheetDoc({ related }: { related: typeof ALL_ENTRIES }) {
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
          <div className={s.secBody}><BottomSheetDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><BottomSheetConfigurator /></div>
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
                <tr><td className={s.tokName}>onClose</td><td>(reason) =&gt; void</td><td>—</td><td>Escape, scrim, close button, or drag-down</td></tr>
                <tr><td className={s.tokName}>size</td><td>compact · default</td><td>default</td><td>Max-height 46% / 86% of the viewport</td></tr>
                <tr><td className={s.tokName}>handle</td><td>boolean</td><td>true</td><td>Shows the grabber and enables drag-to-dismiss</td></tr>
                <tr><td className={s.tokName}>title</td><td>string</td><td>—</td><td>Labels the sheet for assistive tech</td></tr>
                <tr><td className={s.tokName}>dismissable</td><td>boolean</td><td>true</td><td>When false, only an action closes it</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Drag down</td><td>Past a threshold, the sheet dismisses; short drags spring back</td></tr>
                <tr><td className={s.tokName}>Scrim tap</td><td>Closes; taps inside the sheet do not</td></tr>
                <tr><td className={s.tokName}>Escape</td><td>Closes (desktop / keyboard)</td></tr>
                <tr><td className={s.tokName}>On open / close</td><td>Body scroll locks; focus moves in, then back to the trigger</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              A bottom sheet is the <b style={{ color: "#e7e9ee", fontWeight: 500 }}>touch</b> answer to a menu or dialog: it
              arrives where the thumb already is. On a pointer device the same intent is usually a
              <b style={{ color: "#e7e9ee", fontWeight: 500 }}> menu</b>, <b style={{ color: "#e7e9ee", fontWeight: 500 }}>popover</b>, or <b style={{ color: "#e7e9ee", fontWeight: 500 }}>modal</b> —
              adapt by breakpoint rather than shipping a sheet to the desktop.
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
                <div className={s.ovAnaWrap} style={{ paddingLeft: 54, paddingTop: 26, paddingRight: 16 }}>
                  {/* the phone frame clips its own children, so all markers live
                      in the wrap (siblings of the frame) and point inward */}
                  <div style={{ position: "relative", width: 250, height: 250, overflow: "hidden", borderRadius: 18, border: "1px solid #1e1e1e", background: "#0b0b0b" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(4,4,6,.5)" }} />
                    <div className={`${s.osheet} ${s.osheetOpen}`} style={{ boxShadow: "none", maxHeight: "72%" }}>
                      <div className={s.osheetGrab} aria-hidden="true" />
                      <div className={s.ovHead} style={{ paddingTop: 6 }}>
                        <div><div className={s.ovTitle} style={{ fontSize: "0.9rem" }}>Details</div></div>
                        <span className={s.ovClose} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
                      </div>
                      <div className={s.ovBody} style={{ fontSize: "0.8rem" }}>Scrolling content.</div>
                      <div className={s.ovFoot} style={{ borderTop: "1px solid #1e1f24" }}><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Confirm</span></div>
                    </div>
                  </div>
                  {/* 1 scrim (upper), 2 sheet top, 4 header, 5 body, 6 footer → frame left edge */}
                  <span className={s.ovAnaMark} style={{ left: 6, top: 60 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  <span className={s.ovAnaMark} style={{ left: 6, top: 108 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  <span className={s.ovAnaMark} style={{ left: 6, top: 143 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  <span className={s.ovAnaMark} style={{ left: 6, top: 186 }}><b className={s.anaBadge}>5</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  <span className={s.ovAnaMark} style={{ left: 6, top: 243 }}><b className={s.anaBadge}>6</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  {/* 3 handle → vertical drop from above to the centred grabber */}
                  <span className={s.ovAnaMark} style={{ left: 168, top: 78, transform: "none" }}>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <b className={s.anaBadge}>3</b>
                      <i style={{ width: 0, height: 26, borderLeft: "1.5px dashed #5b8cff" }} />
                    </span>
                  </span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Scrim</span><span className={s.anaDesc}>Dims the screen and catches the dismiss tap.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Sheet</span><span className={s.anaDesc}>Rises from the bottom edge, rounded at the top, capped below the status area.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Handle</span><span className={s.anaDesc}>The 36×4 grabber — a signal you can drag it down to dismiss.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>Optional title, subtitle and close, for detail sheets.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Action rows or content, scrolling on its own.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>6</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>Optional sticky actions, kept clear of the home indicator.</span></div>
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
                <div className={s.ddStage}><span className={s.ovHint}>Touch · action menu from the thumb</span></div>
                <p className={s.ddText}>Use a sheet on touch for actions and short detail — it lands where the thumb already rests.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Full sheet on a 1440px desktop</span></div>
                <p className={s.ddText}>Don&apos;t ship a bottom sheet to the desktop. There, the same intent is a menu or popover.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}><div className={s.osheetGrab} aria-hidden="true" style={{ margin: 0 }} /></div>
                <p className={s.ddText}>Keep the handle. It signals the sheet is draggable and gives a clear, forgiving way to dismiss.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>A 6-step wizard in one sheet</span></div>
                <p className={s.ddText}>Don&apos;t cram a long flow into a sheet. Past a screen or two of content, use a full page.</p>
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
                <div className={s.ctxKicker}>A · Action menu</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 150, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div className={`${s.osheet} ${s.osheetOpen}`} style={{ boxShadow: "none", maxHeight: "82%" }}>
                      <div className={s.osheetGrab} aria-hidden="true" />
                      <div className={s.ovBody} style={{ padding: "4px 12px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
                        {["Share", "Duplicate"].map((r) => <span key={r} className={`${s.obtn} ${s.sm} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%", fontSize: "0.78rem" }}>{r}</span>)}
                        <span className={`${s.obtn} ${s.sm} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%", color: "#eb4a4f", fontSize: "0.78rem" }}>Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>The long-press or ⋯ menu on mobile: full-width rows, a danger row in red.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · Detail sheet</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 150, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div className={`${s.osheet} ${s.osheetOpen}`} style={{ boxShadow: "none", maxHeight: "84%" }}>
                      <div className={s.osheetGrab} aria-hidden="true" />
                      <div className={s.ovHead} style={{ padding: "4px 14px 0" }}><div><div className={s.ovTitle} style={{ fontSize: "0.8rem" }}>Component</div></div></div>
                      <div className={s.ovBody} style={{ padding: "6px 14px", fontSize: "0.74rem" }}>Preview and details rise into reach.</div>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Read a record or preview a file without leaving the list underneath.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · Confirm</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 150, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div className={`${s.osheet} ${s.osheetOpen}`} style={{ boxShadow: "none", maxHeight: "70%" }}>
                      <div className={s.osheetGrab} aria-hidden="true" />
                      <div className={s.ovBody} style={{ padding: "6px 14px", fontSize: "0.74rem" }}>Delete this draft?</div>
                      <div className={s.ovFoot} style={{ padding: "8px 14px", borderTop: "1px solid #1e1f24" }}><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Keep</span><span className={`${s.obtn} ${s.sm} ${s.vError}`}>Delete</span></div>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>A compact confirm rides at the bottom, its actions within a thumb&apos;s arc.</p>
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
                <tr><td className={s.tokName}>--sheet-max-h</td><td>86% · 46%</td><td>Default and compact heights</td></tr>
                <tr><td className={s.tokName}>--sheet-bg</td><td><span className={s.tokSwatch} style={{ background: "#101114" }} />#101114</td><td>Sheet surface</td></tr>
                <tr><td className={s.tokName}>--sheet-border</td><td><span className={s.tokSwatch} style={{ background: "#23242a" }} />#23242A</td><td>Top hairline</td></tr>
                <tr><td className={s.tokName}>--sheet-radius</td><td>18px 18px 0 0</td><td>Rounded top corners only</td></tr>
                <tr><td className={s.tokName}>--sheet-handle</td><td><span className={s.tokSwatch} style={{ background: "#33343a" }} />#33343A · 36×4</td><td>Grabber pill</td></tr>
                <tr><td className={s.tokName}>--sheet-shadow</td><td>0 -18px 50px rgba(0,0,0,.5)</td><td>Cast upward onto the page</td></tr>
                <tr><td className={s.tokName}>--sheet-safe</td><td>env(safe-area-inset-bottom)</td><td>Footer padding above the home bar</td></tr>
                <tr><td className={s.tokName}>--sheet-ease</td><td>cubic-bezier(.22,1,.36,1)</td><td>Rise, 0.32s</td></tr>
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
