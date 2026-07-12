import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SearchDemo from "./SearchDemo";
import SearchConfigurator from "./SearchConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Search. Dark design system: an Input with a leading magnifier (#767B87), a warm focus ring, and results that answer as you type. Each result row has an icon, a title (#E7E9EE) and a muted meta line, in a #141519 listbox. A clear × appears once there is a query; an optional mono shortcut key (e.g. '/') sits at the right when empty. No-match shows an honest message. Debounce input, cancel stale requests, ↑/↓ move, Enter opens. role=searchbox. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-search">
  <span class="o-input__icon"><SearchIcon /></span>
  <input class="o-input o-input--m has-icon" type="search"
         role="searchbox" placeholder="Search components…" />
  <button class="o-input__affix" aria-label="Clear">×</button>

  <div class="o-menu" role="listbox">
    <button class="o-search__result" role="option">
      <DocIcon /> <span><b>Combobox</b><small>Forms</small></span>
    </button>
  </div>
</div>` },
  { label: "CSS", code: `.o-search { position: relative; }
.o-search__result {
  display: flex; align-items: center; gap: 11px; width: 100%;
  padding: 9px 10px; border-radius: 7px; cursor: pointer; background: none;
}
.o-search__result:hover, .o-search__result.is-active { background: #1e1f25; }
.o-search__kbd {                       /* the shortcut hint */
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  font: .62rem var(--mono); color: #767b87;
  border: 1px solid #2a2a30; border-radius: 4px; padding: 1px 5px;
}` },
  { label: "React", code: `import { Search } from "@optimistic/ui";

<Search
  placeholder="Search components…"
  onSearch={runQuery}
  results={results}
  clearable
  shortcut="/"
  renderResult={(r) => <Result title={r.title} meta={r.group} />}
/>` },
  { label: "Angular", code: `<o-search
  placeholder="Search components…"
  (search)="runQuery($event)"
  [results]="results"
  clearable
  shortcut="/">
</o-search>` },
  { label: "Async / API", code: `// Search answers as you type: debounce, cancel, and never let a slow
// response overwrite a newer one.
const [q, setQ] = useState("");
const deferred = useDeferredValue(q);

const { data: results = [], isFetching } = useQuery({
  queryKey: ["search", deferred],
  queryFn: ({ signal }) =>
    fetch(\`/api/search?q=\${encodeURIComponent(deferred)}\`, { signal })
      .then((r) => r.json()),
  enabled: deferred.trim().length > 1,     // don't hammer on one keystroke
  placeholderData: keepPreviousData,
});

// A "/" shortcut focuses the field from anywhere:
useHotkey("/", () => inputRef.current?.focus());` },
];

export default function SearchDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
  const Doc = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><SearchDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SearchConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>onSearch</td><td>(q) =&gt; void</td><td>Debounced query callback</td></tr>
          <tr><td className={s.tokName}>results</td><td>Result[]</td><td>Rows to render in the listbox</td></tr>
          <tr><td className={s.tokName}>clearable</td><td>boolean</td><td>Shows the × once there is a query</td></tr>
          <tr><td className={s.tokName}>shortcut</td><td>string</td><td>Key hint that focuses the field</td></tr>
          <tr><td className={s.tokName}>size</td><td>L · M · S</td><td>Matches Input; M is the default</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · Enter · Esc</td><td>—</td><td>Move results, open one, or clear + close</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Search runs a free-text query and returns ranked results. To pick from a known list use a Combobox; for a global jump-anywhere palette use the Command Menu.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 260 }}>
            <div className={s.osearch} style={{ pointerEvents: "none" }}>
              <span className={s.inWrap}>
                <span className={s.inIcon}><SearchIcon /></span>
                <span className={`${s.oinput} ${s.inM} ${s.inHasIcon}`} style={{ display: "flex", alignItems: "center" }}>combobox</span>
              </span>
            </div>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "50%", top: 44 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Magnifier</span><span className={s.anaDesc}>Leading icon that names the field&apos;s job.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Query</span><span className={s.anaDesc}>Free text; a × or shortcut sits at the end.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Results</span><span className={s.anaDesc}>Ranked rows with icon, title and meta.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 200 }} role="listbox"><span className={`${s.osearchResult} ${s.omenuActive}`}><span className={s.osearchResIcon}><Doc /></span><span className={s.osearchResText}><span className={s.osearchResTitle}>Combobox</span><span className={s.osearchResMeta}>Forms</span></span></span></div></div><p className={s.ddText}>Give each result a title and context, so people pick the right one.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 200 }} role="listbox"><span className={s.omenuOpt}>combobox</span><span className={s.omenuOpt}>command menu</span></div></div><p className={s.ddText}>Don&apos;t return bare strings with no context or ranking.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 200 }} role="listbox"><div className={s.omenuEmpty}>No components match “xyz”.</div></div></div><p className={s.ddText}>Make the empty state specific and calm — echo the query back.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.osearch} style={{ pointerEvents: "none", maxWidth: 200 }}><span className={s.inWrap}><span className={s.inIcon}><SearchIcon /></span><span className={`${s.oinput} ${s.inM} ${s.inHasIcon}`} style={{ display: "flex", alignItems: "center", color: "#565a62" }}>Type here</span></span></div></div><p className={s.ddText}>Don&apos;t drop the magnifier. Without it, a search reads as any input.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Docs search</div><div className={s.ctxStage}><div className={s.osearch} style={{ pointerEvents: "none", maxWidth: "none" }}><span className={s.inWrap}><span className={s.inIcon}><SearchIcon /></span><span className={`${s.oinput} ${s.inM} ${s.inHasIcon}`} style={{ display: "flex", alignItems: "center", color: "#565a62" }}>Search the docs…</span><span className={s.osearchKbd}>/</span></span></div></div><p className={s.ctxCaption}>A header search with a &quot;/&quot; shortcut to focus from anywhere.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Table filter</div><div className={s.ctxStage}><div className={s.osearch} style={{ pointerEvents: "none", maxWidth: "none" }}><span className={s.inWrap}><span className={s.inIcon}><SearchIcon /></span><span className={`${s.oinput} ${s.inS} ${s.inHasIcon}`} style={{ display: "flex", alignItems: "center" }}>invoice</span></span></div></div><p className={s.ctxCaption}>A small search filtering rows in place, size S.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Result list</div><div className={s.ctxStage}><div className={s.omenu} style={{ position: "static", pointerEvents: "none", maxWidth: 220 }} role="listbox"><span className={`${s.osearchResult} ${s.omenuActive}`}><span className={s.osearchResIcon}><Doc /></span><span className={s.osearchResText}><span className={s.osearchResTitle}>Color System</span><span className={s.osearchResMeta}>Foundations</span></span></span><span className={s.osearchResult}><span className={s.osearchResIcon}><Doc /></span><span className={s.osearchResText}><span className={s.osearchResTitle}>Callout</span><span className={s.osearchResMeta}>Feedback</span></span></span></div></div><p className={s.ctxCaption}>Live results with icon, title and the section they live in.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--search-icon</td><td>38px left pad</td><td>Room for the leading magnifier</td></tr>
          <tr><td className={s.tokName}>--search-affix</td><td>44px right pad</td><td>Room for clear × or shortcut</td></tr>
          <tr><td className={s.tokName}>--result-hover</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Active / hover result row</td></tr>
          <tr><td className={s.tokName}>--result-meta</td><td><span className={s.tokSwatch} style={{ background: "#767b87" }} />#767B87</td><td>Secondary meta line</td></tr>
          <tr><td className={s.tokName}>--kbd-border</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Shortcut key outline</td></tr>
          <tr><td className={s.tokName}>--field-focus</td><td>rgba(255,122,0,.14)</td><td>Warm focus ring</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
