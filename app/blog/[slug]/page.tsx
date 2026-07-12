import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "../../_data/articles";
import CoverArt, { fmtDate } from "../../_components/CoverArt";
import ArticleBody from "../_visuals/ArticleBody";
import s from "../blog.module.css";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found · Optimistic" };
  return {
    title: `${article.title} · Optimistic`,
    description: article.excerpt,
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const rest = (await getPublishedArticles()).filter((a) => a.slug !== article.slug);
  // suggest same-category first, then fill with the most recent others
  const more = [
    ...rest.filter((a) => a.category === article.category),
    ...rest.filter((a) => a.category !== article.category),
  ].slice(0, 3);

  return (
    <main className={s.main}>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.inner}>
        <Link className={s.backLink} href="/blog">
          <span aria-hidden="true">←</span> All articles
        </Link>

        <header className={s.artHead}>
          <div className={s.eyebrow}>
            <span className={s.hatch} /> {article.category}
          </div>
          <h1 className={s.artTitle}>{article.title}</h1>
          <div className={`${s.meta} ${s.artMeta}`}>
            {fmtDate(article.publishedDate)} · {article.readingTime}
            {article.author ? ` · ${article.author}` : ""}
          </div>
        </header>

        <div className={s.artCover}>
          <CoverArt seed={article.seed} cover={article.cover} className={s.coverImg} />
        </div>

        <article className={s.artBody}>
          <ArticleBody blocks={article.content ?? [{ paragraphs: [article.excerpt] }]} />
        </article>

        {more.length > 0 && (
          <footer className={s.moreWrap}>
            <div className={s.moreHead}>
              <div className={s.eyebrow}>
                <span className={s.hatch} /> CONTINUE READING
              </div>
              <Link className={s.allBtn} href="/blog">
                View All Articles <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={s.moreGrid}>
              {more.map((a) => (
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
          </footer>
        )}
      </div>
    </main>
  );
}
