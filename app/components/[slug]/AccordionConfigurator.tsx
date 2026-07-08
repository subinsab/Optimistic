"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STYLE = ["Joined", "Separate"] as const;
const MODE = ["Single", "Multiple"] as const;
const NUM = ["With", "Without"] as const;
const Chevron = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

const ROWS = ["Getting started", "Configuration", "Billing"];

export default function AccordionConfigurator() {
  const [style, setStyle] = useState("Joined");
  const [mode, setMode] = useState("Single");
  const [num, setNum] = useState("With");
  const [open, setOpen] = useState(0);
  const wrap = style === "Separate" ? s.oaccSeparate : s.oaccJoined;
  const props = [style === "Separate" ? `variant="separate"` : `variant="joined"`, mode === "Multiple" ? "allowMultiple" : "", num === "With" ? "numbered" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Style" options={STYLE} value={style} onPick={setStyle} />
        <Chips label="Open mode" options={MODE} value={mode} onPick={setMode} />
        <Chips label="Numbers" options={NUM} value={num} onPick={setNum} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.oacc} ${wrap}`} style={{ maxWidth: 300 }}>
            {ROWS.map((q, i) => (
              <div key={q} className={`${s.oaccItem} ${open === i ? s.oaccOpen : ""}`}>
                <button type="button" className={s.oaccHead} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {num === "With" && <span className={s.oaccNum}>{String(i + 1).padStart(2, "0")}</span>}
                  {q}
                  <span className={s.oaccChevron}><Chevron /></span>
                </button>
                <div className={s.oaccBody}><div><div className={s.oaccBodyInner}>A short answer to “{q.toLowerCase()}”, revealed when the row opens.</div></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Accordion</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
