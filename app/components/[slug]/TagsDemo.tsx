"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Editable", "Removable", "Static"] as const;
const X = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function TagsDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Editable");
  const [tags, setTags] = useState(["design", "tokens", "figma"]);
  const [draft, setDraft] = useState("");
  const [pool, setPool] = useState(["React", "Angular", "HTML", "Vue"]);

  const add = () => {
    const v = draft.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setDraft("");
  };

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Tags examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Editable" && (
          <>
            <div className={s.subLabel}>Type and press Enter — Backspace removes the last</div>
            <div className={s.tagField}>
              {tags.map((t) => (
                <span key={t} className={s.otag}>
                  {t}
                  <button type="button" className={s.otagX} aria-label={`Remove ${t}`} onClick={() => setTags(tags.filter(x => x !== t))}><X /></button>
                </span>
              ))}
              <input
                className={s.tagInput}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); add(); }
                  if (e.key === "Backspace" && !draft && tags.length) setTags(tags.slice(0, -1));
                }}
                placeholder={tags.length ? "Add tag…" : "Add a tag"}
                aria-label="Add tag"
              />
            </div>
          </>
        )}
        {tab === "Removable" && (
          <>
            <div className={s.subLabel}>Click × to remove</div>
            <div className={s.btnRow} style={{ gap: 8, flexWrap: "wrap" }}>
              {pool.map((t) => (
                <span key={t} className={`${s.otag} ${t === "React" ? s.otagWarm : ""}`}>
                  {t}
                  <button type="button" className={s.otagX} aria-label={`Remove ${t}`} onClick={() => setPool(pool.filter(x => x !== t))}><X /></button>
                </span>
              ))}
              {pool.length === 0 && <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setPool(["React", "Angular", "HTML", "Vue"])}>Reset</button>}
            </div>
          </>
        )}
        {tab === "Static" && (
          <>
            <div className={s.subLabel}>Read-only labels</div>
            <div className={s.btnRow} style={{ gap: 8, flexWrap: "wrap" }}>
              {["accessibility", "tokens", "react", "angular", "motion"].map((t) => (
                <span key={t} className={`${s.otag} ${s.otagStatic}`}>{t}</span>
              ))}
            </div>
            <div className={s.subLabel}>Tones</div>
            <div className={s.btnRow} style={{ gap: 8, flexWrap: "wrap" }}>
              <span className={`${s.otag} ${s.otagStatic}`}>neutral</span>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagWarm}`}>warm</span>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagSuccess}`}>success</span>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagInfo}`}>info</span>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagDanger}`}>danger</span>
            </div>
            <div className={s.subLabel}>Sizes — S · M · L</div>
            <div className={s.btnRow} style={{ gap: 8, alignItems: "center" }}>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagSm}`}>small</span>
              <span className={`${s.otag} ${s.otagStatic}`}>medium</span>
              <span className={`${s.otag} ${s.otagStatic} ${s.otagLg}`}>large</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
