import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import PopoverDemo from "./PopoverDemo";
import PopoverConfigurator from "./PopoverConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Popover component. Dark-field design system. A small panel anchored to its trigger, opening beside it with a pointing arrow — NO scrim, the page stays interactive (light-dismiss on outside click or Escape). Anchor position:relative; panel bg #141519 border #262A30 radius 12, shadow 0 18px 48px, width ~260px. Placements: bottom (default), top, right — each with a rotated-square arrow that points back to the trigger. Enter: opacity 0 + translateY(-4px) scale(.97) → none over 0.18s. Structure: optional header (title + optional close) / body (free-form: filters, a mini form, a user card) / optional right-aligned footer actions. role=dialog, aria-expanded on the trigger, focus moves into the panel and returns to the trigger on close. Use a popover for contextual, non-blocking content; use a modal when the choice must block. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<div class="o-pop-anchor">
  <button class="o-btn o-btn--primary" aria-expanded="true" aria-haspopup="dialog">
    Filter
  </button>
  <div class="o-pop o-pop--bottom is-open" role="dialog">
    <span class="o-pop__arrow"></span>
    <div class="o-pop__head">Filter by status</div>
    <div class="o-pop__body"><!-- checkboxes --></div>
    <div class="o-pop__foot">
      <button class="o-btn o-btn--quiet">Reset</button>
      <button class="o-btn o-btn--primary">Apply</button>
    </div>
  </div>
</div>` },
  { label: "CSS", code: `.o-pop-anchor { position: relative; display: inline-flex; }

.o-pop {
  position: absolute; z-index: 8; width: 260px;
  background: #141519; border: 1px solid #262a30; border-radius: 12px;
  box-shadow: 0 18px 48px rgba(0,0,0,.55);
  opacity: 0; pointer-events: none;
  transform: translateY(-4px) scale(.97); transform-origin: top center;
  transition: opacity .18s, transform .18s;
}
.o-pop.is-open { opacity: 1; pointer-events: auto; transform: none; }
.o-pop--bottom { top: calc(100% + 10px); left: 50%; margin-left: -130px; }

.o-pop__arrow {
  position: absolute; top: -6px; left: 50%; margin-left: -5px;
  width: 10px; height: 10px; background: #141519;
  border-left: 1px solid #262a30; border-top: 1px solid #262a30;
  transform: rotate(45deg);
}` },
  { label: "React", code: `import { Popover } from "@optimistic/ui";

<Popover placement="bottom" title="Filter by status"
  trigger={<Button icon={<Filter />}>Filter</Button>}>
  <Checkbox checked={live} onChange={setLive}>Live</Checkbox>
  <Checkbox checked={review} onChange={setReview}>In review</Checkbox>
  <Popover.Footer>
    <Button variant="quiet" onClick={reset}>Reset</Button>
    <Button variant="primary" onClick={apply}>Apply</Button>
  </Popover.Footer>
</Popover>` },
  { label: "Angular", code: `<o-popover placement="bottom" title="Filter by status">
  <button o-popover-trigger class="o-btn o-btn--primary">Filter</button>
  <o-checkbox [(checked)]="live">Live</o-checkbox>
  <o-checkbox [(checked)]="review">In review</o-checkbox>
  <div o-popover-footer>
    <o-button variant="quiet" (pressed)="reset()">Reset</o-button>
    <o-button variant="primary" (pressed)="apply()">Apply</o-button>
  </div>
</o-popover>` },
  { label: "Async / API", code: `// A popover that loads on open and applies changes optimistically —
