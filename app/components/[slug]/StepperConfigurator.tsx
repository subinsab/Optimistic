"use client";

import { useState } from "react";
import s from "../docs.module.css";

const ORIENT = ["Horizontal", "Vertical"] as const;
const CURRENT = ["1", "2", "3"] as const;
const SUB = ["With", "Without"] as const;
const Check = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const STEPS = [{ label: "Account", sub: "Sign in" }, { label: "Profile", sub: "Your details" }, { label: "Confirm", sub: "Review" }];

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function StepperConfigurator() {
  const [orient, setOrient] = useState("Horizontal");
  const [current, setCurrent] = useState("2");
  const [sub, setSub] = useState("Without");
  const cur = +current - 1;
  const vertical = orient === "Vertical";
  const withSub = sub === "With";
  const props = [`orientation="${orient.toLowerCase()}"`, `current={${cur}}`, withSub ? "showSub" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Orientation" options={ORIENT} value={orient} onPick={setOrient} />
        <Chips label="Current step" options={CURRENT} value={current} onPick={setCurrent} />
        <Chips label="Sub-label" options={SUB} value={sub} onPick={setSub} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.ostepper} ${vertical ? s.ostepperV : ""}`} style={{ maxWidth: vertical ? 220 : 340, width: "100%" }} role="list">
            {STEPS.map((st, i) => {
              const state = i < cur ? s.ostepDone : i === cur ? s.ostepCurrent : "";
              return (
                <div key={st.label} className={`${s.ostep} ${state}`} role="listitem">
                  {i < STEPS.length - 1 && <span className={s.ostepLine} aria-hidden="true" />}
                  <span className={s.ostepDot}>{i < cur ? <Check /> : i + 1}</span>
                  {vertical
                    ? <span className={s.ostepBody}><span className={s.ostepLabel}>{st.label}</span>{withSub && <span className={s.ostepSub}>{st.sub}</span>}</span>
                    : <span className={s.ostepLabel}>{st.label}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Stepper</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
