import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number (e.g. 01)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "image",
      title: "Thumbnail Photo",
      description:
        "A representative product photo for this category. Recommended: square, at least 800×800px, under 500KB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "specs",
      title: "Specs (bullet lines, last one is usually the MOQ)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "number", media: "image" },
  },
});
