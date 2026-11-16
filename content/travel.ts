/**
 * TRAVEL — getting here, where to stay, getting around, and going home.
 * Exploring the island (beaches, food, the water) is on The island page,
 * in content/island.ts.
 *
 * Every fact on this page was researched and then checked a second time
 * against primary sources (the State, the City and County of Honolulu, Kualoa
 * Ranch, the hotels themselves) in late 2026. That is not the same as being
 * current when the invitations go out: each claim that can change is marked
 * VERIFY below, with the place to check it. Search this folder for VERIFY to
 * see them all, and keep the same standard when adding anything.
 */

import type { Passage as PassageItem } from "./island";
import { site } from "./site";

export type Stay = {
  id: "waikiki" | "laie" | "turtle-bay" | "bay" | "ko-olina";
  title: string;
  /** Minutes to the gardens without traffic, shown large on the card. */
  minutes: string;
  text: string;
};

export type Crossing = { id: "h3" | "likelike" | "pali"; title: string; label: string; text: string };

/** A place on the drawn coast. The drawing itself (pins, positions) is in components/CoastMap.tsx. */
export type MapPlace = {
  name: string;
  kind: string;
  blurb: string;
  /** Where the full story is told; the chart only points there. */
  link?: { href: string; label: string };
};

export const travel = {
 /** The banner and the chapter names. */
 page: {
  tab: "Travel",
  kicker: "The journey",
  title: "Travel well",
  intro:
   "The windward side of Oʻahu rewards a little planning. Here is the honest version of getting there, staying nearby, and getting around.",
  chapters: {
   coast: "Where everything is",
   gettingThere: "Getting there",
   stay: "Where to stay",
   weather: "Weather",
   pack: "What to pack",
  },
  crossingsTitle: "Choose your crossing",
  /** Under the big number on each place to stay. */
  minutesUnit: "minutes to the gardens",
  /** Under the weather panel: the sea itself is on The island page. */
  water: { text: "Going in the ocean? The water in October, the currents and the jellyfish are on The island page.", link: "In the water" },
  print: "Print a copy for the glovebox",
  onward: {
   label: "With a free day",
   text: "Where to eat, what to see and how to be a good guest are in a short guide of their own.",
   link: "Open The island",
  },
 },

 /**
  * The card at the very top of the page: the essentials, each pointing down
  * to its chapter. {bay}, {laie} and {waikiki} are the minutes on the
  * places to stay below, so they only ever need changing there.
  */
 twoMinute: {
  title: "The two-minute version",
  items: [
   {
    title: "Where to stay",
    text: "There is no hotel at Kualoa. The nearest beds are around Kāneʻohe Bay ({bay} minutes) and in Lāʻie ({laie}); Waikīkī has the most rooms, {waikiki} minutes away.",
    link: { href: "#stay", label: "Where to stay" },
   },
   {
    title: "Book early, and keep it refundable",
    text: "Book as soon as you know you are coming, on a rate you can cancel: the island is busy in October, and the Monday after the wedding is a holiday.",
    link: { href: "#book-early", label: "Why, and what the bill will say" },
   },
   {
    title: "Rent a car",
    text: "Everyone drives in from Honolulu airport, about forty minutes on a clear road. Allow a good deal more on the Friday afternoon.",
    link: { href: "#getting-there", label: "Getting there" },
   },
  ],
 },

 /** Before the flight. */
 beforeYouFly: [
  {
   // VERIFY before invitations: REAL ID enforcement, children under 18, the ID-verification fee ($45) and its ten days. Source: tsa.gov (REAL ID; "Acceptable identification at the checkpoint"; TSA ConfirmID).
   title: "Bring the right ID",
   text: "Every adult needs a REAL ID–compliant license, a passport or another ID on TSA’s list to board; TSA has enforced this since May 2025. TSA does not ask children under 18 for ID on domestic flights, though your airline may have its own rules. If your ID is not accepted, TSA can try to confirm who you are for a fee ($45 when we checked in 2026), good for ten days from your travel date, but it is not guaranteed. Please check yours now, while there is plenty of time.",
  },
  {
   // VERIFY before invitations: Akamai Arrival name, five-day window, one form per household. Source: Hawaiʻi Department of Agriculture, hdoa.hawaii.gov (Plant Quarantine, Akamai Arrival).
   title: "The agriculture form, now on your phone",
   text: "Hawaiʻi asks everyone flying in from the mainland to declare any fresh fruit, vegetables, plants, seeds or animals they carry. The form is digital now, called Akamai Arrival, on every domestic flight. Fill it out up to five days before you fly, or on the plane if you have Wi-Fi, and send it even if you have nothing to declare. One adult can file for a household that shares an address and a place to stay. Hawaiʻi has guarded its plants for a long time: in 1888 King Kalākaua barred new coffee plants from the islands to protect the crop already here, and the declaration, created in 1973, comes from that same care.",
  },
 ] satisfies PassageItem[],

 /**
  * Arriving.
  * TODO: add shuttle details here if one is arranged (and update the FAQ).
  */
 gettingThere: [
  {
   // VERIFY before invitations: the consolidated rental car facility and walking access from Terminal 2. Source: airports.hawaii.gov/hnl (Rental cars).
   title: "Land, then collect the car",
   text: "You will fly into Honolulu (HNL). The airport’s ten rental companies share one building: a short walk from most of Terminal 2’s baggage claim, and a shuttle ride from everywhere else. From there to Kualoa is about twenty-one miles, around forty minutes on a clear road and longer at the wrong hour. A car is the easiest way to manage this side of the island.",
  },
  {
   // VERIFY before invitations: GoAkamai.org still runs live cameras. Source: goakamai.org (Hawaiʻi DOT).
   title: "Before you set out",
   text: "GoAkamai.org, the state’s traffic site, shows live cameras all over Oʻahu, including the roads over the Koʻolau. It is worth a look before any drive across the island.",
  },
 ] satisfies PassageItem[],

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
   // VERIFY before invitations: the route Kualoa Ranch recommends from Waikīkī. Source: kualoa.com (Directions).
   text: "What Kualoa Ranch suggests from Waikīkī: up through the Wilson Tunnel, opened in 1960, down into Kāneʻohe, then north along Kahekili Highway.",
  },
  {
   id: "pali",
   title: "The Pali",
   label: "The one with a view",
   // VERIFY before invitations: Pali Lookout hours (6 AM–6 PM) and the parking fee. Source: dlnr.hawaii.gov/dsp (Nuʻuanu Pali State Wayside).
   text: "Worth taking once, in daylight. Stop at the Nuʻuanu Pali lookout, twelve hundred feet up, where the wind is usually strong enough to lean on. It is open from six in the morning to six at night, and visitors pay a small fee to park.",
  },
 ] satisfies Crossing[],
 /** A piece of local lore, set under the three crossings. */
 crossingLore: {
  title: "And leave the pork at home",
  text: "Local lore says never to carry pork over the Pali, out of respect for an old quarrel between Pele and the pig demigod Kamapuaʻa. The storyteller Lopaka Kapanui says the tunnels are safe enough; it is the old road up by the lookout that minds.",
 },

 /** The road itself, the wedding afternoon, the way home, and the rules of the road. */
 road: [
  {
   // VERIFY before invitations: parking at the gardens (three tiers, about 80 cars). Source: Kualoa Ranch's Palikū Gardens venue sheet, or ask the ranch.
   id: "last-ten-minutes",
   title: "The last ten minutes",
   text: "At the Hygienic Store in Kahaluʻu, Kahekili Highway becomes Kamehameha Highway and the coast opens up. About ten minutes on, the road rounds the point past Mokoliʻi and the ranch is on your left. Kualoa is a sacred place, and slowing down here feels right. Parking at the gardens is in three tiers, with room for about 80 cars between them, so please share a car where you can. We will send the exact turn, and where to park, closer to the day.",
   link: { href: "/island#kualoa", label: "Why Kualoa is sacred" },
  },
  {
   title: "On the wedding afternoon",
   text: "Please leave more time than your map suggests. For the island, our wedding day is an ordinary Friday: schools are in session, and the afternoon traffic over the mountains flows toward the windward side, the same way you will be going. Along this coast there is one road and little way around a slow stretch. Once the ceremony time is set, we will tell you when to leave Waikīkī.",
  },
  {
   // VERIFY before invitations: the ranch's music curfew (ten o'clock) and the last Route 60 bus. Sources: Kualoa Ranch event rules; thebus.org (Route 60 timetable).
   id: "getting-home",
   title: "Getting home from the reception",
   text: "Please settle your way home before you come: a designated driver or a shared car is safest. The ranch asks that music end by ten. Rideshare cars are few out here at night, and even one reserved ahead is not guaranteed to arrive. When we checked in 2026, the last town-bound bus on Route 60 passed Kualoa a little after eleven; it is a long ride to Ala Moana, with a transfer for Waikīkī.",
  },
  {
   // VERIFY before invitations: the shaka as official state gesture (2024). Source: Hawaiʻi Revised Statutes ch. 5 (state emblems), capitol.hawaii.gov.
   title: "Driving with aloha",
   text: "Once you reach the coast road it is mostly one lane each way and rarely faster than thirty-five. Let people in, wave a car or two out of a side street, and thank anyone who does the same for you with a shaka: thumb and little finger out, three middle fingers curled. It has been Hawaiʻi’s official state gesture since 2024. Let a city bus merge and its rear sign may flash one back. Locals go easy on the horn.",
  },
  {
   // VERIFY before invitations: the hands-free phone law and the child-seat law (ages, height). Source: Hawaiʻi DOT, hidot.hawaii.gov (Highway Safety: distracted driving; child passenger safety), HRS §291C-137 and §291-11.5.
   id: "car-seats",
   title: "Two rules worth knowing",
   text: "In Hawaiʻi a driver may not hold a phone at all, even at a red light. Children under ten ride in a car seat or booster unless they are at least seven and taller than four feet nine, and babies under two ride rear-facing. If little ones are coming, please bring their seats or reserve them with the car.",
  },
  {
   id: "island-time",
   title: "Island time, quite literally",
   text: "Hawaiʻi never changes its clocks. In early October the mainland is still on daylight time, so Kualoa runs three hours behind the West Coast and six behind the East. Flying west is the gentle direction: your body catches up by about an hour and a half a day. Spend your first afternoon outside in real daylight, keep naps short, drink plenty of water, and stay up until a local bedtime. If you wake before dawn anyway, take it as an invitation: on the windward side the sun comes up out of the sea at about 6:24.",
  },
  {
   // VERIFY before invitations: the USDA pre-departure inspection, the lei exclusions, and which fruit may travel. Sources: aphis.usda.gov (Traveling from Hawaiʻi to the mainland); hdoa.hawaii.gov.
   // This is the site's one full version of the lei and fruit rules: The island page and the FAQ link here.
   id: "flying-home",
   title: "Flying home",
   text: "On the way back, your bags go through a USDA agricultural check before you reach the airline counter, so leave yourself a little extra time at the airport. Fresh flower lei are welcome as long as they hold no berries or hala (pandanus) fruit, no jade vine or maunaloa flowers, and nothing from citrus or its relatives. That includes mock orange, whose flowers and leaves are sometimes used in lei, so ask the lei maker. Pineapple and coconut can come too, and coffee beans in any amount. Most other fresh fruit stays on the island; papaya and banana travel only if treated at a USDA-approved facility and packed in sealed, stamped boxes.",
  },
 ] satisfies PassageItem[],

 /** Where to stay, nearest first. Drive times are without traffic, from two routing services. */
 stayIntro:
  "There is no hotel at Kualoa itself, so all of us will be driving in on the day. Here is where the beds are, what is legal to rent, and how long the road is from each. Drive times are without traffic. On a Friday afternoon, give yourself more.",
 stays: [
  {
   // VERIFY before invitations: Paradise Bay Resort was listed for sale in late 2026; the licensed-rental counts are a snapshot of the City's map from that date. Sources: the hotel; City DPP Short-Term Rental Compliance Map (honolulu.gov/dpp).
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
   // VERIFY before invitations: Turtle Bay's resort-zone condominiums are still licensed for short stays. Source: City DPP (honolulu.gov/dpp).
   id: "turtle-bay",
   title: "Turtle Bay",
   minutes: "40",
   text: "Further around the North Shore, the old Turtle Bay Resort is now The Ritz-Carlton Oʻahu, Turtle Bay. It is about 19 miles from us, 35 to 45 minutes, a little shorter than the drive from Waikīkī and far quieter. The hotel opened in 1972 as the Kuilima, “joining hands,” and the point it stands on is still Kuilima Point. The condominiums around the resort are also among the few places on Oʻahu licensed for short stays.",
  },
  {
   // VERIFY before invitations: Kualoa Ranch's 45-minute figure, and the resort fee and parking ($45 each at one hotel in late 2026). Sources: kualoa.com; the hotels' own rate pages.
   id: "waikiki",
   title: "Waikīkī",
   minutes: "45",
   text: "Waikīkī, “spouting water”, has the most rooms, restaurants and evenings out on the island. Kualoa Ranch puts the drive at about 45 minutes, over the Likelike Highway and through the Wilson Tunnel. On the wedding afternoon it will take longer; we will tell you when to leave once the ceremony time is set. Most hotels add a nightly resort fee and parking on top of the room; at one we checked in late 2026, each was $45 before tax.",
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
   // VERIFY before invitations: the under-30-night rule, NUC/registration number and TMK display, and the City's compliance map. Source: City DPP, honolulu.gov/dpp (Short-Term Rentals).
   title: "Before you book a rental",
   text: "A legal listing for fewer than 30 nights shows two numbers: its City registration or NUC number, and its tax map key (TMK). If a listing for a home in Kailua or Kāneʻohe doesn’t show both, assume it can’t legally be rented for our weekend. You can look up any TMK on the City’s Short-Term Rental Compliance Map. A licensed bed-and-breakfast is a room or two in a home where the host lives. Hotels don’t appear on the map, and don’t need to.",
  },
  {
   // VERIFY before invitations: the room-tax rates (TAT 11%, Oʻahu TAT 3%, GET 4.712%, total 18.712%), resort fees being taxed, and the 2025 fee-display rule. Source: Hawaiʻi Department of Taxation, tax.hawaii.gov; Hawaiʻi Office of Consumer Protection (fee display).
   title: "What the bill will say",
   text: "As of 2026, taxes add 18.712% to every room night on Oʻahu: the state’s 11% Transient Accommodations Tax, Oʻahu’s own 3%, and 4.712% general excise. Resort fees are taxed too. Since 2025, hotels and rentals have had to show their required fees in the first price you see. The newest part of the tax, added in 2026, is meant to pay for protecting Hawaiʻi’s forests and shores, preparing the islands for a changing climate, and easing tourism’s footprint.",
  },
  {
   // VERIFY before invitations: October 2025 hotel occupancy (over three-quarters) and the October 9, 2028 holiday. Sources: Hawaiʻi Tourism Authority / DBEDT monthly hotel reports; opm.gov federal holidays.
   id: "book-early",
   title: "Book early, and keep it refundable",
   text: "Book as soon as you know you are coming, on a rate you can cancel. Oʻahu is never empty: even in October 2025, one of its quieter months, the island’s hotels were more than three-quarters full. And the Monday after the wedding, October 9, 2028, is a federal holiday (Columbus Day; in Hawaiʻi it is Indigenous Peoples’ Day), so some of you, and plenty of other travelers, will have a long weekend.",
  },
 ] satisfies PassageItem[],

 /**
  * The drawn coast at the top of the page. Each place points to where its
  * story is told in full rather than repeating it. The drawing, the pins and
  * their short names are in components/CoastMap.tsx.
  */
 map: {
  intro:
   "An illustration, not a navigational chart. The coastline is drawn by feel and the distances are invented, so please do not use it to find your way. Choose a point to read what happens there.",
  indexLabel: "Places on the chart",
  places: {
   airport: {
    name: "Honolulu airport",
    kind: "Where you land",
    blurb: "Every guest starts here. Collect the car before you do anything else.",
    link: { href: "#getting-there", label: "Getting there" },
   },
   waikiki: {
    name: "Waikīkī",
    kind: "Where to stay",
    blurb: "The south shore, and the most rooms on the island.",
    link: { href: "#stay", label: "Where to stay" },
   },
   koolina: {
    name: "Ko Olina",
    kind: "Where to stay",
    blurb: "The far western shore: lagoons and big resorts.",
    link: { href: "#stay", label: "Where to stay" },
   },
   northshore: {
    name: "North Shore",
    kind: "Where to stay",
    blurb: "The far side of the island, quiet and green, and closer than it looks.",
    link: { href: "#stay", label: "Where to stay" },
   },
   ridge: {
    name: "The Koʻolau ridge",
    kind: "The wall down the middle",
    blurb:
     "The green wall that separates the windward side from town. Every drive to the venue crosses it or runs along its foot, and it is the reason the weather changes in ten minutes.",
    link: { href: "#crossings", label: "The three ways over" },
   },
   kaneohe: {
    name: "Kāneʻohe",
    kind: "Where to stay",
    blurb: "The bay town nearest the venue, with a reef flat in front of it.",
    link: { href: "#stay", label: "Where to stay" },
   },
   beaches: {
    name: "Kailua & Lanikai",
    kind: "Where to spend a morning",
    blurb: "Turquoise water and pale sand on the windward coast.",
    link: { href: "/island#explore", label: "Kailua, Lanikai and a free day" },
   },
   venue: {
    name: site.venue,
    kind: "The wedding",
    blurb: site.tagline,
    link: { href: "/island#kualoa", label: "About this place" },
   },
  } satisfies Record<string, MapPlace>,
  panel: {
   date: "Date",
   ceremony: "Time",
   address: "Address",
   maps: "Open the venue in Google Maps",
   weekend: "The weekend, in order",
   here: "Happening here",
   /** Beside each place to stay on the chart. */
   minutes: "{minutes} minutes to the gardens",
  },
 },

 /**
  * The packing list. Ticks are remembered on each guest's own device.
  * VERIFY before invitations: the sunscreen sale ban (oxybenzone, octinoxate; Act 104, 2018) and Oʻahu's checkout-bag charge (at least 15 cents). Sources: capitol.hawaii.gov; City Department of Environmental Services, opala.org.
  */
 packing: ["Sunscreen without oxybenzone or octinoxate, which Hawaiʻi no longer sells; the state suggests mineral ones","A light rain layer; showers pass in minutes","Shoes that like grass, for the ceremony lawn","Swimsuit, and a sarong or towel for the beach morning","A hat and sunglasses","Something light and warm for the breeze off the water at night","Insect repellent for the lawn at dusk; mosquitoes are busiest around sunrise and sunset","Your outfit for the wedding, something that breathes","Your REAL ID or passport","A folding tote; Oʻahu stores charge at least 15 cents for a checkout bag","A refillable water bottle","Any prescriptions, with a copy of the prescription","The venue address and a screenshot of the weekend, saved on your phone"],
 /** The line above the packing list. {packed} and {total} are filled in for you. */
 packingStatus: {
  none: "Nothing packed yet",
  all: "All packed. See you there.",
  some: "{packed} of {total} packed",
 },
};
