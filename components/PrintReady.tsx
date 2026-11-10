"use client";

import { useEffect } from "react";

/**
 * Opens every folded answer while the page prints, then puts each back as
 * the guest left it. Modern Chrome does this from CSS alone (see the print
 * styles in globals.css); this covers Safari and Firefox.
 */
export function PrintReady() {
  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const before = () => {
      opened = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
      opened.forEach((d) => (d.open = true));
    };
    const after = () => {
      opened.forEach((d) => (d.open = false));
      opened = [];
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  return null;
}
