import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
