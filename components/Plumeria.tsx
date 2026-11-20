import { PLUMERIA_CENTRE, PLUMERIA_INK, PLUMERIA_PETAL, PLUMERIA_TURNS, PLUMERIA_VEIN } from "./plumeria-shape";

/**
 * A small pressed plumeria in the logo's ink, with a yellow throat bleeding
 * out into the petals and a vein down each one. Decorative.
 */
export function Plumeria({ className = "plumeria-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {PLUMERIA_TURNS.map((turn) => (
        <path
          key={turn}
          d={PLUMERIA_PETAL}
          transform={`rotate(${turn} 32 32)`}
          fill="#fffdf8"
          stroke={PLUMERIA_INK}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      ))}
      {/* the throat: two soft rings of yellow, so no gradient id can clash when several flowers share a page */}
      <circle cx="32" cy="32" r="15" fill={PLUMERIA_CENTRE} opacity="0.28" />
      <circle cx="32" cy="32" r="10" fill={PLUMERIA_CENTRE} opacity="0.45" />
      {PLUMERIA_TURNS.map((turn) => (
        <path
          key={`v${turn}`}
          d={PLUMERIA_VEIN}
          transform={`rotate(${turn} 32 32)`}
          fill="none"
          stroke={PLUMERIA_INK}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
      ))}
      <circle cx="32" cy="32" r="5" fill={PLUMERIA_CENTRE} stroke={PLUMERIA_INK} strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  );
}
