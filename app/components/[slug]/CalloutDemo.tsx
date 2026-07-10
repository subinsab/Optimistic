"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Variants", "With action", "Dismissible"] as const;

export const CoIcon = ({ kind }: { kind: string }) => {
  const p = { width: 18, height: 18, viewBox: "0 0 20 20", fill: "none" as const, "aria-hidden": true };
  if (kind === "coSuccess") return <svg {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" /><path d="M6.5 10l2.2 2.2L14 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (kind === "coError") return <svg {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" /><path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
  if (kind === "coWarn") return <svg {...p}><path d="M10 2.5 18.5 17H1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8v3.5M10 14v.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
  return <svg {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" /><path d="M10 9v4.5M10 6.5v.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
};

function Callout({ kind, title, children, onClose, action }: { kind: string; title: string; children: React.ReactNode; onClose?: () => void; action?: boolean }) {
  return (
    <div className={`${s.ocallout} ${s[kind as keyof typeof s]}`} role="status">
      <span className={s.coIcon}><CoIcon kind={kind} /></span>
      <div className={s.coBody}>
        <span className={s.coTitle}>{title}</span>
        <span className={s.coText}>{children}</span>
        {action && <span className={s.coActions}><button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Retry</button><button className={`${s.obtn} ${s.sm} ${s.vQuiet}`}>Dismiss</button></span>}
      </div>
      {onClose && <button className={s.coClose} aria-label="Dismiss" onClick={onClose}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></button>}
    </div>
  );
}

export default function CalloutDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Variants");
  const [open, setOpen] = useState(true);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Callout examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Variants" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Callout kind="coInfo" title="Heads up">Design Tokens are the source of truth. Change them once and every surface follows.</Callout>
            <Callout kind="coSuccess" title="Saved">Your changes are in sync across all nine platforms.</Callout>
            <Callout kind="coWarn" title="Approaching your limit">You have used 92% of this month&apos;s builds.</Callout>
            <Callout kind="coError" title="Sync failed">The last publish could not reach two platforms.</Callout>
          </div>
        )}
        {tab === "With action" && (
          <Callout kind="coError" title="Payment declined" action>Your card was declined. Update your billing details to keep shipping.</Callout>
        )}
        {tab === "Dismissible" && (
          open ? (
            <Callout kind="coInfo" title="New in v3.2" onClose={() => setOpen(false)}>Optimistic updates are on by default. Read the migration notes.</Callout>
          ) : (
            <button className={`${s.obtn} ${s.m} ${s.vGhost}`} onClick={() => setOpen(true)}>Bring it back</button>
          )
        )}
      </div>
    </div>
  );
}
