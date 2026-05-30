# VaakuOS SEO Progress

## Overview
This document tracks the current SEO implementation for the VaakuOS Next.js 14 application.
It should be treated as the source of truth for SEO architecture, completed work, known gaps, and follow-up priorities.

## Last Updated
2026-05-27

## Current Architecture

### Primary SEO System
- Next.js App Router `metadata` and `generateMetadata()` are the canonical SEO layer.
- Root defaults live in `src/app/layout.tsx`.
- Route-specific metadata lives in each page file.
- Dynamic blog post metadata is generated in `src/app/blog/[slug]/page.tsx`.

### Structured Data
- JSON-LD is server-rendered via `src/components/json-ld.tsx`.
- Homepage includes `Organization` and `WebSite` schemas.
- Help Center includes `FAQPage` schema.

### Technical SEO Files
- `public/robots.txt` exists.
- `public/sitemap.xml` exists.

## Completed Work

### 2026-05-27: Removed Legacy SEO Component
- Deleted `src/components/SEO.tsx`.
- Removed all route usage of `react-helmet`-style page SEO.
- Standardized routes to use Next.js metadata instead of duplicate head injection.
- Eliminated the old Vite-style SEO path that relied on `import.meta.env`.

### 2026-05-27: Preserved Useful Structured Data
- Added `src/components/json-ld.tsx` as the reusable JSON-LD helper.
- Migrated homepage structured data from the legacy SEO component to `JsonLd`.
- Migrated Help Center FAQ structured data from the legacy SEO component to `JsonLd`.

### 2026-05-27: Route Cleanup
- Removed duplicate SEO imports/usages from marketing and legal pages.
- Fixed `src/app/integrations/page.tsx`, which was malformed in the workspace during the cleanup.
- Fixed invalid XML in `public/sitemap.xml` for the `/login` entry.

## Current Coverage

### Metadata Coverage
- `src/app/layout.tsx`: global title template, description, keywords, Open Graph, Twitter, robots, canonical base.
- Route pages: page-level title, description, and canonical metadata are implemented across the main public routes.
- `src/app/blog/[slug]/page.tsx`: dynamic metadata per article, including canonical and article Open Graph fields.

### Structured Data Coverage
- Homepage: `Organization`, `WebSite`
- Help Center: `FAQPage`

## Important Decision
- Do not reintroduce a generic `SEO` component for titles, descriptions, canonicals, Open Graph, Twitter, or robots tags.
- Use Next.js `metadata` / `generateMetadata()` for those concerns.
- Only use `JsonLd` when a page needs structured data that is not covered by metadata.

## Known Gaps

### High Priority
- Audit each public page for stronger page-specific Open Graph and Twitter overrides where the layout defaults are too generic.
- Verify all canonical paths match final production routing.
- Decide whether to keep `public/sitemap.xml` and `public/robots.txt` or migrate to native Next.js `src/app/sitemap.ts` and `src/app/robots.ts`.

### Medium Priority
- Expand structured data beyond homepage and help center.
- Good candidates:
  - `WebPage`
  - `BreadcrumbList`
  - `Article` enhancements for blog posts
  - `Organization` enrichment with additional social/contact fields

### Content / UX SEO
- Audit heading hierarchy page by page.
- Improve internal linking between related marketing, blog, pricing, and help content.
- Review placeholder links and placeholder content on documentation/community-style pages.

### Performance / Media
- Audit remaining `<img>` usage and convert important images to `next/image` where appropriate.
- Review image alt text quality.
- Review OG image coverage for important landing pages.

## Verification Checklist
- Page exports `metadata` or `generateMetadata()` where appropriate.
- Title and description are unique and intentional.
- Canonical path is present and correct.
- Structured data is added only when it provides search value.
- Page has a single clear `h1`.
- Important images have meaningful `alt` text.
- Sitemap and robots entries stay aligned with live public routes.

## Files To Check First
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/help-center/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/json-ld.tsx`
- `public/sitemap.xml`
- `public/robots.txt`

## Notes
- `npm run lint` still reports unrelated pre-existing lint issues outside this SEO migration scope, including unescaped entity violations and some `img` optimization warnings in other files.
- Future SEO work should extend the Next.js-native approach rather than layering a second head-management system on top.
