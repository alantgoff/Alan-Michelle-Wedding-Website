import type { GroupId } from "./groups";
export type Audience = "everyone" | GroupId;
/*
 * TODO: the ceremony is on FRIDAY, October 6, 2028 — corrected below to match
 * content/site.ts, which every page reads for the date.
 *
 * The surrounding days still need your decision, because other events were
 * also on Friday, alongside the ceremony:
 *   - Sunset welcome drinks  (probably Thursday, the night before). Until you
 *     choose, guests see it under "Day to be confirmed" rather than on the
 *     wedding day, since nobody can be in Waikīkī at 5:30 and at Kualoa too.
 *     Set its "date" to "Thursday" (or whichever day) when you have decided.
 *   - College crew ridge hike (Thursday, or Friday morning)
 *   - Wedding party rehearsal (probably Thursday)
 *   - Beach morning           (Saturday, or keep it Sunday)
 *   - Snorkel charter         (put on Saturday below; move it if you like)
 * Change the "date" values below to whatever you actually plan.
 *
 * ONE RULE FOR THE SNORKEL CHARTER: state law bars every commercial boat
 * from Kāneʻohe Bay on Sundays and on federal holidays. That weekend it
 * rules out Sunday, October 8 and Monday, October 9 (Columbus Day), so the
 * charter has to be Saturday, or a weekday before the wedding. Ask the
 * operator for their Kāneʻohe Bay permit when you book.
 *
 * The charter is open to everyone for now. If it turns out to be a smaller
 * group, change its "audience" to "family", "college" or "wedding-party" and
 * it will quietly disappear for everyone else — they are never told it exists.
 */
export type Activity = {date:string;title:string;time:string;location:string;description:string;audience:Audience;link?:string};
export const activities: Activity[] = [
 {date:"Day to be confirmed",title:"Sunset welcome drinks",time:"5:30 PM",location:"TODO: Waikīkī location",description:"A relaxed first hello with sunset views and light bites. Hoʻokipa is Hawaiian for hospitality: to welcome someone and treat them well. It is the whole idea of our first evening together.",audience:"everyone"},
 {date:"Friday",title:"Wedding ceremony & reception",time:"TODO: Ceremony time",location:"Palikū Gardens",description:"The reason we are all here. Ceremony on the lawn, then dinner and dancing under the lights. The old Hawaiian word for marrying, hoʻāo, probably meant to stay until daylight. We will settle for the last dance.",audience:"everyone"},
 {date:"Sunday",title:"Beach morning",time:"10:00 AM",location:"TODO: Windward beach",description:"Coffee, fruit, and one last swim before everyone heads home. There is an old saying, hoʻokahi nō lā o ka malihini: a stranger only for a day. After that, a guest pitches in. By Sunday morning you are family, so someone will hand you the coffee to carry.",audience:"everyone"},
 {date:"Saturday",title:"Private snorkel charter",time:"TODO: Departure time",location:"TODO: Kāneʻohe harbor",description:"A boat of our own out over the reef, with time in the water and the Koʻolau behind us the whole way. TODO: Add the operator, how long it runs, and whether gear is provided.",audience:"everyone"},
 {date:"Thursday",title:"Family dinner",time:"6:00 PM",location:"TODO: Kāneʻohe",description:"An intimate dinner for our families before the weekend begins.",audience:"family"},
 {date:"Friday",title:"College crew ridge hike",time:"8:00 AM",location:"TODO: Trailhead",description:"A nostalgic morning outside with the college crew. Trail and transport details to come.",audience:"college"},
 {date:"Friday",title:"Wedding party rehearsal",time:"3:00 PM",location:"Palikū Gardens",description:"A quick ceremony walk-through followed by a toast with the wedding party.",audience:"wedding-party"}
];

/**
 * BETWEEN THE GATHERINGS — a few things worth knowing about each day, shown
 * to everyone under the schedule. Each was checked against the State's, the
 * City's or the shop's own pages in late 2026; recheck them before you send
 * the invitations. The full guide is on The island page.
 */
export const ownTime = {
  title: "Between the gatherings",
  intro: "The island has its own timetable. A few things to know before you plan a free day.",
  tips: [
    { when: "Thursday", text: "Hoʻomaluhia Botanical Garden is closed every Thursday. The Byodo-In Temple, a few miles away, is open every day." },
    { when: "Saturday", text: "The day for Kāneʻohe Bay. No tour boat, charter or rental may run in the bay on a Sunday or a federal holiday, and Monday is one." },
    { when: "Saturday or Sunday", text: "For Hanauma Bay, booking opens two days ahead at 7 AM Hawaiʻi time: Thursday morning for Saturday, the wedding morning for Sunday. It is closed on Mondays and Tuesdays." },
    { when: "Sunday", text: "Waiāhole Poi Factory, four miles south of the gardens and on the way back to town, pounds poi by hand on Sundays when the harvest allows. Call ahead." },
  ],
  link: "A free day, in full",
};
