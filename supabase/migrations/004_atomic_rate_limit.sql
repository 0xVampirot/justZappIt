-- SPDX-License-Identifier: AGPL-3.0-only
-- ─── Atomic Rate Limit RPC ──────────────────────────────────────────────────
-- Replaces the check-then-act pattern in application code with a single
-- atomic INSERT ... ON CONFLICT ... DO UPDATE ... RETURNING, eliminating the
-- race condition where concurrent requests could read the same stale
-- action_count and bypass the rate limit.

CREATE OR REPLACE FUNCTION check_rate_limit(
  p_ip_hash text,
  p_max_actions int DEFAULT 10,
  p_window_ms int DEFAULT 86400000
)
RETURNS TABLE(allowed boolean, remaining int) AS $$
DECLARE
  v_count int;
BEGIN
  -- Opportunistic cleanup: prune expired rows ~5% of the time
  IF random() < 0.05 THEN
    DELETE FROM rate_limits WHERE reset_at < now();
  END IF;

  -- Atomic upsert: insert new row or increment existing, reset if expired
  INSERT INTO rate_limits (ip_hash, action_count, reset_at)
  VALUES (
    p_ip_hash,
    1,
    now() + make_interval(secs => p_window_ms / 1000.0)
  )
  ON CONFLICT (ip_hash) DO UPDATE
    SET
      action_count = CASE
        WHEN rate_limits.reset_at < now() THEN 1
        ELSE rate_limits.action_count + 1
      END,
      reset_at = CASE
        WHEN rate_limits.reset_at < now()
          THEN now() + make_interval(secs => p_window_ms / 1000.0)
        ELSE rate_limits.reset_at
      END
  RETURNING rate_limits.action_count INTO v_count;

  allowed := v_count <= p_max_actions;
  remaining := GREATEST(p_max_actions - v_count, 0);
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
