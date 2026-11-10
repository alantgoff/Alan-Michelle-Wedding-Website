"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { Tide } from "./Tide";

/** Sticky header, page body, footer. The real site only. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="nav">
        <Link className="mark" href="/">
          <Logo className="mark-logo" sizes="40px" priority />
          <span>{site.couple}</span>
        </Link>
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

      <main>{children}</main>

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
    </>
  );
}
