/**
 * REGISTRY — one postcard per place.
 *
 *   label  the small line above the name
 *   name   who the card is addressed to
 *   text   the message side
 *   url    where the card's one link goes
 *   stamp  the single word on the card's stamp
 *
 * TODO: registry. Until a card has a real link, the page shows the single
 * "to come" card below (`pending`) instead, and the Registry page stays out
 * of the top menu (it is linked from the footer and the FAQ). When you are
 * ready, add cards like the commented examples, then add Registry back to
 * `nav` in content/site.ts if you like.
 */
export type RegistryCard = { label: string; name: string; text: string; url: string; stamp: string };

export const registries: RegistryCard[] = [
  // {
  //   label: "Registry",
  //   name: "The registry's name",
  //   text: "A line about it, in your words.",
  //   url: "https://…",
  //   stamp: "Aloha",
  // },
  // {
  //   // Mahina meli is the Hawaiian Dictionary's word for honeymoon.
  //   label: "Honeymoon fund",
  //   name: "Mahina meli",
  //   text: "In Hawaiian, the honeymoon is mahina meli: the moon of honey. If you would like to give toward ours, this is the place.",
  //   url: "https://…",
  //   stamp: "Mahalo",
  // },
];

/** The words on the page, and the card shown while there is nothing to link to yet. */
export const registryPage = {
  tab: "Registry",
  kicker: "Gifts",
  title: "Registry",
  intro:
    "Flying to an island in the middle of the Pacific is a generous gift on its own. If you would like to do something more, this is where the details will be.",
  open: "Open",
  pending: {
    label: "Registry",
    name: "Registry details to come",
    text: "When there is something to share, it will be here.",
    stamp: "Aloha",
  },
};
