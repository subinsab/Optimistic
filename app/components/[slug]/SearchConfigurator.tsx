"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SIZES = ["L", "M", "S"] as const;
const CLEAR = ["Off", "On"] as const;
const SHORTCUT = ["Off", "On"] as const;
const SCLASS: Record<string, string> = { L: "inL", M: "inM", S: "inS" };
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const X = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

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

export default function SearchConfigurator() {
  const [size, setSize] = useState("M");
  const [clear, setClear] = useState("On");
  const [shortcut, setShortcut] = useState("Off");
  const [text, setText] = useState("button");
  const hasClear = clear === "On" && !!text;
  const hasKbd = shortcut === "On" && !text;
  const cls = `${s.oinput} ${s[SCLASS[size] as keyof typeof s]} ${s.inHasIcon} ${hasClear ? s.inHasAffix : ""}`;
  const props = [`size="${size.toLowerCase()}"`, clear === "On" ? "clearable" : "", shortcut === "On" ? `shortcut="/"` : "", `placeholder="Search…"`].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Clear button" options={CLEAR} value={clear} onPick={setClear} />
        <Chips label="Shortcut" options={SHORTCUT} value={shortcut} onPick={setShortcut} />
        <div className={s.configGroup}><span className={s.configLabel}>Query</span><input className={s.configInput} value={text} maxLength={24} onChange={(e) => setText(e.target.value)} aria-label="Query" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.osearch}>
            <span className={s.inWrap}>
              <span className={s.inIcon}><SearchIcon /></span>
              <input className={cls} value={text} placeholder="Search…" type="search" aria-label="Search" onChange={(e) => setText(e.target.value)} />
              {hasClear && <button type="button" className={`${s.inAffix} ${s.inAffixBtn}`} aria-label="Clear" onClick={() => setText("")}><X /></button>}
              {hasKbd && <span className={s.osearchKbd}>/</span>}
            </span>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Search</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
