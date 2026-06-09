import { Fraunces } from "next/font/google";

/**
 * Fraunces — a soft, characterful "old-style" display serif with optical sizing.
 * Used only on the auth pages to give headings a warm, editorial, premium voice
 * that pairs with the cream + forest-green brand canvas. Body text stays Inter.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});
