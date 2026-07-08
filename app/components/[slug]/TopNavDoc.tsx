import Reveal from "../../_components/Reveal";
import Logo from "../../_components/Logo";
import type { ALL_ENTRIES } from "../_data/registry";
import TopNavDemo from "./TopNavDemo";
import TopNavConfigurator from "./TopNavConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Top Navigation. Dark design system: a 56px horizontal bar (#0C0D10, #1E1E1E border) with a brand lockup on the left, centre or left nav links (active link brightens with a 2px warm underline), and a right cluster — an optional ⌘K search field, a warm primary CTA, and an avatar. Collapses links behind a menu on mobile. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<nav class="o-tnav" aria-label="Global">
  <span class="o-tnav__brand"><Logo /> Optimistic</span>
  <div class="o-tnav__links">
    <a class="o-tnav__link is-active" aria-current="page">Overview</a>
    <a class="o-tnav__link">Projects</a>
  </div>
  <div class="o-tnav__right">
    <button class="o-btn o-btn--brand">New</button>
    <Avatar>AL</Avatar>
  </div>
</nav>` },
  { label: "CSS", code: `.o-tnav { display: flex; align-items: center; gap: 18px; height: 56px; padding: 0 16px; }
.o-tnav__link { padding: 8px 12px; border-radius: 7px; color: #9aa0a8; position: relative; }
.o-tnav__link.is-active { color: #f4f5f6; }
.o-tnav__link.is-active::after {
  content: ""; position: absolute; inset: auto 12px -18px; height: 2px; background: #ff7a00;
}
.o-tnav__right { margin-left: auto; display: flex; align-items: center; gap: 10px; }` },
  { label: "React", code: `import { TopNav } from "@optimistic/ui";

<TopNav
  brand={<Logo withWordmark />}
  links={[
    { label: "Overview", href: "/", active: true },
    { label: "Projects", href: "/projects" },
  ]}
  search
  cta={<Button variant="brand">New</Button>}
  account={<Avatar src={user.photo} />}
/>` },
  { label: "Angular", code: `<o-top-nav>
  <o-logo brand></o-logo>
  <o-nav-link routerLink="/" active>Overview</o-nav-link>
  <o-nav-link routerLink="/projects">Projects</o-nav-link>
  <button o-btn variant="brand" right>New</button>
</o-top-nav>` },
  { label: "Async / API", code: `// Highlight the active link from the route; open the Command Menu on ⌘K.
const path = usePathname();
const links = nav.map((l) => ({ ...l, active: path.startsWith(l.href) }));

useHotkey("mod+k", () => cmd.open());

<TopNav links={links} search onSearchClick={() => cmd.open()}
  account={session ? <Avatar src={session.photo} /> : <SignIn />} />` },
];

export default function TopNavDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const bar = (children: React.ReactNode) => <nav className={s.otnav} style={{ pointerEvents: "none", background: "#0e0f12" }}>{children}</nav>;
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><TopNavDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><TopNavConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>brand / logo</td><td>ReactNode / boolean</td><td>Logo lockup; can be hidden</td></tr>
          <tr><td className={s.tokName}>variant</td><td>fixed · floating</td><td>Flush to the top, or a lifted floating bar</td></tr>
          <tr><td className={s.tokName}>links · mega</td><td>{"{ label, href, active, items }[]"}</td><td>Active underline; a link with items opens an L1 → L2 mega menu</td></tr>
          <tr><td className={s.tokName}>clientSwitcher</td><td>{"{ current, options, onChange }"}</td><td>Workspace / client selector on the left</td></tr>
          <tr><td className={s.tokName}>search / cta</td><td>boolean / ReactNode</td><td>⌘K search and one warm primary action</td></tr>
          <tr><td className={s.tokName}>notifications</td><td>Notification[]</td><td>Bell with an unread dot and a dropdown</td></tr>
          <tr><td className={s.tokName}>account</td><td>ReactNode</td><td>Avatar opening a profile menu (Settings, Sign out)</td></tr>
          <tr><td className={s.tokName}>responsive</td><td>—</td><td>Links collapse behind a hamburger + left drawer on mobile</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The bar handles top-level wayfinding and global actions. For deep product areas use the Side Navigation; for a trail within a page use Breadcrumbs.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 420 }}>
            <nav className={s.otnav} style={{ pointerEvents: "none" }}>
              <span className={s.otnavBrand}><Logo size={20} withWordmark={false} /> Optimistic</span>
              <div className={s.otnavLinks}><span className={`${s.otnavLink} ${s.otnavOn}`}>Overview</span><span className={s.otnavLink}>Projects</span></div>
              <div className={s.otnavRight}><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New</button><span className={`${s.oavatar} ${s.avSm} ${s.avBlue}`}>AL</span></div>
            </nav>
            <span className={s.anaMark} style={{ left: "8%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "38%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "92%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Brand</span><span className={s.anaDesc}>Logo lockup, a link home.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Links</span><span className={s.anaDesc}>Sections; active carries a warm underline.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Actions</span><span className={s.anaDesc}>CTA and account, right-aligned.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}>{bar(<><span className={s.otnavBrand}><Logo size={18} withWordmark={false} /></span><div className={s.otnavLinks}><span className={`${s.otnavLink} ${s.otnavOn}`}>Home</span><span className={s.otnavLink}>Docs</span></div></>)}</div><p className={s.ddText}>Keep the link set short — the top areas people switch between.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}>{bar(<div className={s.otnavLinks}>{["Home","Docs","Pricing","Blog","API","Status","Careers"].map(x=><span key={x} className={s.otnavLink} style={{ padding: "6px 8px", fontSize: "0.78rem" }}>{x}</span>)}</div>)}</div><p className={s.ddText}>Don&apos;t cram every page up here. Deep areas belong in a side rail.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}>{bar(<div className={s.otnavRight}><span className={s.otnavSearch}>Search ⌘K</span><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New</button></div>)}</div><p className={s.ddText}>One warm CTA on the right, beside search and account.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}>{bar(<div className={s.otnavRight}><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New</button><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Import</button><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Share</button></div>)}</div><p className={s.ddText}>Don&apos;t line up three warm buttons. One primary action, max.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Product</div><div className={s.ctxStage}>{bar(<><span className={s.otnavBrand}><Logo size={18} withWordmark={false} /></span><div className={s.otnavLinks}><span className={`${s.otnavLink} ${s.otnavOn}`}>App</span></div><div className={s.otnavRight}><span className={`${s.oavatar} ${s.avSm} ${s.avGreen}`}>GH</span></div></>)}</div><p className={s.ctxCaption}>A product bar with app sections and account.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Marketing</div><div className={s.ctxStage}>{bar(<><span className={s.otnavBrand}><Logo size={18} withWordmark={false} /></span><div className={s.otnavRight}><span className={s.otnavLink}>Pricing</span><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Sign up</button></div></>)}</div><p className={s.ctxCaption}>A marketing header with a single sign-up CTA.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Minimal</div><div className={s.ctxStage}>{bar(<><span className={s.otnavBrand}><Logo size={18} withWordmark={false} /> Optimistic</span><div className={s.otnavRight}><span className={`${s.oavatar} ${s.avSm} ${s.avWarm}`}>AL</span></div></>)}</div><p className={s.ctxCaption}>Brand plus account only, for focused apps.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--tnav-h</td><td>56px</td><td>Bar height</td></tr>
          <tr><td className={s.tokName}>--tnav-bg</td><td><span className={s.tokSwatch} style={{ background: "#0c0d10" }} />#0C0D10</td><td>Bar surface</td></tr>
          <tr><td className={s.tokName}>--tnav-active</td><td>2px #FF7A00</td><td>Active-link underline</td></tr>
          <tr><td className={s.tokName}>--tnav-link</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Idle link colour</td></tr>
          <tr><td className={s.tokName}>--tnav-search</td><td>32px · #101114</td><td>⌘K search field</td></tr>
          <tr><td className={s.tokName}>--tnav-gap</td><td>18px</td><td>Region spacing</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
