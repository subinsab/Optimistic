"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Input configuration playground — compose a field, read its code */

const SIZES = ["L", "M", "S"] as const;
const STATES = ["Default", "Error", "Success", "Disabled"] as const;
const ICONS = ["None", "Leading"] as const;
const SCLASS: Record<string, string> = { L: "inL", M: "inM", S: "inS" };

const Search = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InputConfigurator() {
  const [size, setSize] = useState("M");
  const [state, setState] = useState("Default");
  const [icon, setIcon] = useState("None");
  const [label, setLabel] = useState("Work email");

  const stateCls = state === "Error" ? s.inErr : state === "Success" ? s.inOk : "";
  const disabled = state === "Disabled";
  const cls = `${s.oinput} ${s[SCLASS[size] as keyof typeof s]} ${stateCls} ${icon === "Leading" ? s.inHasIcon : ""}`;

  const props = [
    label ? `label="${label}"` : "",
    `size="${size.toLowerCase()}"`,
    icon === "Leading" ? "icon={<SearchIcon />}" : "",
    state === "Error" ? `status="error"` : state === "Success" ? `status="success"` : "",
    disabled ? "disabled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <Chips label="Icon" options={ICONS} value={icon} onPick={setIcon} />
        <div className={s.configGroup}>
          <span className={s.configLabel}>Label</span>
          <input className={s.configInput} value={label} maxLength={24} onChange={(e) => setLabel(e.target.value)} placeholder="Label" aria-label="Field label" />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.inField}>
            {label && <span className={s.inLabel}>{label}</span>}
            <span className={s.inWrap}>
              {icon === "Leading" && <span className={s.inIcon}><Search /></span>}
              <input className={cls} placeholder="you@company.com" disabled={disabled} defaultValue="" />
            </span>
            {state === "Error" && <span className={`${s.inMsg} ${s.inMsgErr}`}>Please check this field.</span>}
            {state === "Success" && <span className={`${s.inMsg} ${s.inMsgOk}`}>Looks good.</span>}
          </div>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Input</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
