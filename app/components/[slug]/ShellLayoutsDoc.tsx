import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import ShellLayoutsDemo from "./ShellLayoutsDemo";
import s from "../docs.module.css";

const REGIONS: [string, string][] = [
  ["Top menu", "A full-width bar for brand, primary navigation and account. Spans above everything else."],
  ["Left menu", "A vertical rail for section navigation. Sits beside the content, full height."],
  ["Header", "A page-level bar inside the content column: breadcrumb, title and the screen's primary action."],
  ["Content", "The work area. Cards summarise, tables list. Everything else is chrome around this."],
];

export default function ShellLayoutsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>The app shell</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>Every screen is the same four regions in different combinations: a top menu, a left menu, a page header and the content area. Compose them from these parts, then let the content fill with the cards and tables you have already built.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Six arrangements</div><div className={s.secBody}>
        <ShellLayoutsDemo />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Regions</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Region</th><th>Role</th></tr></thead><tbody>
          {REGIONS.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
