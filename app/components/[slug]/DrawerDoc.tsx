import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import DrawerDemo from "./DrawerDemo";
import DrawerConfigurator from "./DrawerConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Drawer (side sheet) component. Dark-field design system. An edge-anchored panel that slides in over a dimmed scrim rgba(4,4,6,.62). Panel bg #101114, width min(320px,80%), full height, border on the inner edge #23242A, shadow toward the page. Sides: right (default, transform translateX(100%)→0) and left (translateX(-100%)→0). Slide 0.3s cubic-bezier(.22,1,.36,1). Structure: header (title + subtitle + close ×) / body (flex:1, scrolls on its own) / optional sticky footer with a hairline top and right-aligned actions. role=dialog aria-modal, Escape closes, scrim click closes, focus trapped and returned to trigger. Use a drawer (not a modal) for detail, editing, or navigation that should keep the page's context beside it. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<div class="o-drawer-scrim is-open">
  <aside class="o-drawer o-drawer--right" role="dialog" aria-modal="true">
    <div class="o-drawer__head">
      <div>
        <h2 class="o-drawer__title">Button · v3.2</h2>
        <p class="o-drawer__sub">Forms · 8 variants</p>
      </div>
      <button class="o-drawer__close" aria-label="Close">✕</button>
    </div>
    <div class="o-drawer__body"><!-- scrolls --></div>
    <div class="o-drawer__foot">
      <button class="o-btn o-btn--ghost">Cancel</button>
      <button class="o-btn o-btn--primary">Save</button>
    </div>
  </aside>
