import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's New in VaakuOS",
  description: "See the latest updates, new features, and improvements to VaakuOS.",
  alternates: {
    canonical: "/changelog",
  },
};

const changes = [
  {
    date: "May 15, 2026",
    type: "Feature",
    title: "Advanced A/B Testing",
    description: "New capabilities for testing message variations, timing, and personalization.",
  },
  {
    date: "May 1, 2026",
    type: "Improvement",
    title: "Dashboard Performance",
    description: "Reduced dashboard load time by 40% for accounts with large datasets.",
  },
  {
    date: "April 20, 2026",
    type: "Feature",
    title: "WhatsApp Business API v3",
    description: "Updated to support the latest WhatsApp Business API features.",
  },
  {
    date: "April 5, 2026",
    type: "Fix",
    title: "Notification Improvements",
    description: "Fixed issues with email notifications for recovered conversions.",
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          What's New
        </h1>
        <p className="text-xl text-muted-foreground mb-16">
          The latest updates, features, and improvements to VaakuOS.
        </p>

        <div className="space-y-8">
          {changes.map((change, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-32 shrink-0">
                <time className="text-sm text-muted-foreground">{change.date}</time>
              </div>
              <div className="flex-1">
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded mb-2 ${
                  change.type === "Feature" ? "bg-primary/10 text-primary" :
                  change.type === "Improvement" ? "bg-green-100 text-green-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {change.type}
                </span>
                <h3 className="text-lg font-bold mb-1">{change.title}</h3>
                <p className="text-muted-foreground">{change.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}