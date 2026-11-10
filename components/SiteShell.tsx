"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { PrintReady } from "./PrintReady";
import { Tide } from "./Tide";

/** Sticky header, page body, footer. The real site only. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);

  // Sticky things (the Our Story date bar, the coast chart, anything scrolled
  // into view) sit just under the header, so they need its real height. The
  // CSS carries good guesses; this measures the actual one as the header
  // wraps, fonts load or the text is enlarged. Rounded down, so whatever
  // tucks under it never leaves a sliver of gap.
  useEffect(() => {
    const el = header.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--nav-h", `${Math.floor(el.getBoundingClientRect().height)}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--nav-h");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav" ref={header}>
        <Link className="mark" href="/">
          <Logo className="mark-logo" sizes="40px" priority />
          <span>{site.couple}</span>
        </Link>
        <p className="print-letterhead">
          {site.weddingDate} · {site.venue}
        </p>
        <nav aria-label="Sections">
          {site.nav.map((item) => {
            const href = item.href ? `/${item.href}` : "/";
            return (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <Tide className="tide-footer" />
      <footer>
        <div className="footer-seal">
          <Logo className="footer-logo" sizes="120px" />
          <p className="footer-farewell">
            <span lang="haw">A hui hou</span> — until we meet again
          </p>
        </div>
        <div className="footer-row">
          <div>
            <strong>{site.couple}</strong>
            <span>{site.weddingDate}</span>
          </div>
          <p>
            {site.venue}
            <br />
            {site.location}
          </p>
          <small>Made with love for our favorite people</small>
        </div>
      </footer>
      <PrintReady />
    </>
  );
}
