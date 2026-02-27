"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, MapPin, CheckCircle } from "lucide-react";

const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), { ssr: false });

const CRYPTO_OPTIONS = ["BTC", "ETH", "USDT", "ZEC", "XMR", "LTC", "Other"];

interface FormData {
  operator_name: string;
  street_address: string;
  city: string;
  country: string;
  website: string;
  opening_hours: string;
  phone: string;
  email: string;
  accepts_crypto: string[];
  lat: number | null;
  lng: number | null;
  is_approximate: boolean;
}

const inputClass =
  "w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-body bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-[var(--color-text-secondary)]";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-caption font-semibold text-[var(--color-text-secondary)] mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-caption text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const WORLD_COUNTRIES = new Set([
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Czechia",
  "Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati",
  "Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia",
  "Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo",
  "Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "UAE","United Arab Emirates","Uganda","Ukraine","United Kingdom","UK",
  "United States","USA","United States of America","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
  "Hong Kong","Macau","Puerto Rico","Bermuda","Cayman Islands",
  "British Virgin Islands","Guam","Aruba","Curacao","Gibraltar",
]);

function validateCountrySync(val: string): string {
  if (!val.trim()) return "Country is required.";
  const normalised = val.trim();
  const found = [...WORLD_COUNTRIES].some(
    (c) => c.toLowerCase() === normalised.toLowerCase()
  );
  if (!found) return `"${normalised}" is not a recognised country.`;
  return "";
}

async function validateCityAsync(city: string, country: string): Promise<string> {
  if (!city.trim()) return "City is required.";
  const q = country.trim() ? `${city.trim()}, ${country.trim()}` : city.trim();
  try {
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return "";
    return `"${city.trim()}" could not be found. Check the spelling or try a nearby larger city.`;
  } catch {
    return "";
  }
}

