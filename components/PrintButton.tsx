"use client";

import { useEffect, useState } from "react";

/**
 * "Print a copy" — for the guests who like paper in the glovebox. Printing
 * needs the browser, so the button only appears once the page has loaded;
 * without JavaScript there is simply no button, and the browser's own print
 * still produces the same keepsake layout.
 */
export function PrintButton({ children }: { children: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return (
    <button type="button" className="button button-quiet print-button" onClick={() => window.print()}>
      {children}
    </button>
  );
}
