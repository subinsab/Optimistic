"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SIZES = ["L", "M", "S"] as const;
const STATES = ["Off", "On", "Indeterminate", "Disabled"] as const;
const SC: Record<string, string> = { L: "chkL", M: "chkM", S: "chkS" };

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

export default function CheckboxConfigurator() {
  const [size, setSize] = useState("M");
  const [state, setState] = useState("On");
  const [text, setText] = useState("Remember me");
  const on = state === "On", ind = state === "Indeterminate", disabled = state === "Disabled";
  const cls = `${s.ochk} ${s[SC[size] as keyof typeof s]} ${on ? s.ochkOn : ind ? s.ochkInd : ""}`;
  const props = ["checked={v}", "onChange={setV}", `size="${size.toLowerCase()}"`, ind ? "indeterminate" : "", disabled ? "disabled" : "", text ? `label="${text}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <div className={s.configGroup}><span className={s.configLabel}>Label</span>
          <input className={s.configInput} value={text} maxLength={24} onChange={(e) => setText(e.target.value)} aria-label="Label" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={s.selRow}>
            <button type="button" role="checkbox" aria-checked={ind ? "mixed" : on} disabled={disabled} className={cls} />
            {text && <span className={s.selTitle}>{text}</span>}
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Checkbox</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
