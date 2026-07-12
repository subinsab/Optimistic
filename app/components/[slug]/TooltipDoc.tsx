import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TooltipDemo from "./TooltipDemo";
import TooltipConfigurator from "./TooltipConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Tooltip component. Dark-field design system. A small label that appears on hover AND keyboard focus — pure CSS, no JS state. Wrapper position:relative display:inline-flex; bubble bg #1A1D27 color #e7e9ee border #262A34 radius 6, font 0.72rem, padding 6px 9px, box-shadow 0 8px 22px, white-space nowrap. A ::after rotated-square arrow points to the trigger. Placements: top (default), bottom, left, right. Show on :hover and :focus-within so it works for keyboard users; fade + 3px slide over 0.16s. Content is a short label only — never interactive, never essential-only (don't hide critical info behind hover). Use it for icon buttons, truncated text, disabled controls, and info icons. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<span class="o-tip-wrap">
  <button class="o-btn o-btn--icon" aria-describedby="tt1">⧉</button>
  <span id="tt1" role="tooltip" class="o-tip o-tip--top">Duplicate</span>
</span>` },
  { label: "CSS", code: `.o-tip-wrap { position: relative; display: inline-flex; }

.o-tip {
  position: absolute; z-index: 9; white-space: nowrap;
  background: #1a1d27; color: #e7e9ee; border: 1px solid #262a34;
  font-size: .72rem; padding: 6px 9px; border-radius: 6px;
  box-shadow: 0 8px 22px rgba(0,0,0,.5);
  opacity: 0; pointer-events: none;
  transition: opacity .16s, transform .16s;
}
/* hover AND focus — keyboard users get the same hint */
.o-tip-wrap:hover .o-tip,
.o-tip-wrap:focus-within .o-tip { opacity: 1; }

.o-tip--top { bottom: calc(100% + 8px); left: 50%;
  transform: translateX(-50%) translateY(3px); }
.o-tip-wrap:hover .o-tip--top { transform: translateX(-50%); }

.o-tip::after {
  content: ""; position: absolute; width: 6px; height: 6px;
  background: #1a1d27; border: 1px solid #262a34;
  border-top: 0; border-left: 0;
  bottom: -4px; left: 50%; margin-left: -3px; transform: rotate(45deg);
}` },
  { label: "React", code: `import { Tooltip } from "@optimistic/ui";

<Tooltip label="Duplicate" placement="top">
  <IconButton icon={<Copy />} aria-label="Duplicate" />
</Tooltip>

<Tooltip label="Publishing needs review access" placement="bottom">
  <Button disabled>Publish</Button>
</Tooltip>` },
  { label: "Angular", code: `<button class="o-btn o-btn--icon"
        o-tooltip="Duplicate" o-tooltip-placement="top"
        aria-label="Duplicate">⧉</button>

<span o-tooltip="Publishing needs review access" o-tooltip-placement="bottom">
  <o-button [disabled]="true">Publish</o-button>
</span>` },
  { label: "Async / API", code: `// A tooltip is presentational — it holds no async of its own. But it
// is the honest home for the "why" behind a disabled async action:
// don't leave the user guessing why a button won't respond.

<Tooltip
  label={
    canPublish
      ? "Publish v3.2 to all consumers"
      : "You need review access to publish"
  }
  placement="bottom"
>
  <Button disabled={!canPublish} loading={publishing} onClick={publish}>
    Publish
  </Button>
</Tooltip>

// Rule: the tooltip explains state; it never *is* the state. Anything
// the user must read to succeed belongs in the layout, not on hover.` },
];

