/** @type {import('next').NextConfig} */

// Baseline security headers. Applied by the Next runtime; also mirrored in
// public/_headers for Netlify's edge so they cover static assets too.
// NOTE: a Content-Security-Policy is intentionally omitted — it must be
// allowlisted per source (Meta Pixel, Fontshare, Google Fonts, Cloudinary,
// Supabase, the vaaku widget) or it will break the site. Add it deliberately.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig = {
  images: {
    // TODO: tighten to the actual image CDN host(s) (e.g. res.cloudinary.com,
    // <project>.supabase.co) once the full set of CMS image sources is
    // confirmed. Left open to avoid breaking runtime-fetched blog images.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
