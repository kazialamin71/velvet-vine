import { defineField, defineType } from "sanity";

export const standardsPage = defineType({
  name: "standardsPage",
  title: "Standards Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading" , type: "string" }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
    defineField({
      name: "qualityInspectionPhoto",
      title: "Quality Inspection Photo",
      description:
        "Small photo next to the certification grid. Recommended: landscape, at least 1200×600px (2:1), under 600KB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "factoryFloorPhoto",
      title: "Factory Floor Photo",
      description:
        "Full-bleed banner photo with a stat line overlaid on top. Recommended: landscape, at least 2000×900px, under 1MB. Works best with a darker or lower-contrast area where the text will sit (bottom-left).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "factoryStatLine", title: "Factory Stat Line (e.g. '500K+ garments per month')", type: "string" }),
    defineField({ name: "complianceHeading", title: "Compliance CTA Heading", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Standards Page" }),
  },
});
