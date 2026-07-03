import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../_components/Reveal";
import styles from "./community.module.css";

export const metadata: Metadata = {
  title: "Community — Optimistic",
  description:
    "Join the Optimistic community. Propose components, contribute code, share what you ship, and help shape the roadmap.",
};

const WAYS = [
  {
    icon: "spark",
    title: "Propose a component",
    body: "Spotted a gap? Open a proposal with the use case and a sketch. If it helps teams ship, it belongs in the system.",
  },
  {
    icon: "code",
    title: "Contribute code",
    body: "Improve a React or Angular implementation, fix a token, tighten an a11y path. Every PR moves the system forward.",
  },
  {
    icon: "doc",
    title: "Improve the docs",
    body: "Better examples, clearer do's and don'ts, sharper anatomy. Documentation is a first-class contribution.",
  },
  {
    icon: "show",
    title: "Show what you built",
    body: "Shipped something with Optimistic? Share it. Real products are the best proof — and the best inspiration.",
  },
];

const VALUES = [
  { title: "Kind by default", body: "Critique the work, support the person. Optimism extends to how we treat each other." },
  { title: "Open in the build", body: "Decisions happen in the open, with reasoning attached. No black boxes." },
  { title: "Ship over perfect", body: "We'd rather release, learn, and iterate than polish in private forever." },
];

export default function CommunityPage() {
  return (
    <main className="page-shell">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Community</span>
            <h1 className="page-title">
              Build it with us, <span className="gradient-text">in the open.</span>
            </h1>
            <p className="page-lead">
              Optimistic is better with more minds. Whether you write code,
              design components, or just ship great products — there&apos;s a
              place for you here.
            </p>
            <div className={styles.headActions}>
              <Link href="/contact" className="btn-primary">Join the community</Link>
              <a href="#contribute" className="btn-ghost">How to contribute →</a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* WAYS TO CONTRIBUTE */}
      <section id="contribute" className="content-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ways to contribute</span>
            <h2 className="h2" style={{ marginTop: "var(--sp-3)" }}>
              Every contribution counts
            </h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "var(--sp-12)" }}>
            {WAYS.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <article className="card">
                  <div className={styles.icon}><WayIcon name={w.icon} /></div>
                  <h3 className="h3" style={{ marginTop: "var(--sp-5)" }}>{w.title}</h3>
                  <p className={styles.cardBody}>{w.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="content-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How we work together</span>
            <h2 className="h2" style={{ marginTop: "var(--sp-3)" }}>
              Three values, no fine print
            </h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: "var(--sp-12)" }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <article className="card">
                  <h3 className="h3">{v.title}</h3>
                  <p className={styles.cardBody}>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN BAND */}
      <section className="content-section">
        <div className="container">
          <Reveal>
            <div className={styles.joinCard}>
              <h2 className={styles.joinTitle}>Ready to jump in?</h2>
              <p className={styles.joinLead}>
                Star the repo, say hello, and pick up your first issue. We&apos;ll
                help you land it.
              </p>
              <div className={styles.headActions}>
                <a href="https://github.com" className="btn-primary">GitHub</a>
                <Link href="/contact" className="btn-ghost">Get in touch →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function WayIcon({ name }: { name: string }) {
  const c = {
    width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "spark":
      return <svg {...c}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>;
    case "code":
      return <svg {...c}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" /></svg>;
    case "doc":
      return <svg {...c}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" /></svg>;
    case "show":
      return <svg {...c}><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" /><circle cx="12" cy="12" r="2.5" /></svg>;
    default:
      return null;
  }
}
