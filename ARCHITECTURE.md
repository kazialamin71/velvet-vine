# Velvet Vine — Project Structure & Rendering Guide

Stack: **Next.js 16** (App Router, Turbopack, TypeScript) + **Tailwind CSS v4** for the site,
**Sanity** (headless CMS) as the content source, embedded Studio admin at `/studio`.

There is no local database. All content — page copy, stats, categories, certifications,
photos — lives in Sanity's hosted API and is fetched fresh on every render (subject to the
60s cache described below).

---

## 1. Directory structure

```
sanity.config.ts                 Studio config: schema + plugins (root of the CMS admin)
next.config.ts                   Next.js config (image domains, Turbopack workaround — see §4)

src/sanity/                      ── the "data layer" ──
  env.ts                            reads NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / API_VERSION
  client.ts                        configured Sanity API client (useCdn: true, read-only, no token)
  image.ts                         urlForImage() — builds CDN image URLs from an image field
  types.ts                         TypeScript interfaces mirroring each schema (editor-time only,
                                    not enforced at runtime — Sanity itself doesn't validate shape)
  queries.ts                       one exported function per content type, each a thin
                                    client.fetch(GROQ) wrapper — this is the only file that
                                    talks to Sanity; every page imports from here, never from
                                    client.ts directly
  structure.ts                     customizes the Studio's sidebar (singleton pages grouped
                                    under "Pages", repeatable types listed below)
  schemaTypes/
    siteSettings.ts                 singleton: company name, domain, email, social links
    homePage.ts, aboutPage.ts,      singleton per page: all editable headings/paragraphs/
    capabilitiesPage.ts,            photos for that page live here
    processPage.ts,
    standardsPage.ts,
    contactPage.ts
    stat.ts                        repeatable: the 4 stat tiles (value + label)
    processStep.ts                 repeatable: process steps — shared by two views via the
                                    `showOnHome` boolean (see §5)
    category.ts                    repeatable: product categories (name, specs, thumbnail)
    certification.ts               repeatable: GOTS / OEKO-TEX / etc.
    complianceItem.ts               repeatable: the checklist on /standards
    index.ts                       aggregates all of the above into the `schema` object
                                    sanity.config.ts imports

src/app/                         ── routes: folder path = URL path ──
  layout.tsx                       ROOT layout — the only place <html>/<body> exist. Loads
                                    fonts, calls generateMetadata() for <title>/OG tags, and
                                    injects the Organization JSON-LD script. Wraps every
                                    single route in the app, including /studio.
  globals.css                      Tailwind import + design tokens (colors, `.label` utility)
  sitemap.ts, robots.ts            auto-recognized by filename — no route file needed
  opengraph-image.tsx              generates the default social-share image on the fly

  (site)/                          a "route group" — parens are stripped from the URL, this
                                    folder only exists to give these routes a shared layout
    layout.tsx                       fetches siteSettings + categories ONCE, passes them as
                                      props into <Header> and <Footer>, wraps {children} in <main>
    page.tsx                         "/" — the homepage
    about/page.tsx                   "/about"
    capabilities/page.tsx            "/capabilities"
    process/page.tsx                 "/process"
    standards/page.tsx               "/standards"
    contact/
      page.tsx                        "/contact" — Server Component, fetches data, renders form
      ContactForm.tsx                 "use client" — form state (useActionState)
      actions.ts                      "use server" — submitEnquiry(), the only mutation in the app

  studio/[[...tool]]/              the embedded Sanity Studio, mounted at /studio
    page.tsx                         Server Component — re-exports metadata/viewport (sets
                                      robots: noindex automatically), renders <Studio/>
    Studio.tsx                       "use client" — THIS is where sanity.config.ts actually
                                      gets imported and <NextStudio> gets rendered (see §4
                                      for why this had to be split into its own file)

src/components/
  ui.tsx                          Container, SectionLabel, CTAButton, StatsBar,
                                   PlaceholderPhoto, CmsPhoto (see §3)
  Header.tsx                       "use client" (mobile menu toggle state)
  Footer.tsx                       plain Server Component

scripts/
  migrate.mjs                      one-off script (already run) that pushed the original
                                    hardcoded content into Sanity as the starting dataset

.env.local                        NOT committed. Holds the 4 env vars from env.ts above plus
                                   SANITY_API_TOKEN (write-access token, server-only, used only
                                   by one-off scripts — the live site never writes to Sanity)
```

---

## 2. The render pipeline for a normal page

Example: a browser requests `/capabilities`.

1. **Route match** — Next.js maps the URL to `src/app/(site)/capabilities/page.tsx`. The
   `(site)` segment contributes no URL segment, it just means this page is nested inside
   `(site)/layout.tsx`.
