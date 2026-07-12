import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import PillsDemo from "./PillsDemo";
import PillsConfigurator from "./PillsConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Pills. Dark design system: selectable filter chips, fully rounded, #16171B fill, #2A2A30 border, text #CFD3DA, padding 6/13. Selected = warm tint (rgba(255,122,0,.14) fill, rgba(255,122,0,.5) border, #FF9D45 text); multi-select pills add a leading check when on. Optional trailing count in muted mono. Single-select acts like a radiogroup, multi like a checkbox group. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-pills" role="radiogroup" aria-label="Status">
  <button class="o-pill is-on" role="radio" aria-checked="true">All</button>
  <button class="o-pill" role="radio" aria-checked="false">Active</button>
  <button class="o-pill" role="radio" aria-checked="false">
    Draft <span class="o-pill__count">8</span>
  </button>
</div>` },
  { label: "CSS", code: `.o-pill {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 13px; border-radius: 999px; font-size: .82rem;
  color: #cfd3da; background: #16171b; border: 1px solid #2a2a30; cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}
.o-pill.is-on {
  background: rgba(255,122,0,.14);
  border-color: rgba(255,122,0,.5); color: #ff9d45;
}` },
  { label: "React", code: `import { Pills, Pill } from "@optimistic/ui";

<Pills value={status} onChange={setStatus}>
  <Pill value="all">All</Pill>
  <Pill value="active">Active</Pill>
  <Pill value="draft" count={8}>Draft</Pill>
</Pills>

<Pills multiple value={tags} onChange={setTags}>
  <Pill value="react">React</Pill>
</Pills>` },
  { label: "Angular", code: `<o-pills [(value)]="status">
  <o-pill value="all">All</o-pill>
  <o-pill value="active">Active</o-pill>
  <o-pill value="draft" [count]="8">Draft</o-pill>
</o-pills>` },
  { label: "Async / API", code: `// Filter pills own the query: reflect them in the URL and refetch.
const [tags, setTags] = useState(() =>
  searchParams.getAll("tag")
);

useEffect(() => {
  const url = new URL(location.href);
  url.searchParams.delete("tag");
  tags.forEach((t) => url.searchParams.append("tag", t));
  history.replaceState(null, "", url);        // shareable filter state
}, [tags]);

const { data } = useQuery({
  queryKey: ["items", tags],                  // refetch when a pill toggles
  queryFn: () => fetchItems({ tags }),
});` },
];

export default function PillsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Check = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><PillsDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><PillsConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>value / onChange</td><td>string | string[]</td><td>Selected pill(s); controlled</td></tr>
          <tr><td className={s.tokName}>multiple</td><td>boolean</td><td>Checkbox semantics with a leading check</td></tr>
          <tr><td className={s.tokName}>count</td><td>number</td><td>Trailing match count in muted mono</td></tr>
          <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>Unselectable</td></tr>
          <tr><td className={s.tokName}>← / → · Space</td><td>—</td><td>Move within the group; Space toggles</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Pills select and filter, and hold their state. For a read-only label use a Tag; for a status use a Badge; for switching whole views use Tabs.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={`${s.opill} ${s.opillOn}`} style={{ fontSize: "0.9rem", pointerEvents: "none" }}><Check />Active<span className={s.opillCount}>24</span></span>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "48%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "82%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Check</span><span className={s.anaDesc}>Shown on selected multi-select pills.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>The filter&apos;s name; warm when selected.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Count</span><span className={s.anaDesc}>Optional number of matching items.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.opills} style={{ pointerEvents: "none" }}><span className={`${s.opill} ${s.opillOn}`}>All</span><span className={s.opill}>Active</span><span className={s.opill}>Draft</span></div></div><p className={s.ddText}>Keep one option always selected in a single-select filter row.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.opills} style={{ pointerEvents: "none" }}><span className={`${s.opill} ${s.opillOn}`}>All</span><span className={`${s.opill} ${s.opillOn}`}>Active</span><span className={`${s.opill} ${s.opillOn}`}>Draft</span></div></div><p className={s.ddText}>Don&apos;t light every pill. If all are on, none is filtering.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={`${s.opill} ${s.opillOn}`} style={{ pointerEvents: "none" }}><Check />React</span></div><p className={s.ddText}>Add a check to multi-select pills so on-versus-off is unmistakable.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.otag} style={{ pointerEvents: "none" }}>read-only</span></div><p className={s.ddText}>Don&apos;t use a pill for a static label. That is a Tag, and it isn&apos;t clickable.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · List filter</div><div className={s.ctxStage}><div className={s.opills} style={{ pointerEvents: "none" }}><span className={`${s.opill} ${s.opillOn}`}>All<span className={s.opillCount}>147</span></span><span className={s.opill}>Open<span className={s.opillCount}>24</span></span><span className={s.opill}>Done<span className={s.opillCount}>112</span></span></div></div><p className={s.ctxCaption}>Filter a list by status, each pill showing its match count.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Tag picker</div><div className={s.ctxStage}><div className={s.opills} style={{ pointerEvents: "none" }}><span className={`${s.opill} ${s.opillOn}`}><Check />Design</span><span className={s.opill}>Eng</span><span className={`${s.opill} ${s.opillOn}`}><Check />Docs</span></div></div><p className={s.ctxCaption}>Multi-select topics or tags when assigning or filtering.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Quick range</div><div className={s.ctxStage}><div className={s.opills} style={{ pointerEvents: "none" }}><span className={s.opill}>Day</span><span className={`${s.opill} ${s.opillOn}`}>Week</span><span className={s.opill}>Month</span></div></div><p className={s.ctxCaption}>A compact time-range switch above a chart.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--pill-pad</td><td>6px 13px</td><td>Chip padding</td></tr>
          <tr><td className={s.tokName}>--pill-bg</td><td><span className={s.tokSwatch} style={{ background: "#16171b" }} />#16171B</td><td>Resting fill</td></tr>
          <tr><td className={s.tokName}>--pill-border</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Resting border</td></tr>
          <tr><td className={s.tokName}>--pill-on-fill</td><td>rgba(255,122,0,.14)</td><td>Selected tint</td></tr>
          <tr><td className={s.tokName}>--pill-on-text</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Selected label + check</td></tr>
          <tr><td className={s.tokName}>--pill-radius</td><td>999px</td><td>Fully rounded</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
