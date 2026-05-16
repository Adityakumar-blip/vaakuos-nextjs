import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at VaakuOS",
  description: "Join the VaakuOS team and help shape the future of e-commerce communication.",
  alternates: {
    canonical: "/careers",
  },
};

const openings = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote (India)",
    type: "Full-time",
  },
  {
    title: "Customer Success Manager",
    department: "Operations",
    location: "Remote (India)",
    type: "Full-time",
  },
  {
    title: "Sales Development Representative",
    department: "Sales",
    location: "Remote (India)",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Join our <span className="text-primary">team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building the future of e-commerce communication. Come help us make it happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {openings.map((job) => (
            <div
              key={job.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-secondary px-2 py-1 rounded">
                  {job.department}
                </span>
                <span className="text-xs text-muted-foreground">{job.location}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{job.title}</h3>
              <span className="text-sm text-muted-foreground">{job.type}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see a fit? Send us your resume anyway.
          </p>
          <a
            href="mailto:careers@vaakuos.com"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Send Resume
          </a>
        </div>
      </div>
    </div>
  );
}