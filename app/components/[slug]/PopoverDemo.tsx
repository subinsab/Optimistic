"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* live Popover specimen — anchored to its trigger, light-dismiss (click
   outside or Escape). No scrim: the page stays fully interactive.
   Each tab positions the trigger so the panel opens into open space. */

const TABS = ["Below", "Above", "Beside", "Text"] as const;
const PLACE: Record<string, string> = { Below: "opopBottom", Above: "opopTop", Beside: "opopRight", Text: "opopBottom" };
const STAGE: Record<string, React.CSSProperties> = {
  Below: { alignItems: "flex-start", paddingTop: 40 },
  Above: { alignItems: "flex-end", paddingBottom: 40 },
  Beside: { justifyContent: "flex-start", paddingLeft: 48 },
  Text: {},
};

export default function PopoverDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Below");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isText = tab === "Text";

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Popover placement">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`}
            onClick={() => { setTab(t); setOpen(false); }}>
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} style={{ padding: 0 }} key={tab}>
        <div className={s.ovStage} style={STAGE[tab]}>
          {/* transparent catcher: click outside closes, page stays live */}
          {open && <div className={`${s.ovScrim} ${s.ovScrimOn} ${s.ovScrimBare}`} onClick={() => setOpen(false)} aria-hidden="true" />}

          <div className={s.ovStageContent} style={{ gap: 12 }}>
            <span className={s.ovHint}>{isText ? "A plain-text hint, no controls" : `Opens next to its trigger · ${tab.toLowerCase()}`}</span>
            <div className={s.opopAnchor}>
              <button
                ref={anchorRef}
                className={`${s.obtn} ${s.m} ${open ? s.vGhost : s.vPrimary}`}
                aria-expanded={open}
                aria-haspopup="dialog"
                onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
              >
                {isText ? (
                  <>What&apos;s this? <span style={{ opacity: 0.6 }}>ⓘ</span></>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Filter
                  </>
                )}
              </button>

              {isText ? (
                <div className={`${s.opop} ${s.opopBottom} ${open ? s.opopOpen : ""}`} role="dialog" aria-label="About sync" style={{ width: 240 }} onClick={(e) => e.stopPropagation()}>
                  <span className={s.opopArrow} aria-hidden="true" />
                  <div className={s.opopBody} style={{ paddingTop: 13, paddingBottom: 13 }}>
                    Every decision starts life as a Figma Variable, then compiles into the headless core. This panel is just prose — no header, no actions.
                  </div>
                </div>
              ) : (
                <div
                  className={`${s.opop} ${s[PLACE[tab] as keyof typeof s]} ${open ? s.opopOpen : ""}`}
                  role="dialog" aria-label="Filter"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={s.opopArrow} aria-hidden="true" />
                  <div className={s.opopHead}>
                    <span className={s.opopTitle}>Filter by status</span>
                  </div>
                  <div className={s.opopBody} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Live", "In review", "Archived"].map((r, i) => (
                      <label key={r} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
                        <span className={`${s.ochk} ${s.chkS} ${i !== 2 ? s.ochkOn : ""}`} aria-hidden="true" />
                        <span style={{ fontSize: "0.8rem", color: "#cfd3da" }}>{r}</span>
                      </label>
                    ))}
                  </div>
                  <div className={s.opopFoot}>
                    <button className={`${s.obtn} ${s.sm} ${s.vQuiet}`} onClick={() => setOpen(false)}>Reset</button>
                    <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`} onClick={() => setOpen(false)}>Apply</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
