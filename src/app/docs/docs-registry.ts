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

// Add a doc here and it appears on /docs automatically. New `category`
// values create their own section, ordered by first appearance below.
export const docs: DocEntry[] = [
  {
    href: "/docs/plugin/woocommerce",
    title: "WooCommerce plugin",
    description:
      "Install the connector, configure your API key, and stream abandoned carts, orders, and customer events for WhatsApp-first recovery.",
    category: "Plugins & connectors",
    icon: Store,
    badge: "WordPress",
    meta: "~5 min setup",
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
