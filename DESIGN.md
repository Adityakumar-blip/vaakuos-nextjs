# VaakuOS Design System

The single reference for how vaakuos.com looks, reads and behaves. The homepage (`src/app/page.tsx`) and the navbar are built to this spec; every other page should move to it (see [Migration status](#migration-status)). When this file and existing code disagree, this file wins.

## Positioning the design must carry

- VaakuOS is customer messaging across **WhatsApp, email, Instagram and Messenger**, with one record per customer. It is **not** a WhatsApp-only tool.
- It is for **any business whose customers message it**: stores, salons, restaurants, hotels, clinics, coaching institutes, real estate, lending, gyms. It is **not** e-commerce-only. Examples on a page should span several kinds of business.
- The product's core idea is the **rule**: a trigger, a message, a channel and a moment. Pages express it through the rule sentence (see Components).

## Color

Tokens live on `:root` in `src/app/globals.css` as RGB channels and are exposed in `tailwind.config.ts`, so opacity modifiers (`text-ink/70`) work.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#EEF1EC` | Page background. Cool sage white, never warm cream. |
| `ink` | `#12261F` | Text, rules, the dark band (Industries). |
| `forest` | `#2A6144` | Brand green: primary buttons, step markers, the closing band. |
| `mint` | `#A8E0BF` | Links and hover fills on dark backgrounds. |
| `mint-soft` | `#CFEADB` | Rule-sentence slots, active nav item, "One record" badge. |
| `line` | `#C9D2CB` | Hairlines and borders on paper. |
| `white` | `#FFFFFF` | Record cards and form panels (the raised surfaces). |
| `error` | `#8F2417` | Form validation only — error text, invalid borders. 7.5:1 on paper. |

**Channel colors** identify a channel and nothing else. Never use them for decoration or emphasis.

| Channel | Token | Hex | Icon (lucide) |
|---|---|---|---|
| WhatsApp | `ch-whatsapp` | `#23855A` | `MessageCircle` |
| Email | `ch-email` | `#A8661A` | `Mail` |
| Instagram | `ch-instagram` | `#B8386F` | `Instagram` |
| Messenger | `ch-messenger` | `#3563C9` | `MessagesSquare` |

The channel map lives in `src/components/home/channel.tsx`. Import from there; don't redefine colors or icons.

**Text contrast floors (WCAG AA for body text):**
- On `paper` or `white`: never lighter than `ink/65`. Use `ink/70` for secondary text.
- On `ink`: never lighter than `paper/60`. Use `paper/70` for secondary text.
- On `forest`: never lighter than `paper/80`.

**Do not use** the legacy shadcn HSL tokens (`bg-background`, `text-muted-foreground`, `text-primary`, the orange `accent`) in redesigned areas. They remain only for pages not yet migrated.

## Typography

| Role | Face | Setting |
|---|---|---|
| Display and body (redesigned pages) | **Bricolage Grotesque** (`font-display`, loaded in `src/app/layout.tsx` with the `opsz` axis) | See scale below |
| Legacy pages | Inter | Until migrated |

One family carries everything: the optical-size axis makes it expressive at display sizes and quiet at body sizes. Don't add a second typeface, a monospace face, or a serif.

**Scale** (mobile → desktop):

| Element | Classes |
|---|---|
| Rule sentence (hero) | `text-[2.1rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.12–1.18] tracking-[-0.025em]` |
| Section heading (h2) | `text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em]` |
| Closing statement | `text-4xl md:text-7xl`, same weight and tracking as h2 |
| Page intro (h1 above the rule) | `text-2xl md:text-[2rem] font-semibold leading-tight tracking-[-0.02em]` |
| Item heading (h3) | `text-2xl font-bold tracking-[-0.02em]` (FAQ triggers `text-xl`) |
| Lead paragraph | `text-lg leading-8 text-ink/70`, `max-w-md` |
| Body | `text-base leading-7 text-ink/70`, `max-w-prose` |
| Meta / small labels | `text-sm text-ink/65`, sentence case |

**Type rules**
- Sentence case everywhere: headings, buttons, labels, nav.
- No ALL-CAPS eyebrows or tracked-out labels above headings.
- Don't highlight a single word in a headline by color, italic or weight. The only in-sentence emphasis allowed is a rule-sentence **slot**, because a slot carries meaning (a setting you'd pick in the product).
- Keep line length under ~80 characters (`max-w-prose` / `max-w-md` on paragraphs).

## Layout

- Content column: `mx-auto max-w-6xl` with `px-4` gutters. The navbar uses the same column so the logo aligns with headings.
- Section spacing: `py-20 md:py-28`. Hero: `pt-28 md:pt-36`.
- Left-aligned throughout. No centered hero or centered section headers.
- **Section header pattern:** a two-column grid, `md:grid-cols-[1.2fr_1fr] md:items-end`, with the h2 on the left and a lead paragraph bottom-right (`md:justify-self-end`). Use it whenever a section has an intro sentence.
- Background rhythm: paper, paper, **ink band**, paper, paper, **forest band**. At most one ink band and one forest band per page.
- Structure encodes information: hairlines separate items in a list; numbers appear only on true sequences (setup steps); cards are reserved for things that are cards in the product (a customer record).

## Components

All components are in `src/components/`. Reuse them rather than restyling.

**`WalkthroughButton`** (`walkthrough-button.tsx`): the primary call to action.
- A 64px pill with the four channel icons stacked on its left; on hover the icons fan out.
- `tone="dark"` (forest) on paper, `tone="light"` (paper) on forest or ink.
- One per viewport. Pair it with a plain underlined text link for the secondary action ("Compare plans", "Read the setup guide").
- Compact version: the navbar uses a plain forest pill with the same label.

**`ChannelStamp`** (`home/channel.tsx`): a colored rounded square with the channel icon.
- `md` (31px) inside lists, `sm` (24px) inline.
- Always carries an `sr-only` channel name.

**Rule sentence** (`home/hero.tsx`): "When [trigger], [action] on [channel] [timing]…"
- Trigger and timing slots: `bg-mint-soft`, rounded `0.14em`, `box-decoration-break: clone`.
- Channel slots: the inline channel icon plus an underline in the channel color (`decoration-[0.08em] underline-offset-[0.16em]`, skip-ink off).
- On forest backgrounds, slots use `bg-paper/15` (see Closing).
- Examples must rotate across several kinds of business. Never show only e-commerce.

**Record card** (Convergence diagram in `home/sections.tsx`):
- The one raised surface: `bg-white rounded-3xl` with a soft ink-tinted shadow.
- Shows a customer's name, a timeline of channel stamps, tags and the next follow-up.

**Industry bento** (`home/industries.tsx`): the pattern for "what this does for business X". On the ink band, a 6-column grid of rounded tiles (`rounded-[1.75rem]`, `gap-4`):
- **Tiles:** a kind of business in `text-[1.75rem]` bold, one "Also: …" line, and a **notification**: the actual message that business's customer receives. It shows a `ChannelStamp`, the sample business name, "Channel, now" and the message.
- **Sizes and color:** the lead tile spans 4 columns and shows two notifications on different channels; the others span 2. Tile tones rotate between `forest`, `paper`, `mint-soft` and a glass `paper/[0.06]` with a `paper/15` ring. Neighbouring tiles never share a tone.
- **Last tile:** "Run something else?" in `bg-mint`, with the channel stack and an ink pill link. It fills the remaining columns so the grid never leaves a hole (check the spans at the `md` and `lg` breakpoints).
- **Data:** sample business names are fictional and the messages are illustrative. Don't list jobs as pill tags.

**Step path** (GoLive): 48px forest circles with the numeral, joined by a `line` hairline (horizontal on desktop, vertical on mobile). Only for real sequences.

**Inline links:** `font-semibold underline underline-offset-4`, with a 30–40% decoration that goes solid on hover. Use `text-forest` on paper and `text-mint` on ink.

**Docs shell** (`app/docs/layout.tsx`): documentation uses its own chrome, not the marketing column.
- Wider container (`max-w-[88rem]`) with a three-part grid: a sticky sidebar (`15rem`), the article (`max-w-[68ch]`), and a sticky "On this page" rail (`13rem`, from `xl` up).
- The sidebar lists categories from `docs-registry.ts`; the current page is marked with a forest left border and `aria-current="page"`. On mobile it collapses into a "Browse documentation" disclosure, which needs no JavaScript.
- Each guide opens with breadcrumbs, a heading, an intro, and a meta bar (setup time, coding needed, how it runs), and ends with a prev/next pager (`docs-pager.tsx`).
- Section headings carry the wording the sidebar and the page rail use — no separate eyebrow label repeating it.
- Adding an entry to `docs-registry.ts` puts a guide in the sidebar, on `/docs` and in the pager.

**Navbar** (`navigation.tsx`):
- `font-display` on `paper/90` with a blur. Full-bleed at the top; a floating pill (`rounded-full`) after scrolling 16px.
- The active route gets a `mint-soft` pill and `aria-current="page"`.
- Nav links are Integrations, Pricing, Calculator and Blog. Docs live in the footer: they matter to people already using VaakuOS, not to someone deciding.
- The mobile menu lists links in `text-3xl` bold, with full-width pill buttons at the bottom.

## Copy and calls to action

- **Primary CTA label:** "Book a walkthrough" (it goes to `/demo`). Never "Book Live Demo", "Get started" or "Learn more".
- **Secondary actions** say exactly what happens: "Compare plans", "Read the setup guide", "Browse integrations", "Tell us what you run", "Ask the team directly".
- **No arrows** appended to button or link text. One exception: an arrow that encodes direction inside a data-flow label (`Shopify → VaakuOS`, `VaakuOS ↔ Salesforce`) is information, not decoration, and is allowed.
- **Channel naming:** always list all four in this order: WhatsApp, email, Instagram and Messenger. Don't lead with WhatsApp alone in headlines or meta titles.
- **Voice:** plain verbs, "you" for the reader, short sentences (25 words max), no hype. Follow `VOICE.md`.
- **Data:** don't invent statistics, recovery rates, customers or testimonials (`BRAND.md`). Illustrative example data (customer names, amounts in ₹) is fine inside product mock-ups.

## Forms

- Every input has a real `<label>` tied to it with `htmlFor`/`id`. A placeholder is never the only label.
- Inputs: `bg-white`, `border-line`, forest focus ring, at least 44px tall.
- Errors use the `error` token, sit next to the field they belong to, and are wired up with `aria-invalid` and `aria-describedby`. They say what to fix ("Enter a valid email, like you@company.com."), never apologise and are never vague.
- The submit button names the action ("Send message", "Book my walkthrough") and keeps its size while pending, so the layout doesn't jump.
- Success is a state on the page that says what happens next, not just a toast that disappears.

## Motion

- The page has one ambient motion: the hero rule sentence rotates every 4.5s.
  - Slots fade in with a 90ms stagger (`.slot-in` in `globals.css`).
  - Rotation pauses on hover and focus, has a visible Pause/Play control, and starts paused when the visitor prefers reduced motion.
- Everything else moves only in response to the user: button hovers, accordion open, and the mobile menu (`motion-reduce:transition-none`).
- Don't add scroll-reveal or fade-up effects to sections. The legacy `ScrollReveal` component is for the pricing page only until it migrates.

## Accessibility floor

- Visible keyboard focus on every interactive element: `focus-visible:outline-2 outline-offset-2 outline-forest` (use `outline-paper` on dark bands).
- Decorative icons get `aria-hidden`; channel stamps keep a screen-reader label.
- Meet the contrast floors in the Color section.
- No horizontal scroll at 390px width. Check phone and desktop screenshots before shipping.

## Migration status

Every page is on this system as of the September 2026 redesign.

| Area | Notes |
|---|---|
| Homepage, navbar, footer | Reference implementation of the system |
| Features, pricing, integrations, request-integration | Rebuilt; features and integrations are now fully server-rendered |
| Blog (index + post) | Reading measure `max-w-[68ch]`; schema and metadata preserved |
| Docs | Rebuilt as a documentation shell: sidebar, article, page rail, pager. Removed from the navbar, kept in the footer |
| Contact, demo, register-interest, book-demo dialog | Forms restyled; field logic and submission untouched |
| About, legal pages, thin pages, 404 | Rebuilt; thin pages keep `robots: index:false` |
| Calculator | Replaced: the cart-recovery ROI calculator became a WhatsApp message cost estimator on Meta's published India rates |
| Auth (login, signup, forgot, reset) | Now use the system font and palette; the separate Fraunces serif was removed |

Tokens and the display font are loaded globally in `globals.css` and `layout.tsx`, so a new page only needs `bg-paper font-display text-ink` on its wrapper.

### Deleted along the way
`ScrollReveal`, `AnnouncementBar`, `ScrollToTop`, `SmoothScroll`, `IntegrationsSection`, `AnalyticsTest`, the seven old homepage section components, the Inter and Fraunces font loads, and the unused Lenis/reveal/hero-fade CSS. The `lenis` dependency in `package.json` is now unused and can be removed on the next dependency update.

### Checks before shipping a page
1. `npx tsc --noEmit -p .` and `npm run lint` pass.
2. `npm run build` succeeds.
3. One `<h1>`, headings nest without skipping a level.
4. No horizontal scroll at 390px wide.
5. Images have dimensions and meaningful `alt`; below-the-fold ones lazy-load.
6. `metadata`, canonical and any JSON-LD survive the redesign.
7. No invented statistics, customers or capabilities — check `FEATURES.md` before claiming a feature works.
