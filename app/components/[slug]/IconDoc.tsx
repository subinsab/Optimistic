import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import IconDemo, { LineIcon, IconTile } from "./IconDemo";
import IconConfigurator from "./IconConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Icon — a LINE icon library, single colour. Use the open ISC-licensed Lucide set (lucide.dev, ~2,000 icons): every glyph is a 24×24 box, stroked with currentColor (fill none), round line-caps and joins — so one glyph works on any surface, light strokes on a dark tile, dark strokes on a light tile, no second asset and no per-icon accent colour. Six size steps xs/sm/md/lg/xl/2xl = 12/16/20/24/32/40px. Three stroke weights Light/Regular/Bold = 1.5/2/2.5px with the 24 box fixed. Optional tile wrapper: the glyph centred in a rounded chip, dark (#1C1C1E) or light (#F2F2EF). Provide a searchable browser over the full set. Decorative icons get aria-hidden; meaningful ones get role=img + a title. Deliver React (wrapping lucide-react) + CSS.");

const CODE = [
  { label: "HTML", code: `<!-- decorative: hidden from AT -->
<span class="o-icon o-icon--lg" aria-hidden="true">
  <svg viewBox="0 0 24 24" width="24" height="24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
</span>

<!-- meaningful: named for AT -->
<span class="o-icon" role="img" aria-label="Search"> … </span>` },
  { label: "CSS", code: `.o-icon {
  display: inline-flex;
  fill: none;
  stroke: currentColor;          /* inherits the surface's text colour */
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* size steps — set the box, the stroke scales inside */
.o-icon--xs { width: 12px } .o-icon--sm { width: 16px } .o-icon--md { width: 20px }
.o-icon--lg { width: 24px } .o-icon--xl { width: 32px } .o-icon--2xl { width: 40px }

/* stroke weights */
.o-icon--light svg { stroke-width: 1.5 }
.o-icon--bold  svg { stroke-width: 2.5 }

/* tile wrapper — one glyph, either surface */
.o-icon-tile--dark  { background: #1c1c1e; border: 1px solid #333336; color: #e7e9ee; }
.o-icon-tile--light { background: #f2f2ef; border: 1px solid #dcdcd6; color: #1a1a1a; }` },
  { label: "React", code: `// The library re-exports Lucide, so all ~2,000 icons are available by name.
import { Icon, IconTile } from "@optimistic/ui";

<Icon name="search" size="lg" />
<Icon name="bell" size="md" weight="bold" />

<IconTile name="sparkles" surface="dark" />
<IconTile name="sparkles" surface="light" />

// meaningful icons take a label; decorative ones stay hidden
<Icon name="check" title="Saved" />` },
  { label: "Angular", code: `<o-icon name="search" size="lg"></o-icon>
<o-icon name="bell" size="md" weight="bold"></o-icon>

<o-icon-tile name="sparkles" surface="dark"></o-icon-tile>
<o-icon-tile name="sparkles" surface="light"></o-icon-tile>` },
  { label: "Async / API", code: `// Two rules keep an icon set honest at scale:
//
// 1. currentColor removes the need for a second asset per theme. Never ship
//    icon-dark.svg + icon-light.svg; ship one glyph and set color on the parent.
//
// 2. Don't import all ~2,000 icons eagerly. Tree-shake the few a screen uses,
//    and load a full-set browser lazily.
import { Search, Bell } from "@optimistic/ui/icons";        // tree-shaken

import { DynamicIcon } from "@optimistic/ui/dynamic";        // lazy, by name
<DynamicIcon name={userChosenName} size={20} />` },
];

/* anatomy: a 24-box grid overlays a real Lucide glyph at the same scale */
function AnatomyGlyph() {
  const box = 200;
  const lines = [0, 6, 12, 18, 24];
  return (
    <div style={{ position: "relative", width: box, height: box, color: "#e7e9ee" }}>
      <svg viewBox="0 0 24 24" width={box} height={box} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        {lines.map((v) => <line key={`v${v}`} className={s.oiconGridLine} x1={v} y1={0} x2={v} y2={24} />)}
        {lines.map((v) => <line key={`h${v}`} className={s.oiconGridLine} x1={0} y1={v} x2={24} y2={v} />)}
      </svg>
      <span style={{ position: "absolute", inset: 0, display: "flex" }}><LineIcon name="search" px={box} /></span>
    </div>
  );
}

