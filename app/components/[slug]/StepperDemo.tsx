"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Horizontal", "Vertical", "Interactive"] as const;
const Check = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const STEPS = [
  { label: "Account", sub: "Email & password" },
  { label: "Profile", sub: "Name & role" },
  { label: "Workspace", sub: "Team setup" },
  { label: "Done", sub: "Review" },
];

function Horizontal({ current, steps }: { current: number; steps: typeof STEPS }) {
  return (
    <div className={s.ostepper} role="list">
      {steps.map((st, i) => {
        const state = i < current ? s.ostepDone : i === current ? s.ostepCurrent : "";
        return (
          <div key={st.label} className={`${s.ostep} ${state}`} role="listitem">
            {i < steps.length - 1 && <span className={s.ostepLine} aria-hidden="true" />}
            <span className={s.ostepDot}>{i < current ? <Check /> : i + 1}</span>
            <span className={s.ostepLabel}>{st.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function StepperDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Horizontal");
  const [step, setStep] = useState(1);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Stepper examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Horizontal" && (
          <>
            <div className={s.subLabel}>Done · current · upcoming, the finish always in view</div>
            <div style={{ maxWidth: 460 }}><Horizontal current={2} steps={STEPS} /></div>
          </>
        )}
        {tab === "Vertical" && (
          <>
            <div className={s.subLabel}>Stacked, with a sub-line per step</div>
            <div className={`${s.ostepper} ${s.ostepperV}`} style={{ maxWidth: 300 }} role="list">
              {STEPS.map((st, i) => {
                const state = i < 2 ? s.ostepDone : i === 2 ? s.ostepCurrent : "";
                return (
                  <div key={st.label} className={`${s.ostep} ${state}`} role="listitem">
                    {i < STEPS.length - 1 && <span className={s.ostepLine} aria-hidden="true" />}
                    <span className={s.ostepDot}>{i < 2 ? <Check /> : i + 1}</span>
                    <span className={s.ostepBody}><span className={s.ostepLabel}>{st.label}</span><span className={s.ostepSub}>{st.sub}</span></span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {tab === "Interactive" && (
          <>
            <div className={s.subLabel}>Move through the flow — Back and Next</div>
            <div style={{ maxWidth: 460 }}><Horizontal current={step} steps={STEPS} /></div>
            <div className={s.btnRow} style={{ gap: 12, marginTop: 20 }}>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} disabled={step === 0} onClick={() => setStep((v) => Math.max(0, v - 1))}>Back</button>
              <button className={`${s.obtn} ${s.sm} ${s.vWarm}`} disabled={step >= STEPS.length - 1} onClick={() => setStep((v) => Math.min(STEPS.length - 1, v + 1))}>Next</button>
              <span className={s.stateBadge}>step {step + 1} of {STEPS.length}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
