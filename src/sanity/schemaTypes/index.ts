import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { stat } from "./stat";
import { processStep } from "./processStep";
import { category } from "./category";
import { certification } from "./certification";
import { complianceItem } from "./complianceItem";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { capabilitiesPage } from "./capabilitiesPage";
import { processPage } from "./processPage";
import { standardsPage } from "./standardsPage";
import { contactPage } from "./contactPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    homePage,
    aboutPage,
    capabilitiesPage,
    processPage,
    standardsPage,
    contactPage,
    stat,
    processStep,
    category,
    certification,
    complianceItem,
  ],
};

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "capabilitiesPage",
  "processPage",
  "standardsPage",
  "contactPage",
]);
