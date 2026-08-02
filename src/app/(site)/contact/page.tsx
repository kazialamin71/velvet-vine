import type { Metadata } from "next";
import { CmsPhoto, Container, SectionLabel } from "@/components/ui";
import { getCategories, getContactPage, getSiteSettings } from "@/sanity/queries";
import { ContactForm } from "./ContactForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Send Velvet Vine your tech pack, mood board, or rough idea — get a detailed sourcing quote within 5 business days.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [page, site, categories] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getCategories(),
  ]);

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-16 md:grid-cols-2">
        <div>
          <CmsPhoto
            image={page.photo}
            label="Photo placeholder"
            className="mb-8 h-56 sm:h-64"
          />
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            {page.heading} <em className="italic">{page.headingItalic}</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">{page.subtext}</p>

          <div className="mt-10 space-y-8 text-sm">
            <div>
              <p className="label text-ink/40">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-block hover:underline">
                {site.email} ↗
              </a>
            </div>
            <div>
              <p className="label text-ink/40">Trade Shows</p>
              {page.tradeShows.map((show) => (
                <p key={show}>{show}</p>
              ))}
            </div>
          </div>
        </div>

        <ContactForm categories={categories} />
      </Container>
    </section>
  );
}
