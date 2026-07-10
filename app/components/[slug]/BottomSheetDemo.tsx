"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* live Bottom Sheet specimen — rises from the bottom edge of the bounded
   stage. Handle, header, body; Escape and scrim both dismiss. */

const TABS = ["Actions", "Detail", "Sizes"] as const;
type Open = null | "main" | "sm";

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomSheetDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Actions");
  const [open, setOpen] = useState<Open>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => { setOpen(null); triggerRef.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openWith = (k: Exclude<Open, null>, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget; setOpen(k);
  };

  const actions = tab === "Actions";
  const small = open === "sm";

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Bottom sheet examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`}
            onClick={() => { setTab(t); setOpen(null); }}>
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} style={{ padding: 0 }} key={tab}>
        <div className={s.ovStage}>
          <div className={s.ovStageContent}>
            <span className={s.ovHint}>
              {actions ? "The mobile action menu, from the thumb's edge" : tab === "Detail" ? "Detail that rises, then returns" : "Two heights for two jobs"}
            </span>
            {tab === "Sizes" ? (
              <div className={s.btnRow} style={{ justifyContent: "center", padding: 0 }}>
                <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={(e) => openWith("sm", e)}>Compact</button>
                <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={(e) => openWith("main", e)}>Default</button>
              </div>
            ) : (
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`} onClick={(e) => openWith("main", e)}>
                {actions ? "Open actions" : "Open detail"}
              </button>
            )}
          </div>

          <div className={`${s.ovScrim} ${open ? s.ovScrimOn : ""}`} onClick={close} aria-hidden={!open} style={{ padding: 0, alignItems: "flex-end" }}>
            <div
              className={`${s.osheet} ${small ? s.osheetSm : ""} ${open ? s.osheetOpen : ""}`}
              role="dialog" aria-modal="true" aria-label={actions ? "Actions" : "Detail"}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={s.osheetGrab} aria-hidden="true" />
              {actions ? (
                <div className={s.ovBody} style={{ paddingTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                  {["Share", "Duplicate", "Move to…", "Rename"].map((r) => (
                    <button key={r} className={`${s.obtn} ${s.m} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%" }} onClick={close}>{r}</button>
                  ))}
                  <div className={s.ovDivider} style={{ margin: "6px 0" }} />
                  <button className={`${s.obtn} ${s.m} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%", color: "#eb4a4f" }} onClick={close}>Delete</button>
                </div>
              ) : (
                <>
                  <div className={s.ovHead} style={{ paddingTop: 8 }}>
                    <div>
                      <div className={s.ovTitle}>{small ? "Quick action" : "Component details"}</div>
                      <div className={s.ovSub}>{small ? "One tap away" : "Button · Forms · v3.2"}</div>
                    </div>
                    <button className={s.ovClose} onClick={close} aria-label="Close"><XIcon /></button>
                  </div>
                  <div className={s.ovBody}>
                    {small ? "A short confirmation or a single control fits here without covering the screen." : "The unit of intent — eight variants, three sizes, one warm primary per view. Everything you need to drop it into a product, right where your thumb already is."}
                  </div>
                  {!small && (
                    <div className={s.ovFoot} style={{ borderTop: "1px solid #1e1f24" }}>
                      <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={close}>Cancel</button>
                      <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`} onClick={close}>Add to page</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
