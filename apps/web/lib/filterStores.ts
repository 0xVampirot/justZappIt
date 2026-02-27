import type { Database } from "./database.types";
import type { FilterState } from "@/components/map/FilterBar";

export type Store = Database["public"]["Tables"]["stores"]["Row"];

function isOpenNow(openingHours: string | null): boolean | null {
  if (!openingHours) return null;
  const lower = openingHours.toLowerCase();
  if (
    lower.includes("by appointment") ||
    lower.includes("contact") ||
    lower.includes("hours vary") ||
    lower.includes("24/7")
  ) {
    return lower.includes("24/7") ? true : null;
  }

  try {
    // Use a simple heuristic: check if current time falls within any listed range
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
    const hour = now.getHours() + now.getMinutes() / 60;

    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const currentDay = dayNames[day];

    // Check if the hours string mentions today
    const mentionsToday = lower.includes(currentDay) || lower.includes("daily") || lower.includes("every day");

    // Extract time ranges like "9am-6pm", "9:00-18:00"
    const timeRangeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/gi;
    const matches = [...lower.matchAll(timeRangeRegex)];

    if (matches.length === 0 || !mentionsToday) return null;

    for (const m of matches) {
      let startH = parseInt(m[1]);
      const startM = parseInt(m[2] ?? "0");
      const startAmPm = m[3];
      let endH = parseInt(m[4]);
      const endM = parseInt(m[5] ?? "0");
      const endAmPm = m[6];

      if (startAmPm === "pm" && startH !== 12) startH += 12;
      if (startAmPm === "am" && startH === 12) startH = 0;
      if (endAmPm === "pm" && endH !== 12) endH += 12;
      if (endAmPm === "am" && endH === 12) endH = 0;

      const start = startH + startM / 60;
      const end = endH + endM / 60;

      if (hour >= start && hour <= end) return true;
    }
    return false;
  } catch {
    return null;
  }
}

export function applyFilters(stores: Store[], filters: FilterState): Store[] {
  return stores.filter((store) => {
    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(store.country)) {
      return false;
    }

    // City search (fuzzy client-side)
    if (filters.citySearch.trim()) {
      const q = filters.citySearch.toLowerCase();
      const cityMatch =
        store.city.toLowerCase().includes(q) ||
        (store.street_address ?? "").toLowerCase().includes(q) ||
        store.country.toLowerCase().includes(q);
      if (!cityMatch) return false;
    }

    // Operator filter
    if (filters.operators.length > 0 && !filters.operators.includes(store.operator_name)) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(store.verification_status)) {
      return false;
    }

    // Show unverified toggle - hide by default unless explicitly requested via statuses array
    if (!filters.statuses.includes("unverified") && store.verification_status === "unverified") {
      return false;
    }

    // Show closed toggle
    if (!filters.showClosed && store.verification_status === "closed") {
      return false;
    }

    // Open now
    if (filters.openNow) {
      const open = isOpenNow(store.opening_hours);
      if (open === false) return false;
    }

    // Crypto type filter
    if (filters.cryptoTypes.length > 0) {
      const storeCrypto = store.accepts_crypto ?? [];
      const hasMatch = filters.cryptoTypes.some((c) => {
        if (c === "Other") {
          return storeCrypto.some(
            (sc) => !["BTC", "ETH", "USDT", "ZEC"].includes(sc.toUpperCase())
          );
        }
        return storeCrypto.some((sc) => sc.toUpperCase() === c.toUpperCase());
      });
      if (!hasMatch) return false;
    }

    return true;
  });
}
