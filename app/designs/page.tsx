import Link from "next/link";
import { designs } from "@/content/designs";
import { allFontVariables } from "./fonts";

/**
 * The picker. Ten ideas, each opening into a full working site with all of
 * its pages, so a direction can be judged on more than a home page.
 */
export default function DesignIndex() {
  return (
    <div className={allFontVariables}>
      <section className="picker">
        <p className="kicker">Ten directions</p>
        <h1>Pick a feeling</h1>
        <p className="lede">
          The same wedding, the same words, ten different ideas about how it should look. Open any one and
          click through its pages exactly as a guest would. Nothing here changes the live site.
        </p>
      </section>

      <div className="picker-grid">
        {designs.map((design, i) => (
          <Link className="picker-card" key={design.slug} href={`/designs/${design.slug}`}>
            <span className="picker-swatch" data-design={design.slug} aria-hidden>
              <span style={{ background: "var(--deep)" }} />
              <span style={{ background: "var(--lagoon)" }} />
              <span style={{ background: "var(--aqua)" }} />
              <span style={{ background: "var(--sand)" }} />
              <span style={{ background: "var(--cream)" }} />
            </span>
            <span className="body">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{design.name}</h2>
              <p className="idea">{design.idea}</p>
              <p className="note">{design.note}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
