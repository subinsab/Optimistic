"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Inline", "Standalone", "External"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Ext = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3h7v7M13 3L6 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function LinkDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Inline");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Link examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Inline" && (
          <>
            <div className={s.subLabel}>Reads as text, underlined so it can be found</div>
            <p className={s.olinkProse}>
              Optimism is a stance, not a mood. Read the{" "}
              <a href="#" onClick={noNav} className={s.olink}>design principles</a>{" "}
              to see how it shapes every decision, or skip to the{" "}
              <a href="#" onClick={noNav} className={`${s.olink} ${s.olinkQuiet}`}>changelog</a>{" "}
              for the quiet, secondary trail.
            </p>
          </>
        )}
        {tab === "Standalone" && (
          <>
            <div className={s.subLabel}>A call to action with a nudging arrow</div>
            <div className={s.btnRow} style={{ gap: 24 }}>
              <a href="#" onClick={noNav} className={`${s.olink} ${s.olinkStandalone}`}>Browse all components<Arrow /></a>
              <a href="#" onClick={noNav} className={`${s.olink} ${s.olinkStandalone} ${s.olinkQuiet}`}>Read the docs<Arrow /></a>
            </div>
          </>
        )}
        {tab === "External" && (
          <>
            <div className={s.subLabel}>Leaves the site — marked and safe by default</div>
            <div className={s.btnRow} style={{ gap: 24 }}>
              <a href="#" onClick={noNav} className={`${s.olink} ${s.olinkStandalone} ${s.olinkExternal}`} rel="noreferrer">Open the Figma file<Ext /></a>
              <a href="#" onClick={noNav} className={`${s.olink} ${s.olinkExternal}`} rel="noreferrer">github.com/optimistic<Ext /></a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
