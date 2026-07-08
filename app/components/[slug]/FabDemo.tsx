"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Standard", "Extended", "Speed dial"] as const;
const Plus = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
const mini = (d: string) => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);

export default function FabDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Standard");
  const [open, setOpen] = useState(false);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="FAB examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "Speed dial" ? { minHeight: 230 } : undefined}>
        {tab === "Standard" && (
          <>
            <div className={s.subLabel}>One warm circle for a screen&apos;s primary verb — two sizes</div>
            <div className={s.btnRow} style={{ gap: 24, alignItems: "center" }}>
              <button className={`${s.ofab} ${s.ofabSm}`} aria-label="Add"><Plus /></button>
              <button className={s.ofab} aria-label="Add"><Plus /></button>
            </div>
          </>
        )}
        {tab === "Extended" && (
          <>
            <div className={s.subLabel}>A labelled pill for the first-run, empty or wide layout</div>
            <div className={s.btnRow}>
              <button className={`${s.ofab} ${s.ofabExt}`}><Plus /> New project</button>
            </div>
          </>
        )}
        {tab === "Speed dial" && (
          <>
            <div className={s.subLabel}>Tap to fan out related actions — {open ? "open" : "closed"}</div>
            <div className={s.ofabStack}>
              {open && (
                <div className={s.ofabMinis}>
                  <span className={s.ofabMiniRow}><button className={s.ofabMini} aria-label="New doc">{mini("M5 3h6l4 4v10H5zM11 3v4h4")}</button><span className={s.ofabMiniLabel}>New doc</span></span>
                  <span className={s.ofabMiniRow}><button className={s.ofabMini} aria-label="Upload">{mini("M10 13V4m0 0L6.5 7.5M10 4l3.5 3.5M4 15h12")}</button><span className={s.ofabMiniLabel}>Upload</span></span>
                  <span className={s.ofabMiniRow}><button className={s.ofabMini} aria-label="Invite">{mini("M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 16c0-2.5 1.8-4 4-4s4 1.5 4 4M14 7v4M12 9h4")}</button><span className={s.ofabMiniLabel}>Invite</span></span>
                </div>
              )}
              <button className={`${s.ofab} ${open ? s.ofabOpen : ""}`} aria-expanded={open} aria-label="Actions" onClick={() => setOpen((o) => !o)}><Plus /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
