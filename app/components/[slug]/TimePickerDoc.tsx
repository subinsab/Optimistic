import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TimePickerDemo from "./TimePickerDemo";
import TimePickerConfigurator from "./TimePickerConfigurator";
import TimePickerBehavior from "./TimePickerBehavior";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Time Picker component. Dark-field design system, dependency-free. Container bg #0E0F12 border #1E1F24 radius 12, width ~260. A large mono readout at the top (e.g. 09:00 AM). Below, side-by-side scrollable COLUMNS: Hours, a ':' separator, Minutes, and — in 12-hour mode — an AM/PM two-button period column. Each column keeps its selected value centred (set scrollTop manually, never scrollIntoView which would scroll the page). Selected option = solid #FF7A00 fill with a near-black label; hover = subtle white wash. 24-hour mode drops the period column and runs hours 00–23. A `step` prop thins the minute list (1/5/15/30). Footer: a plain readout + a Now shortcut that rounds to the step. Props: hour12, step, initial {h,m}, onChange, footer. Value is 24h internally ({h:0-23,m:0-59}); convert only for 12h display. Deliver React + CSS."
);

const pad = (n: number) => String(n).padStart(2, "0");

/* static, deterministic specimen for anatomy + in-context */
function StaticTime({ small = false }: { small?: boolean }) {
  const hrs = [7, 8, 9, 10, 11];
  const mins = [28, 29, 30, 31, 32];
  return (
    <div className={s.otime} style={small ? { width: 172, padding: 10 } : undefined}>
      <div className={s.otimeHead}>9:30 AM</div>
      <div className={s.otimeCols}>
        <div className={s.otimeColWrap}>
          <span className={s.otimeColLabel}>Hr</span>
          <div className={s.otimeCol} style={{ height: 136, padding: 0, overflow: "hidden", justifyContent: "center" }}>{hrs.map((h) => <span key={h} className={`${s.otimeOpt} ${h === 9 ? s.otimeOptOn : ""}`}><span className={s.otimeVal}>{h}</span></span>)}</div>
        </div>
        <span className={s.otimeSep} aria-hidden="true">:</span>
        <div className={s.otimeColWrap}>
          <span className={s.otimeColLabel}>Min</span>
          <div className={s.otimeCol} style={{ height: 136, padding: 0, overflow: "hidden", justifyContent: "center" }}>{mins.map((m) => <span key={m} className={`${s.otimeOpt} ${m === 30 ? s.otimeOptOn : ""}`}><span className={s.otimeVal}>{pad(m)}</span></span>)}</div>
        </div>
        <div className={s.otimePeriod}>
          <span className={s.otimeColLabel}>&nbsp;</span>
          <div className={s.otimePeriodBtns}>
            <span className={`${s.otimePeriodBtn} ${s.otimePeriodOn}`}>AM</span>
            <span className={s.otimePeriodBtn}>PM</span>
          </div>
        </div>
      </div>
      <div className={s.otimeFoot}>
        <span className={s.otimeReadout}>9:30 AM</span>
        <span className={s.otimeNow}>Now</span>
      </div>
    </div>
  );
}

function TimeFieldStatic({ value }: { value: string }) {
  return (
    <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", color: "#e7e9ee", fontSize: "0.82rem" }}>
      {value}
      <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ color: "#767b87" }}><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M9 5.5V9l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

const CODE = [
  { label: "HTML", code: `<div class="o-time">
  <div class="o-time__head">09:00 AM</div>
  <div class="o-time__cols">
    <div class="o-time__col" role="listbox">
      <button class="o-time__opt is-selected">9</button>
      <button class="o-time__opt">10</button>
    </div>
    <span class="o-time__sep">:</span>
    <div class="o-time__col" role="listbox">
      <button class="o-time__opt is-selected">00</button>
      <button class="o-time__opt">05</button>
    </div>
    <div class="o-time__period">
      <button class="is-selected">AM</button>
      <button>PM</button>
    </div>
  </div>
</div>` },
  { label: "CSS", code: `.o-time { width: 184px; background: #0e0f12;
  border: 1px solid #1e1f24; border-radius: 12px; padding: 12px; }
.o-time__head { text-align: center; font-family: var(--mono);
  font-size: 0.95rem; color: #f4f5f6; padding: 2px 0 10px; }
.o-time__cols { display: flex; gap: 6px; }
.o-time__col { height: 168px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 2px; }
.o-time__opt { height: 34px; border-radius: 8px; border: 0;
  background: none; color: #cfd3da; cursor: pointer; }
.o-time__opt:hover { background: rgba(255,255,255,.06); }
.o-time__opt.is-selected { background: #ff7a00; color: #1a0e04; }` },
  { label: "React", code: `import { TimePicker } from "@optimistic/ui";

// 12-hour, 5-minute steps
<TimePicker value={time} onChange={setTime} />

// 24-hour, every minute
<TimePicker hour12={false} step={1} value={time} onChange={setTime} />`},
  { label: "Angular", code: `<o-time-picker [(value)]="time"></o-time-picker>

<o-time-picker [hour12]="false" [step]="1" [(value)]="time"></o-time-picker>` },
  { label: "Async / API", code: `// Setting a reminder time, optimistically: reflect the new time now,
// reconcile with the server, roll back if the write fails.
function ReminderTime({ id, current }) {
  const [time, setTime] = useState(current);
  const busy = useRef(false);

  async function change(next) {
    const prev = time;
    setTime(next);                       // optimistic
    if (busy.current) return;
    busy.current = true;
    try {
      const res = await fetch(\`/api/reminders/\${id}\`, {
        method: "PUT",
        body: JSON.stringify({ at: next }),
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error(res.status);
    } catch {
      setTime(prev);                     // reconcile: roll back
      toast.error("Could not save the time.");
    } finally {
      busy.current = false;
    }
  }

  return <TimePicker value={time} onChange={change} />;
}` },
];

