import Link from "next/link";
import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const REPO = "https://github.com/subinsab/Optimistic";
const linkStyle = { color: "#5b8cff", textDecoration: "underline", textUnderlineOffset: 2, fontWeight: 500 } as const;

/* system requirements */
const REQ: [string, string][] = [
  ["Operating system", "macOS 12+, Windows 10+, or a modern Linux"],
  ["Node.js", "18.18 or newer (20 LTS recommended)"],
  ["Package manager", "npm 9+ (bundled with Node), or pnpm / yarn"],
  ["Git", "2.30 or newer"],
  ["Editor", "VS Code recommended, or any editor you like"],
  ["Disk space", "about 600 MB for dependencies"],
];

/* what to download before you start */
const DOWNLOADS: [string, string, string, string][] = [
  ["Node.js", "Runs the dev server, the production build and the component installer. Get the LTS build.", "https://nodejs.org/en/download", "Download Node.js"],
  ["Git", "Clones the repository and tracks the changes you make.", "https://git-scm.com/downloads", "Download Git"],
  ["VS Code", "The recommended editor. Pairs with the ESLint and Claude Code extensions.", "https://code.visualstudio.com/download", "Download VS Code"],
  ["Claude", "Build with the AI workflow this system was made for: the desktop app and the Claude Code CLI.", "https://claude.ai/download", "Download Claude"],
];

/* run the docs site + kit locally */
const LOCAL: [string, string, string, string][] = [
  ["01", "Clone the repository", "Pull the whole design system: tokens, the docs site and the component kit.", `git clone ${REPO}.git`],
  ["02", "Install dependencies", "Move into the folder and install. The first run takes a minute.", "cd Optimistic\nnpm install"],
  ["03", "Start the dev server", "This also regenerates the token CSS, then serves the docs. Open the printed URL.", "npm run dev\n# ready on http://localhost:3000"],
  ["04", "Build for production", "Regenerates tokens and builds the static docs site.", "npm run build\nnpm start"],
];

/* add the kit to your own app */
const KIT: [string, string, string, string][] = [
  ["01", "Open the kit", "The installer lives inside the repo you just cloned.", "cd Optimistic/optimistic-ui"],
  ["02", "Copy components into your app", "Pull the tokens plus the components you want into a folder you own. Run with --list to see them all.", "node install.mjs button notification --dir src/ui"],
  ["03", "Import the tokens once", "Add this to your global stylesheet. It defines every CSS variable the foundations below use.", "/* global.css */\n@import \"./ui/tokens.css\";"],
  ["04", "Use a component", "It is plain React and CSS with no build magic. Edit it freely, it is your code now.", "import { Button } from \"./ui/components/button/button\";\n\n<Button variant=\"warm\">Ship it</Button>"],
];

/* how to use each foundation, with the real CSS variables */
const FOUNDATIONS: { name: string; slug: string; how: string; head: string; code: string }[] = [
  { name: "Colours", slug: "colors", how: "Never hard-code a hex. Reach for a role variable (surface, text, border), or a core ramp step for a specific tone. Change a token once and it moves everywhere.", head: "css", code: ".card {\n  background: var(--bg-panel);\n  color: var(--text-primary);\n  border: 1px solid var(--border-default);\n}\n.card__cta { background: var(--color-brand-500); }" },
  { name: "Typography", slug: "typography", how: "Each text style is one font shorthand plus its tracking. Body 1 (16px) is the default reading size, Header 1 to 5 for titles.", head: "css", code: ".title { font: var(--type-header-1); letter-spacing: var(--type-header-1-tracking); }\n.copy  { font: var(--type-body-1);   letter-spacing: var(--type-body-1-tracking); }" },
  { name: "Spacing", slug: "spacing", how: "Every gap, pad and margin is a step on the 4px scale. Reach for a token, never a raw pixel.", head: "css", code: ".panel { padding: var(--space-300); }        /* 24px */\n.row   { display: flex; gap: var(--space-100); } /* 8px  */" },
  { name: "Grid", slug: "grid", how: "A responsive grid: 4 columns on mobile, 8 on tablet, 12 on web, inside a 1320px container. Set how many columns each cell spans per breakpoint with --m (mobile), --t (tablet), --d (desktop).", head: "html", code: "<div class=\"o-container\">\n  <div class=\"o-row\">\n    <div class=\"o-col\" style=\"--m:4; --t:8; --d:8\">Main</div>\n    <div class=\"o-col\" style=\"--m:4; --t:8; --d:4\">Aside</div>\n  </div>\n</div>" },
  { name: "Border radius", slug: "radius", how: "Sharp panels, gently rounded controls, pills for chips. One token per role.", head: "css", code: ".button { border-radius: var(--radius-md); }   /* 6px  */\n.card   { border-radius: var(--radius-xl); }   /* 12px */\n.chip   { border-radius: var(--radius-full); }" },
  { name: "Elevation", slug: "elevation", how: "On a dark field, structure comes from a 1px hairline first. Reach for a shadow only when depth carries meaning.", head: "css", code: ".divider { border-top: 1px solid var(--border-default); }\n.popover { box-shadow: 0 8px 24px rgba(0, 0, 0, .42); }" },
  { name: "Breakpoints", slug: "breakpoints", how: "Layouts reflow at fixed widths. Design mobile-first, then add columns as space allows.", head: "css", code: "/* mobile-first: 768px tablet, 1024px web */\n.grid { grid-template-columns: 1fr; }\n@media (min-width: 768px)  { .grid { grid-template-columns: repeat(2, 1fr); } }\n@media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); } }" },
];

