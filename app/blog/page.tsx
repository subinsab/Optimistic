import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "../_data/articles";
import CoverArt, { fmtDate } from "../_components/CoverArt";
import s from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog · Optimistic",
  description:
    "Design system insights and engineering: token architecture, Figma Variables, component governance, accessibility, and scaling stories from real product teams.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  const [featured, ...rest] = articles;

  return (
    <main className={s.main}>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.eyebrow}>
          <span className={s.hatch} /> LATEST INSIGHTS
        </div>
        <h1 className={s.title}>Design System Insights &amp; Engineering</h1>
        <p className={s.lead}>
          Engineering stories, design system best practices, token
          architecture, Figma Variables, governance strategies, accessibility,
          automation, and scaling experiences from real product teams.
        </p>

        {featured && (
          <Link className={s.featured} href={`/blog/${featured.slug}`}>
            <div className={s.featCover}>
              <CoverArt seed={featured.seed} cover={featured.cover} className={s.coverImg} />
            </div>
            <div>
              <span className={s.cat}>{featured.category}</span>
              <h2 className={s.featTitle}>{featured.title}</h2>
              <p className={s.featExcerpt}>{featured.excerpt}</p>
              <div className={`${s.meta} ${s.featMeta}`}>
                {fmtDate(featured.publishedDate)} · {featured.readingTime}
              </div>
              <div className={s.readLink}>
                Read article <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className={s.grid}>
            {rest.map((a) => (
              <Link key={a.slug} className={s.card} href={`/blog/${a.slug}`}>
                <div className={s.cardThumb}>
                  <CoverArt seed={a.seed} cover={a.cover} className={s.coverImg} />
                </div>
                <span className={`${s.cat} ${s.cardCat}`}>{a.category}</span>
                <h3 className={s.cardTitle}>{a.title}</h3>
                <p className={s.cardExcerpt}>{a.excerpt}</p>
                <span className={`${s.meta} ${s.cardMeta}`}>
                  {fmtDate(a.publishedDate)} · {a.readingTime}
                </span>
                <span className={s.cardArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
