import type { NextConfig } from "next";

/**
 * Every response says "do not index", including the calendar file, images
 * and the invite redirects. robots.txt lets crawlers in on purpose: a
 * crawler that is shut out never sees this header, and can still list a
 * bare URL it found linked somewhere else.
 */
const nextConfig: NextConfig = {
  // The week's page used to be called Activities, then Weekend. Old links and
  // anything saved or printed with an old address still land in the right place.
  async redirects() {
    return [
      { source: "/activities", destination: "/week", permanent: true },
      { source: "/weekend", destination: "/week", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }] }];
  },
};

export default nextConfig;
