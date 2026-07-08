import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import CommandMenuDemo from "./CommandMenuDemo";
import CommandMenuConfigurator from "./CommandMenuConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Command Menu (⌘K palette). Dark design system: a centred overlay panel (#141519, #262A30 border, radius 14) with a large search field (magnifier + ESC pill), a scrolling result list grouped by mono labels, rows with a leading icon, a label, and an optional trailing shortcut. The active row is #1E1F25; ↑/↓ move, Enter runs, type filters instantly, Esc closes. A footer shows the key hints. Opens on ⌘K / Ctrl-K. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-cmd" role="dialog" aria-label="Command menu">
  <div class="o-cmd__search"><SearchIcon />
    <input class="o-cmd__input" placeholder="Type a command or search…" /><kbd>ESC</kbd>
  </div>
  <div class="o-cmd__list" role="listbox">
    <div class="o-cmd__group">Navigation</div>
    <button role="option" class="o-cmd__item is-active"><HomeIcon /> Go to Overview <kbd>G O</kbd></button>
  </div>
  <div class="o-cmd__foot">↑↓ navigate · ↵ select · esc close</div>
</div>` },
  { label: "CSS", code: `.o-cmd { width: 440px; background: #141519; border: 1px solid #262a30; border-radius: 14px; overflow: hidden; }
.o-cmd__search { display: flex; align-items: center; gap: 11px; padding: 14px 16px; border-bottom: 1px solid #1e1f24; }
.o-cmd__input { flex: 1; background: none; border: 0; outline: none; color: #e7e9ee; font-size: .95rem; }
.o-cmd__item { display: flex; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 8px; }
.o-cmd__item.is-active { background: #1e1f25; color: #f4f5f6; }
.o-cmd__item kbd { margin-left: auto; font: .62rem var(--mono); color: #565a62; }` },
  { label: "React", code: `import { CommandMenu } from "@optimistic/ui";

const cmd = useCommandMenu();          // exposes open() / close()
useHotkey("mod+k", cmd.toggle);

<CommandMenu open={cmd.open}>
  <CommandMenu.Group label="Navigation">
    <CommandMenu.Item icon={<Home />} shortcut="G O" onSelect={() => go("/")}>Go to Overview</CommandMenu.Item>
  </CommandMenu.Group>
  <CommandMenu.Group label="Actions">
    <CommandMenu.Item icon={<Plus />} shortcut="N" onSelect={create}>New project</CommandMenu.Item>
  </CommandMenu.Group>
</CommandMenu>` },
  { label: "Angular", code: `<o-command-menu [open]="open">
  <o-cmd-group label="Navigation">
    <o-cmd-item icon="home" shortcut="G O" (select)="go('/')">Go to Overview</o-cmd-item>
  </o-cmd-group>
</o-command-menu>` },
  { label: "Async / API", code: `// Fuzzy-rank static commands, and blend in async results (docs, people).
const local = useFuzzy(commands, query);       // instant, ranked
const { data: remote } = useQuery({
  queryKey: ["search", query],
  queryFn: ({ signal }) => search(query, { signal }),
  enabled: query.length > 1,
});

// Register commands from anywhere in the app:
useCommand({ id: "toggle-theme", label: "Toggle theme",
  shortcut: "⌘⇧L", run: () => setTheme((t) => t === "dark" ? "light" : "dark") });` },
];

export default function CommandMenuDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Dot = () => (<svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><CommandMenuDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><CommandMenuConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>open / onOpenChange</td><td>boolean</td><td>Controlled; toggled by ⌘K</td></tr>
          <tr><td className={s.tokName}>Item.onSelect</td><td>() =&gt; void</td><td>Runs the command and closes</td></tr>
          <tr><td className={s.tokName}>icon / shortcut</td><td>ReactNode / string</td><td>Leading glyph, trailing key hint</td></tr>
          <tr><td className={s.tokName}>Group.label</td><td>string</td><td>Mono section heading</td></tr>
          <tr><td className={s.tokName}>⌘K · ↑↓ · ↵ · esc</td><td>—</td><td>Open, move, run, close; typing filters</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The palette jumps anywhere and runs any command from the keyboard. For choosing one value use a Combobox; for a per-object action list use a Menu.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 380 }}>
            <div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none" }}>
              <div className={s.ocmdSearch}><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5" stroke="#767b87" strokeWidth="1.5" /><path d="M12 12l4 4" stroke="#767b87" strokeWidth="1.5" strokeLinecap="round" /></svg><span className={s.ocmdInput} style={{ color: "#565a62" }}>Type a command…</span><span className={s.ocmdEsc}>ESC</span></div>
              <div className={s.ocmdList}><div className={s.ocmdGroup}>Actions</div><span className={`${s.ocmdItem} ${s.ocmdActive}`}><span className={s.ocmdItemIcon}><Dot /></span>New project<span className={s.ocmdKbd}>N</span></span></div>
            </div>
            <span className={s.anaMark} style={{ left: "12%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "18%", top: 78 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>2</b></span>
            <span className={s.vAnaMarkTop} style={{ left: "88%", top: 78 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Search</span><span className={s.anaDesc}>Filters commands as you type.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Active row</span><span className={s.anaDesc}>Keyboard cursor; Enter runs it.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Shortcut</span><span className={s.anaDesc}>The direct key for the command.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", maxWidth: 220 }}><div className={s.ocmdList} style={{ maxHeight: "none" }}><div className={s.ocmdGroup}>Navigation</div><span className={s.ocmdItem}>Go to Projects<span className={s.ocmdKbd}>G P</span></span></div></div></div><p className={s.ddText}>Group commands and show their shortcuts so people learn them.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", maxWidth: 220 }}><div className={s.ocmdList} style={{ maxHeight: "none" }}>{["a","b","c","d","e"].map(x=><span key={x} className={s.ocmdItem} style={{ padding: "6px 10px" }}>Command {x}</span>)}</div></div></div><p className={s.ddText}>Don&apos;t dump one flat, unranked list. Group and fuzzy-rank.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", maxWidth: 220 }}><div className={s.ocmdList} style={{ maxHeight: "none" }}><div className={s.ocmdEmpty}>No commands match “xyz”.</div></div></div></div><p className={s.ddText}>Give the no-match case a calm, specific message.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", maxWidth: 220 }}><div className={s.ocmdSearch} style={{ padding: 10 }}><span className={s.ocmdInput} style={{ color: "#565a62", fontSize: "0.8rem" }}>Search</span></div></div></div><p className={s.ddText}>Don&apos;t hide it behind a click only. Bind it to ⌘K everywhere.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Jump to</div><div className={s.ctxStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", width: "100%" }}><div className={s.ocmdList} style={{ maxHeight: "none" }}><span className={`${s.ocmdItem} ${s.ocmdActive}`}>Go to Overview<span className={s.ocmdKbd}>G O</span></span></div></div></div><p className={s.ctxCaption}>Navigate anywhere without touching the mouse.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Run action</div><div className={s.ctxStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", width: "100%" }}><div className={s.ocmdList} style={{ maxHeight: "none" }}><span className={s.ocmdItem}>New project<span className={s.ocmdKbd}>N</span></span></div></div></div><p className={s.ctxCaption}>Trigger any registered command by name.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Search</div><div className={s.ctxStage}><div className={s.ocmd} style={{ pointerEvents: "none", boxShadow: "none", width: "100%" }}><div className={s.ocmdSearch} style={{ padding: 10 }}><span className={s.ocmdInput} style={{ fontSize: "0.85rem" }}>invoice</span></div></div></div><p className={s.ctxCaption}>Blend commands with live search results.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--cmd-w</td><td>440px</td><td>Palette width</td></tr>
          <tr><td className={s.tokName}>--cmd-bg</td><td><span className={s.tokSwatch} style={{ background: "#141519" }} />#141519</td><td>Panel surface</td></tr>
          <tr><td className={s.tokName}>--cmd-active</td><td><span className={s.tokSwatch} style={{ background: "#1e1f25" }} />#1E1F25</td><td>Keyboard-active row</td></tr>
          <tr><td className={s.tokName}>--cmd-list-h</td><td>244px</td><td>Scroll cap on the list</td></tr>
          <tr><td className={s.tokName}>--cmd-group</td><td>mono · #565A62</td><td>Group heading</td></tr>
          <tr><td className={s.tokName}>--cmd-trigger</td><td>⌘K / Ctrl-K</td><td>Global open shortcut</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
