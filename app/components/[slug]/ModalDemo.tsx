"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* live Modal specimen — opens inside the bounded stage, not the viewport.
   Escape closes; the scrim click closes; focus returns to the trigger. */

const TABS = ["Standard", "Destructive", "Sizes"] as const;
type Kind = "standard" | "danger" | "sm" | "md" | "lg" | null;

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function ModalDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Standard");
  const [open, setOpen] = useState<Kind>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openWith = (k: Kind, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen(k);
  };

  const sizeClass = open === "sm" ? s.omSm : open === "lg" ? s.omLg : "";
  const isDanger = open === "danger";

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Modal examples">
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
            {tab === "Standard" && (
              <>
                <span className={s.ovHint}>A focused decision, above the page</span>
                <button className={`${s.obtn} ${s.m} ${s.vPrimary}`} onClick={(e) => openWith("standard", e)}>
                  Open dialog
                </button>
              </>
            )}
            {tab === "Destructive" && (
              <>
                <span className={s.ovHint}>Irreversible actions ask first</span>
                <button className={`${s.obtn} ${s.m} ${s.vError}`} onClick={(e) => openWith("danger", e)}>
                  Delete project
                </button>
              </>
            )}
            {tab === "Sizes" && (
              <>
                <span className={s.ovHint}>340 · 420 · 520px</span>
                <div className={s.btnRow} style={{ justifyContent: "center", padding: 0 }}>
                  <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={(e) => openWith("sm", e)}>Small</button>
                  <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={(e) => openWith("md", e)}>Medium</button>
                  <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={(e) => openWith("lg", e)}>Large</button>
                </div>
              </>
            )}
          </div>

          {/* scrim + modal, contained */}
          <div
            className={`${s.ovScrim} ${open ? s.ovScrimOn : ""}`}
            onClick={close}
            aria-hidden={!open}
          >
            <div
              className={`${s.omodal} ${sizeClass} ${open ? s.omodalOpen : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={isDanger ? "Delete project" : "Dialog"}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={s.ovHead}>
                <div>
                  <div className={`${s.ovTitle} ${isDanger ? s.ovTitleDanger : ""}`}>
                    {isDanger ? "Delete this project?" : "Rename workspace"}
                  </div>
                  <div className={s.ovSub}>
                    {isDanger ? "This removes 42 components and cannot be undone." : "Names are visible to everyone on the team."}
                  </div>
                </div>
                <button className={s.ovClose} onClick={close} aria-label="Close"><XIcon /></button>
              </div>
              <div className={s.ovBody}>
                {isDanger
                  ? "Type the project name to confirm. Everything inside — tokens, components and history — is deleted for good."
                  : "Pick something short and recognisable. You can change it again at any time from settings."}
              </div>
              <div className={s.ovDivider} />
              <div className={s.ovFoot}>
                <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={close}>
                  {isDanger ? "Keep it" : "Cancel"}
                </button>
                <button className={`${s.obtn} ${s.sm} ${isDanger ? s.vError : s.vPrimary}`} onClick={close}>
                  {isDanger ? "Delete forever" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
