// Shared helpers for blog index + detail pages

export const COVER_PALETTES = [
  "bg-[radial-gradient(circle_at_28%_22%,hsl(var(--tertiary)/0.95),hsl(var(--primary))_78%)]",
  "bg-[radial-gradient(circle_at_72%_24%,hsl(var(--accent)/0.85),hsl(var(--primary))_80%)]",
  "bg-[radial-gradient(circle_at_24%_78%,hsl(var(--primary)),hsl(152_39%_14%)_85%)]",
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
