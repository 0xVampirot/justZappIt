// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Country Guides — JustZappIt",
  description: "Comprehensive guides to cryptocurrency regulations and compliance requirements by country. Stay informed about local laws and best practices.",
};

const countryGuides = [
  {
    country: "United States",
    countryCode: "us",
    description: "State-by-state crypto regulations and federal compliance requirements",
    lastUpdated: "2026-02-25",
    regulations: ["Federal", "State-level", "Tax reporting", "AML requirements"],
    status: "comprehensive"
  },
  {
    country: "United Kingdom", 
    countryCode: "gb",
    description: "FCA guidelines and UK crypto trading regulations",
    lastUpdated: "2026-02-24",
    regulations: ["FCA registration", "Tax obligations", "Consumer protection"],
    status: "comprehensive"
  },
  {
    country: "European Union",
    countryCode: "eu", 
    description: "MiCA regulation overview and EU-wide crypto compliance",
    lastUpdated: "2026-02-23",
    regulations: ["MiCA framework", "GDPR compliance", "Cross-border rules"],
    status: "comprehensive"
  },
  {
    country: "Australia",
    countryCode: "au",
    description: "AUSTRAC requirements and Australian crypto regulations",
    lastUpdated: "2026-02-22", 
    regulations: ["AUSTRAC registration", "Tax treatment", "Consumer laws"],
    status: "comprehensive"
  },
  {
    country: "Canada",
    countryCode: "ca",
    description: "FINTRAC compliance and Canadian cryptocurrency regulations",
    lastUpdated: "2026-02-21",
    regulations: ["FINTRAC registration", "Tax reporting", "Provincial rules"],
    status: "comprehensive"
  },
  {
    country: "Japan",
    countryCode: "jp",
    description: "FSA regulations and Japanese crypto exchange requirements",
    lastUpdated: "2026-02-20",
    regulations: ["FSA registration", "Tax rules", "Consumer protection"],
    status: "basic"
  },
  {
    country: "Singapore",
    countryCode: "sg",
    description: "MAS guidelines and Singapore crypto regulations",
    lastUpdated: "2026-02-19",
    regulations: ["MAS licensing", "Tax treatment", "Investor protection"],
    status: "basic"
  },
  {
    country: "Switzerland",
    countryCode: "ch",
    description: "FINMA regulations and Swiss crypto-friendly framework",
    lastUpdated: "2026-02-18",
    regulations: ["FINMA approval", "Tax advantages", "Banking integration"],
    status: "basic"
  }
];

export default function GuidesPage() {
  const comprehensiveGuides = countryGuides.filter(guide => guide.status === "comprehensive");
  const basicGuides = countryGuides.filter(guide => guide.status === "basic");

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Country Guides</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        Navigate the complex world of cryptocurrency regulations with our comprehensive country-specific guides. Each guide covers local laws, tax requirements, compliance obligations, and best practices for physical crypto exchanges.
      </p>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Comprehensive Guides</h2>
        <p className="text-[var(--color-text-secondary)] mt-2">
          In-depth coverage of major cryptocurrency markets with detailed regulatory information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {comprehensiveGuides.map((guide) => (
            <Link
              key={guide.countryCode}
              href={`/guides/${guide.countryCode}`}
              className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[var(--color-text-primary)] font-semibold text-lg">
                  {guide.country}
                </h3>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                  Comprehensive
                </span>
              </div>
              
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                {guide.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.regulations.slice(0, 3).map((reg) => (
                  <span key={reg} className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                    {reg}
                  </span>
                ))}
                {guide.regulations.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                    +{guide.regulations.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="text-[var(--color-text-secondary)] text-xs">
                Updated: {new Date(guide.lastUpdated).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Basic Guides</h2>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Essential regulatory information for emerging crypto markets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {basicGuides.map((guide) => (
            <Link
              key={guide.countryCode}
              href={`/guides/${guide.countryCode}`}
              className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[var(--color-text-primary)] font-semibold">
                  {guide.country}
                </h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                  Basic
                </span>
              </div>
              
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                {guide.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.regulations.slice(0, 2).map((reg) => (
                  <span key={reg} className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                    {reg}
                  </span>
                ))}
                {guide.regulations.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded">
                    +{guide.regulations.length - 2}
                  </span>
                )}
              </div>
              
              <div className="text-[var(--color-text-secondary)] text-xs">
                Updated: {new Date(guide.lastUpdated).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Guide Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Regulatory Compliance</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Licensing requirements, registration processes, and regulatory oversight.
            </p>
            <ul className="text-[var(--color-text-secondary)] text-sm space-y-1">
              <li>• Exchange licensing</li>
              <li>• Registration requirements</li>
              <li>• Compliance frameworks</li>
              <li>• Regulatory bodies</li>
            </ul>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Tax & Reporting</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Tax obligations, reporting requirements, and financial compliance.
            </p>
            <ul className="text-[var(--color-text-secondary)] text-sm space-y-1">
              <li>• Capital gains tax</li>
              <li>• Reporting thresholds</li>
              <li>• Record keeping</li>
              <li>• Tax filing requirements</li>
            </ul>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-3">Consumer Protection</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              User rights, dispute resolution, and consumer safeguards.
            </p>
            <ul className="text-[var(--color-text-secondary)] text-sm space-y-1">
              <li>• Dispute resolution</li>
              <li>• Consumer rights</li>
              <li>• Insurance requirements</li>
              <li>• Complaint processes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Important Disclaimer</h2>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
            <strong>Legal Notice:</strong> These guides are for informational purposes only and do not constitute legal advice. Cryptocurrency regulations change frequently and may vary by jurisdiction within countries. Always consult with qualified legal professionals for compliance with local laws and regulations. The information provided may not reflect the most current legal requirements.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Request a Guide</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Don't see your country listed? We're constantly expanding our coverage. Let us know which country you'd like us to cover next.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Request Country Guide
            </Link>
            <Link
              href="/blog"
              className="inline-block border border-[var(--color-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-md font-semibold hover:border-primary transition-colors text-center"
            >
              Read Educational Articles
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Stay Updated</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Cryptocurrency regulations are evolving rapidly. Subscribe to our newsletter for updates on regulatory changes and new country guides.
          </p>
          
          <Link
            href="/newsletter"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Subscribe for Updates
          </Link>
        </div>
      </section>
    </>
  );
}
