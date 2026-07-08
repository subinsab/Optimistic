"use client";

import { useState } from "react";
import s from "../docs.module.css";

const ICONS = ["With", "Without"] as const;
const SHORTCUT = ["On", "Off"] as const;
const DANGER = ["With", "Without"] as const;
const Edit = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2L6 12l-2.5.5L4 10l7.5-7.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>);
const Copy = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 10V4a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.4" /></svg>);
const Trash = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.5 8h6l.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

export default function MenuConfigurator() {
  const [icons, setIcons] = useState("With");
  const [shortcut, setShortcut] = useState("On");
  const [danger, setDanger] = useState("With");
  const ic = icons === "With";
  const kbd = shortcut === "On";
  const props = [ic ? "icons" : "", kbd ? "shortcuts" : "", danger === "With" ? "danger" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Icons" options={ICONS} value={icons} onPick={setIcons} />
        <Chips label="Shortcuts" options={SHORTCUT} value={shortcut} onPick={setShortcut} />
        <Chips label="Danger row" options={DANGER} value={danger} onPick={setDanger} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.omenu} ${s.omenuStandalone}`} role="menu" style={{ minWidth: 200 }}>
            <span className={s.omenuOpt}>{ic && <span className={s.omenuIcon}><Edit /></span>}Edit{kbd && <span className={s.omenuKbd}>E</span>}</span>
            <span className={s.omenuOpt}>{ic && <span className={s.omenuIcon}><Copy /></span>}Duplicate{kbd && <span className={s.omenuKbd}>⌘D</span>}</span>
            {danger === "With" && <span className={s.omenuDivider} />}
            {danger === "With" && <span className={`${s.omenuOpt} ${s.omenuOptDanger}`}>{ic && <span className={s.omenuIcon}><Trash /></span>}Delete{kbd && <span className={s.omenuKbd}>⌫</span>}</span>}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Menu</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
