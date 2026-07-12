import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SideNavDemo from "./SideNavDemo";
import SideNavConfigurator from "./SideNavConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Side Navigation. Dark design system: a 236px vertical rail (#0C0D10, #1E1E1E border) with a brand lockup, mono uppercase section labels, and items (icon + label, optional count badge). The active item is brighter with a 2px warm inset bar. It collapses to a 64px icons-only rail with a smooth width transition, hiding labels/badges; items show tooltips when collapsed. A pinned Settings + collapse toggle sit at the bottom. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<nav class="o-snav" aria-label="Primary">
  <div class="o-snav__brand"><Logo /> Optimistic</div>
  <div class="o-snav__label">Workspace</div>
  <a class="o-snav__item is-active" aria-current="page"><HomeIcon /> Overview</a>
  <a class="o-snav__item"><GridIcon /> Projects <span class="o-badge">3</span></a>
</nav>` },
  { label: "CSS", code: `.o-snav { width: 236px; transition: width .24s cubic-bezier(.22,1,.36,1); overflow: hidden; }
.o-snav.is-collapsed { width: 64px; }
.o-snav__item {
  display: flex; align-items: center; gap: 12px; padding: 8px 10px;
  border-radius: 8px; color: #9aa0a8; white-space: nowrap;
}
.o-snav__item.is-active { color: #f4f5f6; box-shadow: inset 2px 0 0 #ff7a00; }
.is-collapsed .o-snav__text { opacity: 0; }` },
  { label: "React", code: `import { SideNav } from "@optimistic/ui";

<SideNav collapsed={collapsed} onCollapse={setCollapsed}>
  <SideNav.Brand>Optimistic</SideNav.Brand>
  <SideNav.Section label="Workspace">
    <SideNav.Item icon={<Home />} href="/" active>Overview</SideNav.Item>
    <SideNav.Item icon={<Grid />} href="/projects" badge={3}>Projects</SideNav.Item>
  </SideNav.Section>
</SideNav>` },
  { label: "Angular", code: `<o-side-nav [(collapsed)]="collapsed">
  <o-nav-section label="Workspace">
    <o-nav-item icon="home" routerLink="/" active>Overview</o-nav-item>
    <o-nav-item icon="grid" routerLink="/projects" [badge]="3">Projects</o-nav-item>
  </o-nav-section>
</o-side-nav>` },
  { label: "Async / API", code: `// Persist the collapsed state and mark the active item from the route.
const [collapsed, setCollapsed] = useState(
  () => localStorage.getItem("nav.collapsed") === "1"
);
useEffect(() => localStorage.setItem("nav.collapsed", collapsed ? "1" : "0"), [collapsed]);

const path = usePathname();
<SideNav.Item href="/projects" active={path.startsWith("/projects")}
  badge={unread.projects}>Projects</SideNav.Item>` },
];

export default function SideNavDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Home = () => (<svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 9l7-6 7 6M5 8v9h10V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const Grid = () => (<svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><SideNavDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SideNavConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>collapsed / onCollapse</td><td>boolean / (v) =&gt; void</td><td>Toggles the 236 ↔ 64px rail</td></tr>
          <tr><td className={s.tokName}>variant</td><td>rounded · square · floating</td><td>Rounded card, flush edge, or a lifted floating rail</td></tr>
          <tr><td className={s.tokName}>icons / logo</td><td>boolean</td><td>Show or hide item icons and the brand lockup</td></tr>
          <tr><td className={s.tokName}>Item.children</td><td>Item[]</td><td>Nested tree items that expand in place</td></tr>
          <tr><td className={s.tokName}>Item.icon / active</td><td>ReactNode / boolean</td><td>Glyph and current-page state</td></tr>
          <tr><td className={s.tokName}>Item.badge</td><td>number</td><td>Count pill, hidden when collapsed</td></tr>
          <tr><td className={s.tokName}>Section.label</td><td>string</td><td>Mono group heading</td></tr>
          <tr><td className={s.tokName}>collapsed tooltips</td><td>—</td><td>Labels surface on hover of icon items</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The rail carries persistent product areas. For global actions and account use the Top Navigation; for a jump-anywhere search use the Command Menu.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 236 }}>
            <nav className={s.osnav} style={{ pointerEvents: "none" }}>
              <div className={s.osnavLabel}>Workspace</div>
              <span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavIcon}><Home /></span><span className={s.osnavText}>Overview</span></span>
              <span className={s.osnavItem}><span className={s.osnavIcon}><Grid /></span><span className={s.osnavText}>Projects</span><span className={`${s.osnavBadge} ${s.obadge} ${s.bgCount}`}>3</span></span>
            </nav>
            <span className={s.anaMark} style={{ left: "18%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 42 }} /></span>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 70 }} /></span>
            <span className={s.anaMark} style={{ left: "86%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 70 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Section label</span><span className={s.anaDesc}>Mono heading grouping items.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Item</span><span className={s.anaDesc}>Icon + label; active gets a warm bar.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Badge</span><span className={s.anaDesc}>Optional count, hidden when collapsed.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={s.osnav} style={{ pointerEvents: "none", width: 160, background: "transparent", border: 0 }}><span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavIcon}><Home /></span><span className={s.osnavText}>Overview</span></span><span className={s.osnavItem}><span className={s.osnavIcon}><Grid /></span><span className={s.osnavText}>Projects</span></span></nav></div><p className={s.ddText}>Keep one active item, marked with the warm inset bar.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.osnav} style={{ pointerEvents: "none", width: 160, background: "transparent", border: 0 }}><span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavText}>Home</span></span><span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavText}>Projects</span></span></nav></div><p className={s.ddText}>Don&apos;t highlight two items. Only the current area is active.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><nav className={`${s.osnav} ${s.osnavCollapsed}`} style={{ pointerEvents: "none", background: "transparent", border: 0 }}><span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavIcon}><Home /></span></span><span className={s.osnavItem}><span className={s.osnavIcon}><Grid /></span></span></nav></div><p className={s.ddText}>When collapsed, keep icons and surface labels on hover.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><nav className={s.osnav} style={{ pointerEvents: "none", width: 160, background: "transparent", border: 0 }}>{["Home","Projects","Team","Billing","Reports","Settings","Help","Logs"].map(x=><span key={x} className={s.osnavItem} style={{ padding: "5px 10px" }}><span className={s.osnavText} style={{ fontSize: "0.8rem" }}>{x}</span></span>)}</nav></div><p className={s.ddText}>Don&apos;t list a dozen flat items. Group them under sections.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · App shell</div><div className={s.ctxStage}><div style={{ display: "flex", gap: 8, width: "100%", height: 90 }}><nav className={s.osnav} style={{ pointerEvents: "none", width: 70, background: "#0e0f12", padding: 8 }}><span className={`${s.osnavItem} ${s.osnavOn}`} style={{ padding: 7 }}><span className={s.osnavIcon}><Home /></span></span><span className={s.osnavItem} style={{ padding: 7 }}><span className={s.osnavIcon}><Grid /></span></span></nav><div style={{ flex: 1, border: "1px solid #1a1a1a", borderRadius: 8 }} /></div></div><p className={s.ctxCaption}>The rail plus a content region — the classic app shell.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Collapsed</div><div className={s.ctxStage}><nav className={`${s.osnav} ${s.osnavCollapsed}`} style={{ pointerEvents: "none", background: "#0e0f12" }}><span className={`${s.osnavItem} ${s.osnavOn}`}><span className={s.osnavIcon}><Home /></span></span><span className={s.osnavItem}><span className={s.osnavIcon}><Grid /></span></span></nav></div><p className={s.ctxCaption}>Icons-only on smaller screens or to reclaim width.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Sectioned</div><div className={s.ctxStage}><nav className={s.osnav} style={{ pointerEvents: "none", width: "100%", background: "#0e0f12" }}><div className={s.osnavLabel}>Insights</div><span className={s.osnavItem}><span className={s.osnavText}>Analytics</span></span></nav></div><p className={s.ctxCaption}>Section labels split large products into areas.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--snav-w</td><td>236px</td><td>Expanded rail width</td></tr>
          <tr><td className={s.tokName}>--snav-w-collapsed</td><td>64px</td><td>Icons-only width</td></tr>
          <tr><td className={s.tokName}>--snav-ease</td><td>.24s</td><td>Collapse transition</td></tr>
          <tr><td className={s.tokName}>--snav-active</td><td>2px #FF7A00 inset</td><td>Current-item marker</td></tr>
          <tr><td className={s.tokName}>--snav-item</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Idle item colour</td></tr>
          <tr><td className={s.tokName}>--snav-label</td><td>mono · #565A62</td><td>Section heading</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
