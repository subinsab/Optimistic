"use client";

import { useState } from "react";
import s from "../docs.module.css";

const LEADING = ["Avatar", "Icon", "Dot"] as const;
const TRAILING = ["Badge", "Value", "Chevron"] as const;
const DESC = ["With", "Without"] as const;
const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Dot = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>);

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

export default function ListConfigurator() {
  const [leading, setLeading] = useState("Avatar");
  const [trailing, setTrailing] = useState("Badge");
  const [desc, setDesc] = useState("With");
  const props = [`leading={<${leading} />}`, desc === "With" ? `description="…"` : "", `trailing={<${trailing} />}`].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Leading" options={LEADING} value={leading} onPick={setLeading} />
        <Chips label="Trailing" options={TRAILING} value={trailing} onPick={setTrailing} />
        <Chips label="Description" options={DESC} value={desc} onPick={setDesc} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.olist} style={{ maxWidth: 320 }}>
            <div className={s.olistRow}>
              {leading === "Avatar" && <span className={s.olistLead}><span className={s.olistAvatar}>AL</span></span>}
              {leading === "Icon" && <span className={s.olistLead}><Dot /></span>}
              {leading === "Dot" && <span className={s.olistLead}><span className={`${s.oind} ${s.oindOnline}`} /></span>}
              <span className={s.olistBody}>
                <span className={s.olistTitle}>Ada Lovelace</span>
                {desc === "With" && <span className={s.olistDesc}>Design Lead</span>}
              </span>
              {trailing === "Badge" && <span className={s.olistTrail}><span className={`${s.obadge} ${s.bgSuccess}`}>PAID</span></span>}
              {trailing === "Value" && <span className={s.olistTrail}><span className={s.olistValue}>$1,200</span></span>}
              {trailing === "Chevron" && <span className={s.olistTrail}><Chevron /></span>}
            </div>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>List.Row</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
