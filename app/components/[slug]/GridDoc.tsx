import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import GridDemo from "./GridDemo";
import GridConfigurator from "./GridConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Grid. Dark design system: a 12-column CSS Grid layout primitive. A Container caps width at 1280px with 24px horizontal padding; a Row is display:grid with 12 equal 1fr tracks and a 24px default gap (sm 12px, lg 32px); a Col spans 1–12 tracks and can offset its start column. Pure CSS Grid — no float hacks, no fixed pixel column widths. Responsive: 12 tracks collapse toward fewer at md (≤767px) and to a single column at sm (≤479px). Monochrome surfaces, hairlines #1E1E1E, one warm accent #FF7A00. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-container">
  <div class="o-row">
    <div class="o-col" style="--span:8">Main</div>
    <div class="o-col" style="--span:4">Sidebar</div>
  </div>
</div>` },
  { label: "CSS", code: `.o-container { max-width: 1280px; margin-inline: auto; padding-inline: 24px; }
.o-row { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
.o-row--gap-sm { gap: 12px; }
.o-row--gap-lg { gap: 32px; }
.o-col { grid-column: span var(--span, 12); }
.o-col[style*="--start"] { grid-column: var(--start) / span var(--span); }

@media (max-width: 767px) {
  .o-row { grid-template-columns: repeat(6, 1fr); }
}
@media (max-width: 479px) {
  .o-row { grid-template-columns: 1fr; }
  .o-col { grid-column: 1 / -1 !important; }
}` },
  { label: "React", code: `import { Container, Row, Col } from "@optimistic/ui";

<Container>
  <Row gap="lg">
    <Col span={8}>Main</Col>
    <Col span={4}>Sidebar</Col>
  </Row>
  <Row>
    <Col span={6} offset={3}>Centered</Col>
  </Row>
</Container>` },
  { label: "Angular", code: `<o-container>
  <o-row gap="lg">
    <o-col [span]="8">Main</o-col>
    <o-col [span]="4">Sidebar</o-col>
  </o-row>
</o-container>` },
  { label: "Async / API", code: `// A Grid is layout only — no state, no data, no events.
// It reflows by media query, not by JavaScript. Don't measure
// the viewport and set column counts in an effect; let CSS Grid
// and container queries do the work, so it's correct before hydration.

// Prefer content-driven tracks over fixed pixels:
.o-row--auto { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }

// Reserve real space for async content so the grid doesn't jump
// when data lands — pair with the Skeleton component per cell.` },
];

