import Link from "next/link";
import type { Category } from "@/sanity/types";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Our Network", href: "/capabilities" },
  { label: "Certifications", href: "/standards" },
  { label: "Sustainability", href: "/standards" },
] as const;

const contactLinks = [
  { label: "Request a Quote", href: "/contact" },
  { label: "Sampling", href: "/process" },
  { label: "Factory Visit", href: "/contact" },
] as const;

export function Footer({
  siteName,
  legalName,
  tagline,
  email,
  categories,
}: {
  siteName: string;
  legalName: string;
  tagline: string;
  email: string;
  categories: Category[];
}) {
  const productLinks = categories.map((c) => ({ label: c.name, href: "/capabilities" }));

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="label tracking-[0.2em] text-cream">{siteName.toUpperCase()}</p>
          <p className="label mt-1 text-cream/40">{tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Sourcing for EU &amp; US fashion brands. GOTS &middot; OEKO-TEX &middot; BSCI &middot; ISO 9001
          </p>
        </div>

        <FooterColumn title="Products" links={productLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Contact" links={contactLinks} extra={email} />
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-cream/40 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            &copy; {new Date().getFullYear()} {legalName} All rights reserved.
          </p>
          <p className="flex gap-4">
            <span>Privacy</span>
            <span>Terms of Trade</span>
            <span>Ethical Policy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  extra,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  extra?: string;
}) {
  return (
    <div>
      <p className="label text-cream/40">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition-colors hover:text-cream">
              {link.label}
            </Link>
          </li>
        ))}
        {extra && (
          <li>
            <a href={`mailto:${extra}`} className="transition-colors hover:text-cream">
              {extra}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
