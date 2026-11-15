"use client";

import { useState } from "react";
import { PLUMERIA_CENTRE, PLUMERIA_PETAL, PLUMERIA_TURNS } from "./plumeria-shape";

/**
 * A plumeria to tuck behind one ear or the other. Drawn as a mirror shows
 * it, so the wearer's left ear is on the left of the picture. The words for
 * each side come from content/dressCode.ts.
 */
export function FlowerEar({ left, right, hint }: { left: string; right: string; hint: string }) {
  const [side, setSide] = useState<"left" | "right">("left");

  return (
    <figure className="flower-ear">
      <button
        type="button"
        onClick={() => setSide((s) => (s === "left" ? "right" : "left"))}
        aria-label={`Move the flower to the ${side === "left" ? "right" : "left"} ear`}
      >
        <svg viewBox="0 0 200 196" aria-hidden="true" focusable="false">
          <g filter="url(#ink)">
            {/* Shoulders, neck, and a head with its hair swept across. */}
            <path className="ink" d="M22 192 C26 168 42 158 62 151 C80 145 84 138 84 124 M116 124 C116 138 120 145 138 151 C158 158 174 168 178 192" />
            <path className="ink" d="M100 28 C72 28 58 50 58 80 C58 108 76 130 100 130 C124 130 142 108 142 80 C142 50 128 28 100 28 Z" />
            <path className="ink fine" d="M60 66 C76 60 96 46 106 32 C114 48 128 60 141 66" />
            <path className="ink fine" d="M58 84 C52 82 50 92 56 98 M142 84 C148 82 150 92 144 98" />
          </g>
          <g className={`flower-ear-bloom flower-ear-${side}`}>
            <g transform="translate(-21 -21) scale(0.66)">
              {PLUMERIA_TURNS.map((turn) => (
                <path key={turn} className="flower-ear-petal" d={PLUMERIA_PETAL} transform={`rotate(${turn} 32 32)`} />
              ))}
              <circle cx="32" cy="32" r="6" fill={PLUMERIA_CENTRE} />
            </g>
          </g>
        </svg>
      </button>
      <figcaption>
        <span className="flower-ear-says" aria-live="polite">
          {side === "left" ? left : right}
        </span>
        <span className="flower-ear-hint">{hint}</span>
      </figcaption>
    </figure>
  );
}
