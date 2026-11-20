import { ISLAND, ISLAND_BOX, POINTS, type PointKey } from "@/lib/island";

/**
 * A locator the size of a word: Oʻahu in outline with a dot where the place
 * is, so "Kapahulu" or "Haleʻiwa" reads as town or the far north at a glance.
 *
 * With a visible label, the label is the accessible name and the drawing is
 * decoration. With `hideLabel` (where a heading already names the place), the
 * drawing itself carries the name for screen readers and as a hover tooltip.
 */
export function IslandDot({ at, label, hideLabel = false }: { at: PointKey; label: string; hideLabel?: boolean }) {
  const [x, y] = POINTS[at];
  return (
    <span className={hideLabel ? "island-dot island-dot-bare" : "island-dot"}>
      <svg
        viewBox={`0 0 ${ISLAND_BOX.width} ${ISLAND_BOX.height}`}
        {...(hideLabel ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
        focusable="false"
      >
        {hideLabel ? <title>{label}</title> : null}
        <path className="island-dot-land" d={ISLAND} />
        <circle className="island-dot-halo" cx={x} cy={y} r="125" />
        <circle className="island-dot-mark" cx={x} cy={y} r="62" />
      </svg>
      {hideLabel ? null : <span className="island-dot-name">{label}</span>}
    </span>
  );
}
