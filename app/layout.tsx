import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { site } from "@/content/site";

// Both ship variable builds, so no `weight` is passed — that would pin them
// to static cuts and lose the range. Lora carries body copy, labels, and the
// navigation: a serif throughout keeps the site elegant rather than blocky.
const display = Cormorant_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const body = Lora({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  // Each page names itself ("Travel | Alan & Michelle"), which is also what
  // screen readers announce when a guest moves between pages.
  title: { default: `${site.couple} | ${site.location}`, template: `%s | ${site.couple}` },
  description: `Wedding weekend at Pālikū Gardens, Kualoa Ranch, ${site.location}`,
  // Keeps the site off search engines while still being shareable by link.
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
