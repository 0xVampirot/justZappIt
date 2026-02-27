// SPDX-License-Identifier: AGPL-3.0-only
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter for geocode proxy.
// Nominatim usage policy requires max 1 req/sec — we allow 5 per IP per minute.
const ipHits = new Map<string, { count: number; resetAt: number }>();
const MAX_GEOCODE_PER_MINUTE = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > MAX_GEOCODE_PER_MINUTE;
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
           ?? request.headers.get("x-real-ip")
           ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many geocoding requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "JustZappIt/1.0 (justzappit.xyz)",
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
