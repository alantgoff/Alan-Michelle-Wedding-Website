import { site } from "@/content/site";

/**
 * The wedding as a calendar file, for the "Add to calendar" link.
 *
 * An all-day event until the ceremony time is confirmed in content/site.ts:
 * a guessed hour in someone's calendar is worse than none. The date comes
 * from `isoDate`, so it follows any edit there.
 */
export const dynamic = "force-static";

const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

export function GET() {
  const day = site.isoDate.slice(0, 10).replace(/-/g, "");
  const next = new Date(Date.UTC(+day.slice(0, 4), +day.slice(4, 6) - 1, +day.slice(6, 8) + 1))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alan and Michelle//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:wedding-${day}@alan-and-michelle`,
    `DTSTAMP:${day}T000000Z`,
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${next}`,
    `SUMMARY:${escape(`${site.couple} — wedding`)}`,
    `LOCATION:${escape(`${site.venue}, ${site.address}`)}`,
    `DESCRIPTION:${escape(`${site.tagline} Ceremony time to be confirmed.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="alan-and-michelle.ics"',
    },
  });
}
