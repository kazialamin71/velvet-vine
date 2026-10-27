// One-off script: replaces the placeholder graphics in Sanity with real photos from Unsplash
// (Unsplash License — free for commercial use, no attribution required).
// Old assets are not deleted, so they can be restored from Studio's media library.
//
// Usage: node --env-file=.env.local scripts/upload-photos.mjs
// Requires SANITY_API_TOKEN with Editor (write) access.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

const unsplash = (id, w = 2000) => `https://images.unsplash.com/photo-${id}?fm=jpg&w=${w}&q=80`;

// [document id, field, Unsplash photo id, filename]
const fields = [
  ["homePage", "productionFacilityPhoto", "1768746350424-ee28a364dcf5", "production-facility.jpg"],
  ["capabilitiesPage", "sewingLinePhoto", "1673201229733-69d19c5c4a87", "sewing-line.jpg"],
  ["capabilitiesPage", "yarnStockPhoto", "1574883140236-2e2cb0835792", "yarn-stock.jpg"],
  ["capabilitiesPage", "fabricRollsPhoto", "1771098403201-8d0d32e2a062", "fabric-rolls.jpg"],
  ["capabilitiesPage", "finishingPhoto", "1714321960831-c8753b534400", "finishing.jpg"],
  ["contactPage", "photo", "1781888699751-15f2b304693c", "fabric-swatches.jpg"],
];

// Hero slides keep their _key and caption; only the image asset changes.
const heroSlides = {
  hsSourcing: ["1758269664127-1f744a56e06c", "hero-mill.jpg"],
  hsSampling: ["1741176505800-caaa3a52631a", "hero-sewing-floor.jpg"],
  hsInspection: ["1770196009760-bead9eb10514", "hero-inspection.jpg"],
};

async function upload(photoId, filename) {
  const res = await fetch(unsplash(photoId));
  if (!res.ok) throw new Error(`Download failed for ${photoId}: ${res.status}`);
  const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), { filename });
  console.log(`  uploaded ${filename} → ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

for (const [docId, field, photoId, filename] of fields) {
  const image = await upload(photoId, filename);
  await client.patch(docId).set({ [field]: image }).commit();
  console.log(`✓ ${docId}.${field}`);
}

const home = await client.getDocument("homePage");
const slides = await Promise.all(
  (home?.heroSlides ?? []).map(async (slide) => {
    const match = heroSlides[slide._key];
    if (!match) return slide;
    const image = await upload(...match);
    return { ...slide, asset: image.asset };
  })
);
await client.patch("homePage").set({ heroSlides: slides }).commit();
console.log("✓ homePage.heroSlides");
