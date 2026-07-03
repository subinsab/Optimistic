/**
 * Blog collection data layer (Section J).
 * Stand-in for a CMS/database "Blog" collection. When a real CMS is wired up,
 * replace the body of getPublishedArticles() with the fetch/query — the page
 * only depends on this async contract. Falls back to placeholders gracefully.
 */
export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedDate: string; // ISO yyyy-mm-dd
  readingTime: string;
  author: string;
  featured?: boolean;
  status: "Published" | "Draft";
  seed: number; // drives the procedural cover art
  placeholder?: boolean;
};

const COLLECTION: Article[] = [
  {
    title: "What It Takes to Make a Design System Teams Actually Use",
    slug: "design-system-adoption",
    excerpt:
      "Shipping tokens is easy. Turning them into a foundation every team reaches for requires structure, governance, and relentless consistency.",
    category: "Design Systems",
    publishedDate: "2026-06-24",
    readingTime: "8 min read",
    author: "Subin",
    featured: true,
    status: "Published",
    seed: 7,
  },
  {
    title: "Why Your Tokens Drift — and How to Stop It",
    slug: "stop-token-drift",
    excerpt:
      "Drift creeps in the moment a value is hardcoded. Here's how semantic tokens and automated sync keep every surface aligned.",
    category: "Design Tokens",
    publishedDate: "2026-06-18",
    readingTime: "4 min read",
    author: "Subin",
    status: "Published",
    seed: 13,
  },
  {
    title: "From Components to Systems: The Real Shift",
    slug: "components-to-systems",
    excerpt:
      "A component library is not a design system. The difference is architecture, governance, and a single source of truth.",
    category: "Component Architecture",
    publishedDate: "2026-06-11",
    readingTime: "5 min read",
    author: "Subin",
    status: "Published",
    seed: 21,
  },
  {
    title: "Figma Variables as a Single Source of Truth",
    slug: "figma-variables-source-of-truth",
    excerpt:
      "Modes, collections, and aliases turn Figma into the canonical home for design decisions — synced straight to code.",
    category: "Figma Variables",
    publishedDate: "2026-06-03",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 31,
  },
];

export const PLACEHOLDER: Article = {
  title: "More insights coming soon",
  slug: "#",
  excerpt:
    "New articles on tokens, variables, governance, and automation are on the way.",
  category: "Coming Soon",
  publishedDate: "",
  readingTime: "—",
  author: "",
  status: "Published",
  seed: 3,
  placeholder: true,
};

/** Published articles, newest first. Swap the body for a real CMS query later. */
export async function getPublishedArticles(): Promise<Article[]> {
  return COLLECTION.filter((a) => a.status === "Published").sort(
    (a, b) => +new Date(b.publishedDate) - +new Date(a.publishedDate)
  );
}
