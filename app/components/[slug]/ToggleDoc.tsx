import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ToggleDemo from "./ToggleDemo";
import ToggleConfigurator from "./ToggleConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Toggle (switch) component. Dark-field design system: pill track, sizes L/M/S (track 48x28 / 40x24 / 32x19, knob 22/18/14). Off = track #26262B border #33333A, grey knob #9AA0A8. On = track + border #FF7A00 (brand), white knob. Knob slides with a spring cubic-bezier(0.34,1.56,0.64,1). role=switch, aria-checked, focus-visible warm ring 3px rgba(255,122,0,.35), disabled opacity .42. Whole label row is clickable. Async handlers should apply the change optimistically and roll back on error. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<button class="o-toggle o-toggle--m" role="switch" aria-checked="true"></button>

<label class="o-toggle-row">
  <button class="o-toggle o-toggle--m is-on" role="switch" aria-checked="true"></button>
  <span>Email notifications</span>
</label>` },
  { label: "CSS", code: `.o-toggle {
  --w: 40px; --h: 24px; --knob: 18px;
  width: var(--w); height: var(--h);
  border-radius: 999px; padding: 2px; cursor: pointer;
  background: #26262b; border: 1px solid #33333a;
  transition: background .2s, border-color .2s;
}
.o-toggle::before {
  content: ""; display: block;
  width: var(--knob); height: var(--knob); border-radius: 50%;
  background: #9aa0a8;
  transition: transform .22s cubic-bezier(.34,1.56,.64,1);
}
.o-toggle.is-on { background: #ff7a00; border-color: #ff7a00; }
.o-toggle.is-on::before { background: #fff; transform: translateX(16px); }` },
  { label: "React", code: `import { Toggle } from "@optimistic/ui";

<Toggle checked={on} onChange={setOn} label="Email notifications" />

<Toggle size="l" checked={sync} onChange={setSync}
        label="Sync across devices"
        description="State flips instantly; the server confirms after." />` },
  { label: "Angular", code: `<o-toggle [(checked)]="on" label="Email notifications"></o-toggle>

<o-toggle size="l" [(checked)]="sync"
          label="Sync across devices"
          description="State flips instantly; the server confirms after.">
</o-toggle>` },
  { label: "Async / API", code: `// A toggle is the optimistic update in one control:
// flip now, reconcile after, roll back honestly on failure.
function SyncToggle() {
  const [on, setOn] = useState(false);
  const busy = useRef(false);

  async function flip() {
    if (busy.current) return;          // ignore repeats while in flight
    busy.current = true;
    const next = !on;
    setOn(next);                       // 1. believe it instantly

    try {
      const res = await fetch("/api/settings/sync", {
        method: "PUT",
        body: JSON.stringify({ enabled: next }),
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error();
    } catch {
      setOn(!next);                    // 2. server disagreed — roll back
      toast.error("Could not save. Try again.");
    } finally {
      busy.current = false;
    }
  }

  return <Toggle checked={on} onChange={flip} label="Sync across devices" />;
}` },
];

export default function ToggleDoc({ related }: { related: typeof ALL_ENTRIES }) {
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
          <div className={s.secBody}><ToggleDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><ToggleConfigurator /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <table className={s.tokTable}>
              <thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>checked</td><td>boolean</td><td>Controlled on/off state</td></tr>
                <tr><td className={s.tokName}>onChange</td><td>(next) =&gt; void</td><td>Fires on click, Enter and Space</td></tr>
                <tr><td className={s.tokName}>size</td><td>l · m · s</td><td>Track 48 / 40 / 32px wide</td></tr>
                <tr><td className={s.tokName}>label / description</td><td>string</td><td>Row is clickable; description is optional</td></tr>
                <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Blocks interaction, opacity 0.42</td></tr>
                <tr><td className={s.tokName}>role=&quot;switch&quot;</td><td>a11y</td><td>aria-checked reflects state; Tab-focusable</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              A toggle changes state <b style={{ color: "#e7e9ee", fontWeight: 500 }}>immediately</b> and never shows a spinner
              on itself. If the change needs the network, apply it optimistically and reconcile in the
              background — the Optimistic tab in the demo above does exactly that.
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
                <div className={s.specimenWrap}>
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otL} ${s.otOn}`} />
                    <span className={s.otTitle}>Email notifications</span>
                  </span>
                  {/* badges above: 1 track, 2 knob, 3 label */}
                  <span className={s.anaMark} style={{ left: "3%", top: -40 }} aria-hidden="true">
                    <b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} />
                  </span>
                  <span className={s.anaMark} style={{ left: "22%", top: -40 }} aria-hidden="true">
                    <b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} />
                  </span>
                  <span className={s.anaMark} style={{ left: "66%", top: -40 }} aria-hidden="true">
                    <b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} />
                  </span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>1</span>
                  <span className={s.anaName}>Track</span>
                  <span className={s.anaDesc}>The pill. Grey when off, warm #FF7A00 when on — the state is the colour.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>2</span>
                  <span className={s.anaName}>Knob</span>
                  <span className={s.anaDesc}>Slides across with a spring on change. Its position is the second cue.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>3</span>
                  <span className={s.anaName}>Label</span>
                  <span className={s.anaDesc}>Names the state, not the action. The whole row is one click target.</span>
                </div>
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
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otM} ${s.otOn}`} />
                    <span className={s.otTitle}>Dark mode</span>
                  </span>
                </div>
                <p className={s.ddText}>Use a toggle for an instant, standalone on/off with no confirmation needed.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otM} ${s.otOn}`} />
                    <span className={s.otTitle}>Delete account</span>
                  </span>
                </div>
                <p className={s.ddText}>Never toggle a destructive or irreversible action. That belongs to a button and a confirm.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otM} ${s.otOn}`} />
                    <span className={s.otTitle}>Auto-save</span>
                  </span>
                </div>
                <p className={s.ddText}>Label the state, not the verb. &quot;Auto-save&quot; reads clearly whether it is on or off.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otM}`} />
                    <span className={s.otTitle}>Turn off auto-save?</span>
                  </span>
                </div>
                <p className={s.ddText}>Don&apos;t phrase the label as a question or an action. A toggle is a state, not a prompt.</p>
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
                <div className={s.ctxKicker}>A · Settings list</div>
                <div className={s.ctxStage}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
                    {["Email notifications", "Desktop alerts", "Weekly digest"].map((t, i) => (
                      <span key={t} className={s.otRow} style={{ justifyContent: "space-between", width: "100%" }}>
                        <span className={s.otTitle} style={{ fontSize: "0.82rem" }}>{t}</span>
                        <span className={`${s.otoggle} ${s.otM} ${i !== 1 ? s.otOn : ""}`} />
                      </span>
                    ))}
                  </div>
                </div>
                <p className={s.ctxCaption}>Controls align to the right edge, labels to the left. One row per setting.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · Inline in a toolbar</div>
                <div className={s.ctxStage}>
                  <span className={s.otRow}>
                    <span className={s.otStatus + " " + s.otStatusOff}>LIVE</span>
                    <span className={`${s.otoggle} ${s.otS} ${s.otOn}`} />
                  </span>
                </div>
                <p className={s.ctxCaption}>Small size pairs with a short mono label for compact, dense surfaces.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · With a description</div>
                <div className={s.ctxStage}>
                  <span className={s.otRow}>
                    <span className={`${s.otoggle} ${s.otM} ${s.otOn}`} />
                    <span className={s.otText}>
                      <span className={s.otTitle} style={{ fontSize: "0.82rem" }}>Two-factor auth</span>
                      <span className={s.otDesc}>Ask for a code at every new sign-in.</span>
                    </span>
                  </span>
                </div>
                <p className={s.ctxCaption}>A description sits under the label when the choice needs explaining.</p>
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
                <tr><td className={s.tokName}>--tg-track-l/m/s</td><td>48×28 / 40×24 / 32×19</td><td>Track size per scale</td></tr>
                <tr><td className={s.tokName}>--tg-knob-l/m/s</td><td>22 / 18 / 14px</td><td>Sliding knob diameter</td></tr>
                <tr><td className={s.tokName}>--tg-off-track</td><td><span className={s.tokSwatch} style={{ background: "#26262b" }} />#26262B</td><td>Off track fill</td></tr>
                <tr><td className={s.tokName}>--tg-off-knob</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Off knob</td></tr>
                <tr><td className={s.tokName}>--tg-on</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>On track &amp; border (the one light)</td></tr>
                <tr><td className={s.tokName}>--tg-on-knob</td><td><span className={s.tokSwatch} style={{ background: "#ffffff" }} />#FFFFFF</td><td>On knob</td></tr>
                <tr><td className={s.tokName}>--tg-ease</td><td>cubic-bezier(.34,1.56,.64,1)</td><td>Knob spring, 0.22s</td></tr>
                <tr><td className={s.tokName}>--tg-focus</td><td>rgba(255,122,0,.35)</td><td>3px focus-visible ring</td></tr>
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
