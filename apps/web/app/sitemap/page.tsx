// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sitemap — JustZappIt",
  description: "Complete sitemap of JustZappIt website including all pages, blog articles, country guides, and resources.",
};

export default function SitemapPage() {
  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Sitemap</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        Complete overview of all pages and content available on JustZappIt. Find everything from our main features to educational resources and legal information.
      </p>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Main Navigation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Core Features</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/" className="hover:text-primary transition-colors">Home - Interactive Map</a></li>
              <li><a href="/add" className="hover:text-primary transition-colors">Add Store</a></li>
              <li><a href="/verification" className="hover:text-primary transition-colors">Store Verification</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Education</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/guides" className="hover:text-primary transition-colors">Country Guides</a></li>
              <li><a href="/verification" className="hover:text-primary transition-colors">Safety Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="/newsletter" className="hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Blog Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Safety & Security</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/blog/how-to-safely-buy-bitcoin-with-cash" className="hover:text-primary transition-colors">How to Safely Buy Bitcoin with Cash</a></li>
              <li><a href="/blog/understanding-crypto-exchange-scams" className="hover:text-primary transition-colors">Understanding Crypto Exchange Scams</a></li>
              <li><a href="/blog/best-practices-in-person-crypto-trading" className="hover:text-primary transition-colors">Best Practices for In-Person Crypto Trading</a></li>
              <li><a href="/blog/how-to-verify-physical-crypto-store" className="hover:text-primary transition-colors">How to Verify a Physical Crypto Store</a></li>
              <li><a href="/blog/crypto-security-protecting-funds" className="hover:text-primary transition-colors">Crypto Security: Protecting Your Funds</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Trading & Regulations</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/blog/physical-vs-online-crypto-exchanges" className="hover:text-primary transition-colors">Physical vs Online Crypto Exchanges</a></li>
              <li><a href="/blog/crypto-regulations-by-country" className="hover:text-primary transition-colors">Crypto Regulations by Country</a></li>
              <li><a href="/blog/tax-implications-physical-crypto-trading" className="hover:text-primary transition-colors">Tax Implications of Physical Crypto Trading</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/blog/community-guidelines" className="hover:text-primary transition-colors">Community Guidelines</a></li>
              <li><a href="/blog/contributing-to-justzappit" className="hover:text-primary transition-colors">Contributing to JustZappIt</a></li>
              <li><a href="/blog/transparency-report" className="hover:text-primary transition-colors">Transparency Report</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Country Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Americas</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/guides/us" className="hover:text-primary transition-colors">United States</a></li>
              <li><a href="/guides/ca" className="hover:text-primary transition-colors">Canada</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Europe</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/guides/gb" className="hover:text-primary transition-colors">United Kingdom</a></li>
              <li><a href="/guides/eu" className="hover:text-primary transition-colors">European Union</a></li>
              <li><a href="/guides/ch" className="hover:text-primary transition-colors">Switzerland</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Asia Pacific</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/guides/jp" className="hover:text-primary transition-colors">Japan</a></li>
              <li><a href="/guides/sg" className="hover:text-primary transition-colors">Singapore</a></li>
              <li><a href="/guides/au" className="hover:text-primary transition-colors">Australia</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Coming Soon</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>Germany</li>
              <li>France</li>
              <li>South Korea</li>
              <li>Brazil</li>
              <li>India</li>
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
              <li><a href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/legal/content-policy" className="hover:text-primary transition-colors">Community Content Policy</a></li>
              <li><a href="/legal/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Compliance</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/legal/gdpr" className="hover:text-primary transition-colors">GDPR Compliance</a></li>
              <li><a href="/legal/cookies" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="/legal/ads" className="hover:text-primary transition-colors">Advertising Policy</a></li>
              <li><a href="/legal/accessibility" className="hover:text-primary transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Store Pages</h2>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Individual store pages are dynamically generated. Examples:
        </p>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><a href="/store/1" className="hover:text-primary transition-colors">/store/[id] - Individual Store Pages</a></li>
            <li><a href="/store/123" className="hover:text-primary transition-colors">Example: Bitcoin Store NYC</a></li>
            <li><a href="/store/456" className="hover:text-primary transition-colors">Example: Crypto Exchange London</a></li>
          </ul>
          <p className="text-[var(--color-text-secondary)] text-sm mt-4">
            Each store page includes: location details, contact information, community verification status, user reviews, and safety tips.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Technical Pages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">System Pages</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/not-found" className="hover:text-primary transition-colors">404 - Page Not Found</a></li>
              <li><a href="/error" className="hover:text-primary transition-colors">500 - Server Error</a></li>
              <li><a href="/maintenance" className="hover:text-primary transition-colors">Maintenance Mode</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">API & Development</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="/api/stores" className="hover:text-primary transition-colors">Stores API</a></li>
              <li><a href="/api/geocode" className="hover:text-primary transition-colors">Geocoding API</a></li>
              <li><a href="/api/submissions" className="hover:text-primary transition-colors">Submissions API</a></li>
              <li><a href="/api/votes" className="hover:text-primary transition-colors">Votes API</a></li>
            </ul>
          </div>
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
              <li><a href="https://github.com/0xVampirot/justZappIt/wiki" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Documentation Wiki</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li><a href="https://discord.gg/justzappit" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord Community</a></li>
              <li><a href="https://reddit.com/r/justzappit" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Reddit Community</a></li>
              <li><a href="https://twitter.com/justzappit" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter Updates</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">XML Sitemaps</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            For search engines, we maintain XML sitemaps at these locations:
          </p>
          
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><a href="/sitemap.xml" className="hover:text-primary transition-colors">/sitemap.xml - Main sitemap</a></li>
            <li><a href="/sitemap-blog.xml" className="hover:text-primary transition-colors">/sitemap-blog.xml - Blog articles</a></li>
            <li><a href="/sitemap-stores.xml" className="hover:text-primary transition-colors">/sitemap-stores.xml - Store pages</a></li>
            <li><a href="/sitemap-guides.xml" className="hover:text-primary transition-colors">/sitemap-guides.xml - Country guides</a></li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Help & Support</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Can't find what you're looking for? Here's how to get help:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/faq"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">FAQ</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Find answers</div>
            </a>
            
            <a
              href="/contact"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Contact Us</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Get help</div>
            </a>
            
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
    </>
  );
}
