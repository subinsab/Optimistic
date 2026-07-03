import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../_components/Reveal";
import styles from "./components.module.css";

export const metadata: Metadata = {
  title: "Components — Optimistic",
  description:
    "The Optimistic component library: foundations and 50+ accessible components, each with tokens, anatomy, motion, and production code for React and Angular.",
};

type Item = { name: string; slug: string };
type Group = { title: string; blurb: string; items: Item[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const items = (...names: string[]): Item[] =>
  names.map((name) => ({ name, slug: slug(name) }));

const GROUPS: Group[] = [
  {
    title: "Foundations",
    blurb: "The tokens and primitives everything else is built on.",
    items: items(
      "Color", "Typography", "Spacing", "Radius", "Elevation",
      "Grid", "Breakpoints", "Icon", "Logo", "Illustration"
    ),
  },
  {
    title: "Actions",
    blurb: "Trigger, confirm, and navigate.",
    items: items("Button", "Split Button", "FAB", "Link", "Icon Button"),
  },
  {
    title: "Inputs & Forms",
    blurb: "Capture and validate user input.",
    items: items(
      "Input", "Textarea", "Dropdown", "Combobox", "Checkbox", "Radio",
      "Toggle", "Slider", "Choicebox", "PIN Input", "Date Picker",
      "Time Picker", "Upload", "Form Layout", "Search"
    ),
  },
  {
    title: "Navigation",
    blurb: "Move through the product with confidence.",
    items: items(
      "Tabs", "Breadcrumbs", "Pagination", "Stepper", "Sidebar",
      "Side Menu", "Top Nav", "Menu", "Command Menu"
    ),
  },
  {
    title: "Data Display",
    blurb: "Present content and structure clearly.",
    items: items(
      "Table", "List", "Accordion", "Avatar", "Badge", "Tags", "Pills",
      "Divider", "Indicator", "Code Block", "Keyboard Input", "Tooltip"
    ),
  },
  {
    title: "Feedback",
    blurb: "Tell users what's happening.",
    items: items(
      "Snackbar", "Notification", "Progress", "Skeleton", "Loader",
      "Empty State", "Callout"
    ),
  },
  {
    title: "Overlays",
    blurb: "Layer content above the page.",
    items: items("Modal", "Drawer", "Bottom Sheet", "Popover", "Filter"),
  },
  {
    title: "Patterns",
    blurb: "Composed experiences built from the primitives.",
    items: items("Chat Interface", "Auth Flow", "Dashboard"),
  },
];

const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function ComponentsPage() {
  return (
    <main className="page-shell">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The library · {total} entries</span>
            <h1 className="page-title">
              Components, <span className="gradient-text">documented in depth.</span>
            </h1>
            <p className="page-lead">
              Every component ships with sizing, spacing, anatomy, tokens,
              motion, do&apos;s &amp; don&apos;ts, live demos, and downloadable
              code for React and Angular.
            </p>
          </Reveal>
        </div>
      </header>

      {GROUPS.map((group, gi) => (
        <section key={group.title} className="content-section" style={{ paddingBlock: "var(--sp-12)" }}>
          <div className="container">
            <Reveal>
              <div className={styles.groupHead}>
                <h2 className="h2">{group.title}</h2>
                <span className={styles.groupCount}>{group.items.length}</span>
              </div>
              <p className={styles.groupBlurb}>{group.blurb}</p>
            </Reveal>
            <div className={styles.tileGrid}>
              {group.items.map((item, i) => (
                <Reveal key={item.slug} delay={Math.min(i * 30, 240)}>
                  <Link href={`/components/${item.slug}`} className={styles.tile}>
                    <span className={styles.tileSwatch} aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                    <span className={styles.tileName}>{item.name}</span>
                    <span className={styles.tileArrow}>→</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
          {gi < GROUPS.length - 1 && <div className={styles.sep} />}
        </section>
      ))}
    </main>
  );
}
