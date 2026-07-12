import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import DropdownDemo from "./DropdownDemo";
import DropdownConfigurator from "./DropdownConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Dropdown (single select). Dark design system: a 36px trigger (#0E0F12 fill, #242428 border, radius 8) showing the value or a #565A62 placeholder, plus a chevron that rotates 180° when open. The listbox is a #141519 panel (#262A30 border, radius 10, soft shadow) of options; the selected option shows warm #FF9D45 text and a trailing check. Optional group labels in mono. Closes on select, outside click and Escape; ↑/↓ move, Enter commits, type-ahead jumps. aria-haspopup=listbox. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-dd">
  <button class="o-dd__trigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="o-dd__value">Banana</span>
    <svg class="o-dd__chevron">…</svg>
  </button>
  <div class="o-menu" role="listbox" hidden>
    <button role="option" class="o-menu__opt">Apple</button>
    <button role="option" aria-selected="true" class="o-menu__opt is-on">Banana ✓</button>
  </div>
</div>` },
  { label: "CSS", code: `.o-dd__trigger {
  display: flex; align-items: center; gap: 8px; width: 100%;
  height: 36px; padding: 0 12px; border-radius: 8px;
  background: #0e0f12; border: 1px solid #242428; color: #e7e9ee; cursor: pointer;
}
.o-dd[aria-expanded="true"] .o-dd__chevron { transform: rotate(180deg); }
.o-menu {
  position: absolute; top: calc(100% + 6px); inset-inline: 0;
  background: #141519; border: 1px solid #262a30; border-radius: 10px; padding: 6px;
}
.o-menu__opt.is-on { color: #ff9d45; }` },
  { label: "React", code: `import { Dropdown } from "@optimistic/ui";

<Dropdown value={fruit} onChange={setFruit} placeholder="Choose a fruit">
  <Dropdown.Option value="apple">Apple</Dropdown.Option>
  <Dropdown.Option value="banana">Banana</Dropdown.Option>
</Dropdown>

<Dropdown value={tz} onChange={setTz}>
  <Dropdown.Group label="Europe">
    <Dropdown.Option value="berlin">Berlin</Dropdown.Option>
  </Dropdown.Group>
</Dropdown>` },
  { label: "Angular", code: `<o-dropdown [(value)]="fruit" placeholder="Choose a fruit">
  <o-option value="apple">Apple</o-option>
  <o-option value="banana">Banana</o-option>
</o-dropdown>` },
  { label: "Async / API", code: `// Load options once, on first open — not on every render.
const [opts, setOpts] = useState(null);
async function onOpen() {
  if (opts) return;
  setOpts(await fetch("/api/countries").then((r) => r.json()));
}

// The value is an id; the label is looked up. Never store the label alone.
<Dropdown value={countryId} onChange={setCountryId} onOpen={onOpen}
  loading={!opts}>
  {opts?.map((c) => (
    <Dropdown.Option key={c.id} value={c.id}>{c.name}</Dropdown.Option>
  ))}
</Dropdown>` },
];

