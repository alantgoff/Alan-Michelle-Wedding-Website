"use client";

import { useRef, type ReactNode } from "react";
import { PLUMERIA_CENTRE, PLUMERIA_INK, PLUMERIA_PETAL, PLUMERIA_TURNS } from "./plumeria-shape";

/**
 * Tap the logo and plumeria spill out of it and drift down the page — the
 * flowers on the left-hand board, set loose. An easter egg, so nothing
 * announces it beyond the logo rocking a little under the pointer.
 *
 * Each flower is an inline SVG animated with the Web Animations API and
 * removed when it lands, so nothing accumulates however often it is tapped.
 * For visitors who ask for reduced motion the flowers do not travel: a few
 * bloom in place around the logo and fade, so the button still answers.
 */

const MAX_IN_FLIGHT = 48;

const FLOWER =
  `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">` +
  PLUMERIA_TURNS.map(
    (r) =>
      `<path d="${PLUMERIA_PETAL}" transform="rotate(${r} 32 32)" fill="#fffdf8" stroke="${PLUMERIA_INK}" stroke-width="1.8" stroke-linejoin="round"/>`,
  ).join("") +
  `<circle cx="32" cy="32" r="5.5" fill="${PLUMERIA_CENTRE}"/></svg>`;

const between = (min: number, max: number) => min + Math.random() * (max - min);

export function PlumeriaBurst({ children, className }: { children: ReactNode; className?: string }) {
  const layer = useRef<HTMLDivElement | null>(null);

  function burst(origin: HTMLElement) {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One shared layer for the whole document, reused across visits to the page.
    if (!layer.current) {
      let el = document.querySelector<HTMLDivElement>(".plumeria-layer");
      if (!el) {
        el = document.createElement("div");
        el.className = "plumeria-layer";
        el.setAttribute("aria-hidden", "true");
        document.body.appendChild(el);
      }
      layer.current = el;
    }
    const sky = layer.current;
    const box = origin.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height * 0.35;
    const count = Math.min(still ? 8 : 14, MAX_IN_FLIGHT - sky.childElementCount);

    for (let i = 0; i < count; i += 1) {
      const flower = document.createElement("span");
      const size = between(18, 36);
      flower.className = "plumeria";
      flower.innerHTML = FLOWER;
      flower.style.width = flower.style.height = `${size}px`;
      sky.appendChild(flower);

      if (still) {
        // A ring of flowers that settle in place and fade: no travel, no spin.
        const angle = (i / count) * Math.PI * 2 + between(-0.3, 0.3);
        const reach = between(60, 120);
        flower.style.left = `${x + Math.cos(angle) * reach - size / 2}px`;
        flower.style.top = `${y + Math.sin(angle) * reach - size / 2}px`;
        flower
          .animate([{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], {
            duration: 2600,
            delay: i * 60,
            fill: "both",
          })
          .finished.then(() => flower.remove(), () => flower.remove());
        continue;
      }

      flower.style.left = `${x - size / 2}px`;
      flower.style.top = `${y - size / 2}px`;
      const drift = between(-0.42, 0.42) * window.innerWidth;
      const pop = between(40, 130);
      const fall = window.innerHeight - y + between(40, 160);
      const spin = between(-540, 540);
      const sway = between(18, 46) * (Math.random() < 0.5 ? -1 : 1);

      flower
        .animate(
          [
            { transform: "translate(0, 0) scale(0.3) rotate(0deg)", opacity: 0 },
            { transform: `translate(${drift * 0.2}px, ${-pop}px) scale(1) rotate(${spin * 0.15}deg)`, opacity: 1, offset: 0.14 },
            { transform: `translate(${drift * 0.55 + sway}px, ${fall * 0.45}px) scale(1) rotate(${spin * 0.55}deg)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${drift - sway}px, ${fall}px) scale(0.95) rotate(${spin}deg)`, opacity: 0 },
          ],
          { duration: between(3400, 5600), delay: i * 45, easing: "cubic-bezier(.2,.6,.35,1)", fill: "both" },
        )
        .finished.then(() => flower.remove(), () => flower.remove());
    }
  }

  return (
    <button type="button" className={className} aria-label="Scatter plumeria" onClick={(e) => burst(e.currentTarget)}>
      {children}
    </button>
  );
}