export default function TimePickerDoc({ related }: { related: typeof ALL_ENTRIES }) {
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
          <div className={s.secBody}><TimePickerDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><TimePickerConfigurator /></div>
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
                <tr><td className={s.tokName}>value / onChange</td><td>&#123;h, m&#125;</td><td>—</td><td>Controlled time, 24-hour internally</td></tr>
                <tr><td className={s.tokName}>hour12</td><td>boolean</td><td>true</td><td>AM/PM columns, or a 24-hour clock</td></tr>
                <tr><td className={s.tokName}>step</td><td>number</td><td>1</td><td>Minute increment: 1 (every minute, 0–59) · 5 · 15 · 30</td></tr>
                <tr><td className={s.tokName}>initial</td><td>&#123;h, m&#125;</td><td>09:00</td><td>Uncontrolled starting time</td></tr>
                <tr><td className={s.tokName}>min / max</td><td>&#123;h, m&#125;</td><td>—</td><td>Bounds; out-of-range options disable</td></tr>
                <tr><td className={s.tokName}>footer</td><td>boolean</td><td>true</td><td>Readout + Now shortcut</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Click an option</td><td>Commits that hour, minute or period</td></tr>
                <tr><td className={s.tokName}>↑ ↓ within a column</td><td>Move focus through the list</td></tr>
                <tr><td className={s.tokName}>Enter / Space</td><td>Select the focused option</td></tr>
                <tr><td className={s.tokName}>Now</td><td>Jumps to the current time, rounded to the step</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Live behavior — every demo is real</div>
            <TimePickerBehavior />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.ovAnaWrap} style={{ paddingLeft: 60, paddingRight: 56 }}>
                  <div style={{ position: "relative" }}>
                    <StaticTime />
                    {/* 1 readout (top), 2 selector columns (mid-left), 4 footer (bottom) */}
                    <span className={s.ovAnaMark} style={{ left: -46, top: 32 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -46, top: 127 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -46, bottom: 10, top: "auto" }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                    {/* 3 period (AM/PM) → from the right */}
                    <span className={`${s.ovAnaMark} ${s.ovAnaFlip}`} style={{ right: -46, top: 137 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  </div>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Readout</span><span className={s.anaDesc}>The chosen time in the machine&apos;s mono voice, updated on every pick.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Selector columns</span><span className={s.anaDesc}>Hours and minutes as scroll lists; each keeps its selection centred. Minutes thin by the step.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Period</span><span className={s.anaDesc}>AM / PM as two buttons on the right, present only in 12-hour mode.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>A readable echo of the time and a Now shortcut, rounded to the step.</span></div>
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
                <div className={s.ddStage}><span className={s.otimeReadout}>Every 15 min · :00 :15 :30 :45</span></div>
                <p className={s.ddText}>Match the step to the task. Booking slots rarely need per-minute precision.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>60 minutes, one at a time, for a 9am slot</span></div>
                <p className={s.ddText}>Don&apos;t make the user scroll sixty rows when four would do the job.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}><span className={s.otimeReadout}>09:00 AM</span></div>
                <p className={s.ddText}>Show AM/PM explicitly. &quot;9:00&quot; alone is ambiguous; &quot;9:00 AM&quot; never is.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>13:00 PM</span></div>
                <p className={s.ddText}>Don&apos;t mix a 24-hour number with a period. Pick one clock and hold it.</p>
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
                <div className={s.ctxKicker}>A · A meeting field</div>
                <div className={s.ctxStage}><div style={{ width: "100%" }}><TimeFieldStatic value="9:30 AM" /></div></div>
                <p className={s.ctxCaption}>Collapsed into a field, the picker opens in a popover only when needed.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · A reminder</div>
                <div className={s.ctxStage}><StaticTime small /></div>
                <p className={s.ctxCaption}>Standalone, the columns make setting a one-off reminder quick and precise.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · A time range</div>
                <div className={s.ctxStage}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                    <TimeFieldStatic value="9:00 AM" />
                    <span style={{ color: "#565a62" }}>→</span>
                    <TimeFieldStatic value="5:30 PM" />
                  </div>
                </div>
                <p className={s.ctxCaption}>Two fields set an interval — office hours, a shift, an availability window.</p>
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
                <tr><td className={s.tokName}>--time-w</td><td>184px</td><td>Panel width</td></tr>
                <tr><td className={s.tokName}>--time-bg</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Panel surface</td></tr>
                <tr><td className={s.tokName}>--time-border</td><td><span className={s.tokSwatch} style={{ background: "#1e1f24" }} />#1E1F24</td><td>Panel &amp; footer hairline</td></tr>
                <tr><td className={s.tokName}>--time-col-h</td><td>176px</td><td>Scroll column height</td></tr>
                <tr><td className={s.tokName}>--time-opt</td><td>34px · radius 8</td><td>Option row height</td></tr>
                <tr><td className={s.tokName}>--time-selected</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Selected option &amp; period, near-black label</td></tr>
                <tr><td className={s.tokName}>--time-readout</td><td>1.4rem mono</td><td>Header time display</td></tr>
                <tr><td className={s.tokName}>--time-focus</td><td>rgba(255,122,0,.55)</td><td>2px keyboard focus ring</td></tr>
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
