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

        {/* ---- One drawing per page: what that page is about. ---- */}

        {/* Honu, a green sea turtle, seen through the water */}
        <symbol id="m-honu" viewBox="-40 -36 80 72" overflow="visible">
          <path className="wash" d="M-18 0 C-18 -10 -8 -15 2 -15 C12 -15 19 -9 19 0 C19 9 12 15 2 15 C-8 15 -18 10 -18 0 Z" />
          <path className="ink fine" d="M10 -12 C15 -20 14 -30 3 -34 C7 -26 5 -19 -2 -14 M10 12 C15 20 14 30 3 34 C7 26 5 19 -2 14" />
          <path className="ink hair" d="M8 -18 C9 -24 8 -28 5 -30 M8 18 C9 24 8 28 5 30" />
          <path className="ink fine" d="M-14 -9 C-20 -15 -27 -15 -29 -10 C-25 -9 -21 -7 -17 -5 M-14 9 C-20 15 -27 15 -29 10 C-25 9 -21 7 -17 5" />
          <path className="ink" d="M-18 0 C-18 -10 -8 -15 2 -15 C12 -15 19 -9 19 0 C19 9 12 15 2 15 C-8 15 -18 10 -18 0 Z" />
          <path className="ink hair" d="M-15 0 C-15 -8 -7 -12 2 -12 C10 -12 16 -7 16 0 C16 7 10 12 2 12 C-7 12 -15 8 -15 0" />
          <path className="ink hair" d="M-9 0 L-4 -5 L5 -5 L10 0 L5 5 L-4 5 Z M-4 -5 L-6 -12.5 M5 -5 L6 -13.5 M10 0 L16 -6 M10 0 L16 6 M5 5 L6 13.5 M-4 5 L-6 12.5 M-9 0 L-16 -4 M-9 0 L-16 4" />
          <path className="ink fine" d="M19 -4 C24 -6 30 -4 31 0 C30 4 24 6 19 4 M-18 0 l-5 1" />
          <path className="ink-dot" d="M25.6 -1.6 a0.9 0.9 0 1 0 1.8 0 a0.9 0.9 0 1 0 -1.8 0" />
          <path className="ink hair" d="M-34 -24 c5 -2 9 2 14 0 M22 -26 c4 -2 8 2 12 0 M-30 26 c5 -2 9 2 14 0" />
        </symbol>

        {/* The turtle snorkel charter: a catamaran with its dive flag up */}
        <symbol id="m-catamaran" viewBox="-82 -70 170 86" overflow="visible">
          <path className="wash" d="M-72 -10 C-66 2 54 4 70 -10 Z" />
          <path className="ink" d="M-72 -10 C-66 2 54 4 70 -10 L-72 -10" />
          <path className="ink hair" d="M-66 -5 C-30 -1 30 -1 64 -6" />
          <path className="wash" d="M-30 -10 L-26 -27 L30 -27 L36 -10 Z" />
          <path className="ink fine" d="M-30 -10 L-26 -27 L30 -27 L36 -10" />
          <path className="ink hair" d="M-24 -22 h10 v6 h-10 Z M-8 -22 h10 v6 h-10 Z M8 -22 h12 v6 h-12 Z" />
          <path className="ink fine" d="M-34 -38 C-10 -41 18 -41 40 -38 M-30 -38 L-28 -27 M36 -38 L33 -27" />
          <path className="ink hair" d="M-56 -10 v-7 M-46 -10 v-7 M-56 -14 h10 M54 -10 l-3 -10 M60 -10 l-2 -8 M51 -20 l7 2" />
          <path className="ink fine" d="M18 -41 L18 -66" />
          <path className="ink fine" d="M18 -64 h16 v11 h-16" />
          <path className="ink hair" d="M20.2 -64 L18 -62.4 M22.4 -64 L18 -60.8 M24.6 -64 L18 -59.2 M34 -54.6 L31.8 -53 M34 -56.2 L29.6 -53 M34 -57.8 L27.4 -53" />
          <path className="ink fine" d="M-54.4 -19 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0 M-52 -16.6 v5 M-46.2 -18 a2.2 2.2 0 1 0 4.4 0 a2.2 2.2 0 1 0 -4.4 0 M-44 -15.8 v5" />
          <path className="ink hair" d="M-72 -10 L-76 7 M-69 -10 L-73 7 M-75.5 -4 h4 M-74.5 1.5 h4" />
          <path className="ink hair" d="M70 -10 c5 2 9 6 14 7 M66 -2 c6 1 10 4 16 4" />
          <path className="ink hair" d="M-86 3 c6 -3 10 3 16 0 c6 -3 10 3 16 0 M30 9 c6 -3 10 3 16 0" />
        </symbol>

        {/* A snorkeler: head, mask and snorkel just above the water */}
        <symbol id="m-snorkeler" viewBox="-24 -16 48 24" overflow="visible">
          <path className="ink fine" d="M-4 0 A4.2 4.2 0 0 1 4.4 0" />
          <path className="ink hair" d="M-2.6 -1.4 h5.4 v-2.6 h-5.4 Z" />
          <path className="ink fine" d="M3.6 -2.2 L5.6 -12 L8 -12" />
          <path className="ink hair" d="M-12 1 c3 -2 6 2 9 0 M4 1 c3 -2 6 2 9 0 M-6 4 c3 -1.6 5 1.6 8 0" />
          <path className="ink hair" d="M-16 0 l-5 -5 M-18 0 l-6 -2" />
        </symbol>

        {/* A beach umbrella and two chairs: the beach meetups */}
        <symbol id="m-umbrella" viewBox="-64 -82 128 88" overflow="visible">
          <path className="wash" d="M-62 0 C-40 -7 40 -7 62 0 Z" />
          <path className="ink" d="M-62 0 C-40 -7 40 -7 62 0" />
          <path className="ink-dot" d="M-46.5 -2 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M-38.5 -4 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M-24.6 -3 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M-12.6 -5 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M1.4 -4 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M15.4 -5 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M29.4 -3 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M43.5 -2 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M-30.6 -1 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M7.5 -1 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M37.5 -1 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0 M-52.5 -1 a0.55 0.55 0 1 0 1.1 0 a0.55 0.55 0 1 0 -1.1 0" />
          <path className="ink fine" d="M1 -2 L5 -74" />
          <path className="wash" d="M-34 -52 C-24 -72 28 -80 42 -60 Z" />
          <path className="ink" d="M-34 -52 C-24 -72 28 -80 42 -60" />
          <path className="ink fine" d="M-34 -52 q7.6 3.2 15.2 -1.6 q7.6 3.2 15.2 -1.6 q7.6 3.2 15.2 -1.6 q7.6 3.2 15.2 -1.6 q7.6 3.2 15.2 -1.6" />
          <path className="ink hair" d="M4 -74 L-18.8 -53.6 M4 -74 L-3.6 -55.2 M4 -74 L11.6 -56.8 M4 -74 L26.8 -58.4" />
          <path className="ink hair" d="M-30.2 -53.4 L-11.4 -64.3 M-26.4 -53.8 L-9.7 -64.5 M-22.6 -54.2 L-8.0 -64.6 M0.2 -56.6 L2.3 -65.7 M4.0 -57.0 L4.0 -65.9 M7.8 -57.4 L5.7 -66.1 M30.6 -59.8 L16.0 -67.2 M34.4 -60.2 L17.7 -67.3 M38.2 -60.6 L19.4 -67.5" />
          <path className="ink fine" d="M12 -10 L32 -10 M12 -10 L6 -28 M14 -10 L10 -3 M30 -10 L34 -3 M7 -24 L13 -10" />
          <path className="ink hair" d="M8 -21 L14 -10 M9.5 -17 L15 -10" />
          <path className="ink fine" d="M-30 -9 L-12 -9 M-30 -9 L-36 -26 M-28 -9 L-32 -3 M-14 -9 L-10 -3" />
          <path className="ink hair" d="M-34 -20 L-28 -9 M-33 -16 L-27 -9" />
          <path className="ink hair" d="M40 -3 v-8 h13 v8 M40 -8 h13" />
        </symbol>

        {/* Coming in to land: an airliner and its contrail */}
        <symbol id="m-plane" viewBox="-160 -40 230 64" overflow="visible">
          <path className="ink hair trail" d="M-58 4 C-90 10 -120 16 -158 26 M-56 -2 C-88 2 -120 6 -156 14" />
          <path className="wash" d="M-52 2 C-40 -4 30 -6 46 -4 C54 -3 57 2 50 4 C30 8 -40 8 -52 2 Z" />
          <path className="ink" d="M-52 2 C-40 -4 30 -6 46 -4 C54 -3 57 2 50 4 C30 8 -40 8 -52 2 Z" />
          <path className="ink fine" d="M-44 0 L-55 -19 L-47 -19 L-33 -3" />
          <path className="ink hair" d="M-50 -12 L-44 -12" />
          <path className="ink hair" d="M0 -4 L-12 -13 L-6 -13 L8 -4" />
          <path className="wash" d="M-6 4 L-22 19 L-13 19 L10 4 Z" />
          <path className="ink fine" d="M-6 4 L-22 19 L-13 19 L10 4" />
          <path className="ink fine" d="M-15 9 h11 a3 3 0 0 1 0 6 h-11 a3 3 0 0 1 0 -6 M-15 9 v6" />
          <path className="ink hair" d="M-26 -1 h2 M-22 -1 h2 M-18 -1 h2 M-14 -1 h2 M-10 -1 h2 M-6 -1 h2 M-2 -1 h2 M2 -1 h2 M6 -1 h2 M10 -1 h2 M14 -1 h2 M18 -1 h2 M22 -1 h2 M26 -1 h2 M30 -1 h2 M34 -1 h2 M42 -3 l6 1" />
        </symbol>

        {/* Lēʻahi (Diamond Head), with its lighthouse */}
        <symbol id="m-diamondhead" viewBox="-6 -80 292 86" overflow="visible">
          <path className="wash" d="M0 0 C40 -6 80 -20 120 -34 C150 -44 170 -60 196 -66 C204 -68 212 -64 220 -56 C236 -40 252 -20 280 0 Z" />
          <path className="ink" d="M0 0 C40 -6 80 -20 120 -34 C150 -44 170 -60 196 -66 C204 -68 212 -64 220 -56 C236 -40 252 -20 280 0" />
          <path className="ink hair" d="M150 -44 C164 -48 176 -54 188 -58 M204 -66 C200 -60 196 -58 190 -58" />
          <path className="ink hair ridge-hatch" d="M48.7 -6.8 C47.2 -6.5 49.7 -4.7 48.2 -2.9 M58.4 -10.0 C56.9 -9.8 59.4 -8.1 57.9 -6.5 M66.3 -12.5 C64.8 -10.3 67.3 -7.1 65.8 -3.9 M74.9 -15.3 C73.4 -12.3 75.9 -8.6 74.4 -4.8 M81.3 -17.5 C79.8 -14.9 82.3 -11.4 80.8 -8.0 M88.3 -19.9 C86.8 -16.5 89.3 -12.5 87.8 -8.5 M96.6 -22.8 C95.1 -20.3 97.6 -16.9 96.1 -13.6 M103.5 -25.2 C102.0 -21.4 104.5 -17.0 103.0 -12.7 M113.2 -28.6 C111.7 -22.3 114.2 -16.0 112.7 -9.8 M119.8 -30.9 C118.3 -23.9 120.8 -17.0 119.3 -10.2 M126.3 -33.3 C124.8 -26.4 127.3 -19.6 125.8 -12.9 M132.9 -35.7 C131.4 -30.9 133.9 -25.8 132.4 -20.7 M142.3 -39.2 C140.8 -32.7 143.3 -26.4 141.8 -20.1 M149.2 -41.7 C147.7 -30.7 150.2 -20.9 148.7 -11.2 M158.7 -47.5 C157.2 -38.9 159.7 -30.9 158.2 -22.9 M168.5 -53.8 C167.0 -42.7 169.5 -33.0 168.0 -23.2 M177.2 -57.7 C175.7 -48.8 178.2 -40.7 176.7 -32.5 M187.0 -61.0 C185.5 -49.0 188.0 -38.5 186.5 -28.0 M196.9 -64.0 C195.4 -50.7 197.9 -39.2 196.4 -27.7 M204.1 -64.0 C202.6 -54.1 205.1 -45.2 203.6 -36.2 M210.7 -61.7 C209.2 -53.2 211.7 -45.3 210.2 -37.4 M217.0 -56.5 C215.5 -47.0 218.0 -38.3 216.5 -29.7 M225.4 -48.6 C223.9 -41.5 226.4 -34.6 224.9 -27.8 M234.1 -39.9 C232.6 -32.6 235.1 -25.7 233.6 -18.8 M241.4 -31.3 C239.9 -24.0 242.4 -17.1 240.9 -10.1 M249.3 -21.4 C247.8 -18.3 250.3 -14.5 248.8 -10.7 M257.2 -14.3 C255.7 -12.0 258.2 -8.7 256.7 -5.5 M263.4 -9.8 C261.9 -8.3 264.4 -5.7 262.9 -3.0" />
          <path className="ink hair" d="M8.6 -1 C6.6 -9.4 13 -12.4 15 -8.4 C21.4 -10.4 21.4 -2 19.4 -1 M14 -1 v1 M18.5 -1 C16.5 -9.2 21 -12.2 23 -8.2 C27.5 -10.2 27.5 -2 25.5 -1 M22 -1 v1 M25.6 -1 C23.6 -8.3 29 -11.3 31 -7.3 C36.4 -9.3 36.4 -2 34.4 -1 M30 -1 v1 M56.5 -1 C54.5 -6.2 59 -9.2 61 -5.2 C65.5 -7.2 65.5 -2 63.5 -1 M60 -1 v1 M66.0 -1 C64.0 -9.8 69 -12.8 71 -8.8 C76.0 -10.8 76.0 -2 74.0 -1 M70 -1 v1 M100.0 -1 C98.0 -9.0 103 -12.0 105 -8.0 C110.0 -10.0 110.0 -2 108.0 -1 M104 -1 v1 M106.2 -1 C104.2 -9.8 111 -12.8 113 -8.8 C119.8 -10.8 119.8 -2 117.8 -1 M112 -1 v1 M155.6 -1 C153.6 -7.4 159 -10.4 161 -6.4 C166.4 -8.4 166.4 -2 164.4 -1 M160 -1 v1 M165.2 -1 C163.2 -9.1 169 -12.1 171 -8.1 C176.8 -10.1 176.8 -2 174.8 -1 M170 -1 v1 M174.2 -1 C172.2 -9.0 177 -12.0 179 -8.0 C183.8 -10.0 183.8 -2 181.8 -1 M178 -1 v1 M222.5 -1 C220.5 -9.4 227 -12.4 229 -8.4 C235.5 -10.4 235.5 -2 233.5 -1 M228 -1 v1 M234.4 -1 C232.4 -9.8 237 -12.8 239 -8.8 C243.6 -10.8 243.6 -2 241.6 -1 M238 -1 v1" />
          <path className="wash" d="M259 0 L261 -15 L265 -15 L267 0 Z" />
          <path className="ink fine" d="M259 0 L261 -15 L265 -15 L267 0 M260 -15 h6 M261.5 -15 v-3 h3 v3" />
        </symbol>

        {/* Waikīkī's hotel towers, palms along the sand */}
        <symbol id="m-towers" viewBox="-6 -72 170 76" overflow="visible">
          <path className="wash" d="M0 0 V-34 H14 V0 Z M18 0 V-52 H34 V0 Z M38 0 V-44 H50 V0 Z M53 0 V-64 H71 V0 Z M77 0 V-40 H91 V0 Z M94 0 V-56 H110 V0 Z M115 0 V-30 H135 V0 Z M141 0 V-48 H155 V0 Z" />
          <path className="ink fine" d="M0 0 V-34 H14 V0 M18 0 V-52 H34 V0 M38 0 V-44 H50 V0 M53 0 V-64 H71 V0 M77 0 V-40 H91 V0 M94 0 V-56 H110 V0 M115 0 V-30 H135 V0 M141 0 V-48 H155 V0" />
          <path className="ink hair" d="M2 -29 h10 M2 -24 h10 M2 -19 h10 M2 -14 h10 M2 -9 h10 M2 -4 h10 M20 -47 h12 M20 -42 h12 M20 -37 h12 M20 -32 h12 M20 -27 h12 M20 -22 h12 M20 -17 h12 M20 -12 h12 M20 -7 h12 M40 -39 h8 M40 -34 h8 M40 -29 h8 M40 -24 h8 M40 -19 h8 M40 -14 h8 M40 -9 h8 M40 -4 h8 M55 -59 h14 M55 -54 h14 M55 -49 h14 M55 -44 h14 M55 -39 h14 M55 -34 h14 M55 -29 h14 M55 -24 h14 M55 -19 h14 M55 -14 h14 M55 -9 h14 M55 -4 h14 M79 -35 h10 M79 -30 h10 M79 -25 h10 M79 -20 h10 M79 -15 h10 M79 -10 h10 M79 -5 h10 M96 -51 h12 M96 -46 h12 M96 -41 h12 M96 -36 h12 M96 -31 h12 M96 -26 h12 M96 -21 h12 M96 -16 h12 M96 -11 h12 M96 -6 h12 M117 -25 h16 M117 -20 h16 M117 -15 h16 M117 -10 h16 M117 -5 h16 M143 -43 h10 M143 -38 h10 M143 -33 h10 M143 -28 h10 M143 -23 h10 M143 -18 h10 M143 -13 h10 M143 -8 h10" />
          <path className="ink fine" d="M10 0 C10 -15.0 12.0 -25.5 14 -30 M14 -30 Q9.3 -35.7 6.2 -30.5 M14 -30 Q11.7 -37.9 10.2 -34.2 M14 -30 Q15.8 -38.1 17.1 -34.5 M14 -30 Q18.4 -36.1 21.4 -31.2 M14 -30 Q19.3 -33.9 22.9 -27.6 M70 0 C70 -13.0 68.5 -22.1 67 -26 M67 -26 Q62.3 -31.7 59.2 -26.5 M67 -26 Q64.7 -33.9 63.2 -30.2 M67 -26 Q68.8 -34.1 70.1 -30.5 M67 -26 Q71.4 -32.1 74.4 -27.2 M67 -26 Q72.3 -29.9 75.9 -23.6 M132 0 C132 -16.0 133.5 -27.2 135 -32 M135 -32 Q130.3 -37.7 127.2 -32.5 M135 -32 Q132.7 -39.9 131.2 -36.2 M135 -32 Q136.8 -40.1 138.1 -36.5 M135 -32 Q139.4 -38.1 142.4 -33.2 M135 -32 Q140.3 -35.9 143.9 -29.6" />
        </symbol>

        {/* The wedding-day shuttle */}
        <symbol id="m-shuttle" viewBox="-40 -26 80 30" overflow="visible">
          <path className="wash" d="M-32 -2 L-32 -17 C-32 -20 -30 -21 -27 -21 L25 -21 C30 -21 33 -17 34 -11 L34 -2 Z" />
          <path className="ink" d="M-32 -2 L-32 -17 C-32 -20 -30 -21 -27 -21 L25 -21 C30 -21 33 -17 34 -11 L34 -2 Z" />
          <path className="ink hair" d="M-28 -17 h7 v6 h-7 Z M-18 -17 h7 v6 h-7 Z M-8 -17 h7 v6 h-7 Z M2 -17 h7 v6 h-7 Z M12 -17 h7 v6 h-7 Z M23 -17 h6 C31 -15 32 -13 32 -11 h-9 Z" />
          <path className="ink hair" d="M-32 -7 h66 M20 -11 v9" />
          <path className="wash" d="M-24 -2 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M18 -2 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
          <path className="ink fine" d="M-24 -2 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M18 -2 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
          <path className="ink-dot" d="M-21.2 -2 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 M20.8 -2 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0" />
        </symbol>

        {/* Two coconut palms leaning over the sand */}
        <symbol id="m-palms" viewBox="-52 -124 134 128" overflow="visible">
          <path className="ink fine" d="M-2 0 C-1 -44.1 -10.0 -78.4 -22 -98 M3 0 C3 -44.1 -6.0 -78.4 -18 -97 M24 0 C25 -34.2 33.6 -60.8 48 -76 M29 0 C29 -34.2 37.6 -60.8 52 -75" />
          <path className="ink hair" d="M-2.8 -8.2 l4.8 -1 M-3.5 -16.3 l4.8 -1 M-4.6 -24.5 l4.8 -1 M-5.8 -32.7 l4.8 -1 M-7.3 -40.8 l4.8 -1 M-9.0 -49.0 l4.8 -1 M-10.8 -57.2 l4.8 -1 M-12.9 -65.3 l4.8 -1 M-15.0 -73.5 l4.8 -1 M-17.3 -81.7 l4.8 -1 M-19.8 -89.8 l4.8 -1 M24.1 -6.3 l4.8 -1 M25.0 -12.7 l4.8 -1 M26.2 -19.0 l4.8 -1 M27.7 -25.3 l4.8 -1 M29.5 -31.7 l4.8 -1 M31.5 -38.0 l4.8 -1 M33.7 -44.3 l4.8 -1 M36.1 -50.7 l4.8 -1 M38.7 -57.0 l4.8 -1 M41.5 -63.3 l4.8 -1 M44.5 -69.7 l4.8 -1" />
          <path className="ink fine" d="M-20 -98 Q-35.0 -105.8 -47.2 -83.3 M-20 -98 Q-32.6 -112.9 -42.9 -97.6 M-20 -98 Q-25.3 -115.3 -29.6 -105.1 M-20 -98 Q-21.7 -120.6 -23.1 -117.4 M-20 -98 Q-14.6 -116.3 -10.2 -107.1 M-20 -98 Q-7.4 -111.5 3.0 -94.8 M-20 -98 Q-5.4 -105.5 6.6 -82.8 M50 -76 Q37.4 -83.5 27.1 -60.8 M50 -76 Q40.2 -90.5 32.2 -75.3 M50 -76 Q44.8 -95.3 40.6 -87.4 M50 -76 Q55.9 -97.4 60.8 -91.1 M50 -76 Q60.4 -90.4 68.9 -74.9 M50 -76 Q63.4 -84.3 74.4 -62.2" />
          <path className="ink hair" d="M-28.7 -100.0 l2.6 7.4 M-28.7 -100.0 l-2.6 7.4 M-32.9 -98.9 l2.2 6.4 M-32.9 -98.9 l-2.2 6.4 M-37.0 -96.5 l1.9 5.3 M-37.0 -96.5 l-1.9 5.3 M-40.9 -92.7 l1.5 4.2 M-40.9 -92.7 l-1.5 4.2 M-44.8 -87.5 l1.1 3.2 M-44.8 -87.5 l-1.1 3.2 M-27.4 -104.2 l2.6 7.4 M-27.4 -104.2 l-2.6 7.4 M-30.9 -105.3 l2.2 6.4 M-30.9 -105.3 l-2.2 6.4 M-34.3 -105.0 l1.9 5.3 M-34.3 -105.0 l-1.9 5.3 M-37.6 -103.3 l1.5 4.2 M-37.6 -103.3 l-1.5 4.2 M-40.9 -100.3 l1.1 3.2 M-40.9 -100.3 l-1.1 3.2 M-23.1 -105.9 l2.6 7.4 M-23.1 -105.9 l-2.6 7.4 M-24.6 -108.0 l2.2 6.4 M-24.6 -108.0 l-2.2 6.4 M-26.0 -108.9 l1.9 5.3 M-26.0 -108.9 l-1.9 5.3 M-27.4 -108.5 l1.5 4.2 M-27.4 -108.5 l-1.5 4.2 M-28.8 -106.9 l1.1 3.2 M-28.8 -106.9 l-1.1 3.2 M-21.0 -109.2 l2.6 7.4 M-21.0 -109.2 l-2.6 7.4 M-21.5 -113.1 l2.2 6.4 M-21.5 -113.1 l-2.2 6.4 M-21.9 -115.8 l1.9 5.3 M-21.9 -115.8 l-1.9 5.3 M-22.4 -117.4 l1.5 4.2 M-22.4 -117.4 l-1.5 4.2 M-22.8 -117.8 l1.1 3.2 M-22.8 -117.8 l-1.1 3.2 M-16.8 -106.5 l2.6 7.4 M-16.8 -106.5 l-2.6 7.4 M-15.3 -108.9 l2.2 6.4 M-15.3 -108.9 l-2.2 6.4 M-13.9 -110.0 l1.9 5.3 M-13.9 -110.0 l-1.9 5.3 M-12.5 -109.9 l1.5 4.2 M-12.5 -109.9 l-1.5 4.2 M-11.1 -108.6 l1.1 3.2 M-11.1 -108.6 l-1.1 3.2 M-12.6 -103.4 l2.6 7.4 M-12.6 -103.4 l-2.6 7.4 M-9.1 -104.0 l2.2 6.4 M-9.1 -104.0 l-2.2 6.4 M-5.7 -103.3 l1.9 5.3 M-5.7 -103.3 l-1.9 5.3 M-2.4 -101.2 l1.5 4.2 M-2.4 -101.2 l-1.5 4.2 M0.9 -97.8 l1.1 3.2 M0.9 -97.8 l-1.1 3.2 M-11.5 -99.8 l2.6 7.4 M-11.5 -99.8 l-2.6 7.4 M-7.4 -98.7 l2.2 6.4 M-7.4 -98.7 l-2.2 6.4 M-3.4 -96.2 l1.9 5.3 M-3.4 -96.2 l-1.9 5.3 M0.5 -92.3 l1.5 4.2 M0.5 -92.3 l-1.5 4.2 M4.2 -87.1 l1.1 3.2 M4.2 -87.1 l-1.1 3.2 M42.7 -77.8 l2.6 7.4 M42.7 -77.8 l-2.6 7.4 M39.1 -76.6 l2.2 6.4 M39.1 -76.6 l-2.2 6.4 M35.7 -74.1 l1.9 5.3 M35.7 -74.1 l-1.9 5.3 M32.4 -70.3 l1.5 4.2 M32.4 -70.3 l-1.5 4.2 M29.2 -65.0 l1.1 3.2 M29.2 -65.0 l-1.1 3.2 M44.3 -82.0 l2.6 7.4 M44.3 -82.0 l-2.6 7.4 M41.5 -83.0 l2.2 6.4 M41.5 -83.0 l-2.2 6.4 M38.9 -82.7 l1.9 5.3 M38.9 -82.7 l-1.9 5.3 M36.3 -81.0 l1.5 4.2 M36.3 -81.0 l-1.5 4.2 M33.8 -78.0 l1.1 3.2 M33.8 -78.0 l-1.1 3.2 M47.0 -85.1 l2.6 7.4 M47.0 -85.1 l-2.6 7.4 M45.5 -87.9 l2.2 6.4 M45.5 -87.9 l-2.2 6.4 M44.1 -89.4 l1.9 5.3 M44.1 -89.4 l-1.9 5.3 M42.8 -89.6 l1.5 4.2 M42.8 -89.6 l-1.5 4.2 M41.4 -88.7 l1.1 3.2 M41.4 -88.7 l-1.1 3.2 M53.5 -86.4 l2.6 7.4 M53.5 -86.4 l-2.6 7.4 M55.1 -89.7 l2.2 6.4 M55.1 -89.7 l-2.2 6.4 M56.7 -91.7 l1.9 5.3 M56.7 -91.7 l-1.9 5.3 M58.3 -92.5 l1.5 4.2 M58.3 -92.5 l-1.5 4.2 M59.8 -92.1 l1.1 3.2 M59.8 -92.1 l-1.1 3.2 M56.1 -81.9 l2.6 7.4 M56.1 -81.9 l-2.6 7.4 M59.0 -82.9 l2.2 6.4 M59.0 -82.9 l-2.2 6.4 M61.8 -82.5 l1.9 5.3 M61.8 -82.5 l-1.9 5.3 M64.5 -80.8 l1.5 4.2 M64.5 -80.8 l-1.5 4.2 M67.2 -77.7 l1.1 3.2 M67.2 -77.7 l-1.1 3.2 M57.8 -78.2 l2.6 7.4 M57.8 -78.2 l-2.6 7.4 M61.6 -77.3 l2.2 6.4 M61.6 -77.3 l-2.2 6.4 M65.2 -75.0 l1.9 5.3 M65.2 -75.0 l-1.9 5.3 M68.8 -71.3 l1.5 4.2 M68.8 -71.3 l-1.5 4.2 M72.2 -66.3 l1.1 3.2 M72.2 -66.3 l-1.1 3.2" />
          <path className="ink-dot" d="M-23.8 -95 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M-19.8 -94 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M-21.8 -92 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M46.2 -73 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M50.2 -72 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M48.2 -70 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0" />
          <path className="ink hair" d="M-30 0 C-10 -3 30 -3 60 0" />
        </symbol>

        {/* The Mokulua, two islets off Lanikai */}
        <symbol id="m-mokulua" viewBox="-100 -46 202 56" overflow="visible">
          <path className="wash" d="M-96 0 C-82 -6 -70 -28 -56 -36 C-48 -40 -42 -34 -36 -36 C-26 -40 -18 -28 -10 -14 C-6 -6 -2 -2 6 0 Z M30 0 C40 -8 52 -28 62 -31 C72 -29 82 -10 98 0 Z" />
          <path className="ink" d="M-96 0 C-82 -6 -70 -28 -56 -36 C-48 -40 -42 -34 -36 -36 C-26 -40 -18 -28 -10 -14 C-6 -6 -2 -2 6 0 M30 0 C40 -8 52 -28 62 -31 C72 -29 82 -10 98 0" />
          <path className="ink hair ridge-hatch" d="M-40.0 -34.0 l-1.5 5.0 M-37.3 -31.3 l-1.5 6.7 M-34.5 -28.5 l-1.5 8.2 M-31.8 -25.8 l-1.5 9.5 M-29.1 -23.1 l-1.5 10.5 M-26.4 -20.4 l-1.5 10.9 M-23.6 -17.6 l-1.5 10.9 M-20.9 -14.9 l-1.5 10.5 M-18.2 -12.2 l-1.5 9.5 M-15.5 -9.5 l-1.5 8.2 M-12.7 -6.7 l-1.5 6.7 M-10.0 -4.0 l-1.5 5.0 M64.0 -28.0 l-1.2 4.0 M67.4 -24.3 l-1.2 6.2 M70.9 -20.6 l-1.2 7.9 M74.3 -16.9 l-1.2 8.9 M77.7 -13.1 l-1.2 8.9 M81.1 -9.4 l-1.2 7.9 M84.6 -5.7 l-1.2 6.2 M88.0 -2.0 l-1.2 4.0" />
          <path className="ink hair" d="M-62 -32 c1 -3 4 -4 6 -2 M-46 -36 c1 -3 4 -3 5 -1 M58 -28 c1 -3 4 -3 5 -1" />
          <path className="ink hair" d="M-96 3 c6 -3 10 3 16 0 c6 -3 10 3 16 0 M-4 3 c6 -3 10 3 14 0 M26 3 c6 -3 10 3 16 0 M86 3 c6 -3 10 3 14 0" />
        </symbol>

        {/* A waterfall in the Koʻolau */}
        <symbol id="m-falls" viewBox="-6 -124 226 132" overflow="visible">
          <path className="wash" d="M0 0 C10 -30 22 -70 38 -98 L48 -110 L56 -102 L66 -116 L76 -106 L88 -120 L98 -110 L110 -118 L122 -104 L132 -110 C150 -84 182 -36 214 0 Z" />
          <path className="ink" d="M0 0 C10 -30 22 -70 38 -98 L48 -110 L56 -102 L66 -116 L76 -106 L88 -120 L98 -110 L110 -118 L122 -104 L132 -110 C150 -84 182 -36 214 0" />
          <path className="ink hair ridge-hatch" d="M18 -38.4 C15 -34.4 19 -26.9 17 -19.5 M26 -59.1 C23 -47.4 27 -34.1 25 -20.8 M34 -79.7 C31 -62.8 35 -45.6 33 -28.5 M42 -94.8 C39 -75.3 43 -56.1 41 -37.0 M50 -100.0 C47 -81.7 51 -63.4 49 -45.2 M58 -96.8 C55 -73.9 59 -52.2 57 -30.5 M66 -108.0 C63 -82.3 67 -58.6 65 -34.8 M74 -100.0 C71 -78.9 75 -58.5 73 -38.1 M82 -105.0 C79 -82.6 83 -61.4 81 -40.1 M116 -103.0 C113 -83.8 117 -64.9 115 -46.0 M124 -97.2 C121 -81.5 125 -65.2 123 -48.9 M132 -102.0 C129 -81.7 133 -62.0 131 -42.3 M140 -91.5 C137 -71.9 141 -52.7 139 -33.5 M148 -80.9 C145 -68.1 149 -54.0 147 -39.9 M156 -70.4 C153 -54.9 157 -38.8 155 -22.7 M164 -59.9 C161 -50.7 165 -39.3 163 -27.9 M172 -49.3 C169 -42.5 173 -32.9 171 -23.4 M180 -38.4 C177 -34.9 181 -27.8 179 -20.7 M190 -24.7 C187 -21.5 191 -14.6 189 -7.7" />
          <path className="wash" d="M96 -104 C94 -76 98 -44 95 -6 L107 -6 C105 -44 108 -76 104 -104 Z" />
          <path className="ink fine" d="M96 -104 C94 -76 98 -44 95 -6 M104 -104 C104 -76 108 -44 107 -6" />
          <path className="ink hair" d="M99 -96 C98 -66 101 -38 99 -12 M102 -94 C102 -66 104 -38 103 -10" />
          <path className="ink hair" d="M84 -4 c4 -3 8 -3 10 0 M104 -4 c3 -3 8 -3 11 0 M78 2 C90 -1 110 -1 122 2" />
          <path className="ink hair" d="M30 -4 c1 -4 4 -5 6 -2 M160 -4 c1 -4 4 -5 6 -2 M172 -6 c1 -3 4 -4 5 -1" />
        </symbol>

        {/* A kayak with its paddler */}
        <symbol id="m-kayak" viewBox="-44 -30 88 38" overflow="visible">
          <path className="wash" d="M-36 0 C-20 4 20 4 36 0 C20 -3 -20 -3 -36 0 Z" />
          <path className="ink fine" d="M-36 0 C-20 4 20 4 36 0 C20 -3 -20 -3 -36 0 Z" />
          <path className="ink fine" d="M0 -2 L1 -13 M-1.4 -16.4 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M1 -10 L-6 -14 M1 -10 L8 -6" />
          <path className="ink fine" d="M-16 -22 L18 -4" />
          <path className="ink fine" d="M-16 -22 c-3 -3 -6 -2 -5 1 c1 2 4 2 5 -1 M18 -4 c3 3 6 2 5 -1 c-1 -2 -4 -2 -5 1" />
          <path className="ink hair" d="M-42 4 c5 -2 9 2 14 0 M20 5 c5 -2 9 2 14 0" />
        </symbol>

        {/* Vermont: snowy pines and a chairlift */}
        <symbol id="m-chairlift" viewBox="-52 -86 104 90" overflow="visible">
          <path className="wash" d="M-32 -52 L-36.7 -36.7 L-34.1 -36.7 L-41.3 -19.3 L-36.2 -19.3 L-46.0 -2.0 L-18.0 -2.0 L-27.8 -19.3 L-22.7 -19.3 L-29.9 -36.7 L-27.3 -36.7 Z M-14 -38 L-17.3 -27.3 L-15.5 -27.3 L-20.7 -14.7 L-17.0 -14.7 L-24.0 -2.0 L-4.0 -2.0 L-11.0 -14.7 L-7.3 -14.7 L-12.5 -27.3 L-10.7 -27.3 Z M34 -44 L30.0 -31.3 L32.2 -31.3 L26.0 -16.7 L30.4 -16.7 L22.0 -2.0 L46.0 -2.0 L37.6 -16.7 L42.0 -16.7 L35.8 -31.3 L38.0 -31.3 Z" />
          <path className="ink fine" d="M-32 -52 L-36.7 -36.7 L-34.1 -36.7 L-41.3 -19.3 L-36.2 -19.3 L-46.0 -2.0 L-18.0 -2.0 L-27.8 -19.3 L-22.7 -19.3 L-29.9 -36.7 L-27.3 -36.7 Z M-14 -38 L-17.3 -27.3 L-15.5 -27.3 L-20.7 -14.7 L-17.0 -14.7 L-24.0 -2.0 L-4.0 -2.0 L-11.0 -14.7 L-7.3 -14.7 L-12.5 -27.3 L-10.7 -27.3 Z M34 -44 L30.0 -31.3 L32.2 -31.3 L26.0 -16.7 L30.4 -16.7 L22.0 -2.0 L46.0 -2.0 L37.6 -16.7 L42.0 -16.7 L35.8 -31.3 L38.0 -31.3 Z M-32 -2.0 V0 M-14 -2.0 V0 M34 -2.0 V0" />
          <path className="ink hair" d="M-35.7 -37.7 q1.9 -2 3.7 0 M-39.5 -20.3 q3.7 -2 7.5 0 M-43.2 -3.0 q5.6 -2 11.2 0 M-16.7 -28.3 q1.3 -2 2.7 0 M-19.3 -15.7 q2.7 -2 5.3 0 M-22.0 -3.0 q4.0 -2 8.0 0 M30.8 -32.3 q1.6 -2 3.2 0 M27.6 -17.7 q3.2 -2 6.4 0 M24.4 -3.0 q4.8 -2 9.6 0" />
          <path className="ink fine" d="M-50 -80 L52 -60" />
          <path className="ink fine" d="M8 -71 L8 -52 M1 -52 h14 M1 -52 v-7 M15 -52 l2 5" />
          <path className="ink fine" d="M2.3 -56 a2.2 2.2 0 1 0 4.4 0 a2.2 2.2 0 1 0 -4.4 0 M9.3 -56 a2.2 2.2 0 1 0 4.4 0 a2.2 2.2 0 1 0 -4.4 0" />
          <path className="ink hair" d="M-50 0 C-20 -4 20 -4 52 0" />
        </symbol>

        {/* Yosemite: Half Dome */}
        <symbol id="m-halfdome" viewBox="-70 -88 136 92" overflow="visible">
          <path className="wash" d="M-66 0 C-60 -20 -48 -50 -30 -68 C-16 -80 4 -84 18 -80 C24 -78 26 -74 26 -70 L28 -20 C30 -10 40 -4 62 0 Z" />
          <path className="ink" d="M-66 0 C-60 -20 -48 -50 -30 -68 C-16 -80 4 -84 18 -80 C24 -78 26 -74 26 -70 L28 -20 C30 -10 40 -4 62 0" />
          <path className="ink hair ridge-hatch" d="M19.0 -78.0 L20.0 -46 M20.6 -76.8 L21.6 -42 M22.2 -75.6 L23.2 -38 M23.8 -74.4 L24.8 -34 M25.4 -73.2 L26.4 -30" />
          <path className="ink hair" d="M-44 -50 C-30 -66 -10 -74 10 -74 M-52 -32 C-38 -50 -16 -62 6 -64 M-58 -16 C-44 -34 -22 -46 2 -50" />
          <path className="ink hair" d="M-60 0 l3 -9 l3 9 M-57 -9 v-3 M-50 0 l3 -9 l3 9 M-47 -9 v-3 M-40 0 l3 -9 l3 9 M-37 -9 v-3 M34 0 l3 -9 l3 9 M37 -9 v-3 M44 0 l3 -9 l3 9 M47 -9 v-3 M52 0 l3 -9 l3 9 M55 -9 v-3" />
        </symbol>

        {/* Bali: a split gate */}
        <symbol id="m-gate" viewBox="-48 -90 96 94" overflow="visible">
          <path className="wash" d="M-42 0 L-42 -16 L-38 -16 L-38 -30 L-34 -30 L-34 -44 L-28 -44 L-28 -56 L-22 -56 L-20 -68 L-14 -68 L-11 -78 L-6 -86 L-6 0 Z M42 0 L42 -16 L38 -16 L38 -30 L34 -30 L34 -44 L28 -44 L28 -56 L22 -56 L20 -68 L14 -68 L11 -78 L6 -86 L6 0 Z" />
          <path className="ink fine" d="M-42 0 L-42 -16 L-38 -16 L-38 -30 L-34 -30 L-34 -44 L-28 -44 L-28 -56 L-22 -56 L-20 -68 L-14 -68 L-11 -78 L-6 -86 L-6 0 Z M42 0 L42 -16 L38 -16 L38 -30 L34 -30 L34 -44 L28 -44 L28 -56 L22 -56 L20 -68 L14 -68 L11 -78 L6 -86 L6 0 Z" />
          <path className="ink hair" d="M-40 -8 h30 M-36 -24 h28 M-32 -38 h24 M-26 -50 h18 M-19 -62 h11 M40 -8 h-30 M36 -24 h-28 M32 -38 h-24 M26 -50 h-18 M19 -62 h-11" />
          <path className="ink hair" d="M-6 0 L-4 -4 L4 -4 L6 0 M-5 -2 h10 M-11 -78 h-4 M11 -78 h4" />
        </symbol>

        {/* Iceland: a waterfall off a flat cliff */}
        <symbol id="m-icefalls" viewBox="-62 -72 124 76" overflow="visible">
          <path className="wash" d="M-60 -58 C-40 -60 -20 -62 -14 -62 L-15 0 L-60 0 Z M14 -62 C30 -62 44 -60 60 -58 L60 0 L15 0 Z" />
          <path className="ink" d="M-60 -58 C-40 -60 -20 -62 -14 -62 L-15 -2 M14 -62 C30 -62 44 -60 60 -58 M14 -62 L15 -2" />
          <path className="ink hair" d="M-10 -62 C-11 -44 -9 -24 -10 -6 M-6 -62 C-7 -44 -5 -24 -6 -6 M-2 -62 C-3 -44 -1 -24 -2 -6 M2 -62 C1 -44 3 -24 2 -6 M6 -62 C5 -44 7 -24 6 -6 M10 -62 C9 -44 11 -24 10 -6" />
          <path className="ink hair ridge-hatch" d="M-56 -58.24 l-1 14 M-51 -58.54 l-1 20 M-46 -58.84 l-1 26 M-41 -59.14 l-1 14 M-36 -59.44 l-1 20 M-31 -59.74 l-1 26 M-26 -60.04 l-1 14 M-21 -60.34 l-1 20 M18 -61.68 l-1 14 M23 -61.28 l-1 20 M28 -60.88 l-1 26 M33 -60.48 l-1 14 M38 -60.08 l-1 20 M43 -59.68 l-1 26 M48 -59.28 l-1 14 M53 -58.88 l-1 20 M58 -58.48 l-1 26" />
          <path className="ink hair" d="M-18 -2 c2 -4 6 -5 8 -2 c2 -4 6 -4 8 -1 c2 -3 6 -3 8 0 c2 -3 5 -2 6 1" />
        </symbol>

        {/* Japan: a torii gate and a cherry tree */}
        <symbol id="m-torii" viewBox="-48 -80 112 84" overflow="visible">
          <path className="wash" d="M-34 -60 C-12 -57 12 -57 34 -60 L36 -66 C12 -62 -12 -62 -36 -66 Z" />
          <path className="ink fine" d="M-34 -60 C-12 -57 12 -57 34 -60 L36 -66 C12 -62 -12 -62 -36 -66 Z" />
          <path className="ink fine" d="M-27 -49 h54 M-27 -45 h54 M-27 -49 v4 M27 -49 v4" />
          <path className="ink" d="M-17 -58 L-20 0 M17 -58 L20 0" />
          <path className="ink hair" d="M-3 -58 v9 h6 v-9" />
          <path className="ink fine" d="M42 0 C42 -12 38 -24 42 -34 M41 -20 C46 -26 52 -30 56 -38 M40 -28 C36 -34 32 -38 30 -42" />
          <path className="ink hair" d="M46.4 -39.8 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0 M40.7 -43.1 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M44.0 -30.7 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M41.9 -48.6 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M33.4 -41.5 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0 M46.3 -40.1 a1.3 1.3 0 1 0 2.6 0 a1.3 1.3 0 1 0 -2.6 0 M50.7 -42.4 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M38.0 -34.7 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 M43.8 -35.7 a1.7 1.7 0 1 0 3.4 0 a1.7 1.7 0 1 0 -3.4 0 M28.2 -43.1 a1.9 1.9 0 1 0 3.8 0 a1.9 1.9 0 1 0 -3.8 0 M38.5 -36.7 a1.9 1.9 0 1 0 3.8 0 a1.9 1.9 0 1 0 -3.8 0 M44.0 -40.1 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M50.4 -46.3 a1.5 1.5 0 1 0 3.0 0 a1.5 1.5 0 1 0 -3.0 0 M46.2 -48.7 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M38.9 -43.4 a1.3 1.3 0 1 0 2.6 0 a1.3 1.3 0 1 0 -2.6 0 M38.4 -35.1 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0 M33.9 -47.9 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 M56.9 -41.6 a1.9 1.9 0 1 0 3.8 0 a1.9 1.9 0 1 0 -3.8 0 M40.5 -36.4 a1.7 1.7 0 1 0 3.4 0 a1.7 1.7 0 1 0 -3.4 0 M31.2 -42.5 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M47.3 -30.2 a1.7 1.7 0 1 0 3.4 0 a1.7 1.7 0 1 0 -3.4 0 M41.2 -42.5 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0 M51.8 -44.5 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 M45.2 -33.5 a1.9 1.9 0 1 0 3.8 0 a1.9 1.9 0 1 0 -3.8 0 M30.1 -36.7 a1.7 1.7 0 1 0 3.4 0 a1.7 1.7 0 1 0 -3.4 0 M44.8 -38.1 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 M46.6 -37.2 a1.5 1.5 0 1 0 3.0 0 a1.5 1.5 0 1 0 -3.0 0 M39.3 -49.7 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0 M29.5 -39.9 a1.5 1.5 0 1 0 3.0 0 a1.5 1.5 0 1 0 -3.0 0 M34.5 -34.1 a1.7 1.7 0 1 0 3.4 0 a1.7 1.7 0 1 0 -3.4 0 M46.5 -39.3 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M40.1 -48.7 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 M42.9 -44.8 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M50.6 -40.5 a1.3 1.3 0 1 0 2.6 0 a1.3 1.3 0 1 0 -2.6 0" />
        </symbol>

        {/* Guatemala: Acatenango, with a smoking neighbour and cloud below */}
        <symbol id="m-volcano" viewBox="-80 -92 160 96" overflow="visible">
          <path className="wash" d="M-76 0 C-50 -10 -26 -40 -12 -62 L10 -62 C26 -40 50 -10 76 0 Z" />
          <path className="ink" d="M-76 0 C-50 -10 -26 -40 -12 -62 L10 -62 C26 -40 50 -10 76 0" />
          <path className="ink hair ridge-hatch" d="M14 -56.2 l-2 10 M18 -50.4 l-2 15 M22 -44.6 l-2 20 M26 -38.8 l-2 10 M30 -33.0 l-2 15 M34 -27.2 l-2 20 M38 -21.4 l-2 10 M42 -15.6 l-2 15" />
          <path className="wash" d="M-4 -64 C-12 -70 -6 -80 2 -78 C4 -88 18 -88 18 -80 C26 -84 34 -76 28 -70 C32 -66 26 -62 20 -64" />
          <path className="ink fine" d="M-4 -64 C-12 -70 -6 -80 2 -78 C4 -88 18 -88 18 -80 C26 -84 34 -76 28 -70 C32 -66 26 -62 20 -64" />
          <path className="ink hair" d="M-12 -62 C-4 -60 4 -60 10 -62" />
          <path className="wash" d="M-70 -6 C-66 -14 -54 -14 -50 -8 C-46 -14 -34 -14 -32 -6 Z M30 -6 C34 -14 46 -14 50 -8 C54 -14 66 -14 70 -6 Z" />
          <path className="ink hair" d="M-70 -6 C-66 -14 -54 -14 -50 -8 C-46 -14 -34 -14 -32 -6 M30 -6 C34 -14 46 -14 50 -8 C54 -14 66 -14 70 -6" />
        </symbol>

        {/* Kauaʻi: the peak above the proposal beach, with a heart */}
        <symbol id="m-kauai" viewBox="-52 -98 104 102" overflow="visible">
          <path className="wash" d="M-48 0 C-36 -6 -26 -24 -18 -46 C-12 -64 -6 -82 0 -84 C6 -82 10 -66 16 -48 C24 -24 34 -8 48 0 Z" />
          <path className="ink" d="M-48 0 C-36 -6 -26 -24 -18 -46 C-12 -64 -6 -82 0 -84 C6 -82 10 -66 16 -48 C24 -24 34 -8 48 0" />
          <path className="ink hair ridge-hatch" d="M-12 -60 C-13 -46 -11 -34 -13 -20 M-6 -74 C-7 -60 -5 -48 -7 -34 M2 -78 C1 -64 3 -52 1 -38 M8 -66 C7 -52 9 -40 7 -26 M14 -52 C13 -38 15 -26 13 -12 M20 -40 C19 -26 21 -14 19 0 M-18 -46 C-19 -32 -17 -20 -19 -6" />
          <path className="ink fine" d="M18 -92 c-2 -4 -8 -3 -7 1 c1 3 6 5 7 7 c1 -2 6 -4 7 -7 c1 -4 -5 -5 -7 -1" />
        </symbol>

        {/* On the line: an aloha shirt, a sundress and a hat */}
        <symbol id="m-clothesline" viewBox="-112 -100 224 104" overflow="visible">
          <path className="ink fine" d="M-100 0 L-98 -82 M-104 0 L-102 -82 M100 0 L98 -82 M104 0 L102 -82" />
          <path className="ink fine" d="M-99 -78 C-40 -64 40 -64 99 -78" />
          <path className="wash" d="M-78 -71 L-70 -73 L-64 -68 L-56 -68 L-50 -73 L-42 -71 L-36 -59 L-42 -56 L-44 -61 L-44 -30 L-76 -30 L-76 -61 L-78 -56 L-84 -59 Z" />
          <path className="ink fine" d="M-78 -71 L-70 -73 L-64 -68 L-56 -68 L-50 -73 L-42 -71 L-36 -59 L-42 -56 L-44 -61 L-44 -30 L-76 -30 L-76 -61 L-78 -56 L-84 -59 Z" />
          <path className="ink hair" d="M-60 -67 V-30 M-64 -68 L-60 -62 L-56 -68 M-70 -52 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M-73 -52 h-1.4 M-67 -52 h1.4 M-70 -55 v-1.4 M-70 -49 v1.4 M-52 -44 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M-55 -44 h-1.4 M-49 -44 h1.4 M-52 -47 v-1.4 M-52 -41 v1.4 M-66 -38 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M-69 -38 h-1.4 M-63 -38 h1.4 M-66 -41 v-1.4 M-66 -35 v1.4 M-50 -58 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M-53 -58 h-1.4 M-47 -58 h1.4 M-50 -61 v-1.4 M-50 -55 v1.4" />
          <path className="wash" d="M-7 -67 L-10 -54 C-16 -40 -22 -20 -26 -10 C-10 -6 10 -6 26 -10 C22 -20 16 -40 10 -54 L7 -67 Z" />
          <path className="ink fine" d="M-7 -67 L-10 -54 C-16 -40 -22 -20 -26 -10 C-10 -6 10 -6 26 -10 C22 -20 16 -40 10 -54 L7 -67" />
          <path className="ink hair" d="M-10 -50 C-4 -48 4 -48 10 -50 M-8 -46 L-16 -12 M0 -46 L0 -8 M8 -46 L16 -12" />
          <path className="wash" d="M34 -58 C40 -54 64 -54 70 -58 C64 -62 40 -62 34 -58 Z" />
          <path className="ink fine" d="M34 -58 C40 -54 64 -54 70 -58 C64 -62 40 -62 34 -58 Z M42 -60 C42 -71 62 -71 62 -60" />
          <path className="ink hair" d="M42 -63 C48 -61 56 -61 62 -63 M52 -70 v-1" />
          <path className="ink fine" d="M-74 -72 v-4 M-46 -72 v-4 M-5 -68 v-4 M5 -68 v-4 M52 -71 v-4" />
          <path className="ink fine" d="M30 0 c0 -3 8 -3 10 0 Z M44 0 c0 -3 8 -3 10 0 Z M35 -2 l2 -2 M49 -2 l2 -2" />
          <path className="ink hair" d="M-112 0 C-50 -2 50 -2 112 0 M-96 0 l1 -4 M-93 0 l-1 -3 M-82 0 l1 -4 M-79 0 l-1 -3 M-68 0 l1 -4 M-65 0 l-1 -3 M-54 0 l1 -4 M-51 0 l-1 -3 M-40 0 l1 -4 M-37 0 l-1 -3 M-26 0 l1 -4 M-23 0 l-1 -3 M-12 0 l1 -4 M-9 0 l-1 -3 M2 0 l1 -4 M5 0 l-1 -3 M16 0 l1 -4 M19 0 l-1 -3 M30 0 l1 -4 M33 0 l-1 -3 M44 0 l1 -4 M47 0 l-1 -3 M58 0 l1 -4 M61 0 l-1 -3 M72 0 l1 -4 M75 0 l-1 -3 M86 0 l1 -4 M89 0 l-1 -3" />
        </symbol>

        {/* A lifeguard tower: ask the lifeguard */}
        <symbol id="m-tower" viewBox="-62 -108 124 112" overflow="visible">
          <path className="ink fine" d="M-24 0 L-20 -44 M24 0 L20 -44 M-9 0 L-8 -44 M9 0 L8 -44" />
          <path className="ink hair" d="M-22 -14 L-8 -30 M-22 -30 L-8 -14 M22 -14 L8 -30 M22 -30 L8 -14" />
          <path className="ink fine" d="M-30 -44 h62" />
          <path className="wash" d="M-24 -44 L-24 -74 L24 -74 L24 -44 Z" />
          <path className="ink" d="M-24 -44 L-24 -74 L24 -74 L24 -44" />
          <path className="ink hair" d="M-16 -68 h32 v12 h-32 Z M-8 -68 v12 M0 -68 v12 M8 -68 v12 M-24 -50 h48" />
          <path className="wash" d="M-31 -74 L0 -89 L31 -74 Z" />
          <path className="ink fine" d="M-31 -74 L0 -89 L31 -74 Z" />
          <path className="ink fine" d="M0 -89 V-106 M0 -106 l14 4 l-14 4" />
          <path className="ink fine" d="M24 -44 L58 0 M28 -50 L62 -6" />
          <path className="ink hair" d="M28.0 -44.0 l3 -4 M32.3 -38.4 l3 -4 M36.6 -32.8 l3 -4 M40.9 -27.2 l3 -4 M45.2 -21.6 l3 -4 M49.5 -16.0 l3 -4 M53.8 -10.4 l3 -4" />
          <path className="ink fine" d="M-42 0 C-46 -20 -44 -40 -37 -50 C-33 -40 -31 -20 -35 0" />
          <path className="ink hair" d="M-38.5 -46 L-38 -6" />
        </symbol>

        {/* A signpost: which way to everything */}
        <symbol id="m-signpost" viewBox="-44 -92 88 96" overflow="visible">
          <path className="ink fine" d="M-2 0 L-2 -86 M3 0 L3 -86 M-2 -86 h5" />
          <path className="wash" d="M3 -78 h28 l6 5 l-6 5 h-28 Z M-2 -62 h-26 l-6 5 l6 5 h26 Z M3 -46 h24 l6 5 l-6 5 h-24 Z" />
          <path className="ink fine" d="M3 -78 h28 l6 5 l-6 5 h-28 Z M-2 -62 h-26 l-6 5 l6 5 h26 Z M3 -46 h24 l6 5 l-6 5 h-24 Z" />
          <path className="ink hair" d="M8 -73 h4 M14 -73 h8 M24 -73 h3 M-24 -57 h6 M-16 -57 h4 M-10 -57 h5 M8 -41 h7 M17 -41 h6" />
          <path className="ink hair" d="M-14 0 l2 -5 M-10 0 l-1 -4 M12 0 l1 -5 M16 0 l-2 -4" />
        </symbol>

        {/* A mailbox with its flag up, and a parcel beside it */}
        <symbol id="m-mailbox" viewBox="-36 -78 92 82" overflow="visible">
          <path className="ink fine" d="M-4 0 L-4 -40 M3 0 L3 -40 M-10 -40 h20" />
          <path className="wash" d="M-26 -40 L-26 -58 C-26 -70 22 -70 22 -58 L22 -40 Z" />
          <path className="ink" d="M-26 -40 L-26 -58 C-26 -70 22 -70 22 -58 L22 -40 Z" />
          <path className="ink hair" d="M18 -42 L18 -58 C18 -64 22 -66 22 -58 M-20 -60 C-12 -66 8 -66 16 -60" />
          <path className="ink fine" d="M-18 -50 V-74 h10 v7 h-10" />
          <path className="wash" d="M14 0 V-16 H38 V0 Z M14 -16 L20 -21 H44 L38 -16 Z M38 0 V-16 L44 -21 V-5 Z" />
          <path className="ink fine" d="M14 0 V-16 H38 V0 Z M14 -16 L20 -21 H44 L38 -16 M44 -21 V-5 L38 0" />
          <path className="ink hair" d="M26 0 V-16 L32 -21 M14 -8 H38 L44 -13 M29 -18.5 c-4 -5 -9 -2 -6 1 M29 -18.5 c4 -5 9 -2 6 1" />
        </symbol>

        {/* A message in a bottle, past the reef */}
        <symbol id="m-bottle" viewBox="-34 -22 68 32" overflow="visible">
          <path className="wash" d="M-22 2 C-24 -4 -20 -10 -12 -10 L8 -10 C12 -10 14 -8 16 -6 L24 -6 L24 0 L16 0 C14 2 12 4 8 4 L-12 4 C-18 4 -21 4 -22 2 Z" />
          <path className="ink fine" d="M-22 2 C-24 -4 -20 -10 -12 -10 L8 -10 C12 -10 14 -8 16 -6 L24 -6 L24 0 L16 0 C14 2 12 4 8 4 L-12 4 C-18 4 -21 4 -22 2 Z" />
          <path className="ink fine" d="M24 -6 h4 v6 h-4" />
          <path className="ink hair" d="M-14 -7 h18 v7 h-18 Z M-5 -7 v7 M-14 -3.5 c-2 0 -2 -3.5 0 -3.5" />
          <path className="ink hair" d="M-16 -8 l6 -0.5" />
          <path className="ink hair" d="M-32 1 c5 -2 9 2 14 0 M-6 2 c5 -2 9 2 14 0 M18 1 c5 -2 9 2 14 0" />
        </symbol>

        {/* The reef break: a line of curling waves */}
        <symbol id="m-breakers" viewBox="-84 -18 168 24" overflow="visible">
          <path className="ink fine" d="M-80 0 C-74 -10 -64 -13 -58 -7 C-62 -8 -65 -4 -62 0 M-46 0 C-40 -10 -30 -13 -24 -7 C-28 -8 -31 -4 -28 0 M-12 0 C-6 -10 4 -13 10 -7 C6 -8 3 -4 6 0 M22 0 C28 -10 38 -13 44 -7 C40 -8 37 -4 40 0 M56 0 C62 -10 72 -13 78 -7 C74 -8 71 -4 74 0" />
          <path className="ink hair" d="M-62 0 C-56 -2 -52 -1 -46 0 M-28 0 C-22 -2 -18 -1 -12 0 M6 0 C12 -2 16 -1 22 0 M40 0 C46 -2 50 -1 56 0 M74 0 C80 -2 84 -1 90 0" />
          <path className="ink-dot" d="M-61.6 -9 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-58.6 -11 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-56.6 -8 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-59.6 -5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-27.6 -9 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-24.6 -11 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-22.6 -8 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M-25.6 -5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M6.4 -9 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M9.4 -11 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M11.4 -8 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M8.4 -5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M40.4 -9 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M43.4 -11 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M45.4 -8 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M42.4 -5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M74.4 -9 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M77.4 -11 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M79.4 -8 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0 M76.4 -5 a0.6 0.6 0 1 0 1.2 0 a0.6 0.6 0 1 0 -1.2 0" />
        </symbol>
        {/* The kit for a day out: a cooler, sunscreen, mask and snorkel, slippers. */}
        <symbol id="m-kit" viewBox="-92 -50 184 54" overflow="visible">
          <path className="wash" d="M-80 0 L-80 -28 L-36 -28 L-36 0 Z" />
          <path className="ink" d="M-80 0 L-80 -28 L-36 -28 L-36 0" />
          <path className="ink fine" d="M-82 -28 L-82 -34 L-34 -34 L-34 -28 Z M-68 -34 C-68 -43 -48 -43 -48 -34" />
          <path className="ink hair" d="M-80 -12 h44 M-80 -8 h44 M-76 -24 v10 M-40 -24 v10" />
          <path className="wash" d="M-24 0 L-24 -26 C-24 -30 -14 -30 -14 -26 L-14 0 Z" />
          <path className="ink fine" d="M-24 0 L-24 -26 C-24 -30 -14 -30 -14 -26 L-14 0 M-22 -29 h6 v-6 h-6 Z" />
          <path className="ink hair" d="M-24 -20 h10 M-24 -7 h10 M-21 -13.5 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0" />
          <path className="wash" d="M0 -6 C0 -14 22 -14 22 -6 C22 0 16 0 11 -3 C6 0 0 0 0 -6 Z" />
          <path className="ink fine" d="M0 -6 C0 -14 22 -14 22 -6 C22 0 16 0 11 -3 C6 0 0 0 0 -6 Z" />
          <path className="ink hair" d="M3 -7 C4 -11 18 -11 19 -7 M0 -7 C-4 -7 -6 -4 -4 -1 M22 -7 C26 -7 27 -4 26 -1" />
          <path className="ink fine" d="M24 -3 C29 -3 31 -10 31 -30 C31 -35 35 -37 37 -34" />
          <path className="ink fine" d="M42 0 C42 -3 60 -3 66 0 Z M48 -2 L54 -9 L62 -2 M66 0 C66 -3 82 -3 88 0 Z M72 -2 L77 -8 L84 -2" />
        </symbol>
      </defs>
    </svg>
  );
}
