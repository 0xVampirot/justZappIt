# JustZappIt ⚡️

A community-driven, open-source directory of physical crypto exchange shops worldwide. Find trusted locations to safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you.

Live at: **[justzappit.xyz](https://justzappit.xyz)**

---

## The Mission

While centralized and decentralized online exchanges dominate the crypto space, there remains a strong need for physical, in-person locations to trade crypto for fiat (and vice versa). Finding reliable, verified physical crypto desks, OTC counters, or teller shops is difficult. 

**JustZappIt** solves this by crowdsourcing and verifying physical crypto locations globally. We prioritize privacy, accuracy, and community moderation.

## Features

- **Interactive Global Map:** Built with Leaflet and OpenStreetMap for fast, privacy-respecting mapping.
- **Community Verification:** Users can confirm or flag stores. Markers change color based on their verification score.
- **Privacy-First Anti-Spam:** Honeypots, time-traps, and SHA-256 IP hashing. We never store raw IP addresses.
- **Responsive Design:** Seamless experience across desktop and mobile devices.

## High-Level Roadmap

We are continuously evolving JustZappIt. Here is our high-level roadmap:

- [x] **Phase 1: Core Directory & Map** — Initial dataset, interactive map, and basic filtering.
- [x] **Phase 2: Community Moderation** — Ability for users to submit, confirm, and flag stores. Privacy-preserving anti-spam measures.
- [ ] **Phase 3: Store Operator Claiming** — Allow shop owners to verify ownership, update operating hours, and list live rates.
- [ ] **Phase 4: Ratings & Written Reviews** — Let users leave detailed feedback on their trading experience.
- [ ] **Phase 5: Localized Store Chats** — "Join Store Chat" feature for real-time peer-to-peer discussions and OTC rate checking.
- [ ] **Phase 6: Mobile Application** — Dedicated native iOS and Android apps.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Mapping:** [Leaflet](https://leafletjs.com/) + React-Leaflet
- **Icons:** [Lucide React](https://lucide.dev/)

---

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

---

## How to Contribute

We welcome contributions of all sizes! Whether it's adding new features, fixing bugs, or improving documentation, your help is appreciated.

### Getting Started

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/justZappIt.git
   cd justZappIt
   npm install --workspace=apps/web
   ```

2. **Environment Variables**
   For UI and frontend development, you can run the app using our public staging environment (if available) or mock data. Copy the example env file:
   ```bash
   cp .env.example apps/web/.env.local
   ```
   *Note: If you are working on features that require database access, please reach out to the core team via issues/discussions to coordinate.*

3. **Run the Dev Server**
   ```bash
   cd apps/web
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Contribution Workflow

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and that the Next.js build succeeds (`npm run build`) before opening a PR.

---

## Marker Legend Reference

For developers working on the UI, here is how our map markers are color-coded based on community trust:

| Marker | Status | Meaning |
|---|---|---|
| 🟢 Green | `seed_confirmed` | Verified in original research |
| 🔵 Blue | `community_verified` | 3+ community confirmations |
| 🟡 Yellow | `seed_partial` / `unverified` | Incomplete or newly added |
| ⚫ Grey | Any + `is_approximate` | City-centre estimate (needs exact address) |
| 🟠 Orange | `flagged` | 3+ issue reports |
| *(hidden)* | `closed` | Toggle "Show closed" in filters to reveal |

---

## Disclaimer

**JustZappIt is a community-driven, crowdsourced directory.** The information provided on this platform (including store locations, operating hours, and accepted cryptocurrencies) is submitted by users and is not independently verified by the core team. 

- **Use at your own risk:** Always conduct your own research and exercise extreme caution when visiting physical locations or executing peer-to-peer/over-the-counter (OTC) trades.
- **No Liability:** The creators, contributors, and maintainers of JustZappIt are not responsible or liable for any lost funds, scams, physical harm, or inaccuracies related to the locations listed on this platform or the use of this software.
- **Not Financial Advice:** Nothing in this project constitutes financial, legal, or investment advice.

---

## License

This project is open-source and available under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

This means you are free to use, modify, and distribute the code. However, if you modify it and deploy it as a network service, you must make your modified source code available to users of that service under the same license.

