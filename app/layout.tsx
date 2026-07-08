import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "./_components/SiteNav";
import Footer from "./_components/Footer";

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

// Dark-only by design ("dark field, one warm pixel"). Force the theme and
// clear any light preference stored by the old toggle.
const themeScript = `
(function () {
  document.documentElement.setAttribute('data-theme', 'dark');
  try { localStorage.removeItem('optimistic-theme'); } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
