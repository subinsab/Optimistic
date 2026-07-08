"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATES = ["Default", "Error", "Success", "Disabled"] as const;
const RESIZE = ["Vertical", "None"] as const;
const COUNTER = ["Off", "On"] as const;

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

export default function TextareaConfigurator() {
  const [state, setState] = useState("Default");
  const [resize, setResize] = useState("Vertical");
  const [counter, setCounter] = useState("Off");
  const [label, setLabel] = useState("Release notes");
  const stateCls = state === "Error" ? s.otaErr : state === "Success" ? s.otaOk : "";
  const disabled = state === "Disabled";
  const cls = `${s.otextarea} ${stateCls} ${resize === "None" ? s.otaNoResize : ""}`;
  const props = [
    label ? `label="${label}"` : "",
    resize === "None" ? `resize="none"` : "",
    counter === "On" ? "maxLength={140} showCount" : "",
    state === "Error" ? `status="error"` : state === "Success" ? `status="success"` : "",
    disabled ? "disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <Chips label="Resize" options={RESIZE} value={resize} onPick={setResize} />
        <Chips label="Counter" options={COUNTER} value={counter} onPick={setCounter} />
        <div className={s.configGroup}><span className={s.configLabel}>Label</span><input className={s.configInput} value={label} maxLength={24} onChange={(e) => setLabel(e.target.value)} aria-label="Label" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.inField}>
            {label && <span className={s.inLabel}>{label}</span>}
            <textarea className={cls} disabled={disabled} defaultValue="" placeholder="Write here…" aria-label={label || "Textarea"} />
            {(counter === "On" || state === "Error" || state === "Success") && (
              <div className={s.inLabelRow}>
                {state === "Error" && <span className={`${s.inMsg} ${s.inMsgErr}`}>Please check this field.</span>}
                {state === "Success" && <span className={`${s.inMsg} ${s.inMsgOk}`}>Looks good.</span>}
                {counter === "On" && <span className={s.inCount}>0 / 140</span>}
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Textarea</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
