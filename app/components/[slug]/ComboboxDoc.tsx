import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ComboboxDemo from "./ComboboxDemo";
import ComboboxConfigurator from "./ComboboxConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Combobox. Dark design system: an Input (#0E0F12, #242428 border, radius 8, warm focus ring) that filters a listbox as you type. Matched substring is highlighted warm (#FF9D45, bold). Active option (↑/↓) gets a #1E1F25 row; Enter commits, Escape closes, outside click closes. When nothing matches, show an honest empty state, never a dead menu. role=combobox, aria-autocomplete=list, aria-expanded. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-combo">
  <input class="o-input" role="combobox" aria-expanded="true"
         aria-autocomplete="list" placeholder="Search fruit…" />
  <div class="o-menu" role="listbox">
    <button role="option" class="o-menu__opt is-active">
      <b class="o-combo__match">Ap</b>ple
    </button>
    <button role="option" class="o-menu__opt"><b class="o-combo__match">Ap</b>ricot</button>
  </div>
</div>` },
  { label: "CSS", code: `.o-combo { position: relative; }
.o-combo__match { color: #ff9d45; font-weight: 600; }
.o-menu__opt.is-active { background: #1e1f25; color: #f4f5f6; }
.o-menu__empty {
  padding: 16px 10px; text-align: center;
  font-size: .83rem; color: #767b87;
}` },
  { label: "React", code: `import { Combobox } from "@optimistic/ui";

<Combobox
  options={fruits}
  onSelect={setFruit}
  placeholder="Search fruit…"
  filter={(o, q) => o.toLowerCase().includes(q.toLowerCase())}
  emptyState="No fruit matches."
/>` },
  { label: "Angular", code: `<o-combobox
  [options]="fruits"
  (select)="fruit = $event"
  placeholder="Search fruit…">
</o-combobox>` },
  { label: "Async / API", code: `// Remote filtering: debounce, cancel stale requests, key results to the query.
const [q, setQ] = useState("");
const deferred = useDeferredValue(q);

const { data: options = [], isFetching } = useQuery({
  queryKey: ["fruit", deferred],
  queryFn: ({ signal }) =>
    fetch(\`/api/fruit?q=\${encodeURIComponent(deferred)}\`, { signal })
      .then((r) => r.json()),
  enabled: deferred.length > 0,
  placeholderData: keepPreviousData,   // no flicker between keystrokes
});

<Combobox options={options} loading={isFetching}
  onInputChange={setQ} onSelect={pick} emptyState="No results" />` },
];

export default function ComboboxDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><ComboboxDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><ComboboxConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>options</td><td>Item[]</td><td>The full set to filter over</td></tr>
          <tr><td className={s.tokName}>onSelect</td><td>(item) =&gt; void</td><td>Fires when an option is committed</td></tr>
          <tr><td className={s.tokName}>filter</td><td>(item, q) =&gt; boolean</td><td>Custom matcher; defaults to substring</td></tr>
          <tr><td className={s.tokName}>emptyState</td><td>ReactNode</td><td>Shown when nothing matches</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · Enter</td><td>—</td><td>Move the active option; Enter commits it</td></tr>
          <tr><td className={s.tokName}>Esc · outside click</td><td>—</td><td>Close the list</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Combobox when the list is too long to scan but each pick is a known value. For free-text queries that return results use Search; for a short list use Dropdown.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 220 }}>
            <div className={s.ocombo} style={{ pointerEvents: "none" }}>
              <span className={s.inWrap}><span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center" }}>Ap</span></span>
              <div className={s.omenu} style={{ position: "static", marginTop: 6 }} role="listbox">
                <span className={`${s.omenuOpt} ${s.omenuActive}`}><span className={s.ocomboMatch}>Ap</span>ple</span>
                <span className={s.omenuOpt}><span className={s.ocomboMatch}>Ap</span>ricot</span>
              </div>
            </div>
            <span className={s.anaMark} style={{ left: "20%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "20%", top: 60 }} aria-hidden="true"><b className={s.anaBadge}>2</b></span>
            <span className={s.anaMark} style={{ left: "80%", top: 90 }} aria-hidden="true"><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Input</span><span className={s.anaDesc}>Free text that filters as you type.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Match</span><span className={s.anaDesc}>The typed substring, highlighted warm.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Active row</span><span className={s.anaDesc}>Keyboard cursor; Enter commits it.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180 }} role="listbox"><span className={`${s.omenuOpt} ${s.omenuActive}`}><span className={s.ocomboMatch}>Ma</span>ngo</span><span className={s.omenuOpt}><span className={s.ocomboMatch}>Ma</span>ndarin</span></div></div><p className={s.ddText}>Highlight the match so the reader sees why each result is here.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180 }} role="listbox"><span className={s.omenuOpt}>Mango</span><span className={s.omenuOpt}>Mandarin</span><span className={s.omenuOpt}>Melon</span></div></div><p className={s.ddText}>Don&apos;t just dump the whole list unfiltered. Then it is only a Dropdown.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180 }} role="listbox"><div className={s.omenuEmpty}>No fruit matches “xyz”.</div></div></div><p className={s.ddText}>Give the no-match case an honest, specific message.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 180, minHeight: 44 }} role="listbox" /></div><p className={s.ddText}>Don&apos;t leave an empty box open. Silence reads as broken.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Country picker</div><div className={s.ctxStage}><div className={s.ocombo} style={{ pointerEvents: "none", maxWidth: "none" }}><span className={s.inWrap}><span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center", color: "#565a62" }}>Search 190 countries…</span></span></div></div><p className={s.ctxCaption}>Long lists that a plain Dropdown would drown in.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Assignee</div><div className={s.ctxStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 200 }} role="listbox"><span className={`${s.omenuOpt} ${s.omenuActive}`}><span className={s.ocomboMatch}>ad</span>a@team.com</span><span className={s.omenuOpt}><span className={s.ocomboMatch}>ad</span>am@team.com</span></div></div><p className={s.ctxCaption}>Assigning people by typing part of a name or email.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Tag entry</div><div className={s.ctxStage}><div className={s.ocombo} style={{ pointerEvents: "none", maxWidth: "none" }}><span className={s.inWrap}><span className={`${s.oinput} ${s.inM}`} style={{ display: "flex", alignItems: "center" }}>des<span style={{ color: "#565a62" }}>…</span></span></span></div></div><p className={s.ctxCaption}>Choosing from a controlled vocabulary of tags or labels.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--combo-match</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Highlighted substring, weight 600</td></tr>
          <tr><td className={s.tokName}>--combo-active</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Keyboard-active row</td></tr>
          <tr><td className={s.tokName}>--menu-max-h</td><td>244px</td><td>Listbox scrolls past this</td></tr>
          <tr><td className={s.tokName}>--menu-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Results panel</td></tr>
          <tr><td className={s.tokName}>--empty-color</td><td><span className={s.tokSwatch} style={{ background: "#767b87" }} />#767B87</td><td>Empty-state text</td></tr>
          <tr><td className={s.tokName}>--field-focus</td><td>rgba(255,122,0,.14)</td><td>Warm focus ring on the input</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