// the page behind it updates instantly, then reconciles.
function StatusPopover({ id, current }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(current);

  async function choose(next) {
    const prev = status;
    setStatus(next);                     // optimistic: reflect it now
    setOpen(false);
    try {
      const res = await fetch(\`/api/items/\${id}/status\`, {
        method: "PUT",
        body: JSON.stringify({ status: next }),
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error();
    } catch {
      setStatus(prev);                   // reconcile: roll back on failure
      toast.error("Could not update status.");
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom"
      trigger={<Button variant="ghost">{status}</Button>}>
      {STATUSES.map((sName) => (
        <MenuItem key={sName} onClick={() => choose(sName)}>{sName}</MenuItem>
      ))}
    </Popover>
  );
}` },
];

export default function PopoverDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer">
            <i>◇</i> Open the Figma file ↗
          </a>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer">
            <i>✳</i> Start building with Claude ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}><PopoverDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><PopoverConfigurator /></div>
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
                <tr><td className={s.tokName}>open</td><td>boolean</td><td>false</td><td>Controlled visibility (or uncontrolled via trigger)</td></tr>
                <tr><td className={s.tokName}>onOpenChange</td><td>(open) =&gt; void</td><td>—</td><td>Fires on trigger, outside click, or Escape</td></tr>
                <tr><td className={s.tokName}>placement</td><td>bottom · top · right</td><td>bottom</td><td>Side the panel opens toward</td></tr>
                <tr><td className={s.tokName}>trigger</td><td>ReactNode</td><td>—</td><td>The anchoring element; gets aria-expanded</td></tr>
                <tr><td className={s.tokName}>title</td><td>string</td><td>—</td><td>Optional header label</td></tr>
                <tr><td className={s.tokName}>dismissOnOutside</td><td>boolean</td><td>true</td><td>Click outside closes; the page stays live</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Click trigger</td><td>Toggles open; a second click closes</td></tr>
                <tr><td className={s.tokName}>Click outside</td><td>Closes; unlike a modal, no scrim blocks the page</td></tr>
                <tr><td className={s.tokName}>Escape</td><td>Closes and returns focus to the trigger</td></tr>
                <tr><td className={s.tokName}>Tab</td><td>Moves through the panel, then out — focus is not trapped</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              A popover is <b style={{ color: "#e7e9ee", fontWeight: 500 }}>non-blocking</b>: it never dims the page and
              never traps focus. If the content is a list of actions, that is a <b style={{ color: "#e7e9ee", fontWeight: 500 }}>menu</b>;
              if a single word of help, a <b style={{ color: "#e7e9ee", fontWeight: 500 }}>tooltip</b>; if the choice must
              block, a <b style={{ color: "#e7e9ee", fontWeight: 500 }}>modal</b>.
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
                <div className={s.ovAnaWrap} style={{ paddingLeft: 64, paddingTop: 8 }}>
                  {/* left-aligned trigger so the left rail of badges lines up cleanly */}
                  <span className={`${s.obtn} ${s.sm} ${s.vGhost}`} style={{ display: "inline-flex", marginBottom: 12 }}>Filter</span>
                  {/* 1 anchor → trigger */}
                  <span className={s.ovAnaMark} style={{ left: 0, top: 22 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 42 }} /></span>
                  <div className={`${s.opop} ${s.opopOpen}`} style={{ position: "relative", width: 208, boxShadow: "0 14px 40px rgba(0,0,0,.5)" }}>
                    <span className={s.opopArrow} aria-hidden="true" style={{ left: 22, marginLeft: 0 }} />
                    {/* 2 arrow → vertical drop to the arrow */}
                    <span className={s.ovAnaMark} style={{ left: 17, top: -30, transform: "none" }}><span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><b className={s.anaBadge}>2</b><i style={{ width: 0, height: 16, borderLeft: "1.5px dashed #5b8cff" }} /></span></span>
                    {/* 3 header 4 body 5 footer → left edge */}
                    <span className={s.ovAnaMark} style={{ left: -42, top: 22 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -42, top: 58 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -42, bottom: 16, top: "auto" }}><b className={s.anaBadge}>5</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <div className={s.opopHead}><span className={s.opopTitle}>Filter by status</span></div>
                    <div className={s.opopBody}>Free-form content.</div>
                    <div className={s.opopFoot}><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Apply</span></div>
                  </div>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Anchor</span><span className={s.anaDesc}>The trigger element. The panel positions relative to it and inherits its aria-expanded.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Arrow</span><span className={s.anaDesc}>A rotated square that points back to the anchor, so the connection is never in doubt.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>Optional title, and a close button when the body is substantial.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Free-form: a filter set, a compact form, or a rich card.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>Optional right-aligned actions to commit or reset the panel.</span></div>
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
                <div className={s.ddStage}><span className={s.ovHint}>Filter · date range · rich card</span></div>
                <p className={s.ddText}>Use a popover for contextual content that shouldn&apos;t block the page — filters, pickers, previews.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Delete account? · in a popover</span></div>
                <p className={s.ddText}>Don&apos;t confirm the irreversible in a popover. A stray outside click dismisses it — use a modal.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <div className={s.opopAnchor}><span className={`${s.opop} ${s.opopBottom} ${s.opopOpen}`} style={{ position: "static", width: 150, transform: "none", opacity: 1, pointerEvents: "auto" }}><span className={s.opopArrow} aria-hidden="true" /><div className={s.opopBody} style={{ fontSize: "0.74rem" }}>Points to its trigger.</div></span></div>
                </div>
                <p className={s.ddText}>Keep the arrow. It ties the panel to its anchor, so origin is obvious at a glance.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Popover opening another popover</span></div>
                <p className={s.ddText}>Don&apos;t nest popovers. Layers of floating panels lose the anchor and the user with it.</p>
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
                <div className={s.ctxKicker}>A · Filter set</div>
                <div className={s.ctxStage}>
                  <div className={`${s.opop} ${s.opopOpen}`} style={{ position: "relative", width: "100%", maxWidth: 220 }}>
                    <div className={s.opopHead}><span className={s.opopTitle}>Status</span></div>
                    <div className={s.opopBody} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {["Live", "Archived"].map((r, i) => (
                        <label key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className={`${s.ochk} ${s.chkS} ${i === 0 ? s.ochkOn : ""}`} aria-hidden="true" />
                          <span style={{ fontSize: "0.78rem", color: "#cfd3da" }}>{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Faceted filters live in a popover so results update without leaving the view.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · A quick form</div>
                <div className={s.ctxStage}>
                  <div className={`${s.opop} ${s.opopOpen}`} style={{ position: "relative", width: "100%", maxWidth: 220 }}>
                    <div className={s.opopHead}><span className={s.opopTitle}>Rename</span></div>
                    <div className={s.opopBody}><span className={`${s.oinput} ${s.inS}`} style={{ display: "flex", alignItems: "center", width: "100%", color: "#cfd3da", fontSize: "0.78rem" }}>Homepage</span></div>
                    <div className={s.opopFoot}><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span></div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Inline edits — one or two fields — commit right where the trigger sits.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · A rich card</div>
                <div className={s.ctxStage}>
                  <div className={`${s.opop} ${s.opopOpen}`} style={{ position: "relative", width: "100%", maxWidth: 220 }}>
                    <div className={s.opopBody} style={{ display: "flex", gap: 10, alignItems: "center", paddingTop: 13 }}>
                      <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#ff7a00", flex: "none" }} />
                      <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "0.8rem", color: "#f2f3f5" }}>Subin K</span>
                        <span style={{ fontSize: "0.72rem", color: "#767b87" }}>Maintainer</span>
                      </span>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Hover-card previews — a profile, a link unfurl — belong in a light, dismissable popover.</p>
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
                <tr><td className={s.tokName}>--pop-w</td><td>260px</td><td>Default panel width</td></tr>
                <tr><td className={s.tokName}>--pop-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Panel surface (arrow inherits it)</td></tr>
                <tr><td className={s.tokName}>--pop-border</td><td><span className={s.tokSwatch} style={{ background: "#262a30" }} />#262A30</td><td>Panel and arrow hairline</td></tr>
                <tr><td className={s.tokName}>--pop-radius</td><td>12px</td><td>Corner radius</td></tr>
                <tr><td className={s.tokName}>--pop-shadow</td><td>0 18px 48px rgba(0,0,0,.55)</td><td>Floating elevation</td></tr>
                <tr><td className={s.tokName}>--pop-arrow</td><td>10px, rotate 45°</td><td>Square that points to the anchor</td></tr>
                <tr><td className={s.tokName}>--pop-offset</td><td>10px</td><td>Gap between anchor and panel</td></tr>
                <tr><td className={s.tokName}>--pop-ease</td><td>0.18s ease</td><td>Fade + lift on open</td></tr>
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
