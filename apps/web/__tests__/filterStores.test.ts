import { describe, it, expect } from "vitest";
import { applyFilters } from "../lib/filterStores";
import type { FilterState } from "@/components/map/FilterBar";

const defaultFilters: FilterState = {
  countries: [],
  citySearch: "",
  operators: [],
  statuses: [],
  showClosed: false,
  openNow: false,
  cryptoTypes: [],
};

function makeStore(overrides: Record<string, unknown> = {}) {
  return {
    id: "test-id",
    operator_name: "TestATM",
    street_address: "123 Main St",
    city: "Prague",
    country: "Czech Republic",
    lat: 50.08,
    lng: 14.42,
    is_approximate: false,
    website: null,
    opening_hours: null,
    contact: null,
    phone: null,
    email: null,
    accepts_crypto: ["BTC", "ETH"],
    verification_status: "community_verified",
    source: "community",
    confirm_count: 3,
    flag_count: 0,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    ...overrides,
  } as ReturnType<typeof applyFilters>[number];
}

describe("applyFilters", () => {
  it("returns all stores when no filters are active (except unverified)", () => {
    const stores = [makeStore(), makeStore({ id: "2", city: "Berlin", country: "Germany" })];
    const result = applyFilters(stores, defaultFilters);
    expect(result).toHaveLength(2);
  });

  it("filters by country", () => {
    const stores = [
      makeStore({ country: "Czech Republic" }),
      makeStore({ id: "2", country: "Germany" }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, countries: ["Germany"] });
    expect(result).toHaveLength(1);
    expect(result[0].country).toBe("Germany");
  });

  it("filters by city search (case-insensitive)", () => {
    const stores = [
      makeStore({ city: "Prague" }),
      makeStore({ id: "2", city: "Berlin" }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, citySearch: "prag" });
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe("Prague");
  });

  it("city search matches street address", () => {
    const stores = [makeStore({ street_address: "Karl Marx Strasse" })];
    const result = applyFilters(stores, { ...defaultFilters, citySearch: "Karl Marx" });
    expect(result).toHaveLength(1);
  });

  it("filters by operator", () => {
    const stores = [
      makeStore({ operator_name: "CryptoATM" }),
      makeStore({ id: "2", operator_name: "BitcoinPoint" }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, operators: ["CryptoATM"] });
    expect(result).toHaveLength(1);
  });

  it("filters by verification status", () => {
    const stores = [
      makeStore({ verification_status: "community_verified" }),
      makeStore({ id: "2", verification_status: "seed_confirmed" }),
    ];
    const result = applyFilters(stores, {
      ...defaultFilters,
      statuses: ["seed_confirmed"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].verification_status).toBe("seed_confirmed");
  });

  it("hides unverified stores by default", () => {
    const stores = [
      makeStore({ verification_status: "community_verified" }),
      makeStore({ id: "2", verification_status: "unverified" }),
    ];
    const result = applyFilters(stores, defaultFilters);
    expect(result).toHaveLength(1);
    expect(result[0].verification_status).toBe("community_verified");
  });

  it("shows unverified when explicitly requested via statuses", () => {
    const stores = [
      makeStore({ verification_status: "unverified" }),
    ];
    const result = applyFilters(stores, {
      ...defaultFilters,
      statuses: ["unverified"],
    });
    expect(result).toHaveLength(1);
  });

  it("hides closed stores by default", () => {
    const stores = [
      makeStore({ verification_status: "community_verified" }),
      makeStore({ id: "2", verification_status: "closed" }),
    ];
    const result = applyFilters(stores, defaultFilters);
    expect(result).toHaveLength(1);
  });

  it("shows closed stores when showClosed is true", () => {
    const stores = [
      makeStore({ verification_status: "closed" }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, showClosed: true });
    expect(result).toHaveLength(1);
  });

  it("filters by crypto type", () => {
    const stores = [
      makeStore({ accepts_crypto: ["BTC", "ETH"] }),
      makeStore({ id: "2", accepts_crypto: ["USDT"] }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, cryptoTypes: ["BTC"] });
    expect(result).toHaveLength(1);
  });

  it("'Other' crypto filter matches non-standard crypto", () => {
    const stores = [
      makeStore({ accepts_crypto: ["BTC"] }),
      makeStore({ id: "2", accepts_crypto: ["DOGE"] }),
    ];
    const result = applyFilters(stores, { ...defaultFilters, cryptoTypes: ["Other"] });
    expect(result).toHaveLength(1);
    expect(result[0].accepts_crypto).toContain("DOGE");
  });

  it("combines multiple filters (AND logic)", () => {
    const stores = [
      makeStore({ country: "Germany", operator_name: "CryptoATM", accepts_crypto: ["BTC"] }),
      makeStore({ id: "2", country: "Germany", operator_name: "Other", accepts_crypto: ["BTC"] }),
      makeStore({ id: "3", country: "USA", operator_name: "CryptoATM", accepts_crypto: ["BTC"] }),
    ];
    const result = applyFilters(stores, {
      ...defaultFilters,
      countries: ["Germany"],
      operators: ["CryptoATM"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].country).toBe("Germany");
    expect(result[0].operator_name).toBe("CryptoATM");
  });
});
