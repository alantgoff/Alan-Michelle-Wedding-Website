/**
 * A tide line: two thin waves drifting past each other, drawn in the
 * site's water colours. Pure CSS motion, so it stops under reduced-motion.
 *
 * Each path is eight wavelengths wide and the animation slides it exactly
 * one wavelength before repeating, so the loop is seamless.
 */
const WAVELENGTH = 300;
const REPEATS = 8;

function wave(amplitude: number) {
  const half = WAVELENGTH / 2;
  let d = "M0 20";
  for (let i = 0; i < REPEATS * 2; i += 1) {
    const dir = i % 2 === 0 ? -amplitude : amplitude;
    d += ` q${half / 2} ${dir} ${half} 0`;
  }
  return d;
}

export function Tide({ className = "" }: { className?: string }) {
  return (
    <div className={`tide ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path className="tide-line tide-line-a" d={wave(14)} />
        <path className="tide-line tide-line-b" d={wave(9)} />
      </svg>
    </div>
  );
}
