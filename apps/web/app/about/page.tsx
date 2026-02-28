// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — JustZappIt",
  description: "Learn about JustZappIt's mission to create a comprehensive, community-driven directory of physical cryptocurrency exchanges worldwide.",
};

export default function AboutPage() {
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@justzappit.xyz";
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+1-555-0123";
  const businessAddress = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "123 Main St, San Francisco, CA 94102, USA";

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">About JustZappIt</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <h2 className="text-[var(--color-text-primary)] mt-8">Our Mission</h2>
      <p>
        JustZappIt is a community-driven, open-source project dedicated to creating the most comprehensive and reliable directory of physical cryptocurrency exchanges worldwide. We believe in the fundamental right to access cryptocurrency services safely and transparently, whether online or in person.
      </p>
      <p>
        In an era where digital assets are becoming increasingly mainstream, finding trustworthy physical locations to trade cryptocurrency remains challenging. JustZappIt solves this problem by crowdsourcing and verifying real-world crypto exchange locations, making it easier for people to buy, sell, and trade cryptocurrencies with confidence.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">What We Do</h2>
      <p>
        JustZappIt provides a free, open platform where:
      </p>
      <ul>
        <li><strong>Community members</strong> can submit and verify physical crypto exchange locations</li>
        <li><strong>Store operators</strong> can claim their listings and provide accurate information</li>
        <li><strong>Users</strong> can find trusted locations to trade cryptocurrency near them</li>
        <li><strong>Everyone</strong> contributes to building a more transparent crypto ecosystem</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">Our Values</h2>
      
      <h3 className="text-[var(--color-text-primary)] mt-6">Transparency</h3>
      <p>
        We believe in complete transparency. All our code is open-source, our data is community-verified, and our processes are publicly documented. Anyone can audit our systems, contribute to our development, or fork the project to create their own version.
      </p>

      <h3 className="text-[var(--color-text-primary)] mt-6">Privacy First</h3>
      <p>
        We collect minimal information and never store personal data. Our anti-spam system uses cryptographic hashing to protect user privacy while maintaining platform integrity. We don&apos;t track users across the web or sell personal information.
      </p>

      <h3 className="text-[var(--color-text-primary)] mt-6">Community Driven</h3>
      <p>
        JustZappIt exists because of its community. Every store listing, verification, and improvement comes from people like you who believe in creating a more accessible crypto ecosystem. We empower our community to self-govern through transparent voting and moderation systems.
      </p>

      <h3 className="text-[var(--color-text-primary)] mt-6">Educational Focus</h3>
      <p>
        Beyond providing a directory, we&apos;re committed to educating the public about cryptocurrency safety, best practices, and regulatory compliance. Our blog and guides help users make informed decisions about their crypto transactions.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">Our Technology</h2>
      <p>
        JustZappIt is built with modern, privacy-respecting technology:
      </p>
      <ul>
        <li><strong>Next.js 14</strong> for fast, secure web performance</li>
        <li><strong>Supabase</strong> for our database and real-time updates</li>
        <li><strong>OpenStreetMap</strong> for privacy-respecting mapping without tracking</li>
        <li><strong>hCaptcha</strong> for privacy-first bot protection</li>
        <li><strong>Open Source</strong> - everything is transparent and auditable</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">Community Guidelines</h2>
      <p>
        To maintain trust and quality, we ask all community members to:
      </p>
      <ul>
        <li>Submit accurate, truthful information about crypto exchanges</li>
        <li>Verify stores you&apos;ve personally visited or confirmed</li>
        <li>Flag incorrect or outdated information responsibly</li>
        <li>Respect other community members and maintain civil discourse</li>
        <li>Follow our <a href="/legal/content-policy" className="text-primary hover:underline">Community Content Policy</a></li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">Transparency Report</h2>
      <p>
        As part of our commitment to transparency, we regularly publish statistics about our platform:
      </p>
      <ul>
        <li><strong>Store Listings:</strong> All verified and unverified store locations</li>
        <li><strong>Community Actions:</strong> Number of confirmations, flags, and edits</li>
        <li><strong>Moderation Actions:</strong> Content removed for policy violations</li>
        <li><strong>Geographic Coverage:</strong> Countries and cities represented</li>
      </ul>
      <p>
        These statistics are updated monthly and available in our public repository.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">Contact Information</h2>
      <p>
        JustZappIt is maintained by a dedicated team of contributors and community volunteers. We&apos;re here to help and welcome your feedback.
      </p>
      
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
        <h3 className="text-[var(--color-text-primary)] mb-4">Business Contact</h3>
        <ul className="space-y-2">
          <li><strong>Email:</strong> <a href={`mailto:${businessEmail}`} className="text-primary hover:underline">{businessEmail}</a></li>
          <li><strong>Phone:</strong> <a href={`tel:${businessPhone}`} className="text-primary hover:underline">{businessPhone}</a></li>
          <li><strong>Address:</strong> {businessAddress}</li>
          <li><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM PST</li>
        </ul>
      </div>

      <h3 className="text-[var(--color-text-primary)] mt-6">Get Involved</h3>
      <p>
        There are many ways to contribute to JustZappIt:
      </p>
      <ul>
        <li><strong>Add Stores:</strong> Help us build the directory by submitting crypto exchange locations</li>
        <li><strong>Verify Listings:</strong> Confirm stores you&apos;ve visited to help others</li>
        <li><strong>Report Issues:</strong> Flag incorrect or outdated information</li>
        <li><strong>Contribute Code:</strong> We&apos;re open source - check out our <a href="https://github.com/0xVampirot/justZappIt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a></li>
        <li><strong>Spread the Word:</strong> Share JustZappIt with your crypto community</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">License</h2>
      <p>
        JustZappIt is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GNU Affero General Public License v3.0</a>. This means you&apos;re free to use, modify, and distribute the software, as long as you share your modifications under the same license.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">Thank You</h2>
      <p>
        Thank you for being part of the JustZappIt community. Together, we&apos;re building a more accessible, transparent, and trustworthy cryptocurrency ecosystem for everyone.
      </p>
    </>
  );
}
