import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TabsDemo from "./TabsDemo";
import TabsConfigurator from "./TabsConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Tabs. Dark design system: peer views, one region, only the active panel mounted. Three variants — line (underline, 2px warm indicator that slides), pill (segmented control in a #101114 tray, active chip #1F1F25), enclosed (folder tabs, active joins a #16171B panel). Inactive text #9AA0A8, active #F4F5F6. Optional count pill rides in a tab. Sizes S/M/L. Roving-tabindex keyboard: Left/Right move, Home/End jump, disabled tabs are skipped. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-tabs o-tabs--line" role="tablist">
  <button role="tab" aria-selected="true" class="o-tab is-active">Overview</button>
  <button role="tab" aria-selected="false" class="o-tab">
    Activity <span class="o-tab__count">3</span>
  </button>
  <button role="tab" aria-selected="false" class="o-tab">Settings</button>
</div>
<div role="tabpanel">…</div>` },
  { label: "CSS", code: `.o-tabs--line { display: inline-flex; gap: 24px; border-bottom: 1px solid #242428; }
.o-tab {
  position: relative; padding: 11px 2px;
  font: 500 .85rem/1 inherit; color: #9aa0a8;
  background: none; border: 0; cursor: pointer;
}
.o-tab.is-active { color: #f4f5f6; }
.o-tab::after {
  content: ""; position: absolute; inset: auto 0 -1px; height: 2px;
  background: #ff7a00; transform: scaleX(0); transition: transform .2s;
}
.o-tab.is-active::after { transform: scaleX(1); }` },
  { label: "React", code: `import { Tabs } from "@optimistic/ui";

<Tabs variant="line" defaultValue="overview">
  <Tabs.Tab value="overview">Overview</Tabs.Tab>
  <Tabs.Tab value="activity" count={unread}>Activity</Tabs.Tab>
  <Tabs.Tab value="settings">Settings</Tabs.Tab>

  <Tabs.Panel value="overview">…</Tabs.Panel>
  <Tabs.Panel value="activity">…</Tabs.Panel>
  <Tabs.Panel value="settings">…</Tabs.Panel>
</Tabs>` },
  { label: "Angular", code: `<o-tabs variant="line" [(value)]="view">
  <o-tab value="overview">Overview</o-tab>
  <o-tab value="activity" [count]="unread">Activity</o-tab>
  <o-tab value="settings">Settings</o-tab>
</o-tabs>` },
  { label: "Async / API", code: `// Deep-link tabs to the URL so a view is shareable and survives reload.
const [view, setView] = useState(
  () => new URLSearchParams(location.search).get("tab") ?? "overview"
);

useEffect(() => {
  const url = new URL(location.href);
  url.searchParams.set("tab", view);
  history.replaceState(null, "", url);   // no navigation, no scroll jump
}, [view]);

// Lazy-load a panel's data the first time it becomes active.
useEffect(() => {
  if (view === "activity" && !loaded.activity) fetchActivity();
}, [view]);` },
];

export default function TabsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><TabsDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><TabsConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>line · pill · enclosed</td><td>Indicator style; line is the default</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Tab scale; M is the default</td></tr>
          <tr><td className={s.tokName}>value / onChange</td><td>string / (v) =&gt; void</td><td>The active tab; controlled or default</td></tr>
          <tr><td className={s.tokName}>count</td><td>number</td><td>Optional pill riding in a tab</td></tr>
          <tr><td className={s.tokName}>disabled (tab)</td><td>boolean</td><td>Unreachable, skipped by the arrow keys</td></tr>
          <tr><td className={s.tokName}>← / → · Home / End</td><td>—</td><td>Roving focus between tabs; Home/End jump to the ends</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Tabs switch peer views inside one page. To move between pages of a list use Pagination; for top-level wayfinding use the nav.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <div className={`${s.otabs} ${s.otabsLine}`} style={{ pointerEvents: "none" }}>
              <span className={`${s.otab} ${s.otabOn}`}>Overview</span>
              <span className={s.otab}>Activity<span className={s.otabCount}>3</span></span>
              <span className={s.otab}>Settings</span>
            </div>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "44%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "13.5%", top: 54 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Active tab</span><span className={s.anaDesc}>Brightest label; only one active at a time.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Count</span><span className={s.anaDesc}>Optional pill for unread or pending items.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Indicator</span><span className={s.anaDesc}>2px warm underline that slides to the active tab.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.otabs} ${s.otabsLine}`} style={{ pointerEvents: "none" }}><span className={`${s.otab} ${s.otabOn}`}>Details</span><span className={s.otab}>Reviews</span><span className={s.otab}>Related</span></div></div><p className={s.ddText}>Two to five short, parallel labels. One noun each; they scan as a set.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.otabs} ${s.otabsLine}`} style={{ pointerEvents: "none" }}><span className={`${s.otab} ${s.otabOn}`}>Home</span><span className={s.otab}>Docs</span><span className={s.otab}>Pricing</span><span className={s.otab}>Log out</span></div></div><p className={s.ddText}>Don&apos;t route the whole app through tabs. Navigation and sign-out aren&apos;t peer views.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.otabs} ${s.otabsPill}`} style={{ pointerEvents: "none" }}><span className={`${s.otab} ${s.otabOn}`}>Day</span><span className={s.otab}>Week</span><span className={s.otab}>Month</span></div></div><p className={s.ddText}>Use the pill variant for a short, toggle-like set of mutually exclusive modes.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.otabs} ${s.otabsLine}`} style={{ pointerEvents: "none", maxWidth: 240, overflow: "hidden" }}><span className={`${s.otab} ${s.otabOn}`}>Configuration</span><span className={s.otab}>Integrations</span><span className={s.otab}>Perms…</span></div></div><p className={s.ddText}>Don&apos;t overflow tabs off the edge. Too many peers wants a nav or a menu.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Panel header</div><div className={s.ctxStage}><div style={{ width: "100%" }}><div className={`${s.otabs} ${s.otabsLine}`} style={{ pointerEvents: "none", display: "flex", width: "100%" }}><span className={`${s.otab} ${s.otabOn}`}>Overview</span><span className={s.otab}>Activity<span className={s.otabCount}>3</span></span></div><span className={s.mockLine} style={{ width: "88%", marginTop: 14 }} /><span className={s.mockLine} style={{ width: "72%" }} /></div></div><p className={s.ctxCaption}>Line tabs sit at the top of a card, the panel content directly below.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Segmented control</div><div className={s.ctxStage}><div className={`${s.otabs} ${s.otabsPill}`} style={{ pointerEvents: "none" }}><span className={`${s.otab} ${s.otabOn}`}>List</span><span className={s.otab}>Board</span><span className={s.otab}>Timeline</span></div></div><p className={s.ctxCaption}>Pill tabs act as a compact view switcher in a toolbar.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Enclosed</div><div className={s.ctxStage}><div className={`${s.otabs} ${s.otabsEnclosed}`} style={{ pointerEvents: "none" }}><span className={`${s.otab} ${s.otabOn}`}>Preview</span><span className={s.otab}>Code</span></div></div><p className={s.ctxCaption}>Folder tabs read as a container the active tab belongs to.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--tab-gap</td><td>24px</td><td>Space between line tabs</td></tr>
          <tr><td className={s.tokName}>--tab-indicator</td><td>2px · #FF7A00</td><td>Sliding active underline</td></tr>
          <tr><td className={s.tokName}>--tab-idle</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Inactive label</td></tr>
          <tr><td className={s.tokName}>--tab-active</td><td><span className={s.tokSwatch} style={{ background: "#f4f5f6" }} />#F4F5F6</td><td>Active label</td></tr>
          <tr><td className={s.tokName}>--tab-tray</td><td><span className={s.tokSwatch} style={{ background: "#101114" }} />#101114</td><td>Pill variant background</td></tr>
          <tr><td className={s.tokName}>--tab-active-fill</td><td><span className={s.tokSwatch} style={{ background: "#1f1f25" }} />#1F1F25</td><td>Pill / enclosed active fill</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
