# VaakuOS — Full SEO Audit Report

**Audit target:** Local Next.js 14 production build (`next build && next start`) at `http://localhost:3100`
**Date:** 2026-06-08
**Business type:** B2B SaaS — omnichannel communication / abandoned-cart recovery for e-commerce
**Pages analyzed:** 17 representative routes (36 total in build)

> ⚠️ **Deployment context (read first):** The audited build is **not yet live**. The public `vaakuos.com` is still the **old Vite SPA** — it serves a 3 KB empty `<div id="root">` shell with no server-rendered content, no JSON-LD, and no canonical. For SEO purposes the live site is effectively invisible to crawlers. **Shipping this Next.js build is the single highest-impact SEO action available** — everything below is about getting it launch-ready.

---

## Executive Summary

### Overall SEO Health Score: **64 / 100** (local build — "solid foundation, fix before launch")

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 62 | 14.3 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 35 | 3.5 |
| Performance (CWV, lab) | 10% | 78 | 7.8 |
| AI Search Readiness (GEO) | 10% | 58 | 5.8 |
| Images | 5% | 55 | 2.8 |
| **Total** | **100%** | | **≈ 64** |

The Next.js migration fixes the fundamental problem (real SSR/SSG HTML — every page now ships fully rendered content, unique titles/descriptions, and correct canonicals). What holds the score back is **missing structured data on 14 of 17 pages**, **broken/absent social + favicon assets**, **several thin "stub" pages**, and **no security headers**.

### Top 5 Critical Issues
1. **`og-image.png`, `favicon`, and `manifest.json` all 404** — every page references `https://vaakuos.com/og-image.png` and a favicon, but none exist in `/public`. Social shares render blank previews; no favicon in tabs/SERPs.
2. **The Next.js site is not deployed** — the live domain still serves the old CSR-only Vite shell with zero crawlable content.
3. **No structured data on 14/17 pages** — blog posts have **no `BlogPosting`/`Article`**, pricing has no `Product`/`Offer`, no `BreadcrumbList` anywhere, features has no `SoftwareApplication`.
4. **Organization schema `logo` points to a 404** (`/favicon.png`) and **`WebSite` `SearchAction` points to `/search`, which doesn't exist** — both are invalid and can suppress rich results.
5. **No security headers** (no `X-Content-Type-Options`, `X-Frame-Options`, CSP, `Referrer-Policy`, HSTS); `X-Powered-By: Next.js` is exposed.

### Top 5 Quick Wins
1. Add `src/app/opengraph-image.png` (1200×630) + `icon.png`/`favicon.ico` → fixes social previews + favicon for the whole site in one move.
2. Add `BlogPosting` JSON-LD to `/blog/[slug]` (author + datePublished already present in the UI) — flagship 2,382-word post is ready for rich results.
3. Add the missing H1 on `/calculator` and fix H1→H3 heading jumps on ~6 stub pages.
4. Fill the `alt` attribute on the 11 integration brand logos (`/icons/brands/*.svg`) with "Shopify logo" etc.
5. Add `llms.txt` (currently 404) and add `BreadcrumbList` to `/integrations/[slug]` and `/blog/[slug]`.

---

## 1. Technical SEO — 72/100

**Strengths**
- **True SSR/SSG**: every route returns fully rendered HTML (122 KB home vs. 3 KB on the live Vite shell). This is the core win of the migration.
- **Canonicals correct on all 17 pages** — all use the production `https://vaakuos.com/...` domain (correct even when served from localhost).
- `robots.txt` valid, allows all agents, disallows `/admin/ /private/ /api/`, points to the production sitemap.
- All pages: `<html lang="en">`, viewport meta present, `robots: index, follow`.
- Good cache headers (`s-maxage=31536000, stale-while-revalidate`).

**Findings**

| Severity | Issue | Evidence | Fix |
|---|---|---|---|
| High | No security headers | `curl -D-` on `/` returns none of `X-Content-Type-Options`, `X-Frame-Options`, CSP, `Referrer-Policy`, HSTS | Add `headers()` in `next.config.js` (see Action Plan) |
| High | `manifest.json` 404 | robots.txt "allows" `/manifest.json` but it returns 404 | Add `src/app/manifest.ts` |
| Medium | Sitemap incomplete | `sitemap.xml` lists 19 URLs; **missing** `/blog` index, all `/integrations/[slug]` pages (12), and legal pages | Extend `src/app/sitemap.ts` to include integration + blog index + legal routes |
| Medium | `X-Powered-By: Next.js` exposed | response header | `poweredByHeader: false` in `next.config.js` |
| Low | No `hreflang` | single-language site | Fine for now; add if i18n is planned |
| Low | Home canonical lacks trailing-slash normalization | `canonical: https://vaakuos.com` (no `/`) | Cosmetic; keep consistent sitewide |

