// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us — JustZappIt",
  description: "Get in touch with the JustZappIt team. Find our contact information, business details, and reach out with questions or feedback.",
};

export default function ContactPage() {
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@justzappit.xyz";
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+1-555-0123";
  const businessAddress = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "123 Main St, San Francisco, CA 94102, USA";

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Contact Us</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        We're here to help! Whether you have questions about JustZappIt, need to report an issue, or want to contribute to our community project, we'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-[var(--color-text-primary)]">Business Contact Information</h2>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Email</h3>
                <p className="text-[var(--color-text-secondary)]">
                  <a href={`mailto:${businessEmail}`} className="text-primary hover:underline">
                    {businessEmail}
                  </a>
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                  General inquiries, partnership opportunities, and press requests
                </p>
              </div>

              <div>
                <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Phone</h3>
                <p className="text-[var(--color-text-secondary)]">
                  <a href={`tel:${businessPhone}`} className="text-primary hover:underline">
                    {businessPhone}
                  </a>
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                  Monday - Friday, 9:00 AM - 5:00 PM PST
                </p>
              </div>

              <div>
                <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Mailing Address</h3>
                <p className="text-[var(--color-text-secondary)]">
                  {businessAddress}
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                  For official correspondence and legal matters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Reasons */}
        <div>
          <h2 className="text-[var(--color-text-primary)]">How Can We Help?</h2>
          
          <div className="space-y-6 mt-6">
            <div className="border border-[var(--color-border)] rounded-lg p-4">
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Store Listings & Verification</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Report incorrect information, suggest edits, or claim your business listing
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                <strong>Best contact:</strong> Email with "Store Listing" in subject
              </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-4">
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Technical Support</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Report bugs, request features, or get help using the platform
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                <strong>Best contact:</strong> <a href="https://github.com/0xVampirot/justZappIt/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Issues</a>
              </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-4">
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Partnerships</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Explore partnership opportunities, API access, or collaboration
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                <strong>Best contact:</strong> Email with "Partnership" in subject
              </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-4">
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Legal & Privacy</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Privacy concerns, data requests, or legal inquiries
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                <strong>Best contact:</strong> Email with "Legal" in subject
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Involvement */}
      <section className="mt-16">
        <h2 className="text-[var(--color-text-primary)]">Join Our Community</h2>
        <p className="text-[var(--color-text-secondary)] mt-4">
          JustZappIt is powered by our amazing community. Here's how you can get involved:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 text-center">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Contribute Code</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Help us improve the platform by contributing to our open-source project
            </p>
            <a
              href="https://github.com/0xVampirot/justZappIt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary hover:underline text-sm font-semibold"
            >
              View on GitHub →
            </a>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 text-center">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Add Stores</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Help grow our directory by adding and verifying crypto exchange locations
            </p>
            <Link
              href="/add"
              className="inline-block text-primary hover:underline text-sm font-semibold"
            >
              Add a Store →
            </Link>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 text-center">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Spread the Word</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Share JustZappIt with your crypto community and help others find safe exchanges
            </p>
            <Link
              href="/about"
              className="inline-block text-primary hover:underline text-sm font-semibold"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="mt-16">
        <h2 className="text-[var(--color-text-primary)]">Response Times</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Email Inquiries</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
                <li>• General questions: 24-48 hours</li>
                <li>• Technical support: 48-72 hours</li>
                <li>• Partnership inquiries: 3-5 business days</li>
                <li>• Legal matters: 5-7 business days</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Community Contributions</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
                <li>• Store submissions: Reviewed within 24 hours</li>
                <li>• Edit suggestions: Community-driven</li>
                <li>• GitHub issues: Community triage</li>
                <li>• Bug reports: Prioritized by severity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-3">Important Notice</h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
          JustZappIt is a community-driven project maintained by volunteers. While we strive to respond promptly to all inquiries, response times may vary. 
          For urgent matters related to safety or security, please contact local authorities immediately. 
          We do not provide financial, legal, or investment advice.
        </p>
      </div>
    </>
  );
}
