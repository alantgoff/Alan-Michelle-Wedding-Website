/**
 * THE ISLAND — the place we are marrying, and this side of Oʻahu.
 *
 * Everything here was researched and then checked a second time against
 * primary sources (Place Names of Hawaiʻi, the Hawaiian Dictionary, the
 * National Register nomination for Kualoa, Kualoa Ranch, the City and the
 * State). Where a detail could not be confirmed it was left out, so please
 * keep that standard when adding to it: if you are not sure, do not print it.
 *
 * Each passage is a `title` and a `text`. Add, remove and reorder freely.
 */

export type Passage = { title: string; text: string };

export const island = {
  /** Chapter I: the ground under the wedding. */
  kualoa: {
    lede:
      "We are marrying at the foot of Kānehoalani, the sheer green ridge at Kualoa, on lawns that look out across Kāneʻohe Bay to the little islet of Mokoliʻi. It is a place with a long memory, and we wanted you to know a little of it before you arrive.",
    passages: [
      {
        title: "A sacred shore",
        text: "Kualoa was counted among the most sacred places on Oʻahu. Children of chiefs were brought here to be raised and taught; it was a puʻuhonua, a place of refuge; and when a chief was in residence, canoes passing offshore lowered their masts in respect. We will be guests on this land for one evening, and we would like to walk on it gently.",
      },
      {
        title: "Palikū",
        text: "The gardens take an old name. Palikū means “vertical cliff”, and it is also an ancient name for this side of the ridge, the land now called Kualoa. The dictionary gives the word a second sense as well: the starting point of a genealogy line. We did not choose the place for that, but we are glad of it.",
      },
      {
        title: "The little lizard",
        text: "The islet in every photograph is Mokoliʻi, “little lizard”. Long ago the goddess Hiʻiaka, sister of Pele, killed a moʻo, a giant lizard, here at Kualoa. Its tail became the islet, and its body the low land at the foot of the cliffs. Look for the tail as you drive in.",
      },
      {
        title: "The mountain behind us",
        text: "The ridge rising behind the lawn is Kānehoalani, named for a god remembered as an ancestor of Pele. His companion, the old story says, is Kapapa, a low islet out in the bay. We like the idea of a mountain and an island keeping each other company across the water.",
      },
      {
        title: "Star of Gladness",
        text: "On March 8, 1975, just below the peak of Kānehoalani, the voyaging canoe Hōkūleʻa slid down a ramp of coconut logs and met the sea for the first time. The place was chosen because Kualoa and neighboring Hakipuʻu were home to voyaging chiefs of old. Hōkūleʻa means “Star of Gladness”, and she has been crossing the Pacific ever since.",
      },
      {
        title: "The fishpond next door",
        text: "Next door in Hakipuʻu, a stone wall some 4,000 feet long curves out from the shore to hold about 125 acres of shallow bay. This is Mōliʻi, an ancient Hawaiian fishpond built before written history, and it is still worked today.",
      },
      {
        title: "A working ranch",
        text: "In 1850 King Kamehameha III sold about 622 acres at Kualoa, with the fishing rights and the islet of Mokoliʻi, to Dr. Gerrit P. Judd, a missionary doctor who advised him. Judd’s descendants still run the ranch, now some 4,000 acres across Kualoa, Hakipuʻu and Kaʻaʻawa. Sugar came and went (the mill ran from 1863 to 1870, until years of thin rainfall ended it), the Army laid an airfield across the flats in the Second World War, and today it is a working cattle ranch again.",
      },
      {
        title: "Seen it somewhere?",
        text: "Kualoa has appeared in more than seventy films since the 1950s, Jurassic Park among them, and many were shot in Kaʻaʻawa Valley, the ranch’s northern half: Kong: Skull Island, Jumanji, Godzilla and, we are delighted to report, Mike & Dave Need Wedding Dates. Our lawn is on the other side of the ridge.",
      },
    ] satisfies Passage[],
  },

  /**
   * Chapter: eating. Hours and prices are as they stood in late 2026.
   * Recheck every one of them before the invitations go out.
   */
  eat: {
    lede:
      "The best food on this side of the island is rarely fancy. It comes on a paper plate with two scoops of rice, and it is eaten at a picnic table. Here is where we would send you. Hours are as they stood in late 2026, and we will check them again before you fly.",
    passages: [
      {
        title: "At the ranch",
        text: "Aunty Pat’s Café, at Kualoa Ranch itself, serves breakfast and lunch from 7:30 AM to 3 PM: loco moco, burgers of the ranch’s own grass-fed beef, and a banana-kalo bread pudding. In the ranch’s historic Ranch House building, the Kualoa Grown Market is open to everyone from 10 AM to 5 PM, with beef, shrimp, oysters and produce raised on the ranch, as available.",
      },
      {
        title: "Waiāhole Poi Factory",
        text: "Four miles south of us, open 10 AM to 6 PM and closed on Tuesdays. Order the laulau, the kālua pig smoked for twelve hours, and the Sweet Lady of Waiāhole, which is warm kūlolo under haupia ice cream. On Wednesdays and Sundays they pound poi by hand on board and stone. It depends on the harvest, so call ahead.",
      },
      {
        title: "Up the coast to Kahuku",
        text: "Giovanni’s began in a converted 1953 bread truck and has been parked in Kahuku, about fifteen miles up the coast, since 1996. The plate to order is the garlic scampi: a dozen shrimp and two scoops of rice. It is open from 10:30 AM to 6:30 PM, cash is recommended, and guests sign the truck with a marker borrowed from the window. Sign it for us.",
      },
      {
        title: "Malasadas and shave ice",
        text: "Leonard’s Bakery opened in 1952, and not long after, Leonard’s mother suggested malasadas for Shrove Tuesday, as the Portuguese do. It is on Kapahulu Avenue, near Waikīkī, and opens at 5:30 every morning. In Haleʻiwa, the Matsumotos opened their store in 1951, and Matsumoto Shave Ice now serves from 10 AM to 6 PM daily.",
      },
      {
        title: "The elder brother",
        text: "In a moʻolelo shared by Kamehameha Schools, the first child of Wākea and Hoʻohōkūkalani was stillborn and buried on the east side of the house, where the sun rises, and from that place grew the first kalo. Their second son was named Hāloa in honor of his older brother and became the first Hawaiian, so kalo is family: the elder sibling who feeds the younger. Kualoa is said to have been the sacred land of Hāloa. Do try the poi.",
      },
    ] satisfies Passage[],
    /** Words on every menu. */
    menuTitle: "Read the menu like a local",
    menu: [
      { word: "Poke", haw: true, means: "from the Hawaiian for “to slice, cut crosswise into pieces”, as fish" },
      { word: "Laulau", haw: true, means: "a wrapped bundle: pork and a little butterfish folded in taro leaves and steamed" },
      { word: "Kālua", haw: true, means: "“to cook underground”, in an earth oven; you will meet it as kālua pig" },
      { word: "Poi", haw: true, means: "kalo (taro), steamed and pounded with water into a smooth paste" },
      { word: "Plate lunch", means: "rice by the scoop, macaroni salad and a main" },
      { word: "Spam musubi", means: "rice topped with pan-fried SPAM and wrapped in nori; by Hormel’s count, Hawaiʻi eats about seven million cans a year" },
      { word: "ʻOno", haw: true, means: "delicious, which is what you will want to say" },
    ],
  },

  /**
   * Chapter: a free day. Distances are by road from the gardens. Hours,
   * prices and rules are as of late 2026: recheck them before you send
   * anyone anywhere.
   */
  explore: {
    lede:
      "The windward side is at its loveliest within a short drive of the ranch. Kahana Valley is about five miles up the road and Waiāhole’s poi shop four miles down it. The Byodo-In Temple is about eight miles away and Hoʻomaluhia about twelve. Kailua’s beaches are nearer seventeen, so allow forty minutes.",
    passages: [
      {
        title: "More of Kualoa",
        text: "If you would like to see more of the ranch, Kualoa runs its own tours. The ninety-minute Movie Sites & Ranch Tour visits Kaʻaʻawa Valley; by the ranch’s count, more than seventy Hollywood movies have been filmed at Kualoa since the 1950s. The Ocean Voyage (not on Sundays or federal holidays) crosses a Hawaiian fishpond the ranch dates to about eight hundred years ago, and there are a farm tour, horseback rides and UTV tours. The UTVs sell out weeks ahead, so book early at kualoa.com.",
      },
      {
        title: "Kahana Valley",
        text: "Five miles up the road, Ahupuaʻa ʻO Kahana is a “living park”, where families still make their homes in the valley. An easy one-mile loop climbs to Keaniani lookout, where a kilo iʻa, a fish watcher, once looked for schools of akule in the bay and signaled the valley to bring the nets. Huilua Fishpond, on the east side of the bay, is a National Historic Landmark and one of the few survivors of the roughly ninety-seven fishponds that once lined Oʻahu’s coast. Kahana is one of the wettest valleys on the island, so stay on the trail, and keep out of the stream if you have a cut.",
      },
      {
        title: "Byodo-In Temple",
        text: "At the foot of the Koʻolau in Kāneʻohe, the Byodo-In Temple is a smaller copy of the nearly thousand-year-old Byodo-In at Uji, in Japan. Before you go in, ring the great bell. It is customary, and it is said to bring happiness, blessings and a long life, which we will gladly take on your behalf. The temple is open daily from 8:30 AM to 4:30 PM (last entry 4:15), and admission is $10 for adults. It sits within a memorial park, so dress as you would for a place of worship and leave the beachwear in the car.",
      },
      {
        title: "Hoʻomaluhia Botanical Garden",
        text: "Hoʻomaluhia is four hundred acres of garden under the Koʻolau, planted by region of the tropical world around a 32-acre lake. The Army Corps of Engineers built it to keep Kāneʻohe from flooding, and it is free. It is open from 9 AM to 4 PM but closed every Thursday, so save it for the weekend.",
      },
      {
        title: "Kailua and Lanikai",
        text: "Start at Kailua Beach, which has a parking lot and lifeguards every day from 8 AM to 6:30 PM. Lanikai, around the point, has no lifeguard and almost no parking: the city closes its streets to parking from 10 AM to 3 PM on many holiday weekends and is planning permanent no-parking signs along the loop. Park in Kailua and walk, or take TheBus 671, which loops through Lanikai. The Lanikai Pillbox hike up Kaʻiwa Ridge is about a mile there and back, steep at first and without shade, to concrete lookouts built in 1943. Skip it after rain; the trail gets slippery.",
      },
      {
        title: "Ahu o Laka, the sandbar",
        text: "Ahu o Laka, “the altar of Laka”, is a sandbar in the middle of Kāneʻohe Bay that rises from the water at low tide and is awash at high tide. It is a sacred place as well as a beautiful one. To go with a tour, choose one that holds a state permit for Kāneʻohe Bay. No commercial boat may run in the bay on Sundays or federal holidays, and on our weekend that means Sunday, October 8 and Monday, October 9, Columbus Day. Saturday is your day.",
      },
      {
        title: "Coconut Island, for families",
        text: "Moku o Loʻe, in Kāneʻohe Bay, is home to the Hawaiʻi Institute of Marine Biology: a working lab, reached only on the institute’s own guided visits, by boat, for ages five and up. One of them, ʻOhana Saturday, is held on the first Saturday of each month, which in October 2028 is the 7th. The island’s coconut palms are credited to Princess Bernice Pauahi Bishop, who planted a grove here in the 1880s. Check the institute’s public tours page nearer the time.",
      },
      {
        title: "Makapuʻu Point",
        text: "The Makapuʻu Point Lighthouse Trail is two miles there and back on pavement, climbing about 500 feet to a lookout above the red-roofed lighthouse of 1909 (the lighthouse itself is off-limits) and, on a clear day, a view of Molokaʻi and Lānaʻi. In October the gate opens at 7 AM and closes at 6:45 PM. There is no shade, water or restroom, and it can be very windy at the top, so bring a hat and plenty to drink.",
      },
      {
        title: "Hanauma Bay, with a plan",
        text: "Hanauma Bay is closed every Monday and Tuesday. Visitors from the mainland should reserve: booking opens online two days ahead at 7 AM Hawaiʻi time, and only a few walk-in tickets are handed out at 6:45 AM. For Saturday the 7th, book on Thursday morning; for Sunday, book on the morning of the wedding. As of late 2026, entry is $25 plus a small online fee (children twelve and under are free), parking is $3 in cash, the last entry is at 1:30 PM, and everyone watches a short film before going down to the water. Bookings cannot be cancelled or changed, so be sure of your day.",
      },
      {
        title: "The North Shore in October",
        text: "In the state’s calendar October is the end of the North Shore’s calmer season, but the first winter swells often arrive this month. Check the surf forecast, ask a lifeguard, and if a high-surf advisory is posted, stay out of the water. On a calm day, Shark’s Cove and Three Tables, inside the Pūpūkea marine reserve, are lovely for snorkeling. There are no lifeguards there, and nothing may be taken from the water. Waimea Bay and Laniākea have lifeguards daily from 8 AM to 6:30 PM.",
      },
    ] satisfies Passage[],
  },

  /** Chapter: being a good guest on the island. */
  manners: {
    lede:
      "Hawaiʻi is a home before it is a holiday, and people here are generous with visitors who notice that. None of this is difficult. It is mostly a matter of slowing down and leaving things as you found them.",
    passages: [
      {
        title: "Kapu means keep out",
        text: "A sign that reads kapu means forbidden, sacred, keep out, and we ask you to honor it. Stay on marked trails. And please leave the Haʻikū Stairs to the photographs: they have been closed since 1987, climbing them is illegal, and the city began dismantling them in 2024.",
      },
      {
        title: "Ten feet for the honu",
        text: "Green sea turtles haul out to bask on the sand at Laniākea, on the North Shore, some days a few and some days none. Please give them at least ten feet, on the beach and in the water, and never touch, chase or feed one: they are protected by state and federal law. Volunteers from Mālama i nā Honu are on the beach most days and love to talk turtles. Hawaiian monk seals need more room: fifty feet, and 150 for a mother and pup. You have to cross Kamehameha Highway between the parking and the beach, so take care.",
      },
      {
        title: "What goes in the water",
        text: "Hawaiʻi has banned the sale of sunscreens with oxybenzone or octinoxate since 2021, and the state suggests mineral ones, made with zinc oxide or titanium dioxide. Nothing may be taken from a marine reserve, and the fish do not need feeding.",
      },
    ] satisfies Passage[],
  },

  /** Place names guests will hear all weekend, and how to say them. */
  sayIt: [
    { word: "Kualoa", say: "koo-ah-LOH-ah", means: "“long back” — the ridge that rises behind the ranch" },
    { word: "Palikū", say: "pah-lee-KOO", means: "“vertical cliff” — an old name for Kualoa, and our venue" },
    { word: "Kānehoalani", say: "KAH-neh-hoh-ah-LAH-nee", means: "“Kāne, royal (or heavenly) companion” — the ridge behind the lawn" },
    { word: "Mokoliʻi", say: "moh-koh-LEE-ee", means: "“little lizard” — the islet off the point, in every photo" },
    { word: "Koʻolau", say: "koh-oh-LOW (rhymes with “now”)", means: "“windward” — the mountains, and this whole side of the island" },
    { word: "Kāneʻohe", say: "KAH-neh-OH-heh", means: "“bamboo man” — the bay and the town you drive through" },
    { word: "Kaʻaʻawa", say: "kah-ah-AH-vah", means: "named for the ʻaʻawa, a wrasse that lives on the reef — the valley just north of us" },
    { word: "Mōliʻi", say: "MOH-lee-ee", means: "“small section” — the ancient fishpond next door" },
    { word: "Hōkūleʻa", say: "HOH-koo-LEH-ah", means: "“star of gladness” — the voyaging canoe, first launched at Kualoa in 1975" },
    { word: "Mahalo", say: "mah-HAH-loh", means: "thank you — the word you will use most" },
  ],
  /** The ʻokina and the kahakō, explained once. */
  sayItNote:
    "The ʻ in Oʻahu is the ʻokina, a real consonant: a quick catch in the throat, like the middle of “uh-oh”. The bar in Kāneʻohe is a kahakō and simply stretches the vowel. Every vowel is said; nothing is silent.",
};
