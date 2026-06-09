/** Estimate reading time in minutes from an HTML string (~225 wpm). */
export function readingTimeMinutes(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}
