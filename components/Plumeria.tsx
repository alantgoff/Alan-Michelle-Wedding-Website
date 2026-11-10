import { PLUMERIA_CENTRE, PLUMERIA_INK, PLUMERIA_PETAL, PLUMERIA_TURNS } from "./plumeria-shape";

/** A small pressed plumeria in the logo's ink. Decorative. */
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
      <circle cx="32" cy="32" r="6" fill={PLUMERIA_CENTRE} />
    </svg>
  );
}
