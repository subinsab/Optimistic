import Reveal from "./_components/Reveal";
import ScrollRevealText from "./_components/ScrollRevealText";
import CityBackground from "./_components/CityBackground";
import {
  IcoTrust,
  IcoReuse,
  IcoAlign,
  IcoLanguage,
} from "./_components/IsoIcons";
import ShipField from "./_components/ShipField";
import DeferMount from "./_components/DeferMount";
import DotField from "./_components/DotField";
import WorkflowTimeline from "./_components/WorkflowTimeline";
import SandboxStack from "./_components/SandboxStack";
import DesignSystemCanvas from "./_components/DesignSystemCanvas";
import StatsDashboard from "./_components/StatsDashboard";
import TokenGraph from "./_components/TokenGraph";
import ParticleCloud from "./_components/ParticleCloud";
import FaqSection from "./_components/FaqSection";
import { getPublishedArticles, PLACEHOLDER } from "./_data/articles";
import CoverArt, { fmtDate } from "./_components/CoverArt";
import DotWordmark from "./_components/DotWordmark";
import OptimisticHeart from "./_components/OptimisticHeart";
import CtaButton from "./_components/CtaButton";
import s from "./home.module.css";

export default async function Home() {
  const published = await getPublishedArticles();
  const featured = published[0] ?? PLACEHOLDER;
  const secondary = [published[1] ?? PLACEHOLDER, published[2] ?? PLACEHOLDER];

  return (
    <main className={s.home}>
      {/* ════════ SECTION A — full-screen monochrome architectural city ════════ */}
      <section className={s.cityFull}>
        <div className={s.cityGrid} aria-hidden="true" />
        <div className={s.scene}>
          <CityBackground />
        </div>
        <div className={s.cityVignette} aria-hidden="true" />
        <div className={s.cityGrain} aria-hidden="true" />

        <div className={s.cityOverlay}>
          <Reveal className={s.eyebrow}>
            <span className={s.eyebrowHatch} /> WHAT DOES OPTIMISM LOOK LIKE, BUILT?
          </Reveal>
          <Reveal delay={120}>
            <h1 className={s.cityTitle}>
              Build interfaces,
              <br />
              <span className={s.citySub}>optimistically.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className={s.cityLead}>
              Design once, ship everywhere. A headless, atomic design system
              at home in every stack, fluent in AI.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className={s.cityTags}>
              <span>Free</span>
              <i className={s.cityTagDot} aria-hidden="true" />
              <span>Open source</span>
              <i className={s.cityTagDot} aria-hidden="true" />
              <span>MIT license</span>
            </div>
          </Reveal>
        </div>

        {/* bottom status bar */}
        <div className={s.engStatus} aria-hidden="true">
          <span className={s.engStatusLabel}>Infrastructure Layer</span>
          <div className={s.engStat}><span className={s.engK}>Tokens</span><span className={s.engV}>8,932</span></div>
          <div className={s.engStat}><span className={s.engK}>Variables</span><span className={s.engV}>2,148</span></div>
          <div className={s.engStat}><span className={s.engK}>Atoms</span><span className={s.engV}>246</span></div>
          <div className={s.engStat}><span className={s.engK}>Sync Status</span><span className={s.engLive}>● LIVE</span></div>
        </div>

      </section>

      {/* ════════ SECTION B — neural-engines statement (scroll reveal) ════════ */}
      <section className={s.sectionB}>
        <div className={s.bGrid} aria-hidden="true" />
        <div className={s.bGrain} aria-hidden="true" />
        <div className={s.bInner}>
          {/* a real like button, quietly running the optimistic update */}
          <OptimisticHeart />
          <h2 className={s.bHeadline}>
            <ScrollRevealText text="Every interface has a moment of faith. The heart fills in before the server answers. Engineers call it an optimistic update. We named the whole system after it: render the finished thing first, let the proof catch up." />
          </h2>
          <p className={s.bSupport}>
            Faith needs a keeper. Ours is a headless core where every decision
            is written once, as a token, and never paraphrased. What a designer
            means is what the code says. Atoms grow into molecules, molecules
            into products, and nothing falls out of step.
          </p>
          <p className={s.bSubtext}>
            Bring any stack. React, Angular or plain HTML, the system plugs in
            the same, and the AI beside you reads it as fluently as your
            engineers do.
          </p>
        </div>
      </section>

      {/* ════════ SECTION C — CAD-blueprint feature grid ════════ */}
      <section className={s.sectionC}>
        <div className={s.cGrain} aria-hidden="true" />
        <div className={s.cRow}>
          {CARDS.map((c) => (
            <article key={c.title} className={s.cCell}>
              <div className={s.cIllo} aria-hidden="true">
                <DotField />
                {c.icon}
              </div>
              <h3 className={s.cTitle}>{c.title}</h3>
              <p className={s.cCopy}>{c.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ════════ SECTION D — "Recently shipped" bento grid ════════ */}
      <section className={s.sectionD}>
        <div className={s.dGrain} aria-hidden="true" />
        <div className={s.dInner}>
          <div className={s.eEyebrow}>
            <span className={s.eHatch} /> LIVE FROM THE PIPELINE
          </div>
          <h2 className={s.dTitle}>The system at work</h2>
          <p className={s.dLead}>
            Nothing here is a mockup. Three windows into the same machine,
            running as you read.
          </p>
          <div className={s.dGrid}>
            <article className={`${s.card} ${s.cardShip}`}>
              <div className={s.cardViz}><DeferMount><ShipField /></DeferMount></div>
              <div className={s.cardOverlay}>
                <div className={s.cardKicker}>Tokens to release</div>
                <div className={s.cardLabel}>
                  Assembly <span className={s.shipBadge}>v3.2</span>
                </div>
                <p className={s.cardSub}>
                  Small decisions finding each other. Tokens become
                  components, components become a release.
                </p>
              </div>
            </article>

            <article className={`${s.card} ${s.cardWf}`}>
              <div className={`${s.cardViz} ${s.cardVizPanel}`}><DeferMount><WorkflowTimeline /></DeferMount></div>
              <div className={s.cardOverlay}>
                <div className={s.cardKicker}>Design to code</div>
                <div className={s.cardLabel}>Pipeline</div>
                <p className={s.cardSub}>
                  One variable changes in design. The rest is automatic:
                  tokens rebuild, code regenerates, the release ships itself.
                </p>
              </div>
            </article>

            <article className={`${s.card} ${s.cardSb}`}>
              <div className={`${s.cardViz} ${s.cardVizPanel}`}><DeferMount><SandboxStack /></DeferMount></div>
              <div className={s.cardOverlay}>
                <div className={s.cardKicker}>Browse and adopt</div>
                <div className={s.cardLabel}>Library</div>
                <p className={s.cardSub}>
                  Everything here is already built and already alive. Open a
                  component, try it, take it home.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ════════ SECTION E — Headless Design System canvas ════════ */}
      <section className={s.sectionE}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.eHead}>
          <div className={s.eEyebrow}>
            <span className={s.eHatch} /> HOW IT WORKS
          </div>
          <h2 className={s.eTitle}>How a decision travels.</h2>
          <p className={s.eLead}>
            Every decision starts life as a Figma Variable. Token Studio
            carries it into the headless core, and from there the structure is
            atomic: tokens form components, components form products. Trace
            any line below and it ends in shipped software.
          </p>
        </div>
        <div className={s.eCanvas}>
          <DesignSystemCanvas />
        </div>
      </section>

      {/* ════════ SECTION F — live product-statistics dashboard ════════ */}
      <section className={s.sectionF}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.fHead}>
          <div className={s.fHeadR}>
            <div className={s.eEyebrow}>
              <span className={s.eHatch} /> LIVE DESIGN SYSTEM ANALYTICS
            </div>
            <h2 className={s.fTitle}>Measure consistency at scale.</h2>
            <p className={s.eLead}>
              Monitor your entire design ecosystem in real time. Track token
              synchronization, Figma Variables, component adoption, accessibility
              coverage, platform readiness, documentation health, and release
              velocity from a single source of truth.
            </p>
          </div>
          <div className={s.fGraph}>
            <TokenGraph />
          </div>
        </div>
        <div className={s.fDash}>
          <StatsDashboard />
        </div>
      </section>

      {/* ════════ SECTION G — case studies / timeline ════════ */}
      <section className={s.sectionG}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.gHead}>
          <div className={s.eEyebrow}>
            <span className={s.eHatch} /> DESIGN SYSTEM JOURNEY
          </div>
          <h2 className={s.gTitle}>
            Building design systems that evolve with products.
          </h2>
          <p className={s.gLead}>
            Explore how our Headless Design System matured over time — from
            establishing foundations and design tokens to scaling across
            products, teams, platforms, and engineering.
          </p>
        </div>
        <div className={s.gTimeline}>
          {TIMELINE.map((r) => (
            <div className={s.gRow} key={`${r.year}-${r.title}`} tabIndex={0} role="link">
              <div className={s.gYear}>
                <div className={s.gYearNum}>//{r.year}</div>
                <div className={s.gProg} aria-hidden="true">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`${s.gSeg} ${i < r.progress ? s.gSegOn : ""}`}
                    />
                  ))}
                </div>
                <div className={s.gPhase}>{r.phase}</div>
              </div>
              <div className={s.gBody}>
                <h3 className={s.gRowTitle}>{r.title}</h3>
                <div className={s.gStat}>
                  <div className={s.gStatNum}>{r.stat}</div>
                  <div className={s.gStatLabel}>{r.statLabel}</div>
                </div>
                <p className={s.gRowDesc}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ SECTION H — split: intelligence cloud + principles ════════ */}
      <section className={s.sectionH}>
        <div className={`${s.eGrain} ${s.hGrain}`} aria-hidden="true" />
        <div className={s.hLeft}>
          <DeferMount><ParticleCloud /></DeferMount>
        </div>
        <div className={s.hRight}>
          <div className={s.eGrain} aria-hidden="true" />
          <div className={s.eEyebrow}>
            <span className={s.eHatch} /> OUR PRINCIPLES
          </div>
          <h2 className={s.hTitle}>Built for design systems that last.</h2>
          <p className={s.hLead}>
            Build once and scale everywhere. Our Headless Design System combines
            Design Tokens, Figma Variables, semantic architecture, reusable
            components, governance, and automation into a foundation that grows
            with every product.
          </p>
          <div className={s.hGrid}>
            {PRINCIPLES.map((p) => (
              <div className={s.hFeat} key={p.title}>
                <span className={s.hIcon} aria-hidden="true">{p.icon}</span>
                <h3 className={s.hFeatTitle}>{p.title}</h3>
                <p className={s.hFeatDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION I — FAQ ════════ */}
      <section className={s.sectionI}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.iInner}>
          <div className={s.iLeft}>
            <div className={s.eEyebrow}>
              <span className={s.eHatch} /> FAQ
            </div>
            <h2 className={s.iTitle}>Frequently asked questions</h2>
            <p className={s.iLead}>
              Everything you need to know about our Headless Design System,
              Design Tokens, Figma Variables, governance, platform support,
              security, and licensing.
            </p>
            <div className={s.btnRow}>
              <CtaButton href="/contact">Contact Us</CtaButton>
            </div>
          </div>
          <div className={s.iRight}>
            <FaqSection />
          </div>
        </div>
      </section>

      {/* ════════ SECTION J — latest insights (blog) ════════ */}
      <section className={s.sectionJ}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.jInner}>
          <div className={s.jHead}>
            <div className={s.eEyebrow}>
              <span className={s.eHatch} /> LATEST INSIGHTS
            </div>
            <h2 className={s.jTitle}>Design System Insights &amp; Engineering</h2>
            <p className={s.jLead}>
              Explore engineering stories, design system best practices, token
              architecture, Figma Variables, governance strategies,
              accessibility, automation, and scaling experiences from real
              product teams.
            </p>
          </div>

          <div className={s.jGrid}>
            {/* featured */}
            <a
              className={s.jFeatured}
              href={featured.placeholder ? undefined : `/blog/${featured.slug}`}
            >
              <div className={s.jCover}>
                <CoverArt seed={featured.seed} cover={featured.cover} className={s.coverImg} />
                <div className={s.jOverlay} aria-hidden="true" />
                <span className={s.jCat}>{featured.category}</span>
                <h3 className={s.jFeatTitle}>{featured.title}</h3>
              </div>
              <div className={s.jMeta}>
                {fmtDate(featured.publishedDate)} · {featured.readingTime}
              </div>
              <p className={s.jExcerpt}>{featured.excerpt}</p>
            </a>

            {/* secondary + cta */}
            <div className={s.jRight}>
              {secondary.map((a, i) => (
                <a
                  key={`${a.slug}-${i}`}
                  className={s.jSec}
                  href={a.placeholder ? undefined : `/blog/${a.slug}`}
                >
                  <div className={s.jThumb}>
                    <CoverArt seed={a.seed + i} cover={a.cover} className={s.coverImg} />
                  </div>
                  <div className={s.jSecBody}>
                    <span className={s.jSecCat}>{a.category}</span>
                    <h4 className={s.jSecTitle}>{a.title}</h4>
                    <div className={s.jSecMeta}>
                      {fmtDate(a.publishedDate)} · {a.readingTime}
                    </div>
                    <span className={s.jSecArrow} aria-hidden="true">→</span>
                  </div>
                </a>
              ))}

              <div className={s.jCta}>
                <p className={s.jCtaText}>
                  Browse tutorials, release notes, engineering articles,
                  accessibility guides, governance patterns, and design system
                  updates.
                </p>
                <CtaButton href="/blog">View All Articles</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION K — "Create Optimism" dot art ════════ */}
      <section className={s.sectionK}>
        <div className={s.eGrain} aria-hidden="true" />
        <div className={s.kEyebrow}>
          <span className={s.eHatch} /> THE OPTIMISTIC DESIGN SYSTEM
        </div>
        <div className={s.kStage}>
          <DeferMount><DotWordmark /></DeferMount>
        </div>
        <p className={s.kCaption}>Build interfaces, optimistically.</p>
      </section>
    </main>
  );
}

