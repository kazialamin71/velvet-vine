import type { Metadata } from "next";
import { CmsPhoto, Container, CTAButton, SectionLabel } from "@/components/ui";
import {
  getCertifications,
  getComplianceItems,
  getStandardsPage,
} from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Standards & Certifications",
  description:
    "GOTS, OEKO-TEX, BSCI, ISO 9001, GRS, and WRAP — every certification the EU and US markets demand, independently audited across our factory network.",
  alternates: { canonical: "/standards" },
};

export default async function StandardsPage() {
  const [page, certifications, complianceItems] = await Promise.all([
    getStandardsPage(),
    getCertifications(),
    getComplianceItems(),
  ]);

  return (
    <>
      <section className="bg-ink py-20 text-cream md:py-28">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>European Standards</SectionLabel>
            <h1 className="mt-3 max-w-md font-serif text-4xl leading-tight md:text-5xl">
              {page.heading}
            </h1>
            <p className="mt-5 max-w-sm text-sm text-cream/60">{page.subtext}</p>
            <ul className="mt-8 space-y-2 text-sm text-cream/70">
              {complianceItems.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <span className="mt-1 text-accent">✓</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-cream/10 pt-8 sm:grid-cols-3">
              {certifications.map((cert) => (
                <div key={cert.name}>
                  <p className="label text-cream">{cert.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-cream/40">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
            <CmsPhoto
              image={page.qualityInspectionPhoto}
              label="Quality inspection — photo placeholder"
              dark
              className="mt-8 h-48 text-cream/20"
            />
          </div>
        </Container>
      </section>

      <section className="relative">
        <CmsPhoto
          image={page.factoryFloorPhoto}
          label="Factory floor — photo placeholder"
          className="h-72 md:h-96"
        />
        <div className="absolute inset-0 flex items-end bg-black/30">
          <Container className="pb-10 text-cream">
            <p className="font-serif text-2xl leading-tight md:text-4xl">
              {page.factoryStatLine} <br />
              <em className="italic">Every single one, certified.</em>
            </p>
          </Container>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionLabel>Compliance Team</SectionLabel>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight md:text-4xl">
              {page.complianceHeading}
            </h2>
          </div>
          <CTAButton href="/contact" variant="outline">
            Talk to compliance →
          </CTAButton>
        </Container>
      </section>
    </>
  );
}
