import "./designs.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design explorations | Alan & Michelle",
  robots: { index: false, follow: false, nocache: true },
};

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
