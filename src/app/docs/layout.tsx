import { DocsMobileNav, DocsSidebar } from "./docs-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper font-display text-ink">
      <div className="mx-auto max-w-[88rem] px-4 pb-24 pt-28 md:pt-32">
        <DocsMobileNav />
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <DocsSidebar />
          </aside>
          <div className="min-w-0 pt-8 lg:pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
