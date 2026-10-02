import type { SanityImageSource } from "@sanity/image-url";

export type CmsImage = SanityImageSource & { asset?: { _ref: string } };

export interface SiteSettings {
  name: string;
  logo?: CmsImage;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  foundedYear: number;
  social: { linkedin?: string; instagram?: string };
  address: { locality?: string; country?: string };
}

export interface HomePage {
  heroSlides?: (CmsImage & { caption?: string })[];
  heroSlideInterval?: number;
  heroBackgroundImage?: CmsImage;
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingItalic: string;
  heroSubtext: string;
  valuePropHeading: string;
  valuePropHeadingItalic: string;
  valuePropSubtext: string;
  productionFacilityPhoto?: CmsImage;
  closingHeading: string;
  closingHeadingItalic: string;
}

export interface AboutPage {
  heading: string;
  headingItalic: string;
  intro: string;
  teamPhoto?: CmsImage;
  notFactoryHeading: string;
  notFactoryHeadingItalic: string;
  notFactoryParagraph1: string;
  notFactoryParagraph2: string;
}

export interface CapabilitiesPage {
  sourcingHeading: string;
  sourcingParagraph: string;
  sewingLinePhoto?: CmsImage;
  yarnStockPhoto?: CmsImage;
  fabricRollsPhoto?: CmsImage;
  finishingPhoto?: CmsImage;
}

export interface ProcessPage {
  heading: string;
  subtext: string;
}

export interface StandardsPage {
  heading: string;
  subtext: string;
  qualityInspectionPhoto?: CmsImage;
  factoryFloorPhoto?: CmsImage;
  factoryStatLine: string;
  complianceHeading: string;
}

export interface ContactPage {
  heading: string;
  headingItalic: string;
  subtext: string;
  photo?: CmsImage;
  tradeShows: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  showOnHome: boolean;
}

export interface Category {
  number: string;
  name: string;
  image?: CmsImage;
  specs: string[];
}

export interface Certification {
  name: string;
  description: string;
}

export interface ComplianceItem {
  text: string;
}
