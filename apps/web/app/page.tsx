import dynamicImport from "next/dynamic";
import type { Store } from "@/lib/database.types";

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

export default async function HomePage() {
  const stores = await getStores();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JustZappIt",
    url: "https://justzappit.xyz",
    description: "Discover the most comprehensive global directory of physical crypto exchange shops. Safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://justzappit.xyz/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MapPage initialStores={stores} />
    </>
  );
}
