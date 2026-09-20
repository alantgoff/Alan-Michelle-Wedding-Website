import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";

// Cormorant Garamond ships a variable build, so no `weight` is passed.
const display = Cormorant_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  title: `${site.couple} | ${site.location}`,
  description: `Wedding weekend at ${site.venue}`,
  // Keeps the site off search engines while still being shareable by link.
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
