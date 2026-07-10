"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { SNIPPETS, type Tok } from "./codeSnippets";

/* token-array highlighting — reliable whitespace inside <pre> */
const CLS: Record<string, string> = {
  kw: s.cbKw, str: s.cbStr, cmt: s.cbCmt, fn: s.cbFn, num: s.cbNum,
  tag: s.cbTag, attr: s.cbAttr, var: s.cbVar, punc: s.cbPunc,
};
const plainOf = (toks: Tok[]) => toks.map((t) => t[1]).join("");
function Highlight({ toks }: { toks: Tok[] }) {
  return <>{toks.map(([c, v], i) => (c ? <span key={i} className={CLS[c]}>{v}</span> : <span key={i}>{v}</span>))}</>;
}

export function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className={`${s.ocodeCopy} ${ok ? s.ocodeCopyOk : ""}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked */ }
        setOk(true); setTimeout(() => setOk(false), 2000);
      }}>
      {ok ? "Copied ✓" : "Copy"}
    </button>
  );
}

export function CodeSurface({ lang, toks, showNums = false, wrap = false }: { lang: string; toks: Tok[]; showNums?: boolean; wrap?: boolean }) {
  const plain = plainOf(toks);
  const lineCount = plain.split("\n").length;
  return (
    <div className={`${s.ocode} ${wrap ? s.ocodeWrap : ""}`}>
      <div className={s.ocodeHead}>
        <span className={s.ocodeLang}>{lang}</span>
        <CopyButton text={plain} />
      </div>
      <pre className={s.ocodeBody}>
        {showNums ? (
          <div className={s.ocodeNums}>
            <div className={s.ocodeNumCol}>{Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}</div>
            <code><Highlight toks={toks} /></code>
          </div>
        ) : (
          <code><Highlight toks={toks} /></code>
        )}
      </pre>
    </div>
  );
}

const TABS = ["tsx", "css", "shell"] as const;

export default function CodeBlockDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("tsx");
  const snip = SNIPPETS[tab];
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Code Block examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        <div className={s.subLabel}>Language label, one-click copy, restrained token colour</div>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <CodeSurface lang={snip.lang} toks={snip.toks} showNums={tab === "tsx"} />
        </div>
      </div>
    </div>
  );
}
