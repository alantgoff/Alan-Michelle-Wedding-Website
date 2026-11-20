/**
 * The site's drawing kit: the logo's hand-drawn navy line, extended.
 *
 * One hidden <svg>, rendered once per page, holding
 *  - the "ink" filter, which gives any stroke the logo's slightly wavering,
 *    dry-brush edge, and
 *  - a small library of motifs from this stretch of coast, each drawn around
 *    its own origin with the waterline at y = 0.
 *
 * Everything else that draws (Horizon, Stamp) refers to
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
          {/* Two ranges behind, fading back, then the crest itself. */}
          <path className="ink hair ridge-far" d="M262 -96 C280 -100 292 -92 306 -98 C322 -104 334 -92 352 -90 C370 -86 382 -70 400 -60 C430 -44 470 -28 520 -18" />
          <path className="wash" d="M150 -112 L168 -118 L182 -110 L200 -126 L214 -114 L232 -122 L250 -104 L268 -108 L288 -86 L306 -88 L330 -64 C360 -46 400 -26 460 -12 C490 -6 510 -2 524 0 L524 0 L150 0 Z" />
          <path className="ink fine" d="M150 -112 L168 -118 L182 -110 L200 -126 L214 -114 L232 -122 L250 -104 L268 -108 L288 -86 L306 -88 L330 -64 C360 -46 400 -26 460 -12 C490 -6 510 -2 524 0" />
          <path className="ink hair" d="M200 -122 C198 -100 200 -80 206 -60 M232 -118 C232 -98 236 -82 242 -66 M268 -104 C270 -90 274 -80 280 -70 M306 -86 C308 -76 312 -68 318 -60" />
          <path className="wash" d="M-6 -100 L16 -108 L28 -101 L50 -124 L61 -115 L84 -142 L95 -132 L110 -150 L122 -135 L136 -141 L150 -117 L164 -122 L181 -92 L196 -97 L215 -62 L234 -65 L256 -34 C286 -18 340 -7 420 -3 C460 -1 496 0 520 0 L520 0 L-6 0 Z" />
          <path className="ink" d="M-6 -100 L16 -108 L28 -101 L50 -124 L61 -115 L84 -142 L95 -132 L110 -150 L122 -135 L136 -141 L150 -117 L164 -122 L181 -92 L196 -97 L215 -62 L234 -65 L256 -34 C286 -18 340 -7 420 -3 C460 -1 496 0 520 0" />
          {/* The fluted cliffs: main flutes, finer ones between, and shading on the faces turned from the light. */}
          <path className="ink fine" d="M50 -120 C44 -92 44 -56 48 -18" />
          <path className="ink hair" d="M84 -138 C78 -104 78 -62 82 -20" />
          <path className="ink fine" d="M110 -146 C106 -110 108 -64 114 -22" />
          <path className="ink hair" d="M136 -137 C134 -104 138 -62 146 -22" />
          <path className="ink fine" d="M164 -118 C164 -92 170 -56 180 -22" />
          <path className="ink hair" d="M196 -93 C198 -72 206 -46 216 -22" />
          <path className="ink hair" d="M234 -61 C238 -48 244 -34 252 -22" />
          <path className="ink hair" d="M16 -104 C12 -78 12 -48 16 -16" />
          <path className="ink hair" d="M37 -107.4 C34 -77.4 35 -47.4 38 -14 M70 -122.6 C67 -92.6 68 -62.6 71 -27.6 M102 -137.4 C99 -107.4 100 -77.4 103 -42.4 M129 -135.0 C126 -105.0 127 -75.0 130 -40.0 M157 -116.5 C154 -86.5 155 -56.5 158 -21.5 M188 -91.3 C185 -61.3 186 -31.3 189 -14 M224 -60.4 C221 -30.4 222 -0.4 225 -14 M245 -46.5 C242 -16.5 243 13.5 246 -14" />
          <path className="ink hair ridge-hatch" d="M18.0 -102.8 l-14.7 46.0 M21.2 -95.8 l-14.7 46.0 M22.9 -100.0 l-14.7 46.0 M26.1 -93.0 l-14.7 46.0 M53.3 -117.3 l-14.7 46.0 M56.5 -110.3 l-14.7 46.0 M58.3 -113.2 l-14.7 46.0 M61.5 -106.2 l-14.7 46.0 M87.9 -134.5 l-14.7 46.0 M91.1 -127.5 l-14.7 46.0 M93.2 -129.7 l-14.7 46.0 M96.4 -122.7 l-14.7 46.0 M114.2 -140.7 l-14.7 46.0 M117.4 -133.7 l-14.7 46.0 M119.4 -134.3 l-14.7 46.0 M122.6 -127.3 l-14.7 46.0 M137.4 -134.6 l-14.7 46.0 M140.6 -127.6 l-14.7 46.0 M141.9 -126.9 l-14.7 46.0 M145.1 -119.9 l-14.7 46.0 M146.5 -119.0 l-14.7 46.0 M149.7 -112.0 l-14.7 46.0 M166.1 -114.2 l-14.7 46.0 M169.3 -107.2 l-14.7 46.0 M171.2 -105.4 l-14.7 46.0 M174.4 -98.4 l-14.7 46.0 M176.4 -96.1 l-14.7 46.0 M179.6 -89.1 l-14.7 46.0 M181.4 -88.1 l-13.0 40.6 M196.2 -92.6 l-14.7 46.0 M199.4 -85.6 l-14.7 46.0 M202.0 -81.9 l-13.7 43.0 M205.2 -74.9 l-13.7 43.0 M207.8 -71.2 l-12.0 37.6 M211.0 -64.2 l-12.0 37.6 M213.4 -61.0 l-10.4 32.5 M216.6 -54.0 l-10.4 32.5 M236.9 -56.9 l-9.7 30.4 M240.1 -49.9 l-9.7 30.4 M242.4 -49.2 l-8.5 26.6 M245.6 -42.2 l-8.5 26.6 M247.2 -42.4 l-7.4 23.2 M250.4 -35.4 l-7.4 23.2 M252.8 -34.6 l-6.2 19.3 M256.0 -27.6 l-6.2 19.3 M257.6 -29.2 l-5.3 16.6 M260.8 -22.2 l-5.3 16.6 M263.3 -26.1 l-4.8 15.0 M266.5 -19.1 l-4.8 15.0 M268.9 -23.1 l-4.3 13.6 M272.1 -16.1 l-4.3 13.6 M273.1 -20.9 l-4.0 12.4 M276.3 -13.9 l-4.0 12.4 M277.6 -18.5 l-3.6 11.2 M280.8 -11.5 l-3.6 11.2 M283.3 -15.5 l-3.1 9.7 M286.5 -8.5 l-3.1 9.7 M288.2 -13.5 l-2.3 7.2 M294.0 -12.4 l-2.2 6.7 M298.8 -11.4 l-2.0 6.3 M303.1 -10.5 l-1.9 6.0" />
          {/* Trees along the foot, and the shore. */}
          <path className="ink hair" d="M-2 -7.8 c1.3 -6.3 5.6 -6.3 6.9 0 M6.1 -8.5 c0.9 -4.7 4.3 -4.7 5.2 0 M12.2 -9.0 c0.8 -4.2 3.8 -4.2 4.6 0 M19.0 -9.5 c0.9 -4.5 4.1 -4.5 5.0 0 M25.8 -9.9 c1.1 -5.3 4.8 -5.3 5.9 0 M32.9 -10.3 c1.2 -6.2 5.6 -6.2 6.8 0 M40.9 -10.7 c1.2 -5.9 5.3 -5.9 6.5 0 M48.5 -10.9 c1.1 -5.3 4.7 -5.3 5.8 0 M55.5 -11.0 c1.0 -4.8 4.3 -4.8 5.3 0 M63.5 -11.0 c1.3 -6.4 5.8 -6.4 7.1 0 M72.1 -10.8 c1.3 -6.7 6.0 -6.7 7.3 0 M80.8 -10.5 c1.0 -5.2 4.7 -5.2 5.7 0 M89.0 -10.0 c1.2 -5.9 5.3 -5.9 6.5 0 M96.6 -9.5 c1.4 -7.0 6.3 -7.0 7.7 0 M105.8 -8.8 c1.0 -4.8 4.3 -4.8 5.3 0 M113.3 -8.2 c1.0 -5.0 4.5 -5.0 5.5 0 M120.1 -7.7 c0.8 -4.2 3.8 -4.2 4.6 0 M125.6 -7.3 c1.1 -5.7 5.2 -5.7 6.3 0 M133.2 -6.7 c1.2 -5.8 5.2 -5.8 6.4 0 M141.2 -6.1 c1.1 -5.4 4.8 -5.4 5.9 0 M149.9 -5.6 c1.1 -5.5 4.9 -5.5 6.0 0 M157.8 -5.3 c1.3 -6.6 5.9 -6.6 7.3 0 M166.4 -5.1 c0.9 -4.5 4.0 -4.5 4.9 0 M173.8 -5.0 c1.3 -6.5 5.8 -6.5 7.1 0 M182.4 -5.1 c0.9 -4.6 4.1 -4.6 5.0 0 M189.6 -5.3 c1.4 -6.8 6.1 -6.8 7.5 0 M198.5 -5.6 c1.4 -6.9 6.2 -6.9 7.5 0 M208.8 -6.2 c1.2 -5.8 5.2 -5.8 6.4 0 M216.9 -6.8 c0.9 -4.3 3.9 -4.3 4.7 0 M222.4 -7.2 c1.4 -6.9 6.2 -6.9 7.6 0 M231.5 -7.9 c1.2 -6.1 5.5 -6.1 6.7 0 M239.6 -8.6 c1.3 -6.5 5.8 -6.5 7.1 0 M248.9 -9.3 c1.0 -4.9 4.4 -4.9 5.4 0 M255.4 -28.9 c1.2 -6.2 5.5 -6.2 6.8 0 M263.2 -24.2 c0.9 -4.7 4.2 -4.7 5.2 0 M270.2 -20.4 c1.3 -6.6 5.9 -6.6 7.2 0 M279.6 -15.4 c1.0 -4.8 4.4 -4.8 5.3 0 M287.5 -11.7 c0.9 -4.6 4.2 -4.6 5.1 0 M293.3 -11.0 c1.0 -4.8 4.3 -4.8 5.3 0 M300.2 -10.9 c0.8 -4.2 3.8 -4.2 4.6 0 M305.8 -6 c1.0 -5.1 4.6 -5.1 5.6 0 M313.3 -6 c0.9 -4.4 4.0 -4.4 4.8 0 M319.5 -6 c1.3 -6.7 6.0 -6.7 7.3 0 M329.8 -6 c1.2 -6.0 5.4 -6.0 6.6 0" />
          <g className="ink-dot ridge-stipple">
            <circle cx="187.0" cy="-6.8" r="0.5" />
            <circle cx="44.9" cy="-6.0" r="0.7" />
            <circle cx="11.2" cy="-4.2" r="0.8" />
            <circle cx="5.7" cy="-5.5" r="0.8" />
            <circle cx="291.3" cy="-7.6" r="0.6" />
            <circle cx="224.3" cy="-3.1" r="0.7" />
            <circle cx="308.1" cy="-6.4" r="0.6" />
            <circle cx="6.8" cy="-3.8" r="1.0" />
            <circle cx="203.6" cy="-6.3" r="0.7" />
            <circle cx="154.3" cy="-7.5" r="0.7" />
            <circle cx="233.8" cy="-6.3" r="0.6" />
            <circle cx="102.0" cy="-5.2" r="0.9" />
            <circle cx="319.8" cy="-7.6" r="0.9" />
            <circle cx="24.1" cy="-4.9" r="0.8" />
            <circle cx="174.8" cy="-4.6" r="0.6" />
            <circle cx="235.8" cy="-5.5" r="0.9" />
            <circle cx="288.1" cy="-7.2" r="0.9" />
            <circle cx="235.9" cy="-7.8" r="0.6" />
            <circle cx="225.2" cy="-3.8" r="0.7" />
            <circle cx="253.8" cy="-4.4" r="0.6" />
            <circle cx="292.8" cy="-5.1" r="0.8" />
            <circle cx="112.6" cy="-5.5" r="0.7" />
            <circle cx="219.2" cy="-7.2" r="1.0" />
            <circle cx="288.3" cy="-5.3" r="0.5" />
            <circle cx="278.8" cy="-3.2" r="0.9" />
            <circle cx="133.5" cy="-3.2" r="0.9" />
            <circle cx="253.0" cy="-5.9" r="0.7" />
            <circle cx="276.3" cy="-7.0" r="0.5" />
            <circle cx="183.3" cy="-3.7" r="0.7" />
            <circle cx="200.0" cy="-3.1" r="0.9" />
            <circle cx="122.3" cy="-4.2" r="0.6" />
            <circle cx="186.5" cy="-3.2" r="0.8" />
            <circle cx="194.8" cy="-5.2" r="0.8" />
            <circle cx="25.7" cy="-6.3" r="0.9" />
            <circle cx="204.6" cy="-7.8" r="0.8" />
            <circle cx="317.9" cy="-4.0" r="0.7" />
            <circle cx="281.5" cy="-3.9" r="0.5" />
            <circle cx="233.0" cy="-5.4" r="0.9" />
            <circle cx="124.3" cy="-3.9" r="0.6" />
            <circle cx="235.2" cy="-4.7" r="0.8" />
            <circle cx="185.9" cy="-5.6" r="0.8" />
            <circle cx="141.0" cy="-6.8" r="0.7" />
            <circle cx="268.3" cy="-7.0" r="1.0" />
            <circle cx="26.8" cy="-3.4" r="1.0" />
          </g>
          <path className="ink fine" d="M-6 -6 C60 -13 150 -11 240 -9 C270 -8 290 -12 312 -18" />
          <path className="ink hair" d="M300 4 c8 -4 13 4 21 0 c8 -4 13 4 21 0 M380 6 c6 -3 10 3 16 0 c6 -3 10 3 16 0" />
        </symbol>

        {/* Mokoliʻi: a steep little cone on a low skirt of rock. */}
        <symbol id="m-mokolii" viewBox="-70 -84 140 100" overflow="visible">
          <path className="wash" d="M-66 0 C-48 -3 -34 -8 -24 -20 C-14 -34 -8 -56 -2 -68 C0 -72 3 -72 5 -68 C12 -52 18 -30 30 -16 C40 -6 54 -2 68 0 Z" />
          <path className="ink" d="M-66 0 C-48 -3 -34 -8 -24 -20 C-14 -34 -8 -56 -2 -68 C0 -72 3 -72 5 -68 C12 -52 18 -30 30 -16 C40 -6 54 -2 68 0" />
          <path className="ink hair" d="M6 -56 l7 14 M9 -40 l9 14 M16 -24 l10 12" />
          <path className="ink hair" d="M-10 -40 l-5 14 M-17 -22 l-6 10" />
          <path className="ink hair ridge-hatch" d="M7.0 -63.0 l-2.5 10.0 M10.7 -58.4 l-3.2 12.9 M14.4 -53.8 l-3.9 15.6 M18.1 -49.2 l-4.5 18.0 M21.8 -44.5 l-5.0 19.9 M25.5 -39.9 l-5.3 21.2 M29.2 -35.3 l-5.5 21.9 M32.8 -30.7 l-5.5 21.9 M36.5 -26.1 l-5.3 21.2 M40.2 -21.5 l-5.0 19.9 M43.9 -16.8 l-4.5 18.0 M47.6 -12.2 l-3.9 15.6 M51.3 -7.6 l-3.2 12.9 M55.0 -3.0 l-2.5 10.0" />
          <path className="ink hair" d="M-6 -66 c1 -4 4 -5 6 -3 c2 -3 6 -2 6 2 M-14 -46 c1 -3 4 -4 6 -2 M-22 -28 c1 -3 4 -3 5 -1 M14 -40 c1 -3 4 -3 5 -1" />
          <path className="ink fine" d="M-40 -6 C-30 -9 -22 -12 -16 -16 M24 -10 C34 -6 44 -4 54 -3" />
          <path className="ink hair" d="M-66 3 c6 -3 10 3 16 0 c6 -3 10 3 16 0 M38 3 c6 -3 10 3 16 0 c6 -3 10 3 14 0 M-30 8 c5 -2 8 2 12 0 M20 8 c5 -2 8 2 12 0" />
        </symbol>

        {/* Waʻa kaulua: a double-hulled voyaging canoe under two crab-claw sails. */}
        <symbol id="m-waa" viewBox="-70 -78 140 100" overflow="visible">
          <path className="ink" d="M-58 -4 C-40 6 34 8 60 -6" />
          <path className="ink fine" d="M-50 10 C-30 16 30 16 52 9" />
          <path className="ink hair" d="M-56 -4 C-60 -8 -62 -12 -60 -16 M58 -6 C62 -10 64 -14 62 -18" />
          <path className="ink hair" d="M-30 1 L-32 13 M-6 2 L-7 14 M22 2 L22 14 M38 0 L39 12" />
          <path className="ink hair" d="M-40 -1 C-20 2 20 2 46 -3" />
          <path className="ink fine" d="M-22 2 L-26 -60 C-16 -44 -6 -40 6 -42 L-22 2" />
          <path className="ink hair" d="M-24 -30 C-16 -26 -8 -26 -2 -28 M-24 -44 C-18 -40 -12 -40 -6 -40 M-23 -16 C-14 -12 -6 -14 0 -16" />
          <path className="ink fine" d="M16 2 L14 -50 C22 -38 32 -34 42 -36 L16 2" />
          <path className="ink hair" d="M15 -26 C22 -22 28 -22 32 -24 M15 -38 C20 -34 26 -33 30 -34" />
          <path className="ink hair" d="M-26 -60 L-50 -4 M14 -50 L54 -6" />
          <path className="ink hair" d="M-44 18 c6 -3 10 3 16 0 c6 -3 10 3 16 0 M14 18 c6 -3 10 3 16 0" />
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
          <path className="ink hair" d="M-40 0 l3 5 M-34 -5 l3 6 M-27 -9 l2 6 M40 0 l-3 5 M34 -5 l-3 6 M27 -9 l-2 6" />
          <path className="ink fine" d="M0 -4 C-1 4 -4 12 -7 19 M0 -4 C1 4 4 12 7 19" />
          <path className="ink fine" d="M0 -4 L2 -9" />
        </symbol>

        {/* Swell marks, from the right-hand board of the logo. */}
        <symbol id="m-swell" viewBox="0 -8 80 16" overflow="visible">
          <path className="ink fine" d="M0 0 c12 -7 24 7 36 0 c12 -7 24 7 36 0" />
          <path className="ink hair" d="M10 6 c8 -4 14 4 22 0 M46 6 c8 -4 14 4 22 0" />
        </symbol>
        <symbol id="m-swell-s" viewBox="0 -8 40 16" overflow="visible">
          <path className="ink fine" d="M0 0 c12 -7 24 7 36 0" />
          <path className="ink hair" d="M8 6 c8 -4 14 4 22 0" />
        </symbol>

        {/* A trade-wind cloud. */}
        <symbol id="m-cloud" viewBox="0 -26 76 30" overflow="visible">
          <path className="wash" d="M8 0 C-2 0 -2 -10 8 -11 C10 -22 26 -24 32 -15 C38 -24 56 -22 58 -11 C70 -12 72 0 62 0 Z" />
          <path className="ink fine" d="M8 0 C-2 0 -2 -10 8 -11 C10 -22 26 -24 32 -15 C38 -24 56 -22 58 -11 C70 -12 72 0 62 0 Z" />
          <path className="ink hair" d="M14 -8 C16 -14 24 -16 28 -11 M40 -12 C44 -17 52 -16 54 -10 M20 -3 h30" />
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
