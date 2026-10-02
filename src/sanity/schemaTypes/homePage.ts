import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slider Photos",
      description:
        "Full-bleed photos that cross-fade behind the dark hero text (factory floor, sewing line, fabric — something with texture). Add 2–5 for a slideshow; a single photo renders as a still background. Recommended: landscape, at least 1920×1080px (16:9), under 1MB each. A dark overlay is applied automatically so white text stays readable — avoid photos that are already very bright/high-key.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption (optional)",
              description:
                "Short line shown in small caps at the bottom-right while this photo is on screen — e.g. “Knit division · Gazipur”. Leave empty for no caption.",
              type: "string",
              validation: (Rule) => Rule.max(60),
            }),
          ],
        },
      ],
      options: { layout: "grid" },
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "heroSlideInterval",
      title: "Hero Slider Speed (seconds)",
      description:
        "How long each photo stays before fading to the next. Defaults to 6 seconds. Only applies when there are 2 or more photos.",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.min(2).max(30),
      hidden: ({ document }) => ((document?.heroSlides as unknown[]) ?? []).length < 2,
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Photo (legacy)",
      description:
        "Deprecated — use Hero Slider Photos above. Still used as the background if the slider is empty.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => ((document?.heroSlides as unknown[]) ?? []).length > 0,
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
