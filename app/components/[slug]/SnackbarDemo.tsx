"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Variants", "With action", "Live"] as const;
const Check = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Err = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v5M10 13.6v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const Info = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9v5M10 6.4v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const X = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

function Snack({ tone, icon, children, action, onClose }: { tone: string; icon: React.ReactNode; children: React.ReactNode; action?: string; onClose?: () => void }) {
  return (
    <div className={`${s.osnack} ${tone}`} role="status">
      <span className={s.osnackIcon}>{icon}</span>
      <span className={s.osnackText}>{children}</span>
      {action && <button type="button" className={s.osnackAction}>{action}</button>}
      <button type="button" className={s.osnackClose} aria-label="Dismiss" onClick={onClose}><X /></button>
    </div>
  );
}

export default function SnackbarDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Variants");
  const [live, setLive] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const show = () => {
    setLive(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLive(false), 4000);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Snackbar examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Variants" && (
          <>
            <div className={s.subLabel}>Success, error and info · brief and non-blocking</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Snack tone={s.osnackSuccess} icon={<Check />}>Changes saved.</Snack>
              <Snack tone={s.osnackError} icon={<Err />}>Couldn&apos;t save. Try again.</Snack>
              <Snack tone={s.osnackInfo} icon={<Info />}>A new version is available.</Snack>
            </div>
          </>
        )}
        {tab === "With action" && (
          <>
            <div className={s.subLabel}>One inline action, like Undo</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Snack tone={s.osnackSuccess} icon={<Check />} action="Undo">Message archived.</Snack>
              <Snack tone={s.osnackInfo} icon={<Info />} action="View">Report is ready to download.</Snack>
            </div>
          </>
        )}
        {tab === "Live" && (
          <>
            <div className={s.subLabel}>Trigger one · it auto-dismisses after 4s</div>
            <div className={s.btnRow} style={{ gap: 14 }}>
              <button className={`${s.obtn} ${s.m} ${s.vWarm}`} onClick={show}>Save changes</button>
              <span className={s.stateBadge}>{live ? "showing…" : "idle"}</span>
            </div>
            <div style={{ marginTop: 16, minHeight: 48 }}>
              {live && <Snack tone={s.osnackSuccess} icon={<Check />} action="Undo" onClose={() => setLive(false)}>Changes saved.</Snack>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
