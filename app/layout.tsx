import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "./_components/SiteNav";
import Footer from "./_components/Footer";
import PageTransition from "./_components/PageTransition";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"], // enable optical-size axis → "Inter Display" at large sizes
});

const geistMono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://design.theoptimisticdesigner.com";
const SITE_NAME = "Optimistic";
const SITE_TAGLINE = "A design system built for what's next";
const SITE_DESC =
  "Optimistic is a free, open-source, headless design system. Dark-first and AI-friendly, with design tokens, 57 components, and production code for React and Angular.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Search-facing title leads with the high-intent terms; the social/OG title
    // (below) keeps the brand tagline, which reads more human when shared.
    default: `${SITE_NAME} · Free, open-source design system for React & Angular`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "free design system",
    "open source design system",
    "headless design system",
    "best design system",
    "free React component library",
    "open source component library",
    "headless UI components",
    "MIT licensed design system",
    "free UI kit",
    "design system",
    "Optimistic design system",
    "React component library",
    "Angular component library",
    "design tokens",
    "dark mode design system",
    "AI-friendly design system",
    "Figma variables",
    "UI component library",
    "plug and play design system",
  ],
  authors: [{ name: "Subin C S", url: SITE_URL }],
  creator: "Subin C S",
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESC,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/icon.svg", apple: "/brand/optimistic-appicon.svg" },
};

// Site-wide structured data so search engines understand the org, site, and product.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/optimistic-mark.svg`,
      description: SITE_DESC,
      sameAs: ["https://github.com/subinsab/Optimistic"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Design System",
      operatingSystem: "Web, React, Angular",
      url: SITE_URL,
      description: SITE_DESC,
      author: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
      license: "https://opensource.org/licenses/MIT",
      keywords:
        "free design system, open source design system, headless design system, React component library, Angular component library, design tokens, dark mode UI kit",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dark-only by design ("dark field, one warm pixel"): the theme is a static
    // attribute, so it is present in the first paint with no flash and no script.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteNav />
        <PageTransition keyBy="segment">{children}</PageTransition>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
