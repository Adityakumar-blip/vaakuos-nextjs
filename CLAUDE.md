# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VaakuOS is a Next.js 14 landing page/marketing site migrated from Vite/React for improved SEO through Server-Side Rendering (SSR). The platform is an omnichannel communication solution for e-commerce that tracks customer intent and re-engages shoppers across channels.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### App Router (src/app)
Next.js 14 App Router with file-based routing. Each page is a Server Component by default.

- Pages return `<Metadata>` for SEO via `generateMetadata()`
- JSON-LD structured data embedded in pages for search engines
- Route groups via folder naming (e.g., `app/(marketing)/page.tsx`)

### Client vs Server Components
Mark components with `"use client"` directive when they need:
- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs
- Event handlers
- TanStack Query hooks

**Client components in this codebase:**
- `Navigation` - uses `useRouter`, `useState`
- `Providers` - wraps React Query and BookDemo context
- `Footer` - uses `Link` for prefetching
- Most UI components - shadcn/ui are client-ready

### Component Structure

```
src/
├── app/                    # Pages (Server Components)
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── [route]/page.tsx   # Dynamic routes
├── components/
│   ├── ui/               # shadcn/ui components (Radix-based)
│   ├── navigation.tsx     # Header (client)
│   ├── footer.tsx         # Footer (client)
│   └── [feature]/*.tsx    # Feature-specific components
├── contexts/              # React contexts
│   └── book-demo-context.tsx  # Book demo dialog state
├── services/              # API service layer
│   ├── blog-service.ts
│   └── pricing-service.ts
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (api-client, utils)
└── types/                 # TypeScript types
```

### Context Providers
`src/components/providers.tsx` wraps the app with:
1. `QueryClientProvider` - TanStack Query for data fetching
2. `BookDemoProvider` - Controls the book demo dialog modal

Access via `useBookDemo()` hook in client components.

### SEO Patterns
Each page exports `metadata` object with title, description, alternates:
```tsx
export const metadata: Metadata = {
  title: "Page Title",
  description: "Description for search engines",
  alternates: { canonical: "/current-page" },
};
```

JSON-LD schemas use `dangerouslySetInnerHTML` with `<script type="application/ld+json">`.

### API Layer
- `src/lib/api-client.ts` - Axios instance configured for backend
- `src/services/*.ts` - Typed service functions (blog, pricing)
- `src/hooks/use-*.ts` - TanStack Query hooks for components
- API routes live in separate backend repo; this is a frontend-only app

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Data Fetching**: TanStack React Query v5
- **Database/Auth**: Supabase (@supabase/supabase-js)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://vaakuos.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional:
```
NEXT_PUBLIC_API_URL=https://api.vaakuos.com  # Defaults to api.vaakuos.com
```

## Key Patterns

### Adding a New Page
1. Create `src/app/[route]/page.tsx`
2. Export `metadata` for SEO
3. Import Server Components by default; add `"use client"` only if needed
4. Import shared components from `src/components/`

### Adding shadcn/ui Components
Components are in `src/components/ui/`. To add new ones:
```bash
npx shadcn-ui@latest add [component-name]
```

### Book Demo Dialog Flow
1. Call `openBookDemo()` from any client component via `useBookDemo()`
2. The BookDemoContext is already wired into the Providers
3. The actual dialog component handles the form submission

### Navigation Links
Hardcoded in `src/components/navigation.tsx`. When adding routes:
1. Update `navItems` array
2. Ensure page file exists at corresponding path
3. Add footer links in `src/components/footer.tsx`

## TypeScript Notes

- All components use strict TypeScript
- Types defined in `src/types/` (blog.ts, pricing.ts)
- shadcn/ui components include type-safe form integration via react-hook-form