"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Line", "Pill", "Enclosed"] as const;
const VIEWS = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity", count: 3 },
  { id: "settings", label: "Settings" },
  { id: "archived", label: "Archived", disabled: true },
];
const COPY: Record<string, string> = {
  overview: "The overview panel. Peer views share one region — only this panel is mounted, the others stay one click away.",
  activity: "Three new events since you last looked. The count rides in the tab so it reads before you switch.",
  settings: "Settings for this view. Switching tabs never navigates away or loses your place on the page.",
  archived: "",
};

function TabRow({ style, active, onPick }: { style: string; active: string; onPick: (id: string) => void }) {
  const wrap = style === "Line" ? s.otabsLine : style === "Pill" ? s.otabsPill : s.otabsEnclosed;
  return (
    <div className={`${s.otabs} ${wrap}`} role="tablist" aria-label="Views">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          role="tab"
          aria-selected={active === v.id}
          disabled={v.disabled}
          className={`${s.otab} ${active === v.id ? s.otabOn : ""}`}
          onClick={() => !v.disabled && onPick(v.id)}
        >
          {v.label}
          {v.count != null && <span className={s.otabCount}>{v.count}</span>}
        </button>
      ))}
    </div>
  );
}

export default function TabsDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Line");
  const [active, setActive] = useState("overview");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Tabs styles">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        <div className={s.subLabel}>Click a view — the panel follows</div>
        <TabRow style={tab} active={active} onPick={setActive} />
        <div className={s.otabPanel} role="tabpanel">{COPY[active]}</div>
      </div>
    </div>
  );
}
