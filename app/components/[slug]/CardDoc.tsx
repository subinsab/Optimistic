import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import CardDemo from "./CardDemo";
import s from "../docs.module.css";

const ANATOMY: [string, string][] = [
  ["Surface", "A raised panel with a 1px hairline border and 12px radius. The container, never the content."],
  ["Media", "A flush band at an edge: image, video or audio. It owns its corners; the body stays padded."],
  ["Body", "20px inner padding holding the title, description and any content."],
  ["Footer", "An actions row under a subtle hairline. Optional."],
  ["Elevation", "Flat by default. A soft shadow is reserved for cards that float or that you can click."],
];

const VARIANTS: [string, string][] = [
  ["Media", "Image, video and audio cards. The <CardMedia> band runs edge to edge; a play control, progress and waveform live on top of it."],
  ["Interactive", "The interactive prop lifts the whole card and adds a focus ring. Beyond it: a cursor-tracked 3D tilt and a click-to-flip card."],
  ["Background movement", "Motion behind the content, never on it: a drifting aurora, an ember spotlight that follows the cursor, a light running the border."],
  ["Data & finance", "A payment-card visual, KPI stat cards with a trend pill, an accent-filled balance card, and asset tiles with an inline sparkline."],
  ["Lending & offers", "Loan, deal and pre-approved-offer cards, plus a peer-to-peer market listing, built from Badge, Button, Progress and Avatar."],
  ["People & progress", "Profiles with a progress-ring avatar, a goal card with a progress bar and avatar stack, and an activity list."],
  ["Company & marketplace", "A business profile with a logo, meta line, tag row and metric grid, a grouped stat card, and CRISIL-rated deal-flow listings."],
];

export default function CardDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>A surface for grouping</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>A card is the simplest container: a bordered surface that gathers related content and its actions into one block. On a dark field it reads as a faint panel lifted a step off the page, held together by a hairline rather than a shadow. Give it media, make it clickable, or let a little motion live behind the content.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live demo</div><div className={s.secBody}>
        <CardDemo />
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Kinds</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Kind</th><th>Detail</th></tr></thead><tbody>
          {VARIANTS.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Part</th><th>Detail</th></tr></thead><tbody>
          {ANATOMY.map(([k, v]) => <tr key={k}><td className={s.tokName}>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}>
        <div className={s.codeBlock}><div className={s.codeHead}><span>tsx</span></div><pre>{`import {
  Card, CardMedia, CardBody, CardTitle, CardDescription, CardFooter,
} from "./ui/components/card/card";
import { Button } from "./ui/components/button/button";

// A media card with flush media and a padded body
<Card flush interactive>
  <CardMedia ratio="4/3">
    <img src="/harbor.jpg" alt="Harbor at dawn" />
  </CardMedia>
  <CardBody>
    <CardTitle>Harbor at dawn</CardTitle>
    <CardDescription>A resting card with a hairline footer.</CardDescription>
    <CardFooter>
      <span>4 min read</span>
      <Button variant="ghost" size="sm" style={{ marginLeft: "auto" }}>Share</Button>
    </CardFooter>
  </CardBody>
</Card>`}</pre></div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
