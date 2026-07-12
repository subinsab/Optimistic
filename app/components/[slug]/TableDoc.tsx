import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TableDemo from "./TableDemo";
import SimpleTableDemo from "./SimpleTableDemo";
import FilterTableDemo from "./FilterTableDemo";
import GlobalFilterDemo from "./GlobalFilterDemo";
import TableCellsDemo from "./TableCellsDemo";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Table, a theme-aware data grid. One <table> that reads every colour from CSS tokens so it follows the dark or light theme on <html>. Progressive features, opt-in per grid or per column: a toolbar with title, a live error chip and a search box; sortable header buttons with a dual ember chevron; per-column funnel filters that open a checkbox menu of the distinct values; row selection with a header select-all and indeterminate state; inline cell editing with a text input and a custom dropdown editor for select columns; per-cell validation that draws a red border, an X icon and tints the whole row, with a running count in the toolbar; expandable master/detail rows that reveal a nested panel (often another table) beneath the row; and pagination with a compact 1 … 4 [5] 6 … 50 pager. Deliver React + CSS, all colours from tokens.");

const FEATURES: [string, string][] = [
  ["Sort", "Sortable columns become header buttons. Click cycles ascending, descending, then off; numeric columns sort numerically."],
  ["Filter", "A funnel on filterable columns opens a menu of the distinct values. Tick any to narrow the rows; Clear resets."],
  ["Search", "A single toolbar box filters across every column at once."],
  ["Select", "A leading checkbox column with a header select-all and an indeterminate state for a partial selection."],
  ["Edit", "Click a row to edit every editable cell at once, inline; a bar offers Save or Discard, and validation blocks a bad save."],
  ["Column menu", "A kebab on each header opens sort, pin (left/right/none), autosize, autosize-all, group by, choose columns and reset."],
  ["Groups", "Columns that share a group render a spanning second-level header above them."],
  ["Query", "The advanced filter builds column / operator / value conditions (equals, does not equal, contains, greater than …) matched all or any."],
  ["Validate", "A column validator flags a bad cell with a red border and X, tints the row, and counts into the toolbar chip."],
  ["Expand", "renderDetail adds a disclosure column; expanding a row reveals a panel below it, often a nested table."],
  ["Paginate", "pageSize splits the rows and shows a compact pager with the total count."],
  ["Pin", "Freeze a column to the left or right, and pin summary rows to the top or bottom, so key data stays in view while the rest scrolls."],
  ["Resize", "Drag a header's right edge to widen or narrow a column; the frozen columns and their offsets keep up."],
  ["Refine", "Row numbers, floating per-column filters, a column-hover tint, a status bar and right-to-left layout, each an independent flag."],
];

