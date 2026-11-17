import { cookies } from "next/headers";
import { boatVote } from "@/content/boatVote";
import { groups } from "@/content/groups";
import { fill } from "@/lib/fill";
import { readVotes, VOTER_COOKIE, voterKey, voteStoreReady, type Vote } from "@/lib/voteStore";
import { hawaiiToday } from "@/lib/sun";
import { Plumeria } from "./Plumeria";

/**
 * The friends' boat vote, at the foot of the Weekend page. The page renders
 * this only for a guest holding the group's invite link, and the form posts
 * to /api/boat-vote, which checks the link again. A plain form: it works
 * without JavaScript, and the page reloads with the new count.
 */
export async function BoatVote({ status }: { status?: string }) {
  const w = boatVote.words;
  const voter = (await cookies()).get(VOTER_COOKIE)?.value ?? "";

  let votes: Vote[] = [];
  let failed = false;
  if (voteStoreReady()) {
    try {
      votes = await readVotes();
    } catch {
      failed = true;
    }
  }
  const mine = voter ? votes.find((v) => voterKey(v.name) === voterKey(voter))?.option : undefined;

  const { year, month, day } = hawaiiToday(new Date());
  const today = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const closed = Boolean(boatVote.closes) && today > boatVote.closes;
  const open = voteStoreReady() && !failed && !closed && boatVote.options.length > 0;

  const message =
    status === "thanks" && voter
      ? fill(w.thanks, { name: voter })
      : status === "error-name"
        ? w.errorName
        : status === "error-pick"
          ? w.errorPick
          : status === "unavailable" || failed
            ? w.unavailable
            : null;

  const forYou = groups.find((g) => g.id === boatVote.audience)?.forYou;
  const count = (n: number) => (n === 0 ? w.none : n === 1 ? w.one : fill(w.many, { n }));

  return (
    <section className="boat-vote" id="boat-vote" aria-labelledby="boat-vote-title">
      {forYou ? (
        // Styled like an event's "Just for…" line, but not counted as one of the group's events.
        <p className="activity-for boat-vote-for">
          <Plumeria />
          {forYou}
        </p>
      ) : null}
      <h2 id="boat-vote-title">{boatVote.title}</h2>
      <p className="section-intro">{boatVote.intro}</p>
      {message ? (
        <p className={status === "thanks" ? "boat-vote-note boat-vote-thanks" : "boat-vote-note"} role="status">
          {message}
        </p>
      ) : null}

      {boatVote.options.length === 0 ? (
        <p className="boat-vote-note">{w.noOptions}</p>
      ) : (
        <form method="post" action="/api/boat-vote">
          <fieldset className="boat-options" disabled={!open}>
            <legend className="boat-legend">{w.pick}</legend>
            {boatVote.options.map((o) => {
              const theirs = votes.filter((v) => v.option === o.id);
              return (
                <div className={mine === o.id ? "boat-option boat-option-mine" : "boat-option"} key={o.id}>
                  <label>
                    <input type="radio" name="option" value={o.id} defaultChecked={mine === o.id} required />
                    <span className="boat-option-name">{o.name}</span>
                  </label>
                  <p>{o.what}</p>
                  {o.details.length ? (
                    <ul className="boat-option-details">
                      {o.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ) : null}
                  {o.link ? (
                    <p className="more-link">
                      <a href={o.link.href} target="_blank" rel="noreferrer">
                        {o.link.label} →
                      </a>
                    </p>
                  ) : null}
                  <p className="boat-tally">
                    <strong>{count(theirs.length)}</strong>
                    {theirs.length ? <span>{theirs.map((v) => v.name).join(", ")}</span> : null}
                    {mine === o.id ? <em>{w.yours}</em> : null}
                  </p>
                </div>
              );
            })}
          </fieldset>
          {open ? (
            <p className="boat-vote-submit">
              <label>
                <span>{w.name}</span>
                <input type="text" name="name" required maxLength={40} autoComplete="name" defaultValue={voter} />
              </label>
              <button className="button" type="submit">
                {mine ? w.change : w.submit}
              </button>
            </p>
          ) : (
            <p className="boat-vote-note">{closed ? w.closed : w.notOpen}</p>
          )}
        </form>
      )}
    </section>
  );
}
