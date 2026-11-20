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
    /** How many days before the wedding it falls: index 1 is the day before. */
    early: [
      "",
      "The day before the wedding",
      "Two days before the wedding",
      "Three days before the wedding",
      "Four days before the wedding",
      "Five days before the wedding",
      "Six days before the wedding",
    ],
    beginsEarly: "{early}:",
    justForYou: "Just for you:",
    at: "at {time}",
  },
  seeWeek: "See your week →",

  /** The short block straight under the photograph: the four things to know first. */
  glance: {
    label: "At a glance",
    when: "When",
    where: "Where",
    stay: {
      label: "Plan the week",
      text: "Arrive the weekend before, stay in Waikīkī, and fly home the weekend after. Book early, on a rate you can cancel.",
      link: "Where to stay",
    },
    /** Under the venue. */
    shuttle: "A shuttle runs from Waikīkī",
    rsvp: "RSVP",
  },

  /** Beside the countdown. */
  facts: {
    kicker: "The celebration",
    title: "Palikū Gardens",
    place: "A garden lawn under the mountains at Kualoa Ranch, on the windward coast, about 45 minutes from Waikīkī.",
    placeLink: "About this place",
    sunset: "Sunset",
    sunsetValue: "About {time}",
    ridge: "It drops behind the ridge an hour or more before that.",
    map: "View map",
    calendar: "Add to calendar",
  },

  /** The cards at the foot of the page, one per page in the menu. */
  cardGo: "Explore →",

  /** The live line beside the countdown. {clock}, {home}, {time}, {hours}… are filled in for you. */
  now: {
    lead: "Right now at Kualoa it is",
    yours: "({home} where you are)",
    dark: "Still dark over the bay; the sun comes up at {time}.",
    hour: "hour",
    hours: "hours",
    left: "{hours} {unit}{minutes} of daylight left.",
    minutes: " and {minutes} minutes",
    setting: "The sun sets at {time}, and drops behind the ridge at Kualoa before that.",
    gone: "The sun went down at {time}; the bay is under stars.",
  },

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
  curtain: "Welcome to our wedding week",

  /** Read aloud for the logo button that scatters plumeria. */
  scatter: "Scatter plumeria",
};
