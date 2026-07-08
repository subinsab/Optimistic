import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import PaginationDemo from "./PaginationDemo";
import PaginationConfigurator from "./PaginationConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Pagination. Dark design system: a numbered row with prev/next chevrons. Items are 34px square, radius 8, text #CFD3DA; the current page is a warm tint (#FF7A00 @14% fill, #FF9D45 text) and non-interactive. Long ranges collapse to 1 … c-1 c c+1 … total with #565A62 ellipses. Chevrons disable and drop to 0.32 opacity at the ends. Variants: numbered, compact (chevrons + 'Page x of y'), simple (Previous/Next ghost buttons). Sizes S/M/L. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<nav class="o-pag" aria-label="Pagination">
  <button class="o-pag__item" aria-label="Previous">‹</button>
  <button class="o-pag__item">1</button>
  <span class="o-pag__ellipsis">…</span>
  <button class="o-pag__item is-current" aria-current="page">4</button>
  <button class="o-pag__item">5</button>
  <span class="o-pag__ellipsis">…</span>
  <button class="o-pag__item">12</button>
  <button class="o-pag__item" aria-label="Next">›</button>
</nav>` },
  { label: "CSS", code: `.o-pag { display: inline-flex; align-items: center; gap: 4px; }
.o-pag__item {
  min-width: 34px; height: 34px; display: grid; place-items: center;
  font: 500 .82rem/1 inherit; color: #cfd3da;
  background: none; border: 1px solid transparent; border-radius: 8px; cursor: pointer;
}
.o-pag__item:hover:not(.is-current) { background: #16171b; border-color: #242428; }
.o-pag__item.is-current {
  background: rgba(255,122,0,.14); border-color: rgba(255,122,0,.4); color: #ff9d45;
}
.o-pag__item:disabled { opacity: .32; cursor: not-allowed; }` },
  { label: "React", code: `import { Pagination } from "@optimistic/ui";

<Pagination
  page={page}
  total={12}
  onChange={setPage}
/>

// compact / simple share the same props:
<Pagination page={page} total={12} variant="compact" onChange={setPage} />` },
  { label: "Angular", code: `<o-pagination
  [page]="page"
  [total]="12"
  (change)="page = $event">
</o-pagination>` },
  { label: "Async / API", code: `// Page state belongs in the URL — refresh, share and back all just work.
const page = Number(searchParams.get("page") ?? 1);

const { data, isLoading } = useQuery({
  queryKey: ["items", page],
  queryFn: () => fetch(\`/api/items?page=\${page}&size=20\`).then((r) => r.json()),
  placeholderData: keepPreviousData,   // hold the old page while the next loads
});

// total pages comes from the server envelope, not a guess:
<Pagination page={page} total={data?.pageCount ?? 1}
  onChange={(p) => setSearchParams({ page: String(p) })} />` },
];

export default function PaginationDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><PaginationDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><PaginationConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>page / total</td><td>number / number</td><td>Current page and page count, both 1-based</td></tr>
          <tr><td className={s.tokName}>onChange</td><td>(page) =&gt; void</td><td>Fires with the requested page</td></tr>
          <tr><td className={s.tokName}>variant</td><td>numbered · compact · simple · page-size</td><td>Numbered is the default</td></tr>
          <tr><td className={s.tokName}>pageSize / onPageSizeChange</td><td>number / (n) =&gt; void</td><td>Rows-per-page select; resets to page 1 and re-derives the range</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Item scale; M is the default</td></tr>
          <tr><td className={s.tokName}>siblings</td><td>number</td><td>Pages kept either side of current before an ellipsis</td></tr>
          <tr><td className={s.tokName}>← / →</td><td>—</td><td>Prev / next; both disable at the ends</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Pagination moves through pages of one list. For peer views of one item use Tabs; for endless feeds prefer a Loader with infinite scroll.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <nav className={s.opag} style={{ pointerEvents: "none" }}>
              <span className={`${s.opagItem} ${s.opagArrow}`}>‹</span>
              <span className={s.opagItem}>1</span>
              <span className={s.opagEllipsis}>…</span>
              <span className={`${s.opagItem} ${s.opagOn}`}>4</span>
              <span className={s.opagItem}>5</span>
              <span className={`${s.opagItem} ${s.opagArrow}`}>›</span>
            </nav>
            <span className={s.anaMark} style={{ left: "4%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "40%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "58%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Chevron</span><span className={s.anaDesc}>Prev / next; disabled and dimmed at the ends.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Ellipsis</span><span className={s.anaDesc}>A gap in the range, never a click target.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Current</span><span className={s.anaDesc}>Warm tint, aria-current, not interactive.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={s.opag} style={{ pointerEvents: "none" }}><span className={s.opagItem}>1</span><span className={s.opagEllipsis}>…</span><span className={`${s.opagItem} ${s.opagOn}`}>6</span><span className={s.opagEllipsis}>…</span><span className={s.opagItem}>20</span></nav></div><p className={s.ddText}>Collapse long ranges. Keep the first, last and a window around current.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.opag} style={{ pointerEvents: "none", maxWidth: 260, overflow: "hidden" }}>{[1,2,3,4,5,6,7,8].map(n => <span key={n} className={`${s.opagItem} ${n===4?s.opagOn:""}`}>{n}</span>)}</nav></div><p className={s.ddText}>Don&apos;t print every page. A twenty-item row is a wall, not a control.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={s.opag} style={{ pointerEvents: "none" }}><span className={`${s.opagItem} ${s.opagArrow}`} style={{ opacity: 0.32 }}>‹</span><span className={`${s.opagItem} ${s.opagOn}`}>1</span><span className={s.opagItem}>2</span><span className={`${s.opagItem} ${s.opagArrow}`}>›</span></nav></div><p className={s.ddText}>Disable Previous on page one. Dead-end controls tell the truth.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.opag} style={{ pointerEvents: "none" }}><span className={`${s.opagItem} ${s.opagOn}`}>3</span><span className={s.opagItem} style={{ borderColor: "rgba(255,122,0,0.4)", background: "rgba(255,122,0,0.14)", color: "#ff9d45" }}>7</span></nav></div><p className={s.ddText}>Never highlight two pages. Exactly one current page, always.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Under a table</div><div className={s.ctxStage}><div style={{ width: "100%" }}><span className={s.mockLine} style={{ width: "100%" }} /><span className={s.mockLine} style={{ width: "100%" }} /><span className={s.mockLine} style={{ width: "100%" }} /><nav className={s.opag} style={{ pointerEvents: "none", marginTop: 12 }}><span className={`${s.opagItem} ${s.opagArrow}`}>‹</span><span className={`${s.opagItem} ${s.opagOn}`}>1</span><span className={s.opagItem}>2</span><span className={s.opagItem}>3</span><span className={`${s.opagItem} ${s.opagArrow}`}>›</span></nav></div></div><p className={s.ctxCaption}>Numbered pagination sits below a data table, right or centre aligned.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Compact toolbar</div><div className={s.ctxStage}><nav className={s.opag} style={{ pointerEvents: "none" }}><span className={`${s.opagItem} ${s.opagArrow}`}>‹</span><span className={s.opagInfo}>Page 4 of 12</span><span className={`${s.opagItem} ${s.opagArrow}`}>›</span></nav></div><p className={s.ctxCaption}>The compact variant saves width in dense headers and mobile.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Simple feed</div><div className={s.ctxStage}><nav className={s.opag} style={{ pointerEvents: "none" }}><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Previous</span><span className={s.opagInfo}>4 / 12</span><span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Next</span></nav></div><p className={s.ctxCaption}>Two ghost buttons when the exact page number does not matter.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--pag-size</td><td>34px</td><td>Item hit area (28 / 40 at S / L)</td></tr>
          <tr><td className={s.tokName}>--pag-radius</td><td>8px</td><td>Item corner</td></tr>
          <tr><td className={s.tokName}>--pag-current</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00 @14%</td><td>Current page tint + #FF9D45 text</td></tr>
          <tr><td className={s.tokName}>--pag-hover</td><td><span className={s.tokSwatch} style={{ background: "#16171b" }} />#16171B</td><td>Hover fill on idle items</td></tr>
          <tr><td className={s.tokName}>--pag-ellipsis</td><td><span className={s.tokSwatch} style={{ background: "#565a62" }} />#565A62</td><td>Range gap glyph</td></tr>
          <tr><td className={s.tokName}>--pag-disabled</td><td>0.32 opacity</td><td>Chevrons at the ends</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
