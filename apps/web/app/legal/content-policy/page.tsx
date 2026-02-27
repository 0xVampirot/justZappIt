// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Community Content Policy — JustZappIt",
};

export default function ContentPolicyPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@justzappit.xyz";

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Community Content Policy</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 21, 2026</p>

      <p>
        JustZappIt is a community-driven directory. To ensure the quality and reliability of the data, we rely on our users to submit accurate information and moderate the platform. By adding a store, suggesting an edit, or voting, you agree to abide by this Community Content Policy.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">1. Acceptable Submissions</h2>
      <p>
        When you submit a new store or suggest an edit, please ensure that:
      </p>
      <ul>
        <li>The store exists at the provided physical address.</li>
        <li>The store genuinely accepts at least one cryptocurrency for goods or services.</li>
        <li>The store name, location, and contact details are accurate and up-to-date.</li>
        <li>You have a good-faith belief that the information is correct, ideally from personal experience.</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">2. Prohibited Content</h2>
      <p>
        The following types of submissions and activities are strictly prohibited:
      </p>
      <ul>
        <li><strong>Fake or malicious listings:</strong> Submitting non-existent stores, incorrect addresses, or businesses that do not accept crypto.</li>
        <li><strong>Spam and self-promotion:</strong> Repeatedly submitting the same store or using the directory purely for SEO/backlink purposes without actually accepting crypto in-person.</li>
        <li><strong>Competitor sabotage:</strong> Maliciously flagging a legitimate store as closed or incorrect to harm their business.</li>
        <li><strong>Automated abuse:</strong> Using bots, scripts, or automated tools to submit data, vote, or bypass rate limits.</li>
        <li><strong>Inappropriate content:</strong> Submitting offensive, illegal, or harmful text in store names, contact details, or notes.</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">3. Community Moderation</h2>
      <p>
        JustZappIt uses a community moderation system to maintain data quality. The system relies on anonymous votes to confirm or flag stores.
      </p>
      <ul>
        <li><strong>Confirmations:</strong> Users can confirm a store if they have verified it exists and accepts crypto. A store requires 3 confirmations to reach &quot;Community Verified&quot; status.</li>
        <li><strong>Flags:</strong> Users can flag a store if it is closed, has incorrect information, or no longer accepts crypto. Accumulating 3 flags marks a store as &quot;Flagged&quot;, and 5 flags marks it as &quot;Closed&quot;.</li>
        <li><strong>Edits:</strong> Suggested edits are reviewed by the community and automatically applied after receiving 2 confirmations.</li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">4. Enforcement</h2>
      <p>
        We reserve the right to review, edit, or remove any store listing, edit suggestion, or vote that violates this policy or harms the integrity of the directory. Users found to be repeatedly violating this policy may have their IP addresses permanently blocked from submitting further data.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">5. Reporting Abuse</h2>
      <p>
        If you encounter a listing that violates this policy, please use the &quot;Flag&quot; feature on the store&apos;s panel. For severe abuse, coordinated spam attacks, or legal inquiries regarding content on the site, please contact us at <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>.
      </p>
    </>
  );
}
