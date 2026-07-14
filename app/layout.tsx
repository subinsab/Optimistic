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

export const metadata: Metadata = {
  title: "Optimistic — A design system built for what's next",
  description:
    "Optimistic is an AI-friendly, plug-and-play design system that shortens go-to-market. Tokens, components, and production code for React and Angular.",
  keywords: [
    "design system",
    "Optimistic",
    "React components",
    "Angular components",
    "design tokens",
    "AI-friendly",
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
        <SiteNav />
        <PageTransition keyBy="segment">{children}</PageTransition>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
