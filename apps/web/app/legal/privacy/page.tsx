// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy — JustZappIt",
};

export default function PrivacyPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@justzappit.xyz";

  return (
    <>
      <h1 className="text-[var(--color-text-primary)]">Privacy Policy</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Last updated: February 21, 2026</p>

      <p>
        JustZappIt (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting it. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our website (the &quot;Site&quot;).
      </p>
      <p>
        As a community-driven project, we collect as little information as possible.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">1. Information We Collect</h2>
      <p>
        We do not require user accounts, meaning we do not collect personal information such as names, email addresses, or phone numbers unless you contact us directly.
      </p>
      <p>
        When you submit a new store, suggest an edit, or vote on a listing, we temporarily process your IP address for the sole purpose of rate limiting and spam prevention. Your IP address is immediately hashed using a cryptographic salt, and the raw IP is never stored in our database. We cannot reverse the hash to identify you.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">2. Third-Party Services</h2>
      <p>
        We use selected third-party services to ensure the Site functions properly and remains secure. These services may process data in accordance with their own privacy policies:
      </p>
      <ul>
        <li>
          <strong>hCaptcha:</strong> We use hCaptcha to prevent bots from submitting spam. hCaptcha may collect hardware and software information (like device data and application data) to verify whether you are human. This data is subject to the <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hCaptcha Privacy Policy</a>.
        </li>
        <li>
          <strong>OpenStreetMap (Nominatim):</strong> When you add a store, we geocode the address using Nominatim to find its coordinates. Your search queries (city, country, address) are sent to their API. This is subject to the <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OSMF Privacy Policy</a>.
        </li>
        <li>
          <strong>Analytics & Hosting:</strong> We use Cloudflare, Vercel Analytics, and Google Search Console to monitor site performance and traffic. In their default configurations for our site, these tools do not collect personally identifiable information (PII) or track users across other websites.
        </li>
      </ul>

      <h2 className="text-[var(--color-text-primary)] mt-8">3. Cookies &amp; Advertising</h2>
      <p>
        We use local storage to remember your preferences, such as whether you have already seen the introductory help modal and your cookie consent choice.
      </p>
      <h3 className="text-[var(--color-text-primary)] mt-6">Google AdSense and Advertising</h3>
      <p>
        This site uses Google AdSense to display advertisements. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to this website or other websites.
      </p>
      <p>
        Google may use cookies to collect information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. You can opt out of personalized advertising by visiting <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info</a>.
      </p>
      <p>
        We participate in the IAB Europe Transparency and Consent Framework and comply with its Specifications and Policies. We work with advertising partners who may collect information on your use of this website across different devices and browsers. This information may be used to build a profile of your interests and show you relevant adverts on other websites.
      </p>
      <h3 className="text-[var(--color-text-primary)] mt-6">Third-Party Advertising Partners</h3>
      <p>
        We work with the following advertising partners:
      </p>
      <ul>
        <li><strong>Google AdSense:</strong> Uses the DoubleClick cookie to serve more relevant ads across the web and limit the number of times a given ad is shown to you.</li>
        <li><strong>Google Analytics:</strong> Uses cookies to analyze how visitors use this website and provide reports on website activity.</li>
      </ul>
      <p>
        For more information about Google&apos;s privacy practices and your choices, please see the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Advertising Privacy Policy</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>.
      </p>
      <p>
        Our privacy policy includes a link to <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">How Google uses data when you use our partners&apos; sites or apps</a>.
      </p>
      <p>
        If you accept advertising cookies, we display ads through Google AdSense. Google and its partners may use cookies and web beacons to serve ads based on your prior visits to this site or other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>. If you decline cookies, no advertising cookies will be set and no ads will be displayed.
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">4. Data Sharing and Disclosure</h2>
      <p>
        We do not sell, rent, or trade your information. All store data, edits, and votes you submit (excluding your IP hash) become part of the public directory and are visible to anyone. 
      </p>

      <h2 className="text-[var(--color-text-primary)] mt-8">5. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>.
      </p>
    </>
  );
}
