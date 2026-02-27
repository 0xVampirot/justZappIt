# Handover: Remaining Work

> **Date:** 2026-02-25
> **Status:** Codebase explored and fully understood; implementation not yet started.

---

## Overview

The following tasks were scoped and researched but remain unimplemented. This document captures the full context, exact file paths, design decisions, and implementation details for each so the next developer can hit the ground running.

---

## Task 1: Create CODE_OF_CONDUCT.md

**Status:** Not started
**Why:** `CONTRIBUTING.md` and `SECURITY.md` already exist and are complete. Only `CODE_OF_CONDUCT.md` is missing.

### What to do

Create `CODE_OF_CONDUCT.md` in the project root using the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) — the industry standard for open-source projects. Customize the enforcement contact to `security@justzappit.xyz` (consistent with `SECURITY.md`).

### Key points

- Keep it standard — don't reinvent the wheel
- Add a link to it from `CONTRIBUTING.md` (line ~74, near the "Security Vulnerabilities" section):
  ```markdown
  ## Code of Conduct

  This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
  ```

---

## Task 2: Add Pagination to Stores API + Update MapPage Client

**Status:** Not started — this is the largest task
**Files involved:**

| File | Role |
|------|------|
| `apps/web/app/api/stores/route.ts` | API endpoint (currently returns all stores, no pagination) |
| `apps/web/components/MapPage.tsx` | Client component (fetches from `/api/stores` on mount) |
| `apps/web/app/page.tsx` | Server component (fetches initial stores directly from Supabase) |
| `apps/web/lib/database.types.ts` | TypeScript types (no changes needed) |

### Current behavior

**API (`apps/web/app/api/stores/route.ts`):**
```typescript
// Fetches ALL stores in a single query, no pagination
const { data, error } = await supabase
  .from("stores")
  .select("*")
  .in("verification_status", ["unverified", "seed_confirmed", "seed_partial", "community_verified", "flagged"])
  .order("operator_name");

return NextResponse.json(data); // Returns Store[]
```

**Client (`components/MapPage.tsx`, lines 84-98):**
```typescript
// Single fetch, expects flat Store[] response
fetch(`/api/stores?_t=${Date.now()}`)
  .then((r) => r.json())
  .then((data: Store[]) => {
    if (Array.isArray(data)) setStores(data);
  })
```

**Server page (`apps/web/app/page.tsx`, lines 22-27):**
```typescript
// Also fetches ALL stores directly from Supabase (no API route)
const { data, error } = await client
  .from("stores")
  .select("*")
  .order("operator_name");
```

### Recommended implementation

#### 2a. API endpoint — add offset-based pagination

Update `apps/web/app/api/stores/route.ts`:

```typescript
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
```

**Design notes:**
- Supabase `.range(from, to)` is inclusive on both ends — so `range(0, 49)` returns 50 rows
- `{ count: "exact", head: true }` fetches count without row data (one extra query but lightweight)
- `MAX_LIMIT = 200` prevents clients from bypassing pagination entirely
- Response shape changes from `Store[]` to `{ data: Store[], pagination: {...} }`

#### 2b. Client — fetch all pages for map rendering

The map needs **all** stores to render markers. Update the `useEffect` in `components/MapPage.tsx` (lines 84-98) to iterate through pages:

```typescript
useEffect(() => {
  setIsLoading(true);
  setFetchError(false);

  async function fetchAllStores() {
    const allStores: Store[] = [];
    let page = 1;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        const res = await fetch(`/api/stores?page=${page}&limit=200&_t=${Date.now()}`);
        const json = await res.json();

        if (!res.ok || json.error) {
          throw new Error(json.error ?? "Failed to fetch");
        }

        allStores.push(...json.data);
        totalPages = json.pagination.totalPages;
        page++;
      }

      console.log("[Client Fetch] Got", allStores.length, "stores across", page - 1, "page(s)");
      setStores(allStores);
    } catch (err) {
      console.error("[Client Fetch] Error:", err);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }

  fetchAllStores();
}, []);
```

#### 2c. Server page — no required changes

