import { PLUMERIA_CENTRE, PLUMERIA_INK, PLUMERIA_PETAL, PLUMERIA_TURNS } from "./plumeria-shape";

/**
 * Our seal: a small round stamp, two rings with the site's plumeria inside.
 * It means "from us" wherever it appears: an event we planned, a place we
 * pick. Decorative; the words beside it say what it means.
 */
export function Seal({ className = "seal" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14.6" fill="#fffdf8" stroke={PLUMERIA_INK} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="11.8" fill="none" stroke={PLUMERIA_INK} strokeWidth="0.7" strokeDasharray="1.4 1.6" />
      <g transform="translate(16 16) scale(0.27) translate(-32 -32)">
        {PLUMERIA_TURNS.map((turn) => (
          <path key={turn} d={PLUMERIA_PETAL} transform={`rotate(${turn} 32 32)`} fill="#fffdf8" stroke={PLUMERIA_INK} strokeWidth="3.6" strokeLinejoin="round" />
        ))}
        <circle cx="32" cy="32" r="6" fill={PLUMERIA_CENTRE} />
      </g>
    </svg>
  );
}
