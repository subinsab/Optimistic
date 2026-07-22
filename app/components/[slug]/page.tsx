import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "../../_components/Reveal";
import { ALL_ENTRIES, findEntry } from "../_data/registry";
import ButtonDemo from "./ButtonDemo";
import ButtonConfigurator from "./ButtonConfigurator";
import BehaviorDemos from "./BehaviorDemos";
import ClaudeBuild from "./ClaudeBuild";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import InputDoc from "./InputDoc";
import ToggleDoc from "./ToggleDoc";
import CheckboxDoc from "./CheckboxDoc";
import RadioDoc from "./RadioDoc";
import BadgeDoc from "./BadgeDoc";
import TagsDoc from "./TagsDoc";
import CalloutDoc from "./CalloutDoc";
import TabsDoc from "./TabsDoc";
import PaginationDoc from "./PaginationDoc";
import LinkDoc from "./LinkDoc";
import SplitButtonDoc from "./SplitButtonDoc";
import TextareaDoc from "./TextareaDoc";
import ChoiceboxDoc from "./ChoiceboxDoc";
import DropdownDoc from "./DropdownDoc";
import ComboboxDoc from "./ComboboxDoc";
import SearchDoc from "./SearchDoc";
import SliderDoc from "./SliderDoc";
import PinInputDoc from "./PinInputDoc";
import UploadDoc from "./UploadDoc";
import ListDoc from "./ListDoc";
import PillsDoc from "./PillsDoc";
import IndicatorDoc from "./IndicatorDoc";
import AvatarDoc from "./AvatarDoc";
import LogoDoc from "./LogoDoc";
import SnackbarDoc from "./SnackbarDoc";
import LoaderDoc from "./LoaderDoc";
import ProgressDoc from "./ProgressDoc";
import StepperDoc from "./StepperDoc";
import BreadcrumbsDoc from "./BreadcrumbsDoc";
import SkeletonDoc from "./SkeletonDoc";
import EmptyStateDoc from "./EmptyStateDoc";
import AccordionDoc from "./AccordionDoc";
import DividerDoc from "./DividerDoc";
import MenuDoc from "./MenuDoc";
import SideNavDoc from "./SideNavDoc";
import TopNavDoc from "./TopNavDoc";
import CommandMenuDoc from "./CommandMenuDoc";
import KeyboardInputDoc from "./KeyboardInputDoc";
import FabDoc from "./FabDoc";
import ModalDoc from "./ModalDoc";
import DrawerDoc from "./DrawerDoc";
import PopoverDoc from "./PopoverDoc";
import TooltipDoc from "./TooltipDoc";
import BottomSheetDoc from "./BottomSheetDoc";
import DatePickerDoc from "./DatePickerDoc";
import TimePickerDoc from "./TimePickerDoc";
import FilterDoc from "./FilterDoc";
import TableDoc from "./TableDoc";
import GridDoc from "./GridDoc";
import CodeBlockDoc from "./CodeBlockDoc";
import IconDoc from "./IconDoc";
import IllustrationDoc from "./IllustrationDoc";
import NotificationDoc from "./NotificationDoc";
import IntroductionDoc from "./IntroductionDoc";
import CardDoc from "./CardDoc";
import ShellLayoutsDoc from "./ShellLayoutsDoc";
import ChartDoc from "./ChartDoc";
import PrinciplesDoc from "./PrinciplesDoc";
import ColorsDoc from "./ColorsDoc";
import TypographyDoc from "./TypographyDoc";
import SpacingDoc from "./SpacingDoc";
import GridSystemDoc from "./GridSystemDoc";
import ElevationDoc from "./ElevationDoc";
import RadiusDoc from "./RadiusDoc";
import BreakpointsDoc from "./BreakpointsDoc";
import { DocsThemeToggle } from "../DocsTheme";
import s from "../docs.module.css";

