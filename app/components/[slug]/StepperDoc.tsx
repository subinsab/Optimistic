import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import StepperDemo from "./StepperDemo";
import StepperConfigurator from "./StepperConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Stepper. Dark design system: numbered steps joined by a 2px connector. A done step is a solid warm #FF7A00 dot with a dark check; the current step is a ringed warm outline (#FF9D45 number, warm halo); upcoming steps are muted #16171B/#2A2A30. The connector before a done step is warm, else #2A2A30. Labels brighten from done onward. Horizontal and vertical (with sub-labels) orientations. role=list. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-stepper" role="list">
  <div class="o-step is-done" role="listitem">
    <span class="o-step__line"></span>
    <span class="o-step__dot"><CheckIcon /></span>
    <span class="o-step__label">Account</span>
  </div>
  <div class="o-step is-current" role="listitem">
    <span class="o-step__line"></span>
    <span class="o-step__dot">2</span>
    <span class="o-step__label">Profile</span>
  </div>
  <div class="o-step" role="listitem">
    <span class="o-step__dot">3</span><span class="o-step__label">Confirm</span>
  </div>
</div>` },
  { label: "CSS", code: `.o-step { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 9px; position: relative; }
.o-step__dot {
  width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
  background: #16171b; border: 1px solid #2a2a30; color: #767b87;
}
.o-step.is-done .o-step__dot { background: #ff7a00; border-color: #ff7a00; color: #1a0e04; }
.o-step.is-current .o-step__dot { border-color: #ff7a00; color: #ff9d45; box-shadow: 0 0 0 3px rgba(255,122,0,.15); }
.o-step__line { position: absolute; top: 15px; left: calc(50% + 20px); width: calc(100% - 40px); height: 2px; background: #2a2a30; }
.o-step.is-done .o-step__line { background: #ff7a00; }` },
  { label: "React", code: `import { Stepper } from "@optimistic/ui";

<Stepper current={step} orientation="horizontal">
  <Stepper.Step label="Account" />
  <Stepper.Step label="Profile" sub="Your details" />
  <Stepper.Step label="Confirm" />
</Stepper>` },
  { label: "Angular", code: `<o-stepper [current]="step" orientation="horizontal">
  <o-step label="Account"></o-step>
  <o-step label="Profile" sub="Your details"></o-step>
  <o-step label="Confirm"></o-step>
</o-stepper>` },
  { label: "Async / API", code: `// Drive the stepper from validated form state — advance only when a
// step passes, and let people jump back to any completed step.
const [current, setCurrent] = useState(0);

async function next() {
  const ok = await validateStep(current);   // per-step schema
  if (ok) setCurrent((c) => Math.min(c + 1, steps.length - 1));
}

// completed steps are navigable; upcoming ones are locked
<Stepper current={current} onStepClick={(i) => i < current && setCurrent(i)} />` },
];

export default function StepperDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Check = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const mini = (cur: number) => ["Account", "Profile", "Confirm"].map((label, i) => {
    const state = i < cur ? s.ostepDone : i === cur ? s.ostepCurrent : "";
    return (
      <div key={label} className={`${s.ostep} ${state}`}>
        {i < 2 && <span className={s.ostepLine} aria-hidden="true" />}
        <span className={s.ostepDot}>{i < cur ? <Check /> : i + 1}</span>
        <span className={s.ostepLabel} style={{ fontSize: "0.72rem" }}>{label}</span>
      </div>
    );
  });
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><StepperDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><StepperConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>current</td><td>number</td><td>Zero-based index of the active step</td></tr>
          <tr><td className={s.tokName}>orientation</td><td>horizontal · vertical</td><td>Row of steps, or a stacked column</td></tr>
          <tr><td className={s.tokName}>Step.label / sub</td><td>string</td><td>Name and an optional supporting line</td></tr>
          <tr><td className={s.tokName}>onStepClick</td><td>(index) =&gt; void</td><td>Navigate back to a completed step</td></tr>
          <tr><td className={s.tokName}>done state</td><td>—</td><td>Steps before current show a warm check</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A Stepper maps a flow of discrete steps. For continuous completion of one task use Progress; for switching peer views use Tabs.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 340 }}>
            <div className={s.ostepper}>{mini(1)}</div>
            <span className={s.anaMark} style={{ left: "16%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "16%", top: 48 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Done step</span><span className={s.anaDesc}>Solid warm dot with a check; a warm connector.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Current step</span><span className={s.anaDesc}>Ringed warm outline; the active number.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Brightens from the current step onward.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{mini(2)}</div></div><p className={s.ddText}>Keep it to a few clear steps, with the current one obvious.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{["1","2","3","4","5","6","7"].map((n,i)=><div key={n} className={`${s.ostep} ${i===2?s.ostepCurrent:i<2?s.ostepDone:""}`}>{i<6&&<span className={s.ostepLine} />}<span className={s.ostepDot} style={{ width: 22, height: 22, fontSize: "0.62rem" }}>{n}</span></div>)}</div></div><p className={s.ddText}>Don&apos;t cram seven-plus steps in a row. Group or go vertical.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{mini(3)}</div></div><p className={s.ddText}>Mark finished steps with a check so progress is unmistakable.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{["1","2","3"].map((n,i)=><div key={n} className={`${s.ostep} ${s.ostepCurrent}`}>{i<2&&<span className={s.ostepLine} />}<span className={s.ostepDot}>{n}</span></div>)}</div></div><p className={s.ddText}>Don&apos;t light every step as current. Exactly one is active.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Onboarding</div><div className={s.ctxStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{mini(1)}</div></div><p className={s.ctxCaption}>Multi-step sign-up with the finish line always shown.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Checkout</div><div className={s.ctxStage}><div className={s.ostepper} style={{ pointerEvents: "none", width: "100%" }}>{mini(2)}</div></div><p className={s.ctxCaption}>Cart → shipping → payment, one step at a time.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Vertical</div><div className={s.ctxStage}><div className={`${s.ostepper} ${s.ostepperV}`} style={{ pointerEvents: "none", width: "100%" }}>{["Account","Profile","Done"].map((label,i)=>{const st=i<1?s.ostepDone:i===1?s.ostepCurrent:"";return <div key={label} className={`${s.ostep} ${st}`}>{i<2&&<span className={s.ostepLine} />}<span className={s.ostepDot}>{i<1?<Check/>:i+1}</span><span className={s.ostepBody}><span className={s.ostepLabel} style={{ fontSize: "0.78rem" }}>{label}</span></span></div>;})}</div></div><p className={s.ctxCaption}>Vertical steps for wizards in a narrow panel.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--step-dot</td><td>30px</td><td>Step marker diameter</td></tr>
          <tr><td className={s.tokName}>--step-line</td><td>2px</td><td>Connector thickness</td></tr>
          <tr><td className={s.tokName}>--step-done</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Done dot and connector</td></tr>
          <tr><td className={s.tokName}>--step-current</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Active number + warm halo</td></tr>
          <tr><td className={s.tokName}>--step-idle</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Upcoming border and line</td></tr>
          <tr><td className={s.tokName}>--step-halo</td><td>3px rgba(255,122,0,.15)</td><td>Ring on the current step</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