export default function DropdownDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const Check = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><DropdownDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><DropdownConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value / onChange</td><td>string / (v) =&gt; void</td><td>Selected option id; controlled</td></tr>
          <tr><td className={s.tokName}>multiple</td><td>boolean</td><td>Checkbox options with a Clear / Confirm footer; value is an array</td></tr>
          <tr><td className={s.tokName}>Option sub</td><td>ReactNode</td><td>Right-aligned secondary text on an option (value, offset, shortcut)</td></tr>
          <tr><td className={s.tokName}>placeholder</td><td>string</td><td>Shown when nothing is chosen</td></tr>
          <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Trigger inert, opacity 0.42</td></tr>
          <tr><td className={s.tokName}>Enter / Space</td><td>—</td><td>Open the list; Enter commits the active option</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · type-ahead</td><td>—</td><td>Move the active option; typing jumps to a match</td></tr>
          <tr><td className={s.tokName}>Esc · outside click</td><td>—</td><td>Close without changing the value</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Dropdown for a short, known list. When the list is long or needs filtering, use a Combobox; for free-text queries use Search.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 220 }}>
            <div className={s.odd} style={{ pointerEvents: "none" }}>
              <span className={s.oddTrigger}><span className={s.oddValue}>Banana</span><span className={s.oddChevron}><Chevron /></span></span>
            </div>
            <span className={s.anaMark} style={{ left: "30%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "90%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "50%", top: 44 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Value</span><span className={s.anaDesc}>The current selection, or a muted placeholder.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Chevron</span><span className={s.anaDesc}>Rotates 180° while the list is open.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Listbox</span><span className={s.anaDesc}>Options panel; selected one is warm + checked.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.odd} style={{ pointerEvents: "none", maxWidth: 180 }}><span className={s.oddTrigger}><span className={s.oddValue}>Medium</span><span className={s.oddChevron}><Chevron /></span></span></div></div><p className={s.ddText}>Use it for a handful of known, mutually exclusive options.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.odd} style={{ pointerEvents: "none", maxWidth: 180 }}><span className={s.oddTrigger}><span className={`${s.oddValue} ${s.oddPlaceholder}`}>Search 190 countries…</span><span className={s.oddChevron}><Chevron /></span></span></div></div><p className={s.ddText}>Don&apos;t stuff a huge list behind a plain dropdown. Give it a Combobox filter.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180 }} role="listbox"><span className={s.omenuOpt}>Draft</span><span className={`${s.omenuOpt} ${s.omenuOptOn}`}>Published<span className={s.omenuCheck}><Check /></span></span></div></div><p className={s.ddText}>Mark the selected option clearly — warm text and a check.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.odd} style={{ pointerEvents: "none", maxWidth: 200 }}><span className={s.oddTrigger}><span className={s.oddValue}>Yes</span><span className={s.oddChevron}><Chevron /></span></span></div></div><p className={s.ddText}>Don&apos;t use a dropdown for a binary choice. That is a Toggle or two Radios.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Form field</div><div className={s.ctxStage}><div className={s.inField} style={{ maxWidth: "none" }}><span className={s.inLabel}>Country</span><div className={s.odd} style={{ pointerEvents: "none", maxWidth: "none" }}><span className={s.oddTrigger}><span className={s.oddValue}>Germany</span><span className={s.oddChevron}><Chevron /></span></span></div></div></div><p className={s.ctxCaption}>A labeled select inside a form, matching Input height and radius.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Toolbar filter</div><div className={s.ctxStage}><div className={s.odd} style={{ pointerEvents: "none", maxWidth: 150 }}><span className={s.oddTrigger} style={{ height: 32 }}><span className={s.oddValue}>Newest</span><span className={s.oddChevron}><Chevron /></span></span></div></div><p className={s.ctxCaption}>A compact sort control in a list toolbar.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Grouped</div><div className={s.ctxStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180 }} role="listbox"><span className={s.omenuGroupLabel}>Europe</span><span className={`${s.omenuOpt} ${s.omenuOptOn}`}>Berlin<span className={s.omenuCheck}><Check /></span></span><span className={s.omenuOpt}>Lisbon</span></div></div><p className={s.ctxCaption}>Group labels sort long option sets into scannable sections.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--dd-height</td><td>36px</td><td>Trigger height (matches Input M)</td></tr>
          <tr><td className={s.tokName}>--dd-radius</td><td>8px</td><td>Trigger corner</td></tr>
          <tr><td className={s.tokName}>--menu-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Listbox panel</td></tr>
          <tr><td className={s.tokName}>--menu-border</td><td><span className={s.tokSwatch} style={{ background: "#262a30" }} />#262A30</td><td>Listbox hairline</td></tr>
          <tr><td className={s.tokName}>--opt-on</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Selected option text + check</td></tr>
          <tr><td className={s.tokName}>--opt-hover</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Active / hover row</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
