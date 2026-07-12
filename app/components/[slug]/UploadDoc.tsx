import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import UploadDemo from "./UploadDemo";
import UploadConfigurator from "./UploadConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Upload. Dark design system: a dashed dropzone (#2F2F36 border, radius 12, #0C0D10 fill) with a cloud icon, a '<b>Click to upload</b> or drag and drop' line, and a hint. Dragging a file over turns the border warm (#FF7A00) with a faint warm wash. Selected files list as rows with a file icon, name, a determinate 4px warm progress bar that turns green when done, size/percent meta, and a remove ×. Handle click-browse, drag/drop, and per-file progress. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-upload__zone">
  <CloudIcon />
  <span class="o-upload__title"><b>Click to upload</b> or drag and drop</span>
  <span class="o-upload__hint">PNG, PDF or ZIP up to 10 MB</span>
  <input type="file" multiple hidden />
</div>

<div class="o-upload__file">
  <FileIcon /> <span class="o-upload__name">report.pdf</span>
  <span class="o-upload__bar"><span style="width:45%"></span></span>
  <button class="o-upload__remove">×</button>
</div>` },
  { label: "CSS", code: `.o-upload__zone {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 28px 20px; text-align: center; cursor: pointer;
  border: 1.5px dashed #2f2f36; border-radius: 12px; background: #0c0d10;
  transition: border-color .18s, background .18s;
}
.o-upload__zone.is-over { border-color: #ff7a00; background: rgba(255,122,0,.05); }
.o-upload__bar > span { height: 4px; background: #ff7a00; border-radius: 999px; }` },
  { label: "React", code: `import { Upload } from "@optimistic/ui";

<Upload
  multiple
  accept=".png,.pdf,.zip"
  maxSize={10 * 1024 * 1024}
  onUpload={(file, onProgress) => uploadWithProgress(file, onProgress)}
/>`,
  },
  { label: "Angular", code: `<o-upload
  multiple
  accept=".png,.pdf,.zip"
  [maxSize]="10485760"
  (upload)="handle($event)">
</o-upload>` },
  { label: "Async / API", code: `// Real progress from XHR (fetch can't report upload progress yet).
function upload(file, onProgress) {
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = (e) =>
    onProgress(Math.round((e.loaded / e.total) * 100));   // honest 0→100
  xhr.onload = () => xhr.status < 400 ? onDone() : onError();
  xhr.open("POST", "/api/files");
  const body = new FormData(); body.append("file", file);
  xhr.send(body);
  return () => xhr.abort();          // cancel = remove row mid-flight
}

// Validate type and size before the request — reject early, don't upload junk.` },
];

export default function UploadDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);
  const Cloud = () => (<svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M9 22a5 5 0 0 1-1-9.9A7 7 0 0 1 22 12a4.5 4.5 0 0 1 1 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M16 14v9m0-9-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><UploadDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><UploadConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>onUpload</td><td>(file, onProgress) =&gt; void</td><td>Called per file; report 0–100</td></tr>
          <tr><td className={s.tokName}>multiple</td><td>boolean</td><td>Accept more than one file</td></tr>
          <tr><td className={s.tokName}>accept / maxSize</td><td>string / number</td><td>Type and size gates, checked before upload</td></tr>
          <tr><td className={s.tokName}>drag / drop</td><td>—</td><td>Zone turns warm while a file hovers</td></tr>
          <tr><td className={s.tokName}>remove</td><td>—</td><td>Cancels in-flight or clears a finished file</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Show honest, determinate progress and keep every file removable. For a single avatar or image, a click-to-replace tile is friendlier than a full dropzone.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={s.oupZone} style={{ pointerEvents: "none" }}>
              <span className={s.oupIcon}><Cloud /></span>
              <span className={s.oupTitle}><b>Click to upload</b> or drag and drop</span>
              <span className={s.oupHint}>PNG, PDF up to 10 MB</span>
            </div>
            <span className={s.anaMark} style={{ left: "10%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 26 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "32%", top: 75 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 74 }} /><b className={s.anaBadge}>2</b></span>
            <span className={s.vAnaMarkTop} style={{ left: "58%", top: 104 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 46 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Dropzone</span><span className={s.anaDesc}>Dashed target; turns warm on drag-over.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Prompt</span><span className={s.anaDesc}>The warm click affordance plus a hint.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Constraints</span><span className={s.anaDesc}>Accepted types and size, stated up front.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oupFile} style={{ width: "100%", maxWidth: 240, pointerEvents: "none" }}><span className={s.oupFileIcon}><FileIcon /></span><span className={s.oupFileBody}><span className={s.oupFileName}>report.pdf</span><span className={s.oupBar}><span className={s.oupBarFill} style={{ width: "60%" }} /></span></span></div></div><p className={s.ddText}>Show real, determinate progress so people know it is working.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oupFile} style={{ width: "100%", maxWidth: 240, pointerEvents: "none" }}><span className={s.oupFileIcon}><FileIcon /></span><span className={s.oupFileBody}><span className={s.oupFileName}>report.pdf</span><span className={s.oupFileMeta}><span>Uploading…</span></span></span></div></div><p className={s.ddText}>Don&apos;t hide progress behind a vague spinner. A bar is a promise.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oupZone} style={{ pointerEvents: "none", padding: "16px" }}><span className={s.oupHint}>PNG, PDF or ZIP · up to 10 MB</span></div></div><p className={s.ddText}>State the accepted types and size limit before anyone tries.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oupFile} style={{ width: "100%", maxWidth: 240, pointerEvents: "none" }}><span className={s.oupFileIcon}><FileIcon /></span><span className={s.oupFileBody}><span className={s.oupFileName} style={{ color: "#f2777b" }}>huge-video.mov — too large</span></span></div></div><p className={s.ddText}>Don&apos;t upload then reject. Validate type and size before the request.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Attachments</div><div className={s.ctxStage}><div className={s.oupFile} style={{ width: "100%", pointerEvents: "none" }}><span className={s.oupFileIcon}><FileIcon /></span><span className={s.oupFileBody}><span className={s.oupFileName}>contract.pdf</span><span className={s.oupFileMeta}><span>2.4 MB</span><span style={{ color: "#4fce8b" }}>Uploaded</span></span></span></div></div><p className={s.ctxCaption}>File attachments in a form or message composer.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Bulk import</div><div className={s.ctxStage}><div className={s.oupZone} style={{ pointerEvents: "none", padding: "18px" }}><span className={s.oupIcon}><Cloud /></span><span className={s.oupHint}>Drop a .csv to import</span></div></div><p className={s.ctxCaption}>A wide dropzone for data imports and bulk uploads.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · In progress</div><div className={s.ctxStage}><div className={s.oupFile} style={{ width: "100%", pointerEvents: "none" }}><span className={s.oupFileIcon}><FileIcon /></span><span className={s.oupFileBody}><span className={s.oupFileName}>video.mp4</span><span className={s.oupBar}><span className={s.oupBarFill} style={{ width: "35%" }} /></span><span className={s.oupFileMeta}><span>18 MB</span><span>35%</span></span></span></div></div><p className={s.ctxCaption}>Large files show live progress and a cancel affordance.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--up-zone-border</td><td>1.5px dashed #2F2F36</td><td>Resting dropzone edge</td></tr>
          <tr><td className={s.tokName}>--up-over</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Drag-over border and wash</td></tr>
          <tr><td className={s.tokName}>--up-bar</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Progress fill (green when done)</td></tr>
          <tr><td className={s.tokName}>--up-done</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Completed state</td></tr>
          <tr><td className={s.tokName}>--up-radius</td><td>12px zone · 9px row</td><td>Corners</td></tr>
          <tr><td className={s.tokName}>--up-remove</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Remove × on hover</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
