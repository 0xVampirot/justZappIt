-- SPDX-License-Identifier: AGPL-3.0-only
-- Additional indexes for query performance and cleanup efficiency

-- Votes: speed up flag cooldown lookups by ip_hash + created_at
CREATE INDEX idx_votes_ip_hash_created ON votes(ip_hash, created_at);

-- Rate limits: speed up expired row cleanup
CREATE INDEX idx_rate_limits_reset_at ON rate_limits(reset_at);
