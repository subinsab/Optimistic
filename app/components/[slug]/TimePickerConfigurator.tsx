"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { TimePicker } from "./TimePickerDemo";

/* Time Picker configuration playground */

const FORMATS = ["12-hour", "24-hour"] as const;
const STEPS = ["1", "5", "15", "30"] as const;
const FOOTERS = ["With footer", "None"] as const;

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

export default function TimePickerConfigurator() {
  const [format, setFormat] = useState("12-hour");
  const [step, setStep] = useState("1");
  const [footer, setFooter] = useState("With footer");

  const hour12 = format === "12-hour";

  const props = [
    hour12 ? "" : "hour12={false}",
    step !== "5" ? `step={${step}}` : "",
    footer === "None" ? "footer={false}" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Format" options={FORMATS} value={format} onPick={setFormat} />
        <Chips label="Minute step" options={STEPS} value={step} onPick={setStep} />
        <Chips label="Footer" options={FOOTERS} value={footer} onPick={setFooter} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <TimePicker
            key={`${format}-${step}-${footer}`}
            hour12={hour12}
            step={parseInt(step, 10)}
            footer={footer === "With footer"}
          />
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>TimePicker</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
