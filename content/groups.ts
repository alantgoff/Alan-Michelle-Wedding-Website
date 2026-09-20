export const groups = [
  {id:"college" as const,name:"College friends",slug:"college-7k4m"},
  {id:"family" as const,name:"Family",slug:"family-3f2a"},
  {id:"wedding-party" as const,name:"Wedding party",slug:"party-9q8v"},
];
export type GroupId = typeof groups[number]["id"];