2. **Layouts render outside-in, data-fetch independently:**
   - `src/app/layout.tsx` runs first. It calls `getSiteSettings()` inside `generateMetadata()`
     to build `<title>`/`<meta>`, and again in the component body to build the JSON-LD
     `<script>` tag. Renders `<html><body>{children}</body></html>`.
   - `src/app/(site)/layout.tsx` runs next, inside that body. It calls `getSiteSettings()`
     and `getCategories()` **in parallel** (`Promise.all`), passes the results as props into
     `<Header siteName=...>` and `<Footer ... categories={categories}>`, then renders
     `<main>{children}</main>`.
3. **The page itself** (`capabilities/page.tsx`) is an `async` Server Component. It calls
   `getCapabilitiesPage()` and `getCategories()` (again — Next.js dedupes identical fetches
   within a single request automatically) and returns JSX built from `src/components/ui.tsx`
   primitives (`Container`, `CTAButton`, `SectionLabel`, `CmsPhoto`).
4. **Every one of those `get*` calls** is `client.fetch(groqQueryString)` from
   `src/sanity/queries.ts`, hitting Sanity's hosted API and returning JSON shaped like the
   matching interface in `src/sanity/types.ts`.
5. **Images:** if a field like `category.image` has an uploaded asset, `CmsPhoto` (in
   `ui.tsx`) calls `urlForImage()` to build a `cdn.sanity.io` URL and hands it to `next/image`
   (which further resizes/optimizes on demand — `next.config.ts` allow-lists that hostname).
   If there's no asset yet, it renders the striped `PlaceholderPhoto` instead.
6. **Render + cache:** because every page/layout exports `export const revalidate = 60`, the
   resulting HTML is cached for up to 60 seconds (Next.js's ISR). The next request after
   that window triggers a fresh Sanity fetch — this is why an edit published in Studio shows
   up on the live site within about a minute without a redeploy, but not instantly.

Server Components never ship their own code to the browser — only the finished HTML (plus
hydration for any Client Component islands inside them, like the mobile menu button).

---

## 3. The one page with a mutation: `/contact`

`page.tsx` fetches data server-side as usual and renders `<ContactForm categories={categories} />`.
`ContactForm.tsx` is a Client Component (`"use client"`) so it can hold interactive state —
it uses React's `useActionState` hook wired to `submitEnquiry` from `actions.ts`.

`actions.ts` starts with `"use server"` — this makes `submitEnquiry` a **Server Action**: the
browser calls it like a normal async function, but it actually executes on the server (Next.js
generates the RPC plumbing). Right now it validates fields and `console.log`s the result; no
email/CRM provider is wired up yet.

---

## 4. Why `/studio` is split into two files

Embedding Sanity Studio inside a Next.js 16 (Turbopack) App Router project has a real bug:
importing `sanity.config.ts` directly from a Server Component file breaks the build, because
Turbopack resolves one of Sanity's dependencies (`swr`) using its `react-server` export
condition, which Sanity's code doesn't actually support being loaded under.

The fix is the split you see in `src/app/studio/[[...tool]]/`:
- `page.tsx` stays a Server Component and only re-exports `metadata`/`viewport`.
- `Studio.tsx` is `"use client"` and is the only place `sanity.config.ts` / `NextStudio` get
  imported — isolating the whole heavy dependency graph inside the client bundle.

This is paired with `serverExternalPackages: ["swr"]` in `next.config.ts`.

---

## 5. One quirk in the content model: `processStep.showOnHome`

The Home page shows a condensed 4-step teaser; the Process page shows the full 5-step
breakdown. Rather than two separate schemas, both live in the single `processStep` type,
distinguished by the `showOnHome` boolean:

```ts
getProcessSteps(true)   // → the 4 steps shown on the Home page teaser
getProcessSteps(false)  // → the 5 steps shown on the full /process page
```

They currently have different copy (not just a filtered subset), so don't toggle this flag
on an existing item expecting it to just "move" between pages — the wording is written
differently for each context.

---

## 6. Adding something new

**New field on an existing page/type:** edit the schema file in `src/sanity/schemaTypes/` →
add it to the matching interface in `src/sanity/types.ts` → if the query in `queries.ts` uses
an explicit `{ }` projection (categories, stats, etc. do; page singletons don't), add the
field name there too → use it in the page component.

**New page:** create `src/app/(site)/newpage/page.tsx` → add a schema type if it needs CMS
content (register it in `schemaTypes/index.ts`) → add a query function in `queries.ts` → add
the nav link in `Header.tsx` and a link in `Footer.tsx` → add the route to `sitemap.ts`.
