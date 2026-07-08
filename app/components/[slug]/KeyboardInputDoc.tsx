import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import KeyboardInputDemo from "./KeyboardInputDemo";
import KeyboardInputConfigurator from "./KeyboardInputConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Keyboard Input (kbd). Dark design system: keys rendered as physical keys — a #1A1B20 cap, #2E2F36 border with a 2px bottom edge for depth, mono 0.72rem, min 22px square, radius 6. Chords join keys with a muted plus. Sizes S/M/L. Use real <kbd> elements; symbols for modifiers (⌘ ⇧ ⌥ ⌃ ↵ ⎋ ⌫). Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<kbd class="o-kbd">⌘</kbd>

<span class="o-kbd-combo">
  <kbd class="o-kbd">⌘</kbd><span class="o-kbd__plus">+</span><kbd class="o-kbd">K</kbd>
</span>` },
  { label: "CSS", code: `.o-kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 6px; border-radius: 6px;
  background: #1a1b20; border: 1px solid #2e2f36; border-bottom-width: 2px;
  font: .72rem var(--mono); color: #cfd3da; line-height: 1;
}
.o-kbd-combo { display: inline-flex; align-items: center; gap: 5px; }
.o-kbd__plus { color: #565a62; }` },
  { label: "React", code: `import { Kbd } from "@optimistic/ui";

<Kbd>⌘</Kbd>
<Kbd keys={["⌘", "K"]} />           // renders a joined chord
<Kbd keys={["⌘", "⇧", "P"]} size="lg" />` },
  { label: "Angular", code: `<o-kbd>⌘</o-kbd>
<o-kbd [keys]="['⌘','K']"></o-kbd>
<o-kbd [keys]="['⌘','⇧','P']" size="lg"></o-kbd>` },
  { label: "Async / API", code: `// Show the right modifier symbol per platform, from one shortcut string.
const isMac = /Mac|iP/.test(navigator.platform);
function keysFor(combo) {
  return combo.split("+").map((k) =>
    k === "mod" ? (isMac ? "⌘" : "Ctrl")
    : k === "shift" ? (isMac ? "⇧" : "Shift")
    : k.toUpperCase()
  );
}

<Kbd keys={keysFor("mod+k")} />        // ⌘ K on Mac, Ctrl K elsewhere` },
];

export default function KeyboardInputDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Kbd = ({ children, size = "" }: { children: React.ReactNode; size?: string }) => <kbd className={`${s.okbd} ${size}`}>{children}</kbd>;
  const Combo = ({ keys }: { keys: string[] }) => <span className={s.okbdCombo}>{keys.map((k, i) => <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{i > 0 && <span className={s.okbdPlus}>+</span>}<Kbd>{k}</Kbd></span>)}</span>;
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><KeyboardInputDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><KeyboardInputConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>keys</td><td>string[]</td><td>One or more keys; joined into a chord</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>18 / 22 / 30px cap height</td></tr>
          <tr><td className={s.tokName}>element</td><td>kbd</td><td>Semantic &lt;kbd&gt; for assistive tech</td></tr>
          <tr><td className={s.tokName}>platform</td><td>auto</td><td>⌘ on macOS, Ctrl elsewhere</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Kbd renders the keys to press. It is display only — pair it with a Menu item, a Tooltip, or docs copy, never as a control.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <Combo keys={["⌘", "K"]} />
            <span className={s.anaMark} style={{ left: "16%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Key cap</span><span className={s.anaDesc}>Mono glyph on a bevelled cap with a 2px base.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Join</span><span className={s.anaDesc}>A muted plus between keys of a chord.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><Combo keys={["⌘", "K"]} /></div><p className={s.ddText}>Use modifier symbols and a real &lt;kbd&gt; element.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ color: "#9aa0a8", fontSize: "0.85rem" }}>Cmd + K</span></div><p className={s.ddText}>Don&apos;t spell out modifiers in plain text. Render the keys.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ display: "flex", alignItems: "center", gap: 8, color: "#9aa0a8", fontSize: "0.82rem" }}>Save <Combo keys={["⌘", "S"]} /></span></div><p className={s.ddText}>Pair a shortcut with the action it triggers.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><Combo keys={["⌘", "⌥", "⇧", "⌃", "F", "5"]} /></div><p className={s.ddText}>Don&apos;t document impossible chords. Keep them memorable.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Menu row</div><div className={s.ctxStage}><span style={{ display: "flex", alignItems: "center", gap: 10, color: "#cfd3da", fontSize: "0.84rem", width: "100%" }}>Copy <span style={{ marginLeft: "auto" }}><Combo keys={["⌘", "C"]} /></span></span></div><p className={s.ctxCaption}>Trailing shortcuts in a Menu or Command palette.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Tooltip</div><div className={s.ctxStage}><span className={s.otooltip ? "" : ""} style={{ background: "#23252b", border: "1px solid #33353c", borderRadius: 7, padding: "5px 9px", fontSize: "0.76rem", color: "#e7e9ee", display: "inline-flex", gap: 8, alignItems: "center" }}>Search <Kbd size={s.okbdSm}>⌘K</Kbd></span></div><p className={s.ctxCaption}>Hinting a shortcut inside a tooltip.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Docs</div><div className={s.ctxStage}><span style={{ color: "#9aa0a8", fontSize: "0.82rem", lineHeight: 1.7 }}>Press <Combo keys={["G", "P"]} /> to jump to Projects.</span></div><p className={s.ctxCaption}>Inline in documentation and onboarding.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--kbd-h</td><td>18 / 22 / 30px</td><td>Cap height S / M / L</td></tr>
          <tr><td className={s.tokName}>--kbd-bg</td><td><span className={s.tokSwatch} style={{ background: "#1a1b20" }} />#1A1B20</td><td>Cap fill</td></tr>
          <tr><td className={s.tokName}>--kbd-border</td><td><span className={s.tokSwatch} style={{ background: "#2e2f36" }} />#2E2F36</td><td>Edge, 2px on the bottom</td></tr>
          <tr><td className={s.tokName}>--kbd-text</td><td>mono · #CFD3DA</td><td>Glyph colour</td></tr>
          <tr><td className={s.tokName}>--kbd-plus</td><td><span className={s.tokSwatch} style={{ background: "#565a62" }} />#565A62</td><td>Chord join</td></tr>
          <tr><td className={s.tokName}>--kbd-radius</td><td>6px</td><td>Cap corner</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