const LAYERS: [string, React.ReactNode][] = [
  ["Decision", <>Every choice starts life as a <b>Figma Variable</b>, one source of truth, named for its role, not its value.</>],
  ["Token", <>A generator turns each variable into a <b>CSS custom property</b>: <code>--color-brand-500</code>, <code>--space-300</code>, <code>--type-body-1</code>.</>],
  ["Component", <>Tokens compose into <b>components</b>, a Button, an Input, a Notification, that read <code>var(--token)</code> and never hard-code a value.</>],
  ["Product", <>Components compose into <b>products</b>. Trace any pixel on screen and it ends at a Variable.</>],
];

const RULES: [string, string][] = [
  ["One warm pixel", "The field is monochrome so a single #FF7A00 element can carry all the attention. Never spend it twice in one view."],
  ["The hairline is #1E1E1E", "Structure comes from one-pixel lines and spacing, not from boxes, shadows or heavier borders."],
  ["Honesty over optimism", "Render success first, but roll back plainly when the server disagrees. The interface never lies to keep a promise."],
  ["Tokens, not values", "If you are typing a hex or a pixel into a component, stop. The value belongs in a token so it can move everywhere at once."],
];

function Steps({ items, head }: { items: [string, string, string, string][]; head: (i: number) => string }) {
  return (
    <div>
      {items.map(([n, title, desc, code], i) => (
        <div key={n} style={{ marginBottom: 22 }}>
          <div className={s.fnLayer}>
            <span className={s.fnLayerBadge} style={{ width: "auto" }}>{n}</span>
            <span className={s.fnLayerText}><b style={{ color: "#e7e9ee" }}>{title}.</b> {desc}</span>
          </div>
          <div className={s.codeBlock} style={{ marginTop: 10 }}>
            <div className={s.codeHead}><span>{head(i)}</span></div>
            <pre>{code}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PrinciplesDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Everything is in the name</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>Optimistic is named for the <strong style={{ color: "#e7e9ee" }}>optimistic update</strong>, the pattern where an interface shows the result of an action the instant you take it, then quietly reconciles with the server. The design system is built in that same spirit: fast, confident, and honest when reality disagrees. Read the <Link href="/philosophy" className={s.crumbLink} style={linkStyle}>philosophy</Link> for the long version, or start below. Everything lives in one repository: <a href={REPO} target="_blank" rel="noopener noreferrer" style={linkStyle}>github.com/subinsab/Optimistic</a>.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>System requirements</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>The stack is Next.js and React, so anything that runs a modern Node app runs this. Confirm two things first: <code style={{ color: "#ffb37a" }}>node -v</code> and <code style={{ color: "#ffb37a" }}>git --version</code>.</p>
        <table className={s.tokTable}><thead><tr><th>Requirement</th><th>Minimum</th></tr></thead><tbody>
          {REQ.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>What you will need</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>Four free tools. Install Node and Git to run the project; VS Code and Claude are how you will work in it.</p>
        <div className={s.fnCards}>{DOWNLOADS.map(([name, purpose, href, cta]) => (
          <div key={name} className={s.fnCard} style={{ display: "flex", flexDirection: "column" }}>
            <div className={s.fnCardTitle} style={{ marginTop: 0 }}>{name}</div>
            <p className={s.fnCardText} style={{ marginBottom: 14 }}>{purpose}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, marginTop: "auto" }}>{cta} ↗</a>
          </div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Install and run locally</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 20 }}>Four steps to get the documentation site and the full component source running on your machine.</p>
        <Steps items={LOCAL} head={() => "terminal"} />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Add Optimistic UI to your app</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 20 }}>The kit is shadcn-style: instead of a locked npm package, an installer copies the tokens and the components you pick straight into your project, so you own and can reshape every file.</p>
        <Steps items={KIT} head={(i) => ["terminal", "terminal", "css", "tsx"][i]} />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Using the foundations</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660, marginBottom: 22 }}>Once the tokens are imported, every foundation is a set of CSS variables you consume with <code style={{ color: "#ffb37a" }}>var(--token)</code>. Nothing is hard-coded, so a change at the token layer flows to every component at once. Here is how to use each one.</p>
        {FOUNDATIONS.map((f) => (
          <div key={f.slug} style={{ marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
              <span style={{ color: "#e7e9ee", fontWeight: 600, fontSize: "0.95rem" }}>{f.name}</span>
              <Link href={`/components/${f.slug}`} style={linkStyle}>Open the {f.name} page ↗</Link>
            </div>
            <p className={s.fnSwatchRole} style={{ maxWidth: 660, marginBottom: 10 }}>{f.how}</p>
            <div className={s.codeBlock}><div className={s.codeHead}><span>{f.head}</span></div><pre>{f.code}</pre></div>
          </div>
        ))}
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>How it fits together</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>The system is atomic. A decision becomes a token, tokens form components, components form products, one unbroken line from Figma to shipped software.</p>
        <div>{LAYERS.map(([k, t]) => (
          <div key={k} className={s.fnLayer}><span className={s.fnLayerBadge}>{k}</span><span className={s.fnLayerText}>{t}</span></div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The rules that keep it coherent</div><div className={s.secBody}>
        <div className={s.fnCards}>{RULES.map(([t, d]) => (
          <div key={t} className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>{t}</div><p className={s.fnCardText}>{d}</p></div>
        ))}</div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
