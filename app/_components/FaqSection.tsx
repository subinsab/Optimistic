"use client";

import { useState } from "react";
import s from "./FaqSection.module.css";

/* Section I — tabbed FAQ accordion. One open at a time, smooth height,
   plus→× toggle, tab fade. Monochrome. */

type QA = { q: string; a: string };

const ICONS = [
  // folder
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M3 7h6l2 2h10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /></svg>,
  // user
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.4 3.1-6 7-6s7 2.6 7 6" /></svg>,
  // chip
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></svg>,
  // chat
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /></svg>,
  // globe
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>,
  // infinity
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 12c0-2.2-1.6-4-3.5-4S1 9.8 1 12s1.6 4 3.5 4S8 14.2 8 12zm0 0c0 2.2 1.6 4 3.5 4S15 14.2 15 12s-1.6-4-3.5-4S8 9.8 8 12z" transform="translate(4 0)" /></svg>,
];

const TABS = ["Overview", "Platforms", "Licensing", "Security"] as const;

const DATA: Record<(typeof TABS)[number], QA[]> = {
  Overview: [
    { q: "What is a Headless Design System?", a: "A Headless Design System separates design decisions from implementation. Design Tokens, Figma Variables, semantic foundations, and reusable components become a single source of truth that can power any framework or platform without duplicating design work." },
    { q: "How is it different from a traditional Design System?", a: "Traditional design systems are often tightly coupled to a single product or frontend framework. Our Headless approach allows the same design foundations to generate consistent experiences across React, Angular, Flutter, iOS, Android, and future platforms." },
    { q: "What are Design Tokens?", a: "Design Tokens are the smallest reusable design decisions such as colors, spacing, typography, radius, elevation, motion, and opacity. Every UI component references tokens instead of hardcoded values, ensuring complete consistency across products." },
    { q: "How do Figma Variables fit into the workflow?", a: "Figma Variables synchronize directly with your design tokens, enabling designers to manage themes, semantic values, responsive behavior, and design decisions without maintaining multiple disconnected component libraries." },
    { q: "Can multiple brands share the same system?", a: "Yes. The platform supports multi-brand architectures where each brand can inherit shared foundations while maintaining its own themes, colors, typography, and component customizations." },
    { q: "How does the system stay synchronized?", a: "Changes to Design Tokens automatically propagate through Figma Variables, component libraries, documentation, code packages, and connected applications, ensuring every product stays aligned from a single source of truth." },
  ],
  Platforms: [
    { q: "Which design tools are supported?", a: "The platform integrates with Figma, Token Studio, Style Dictionary, Storybook, Zeroheight, GitHub, and modern CI/CD pipelines to create a unified design workflow." },
    { q: "Which frontend frameworks are supported?", a: "Generated design tokens and components can be consumed by React, Angular, Vue, Next.js, SwiftUI, Jetpack Compose, Flutter, and standard CSS architectures." },
    { q: "Can multiple products share the same design system?", a: "Yes. Multiple applications, teams, and product lines can consume a shared token package while maintaining independent release cycles and product-specific customizations." },
    { q: "Does it support dark mode and themes?", a: "Yes. Theme switching is powered by semantic tokens and Figma Variables, allowing unlimited themes, brand variants, accessibility modes, and regional customizations." },
    { q: "Can developers consume tokens automatically?", a: "Absolutely. Every token can be exported as platform-specific assets including CSS Variables, Tailwind configuration, JSON, Android XML, iOS Swift, Flutter Dart, and more." },
    { q: "Is the platform API-first?", a: "Yes. Every asset, token, component, and release can be managed through APIs, making it easy to integrate into existing development pipelines." },
  ],
  Licensing: [
    { q: "How is licensing structured?", a: "Licensing is available for individuals, startups, enterprise organizations, and agencies, with plans based on teams, products, and deployment requirements." },
    { q: "Can multiple teams share one workspace?", a: "Enterprise workspaces support multiple teams, departments, and product groups while maintaining role-based permissions and governance." },
    { q: "Are generated assets royalty-free?", a: "Yes. Tokens, components, documentation, and generated code belong entirely to your organization and can be used across unlimited internal products." },
    { q: "Can we self-host the platform?", a: "Enterprise customers can deploy the platform within their own infrastructure to satisfy compliance, governance, and security requirements." },
    { q: "Do licenses include updates?", a: "Yes. Every active subscription includes platform updates, new integrations, workflow improvements, and continuous feature enhancements." },
    { q: "Can licenses scale with our organization?", a: "Absolutely. Organizations can add products, contributors, reviewers, and engineering teams without rebuilding the design system architecture." },
  ],
  Security: [
    { q: "How is design data protected?", a: "All design assets, tokens, variables, documentation, and generated code are encrypted both in transit and at rest using enterprise-grade security practices." },
    { q: "Does the platform support Single Sign-On?", a: "Yes. Enterprise authentication supports SAML, OAuth, Google Workspace, Microsoft Entra ID, Okta, and other identity providers." },
    { q: "Are changes version controlled?", a: "Every modification to tokens, variables, components, and documentation is fully versioned with complete audit history and rollback capabilities." },
    { q: "Can permissions be customized?", a: "Role-based access control allows organizations to define permissions for designers, developers, reviewers, administrators, and external collaborators." },
    { q: "Is the platform compliant with enterprise standards?", a: "The platform is designed to support enterprise governance requirements, secure deployment practices, audit logging, and internal compliance workflows." },
    { q: "What happens if something breaks?", a: "Every release includes version history, rollback support, deployment validation, and change tracking, allowing teams to safely recover previous system states with minimal disruption." },
  ],
};

export default function FaqSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [open, setOpen] = useState(0);
  const items = DATA[tab];

  return (
    <div>
      <div className={s.tabs} role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === tab}
            className={`${s.tab} ${t === tab ? s.tabOn : ""}`}
            onClick={() => { setTab(t); setOpen(0); }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={s.list} key={tab}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div className={`${s.item} ${isOpen ? s.itemOpen : ""}`} key={it.q}>
              <button className={s.q} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className={s.qIcon}>{ICONS[i % ICONS.length]}</span>
                <span className={s.qText}>{it.q}</span>
                <span className={s.toggle} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={s.ansWrap}>
                <div className={s.ans}>
                  <p className={s.ansInner}>{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
