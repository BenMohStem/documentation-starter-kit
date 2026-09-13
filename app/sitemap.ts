import type { MetadataRoute } from "next";

const BASE = "https://documentation-starter-kit-steel.vercel.app";

const routes = [
  "",
  "/docs",
  "/docs/idea",
  "/docs/design",
  "/docs/thoughts",
  "/docs/plan",
  "/docs/steps",
  "/docs/timeline",
  "/docs/systems",
  "/docs/world/premise",
  "/docs/world/emergence",
  "/docs/world/observation",
  "/docs/world/roadmap",
  "/docs/demo/index",
  "/docs/demo/gates",
  "/docs/engine/index",
  "/docs/engine/std",
  "/docs/engine/physics",
  "/docs/engine/renderer",
  "/research",
  "/research/ledger",
  "/research/doctrine",
  "/research/corpus",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : r.startsWith("/docs/world") || r.startsWith("/research") ? 0.8 : 0.6,
  }));
}
