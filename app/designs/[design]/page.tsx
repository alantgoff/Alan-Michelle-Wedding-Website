import { notFound } from "next/navigation";
import { designBySlug } from "@/content/designs";
import { visibleActivities } from "@/content/visibleActivities";
import { concepts } from "@/app/designs/concepts/registry";

// Activities are filtered per visitor, so this cannot be prerendered.
export const dynamic = "force-dynamic";

export default async function DesignPage({ params }: { params: Promise<{ design: string }> }) {
  const { design: slug } = await params;
  if (!designBySlug(slug)) notFound();

  const Concept = concepts[slug as keyof typeof concepts];
  if (!Concept) notFound();

  // Filtered here so a concept can be a client component and still never
  // receive an event its visitor is not allowed to see.
  const activities = await visibleActivities();
  return <Concept activities={activities} />;
}
