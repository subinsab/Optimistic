import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const BP: [string, string, string][] = [
  ["sm", "≤ 480px", "Phones — one column; the nav folds into a drawer."],
  ["md", "≤ 768px", "Tablets — the grid drops toward 6 tracks; side rails collapse."],
  ["lg", "≤ 1024px", "Laptops — the docs rail appears; two-column layouts unlock."],
  ["xl", "≥ 1280px", "Desktops — content stops widening at the container; gutters grow."],
];

export default function BreakpointsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Fluid first, breakpoints second</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>Most of the layout never waits for a breakpoint — type and spacing scale continuously with <code style={{ color: "#ffb37a" }}>clamp()</code>, so a design that fits at 1280px still breathes at 1440px. Breakpoints are for the moments a layout must genuinely <strong style={{ color: "#e7e9ee" }}>reflow</strong>: a rail that has to fold, a grid that has to drop tracks.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The widths</div><div className={s.secBody}>
        <div>{BP.map(([name, val, text]) => (
          <div key={name} className={s.fnBpRow}>
            <span className={s.fnBpName}>{name}</span>
            <span className={s.fnBpVal}>{val}</span>
            <span className={s.fnBpText}>{text}</span>
          </div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Trigger</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--bp-sm</td><td>480px</td><td>Single column, drawer nav</td></tr>
          <tr><td className={s.tokName}>--bp-md</td><td>768px</td><td>Grid toward 6 tracks, rails fold</td></tr>
          <tr><td className={s.tokName}>--bp-lg</td><td>1024px</td><td>Docs rail, two-column layouts</td></tr>
          <tr><td className={s.tokName}>--bp-xl</td><td>1280px</td><td>Container cap reached</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <div className={s.fnCards}>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Design mobile-up</div><p className={s.fnCardText}>Start at the smallest width and add columns as space allows. It&apos;s far easier than removing them later.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Reach for clamp first</div><p className={s.fnCardText}>If a value can scale smoothly, use <code style={{ color: "#ffb37a" }}>clamp()</code>. Save hard breakpoints for structural reflows.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Four is enough</div><p className={s.fnCardText}>sm, md, lg, xl cover every layout in the system. More breakpoints mean more states to test and keep honest.</p></div>
        </div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
