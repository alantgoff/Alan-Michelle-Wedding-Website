/**
 * THE FRIENDS' BOAT VOTE — a short list of boat days for our college and
 * high school friends to vote on. It appears at the foot of the Week page
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
import type { PointKey } from "@/lib/island";
import type { GroupId } from "./groups";

export type BoatOption = {
  /** A short id, letters and dashes only. Changing it loses the votes cast for it. */
  id: string;
  name: string;
  /** Where it leaves from: a short name in small type beside a locator map dotted at `at`. */
  from: string;
  at: PointKey;
  /** One or two plain sentences. */
  what: string;
  /** Short facts: where it leaves from, how long, how many it holds, what is included. */
  details: string[];
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

  /*
   * The options, from the operators' own pages (read November 17, 2026).
   * Prices are NOT shown to friends; they are here for you:
   *   sandbar      Captain Bruce, $6,000 per boat incl. tax and service, + $1 per person stewardship fee
   *   sunset       Holokai Catamaran, price on request (open bar included on private sunset sails)
   *   west-side    Ocean Joy Cruises, $3,350 cocktails only or $3,850 with dinner, up to 25; +5% crew gratuity
   *   north-shore  North Shore Catamaran Charters, $1,299 private charter, up to 19
   * VERIFY before booking: prices, capacity, departure days and 2028 schedules.
   */
  options: [
    {
      id: "sandbar",
      name: "Kāneʻohe Bay sandbar",
      from: "Heʻeia Kea Harbor",
      at: "heeia",
      what: "A private catamaran out to the sandbar in the middle of Kāneʻohe Bay, with snorkeling and paddleboards.",
      details: [
        "Leaves from Heʻeia Kea Small Boat Harbor, 35–45 minutes from Waikīkī",
        "About 2 hours 45 minutes",
        "Holds up to 30",
        "Snacks and soft drinks; bring your own drinks (no bottled beer)",
        "Not on Sundays",
      ],
      link: { href: "https://www.cptbruce.com/kaneohe-sandbar-private-catamaran.php", label: "The trip" },
    },
    {
      id: "sunset",
      name: "Waikīkī sunset sail",
      from: "Waikīkī",
      at: "waikiki",
      what: "A private catamaran sail off Waikīkī at sunset, with an open bar.",
      details: [
        "Boards from the beach in Waikīkī, a short walk from the hotels",
        "Private trips run 1 to 2½ hours",
        "Holds up to 49",
        "Open bar included; no outside alcohol",
      ],
      link: { href: "https://www.sailholokai.com/private-charters-waikiki/", label: "The boat" },
    },
    {
      id: "west-side",
      name: "West-side snorkel and dinner",
      from: "Ko Olina",
      at: "ko-olina",
      what: "A private catamaran off Ko Olina with snorkeling and cocktails, and dinner on board if we add it.",
      details: [
        "Leaves from Ko Olina Marina, about 50 minutes from Waikīkī",
        "3½ hours",
        "Holds up to 49",
        "Snorkel gear, four drinks each, optional buffet dinner",
        "Runs Monday, Wednesday, Friday or Sunday",
      ],
      link: { href: "https://www.oceanjoycruises.com/cruises/private-charter/", label: "The trip" },
    },
    {
      id: "north-shore",
      name: "North Shore sail",
      from: "Haleʻiwa Harbor",
      at: "haleiwa",
      what: "A private sail along the North Shore’s surf breaks, with a swim stop when the sea allows.",
      details: [
        "Leaves from Haleʻiwa Harbor, about an hour from Waikīkī",
        "2 hours",
        "Holds up to 19",
        "Sodas and water; bring your own food",
      ],
      link: { href: "https://www.sailingcat.com/cruises/splash-and-sail/", label: "The trip" },
    },
  ] as BoatOption[],

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
