import type { Activity } from "@/content/activities";
import type { Group } from "@/content/groups";
import { weekendDay } from "./weekend";

/**
 * The days we have planned something on, from the events this visitor may
 * see (content/visibleActivities.ts), and whether any of a day's events is
 * just for one of their groups. Feeds the seals on the week strip and the
 * section bar. Only ever built from already-filtered events.
 */
export function oursByDay(visible: Activity[], held: Group[]): Record<string, { own: boolean }> {
  const ours: Record<string, { own: boolean }> = {};
  for (const a of visible) {
    const iso = weekendDay(a.date)?.iso;
    if (!iso) continue;
    const own = held.some((g) => g.id === a.audience);
    ours[iso] = { own: Boolean(ours[iso]?.own || own) };
  }
  return ours;
}
