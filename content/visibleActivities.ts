/**
 * The audience-filtered activity list, resolved on the server.
 *
 * Every surface that shows activities must go through this: events a
 * visitor's groups cannot see must never reach their browser. Client
 * components (the coast chart) receive the result as a prop, so they never
 * see anything the visitor may not.
 */
import { cookies } from "next/headers";
import { activities, type Activity } from "./activities";
import { groupsFromCookie, COOKIE, type Group } from "./groups";
import { minutesOf, offsetFromWedding } from "@/lib/weekend";

/** The groups this visitor's invite links have unlocked, newest first. */
export async function heldGroups(): Promise<Group[]> {
  return groupsFromCookie((await cookies()).get(COOKIE)?.value);
}

export async function visibleActivities(): Promise<Activity[]> {
  const held = await heldGroups();
  return activities.filter((a) => a.audience === "everyone" || held.some((g) => g.id === a.audience));
}

/**
 * The visitor's own group events, earliest first. Only groups their invite
 * links have unlocked are read, so this never holds anyone else's plans.
 */
export async function ownEvents(): Promise<Activity[]> {
  const held = await heldGroups();
  return activities
    .filter((a) => held.some((g) => g.id === a.audience))
    .sort(
      (a, b) =>
        (offsetFromWedding(a.date) ?? 99) - (offsetFromWedding(b.date) ?? 99) || minutesOf(a.time) - minutesOf(b.time),
    );
}
