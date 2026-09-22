import type { GroupId } from "./groups";
export type Audience = "everyone" | GroupId;
/*
 * TODO: the ceremony is on FRIDAY, October 6, 2028 — corrected below to match
 * content/site.ts, which every page reads for the date.
 *
 * The surrounding days still need your decision, because three other events
 * are also on Friday and now sit alongside the ceremony:
 *   - Sunset welcome drinks  (probably Thursday, the night before)
 *   - College crew ridge hike (Thursday, or Friday morning)
 *   - Wedding party rehearsal (probably Thursday)
 *   - Beach morning           (Saturday, or keep it Sunday)
 *   - Snorkel charter         (put on Saturday below; move it if you like)
 * Change the "date" values below to whatever you actually plan.
 *
 * The charter is open to everyone for now. If it turns out to be a smaller
 * group, change its "audience" to "family", "college" or "wedding-party" and
 * it will quietly disappear for everyone else — they are never told it exists.
 */
export type Activity = {date:string;title:string;time:string;location:string;description:string;audience:Audience;link?:string};
export const activities: Activity[] = [
 {date:"Friday",title:"Sunset welcome drinks",time:"5:30 PM",location:"TODO: Waikīkī location",description:"A relaxed first hello with sunset views and light bites.",audience:"everyone"},
 {date:"Friday",title:"Wedding ceremony & reception",time:"TODO: Ceremony time",location:"Paliku Gardens",description:"The reason we are all here. Ceremony on the lawn, dinner and dancing under the pavilion.",audience:"everyone"},
 {date:"Sunday",title:"Beach morning",time:"10:00 AM",location:"TODO: Windward beach",description:"Coffee, fruit, and one last swim before everyone heads home.",audience:"everyone"},
 {date:"Saturday",title:"Private snorkel charter",time:"TODO: Departure time",location:"TODO: Kāneʻohe harbor",description:"A boat of our own out over the reef, with time in the water and the Koʻolau behind us the whole way. TODO: Add the operator, how long it runs, and whether gear is provided.",audience:"everyone"},
 {date:"Thursday",title:"Family dinner",time:"6:00 PM",location:"TODO: Kāneʻohe",description:"An intimate dinner for our families before the weekend begins.",audience:"family"},
 {date:"Friday",title:"College crew ridge hike",time:"8:00 AM",location:"TODO: Trailhead",description:"A nostalgic morning outside with the college crew. Trail and transport details to come.",audience:"college"},
 {date:"Friday",title:"Wedding party rehearsal",time:"3:00 PM",location:"Paliku Gardens",description:"A quick ceremony walk-through followed by a toast with the wedding party.",audience:"wedding-party"}
];
