import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import MenuDemo from "./MenuDemo";
import MenuConfigurator from "./MenuConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Menu. Dark design system: a floating panel of actions (#141519, #262A30 border, radius 10, soft shadow) opened from a trigger. Rows have an optional leading icon (#767B87), a label, and an optional trailing mono keyboard shortcut; #262A30 dividers group them, mono uppercase section labels caption groups, and a destructive row is red (#F2777B, red hover). Opens on click, closes on select / outside-click / Escape; ↑↓ move, Enter runs, type-ahead. role=menu. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<button aria-haspopup="menu" aria-expanded="true">⋮</button>
<div class="o-menu" role="menu">
  <button role="menuitem" class="o-menu__opt"><EditIcon /> Edit <kbd>E</kbd></button>
  <button role="menuitem" class="o-menu__opt"><CopyIcon /> Duplicate <kbd>⌘D</kbd></button>
  <div class="o-menu__divider"></div>
  <button role="menuitem" class="o-menu__opt o-menu__opt--danger"><TrashIcon /> Delete</button>
</div>` },
  { label: "CSS", code: `.o-menu {
  min-width: 210px; padding: 6px;
  background: #141519; border: 1px solid #262a30; border-radius: 10px;
  box-shadow: 0 16px 42px rgba(0,0,0,.5);
}
.o-menu__opt { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 7px; }
.o-menu__opt:hover { background: #1e1f25; }
.o-menu__opt--danger { color: #f2777b; }
.o-menu__opt--danger:hover { background: rgba(235,74,79,.14); }
.o-menu__divider { height: 1px; background: #262a30; margin: 5px -6px; }
kbd { margin-left: auto; font: .64rem var(--mono); color: #565a62; border: 1px solid #2a2a30; border-radius: 4px; padding: 1px 5px; }` },
  { label: "React", code: `import { Menu } from "@optimistic/ui";

<Menu trigger={<IconButton icon={<Dots />} />}>
  <Menu.Item icon={<Edit />} shortcut="E" onSelect={rename}>Edit</Menu.Item>
  <Menu.Item icon={<Copy />} shortcut="⌘D" onSelect={dup}>Duplicate</Menu.Item>
  <Menu.Divider />
  <Menu.Item icon={<Trash />} danger onSelect={remove}>Delete</Menu.Item>
</Menu>` },
  { label: "Angular", code: `<o-menu>
  <button o-menu-trigger><dots-icon></dots-icon></button>
  <o-menu-item icon="edit" shortcut="E" (select)="rename()">Edit</o-menu-item>
  <o-menu-divider></o-menu-divider>
  <o-menu-item icon="trash" danger (select)="remove()">Delete</o-menu-item>
</o-menu>` },
  { label: "Async / API", code: `// Menu items can reflect async state — disable while a mutation runs,
// and confirm the destructive one before firing.
<Menu.Item
  icon={<Trash />} danger
  disabled={deleting}
  onSelect={async () => {
    if (!(await confirm("Delete this file?"))) return;
    setDeleting(true);
    try { await api.delete(id); toast.success("Deleted"); }
    catch { toast.error("Couldn't delete"); }
    finally { setDeleting(false); }
  }}
>
  {deleting ? "Deleting…" : "Delete"}
</Menu.Item>` },
];

export default function MenuDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Edit = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2L6 12l-2.5.5L4 10l7.5-7.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>);
  const Trash = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.5 8h6l.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><MenuDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><MenuConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Item.onSelect</td><td>() =&gt; void</td><td>Runs the action, then closes</td></tr>
          <tr><td className={s.tokName}>icon / shortcut</td><td>ReactNode / string</td><td>Leading glyph and trailing key hint</td></tr>
          <tr><td className={s.tokName}>danger</td><td>boolean</td><td>Red destructive row</td></tr>
          <tr><td className={s.tokName}>Divider · section</td><td>—</td><td>Group related items with a rule or label</td></tr>
          <tr><td className={s.tokName}>↑ / ↓ · Enter · Esc</td><td>—</td><td>Move, run, or close; type-ahead jumps</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A Menu lists actions on a thing. For choosing a value use a Dropdown; for a primary action with alternatives use a Split Button; for a global palette use the Command Menu.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none" }}>
              <span className={s.omenuOpt}><span className={s.omenuIcon}><Edit /></span>Edit<span className={s.omenuKbd}>E</span></span>
              <span className={s.omenuDivider} />
              <span className={`${s.omenuOpt} ${s.omenuOptDanger}`}><span className={s.omenuIcon}><Trash /></span>Delete</span>
            </div>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "84%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "50%", top: 72 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 27 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Icon</span><span className={s.anaDesc}>Optional leading glyph for the action.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Shortcut</span><span className={s.anaDesc}>Mono key hint, right-aligned.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Danger row</span><span className={s.anaDesc}>Destructive action in red, below a divider.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 160 }}><span className={s.omenuOpt}><span className={s.omenuIcon}><Edit /></span>Rename</span><span className={s.omenuDivider} /><span className={`${s.omenuOpt} ${s.omenuOptDanger}`}><span className={s.omenuIcon}><Trash /></span>Delete</span></div></div><p className={s.ddText}>Separate the destructive action with a divider, and colour it red.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 160 }}><span className={`${s.omenuOpt} ${s.omenuOptDanger}`}>Delete</span><span className={s.omenuOpt}>Rename</span></div></div><p className={s.ddText}>Don&apos;t put a destructive action first, where it&apos;s easy to hit.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 160 }}><span className={s.omenuOpt}>Copy<span className={s.omenuKbd}>⌘C</span></span><span className={s.omenuOpt}>Paste<span className={s.omenuKbd}>⌘V</span></span></div></div><p className={s.ddText}>Show the keyboard shortcut so people learn the fast path.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 150, maxHeight: 96, overflow: "hidden" }}>{["Cut","Copy","Paste","Rename","Move","Share","Star","Archive"].map(x=><span key={x} className={s.omenuOpt} style={{ padding: "5px 10px" }}>{x}</span>)}</div></div><p className={s.ddText}>Don&apos;t dump twenty items in one flat list. Group, or use sub-menus.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Row overflow</div><div className={s.ctxStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 150 }}><span className={s.omenuOpt}><span className={s.omenuIcon}><Edit /></span>Edit</span><span className={s.omenuOpt}>Duplicate</span></div></div><p className={s.ctxCaption}>The ⋮ overflow menu on a table or list row.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Right-click</div><div className={s.ctxStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 150 }}><span className={s.omenuOpt}>Cut<span className={s.omenuKbd}>⌘X</span></span><span className={s.omenuOpt}>Copy<span className={s.omenuKbd}>⌘C</span></span></div></div><p className={s.ctxCaption}>A context menu on right-click, with shortcuts.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Account</div><div className={s.ctxStage}><div className={`${s.omenu} ${s.omenuStandalone}`} style={{ pointerEvents: "none", minWidth: 150 }}><div className={s.omenuGroupLabel}>ada@team.com</div><span className={s.omenuOpt}>Settings</span><div className={s.omenuDivider} /><span className={`${s.omenuOpt} ${s.omenuOptDanger}`}>Sign out</span></div></div><p className={s.ctxCaption}>An account menu from an avatar, with a section label.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--menu-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Panel surface</td></tr>
          <tr><td className={s.tokName}>--menu-border</td><td><span className={s.tokSwatch} style={{ background: "#262a30" }} />#262A30</td><td>Panel + divider hairline</td></tr>
          <tr><td className={s.tokName}>--menu-hover</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Row hover fill</td></tr>
          <tr><td className={s.tokName}>--menu-icon</td><td><span className={s.tokSwatch} style={{ background: "#767b87" }} />#767B87</td><td>Leading glyph</td></tr>
          <tr><td className={s.tokName}>--menu-danger</td><td><span className={s.tokSwatch} style={{ background: "#f2777b" }} />#F2777B</td><td>Destructive row</td></tr>
          <tr><td className={s.tokName}>--menu-kbd</td><td>mono · #565A62</td><td>Trailing shortcut hint</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
