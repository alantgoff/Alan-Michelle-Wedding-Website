import type { GroupId } from "./groups";
export type Audience = "everyone" | GroupId;
/*
 * TODO: the days. The ceremony is on FRIDAY, October 6, 2028 (content/site.ts).
 * Events without a day yet are listed together under "Days to be confirmed";
 * give each its day ("Thursday", "Saturday"…) once it is set:
 *   - Sunset welcome drinks  (probably Thursday, the night before)
 *   - Turtle snorkel charter (our treat)
 *   - Beach meetups
 *   - A second thank-you activity, also on us: not on the list yet. Add it
 *     here when it is decided.
 *   - College crew ridge hike (Thursday, or Friday morning)
 *   - Wedding party rehearsal (probably Thursday)
 *
 * ONE RULE FOR ANY BOAT: if a charter runs in Kāneʻohe Bay, state law bars
 * it on Sundays and federal holidays, which that weekend rules out Sunday,
 * October 8 and Monday, October 9 (Columbus Day). Ask the operator.
 *
 * An event for one group only: set its "audience" to "family", "college" or
 * "wedding-party" and it quietly disappears for everyone else — they are
 * never told it exists.
 */
export type Activity = {
 date: string;
 title: string;
 time: string;
 location: string;
 description: string;
 audience: Audience;
 /** Optional: a line under the event pointing to more, e.g. the shuttle on the Travel page. */
 link?: { href: string; label: string };
};

/*
 * THE WEEKEND, one event per line. Anything not settled yet reads "to come"
 * for guests; the TODO comment beside it says what is missing. Times that
 * are not a clock time ("Time to come") sort to the end of their day.
 */
export const activities: Activity[] = [
 // TODO: welcome drinks: choose the day (see above) and the place in Waikīkī.
 {date:"Days to be confirmed",title:"Sunset welcome drinks",time:"5:30 PM",location:"Waikīkī · place to come",description:"A relaxed first hello with sunset views and light bites. Hoʻokipa is Hawaiian for hospitality: to welcome someone and treat them well. It is the whole idea of our first evening together.",audience:"everyone"},
 // TODO: ceremony time (also in content/site.ts).
 {date:"Friday",title:"Wedding ceremony & reception",time:"Time to come",location:"Palikū Gardens",description:"The reason we are all here. Ceremony on the lawn, then dinner and dancing under the lights. A shuttle runs between Waikīkī and the ranch. The old Hawaiian word for marrying, hoʻāo, probably meant to stay until daylight. We will settle for the last dance.",audience:"everyone",link:{href:"/travel#shuttle",label:"The wedding-day shuttle"}},
 // TODO: turtle charter: the day, departure time, harbor, operator, how long it runs, and what to bring.
 {date:"Days to be confirmed",title:"Turtle snorkel charter",time:"Time to come",location:"Harbor to come",description:"A private boat, our treat, out to snorkel with the honu, Hawaiʻi’s green sea turtles. The day, the harbor and what to bring are to come.",audience:"everyone",link:{href:"/island#honu",label:"Giving the honu room"}},
 // TODO: beach meetups: which beaches, and when.
 {date:"Days to be confirmed",title:"Beach meetups",time:"Times to come",location:"Beaches to come",description:"A few meetups at some of the island’s nicest beaches. Which beaches, and when, are to come.",audience:"everyone"},
 // TODO: beach morning: which beach.
 {date:"Sunday",title:"Beach morning",time:"10:00 AM",location:"Beach to come",description:"Coffee, fruit, and one last swim before everyone heads home. There is an old saying, hoʻokahi nō lā o ka malihini: a stranger only for a day. After that, a guest pitches in. By Sunday morning you are family, so someone will hand you the coffee to carry.",audience:"everyone"},
 // TODO: family dinner: the restaurant or house in Kāneʻohe.
 {date:"Thursday",title:"Family dinner",time:"6:00 PM",location:"Kāneʻohe · place to come",description:"An intimate dinner for our families before the weekend begins.",audience:"family"},
 // TODO: college hike: the trail, the trailhead and how everyone gets there.
 {date:"Friday",title:"College crew ridge hike",time:"8:00 AM",location:"Trailhead to come",description:"A nostalgic morning outside with the college crew. Trail and transport details to come.",audience:"college"},
 // TODO: a boat for college and high school friends, if it happens. Remove the two slashes
 // to show it to everyone holding the college invite link (and only them).
 // {date:"Days to be confirmed",title:"Friends’ boat day",time:"Time to come",location:"Harbor to come",description:"A boat of our own for our college and high school friends. Details to come.",audience:"college"},
 {date:"Friday",title:"Wedding party rehearsal",time:"3:00 PM",location:"Palikū Gardens",description:"A quick ceremony walk-through followed by a toast with the wedding party.",audience:"wedding-party"}
];

/**
 * The words on the Weekend page. {time} is filled in for you.
 * The day-by-day tips for free time live on The island page
 * (content/island.ts, `explore.byDay`).
 */
export const weekendPage = {
 tab: "The weekend",
 kicker: "Wedding weekend",
 title: "The weekend",
 intro: "Everything we have planned for the week, in order. To thank you for coming all this way, a couple of these are on us; the rest of the time is yours to enjoy Hawaiʻi your own way.",
 /** Added to the intro when some events are marked as the guest's own. */
 mineOne: "The one marked with a plumeria is just for you.",
 mineMany: "The ones marked with a plumeria are just for you.",
 sunset: "Sunset {time}",
 moonrise: "Moonrise {time}",
 print: "Print the weekend",
 freeTime: {
  text: "Free time between the gatherings? The island page has what is open on which day, and where to go.",
  link: "A free day, in full",
 },
};
