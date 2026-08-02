import type { StructureResolver } from "sanity/structure";

const SINGLETONS: Array<{ id: string; title: string }> = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Home Page" },
  { id: "aboutPage", title: "About Page" },
  { id: "capabilitiesPage", title: "Capabilities Page" },
  { id: "processPage", title: "Process Page" },
  { id: "standardsPage", title: "Standards Page" },
  { id: "contactPage", title: "Contact Page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              SINGLETONS.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .id(id)
                  .child(S.document().schemaType(id).documentId(id))
              )
            )
        ),
      S.divider(),
      S.listItem().title("Stats").child(S.documentTypeList("stat").title("Stats")),
      S.listItem()
        .title("Process Steps")
        .child(S.documentTypeList("processStep").title("Process Steps")),
      S.listItem()
        .title("Product Categories")
        .child(S.documentTypeList("category").title("Product Categories")),
      S.listItem()
        .title("Certifications")
        .child(S.documentTypeList("certification").title("Certifications")),
      S.listItem()
        .title("Compliance Checklist")
        .child(S.documentTypeList("complianceItem").title("Compliance Checklist")),
    ]);
