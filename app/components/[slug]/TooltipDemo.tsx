"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* live Tooltip specimen — pure CSS on hover and keyboard focus.
   Tab to a trigger and the tooltip appears just the same. */

const TABS = ["Placement", "Use cases"] as const;

function Tip({ label, place, children }: { label: string; place: string; children: React.ReactNode }) {
  return (
    <span className={s.otipWrap} tabIndex={-1}>
      {children}
      <span className={`${s.otip} ${s[place as keyof typeof s]}`} role="tooltip">{label}</span>
    </span>
  );
}

function IconBtn({ path }: { path: string }) {
  return (
    <span className={`${s.obtn} ${s.iconOnly} ${s.m} ${s.vGhost}`} tabIndex={0} role="button">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function TooltipDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Placement");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Tooltip examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} style={{ padding: 0 }} key={tab}>
        <div className={s.ovStage}>
          <div className={s.ovStageContent} style={{ gap: 22 }}>
            {tab === "Placement" && (
              <>
                <span className={s.ovHint}>Hover or Tab to a button</span>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
                  <Tip label="Opens above" place="otipTop"><span className={`${s.obtn} ${s.sm} ${s.vGhost}`} tabIndex={0} role="button">Top</span></Tip>
                  <Tip label="Opens below" place="otipBottom"><span className={`${s.obtn} ${s.sm} ${s.vGhost}`} tabIndex={0} role="button">Bottom</span></Tip>
                  <Tip label="Opens left" place="otipLeft"><span className={`${s.obtn} ${s.sm} ${s.vGhost}`} tabIndex={0} role="button">Left</span></Tip>
                  <Tip label="Opens right" place="otipRight"><span className={`${s.obtn} ${s.sm} ${s.vGhost}`} tabIndex={0} role="button">Right</span></Tip>
                </div>
              </>
            )}

            {tab === "Use cases" && (
              <>
                <span className={s.ovHint}>Where a tooltip earns its keep</span>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                  <Tip label="Duplicate" place="otipTop"><IconBtn path="M5.5 5.5V4a1 1 0 011-1H12a1 1 0 011 1v5.5a1 1 0 01-1 1h-1.5M3 6.5h5.5a1 1 0 011 1V13a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5a1 1 0 011-1z" /></Tip>
                  <Tip label="Publishing needs review access" place="otipBottom"><span className={`${s.obtn} ${s.sm} ${s.vPrimary}`} style={{ opacity: 0.38 }} tabIndex={0} role="button">Publish</span></Tip>
                  <Tip label="Synced 2 minutes ago" place="otipTop">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#cfd3da", fontSize: "0.82rem" }} tabIndex={0}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#30a46c" }} /> Live
                    </span>
                  </Tip>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#cfd3da", fontSize: "0.82rem" }}>
                    Plan
                    <Tip label="Tokens compile to every framework" place="otipTop">
                      <span style={{ display: "inline-grid", placeItems: "center", width: 18, height: 18, color: "#767b87", cursor: "help" }} tabIndex={0} aria-label="More info">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" /><path d="M8 7.2v3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="5.1" r="0.85" fill="currentColor" /></svg>
                      </span>
                    </Tip>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
