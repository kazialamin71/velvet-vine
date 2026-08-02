import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 12+, 500K+)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
