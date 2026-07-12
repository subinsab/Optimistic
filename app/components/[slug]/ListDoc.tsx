import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import ListDemo from "./ListDemo";
import ListConfigurator from "./ListConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic List. Dark design system: a vertical stack in a #0E0F12 card with a #1E1E1E outer border and #1A1A1A hairlines between rows (radius 10, clipped). Each row is a flex line with an optional leading slot (34px avatar/icon), a body (title #ECEEF1, muted description #767B87), and an optional trailing slot (badge, chevron, action). Rows hover to #131418; selectable rows are buttons with aria-pressed and a warm trailing check. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-list">
  <button class="o-list__row" aria-pressed="true">
    <span class="o-list__lead"><span class="o-avatar">AL</span></span>
    <span class="o-list__body">
      <span class="o-list__title">Ada Lovelace</span>
      <span class="o-list__desc">Design Lead</span>
    </span>
    <span class="o-list__trail"><Badge>PAID</Badge></span>
  </button>
</div>` },
  { label: "CSS", code: `.o-list {
  display: flex; flex-direction: column;
  border: 1px solid #1e1e1e; border-radius: 10px; overflow: hidden;
  background: #0e0f12;
}
.o-list__row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-bottom: 1px solid #1a1a1a;
}
.o-list__row:last-child { border-bottom: 0; }
.o-list__row:hover { background: #131418; }
.o-list__body { flex: 1; min-width: 0; }
.o-list__trail { margin-left: auto; }` },
  { label: "React", code: `import { List } from "@optimistic/ui";

<List>
  {people.map((p) => (
    <List.Row
      key={p.id}
      leading={<Avatar>{p.initials}</Avatar>}
      title={p.name}
      description={p.role}
      trailing={<Badge variant="success">Paid</Badge>}
      onClick={() => open(p)}
    />
  ))}
</List>` },
  { label: "Angular", code: `<o-list>
  <o-list-row *ngFor="let p of people"
    [title]="p.name" [description]="p.role" (click)="open(p)">
    <o-avatar leading>{{ p.initials }}</o-avatar>
    <o-badge trailing variant="success">Paid</o-badge>
  </o-list-row>
</o-list>` },
  { label: "Async / API", code: `// Long lists: virtualize so 10k rows don't mount 10k nodes.
import { useVirtualizer } from "@tanstack/react-virtual";

const rows = useVirtualizer({
  count: items.length,
  estimateSize: () => 60,           // row height
  getScrollElement: () => parentRef.current,
  overscan: 8,
});

// Optimistic remove: drop the row now, restore it if the server rejects.
async function remove(id) {
  const prev = items;
  setItems((xs) => xs.filter((x) => x.id !== id));   // instant
  const r = await fetch(\`/api/items/\${id}\`, { method: "DELETE" });
  if (!r.ok) setItems(prev);                          // reconcile
}` },
];

export default function ListDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><ListDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><ListConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>title / description</td><td>ReactNode</td><td>Primary line and muted sub-line</td></tr>
          <tr><td className={s.tokName}>leading / trailing</td><td>ReactNode</td><td>Avatar, icon, badge, chevron or action</td></tr>
          <tr><td className={s.tokName}>onClick</td><td>() =&gt; void</td><td>Makes the row a button; whole row is the target</td></tr>
          <tr><td className={s.tokName}>selected</td><td>boolean</td><td>Sets aria-pressed and the warm check</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · Enter</td><td>—</td><td>Move between rows; activate the focused one</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a List for a vertical collection of like items. For columns of comparable data use a Table; for a set of filters use Pills.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={s.olist} style={{ pointerEvents: "none" }}>
              <div className={s.olistRow}><span className={s.olistLead}><span className={s.olistAvatar}>AL</span></span><span className={s.olistBody}><span className={s.olistTitle}>Ada Lovelace</span><span className={s.olistDesc}>Design Lead</span></span><span className={s.olistTrail}><span className={`${s.obadge} ${s.bgSuccess}`}>PAID</span></span></div>
            </div>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 34 }} /></span>
            <span className={s.anaMark} style={{ left: "45%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 34 }} /></span>
            <span className={s.anaMark} style={{ left: "84%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 34 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Leading</span><span className={s.anaDesc}>Optional avatar or icon, fixed 34px.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Title plus an optional muted description.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Trailing</span><span className={s.anaDesc}>Badge, chevron or an action, right-aligned.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.olist} style={{ pointerEvents: "none", maxWidth: 240 }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Members</span></span><span className={s.olistTrail}><Chevron /></span></div><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Billing</span></span><span className={s.olistTrail}><Chevron /></span></div></div></div><p className={s.ddText}>Keep rows to one idea. Consistent slots make the set scannable.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.olist} style={{ pointerEvents: "none", maxWidth: 240 }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.8rem", whiteSpace: "normal" }}>Name, role, email, last seen, plan, and status all crammed in</span></span></div></div></div><p className={s.ddText}>Don&apos;t cram a spreadsheet into a row. Comparable columns want a Table.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.olist} style={{ pointerEvents: "none", maxWidth: 240 }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistLead}><span className={s.olistAvatar} style={{ width: 28, height: 28 }}>AL</span></span><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Ada Lovelace</span><span className={s.olistDesc}>Design Lead</span></span></div></div></div><p className={s.ddText}>Align leading media and text so every row reads on the same grid.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.olist} style={{ pointerEvents: "none", maxWidth: 240 }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Row one</span></span><span className={s.olistTrail}><span className={`${s.obadge} ${s.bgWarm}`}>NEW</span><span className={`${s.obadge} ${s.bgError}`}>!</span><Chevron /></span></div></div></div><p className={s.ddText}>Don&apos;t overload the trailing slot. One signal per row, not three.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Settings menu</div><div className={s.ctxStage}><div className={s.olist} style={{ pointerEvents: "none", width: "100%" }}>{["General","Members","Billing"].map(t=><div key={t} className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>{t}</span></span><span className={s.olistTrail}><Chevron /></span></div>)}</div></div><p className={s.ctxCaption}>Navigable settings sections, each a row with a chevron.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · People</div><div className={s.ctxStage}><div className={s.olist} style={{ pointerEvents: "none", width: "100%" }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistLead}><span className={s.olistAvatar} style={{ width: 28, height: 28 }}>GH</span></span><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Grace Hopper</span><span className={s.olistDesc}>Systems</span></span></div></div></div><p className={s.ctxCaption}>Member and contact lists with avatar, name and role.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Transactions</div><div className={s.ctxStage}><div className={s.olist} style={{ pointerEvents: "none", width: "100%" }}><div className={s.olistRow} style={{ padding: 10 }}><span className={s.olistBody}><span className={s.olistTitle} style={{ fontSize: "0.82rem" }}>Invoice 4821</span></span><span className={s.olistTrail}><span className={`${s.obadge} ${s.bgSuccess}`}>PAID</span></span></div></div></div><p className={s.ctxCaption}>Records with a status badge in the trailing slot.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--list-pad</td><td>12px 14px</td><td>Row padding</td></tr>
          <tr><td className={s.tokName}>--list-gap</td><td>12px</td><td>Slot-to-slot spacing</td></tr>
          <tr><td className={s.tokName}>--list-border</td><td><span className={s.tokSwatch} style={{ background: "#1e1e1e" }} />#1E1E1E</td><td>Outer border</td></tr>
          <tr><td className={s.tokName}>--list-divider</td><td><span className={s.tokSwatch} style={{ background: "#1a1a1a" }} />#1A1A1A</td><td>Hairline between rows</td></tr>
          <tr><td className={s.tokName}>--list-hover</td><td><span className={s.tokSwatch} style={{ background: "#131418" }} />#131418</td><td>Row hover fill</td></tr>
          <tr><td className={s.tokName}>--list-lead</td><td>34px</td><td>Leading avatar / icon size</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
