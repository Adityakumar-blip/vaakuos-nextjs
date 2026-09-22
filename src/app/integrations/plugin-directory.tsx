import Link from "next/link";
import type { Integration } from "./integration-data";
import { PluginLogo } from "./plugin-logo";

type Group = { title: string; categories: string[] };

// order integrations are grouped in on the directory page
const groups: Group[] = [
  { title: "Commerce platforms", categories: ["Commerce"] },
  { title: "CRM and marketing", categories: ["CRM", "Marketing"] },
  { title: "Automation, ops and data", categories: ["Automation", "Ops", "Data", "Sites"] },
];

const statusTone: Record<Integration["status"], string> = {
  Live: "text-forest",
  Beta: "text-ink/70",
  "Coming soon": "text-ink/65",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function PluginDirectory({ integrations }: { integrations: Integration[] }) {
  return (
    <div>
      <nav aria-label="Jump to a group" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-8">
        {groups.map((group) => (
          <a
            key={group.title}
            href={`#${slugify(group.title)}`}
            className={`text-sm font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`}
          >
            {group.title}
          </a>
        ))}
      </nav>

      {groups.map((group) => {
        const items = integrations.filter((integration) => group.categories.includes(integration.category));
        if (items.length === 0) return null;

        return (
          <div key={group.title} id={slugify(group.title)} className="scroll-mt-28 border-b border-line py-12 last:border-b-0">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">{group.title}</h2>
            <ul className="mt-6">
              {items.map((integration) => (
                <li key={integration.slug} className="border-t border-line py-6 first:border-t-0">
                  <Link
                    href={`/integrations/${integration.slug}`}
                    className={`group grid gap-4 rounded-lg md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 ${focusRing}`}
                  >
                    <PluginLogo logo={integration.logo} name={integration.name} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink group-hover:underline">
                          {integration.name}
                        </h3>
                        <span className="text-sm text-ink/65">{integration.flow}</span>
                      </div>
                      <p className="mt-2 max-w-prose text-base leading-7 text-ink/70">{integration.description}</p>
                    </div>
                    <span className={`text-sm font-semibold ${statusTone[integration.status]} md:justify-self-end`}>
                      {integration.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
