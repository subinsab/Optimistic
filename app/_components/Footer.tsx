import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "System",
    links: [
      { label: "Philosophy", href: "/philosophy" },
      { label: "Foundations", href: "/components" },
      { label: "Components", href: "/components" },
      { label: "Tokens", href: "/components" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "React", href: "/components" },
      { label: "Angular", href: "/components" },
      { label: "Figma kit", href: "/components" },
      { label: "Changelog", href: "/components" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join", href: "/community" },
      { label: "Contribute", href: "/community" },
      { label: "GitHub", href: "/community" },
      { label: "Let's talk", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Logo />
          <p className={styles.tagline}>
            A design system built for what&apos;s next. AI-friendly,
            plug-and-play, and ready to ship.
          </p>
        </div>
        <div className={styles.cols}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={styles.col}>
              <span className={styles.colTitle}>{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className={styles.colLink}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Optimistic Design System</span>
        <span>Made with optimism.</span>
      </div>
    </footer>
  );
}
