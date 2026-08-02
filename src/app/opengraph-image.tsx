import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/sanity/queries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const site = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#15150f",
          color: "#f2ede3",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#a39d8c", display: "flex" }}>
          {site.name.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            lineHeight: 1.15,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Looking to produce your next collection?
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: "#c9c3b3", display: "flex" }}>
          {site.tagline} for EU &amp; US fashion brands
        </div>
      </div>
    ),
    { ...size }
  );
}
