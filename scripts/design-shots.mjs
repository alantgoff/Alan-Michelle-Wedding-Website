/**
 * Capture each design exploration for review: a home page at desktop and
 * phone width, plus the picker. Run with the server up.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { designs } from "../content/designs.ts";

const base = process.env.BASE_URL || "http://localhost:3000";
const candidates = [process.env.CHROMIUM_PATH, "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));

await fs.mkdir("screenshots/designs", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

/**
 * Several concepts are viewport-height surfaces (the deck scrolls sideways,
 * the window never scrolls at all). A full-page capture forces those to
 * expand and photographs a layout no guest ever sees, so only pages that
 * genuinely scroll are captured full-page.
 */
async function shoot(url, file, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  const scrolls = await page.evaluate(
    (h) => document.documentElement.scrollHeight > h * 1.3,
    height,
  );
  if (scrolls) {
    // Walk the page so lazy images below the fold actually load.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
  }
  await page.screenshot({ path: file, fullPage: scrolls });
  await page.close();
}

await shoot(`${base}/designs`, "screenshots/designs/00-picker.png", 1440, 1000);

for (const [i, d] of designs.entries()) {
  const n = String(i + 1).padStart(2, "0");
  await shoot(`${base}/designs/${d.slug}`, `screenshots/designs/${n}-${d.slug}-desktop.png`, 1440, 1000);
  await shoot(`${base}/designs/${d.slug}`, `screenshots/designs/${n}-${d.slug}-mobile.png`, 390, 844);
}

await browser.close();
console.log(`Captured the picker and ${designs.length} designs in screenshots/designs/`);
