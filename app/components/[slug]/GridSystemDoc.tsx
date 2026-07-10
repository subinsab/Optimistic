import Link from "next/link";
import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import GridSystemDemo from "./GridSystemDemo";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CODE = [
  { label: "CSS", code: `/* mobile-first — 4 columns */
.o-container { padding-inline: 16px; }
.o-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

@media (min-width: 768px) {            /* tablet — 8 columns */
  .o-container { padding-inline: 32px; }
  .o-row { grid-template-columns: repeat(8, 1fr); gap: 24px; }
}
@media (min-width: 1024px) {           /* web — 12 columns */
  .o-container { max-width: 1320px; margin-inline: auto; padding-inline: clamp(24px, 5vw, 64px); }
  .o-row { grid-template-columns: repeat(12, 1fr); gap: 24px; }
}

/* a region spans different tracks per device */
.o-col            { grid-column: span var(--m, 4); }
@media (min-width: 768px)  { .o-col { grid-column: span var(--t); } }
@media (min-width: 1024px) { .o-col { grid-column: span var(--d); } }` },
  { label: "HTML", code: `<div class="o-container">
  <div class="o-row">
    <!-- sidebar: 4 cols on mobile, 2 on tablet, 3 on web -->
    <aside class="o-col" style="--m:4; --t:2; --d:3">Sidebar</aside>
    <!-- content: fills the rest -->
    <main  class="o-col" style="--m:4; --t:6; --d:9">Content</main>
  </div>

  <div class="o-row">
    <!-- four cards: stack 2-up on mobile, 2-up tablet, 4-up web -->
    <div class="o-col" style="--m:2; --t:4; --d:3">Card</div>
    <div class="o-col" style="--m:2; --t:4; --d:3">Card</div>
    <div class="o-col" style="--m:2; --t:4; --d:3">Card</div>
    <div class="o-col" style="--m:2; --t:4; --d:3">Card</div>
  </div>
</div>` },
  { label: "React", code: `import { Container, Row, Col } from "@optimistic/ui";

// span takes a number, or a per-device object { mobile, tablet, web }
<Container>
  <Row>
    <Col span={{ mobile: 4, tablet: 2, web: 3 }}>Sidebar</Col>
    <Col span={{ mobile: 4, tablet: 6, web: 9 }}>Content</Col>
  </Row>

  <Row>
    {cards.map((c) => (
      <Col key={c.id} span={{ mobile: 2, tablet: 4, web: 3 }}>{c.title}</Col>
    ))}
  </Row>
</Container>` },
  { label: "Angular", code: `<o-container>
  <o-row>
    <o-col [span]="{ mobile: 4, tablet: 2, web: 3 }">Sidebar</o-col>
    <o-col [span]="{ mobile: 4, tablet: 6, web: 9 }">Content</o-col>
  </o-row>

  <o-row>
    <o-col *ngFor="let c of cards" [span]="{ mobile: 2, tablet: 4, web: 3 }">
      {{ c.title }}
    </o-col>
  </o-row>
</o-container>` },
  { label: "Tokens", code: `/* the whole system as custom properties */
:root {
  --grid-columns-mobile: 4;   --grid-columns-tablet: 8;   --grid-columns-web: 12;
  --grid-gutter-mobile: 16px; --grid-gutter-tablet: 24px; --grid-gutter-web: 24px;
  --grid-margin-mobile: 16px; --grid-margin-tablet: 32px;
  --grid-margin-web: clamp(24px, 5vw, 64px);
  --container-max: 1320px;
  --bp-tablet: 768px;         --bp-web: 1024px;
}` },
];

export default function GridSystemDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>One system, three widths</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>Layout hangs from a single responsive grid that changes column count with the viewport: <strong style={{ color: "#e7e9ee" }}>4 columns on mobile</strong>, <strong style={{ color: "#e7e9ee" }}>8 on tablet</strong>, <strong style={{ color: "#e7e9ee" }}>12 on web</strong>. Regions are described as spans of those columns, one value per device, so the same markup reflows instead of being rebuilt. Web content is capped by a 1320px container; below that, the grid is fluid and margins do the breathing.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The three grids — live</div><div className={s.secBody}>
        <GridSystemDemo />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Specifications</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>System</th><th>Applies</th><th>Columns</th><th>Gutter</th><th>Margin</th><th>Container</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Mobile</td><td>&lt; 768px</td><td>4</td><td>16px</td><td>16px</td><td>fluid</td></tr>
          <tr><td className={s.tokName}>Tablet</td><td>768 – 1023px</td><td>8</td><td>24px</td><td>32px</td><td>fluid</td></tr>
          <tr><td className={s.tokName}>Web</td><td>≥ 1024px</td><td>12</td><td>24px</td><td>clamp(24,5vw,64)</td><td>1320px max</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anaList}>
          <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Centres content and caps its width at 1320px on web.</span></div>
          <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Margin</span><span className={s.anaDesc}>The space between the viewport edge and the first column.</span></div>
          <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Column</span><span className={s.anaDesc}>One of 4 / 8 / 12 equal tracks a region can span.</span></div>
          <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Gutter</span><span className={s.anaDesc}>The consistent gap between columns — never a margin.</span></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Spanning across devices</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660, marginBottom: 16 }}>A region declares a span per device. Because the column counts are multiples (4 → 8 → 12), a half-width block stays a half-width block: <code style={{ color: "#ffb37a" }}>2 / 4 / 6</code>. A common app shell reads like this:</p>
        <table className={s.tokTable}><thead><tr><th>Region</th><th>Mobile (of 4)</th><th>Tablet (of 8)</th><th>Web (of 12)</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Sidebar</td><td>4 (stacks)</td><td>2</td><td>3</td></tr>
          <tr><td className={s.tokName}>Content</td><td>4</td><td>6</td><td>9</td></tr>
          <tr><td className={s.tokName}>Card (×4)</td><td>2 (2-up)</td><td>4 (2-up)</td><td>3 (4-up)</td></tr>
          <tr><td className={s.tokName}>Full-bleed</td><td>4</td><td>8</td><td>12</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>How to use it in code</div><div className={s.secBody}>
        <CodeTabs tabs={CODE} />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <div className={s.fnCards}>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Design mobile-up</div><p className={s.fnCardText}>Lay out the 4-column case first, then add tracks as space appears. Widening a layout is far easier than cramming one.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Spans, not pixels</div><p className={s.fnCardText}>Describe a region as <code style={{ color: "#ffb37a" }}>2 / 4 / 6</code>, never a fixed width. The grid handles the maths at every size.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>One gutter, one container</div><p className={s.fnCardText}>Every page shares the same gutter and the 1320px cap, so unrelated screens line up without effort.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Reach for the component</div><p className={s.fnCardText}>The <Link href="/components/gridcomp" style={{ color: "#5b8cff", textDecoration: "underline", textUnderlineOffset: 2 }}>Grid</Link> component ships this as Container / Row / Col with responsive span props.</p></div>
        </div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
