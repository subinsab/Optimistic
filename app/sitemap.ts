import type { MetadataRoute } from "next";
import { ALL_ENTRIES } from "./components/_data/registry";
import { getPublishedArticles } from "./_data/articles";

const SITE = "https://design.theoptimisticdesigner.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/components`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/community`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const components: MetadataRoute.Sitemap = ALL_ENTRIES.map((e) => ({
    url: `${SITE}/components/${e.slug}`,
    lastModified: e.updated ? new Date(e.updated) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = (await getPublishedArticles()).map((a) => ({
    url: `${SITE}/blog/${a.slug}`,
    lastModified: new Date(a.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...components, ...articles];
}
