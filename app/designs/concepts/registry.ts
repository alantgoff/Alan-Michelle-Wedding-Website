/**
 * Maps a design slug to its concept component.
 *
 * Each concept is a self-contained reimagining of the whole site: its own
 * navigation, its own structure, its own stylesheet. They share nothing but
 * the content in /content and the filtered activity list passed to them.
 */
import type { ComponentType } from "react";
import type { Activity } from "@/content/activities";

import Letter from "./letter";
import Itinerary from "./itinerary";
import FieldGuide from "./field-guide";
import Album from "./album";
import Broadsheet from "./broadsheet";
import Deck from "./deck";
import IndexDesign from "./index";
import MapDesign from "./map";
import Suite from "./suite";
import Window from "./window";

export type ConceptProps = { activities: Activity[] };

export const concepts: Record<string, ComponentType<ConceptProps>> = {
  letter: Letter,
  itinerary: Itinerary,
  "field-guide": FieldGuide,
  album: Album,
  broadsheet: Broadsheet,
  deck: Deck,
  index: IndexDesign,
  map: MapDesign,
  suite: Suite,
  window: Window,
};
