"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SELECT = ["Single", "Multiple"] as const;
const MEDIA = ["None", "Icon"] as const;
const STATES = ["Default", "Selected", "Disabled"] as const;

const Bolt = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>);

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

export default function ChoiceboxConfigurator() {
  const [select, setSelect] = useState("Single");
  const [media, setMedia] = useState("None");
  const [state, setState] = useState("Selected");
  const [title, setTitle] = useState("Pro");
  const on = state === "Selected";
  const disabled = state === "Disabled";
  const multi = select === "Multiple";
  const mark = multi
    ? <span aria-hidden="true" className={`${s.ochk} ${s.chkM} ${on ? s.ochkOn : ""}`} />
    : <span aria-hidden="true" className={`${s.oradio} ${s.rdM} ${on ? s.oradioOn : ""}`} />;
  const props = [
    multi ? `multiple` : "",
    media === "Icon" ? "icon={<Bolt />}" : "",
    on ? "checked" : "",
    disabled ? "disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Selection" options={SELECT} value={select} onPick={setSelect} />
        <Chips label="Media" options={MEDIA} value={media} onPick={setMedia} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        <div className={s.configGroup}><span className={s.configLabel}>Title</span><input className={s.configInput} value={title} maxLength={20} onChange={(e) => setTitle(e.target.value)} aria-label="Title" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={`${s.ochoice} ${on ? s.ochoiceOn : ""} ${disabled ? s.ochoiceDisabled : ""}`} style={{ maxWidth: 260, cursor: disabled ? "not-allowed" : "pointer" }}>
            {media === "Icon" ? <span className={s.ochoiceIcon}><Bolt /></span> : <span className={s.ochoiceMark}>{mark}</span>}
            <span className={s.ochoiceBody}><span className={s.ochoiceTitle}>{title || "Option"}</span><span className={s.ochoiceDesc}>For growing teams and shared systems.</span></span>
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Choicebox</b> {props}{">"}{title || "Option"}{"</"}<b>Choicebox</b>{">"}</div>
      </div>
    </div>
  );
}
