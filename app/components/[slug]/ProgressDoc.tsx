import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ProgressDemo from "./ProgressDemo";
import ProgressConfigurator from "./ProgressConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Progress. Dark design system: a determinate bar — #242428 track, warm #FF7A00 fill, radius 999, height 4/6/9 for S/M/L — turning green at 100%. Optional label row (name left, percent right). A circular variant draws an SVG ring (warm arc via stroke-dashoffset) with a centred mono percent. An indeterminate variant slides a partial fill. role=progressbar with aria-valuenow. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-prog">
  <div class="o-prog__head"><span>Uploading</span><b>62%</b></div>
  <div class="o-prog__bar">
    <div class="o-prog__fill" style="width:62%"
         role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>` },
  { label: "CSS", code: `.o-prog__bar {
  height: 6px; border-radius: 999px; background: #242428; overflow: hidden;
}
.o-prog__fill {
  height: 100%; border-radius: 999px; background: #ff7a00;
  transition: width .35s ease;
}
.o-prog--indeterminate .o-prog__fill {
  width: 42%; animation: slide 1.25s ease-in-out infinite;
}
@keyframes slide { 0% { transform: translateX(-110%); } 100% { transform: translateX(340%); } }` },
  { label: "React", code: `import { Progress } from "@optimistic/ui";

<Progress value={62} showValue label="Uploading" />
<Progress value={done} variant="circular" />
<Progress indeterminate />`,
  },
  { label: "Angular", code: `<o-progress [value]="62" showValue label="Uploading"></o-progress>
<o-progress [value]="done" variant="circular"></o-progress>
<o-progress indeterminate></o-progress>` },
  { label: "Async / API", code: `// Real upload progress via XHR (fetch can't report it yet).
const xhr = new XMLHttpRequest();
xhr.upload.onprogress = (e) => {
  if (e.lengthComputable) setPct(Math.round((e.loaded / e.total) * 100));
  else setIndeterminate(true);        // server didn't send a length
};
xhr.open("POST", "/api/files");
xhr.send(form);

// Clamp and finish honestly — snap to 100 only when the response lands.
<Progress value={Math.min(pct, 99)} showValue />` },
];

export default function ProgressDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><ProgressDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><ProgressConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value</td><td>number (0–100)</td><td>Determinate fill; omit for indeterminate</td></tr>
          <tr><td className={s.tokName}>variant</td><td>bar · circular · top</td><td>Linear track, SVG ring, or a page-load top bar</td></tr>
          <tr><td className={s.tokName}>top (page load)</td><td>—</td><td>Thin bar pinned to the top edge; trickles up, then completes</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Bar height 4 / 6 / 9px</td></tr>
          <tr><td className={s.tokName}>showValue / label</td><td>boolean / string</td><td>Percent readout and a leading label</td></tr>
          <tr><td className={s.tokName}>indeterminate</td><td>boolean</td><td>Sliding fill when progress is unknown</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use Progress when you can measure how far along a task is. For an unmeasurable wait use a Loader; for multi-step flows use a Stepper.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 280 }}>
            <div className={s.oprog} style={{ maxWidth: "none" }}>
              <div className={s.oprogHead}><span>Uploading</span><b>62%</b></div>
              <div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "62%" }} /></div>
            </div>
            <span className={s.anaMark} style={{ left: "18%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "82%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "40%", top: 44 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>What is progressing, on the left.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Value</span><span className={s.anaDesc}>The exact percent, on the right.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Fill</span><span className={s.anaDesc}>Warm track to the current value; green at 100.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oprog} style={{ maxWidth: 220 }}><div className={s.oprogHead}><span>Step 2 of 3</span><b>66%</b></div><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "66%" }} /></div></div></div><p className={s.ddText}>Show the number when you can. A percent is a promise kept.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oprog} style={{ maxWidth: 220 }}><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "100%" }} /></div></div></div><p className={s.ddText}>Don&apos;t sit at 100% while still working. Snap to full only when done.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.oprog} ${s.oprogIndet}`} style={{ maxWidth: 220 }}><div className={s.oprogBar}><div className={s.oprogFill} /></div></div></div><p className={s.ddText}>Use the indeterminate slide only when you truly can&apos;t measure.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oprog} style={{ maxWidth: 220 }}><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "34%" }} /></div></div><span className={s.oupHint} style={{ marginTop: 8 }}>jumps: 4% → 90% → 30%</span></div><p className={s.ddText}>Don&apos;t let the bar jump backward. Progress moves one way.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Upload</div><div className={s.ctxStage}><div className={s.oprog} style={{ maxWidth: "none", width: "100%" }}><div className={s.oprogHead}><span>video.mp4</span><b>48%</b></div><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "48%" }} /></div></div></div><p className={s.ctxCaption}>File and media uploads with a live percent.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Usage meter</div><div className={s.ctxStage}><div className={s.oprog} style={{ maxWidth: "none", width: "100%" }}><div className={s.oprogHead}><span>Storage</span><b>82%</b></div><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "82%" }} /></div></div></div><p className={s.ctxCaption}>Quota and usage meters toward a limit.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Ring</div><div className={s.ctxStage}><span className={s.oprogRingWrap} style={{ width: 60, height: 60 }}><svg width="60" height="60" style={{ transform: "rotate(-90deg)" }}><circle className={s.oprogRingTrack} cx="30" cy="30" r="24" fill="none" strokeWidth="5" /><circle className={s.oprogRingFill} cx="30" cy="30" r="24" fill="none" strokeWidth="5" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * 0.25} /></svg><span className={s.oprogRingText} style={{ fontSize: "0.72rem" }}>75%</span></span></div><p className={s.ctxCaption}>Compact ring for cards and dashboards.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--prog-h</td><td>4 / 6 / 9px</td><td>Bar heights S / M / L</td></tr>
          <tr><td className={s.tokName}>--prog-track</td><td><span className={s.tokSwatch} style={{ background: "#242428" }} />#242428</td><td>Unfilled track</td></tr>
          <tr><td className={s.tokName}>--prog-fill</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Progress fill</td></tr>
          <tr><td className={s.tokName}>--prog-done</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Completed at 100%</td></tr>
          <tr><td className={s.tokName}>--prog-radius</td><td>999px</td><td>Fully rounded track and fill</td></tr>
          <tr><td className={s.tokName}>--prog-ease</td><td>0.35s</td><td>Fill width transition</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
