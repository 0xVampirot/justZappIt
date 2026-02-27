// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Terms of Use — JustZappIt",
};

export default function TermsPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@justzappit.xyz";

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Terms of Use</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 21, 2026</p>

      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of the JustZappIt website (the &quot;Site&quot;), an open community project. By accessing or using the Site, you agree to be bound by these Terms and our <a href="/legal/content-policy" className="text-primary hover:underline">Community Content Policy</a>.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">1. Acceptance of Terms</h2>
      <p>
        By accessing the Site, you agree to these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you are prohibited from using the Site.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">2. Community Contributions</h2>
      <p>
        The Site relies on user-submitted data, edits, and votes (collectively, &quot;Contributions&quot;). When making a Contribution, you agree to:
      </p>
      <ul>
        <li>Provide accurate and truthful information to the best of your knowledge.</li>
        <li>Not submit fake, malicious, spam, or abusive listings.</li>
        <li>Not use automated means (bots, scripts) to manipulate votes, submissions, or the integrity of the directory.</li>
      </ul>
      <p>
        We reserve the right to remove, edit, or reject any Contribution for any reason, without notice, including but not limited to violations of our Community Content Policy.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">3. Intellectual Property</h2>
      <p>
        By submitting a Contribution (such as adding a store or editing a listing), you grant the JustZappIt project a worldwide, perpetual, non-exclusive, royalty-free license to use, display, reproduce, and modify that content. 
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">4. No Warranty</h2>
      <p>
        The Site and all information on it are provided on an &quot;as is&quot; and &quot;as available&quot; basis. 
        <strong>We make no warranties, expressed or implied, regarding the accuracy, completeness, reliability, or availability of the Site.</strong> 
        We disclaim all warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">5. Limitation of Liability</h2>
      <p>
        In no event shall the JustZappIt project, its contributors, volunteers, or maintainers be liable for any damages (including, without limitation, direct, indirect, incidental, consequential, or punitive damages, loss of profits, loss of data, or business interruption) arising out of the use or inability to use the Site or the information contained within it.
      </p>
      <p>
        You expressly agree that your use of the Site and any interactions with stores listed on the Site are at your sole risk.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">6. Revisions</h2>
      <p>
        We may revise these Terms at any time without notice. By using the Site, you agree to be bound by the then-current version of these Terms.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">7. Governing Law</h2>
      <p>
        JustZappIt is an open, community-driven project with no registered corporate entity. These Terms are not governed by the laws of any specific jurisdiction. Any claim or dispute arising from your use of the Site is subject to the laws of your local jurisdiction.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">8. Contact</h2>
      <p>
        If you have questions about these Terms, please contact us at <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>.
      </p>
    </>
  );
}
