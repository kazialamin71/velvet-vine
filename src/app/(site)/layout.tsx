import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCategories, getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <>
      <Header siteName={settings.name} logo={settings.logo} />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings.name}
        legalName={settings.legalName}
        tagline={settings.tagline}
        email={settings.email}
        categories={categories}
      />
    </>
  );
}
