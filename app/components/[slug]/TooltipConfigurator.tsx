"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Tooltip configuration playground — the preview tooltip is forced visible
   so the placement and label read without needing a hover. */

const PLACES = ["Top", "Bottom", "Left", "Right"] as const;
const TRIGGERS = ["Text button", "Icon button"] as const;
const PCLASS: Record<string, string> = { Top: "otipTop", Bottom: "otipBottom", Left: "otipLeft", Right: "otipRight" };
const SHOWN: Record<string, string> = {
  Top: "translateX(-50%)", Bottom: "translateX(-50%)",
  Left: "translateY(-50%)", Right: "translateY(-50%)",
};

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

export default function TooltipConfigurator() {
  const [place, setPlace] = useState("Top");
  const [trigger, setTrigger] = useState("Text button");
  const [label, setLabel] = useState("Duplicate");

  const props = [
    `placement="${place.toLowerCase()}"`,
    `label="${label}"`,
  ].join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Placement" options={PLACES} value={place} onPick={setPlace} />
        <Chips label="Trigger" options={TRIGGERS} value={trigger} onPick={setTrigger} />
        <div className={s.configGroup}>
          <span className={s.configLabel}>Label</span>
          <input className={s.configInput} value={label} maxLength={30} onChange={(e) => setLabel(e.target.value)} aria-label="Tooltip label" />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ minHeight: 160 }}>
          <span className={s.otipWrap}>
            {trigger === "Icon button" ? (
              <span className={`${s.obtn} ${s.iconOnly} ${s.m} ${s.vGhost}`} aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5.5 5.5V4a1 1 0 011-1H12a1 1 0 011 1v5.5a1 1 0 01-1 1h-1.5M3 6.5h5.5a1 1 0 011 1V13a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            ) : (
              <span className={`${s.obtn} ${s.m} ${s.vGhost}`} aria-hidden="true">Hover me</span>
            )}
            <span className={`${s.otip} ${s[PCLASS[place] as keyof typeof s]}`} role="tooltip"
              style={{ opacity: 1, transform: SHOWN[place] }}>
              {label || "Tooltip"}
            </span>
          </span>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Tooltip</b> {props}{">"}…{"</"}<b>Tooltip</b>{">"}
        </div>
      </div>
    </div>
  );
}
