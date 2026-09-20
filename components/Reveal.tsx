"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades content in as it scrolls into view.
 *
 * The server renders this fully visible. The hidden state is applied only
 * after mount, and only to elements still below the fold, so a guest whose
 * JavaScript is slow, blocked, or broken sees the whole page rather than a
 * blank one. Reduced-motion users skip the animation entirely.
 */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    // Anything already on screen stays as rendered; hiding it now would flash.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("shown");
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
