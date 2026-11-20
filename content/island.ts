/**
 * THE ISLAND — where to eat, the best spots, planning a free day, the water,
 * a few rules, and three facts about the venue. Practical first.
 *
 * Everything here was researched and checked against primary sources (the
 * City, the State, the places themselves). Hours, prices and rules change:
 * each one that can is marked VERIFY below, with the place to check it.
 * Search this folder for VERIFY to see them all. If you are not sure of
 * something new, leave it out.
 */

import type { PointKey } from "@/lib/island";
import type { SpotPhotoKey } from "./photos";

/**
 * One titled passage. Optional: `id`, so another page can link straight to
 * it, and `link`, a line underneath pointing to where a fact is told in full.
 */
export type Passage = {
  title: string;
  text: string;
  id?: string;
  link?: { href: string; label: string };
  /** Where it is, for the little locator map beside the title (lib/island.ts). */
  at?: PointKey;
  /** For a day out that closes on some days: the days it opens (My week greys out the rest). */
  open?: Weekday[];
};

export type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
/** Open every day of the week. */
const daily: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** Open every day but these. */
const except = (...closed: Weekday[]): Weekday[] => daily.filter((d) => !closed.includes(d));

/** A restaurant on the list. `price` runs $ to $$$$, from its own menu. */
export type Place = {
  id?: string;
  name: string;
  /** The neighborhood, shown in small type beside a locator map dotted at `at`. */
  area: string;
  at: PointKey;
  what: string;
  order?: string;
  price?: string;
  hours?: string;
  /**
   * The days it opens at all, for the "Open on…" filter; keep in step with
   * `hours`. Leave it out when the hours aren't known and the place always shows.
   */
  open?: Weekday[];
  book?: string;
  href?: string;
};

/** A spot worth the drive, with its photograph (by name in content/photos.ts, `spotPhotos`). */
export type Spot = {
  id: string;
  name: string;
  photo: SpotPhotoKey;
  why: string;
  drive: string;
  facts: string[];
  href?: string;
};

