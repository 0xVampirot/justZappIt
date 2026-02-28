// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear();
  const businessEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@justzappit.xyz";

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">About JustZappIt</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              A community-driven, open-source directory of physical cryptocurrency exchanges worldwide. 
              Find trusted locations to safely trade crypto for cash near you.
            </p>
            <div className="mt-4">
              <Link
                href="https://github.com/0xVampirot/justZappIt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View on GitHub →
              </Link>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/verification" className="text-[var(--color-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  Safety Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Community Section */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Legal & Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/content-policy" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  Content Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <a
                  href="https://www.google.com/ads/preferences/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors"
                >
                  AdChoices
                </a>
              </li>
              <li>
                <Link href="/sitemap" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--color-text-secondary)] text-sm">
              © {currentYear} JustZappIt. Licensed under <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AGPL-3.0</a>.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a
                href={`mailto:${businessEmail}`}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Contact Us
              </a>
              <Link
                href="https://github.com/0xVampirot/justZappIt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Contribute
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Legal Notice */}
        <div className="mt-6 p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg">
          <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
            <strong>Important Notice:</strong> JustZappIt is a community-driven directory and does not endorse, verify, or guarantee the accuracy of any listed information. 
            All cryptocurrency transactions are conducted at your own risk. This site is not financial, legal, or investment advice. 
            Please conduct your own research and exercise caution when dealing with cryptocurrency exchanges.
          </p>
        </div>
      </div>
    </footer>
  );
}
