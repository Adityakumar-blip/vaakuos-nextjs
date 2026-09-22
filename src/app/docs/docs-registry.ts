import { Store, type LucideIcon } from "lucide-react";

export type DocEntry = {
  href: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  badge?: string;
  meta?: string;
};

// Add a doc here and it appears in the sidebar, on /docs, and in the prev/next
// pager automatically. A new `category` creates its own section, in the order
// it first appears below.
export const docs: DocEntry[] = [
  {
    href: "/docs/plugin/woocommerce",
    title: "WooCommerce plugin",
    description:
      "Install the connector, add your API key, and start sending carts, orders and customer events to VaakuOS.",
    category: "Plugins and connectors",
    icon: Store,
    badge: "WordPress",
    meta: "About 5 minutes",
  },
];

export function groupedDocs(): { category: string; entries: DocEntry[] }[] {
  const order: string[] = [];
  const byCategory = new Map<string, DocEntry[]>();
  for (const doc of docs) {
    if (!byCategory.has(doc.category)) {
      byCategory.set(doc.category, []);
      order.push(doc.category);
    }
    byCategory.get(doc.category)!.push(doc);
  }
  return order.map((category) => ({ category, entries: byCategory.get(category)! }));
}

export function docNeighbours(href: string): { previous?: DocEntry; next?: DocEntry } {
  const index = docs.findIndex((doc) => doc.href === href);
  if (index === -1) return {};
  return { previous: docs[index - 1], next: docs[index + 1] };
}