export const island = {
  /** The banner and the chapter names. */
  page: {
    tab: "The island",
    kicker: "Where we are",
    title: "The island",
    intro: "Where to eat, the best spots, planning a free day, and what to know before you go in the water.",
    chapters: {
      eat: "Where to eat",
      spots: "The best spots",
      explore: "Plan your free days",
      water: "In the water",
      rules: "Rules worth knowing",
      venue: "About the venue",
    },
  },

  /**
   * Chapter: where to eat. Mostly Waikīkī and nearby Honolulu, then a few
   * near the venue and on the North Shore. Price runs $ (under $20 a main)
   * to $$$$ (over $50), from each place's own menu.
   * VERIFY before invitations: every entry's hours, closed days and booking,
   * and that it is still open. Read November 17, 2026, from each place's own
   * site (links below); awards from Honolulu Magazine's Hale ʻAina 2026 and
   * the James Beard Foundation.
   */
  eat: {
    lede:
      "Mostly in Waikīkī and nearby Honolulu, a short ride from the hotels, with a few near the venue and on the North Shore. Hours were checked in November 2026, and we will check them again before you fly.",
    labels: { order: "Order", closed: "Closed that day" },
    /** The "Open on…" day filter over the list. `{n}` and `{total}` are filled in. */
    openOn: {
      label: "Open on",
      any: "Any day",
      wedding: "wedding",
      count: "{n} of {total} open that day",
      all: "All {total}, any day",
    },
    groups: [
      {
        title: "Breakfast and coffee",
        places: [
          { name: "Café Kaila", area: "Kapahulu", at: "kapahulu", price: "$", what: "A sit-down breakfast and brunch café.", order: "Buttermilk pancakes with fruit, or the kalua pork Benedict", hours: "Mon–Fri 7 AM–6 PM, Sat–Sun 7 AM–3 PM", open: daily, href: "https://www.cafe-kaila-hawaii.com/" },
          { name: "Koko Head Cafe", area: "Kaimukī", at: "kaimuki", what: "A popular sit-down brunch spot.", hours: "Mon–Fri 8 AM–1 PM, Sat–Sun 8 AM–2 PM", open: daily, book: "Book on OpenTable", href: "https://kokoheadcafe.com" },
          { name: "Kona Coffee Purveyors", area: "Waikīkī, International Market Place", at: "waikiki", what: "Kona coffee and b. patisserie pastries, at the counter.", order: "A kouign-amann or a croissant", book: "Counter service", href: "https://www.konacoffeepurveyors.com/pages/visit-us" },
        ],
      },
      {
        title: "Poke and plate lunch",
        places: [
          { name: "Ono Seafood", area: "Kapahulu", at: "kapahulu", price: "$", what: "A takeout poke counter with a couple of picnic tables.", order: "Shoyu ʻahi or spicy ʻahi poke", hours: "Tue–Sat 9 AM–4 PM", open: ["Tue", "Wed", "Thu", "Fri", "Sat"], book: "Walk-in", href: "https://www.instagram.com/ono.seafood/" },
          { name: "Rainbow Drive-In", area: "Kapahulu", at: "kapahulu", price: "$", what: "A classic plate-lunch drive-in, open since 1961.", order: "The mix plate or the loco moco", hours: "Daily 7 AM–9 PM", open: daily, book: "Walk-up", href: "https://www.rainbowdrivein.com/" },
          { name: "Helena’s Hawaiian Food", area: "Kalihi", at: "kalihi", price: "$", what: "A family Hawaiian-food restaurant and a James Beard America’s Classic.", order: "Pipikaula short ribs and laulau", hours: "Tue–Fri 10 AM–7:30 PM only", open: ["Tue", "Wed", "Thu", "Fri"], book: "Order ahead by phone or online", href: "https://helenashawaiianfood.com" },
        ],
      },
      {
        title: "Dinners worth booking",
        places: [
          { name: "Fête", area: "Chinatown", at: "chinatown", price: "$$$", what: "Seasonal New American cooking from a James Beard Award–winning chef; the menu changes with the seasons.", hours: "Daily, Sunday from 4 PM", open: daily, book: "OpenTable for 8 or fewer; call for more", href: "https://www.fetehawaii.com/" },
          { name: "The Pig & the Lady", area: "Kaimukī", at: "kaimuki", price: "$$–$$$", what: "Modern Vietnamese.", order: "The phở French dip at lunch", hours: "Lunch Wed–Sun, dinner Tue–Sat; closed Monday", open: except("Mon"), book: "Book on OpenTable", href: "https://thepigandthelady.com" },
          { name: "Mud Hen Water", area: "Kaimukī", at: "kaimuki", price: "$$$", what: "Small plates built on Hawaiʻi-grown ingredients.", order: "Fried ʻulu and the grilled octopus", hours: "Dinner Tue–Sun, brunch Sat–Sun; closed Monday", open: except("Mon"), book: "Book on OpenTable", href: "https://www.mudhenwater.com/" },
          { name: "Arden Waikīkī", area: "Waikīkī, Diamond Head end", at: "waikiki", price: "$$$", what: "Locally owned, contemporary shared plates.", hours: "Wed–Sun 5–9 PM", open: except("Mon", "Tue"), book: "Book on OpenTable", href: "https://www.ardenwaikiki.com/" },
        ],
      },
      {
        title: "Malasadas and shave ice",
        places: [
          { name: "Leonard’s Bakery", area: "Kapahulu", at: "kapahulu", price: "$", what: "The classic malasada bakery.", order: "An original sugar malasada, or a custard or haupia puff", hours: "Daily 5:30 AM–7 PM", open: daily, book: "Walk-in", href: "https://www.leonardshawaii.com/" },
          { name: "Waiola Shave Ice", area: "Mōʻiliʻili and Kapahulu", at: "moiliili", price: "$", what: "A family shave ice shop since 1978.", order: "The azuki mochi bowl", hours: "Daily 11 AM–6 PM (Waiola St)", open: daily, book: "Walk-up", href: "https://www.waiolashaveice.co/" },
        ],
      },
      {
        title: "Near the venue and the North Shore",
        places: [
          { name: "Aunty Pat’s Café", area: "Kualoa Ranch", at: "kualoa", what: "The ranch café, with the ranch’s own beef.", order: "The loco moco, or the banana-kalo bread pudding", hours: "Daily 7:30 AM–3 PM", open: daily, href: "https://kualoa.com/dine-and-shop" },
          { id: "waiahole", name: "Waiāhole Poi Factory", area: "Waiāhole, near Kāneʻohe", at: "waiahole", price: "$", what: "Hawaiian food from a counter in an old valley poi mill.", order: "The laulau plate, and the Sweet Lady of Waiāhole for dessert", hours: "Wed–Mon 10 AM–6 PM; closed Tuesday", open: except("Tue"), book: "Walk-in; hand-pounded poi on Wednesdays and Sundays", href: "https://www.waiaholepoifactory.com/" },
          { name: "Over Easy", area: "Kailua", at: "kailua", what: "A small breakfast and brunch spot.", order: "The kalua pig hash or the Kailua eggs", hours: "Wed–Sun mornings; closed Mon–Tue", open: except("Mon", "Tue"), book: "No reservations; call to join the waitlist", href: "https://www.overeasyhi.com/over-easy" },
          { name: "Giovanni’s Shrimp Truck", area: "Kahuku", at: "kahuku", price: "$", what: "The original North Shore garlic-shrimp truck.", order: "The scampi plate", hours: "Daily 10:30 AM–6:30 PM", open: daily, book: "Walk-up; cash recommended", href: "https://www.giovannisshrimptruck.com/" },
          { name: "Matsumoto Shave Ice", area: "Haleʻiwa", at: "haleiwa", price: "$", what: "North Shore shave ice since 1951.", order: "A large shave ice, or the Ichiban special", hours: "Daily 10 AM–6 PM", open: daily, book: "Walk-up; expect a line", href: "https://www.matsumotoshaveice.com/" },
          // VERIFY before invitations: Haleiwa Seafood's hours and that the katsu is still on the menu. Its own menu (updated January 2024) lists an ahi katsu plate and burger, not pork. Source: haleiwaseafood.com.
          { name: "Haleiwa Seafood", area: "Haleʻiwa", at: "haleiwa", price: "$", what: "A Haleʻiwa food truck, and the katsu stop on a North Shore day.", order: "The ahi katsu plate", hours: "Daily from 11 AM", open: daily, book: "Walk-up", href: "https://www.haleiwaseafood.com/" },
          // VERIFY before invitations: Green World's hours (daily 7 AM–6 PM in late 2026), free tours and tastings. Source: greenworldcoffeefarm.com.
          { name: "Green World Coffee Farm", area: "Wahiawā, on the drive north", at: "wahiawa", price: "$", what: "A working coffee farm with an espresso bar. Tastings of its coffees and teas are free, and so is a walk through the trees.", order: "A tasting first, then a coffee from the bar", hours: "Daily 7 AM–6 PM", open: daily, book: "Walk-in; farm tours free, first come, first served", href: "https://www.greenworldcoffeefarm.com/" },
        ],
      },
    ] satisfies { title: string; places: Place[] }[],
    /**
     * Poke, from Foodland's seafood counter, with a drawing of each kind.
     * `kinds[].id` picks the drawing in components/PokeBowls.tsx.
     * VERIFY before invitations: the flavors (they vary by store and day; the
     * shop's own listings in late 2026 included shoyu, spicy, limu and Hawaiian
     * style ʻahi, tako three ways and hot shoyu), and Foodland Farms Ala Moana's
     * hours (6 AM–10 PM). Sources: foodland.com/hawaiis-home-for-poke; shop.foodland.com.
     */
    poke: {
      title: "Poke, from Foodland",
      short: "Poke",
      lede: "Ask anyone here where to buy poke and you will often hear the name of a supermarket. Foodland’s seafood counter makes it fresh every day: buy it by the pound to share, or as a bowl over hot rice. Ask for a taste if you can’t decide; the flavors change by store and by day.",
      store: { id: "foodland-ala-moana", name: "Foodland Farms Ala Moana", area: "Ala Moana Center", at: "ala-moana" as PointKey, hours: "Daily 6 AM–10 PM", href: "https://foodland.com/hawaiis-home-for-poke" },
      also: "There are Foodlands all over the island, Kailua and Lāʻie among them.",
      tip: "Buy it the day you eat it, and keep it cold on the way to the beach.",
      kinds: [
        { id: "shoyu", name: "Shoyu ʻahi", what: "The classic. ʻAhi tuna in shoyu (soy sauce) and sesame oil, with sweet onion and green onion." },
        { id: "spicy", name: "Spicy ʻahi", what: "ʻAhi in a creamy, gently hot mayonnaise sauce, often with orange flecks of masago, or fish roe." },
        { id: "limu", name: "Limu ʻahi", what: "ʻAhi with limu, a crunchy local seaweed, and a pinch of Hawaiian salt." },
        { id: "hawaiian", name: "Hawaiian style", what: "The oldest way: ʻahi with Hawaiian salt, limu and ʻinamona, roasted crushed kukui nut." },
        { id: "tako", name: "Tako", what: "Octopus, sliced and a little chewy. Foodland makes it Hawaiian style, with kim chee, or with limu." },
        { id: "hot-shoyu", name: "Hot shoyu ʻahi", what: "Foodland’s newest: shoyu with gochujang, ʻinamona, sesame oil, Hawaiian salt and Thai chilis." },
      ] as const,
    },
    menuTitle: "On the menu",
    menu: [
      { word: "Plate lunch", means: "rice by the scoop, macaroni salad and a main" },
      { word: "Spam musubi", means: "rice topped with pan-fried Spam and wrapped in nori" },
      { word: "Kālua pig", means: "smoky pulled pork, traditionally cooked in an underground oven" },
    ],
  },

  /**
   * Chapter: a free day. Distances are by road from the gardens. Hours,
   * prices and rules are as of late 2026: recheck them before you send
   * anyone anywhere.
   */
  explore: {
    /**
     * What is open on which day of the wedding week, at the top of the
     * chapter. Each line is short and points to the passage below (or in
     * Eating) that tells it in full, by that passage's `id`.
     */
    byDay: {
      title: "Plan your free days",
      intro: "The island keeps its own timetable. A few things to know before you plan a free day.",
      days: [
        { when: "Thursday", text: "Hoʻomaluhia Botanical Garden is closed; the Byodo-In Temple is open.", href: "#hoomaluhia" },
        { when: "Saturday", text: "The day for Kāneʻohe Bay. No tour boat, charter or rental runs there on the Sunday or the holiday Monday.", href: "#sandbar" },
        { when: "Saturday or Sunday", text: "Hanauma Bay, if you book two days ahead. It is closed Monday and Tuesday.", href: "#hanauma" },
        { when: "Sunday", text: "Waiāhole Poi Factory, on the way back to town, pounds poi by hand on Sundays.", href: "#waiahole" },
      ],
    },
    lede:
      "The windward side is at its loveliest within a short drive of the ranch. Kahana Valley is about five miles up the road and Waiāhole’s poi shop four miles down it. The Byodo-In Temple is about eight miles away and Hoʻomaluhia about twelve. Kailua’s beaches are nearer seventeen, so allow forty minutes. Hours and prices here are as they stood in late 2026, and we will check them again before you fly.",
    passages: [
      {
        // VERIFY before invitations: tour names and lengths, the Ocean Voyage’s Sunday/holiday rule, and how far ahead UTV tours sell out. Source: kualoa.com.
        id: "kualoa-tours", at: "kualoa",
        title: "More of Kualoa",
        text: "If you would like to see more of the ranch, Kualoa runs its own tours. The ninety-minute Movie Sites & Ranch Tour visits Kaʻaʻawa Valley. The Ocean Voyage (not on Sundays or federal holidays) crosses a Hawaiian fishpond the ranch dates to about eight hundred years ago, and there are a farm tour, horseback rides and UTV tours. The UTVs sell out weeks ahead, so book early at kualoa.com.",
      },
      {
        // VERIFY before invitations: the loop trail and Keaniani lookout are open. Source: dlnr.hawaii.gov/dsp (Ahupuaʻa ʻO Kahana State Park).
        id: "kahana", at: "kahana",
        title: "Kahana Valley",
        text: "Five miles up the road, Ahupuaʻa ʻO Kahana is a “living park”, where families still make their homes in the valley. An easy one-mile loop climbs to Keaniani lookout, over the bay. Huilua Fishpond, on the east side of the bay, is a National Historic Landmark and one of the few survivors of the roughly ninety-seven fishponds that once lined Oʻahu’s coast. Kahana is one of the wettest valleys on the island, so stay on the trail and keep out of the stream, above all if you have a cut.",
      },
      {
        // VERIFY before invitations: hours (8:30 AM–4:30 PM, last entry 4:15) and admission ($10 adults). Source: byodo-in.com.
        id: "byodo-in", at: "kaneohe",
        title: "Byodo-In Temple",
        text: "At the foot of the Koʻolau in Kāneʻohe, the Byodo-In Temple is a smaller copy of the nearly thousand-year-old Byodo-In at Uji, in Japan. The temple is open daily from 8:30 AM to 4:30 PM (last entry 4:15), and admission is $10 for adults. It sits within a memorial park, so dress as you would for a place of worship and leave the beachwear in the car.",
      },
      {
        // VERIFY before invitations: hours (9 AM–4 PM), closed Thursdays, free entry. Source: honolulu.gov/parks (Honolulu Botanical Gardens).
        id: "hoomaluhia", at: "kaneohe", open: except("Thu"),
        title: "Hoʻomaluhia Botanical Garden",
        text: "Hoʻomaluhia is four hundred acres of garden under the Koʻolau, planted by region of the tropical world around a 32-acre lake. The Army Corps of Engineers built it to keep Kāneʻohe from flooding, and it is free. It is open from 9 AM to 4 PM but closed every Thursday, so plan it for another day.",
      },
      {
        // VERIFY before invitations: Kailua Beach lifeguard hours (8 AM–6:30 PM), Lanikai’s holiday parking closures and planned signs, TheBus 671. Sources: Honolulu Ocean Safety (honolulu.gov/ocean); honolulu.gov/dts; thebus.org.
        id: "kailua", at: "kailua",
        title: "Kailua and Lanikai",
        text: "Start at Kailua Beach, which has a parking lot and lifeguards every day from 8 AM to 6:30 PM. Lanikai, around the point, has no lifeguard and almost no parking: the city closes its streets to parking from 10 AM to 3 PM on many holiday weekends and is planning permanent no-parking signs along the loop. Park in Kailua and walk, or take TheBus 671, which loops through Lanikai. The Lanikai Pillbox hike up Kaʻiwa Ridge is about a mile there and back, steep at first and without shade, to concrete lookouts built in 1943. Skip it after rain; the trail gets slippery.",
      },
      {
        // VERIFY before invitations: no commercial activity in Kāneʻohe Bay on Sundays and federal holidays, and which tours hold a state permit. Source: DLNR Division of Boating and Ocean Recreation, HAR §13-256 (Kāneʻohe Bay Ocean Waters).
        id: "sandbar", at: "heeia", open: except("Sun"),
        title: "Ahu o Laka, the sandbar",
        text: "Ahu o Laka is a sandbar in the middle of Kāneʻohe Bay that rises from the water at low tide and is awash at high tide. To go with a tour, choose one that holds a state permit for Kāneʻohe Bay. No commercial boat may run in the bay on Sundays or federal holidays, and that week it means Sunday, October 8 and Monday, October 9, Columbus Day. Saturday is your day.",
      },
      {
        // VERIFY before invitations: HIMB’s guided visits (ages five and up) and the ʻOhana Saturday schedule. Source: himb.hawaii.edu.
        id: "coconut-island", at: "heeia",
        title: "Coconut Island, for families",
        text: "Moku o Loʻe, in Kāneʻohe Bay, is home to the Hawaiʻi Institute of Marine Biology: a working lab, reached only on the institute’s own guided visits, by boat, for ages five and up. One of them, ʻOhana Saturday, is held on the first Saturday of each month, which in October 2028 is the 7th. The island’s coconut palms are credited to Princess Bernice Pauahi Bishop, who planted a grove here in the 1880s. Check the institute’s public tours page nearer the time.",
      },
      {
        // VERIFY before invitations: the trail gate hours (7 AM–6:45 PM). Source: dlnr.hawaii.gov/dsp (Kaiwi State Scenic Shoreline).
        id: "makapuu", at: "makapuu",
        title: "Makapuʻu Point",
        text: "The Makapuʻu Point Lighthouse Trail is two miles there and back on pavement, climbing about 500 feet to a lookout above the red-roofed lighthouse of 1909 (the lighthouse itself is off-limits) and, on a clear day, a view of Molokaʻi and Lānaʻi. In October the gate opens at 7 AM and closes at 6:45 PM. There is no shade, water or restroom, and it can be very windy at the top, so bring a hat and plenty to drink.",
      },
      {
        // VERIFY before invitations: closed Mondays and Tuesdays; reservations open two days ahead at 7 AM HST; walk-in tickets at 6:45 AM; $25 entry (12 and under free) plus online fee; $3 cash parking; last entry 1:30 PM; no cancellations or changes. Source: the City’s reservation site, pros.hnl.info/hanauma-bay.
        id: "hanauma", at: "hanauma", open: except("Mon", "Tue"),
        title: "Hanauma Bay, with a plan",
        text: "Hanauma Bay is closed every Monday and Tuesday. Visitors from the mainland should reserve: booking opens online two days ahead at 7 AM Hawaiʻi time, and only a few walk-in tickets are handed out at 6:45 AM. For Saturday the 7th, book on Thursday morning; for Sunday, book on the morning of the wedding. As of late 2026, entry is $25 plus a small online fee (children twelve and under are free), parking is $3 in cash, the last entry is at 1:30 PM, and everyone watches a short film before going down to the water. Bookings cannot be canceled or changed, so be sure of your day.",
      },
      {
        // VERIFY before invitations: the Pūpūkea marine-life rule and Waimea Bay/Laniākea lifeguard hours. Sources: dlnr.hawaii.gov/dar (Marine Life Conservation Districts); Honolulu Ocean Safety.
        id: "north-shore", at: "pupukea",
        title: "The North Shore in October",
        text: "In the state’s calendar October is the end of the North Shore’s calmer season, but the first winter swells often arrive this month. Check the surf forecast, ask a lifeguard, and if a high-surf advisory is posted, stay out of the water. On a calm day, Shark’s Cove and Three Tables, inside the Pūpūkea marine reserve, are lovely for snorkeling. There are no lifeguards there, and nothing may be taken from the water. Waimea Bay and Laniākea have lifeguards daily from 8 AM to 6:30 PM.",
      },
    ] satisfies Passage[],
  },

  /** Chapter: in the water. Moved here from the Travel page, which links to it. */
  water: {
    lede:
      "Most of the week is within sight of the sea, and some of it is in it. A few things to know first.",
    passages: [
      {
        // VERIFY before invitations: the sea temperature (about 80°F in early October) and “one of only two barrier reefs in the state”. Sources: NOAA National Data Buoy Center (Mokapu Point buoy); Hawaiʻi Institute of Marine Biology.
        title: "The water in October",
        text: "Early October is a change of seasons on the water. Waikīkī’s summer swells are winding down, the North Shore’s first winter swells can begin to arrive, and our windward side keeps its steady trade-wind chop. Kāneʻohe Bay, behind one of only two barrier reefs in the state, is Hawaiʻi’s largest sheltered body of water. The water is about 80°F, sometimes a little warmer.",
      },
      {
        // VERIFY before invitations: box jellyfish arriving eight to twelve days after the full moon, and the October 2028 full moon (the 3rd). Sources: Waikīkī Aquarium’s box jellyfish calendar; Honolulu Ocean Safety; aa.usno.navy.mil (moon phases).
        title: "A note from the moon",
        text: "If you are staying in Waikīkī: its box jellyfish keep to a lunar timetable, usually arriving eight to twelve days after the full moon. That October the moon is full on the 3rd, so they are not expected until the week after the wedding. Lifeguard signs always have the last word.",
      },
      {
        title: "The ocean, on its own terms",
        text: "Swim where a lifeguard is on duty, and ask them about the day; nobody knows this water better. Never turn your back on the ocean, never swim alone, and keep the keiki close. If a current takes you, stay calm; currents generally do not pull you under. Float, go with it rather than fight it, and wave and call toward shore. When in doubt, don’t go out.",
        link: { href: "#kailua", label: "Where the lifeguards are on our side" },
      },
      {
        // VERIFY before invitations: October and November as the months with the most flash floods. Source: National Weather Service Honolulu, weather.gov/hfo.
        title: "If it has been raining",
        text: "In the Weather Service’s records, October and November have seen more flash floods than any other months, and a stream can rise within minutes from rain falling far up in the mountains, even when it is dry where you stand. Never cross a stream that is running high: wait, or turn around. Admire the waterfalls rather than swimming in them. Fresh water here can carry leptospirosis, so stay out of streams and ponds, above all if you have a cut, and keep your head above the water.",
      },
    ] satisfies Passage[],
  },

  /** Chapter: rules worth knowing. Each is the law here, or close to it. */
  rules: {
    lede: "A few things that are the law here, or close to it.",
    passages: [
      {
        // VERIFY before invitations: the law on taking sand, rocks and coral, and its small-quantity exception. Source: HRS §205A-44, capitol.hawaii.gov.
        title: "Leave the sand and the coral",
        text: "Taking sand, rocks or coral from the shore is against state law. An empty shell, a piece of sea glass or driftwood is fine, except in marine reserves or where a sign says otherwise.",
      },
      {
        // VERIFY before invitations: the sunscreen sale ban (in force since 2021). Source: capitol.hawaii.gov (Act 104, 2018).
        title: "Reef-safe sunscreen",
        text: "Since 2021 Hawaiʻi has not allowed the sale of sunscreens containing oxybenzone or octinoxate, so bring a mineral one. On the reef, float: no standing on coral, touching fish or reaching into holes.",
      },
      {
        // VERIFY before invitations: viewing distances for turtles (10 ft), monk seals (50 ft; 150 ft for a mother and pup) and spinner dolphins (50 yards). Source: fisheries.noaa.gov (Hawaiian Islands marine wildlife viewing guidelines); dlnr.hawaii.gov.
        id: "honu",
        title: "Give turtles, seals and dolphins room",
        text: "Green sea turtles: at least ten feet, on the beach and in the water, and never touch, chase or feed one. Hawaiian monk seals: fifty feet, and 150 for a mother and pup. Spinner dolphins: fifty yards, for swimmers and boats alike. All are protected by state and federal law.",
      },
      {
        // VERIFY before invitations: the Haʻikū Stairs' status (closed; removal under way since 2024). Source: honolulu.gov.
        title: "Stay on marked trails",
        text: "A sign that reads kapu means keep out. The Haʻikū Stairs have been closed since 1987, climbing them is illegal, and the city began dismantling them in 2024.",
      },
    ] satisfies Passage[],
  },

  /** A bird guests will meet on any lawn here, drawn so it walks when tapped. */
  kolea: {
    title: "Look down: the kōlea",
    watch: "Watch the kōlea take a few steps",
    // VERIFY before invitations: migration distance and timing. Source: dlnr.hawaii.gov (Pacific golden plover).
    text: "On almost any lawn on this island you will see a small, speckled-gold bird standing very still. It is the Pacific golden plover. It flies about three thousand miles nonstop from Alaska to spend the winter here, and comes back to the same patch of grass year after year.",
  },

  /** Chapter: about the venue. Three facts, nothing more. */
  venue: {
    passages: [
      {
        // VERIFY before invitations: "more than seventy films since the 1950s". Source: kualoa.com (Movie sites).
        title: "You may have seen it",
        text: "Kualoa has appeared in more than seventy films since the 1950s, Jurassic Park among them. Most were shot in Kaʻaʻawa Valley, the ranch’s northern half, on the far side of the ridge from our lawn.",
      },
      {
        title: "A working ranch",
        text: "Kualoa is a working cattle ranch of some 4,000 acres, still run by the family that has owned it since 1850.",
      },
      {
        title: "The islet off the point",
        text: "The small cone-shaped island you see from the lawn, and in nearly every photo of this coast, is Mokoliʻi.",
      },
    ] satisfies Passage[],
  },
};
