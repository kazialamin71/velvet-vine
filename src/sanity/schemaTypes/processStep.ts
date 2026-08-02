import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Step Number (e.g. 01)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "showOnHome",
      title: "Show in Home page teaser",
      description: "The Home page shows a condensed 4-step teaser; the Process page shows every step.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "number" },
  },
});