const PROPS: [string, string, string][] = [
  ["columns", "Column<T>[]", "Per column: key, header, align, width, sortable, filterable, value, render, editable, editor, options, validate"],
  ["data", "T[]", "The rows, each keyed by the column keys"],
  ["title / actions", "ReactNode", "Toolbar left title and right-side slot for buttons"],
  ["searchable", "boolean", "Adds the global search box to the toolbar"],
  ["selectable", "boolean", "Adds the checkbox column and header select-all"],
  ["selected / onSelectedChange", "string[] · (ids) => void", "Controlled selection; omit both for uncontrolled"],
  ["editable", "boolean", "Master switch; columns opt in with editable + editor. Editing a cell opens the whole row inline with Save / Discard"],
  ["onCellEdit", "(rowId, key, value) => void", "Fires per cell when a row's edits are saved"],
  ["renderDetail", "(row) => ReactNode", "Enables expandable master/detail rows"],
  ["pageSize", "number", "Rows per page. Omit to render every row"],
  ["pageSizeOptions", "number[]", "Rows-per-page choices shown as a footer selector, e.g. [5, 10, 20]"],
  ["advancedFilter", "boolean", "Toolbar query builder: [column] [operator] value, matched all or any"],
  ["columns[].group", "string", "Adjacent columns sharing it get a spanning group header"],
  ["columns[].pinned", "left | right", "Freeze that column against an edge on horizontal scroll"],
  ["pinnedRows", "{ top?: T[]; bottom?: T[] }", "Rows frozen top / bottom, outside sort, filter and paging"],
  ["resizable", "boolean", "Drag a header's right edge to resize the column"],
  ["rowNumbers", "boolean", "A leading 1-based index column"],
  ["floatingFilters", "boolean", "A per-column filter row: text columns get a checkbox value list, number columns add a range slider"],
  ["columns[].type", "text | number", "Drives the floating filter's control; auto-inferred from the data if omitted"],
  ["columnHover", "boolean", "Tint the whole column under the cursor"],
  ["statusBar", "boolean", "A footer strip with the row and selection counts"],
  ["rtl", "boolean", "Lay the grid out right-to-left"],
  ["density", "compact | default | comfortable", "Row height"],
  ["appearance", "line | grid | zebra", "Row separators: hairlines, full cell borders, or stripes"],
  ["borderless", "boolean", "Drop the outer frame for full-bleed embedding"],
  ["getRowId / stickyHeader", "(row, i) => string · boolean", "Stable ids; pin the header while the body scrolls"],
];

const VARIANTS: [string, string, string][] = [
  ["density", "compact · default · comfortable", "Tightens or opens up the row height for dense tables or airy ones. Header and body move together."],
  ["appearance", "line · grid · zebra", "line keeps only row hairlines, grid draws every cell border for spreadsheet-style data, zebra stripes alternate rows and drops the hairline."],
  ["borderless", "boolean", "Removes the outer border and radius so the grid sits flush inside a surface you already frame, like a card or a panel."],
];

const TOKENS: [string, string][] = [
  ["--surface / --surface-raised", "Grid field and the header / hover fill"],
  ["--border / --border-subtle", "Outer border and the hairline between rows"],
  ["--accent / --on-accent", "Active sort, current page, selection tint"],
  ["--danger-solid / --danger-surface", "Cell error border, X icon and the row tint"],
  ["--warning-surface / --warning-text", "The toolbar error chip"],
  ["--font-mono", "Header labels and numeric cells"],
  ["--radius-12 / --shadow-2", "Panel radius and the filter / editor menus"],
];

const CODE = [
  {
    label: "React",
    code: `import { Table, type Column } from "./ui/components/table/table";

type Row = { id: string; name: string; sector: string; category: string; seats: number };

const columns: Column<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "sector", header: "Sector", filterable: true },
  {
    key: "category", header: "Category",
    editable: true, editor: "select", options: CATEGORIES,
    validate: (v) => (v === "Policies" ? "Not an allowed category" : null),
  },
  { key: "seats", header: "Seats", align: "right", sortable: true },
];

<Table
  columns={columns}
  data={rows}
  getRowId={(r) => r.id}
  title="Data subjects"
  searchable
  selectable
  editable
  onCellEdit={(id, key, value) => save(id, key, value)}
  renderDetail={(r) => <ChargesTable owner={r.id} />}
  pageSize={10}
/>`,
  },
  {
    label: "Theme",
    code: `/* The grid reads its colours from tokens.css, so it follows the
   theme on <html>. No props to change; just flip the attribute. */

<html data-theme="daylight">   <!-- light -->
<html>                          <!-- dark (default) -->

/* Ship your own product theme by copying the block in tokens.css
   and overriding the accent (and anything else): */
[data-theme="harbor"] { --accent: var(--cobalt-500); }`,
  },
  {
    label: "Pinning",
    code: `// Freeze columns against an edge, and pin a totals row to the bottom.
// Frozen columns stay put while the rest of the grid scrolls sideways.
const columns: Column<Row>[] = [
  { key: "name", header: "Name", pinned: "left", width: 210 },
  { key: "bank", header: "Bank", width: 160 },
  // ...more columns that overflow the width...
  { key: "size", header: "Size", pinned: "right", width: 120 },
];

<Table
  columns={columns}
  data={rows}
  pinnedRows={{ bottom: [{ name: "12 auditors", size: "≈ 1.1 GB" }] }}
/>`,
  },
  {
    label: "Master / detail",
    code: `// renderDetail turns each row into a disclosure. Return anything,
// most often a nested Table for the row's related records.
<Table
  columns={columns}
  data={agreements}
  renderDetail={(row) => (
    <Table
      columns={chargeColumns}
      data={row.charges}
      stickyHeader={false}
      caption={\`Charges for \${row.name}\`}
    />
  )}
/>`,
  },
  {
    label: "Async / API",
    code: `// Sort, filter and paginate on the server for large sets: keep the
// header controls, hand their state to the query instead of the client.
const { data } = useQuery(["rows", sort, filters, page], () =>
  fetch(\`/api/rows?sort=\${sort.key}&dir=\${sort.dir}&page=\${page}\`).then(r => r.json())
);

// Optimistic edit: write the cell now, reconcile if the server rejects.
async function onCellEdit(id, key, value) {
  const prev = rows;
  setRows((xs) => xs.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  const r = await fetch(\`/api/rows/\${id}\`, { method: "PATCH", body: JSON.stringify({ [key]: value }) });
  if (!r.ok) setRows(prev);
}`,
  },
];

