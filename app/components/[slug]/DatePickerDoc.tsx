import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import DatePickerDemo from "./DatePickerDemo";
import DatePickerConfigurator from "./DatePickerConfigurator";
import DatePickerBehavior from "./DatePickerBehavior";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Date Picker (calendar) component. Dark-field design system, dependency-free (native Date). Container bg #0E0F12 border #1E1F24 radius 12, width ~264. Header: prev/next chevron buttons + a centre title button. Clicking the title JUMPS from the day view to a 12-month grid, and clicking the year there jumps to a 12-year grid (fast navigation). Day grid: 7 columns, mono weekday labels #565A62, 6 rows, outside-month days dimmed. States: today = warm #FF9D45 text with a #FF7A00 dot; selected = solid #FF7A00 fill, near-black label; disabled (min/max) = struck through and unclickable. RANGE mode: pick a start then an end (swap if the end is earlier), the span fills rgba(255,122,0,.14) with warm rounded endpoints, and hovering previews the span before the second click. Full keyboard: arrows move day, PageUp/Down move month, Home/End move to week edges, Enter/Space select. Footer: selection readout + a Today shortcut. Props: mode single|range, weekStartsOn 0|1, min, max, onChange. Deliver React + CSS."
);

/* a static, deterministic specimen for the anatomy + in-context blocks */
function StaticCal({ range = false, small = false }: { range?: boolean; small?: boolean }) {
  const lead = [29, 30];
  const trail = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className={s.ocal} style={small ? { width: 236, padding: 10 } : undefined}>
      <div className={s.ocalHead}>
        <span className={s.ocalNav} aria-hidden="true"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span className={s.ocalTitle}>July 2026</span>
        <span className={s.ocalNav} aria-hidden="true"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
      <div className={s.ocalWkRow} aria-hidden="true">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => <span key={w} className={s.ocalWk}>{w}</span>)}
      </div>
      <div className={s.ocalGrid}>
        {lead.map((d) => <span key={`l${d}`} className={`${s.ocalDay} ${s.ocalMuted}`}>{d}</span>)}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
          const cls = [s.ocalDay];
          if (!range && d === 8) cls.push(s.ocalToday);
          if (!range && d === 15) cls.push(s.ocalSel);
          if (range && d === 12) cls.push(s.ocalRangeStart);
          if (range && d > 12 && d < 18) cls.push(s.ocalInRange);
          if (range && d === 18) cls.push(s.ocalRangeEnd);
          return <span key={d} className={cls.join(" ")}>{d}</span>;
        })}
        {trail.map((d) => <span key={`t${d}`} className={`${s.ocalDay} ${s.ocalMuted}`}>{d}</span>)}
      </div>
      <div className={s.ocalFoot}>
        <span className={s.ocalReadout}>{range ? "Jul 12 → Jul 18" : "Jul 15, 2026"}</span>
        <span className={s.ocalTodayBtn}>Today</span>
      </div>
    </div>
  );
}

