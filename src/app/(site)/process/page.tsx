import type { Metadata } from "next";
import { Container, CTAButton, SectionLabel } from "@/components/ui";
import { getProcessPage, getProcessSteps } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From enquiry to warehouse delivery: how Velvet Vine matches your collection to a vetted factory, manages sampling, and controls quality through production.",
  alternates: { canonical: "/process" },
};

export default async function ProcessPage() {
  const [page, processSteps] = await Promise.all([getProcessPage(), getProcessSteps(false)]);

  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="grid gap-16 md:grid-cols-2">
          <div>
            <SectionLabel>How We Work</SectionLabel>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{page.heading}</h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">{page.subtext}</p>
            <div className="mt-8">
              <CTAButton href="/contact" variant="outline">
                Start with an enquiry →
              </CTAButton>
            </div>
          </div>

          <div>
            {processSteps.map((step) => (
              <div key={step.number} className="border-t border-line py-6 first:pt-0">
                <div className="flex gap-6">
                  <p className="label pt-1 text-ink/40">{step.number}</p>
                  <div>
                    <h2 className="font-serif text-xl">{step.title}</h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-line" />
          </div>
        </Container>
      </section>
    </>
  );
}
