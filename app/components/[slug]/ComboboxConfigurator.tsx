"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATES = ["Idle", "Typing", "Empty"] as const;
const ITEMS = ["Apple", "Apricot", "Avocado", "Banana"];

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

export default function ComboboxConfigurator() {
  const [state, setState] = useState("Typing");
  const [placeholder, setPlaceholder] = useState("Search fruit…");
  const q = state === "Typing" ? "Ap" : state === "Empty" ? "xyz" : "";
  const open = state !== "Idle";
  const results = ITEMS.filter((i) => i.toLowerCase().includes(q.toLowerCase()));
  const hi = (t: string) => {
    const i = t.toLowerCase().indexOf(q.toLowerCase());
    if (!q || i < 0) return t;
    return (<>{t.slice(0, i)}<span className={s.ocomboMatch}>{t.slice(i, i + q.length)}</span>{t.slice(i + q.length)}</>);
  };
  const props = [`placeholder="${placeholder}"`, "options={fruits}", "onSelect={fn}"].join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <div className={s.configGroup}><span className={s.configLabel}>Placeholder</span><input className={s.configInput} value={placeholder} maxLength={22} onChange={(e) => setPlaceholder(e.target.value)} aria-label="Placeholder" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ minHeight: open ? 190 : undefined, alignItems: "flex-start" }}>
          <div className={s.ocombo}>
            <span className={s.inWrap}>
              <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center" }}>
                {q ? <span>{q}</span> : <span className={s.oddPlaceholder}>{placeholder}</span>}
              </span>
            </span>
            {open && (
              <div className={s.omenu} role="listbox">
                {results.length === 0
                  ? <div className={s.omenuEmpty}>No matches for “{q}”.</div>
                  : results.map((r, i) => (
                    <span key={r} role="option" aria-selected={i === 0} className={`${s.omenuOpt} ${i === 0 ? s.omenuActive : ""}`}>{hi(r)}</span>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Combobox</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
