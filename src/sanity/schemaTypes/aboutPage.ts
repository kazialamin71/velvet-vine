import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading (plain part)", type: "string" }),
    defineField({ name: "headingItalic", title: "Heading (italic part)", type: "string" }),
    defineField({ name: "intro", title: "Intro Paragraph", type: "text", rows: 4 }),
    defineField({
      name: "teamPhoto",
      title: "Team Photo",
      description:
        "Photo of the team or factory floor, shown alongside the 'not a factory' text. Recommended: landscape or square, at least 1200×1000px, under 700KB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "notFactoryHeading", title: "'Not a Factory' Heading (plain part)", type: "string" }),
    defineField({ name: "notFactoryHeadingItalic", title: "'Not a Factory' Heading (italic part)", type: "string" }),
    defineField({ name: "notFactoryParagraph1", title: "'Not a Factory' Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "notFactoryParagraph2", title: "'Not a Factory' Paragraph 2", type: "text", rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
