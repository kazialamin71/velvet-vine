import type { Metadata } from "next";
import { CmsPhoto, Container, CTAButton, SectionLabel } from "@/components/ui";
import { getCapabilitiesPage, getCategories } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Knitwear, wovens, activewear, denim, tailoring, outerwear, loungewear, and swimwear — sourced from vetted, certified factories with MOQs from 150 units.",
  alternates: { canonical: "/capabilities" },
};

export default async function CapabilitiesPage() {
  const [page, categories] = await Promise.all([getCapabilitiesPage(), getCategories()]);

  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <SectionLabel>What We Source</SectionLabel>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="max-w-xl font-serif text-4xl leading-tight md:text-6xl">
              Production Range
            </h1>
            <div className="text-right text-sm text-ink/60">
              <p>MOQ from 150 units.</p>
              <p>Samples within 48 hours.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.number}>
                <CmsPhoto
                  image={category.image}
                  label={category.name}
                  className="mb-4 aspect-square"
                />
                <p className="label text-ink/40">{category.number}</p>
                <h2 className="mt-2 font-serif text-xl">{category.name}</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-ink/60">
                  {category.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="grid gap-1 sm:grid-cols-4">
        <CmsPhoto image={page.sewingLinePhoto} label="Sewing line — photo placeholder" className="h-40" />
        <CmsPhoto image={page.yarnStockPhoto} label="Yarn stock — photo placeholder" dark className="h-40" />
        <CmsPhoto image={page.fabricRollsPhoto} label="Fabric rolls — photo placeholder" className="h-40" />
        <CmsPhoto image={page.finishingPhoto} label="Finishing — photo placeholder" dark className="h-40" />
      </section>

      <section className="bg-cream-dark py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>How We Source</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              {page.sourcingHeading}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
              {page.sourcingParagraph}
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <CTAButton href="/contact" variant="outline">
              Request a quote for your collection →
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
