// SPDX-License-Identifier: AGPL-3.0-only
import dynamicImport from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import type { Store } from "@/lib/database.types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

const MapPage = dynamicImport(() => import("@/components/MapPage"), { ssr: false });

async function getStores(): Promise<Store[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    supabaseUrl.includes("YOUR_PROJECT_REF") ||
    !supabaseKey ||
    supabaseKey.includes("YOUR_ANON_KEY")
  ) {
    return [];
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await client
      .from("stores")
      .select("*")
      .order("operator_name");

    if (error) {
      console.error("Failed to fetch stores:", error);
      return [];
    }
    return (data ?? []) as Store[];
  } catch (err) {
    console.error("Supabase error:", err);
    return [];
  }
}

function getStoreStats(stores: Store[]) {
  const countries = new Set(stores.map((s) => s.country));
  const cities = new Set(stores.map((s) => s.city));
  return { storeCount: stores.length, countryCount: countries.size, cityCount: cities.size };
}

export default async function HomePage() {
  const stores = await getStores();
  const stats = getStoreStats(stores);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://justzappit.xyz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JustZappIt",
    url: appUrl,
    description: "Discover the most comprehensive global directory of physical crypto exchange shops. Safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${appUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MapPage initialStores={stores} />

      {/* Server-rendered SEO content — visible to crawlers / screen readers only */}
      <section className="sr-only" aria-hidden="false">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Find Physical Crypto Exchanges Near You
            </h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              JustZappIt is the most comprehensive, community-driven directory of physical crypto
              exchange shops worldwide. Whether you want to buy Bitcoin with cash, sell USDT for
              local currency, or find a trusted OTC desk in your city, our interactive map helps you
              locate verified stores in seconds. Every listing is submitted and verified by the
              community — no middlemen, no sign-ups, no tracking.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-[var(--color-text-secondary)] leading-relaxed">
              <li>
                <strong className="text-[var(--color-text-primary)]">Search the map</strong> — Browse the
                interactive map or search by city, country, or operator name to find crypto exchange
                shops near you.
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Check store details</strong> — View
                accepted cryptocurrencies, opening hours, contact information, and community
                verification status.
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Vote and verify</strong> — Confirm
                stores you have visited or flag incorrect information to help keep the directory accurate.
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Add new stores</strong> — Know a
                crypto exchange shop that is not listed? <Link href="/add" className="text-primary hover:underline">Submit it</Link> and
                help the community grow.
              </li>
            </ol>
          </div>

          {stats.storeCount > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Directory at a Glance
              </h2>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{stats.storeCount}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Stores Listed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stats.countryCount}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Countries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stats.cityCount}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Cities</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-4">
            <p className="text-xs text-[var(--color-text-secondary)]">
              <Link href="/legal/privacy" className="hover:underline">Privacy</Link>
              {" · "}
              <Link href="/legal/terms" className="hover:underline">Terms</Link>
              {" · "}
              <Link href="/legal/disclaimer" className="hover:underline">Disclaimer</Link>
              {" · "}
              <Link href="/legal/content-policy" className="hover:underline">Content Policy</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
