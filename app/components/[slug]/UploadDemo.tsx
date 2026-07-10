"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Dropzone", "Inline", "Progress", "Complete"] as const;
const Clip = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 7l-5.5 5.5a3 3 0 0 1-4.2-4.2L8.8 2.8a2 2 0 0 1 2.8 2.8L5.9 11.3a1 1 0 0 1-1.4-1.4L9.6 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);

function InlineUpload({ size, label }: { size: string; label: string }) {
  const [name, setName] = useState("");
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={s.oupInline}>
      <button type="button" className={`${s.oupInlineBtn} ${size}`} onClick={() => input.current?.click()}>
        <Clip /> {label}
      </button>
      <span className={s.oupInlineName}>{name ? <b>{name}</b> : "No file selected"}</span>
      <input ref={input} type="file" hidden onChange={(e) => setName(e.target.files?.[0]?.name || "")} />
    </div>
  );
}
const Cloud = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M9 22a5 5 0 0 1-1-9.9A7 7 0 0 1 22 12a4.5 4.5 0 0 1 1 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M16 14v9m0-9-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);
const X = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

type F = { id: number; name: string; size: string; pct: number };

function Zone({ onFiles }: { onFiles: (names: string[]) => void }) {
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`${s.oupZone} ${over ? s.oupZoneOver : ""}`}
      onClick={() => input.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFiles([...e.dataTransfer.files].map((f) => f.name)); }}
      role="button" tabIndex={0}
    >
      <span className={s.oupIcon}><Cloud /></span>
      <span className={s.oupTitle}><b>Click to upload</b> or drag and drop</span>
      <span className={s.oupHint}>PNG, PDF or ZIP up to 10 MB</span>
      <input ref={input} type="file" multiple hidden onChange={(e) => onFiles([...(e.target.files || [])].map((f) => f.name))} />
    </div>
  );
}

function FileRow({ f, onRemove }: { f: F; onRemove: () => void }) {
  const done = f.pct >= 100;
  return (
    <div className={s.oupFile}>
      <span className={s.oupFileIcon}><FileIcon /></span>
      <span className={s.oupFileBody}>
        <span className={s.oupFileName}>{f.name}</span>
        {!done ? (
          <>
            <span className={s.oupBar}><span className={`${s.oupBarFill}`} style={{ width: `${f.pct}%` }} /></span>
            <span className={s.oupFileMeta}><span>{f.size}</span><span>{f.pct}%</span></span>
          </>
        ) : (
          <span className={s.oupFileMeta}><span>{f.size}</span><span style={{ color: "#4fce8b" }}>Uploaded</span></span>
        )}
      </span>
      <button type="button" className={s.oupRemove} aria-label={`Remove ${f.name}`} onClick={onRemove}><X /></button>
    </div>
  );
}

export default function UploadDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Dropzone");
  const [files, setFiles] = useState<F[]>([]);
  const nextId = useRef(1);

  const add = (names: string[]) => {
    const fresh = (names.length ? names : ["design-spec.pdf"]).map((name) => ({ id: nextId.current++, name, size: "2.4 MB", pct: 0 }));
    setFiles((f) => [...f, ...fresh]);
  };

  useEffect(() => {
    if (!files.some((f) => f.pct < 100)) return;
    const t = setInterval(() => {
      setFiles((fs) => fs.map((f) => (f.pct < 100 ? { ...f, pct: Math.min(100, f.pct + 12) } : f)));
    }, 300);
    return () => clearInterval(t);
  }, [files]);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Upload examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Dropzone" && (
          <>
            <div className={s.subLabel}>Click to browse, or drop files onto the zone</div>
            <div className={s.oupload}>
              <Zone onFiles={add} />
              {files.map((f) => <FileRow key={f.id} f={f} onRemove={() => setFiles((x) => x.filter((y) => y.id !== f.id))} />)}
            </div>
          </>
        )}
        {tab === "Inline" && (
          <>
            <div className={s.subLabel}>A compact trigger + filename, in input sizes — S · M · L</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <InlineUpload size={s.oupInlineS} label="Choose file" />
              <InlineUpload size={s.oupInlineM} label="Choose file" />
              <InlineUpload size={s.oupInlineL} label="Choose file" />
            </div>
          </>
        )}
        {tab === "Progress" && (
          <>
            <div className={s.subLabel}>A determinate bar you can trust</div>
            <div className={s.oupload}>
              <FileRow f={{ id: 0, name: "quarterly-report.pdf", size: "6.1 MB", pct: 45 }} onRemove={() => {}} />
              <FileRow f={{ id: 1, name: "cover.png", size: "1.2 MB", pct: 78 }} onRemove={() => {}} />
            </div>
          </>
        )}
        {tab === "Complete" && (
          <>
            <div className={s.subLabel}>Finished uploads confirm, and stay removable</div>
            <div className={s.oupload}>
              <FileRow f={{ id: 0, name: "design-system.zip", size: "8.4 MB", pct: 100 }} onRemove={() => {}} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
