import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import FilterDemo from "./FilterDemo";
import FilterConfigurator from "./FilterConfigurator";
import FilterBehavior from "./FilterBehavior";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Filter component. Dark-field design system. Three connected pieces: (1) a horizontal FILTER BAR — a search input, up to four quick-filter chips, an 'All filters' button, a 'Clear all' link, and a rows/grid view switcher. (2) a QUICK-FILTER TRIGGER (button style) — a chip with a label, a caret, and — once anything is picked — a blue count badge #3E63DD and a clear ✕; clicking opens a checkbox dropdown. (3) a vertical FILTER PANEL — a header (sliders icon + 'All filters' + count badge + close), tabs with a warm #FF7A00 underline, collapsible sections (each a label + a blue active-dot + chevron; expanded shows a search box, a checkbox list capped at 6 with a '+N more' / 'Show less' toggle), and a sticky footer with 'Save filter', 'Clear all' (ghost) and 'Apply' (warm). Checkboxes use the brand warm check. Filtering is optimistic — the list narrows instantly, the server reconciles after. Deliver React + CSS."
);

/* static quick-filter chip for the anatomy */
function Chip() {
  return (
    <span className={`${s.ofilChip} ${s.ofilChipOn}`}>
      Status
      <span className={s.ofilChipCount}>2</span>
      <span className={s.ofilChipCaret}><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <span className={s.ofilChipClear} aria-hidden="true"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
    </span>
  );
}

const CODE = [
  { label: "HTML", code: `<!-- quick-filter trigger -->
<button class="o-filter__chip is-active">
  Status
  <span class="o-filter__count">2</span>
  <svg class="o-filter__caret">…</svg>
  <button class="o-filter__clear" aria-label="Clear">✕</button>
</button>

<!-- filter bar -->
<div class="o-filter__bar">
  <div class="o-filter__search"><input placeholder="Search here"></div>
  <button class="o-filter__chip">Status</button>
  <button class="o-filter__all">All filters <span class="o-filter__count">2</span></button>
  <button class="o-filter__clear-all">Clear all</button>
</div>` },
  { label: "CSS", code: `.o-filter__chip {
  display: inline-flex; align-items: center; gap: 7px;
  height: 34px; padding: 0 10px; border-radius: 8px;
  border: 1px solid #242428; background: #0e0f12; color: #cfd3da;
}
.o-filter__chip.is-active { background: #16171b; border-color: #3a3a42; }
.o-filter__count {
  min-width: 18px; height: 18px; border-radius: 999px;
  background: #3e63dd; color: #fff; font-size: .62rem; font-weight: 600;
}
.o-filter__tab.is-active::after {   /* warm tab underline */
  content: ""; position: absolute; inset: auto 0 -1px; height: 2px;
  background: #ff7a00;
}` },
  { label: "React", code: `import { FilterBar, QuickFilter, FilterPanel } from "@optimistic/ui";

<FilterBar onSearch={setQuery} onClearAll={reset}>
  <QuickFilter label="Status" options={STATUS} value={status} onChange={setStatus} />
  <QuickFilter label="Owner" options={OWNERS} value={owner} onChange={setOwner} />
  <FilterBar.AllFilters count={active} onClick={() => setPanel(true)} />
</FilterBar>

<FilterPanel open={panel} onClose={() => setPanel(false)} onApply={apply}>
  <FilterPanel.Section label="Label one" options={NAMES} />
</FilterPanel>` },
  { label: "Angular", code: `<o-filter-bar (search)="q=$event" (clearAll)="reset()">
  <o-quick-filter label="Status" [options]="status" [(value)]="statusSel"></o-quick-filter>
  <o-quick-filter label="Owner" [options]="owners" [(value)]="ownerSel"></o-quick-filter>
</o-filter-bar>

<o-filter-panel [(open)]="panel" (apply)="apply()">
  <o-filter-section label="Label one" [options]="names"></o-filter-section>
</o-filter-panel>` },
  { label: "Async / API", code: `// Filters are OPTIMISTIC: narrow the list now, reconcile after. Debounce
// the request and cancel stale ones so the newest filter always wins.
function useFilteredItems(all, filters) {
  const [items, setItems] = useState(() => applyLocally(all, filters));

  useEffect(() => {
    setItems(applyLocally(all, filters));   // optimistic: instant
    const ctrl = new AbortController();
    const id = setTimeout(async () => {
      try {
        const res = await fetch(\`/api/items?\${toQuery(filters)}\`, { signal: ctrl.signal });
        setItems(await res.json());          // reconcile with the server
      } catch (e) {
        if (e.name !== "AbortError") toast.error("Couldn't refresh results.");
      }
    }, 250);                                 // debounce
    return () => { clearTimeout(id); ctrl.abort(); };
  }, [all, filters]);

  return items;
}` },
];

