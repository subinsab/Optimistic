import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import IndicatorDemo from "./IndicatorDemo";
import IndicatorConfigurator from "./IndicatorConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Indicator. Dark design system: a 9px status dot — online #1FA35C, idle #E8A93A, busy #EB4A4F, offline #565A62 — optionally with a text label. A 'live' online dot pulses (an expanding, fading ring) and honours prefers-reduced-motion. When placed on an avatar it sits bottom-right with a 2px page-colour ring. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<span class="o-ind-row">
  <span class="o-ind o-ind--online"></span> Online
</span>

<span class="o-ind o-ind--live"></span>            <!-- pulsing -->

<span class="o-ind-anchor">
  <Avatar />
  <span class="o-ind o-ind--online o-ind--ring"></span>
</span>` },
  { label: "CSS", code: `.o-ind { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.o-ind--online { background: #1fa35c; }
.o-ind--idle   { background: #e8a93a; }
.o-ind--busy   { background: #eb4a4f; }

.o-ind--live { position: relative; background: #1fa35c; }
.o-ind--live::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: #1fa35c; animation: pulse 1.6s ease-out infinite;
}
@keyframes pulse { to { transform: scale(2.6); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .o-ind--live::after { animation: none; } }` },
  { label: "React", code: `import { Indicator } from "@optimistic/ui";

<Indicator status="online" label="Online" />
<Indicator status="online" pulse />          // live

// on an avatar
<Avatar badge={<Indicator status="online" ring />}>AL</Avatar>` },
  { label: "Angular", code: `<o-indicator status="online" label="Online"></o-indicator>
<o-indicator status="online" pulse></o-indicator>` },
  { label: "Async / API", code: `// Presence from a socket: map connection state to a status, and never
// show "online" for a stale session — expire on a heartbeat timeout.
useEffect(() => {
  const ch = subscribe(\`presence:\${userId}\`);
  ch.on("state", (s) => setStatus(s));          // online / idle / offline
  const beat = setInterval(() => {
    if (Date.now() - lastSeen.current > 45000) setStatus("offline");
  }, 15000);
  return () => { ch.close(); clearInterval(beat); };
}, [userId]);

// <Indicator status={status} label={labelFor(status)} />` },
];

export default function IndicatorDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><IndicatorDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><IndicatorConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>status</td><td>online · idle · busy · offline</td><td>Semantic colour of the dot</td></tr>
          <tr><td className={s.tokName}>label</td><td>string</td><td>Optional text beside the dot</td></tr>
          <tr><td className={s.tokName}>pulse</td><td>boolean</td><td>Animated ring for a live state</td></tr>
          <tr><td className={s.tokName}>ring</td><td>boolean</td><td>2px page-colour ring for overlaying media</td></tr>
          <tr><td className={s.tokName}>aria-label</td><td>string</td><td>Required when the dot stands alone</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>An Indicator is a glanceable dot of status — it never carries a number or a word inside it. For counts use a Badge; for a labelled status chip use a Badge with a dot.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.oindDotAnchor}>
              <span className={s.olistAvatar} style={{ width: 48, height: 48 }}>AL</span>
              <span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} />
            </span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "88%", top: 52 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>2</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Host</span><span className={s.anaDesc}>The avatar or label the status belongs to.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Dot</span><span className={s.anaDesc}>9px status colour, bottom-right, with a page ring.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.oindRow}><span className={`${s.oind} ${s.oindOnline}`} />Online</span></div><p className={s.ddText}>Pair the dot with a word when the colour alone could be missed.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={`${s.oind} ${s.oindOnline}`} style={{ width: 22, height: 22, display: "grid", placeItems: "center", fontSize: "0.6rem", color: "#fff" }}>3</span></div><p className={s.ddText}>Don&apos;t put a number in the dot. A counted dot is a Badge.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.oindDotAnchor}><span className={s.olistAvatar} style={{ width: 34, height: 34 }}>AT</span><span className={`${s.oind} ${s.oindOnline} ${s.oindRing}`} /></span></div><p className={s.ddText}>Give the dot a page-colour ring when it overlaps an avatar.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "flex", gap: 6 }}><span className={`${s.oind} ${s.oindOnline}`} /><span className={`${s.oind} ${s.oindIdle}`} /><span className={`${s.oind} ${s.oindBusy}`} /></span></div><p className={s.ddText}>Don&apos;t stack several dots for one thing. One state at a time.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Presence</div><div className={s.ctxStage}><span className={s.oindDotAnchor}><span className={s.olistAvatar} style={{ width: 40, height: 40 }}>GH</span><span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} /></span></div><p className={s.ctxCaption}>Online presence on an avatar in chat and member lists.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Live</div><div className={s.ctxStage}><span className={s.oindRow}><span className={`${s.oind} ${s.oindLive}`} />Live now</span></div><p className={s.ctxCaption}>A pulsing dot marks a stream or a real-time feed.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · System status</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 8 }}><span className={s.oindRow}><span className={`${s.oind} ${s.oindOnline}`} />API operational</span><span className={s.oindRow}><span className={`${s.oind} ${s.oindIdle}`} />Degraded</span></div></div><p className={s.ctxCaption}>Service health rows on a status page.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--ind-size</td><td>9px</td><td>Dot diameter (12px on media)</td></tr>
          <tr><td className={s.tokName}>--ind-online</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Available / operational</td></tr>
          <tr><td className={s.tokName}>--ind-idle</td><td><span className={s.tokSwatch} style={{ background: "#e8a93a" }} />#E8A93A</td><td>Away / degraded</td></tr>
          <tr><td className={s.tokName}>--ind-busy</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Do-not-disturb / down</td></tr>
          <tr><td className={s.tokName}>--ind-offline</td><td><span className={s.tokSwatch} style={{ background: "#565a62" }} />#565A62</td><td>Offline / ended</td></tr>
          <tr><td className={s.tokName}>--ind-ring</td><td>2px page bg</td><td>Separates the dot from media</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
