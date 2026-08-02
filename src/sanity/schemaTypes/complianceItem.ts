import { defineField, defineType } from "sanity";

export const complianceItem = defineType({
  name: "complianceItem",
  title: "Compliance Checklist Item",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "text" },
  },
});
