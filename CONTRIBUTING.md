# Contributing to JustZappIt

Thank you for your interest in contributing! Whether it's fixing a bug, adding a feature, or improving documentation — every contribution helps.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later
- A [Supabase](https://supabase.com/) project (for database features)
- An [hCaptcha](https://hcaptcha.com/) account (for anti-spam features)

## Local Setup

1. **Fork & clone** the repository:
   ```bash
   git clone https://github.com/your-username/justZappIt.git
   cd justZappIt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example apps/web/.env.local
   ```
   Fill in the values — see the [Database Setup](#database-setup) section in the README for Supabase configuration.

4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

> **Note:** If you are working on UI-only changes, the app will gracefully degrade without a database connection (showing an empty map).

## Database Setup

See the [Database Setup](README.md#database-setup) section in the README for instructions on creating a Supabase project and running migrations.

## Branch Naming

- `feature/description` — New features
- `fix/description` — Bug fixes
- `docs/description` — Documentation changes

## Pull Request Process

1. Create a branch from `main`.
2. Make your changes.
3. Ensure `npm run build` succeeds.
4. Ensure `npm run lint --workspace=apps/web` passes.
5. Open a Pull Request with a clear description of what changed and why.

## Code Style

- Follow existing patterns in the codebase.
- TypeScript strict mode is enabled — no `any` types unless unavoidable.
- Use Zod schemas for runtime validation on API endpoints.
- ESLint is configured via `apps/web/.eslintrc.json`.

## Reporting Bugs

Open a [GitHub Issue](https://github.com/0xVampirot/justZappIt/issues) with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information (if relevant)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Security Vulnerabilities

Please **do not** open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md) for our responsible disclosure process.
