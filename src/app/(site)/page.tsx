import type { Metadata } from "next";
import Image from "next/image";
import {
  CmsPhoto,
  Container,
  CTAButton,
  SectionLabel,
  StatsBar,
} from "@/components/ui";
import { urlForImage } from "@/sanity/image";
import {
  getCategories,
  getCertifications,
  getHomePage,
  getProcessSteps,
  getStats,
} from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Velvet Vine — Garments Buying House for EU & US Brands",
  description:
    "Velvet Vine sources, samples, and quality-controls private label garment production across a vetted, certified factory network — from first tech pack to warehouse delivery.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, stats, homeSteps, categories, certifications] = await Promise.all([
    getHomePage(),
    getStats(),
    getProcessSteps(true),
    getCategories(),
    getCertifications(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream">
        {home.heroBackgroundImage?.asset && (
          <>
            <Image
              src={urlForImage(home.heroBackgroundImage).width(2400).height(1350).url()}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          </>
        )}
        <div className="relative">
          <Container className="pb-16 pt-20 md:pt-28">
            <p className="label text-cream/50">{home.heroEyebrow}</p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.1] md:text-7xl">
              {home.heroHeading} <br />
              <em className="italic">{home.heroHeadingItalic}</em>
            </h1>
            <p className="mt-6 max-w-xl text-cream/60">{home.heroSubtext}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CTAButton href="/contact" variant="solid">
                Let&rsquo;s Talk →
              </CTAButton>
              <CTAButton href="/capabilities" variant="outline-light">
                See what we source
              </CTAButton>
            </div>
          </Container>
          <StatsBar stats={stats} theme="dark" />
        </div>
      </section>

      {/* Value proposition */}
      <section className="py-20 md:py-28">
        <Container>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            {home.valuePropHeading} <br />
            <em className="italic">{home.valuePropHeadingItalic}</em>
          </h2>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
            <p className="max-w-md text-sm text-ink/70">{home.valuePropSubtext}</p>
            <CTAButton href="/about" variant="outline">
              Talk to us →
            </CTAButton>
          </div>

          <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-4">
            {homeSteps.map((step) => (
              <div key={step.number}>
                <p className="label text-ink/40">{step.number}</p>
                <h3 className="mt-3 font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Production range teaser */}
      <section className="bg-cream-dark py-20 md:py-28">
        <CmsPhoto
          image={home.productionFacilityPhoto}
          label="Production facility — photo placeholder"
          dark
          className="h-56 text-cream/20 md:h-72"
        />

        <Container className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>What We Source</SectionLabel>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Production Range
              </h2>
            </div>
            <div className="text-right text-sm text-ink/60">
              <p>MOQ from 150 units.</p>
              <p>Samples within 48 hours.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.number} className="border-t border-line pt-5">
                <CmsPhoto
                  image={category.image}
                  label={category.name}
                  className="mb-4 aspect-square"
                />
                <p className="label text-ink/40">{category.number}</p>
                <h3 className="mt-2 font-serif text-lg">{category.name}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink/60">
                  {category.specs.slice(0, 2).map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <CTAButton href="/capabilities" variant="outline">
              View full capabilities →
            </CTAButton>
          </div>
        </Container>
      </section>

      {/* Standards teaser */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>European Standards</SectionLabel>
            <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight md:text-5xl">
              Every certification the EU market demands.
            </h2>
            <p className="mt-5 max-w-sm text-sm text-cream/60">
              Independently audited and certified across our network. Your
              compliance team will never have concerns.
            </p>
            <div className="mt-8">
              <CTAButton href="/standards" variant="outline-light">
                See all certifications →
              </CTAButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-cream/10 pt-8 sm:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.name}>
                <p className="label text-cream">{cert.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-cream/40">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 border-t border-line pt-14 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-lg font-serif text-3xl leading-tight md:text-4xl">
            {home.closingHeading} <em className="italic">{home.closingHeadingItalic}</em>
          </h2>
          <CTAButton href="/contact" variant="solid">
            Send an Enquiry →
          </CTAButton>
        </Container>
      </section>
    </>
  );
}
