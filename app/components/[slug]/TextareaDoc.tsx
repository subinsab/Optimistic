import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TextareaDemo from "./TextareaDemo";
import TextareaConfigurator from "./TextareaConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Textarea. Dark design system: #0E0F12 field, #242428 border, radius 8, text #E7E9EE, line-height 1.55, padding 10/12, min-height 92px. Warm focus ring rgba(255,122,0,.14) with a #FF7A00 border. resize: vertical by default, or none. Auto-grow mode measures scrollHeight and caps at a max. Optional character counter that turns the field and count red past maxLength. Error (#EB4A4F) and success (#1FA35C) states mirror Input. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<label class="o-field">
  <span class="o-field__label">Release notes</span>
  <textarea class="o-textarea" rows="4" placeholder="Write here…"></textarea>
  <span class="o-field__count">0 / 140</span>
</label>` },
  { label: "CSS", code: `.o-textarea {
  width: 100%; min-height: 92px; padding: 10px 12px;
  font: inherit; line-height: 1.55; color: #e7e9ee;
  background: #0e0f12; border: 1px solid #242428; border-radius: 8px;
  resize: vertical;
  transition: border-color .2s, box-shadow .2s;
}
.o-textarea:focus {
  outline: none; border-color: rgba(255,122,0,.6);
  box-shadow: 0 0 0 3px rgba(255,122,0,.14);
}
.o-textarea--error { border-color: #eb4a4f; }` },
  { label: "React", code: `import { Textarea } from "@optimistic/ui";

<Textarea label="Release notes" placeholder="Write here…" />

<Textarea autoGrow maxRows={8} />            // grows, then scrolls
<Textarea maxLength={140} showCount />        // live counter
<Textarea status="error" hint="Please add more detail." />` },
  { label: "Angular", code: `<o-textarea label="Release notes" placeholder="Write here…"></o-textarea>
<o-textarea [autoGrow]="true" [maxRows]="8"></o-textarea>
<o-textarea [maxLength]="140" showCount></o-textarea>` },
  { label: "Async / API", code: `// Auto-grow: measure the scroll height, cap it, keep the caret steady.
function useAutoGrow(ref, value, maxPx = 220) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";                     // reset before measuring
    el.style.height = Math.min(el.scrollHeight, maxPx) + "px";
  }, [value]);
}

// Debounced draft autosave — the optimistic bit: save without blocking typing.
useEffect(() => {
  const id = setTimeout(() => {
    fetch("/api/draft", { method: "PUT", body: JSON.stringify({ body }) });
  }, 600);
  return () => clearTimeout(id);                   // reset the timer on each keystroke
}, [body]);` },
];

export default function TextareaDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><TextareaDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><TextareaConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>label / hint</td><td>string</td><td>Mono label above; helper below</td></tr>
          <tr><td className={s.tokName}>autoGrow / maxRows</td><td>boolean / number</td><td>Height tracks content, then scrolls</td></tr>
          <tr><td className={s.tokName}>resize</td><td>vertical · none</td><td>User drag handle; vertical is the default</td></tr>
          <tr><td className={s.tokName}>maxLength / showCount</td><td>number / boolean</td><td>Live counter; field reddens past the limit</td></tr>
          <tr><td className={s.tokName}>status</td><td>error · success</td><td>Border and message colour</td></tr>
          <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Read-only, opacity 0.42</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Textarea for multi-line prose. For a single line use Input; for a fixed short code use Pin Input.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <div className={s.inField} style={{ maxWidth: 260 }}>
              <span className={s.inLabel}>Release notes</span>
              <textarea className={s.otextarea} readOnly defaultValue="Ship early, reconcile honestly." aria-label="Sample" />
            </div>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 46 }} /></span>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "95%", top: 106 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 16 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Field</span><span className={s.anaDesc}>Multi-line box, min-height 92, warm focus ring.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Mono, uppercase, tied to the field.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Resize grip</span><span className={s.anaDesc}>Bottom-right handle; vertical only.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.inField} style={{ maxWidth: 220 }}><textarea className={s.otextarea} readOnly defaultValue="A short, honest summary of what changed." style={{ minHeight: 64 }} aria-label="do" /></div></div><p className={s.ddText}>Size the field to the expected answer. A few lines invites a few lines.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.inField} style={{ maxWidth: 220 }}><textarea className={s.otextarea} readOnly defaultValue="Name" style={{ minHeight: 30, height: 30 }} aria-label="dont" /></div></div><p className={s.ddText}>Don&apos;t use a textarea for a one-line value. That is an Input.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.inField} style={{ maxWidth: 220 }}><textarea className={s.otextarea} readOnly defaultValue="Looks thorough." style={{ minHeight: 56 }} aria-label="do2" /><span className={s.inCount} style={{ marginLeft: 0 }}>18 / 140</span></div></div><p className={s.ddText}>Show the counter only when a limit exists, and warn before the wall.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.inField} style={{ maxWidth: 220 }}><textarea className={s.otextarea} readOnly defaultValue="" style={{ minHeight: 40, height: 40, resize: "none" }} aria-label="dont2" /></div></div><p className={s.ddText}>Don&apos;t lock the height so small it traps the scroll. Let it grow or resize.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Comment box</div><div className={s.ctxStage}><div className={s.inField}><textarea className={`${s.otextarea} ${s.otaNoResize}`} readOnly defaultValue="Add a comment…" style={{ minHeight: 56, color: "#565a62" }} aria-label="comment" /></div></div><p className={s.ctxCaption}>Auto-growing comment field that starts compact and expands as needed.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Bio with limit</div><div className={s.ctxStage}><div className={s.inField}><textarea className={s.otextarea} readOnly defaultValue="Designer, systems thinker, optimist." style={{ minHeight: 56 }} aria-label="bio" /><span className={s.inCount} style={{ marginLeft: 0 }}>36 / 140</span></div></div><p className={s.ctxCaption}>Profile bios pair the field with a live character budget.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Form field</div><div className={s.ctxStage}><div className={s.inField}><span className={s.inLabel}>Message</span><textarea className={s.otextarea} readOnly defaultValue="" placeholder="How can we help?" style={{ minHeight: 56 }} aria-label="message" /></div></div><p className={s.ctxCaption}>Labeled message field in a contact or support form.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--ta-min-h</td><td>92px</td><td>Resting min-height (~3 lines)</td></tr>
          <tr><td className={s.tokName}>--ta-pad</td><td>10px 12px</td><td>Inner padding</td></tr>
          <tr><td className={s.tokName}>--ta-line</td><td>1.55</td><td>Comfortable reading line-height</td></tr>
          <tr><td className={s.tokName}>--ta-bg</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Field fill</td></tr>
          <tr><td className={s.tokName}>--ta-focus</td><td>rgba(255,122,0,.14)</td><td>3px warm focus ring</td></tr>
          <tr><td className={s.tokName}>--ta-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Over-limit and error border</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
