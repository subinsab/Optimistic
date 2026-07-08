"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Horizontal", "With label", "Vertical"] as const;

export default function DividerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Horizontal");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Divider examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Horizontal" && (
          <>
            <div className={s.subLabel}>A one-pixel hairline between blocks</div>
            <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 16 }}>
              <span className={s.olistDesc} style={{ whiteSpace: "normal" }}>Content above the line.</span>
              <hr className={s.odiv} />
              <span className={s.olistDesc} style={{ whiteSpace: "normal" }}>Content below the line.</span>
              <div className={s.subLabel} style={{ margin: "8px 0 0" }}>Dashed variant</div>
              <hr className={`${s.odiv} ${s.odivDashed}`} />
            </div>
          </>
        )}
        {tab === "With label" && (
          <>
            <div className={s.subLabel}>A label splits the rule — for “or” and section breaks</div>
            <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 20 }}>
              <div className={s.odivLabel}>Or</div>
              <div className={s.odivLabel}>Continue below</div>
              <div className={s.odivLabel} style={{ justifyContent: "flex-start" }}><span style={{ flex: "none" }}>Recent</span></div>
            </div>
          </>
        )}
        {tab === "Vertical" && (
          <>
            <div className={s.subLabel}>A vertical rule between inline items</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9aa0a8", fontSize: "0.85rem" }}>
              <span>Edit</span>
              <span className={s.odivVert} />
              <span>Duplicate</span>
              <span className={s.odivVert} />
              <span>Share</span>
              <span className={s.odivVert} />
              <span>Delete</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
