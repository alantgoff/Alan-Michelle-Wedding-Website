/**
 * The audience-filtered activity list, resolved on the server.
 *
 * Every surface that shows activities must go through this, including the
 * design explorations: events a visitor's group cannot see must never reach
 * their browser. Concepts receive the result as a prop so they are free to
 * be client components without losing the filtering.
 */
import { cookies } from "next/headers";
import { activities, type Activity } from "./activities";
import { groupBySlug, COOKIE } from "./groups";

export async function visibleActivities(): Promise<Activity[]> {
  const slug = (await cookies()).get(COOKIE)?.value;
  const group = groupBySlug(slug);
  return activities.filter((a) => a.audience === "everyone" || (group !== undefined && a.audience === group.id));
}
