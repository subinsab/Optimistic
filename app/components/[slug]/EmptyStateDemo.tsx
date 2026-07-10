"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["No data", "No results", "404", "Error", "First run"] as const;

const Box = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3l10 5.5v11L14 25 4 19.5v-11L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 8.5l10 5.5 10-5.5M14 14v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>);
const Search = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" /><path d="M17.5 17.5L24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Ghost = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M6 24V12a8 8 0 0 1 16 0v12l-2.7-2-2.6 2-2.7-2-2.7 2-2.6-2L6 24z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="11" cy="11" r="1" fill="currentColor" /><circle cx="17" cy="11" r="1" fill="currentColor" /></svg>);
const Warn = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 4l11 19H3L14 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 12v5M14 19.6v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const Spark = () => (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3l2.5 7L24 12.5 16.5 15 14 22l-2.5-7L4 12.5 11.5 10 14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>);

const STATES: Record<string, { icon: React.ReactNode; tone?: string; code?: string; title: string; text: string; primary?: string; secondary?: string }> = {
  "No data": { icon: <Box />, title: "No projects yet", text: "Projects you create will show up here. Start one to see it appear.", primary: "New project" },
  "No results": { icon: <Search />, title: "No matches for “buttn”", text: "Check the spelling, or try a broader search across all components.", secondary: "Clear search" },
  "404": { icon: <Ghost />, code: "Error 404", title: "This page wandered off", text: "The page you’re after doesn’t exist or has moved. Let’s get you back.", primary: "Back to home", secondary: "Contact support" },
  "Error": { icon: <Warn />, tone: "err", code: "Error 500", title: "Something went wrong", text: "We hit a snag loading this. It’s on us — try again in a moment.", primary: "Retry", secondary: "Report" },
  "First run": { icon: <Spark />, tone: "warm", title: "Welcome to Optimistic", text: "Your workspace is ready. Invite your team or drop in your first design token to begin.", primary: "Invite team", secondary: "Take the tour" },
};

export default function EmptyStateDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("No data");
  const st = STATES[tab];
  const iconTone = st.tone === "warm" ? s.oemptyIconWarm : st.tone === "err" ? s.oemptyIconErr : "";
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Empty state examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        <div className={s.oemptyStage}>
          <div className={s.oempty}>
            <span className={`${s.oemptyIcon} ${iconTone}`}>{st.icon}</span>
            {st.code && <span className={s.oemptyCode}>{st.code}</span>}
            <span className={s.oemptyTitle}>{st.title}</span>
            <span className={s.oemptyText}>{st.text}</span>
            <div className={s.oemptyActions}>
              {st.secondary && <button className={`${s.obtn} ${s.m} ${s.vGhost}`}>{st.secondary}</button>}
              {st.primary && <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>{st.primary}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
