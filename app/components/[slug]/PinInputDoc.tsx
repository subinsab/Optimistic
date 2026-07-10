import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import PinInputDemo from "./PinInputDemo";
import PinInputConfigurator from "./PinInputConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Pin Input. Dark design system: N separate cells (44×52, #0E0F12, #242428 border, radius 8, mono 1.2rem, centred), one character each. Typing auto-advances; Backspace on an empty cell steps back; arrows move; pasting a code spreads digits across cells. Focus shows a warm ring, a filled cell keeps a lighter border. Optional masking (•) and error/success states mirroring Input. inputMode=numeric. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-pin" role="group" aria-label="Verification code">
  <input class="o-pin__cell" inputmode="numeric" maxlength="1" aria-label="Digit 1" />
  <input class="o-pin__cell" inputmode="numeric" maxlength="1" aria-label="Digit 2" />
  <input class="o-pin__cell" inputmode="numeric" maxlength="1" aria-label="Digit 3" />
  <input class="o-pin__cell" inputmode="numeric" maxlength="1" aria-label="Digit 4" />
</div>` },
  { label: "CSS", code: `.o-pin { display: inline-flex; gap: 10px; }
.o-pin__cell {
  width: 44px; height: 52px; text-align: center;
  font: 1.2rem var(--mono); color: #f2f3f5;
  background: #0e0f12; border: 1px solid #242428; border-radius: 8px;
}
.o-pin__cell:focus {
  outline: none; border-color: rgba(255,122,0,.7);
  box-shadow: 0 0 0 3px rgba(255,122,0,.14);
}` },
  { label: "React", code: `import { PinInput } from "@optimistic/ui";

<PinInput
  length={6}
  onComplete={(code) => verify(code)}   // fires when the last cell fills
  mask                                   // show • instead of the digit
/>` },
  { label: "Angular", code: `<o-pin-input
  [length]="6"
  (complete)="verify($event)"
  mask>
</o-pin-input>` },
  { label: "Async / API", code: `// One-time codes: auto-submit on the last digit, and read the SMS code
// from the platform autofill when available.
<PinInput
  length={6}
  autoComplete="one-time-code"          // iOS/Android SMS autofill
  onComplete={async (code) => {
    setVerifying(true);
    const r = await fetch("/api/verify", { method: "POST",
      body: JSON.stringify({ code }) });
    if (!r.ok) { setError(true); shake(); }   // wrong code: flag + reset
    else router.push("/welcome");
    setVerifying(false);
  }}
/>` },
];

export default function PinInputDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><PinInputDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><PinInputConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>length</td><td>number</td><td>Number of cells (typically 4–6)</td></tr>
          <tr><td className={s.tokName}>onComplete</td><td>(code) =&gt; void</td><td>Fires when every cell is filled</td></tr>
          <tr><td className={s.tokName}>mask</td><td>boolean</td><td>Renders • instead of the character</td></tr>
          <tr><td className={s.tokName}>status</td><td>error · success</td><td>Border colour across all cells</td></tr>
          <tr><td className={s.tokName}>type · Backspace</td><td>—</td><td>Auto-advance; empty Backspace steps back</td></tr>
          <tr><td className={s.tokName}>paste</td><td>—</td><td>Spreads a pasted code across the cells</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Pin Input for a short, fixed-length code. For longer or free-form secrets use a password Input.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <div className={s.opin} style={{ pointerEvents: "none" }}>
              <span className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display: "grid", placeItems: "center" }}>4</span>
              <span className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display: "grid", placeItems: "center", borderColor: "rgba(255,122,0,0.7)", boxShadow: "0 0 0 3px rgba(255,122,0,0.14)" }}>8</span>
              <span className={s.opinCell} style={{ display: "grid", placeItems: "center" }} />
              <span className={s.opinCell} style={{ display: "grid", placeItems: "center" }} />
            </div>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "37%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "87%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Filled cell</span><span className={s.anaDesc}>Holds one character; lighter border once set.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Active cell</span><span className={s.anaDesc}>The focused cell wears the warm ring.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Empty cell</span><span className={s.anaDesc}>Awaiting input; the count is always visible.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{["4","8","1","9"].map((d,i)=><span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display:"grid", placeItems:"center", width:38, height:46, fontSize:"1rem" }}>{d}</span>)}</div></div><p className={s.ddText}>Match the cell count to the real code length. Four cells for four digits.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{Array(9).fill(0).map((_,i)=><span key={i} className={s.opinCell} style={{ width:22, height:30, fontSize:"0.7rem" }} />)}</div></div><p className={s.ddText}>Don&apos;t use cells for long inputs. Nine tiny boxes is a password field.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.opin} ${s.opinErr}`} style={{ pointerEvents: "none" }}>{["1","2","3","4"].map((d,i)=><span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display:"grid", placeItems:"center", width:38, height:46, fontSize:"1rem" }}>{d}</span>)}</div></div><p className={s.ddText}>Turn every cell red on a wrong code, then let them retry cleanly.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{["4","","1",""].map((d,i)=><span key={i} className={`${s.opinCell} ${d?s.opinCellFilled:""}`} style={{ display:"grid", placeItems:"center", width:38, height:46, fontSize:"1rem" }}>{d}</span>)}</div></div><p className={s.ddText}>Don&apos;t let focus scatter. Typing and pasting must fill left to right.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · 2FA</div><div className={s.ctxStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{["4","8","1","9","2","0"].map((d,i)=><span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display:"grid", placeItems:"center", width:34, height:42, fontSize:"0.95rem" }}>{d}</span>)}</div></div><p className={s.ctxCaption}>Six-digit codes from an authenticator or SMS, auto-submitting.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · PIN entry</div><div className={s.ctxStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{Array(4).fill(0).map((_,i)=><span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display:"grid", placeItems:"center", width:38, height:46, fontSize:"1.2rem" }}>•</span>)}</div></div><p className={s.ctxCaption}>Masked cells for a private PIN or unlock code.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Invite code</div><div className={s.ctxStage}><div className={s.opin} style={{ pointerEvents: "none" }}>{["A","7","K","2"].map((d,i)=><span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display:"grid", placeItems:"center", width:38, height:46, fontSize:"1rem" }}>{d}</span>)}</div></div><p className={s.ctxCaption}>Alphanumeric access codes, one character per cell.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--pin-cell</td><td>44 × 52px</td><td>Cell size (38 × 46 small)</td></tr>
          <tr><td className={s.tokName}>--pin-gap</td><td>10px</td><td>Space between cells</td></tr>
          <tr><td className={s.tokName}>--pin-font</td><td>1.2rem mono</td><td>Centred character</td></tr>
          <tr><td className={s.tokName}>--pin-bg</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Cell fill</td></tr>
          <tr><td className={s.tokName}>--pin-focus</td><td>rgba(255,122,0,.14)</td><td>3px warm ring on the active cell</td></tr>
          <tr><td className={s.tokName}>--pin-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Wrong-code border on all cells</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
