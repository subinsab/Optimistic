"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATE = ["Results", "Typing", "Empty"] as const;
const GROUPS = ["With", "Without"] as const;
const SHORTCUTS = ["On", "Off"] as const;
const SearchIcon = () => (<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const Dot = () => (<svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>);

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

export default function CommandMenuConfigurator() {
  const [state, setState] = useState("Results");
  const [groups, setGroups] = useState("With");
  const [shortcuts, setShortcuts] = useState("On");
  const q = state === "Typing" ? "new" : state === "Empty" ? "xyz" : "";
  const items = [{ g: "Navigation", l: "Go to Overview", k: "G O" }, { g: "Actions", l: "New project", k: "N" }].filter((i) => !q || i.l.toLowerCase().includes(q));
  const props = [groups === "With" ? "grouped" : "", shortcuts === "On" ? "shortcuts" : "", `placeholder="Search…"`].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATE} value={state} onPick={setState} />
        <Chips label="Groups" options={GROUPS} value={groups} onPick={setGroups} />
        <Chips label="Shortcuts" options={SHORTCUTS} value={shortcuts} onPick={setShortcuts} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ alignItems: "stretch" }}>
          <div className={s.ocmd} style={{ maxWidth: "none", boxShadow: "none" }}>
            <div className={s.ocmdSearch}><SearchIcon /><span className={s.ocmdInput} style={{ color: q ? "#e7e9ee" : "#565a62" }}>{q || "Search…"}</span><span className={s.ocmdEsc}>ESC</span></div>
            <div className={s.ocmdList}>
              {items.length === 0
                ? <div className={s.ocmdEmpty}>No commands match “{q}”.</div>
                : items.map((it, i) => (
                  <div key={it.l}>
                    {groups === "With" && <div className={s.ocmdGroup}>{it.g}</div>}
                    <span className={`${s.ocmdItem} ${i === 0 ? s.ocmdActive : ""}`}><span className={s.ocmdItemIcon}><Dot /></span>{it.l}{shortcuts === "On" && <span className={s.ocmdKbd}>{it.k}</span>}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>CommandMenu</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
