"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { Calendar } from "./DatePickerDemo";

/* Date Picker configuration playground */

const MODES = ["Single", "Range"] as const;
const WEEKS = ["Sunday", "Monday"] as const;
const LIMITS = ["None", "Future only", "Past only"] as const;
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

export default function DatePickerConfigurator() {
  const [mode, setMode] = useState("Single");
  const [week, setWeek] = useState("Sunday");
  const [limit, setLimit] = useState("None");
  const [footer, setFooter] = useState("With footer");

  const today = new Date();
  const min = limit === "Future only" ? today : undefined;
  const max = limit === "Past only" ? today : undefined;
  const weekStartsOn = week === "Monday" ? 1 : 0;

  const props = [
    `mode="${mode.toLowerCase()}"`,
    week === "Monday" ? `weekStartsOn={1}` : "",
    limit === "Future only" ? "min={today}" : limit === "Past only" ? "max={today}" : "",
    footer === "None" ? "footer={false}" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Mode" options={MODES} value={mode} onPick={setMode} />
        <Chips label="Week starts" options={WEEKS} value={week} onPick={setWeek} />
        <Chips label="Constraints" options={LIMITS} value={limit} onPick={setLimit} />
        <Chips label="Footer" options={FOOTERS} value={footer} onPick={setFooter} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <Calendar
            key={`${mode}-${week}-${limit}-${footer}`}
            mode={mode === "Range" ? "range" : "single"}
            weekStartsOn={weekStartsOn}
            min={min}
            max={max}
            footer={footer === "With footer"}
          />
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>DatePicker</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