---

## 2. Content Quality & E-E-A-T — 62/100

**Strengths**
- Flagship blog post (`why-whatsapp-is-the-1-channel...`) is **2,382 words**, 25 H2 sections, author byline + "min read" present, embeds a real OG image (Cloudinary). Strong, citable content.
- Unique, on-brand titles and meta descriptions across all pages.
- Clear value proposition and benefit-driven marketing copy.

**Findings — thin / stub pages** (word counts from rendered HTML):

| Page | Words | Verdict |
|---|---|---|
| `/community` | ~99 | Stub — thin |
| `/documentation` | ~99 | Stub — "Developer Documentation" with no real docs |
| `/pricing` | ~101 | **Thin for a key conversion page** |
| `/careers` | ~109 | Stub |
| `/demo` | ~119 | Acceptable (form page) |
| `/changelog` | ~126 | Stub |
| `/contact` | ~180 | Acceptable (form page) |
| `/calculator` | ~192 | Acceptable (interactive tool) |
| `/about` | ~252 | Light for an E-E-A-T trust page |
| `/blog` (index) | ~261 | Acceptable (listing) |

| Severity | Issue | Fix |
|---|---|---|
| High | `/pricing` is only ~101 words | Add plan-feature detail, FAQ, comparison, and `Product`/`Offer` schema |
| Medium | `/documentation`, `/community`, `/careers`, `/changelog` are stubs | Either flesh out, or `noindex` until they have real content (thin pages dilute site quality) |
| Medium | `/about` light on team/credentials | Add founder bios, company story, proof points (E-E-A-T) |
| Low | Only ~5 blog posts | Expand cluster around WhatsApp commerce / cart recovery |

---

## 3. On-Page SEO — 70/100

**Strengths**
- Every page has a unique `<title>` and `meta description`.
- Exactly one H1 per page (except `/calculator`).
- Internal linking present on all pages (16–31 links each).
- Good keyword targeting in titles ("WhatsApp commerce platform", "ROI Calculator", "Shopify integration setup").

**Findings**

| Severity | Issue | Evidence | Fix |
|---|---|---|---|
| High | `/calculator` has **no H1** | `H1(0)`; page starts at H2 | Add a descriptive H1 |
| Medium | Heading hierarchy skips H2 → jumps H1→H3 | `/careers`, `/changelog`, `/community`, `/documentation`, `/help-center` (seq `1333…`) | Use H2 for top-level sections |
| Medium | Brand inconsistency "Vaakuos" vs "VaakuOS" | blog title `… \| Vaakuos \| VaakuOS`; `twitter:site @Vaakuos`; live `<title>` "Vaakuos -" | Standardize on **VaakuOS** everywhere |
| Medium | Doubled/tripled brand suffix in titles | "About VaakuOS \| VaakuOS", "… \| Vaakuos \| VaakuOS" | Single ` \| VaakuOS` suffix; drop duplicate |
| Low | Titles too long (will truncate ~60 chars) | blogpost 77, contact 56, features 57 | Trim to ≤ 60 |
| Low | `meta description` too long | `/features` 189 chars (truncates ~160) | Trim to ≤ 160 |
| Low | Legacy `keywords` meta on home | ignored by Google | Harmless; can remove |

---

## 4. Schema / Structured Data — 35/100

**Current state:** only **3 of 17 pages** carry any JSON-LD.

| Page | Schema present | Issues |
|---|---|---|
| `/` (home) | Organization, WebSite, FAQPage | `logo` → `favicon.png` **(404)**; `SearchAction` → `/search` **(no such page)**; FAQ answers are self-referential ("the homepage highlights…"); only 1 `sameAs` |
| `/help-center` | FAQPage | OK |
| **All other 14 pages** | **NONE** | — |

**Missing high-value schema**
- `BlogPosting`/`Article` on every `/blog/[slug]` — **biggest miss** (author + date already in UI).
- `SoftwareApplication` (or `Product`) with `offers` on `/features` and `/pricing`.
- `Offer`/`AggregateOffer` on `/pricing`.
- `BreadcrumbList` sitewide (especially `/integrations/[slug]`, `/blog/[slug]`).
- `Organization` should be enriched: valid `logo`, `contactPoint`, more `sameAs`.

