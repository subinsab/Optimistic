"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { Illustration, SCENES, SCENE_NAMES, SIZE_STEPS } from "./illustrationScenes";

const TABS = ["Gallery", "Sizes", "Empty state"] as const;

export default function IllustrationDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Gallery");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Illustration examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Gallery" && (
          <>
            <div className={s.subLabel}>{SCENE_NAMES.length} single-colour line scenes for generic empty, error &amp; success states</div>
            <div className={s.oillGallery}>
              {SCENE_NAMES.map((n) => (
                <div key={n} className={s.oillCard}>
                  <Illustration name={n} size={104} />
                  <span className={s.oillName}>{n}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Three steps — 80 · 120 · 160px, one 200-unit scene</div>
            <div className={s.oillRow}>
              {SIZE_STEPS.map((px) => (
                <div key={px} className={s.oillSizeCell}>
                  <Illustration name="no-results" size={px} />
                  <span className={s.oillName}>{px}px</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Empty state" && (
          <>
            <div className={s.subLabel}>An illustration anchors a first-run or zero-data moment</div>
            <div className={s.oillEmpty}>
              <Illustration name="empty" size={132} />
              <div className={s.oillEmptyTitle}>No projects yet</div>
              <div className={s.oillEmptyText}>Your projects will show up here. Create your first to get started.</div>
              <button className={`${s.obtn} ${s.m} ${s.vWarm}`} type="button">New project</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { SCENES };
