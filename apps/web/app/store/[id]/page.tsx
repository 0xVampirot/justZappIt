// SPDX-License-Identifier: AGPL-3.0-only
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Store } from "@/lib/database.types";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import StorePageClient from "./StorePageClient";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

async function getStore(id: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Store;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const store = await getStore(params.id);
  if (!store) return { title: "Store Not Found — JustZappIt" };

  const title = `${store.operator_name} | Buy & Sell Crypto in ${store.city}`;
  const cryptoAccepted = store.accepts_crypto?.length ? store.accepts_crypto.join(", ") : "BTC, ETH, USDT";
  const description = `Visit ${store.operator_name} in ${store.city}, ${store.country} to buy and sell ${cryptoAccepted} for cash. Verified physical crypto exchange and OTC desk.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/store/${store.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/store/${store.id}`,
      type: "website",
      siteName: "JustZappIt",
      locale: "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${store.operator_name} Crypto Exchange in ${store.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: { id: string };
}) {
  const store = await getStore(params.id);
  if (!store) notFound();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://justzappit.xyz";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: store.operator_name,
    image: `${appUrl}/og-image.jpg`,
    url: `${appUrl}/store/${store.id}`,
    address: {
      "@type": "PostalAddress",
      ...(store.street_address ? { streetAddress: store.street_address } : {}),
      addressLocality: store.city,
      addressCountry: store.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.lat,
      longitude: store.lng,
    },
    description: `Physical crypto exchange shop in ${store.city}. Accepts: ${store.accepts_crypto?.join(", ") || "Cryptocurrency"}.`,
    currenciesAccepted: store.accepts_crypto?.join(", ") || "BTC, ETH, USDT",
    paymentAccepted: "Cash",
    ...(store.opening_hours ? { openingHours: store.opening_hours } : {}),
    ...(store.website ? { sameAs: store.website } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: appUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: store.operator_name,
        item: `${appUrl}/store/${store.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
          >
            <ArrowLeft size={20} className="text-[var(--color-text-secondary)]" />
          </Link>
          <Link href="/" className="text-button font-bold text-[var(--color-text-primary)]">
            Just<span className="text-primary">Zapp</span>It
          </Link>
        </div>
        {/* Static map centred on store pin */}
        <div className="mb-4 rounded-lg overflow-hidden border border-[var(--color-border)]">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src={`https://staticmap.openstreetmap.de/staticmap.php?center=${store.lat},${store.lng}&zoom=15&size=600x200&markers=${store.lat},${store.lng},red-pushpin`}
              alt={`Map showing ${store.operator_name} in ${store.city}`}
              width={600}
              height={200}
              className="w-full h-[200px] object-cover"
            />
          </a>
        </div>
        <StorePageClient store={store} />
      </div>
    </div>
  );
}
