/**
 * Guest groups and their private invite links.
 *
 * Send each group its own link, e.g. https://your-site.com/i/family-3f2a
 * Opening it once remembers that guest on their device; they then see their
 * group's events on the Activities page alongside the open ones.
 *
 * The random suffix on each slug is the security. Treat a slug like a
 * password: anyone who has it can see that group's events. To revoke a
 * group, change its slug here and send out the new link.
 */

export const groups = [
  { id: "college" as const, name: "College friends", slug: "college-7k4m" },
  { id: "family" as const, name: "Family", slug: "family-3f2a" },
  { id: "wedding-party" as const, name: "Wedding party", slug: "party-9q8v" },
];

export type GroupId = (typeof groups)[number]["id"];

/** Cookie that remembers a guest's invite slug. */
export const COOKIE = "wedding_group";

/** Resolve a slug to its group. Unknown slugs return undefined. */
export function groupBySlug(slug: string | undefined) {
  return slug ? groups.find((g) => g.slug === slug) : undefined;
}
