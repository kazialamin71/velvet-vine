import { client } from "./client";
import type {
  AboutPage,
  CapabilitiesPage,
  Category,
  Certification,
  ComplianceItem,
  ContactPage,
  HomePage,
  ProcessPage,
  ProcessStep,
  SiteSettings,
  Stat,
  StandardsPage,
} from "./types";

export const getSiteSettings = () => client.fetch<SiteSettings>(`*[_type=="siteSettings"][0]`);

export const getHomePage = () => client.fetch<HomePage>(`*[_type=="homePage"][0]`);

export const getAboutPage = () => client.fetch<AboutPage>(`*[_type=="aboutPage"][0]`);

export const getCapabilitiesPage = () =>
  client.fetch<CapabilitiesPage>(`*[_type=="capabilitiesPage"][0]`);

export const getProcessPage = () => client.fetch<ProcessPage>(`*[_type=="processPage"][0]`);

export const getStandardsPage = () => client.fetch<StandardsPage>(`*[_type=="standardsPage"][0]`);

export const getContactPage = () => client.fetch<ContactPage>(`*[_type=="contactPage"][0]`);

export const getStats = () =>
  client.fetch<Stat[]>(`*[_type=="stat"] | order(order asc){value, label}`);

export const getProcessSteps = (showOnHome: boolean) =>
  client.fetch<ProcessStep[]>(
    `*[_type=="processStep" && showOnHome==$showOnHome] | order(order asc){number, title, description, showOnHome}`,
    { showOnHome }
  );

export const getCategories = () =>
  client.fetch<Category[]>(`*[_type=="category"] | order(order asc){number, name, image, specs}`);

export const getCertifications = () =>
  client.fetch<Certification[]>(
    `*[_type=="certification"] | order(order asc){name, description}`
  );

export const getComplianceItems = () =>
  client.fetch<ComplianceItem[]>(`*[_type=="complianceItem"] | order(order asc){text}`);
