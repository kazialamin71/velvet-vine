import type { Metadata } from "next";
import { CmsPhoto, Container, CTAButton, SectionLabel, StatsBar } from "@/components/ui";
import { getAboutPage, getSiteSettings, getStats } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Velvet Vine is a garments buying house built on direct factory relationships — sourcing, sampling, and quality control for fashion brands since 2013.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "One point of contact",
    description:
      "A dedicated account manager sees your order from quote to delivery — you never get passed between departments or agents.",
  },
  {
    title: "A vetted vendor network",
    description:
      "Every factory in our network is audited before it produces a single unit for you, and re-audited on a fixed schedule after.",
  },
  {
    title: "Compliance built in",
    description:
      "GOTS, OEKO-TEX, BSCI, and ISO 9001 aren't add-ons — they're the baseline requirement for any vendor we work with.",
  },
];

export default async function AboutPage() {
  const [about, site, stats] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getStats(),
  ]);

  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <SectionLabel>About Velvet Vine</SectionLabel>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
            {about.heading} <em className="italic">{about.headingItalic}</em>
          </h1>
          <p className="mt-6 max-w-xl text-ink/70">{about.intro}</p>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <CmsPhoto
            image={about.teamPhoto}
            label="Our team on the factory floor — photo placeholder"
            className="h-72 md:h-96"
          />
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              {about.notFactoryHeading}{" "}
              <em className="italic">{about.notFactoryHeadingItalic}</em>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/70">
              {about.notFactoryParagraph1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              {about.notFactoryParagraph2}
            </p>
          </div>
        </Container>
      </section>

      <section className="mt-20 md:mt-28">
        <StatsBar stats={stats} theme="light" />
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionLabel>Why a Buying House</SectionLabel>
          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
            The work happens between the quote and the shipment.
          </h2>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-serif text-xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream md:py-28">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionLabel>Our Network</SectionLabel>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight md:text-4xl">
              See the factories and categories behind {site.name}.
            </h2>
          </div>
          <CTAButton href="/capabilities" variant="outline-light">
            View capabilities →
          </CTAButton>
        </Container>
      </section>
    </>
  );
}
