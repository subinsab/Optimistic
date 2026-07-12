import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import AvatarDemo from "./AvatarDemo";
import AvatarConfigurator from "./AvatarConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Avatar. Dark design system: a circular identity mark (rounded-square variant too) at sizes XS 24 / SM 32 / MD 40 / LG 56 / XL 76. Three contents in priority order — a cover-fit image, else tinted initials (warm/blue/green/purple on a #26262B base), else a generic user glyph. Optional presence dot bottom-right with a 2px page ring. Groups overlap with a page-colour ring and cap with a +N tile. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<span class="o-avatar o-avatar--md">
  <img class="o-avatar__img" src="/ada.jpg" alt="Ada Lovelace" />
</span>

<span class="o-avatar o-avatar--md o-avatar--warm">AL</span>   <!-- initials -->
<span class="o-avatar o-avatar--md"><UserIcon /></span>         <!-- fallback -->

<span class="o-avatar-anchor">
  <span class="o-avatar o-avatar--lg">AL</span>
  <span class="o-ind o-ind--online o-ind--ring"></span>
</span>` },
  { label: "CSS", code: `.o-avatar {
  display: inline-grid; place-items: center; overflow: hidden;
  border-radius: 50%; background: #26262b; color: #cfd3da; font-weight: 500;
}
.o-avatar--square { border-radius: 20%; }
.o-avatar__img { width: 100%; height: 100%; object-fit: cover; }
.o-avatar--warm { background: rgba(255,122,0,.18); color: #ff9d45; }
.o-avatar--md { width: 40px; height: 40px; font-size: .85rem; }` },
  { label: "React", code: `import { Avatar, AvatarGroup } from "@optimistic/ui";

<Avatar src={user.photo} name="Ada Lovelace" size="md" status="online" />
<Avatar name="Alan Turing" size="md" />        // initials from name
<Avatar size="md" />                            // icon fallback

<AvatarGroup max={4}>
  {team.map((u) => <Avatar key={u.id} src={u.photo} name={u.name} />)}
</AvatarGroup>` },
  { label: "Angular", code: `<o-avatar [src]="user.photo" name="Ada Lovelace" size="md" status="online"></o-avatar>
<o-avatar name="Alan Turing" size="md"></o-avatar>

<o-avatar-group [max]="4">
  <o-avatar *ngFor="let u of team" [src]="u.photo" [name]="u.name"></o-avatar>
</o-avatar-group>` },
  { label: "Async / API", code: `// Graceful fallback chain: image → initials → icon. Detect a broken
// or missing photo and fall through without a flash of a broken image.
function Avatar({ src, name, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const initials = name?.split(" ").map((w) => w[0]).slice(0, 2).join("");

  if (src && !failed)
    return <img className="o-avatar__img" src={src} alt={name}
             onError={() => setFailed(true)} loading="lazy" />;

  return <span className="o-avatar">{initials || <UserIcon />}</span>;
}` },
];

export default function AvatarDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const User = ({ size = 20 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" /><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><AvatarDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><AvatarConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>src / name</td><td>string</td><td>Photo, then initials from name, then icon</td></tr>
          <tr><td className={s.tokName}>size</td><td>xs · sm · md · lg · xl</td><td>24 / 32 / 40 / 56 / 76px</td></tr>
          <tr><td className={s.tokName}>shape</td><td>circle · square</td><td>Circle by default; square for brands</td></tr>
          <tr><td className={s.tokName}>status</td><td>online · idle · busy</td><td>Presence dot with a page-colour ring</td></tr>
          <tr><td className={s.tokName}>max (group)</td><td>number</td><td>Visible avatars before a +N tile</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>An Avatar identifies a person or team. For a status dot alone use an Indicator; for a brand mark use the Logo.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.oindDotAnchor}>
              <span className={`${s.oavatar} ${s.avXl} ${s.avWarm}`}>AL</span>
              <span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} />
            </span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 50 }} /></span>
            <span className={s.anaMark} style={{ left: "20%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 26 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "90%", top: 66 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 22 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Content</span><span className={s.anaDesc}>Image, initials or icon — in that order.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Circle (or rounded square), clips the content.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Status</span><span className={s.anaDesc}>Optional presence dot with a page ring.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={`${s.oavatar} ${s.avLg} ${s.avWarm}`}>AL</span></div><p className={s.ddText}>Use one or two initials from the name when there is no photo.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={`${s.oavatar} ${s.avLg} ${s.avWarm}`} style={{ fontSize: "0.6rem" }}>ADA L.</span></div><p className={s.ddText}>Don&apos;t cram a full name in. Two characters, sized to read.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oavatarGroup}><span className={`${s.oavatar} ${s.avMd} ${s.avBlue}`}>AT</span><span className={`${s.oavatar} ${s.avMd} ${s.avGreen}`}>GH</span><span className={`${s.oavatar} ${s.avMd} ${s.oavatarMore} ${s.avWarm}`}>+3</span></div></div><p className={s.ddText}>Cap a group with a +N so the row never sprawls.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "flex", gap: 5 }}>{["AL","AT","GH","KJ","MR","PT"].map(x=><span key={x} className={`${s.oavatar} ${s.avSm} ${s.avBlue}`}>{x}</span>)}</span></div><p className={s.ddText}>Don&apos;t line up a dozen full avatars. Overlap and cap them.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · List row</div><div className={s.ctxStage}><span style={{ display: "flex", alignItems: "center", gap: 10 }}><span className={`${s.oavatar} ${s.avSm} ${s.avWarm}`}>AL</span><span className={s.olistTitle} style={{ fontSize: "0.84rem" }}>Ada Lovelace</span></span></div><p className={s.ctxCaption}>Leading a list or table row, size SM or MD.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Profile header</div><div className={s.ctxStage}><span className={s.oindDotAnchor}><span className={`${s.oavatar} ${s.avXl} ${s.avBlue}`}>AT</span><span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} /></span></div><p className={s.ctxCaption}>Large XL avatar with presence on a profile page.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Assignees</div><div className={s.ctxStage}><div className={s.oavatarGroup}><span className={`${s.oavatar} ${s.avSm} ${s.avGreen}`}>GH</span><span className={`${s.oavatar} ${s.avSm} ${s.avPurple}`}>KJ</span><span className={`${s.oavatar} ${s.avSm} ${s.oavatarMore} ${s.avWarm}`}>+2</span></div></div><p className={s.ctxCaption}>Stacked assignees on a task or project card.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--av-xs … xl</td><td>24 / 32 / 40 / 56 / 76px</td><td>The five sizes</td></tr>
          <tr><td className={s.tokName}>--av-radius</td><td>50% · 20%</td><td>Circle or rounded square</td></tr>
          <tr><td className={s.tokName}>--av-base</td><td><span className={s.tokSwatch} style={{ background: "#26262b" }} />#26262B</td><td>Neutral fallback fill</td></tr>
          <tr><td className={s.tokName}>--av-warm</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00 @18%</td><td>Tinted initials, one of four hues</td></tr>
          <tr><td className={s.tokName}>--av-ring</td><td>2px page bg</td><td>Group overlap and status ring</td></tr>
          <tr><td className={s.tokName}>--av-overlap</td><td>-11px</td><td>Group stacking offset</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
