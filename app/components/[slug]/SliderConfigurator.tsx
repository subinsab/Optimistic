"use client";

import { useState } from "react";
import s from "../docs.module.css";

const READOUT = ["Value", "Number", "None"] as const;
const STATES = ["Default", "Disabled"] as const;
const fill = (v: number, min = 0, max = 100) => {
  const pct = ((v - min) / (max - min)) * 100;
  return { background: `linear-gradient(to right, #ff7a00 ${pct}%, #242428 ${pct}%)` };
};

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

const SIZES = ["S", "M", "L"] as const;
const SZ: Record<string, string> = { S: "oRangeSm", M: "", L: "oRangeLg" };

export default function SliderConfigurator() {
  const [readout, setReadout] = useState("Value");
  const [size, setSize] = useState("M");
  const [step, setStep] = useState("1");
  const [val, setVal] = useState(60);
  const [state, setState] = useState("Default");
  const disabled = state === "Disabled";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const props = [`value={${val}}`, `min={0} max={100}`, size !== "M" ? `size="${size.toLowerCase()}"` : "", step !== "1" ? `step={${step}}` : "", readout === "Number" ? "showInput" : readout === "Value" ? "showValue" : "", disabled ? "disabled" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Readout" options={READOUT} value={readout} onPick={setReadout} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Step" options={["1", "5", "10"]} value={step} onPick={setStep} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.osliderField}>
            <div className={s.osliderRow}>
              <input type="range" className={`${s.oRange} ${szCls}`} min={0} max={100} step={+step} value={val} disabled={disabled}
                onChange={(e) => setVal(+e.target.value)} style={fill(val)} aria-label="Value" />
              {readout === "Value" && <span className={s.osliderVal}>{val}</span>}
              {readout === "Number" && <input type="number" className={s.osliderNum} min={0} max={100} value={val} disabled={disabled} onChange={(e) => setVal(Math.min(100, Math.max(0, +e.target.value || 0)))} aria-label="Exact" />}
            </div>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Slider</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
