import Link from "next/link";
import { designs } from "@/content/designs";
import { allFontVariables } from "./fonts";

/**
 * The picker. Ten different answers to what shape a wedding website is —
 * not ten palettes. Each card says what is structurally different about it.
 */
export default function DesignIndex() {
  return (
    <div className={allFontVariables}>
      <section className="picker">
        <p className="picker-eyebrow">Ten reimaginings</p>
        <h1>What shape should this be?</h1>
        <p className="picker-lede">
          The same wedding and the same words, built ten different ways. These are not color schemes:
          each one has its own navigation, its own structure, and its own idea about how the weekend
          should be laid out. Nothing here touches the live site.
        </p>
      </section>

      <div className="picker-grid">
        {designs.map((design, i) => (
          <Link className="picker-card" key={design.slug} href={`/designs/${design.slug}`}>
            <span className="picker-swatch" aria-hidden>
              {design.colors.map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </span>
            <span className="picker-body">
              <span className="picker-num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{design.name}</h2>
              <p className="picker-idea">{design.idea}</p>
              <p className="picker-structure">{design.structure}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