/* Section H — principles + CAD wireframe icons */
const PRINCIPLES: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Token First",
    desc: "Every decision begins with semantic design tokens, ensuring consistency across products, brands, and platforms.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 6 40 15 24 24 8 15Z" />
        <path d="M8 15v6l16 9 16-9v-6" />
        <path d="M8 27v6l16 9 16-9v-6" />
      </svg>
    ),
  },
  {
    title: "Headless Architecture",
    desc: "Separate design decisions from implementation using Figma Variables, Token Studio, and platform-agnostic foundations.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M14 10 22 14 14 18 6 14Z" /><path d="M6 14v6l8 4 8-4v-6" />
        <path d="M34 28 42 32 34 36 26 32Z" /><path d="M26 32v6l8 4 8-4v-6" />
        <path d="M19 17 29 30" />
      </svg>
    ),
  },
  {
    title: "Continuous Sync",
    desc: "Automatically synchronize tokens, variables, components, documentation, and production code across your ecosystem.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M13 20a11 11 0 0 1 19-5" /><path d="M32 9v6h-6" />
        <path d="M35 28a11 11 0 0 1-19 5" /><path d="M16 39v-6h6" />
      </svg>
    ),
  },
  {
    title: "Scalable Governance",
    desc: "Version, review, monitor, and evolve your design system with confidence while supporting multiple products and teams.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 6 39 11v12c0 9-7 15-15 19-8-4-15-10-15-19V11Z" />
        <rect x="18" y="19" width="5" height="5" rx="1" /><rect x="25" y="19" width="5" height="5" rx="1" />
        <rect x="18" y="26" width="5" height="5" rx="1" /><rect x="25" y="26" width="5" height="5" rx="1" />
      </svg>
    ),
  },
];

