"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATES = ["Default", "Selected", "Disabled"] as const;
const OPEN = ["Closed", "Open"] as const;
const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Check = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

export default function DropdownConfigurator() {
  const [state, setState] = useState("Selected");
  const [open, setOpen] = useState("Closed");
  const [placeholder, setPlaceholder] = useState("Choose a fruit");
  const disabled = state === "Disabled";
  const value = state === "Selected" ? "Banana" : "";
  const isOpen = open === "Open" && !disabled;
  const OPTS = ["Apple", "Banana", "Cherry"];
  const props = [value ? `value="${value.toLowerCase()}"` : `placeholder="${placeholder}"`, disabled ? "disabled" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <Chips label="Menu" options={OPEN} value={open} onPick={setOpen} />
        <div className={s.configGroup}><span className={s.configLabel}>Placeholder</span><input className={s.configInput} value={placeholder} maxLength={22} onChange={(e) => setPlaceholder(e.target.value)} aria-label="Placeholder" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ minHeight: isOpen ? 190 : undefined, alignItems: "flex-start" }}>
          <div className={`${s.odd} ${isOpen ? s.oddOpen : ""}`}>
            <button type="button" className={s.oddTrigger} disabled={disabled}>
              <span className={`${s.oddValue} ${!value ? s.oddPlaceholder : ""}`}>{value || placeholder}</span>
              <span className={s.oddChevron}><Chevron /></span>
            </button>
            {isOpen && (
              <div className={s.omenu} role="listbox">
                {OPTS.map((o) => (
                  <span key={o} role="option" aria-selected={value === o} className={`${s.omenuOpt} ${value === o ? s.omenuOptOn : ""}`}>
                    {o}{value === o && <span className={s.omenuCheck}><Check /></span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Dropdown</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
