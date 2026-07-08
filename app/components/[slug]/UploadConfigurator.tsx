"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATE = ["Idle", "Uploading", "Done"] as const;
const MULTI = ["Single", "Multiple"] as const;
const Cloud = () => (<svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M9 22a5 5 0 0 1-1-9.9A7 7 0 0 1 22 12a4.5 4.5 0 0 1 1 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M16 14v9m0-9-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function UploadConfigurator() {
  const [state, setState] = useState("Idle");
  const [multi, setMulti] = useState("Multiple");
  const [hint, setHint] = useState("PNG, PDF up to 10 MB");
  const props = [multi === "Multiple" ? "multiple" : "", `accept=".png,.pdf"`, "onUpload={fn}"].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATE} value={state} onPick={setState} />
        <Chips label="Files" options={MULTI} value={multi} onPick={setMulti} />
        <div className={s.configGroup}><span className={s.configLabel}>Hint</span><input className={s.configInput} value={hint} maxLength={28} onChange={(e) => setHint(e.target.value)} aria-label="Hint" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.oupload}>
            {state === "Idle" && (
              <div className={s.oupZone}>
                <span className={s.oupIcon}><Cloud /></span>
                <span className={s.oupTitle}><b>Click to upload</b> or drag and drop</span>
                <span className={s.oupHint}>{hint}</span>
              </div>
            )}
            {state !== "Idle" && (
              <div className={s.oupFile}>
                <span className={s.oupFileIcon}><FileIcon /></span>
                <span className={s.oupFileBody}>
                  <span className={s.oupFileName}>design-spec.pdf</span>
                  {state === "Uploading" ? (
                    <><span className={s.oupBar}><span className={s.oupBarFill} style={{ width: "62%" }} /></span><span className={s.oupFileMeta}><span>2.4 MB</span><span>62%</span></span></>
                  ) : (
                    <span className={s.oupFileMeta}><span>2.4 MB</span><span style={{ color: "#4fce8b" }}>Uploaded</span></span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Upload</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