/* Section G — timeline rows */
const TIMELINE: { year: string; title: string; phase: string; progress: number; stat: string; statLabel: string; desc: string }[] = [
  {
    year: "2023",
    title: "Foundation Design System",
    phase: "Foundation",
    progress: 2,
    stat: "24×",
    statLabel: "Tested · all passed",
    desc: "Established the first scalable design foundation — color, typography, spacing, iconography, layout grids, accessibility standards, and reusable UI components across every product.",
  },
  {
    year: "2024",
    title: "Themes",
    phase: "Theming",
    progress: 4,
    stat: "12",
    statLabel: "Themes shipped",
    desc: "Introduced multi-brand theming — light, dark, and brand variants — with mode-aware tokens and runtime theme switching across every surface.",
  },
  {
    year: "2025",
    title: "Headless Design System",
    phase: "Scaling",
    progress: 6,
    stat: "1,284",
    statLabel: "Tokens migrated",
    desc: "Migrated the ecosystem to a Headless Design System powered by Design Tokens, Figma Variables, Token Studio, semantic tokens, and multi-platform code generation.",
  },
  {
    year: "2025",
    title: "Execution & Refinements",
    phase: "Hardening",
    progress: 8,
    stat: "318",
    statLabel: "PRs merged",
    desc: "Hardened the system in production — refining variants, states, accessibility coverage, documentation, and release tooling across 246 components and 9 platforms.",
  },
  {
    year: "2026",
    title: "AI Native Design Platform",
    phase: "AI Native",
    progress: 10,
    stat: "9",
    statLabel: "Platforms automated",
    desc: "Introduced AI-powered workflows for token governance, component intelligence, design-to-code pipelines, predictive accessibility, and real-time design system analytics.",
  },
];


/* Section C — CAD-blueprint feature grid */
const CARDS: { title: string; copy: string; icon: React.ReactNode }[] = [
  {
    title: "Trust Is a Component",
    copy: "An interface is a promise that no one gets left outside. We keep it in the smallest places: contrast that holds, focus that lands, semantics that speak. Accessibility is not a review here. It is a material.",
    icon: <IcoTrust />,
  },
  {
    title: "The Hundredth Button",
    copy: "Somewhere today, a team is building its hundredth button. Those years belong to the product instead. Take the finished piece: install it, theme it, ship it, in React, Angular or plain HTML.",
    icon: <IcoReuse />,
  },
  {
    title: "Entropy Is Optional",
    copy: "Products drift apart the way handwriting does, slowly and then obviously. One token layer holds the line. A thousand screens move as one, no matter how many brands and platforms you add.",
    icon: <IcoAlign />,
  },
  {
    title: "One Language for All",
    copy: "Design says one thing and code hears another. We removed the translation. A decision lives once and reads the same to designers, engineers and the AI building beside them.",
    icon: <IcoLanguage />,
  },
];
