/**
 * MY WEEK: the words for planning the week day by day.
 *
 * A guest taps "Add to my week" on a restaurant or a day out on The island
 * (or on Utility) and picks a day; their plans then sit on the Week page in
 * each day, beside ours. It lives in their browser only: nothing is sent
 * anywhere. `{name}`, `{day}` and `{n}` are filled in.
 */
export const myWeek = {
  title: "My week",
  note: "Kept on this device only.",

  // The button on each restaurant and day out, and its day picker
  add: "Add to my week",
  /** The same button on a phone, where space is short. */
  addShort: "Add",
  addLabel: "Add {name} to a day of my week",
  onLabel: "{name} is on {day}. Change the day",
  pick: "Which day?",
  closed: "closed",
  wedding: "wedding",
  someday: "Not sure yet",
  remove: "Remove",
  removeLabel: "Remove {name} from my week",

  // In each day on the Week page
  yours: "Your plans",
  move: "Move",
  moveLabel: "Move {name} to another day",
  addPlan: "Add a plan",
  addPlanLabel: "Add a plan to {day}",
  filter: "Find a place",
  eat: "Eat",
  out: "Days out",
  added: "added",
  closedThatDay: "Closed that day",
  done: "Done",

  // Plans saved without a day
  unplaced: "Not on a day yet",
  unplacedHint: "Pick a day for each and it moves into the week below.",
  pickDay: "Pick a day",

  // The week strip on The island and Utility
  plans: "{n} plans",
  plansOne: "1 plan",
  stripEmpty: "Tap “Add to my week” on any restaurant or day out and pick a day. Your plans then sit on the Week page, beside ours.",
  stripLink: "Plan your week",
  stripLabel: "My week, day by day",

  /**
   * Notes on the Week page under the days they apply to, from the facts on
   * The island (see the VERIFY notes there). `days` are weekdays.
   */
  notes: [
    { days: ["Sun"], text: "No tour boats or charters in Kāneʻohe Bay on Sundays.", href: "/island#sandbar" },
    { days: ["Mon", "Tue"], text: "Hanauma Bay is closed.", href: "/island#hanauma" },
    { days: ["Thu"], text: "Hoʻomaluhia Botanical Garden is closed.", href: "/island#hoomaluhia" },
    { days: ["Wed", "Sun"], text: "Waiāhole Poi Factory pounds poi by hand.", href: "/island#waiahole" },
  ] as { days: ("Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")[]; text: string; href: string }[],
};

export type MyWeekWords = typeof myWeek;
