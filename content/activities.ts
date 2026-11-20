import type { PointKey } from "@/lib/island";
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
 *   - Friends’ ridge hike     (Thursday, or Friday morning)
 *   - Wedding party rehearsal (probably Thursday)
 *
 * ONE RULE FOR ANY BOAT: if a charter runs in Kāneʻohe Bay, state law bars
 * it on Sundays and federal holidays, which that week rules out Sunday,
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
 /** Optional: where on the island, for the little locator map beside `location` (lib/island.ts). Leave it out while the place is to come. */
 at?: PointKey;
 description: string;
 audience: Audience;
 /** Optional: a line under the event pointing to more, e.g. the shuttle on the Travel page. */
 link?: { href: string; label: string };
};

/*
 * THE WEEK, one event per line. Anything not settled yet reads "to come"
 * for guests; the TODO comment beside it says what is missing. Times that
 * are not a clock time ("Time to come") sort to the end of their day.
 */
export const activities: Activity[] = [
 // TODO: welcome drinks: choose the day (see above) and the place in Waikīkī.
 {date:"Days to be confirmed",title:"Sunset welcome drinks",time:"5:30 PM",location:"Waikīkī · place to come",at:"waikiki",description:"A relaxed first hello with sunset views and light bites.",audience:"everyone"},
 // TODO: ceremony time (also in content/site.ts).
 {date:"Friday",title:"Wedding ceremony & reception",time:"Time to come",location:"Palikū Gardens",at:"kualoa",description:"The reason we are all here. Ceremony on the lawn, then dinner and dancing under the lights. A shuttle runs between Waikīkī and the ranch.",audience:"everyone",link:{href:"/travel#shuttle",label:"The wedding-day shuttle"}},
 // TODO: turtle charter: the day, departure time, harbor, operator, how long it runs, and what to bring.
 {date:"Days to be confirmed",title:"Turtle snorkel charter",time:"Time to come",location:"Harbor to come",description:"A private boat, our treat, out to snorkel with the honu, Hawaiʻi’s green sea turtles. The day, the harbor and what to bring are to come.",audience:"everyone",link:{href:"/island#honu",label:"Giving the honu room"}},
 // TODO: beach meetups: which beaches, and when.
 {date:"Days to be confirmed",title:"Beach meetups",time:"Times to come",location:"Beaches to come",description:"A few meetups at some of the island’s nicest beaches. Which beaches, and when, are to come.",audience:"everyone"},
 // TODO: beach morning: which beach.
 {date:"Sunday",title:"Beach morning",time:"10:00 AM",location:"Beach to come",description:"Coffee, fruit, and one last swim before everyone heads home.",audience:"everyone"},
 // TODO: family dinner: the restaurant or house in Kāneʻohe.
 {date:"Thursday",title:"Family dinner",time:"6:00 PM",location:"Kāneʻohe · place to come",at:"kaneohe",description:"An intimate dinner for our families before the wedding.",audience:"family"},
 // TODO: college hike: the trail, the trailhead and how everyone gets there.
 {date:"Friday",title:"Friends’ ridge hike",time:"8:00 AM",location:"Trailhead to come",description:"A morning outside with our college and high school friends. Trail and transport details to come.",audience:"college"},
 // TODO: a boat for college and high school friends, once the vote has picked one (the vote is in
 // content/boatVote.ts). Remove the two slashes to show it to everyone holding that invite link.
 // {date:"Days to be confirmed",title:"Friends’ boat day",time:"Time to come",location:"Harbor to come",description:"A boat of our own for our college and high school friends. Details to come.",audience:"college"},
 {date:"Friday",title:"Wedding party rehearsal",time:"3:00 PM",location:"Palikū Gardens",at:"kualoa",description:"A quick ceremony walk-through followed by a toast with the wedding party.",audience:"wedding-party"}
];

/**
 * The words on the Week page. {time} is filled in for you.
 * The day-by-day tips for free time live on The island page
 * (content/island.ts, `explore.byDay`).
 */
export const weekPage = {
 tab: "The week",
 kicker: "Wedding week",
 title: "The week",
 intro: "Everything we have planned for the week, in order. To thank you for coming all this way, a couple of these are on us; the rest of the time is yours to enjoy Hawaiʻi your own way.",
 /** Added to the intro when some events are marked as the guest's own. */
 mineOne: "The one marked with a plumeria is just for you.",
 mineMany: "The ones marked with a plumeria are just for you.",
 sunset: "Sunset {time}",
 print: "Print the week",
 /** The "Day by day" row under the banner. */
 contents: "Day by day",
 freeTime: {
  text: "Free time between the gatherings? The island page has what is open on which day, and where to go.",
  link: "A free day, in full",
 },
};