export default function IconDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href="https://lucide.dev/icons/" target="_blank" rel="noreferrer"><i>✳</i> Browse all icons on Lucide ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><IconDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><IconConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>name</td><td>string</td><td>Any of the ~2,000 Lucide glyph names</td></tr>
          <tr><td className={s.tokName}>size</td><td>xs · sm · md · lg · xl · 2xl</td><td>12 · 16 · 20 · 24 · 32 · 40px</td></tr>
          <tr><td className={s.tokName}>weight</td><td>light · regular · bold</td><td>Stroke 1.5 · 2 · 2.5px; the 24 box is fixed</td></tr>
          <tr><td className={s.tokName}>surface</td><td>dark · light</td><td>Tile background; the glyph is currentColor either way</td></tr>
          <tr><td className={s.tokName}>title</td><td>string</td><td>Present ⇒ role=img &amp; labelled; absent ⇒ aria-hidden</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The library is <strong>Lucide</strong> — an open, ISC-licensed set of ~2,000 line icons, drawn on the same 24-box, currentColor, round-cap spec Optimistic already uses. Icons are <strong>single colour</strong>: no per-icon accent. Because every stroke is currentColor, one glyph serves every theme — no second asset, ever.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 260 }}>
            <AnatomyGlyph />
            <span className={s.anaMark} style={{ left: "2%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 34 }} /></span>
            <span className={s.anaMark} style={{ left: "34%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 70 }} /></span>
            <span className={s.anaMark} style={{ left: "66%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 96 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Box</span><span className={s.anaDesc}>Every glyph is drawn in the same 24×24 box.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Stroke</span><span className={s.anaDesc}>One weight per icon, in currentColor — never filled.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Round cap &amp; join</span><span className={s.anaDesc}>Soft ends are what make the family feel drawn, not sharp.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ display: "inline-flex", gap: 20, color: "#e7e9ee" }}><IconTile name="sparkles" tile={40} surface="dark" /><IconTile name="sparkles" tile={40} surface="light" /></span></div><p className={s.ddText}>Draw once with currentColor and let the surface decide. One glyph, both themes.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "inline-flex" }}><svg viewBox="0 0 24 24" width={40} height={40}><path d="M12 3 C12 8.5 8.5 12 3 12 C8.5 12 12 15.5 12 21 C12 15.5 15.5 12 21 12 C15.5 12 12 8.5 12 3 Z" fill="#e7e9ee" /></svg></span></div><p className={s.ddText}>Don&apos;t fill line icons solid. The family is drawn with strokes, not shapes.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ color: "#e7e9ee", display: "inline-flex" }}><LineIcon name="search" px={40} /></span></div><p className={s.ddText}>Keep one stroke weight per icon and round the ends, so it reads as a single line.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "inline-flex" }}><svg viewBox="0 0 24 24" width={40} height={40} fill="none" strokeWidth={2} strokeLinecap="round"><circle cx={11} cy={11} r={8} stroke="#f472b6" /><path d="m21 21-4.3-4.3" stroke="#7dd3fc" /></svg></span></div><p className={s.ddText}>Don&apos;t recolour parts of a glyph. Icons are one colour — set it on the parent.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · In a button</div><div className={s.ctxStage}><span className={`${s.obtn} ${s.m} ${s.vWarm}`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ display: "inline-flex", color: "#fff" }}><LineIcon name="plus" px={16} /></span>New file</span></div><p className={s.ctxCaption}>A glyph leading a label, inheriting the button&apos;s text colour.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Notification</div><div className={s.ctxStage}><span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#e7e9ee", fontSize: "0.82rem" }}><IconTile name="bell" tile={32} surface="dark" />New activity in your project</span></div><p className={s.ctxCaption}>A tile pairs an icon with its message.</p></div>
          <div className={s.ctxCard} style={{ background: "#f2f2ef", borderColor: "#dcdcd6" }}><div className={s.ctxKicker} style={{ color: "#6a6a63" }}>C · On a light surface</div><div className={s.ctxStage} style={{ background: "#f2f2ef" }}><span style={{ display: "inline-flex", gap: 14, color: "#1a1a1a" }}><LineIcon name="heart" px={26} /><LineIcon name="chart-column" px={26} /><LineIcon name="layout-grid" px={26} /></span></div><p className={s.ctxCaption} style={{ color: "#6a6a63" }}>The same glyphs, dark strokes — no separate light asset.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--icon-box</td><td>24 × 24</td><td>The viewBox every glyph is drawn in</td></tr>
          <tr><td className={s.tokName}>--icon-stroke</td><td>2px (regular)</td><td>Stroke width; light 1.5px, bold 2.5px</td></tr>
          <tr><td className={s.tokName}>--icon-cap</td><td>round</td><td>Line-cap and line-join</td></tr>
          <tr><td className={s.tokName}>--icon-size</td><td>12·16·20·24·32·40</td><td>xs · sm · md · lg · xl · 2xl</td></tr>
          <tr><td className={s.tokName}>--icon-color</td><td>currentColor</td><td>Single colour — inherits the surface&apos;s text colour</td></tr>
          <tr><td className={s.tokName}>--icon-set</td><td>Lucide · ISC</td><td>~2,000 open-source glyphs</td></tr>
          <tr><td className={s.tokName}>--tile-dark</td><td><span className={s.tokSwatch} style={{ background: "#1c1c1e" }} />#1C1C1E</td><td>Dark tile surface, glyph #E7E9EE</td></tr>
          <tr><td className={s.tokName}>--tile-light</td><td><span className={s.tokSwatch} style={{ background: "#f2f2ef" }} />#F2F2EF</td><td>Light tile surface, glyph #1A1A1A</td></tr>
          <tr><td className={s.tokName}>--tile-radius</td><td>6 – 14px</td><td>Rounds with tile size 24 → 56</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
