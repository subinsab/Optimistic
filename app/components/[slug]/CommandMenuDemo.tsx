"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Palette", "Filtering", "Grouped"] as const;
const SearchIcon = () => (<svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const gi = (d: string) => (<svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const CMDS = [
  { group: "Navigation", label: "Go to Overview", kbd: "G O", icon: gi("M3 8l6-5 6 5M5 7v8h8V7") },
  { group: "Navigation", label: "Go to Projects", kbd: "G P", icon: gi("M3 4h4l1 2h7v8H3z") },
  { group: "Navigation", label: "Go to Settings", kbd: "G S", icon: gi("M9 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M9 2v2M9 14v2M2 9h2M14 9h2") },
  { group: "Actions", label: "New project", kbd: "N", icon: gi("M9 4v10M4 9h10") },
  { group: "Actions", label: "Invite teammate", icon: gi("M6 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M2 15c0-2.5 2-4 4-4s4 1.5 4 4M13 6v4M11 8h4") },
  { group: "Actions", label: "Copy current URL", kbd: "⌘C", icon: gi("M7 7h6v6H7zM4 11V5a1 1 0 0 1 1-1h6") },
  { group: "Help", label: "Read the docs", icon: gi("M4 3h6l3 3v9H4zM10 3v3h3") },
];

function Palette({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const results = useMemo(() => CMDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())), [q]);
  const groups = useMemo(() => [...new Set(results.map((r) => r.group))], [results]);
  useEffect(() => setActive(0), [q]);
  const flat = results;
  return (
    <div className={s.ocmd}>
      <div className={s.ocmdSearch}>
        <SearchIcon />
        <input ref={ref} className={s.ocmdInput} value={q} placeholder="Type a command or search…" aria-label="Command"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          }} />
        <span className={s.ocmdEsc}>ESC</span>
      </div>
      <div className={s.ocmdList} role="listbox">
        {flat.length === 0
          ? <div className={s.ocmdEmpty}>No commands match “{q}”.</div>
          : groups.map((g) => (
            <div key={g}>
              <div className={s.ocmdGroup}>{g}</div>
              {results.filter((r) => r.group === g).map((c) => {
                const idx = flat.indexOf(c);
                return (
                  <button key={c.label} type="button" role="option" aria-selected={idx === active}
                    className={`${s.ocmdItem} ${idx === active ? s.ocmdActive : ""}`} onMouseEnter={() => setActive(idx)}>
                    <span className={s.ocmdItemIcon}>{c.icon}</span>{c.label}{c.kbd && <span className={s.ocmdKbd}>{c.kbd}</span>}
                  </button>
                );
              })}
            </div>
          ))}
      </div>
      <div className={s.ocmdFoot}><span>↑↓ to navigate</span><span>↵ to select</span><span>esc to close</span></div>
    </div>
  );
}

export default function CommandMenuDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Palette");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Command menu examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Palette" && (<><div className={s.subLabel}>The ⌘K palette — search, arrow keys, groups</div><Palette /></>)}
        {tab === "Filtering" && (<><div className={s.subLabel}>Type to filter across every command</div><Palette initial="go" /></>)}
        {tab === "Grouped" && (<><div className={s.subLabel}>Commands organised under mono group labels</div><Palette /></>)}
      </div>
    </div>
  );
}