export default function FilterDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer">
            <i>✳</i> Start building with Claude ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}><FilterDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><FilterConfigurator /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <div className={s.subLabel}>Props</div>
            <table className={s.tokTable}>
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>options</td><td>string[]</td><td>—</td><td>The values a quick filter or section offers</td></tr>
                <tr><td className={s.tokName}>value / onChange</td><td>string[]</td><td>[]</td><td>Selected values; multi-select</td></tr>
                <tr><td className={s.tokName}>clearable</td><td>boolean</td><td>true</td><td>Shows the ✕ once anything is picked</td></tr>
                <tr><td className={s.tokName}>maxQuickFilters</td><td>number</td><td>4</td><td>Beyond this, filters live in the panel</td></tr>
                <tr><td className={s.tokName}>onApply / onClearAll</td><td>() =&gt; void</td><td>—</td><td>Panel footer actions</td></tr>
                <tr><td className={s.tokName}>collapseAt</td><td>number</td><td>6</td><td>Section list length before &quot;+N more&quot;</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Toggle an option</td><td>Filters the result set immediately (optimistic)</td></tr>
                <tr><td className={s.tokName}>Chip ✕ / Clear all</td><td>Removes that filter, or all of them</td></tr>
                <tr><td className={s.tokName}>Escape / outside click</td><td>Closes the open dropdown or panel</td></tr>
                <tr><td className={s.tokName}>Apply</td><td>Commits the panel&apos;s staged selection</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Live behavior — every demo is real</div>
            <FilterBehavior />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.specimenWrap}>
                  <Chip />
                  <span className={s.anaMark} style={{ left: "6%", top: -46 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
                  <span className={s.anaMark} style={{ left: "26%", top: -64 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 48 }} /></span>
                  <span className={s.anaMark} style={{ left: "55%", top: -46 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
                  <span className={s.anaMark} style={{ left: "74%", top: -64 }} aria-hidden="true"><b className={s.anaBadge}>4</b><i className={s.anaConn} style={{ height: 48 }} /></span>
                  <span className={s.anaMark} style={{ left: "92%", top: -46 }} aria-hidden="true"><b className={s.anaBadge}>5</b><i className={s.anaConn} style={{ height: 30 }} /></span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Chip</span><span className={s.anaDesc}>A button-style pill. Quiet when empty, subtly filled once a value is set.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Names the facet, not the value. &quot;Status&quot;, not &quot;Live&quot;.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Count</span><span className={s.anaDesc}>A blue badge with the number of selected values. Hidden at zero.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Caret</span><span className={s.anaDesc}>Flips up while the dropdown is open.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Clear</span><span className={s.anaDesc}>Removes just this filter, appearing only when it holds a value.</span></div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Do&apos;s and Don&apos;ts</div>
          <div className={s.secBody}>
            <div className={s.ddGrid}>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}><Chip /></div>
                <p className={s.ddText}>Show the count. A number on the chip tells the user how many values are active without opening it.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>7 quick filters in one row</span></div>
                <p className={s.ddText}>Don&apos;t line up every facet as a chip. Past four, the rest belong behind &quot;All filters&quot;.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}><span className={s.ofilClearAll} style={{ color: "#5b8cff" }}>Clear all</span></div>
                <p className={s.ddText}>Give one escape hatch. &quot;Clear all&quot; resets everything in a single, obvious click.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}><span className={s.ovHint}>Apply · then a 3s spinner</span></div>
                <p className={s.ddText}>Don&apos;t block on the network. Filter locally at once, then reconcile — never make the user wait to see a change.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>In context: Examples</div>
          <div className={s.secBody}>
            <div className={s.ctxGrid}>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>A · Above a table</div>
                <div className={s.ctxStage}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span className={`${s.oinput} ${s.inS}`} style={{ flex: 1, display: "flex", alignItems: "center", color: "#565a62", fontSize: "0.74rem" }}>Search…</span>
                      <span className={`${s.ofilChip}`} style={{ height: 28 }}>Status<span className={s.ofilChipCaret}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span>
                    </div>
                    <span className={s.mockLine} style={{ width: "90%" }} />
                    <span className={s.mockLine} style={{ width: "80%" }} />
                    <span className={s.mockLine} style={{ width: "86%" }} />
                  </div>
                </div>
                <p className={s.ctxCaption}>The bar sits in the table header — search left, quick filters beside it.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · As a drawer</div>
                <div className={s.ctxStage}>
                  <div style={{ position: "relative", width: "100%", height: 130, overflow: "hidden", borderRadius: 4, background: "#0b0b0b", border: "1px solid #16171b" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 120, background: "#0e0f12", borderLeft: "1px solid #1e1f24", padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
                      <span style={{ fontSize: "0.72rem", color: "#f4f5f6", fontWeight: 600 }}>All filters</span>
                      <span className={s.mockLine} style={{ width: "80%" }} />
                      <span className={s.mockLine} style={{ width: "70%" }} />
                      <span className={s.mockLine} style={{ width: "76%" }} />
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>&quot;All filters&quot; opens the full panel as a right-hand drawer for deep faceting.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · Active filters</div>
                <div className={s.ctxStage}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span className={`${s.ofilChip} ${s.ofilChipOn}`} style={{ height: 28 }}>Status<span className={s.ofilChipCount}>2</span></span>
                    <span className={`${s.ofilChip} ${s.ofilChipOn}`} style={{ height: 28 }}>Owner<span className={s.ofilChipCount}>1</span></span>
                  </div>
                </div>
                <p className={s.ctxCaption}>Active facets read at a glance — each chip carries its own count.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Measurements &amp; Tokens</div>
          <div className={s.secBody}>
            <table className={s.tokTable}>
              <thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>--filter-chip-h</td><td>34px · radius 8</td><td>Quick-filter trigger height</td></tr>
                <tr><td className={s.tokName}>--filter-panel-w</td><td>288px</td><td>Vertical panel width</td></tr>
                <tr><td className={s.tokName}>--filter-count</td><td><span className={s.tokSwatch} style={{ background: "#3e63dd" }} />#3E63DD</td><td>Count badge (blue), white number</td></tr>
                <tr><td className={s.tokName}>--filter-tab</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Active tab underline (warm)</td></tr>
                <tr><td className={s.tokName}>--filter-dot</td><td><span className={s.tokSwatch} style={{ background: "#3e63dd" }} />#3E63DD</td><td>Section active indicator</td></tr>
                <tr><td className={s.tokName}>--filter-apply</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Apply button (the one warm action)</td></tr>
                <tr><td className={s.tokName}>--filter-link</td><td><span className={s.tokSwatch} style={{ background: "#5b8cff" }} />#5B8CFF</td><td>Save / Clear / +N more links</td></tr>
                <tr><td className={s.tokName}>--filter-collapse</td><td>6 rows</td><td>List length before &quot;+N more&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Code</div>
          <div className={s.secBody}><CodeTabs tabs={CODE} /></div>
        </section>
      </Reveal>

      <RelatedSection related={related} />
    </>
  );
}
