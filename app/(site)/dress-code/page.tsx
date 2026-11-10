import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Page";
import { dressCode } from "@/content/dressCode";

export const metadata: Metadata = { title: "Dress code" };

export default function Dress() {
  return (
    <>
      <PageHero kicker="What to wear" title={dressCode.title} intro={dressCode.intro} photo="dressCode" />
      <Section title="Color, texture, ease">
        <ul className="swatches">
          {dressCode.colors.map((color) => (
            <li key={color.hex}>
              <span className="swatch" style={{ background: color.hex }} aria-hidden="true" />
              <span className="swatch-name">{color.name}</span>
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
    </>
  );
}
