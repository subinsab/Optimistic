"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* live Drawer specimen — slides in from an edge inside the bounded stage. */

const TABS = ["Right", "Left", "Form"] as const;
type Open = null | "main";

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function DrawerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Right");
  const [open, setOpen] = useState<Open>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => { setOpen(null); triggerRef.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const left = tab === "Left";
  const form = tab === "Form";

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Drawer examples">
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
              {left ? "Navigation from the left edge" : form ? "An edit panel without leaving the page" : "Detail beside the list, not on top of it"}
            </span>
            <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}
              onClick={(e) => { triggerRef.current = e.currentTarget; setOpen("main"); }}>
              {left ? "Open menu" : form ? "Edit details" : "Open details"}
            </button>
          </div>

          <div className={`${s.ovScrim} ${open ? s.ovScrimOn : ""}`} onClick={close} aria-hidden={!open} style={{ padding: 0 }}>
            <div
              className={`${s.odrawer} ${left ? s.odrawerLeft : ""} ${open ? s.odrawerOpen : ""}`}
              role="dialog" aria-modal="true" aria-label="Drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={s.ovHead}>
                <div>
                  <div className={s.ovTitle}>{left ? "Workspace" : form ? "Edit component" : "Button · v3.2"}</div>
                  <div className={s.ovSub}>{left ? "Jump anywhere" : form ? "Changes save on confirm" : "Forms · 8 variants"}</div>
                </div>
                <button className={s.ovClose} onClick={close} aria-label="Close"><XIcon /></button>
              </div>
              <div className={s.ovBody}>
                {left ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Overview", "Components", "Tokens", "Changelog", "Settings"].map((r, i) => (
                      <span key={r} className={`${s.obtn} ${s.sm} ${i === 1 ? s.vGhost : s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%" }}>{r}</span>
                    ))}
                  </div>
                ) : form ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", color: "#cfd3da", fontSize: "0.82rem" }}>Primary button</span>
                    <span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", color: "#565a62", fontSize: "0.82rem" }}>Optional description…</span>
                  </div>
                ) : (
                  <p style={{ margin: 0 }}>The unit of intent. Eight variants, three sizes, one warm primary per view. Everything reversible lives here, beside the list, so you never lose your place.</p>
                )}
              </div>
              {!left && (
                <div className={s.ovFoot}>
                  <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={close}>Cancel</button>
                  <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`} onClick={close}>{form ? "Save" : "Done"}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
