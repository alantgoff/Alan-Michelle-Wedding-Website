"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A kōlea on a stroke of lawn, with a note about the bird beside it. Tap it
 * and it does what kōlea do: a few quick steps, a dead stop, a bob of the
 * head. Purely a small pleasure; the note reads the same either way.
 */
export function Kolea({ title, text, watch }: { title: string; text: string; watch: string }) {
  const bird = useRef<SVGGElement>(null);
  // A guest who has asked for reduced motion gets a drawing, not a button
  // that does nothing. Read after mount, so the first frame matches the server's.
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  function run() {
    const el = bird.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Three quick steps along the grass, a pause, a bob, and back.
    el.animate(
      [
        { transform: "translate(0, 0)", offset: 0 },
        { transform: "translate(-9px, -1px)", offset: 0.1 },
        { transform: "translate(-18px, 0)", offset: 0.2 },
        { transform: "translate(-27px, -1px)", offset: 0.3 },
        { transform: "translate(-36px, 0)", offset: 0.38 },
        { transform: "translate(-36px, 0)", offset: 0.56 },
        { transform: "translate(-36px, 3px)", offset: 0.62 },
        { transform: "translate(-36px, 0)", offset: 0.68 },
        { transform: "translate(-36px, 3px)", offset: 0.74 },
        { transform: "translate(-36px, 0)", offset: 0.8 },
        { transform: "translate(0, 0)", offset: 1 },
      ],
      { duration: 2400, easing: "steps(22, end)" },
    );
  }

  return (
    <aside className="kolea" aria-labelledby="kolea-title">
      <button
        type="button"
        className="kolea-bird"
        onClick={run}
        disabled={still}
        aria-label={watch}
      >
        <svg viewBox="0 0 180 96" aria-hidden="true" focusable="false">
          <g filter="url(#ink)">
            <path className="ink fine" d="M6 88 C40 86 70 89 104 87 M116 87 C136 86 156 88 174 87" />
            <path className="ink hair" d="M30 88 l-3 -7 M36 88 l1 -8 M132 87 l-2 -7 M140 87 l3 -6 M150 88 l-1 -7" />
          </g>
          <g ref={bird} className="kolea-body">
            <g filter="url(#ink)">
              <use href="#m-kolea" x={-50} y={-70} width={100} height={76} transform="translate(96 87) scale(0.86)" />
            </g>
          </g>
        </svg>
      </button>
      <div>
        <h3 id="kolea-title">{title}</h3>
        <p>{text}</p>
      </div>
    </aside>
  );
}
