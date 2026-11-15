import { useId } from "react";

/**
 * The moon, drawn in the logo's line with its true phase: the unlit sliver
 * is hatched, never filled. Decorative — the phase is always said in words
 * beside it.
 *
 * `lit` is the fraction of the face that is lit (0–1). `tilt` turns the
 * shadowed edge: 0 puts it on the right, negative values lift it toward the
 * top, which is how a waning moon looks as it rises in the east from Hawaiʻi.
 *
 * Give `at` to set the moon inside another drawing: its centre and its width
 * there, in that drawing's own units.
 */
export function MoonGlyph({
  lit,
  tilt = -40,
  className = "moon-glyph",
  at,
}: {
  lit: number;
  tilt?: number;
  className?: string;
  at?: { x: number; y: number; size: number };
}) {
  const id = useId();
  const r = 26;
  // The terminator is half an ellipse whose width follows the phase.
  const t = r * Math.abs(1 - 2 * lit);
  const gibbous = lit >= 0.5;
  // Shadow: the right-hand limb, closed by the terminator. For a gibbous moon
  // the terminator bulges toward the same limb, leaving a thin sliver.
  const shadow = `M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${t} ${r} 0 0 ${gibbous ? 0 : 1} 0 ${-r} Z`;
  const hatch = Array.from({ length: 13 }, (_, i) => {
    const y = -r + 4 + i * 4;
    return `M${-r} ${y + 9} L${r} ${y - 9}`;
  }).join(" ");

  return (
    <svg
      className={className}
      viewBox="-32 -32 64 64"
      aria-hidden="true"
      focusable="false"
      {...(at ? { x: at.x - at.size / 2, y: at.y - at.size / 2, width: at.size, height: at.size } : {})}
    >
      <defs>
        <clipPath id={id}>
          <path d={shadow} />
        </clipPath>
      </defs>
      <g filter="url(#ink)" transform={`rotate(${tilt})`}>
        <circle className="moon-face" r={r} />
        <path className="ink hair" d={hatch} clipPath={`url(#${id})`} />
        <path className="ink hair" d={`M0 ${-r} A${t} ${r} 0 0 ${gibbous ? 1 : 0} 0 ${r}`} />
        <circle className="ink fine" r={r} />
      </g>
    </svg>
  );
}
