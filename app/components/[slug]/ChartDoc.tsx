import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import ChartDemo from "./ChartDemo";
import s from "../docs.module.css";

const TYPES: [string, string][] = [
  ["Bar", "Vertical columns for comparing categories. Grouped puts series side by side; stacked adds them into one bar."],
  ["Line", "One or more series over an ordered axis. Straight or smooth-curved, with data dots and a hover guide."],
  ["Area", "A line with a gradient fill to the baseline, for a single trending magnitude."],
  ["Donut", "Proportions of a whole, with a centre total and a value legend."],
  ["Sparkline", "A tiny, axis-free trend for tables and cards; the colour follows the direction."],
];

const PROPS: [string, string, string][] = [
  ["type", "bar | line | area", "The chart family for the cartesian <Chart>. Donut and Sparkline are separate exports."],
  ["categories", "string[]", "The x-axis labels, one per data point."],
  ["series", "{ name, data: number[], color? }[]", "One entry per line or bar group; colours auto-assign from the --element palette."],
  ["stacked", "boolean", "Bars (or areas) add up into one column per category instead of grouping."],
  ["curved", "boolean", "Smooth the line/area with a Catmull-Rom spline."],
  ["grid / legend", "boolean", "Horizontal gridlines, and a click-to-toggle series legend."],
  ["yFormat", "(v) => string", "Format the y-axis ticks and tooltip values, e.g. currency or units."],
  ["height", "number", "Plot height in pixels; width is measured from the container."],
  ["Donut segments", "{ label, value, color? }[]", "Each slice; pass total to show the sum (or any node) in the centre."],
  ["Sparkline data", "number[]", "The trend values; add area for a gradient fill under the line."],
];

export default function ChartDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Charts, drawn honestly</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>Five ways to show numbers: bar, line, area, donut and sparkline. Each is pure SVG with no dependency, coloured from the categorical <code>--element</code> tokens, so a chart follows the dark or light theme on the page like everything else. Hover for a tooltip, click a legend to toggle a series.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The five charts</div><div className={s.secBody}>
        <ChartDemo />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Kinds</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Chart</th><th>Use it for</th></tr></thead><tbody>
          {TYPES.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Props</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          {PROPS.map(([p, t, n]) => <tr key={p}><td className={s.tokName}>{p}</td><td>{t}</td><td>{n}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}>
        <div className={s.codeBlock}><div className={s.codeHead}><span>tsx</span></div><pre>{`import { Chart, Donut, Sparkline } from "./ui/components/chart/chart";

<Chart
  type="line" curved
  categories={["Jan", "Feb", "Mar", "Apr"]}
  series={[
    { name: "Focus", data: [24, 31, 28, 40] },
    { name: "Distraction", data: [30, 22, 26, 18] },
  ]}
  yFormat={(v) => \`\${v}k\`}
/>

<Donut total segments={[
  { label: "Enterprise", value: 48 },
  { label: "Growth", value: 32 },
  { label: "Starter", value: 20 },
]} />

<Sparkline data={[3, 5, 4, 6, 5, 8, 7, 9]} />`}</pre></div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
