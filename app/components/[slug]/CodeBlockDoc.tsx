import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import CodeBlockDemo, { CodeSurface } from "./CodeBlockDemo";
import { SNIPPETS } from "./codeSnippets";
import CodeBlockConfigurator from "./CodeBlockConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Code Block. Dark design system: a styled pre-formatted code surface with a header (uppercase mono language label on the left, a one-click Copy button on the right that flips to 'Copied ✓' for two seconds), and a body of mono, pre-formatted code with restrained syntax token colours. Palette is monochrome-first: keywords and tags use the one warm accent #FF7A00, strings use a single muted sage #8FBFA8, comments are grey italic #5B6069, everything else stays in the grey scale — no rainbow highlighting. Surface #0D0E11, header #121317, hairline border #1E1E1E, radius 10px, body font-size 12.5px, line-height 1.7. Optional line numbers and soft wrap. Copy uses navigator.clipboard.writeText with optimistic feedback. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-code">
  <div class="o-code__head">
    <span class="o-code__lang">tsx</span>
    <button class="o-code__copy" onclick="copyBlock(this)">Copy</button>
  </div>
  <pre class="o-code__body"><code><span class="cb-kw">const</span> x = <span class="cb-num">42</span>;</code></pre>
</div>` },
  { label: "CSS", code: `.o-code { border: 1px solid #1e1e1e; border-radius: 10px; overflow: hidden; background: #0d0e11; }
.o-code__head { display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px 8px 14px; background: #121317; border-bottom: 1px solid #1e1e1e; }
.o-code__lang { font: 600 .64rem var(--mono); letter-spacing: .14em; text-transform: uppercase; color: #8a8f9a; }
.o-code__copy { font: .66rem var(--mono); color: #9aa0a8; background: none;
  border: 1px solid #24252b; border-radius: 6px; padding: 4px 9px; cursor: pointer; }
.o-code__copy.is-copied { color: #ff7a00; border-color: rgba(255,122,0,.4); }
.o-code__body { margin: 0; padding: 15px 18px; overflow-x: auto;
  font: .78rem/1.75 var(--mono); color: #cfd3da; }

/* token colours — warm keyword, one cool hue, greys */
.cb-kw, .cb-tag { color: #ff7a00; }
.cb-str { color: #8fbfa8; }
.cb-cmt { color: #5b6069; font-style: italic; }
.cb-num { color: #b9bec7; }` },
  { label: "React", code: `import { CodeBlock } from "@optimistic/ui";

<CodeBlock language="tsx" showLineNumbers>
{\`const [liked, setLiked] = useState(false);\`}
</CodeBlock>` },
  { label: "Angular", code: `<o-code-block language="tsx" [showLineNumbers]="true">
  const [liked, setLiked] = useState(false);
</o-code-block>` },
  { label: "Async / API", code: `// Copy is an optimistic action — show success before you can be sure.
async function copy(text: string, el: HTMLButtonElement) {
  el.classList.add("is-copied");                 // render success first
  el.textContent = "Copied ✓";
  try {
    await navigator.clipboard.writeText(text);   // the real work
  } catch {
    el.classList.remove("is-copied");            // honest rollback
    el.textContent = "Press ⌘C";
    return;
  }
  setTimeout(() => { el.classList.remove("is-copied"); el.textContent = "Copy"; }, 2000);
}` },
];

export default function CodeBlockDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><CodeBlockDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><CodeBlockConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>language</td><td>string</td><td>Shown uppercase in the header; drives token classes</td></tr>
          <tr><td className={s.tokName}>children</td><td>string</td><td>The source; whitespace preserved verbatim</td></tr>
          <tr><td className={s.tokName}>showLineNumbers</td><td>boolean</td><td>Gutter of right-aligned, unselectable line numbers</td></tr>
          <tr><td className={s.tokName}>wrap</td><td>boolean</td><td>Soft-wrap long lines instead of scrolling</td></tr>
          <tr><td className={s.tokName}>onCopy</td><td>(text) =&gt; void</td><td>Fires after the clipboard write resolves</td></tr>
        </tbody></table>
        <table className={s.tokTable} style={{ marginTop: 18 }}><thead><tr><th>Event / Key</th><th>Result</th></tr></thead><tbody>
          <tr><td className={s.tokName}>Click Copy</td><td>Writes to clipboard, flips label to “Copied ✓” for 2s</td></tr>
          <tr><td className={s.tokName}>Enter · Space</td><td>Activates the focused Copy button</td></tr>
          <tr><td className={s.tokName}>⌘/Ctrl + C</td><td>Native selection copy still works — the button is a shortcut</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 8px", border: 0 }}>Copy is an optimistic gesture: the label flips to success the instant you click, then the clipboard write happens. If it fails, the label rolls back honestly. Try it —</p>
        <div style={{ maxWidth: 420 }}><CodeSurface lang={SNIPPETS.shell.lang} toks={SNIPPETS.shell.toks} /></div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 360 }}>
            <div style={{ width: "100%" }}><CodeSurface lang={SNIPPETS.css.lang} toks={SNIPPETS.css.toks} /></div>
            <span className={s.anaMark} style={{ left: "6%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 44 }} /></span>
            <span className={s.anaMark} style={{ left: "40%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "86%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 44 }} /></span>
            <span className={s.anaMark} style={{ left: "24%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>4</b><i className={s.anaConn} style={{ height: 92 }} /></span>
            <span className={s.anaMark} style={{ left: "58%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>5</b><i className={s.anaConn} style={{ height: 116 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>The bar carrying the label and copy control.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Language label</span><span className={s.anaDesc}>Uppercase mono, so the reader knows the dialect.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Copy button</span><span className={s.anaDesc}>One click to clipboard; flips to “Copied ✓”.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Body</span><span className={s.anaDesc}>Pre-formatted code; whitespace kept, scrolls if long.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>5</span><span className={s.anaName}>Tokens</span><span className={s.anaDesc}>Restrained highlight: warm keyword, one cool hue, greys.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 220 }}><CodeSurface lang={SNIPPETS.shell.lang} toks={SNIPPETS.shell.toks} /></div></div><p className={s.ddText}>Label the language and offer copy. Small courtesies developers feel every time.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}><span className={s.cbKw}>const</span> <span className={s.cbFn}>x</span> = <span className={s.cbStr}>42</span></span></div><p className={s.ddText}>Don&apos;t use a full block for an inline token — reach for Keyboard Input or plain code text.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}><span className={s.cbKw}>function</span> <span className={s.cbFn}>save</span>() {"{ … }"}</span></div><p className={s.ddText}>Keep highlighting restrained — one warm accent for keywords, greys for the rest.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}><span style={{ color: "#f472b6" }}>function</span> <span style={{ color: "#fcd34d" }}>save</span><span style={{ color: "#7dd3fc" }}>()</span> <span style={{ color: "#86efac" }}>{"{}"}</span></span></div><p className={s.ddText}>Don&apos;t rainbow every token. Noise buries the one thing worth noticing.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Docs snippet</div><div className={s.ctxStage}><div style={{ width: "100%" }}><CodeSurface lang={SNIPPETS.tsx.lang} toks={SNIPPETS.tsx.toks} /></div></div><p className={s.ctxCaption}>A component example in a guide, copyable in one click.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Token reference</div><div className={s.ctxStage}><div style={{ width: "100%" }}><CodeSurface lang={SNIPPETS.css.lang} toks={SNIPPETS.css.toks} /></div></div><p className={s.ctxCaption}>CSS custom properties shown honestly, verbatim.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Install command</div><div className={s.ctxStage}><div style={{ width: "100%" }}><CodeSurface lang={SNIPPETS.shell.lang} toks={SNIPPETS.shell.toks} /></div></div><p className={s.ctxCaption}>A shell one-liner in a getting-started page.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--code-bg</td><td><span className={s.tokSwatch} style={{ background: "#0d0e11" }} />#0D0E11</td><td>Body surface</td></tr>
          <tr><td className={s.tokName}>--code-head-bg</td><td><span className={s.tokSwatch} style={{ background: "#121317" }} />#121317</td><td>Header bar</td></tr>
          <tr><td className={s.tokName}>--code-border</td><td><span className={s.tokSwatch} style={{ background: "#1e1e1e" }} />#1E1E1E</td><td>The site hairline</td></tr>
          <tr><td className={s.tokName}>--code-radius</td><td>10px</td><td>Corner radius</td></tr>
          <tr><td className={s.tokName}>--code-font</td><td>0.78rem / 1.75</td><td>Mono body size and leading</td></tr>
          <tr><td className={s.tokName}>--cb-kw</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Keywords &amp; tags — the one warm role</td></tr>
          <tr><td className={s.tokName}>--cb-str</td><td><span className={s.tokSwatch} style={{ background: "#8fbfa8" }} />#8FBFA8</td><td>Strings — the single cool hue</td></tr>
          <tr><td className={s.tokName}>--cb-cmt</td><td><span className={s.tokSwatch} style={{ background: "#5b6069" }} />#5B6069</td><td>Comments, grey italic</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
