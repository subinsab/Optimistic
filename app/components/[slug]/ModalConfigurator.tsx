"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Modal configuration playground — the preview modal is always open,
   rendered statically so the card is fully readable. */

const SIZES = ["S", "M", "L"] as const;
const TONES = ["Neutral", "Danger"] as const;
const FOOTERS = ["Two actions", "Single", "None"] as const;
const SCLASS: Record<string, string> = { S: "omSm", M: "", L: "omLg" };

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ModalConfigurator() {
  const [size, setSize] = useState("M");
  const [tone, setTone] = useState("Neutral");
  const [footer, setFooter] = useState("Two actions");
  const [title, setTitle] = useState("Rename workspace");

  const danger = tone === "Danger";

  const props = [
    `size="${size.toLowerCase()}"`,
    danger ? `tone="danger"` : "",
    `title="${title}"`,
    footer === "None" ? "" : footer === "Single" ? `actions={["Got it"]}` : `actions={["Cancel", "${danger ? "Delete" : "Save"}"]}`,
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Tone" options={TONES} value={tone} onPick={setTone} />
        <Chips label="Footer" options={FOOTERS} value={footer} onPick={setFooter} />
        <div className={s.configGroup}>
          <span className={s.configLabel}>Title</span>
          <input className={s.configInput} value={title} maxLength={36} onChange={(e) => setTitle(e.target.value)} aria-label="Modal title" />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.omodal} ${s.omodalOpen} ${s[SCLASS[size] as keyof typeof s]}`} style={{ position: "relative", boxShadow: "0 24px 70px rgba(0,0,0,.45)", maxHeight: "none", overflow: "visible" }}>
            <div className={s.ovHead}>
              <div>
                <div className={`${s.ovTitle} ${danger ? s.ovTitleDanger : ""}`}>{title || "Untitled"}</div>
                <div className={s.ovSub}>{danger ? "This action cannot be undone." : "Visible to your whole team."}</div>
              </div>
              <span className={s.ovClose} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </span>
            </div>
            <div className={s.ovBody}>Body content sits here — a sentence or two, a form, or a short confirmation.</div>
            {footer !== "None" && (
              <>
                <div className={s.ovDivider} />
                <div className={s.ovFoot}>
                  {footer === "Two actions" && <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>}
                  <span className={`${s.obtn} ${s.sm} ${danger ? s.vError : s.vPrimary}`}>
                    {footer === "Single" ? "Got it" : danger ? "Delete" : "Save"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Modal</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
