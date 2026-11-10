"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

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
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    const skip = () => setSkipped(true);
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <div className={`curtain${skipped ? " curtain-skipped" : ""}`} aria-hidden="true" onClick={() => setSkipped(true)}>
      <div className="curtain-card">
        <Logo className="curtain-logo" sizes="(max-width: 600px) 46vw, 240px" priority />
        <p className="curtain-aloha">{greeting}</p>
        <p className="curtain-line">Welcome to our wedding weekend</p>
      </div>
    </div>
  );
}
