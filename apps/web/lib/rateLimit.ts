import { getServiceClient } from "./supabase";

const MAX_ACTIONS = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_FLAGS_PER_HOUR = 3;

/**
 * Mass-flag cooldown: >3 flags from the same IP in 1 hour → soft-ignore.
 * Returns true if the flag should be allowed, false if cooldown is active.
 */
export async function checkFlagCooldown(ipHash: string): Promise<boolean> {
  const supabase = getServiceClient();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .like("type", "flag_%")
    .gte("created_at", oneHourAgo);

  if (error) {
    console.error("Flag cooldown check error:", error);
    return false; // fail closed — deny the action on DB error
  }

  return (count ?? 0) < MAX_FLAGS_PER_HOUR;
}

/**
 * Atomic rate limit check via Postgres RPC.
 * Uses INSERT ... ON CONFLICT ... DO UPDATE ... RETURNING in a single statement
 * to eliminate the race condition where concurrent requests could read the same
 * stale action_count and bypass the limit.
 */
export async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getServiceClient();

  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_ip_hash: ipHash,
    p_max_actions: MAX_ACTIONS,
    p_window_ms: WINDOW_MS,
  });

  if (error) {
    console.error("Rate limit RPC error:", error);
    return { allowed: false, remaining: 0 }; // fail closed — deny on DB error
  }

  // RPC returns a single-row result set
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    console.error("Rate limit RPC returned no data");
    return { allowed: false, remaining: 0 }; // fail closed
  }

  return { allowed: row.allowed, remaining: row.remaining };
}