`apps/web/app/page.tsx` fetches directly from Supabase (not via the API route), so it doesn't need pagination changes for initial SSR. It provides `initialStores` as a hydration prop before the client fetch replaces them.

**Optional improvement:** You could paginate the server-side fetch too, but since it's SSR for SEO/initial paint and the dataset is manageable, it's low priority.

### Backward compatibility warning

The API response shape changes from `Store[]` to `{ data, pagination }`. If any other consumers exist (external scripts, other pages), they'll need updating. Grep for `/api/stores` to find all call sites:

```bash
grep -r "/api/stores" apps/web/
```

Currently only `MapPage.tsx` calls this endpoint.

---

## Task 3: Add `.env.example` to `apps/web` and `packages/db`

**Status:** Not started
**Context:** A root `.env.example` exists, but `apps/web/` and `packages/db/` have no example files. Contributors working in those packages won't know what env vars are needed.

### 3a. Create `apps/web/.env.example`

This should mirror the root `.env.example` since the web app consumes all the vars:

```env
# ─── Supabase ───────────────────────────────────────────────────────────────
# Get these from: https://supabase.com → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# ─── IP Hashing ─────────────────────────────────────────────────────────────
# Any random secret string, e.g. run: openssl rand -hex 32
IP_HASH_SALT=REPLACE_WITH_RANDOM_SECRET

# ─── hCaptcha ────────────────────────────────────────────────────────────────
# Register free at: https://hcaptcha.com
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=REPLACE_WITH_HCAPTCHA_SITE_KEY
HCAPTCHA_SECRET_KEY=REPLACE_WITH_HCAPTCHA_SECRET_KEY

# ─── Social & Contact ─────────────────────────────────────────────────────────
NEXT_PUBLIC_X_URL=https://x.com/YourHandleHere
NEXT_PUBLIC_CONTACT_EMAIL=hello@justzappit.xyz

# ─── App URL ─────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Note: `NEXT_PUBLIC_APP_URL` should default to `localhost:3000` for local dev (root `.env.example` uses the production URL).

### 3b. Create `packages/db/.env.example`

The seed script (`packages/db/seed.ts`) only needs two vars (confirmed by reading the file):

```env
# ─── Supabase (for seed script) ─────────────────────────────────────────────
# Get these from: https://supabase.com → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### 3c. Git housekeeping

Ensure `.gitignore` excludes `.env` and `.env.local` but **not** `.env.example`. The current `.gitignore` should already handle this, but verify.

---

## Task 4: Add Database Setup Documentation to README.md

**Status:** Not started
**Context:** The README's "How to Contribute" section (line 45) tells users to copy `.env.example` but has no instructions for actually setting up the database. `CONTRIBUTING.md` references a `README.md#database-setup` anchor that **does not exist yet** (line 29 of CONTRIBUTING.md).

### What to add

Insert a new `## Database Setup` section in `README.md` between the "Tech Stack" section (line 43) and "How to Contribute" (line 45). Here's the content:

```markdown
## Database Setup

JustZappIt uses [Supabase](https://supabase.com/) (hosted PostgreSQL) as its database.

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and create a free account.
2. Create a new project. Note your **Project URL**, **anon (public) key**, and **service_role (secret) key** from **Project Settings → API**.

### 2. Run Migrations

Apply the SQL migrations in order using the Supabase SQL Editor (**SQL Editor → New Query**) or the Supabase CLI:

```bash
# If using the Supabase CLI:
supabase db push
```

Or manually run each file in the SQL Editor:

1. `supabase/migrations/001_schema.sql` — Core tables (stores, votes, submissions), indexes, triggers, RLS policies
2. `supabase/migrations/002_split_contact.sql` — Splits `contact` column into `phone` and `email`
3. `supabase/migrations/003_rate_limits.sql` — Rate limiting table
4. `supabase/migrations/004_atomic_rate_limit.sql` — Atomic rate-limit RPC function

### 3. Seed Data (Optional)

To populate the database with the initial store dataset:

```bash
cp .env.example packages/db/.env
# Fill in your Supabase URL and service role key
npm run seed
```

This reads from the source spreadsheet, geocodes addresses via Nominatim, and inserts stores into your Supabase project.

### 4. Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example apps/web/.env.local
```

