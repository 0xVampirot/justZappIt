// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — JustZappIt",
  description: "Educational articles about cryptocurrency safety, trading tips, regulatory updates, and best practices for physical crypto exchanges.",
};

// Sample blog data - in production this would come from a CMS or database
const blogPosts = [
  {
    id: "1",
    slug: "how-to-safely-buy-bitcoin-with-cash",
    title: "How to Safely Buy Bitcoin with Cash: Complete Guide",
    excerpt: "Learn the essential safety measures and best practices for buying Bitcoin with cash in person. This comprehensive guide covers verification, meeting locations, and transaction security.",
    author: "JustZappIt Team",
    publishedAt: "2026-02-28",
    readingTime: 8,
    tags: ["safety", "bitcoin", "trading"],
    featured: true,
  },
  {
    id: "2", 
    slug: "understanding-crypto-exchange-scams",
    title: "Understanding Crypto Exchange Scams: Red Flags to Watch",
    excerpt: "Protect yourself from common cryptocurrency scams. Learn to identify warning signs and implement security measures for safe crypto transactions.",
    author: "JustZappIt Team",
    publishedAt: "2026-02-25",
    readingTime: 6,
    tags: ["scams", "security", "education"],
    featured: false,
  },
  {
    id: "3",
    slug: "physical-vs-online-crypto-exchanges",
    title: "Physical vs Online Crypto Exchanges: Pros and Cons",
    excerpt: "Compare the advantages and disadvantages of physical cryptocurrency exchanges versus online platforms. Find the best option for your trading needs.",
    author: "JustZappIt Team", 
    publishedAt: "2026-02-20",
    readingTime: 7,
    tags: ["comparison", "exchanges", "trading"],
    featured: false,
  },
  {
    id: "4",
    slug: "crypto-regulations-by-country",
    title: "Crypto Regulations by Country: What You Need to Know",
    excerpt: "Navigate the complex world of cryptocurrency regulations across different countries. Understand compliance requirements and legal frameworks.",
    author: "JustZappIt Team",
    publishedAt: "2026-02-15",
    readingTime: 10,
    tags: ["regulations", "legal", "compliance"],
    featured: true,
  },
  {
    id: "5",
    slug: "best-practices-in-person-crypto-trading",
    title: "Best Practices for In-Person Crypto Trading",
    excerpt: "Master the art of safe in-person cryptocurrency trading with these expert tips on meeting locations, verification methods, and security protocols.",
    author: "JustZappIt Team",
    publishedAt: "2026-02-10",
    readingTime: 9,
    tags: ["safety", "trading", "best-practices"],
    featured: false,
  },
  {
    id: "6",
    slug: "how-to-verify-physical-crypto-store",
    title: "How to Verify a Physical Crypto Store's Legitimacy",
    excerpt: "Learn systematic approaches to verify the legitimacy of physical cryptocurrency stores before conducting transactions.",
    author: "JustZappIt Team",
    publishedAt: "2026-02-05",
    readingTime: 8,
    tags: ["verification", "safety", "due-diligence"],
    featured: false,
  },
  {
    id: "7",
    slug: "crypto-security-protecting-funds",
    title: "Crypto Security: Protecting Your Funds During Physical Trades",
    excerpt: "Essential security measures to protect your cryptocurrency and cash during in-person trading transactions.",
    author: "JustZappIt Team",
    publishedAt: "2026-01-30",
    readingTime: 11,
    tags: ["security", "funds-protection", "trading"],
    featured: true,
  },
  {
    id: "8",
    slug: "tax-implications-physical-crypto-trading",
    title: "Tax Implications of Physical Crypto Trading",
    excerpt: "Understand the tax considerations and reporting requirements for cryptocurrency transactions conducted in person.",
    author: "JustZappIt Team",
    publishedAt: "2026-01-25",
    readingTime: 12,
    tags: ["tax", "legal", "compliance"],
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Blog</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Educational articles about cryptocurrency safety, trading tips, regulatory updates, and best practices for physical crypto exchanges.
      </p>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[var(--color-text-primary)] text-2xl mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 hover:border-primary transition-colors">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Featured</span>
                </div>
                <h3 className="text-[var(--color-text-primary)] font-semibold mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>{post.readingTime} min read</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="text-[var(--color-text-primary)] text-2xl mb-6">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <article key={post.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 hover:border-primary transition-colors">
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-3 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                <span>{post.readingTime} min read</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-8 text-center">
          <h2 className="text-[var(--color-text-primary)] text-2xl mb-4">Stay Updated</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Get the latest cryptocurrency safety tips, regulatory updates, and trading guides delivered to your inbox.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-16">
        <h2 className="text-[var(--color-text-primary)] text-2xl mb-6">Browse by Topic</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['safety', 'trading', 'regulations', 'security'].map((topic) => (
            <Link
              key={topic}
              href={`/blog?topic=${topic}`}
              className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-[var(--color-text-primary)] font-semibold capitalize">{topic}</span>
              <span className="block text-[var(--color-text-secondary)] text-sm mt-1">
                {blogPosts.filter(post => post.tags.includes(topic)).length} articles
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
