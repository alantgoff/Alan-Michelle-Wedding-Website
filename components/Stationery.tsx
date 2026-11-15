import { PLUMERIA_CENTRE, PLUMERIA_PETAL, PLUMERIA_TURNS } from "./plumeria-shape";

/**
 * Paper goods for the Registry page: a stamp and a postmark, both in the
 * logo's one navy ink. Decorative only. The stamp carries a word, never a
 * price or a country, so it cannot be mistaken for postage.
 */

export function Stamp({ word }: { word: string }) {
  return (
    <span className="stamp" aria-hidden="true">
      <span className="stamp-face">
        <svg viewBox="0 0 64 64" focusable="false">
          {PLUMERIA_TURNS.map((turn) => (
            <path key={turn} className="stamp-petal" d={PLUMERIA_PETAL} transform={`rotate(${turn} 32 32)`} />
          ))}
          <circle cx="32" cy="32" r="6" fill={PLUMERIA_CENTRE} />
        </svg>
        <span className="stamp-word">{word}</span>
      </span>
    </span>
  );
}

/** A round cancellation: the place around the rim, the date across the middle, three waves beside it. */
export function Postmark({ id, place, date, turn = -12 }: { id: string; place: string; date: string; turn?: number }) {
  return (
    <svg className="postmark" viewBox="0 0 190 110" style={{ rotate: `${turn}deg` }} aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M55 55 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
      </defs>
      <g filter="url(#ink)">
        <circle className="ink fine" cx="55" cy="55" r="48" />
        <circle className="ink hair" cx="55" cy="55" r="29" />
        {/* The cancel: the waves from the logo's right-hand board. */}
        <path className="ink fine" d="M106 38 c10 -6 20 6 30 0 c10 -6 20 6 30 0 c7 -4 13 0 18 2 M108 55 c10 -6 20 6 30 0 c10 -6 20 6 30 0 c7 -4 13 0 18 2 M106 72 c10 -6 20 6 30 0 c10 -6 20 6 30 0 c7 -4 13 0 18 2" />
      </g>
      <text className="postmark-rim">
        <textPath href={`#${id}`} startOffset="25%" textAnchor="middle">
          {place}
        </textPath>
      </text>
      <text className="postmark-date" x="55" y="59" textAnchor="middle">
        {date}
      </text>
    </svg>
  );
}
