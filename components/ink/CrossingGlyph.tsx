/**
 * A thumbnail of each road over the Koʻolau, in the logo's line: the ridge,
 * and how the road gets past it. Sketches, not sections; nothing is to scale.
 */

const RIDGE = "M4 74 C26 70 40 44 62 30 C74 22 82 34 96 26 C110 18 120 12 134 22 C150 34 166 52 186 62 C204 70 220 73 236 74";
/** The same ridge closed along the ground, so the road can pass behind it. */
const LAND = `${RIDGE} L236 86 L4 86 Z`;

export function CrossingGlyph({ id }: { id: "h3" | "likelike" | "pali" }) {
  return (
    <svg className="crossing-glyph" viewBox="0 0 240 90" aria-hidden="true" focusable="false">
      {id === "h3" ? (
        <>
          <path className="wash" d={LAND} />
          <g filter="url(#ink)">
            <path className="ink fine" d={RIDGE} />
            {/* In at one side, a long bore, and out onto a viaduct on tall legs. */}
            <path className="ink fine" d="M4 60 C22 58 40 56 54 54" />
            <path className="ink hair crossing-bore" d="M54 54 L150 50" />
            <path className="ink fine" d="M150 50 C176 49 206 50 236 52" />
            <path className="ink hair" d="M166 50 V63 M184 50 V70 M202 51 V74 M220 52 V76" />
            <path className="ink fine" d="M50 58 a5 5 0 0 1 8 0 M146 54 a5 5 0 0 1 8 0" />
          </g>
        </>
      ) : null}
      {id === "likelike" ? (
        <>
          <path className="wash" d={LAND} />
          <g filter="url(#ink)">
            <path className="ink fine" d={RIDGE} />
            {/* Up the valley, one short tunnel, and down in bends to the bay. */}
            <path className="ink fine" d="M4 80 C22 78 34 72 44 64 C50 60 56 58 62 58" />
            <path className="ink hair crossing-bore" d="M62 58 L128 56" />
            <path className="ink fine" d="M128 56 C142 56 148 62 158 62 C170 62 172 70 184 71 C200 72 218 78 236 80" />
            <path className="ink fine" d="M58 62 a5 5 0 0 1 8 0 M124 60 a5 5 0 0 1 8 0" />
          </g>
        </>
      ) : null}
      {id === "pali" ? (
        <>
          <path className="wash" d={LAND} />
          <g filter="url(#ink)">
            <path className="ink fine" d={RIDGE} />
            {/* The old way: up to the gap, where the wind comes through. */}
            <path className="ink fine" d="M4 80 C24 76 40 62 56 48 C66 40 74 40 84 36" />
            <path className="ink hair crossing-bore" d="M84 36 L108 30" />
            <path className="ink fine" d="M108 30 C124 36 136 50 152 58 C176 70 206 78 236 80" />
            {/* The lookout rail, and the wind. */}
            <path className="ink hair" d="M88 22 h14 M90 22 v6 M95 22 v6 M100 22 v6" />
            <path className="ink hair" d="M122 12 c8 -4 14 2 22 -2 M128 20 c8 -4 16 2 26 -2 M118 4 c6 -3 12 1 18 -1" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
