"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TONE = ["Success", "Error", "Info", "Warn"] as const;
const ACTION = ["None", "Undo", "View"] as const;
const CLOSE = ["With", "Without"] as const;
const TC: Record<string, string> = { Success: "osnackSuccess", Error: "osnackError", Info: "osnackInfo", Warn: "osnackWarn" };
const Check = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Err = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v5M10 13.6v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const Info = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9v5M10 6.4v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const X = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

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

export default function SnackbarConfigurator() {
  const [tone, setTone] = useState("Success");
  const [action, setAction] = useState("Undo");
  const [close, setClose] = useState("With");
  const [text, setText] = useState("Changes saved.");
  const icon = tone === "Error" ? <Err /> : tone === "Info" || tone === "Warn" ? <Info /> : <Check />;
  const props = [`variant="${tone.toLowerCase()}"`, action !== "None" ? `action="${action}"` : "", close === "Without" ? "" : "dismissible", "duration={4000}"].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={TONE} value={tone} onPick={setTone} />
        <Chips label="Action" options={ACTION} value={action} onPick={setAction} />
        <Chips label="Close" options={CLOSE} value={close} onPick={setClose} />
        <div className={s.configGroup}><span className={s.configLabel}>Message</span><input className={s.configInput} value={text} maxLength={40} onChange={(e) => setText(e.target.value)} aria-label="Message" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.osnack} ${s[TC[tone] as keyof typeof s]}`} role="status">
            <span className={s.osnackIcon}>{icon}</span>
            <span className={s.osnackText}>{text || "Message"}</span>
            {action !== "None" && <button type="button" className={s.osnackAction}>{action}</button>}
            {close === "With" && <button type="button" className={s.osnackClose} aria-label="Dismiss"><X /></button>}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Snackbar</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
