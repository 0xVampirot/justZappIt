// SPDX-License-Identifier: AGPL-3.0-only
import Link from "next/link";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Store Verification — JustZappIt",
  description: "Learn how JustZappIt's community verification system works, how to verify stores, and our anti-spam measures.",
};

export default function VerificationPage() {
  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Store Verification Process</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 28, 2026</p>

      <p>
        JustZappIt uses a community-driven verification system to ensure the accuracy and reliability of store listings. Learn how our verification process works and how you can contribute to maintaining a trustworthy directory.
      </p>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">How Verification Works</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Community-Based Verification</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Our verification system relies on community members like you to confirm the existence and legitimacy of physical cryptocurrency exchanges. Here's how it works:
          </p>
          
          <ol className="space-y-3 text-[var(--color-text-secondary)]">
            <li><strong>Store Submission:</strong> Anyone can submit a new store listing with basic information</li>
            <li><strong>Community Confirmation:</strong> Users who have personally visited the store can confirm its existence</li>
            <li><strong>Verification Threshold:</strong> Stores need 3 confirmations to reach "Community Verified" status</li>
            <li><strong>Flagging System:</strong> Users can flag stores that are closed, incorrect, or don't accept crypto</li>
            <li><strong>Automatic Status Updates:</strong> Store status changes based on community feedback</li>
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Verification Badges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Unverified</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              New store submissions with no community confirmations. Exercise caution when visiting unverified stores.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="w-12 h-12 bg-yellow-200 rounded-full mb-4"></div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Pending</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Stores with 1-2 community confirmations. Partially verified but not yet fully confirmed.
            </p>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="w-12 h-12 bg-green-200 rounded-full mb-4"></div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Community Verified</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Stores with 3+ confirmations from community members. Highest level of trust in our system.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">How to Verify a Store</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Step-by-Step Verification</h3>
          
          <ol className="space-y-4 text-[var(--color-text-secondary)]">
            <li>
              <strong>Visit the Store:</strong> Physically go to the listed location during business hours
            </li>
            <li>
              <strong>Confirm Services:</strong> Verify that the store actually accepts cryptocurrency for goods or services
            </li>
            <li>
              <strong>Check Details:</strong> Confirm that the address, phone number, and operating hours are accurate
            </li>
            <li>
              <strong>Use the Confirm Button:</strong> On the store's page, click the "Confirm" button to submit your verification
            </li>
            <li>
              <strong>Be Honest:</strong> Only confirm stores you've personally verified. False confirmations harm the community.
            </li>
          </ol>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Important:</strong> Only confirm stores you have personally visited and verified. Multiple false confirmations from the same IP address will be automatically flagged and may result in temporary restrictions.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Flagging System</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">When to Flag a Store</h3>
          
          <p className="text-[var(--color-text-secondary)] mb-4">
            Help maintain accuracy by flagging stores that have issues:
          </p>
          
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li>• Store is permanently closed</li>
            <li>• Store no longer accepts cryptocurrency</li>
            <li>• Listed address or contact information is incorrect</li>
            <li>• Store is engaged in fraudulent or suspicious activities</li>
            <li>• Store listing is fake or malicious</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Flag Thresholds</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
              <li><strong>3 Flags:</strong> Store marked as "Flagged" - warning to users</li>
              <li><strong>5 Flags:</strong> Store marked as "Closed" - hidden from main listings</li>
              <li><strong>7+ Flags:</strong> Store removed from directory entirely</li>
            </ul>
          </div>
          
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-2">Appeal Process</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Store operators can appeal flagging decisions by providing evidence of their continued operation and crypto acceptance. Contact us for more information about the appeal process.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Anti-Spam Measures</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Protecting Data Quality</h3>
          
          <p className="text-[var(--color-text-secondary)] mb-4">
            We implement several measures to prevent spam and maintain data quality:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[var(--color-text-primary)] font-medium mb-3">Technical Measures</h4>
              <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
                <li>• IP-based rate limiting</li>
                <li>• Cryptographic IP hashing (no raw IPs stored)</li>
                <li>• hCaptcha integration for bot prevention</li>
                <li>• Pattern detection for suspicious submissions</li>
                <li>• Automatic duplicate detection</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[var(--color-text-primary)] font-medium mb-3">Community Measures</h4>
              <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
                <li>• Community voting and flagging</li>
                <li>• User reputation system</li>
                <li>• Manual review of suspicious activity</li>
                <li>• Transparency reports</li>
                <li>• Community guidelines enforcement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Store Operator Verification</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">For Store Owners</h3>
          
          <p className="text-[var(--color-text-secondary)] mb-4">
            If you operate a physical cryptocurrency exchange, you can claim your listing and provide verified information:
          </p>
          
          <ol className="space-y-3 text-[var(--color-text-secondary)]">
            <li><strong>Claim Your Listing:</strong> Contact us to claim ownership of your store listing</li>
            <li><strong>Provide Documentation:</strong> Submit business registration and proof of crypto acceptance</li>
            <li><strong>Verified Badge:</strong> Receive a "Operator Verified" badge on your listing</li>
            <li><strong>Update Information:</strong> Keep your hours, contact info, and accepted cryptocurrencies current</li>
            <li><strong>Respond to Feedback:</strong> Address community concerns and flagging issues</li>
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Transparency Report</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4">Community Statistics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-[var(--color-text-secondary)] text-sm">Total Stores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-[var(--color-text-secondary)] text-sm">Verified</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">234</div>
              <div className="text-[var(--color-text-secondary)] text-sm">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">121</div>
              <div className="text-[var(--color-text-secondary)] text-sm">Flagged</div>
            </div>
          </div>
          
          <p className="text-[var(--color-text-secondary)] text-sm mt-6">
            Statistics updated monthly. Last update: February 28, 2026
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[var(--color-text-primary)]">Get Involved</h2>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 mt-6">
          <p className="text-[var(--color-text-secondary)] mb-4">
            Help us build the most trusted directory of physical cryptocurrency exchanges:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/add"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Add Store</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Submit new locations</div>
            </Link>
            
            <Link
              href="/faq"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Learn More</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Read our FAQ</div>
            </Link>
            
            <Link
              href="/contact"
              className="block text-center p-4 border border-[var(--color-border)] rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-[var(--color-text-primary)] font-semibold">Contact Us</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-1">Report issues</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
