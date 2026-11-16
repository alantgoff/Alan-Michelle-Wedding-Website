/**
 * THE HOME PAGE — every line on it, plus the countdown and the welcome card
 * a guest sees once when they arrive from their invite link.
 *
 * The date, the place and the RSVP line are read from content/site.ts, so
 * they only ever need changing there. {placeholders} are filled in for you.
 */
export const home = {
  /** The names set large over the photograph, one line each. */
  names: ["Alan", "& Michelle"],

  /** For a guest who arrived from an invite link. {groups} is "family", "college friends & family" and so on. */
  greeting: "Aloha, {groups}",
  /** The guest's own first gathering, named under the greeting. */
  first: {
    /** How many days before the wedding it falls: index 1 is "a day". */
    early: ["", "a day", "two days", "three days"],
    beginsEarly: "Your weekend begins {early} early:",
    justForYou: "Just for you:",
    at: "at {time}",
  },
  seeWeekend: "See your weekend →",

  /** The short block straight under the photograph: the four things to know first. */
  glance: {
    label: "At a glance",
    when: "When",
    where: "Where",
    stay: {
      label: "Book now",
      text: "Your stay, as early as you can, on a rate you can cancel.",
      link: "Where to stay",
    },
    rsvp: "RSVP",
  },

  /** Beside the countdown. */
  facts: {
    kicker: "The celebration",
    title: "Palikū Gardens",
    place: "At the foot of Kānehoalani, the sheer green ridge at Kualoa, looking out across Kāneʻohe Bay.",
    placeLink: "About this place",
    sunset: "Sunset",
    sunsetValue: "About {time}",
    ridge: "It drops behind the ridge an hour or more before that.",
    moonrise: "Moonrise",
    moonriseValue: "About {time}",
    map: "View map",
    calendar: "Add to calendar",
  },

  night: {
    kicker: "The sky that night",
    link: "The whole sky that night",
  },

  /** The cards at the foot of the page, one per page in the menu. */
  cardGo: "Explore →",

  /** The number that counts down. Tap it and it counts in weeks, then full moons. */
  countdown: {
    day: "day until we celebrate",
    days: "days until we celebrate",
    weeks: "weeks until we celebrate",
    moons: "full moons until we celebrate",
    another: "Count another way",
    today: { word: "Today", line: "see you on the lawn" },
    after: { word: "Married", line: "and so glad you were there" },
  },

  /** The card that lifts away the first time a guest arrives from their invite link. */
  curtain: "Welcome to our wedding weekend",

  /** Read aloud for the logo button that scatters plumeria. */
  scatter: "Scatter plumeria",
};
