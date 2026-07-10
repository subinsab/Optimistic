"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Toggle configuration playground */

const SIZES = ["L", "M", "S"] as const;
const STATES = ["On", "Off", "Disabled on", "Disabled off"] as const;
const LABELS = ["None", "Label", "Label + description"] as const;
const SCLASS: Record<string, string> = { L: "otL", M: "otM", S: "otS" };

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

export default function ToggleConfigurator() {
  const [size, setSize] = useState("M");
  const [state, setState] = useState("On");
  const [labelMode, setLabelMode] = useState("Label");
  const [text, setText] = useState("Email notifications");

  const on = state.endsWith("on") || state === "On";
  const disabled = state.startsWith("Disabled");

  const props = [
    "checked={on}",
    "onChange={setOn}",
    `size="${size.toLowerCase()}"`,
    labelMode !== "None" ? `label="${text}"` : "",
    labelMode === "Label + description" ? `description="…"` : "",
    disabled ? "disabled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <Chips label="Label" options={LABELS} value={labelMode} onPick={setLabelMode} />
        {labelMode !== "None" && (
          <div className={s.configGroup}>
            <span className={s.configLabel}>Text</span>
            <input className={s.configInput} value={text} maxLength={28} onChange={(e) => setText(e.target.value)} aria-label="Toggle label" />
          </div>
        )}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={s.otRow}>
            <button type="button" role="switch" aria-checked={on} disabled={disabled}
              className={`${s.otoggle} ${s[SCLASS[size] as keyof typeof s]} ${on ? s.otOn : ""}`} />
            {labelMode === "Label" && <span className={s.otTitle}>{text}</span>}
            {labelMode === "Label + description" && (
              <span className={s.otText}>
                <span className={s.otTitle}>{text}</span>
                <span className={s.otDesc}>Send a receipt after every transaction.</span>
              </span>
            )}
          </span>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Toggle</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
