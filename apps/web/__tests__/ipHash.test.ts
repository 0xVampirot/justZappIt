import { describe, it, expect, beforeEach, vi } from "vitest";
import { hashIp, getClientIp } from "../lib/ipHash";

describe("hashIp", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a 64-char hex SHA-256 hash", () => {
    vi.stubEnv("IP_HASH_SALT", "test-salt");
    vi.stubEnv("NODE_ENV", "test");
    const hash = hashIp("192.168.1.1");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("produces different hashes for different IPs", () => {
    vi.stubEnv("IP_HASH_SALT", "test-salt");
    const h1 = hashIp("192.168.1.1");
    const h2 = hashIp("10.0.0.1");
    expect(h1).not.toBe(h2);
  });

  it("produces same hash for same IP + salt", () => {
    vi.stubEnv("IP_HASH_SALT", "test-salt");
    const h1 = hashIp("192.168.1.1");
    const h2 = hashIp("192.168.1.1");
    expect(h1).toBe(h2);
  });

  it("produces different hashes with different salts", () => {
    vi.stubEnv("IP_HASH_SALT", "salt-a");
    const h1 = hashIp("192.168.1.1");
    vi.stubEnv("IP_HASH_SALT", "salt-b");
    const h2 = hashIp("192.168.1.1");
    expect(h1).not.toBe(h2);
  });

  it("throws in production without a valid salt", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("IP_HASH_SALT", "");
    expect(() => hashIp("192.168.1.1")).toThrow("CRITICAL");
  });

  it("throws in production with placeholder salt", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("IP_HASH_SALT", "default-salt-replace-me");
    expect(() => hashIp("192.168.1.1")).toThrow("CRITICAL");
  });
});

describe("getClientIp", () => {
  it("extracts IP from x-forwarded-for header", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("extracts IP from x-real-ip header", () => {
    const req = new Request("http://localhost", {
      headers: { "x-real-ip": "10.0.0.1" },
    });
    expect(getClientIp(req)).toBe("10.0.0.1");
  });

  it("prefers x-forwarded-for over x-real-ip", () => {
    const req = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "1.2.3.4",
        "x-real-ip": "10.0.0.1",
      },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("returns 'unknown' when no IP headers present", () => {
    const req = new Request("http://localhost");
    expect(getClientIp(req)).toBe("unknown");
  });

  it("trims whitespace from IP", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "  1.2.3.4  " },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });
});
