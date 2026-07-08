"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TONE = ["Neutral", "Warm", "Error"] as const;
const ICON = ["Box", "Search", "Warning"] as const;
const ACTIONS = ["Both", "Primary", "None"] as const;
const Box = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3l10 5.5v11L14 25 4 19.5v-11L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 8.5l10 5.5 10-5.5M14 14v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>);
const Search = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" /><path d="M17.5 17.5L24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Warn = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 4l11 19H3L14 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 12v5M14 19.6v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);

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

export default function EmptyStateConfigurator() {
  const [tone, setTone] = useState("Neutral");
  const [icon, setIcon] = useState("Box");
  const [actions, setActions] = useState("Both");
  const [title, setTitle] = useState("No projects yet");
  const iconTone = tone === "Warm" ? s.oemptyIconWarm : tone === "Error" ? s.oemptyIconErr : "";
  const Icon = icon === "Search" ? Search : icon === "Warning" ? Warn : Box;
  const props = [`title="${title}"`, tone !== "Neutral" ? `tone="${tone.toLowerCase()}"` : "", actions !== "None" ? "action" : "", actions === "Both" ? "secondaryAction" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Tone" options={TONE} value={tone} onPick={setTone} />
        <Chips label="Icon" options={ICON} value={icon} onPick={setIcon} />
        <Chips label="Actions" options={ACTIONS} value={actions} onPick={setActions} />
        <div className={s.configGroup}><span className={s.configLabel}>Title</span><input className={s.configInput} value={title} maxLength={28} onChange={(e) => setTitle(e.target.value)} aria-label="Title" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.oempty} style={{ padding: "24px 20px" }}>
            <span className={`${s.oemptyIcon} ${iconTone}`}><Icon /></span>
            <span className={s.oemptyTitle} style={{ fontSize: "0.98rem" }}>{title || "Nothing here"}</span>
            <span className={s.oemptyText} style={{ fontSize: "0.83rem" }}>A short line that says what belongs here and how to fill it.</span>
            {actions !== "None" && (
              <div className={s.oemptyActions}>
                {actions === "Both" && <button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Learn more</button>}
                <button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Get started</button>
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>EmptyState</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