const CODE = [
  { label: "HTML", code: `<div class="o-cal">
  <div class="o-cal__head">
    <button class="o-cal__nav" aria-label="Previous">‹</button>
    <button class="o-cal__title">July 2026</button>   <!-- click to jump -->
    <button class="o-cal__nav" aria-label="Next">›</button>
  </div>
  <div class="o-cal__wk"><span>Su</span>…<span>Sa</span></div>
  <div class="o-cal__grid" role="grid">
    <button class="o-cal__day is-today">8</button>
    <button class="o-cal__day is-selected" aria-selected="true">15</button>
    <button class="o-cal__day" disabled>16</button>
  </div>
</div>` },
  { label: "CSS", code: `.o-cal { width: 264px; background: #0e0f12;
  border: 1px solid #1e1f24; border-radius: 12px; padding: 12px; }
.o-cal__grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 2px; }
.o-cal__day { height: 32px; border-radius: 8px; border: 0;
  background: none; color: #cfd3da; cursor: pointer; }
.o-cal__day:hover { background: rgba(255,255,255,.06); }

.is-today { color: #ff9d45; font-weight: 700; }
.is-selected { background: #ff7a00; color: #1a0e04; }
.in-range { background: rgba(255,122,0,.14); }
.range-start { background: #ff7a00; border-radius: 8px 0 0 8px; }
.range-end   { background: #ff7a00; border-radius: 0 8px 8px 0; }
.o-cal__day:disabled { color: #35373d; text-decoration: line-through; }` },
  { label: "React", code: `import { DatePicker } from "@optimistic/ui";

// single
<DatePicker value={date} onChange={setDate} />

// range, week starts Monday, no past dates
<DatePicker
  mode="range"
  weekStartsOn={1}
  min={new Date()}
  value={range}
  onChange={setRange}
/>` },
  { label: "Angular", code: `<o-date-picker [(value)]="date"></o-date-picker>

<o-date-picker
  mode="range"
  [weekStartsOn]="1"
  [min]="today"
  [(value)]="range">
</o-date-picker>` },
  { label: "Async / API", code: `// A reschedule that reflects instantly and reconciles after —
// the calendar never blocks while the server confirms.
function Reschedule({ eventId, current }) {
  const [date, setDate] = useState(current);
  const busy = useRef(false);

  async function choose(next) {
    if (busy.current) return;
    busy.current = true;
    const prev = date;
    setDate(next);                       // optimistic: move it now
    try {
      const res = await fetch(\`/api/events/\${eventId}\`, {
        method: "PATCH",
        body: JSON.stringify({ date: next.toISOString() }),
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error(res.status);   // e.g. 409 conflict
    } catch {
      setDate(prev);                     // reconcile: roll back
      toast.error("That slot was just taken. Try another.");
    } finally {
      busy.current = false;
    }
  }

  return <DatePicker value={date} min={new Date()} onChange={choose} />;
}` },
];

