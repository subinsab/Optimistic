import type { Block } from "../../_data/articles";
import { VISUALS } from "./registry";
import v from "./visuals.module.css";

/* Renders an article's block list. Legacy blocks (no `type`, just
   heading + paragraphs) render as prose, so old posts keep working. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => <BlockView key={i} block={b} />)}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  const type = "type" in block && block.type ? block.type : "prose";

  if (type === "prose") {
    const p = block as Extract<Block, { paragraphs: string[] }>;
    return (
      <section>
        {p.heading && <h2>{p.heading}</h2>}
        {p.paragraphs.map((x, i) => <p key={i}>{x}</p>)}
      </section>
    );
  }
  if (type === "heading") return <h2>{(block as { text: string }).text}</h2>;
  if (type === "lead") return <p className={v.lead}>{(block as { text: string }).text}</p>;
  if (type === "quote") {
    const q = block as { text: string; cite?: string };
    return <blockquote className={v.quote}>{q.text}{q.cite && <cite>{q.cite}</cite>}</blockquote>;
  }
  if (type === "list") {
    const L = block as { heading?: string; ordered?: boolean; items: string[] };
    const items = L.items.map((it, i) => <li key={i}>{it}</li>);
    return (
      <section>
        {L.heading && <h3>{L.heading}</h3>}
        {L.ordered ? <ol>{items}</ol> : <ul>{items}</ul>}
      </section>
    );
  }
  if (type === "callout") {
    const c = block as { tone?: "note" | "warn" | "tip"; title?: string; body: string };
    return (
      <div className={`${v.callout} ${v[`callout--${c.tone ?? "note"}`] ?? ""}`}>
        {c.title && <strong>{c.title}</strong>}
        <span>{c.body}</span>
      </div>
    );
  }
  if (type === "visual") {
    const V = block as { kind: string; caption?: string };
    const Comp = VISUALS[V.kind];
    return (
      <figure className={v.figure}>
        {Comp ? <Comp /> : null}
        {V.caption && <figcaption className={v.caption}>{V.caption}</figcaption>}
      </figure>
    );
  }
  return null;
}
