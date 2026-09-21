import Link from "next/link";
import { notFound } from "next/navigation";
import { designs, designBySlug } from "@/content/designs";
import { allFontVariables } from "../fonts";

/**
 * Only the bar for moving between explorations. Each concept supplies its
 * own navigation, header and footer — that is the point of them.
 */
export default async function DesignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ design: string }>;
}) {
  const { design: slug } = await params;
  const design = designBySlug(slug);
  if (!design) notFound();

  const index = designs.findIndex((d) => d.slug === slug);
  const previous = designs[(index - 1 + designs.length) % designs.length];
  const next = designs[(index + 1) % designs.length];

  return (
    <div className={allFontVariables}>
      <div className="design-bar">
        <span className="which">
          {String(index + 1).padStart(2, "0")} of {designs.length} — {design.name}: {design.idea}
        </span>
        <nav>
          <Link href={`/designs/${previous.slug}`}>← {previous.name}</Link>
          <Link href="/designs">All ten</Link>
          <Link href={`/designs/${next.slug}`}>{next.name} →</Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