export default function GridDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><GridDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><GridConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>columns</td><td>number = 12</td><td>Track count on the row; 12 is the base scale</td></tr>
          <tr><td className={s.tokName}>gap</td><td>sm · default · lg</td><td>12 · 24 · 32px between tracks</td></tr>
          <tr><td className={s.tokName}>span</td><td>1–12</td><td>How many tracks a column occupies</td></tr>
          <tr><td className={s.tokName}>offset</td><td>0–11</td><td>Empty tracks before the column starts</td></tr>
          <tr><td className={s.tokName}>maxWidth</td><td>number = 1280</td><td>Container cap; content centres inside it</td></tr>
          <tr><td className={s.tokName}>reflow</td><td>md · sm</td><td>Fewer tracks at ≤767px, single column ≤479px</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The Grid holds no state and fires no events — it reflows through media queries alone, so the layout is correct on the server before a single line of JavaScript runs.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 340 }}>
            <div className={s.ogridRow} style={{ width: "100%" }}>
              <div className={s.ogridCell} style={{ gridColumn: "span 4" }}>4</div>
              <div className={s.ogridCell} style={{ gridColumn: "span 4" }}>4</div>
              <div className={s.ogridCell} style={{ gridColumn: "span 4" }}>4</div>
            </div>
            <span className={s.anaMark} style={{ left: "1%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "16%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "33%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Max-width 1280px with 24px padding; centres the row.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Column</span><span className={s.anaDesc}>Spans one or more of the twelve equal tracks.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Gap</span><span className={s.anaDesc}>The consistent gutter between tracks — never margins.</span></div>
          </div>
        </div>
        <p className={s.ddText} style={{ padding: "14px 0 0", border: 0 }}>Two more properties aren&apos;t visible in a single frame: <strong>offset</strong> pushes a column inward by leaving leading tracks empty, and <strong>reflow</strong> drops the track count at the md and sm breakpoints. Both are in the contract above.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ogridRow} style={{ width: "100%", maxWidth: 220 }}><div className={s.ogridCell} style={{ gridColumn: "span 8" }}>8</div><div className={s.ogridCell} style={{ gridColumn: "span 4" }}>4</div></div></div><p className={s.ddText}>Compose regions from spans of a shared 12-track row. The gap stays consistent everywhere.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", gap: 6 }}><div className={s.ogridCell} style={{ width: 132 }}>132px</div><div className={s.ogridCell} style={{ width: 60 }}>60px</div></div></div><p className={s.ddText}>Don&apos;t hard-code pixel widths per column. They break the moment content or the viewport changes.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ogridRow} style={{ width: "100%", maxWidth: 220, gap: 24 }}><div className={s.ogridCell} style={{ gridColumn: "span 6" }}>6</div><div className={s.ogridCell} style={{ gridColumn: "span 6" }}>6</div></div></div><p className={s.ddText}>Use the gap tokens (12 / 24 / 32) for gutters, so rhythm matches the rest of the page.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.ogridRow} style={{ width: "100%", maxWidth: 220 }}><div className={s.ogridCell} style={{ gridColumn: "span 5" }}>5</div><div className={s.ogridCell} style={{ gridColumn: "span 5" }}>5</div></div></div><p className={s.ddText}>Don&apos;t leave spans that don&apos;t total the columns unless the trailing space is intentional.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · KPI dashboard</div><div className={s.ctxStage}><div className={s.ogridRow} style={{ width: "100%" }}>{["54", "1.3k", "89%"].map((v, i) => <div key={i} className={s.ogridStat} style={{ gridColumn: "span 4", padding: "10px 11px" }}><span className={s.ogridStatLabel}>Metric</span><span className={s.ogridStatValue} style={{ fontSize: "1rem" }}>{v}</span></div>)}</div></div><p className={s.ctxCaption}>Four-across stat cards on a 3-span rhythm.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Main + sidebar</div><div className={s.ctxStage}><div className={s.ogridRow} style={{ width: "100%" }}><div className={s.ogridPanel} style={{ gridColumn: "span 8", minHeight: 48, fontSize: "0.72rem" }}>col-8</div><div className={s.ogridPanel} style={{ gridColumn: "span 4", minHeight: 48, fontSize: "0.72rem" }}>col-4</div></div></div><p className={s.ctxCaption}>An 8+4 split for content beside a rail.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Two-column form</div><div className={s.ctxStage}><div className={s.ogridRow} style={{ width: "100%" }}><div className={s.ogridCell} style={{ gridColumn: "span 6" }}>First</div><div className={s.ogridCell} style={{ gridColumn: "span 6" }}>Last</div><div className={s.ogridCell} style={{ gridColumn: "span 12", marginTop: 8 }}>Email</div></div></div><p className={s.ctxCaption}>Paired fields on 6+6, full-width where needed.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--grid-columns</td><td>12</td><td>Tracks on the base row</td></tr>
          <tr><td className={s.tokName}>--grid-gap</td><td>24px</td><td>Default gutter between tracks</td></tr>
          <tr><td className={s.tokName}>--grid-gap-sm</td><td>12px</td><td>Tight gutter</td></tr>
          <tr><td className={s.tokName}>--grid-gap-lg</td><td>32px</td><td>Roomy gutter</td></tr>
          <tr><td className={s.tokName}>--container-max</td><td>1280px</td><td>Page container cap</td></tr>
          <tr><td className={s.tokName}>--container-pad</td><td>0 24px</td><td>Container horizontal padding</td></tr>
          <tr><td className={s.tokName}>--bp-md</td><td>≤ 767px</td><td>Row collapses toward 6 tracks</td></tr>
          <tr><td className={s.tokName}>--bp-sm</td><td>≤ 479px</td><td>Row becomes a single column</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
