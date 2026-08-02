import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const title = `${site.name} — ${site.tagline}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [
      "garments buying house",
      "apparel sourcing agency",
      "clothing manufacturer Bangladesh",
      "private label garment production",
      "OEKO-TEX GOTS certified garments",
      "EU fashion brand sourcing",
    ],
    openGraph: {
      title,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
