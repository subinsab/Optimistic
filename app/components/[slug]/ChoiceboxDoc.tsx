import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ChoiceboxDemo from "./ChoiceboxDemo";
import ChoiceboxConfigurator from "./ChoiceboxConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Choicebox. Dark design system: a selectable card carrying radio (single) or checkbox (multiple) semantics with a title and description. Card #0E0F12, border #242428, radius 10, padding 14; the whole card is the hit target. Selected = warm border rgba(255,122,0,.55) + tint fill rgba(255,122,0,.06), and the inner radio/checkbox fills #FF7A00. Optional leading icon tile (34px, #16171B). Keyboard and ARIA like a radiogroup / checkbox group. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div role="radiogroup" aria-label="Plan">
  <button role="radio" aria-checked="true" class="o-choice is-selected">
    <span class="o-choice__mark"><span class="o-radio is-on"></span></span>
    <span class="o-choice__body">
      <span class="o-choice__title">Pro</span>
      <span class="o-choice__desc">For growing teams.</span>
    </span>
  </button>
</div>` },
  { label: "CSS", code: `.o-choice {
  display: flex; gap: 12px; align-items: flex-start; width: 100%;
  padding: 14px; text-align: left; cursor: pointer;
  background: #0e0f12; border: 1px solid #242428; border-radius: 10px;
  transition: border-color .18s, background .18s;
}
.o-choice:hover { border-color: #3a3a3e; }
.o-choice.is-selected {
  border-color: rgba(255,122,0,.55); background: rgba(255,122,0,.06);
}` },
  { label: "React", code: `import { Choicebox, ChoiceboxGroup } from "@optimistic/ui";

<ChoiceboxGroup value={plan} onChange={setPlan}>
  <Choicebox value="starter" title="Starter" description="Free forever." />
  <Choicebox value="pro"     title="Pro"     description="For teams." />
  <Choicebox value="scale"   title="Scale"   description="SLAs and SSO." />
</ChoiceboxGroup>

<ChoiceboxGroup multiple value={topics} onChange={setTopics}>
  <Choicebox value="tokens" title="Design tokens" icon={<Palette />} />
</ChoiceboxGroup>` },
  { label: "Angular", code: `<o-choicebox-group [(value)]="plan">
  <o-choicebox value="starter" title="Starter" description="Free forever."></o-choicebox>
  <o-choicebox value="pro" title="Pro" description="For teams."></o-choicebox>
</o-choicebox-group>` },
  { label: "Async / API", code: `// A card can carry live state — e.g. seat availability from the server.
const { data: plans } = useQuery({ queryKey: ["plans"], queryFn: fetchPlans });

<ChoiceboxGroup value={plan} onChange={setPlan}>
  {plans?.map((p) => (
    <Choicebox
      key={p.id}
      value={p.id}
      title={p.name}
      description={p.seatsLeft > 0 ? p.blurb : "Sold out"}
      disabled={p.seatsLeft === 0}     // reconcile availability, don't hide it
    />
  ))}
</ChoiceboxGroup>` },
];

export default function ChoiceboxDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><ChoiceboxDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><ChoiceboxConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value</td><td>string</td><td>The option&apos;s identity within its group</td></tr>
          <tr><td className={s.tokName}>multiple (group)</td><td>boolean</td><td>Checkbox semantics instead of radio</td></tr>
          <tr><td className={s.tokName}>title / description</td><td>string</td><td>Primary label and supporting line</td></tr>
          <tr><td className={s.tokName}>icon</td><td>ReactNode</td><td>Optional leading glyph tile</td></tr>
          <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Unselectable, opacity 0.45</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · Space</td><td>—</td><td>Move within the group; Space toggles</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Reach for a Choicebox when each option needs a sentence of explanation. For bare options use Radio or Checkbox; for a compact known list use Dropdown.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ maxWidth: 280, pointerEvents: "none" }}>
              <span className={s.ochoiceMark}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /></span>
              <span className={s.ochoiceBody}><span className={s.ochoiceTitle}>Pro</span><span className={s.ochoiceDesc}>For growing teams.</span></span>
            </span>
            <span className={s.anaMark} style={{ left: "13.5%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 42 }} /></span>
            <span className={s.anaMark} style={{ left: "40%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "92%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Control</span><span className={s.anaDesc}>Radio or checkbox showing the state.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Title plus a short explaining line.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Card</span><span className={s.anaDesc}>The whole surface is the hit target.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ maxWidth: 240, pointerEvents: "none" }}><span className={s.ochoiceMark}><span className={`${s.oradio} ${s.rdM} ${s.oradioOn}`} /></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle}>Pro</span><span className={s.ochoiceDesc}>For growing teams and shared systems.</span></span></span></div><p className={s.ddText}>Give each card a clear title and one line of why. That is the whole point.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.ochoice} style={{ maxWidth: 240, pointerEvents: "none" }}><span className={s.ochoiceMark}><span className={`${s.oradio} ${s.rdM}`} /></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle}>Pro</span></span></span></div><p className={s.ddText}>Don&apos;t drop the description. A titleless card is just a fat radio button.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 240 }}><span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ pointerEvents: "none", padding: 10, alignItems: "center" }}><span className={s.ochoiceMark} style={{ marginTop: 0 }}><span className={`${s.oradio} ${s.rdS} ${s.oradioOn}`} /></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.82rem" }}>Monthly</span></span></span><span className={s.ochoice} style={{ pointerEvents: "none", padding: 10, alignItems: "center" }}><span className={s.ochoiceMark} style={{ marginTop: 0 }}><span className={`${s.oradio} ${s.rdS}`} /></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.82rem" }}>Yearly</span></span></span></div></div><p className={s.ddText}>Keep a group to a scannable few. Three to five options, one selected.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", gap: 6, flexWrap: "wrap", pointerEvents: "none" }}>{["A","B","C","D","E","F"].map(x => <span key={x} className={`${s.ochoice} ${x==="B"?s.ochoiceOn:""}`} style={{ width: 54, padding: 8, justifyContent: "center" }}><span className={s.ochoiceTitle} style={{ fontSize: "0.8rem" }}>{x}</span></span>)}</div></div><p className={s.ddText}>Don&apos;t use choiceboxes for a dozen bare options. That wants a Dropdown.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Plan picker</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}><span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ pointerEvents: "none", padding: 10 }}><span className={s.ochoiceMark}><span className={`${s.oradio} ${s.rdS} ${s.oradioOn}`} /></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.84rem" }}>Pro — $20</span><span className={s.ochoiceDesc}>Per seat, billed monthly.</span></span></span></div></div><p className={s.ctxCaption}>Pricing tiers where each option carries a price and a promise.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Onboarding</div><div className={s.ctxStage}><div className={s.ochoiceGrid} style={{ pointerEvents: "none", gridTemplateColumns: "1fr 1fr" }}><span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ padding: 10 }}><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.82rem" }}>Design</span></span></span><span className={s.ochoice} style={{ padding: 10 }}><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.82rem" }}>Engineering</span></span></span></div></div><p className={s.ctxCaption}>Role selection during onboarding, one warm card selected.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Framework</div><div className={s.ctxStage}><span className={`${s.ochoice} ${s.ochoiceOn}`} style={{ maxWidth: 200, pointerEvents: "none", padding: 10 }}><span className={s.ochoiceIcon} style={{ width: 28, height: 28 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></span><span className={s.ochoiceBody}><span className={s.ochoiceTitle} style={{ fontSize: "0.82rem" }}>React</span></span></span></div><p className={s.ctxCaption}>Icon-led choiceboxes for a visual set like frameworks or themes.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--choice-pad</td><td>14px</td><td>Card padding</td></tr>
          <tr><td className={s.tokName}>--choice-radius</td><td>10px</td><td>Card corner</td></tr>
          <tr><td className={s.tokName}>--choice-border</td><td><span className={s.tokSwatch} style={{ background: "#242428" }} />#242428</td><td>Resting hairline</td></tr>
          <tr><td className={s.tokName}>--choice-on-border</td><td>rgba(255,122,0,.55)</td><td>Selected border</td></tr>
          <tr><td className={s.tokName}>--choice-on-fill</td><td>rgba(255,122,0,.06)</td><td>Selected tint</td></tr>
          <tr><td className={s.tokName}>--choice-icon</td><td>34px · #16171B</td><td>Leading glyph tile</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
