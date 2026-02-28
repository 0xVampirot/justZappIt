// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sitemap — JustZappIt",
  description: "Complete sitemap of JustZappIt website including all pages, store listings, and resources.",
};

export default function SitemapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-[var(--color-text-primary)]">Sitemap</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p className="text-[var(--color-text-secondary)]">
        Complete overview of all pages and content available on JustZappIt. Find everything from our main features to educational resources and legal information.
      </p>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Main Navigation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Core Features</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><Link href="/" className="hover:text-primary transition-colors">Home - Interactive Map</Link></li>
              <li><Link href="/add" className="hover:text-primary transition-colors">Add Store</Link></li>
              <li><Link href="/verification" className="hover:text-primary transition-colors">Store Verification</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </section>


      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Legal & Policy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Legal Pages</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/content-policy" className="hover:text-primary transition-colors">Community Content Policy</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Store Pages</h2>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Individual store pages are dynamically generated based on verified listings in our database.
        </p>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Store pages follow the URL pattern:
          </p>
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><code className="bg-[var(--color-border)] px-2 py-1 rounded text-sm">/store/[id]</code> - Individual Store Pages</li>
          </ul>
          <p className="text-[var(--color-text-secondary)] text-sm mt-4">
            Each store page includes: location details, contact information, community verification status, user reviews, and safety tips.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">API Endpoints</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Internal API endpoints used by the application:
          </p>
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><code className="bg-[var(--color-border)] px-2 py-1 rounded text-sm">/api/stores</code> - Stores API</li>
            <li><code className="bg-[var(--color-border)] px-2 py-1 rounded text-sm">/api/geocode</code> - Geocoding API</li>
            <li><code className="bg-[var(--color-border)] px-2 py-1 rounded text-sm">/api/submissions</code> - Submissions API</li>
            <li><code className="bg-[var(--color-border)] px-2 py-1 rounded text-sm">/api/votes</code> - Votes API</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">External Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Project Resources</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="https://github.com/0xVampirot/justZappIt" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub Repository</a></li>
              <li><a href="https://github.com/0xVampirot/justZappIt/issues" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Issue Tracker</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">XML Sitemap</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            For search engines, we maintain an XML sitemap at:
          </p>
          
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">/sitemap.xml - Main sitemap</Link></li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Help & Support</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Can&apos;t find what you&apos;re looking for? Here&apos;s how to get help:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/faq"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">FAQ</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Find answers</div>
            </Link>
            
            <Link
              href="/contact"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Contact Us</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Get help</div>
            </Link>
            
            <a
              href="https://github.com/0xVampirot/justZappIt/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Report Issue</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">GitHub</div>
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-3">Sitemap Updates</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            This sitemap is updated regularly as we add new content. Last updated: February 28, 2026. For the most current site structure, check back periodically or use our search functionality.
          </p>
        </div>
      </section>
    </div>
  );
}