export default function TableDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>A data grid, not just a table</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>Table is the workhorse for rows of comparable records: scan, sort, filter, search, select, edit in place and drill into a row. Every feature is opt-in, so the same component covers a three-column read-only list and a full editable grid. It reads its colours from tokens, so it follows the theme on the page. For a vertical stack of single ideas reach for a List; for quick filters use Pills.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>A simple table</div><div className={s.secBody}><SimpleTableDemo /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Filter with removable tags</div><div className={s.secBody}><FilterTableDemo /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Global filter bar</div><div className={s.secBody}><GlobalFilterDemo /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The full data grid · Fully Interactive</div><div className={s.secBody}><TableDemo /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rows &amp; cell types</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>A cell renders whatever you return from <code>column.render</code>. Switch to the Cells tab to see rows built from our own components: an Avatar and Avatar group, a status Badge, an Indicator dot, Tags, a star rating, a Progress bar, a sparkline, a Toggle, a Link, and a Button plus an icon Button.</p>
        <TableCellsDemo />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>What it does</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Feature</th><th>Behaviour</th></tr></thead><tbody>
          {FEATURES.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Variants</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>Two orthogonal knobs shape the grid without touching its features. Flip them live with the controls above the demo.</p>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Options</th><th>What changes</th></tr></thead><tbody>
          {VARIANTS.map(([p, o, w]) => <tr key={p}><td className={s.tokName}>{p}</td><td>{o}</td><td>{w}</td></tr>)}
        </tbody></table>
        <div className={s.codeBlock} style={{ marginTop: 18 }}><div className={s.codeHead}><span>tsx</span></div><pre>{`<Table columns={columns} data={rows} density="compact" appearance="grid" />
<Table columns={columns} data={rows} appearance="zebra" />
<Table columns={columns} data={rows} borderless />`}</pre></div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior · The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          {PROPS.map(([p, t, n]) => <tr key={p}><td className={s.tokName}>{p}</td><td>{t}</td><td>{n}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Theme &amp; Tokens</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>Nothing in the grid is a hard-coded colour. It reads these token roles, so switching <code>data-theme</code> on the page recolours the whole grid, dark to daylight, with no prop changes. Try the toggle in the demo above.</p>
        <table className={s.tokTable}><thead><tr><th>Token role</th><th>Where it lands</th></tr></thead><tbody>
          {TOKENS.map(([t, r]) => <tr key={t}><td className={s.tokName}>{t}</td><td>{r}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
