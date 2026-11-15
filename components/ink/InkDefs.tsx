/**
 * The site's drawing kit: the logo's hand-drawn navy line, extended.
 *
 * One hidden <svg>, rendered once per page, holding
 *  - the "ink" filter, which gives any stroke the logo's slightly wavering,
 *    dry-brush edge, and
 *  - a small library of motifs from this stretch of coast, each drawn around
 *    its own origin with the waterline at y = 0.
 *
 * Everything else that draws (Horizon, Stamp, Kolea, MoonGlyph) refers to
 * these by id, so the whole site is drawn with one pen.
 */
export function InkDefs() {
  return (
    <svg className="ink-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink" x="-2%" y="-12%" width="104%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="drawn" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="3" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.5" result="dry" />
          <feComposite in="drawn" in2="dry" operator="in" />
        </filter>

        {/* Kānehoalani: the knife ridge at Kualoa. A saw-toothed crest with fluted
            cliffs, stepping down to the sea on its right. Sharp on purpose: drawn
            round, it reads as Diamond Head, which is the wrong side of the island. */}
        <symbol id="m-ridge" viewBox="0 -150 520 190" overflow="visible">
          <path className="wash" d="M-6 -100 L16 -108 L28 -101 L50 -124 L61 -115 L84 -142 L95 -132 L110 -150 L122 -135 L136 -141 L150 -117 L164 -122 L181 -92 L196 -97 L215 -62 L234 -65 L256 -34 C286 -18 340 -7 420 -3 C460 -1 496 0 520 0 L520 0 L-6 0 Z" />
          <path className="ink" d="M-6 -100 L16 -108 L28 -101 L50 -124 L61 -115 L84 -142 L95 -132 L110 -150 L122 -135 L136 -141 L150 -117 L164 -122 L181 -92 L196 -97 L215 -62 L234 -65 L256 -34 C286 -18 340 -7 420 -3 C460 -1 496 0 520 0" />
          <path className="ink fine" d="M50 -120 C44 -92 44 -56 48 -18" />
          <path className="ink hair" d="M84 -138 C78 -104 78 -62 82 -20" />
          <path className="ink fine" d="M110 -146 C106 -110 108 -64 114 -22" />
          <path className="ink hair" d="M136 -137 C134 -104 138 -62 146 -22" />
          <path className="ink fine" d="M164 -118 C164 -92 170 -56 180 -22" />
          <path className="ink hair" d="M196 -93 C198 -72 206 -46 216 -22" />
          <path className="ink hair" d="M234 -61 C238 -48 244 -34 252 -22" />
          <path className="ink hair" d="M16 -104 C12 -78 12 -48 16 -16" />
          <path className="ink fine" d="M-6 -6 C60 -13 150 -11 240 -9 C270 -8 290 -12 312 -18" />
        </symbol>

        {/* Mokoliʻi: a steep little cone on a low skirt of rock. */}
        <symbol id="m-mokolii" viewBox="-70 -84 140 100" overflow="visible">
          <path className="wash" d="M-66 0 C-48 -3 -34 -8 -24 -20 C-14 -34 -8 -56 -2 -68 C0 -72 3 -72 5 -68 C12 -52 18 -30 30 -16 C40 -6 54 -2 68 0 Z" />
          <path className="ink" d="M-66 0 C-48 -3 -34 -8 -24 -20 C-14 -34 -8 -56 -2 -68 C0 -72 3 -72 5 -68 C12 -52 18 -30 30 -16 C40 -6 54 -2 68 0" />
          <path className="ink hair" d="M6 -56 l7 14 M9 -40 l9 14 M16 -24 l10 12" />
          <path className="ink hair" d="M-10 -40 l-5 14 M-17 -22 l-6 10" />
        </symbol>

        {/* Waʻa kaulua: a double-hulled voyaging canoe under two crab-claw sails. */}
        <symbol id="m-waa" viewBox="-70 -78 140 100" overflow="visible">
          <path className="ink" d="M-58 -4 C-40 6 34 8 60 -6" />
          <path className="ink fine" d="M-50 10 C-30 16 30 16 52 9" />
          <path className="ink hair" d="M-30 1 L-32 13 M22 2 L22 14" />
          <path className="ink fine" d="M-22 2 L-26 -60 C-16 -44 -6 -40 6 -42 L-22 2" />
          <path className="ink fine" d="M16 2 L14 -50 C22 -38 32 -34 42 -36 L16 2" />
        </symbol>

        {/* An outrigger canoe with two paddlers. */}
        <symbol id="m-outrigger" viewBox="-60 -30 120 50" overflow="visible">
          <path className="ink" d="M-52 -3 C-30 6 30 6 54 -5" />
          <path className="ink fine" d="M-36 12 C-16 16 16 16 36 12" />
          <path className="ink hair" d="M-20 3 L-22 13 M18 3 L18 13" />
          <path className="ink fine" d="M-14 2 L-12 -10 M-12 -13 a3 3 0 1 0 0.1 0 M-12 -8 L-22 0" />
          <path className="ink fine" d="M12 2 L14 -10 M14 -13 a3 3 0 1 0 0.1 0 M14 -8 L4 0" />
        </symbol>

        {/* ʻIwa: the great frigatebird, long bent wings and a forked tail. */}
        <symbol id="m-iwa" viewBox="-50 -20 100 40" overflow="visible">
          <path className="ink" d="M-48 6 C-40 -4 -30 -12 -20 -13 C-13 -13 -8 -6 0 -4 C8 -6 13 -13 20 -13 C30 -12 40 -4 48 6" />
          <path className="ink fine" d="M0 -4 C-1 4 -4 12 -7 19 M0 -4 C1 4 4 12 7 19" />
          <path className="ink fine" d="M0 -4 L2 -9" />
        </symbol>

        {/* Swell marks, from the right-hand board of the logo. */}
        <symbol id="m-swell" viewBox="0 -8 80 16" overflow="visible">
          <path className="ink fine" d="M0 0 c12 -7 24 7 36 0 c12 -7 24 7 36 0" />
        </symbol>
        <symbol id="m-swell-s" viewBox="0 -8 40 16" overflow="visible">
          <path className="ink fine" d="M0 0 c12 -7 24 7 36 0" />
        </symbol>

        {/* A trade-wind cloud. */}
        <symbol id="m-cloud" viewBox="0 -26 76 30" overflow="visible">
          <path className="ink fine" d="M8 0 C-2 0 -2 -10 8 -11 C10 -22 26 -24 32 -15 C38 -24 56 -22 58 -11 C70 -12 72 0 62 0 Z" />
        </symbol>

        {/* Kōlea: the golden plover that winters on Hawaiʻi's lawns. */}
        <symbol id="m-kolea" viewBox="-50 -70 100 76" overflow="visible">
          <path className="ink" d="M-24 -52 C-25 -60 -17 -66 -10 -62 C-5 -59 -4 -52 -7 -47" />
          <path className="ink fine" d="M-24 -53 L-36 -52" />
          <path className="ink" d="M-7 -47 C8 -50 24 -44 36 -36 C40 -33 44 -30 48 -28" />
          <path className="ink" d="M-22 -46 C-24 -34 -16 -22 0 -20 C14 -18 30 -24 42 -30" />
          <path className="ink hair" d="M-2 -36 C10 -38 22 -34 32 -29" />
          <path className="ink fine" d="M-4 -20 L-8 -2 L-14 2 M-8 -2 L-3 2" />
          <path className="ink fine" d="M8 -20 L10 -2 L4 2 M10 -2 L15 2" />
          <g className="ink-dot">
            <circle cx="-16" cy="-56" r="1.7" />
            <circle cx="4" cy="-40" r="1.1" />
            <circle cx="12" cy="-42" r="1.1" />
            <circle cx="9" cy="-33" r="1.1" />
            <circle cx="19" cy="-38" r="1.1" />
            <circle cx="25" cy="-33" r="1.1" />
            <circle cx="17" cy="-30" r="1" />
            <circle cx="-6" cy="-32" r="1" />
          </g>
        </symbol>

        {/* The two boards from the logo, stood in the sand. */}
        <symbol id="m-boards" viewBox="-50 -120 100 130" overflow="visible">
          <path className="wash" d="M-30 0 C-40 -40 -36 -84 -20 -104 C-6 -86 -2 -40 -12 0 Z" />
          <path className="ink" d="M-30 0 C-40 -40 -36 -84 -20 -104 C-6 -86 -2 -40 -12 0" />
          <path className="wash" d="M-4 0 C-14 -46 -8 -96 12 -116 C30 -94 34 -44 22 0 Z" />
          <path className="ink" d="M-4 0 C-14 -46 -8 -96 12 -116 C30 -94 34 -44 22 0" />
          <path className="ink hair" d="M12 -104 C13 -84 13 -70 12 -58" />
          <path className="ink hair" d="M-2 -34 c5 -4 10 4 15 0 c5 -4 8 3 11 0 M-1 -24 c5 -4 10 4 15 0 c5 -4 8 3 10 0 M0 -14 c5 -4 10 4 14 0 c4 -4 7 3 9 0" />
          <path className="ink hair" d="M-22 -62 c-4 -5 -9 -1 -6 3 c-5 0 -5 6 0 6 c-1 5 5 6 6 1 c3 4 8 1 5 -3 c5 -1 3 -7 -1 -5 c1 -4 -4 -6 -4 -2" />
        </symbol>
      </defs>
    </svg>
  );
}
