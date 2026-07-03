"use client";

import { useState } from "react";
import styles from "../home.module.css";

type QA = { q: string; a: string };

export default function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.faqList}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}>
            <button
              className={styles.faqQ}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className={styles.faqSign} aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div className={styles.faqAWrap} hidden={!isOpen}>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