/* foundation pages have no interactive Live Demo, so they get no theme toggle */
const FOUNDATION_SLUGS = new Set([
  "introduction", "principles", "colors", "typography", "spacing",
  "grid", "elevation", "radius", "breakpoints",
]);

/* these demos are self-contained dark/light showcases with their own in-demo
   theme switcher, so the page-level toggle would be a redundant second control */
const SELF_THEMED_SLUGS = new Set(["card", "chart", "sidemenu-with-navbar"]);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* format an ISO stamp deterministically (pure string parsing, no Date/locale — hydration-safe) */
function fmtUpdated(iso?: string) {
  if (!iso) return null;
  const [date, time = ""] = iso.split("T");
  const [y, m, d] = date.split("-");
  const hm = time.slice(0, 5);
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}${hm ? " · " + hm : ""}`;
}

export function generateStaticParams() {
  return ALL_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return { title: "Components" };
  const url = `/components/${entry.slug}`;
  return {
    title: entry.title,
    description: entry.desc,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: `${entry.title} · Optimistic`, description: entry.desc },
    twitter: { title: `${entry.title} · Optimistic`, description: entry.desc },
  };
}

/* the reference page anatomy, kept 1:1 */
const SECTIONS = ["Live Demo", "Anatomy", "Measurements & Tokens", "Code", "Related Components"];

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const related = ALL_ENTRIES.filter(
    (e) => e.category === entry.category && e.slug !== entry.slug
  ).slice(0, 3);

  const showThemeToggle =
    !FOUNDATION_SLUGS.has(entry.slug) && !SELF_THEMED_SLUGS.has(entry.slug);

  return (
    <div className={s.pageInner}>
      {showThemeToggle && (
        <div className={s.themeSlot}>
          <DocsThemeToggle />
        </div>
      )}
      <Reveal>
        <h1 className={s.title}>{entry.title}</h1>
        <p className={s.lead}>{entry.desc}</p>
        {(entry.version || entry.updated) && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, fontFamily: "var(--font-mono-geist)", fontSize: "0.66rem", letterSpacing: "0.06em", color: "#767b87" }}>
            {entry.version && <span style={{ color: "#9aa0a8" }}>v{entry.version}</span>}
            {entry.version && entry.updated && <span style={{ color: "#3a3c42" }}>·</span>}
            {entry.updated && <span>Updated {fmtUpdated(entry.updated)}</span>}
          </div>
        )}
      </Reveal>

      {entry.slug === "button" ? (
        <ButtonDoc related={related} />
      ) : entry.slug === "input" ? (
        <InputDoc related={related} />
      ) : entry.slug === "toggle" ? (
        <ToggleDoc related={related} />
      ) : entry.slug === "checkbox" ? (
        <CheckboxDoc related={related} />
      ) : entry.slug === "radio" ? (
        <RadioDoc related={related} />
      ) : entry.slug === "badge" ? (
        <BadgeDoc related={related} />
      ) : entry.slug === "tags" ? (
        <TagsDoc related={related} />
      ) : entry.slug === "callout" ? (
        <CalloutDoc related={related} />
      ) : entry.slug === "tabs" ? (
        <TabsDoc related={related} />
      ) : entry.slug === "pagination" ? (
        <PaginationDoc related={related} />
      ) : entry.slug === "link" ? (
        <LinkDoc related={related} />
      ) : entry.slug === "splitbutton" ? (
        <SplitButtonDoc related={related} />
      ) : entry.slug === "textarea" ? (
        <TextareaDoc related={related} />
      ) : entry.slug === "choicebox" ? (
        <ChoiceboxDoc related={related} />
      ) : entry.slug === "dropdown" ? (
        <DropdownDoc related={related} />
      ) : entry.slug === "combobox" ? (
        <ComboboxDoc related={related} />
      ) : entry.slug === "search" ? (
        <SearchDoc related={related} />
      ) : entry.slug === "slider" ? (
        <SliderDoc related={related} />
      ) : entry.slug === "pininput" ? (
        <PinInputDoc related={related} />
      ) : entry.slug === "upload" ? (
        <UploadDoc related={related} />
      ) : entry.slug === "list" ? (
        <ListDoc related={related} />
      ) : entry.slug === "pills" ? (
        <PillsDoc related={related} />
      ) : entry.slug === "indicator" ? (
        <IndicatorDoc related={related} />
      ) : entry.slug === "avatar" ? (
        <AvatarDoc related={related} />
      ) : entry.slug === "logo" ? (
        <LogoDoc related={related} />
      ) : entry.slug === "snackbar" ? (
        <SnackbarDoc related={related} />
      ) : entry.slug === "loader" ? (
        <LoaderDoc related={related} />
      ) : entry.slug === "progress" ? (
        <ProgressDoc related={related} />
      ) : entry.slug === "stepper" ? (
        <StepperDoc related={related} />
      ) : entry.slug === "breadcrumbs" ? (
        <BreadcrumbsDoc related={related} />
      ) : entry.slug === "skeleton" ? (
        <SkeletonDoc related={related} />
      ) : entry.slug === "emptystate" ? (
        <EmptyStateDoc related={related} />
      ) : entry.slug === "accordion" ? (
        <AccordionDoc related={related} />
      ) : entry.slug === "divider" ? (
        <DividerDoc related={related} />
      ) : entry.slug === "menu" ? (
        <MenuDoc related={related} />
      ) : entry.slug === "sidebar" ? (
        <SideNavDoc related={related} />
      ) : entry.slug === "topnav" ? (
        <TopNavDoc related={related} />
      ) : entry.slug === "commandmenu" ? (
        <CommandMenuDoc related={related} />
      ) : entry.slug === "keyboardinput" ? (
        <KeyboardInputDoc related={related} />
      ) : entry.slug === "fab" ? (
        <FabDoc related={related} />
      ) : entry.slug === "modal" ? (
        <ModalDoc related={related} />
      ) : entry.slug === "drawer" ? (
        <DrawerDoc related={related} />
      ) : entry.slug === "popover" ? (
        <PopoverDoc related={related} />
      ) : entry.slug === "tooltip" ? (
        <TooltipDoc related={related} />
      ) : entry.slug === "bottomsheet" ? (
        <BottomSheetDoc related={related} />
      ) : entry.slug === "datepicker" ? (
        <DatePickerDoc related={related} />
      ) : entry.slug === "timepicker" ? (
        <TimePickerDoc related={related} />
      ) : entry.slug === "filter" ? (
        <FilterDoc related={related} />
      ) : entry.slug === "table" ? (
        <TableDoc related={related} />
      ) : entry.slug === "chart" ? (
        <ChartDoc related={related} />
      ) : entry.slug === "gridcomp" ? (
        <GridDoc related={related} />
      ) : entry.slug === "codeblock" ? (
        <CodeBlockDoc related={related} />
      ) : entry.slug === "icon" ? (
        <IconDoc related={related} />
      ) : entry.slug === "illustration" ? (
        <IllustrationDoc related={related} />
      ) : entry.slug === "notification" ? (
        <NotificationDoc related={related} />
      ) : entry.slug === "introduction" ? (
        <IntroductionDoc related={related} />
      ) : entry.slug === "card" ? (
        <CardDoc related={related} />
      ) : entry.slug === "principles" ? (
        <PrinciplesDoc related={related} />
      ) : entry.slug === "colors" ? (
        <ColorsDoc related={related} />
      ) : entry.slug === "typography" ? (
        <TypographyDoc related={related} />
      ) : entry.slug === "spacing" ? (
        <SpacingDoc related={related} />
      ) : entry.slug === "grid" ? (
        <GridSystemDoc related={related} />
      ) : entry.slug === "elevation" ? (
        <ElevationDoc related={related} />
      ) : entry.slug === "radius" ? (
        <RadiusDoc related={related} />
      ) : entry.slug === "breakpoints" ? (
        <BreakpointsDoc related={related} />
      ) : entry.slug === "sidemenu-with-navbar" ? (
        <ShellLayoutsDoc related={related} />
      ) : (
        <Scaffold related={related} />
      )}
    </div>
  );
}

/* ── honest scaffold for pages still being ported ── */
function Scaffold({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      {SECTIONS.slice(0, 4).map((label, i) => (
        <Reveal key={label} delay={i * 60}>
          <section className={s.docSection}>
            <div className={s.secLabel}>{label}</div>
            <div className={s.secBody}>
              <div className={s.scaffold}>
                <span className={s.scaffoldTag}>
                  <i>●</i> SPECIMEN IN ASSEMBLY
                </span>
                <p className={s.scaffoldText}>
                  This page is being ported from the reference system. The
                  structure is already in place; the specimen, tokens and
                  production code land here next. Reconciling honestly beats
                  pretending it shipped.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      ))}
      <RelatedSection related={related} />
    </>
  );
}

/* ── Button: the first fully documented component ── */

const CODE_TABS = [
  {
    label: "HTML",
    code: `<button class="o-btn o-btn--m o-btn--primary">Label</button>

