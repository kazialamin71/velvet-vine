import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Velvet Vine",
    legalName: "Velvet Vine Sourcing Ltd.",
    tagline: "Garments Buying House",
    description:
      "Velvet Vine is a full-service garments buying house connecting fashion brands with vetted, certified factories across South & Southeast Asia — handling sourcing, sampling, quality control, compliance, and logistics from first enquiry to warehouse delivery.",
    url: "https://www.velvetvine.com",
    email: "sourcing@velvetvine.com",
    phone: "+880 1XXX-XXXXXX",
    foundedYear: 2013,
    social: {
      linkedin: "https://www.linkedin.com/company/velvetvine",
      instagram: "https://www.instagram.com/velvetvine",
    },
    address: { locality: "Dhaka", country: "Bangladesh" },
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Full-service garment sourcing · Since 2013",
    heroHeading: "Looking to produce",
    heroHeadingItalic: "your next collection?",
    heroSubtext:
      "We source and manage garment production for European and US brands — fully certified, end-to-end, from first sample to your warehouse.",
    valuePropHeading: "You tell us your vision.",
    valuePropHeadingItalic: "We source it and handle everything else.",
    valuePropSubtext:
      "One vetted factory network, one dedicated account manager — no anonymous agents, no middlemen chains, no delays.",
    closingHeading: "Tell us about",
    closingHeadingItalic: "your collection.",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "Twelve years connecting brands with",
    headingItalic: "the right factory.",
    intro:
      "Velvet Vine started as a sourcing desk for two small European labels who needed one thing: a partner who would answer the phone. Today we manage production across knitwear, wovens, denim, and outerwear through a network of 60+ vetted factory partners — without ever losing that original promise.",
    notFactoryHeading: "We are not a factory.",
    notFactoryHeadingItalic: "That's the point.",
    notFactoryParagraph1:
      "A buying house that also owns production lines has an incentive to keep those lines full — even when a different factory would serve your order better. Velvet Vine doesn't own factories. We match every order to the vendor best suited to it, then stay accountable for the result: on quality, on timeline, on price.",
    notFactoryParagraph2:
      "That independence is why brands come to us for a second opinion on an existing vendor, not just a first introduction to a new one.",
  },
  {
    _id: "capabilitiesPage",
    _type: "capabilitiesPage",
    sourcingHeading: "Matched to the vendor, not the other way around.",
    sourcingParagraph:
      "Every enquiry is scoped against fabric, construction, and finish before we select a factory — so your denim doesn't end up on a knitwear line just because it has open capacity. That's the difference a dedicated buying house makes.",
  },
  {
    _id: "processPage",
    _type: "processPage",
    heading: "From Idea to Shipment",
    subtext:
      "One dedicated account manager. Total visibility at every stage. No handoffs, no surprises — just results.",
  },
  {
    _id: "standardsPage",
    _type: "standardsPage",
    heading: "Every certification the EU market demands.",
    subtext:
      "Independently audited and certified. Our compliance team will never leave your import documentation incomplete.",
    factoryStatLine: "500K+ garments per month.",
    complianceHeading: "Bring us your audit checklist. We'll meet it.",
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heading: "Tell us about",
    headingItalic: "your collection.",
    subtext:
      "Tech packs, mood boards, or a rough idea — send us what you have. We come back within 24 hours with a clear quote and next steps.",
    tradeShows: ["Première Vision Paris", "Munich Fabric Start"],
  },

  ...[
    ["12+", "Years sourcing experience"],
    ["60+", "Vetted factory partners"],
    ["500K+", "Units shipped annually"],
    ["5-day", "Average quote turnaround"],
  ].map(([value, label], i) => ({
    _id: `stat-${i + 1}`,
    _type: "stat",
    value,
    label,
    order: i + 1,
  })),

  // Full steps shown on the Process page
  ...[
    ["01", "Enquiry & Quote", "Send tech packs, mood boards, or just an idea. We come back with a detailed, itemized quote within 5 business days."],
    ["02", "Vendor Matching", "We select the best-fit factory from our vetted network based on your product type, quality bar, MOQ, and budget — not the other way around."],
    ["03", "Sampling & Development", "Proto and fit samples run through 2–3 rounds until every detail — fabric, fit, trims — is exactly right and signed off by you."],
    ["04", "Production & QC", "In-line and end-line inspection at every stage. Third-party audits (SGS, Bureau Veritas) welcome at any point in the run."],
    ["05", "Logistics & Delivery", "Consolidated shipping, full customs documentation, and delivery to your EU/US warehouse. One partner, start to finish."],
  ].map(([number, title, description], i) => ({
    _id: `processStep-${number}`,
    _type: "processStep",
    number,
    title,
    description,
    showOnHome: false,
    order: i + 1,
  })),

  // Condensed teaser shown on the Home page
  ...[
    ["01", "Share your idea", "Tech packs, mood boards, or a rough sketch — we work with whatever you have and develop it into a production-ready spec."],
    ["02", "We match & sample", "Our team selects the right factory from our vetted network and runs full sampling until every detail is approved."],
    ["03", "We produce & deliver", "Full production, in-line QC, and certified shipment direct to your warehouse. One partner, start to finish."],
    ["04", "Always direct", "You speak to your dedicated account manager — not a call centre. Questions get answered within hours, not days."],
  ].map(([number, title, description], i) => ({
    _id: `processStep-home-${number}`,
    _type: "processStep",
    number,
    title,
    description,
    showOnHome: true,
    order: i + 1,
  })),

  ...[
    ["01", "Knitwear", ["Single & double jersey", "Interlock & rib", "MOQ from 300 pcs"]],
    ["02", "Wovens", ["Cotton & linen blends", "Viscose & silk-touch", "MOQ from 200 pcs"]],
    ["03", "Activewear", ["4-way stretch performance", "Recycled polyester", "MOQ from 500 pcs"]],
    ["04", "Denim", ["5-pocket & fashion cuts", "Enzyme & stone wash", "MOQ from 300 pcs"]],
    ["05", "Tailoring", ["Full canvas & fused", "Half-lining options", "MOQ from 150 pcs"]],
    ["06", "Outerwear", ["Quilted & padded", "Bonded & laminated", "MOQ from 200 pcs"]],
    ["07", "Loungewear", ["Brushed fleece & waffle", "Matching sets", "MOQ from 300 pcs"]],
    ["08", "Swimwear", ["Chlorine-resistant fabrics", "UPF50+ options", "MOQ from 300 pcs"]],
  ].map(([number, name, specs], i) => ({
    _id: `category-${number}`,
    _type: "category",
    number,
    name,
    specs,
    order: i + 1,
  })),

  ...[
    ["GOTS", "Certified organic fibres and responsible processing across our vendor network."],
    ["OEKO-TEX", "Every component tested — safe for skin contact, free of harmful substances."],
    ["BSCI", "Fair labour and safe working conditions, audited annually."],
    ["ISO 9001", "International quality management — consistent results, every run."],
    ["GRS", "Verified recycled content for sustainable collections."],
    ["WRAP", "Worldwide responsible accredited production, factory by factory."],
  ].map(([name, description], i) => ({
    _id: `certification-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    _type: "certification",
    name,
    description,
    order: i + 1,
  })),

  ...[
    "GSP+ preferential tariff access",
    "Full REACH compliance",
    "EU customs documentation included",
    "SGS / Bureau Veritas lab testing",
    "EUDR due diligence available",
    "Carbon footprint reporting per order",
  ].map((text, i) => ({
    _id: `complianceItem-${i + 1}`,
    _type: "complianceItem",
    text,
    order: i + 1,
  })),
];

const run = async () => {
  const tx = client.transaction();
  documents.forEach((doc) => tx.createOrReplace(doc));
  const result = await tx.commit();
  console.log(`Migrated ${documents.length} documents.`);
  return result;
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
