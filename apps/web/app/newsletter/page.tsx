// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Newsletter — JustZappIt",
  description: "Subscribe to the JustZappIt newsletter for the latest cryptocurrency safety tips, regulatory updates, and educational content.",
};

export default function NewsletterPage() {
  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Newsletter Subscription</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        Stay informed about the latest cryptocurrency safety tips, regulatory updates, and educational content from JustZappIt. Our newsletter delivers valuable insights directly to your inbox.
      </p>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">What You'll Receive</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">🔒 Safety Tips</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Regular updates on cryptocurrency security best practices, scam prevention, and safe trading strategies.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">📋 Regulatory Updates</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Latest developments in cryptocurrency regulations across different countries and jurisdictions.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">📚 Educational Content</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              In-depth articles about cryptocurrency trading, technology, and market analysis.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">🌍 Community Updates</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              News about JustZappIt platform updates, new features, and community achievements.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Subscription Options</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Weekly Digest</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Weekly summary of important updates and featured content.
              </p>
              <div className="text-[var(--color-text-secondary)] text-xs">
                Every Monday • 5-7 articles
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Monthly Newsletter</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Comprehensive monthly overview with in-depth analysis and insights.
              </p>
              <div className="text-[var(--color-text-secondary)] text-xs">
                First Friday • 15-20 articles
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Critical Alerts</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                Immediate notifications about security threats and major regulatory changes.
              </p>
              <div className="text-[var(--color-text-secondary)] text-xs">
                As needed • Urgent updates only
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Subscribe Now</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-8 mt-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[var(--color-text-primary)] font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-[var(--color-text-primary)] font-medium mb-2">
                Subscription Frequency
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="frequency" value="weekly" className="mr-3" defaultChecked />
                  <span className="text-[var(--color-text-secondary)]">Weekly Digest</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="frequency" value="monthly" className="mr-3" />
                  <span className="text-[var(--color-text-secondary)]">Monthly Newsletter</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="frequency" value="alerts" className="mr-3" />
                  <span className="text-[var(--color-text-secondary)]">Critical Alerts Only</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-[var(--color-text-primary)] font-medium mb-2">
                Topics of Interest
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="safety" className="mr-2" defaultChecked />
                  <span className="text-[var(--color-text-secondary)] text-sm">Safety & Security</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="regulations" className="mr-2" defaultChecked />
                  <span className="text-[var(--color-text-secondary)] text-sm">Regulations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="trading" className="mr-2" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Trading Tips</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="technology" className="mr-2" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Technology</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="community" className="mr-2" defaultChecked />
                  <span className="text-[var(--color-text-secondary)] text-sm">Community Updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="topics" value="research" className="mr-2" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Market Research</span>
                </label>
              </div>
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" id="consent" name="consent" required className="mt-1 mr-3" />
              <label htmlFor="consent" className="text-[var(--color-text-secondary)] text-sm">
                I agree to receive email communications from JustZappIt and understand that I can unsubscribe at any time. We respect your privacy and will never share your email address with third parties.
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Privacy & Unsubscribe</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Our Privacy Promise</h3>
          <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
            <li>• We never sell or share your email address with third parties</li>
            <li>• You can unsubscribe at any time with one click</li>
            <li>• We use industry-standard email security practices</li>
            <li>• Your data is protected by GDPR and privacy regulations</li>
            <li>• We only send content you've subscribed to</li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <h4 className="text-[var(--color-text-primary)] font-medium mb-3">Unsubscribe Options</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Every email includes an unsubscribe link. You can also manage your subscription preferences or unsubscribe by:
            </p>
            <ul className="space-y-1 text-[var(--color-text-secondary)] text-sm">
              <li>• Clicking "Unsubscribe" in any email</li>
              <li>• Contacting us at hello@justzappit.xyz</li>
              <li>• Updating your preferences on this page</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mt-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">How often will I receive emails?</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Depending on your subscription choice: weekly (every Monday), monthly (first Friday), or only for critical alerts.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Can I change my subscription preferences?</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Yes! You can update your frequency and topic preferences at any time using the link in our emails or by contacting us.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Is my email address secure?</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Absolutely. We use industry-standard security measures and never share your email with third parties. Your data is protected by privacy regulations.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">What if I want to stop receiving emails?</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Every email includes an unsubscribe link. You can also contact us directly at hello@justzappit.xyz to be removed from our mailing list.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Join Our Community</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-6">
            Beyond our newsletter, there are many ways to stay connected with the JustZappIt community:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://github.com/0xVampirot/justZappIt"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">GitHub</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Contribute to development</div>
            </a>
            
            <a
              href="/blog"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Blog</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Read our articles</div>
            </a>
            
            <a
              href="/faq"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">FAQ</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Get answers</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
