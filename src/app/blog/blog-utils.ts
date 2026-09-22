// Shared helpers for blog index + detail pages

/** Solid-tone placeholder covers for posts without a featured image (no gradients). */
export const COVER_PALETTES: { bg: string; mark: string }[] = [
  { bg: "bg-forest", mark: "text-paper/20" },
  { bg: "bg-ink", mark: "text-paper/15" },
  { bg: "bg-mint-soft", mark: "text-ink/15" },
];

export const hashSlug = (slug: string) =>
  slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
