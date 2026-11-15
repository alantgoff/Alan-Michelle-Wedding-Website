import type { Metadata } from "next";
import { FlowerEar } from "@/components/FlowerEar";
import { PageHero, Section } from "@/components/Page";
import { dressCode } from "@/content/dressCode";

export const metadata: Metadata = { title: "Dress code" };

/** Each sample card sits a little off square, like cards laid on a table. */
const TILTS = ["-1.4deg", "0.9deg", "-0.5deg", "1.2deg", "-0.9deg"];

export default function Dress() {
  return (
    <>
      <PageHero
        kicker="What to wear"
        title={
          <>
            {dressCode.titleLead} <em className="title-tail">{dressCode.titleTail}</em>
          </>
        }
        intro={dressCode.intro}
        photo="dressCode"
        scene="dress"
      />
      <Section className="dress-epigraph">
        <svg className="epigraph-iwa" viewBox="-54 -24 108 50" aria-hidden="true" focusable="false">
          <g filter="url(#ink)">
            <use href="#m-iwa" x={-50} y={-20} width={100} height={40} />
          </g>
        </svg>
        <figure className="saying">
          <blockquote lang="haw">{dressCode.epigraph.saying}</blockquote>
          <figcaption>
            <span className="saying-means">{dressCode.epigraph.means}</span> {dressCode.epigraph.note}
          </figcaption>
        </figure>
      </Section>
      <Section title="Color, texture, ease">
        <ul className="swatches">
          {dressCode.colors.map((color, i) => (
            <li key={color.hex} className="swatch-card" style={{ rotate: TILTS[i % TILTS.length] }}>
              <span className="swatch-edge" aria-hidden="true">
                <span className="swatch-cloth" style={{ backgroundColor: color.hex }} />
              </span>
              <span className="swatch-no">No. {String(i + 1).padStart(2, "0")}</span>
              <span className="swatch-name">{color.name}</span>
              <span className="swatch-fabric">{color.fabric}</span>
            </li>
          ))}
        </ul>
        <p>
          Take inspiration from ocean, mountain, flowers, and late-afternoon sun. These are ideas, not a
          uniform.
        </p>
      </Section>
      <Section>
        <div className="split-list">
          <article className="card">
            <h3>Lean into this</h3>
            <ul>
              {dressCode.lean.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Maybe skip this</h3>
            <ul>
              {dressCode.skip.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>
      <Section className="dress-asides">
        <FlowerEar {...dressCode.flower} />
        <div className="passages">
          {dressCode.asides.map((aside) => (
            <article className="passage" key={aside.title}>
              <h3>{aside.title}</h3>
              <p>{aside.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title={dressCode.flowersTitle}>
        <div className="menu-words plain">
          <dl>
            {dressCode.flowers.map((flower) => (
              <div key={flower.word}>
                <dt lang="haw">{flower.word}</dt>
                <dd>{flower.means}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
