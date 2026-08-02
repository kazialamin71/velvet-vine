import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading (plain part)", type: "string" }),
    defineField({ name: "headingItalic", title: "Heading (italic part)", type: "string" }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
    defineField({
      name: "photo",
      title: "Supporting Photo",
      description:
        "Photo shown above the contact details (a team member, office, or factory shot works well). Recommended: portrait or square, at least 1000×1200px, under 700KB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tradeShows",
      title: "Trade Shows",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
