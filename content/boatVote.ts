/**
 * THE FRIENDS' BOAT VOTE — a short list of boat days for our college and
 * high school friends to vote on. It appears at the foot of the Weekend page
 * only for guests holding that group's invite link; nobody else sees it, or
 * can vote.
 *
 * Each friend types their name and picks one option. Voting again under the
 * same name changes that vote. Everyone in the group sees the running count,
 * with names.
 *
 * Votes are saved in the Upstash database connected in Vercel (see
 * lib/voteStore.ts). Until it is connected, the options show with "Voting
 * opens soon" instead of the form.
 *
 * {name}, {n} are filled in for you.
 */
import type { GroupId } from "./groups";

export type BoatOption = {
  /** A short id, letters and dashes only. Changing it loses the votes cast for it. */
  id: string;
  name: string;
  /** One or two plain sentences. */
  what: string;
  /** Short facts: where it leaves from, how long, how many it holds, what is included. */
  details: string[];
  /** As published by the operator, with the date we read it. */
  price: string;
  link?: { href: string; label: string };
};

export const boatVote = {
  /** Which invite group sees the vote and may vote. */
  audience: "college" as GroupId,
  /**
   * TODO: the last day to vote, in Hawaiʻi, as "YYYY-MM-DD". Leave it empty
   * to keep voting open. After that day the form closes and the results stay.
   */
  closes: "",

  title: "Help choose our boat day",
  intro:
    "We would love a boat day just for our college and high school friends, and we want you to choose it. Here are a few we like. Pick the one you would most enjoy; the most votes wins.",

  options: [] as BoatOption[],

  words: {
    noOptions: "The options are on their way.",
    notOpen: "Voting opens soon.",
    closed: "Voting has closed. Thank you for choosing!",
    name: "Your name",
    pick: "Your pick",
    submit: "Cast my vote",
    change: "Change my vote",
    yours: "Your vote",
    one: "1 vote",
    many: "{n} votes",
    none: "No votes yet",
    more: "More about it",
    thanks: "Thank you, {name}. Your vote is in.",
    errorName: "Please add your name, so we know who voted.",
    errorPick: "Please pick one of the boats.",
    unavailable: "The vote could not be saved just now. Please try again in a minute.",
  },
};
