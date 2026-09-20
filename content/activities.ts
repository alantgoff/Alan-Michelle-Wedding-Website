import type { GroupId } from "./groups";
export type Audience = "everyone" | GroupId;
export type Activity = {date:string;title:string;time:string;location:string;description:string;audience:Audience;link?:string};
export const activities: Activity[] = [
 {date:"Friday",title:"Sunset welcome drinks",time:"5:30 PM",location:"TODO: Waikīkī location",description:"A relaxed first hello with sunset views and light bites.",audience:"everyone"},
 {date:"Saturday",title:"Wedding ceremony & reception",time:"TODO: Ceremony time",location:"Paliku Gardens",description:"The reason we are all here. Ceremony on the lawn, dinner and dancing under the pavilion.",audience:"everyone"},
 {date:"Sunday",title:"Beach morning",time:"10:00 AM",location:"TODO: Windward beach",description:"Coffee, fruit, and one last swim before everyone heads home.",audience:"everyone"},
 {date:"Thursday",title:"Family dinner",time:"6:00 PM",location:"TODO: Kāneʻohe",description:"An intimate dinner for our families before the weekend begins.",audience:"family"},
 {date:"Friday",title:"College crew ridge hike",time:"8:00 AM",location:"TODO: Trailhead",description:"A nostalgic morning outside with the college crew. Trail and transport details to come.",audience:"college"},
 {date:"Friday",title:"Wedding party rehearsal",time:"3:00 PM",location:"Paliku Gardens",description:"A quick ceremony walk-through followed by a toast with the wedding party.",audience:"wedding-party"}
];
