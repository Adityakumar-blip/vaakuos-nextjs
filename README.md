# VaakuOS - Next.js Migration

A Next.js 14 migration of the VaakuOS landing page for improved SEO through Server-Side Rendering (SSR).

## Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd vaakuos-nextjs

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://vaakuos.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page
│   ├── blog/              # Blog listing & posts
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Header navigation
│   ├── footer.tsx        # Footer
│   └── book-demo-dialog.tsx
├── contexts/             # React contexts
│   └── book-demo-context.tsx
└── lib/                  # Utilities
    └── utils.ts
```

## SEO Features

This migration includes:

- **Server-Side Rendering**: All pages render with full HTML for search engines
- **Metadata API**: Unique titles, descriptions, and Open Graph tags per page
- **Structured Data**: JSON-LD schemas for Organization, WebSite, Article
- **Automatic Sitemap**: Generated at build time
- **robots.txt**: Configured for optimal crawling

## Key Changes from Vite/React

| Vite/React | Next.js |
|------------|---------|
| `react-router-dom` | App Router (file-based) |
| `react-helmet-async` | `generateMetadata()` |
| Client-side rendering | SSR + SSG |
| `useQuery` for all data | Server Components |
| SPA shell | Pre-rendered HTML |

## Deployment

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

## TODO

- [ ] Add shadcn/ui components for full feature parity
- [ ] Connect blog to Supabase/CMS
- [ ] Add authentication (login/signup pages)
- [ ] Add more sophisticated animations
- [ ] Test all forms and interactions
- [ ] Add analytics tracking
- [ ] Add sitemap.xml generation
- [ ] Set up preview deployments

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
