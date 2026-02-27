// SPDX-License-Identifier: AGPL-3.0-only
import { supabase } from "@/lib/supabase";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://justzappit.xyz";

  const { data: stores } = await supabase
    .from("stores")
    .select("id, updated_at")
    .in("verification_status", ["unverified", "seed_confirmed", "seed_partial", "community_verified", "flagged"]);

  const storeUrls: MetadataRoute.Sitemap = (stores ?? []).map((s: { id: string; updated_at: string }) => ({
    url: `${appUrl}/store/${s.id}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${appUrl}/add`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...storeUrls,
    ...[
      { url: `${appUrl}/legal/privacy`, changeFrequency: "monthly" as const, priority: 0.3 },
      { url: `${appUrl}/legal/terms`, changeFrequency: "monthly" as const, priority: 0.3 },
      { url: `${appUrl}/legal/disclaimer`, changeFrequency: "monthly" as const, priority: 0.3 },
      { url: `${appUrl}/legal/content-policy`, changeFrequency: "monthly" as const, priority: 0.3 },
    ],
  ];
}