**Fixes (ready to paste in Action Plan):** corrected `Organization`, `BlogPosting`, `BreadcrumbList`, and `Offer` snippets are in `ACTION-PLAN.md`.

---

## 5. Performance (Core Web Vitals — LAB estimate only) — 78/100

> **No field data (CrUX) and no Lighthouse run possible** — the site isn't public and neither Lighthouse nor Playwright is installed locally. The following is an architectural/lab assessment from build output + HTML, **not** measured field CWV.

**Strengths**
- Lean JS: 87 KB shared First-Load, home 111 KB total — well within budget.
- SSG/SSR for all marketing pages → fast TTFB, good LCP potential.
- **Zero third-party scripts** in the new build (see migration note below) → no render-blocking 3rd-party JS, no font CDN blocking.
- Long-cache + stale-while-revalidate headers.

**Findings**

| Severity | Issue | Fix |
|---|---|---|
| Medium | Heaviest routes: `/pricing` 151 KB, `/demo` 148 KB, `/calculator` 122 KB First-Load JS | Code-split heavy client components; lazy-load below-fold |
| Medium | Most `<img>` are raw `<img>` not `next/image` | SVG logos are fine raw; convert raster images (e.g. blog/hero) to `next/image` for sizing + lazy-load (blog hero already uses `/_next/image`) |
| Low | CWV unverified | Run Lighthouse/PageSpeed against the staging URL post-deploy |

---

## 6. AI Search Readiness (GEO) — 58/100

**Strengths**
- SSR HTML is fully readable by GPTBot/ClaudeBot/PerplexityBot (robots.txt allows all).
- `FAQPage` on home + help-center.
- Long-form, structured blog content is citable.

**Findings**

| Severity | Issue | Fix |
|---|---|---|
| High | `llms.txt` 404 | Add `/public/llms.txt` (template in Action Plan) |
| High | Sparse schema limits entity understanding | Add `Organization`, `BlogPosting`, `BreadcrumbList` (see §4) |
| Medium | FAQ answers are self-referential ("the homepage highlights…") | Rewrite as direct, standalone answers — these are what LLMs quote |
| Medium | Weak brand entity (1 `sameAs`, broken `logo`, inconsistent "Vaakuos") | Fix logo, add sameAs (LinkedIn ✓, add X/Crunchbase/G2), standardize name |

---

## 7. Images — 55/100

| Severity | Issue | Evidence | Fix |
|---|---|---|---|
| Critical | Social/OG image is a 404 | `og:image = https://vaakuos.com/og-image.png` → 404 (not in `/public`) | Add `opengraph-image.png` |
| High | No favicon | `/favicon.ico` 404, none in `/public` or `src/app` | Add `src/app/icon.png` + `favicon.ico` |
| Medium | 11 of 13 integration logos have empty `alt` | `/integrations` `<img alt="">` for shopify, hubspot, salesforce… | Set `alt="Shopify logo"` etc. |
| Medium | Home has 4 empty-alt images | `pages/home.html` | Add descriptive alt |
| Low | Raster images not all via `next/image` | — | Use `next/image` for non-SVG assets |

---

## Migration gap (not strictly SEO, but important)

The new Next.js build **dropped all third-party scripts** that the live Vite site runs:
- **Meta Pixel** (`fbq` / `connect.facebook.net`) — conversion tracking **gone**
- **`vaaku-widget.js`** chat widget (`data-phone="7668742078"`) — **gone**
- Fontshare + Google Fonts CDN — gone (now self-hosted/none — performance-positive)

There is also **no analytics (GA4) and no Search Console verification** in the new build. Before launch, decide which of these to re-add (Meta Pixel + chat widget are likely business-critical) and add GA4 + GSC verification so you can measure post-launch SEO.

---

## Methodology & limitations
- Crawled the local production build; HTML saved in `seo-audit-results/pages/`.
- **No field data**: CrUX, GSC indexation, GA4 traffic, and backlink data are unavailable for a non-public localhost build.
- **No Lighthouse/Playwright**: performance is a lab/architectural estimate; visual screenshots were not captured (neither tool installed). Re-run both against a public staging URL after deploy.
- Local-only specialists skipped (no local-business, e-commerce-marketplace, or maps relevance for a B2B SaaS).

See `ACTION-PLAN.md` for prioritized, copy-paste-ready fixes.
