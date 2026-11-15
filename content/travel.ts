/**
 * TRAVEL — getting here, staying, packing, and going home.
 *
 * Every fact on this page was researched and then checked a second time
 * against primary sources (the State, the City and County of Honolulu, Kualoa
 * Ranch, the hotels themselves). Prices, counts and tax rates are marked with
 * the date they were checked: please look at them again before the
 * invitations go out, and keep the same standard when adding anything.
 */

export type Stay = {
  id: "waikiki" | "laie" | "turtle-bay" | "bay" | "ko-olina";
  title: string;
  /** Minutes to the gardens without traffic, shown large on the card. */
  minutes: string;
  text: string;
};

export type Crossing = { id: "h3" | "likelike" | "pali"; title: string; label: string; text: string };

export const travel = {
 /**
  * Before the flight. The ID fee and the form's details are as of 2026:
  * check both again before the invitations go out.
  */
 beforeYouFly: [
  {
   title: "Bring the right ID",
   text: "Every adult needs a REAL ID–compliant license, a passport or another ID on TSA’s list to board; TSA has enforced this since May 2025. TSA does not ask children under 18 for ID on domestic flights, though your airline may have its own rules. If your ID is not accepted, TSA can try to confirm who you are for a fee ($45 when we checked in 2026), good for ten days from your travel date, but it is not guaranteed. Please check yours now, while there is plenty of time.",
  },
  {
   title: "The agriculture form, now on your phone",
   text: "Hawaiʻi asks everyone flying in from the mainland to declare any fresh fruit, vegetables, plants, seeds or animals they carry. The form is digital now, called Akamai Arrival, on every domestic flight. Fill it in up to five days before you fly, or on the plane if you have Wi-Fi, and send it even if you have nothing to declare. One adult can file for a household that shares an address and a place to stay. Hawaiʻi has guarded its plants for a long time: in 1888 King Kalākaua barred new coffee plants from the islands to protect the crop already here, and the declaration, created in 1973, comes from that same care.",
  },
 ],

 /**
  * Arriving. Also shown on the coast chart, under the airport.
  * TODO: add shuttle details here if one is arranged.
  */
 gettingThere: [
  {
   title: "Land, then collect the car",
   text: "You will fly into Honolulu (HNL). The airport’s ten rental companies share one building: a short walk from most of Terminal 2’s baggage claim, and a shuttle ride from everywhere else. From there to Kualoa is about twenty-one miles, around forty minutes on a clear road and longer at the wrong hour. A car is the easiest way to manage this side of the island.",
  },
  {
   title: "Before you set out",
   text: "GoAkamai.org, the state’s traffic site, shows live cameras all over Oʻahu, including the roads over the Koʻolau. It is worth a look before any drive across the island.",
  },
 ],

 /** The three roads over the mountains. `id` picks the little drawing. */
 crossingsIntro:
  "The Koʻolau stand between the airport and us, and there are three ways over. All three end up on the same coast road.",
 crossings: [
  {
   id: "h3",
   title: "The H-3",
   label: "The dramatic one",
   text: "The newest way over the mountains, opened in 1997. It runs through the longest road tunnels in Hawaiʻi and comes out high above Haʻikū Valley, with Kāneʻohe Bay laid out in front of you.",
  },
  {
   id: "likelike",
   title: "The Likelike",
   label: "The ranch’s own route",
   text: "What Kualoa Ranch suggests from Waikīkī: up through the Wilson Tunnel, opened in 1960, down into Kāneʻohe, then north along Kahekili Highway.",
  },
  {
   id: "pali",
   title: "The Pali",
   label: "The one with a view",
   text: "Worth taking once, in daylight. Stop at the Nuʻuanu Pali lookout, twelve hundred feet up, where the wind is usually strong enough to lean on. It is open from six in the morning to six at night, and visitors pay a small fee to park.",
  },
 ] satisfies Crossing[],
 /** A piece of local lore, set under the three crossings. */
 crossingLore: {
  title: "And leave the pork at home",
  text: "Local lore says never to carry pork over the Pali, out of respect for an old quarrel between Pele and the pig demigod Kamapuaʻa. The storyteller Lopaka Kapanui says the tunnels are safe enough; it is the old road up by the lookout that minds.",
 },

 /** The road itself, the wedding afternoon, and the way home. */
 road: [
  {
   title: "The last ten minutes",
   text: "At the Hygienic Store in Kahaluʻu, Kahekili Highway becomes Kamehameha Highway and the coast opens up. About ten minutes on, the road rounds the point past Mokoliʻi and the ranch is on your left. Kualoa has long been held among the most sacred places on Oʻahu; when a chief was here, passing canoes lowered their masts. Slowing down here feels right. We will send the exact turn for the gardens, and where to park, closer to the day.",
  },
  {
   title: "On the wedding afternoon",
   text: "For the island, our wedding day is an ordinary Friday. Schools are in session, and the afternoon traffic over the mountains flows toward the windward side, the same way you will be going. Along this coast there is one road and little way around a slow stretch, so please leave more time than your map suggests. Once the ceremony time is set, we will tell you when to leave Waikīkī.",
  },
  {
   title: "Getting home",
   text: "The ranch asks that music end by ten. Please settle your way home before you come: a designated driver or a shared car is safest. Rideshare cars are few out here at night, and even one reserved ahead is not guaranteed to arrive. When we checked in 2026, the last town-bound bus on Route 60 passed Kualoa a little after eleven; it is a long ride to Ala Moana, with a transfer for Waikīkī.",
  },
  {
   title: "Driving with aloha",
   text: "Once you reach the coast road it is mostly one lane each way and rarely faster than thirty-five. Let people in, wave a car or two out of a side street, and thank anyone who does the same for you with a shaka: thumb and little finger out, three middle fingers curled. It has been Hawaiʻi’s official state gesture since 2024. Let a city bus merge and its rear sign may flash one back. Locals go easy on the horn.",
  },
  {
   title: "Two rules worth knowing",
   text: "In Hawaiʻi a driver may not hold a phone at all, even at a red light. Children under ten ride in a car seat or booster unless they are at least seven and taller than four feet nine, and babies under two ride rear-facing. If little ones are coming, please bring their seats or reserve them with the car.",
  },
  {
   title: "Island time, quite literally",
   text: "Hawaiʻi never changes its clocks. In early October the mainland is still on daylight time, so Kualoa runs three hours behind the West Coast and six behind the East. Flying west is the gentle direction: your body catches up by about an hour and a half a day. Spend your first afternoon outside in real daylight, keep naps short, drink plenty of water, and stay up until a local bedtime. If you wake before dawn anyway, take it as an invitation: on the windward side the sun comes up out of the sea at about 6:24.",
  },
  {
   title: "Going home",
   text: "On the way back, your bags go through a USDA agricultural check before you reach the airline counter, so leave yourself a little extra time at the airport. Fresh flower lei are welcome as long as they hold no berries or hala (pandanus) fruit, no jade vine or maunaloa flowers, and nothing from citrus or its relatives. That includes mock orange, whose flowers and leaves are sometimes used in lei, so ask the lei maker. Pineapple and coconut can come too, and coffee beans in any amount. Most other fresh fruit stays on the island; papaya and banana travel only if treated at a USDA-approved facility and packed in sealed, stamped boxes.",
  },
 ],

 /** Where to stay, nearest first. Drive times are without traffic, from two routing services. */
 stayIntro:
  "There is no hotel at Kualoa itself, so all of us will be driving in on the day. This is the honest version: where the beds are, what is legal to rent, and how long the road is from each. Drive times are without traffic. On a Friday afternoon, give yourself more.",
 stays: [
  {
   // Recheck before the invitations go out: in late 2026 Paradise Bay Resort
   // was listed for sale, and the licence counts are a snapshot of that date.
   id: "bay",
   title: "Kāneʻohe Bay and Kailua",
   minutes: "15–⁠35",
   text: "On this side of the mountains, homes are kept for neighbors. A stay of fewer than 30 nights is legal here only in a home the City has licensed, and there are very few: about four dozen in Kailua and a single one in Kāneʻohe when we checked the City’s map in late 2026. A small, long-established hotel on the bay is Paradise Bay Resort in Kahaluʻu, ten to fifteen minutes from the gardens, with kayaks and paddleboards at its docks. Kailua is a little over half an hour away.",
  },
  {
   id: "laie",
   title: "Lāʻie",
   minutes: "25",
   text: "The nearest full-size hotel is the Courtyard by Marriott Oahu North Shore in Lāʻie, next door to the Polynesian Cultural Center. It is about 12 miles up the coast road, 20 to 30 minutes from the gardens, with no mountains to cross.",
  },
  {
   id: "turtle-bay",
   title: "Turtle Bay",
   minutes: "40",
   text: "Further around the North Shore, the old Turtle Bay Resort is now The Ritz-Carlton Oʻahu, Turtle Bay. It is about 19 miles from us, 35 to 45 minutes, a little shorter than the drive from Waikīkī and far quieter. The hotel opened in 1972 as the Kuilima, “joining hands,” and the point it stands on is still Kuilima Point. The condominiums around the resort are also among the few places on Oʻahu licensed for short stays.",
  },
  {
   id: "waikiki",
   title: "Waikīkī",
   minutes: "45",
   text: "“Spouting water.” Waikīkī has the most rooms, restaurants and evenings out on the island. Kualoa Ranch puts the drive at about 45 minutes, over the Likelike Highway and through the Wilson Tunnel. Allow an hour on the wedding afternoon. Most hotels add a nightly resort fee and parking on top of the room; at one we checked in late 2026, each was $45 before tax.",
  },
  {
   id: "ko-olina",
   title: "Ko Olina",
   minutes: "60",
   text: "On the far western shore, Ko Olina (the resort calls it “place of joy”) has Aulani, the Four Seasons and Marriott’s Ko Olina Beach Club, set around protected lagoons. It is the longest drive to us: about 38 miles, around an hour with clear roads and a good deal more in weekday traffic. We would save it for the days before or after the wedding.",
  },
 ] satisfies Stay[],
 stayNotes: [
  {
   title: "Before you book a rental",
   text: "A legal listing for fewer than 30 nights shows two numbers: its City registration or NUC number, and its tax map key (TMK). If a listing for a home in Kailua or Kāneʻohe doesn’t show both, assume it can’t legally be rented for our weekend. You can look up any TMK on the City’s Short-Term Rental Compliance Map. A licensed bed-and-breakfast is a room or two in a home where the host lives. Hotels don’t appear on the map, and don’t need to.",
  },
  {
   title: "What the bill will say",
   text: "As of 2026, taxes add 18.712% to every room night on Oʻahu: the state’s 11% Transient Accommodations Tax, Oʻahu’s own 3%, and 4.712% general excise. Resort fees are taxed too. Since 2025, hotels and rentals have had to show their required fees in the first price you see. The newest part of the tax, added in 2026, is meant to pay for protecting Hawaiʻi’s forests and shores, preparing the islands for a changing climate, and easing tourism’s footprint.",
  },
  {
   title: "Book early, and keep it refundable",
   text: "Oʻahu is never empty: even in October 2025, one of its quieter months, the island’s hotels were more than three-quarters full. The Monday after the wedding, October 9, 2028, is a federal holiday (Columbus Day; in Hawaiʻi it is Indigenous Peoples’ Day), so some of you, and plenty of other travelers, will have a long weekend. We would book as soon as you know you are coming, on a rate you can cancel.",
  },
 ],

 /** A short list for the coast chart. The full guide is on The island page. */
 explore: ["Swim at Kailua Beach", "Drive the windward coast", "Try a plate lunch and a shave ice"],

 /**
  * Two practical notes that appear on the coast chart: the chart needs
  * JavaScript to open a place, so both are also said in full on the pages.
  */
 crossing: {
  title: "Allow for the crossing",
  text: "The H-3, the Likelike and the Pali Highway are the only quick ways over the mountains. On weekday afternoons the traffic flows toward the windward side, the same way you will be driving to us.",
 },
 beachParking: {
  title: "Start at Kailua Beach",
  text: "Kailua Beach has a parking lot and lifeguards every day from 8 AM to 6:30 PM. Lanikai, around the point, has no lifeguard and almost no parking, so park in Kailua and walk.",
 },

 /** The sea that week. Shown beside the weather. */
 water: [
  {
   title: "The water in October",
   text: "Early October is a change of seasons on the water. Waikīkī’s summer swells are winding down, the North Shore’s first winter swells can begin to arrive, and our windward side keeps its steady trade-wind chop. Kāneʻohe Bay, behind one of only two barrier reefs in the state, is Hawaiʻi’s largest sheltered body of water. The water is about 80°F, sometimes a little warmer.",
  },
  {
   title: "A note from the moon",
   text: "If you are staying in Waikīkī: its box jellyfish keep to a lunar timetable, usually arriving eight to twelve days after the full moon. That October the moon is full on the 3rd, so they are not expected until the week after the wedding. Lifeguard signs always have the last word.",
  },
  {
   title: "The ocean, on its own terms",
   text: "Swim where a lifeguard is on duty, and ask them about the day; nobody knows this water better. On our side of the island, Kailua Beach is guarded every day from 8 AM to 6:30 PM, and Lanikai is not guarded at all. Never turn your back on the ocean, never swim alone, and keep the keiki close. If a current takes you, stay calm; currents generally do not pull you under. Float, go with it rather than fight it, and wave and call toward shore. When in doubt, don’t go out.",
  },
  {
   title: "If it has been raining",
   text: "In the Weather Service’s records, October and November have seen more flash floods than any other months, and a stream can rise within minutes from rain falling far up in the mountains, even when it is dry where you stand. Never cross a stream that is running high: wait, or turn around. Admire the waterfalls rather than swimming in them. Fresh water here can carry leptospirosis, so stay out of streams and ponds, above all if you have a cut, and keep your head above the water.",
  },
 ],

 /** The packing list. Ticks are remembered on each guest’s own device. */
 packing:["Sunscreen without oxybenzone or octinoxate, which Hawaiʻi no longer sells; the state suggests mineral ones","A light rain layer; showers pass in minutes","Shoes that like grass, for the ceremony lawn","Swimsuit, and a sarong or towel for the beach morning","A hat and sunglasses","Something light and warm for the breeze off the water at night","Insect repellent for the lawn at dusk; mosquitoes are busiest around sunrise and sunset","Your outfit for the wedding, something that breathes","Your REAL ID or passport","A folding tote; Oʻahu stores charge at least 15 cents for a checkout bag","A refillable water bottle","Any prescriptions, with a copy of the prescription","Your invite link, saved on your phone"]
};
