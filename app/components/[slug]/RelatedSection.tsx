import Link from "next/link";
import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import s from "../docs.module.css";

export default function RelatedSection({ related }: { related: typeof ALL_ENTRIES }) {
  if (!related.length) return null;
  return (
    <Reveal>
      <section className={s.docSection}>
        <div className={s.secLabel}>Related Components</div>
        <div className={s.secBody}>
          <div className={s.relatedGrid}>
            {related.map((e) => (
              <Link key={e.slug} href={`/components/${e.slug}`} className={s.card}>
                <span className={s.cardTitle}>{e.title}</span>
                <span className={s.cardDesc}>{e.desc}</span>
                <span className={s.cardFoot}>
                  <span className={e.built ? s.stReady : s.stSoon}>
                    {e.built ? "● documented" : "in assembly"}
                  </span>
                  <span className={s.cardArrow} aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
