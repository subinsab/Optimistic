"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SIZES = ["L", "M", "S"] as const;
const STATES = ["On", "Off", "Disabled"] as const;
const SC: Record<string, string> = { L: "rdL", M: "rdM", S: "rdS" };

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

export default function RadioConfigurator() {
  const [size, setSize] = useState("M");
  const [state, setState] = useState("On");
  const [text, setText] = useState("Pro plan");
  const on = state === "On", disabled = state === "Disabled";
  const props = ["checked={v}", "onChange={setV}", `value="pro"`, `size="${size.toLowerCase()}"`, disabled ? "disabled" : "", text ? `label="${text}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <div className={s.configGroup}><span className={s.configLabel}>Label</span><input className={s.configInput} value={text} maxLength={24} onChange={(e) => setText(e.target.value)} aria-label="Label" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={s.selRow}>
            <button type="button" role="radio" aria-checked={on} disabled={disabled} className={`${s.oradio} ${s[SC[size] as keyof typeof s]} ${on ? s.oradioOn : ""}`} />
            {text && <span className={s.selTitle}>{text}</span>}
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Radio</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
