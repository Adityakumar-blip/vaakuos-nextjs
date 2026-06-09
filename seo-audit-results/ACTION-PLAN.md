# VaakuOS SEO — Prioritized Action Plan

Target: local Next.js build (`http://localhost:3100`). Fixes ordered by impact. Most are 1–2 file changes in `src/app/`.

---

## 🔴 CRITICAL — fix before launch

### C1. Deploy the Next.js build
The live `vaakuos.com` is still the old Vite CSR shell (empty `<div id="root">`, no crawlable content). Shipping this build is the highest-impact SEO action you can take. Everything below assumes you're fixing this build pre-deploy.

### C2. Add Open Graph image + favicon + manifest (one move, fixes whole site)
All pages reference `https://vaakuos.com/og-image.png` and a favicon — **all 404**. Use the App Router file conventions:

```
src/app/
  opengraph-image.png   # 1200×630 — auto-wired as og:image + twitter:image sitewide
  icon.png              # 512×512 — auto-wired as favicon
  apple-icon.png        # 180×180 (optional)
```

Then **remove** the hardcoded `og:image: "/og-image.png"` from metadata (the file convention generates absolute URLs automatically). Add `src/app/manifest.ts`:

```ts
import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VaakuOS', short_name: 'VaakuOS',
    description: 'Recover every abandoned sale with VaakuOS',
    start_url: '/', display: 'standalone',
    background_color: '#ffffff', theme_color: '#000000',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  }
}
```

### C3. Fix the broken Organization & WebSite schema
In the home JSON-LD: `logo` points to `/favicon.png` (404) and `SearchAction` targets `/search` (no such page).

```jsonc
// Organization — fix logo, enrich
{
  "@context": "https://schema.org", "@type": "Organization",
  "name": "VaakuOS", "url": "https://vaakuos.com",
  "logo": "https://vaakuos.com/icon.png",          // must be a real, reachable image
  "sameAs": [
    "https://www.linkedin.com/company/vaakuos",
    "https://x.com/Vaakuos"                          // add real profiles
  ],
  "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "url": "https://vaakuos.com/contact" }
}
```
For `WebSite`: **either build a working `/search`** or **remove the `potentialAction`/`SearchAction`** entirely (an invalid SearchAction is worse than none).

---

## 🟠 HIGH — fix within 1 week

### H1. Add `BlogPosting` schema to `/blog/[slug]`
Biggest structured-data win — author + publish date already render in the UI.
```jsonc
{
  "@context": "https://schema.org", "@type": "BlogPosting",
  "headline": "Why WhatsApp Is the #1 Channel for Brand-Customer Conversations in 2026",
  "image": "https://res.cloudinary.com/.../qf4miizibcwt2t0rga3o.jpg",
  "author": { "@type": "Person", "name": "<author from post>" },
  "publisher": { "@type": "Organization", "name": "VaakuOS", "logo": { "@type": "ImageObject", "url": "https://vaakuos.com/icon.png" } },
  "datePublished": "2026-...", "dateModified": "2026-...",
  "mainEntityOfPage": "https://vaakuos.com/blog/why-whatsapp-is-the-1-channel-for-brand-customer-conversations-in-2026"
}
```

### H2. Add security headers in `next.config.js`
```js
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]
module.exports = {
  poweredByHeader: false,                       // hide X-Powered-By
  async headers() { return [{ source: '/:path*', headers: securityHeaders }] },
  // ...existing images config
}
```

### H3. Add the missing H1 on `/calculator`
Page currently starts at H2. Add e.g. `<h1>ROI Calculator — See How Much Revenue You Can Recover</h1>`.

### H4. Complete the sitemap (`src/app/sitemap.ts`)
Currently 19 URLs. Add: `/blog` index, all 12 `/integrations/[slug]` pages, and indexable legal pages. Generate integration + blog URLs from the same data source the pages use, so it stays in sync.

### H5. Flesh out or `noindex` the thin pages
`/pricing` (~101 words) is the priority — add feature detail, an FAQ block, and `Offer` schema. For pure stubs (`/documentation`, `/community`, `/careers`, `/changelog`), either add real content or add `robots: { index: false }` in their `metadata` until they do.

### H6. Add `llms.txt` (`/public/llms.txt`)
```
# VaakuOS
> Omnichannel communication + abandoned-cart recovery platform for e-commerce. Tracks shopper intent and re-engages across WhatsApp and other channels.

## Core pages
- [Features](https://vaakuos.com/features): Intent tracking, WhatsApp campaigns, automation, shared inbox, analytics
- [Pricing](https://vaakuos.com/pricing): Plans for growing teams
- [Integrations](https://vaakuos.com/integrations): Shopify, WooCommerce, HubSpot, Salesforce, Slack, and more

## Blog
- [WhatsApp commerce & cart-recovery playbooks](https://vaakuos.com/blog)
```

---

## 🟡 MEDIUM — fix within 1 month

- **M1. Alt text on integration logos** — 11/13 on `/integrations` and several on `/integrations/shopify` + home have `alt=""`. Set `alt="Shopify logo"`, `alt="HubSpot logo"`, etc.
- **M2. `BreadcrumbList`** on `/integrations/[slug]` and `/blog/[slug]`.
- **M3. `SoftwareApplication` schema** on `/features` (with `applicationCategory`, `offers`).
- **M4. Standardize brand to "VaakuOS"** everywhere — fix blog title (`… | Vaakuos | VaakuOS` → single ` | VaakuOS`), `twitter:site`, and any "Vaakuos" casing.
- **M5. Rewrite home FAQ answers** as direct, standalone statements (drop "the homepage highlights…") — these are exactly what AI engines quote.
- **M6. Fix heading hierarchy** (H1→H3 skips) on `/careers`, `/changelog`, `/community`, `/documentation`, `/help-center`.
- **M7. Trim long titles/descriptions** — titles ≤ 60 chars (blogpost 77, contact 56, features 57); `/features` description 189 → ≤ 160.
- **M8. Re-add business-critical third-party scripts** dropped in migration — decide on Meta Pixel + `vaaku-widget.js` chat widget; add via `next/script` with `strategy="afterInteractive"` so they don't hurt CWV.

---

## 🟢 LOW — backlog

- L1. Add GA4 + Google Search Console verification before/at launch (needed to measure SEO).
- L2. Convert raster images to `next/image`; keep SVG logos as raw `<img>`.
- L3. Remove legacy `keywords` meta (ignored by Google).
- L4. Expand the blog cluster (only ~5 posts) around WhatsApp commerce / cart recovery.
- L5. Add founder bios / proof points to `/about` for E-E-A-T.
- L6. Post-deploy: run Lighthouse + PageSpeed against staging for real CWV, then re-audit with field data (CrUX/GSC) once indexed.

---

## Post-launch verification checklist
- [ ] Lighthouse ≥ 90 on `/`, `/features`, `/pricing`, a blog post
- [ ] Rich Results Test passes for Organization, FAQPage, BlogPosting, Breadcrumb
- [ ] OG image renders in the Facebook/LinkedIn/X share debuggers
- [ ] Submit `sitemap.xml` in GSC; confirm pages indexing
- [ ] Confirm old Vite shell is fully replaced (no stale CSR routes)
