-- ─── Rate Limits ───────────────────────────────────────────────────────────────

CREATE TABLE rate_limits (
  ip_hash text PRIMARY KEY,
  action_count int NOT NULL DEFAULT 1,
  reset_at timestamptz NOT NULL
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
-- No public policies, as this table is only accessed via the service role key from the server