</div>` },
  { label: "CSS", code: `.o-drawer {
  position: fixed; top: 0; bottom: 0; right: 0; z-index: 1000;
  width: min(320px, 80%);
  display: flex; flex-direction: column;
  background: #101114; border-left: 1px solid #23242a;
  box-shadow: -18px 0 50px rgba(0,0,0,.5);
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(.22,1,.36,1);
}
.o-drawer--left { left: 0; right: auto; border-left: 0;
  border-right: 1px solid #23242a; transform: translateX(-100%); }
.o-drawer-scrim.is-open .o-drawer { transform: none; }

.o-drawer__body { flex: 1; overflow-y: auto; }
.o-drawer__foot { border-top: 1px solid #1e1f24; }` },
  { label: "React", code: `import { Drawer } from "@optimistic/ui";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open details</Button>

<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Button · v3.2">
  <p>The unit of intent. Eight variants, three sizes.</p>
  <Drawer.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={save}>Save</Button>
  </Drawer.Footer>
</Drawer>` },
  { label: "Angular", code: `<o-drawer [(open)]="open" side="right" title="Button · v3.2">
  <p>The unit of intent. Eight variants, three sizes.</p>
  <div o-drawer-footer>
    <o-button variant="ghost" (pressed)="open = false">Cancel</o-button>
    <o-button variant="primary" (pressed)="save()">Save</o-button>
  </div>
</o-drawer>` },
  { label: "Async / API", code: `// A drawer that loads its detail on open and never lets a stale
// response overwrite a newer one — cancel the fetch when it closes.
function DetailDrawer({ id, open, onClose }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    setItem(null);                         // clear while loading
    fetch(\`/api/components/\${id}\`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setItem)
      .catch((e) => e.name !== "AbortError" && toast.error("Load failed"));
    return () => ctrl.abort();             // closing cancels the request
  }, [id, open]);

  return (
    <Drawer open={open} onClose={onClose} side="right" title={item?.name ?? "Loading…"}>
      {item ? <ComponentDetail data={item} /> : <Skeleton rows={6} />}
    </Drawer>
  );
}` },
];

export default function DrawerDoc({ related }: { related: typeof ALL_ENTRIES }) {
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
          <div className={s.secBody}><DrawerDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><DrawerConfigurator /></div>
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
                <tr><td className={s.tokName}>onClose</td><td>(reason) =&gt; void</td><td>—</td><td>Escape, scrim click, or close button</td></tr>
                <tr><td className={s.tokName}>side</td><td>right · left</td><td>right</td><td>Which edge it slides from</td></tr>
                <tr><td className={s.tokName}>width</td><td>narrow · default · wide</td><td>default</td><td>Panel width; caps at 80% of the viewport</td></tr>
                <tr><td className={s.tokName}>title</td><td>string</td><td>—</td><td>Labels the panel for assistive tech</td></tr>
                <tr><td className={s.tokName}>dismissable</td><td>boolean</td><td>true</td><td>When false, only an action closes it</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Escape</td><td>Closes the drawer</td></tr>
                <tr><td className={s.tokName}>Scrim click</td><td>Closes; clicks inside the panel do not</td></tr>
                <tr><td className={s.tokName}>Tab / Shift+Tab</td><td>Focus is trapped within the panel</td></tr>
                <tr><td className={s.tokName}>On open / close</td><td>Focus moves in, then back to the trigger</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              Reach for a drawer over a modal when the user needs the page&apos;s context to stay put — editing a
              row while the list stays visible, or reading detail without losing scroll position. A modal
              <b style={{ color: "#e7e9ee", fontWeight: 500 }}> interrupts</b>; a drawer
              <b style={{ color: "#e7e9ee", fontWeight: 500 }}> accompanies</b>.
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
                <div style={{ position: "relative", width: 320, height: 240, overflow: "hidden", borderRadius: 4, border: "1px solid #1e1e1e", background: "#0b0b0b" }}>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(4,4,6,.5)" }} />
                  {/* 1 scrim → dim area on the left */}
                  <span className={s.ovAnaMark} style={{ left: 14, top: 20, zIndex: 9 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 22 }} /></span>
                  <div className={`${s.odrawer} ${s.odrawerOpen}`} style={{ width: 210, boxShadow: "none" }}>
                    {/* 2 panel 3 header 4 body 5 footer → drawer left edge at each band */}
                    <span className={s.ovAnaMark} style={{ left: -44, top: 14 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -44, top: 46 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -44, top: 112 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -44, bottom: 16, top: "auto" }}><b className={s.anaBadge}>5</b><i className={s.ovAnaLine} style={{ width: 20 }} /></span>
                    <div className={s.ovHead}>
                      <div><div className={s.ovTitle} style={{ fontSize: "0.92rem" }}>Details</div><div className={s.ovSub}>Subtitle</div></div>
                      <span className={s.ovClose} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                      </span>
                    </div>
                    <div className={s.ovBody} style={{ flex: 1, fontSize: "0.8rem" }}>Scrolling content.</div>
                    <div className={s.ovFoot} style={{ borderTop: "1px solid #1e1f24" }}>
                      <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Scrim</span><span className={s.anaDesc}>Dims the page and catches the dismiss click, while the context stays visible behind it.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Panel</span><span className={s.anaDesc}>Full-height sheet anchored to one edge, sliding in from off-screen.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>Title, optional subtitle, and a close button pinned to the top.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Grows to fill and scrolls independently of the page beneath.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>Sticky actions with a hairline top, so Save is always reachable.</span></div>
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
                <div className={s.ddStage}><span className={s.ovHint}>List stays visible · drawer edits a row</span></div>
                <p className={s.ddText}>Use a drawer when keeping the page&apos;s context in view helps — editing beside the list.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Yes / No confirm in a wide drawer</span></div>
                <p className={s.ddText}>Don&apos;t use a drawer for a single yes/no. That interruption belongs to a modal.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>
                  <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span>
                </div>
                <p className={s.ddText}>Keep the primary action sticky in the footer, always reachable however long the body scrolls.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Drawer opening a second drawer</span></div>
                <p className={s.ddText}>Never stack drawers on drawers. If a step needs another step, it wants a full page.</p>
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
                <div className={s.ctxKicker}>A · Detail beside a list</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 150, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 7 }}>
                      <span className={s.mockLine} style={{ width: "70%" }} />
                      <span className={s.mockLine} style={{ width: "55%" }} />
                      <span className={s.mockLine} style={{ width: "62%" }} />
                    </div>
                    <div className={`${s.odrawer} ${s.odrawerOpen}`} style={{ width: 150, boxShadow: "none" }}>
                      <div className={s.ovHead} style={{ padding: "12px 14px 0" }}><div><div className={s.ovTitle} style={{ fontSize: "0.82rem" }}>Row detail</div></div></div>
                      <div className={s.ovBody} style={{ padding: "8px 14px", fontSize: "0.74rem" }}>Read without losing your place.</div>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>The list stays put on the left; detail arrives on the right. No context lost.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · Left navigation</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 150, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div className={`${s.odrawer} ${s.odrawerLeft} ${s.odrawerOpen}`} style={{ width: 140, boxShadow: "none" }}>
                      <div className={s.ovBody} style={{ padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                        {["Overview", "Components", "Tokens"].map((r, i) => (
                          <span key={r} className={`${s.obtn} ${s.sm} ${i === 1 ? s.vGhost : s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%", fontSize: "0.74rem" }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>On small screens the drawer becomes the primary navigation, sliding from the left.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · Edit form</div>
                <div className={s.ctxStage}>
                  <div className={`${s.odrawer} ${s.odrawerOpen}`} style={{ position: "relative", width: "100%", height: 150, boxShadow: "none", borderLeft: 0, border: "1px solid #16171b", borderRadius: 4 }}>
                    <div className={s.ovHead} style={{ padding: "12px 14px 0" }}><div><div className={s.ovTitle} style={{ fontSize: "0.82rem" }}>Edit component</div></div></div>
                    <div className={s.ovBody} style={{ padding: "8px 14px", flex: 1 }}>
                      <span className={`${s.oinput} ${s.inS}`} style={{ display: "flex", alignItems: "center", color: "#565a62", fontSize: "0.74rem" }}>Name…</span>
                    </div>
                    <div className={s.ovFoot} style={{ padding: "10px 14px", borderTop: "1px solid #1e1f24" }}><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span></div>
                  </div>
                </div>
                <p className={s.ctxCaption}>A few fields with a sticky Save — longer than a modal wants, shorter than a page.</p>
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
                <tr><td className={s.tokName}>--drawer-w</td><td>min(320px, 80%)</td><td>Panel width, capped to the viewport</td></tr>
                <tr><td className={s.tokName}>--drawer-bg</td><td><span className={s.tokSwatch} style={{ background: "#101114" }} />#101114</td><td>Panel surface</td></tr>
                <tr><td className={s.tokName}>--drawer-border</td><td><span className={s.tokSwatch} style={{ background: "#23242a" }} />#23242A</td><td>Inner-edge hairline</td></tr>
                <tr><td className={s.tokName}>--drawer-shadow</td><td>-18px 0 50px rgba(0,0,0,.5)</td><td>Cast toward the page (flips for left)</td></tr>
                <tr><td className={s.tokName}>--scrim</td><td><span className={s.tokSwatch} style={{ background: "rgba(4,4,6,.62)" }} />rgba(4,4,6,.62)</td><td>Backdrop dim</td></tr>
                <tr><td className={s.tokName}>--drawer-foot-border</td><td><span className={s.tokSwatch} style={{ background: "#1e1f24" }} />#1E1F24</td><td>Sticky footer hairline</td></tr>
                <tr><td className={s.tokName}>--drawer-ease</td><td>cubic-bezier(.22,1,.36,1)</td><td>Slide, 0.3s</td></tr>
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
