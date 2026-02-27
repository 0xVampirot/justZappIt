# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in JustZappIt, please report it responsibly. **Do not open a public GitHub issue.**

### How to Report

Email your findings to: **security@justzappit.xyz**

Include:
- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fixes (optional)

### Response Timeline

- **Acknowledgement:** Within 72 hours
- **Initial assessment:** Within 1 week
- **Fix or mitigation:** Depends on severity, but we aim for prompt resolution

### Scope

The following areas are in scope:

- Authentication and authorization bypass
- Rate limiting circumvention
- Row Level Security (RLS) policy bypass
- Cross-site scripting (XSS)
- SQL injection
- Sensitive data exposure
- Server-side request forgery (SSRF)

### Out of Scope

- Denial-of-service attacks against third-party services (Supabase, hCaptcha, Nominatim)
- Social engineering
- Issues in dependencies that are already publicly disclosed (please check CVE databases first)
- Vulnerabilities requiring physical access to the server

## Security Architecture

JustZappIt is designed with privacy and security in mind:

- **No user accounts** — minimizes attack surface and data collection
- **IP hashing** — SHA-256 with a secret salt; raw IPs are never stored
- **Row Level Security** — all database tables use Supabase RLS policies
- **Rate limiting** — atomic PostgreSQL-level rate limiting to prevent abuse
- **hCaptcha** — server-side verification on all write endpoints
- **Content Security Policy** — restrictive CSP headers with explicit allowlists
