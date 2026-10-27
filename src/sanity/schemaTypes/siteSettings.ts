import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Company Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "legalName", title: "Legal Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "url", title: "Production Domain (e.g. https://www.velvetvine.com)", type: "url" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "foundedYear", title: "Founded Year", type: "number" }),
    defineField({
      name: "enquiryDestination",
      title: "Contact Form Destination",
      description:
        "Where contact-form enquiries are delivered. Google Sheet and Email each need their environment variables set on the server.",
      type: "string",
      options: {
        list: [
          { title: "Google Sheet", value: "sheets" },
          { title: "Email (Office 365)", value: "email" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "sheets",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "locality", title: "City", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
