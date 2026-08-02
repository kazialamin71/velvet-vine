import { defineField, defineType } from "sanity";

const stripPhotoDescription =
  "Part of a 4-photo strip banner. Recommended: square, at least 800×800px, under 500KB.";

export const capabilitiesPage = defineType({
  name: "capabilitiesPage",
  title: "Capabilities Page",
  type: "document",
  fields: [
    defineField({ name: "sourcingHeading", title: "How We Source Heading", type: "string" }),
    defineField({ name: "sourcingParagraph", title: "How We Source Paragraph", type: "text", rows: 4 }),
    defineField({
      name: "sewingLinePhoto",
      title: "Sewing Line Photo",
      description: stripPhotoDescription,
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yarnStockPhoto",
      title: "Yarn Stock Photo",
      description: stripPhotoDescription,
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fabricRollsPhoto",
      title: "Fabric Rolls Photo",
      description: stripPhotoDescription,
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "finishingPhoto",
      title: "Finishing Photo",
      description: stripPhotoDescription,
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Capabilities Page" }),
  },
});
