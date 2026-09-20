const base=process.env.BASE_URL||"http://localhost:3000";
const groupEvents={family:"Family dinner",college:"College crew ridge hike","wedding-party":"Wedding party rehearsal"};
const slugs={family:"family-3f2a",college:"college-7k4m","wedding-party":"party-9q8v"};
const all=Object.values(groupEvents);
function check(html,should,context){for(const event of all){const has=html.includes(event);if(has!==(event===should))throw new Error(`${context}: ${event} visibility ${has}`)}}
let html=await (await fetch(`${base}/v1/activities`)).text();check(html,null,"untagged");
for(const [group,slug] of Object.entries(slugs)){const r=await fetch(`${base}/i/${slug}`,{redirect:"manual"});const cookie=r.headers.get("set-cookie")?.split(";")[0];if(!cookie)throw new Error(`${group}: no cookie`);html=await (await fetch(`${base}/v1/activities`,{headers:{cookie}})).text();check(html,groupEvents[group],group)}
console.log("PASS: raw HTML contains only open events plus the matching group's private event.");
