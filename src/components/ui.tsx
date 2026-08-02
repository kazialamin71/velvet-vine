import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { urlForImage } from "@/sanity/image";
import type { CmsImage } from "@/sanity/types";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`mx-auto max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="label text-ink/50">/ {children}</p>;
}

export function CTAButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "outline-light";
}) {
  const base = "label inline-block rounded-sm px-6 py-3 transition-colors";
  const variants = {
    solid: "bg-accent text-cream hover:bg-accent-dark",
    outline: "border border-ink text-ink hover:bg-ink hover:text-cream",
    "outline-light": "border border-cream/40 text-cream hover:bg-cream hover:text-ink",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}

export function PlaceholderPhoto({
  label,
  className = "",
  dark = false,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        dark ? "bg-ink-soft" : "bg-cream-dark"
      } ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span
        className={`label rounded-sm px-3 py-1 ${
          dark ? "bg-ink text-cream/50" : "bg-cream text-ink/40"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function CmsPhoto({
  image,
  label,
  className = "",
  dark = false,
}: {
  image?: CmsImage | null;
  label: string;
  className?: string;
  dark?: boolean;
}) {
  if (!image?.asset) {
    return <PlaceholderPhoto label={label} className={className} dark={dark} />;
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={urlForImage(image).width(1600).url()}
        alt={label}
        fill
        className="object-cover"
      />
    </div>
  );
}

export function StatsBar({
  stats,
  theme = "dark",
}: {
  stats: ReadonlyArray<{ value: string; label: string }>;
  theme?: "dark" | "light";
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={`grid grid-cols-2 border-t md:grid-cols-4 ${
        isDark ? "border-cream/10 bg-ink text-cream" : "border-line bg-cream-dark text-ink"
      }`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`border-b border-r px-6 py-8 last:border-r-0 md:border-b-0 ${
            isDark ? "border-cream/10" : "border-line"
          }`}
        >
          <p className="font-serif text-3xl md:text-4xl">{stat.value}</p>
          <p className={`label mt-2 ${isDark ? "text-cream/50" : "text-ink/50"}`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