export default function TooltipDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer">
            <i>✳</i> Start building with Claude ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}><TooltipDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><TooltipConfigurator /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <div className={s.subLabel}>Props</div>
            <table className={s.tokTable}>
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>label</td><td>string</td><td>—</td><td>The hint. One short line, no markup</td></tr>
                <tr><td className={s.tokName}>placement</td><td>top · bottom · left · right</td><td>top</td><td>Side the bubble opens toward</td></tr>
                <tr><td className={s.tokName}>children</td><td>ReactNode</td><td>—</td><td>The trigger; must be focusable</td></tr>
                <tr><td className={s.tokName}>delay</td><td>number</td><td>200</td><td>ms before showing on hover (0 on focus)</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Trigger</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>Hover</td><td>Shows after the delay; hides on leave</td></tr>
                <tr><td className={s.tokName}>Focus (Tab)</td><td>Shows immediately — keyboard parity with hover</td></tr>
                <tr><td className={s.tokName}>Escape</td><td>Dismisses while the trigger stays focused</td></tr>
                <tr><td className={s.tokName}>aria-describedby</td><td>Links the trigger to the bubble for screen readers</td></tr>
              </tbody>
            </table>
            <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>
              A tooltip is <b style={{ color: "#e7e9ee", fontWeight: 500 }}>supplementary, never essential</b>. It shows on
              focus as well as hover, so it never hides behind a pointer. If the content is interactive, or the user
              must read it to succeed, it belongs in the layout — a <b style={{ color: "#e7e9ee", fontWeight: 500 }}>popover</b> or the page.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.ovAnaWrap} style={{ padding: "56px 70px 44px" }}>
                  <span className={s.otipWrap} style={{ position: "relative" }}>
                    <span className={`${s.obtn} ${s.iconOnly} ${s.m} ${s.vGhost}`} aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5.5 5.5V4a1 1 0 011-1H12a1 1 0 011 1v5.5a1 1 0 01-1 1h-1.5M3 6.5h5.5a1 1 0 011 1V13a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className={`${s.otip} ${s.otipTop}`} role="tooltip" style={{ opacity: 1, transform: "translateX(-50%)" }}>Duplicate</span>
                    {/* 2 bubble → its left edge */}
                    <span className={s.ovAnaMark} style={{ left: -80, top: -30 }}><b className={s.anaBadge}>2</b><i className={s.ovAnaLine} style={{ width: 42 }} /></span>
                    {/* 3 arrow → left of the arrow, points right */}
                    <span className={s.ovAnaMark} style={{ left: -46, top: -8 }}><b className={s.anaBadge}>3</b><i className={s.ovAnaLine} style={{ width: 40 }} /></span>
                    {/* 4 trigger → right of it, points left */}
                    <span className={`${s.ovAnaMark} ${s.ovAnaFlip}`} style={{ left: 40, top: 18 }}><b className={s.anaBadge}>4</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                    {/* 1 wrapper → below-left, points to the trigger box */}
                    <span className={`${s.ovAnaMark} ${s.ovAnaFlip}`} style={{ left: 40, top: 40 }}><b className={s.anaBadge}>1</b><i className={s.ovAnaLine} style={{ width: 26 }} /></span>
                  </span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Wrapper</span><span className={s.anaDesc}>Inline-flex, position relative. Anchors the bubble and owns the hover / focus state.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Bubble</span><span className={s.anaDesc}>The dark label, one line, no wrapping. Presentational only, never clickable.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Arrow</span><span className={s.anaDesc}>A rotated ::after square pointing at the trigger, so the source is unmistakable.</span></div>
                <div className={s.anaItem}><span className={s.anaNum}>4</span><span className={s.anaName}>Trigger</span><span className={s.anaDesc}>Any focusable element. Tab reveals the tooltip just as hover does.</span></div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Do&apos;s and Don&apos;ts</div>
          <div className={s.secBody}>
            <div className={s.ddGrid}>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={s.otipWrap}>
                    <span className={`${s.obtn} ${s.iconOnly} ${s.sm} ${s.vGhost}`} aria-hidden="true">⧉</span>
                    <span className={`${s.otip} ${s.otipTop}`} style={{ opacity: 1, transform: "translateX(-50%)" }}>Duplicate</span>
                  </span>
                </div>
                <p className={s.ddText}>Name icon-only buttons. A one-word label turns a glyph into an unambiguous action.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={s.otipWrap}>
                    <span className={`${s.obtn} ${s.sm} ${s.vGhost}`} aria-hidden="true">Help</span>
                    <span className={`${s.otip} ${s.otipTop}`} style={{ opacity: 1, transform: "translateX(-50%)", whiteSpace: "normal", width: 150 }}>Read this whole paragraph before you continue, then click…</span>
                  </span>
                </div>
                <p className={s.ddText}>Don&apos;t hide paragraphs or steps in a tooltip. Anything essential belongs on the page.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <span className={s.otipWrap}>
                    <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`} style={{ opacity: 0.38 }} aria-hidden="true">Publish</span>
                    <span className={`${s.otip} ${s.otipBottom}`} style={{ opacity: 1, transform: "translateX(-50%)" }}>Needs review access</span>
                  </span>
                </div>
                <p className={s.ddText}>Explain why a control is disabled. The tooltip answers the question before it is asked.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <span className={s.otipWrap}>
                    <span className={`${s.obtn} ${s.sm} ${s.vGhost}`} aria-hidden="true">Actions</span>
                    <span className={`${s.otip} ${s.otipTop}`} style={{ opacity: 1, transform: "translateX(-50%)" }}>Edit · Delete</span>
                  </span>
                </div>
                <p className={s.ddText}>Don&apos;t put buttons or links in a tooltip. Interactive content on hover is a menu or popover.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>In context: Examples</div>
          <div className={s.secBody}>
            <div className={s.ctxGrid}>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>A · Icon toolbar</div>
                <div className={s.ctxStage}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[["Bold", "⧉"], ["Link", "↗"], ["More", "⋯"]].map(([lbl, gl], i) => (
                      <span key={lbl} className={s.otipWrap}>
                        <span className={`${s.obtn} ${s.iconOnly} ${s.sm} ${s.vGhost}`} aria-hidden="true">{gl}</span>
                        {i === 1 && <span className={`${s.otip} ${s.otipTop}`} style={{ opacity: 1, transform: "translateX(-50%)" }}>{lbl}</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <p className={s.ctxCaption}>Dense icon rows lean on tooltips so every glyph still says its name.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · Truncated text</div>
                <div className={s.ctxStage}>
                  <span className={s.otipWrap}>
                    <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#cfd3da", fontSize: "0.82rem", display: "inline-block" }}>optimistic-design-system-tokens.json</span>
                    <span className={`${s.otip} ${s.otipBottom}`} style={{ opacity: 1, transform: "translateX(-50%)" }}>optimistic-design-system-tokens.json</span>
                  </span>
                </div>
                <p className={s.ctxCaption}>When a label is clipped, the tooltip reveals it in full on hover or focus.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · Info icon</div>
                <div className={s.ctxStage}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#cfd3da", fontSize: "0.82rem" }}>
                    Sync status
                    <span className={s.otipWrap}>
                      <span style={{ display: "inline-grid", placeItems: "center", width: 18, height: 18, borderRadius: "50%", border: "1px solid #3a3a3e", color: "#767b87", fontSize: "0.62rem" }} aria-hidden="true">i</span>
                      <span className={`${s.otip} ${s.otipRight}`} style={{ opacity: 1, transform: "translateY(-50%)" }}>Last push, 2 min ago</span>
                    </span>
                  </span>
                </div>
                <p className={s.ctxCaption}>An info icon offers a definition without spending permanent space on it.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Measurements &amp; Tokens</div>
          <div className={s.secBody}>
            <table className={s.tokTable}>
              <thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>--tip-bg</td><td><span className={s.tokSwatch} style={{ background: "#1a1d27" }} />#1A1D27</td><td>Bubble surface (arrow inherits it)</td></tr>
                <tr><td className={s.tokName}>--tip-border</td><td><span className={s.tokSwatch} style={{ background: "#262a34" }} />#262A34</td><td>Bubble hairline</td></tr>
                <tr><td className={s.tokName}>--tip-fg</td><td><span className={s.tokSwatch} style={{ background: "#e7e9ee" }} />#E7E9EE</td><td>Label text</td></tr>
                <tr><td className={s.tokName}>--tip-size</td><td>0.72rem</td><td>Label type size</td></tr>
                <tr><td className={s.tokName}>--tip-radius</td><td>6px</td><td>Corner radius</td></tr>
                <tr><td className={s.tokName}>--tip-offset</td><td>8px</td><td>Gap from the trigger</td></tr>
                <tr><td className={s.tokName}>--tip-delay</td><td>200ms</td><td>Hover open delay; 0 on focus</td></tr>
                <tr><td className={s.tokName}>--tip-ease</td><td>0.16s</td><td>Fade + 3px slide</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Code</div>
          <div className={s.secBody}><CodeTabs tabs={CODE} /></div>
        </section>
      </Reveal>

      <RelatedSection related={related} />
    </>
  );
}
