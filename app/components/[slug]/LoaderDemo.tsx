"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Spinner", "Dots", "In context"] as const;

export default function LoaderDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Spinner");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Loader examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Spinner" && (
          <>
            <div className={s.subLabel}>A warm-tipped ring — three sizes</div>
            <div className={s.btnRow} style={{ gap: 28, alignItems: "center" }}>
              <span className={`${s.oloader} ${s.oloaderSm}`} role="status" aria-label="Loading" />
              <span className={s.oloader} role="status" aria-label="Loading" />
              <span className={`${s.oloader} ${s.oloaderLg}`} role="status" aria-label="Loading" />
            </div>
            <div className={s.subLabel}>With a label</div>
            <span className={s.oloaderRow} role="status"><span className={s.oloader} /> Loading your workspace…</span>
          </>
        )}
        {tab === "Dots" && (
          <>
            <div className={s.subLabel}>Three bouncing dots for a lighter wait</div>
            <div className={s.btnRow} style={{ gap: 28, alignItems: "center" }}>
              <span className={s.oloaderDots} role="status" aria-label="Loading"><span /><span /><span /></span>
              <span className={s.oloaderRow} role="status"><span className={s.oloaderDots}><span /><span /><span /></span> Thinking…</span>
            </div>
          </>
        )}
        {tab === "In context" && (
          <>
            <div className={s.subLabel}>Inside a button, and as a panel overlay</div>
            <div className={s.btnRow} style={{ gap: 16 }}>
              <button className={`${s.obtn} ${s.m} ${s.vWarm}`} disabled><span className={`${s.oloader} ${s.oloaderSm}`} style={{ borderTopColor: "#1a0e04", borderColor: "rgba(26,14,4,0.3)", borderTopWidth: 2 }} /> Saving…</button>
              <button className={`${s.obtn} ${s.m} ${s.vGhost}`} disabled><span className={`${s.oloader} ${s.oloaderSm}`} /> Loading</button>
            </div>
            <div className={s.oloaderOverlay} style={{ marginTop: 16 }}>
              <span className={s.oloaderRow} role="status"><span className={s.oloaderLg} /> Fetching results…</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
