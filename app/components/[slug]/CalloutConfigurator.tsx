"use client";

import { useState } from "react";
import { CoIcon } from "./CalloutDemo";
import s from "../docs.module.css";

const VARIANTS = ["Info", "Success", "Warning", "Error"] as const;
const EXTRAS = ["None", "Action", "Dismiss"] as const;
const VC: Record<string, string> = { Info: "coInfo", Success: "coSuccess", Warning: "coWarn", Error: "coError" };

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

export default function CalloutConfigurator() {
  const [variant, setVariant] = useState("Warning");
  const [extra, setExtra] = useState("Action");
  const [title, setTitle] = useState("Approaching your limit");
  const kind = VC[variant];
  const props = [`variant="${variant.toLowerCase()}"`, title ? `title="${title}"` : "", extra === "Action" ? "action" : "", extra === "Dismiss" ? "dismissible" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANTS} value={variant} onPick={setVariant} />
        <Chips label="Extras" options={EXTRAS} value={extra} onPick={setExtra} />
        <div className={s.configGroup}><span className={s.configLabel}>Title</span><input className={s.configInput} value={title} maxLength={32} onChange={(e) => setTitle(e.target.value)} aria-label="Title" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.ocallout} ${s[kind as keyof typeof s]}`} role="status" style={{ maxWidth: 380 }}>
            <span className={s.coIcon}><CoIcon kind={kind} /></span>
            <div className={s.coBody}>
              {title && <span className={s.coTitle}>{title}</span>}
              <span className={s.coText}>A short line of guidance goes here.</span>
              {extra === "Action" && <span className={s.coActions}><button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Action</button></span>}
            </div>
            {extra === "Dismiss" && <button className={s.coClose} aria-label="Dismiss"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></button>}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Callout</b> {props}{" />"}</div>
      </div>
    </div>
  );
}
