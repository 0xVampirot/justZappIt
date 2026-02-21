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
- [ ] **Phase 6: Mobile Application** — Dedicated iOS and Android apps using React Native/Expo.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Mapping:** [Leaflet](https://leafletjs.com/) + React-Leaflet
- **Icons:** [Lucide React](https://lucide.dev/)

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

## License

This project is open-source and available under the [MIT License](LICENSE).
