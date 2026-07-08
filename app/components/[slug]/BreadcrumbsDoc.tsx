import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import BreadcrumbsDemo from "./BreadcrumbsDemo";
import BreadcrumbsConfigurator from "./BreadcrumbsConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Breadcrumbs. Dark design system: a horizontal trail of links (#9AA0A8, hover #E7E9EE with a faint fill) joined by muted chevron separators; the last crumb is the current page (#F4F5F6, bold, not a link, aria-current). Long paths collapse the middle into a '…' button that opens a dropdown of the hidden crumbs; a single overly-long crumb truncates with an ellipsis. Optional leading home / folder icons. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<nav class="o-bc" aria-label="Breadcrumb">
  <a class="o-bc__item" href="/">Home</a>
  <span class="o-bc__sep">›</span>
  <a class="o-bc__item" href="/components">Components</a>
  <span class="o-bc__sep">›</span>
  <span class="o-bc__item is-current" aria-current="page">Avatar</span>
</nav>` },
  { label: "CSS", code: `.o-bc { display: flex; align-items: center; gap: 1px; font-size: .84rem; }
.o-bc__item {
  color: #9aa0a8; text-decoration: none; padding: 3px 7px; border-radius: 6px;
}
.o-bc__item:hover { color: #e7e9ee; background: rgba(255,255,255,.04); }
.o-bc__item.is-current { color: #f4f5f6; font-weight: 500; }
.o-bc__sep { color: #3a3c42; }
.o-bc__trunc { max-width: 150px; overflow: hidden; text-overflow: ellipsis; }` },
  { label: "React", code: `import { Breadcrumbs } from "@optimistic/ui";

<Breadcrumbs maxItems={4}>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/workspace">Workspace</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/design-system">Design System</Breadcrumbs.Item>
  <Breadcrumbs.Item current>Avatar</Breadcrumbs.Item>
</Breadcrumbs>
// past maxItems the middle collapses into a … dropdown` },
  { label: "Angular", code: `<o-breadcrumbs [maxItems]="4">
  <o-crumb routerLink="/">Home</o-crumb>
  <o-crumb routerLink="/design-system">Design System</o-crumb>
  <o-crumb current>Avatar</o-crumb>
</o-breadcrumbs>` },
  { label: "Async / API", code: `// Derive crumbs from the route, and hydrate labels the router doesn't know
// (an id → a human name) as they load — never show a raw slug.
const segments = usePathname().split("/").filter(Boolean);

const crumbs = segments.map((seg, i) => ({
  href: "/" + segments.slice(0, i + 1).join("/"),
  label: labels[seg] ?? prettify(seg),        // "a1b2" → "Acme Corp" once fetched
}));

<Breadcrumbs maxItems={4}>
  {crumbs.map((c, i) => (
    <Breadcrumbs.Item key={c.href} href={c.href} current={i === crumbs.length - 1}>
      {c.label}
    </Breadcrumbs.Item>
  ))}
</Breadcrumbs>` },
];

export default function BreadcrumbsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Sep = () => (<span className={s.obcSep}><svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>);
  const crumb = (label: string, current = false) => <span key={label} style={{ display: "inline-flex", alignItems: "center", pointerEvents: "none" }}><span className={`${s.obcItem} ${current ? s.obcCurrent : ""}`}>{label}</span>{!current && <Sep />}</span>;
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><BreadcrumbsDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><BreadcrumbsConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Item href / current</td><td>string / boolean</td><td>Link, or the non-clickable current page</td></tr>
          <tr><td className={s.tokName}>maxItems</td><td>number</td><td>Collapse the middle into a … dropdown past this</td></tr>
          <tr><td className={s.tokName}>separator</td><td>chevron · slash</td><td>Glyph between crumbs</td></tr>
          <tr><td className={s.tokName}>showIcons</td><td>boolean</td><td>Leading home / folder glyphs</td></tr>
          <tr><td className={s.tokName}>aria-current</td><td>page</td><td>Set on the last crumb for assistive tech</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Breadcrumbs show where a page sits in the hierarchy. For switching peer views use Tabs; for primary wayfinding use the nav.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 340 }}>
            <nav className={s.obc}>{crumb("Home")}{crumb("Components")}{crumb("Avatar", true)}</nav>
            <span className={s.anaMark} style={{ left: "14%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "48%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "82%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Crumb</span><span className={s.anaDesc}>A link to an ancestor page.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Separator</span><span className={s.anaDesc}>Muted chevron between the crumbs.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Current</span><span className={s.anaDesc}>The page you are on; bold, not a link.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={s.obc}>{crumb("Home")}{crumb("Docs")}{crumb("Buttons", true)}</nav></div><p className={s.ddText}>Mark the current page as bold and non-clickable.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.obc} style={{ pointerEvents: "none" }}>{crumb("Home")}{crumb("A")}{crumb("B")}{crumb("C")}{crumb("D")}{crumb("E")}{crumb("F", true)}</nav></div><p className={s.ddText}>Don&apos;t print a deep path in full. Collapse the middle to a … menu.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={s.obc} style={{ pointerEvents: "none" }}><span className={s.obcItem}>Home</span><Sep /><span className={s.obcItem}>…</span><Sep /><span className={`${s.obcItem} ${s.obcCurrent}`}>Avatar</span></nav></div><p className={s.ddText}>Keep the first and last, collapse the rest behind a … dropdown.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.obc} style={{ pointerEvents: "none" }}><span className={s.obcItem} style={{ whiteSpace: "nowrap" }}>Q3 Marketing Website Redesign Project</span></nav></div><p className={s.ddText}>Don&apos;t let one crumb sprawl. Truncate it with an ellipsis.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Page header</div><div className={s.ctxStage}><div style={{ width: "100%" }}><nav className={s.obc} style={{ pointerEvents: "none" }}>{crumb("Settings")}{crumb("Members", true)}</nav><span className={s.mockTitle} style={{ width: "50%", marginTop: 10 }} /></div></div><p className={s.ctxCaption}>Above a page title, showing where you are.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · File path</div><div className={s.ctxStage}><nav className={s.obc} style={{ pointerEvents: "none" }}><span className={s.obcItem}>src</span><Sep /><span className={s.obcItem}>components</span><Sep /><span className={`${s.obcItem} ${s.obcCurrent}`}>Avatar.tsx</span></nav></div><p className={s.ctxCaption}>A file or folder path in an editor or browser.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Collapsed</div><div className={s.ctxStage}><nav className={s.obc} style={{ pointerEvents: "none" }}><span className={s.obcItem}>Home</span><Sep /><span className={s.obcItem}>…</span><Sep /><span className={s.obcItem}>Data Display</span><Sep /><span className={`${s.obcItem} ${s.obcCurrent}`}>Avatar</span></nav></div><p className={s.ctxCaption}>A deep hierarchy kept to one honest line.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--bc-item</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Crumb link colour</td></tr>
          <tr><td className={s.tokName}>--bc-current</td><td><span className={s.tokSwatch} style={{ background: "#f4f5f6" }} />#F4F5F6</td><td>Current page, weight 500</td></tr>
          <tr><td className={s.tokName}>--bc-sep</td><td><span className={s.tokSwatch} style={{ background: "#3a3c42" }} />#3A3C42</td><td>Separator glyph</td></tr>
          <tr><td className={s.tokName}>--bc-hover</td><td>rgba(255,255,255,.04)</td><td>Crumb hover fill</td></tr>
          <tr><td className={s.tokName}>--bc-trunc</td><td>150px</td><td>Max width before a crumb truncates</td></tr>
          <tr><td className={s.tokName}>--bc-radius</td><td>6px</td><td>Crumb hit-area corner</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
