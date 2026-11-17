/**
 * Where the friends' boat votes are kept: a small Redis database from
 * Upstash, connected to the Vercel project (Storage → Upstash Redis →
 * Connect). Vercel then supplies the address and key as environment
 * variables; nothing is written in the repository.
 *
 * Talks to Upstash's REST interface with plain fetch, so the site needs no
 * extra package. Server-only: the key never reaches a browser.
 */
import "server-only";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

/** Every vote lives in one hash: field = the voter's name in lower case, value = the vote. */
const KEY = "wedding:boat-vote";

export type Vote = { name: string; option: string; at: string };

/** Remembers a voter's name on their device, so the page can show their pick. */
export const VOTER_COOKIE = "boat_voter";

/** True once the database is connected in Vercel. Until then the vote shows as not open yet. */
export function voteStoreReady(): boolean {
  return Boolean(url && token);
}

async function command(args: string[]): Promise<unknown> {
  if (!url || !token) throw new Error("vote store not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => null)) as { result?: unknown; error?: string } | null;
  if (!res.ok || !body || body.error) throw new Error(`vote store: ${body?.error ?? res.status}`);
  return body.result;
}

/** A name, compared without case or extra spaces, so "Sam" and " sam " are one voter. */
export function voterKey(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

/** Records a vote, replacing any earlier vote under the same name. */
export async function castVote(vote: Vote): Promise<void> {
  await command(["HSET", KEY, voterKey(vote.name), JSON.stringify(vote)]);
}

/** Every vote so far. */
export async function readVotes(): Promise<Vote[]> {
  const flat = (await command(["HGETALL", KEY])) as string[] | null;
  const votes: Vote[] = [];
  for (let i = 1; i < (flat?.length ?? 0); i += 2) {
    try {
      const v = JSON.parse(flat![i]) as Vote;
      if (v && typeof v.name === "string" && typeof v.option === "string") votes.push(v);
    } catch {
      // A malformed entry is skipped rather than breaking the page.
    }
  }
  return votes;
}
