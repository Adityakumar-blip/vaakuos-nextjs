import type { Metadata } from "next";
import Link from "next/link";
import { blogService } from "@/services/blog-service";

export const metadata: Metadata = {
  title: "Blog: Conversion and Recovery Insights",
  description:
    "Read VaakuOS insights, case studies, and playbooks on recovering abandoned sales and scaling e-commerce revenue.",
  alternates: {
    canonical: "/blog",
  },
};

async function getBlogPosts() {
  try {
    return await blogService.getAllPublished();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Grow <span className="text-primary">Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            No-nonsense guides on recovering abandoned sales and scaling your e-commerce brand.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts[0] && (
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="block mb-12 group"
          >
            <div className="aspect-auto md:aspect-[21/9] min-h-[350px] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-border flex items-center justify-center p-8 md:p-12">
              <div className="max-w-xl text-center">
                <span className="inline-block mb-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 line-clamp-2 md:line-clamp-3">
                  {blogPosts[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all text-sm md:text-base">
                  Read the Article →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="p-6 md:p-8 border border-border bg-card hover:shadow-xl transition-all rounded-2xl h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded">
                    {post.category?.name || "General"}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium">{post.author?.name || "VaakuOS Team"}</span>
                  <span className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 bg-primary py-20 md:py-24 rounded-[3rem] text-primary-foreground text-center px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get conversion insights in your inbox.</h2>
            <p className="opacity-80 mb-8 text-lg">
              Join 10,000+ marketers who receive our weekly breakdown of what&apos;s
              working in e-commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
