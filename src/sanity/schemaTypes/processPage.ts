import { defineField, defineType } from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Process Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: "Process Page" }),
  },
});