See [`.env.example`](.env.example) for the full list of required variables.
```

### Where exactly to insert

- After line 43 (`---` following Tech Stack)
- Before line 45 (`## How to Contribute`)
- This creates the `#database-setup` anchor that `CONTRIBUTING.md` already links to

---

## Task 5: Verify Build Succeeds

**Status:** Not started — do this last, after all other changes.

### Commands to run

```bash
# From project root:
npm run build              # Next.js production build
npm run lint --workspace=apps/web   # ESLint checks
```

### What to watch for

- **TypeScript errors** — The pagination API response shape change means any code expecting `Store[]` from `/api/stores` will break at compile time if typed properly
- **ESLint** — Strict mode is enabled; unused variables or `any` types will fail
- **Dynamic import** — `MapPage` uses `dynamic(() => import(...), { ssr: false })` which can hide SSR-related build errors; test the dev server too
- **Environment variables** — The build will succeed even with placeholder env vars (the `page.tsx` `getStores()` function gracefully returns `[]` if Supabase isn't configured)

---

## Project Architecture Quick Reference

```
justZappIt/
├── apps/web/                    # Next.js 14 App Router
│   ├── app/
│   │   ├── api/stores/route.ts  # GET /api/stores  ← PAGINATION GOES HERE
│   │   ├── api/votes/route.ts   # POST /api/votes
│   │   ├── api/submissions/     # POST /api/submissions
│   │   ├── api/geocode/         # GET /api/geocode (Nominatim proxy)
│   │   ├── page.tsx             # Homepage (SSR store fetch → MapPage)
│   │   ├── add/                 # /add store form
│   │   ├── store/[id]/          # /store/:id detail page
│   │   └── legal/               # Legal pages
│   ├── components/
│   │   ├── MapPage.tsx          # Main map client component ← FETCH UPDATE
│   │   └── map/
│   │       ├── MapView.tsx      # Leaflet rendering
│   │       ├── StorePanel.tsx   # Store detail + voting
│   │       ├── FilterBar.tsx    # Filter controls
│   │       ├── SearchBar.tsx    # Geocode search
│   │       ├── StoreList.tsx    # Sidebar store list
│   │       └── MarkerIcons.ts   # Map marker SVGs
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client init
│   │   ├── database.types.ts    # Generated DB types + Store export
│   │   ├── filterStores.ts      # Client-side filter logic
│   │   ├── ipHash.ts            # SHA-256 IP hashing
│   │   └── rateLimit.ts         # Rate limit helpers
│   └── .env.local               # Actual env vars (gitignored)
├── packages/db/
│   ├── seed.ts                  # XLSX → Nominatim → Supabase seeder
│   ├── package.json             # Dependencies: xlsx, supabase-js, dotenv
│   └── .env                     # Seed script env vars (gitignored)
├── supabase/migrations/
│   ├── 001_schema.sql           # Core schema + triggers + RLS
│   ├── 002_split_contact.sql    # contact → phone + email
│   ├── 003_rate_limits.sql      # rate_limits table
│   └── 004_atomic_rate_limit.sql # Atomic check_rate_limit() RPC
├── .env.example                 # Root env template
├── CONTRIBUTING.md              # Contribution guidelines (exists)
├── SECURITY.md                  # Security policy (exists)
├── CODE_OF_CONDUCT.md           # ← NEEDS CREATION
├── LICENSE                      # MIT
└── README.md                    # ← NEEDS DATABASE SETUP SECTION
```

---

## Task Priority / Execution Order

| Order | Task | Risk | Effort |
|-------|------|------|--------|
| 1 | CODE_OF_CONDUCT.md | None | ~5 min |
| 2 | `.env.example` files | None | ~5 min |
| 3 | README database setup section | None | ~10 min |
| 4 | Stores API pagination | Medium (response shape change) | ~20 min |
| 5 | MapPage client update | Medium (depends on task 4) | ~15 min |
| 6 | Build verification | — | ~5 min |

Tasks 1-3 are independent and can be done in parallel. Tasks 4-5 must be sequential (API first, then client). Task 6 is last.
