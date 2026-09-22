import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Headings arrive from the editor without ids, so anchor them here and collect
// the same list the contents rail renders.
function anchorHeadings(html: string) {
  const headings: { id: string; label: string }[] = [];
  const withIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs: string, inner: string) => {
    const label = inner.replace(/<[^>]+>/g, "").trim();
    if (!label) return match;
    const id = slugify(label);
    headings.push({ id, label });
    const cleaned = attrs.replace(/\sid="[^"]*"/i, "");
    return `<h2${cleaned} id="${id}">${inner}</h2>`;
  });
  return { html: withIds, headings };
}

const prose = [
  "[&>h2]:mt-12 [&>h2]:scroll-mt-28 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-[-0.02em] [&>h2]:text-ink",
  "[&>h3]:mt-8 [&>h3]:scroll-mt-28 [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-ink",
  "[&>p]:mt-4 [&>p]:text-base [&>p]:leading-8 [&>p]:text-ink/70",
  "[&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:text-base [&>ul]:leading-8 [&>ul]:text-ink/70",
  "[&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol]:text-base [&>ol]:leading-8 [&>ol]:text-ink/70",
  "[&_a]:font-semibold [&_a]:text-forest [&_a]:underline [&_a]:underline-offset-4",
  "[&_strong]:font-semibold [&_strong]:text-ink",
  "[&>table]:mt-6 [&>table]:w-full [&>table]:text-left [&_th]:border-b [&_th]:border-line [&_th]:py-2 [&_th]:font-semibold [&_td]:border-b [&_td]:border-line [&_td]:py-2 [&_td]:text-ink/70",
].join(" ");

export function LegalDocument({
  title,
  lastUpdated,
  html,
  contactEmail = "legal@vaakuos.com",
}: {
  title: string;
  lastUpdated: string;
  html: string;
  contactEmail?: string;
}) {
  const { html: content, headings } = anchorHeadings(html);

  return (
    <div className="bg-paper font-display text-ink">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-32">
        <header className="max-w-[68ch]">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl">{title}</h1>
          <p className="mt-4 text-base text-ink/65">Last updated {lastUpdated}</p>
        </header>

        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,68ch)_14rem] lg:gap-16">
          <article className={`max-w-[68ch] border-t border-line pt-10 ${prose}`} dangerouslySetInnerHTML={{ __html: content }} />

          {headings.length > 1 && (
            <aside className="mt-12 lg:mt-0">
              <nav aria-label="On this page" className="sticky top-28 border-t border-line pt-10 lg:border-t-0 lg:pt-0">
                <p className="mb-3 text-sm font-bold text-ink">On this page</p>
                <ul className="border-l border-line">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={`-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-ink/70 transition-colors hover:border-ink/30 hover:text-ink ${focusRing}`}
                      >
                        {heading.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        <p className="mt-16 max-w-[68ch] border-t border-line pt-8 text-base leading-7 text-ink/70">
          Questions about this page?{" "}
          <a
            href={`mailto:${contactEmail}`}
            className={`font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`}
          >
            {contactEmail}
          </a>{" "}
          or{" "}
          <Link
            href="/contact"
            className={`font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`}
          >
            message the team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
