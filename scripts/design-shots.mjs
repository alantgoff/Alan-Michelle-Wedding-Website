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

async function shoot(url, file, width, height, full = true) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: file, fullPage: full });
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
