// SPDX-License-Identifier: AGPL-3.0-only
import * as XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import 'dotenv/config';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const CACHE_FILE = path.join(__dirname, 'geocode_cache.json');
const XLSX_FILE = path.join(__dirname, '../../verified_crypto_shops_directory.xlsx');
const DELAY_MS = 1100; // Nominatim: 1 req/sec

type GeoResult = { lat: number; lng: number; is_approximate: boolean };
type GeoCache = Record<string, GeoResult>;

function loadCache(): GeoCache {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  }
  return {};
}

function saveCache(cache: GeoCache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(address: string, city: string, country: string): Promise<GeoResult> {
  const cache = loadCache();
  const key = `${address}|${city}|${country}`;

  if (cache[key]) {
    console.log(`  [cache] ${key}`);
    return cache[key];
  }

  // Try full address first
  const queries = [
    address ? `${address}, ${city}, ${country}` : null,
    `${city}, ${country}`,
  ].filter(Boolean) as string[];

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const isApproximate = i > 0;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'JustZappIt/1.0 (seed script; contact@justzappit.xyz)' },
      });
      const data = (await res.json()) as Array<{ lat: string; lon: string }>;

      if (data && data.length > 0) {
        const result: GeoResult = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          is_approximate: isApproximate,
        };
        cache[key] = result;
        saveCache(cache);
        console.log(`  [geocoded${isApproximate ? ' ~city' : ''}] ${q} → ${result.lat}, ${result.lng}`);
        return result;
      }
    } catch (err) {
      console.warn(`  [geocode error] ${q}:`, err);
    }

    await sleep(DELAY_MS);
  }

  // Fallback: city centre approximation
  console.warn(`  [fallback] Could not geocode: ${key} — using 0,0 placeholder`);
  const fallback: GeoResult = { lat: 0, lng: 0, is_approximate: true };
  cache[key] = fallback;
  saveCache(cache);
  return fallback;
}

function mapVerification(raw: string | undefined): string {
  if (!raw) return 'seed_partial';
  const v = raw.toString().trim();
  if (v.includes('✅') && v.toLowerCase().includes('confirmed')) return 'seed_confirmed';
  if (v.includes('⚠️') || v.toLowerCase().includes('partial')) return 'seed_partial';
  return 'seed_partial';
}

function extractCity(cityLocation: string): string {
  // "Istanbul (Taksim — HQ)" → "Istanbul"
  return cityLocation.split('(')[0].trim().split('/')[0].trim();
}

async function main() {
  console.log('📂 Loading spreadsheet...');
  const wb = XLSX.readFile(XLSX_FILE);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws);

  console.log(`📊 Found ${rows.length} rows\n`);

  const stores: Array<Record<string, unknown>> = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const num = row['#'] ?? i + 1;
    const country = (row['Country'] ?? '').trim();
    const cityRaw = (row['City / Location'] ?? '').trim();
    const city = extractCity(cityRaw);
    const operatorName = (row['Operator Name'] ?? '').trim();
    const streetAddress = (row['Street Address'] ?? '').trim();
    const website = (row['Website'] ?? '').trim() || null;
    const openingHours = (row['Opening Hours'] ?? '').trim() || null;
    const contact = (row['Contact (Phone / Email)'] ?? '').trim() || null;
    const verification = mapVerification(row['Verification']);

    if (!operatorName || !country || !city) {
      console.warn(`  [skip] Row ${num}: missing required fields`);
      continue;
    }

    console.log(`[${num}/${rows.length}] ${operatorName} — ${city}, ${country}`);
    const geo = await geocode(streetAddress, city, country);
    await sleep(DELAY_MS);

    stores.push({
      operator_name: operatorName,
      street_address: streetAddress || null,
      city,
      country,
      lat: geo.lat,
      lng: geo.lng,
      is_approximate: geo.is_approximate,
      website,
      opening_hours: openingHours,
      contact,
      accepts_crypto: [],
      verification_status: verification,
      source: 'seed',
      confirm_count: 0,
      flag_count: 0,
    });
  }

  console.log(`\n🌱 Inserting ${stores.length} stores into Supabase...`);

  const { error } = await supabase.from('stores').insert(stores);

  if (error) {
    console.error('❌ Insert error:', error);
    process.exit(1);
  }

  console.log(`✅ Seeded ${stores.length} stores successfully.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