<button class="o-btn o-btn--m o-btn--brand">The one light</button>

<button class="o-btn o-btn--m o-btn--primary is-loading" aria-busy="true">
  <span class="o-btn__spinner"></span> Saving
</button>`,
  },
  {
    label: "CSS",
    code: `.o-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font: 500 0.875rem/1 "Inter", sans-serif;
  border-radius: 8px; border: 1px solid transparent;
  cursor: pointer; transition: transform .15s, background .2s;
}
.o-btn:active { transform: scale(.97); }
.o-btn:disabled { opacity: .38; cursor: not-allowed; }
.o-btn:focus-visible { box-shadow: 0 0 0 3px rgba(255,122,0,.35); }

.o-btn--l { height: 44px; padding: 0 18px; }
.o-btn--m { height: 36px; padding: 0 14px; }
.o-btn--s { height: 28px; padding: 0 11px; border-radius: 6px; }

.o-btn--primary { background: #f4f4f5; color: #121212; }
.o-btn--brand   { background: #ff7a00; color: #1a0e04; }
.o-btn--ghost   { background: none; color: #e7e9ee; border-color: #333336; }

.o-btn__spinner {
  width: 13px; height: 13px; border-radius: 50%;
  border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
  border-top-color: currentColor;
  animation: o-spin .7s linear infinite;
}
@keyframes o-spin { to { transform: rotate(360deg); } }`,
  },
  {
    label: "React",
    code: `import { Button } from "@optimistic/ui";

<Button size="m" variant="primary">Label</Button>
<Button size="m" variant="brand">The one light</Button>
<Button size="m" variant="gradient">Gradient</Button>
<Button size="m" variant="ghost" icon={<Plus />}>With icon</Button>
<Button size="m" variant="success">Approve</Button>
<Button size="m" variant="error">Delete</Button>
<Button size="m" variant="primary" loading>Saving</Button>`,
  },
  {
    label: "Angular",
    code: `// app.module.ts
import { OptButtonModule } from "@optimistic/angular";

// template
<o-button size="m" variant="primary">Label</o-button>
<o-button size="m" variant="brand">The one light</o-button>
<o-button size="m" variant="ghost" icon="plus">With icon</o-button>
<o-button size="m" variant="error" (pressed)="remove()">Delete</o-button>
<o-button size="m" variant="primary" [loading]="saving">Saving</o-button>`,
  },
  {
    label: "Async / API",
    code: `// The button as an async contract: an async onClick auto-enters
// loading, guards double submit, and rolls back on failure.

function FavoriteButton({ id }) {
  const [on, setOn] = useState(false);
  const busy = useRef(false);

  async function toggle() {
    if (busy.current) return;          // double-submit guard
    busy.current = true;
    const next = !on;
    setOn(next);                       // optimistic: render success first

    try {
      const res = await fetch(\`/api/items/\${id}/favorite\`, {
        method: next ? "POST" : "DELETE",
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      if (!res.ok) throw new Error(res.status);
    } catch (err) {
      setOn(!next);                    // reconcile honestly: roll back
      toast.error("Could not save. Try again.");
    } finally {
      busy.current = false;
    }
  }

  return (
    <Button variant={on ? "brand" : "ghost"} onClick={toggle} aria-pressed={on}>
      {on ? "Favorited" : "Favorite"}
    </Button>
  );
}

// A cancellable GET: never let a stale response overwrite fresh state.
useEffect(() => {
  const ctrl = new AbortController();
  fetch("/api/clients", { signal: ctrl.signal })
    .then((r) => r.json())
    .then(setClients)
    .catch((e) => e.name !== "AbortError" && setError(e));
  return () => ctrl.abort();
}, []);`,
  },
];

function ButtonDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      {/* resources: the builder */}
      <Reveal delay={80}>
        <div className={s.resRow}>
          <ClaudeBuild />
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}>
            <ButtonDemo />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}>
            <ButtonConfigurator />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <div className={s.subLabel}>Props</div>
            <table className={s.tokTable}>
              <thead>
                <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td className={s.tokName}>variant</td><td>primary · brand · gradient · ghost · quiet · success · error · info</td><td>primary</td><td>Visual and semantic role</td></tr>
                <tr><td className={s.tokName}>size</td><td>l · m · s</td><td>m</td><td>44 / 36 / 28px</td></tr>
                <tr><td className={s.tokName}>label</td><td>string</td><td>—</td><td>Text content; one line, no wrap</td></tr>
                <tr><td className={s.tokName}>icon</td><td>ReactNode</td><td>—</td><td>Optional leading glyph</td></tr>
                <tr><td className={s.tokName}>type</td><td>button · submit · reset</td><td>button</td><td>Form semantics</td></tr>
                <tr><td className={s.tokName}>href</td><td>string</td><td>—</td><td>Renders an anchor with the button skin</td></tr>
                <tr><td className={s.tokName}>disabled</td><td>boolean</td><td>false</td><td>Blocks interaction, drops opacity to 0.38</td></tr>
                <tr><td className={s.tokName}>loading</td><td>boolean</td><td>false</td><td>Shows the spinner, sets aria-busy, locks the button</td></tr>
                <tr><td className={s.tokName}>fullWidth</td><td>boolean</td><td>false</td><td>Stretches to the container</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead>
                <tr><th>Event</th><th>Payload</th><th>Fires when</th></tr>
              </thead>
              <tbody>
                <tr><td className={s.tokName}>onClick</td><td>MouseEvent</td><td>Pointer press, or Enter / Space when focused</td></tr>
                <tr><td className={s.tokName}>onFocus / onBlur</td><td>FocusEvent</td><td>Keyboard or pointer focus enters / leaves</td></tr>
                <tr><td className={s.tokName}>async onClick</td><td>Promise</td><td>Auto-enters loading; ignored while a call is in flight</td></tr>
                <tr><td className={s.tokName}>Enter / Space</td><td>—</td><td>Native activation; no custom key handler needed</td></tr>
                <tr><td className={s.tokName}>Tab</td><td>—</td><td>Moves focus; disabled buttons are skipped</td></tr>
              </tbody>
            </table>

            <div className={s.subLabel}>Live behavior — every demo is real</div>
            <BehaviorDemos />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.specimenWrap}>
                  {/* highlight shapes on each part */}
                  <span className={s.anaFocusRing} aria-hidden="true" />
                  <button className={`${s.obtn} ${s.l} ${s.vPrimary}`} type="button">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    Label
                  </button>
                  <span className={`${s.anaHi} ${s.anaHiContainer}`} aria-hidden="true" />
                  <span className={`${s.anaHi} ${s.anaHiIcon}`} aria-hidden="true" />
                  <span className={`${s.anaHi} ${s.anaHiLabel}`} aria-hidden="true" />
                  {/* badges staggered (alternating heights) so they don't sit
                      on one line; each connector height reaches its part */}
                  <span className={s.anaMark} style={{ left: "2%", top: -42 }} aria-hidden="true">
                    <b className={s.anaBadge}>1</b>
                    <i className={s.anaConn} style={{ height: 20 }} />
                  </span>
                  <span className={s.anaMark} style={{ left: "26%", top: -60 }} aria-hidden="true">
                    <b className={s.anaBadge}>2</b>
                    <i className={s.anaConn} style={{ height: 47 }} />
                  </span>
                  <span className={s.anaMark} style={{ left: "64%", top: -42 }} aria-hidden="true">
                    <b className={s.anaBadge}>3</b>
                    <i className={s.anaConn} style={{ height: 29 }} />
                  </span>
                  <span className={s.anaMark} style={{ left: "97%", top: -60 }} aria-hidden="true">
                    <b className={s.anaBadge}>4</b>
                    <i className={s.anaConn} style={{ height: 30 }} />
                  </span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>1</span>
                  <span className={s.anaName}>Container</span>
                  <span className={s.anaDesc}>Fixed height per size, radius 8, holds everything with 0 vertical padding.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>2</span>
                  <span className={s.anaName}>Leading icon</span>
                  <span className={s.anaDesc}>Optional, 14px at L, 8px gap to the label. Never two icons.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>3</span>
                  <span className={s.anaName}>Label</span>
                  <span className={s.anaDesc}>Inter 500, sentence case, one line, no wrapping ever.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>4</span>
                  <span className={s.anaName}>Focus ring</span>
                  <span className={s.anaDesc}>3px warm ring at 35 percent, on focus-visible only.</span>
                </div>
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
                  <button className={`${s.obtn} ${s.m} ${s.vGhost}`}>Cancel</button>
                  <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>Ship it</button>
                </div>
                <p className={s.ddText}>One warm action per view. Everything else steps back so the one light can point forward.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>Save</button>
                  <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>Publish</button>
                  <button className={`${s.obtn} ${s.m} ${s.vGradient}`}>Upgrade</button>
                </div>
                <p className={s.ddText}>Three warm buttons is zero warm buttons. Competing accents cancel each other out.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}>Save changes</button>
                </div>
                <p className={s.ddText}>Short, sentence-case verb phrases. The label says what happens, in one line.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}>CLICK HERE TO SAVE YOUR CHANGES NOW!</button>
                </div>
                <p className={s.ddText}>No shouting, no &quot;click here&quot;, no punctuation theatrics. The button is not the copywriter.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <button className={`${s.obtn} ${s.m} ${s.vError}`}>Delete project</button>
                  <button className={`${s.obtn} ${s.m} ${s.vGhost}`}>Keep it</button>
                </div>
                <p className={s.ddText}>Destructive actions wear error red and sit beside an escape hatch.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>Delete everything</button>
                </div>
                <p className={s.ddText}>Never dress a destructive action in the brand accent. Warm means forward, not gone.</p>
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
                <div className={s.ctxKicker}>A · In a page</div>
                <div className={s.ctxStage}>
                  <div className={s.mockPage}>
                    <div className={s.mockBar}>
                      <span className={s.mockTitle} />
                      <button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New project</button>
                    </div>
                    <span className={s.mockLine} style={{ width: "92%" }} />
                    <span className={s.mockLine} style={{ width: "78%" }} />
                    <span className={s.mockLine} style={{ width: "84%" }} />
                  </div>
                </div>
                <p className={s.ctxCaption}>Page-level primary sits top right, size M or L, warm if it is the page&apos;s one action.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · In a modal</div>
                <div className={s.ctxStage}>
                  <div className={s.mockModal}>
                    <span className={s.mockTitle} style={{ width: "56%" }} />
                    <span className={s.mockLine} style={{ width: "94%" }} />
                    <span className={s.mockLine} style={{ width: "70%" }} />
                    <div className={s.mockFoot}>
                      <button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</button>
                      <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Confirm</button>
                    </div>
                  </div>
                </div>
                <p className={s.ctxCaption}>Modal footer: ghost escape on the left, filled confirmation on the right. Size S or M.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · In a menu</div>
                <div className={s.ctxStage}>
                  <div className={s.mockMenu}>
                    <button className={`${s.obtn} ${s.sm} ${s.vQuiet}`}>Rename</button>
                    <button className={`${s.obtn} ${s.sm} ${s.vQuiet}`}>Duplicate</button>
                    <button className={`${s.obtn} ${s.sm} ${s.vQuiet}`}>Move to…</button>
                    <div className={s.mockMenuDiv} />
                    <button className={`${s.obtn} ${s.sm} ${s.vQuiet} ${s.mockDanger}`}>Delete</button>
                  </div>
                </div>
                <p className={s.ctxCaption}>Menu items are quiet buttons, size S, full width. Destructive rows speak error red.</p>
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
              <thead>
                <tr><th>Token</th><th>Value</th><th>Role</th></tr>
              </thead>
              <tbody>
                <tr><td className={s.tokName}>--btn-height-l</td><td>44px</td><td>Large: hero and page-level actions</td></tr>
                <tr><td className={s.tokName}>--btn-height-m</td><td>36px</td><td>Medium: the default everywhere</td></tr>
                <tr><td className={s.tokName}>--btn-height-s</td><td>28px</td><td>Small: dense surfaces, table rows, menus</td></tr>
                <tr><td className={s.tokName}>--btn-radius</td><td>8px</td><td>6px at size S</td></tr>
                <tr><td className={s.tokName}>--btn-gap</td><td>8px</td><td>Icon to label</td></tr>
                <tr><td className={s.tokName}>--btn-bg-primary</td><td><span className={s.tokSwatch} style={{ background: "#f4f4f5" }} />#F4F4F5</td><td>Primary surface, #121212 text</td></tr>
                <tr><td className={s.tokName}>--btn-bg-brand</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>The one light. One per view, maximum</td></tr>
                <tr><td className={s.tokName}>--btn-bg-gradient</td><td><span className={s.tokSwatch} style={{ background: "linear-gradient(115deg,#ffb020,#ff5e00)" }} />#FFB020→#FF5E00</td><td>Hero moments; counts as the warm action</td></tr>
                <tr><td className={s.tokName}>--btn-bg-success</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Positive confirmations · white label</td></tr>
                <tr><td className={s.tokName}>--btn-bg-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Destructive actions · white label</td></tr>
                <tr><td className={s.tokName}>--btn-bg-info</td><td><span className={s.tokSwatch} style={{ background: "#3e63dd" }} />#3E63DD</td><td>Neutral-informational · white label, 5.21:1</td></tr>
                <tr><td className={s.tokName}>--btn-border-ghost</td><td><span className={s.tokSwatch} style={{ background: "#333336" }} />#333336</td><td>Ghost outline on dark surfaces</td></tr>
                <tr><td className={s.tokName}>--btn-spinner</td><td>13px · 0.7s</td><td>Loading ring in currentColor, width stays stable</td></tr>
                <tr><td className={s.tokName}>--btn-focus</td><td>rgba(255,122,0,.35)</td><td>3px focus-visible ring</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Code</div>
          <div className={s.secBody}>
            <CodeTabs tabs={CODE_TABS} />
          </div>
        </section>
      </Reveal>

      <RelatedSection related={related} />
    </>
  );
}

