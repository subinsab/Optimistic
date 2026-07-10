import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../_components/Reveal";
import { GROUPS } from "./_data/registry";
import s from "./docs.module.css";

export const metadata: Metadata = {
  title: "Components — Optimistic",
  description:
    "The Optimistic component library: 8 foundations, 54 components and 2 layouts, each documented with anatomy, tokens and production code.",
};

export default function ComponentsIndex() {
  const counts = GROUPS.map((g) => ({
    label: g.label,
    n: g.categories.reduce((a, c) => a + c.entries.length, 0),
  }));

  return (
    <div className={s.pageInner}>
      <Reveal>
        <span className={s.eyebrow}>
          <i className={s.hatch} /> COMPONENT LIBRARY
        </span>
        <h1 className={s.title}>Every piece, documented.</h1>
        <p className={s.lead}>
          The same structure for every entry: a live specimen, its anatomy,
          the tokens it answers to, and production code. Nothing here is a
          picture of a component; it is the component.
        </p>
        <div className={s.stats}>
          {counts.map((c) => (
            <span key={c.label}>
              <b>{c.n}</b>
              {c.label}
            </span>
          ))}
        </div>
      </Reveal>

      {GROUPS.map((g) =>
        g.categories.map((c, ci) => {
          const label = c.label || g.label;
          return (
            <section key={`${g.label}-${label}`} className={s.catSection}>
              <Reveal>
                <div className={s.catLabel}>
                  {label}
                  <span className={s.catCount}>{String(c.entries.length).padStart(2, "0")}</span>
                </div>
              </Reveal>
              <div className={s.cardGrid}>
                {c.entries.map((e, i) => (
                  <Reveal key={e.slug} delay={Math.min(i * 40, 240)}>
                    <Link href={`/components/${e.slug}`} className={s.card}>
                      <span className={s.cardTitle}>{e.title}</span>
                      <span className={s.cardDesc}>{e.desc}</span>
                      <span className={s.cardFoot}>
                        <span className={e.built ? s.stReady : s.stSoon}>
                          {e.built ? "● documented" : "in assembly"}
                        </span>
                        <span className={s.cardArrow} aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