export default function DatePickerDoc({ related }: { related: typeof ALL_ENTRIES }) {
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
          <div className={s.secBody}><DatePickerDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><DatePickerConfigurator /></div>
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
                <tr><td className={s.tokName}>mode</td><td>single · range</td><td>single</td><td>One date, or a start→end span</td></tr>
                <tr><td className={s.tokName}>value</td><td>Date · &#123;start, end&#125;</td><td>—</td><td>Controlled selection</td></tr>
                <tr><td className={s.tokName}>onChange</td><td>(value) =&gt; void</td><td>—</td><td>Fires on each committed pick</td></tr>
                <tr><td className={s.tokName}>weekStartsOn</td><td>0 · 1</td><td>0</td><td>Sunday or Monday as the first column</td></tr>
                <tr><td className={s.tokName}>min / max</td><td>Date</td><td>—</td><td>Bounds; outside days are disabled</td></tr>
                <tr><td className={s.tokName}>initialDate</td><td>Date</td><td>today</td><td>Which month opens first</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Key</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>← → ↑ ↓</td><td>Move focus by a day or a week</td></tr>
                <tr><td className={s.tokName}>PageUp / PageDown</td><td>Move by a month</td></tr>
                <tr><td className={s.tokName}>Home / End</td><td>Jump to the start or end of the week</td></tr>
                <tr><td className={s.tokName}>Enter / Space</td><td>Select the focused day</td></tr>
                <tr><td className={s.tokName}>Title click</td><td>Jump days → months → years, then back down</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Live behavior — every demo is real</div>
            <DatePickerBehavior />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.ovAnaWrap} style={{ paddingLeft: 64 }}>
                  <div style={{ position: "relative" }}>
                    <StaticCal />
                    {/* left-rail badges → each band's left edge */}
                    <span className={s.ovAnaMark} style={{ left: -50, top: 27 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 28 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -50, top: 66 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 28 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -50, top: 128 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 28 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -50, top: 196 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 28 }} /></span>
                    <span className={s.ovAnaMark} style={{ left: -50, bottom: 18, top: "auto" }}><b className={s.anaBadge}>5</b><i className={s.ovAnaLine} style={{ width: 28 }} /></span>
                  </div>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Navigation</span><span className={s.anaDesc}>Prev / next arrows and a title that jumps to the month and year grids.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Weekday row</span><span className={s.anaDesc}>Fixed labels in the machine&apos;s mono voice; Sunday or Monday first.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Day grid</span><span className={s.anaDesc}>Six weeks, always. Outside-month days stay visible but dimmed.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>States</span><span className={s.anaDesc}>Today wears a warm dot; the selection is the one solid fill; a range tints the span.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Footer</span><span className={s.anaDesc}>A plain-language readout of the choice, and a Today shortcut back to now.</span></div>
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
                <div className={s.ddStage}><span className={s.ovHint}>Title → months → years</span></div>
                <p className={s.ddText}>Let the title jump. Reaching a birthday in 1994 should take two clicks, not forty.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>‹ only, one month at a time</span></div>
                <p className={s.ddText}>Don&apos;t trap the user in single-month steps. Distant dates become a scavenger hunt.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}><span className={s.ocalReadout}>Jul 12 → Jul 18</span></div>
                <p className={s.ddText}>Echo the selection back in words. A readable readout confirms the pick was understood.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>07/08/2026 — which is it?</span></div>
                <p className={s.ddText}>Don&apos;t leave the format ambiguous. &quot;Jul 8&quot; never gets confused with the 7th of August.</p>
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
                <div className={s.ctxKicker}>A · A booking range</div>
                <div className={s.ctxStage}><StaticCal range small /></div>
                <p className={s.ctxCaption}>Check-in to check-out: the range fills the span so the length of stay is obvious.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · A due-date field</div>
                <div className={s.ctxStage}>
                  <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", color: "#e7e9ee", fontSize: "0.82rem" }}>
                    Jul 15, 2026
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ color: "#767b87" }}><rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M2.5 7h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  </span>
                </div>
                <p className={s.ctxCaption}>Collapsed into a field, the picker opens in a popover only when the user needs it.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · A date filter</div>
                <div className={s.ctxStage}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {["Today", "Last 7 days", "This month", "Custom range…"].map((r, i) => (
                      <span key={r} className={`${s.obtn} ${s.sm} ${i === 1 ? s.vGhost : s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%" }}>{r}</span>
                    ))}
                  </div>
                </div>
                <p className={s.ctxCaption}>Presets do the common jobs; the calendar handles the one-off &quot;custom range&quot;.</p>
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
                <tr><td className={s.tokName}>--cal-w</td><td>264px</td><td>Panel width (7 × 32 + gaps + padding)</td></tr>
                <tr><td className={s.tokName}>--cal-bg</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Panel surface</td></tr>
                <tr><td className={s.tokName}>--cal-border</td><td><span className={s.tokSwatch} style={{ background: "#1e1f24" }} />#1E1F24</td><td>Panel &amp; footer hairline</td></tr>
                <tr><td className={s.tokName}>--cal-day</td><td>32px · radius 8</td><td>Day cell hit target</td></tr>
                <tr><td className={s.tokName}>--cal-selected</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Selection &amp; range endpoints, near-black label</td></tr>
                <tr><td className={s.tokName}>--cal-range</td><td><span className={s.tokSwatch} style={{ background: "rgba(255,122,0,.14)" }} />rgba(255,122,0,.14)</td><td>In-range span fill</td></tr>
                <tr><td className={s.tokName}>--cal-today</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Today text + a #FF7A00 dot</td></tr>
                <tr><td className={s.tokName}>--cal-muted</td><td><span className={s.tokSwatch} style={{ background: "#4a4d55" }} />#4A4D55</td><td>Outside-month days</td></tr>
                <tr><td className={s.tokName}>--cal-focus</td><td>rgba(255,122,0,.55)</td><td>2px keyboard focus ring</td></tr>
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
