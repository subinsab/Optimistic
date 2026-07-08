"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* production code, one tab per target — HTML, CSS, React, Angular */

export default function CodeTabs({ tabs }: { tabs: { label: string; code: string }[] }) {
  const [tab, setTab] = useState(0);
  return (
    <div className={s.codeBlock}>
      <div className={s.demoTabs} role="tablist" aria-label="Code targets">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={tab === i}
            className={`${s.demoTab} ${tab === i ? s.demoTabOn : ""}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <pre key={tab}>{tabs[tab].code}</pre>
    </div>
  );
}
