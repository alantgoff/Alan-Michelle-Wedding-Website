/**
 * FLYING FROM — the cities guests are likely to set out from.
 *
 * Add, remove or reorder freely: each needs the airport's code, the city's
 * name, the airport's position, and the IANA time zone it keeps. The miles
 * and the hours on the page are worked out from these, so nothing else needs
 * changing. Positions are the airports' own, to a hundredth of a degree.
 */

export type Airport = { code: string; city: string; lat: number; lng: number; tz: string };

export const flying = {
  title: "How far you are coming",
  intro:
    "Choose where you are setting out from, and we will tell you how far it is to the lawn and what your watch will be doing.",
  prompt: "Pick a city to see the crossing.",
  tableLabel: "Every city on the list",
  /** Remembered on the guest's own device only. */
  airports: [
    { code: "SEA", city: "Seattle", lat: 47.45, lng: -122.31, tz: "America/Los_Angeles" },
    { code: "PDX", city: "Portland", lat: 45.59, lng: -122.6, tz: "America/Los_Angeles" },
    { code: "SFO", city: "San Francisco", lat: 37.62, lng: -122.38, tz: "America/Los_Angeles" },
    { code: "LAX", city: "Los Angeles", lat: 33.94, lng: -118.41, tz: "America/Los_Angeles" },
    { code: "SAN", city: "San Diego", lat: 32.73, lng: -117.19, tz: "America/Los_Angeles" },
    { code: "LAS", city: "Las Vegas", lat: 36.08, lng: -115.15, tz: "America/Los_Angeles" },
    { code: "PHX", city: "Phoenix", lat: 33.44, lng: -112.01, tz: "America/Phoenix" },
    { code: "SLC", city: "Salt Lake City", lat: 40.79, lng: -111.98, tz: "America/Denver" },
    { code: "DEN", city: "Denver", lat: 39.86, lng: -104.67, tz: "America/Denver" },
    { code: "DFW", city: "Dallas", lat: 32.9, lng: -97.04, tz: "America/Chicago" },
    { code: "IAH", city: "Houston", lat: 29.99, lng: -95.34, tz: "America/Chicago" },
    { code: "MSP", city: "Minneapolis", lat: 44.88, lng: -93.22, tz: "America/Chicago" },
    { code: "ORD", city: "Chicago", lat: 41.97, lng: -87.91, tz: "America/Chicago" },
    { code: "ATL", city: "Atlanta", lat: 33.64, lng: -84.43, tz: "America/New_York" },
    { code: "IAD", city: "Washington", lat: 38.95, lng: -77.46, tz: "America/New_York" },
    { code: "JFK", city: "New York", lat: 40.64, lng: -73.78, tz: "America/New_York" },
    { code: "BOS", city: "Boston", lat: 42.37, lng: -71.01, tz: "America/New_York" },
    { code: "YVR", city: "Vancouver", lat: 49.2, lng: -123.18, tz: "America/Vancouver" },
    { code: "YYZ", city: "Toronto", lat: 43.68, lng: -79.62, tz: "America/Toronto" },
  ] satisfies Airport[],
};
