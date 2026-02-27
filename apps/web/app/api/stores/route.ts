import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT)
  );
  const offset = (page - 1) * limit;

  // Get total count first
  const { count, error: countError } = await supabase
    .from("stores")
    .select("*", { count: "exact", head: true })
    .in("verification_status", [
      "unverified", "seed_confirmed", "seed_partial",
      "community_verified", "flagged",
    ]);

  if (countError) {
    console.error("[Stores API] Count error:", countError);
    return NextResponse.json(
      { error: "Failed to load stores. Please try again." },
      { status: 500 }
    );
  }

  const total = count ?? 0;

  // Fetch the page
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .in("verification_status", [
      "unverified", "seed_confirmed", "seed_partial",
      "community_verified", "flagged",
    ])
    .order("operator_name")
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[Stores API] DB error:", error);
    return NextResponse.json(
      { error: "Failed to load stores. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    data: data ?? [],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
