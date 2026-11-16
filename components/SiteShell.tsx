"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { PrintReady } from "./PrintReady";
import { Tide } from "./Tide";

/** Sticky header, page body, footer. The real site only. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  // The phone menu. Wider screens never show the button, so this does nothing there.
  const [open, setOpen] = useState(false);

  // Close it whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes it and puts focus back on the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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
        {site.shell.skip}
      </a>
      <header className="nav" ref={header} data-open={open ? "true" : undefined}>
        <Link className="mark" href="/">
          <Logo className="mark-logo" sizes="40px" priority />
          <span>{site.couple}</span>
        </Link>
        <p className="print-letterhead">
          {site.weddingDate} · {site.venue}
        </p>
        {/* Phones only: the links fold away behind this button. Without
            JavaScript the button hides and the links simply show. */}
        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-mark" aria-hidden="true" />
          {open ? site.shell.close : site.shell.menu}
        </button>
        <nav id="site-nav" aria-label={site.shell.navLabel}>
          {site.nav.map((item) => {
            const href = item.href ? `/${item.href}` : "/";
            return (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
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
            <span lang="haw">{site.shell.farewell.haw}</span> — {site.shell.farewell.means}
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
          <div className="footer-more">
            <small>{site.shell.madeWith}</small>
            {site.shell.more.map((item) => (
              <Link key={item.href} href={`/${item.href}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <PrintReady />
    </>
  );
}
