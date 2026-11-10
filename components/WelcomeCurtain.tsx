"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

// Module scope: survives client-side navigation, resets on a real page load.
// Stops the card replaying when Back returns to the home page this session.
let played = false;

/**
 * The first thing a guest sees when they open their invite link: the logo
 * rising out of its own waves, a greeting by name of their group, and then
 * the whole card lifting away like a curtain to the home page beneath.
 *
 * The timing is pure CSS, so it plays and clears itself even if JavaScript
 * never loads. Script only adds the courtesies: a tap or a key skips it, and
 * the ?aloha in the address is dropped so a reload does not replay it.
 * Visitors who ask for reduced motion never see it at all.
 */
export function WelcomeCurtain({ greeting }: { greeting: string }) {
  // Read once: false during hydration on a real load, so it matches the server.
  const [alreadyPlayed] = useState(() => played);
  const [skipped, setSkipped] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // A skip only means something before the timed lift begins. Once the lift
  // is running, or over, restarting it would drop the card back over the page.
  const skip = () => {
    const el = ref.current;
    if (!el || getComputedStyle(el).display === "none") return;
    const lifting = el.getAnimations().some((a) => a.effect?.getComputedTiming().progress != null);
    if (!lifting) setSkipped(true);
  };

  useEffect(() => {
    played = true;
    // Keep Next's own history state: with null, the router ignores Back to
    // this entry and the previous page stays on screen.
    window.history.replaceState(window.history.state, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (done || alreadyPlayed) return;
    // On a slow connection the CSS lift can finish before React is listening,
    // so its animationend is never heard: notice that here instead.
    if (ref.current && getComputedStyle(ref.current).visibility === "hidden") {
      setDone(true);
      return;
    }
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
    // skip only reads the ref, so it never goes stale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, alreadyPlayed]);

  if (done || alreadyPlayed) return null;

  return (
    <div
      ref={ref}
      className={`curtain${skipped ? " curtain-skipped" : ""}`}
      aria-hidden="true"
      onClick={skip}
      // Only the card's own lift ends it; the logo and words animate too and
      // their events bubble up here. An interrupted lift fires animationcancel.
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setDone(true);
      }}
    >
      <div className="curtain-card">
        <Logo className="curtain-logo" sizes="(max-width: 600px) 46vw, 240px" priority />
        <p className="curtain-aloha">{greeting}</p>
        <p className="curtain-line">Welcome to our wedding weekend</p>
      </div>
    </div>
  );
}