export default function AddStoreForm() {
  const [form, setForm] = useState<FormData>({
    operator_name: "",
    street_address: "",
    city: "",
    country: "",
    website: "",
    opening_hours: "",
    phone: "",
    email: "",
    accepts_crypto: ["ZEC"],
    lat: null,
    lng: null,
    is_approximate: false,
  });
  const [fieldErrors, setFieldErrors] = useState<{ city?: string; country?: string }>({});
  const [validating, setValidating] = useState<{ city?: boolean; country?: boolean }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loadedAt] = useState(() => Date.now());
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";  // HCaptcha will fail gracefully if empty

  async function geocodeAddress() {
    if (!form.city || !form.country) return;
    setGeocoding(true);
    try {
      const q = form.street_address
        ? `${form.street_address}, ${form.city}, ${form.country}`
        : `${form.city}, ${form.country}`;
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setForm((f) => ({
          ...f,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          is_approximate: !form.street_address,
        }));
      } else {
        setError("Could not geocode this address. Please check city and country.");
      }
    } catch {
      setError("Geocoding failed. Please try again.");
    } finally {
      setGeocoding(false);
    }
  }

  function toggleCrypto(c: string) {
    setForm((f) => ({
      ...f,
      accepts_crypto: f.accepts_crypto.includes(c)
        ? f.accepts_crypto.filter((x) => x !== c)
        : [...f.accepts_crypto, c],
    }));
  }

  async function handlePreSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.operator_name || !form.city || !form.country) {
      setError("Operator name, city, and country are required.");
      return;
    }

    const countryErr = validateCountrySync(form.country);
    if (countryErr) {
      setFieldErrors((fe) => ({ ...fe, country: countryErr }));
      return;
    }

    setValidating((v) => ({ ...v, city: true }));
    const cityErr = await validateCityAsync(form.city, form.country);
    setValidating((v) => ({ ...v, city: false }));
    if (cityErr) {
      setFieldErrors((fe) => ({ ...fe, city: cityErr }));
      return;
    }

    if (!hcaptchaToken) {
      setError("Please complete the captcha.");
      return;
    }
    setShowConfirm(true);
  }

  async function handleConfirmedSubmit() {
    setShowConfirm(false);
    setError(null);

    let lat = form.lat;
    let lng = form.lng;
    if (lat === null || lng === null) {
      setGeocoding(true);
      try {
        const q = form.street_address
          ? `${form.street_address}, ${form.city}, ${form.country}`
          : `${form.city}, ${form.country}`;
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          lat = parseFloat(data[0].lat);
          lng = parseFloat(data[0].lon);
        } else {
          setError("Could not geocode this address. Please check city and country.");
          setGeocoding(false);
          return;
        }
      } catch {
        setError("Geocoding failed. Please try again.");
        setGeocoding(false);
        return;
      }
      setGeocoding(false);
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_store",
          payload: { ...form, lat, lng, is_approximate: !form.street_address },
          hcaptchaToken,
          honeypot,
          loadedAt,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error ?? "Submission failed. Please try again.");
        setCaptchaKey((k) => k + 1);
        setHcaptchaToken(null);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-title font-bold text-[var(--color-text-primary)]">Store Submitted!</h1>
          <p className="text-body text-[var(--color-text-secondary)]">
            Your store has been added as <strong>unverified</strong>. 
            Select <strong>&quot;Unverified&quot;</strong> in the Status filter to see it on the map.
            Community confirmations will upgrade its status over time.
          </p>
          <Link href="/?status=unverified" className="bg-primary text-white px-6 py-3 rounded-md font-semibold text-button">
            View on Map (Unverified)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors">
            <ArrowLeft size={20} className="text-[var(--color-text-secondary)]" />
          </Link>
          <div>
            <h1 className="text-title font-bold text-[var(--color-text-primary)]">Add a Store</h1>
            <p className="text-caption text-[var(--color-text-secondary)]">
              Help the community find crypto exchange shops near them.
            </p>
          </div>
        </div>

        <form onSubmit={handlePreSubmit} className="flex flex-col gap-5">
          {/* Honeypot */}
          <input
            type="text"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            aria-hidden="true"
          />

          {/* Required */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-5 flex flex-col gap-4">
            <h2 className="text-subtitle font-semibold text-[var(--color-text-primary)]">Required Information</h2>
            <Field label="Operator / Store Name *" required>
              <input type="text" required value={form.operator_name}
                onChange={(e) => setForm((f) => ({ ...f, operator_name: e.target.value }))}
                placeholder="e.g. NakitCoins" className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City *" required error={fieldErrors.city}>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, city: e.target.value, lat: null, lng: null }));
                      setFieldErrors((fe) => ({ ...fe, city: undefined }));
                    }}
                    onBlur={async (e) => {
                      const val = e.target.value;
                      if (!val.trim()) {
                        setFieldErrors((fe) => ({ ...fe, city: "City is required." }));
                        return;
                      }
                      setValidating((v) => ({ ...v, city: true }));
                      const err = await validateCityAsync(val, form.country);
                      setValidating((v) => ({ ...v, city: false }));
                      setFieldErrors((fe) => ({ ...fe, city: err || undefined }));
                    }}
                    placeholder="Istanbul"
                    className={`${inputClass} ${fieldErrors.city ? "border-red-400 focus:ring-red-400" : ""}`}
                  />
                  {validating.city && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block" />
                    </span>
                  )}
                </div>
              </Field>
              <Field label="Country *" required error={fieldErrors.country}>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, country: e.target.value, lat: null, lng: null }));
                    setFieldErrors((fe) => ({ ...fe, country: undefined }));
                  }}
                  onBlur={(e) => {
                    const err = validateCountrySync(e.target.value);
                    setFieldErrors((fe) => ({ ...fe, country: err || undefined }));
                  }}
                  placeholder="Turkey"
                  className={`${inputClass} ${fieldErrors.country ? "border-red-400 focus:ring-red-400" : ""}`}
                />
              </Field>
            </div>
          </div>

          {/* Optional */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-5 flex flex-col gap-4">
            <h2 className="text-subtitle font-semibold text-[var(--color-text-primary)]">Optional Details</h2>
            <Field label="Street Address">
              <input type="text" value={form.street_address}
                onChange={(e) => setForm((f) => ({ ...f, street_address: e.target.value, lat: null, lng: null }))}
                placeholder="123 Main St" className={inputClass} />
            </Field>
            <Field label="Website">
              <input type="url" value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                placeholder="https://example.com" className={inputClass} />
            </Field>
            <Field label="Opening Hours">
              <input type="text" value={form.opening_hours}
                onChange={(e) => setForm((f) => ({ ...f, opening_hours: e.target.value }))}
                placeholder="Mon–Fri 9AM–6PM" className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone">
                <input type="tel" value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 555 000 0000" className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="hello@example.com" className={inputClass} />
              </Field>
            </div>
            <div>
              <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                Accepts Crypto
              </label>
              <div className="flex flex-wrap gap-2">
                {CRYPTO_OPTIONS.map((c) => (
                  <button key={c} type="button" onClick={() => toggleCrypto(c)}
                    className={`px-3 py-1.5 rounded-sm text-caption border transition-colors ${
                      form.accepts_crypto.includes(c)
                        ? "bg-primary border-primary text-white"
                        : "border-primary text-primary"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={geocodeAddress}
                disabled={geocoding || !form.city || !form.country}
                className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] px-3 py-2 rounded-md text-button disabled:opacity-50">
                <MapPin size={16} className="text-primary" />
                {geocoding ? "Locating…" : "Preview Location"}
              </button>
              {form.lat !== null && form.lng !== null && (
                <span className="text-caption text-green-600 font-semibold">
                  ✓ Located {form.is_approximate ? "(approximate)" : ""}
                </span>
              )}
            </div>
          </div>

          {/* hCaptcha */}
          <div className="flex justify-center">
            <HCaptcha
              key={captchaKey}
              sitekey={siteKey}
              onVerify={(token: string) => setHcaptchaToken(token)}
              onExpire={() => setHcaptchaToken(null)}
            />
          </div>

          {error && (
            <p className="text-body text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting || geocoding}
            className="w-full bg-primary text-white py-3 rounded-md font-semibold text-button disabled:opacity-50">
            {submitting ? "Submitting…" : "Review & Submit"}
          </button>

          <p className="text-caption text-[var(--color-text-secondary)] text-center">
            Stores appear immediately as <strong>unverified</strong>. Community confirmations upgrade their status.
          </p>
        </form>
      </div>

      {/* ── Confirmation modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-5 p-6">
            <h2 className="text-title font-bold text-[var(--color-text-primary)]">Confirm your submission</h2>
            <p className="text-caption text-[var(--color-text-secondary)]">
              Please review the details below before submitting. Once submitted the store will appear on the map immediately.
            </p>

            <dl className="flex flex-col gap-2 text-body">
              <div className="flex gap-2">
                <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Store name</dt>
                <dd className="text-[var(--color-text-primary)] break-words">{form.operator_name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">City</dt>
                <dd className="text-[var(--color-text-primary)]">{form.city}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Country</dt>
                <dd className="text-[var(--color-text-primary)]">{form.country}</dd>
              </div>
              {form.street_address && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Address</dt>
                  <dd className="text-[var(--color-text-primary)] break-words">{form.street_address}</dd>
                </div>
              )}
              {form.website && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Website</dt>
                  <dd className="text-primary break-all">{form.website}</dd>
                </div>
              )}
              {form.opening_hours && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Hours</dt>
                  <dd className="text-[var(--color-text-primary)]">{form.opening_hours}</dd>
                </div>
              )}
              {form.phone && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Phone</dt>
                  <dd className="text-[var(--color-text-primary)]">{form.phone}</dd>
                </div>
              )}
              {form.email && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Email</dt>
                  <dd className="text-[var(--color-text-primary)] break-all">{form.email}</dd>
                </div>
              )}
              {form.accepts_crypto.length > 0 && (
                <div className="flex gap-2">
                  <dt className="font-semibold text-[var(--color-text-secondary)] w-28 flex-shrink-0">Accepts</dt>
                  <dd className="text-[var(--color-text-primary)]">{form.accepts_crypto.join(", ")}</dd>
                </div>
              )}
            </dl>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-[var(--color-border)] rounded-md font-semibold text-button text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmedSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-primary text-white rounded-md font-semibold text-button disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-caption text-[var(--color-text-secondary)]">
                By submitting, you agree to our <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms</a> and <a href="/legal/content-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Content Policy</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
