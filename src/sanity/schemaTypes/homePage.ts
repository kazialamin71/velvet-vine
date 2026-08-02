import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Photo",
      description:
        "Full-bleed photo behind the dark hero text (factory floor, sewing line, fabric — something with texture). Recommended: landscape, at least 1920×1080px (16:9), under 1MB. A dark overlay is applied automatically so white text stays readable — avoid photos that are already very bright/high-key.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow Label", type: "string" }),
    defineField({ name: "heroHeading", title: "Hero Heading (plain part)", type: "string" }),
    defineField({ name: "heroHeadingItalic", title: "Hero Heading (italic part)", type: "string" }),
    defineField({ name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 2 }),
    defineField({ name: "valuePropHeading", title: "Value Prop Heading (plain part)", type: "string" }),
    defineField({ name: "valuePropHeadingItalic", title: "Value Prop Heading (italic part)", type: "string" }),
    defineField({ name: "valuePropSubtext", title: "Value Prop Subtext", type: "text", rows: 2 }),
    defineField({
      name: "productionFacilityPhoto",
      title: "Production Facility Photo",
      description:
        "Wide banner photo. Recommended: landscape, at least 2000×600px (roughly 3:1), under 1MB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "closingHeading", title: "Closing CTA Heading (plain part)", type: "string" }),
    defineField({ name: "closingHeadingItalic", title: "Closing CTA Heading (italic part)", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
