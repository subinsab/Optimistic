import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SliderDemo from "./SliderDemo";
import SliderConfigurator from "./SliderConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Slider. Dark design system: a 4px #242428 track, filled warm #FF7A00 up to the value, and a 16px warm thumb with a 3px page-colour cutout and a 1px warm ring; hover scales the thumb, focus adds a warm halo. Supports min/max/step (snapping) with optional tick labels, an optional right-aligned value readout, and an optional exact number input synced to the slider. Keyboard: arrows step, Home/End jump. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<label class="o-slider">
  <input type="range" class="o-range" min="0" max="100" value="64"
         style="--pct:64%" aria-label="Volume" />
  <span class="o-slider__val">64%</span>
</label>` },
  { label: "CSS", code: `.o-range {
  -webkit-appearance: none; height: 4px; border-radius: 999px;
  background: linear-gradient(to right, #ff7a00 var(--pct), #242428 var(--pct));
}
.o-range::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: #ff7a00; border: 3px solid #0b0b0b; box-shadow: 0 0 0 1px #ff7a00;
}
.o-range:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px #ff7a00, 0 0 0 4px rgba(255,122,0,.3);
}` },
  { label: "React", code: `import { Slider } from "@optimistic/ui";

<Slider value={vol} onChange={setVol} min={0} max={100} showValue />
<Slider value={size} onChange={setSize} step={10} ticks />
<Slider value={price} onChange={setPrice} min={0} max={500} showInput />`,
  },
  { label: "Angular", code: `<o-slider [(value)]="vol" [min]="0" [max]="100" showValue></o-slider>
<o-slider [(value)]="size" [step]="10" ticks></o-slider>` },
  { label: "Async / API", code: `// Slide freely, commit on release — don't fire a request per pixel.
const [draft, setDraft] = useState(server.value);

<Slider
  value={draft}
  onChange={setDraft}                 // cheap: local state, every move
  onChangeCommitted={(v) =>           // fires on pointer-up / key-up only
    fetch("/api/setting", { method: "PUT", body: JSON.stringify({ v }) })
  }
/>

// Keep the number input and the track in one source of truth so typing
// "500" and dragging can never disagree.` },
];

export default function SliderDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const fill = (v: number) => ({ background: `linear-gradient(to right, #ff7a00 ${v}%, #242428 ${v}%)` });
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><SliderDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SliderConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value / onChange</td><td>number / (v) =&gt; void</td><td>Current value; controlled</td></tr>
          <tr><td className={s.tokName}>min / max / step</td><td>number</td><td>Range and snapping increment</td></tr>
          <tr><td className={s.tokName}>showValue / showInput</td><td>boolean</td><td>Right-aligned readout, or an exact number field</td></tr>
          <tr><td className={s.tokName}>ticks</td><td>boolean</td><td>Labelled marks under the track</td></tr>
          <tr><td className={s.tokName}>onChangeCommitted</td><td>(v) =&gt; void</td><td>Fires on release — use for network writes</td></tr>
          <tr><td className={s.tokName}>← / → · Home / End</td><td>—</td><td>Step by one; jump to min / max</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Slider for a value chosen by feel within a known range. When exact values matter more than feel, lead with a number Input.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 240 }}>
            <input type="range" className={s.oRange} min={0} max={100} defaultValue={55} style={fill(55)} readOnly aria-label="Sample" />
            <span className={s.anaMark} style={{ left: "27%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 34 }} /></span>
            <span className={s.anaMark} style={{ left: "55%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 34 }} /></span>
            <span className={s.anaMark} style={{ left: "85%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 34 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Fill</span><span className={s.anaDesc}>Warm track from min to the current value.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Thumb</span><span className={s.anaDesc}>Warm grip with a page-colour cutout and ring.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Track</span><span className={s.anaDesc}>Unfilled remainder, 4px, fully rounded.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.osliderField} style={{ maxWidth: 200 }}><div className={s.osliderRow}><input type="range" className={s.oRange} defaultValue={70} style={fill(70)} readOnly aria-label="do" /><span className={s.osliderVal}>70%</span></div></div></div><p className={s.ddText}>Show the current value beside the track so the choice is legible.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.osliderField} style={{ maxWidth: 200 }}><input type="range" className={s.oRange} defaultValue={70} style={fill(70)} readOnly aria-label="dont" /></div></div><p className={s.ddText}>Don&apos;t hide the value when the exact number matters. Guessing is not feel.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.osliderField} style={{ maxWidth: 200 }}><input type="range" className={s.oRange} min={0} max={100} step={20} defaultValue={40} style={fill(40)} readOnly aria-label="do2" /><div className={s.osliderTicks}>{[0,20,40,60,80,100].map(t=><span key={t}>{t}</span>)}</div></div></div><p className={s.ddText}>Snap to steps with ticks when only certain values are valid.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.osliderField} style={{ maxWidth: 200 }}><input type="range" className={s.oRange} defaultValue={12} style={fill(12)} readOnly aria-label="dont2" /><span className={s.oupHint}>Precise to the cent</span></div></div><p className={s.ddText}>Don&apos;t use a coarse slider for values needing precision. Give a number field.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Volume</div><div className={s.ctxStage}><div className={s.osliderField} style={{ maxWidth: "none" }}><div className={s.osliderRow}><input type="range" className={s.oRange} defaultValue={64} style={fill(64)} readOnly aria-label="vol" /><span className={s.osliderVal}>64%</span></div></div></div><p className={s.ctxCaption}>Media and audio levels, adjusted by feel with a live readout.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Price filter</div><div className={s.ctxStage}><div className={s.osliderField} style={{ maxWidth: "none" }}><div className={s.osliderRow}><input type="range" className={s.oRange} defaultValue={50} style={fill(50)} readOnly aria-label="price" /><input type="number" className={s.osliderNum} defaultValue={250} readOnly aria-label="pricenum" /></div></div></div><p className={s.ctxCaption}>Budget filters pair the track with an exact number entry.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Zoom</div><div className={s.ctxStage}><div className={s.osliderField} style={{ maxWidth: "none" }}><input type="range" className={s.oRange} min={0} max={100} step={25} defaultValue={50} style={fill(50)} readOnly aria-label="zoom" /><div className={s.osliderTicks}>{["50%","75%","100%","125%","150%"].map(t=><span key={t}>{t}</span>)}</div></div></div><p className={s.ctxCaption}>Stepped zoom levels where only set values make sense.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--sld-track-h</td><td>4px</td><td>Track thickness</td></tr>
          <tr><td className={s.tokName}>--sld-thumb</td><td>16px</td><td>Thumb diameter</td></tr>
          <tr><td className={s.tokName}>--sld-fill</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Filled track and thumb</td></tr>
          <tr><td className={s.tokName}>--sld-track</td><td><span className={s.tokSwatch} style={{ background: "#242428" }} />#242428</td><td>Unfilled remainder</td></tr>
          <tr><td className={s.tokName}>--sld-cutout</td><td>3px page bg</td><td>Ring inside the thumb</td></tr>
          <tr><td className={s.tokName}>--sld-focus</td><td>rgba(255,122,0,.3)</td><td>4px focus halo</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
