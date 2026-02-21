-- ─── Types ───────────────────────────────────────────────────────────────────
CREATE TYPE verification_status AS ENUM (
  'seed_confirmed',
  'seed_partial',
  'community_verified',
  'unverified',
  'flagged',
  'closed'
);

-- ─── Stores ──────────────────────────────────────────────────────────────────
CREATE TABLE stores (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_name       text NOT NULL,
  street_address      text,
  city                text NOT NULL,
  country             text NOT NULL,
  lat                 float8 NOT NULL,
  lng                 float8 NOT NULL,
  is_approximate      boolean NOT NULL DEFAULT false,
  website             text,
  opening_hours       text,
  contact             text,
  accepts_crypto      text[] DEFAULT '{}',
  verification_status verification_status NOT NULL DEFAULT 'unverified',
  source              text NOT NULL DEFAULT 'community',
  confirm_count       int NOT NULL DEFAULT 0,
  flag_count          int NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- ─── Votes ───────────────────────────────────────────────────────────────────
CREATE TABLE votes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id   uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  type       text NOT NULL CHECK (type IN ('confirm','flag_closed','flag_wrong','flag_no_crypto')),
  ip_hash    text NOT NULL,
  note       text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (store_id, ip_hash, type)
);

-- ─── Submissions ─────────────────────────────────────────────────────────────
CREATE TABLE submissions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type          text NOT NULL CHECK (type IN ('new_store','edit')),
  store_id      uuid REFERENCES stores(id) ON DELETE SET NULL,
  payload       jsonb NOT NULL,
  ip_hash       text NOT NULL,
  confirm_count int NOT NULL DEFAULT 0,
  status        text NOT NULL DEFAULT 'live' CHECK (status IN ('live','applied','rejected_spam')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX idx_stores_country ON stores(country);
CREATE INDEX idx_stores_city ON stores(city);
CREATE INDEX idx_stores_status ON stores(verification_status);
CREATE INDEX idx_stores_lat_lng ON stores(lat, lng);
CREATE INDEX idx_votes_store_id ON votes(store_id);
CREATE INDEX idx_submissions_store_id ON submissions(store_id);
CREATE INDEX idx_submissions_status ON submissions(status);

-- ─── Trigger: updated_at ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stores_updated_at
  BEFORE UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Trigger: recalculate store status after vote ────────────────────────────
CREATE OR REPLACE FUNCTION recalculate_store_status()
RETURNS TRIGGER AS $$
DECLARE
  v_confirm_count int;
  v_flag_count    int;
  v_new_status    verification_status;
  v_current_status verification_status;
BEGIN
  SELECT
    COUNT(*) FILTER (WHERE type = 'confirm'),
    COUNT(*) FILTER (WHERE type IN ('flag_closed','flag_wrong','flag_no_crypto'))
  INTO v_confirm_count, v_flag_count
  FROM votes
  WHERE store_id = NEW.store_id;

  SELECT verification_status INTO v_current_status
  FROM stores WHERE id = NEW.store_id;

  -- Determine new status (seed statuses are only upgraded, not overridden downward)
  IF v_flag_count >= 5 THEN
    v_new_status := 'closed';
  ELSIF v_flag_count >= 3 THEN
    v_new_status := 'flagged';
  ELSIF v_confirm_count >= 3 THEN
    v_new_status := 'community_verified';
  ELSIF v_current_status IN ('seed_confirmed','seed_partial') THEN
    v_new_status := v_current_status; -- preserve seed status
  ELSE
    v_new_status := 'unverified';
  END IF;

  UPDATE stores
  SET
    confirm_count       = v_confirm_count,
    flag_count          = v_flag_count,
    verification_status = v_new_status
  WHERE id = NEW.store_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER votes_recalculate_status
  AFTER INSERT ON votes
  FOR EACH ROW EXECUTE FUNCTION recalculate_store_status();

-- ─── Trigger: auto-apply edit submissions with 2+ confirmations ───────────────
CREATE OR REPLACE FUNCTION maybe_apply_edit_submission()
RETURNS TRIGGER AS $$
DECLARE
  v_sub submissions%ROWTYPE;
BEGIN
  SELECT * INTO v_sub FROM submissions WHERE id = NEW.id;

  IF v_sub.type = 'edit' AND v_sub.confirm_count >= 2 AND v_sub.status = 'live' AND v_sub.store_id IS NOT NULL THEN
    UPDATE stores SET
      operator_name   = COALESCE((v_sub.payload->>'operator_name')::text, operator_name),
      street_address  = COALESCE((v_sub.payload->>'street_address')::text, street_address),
      city            = COALESCE((v_sub.payload->>'city')::text, city),
      country         = COALESCE((v_sub.payload->>'country')::text, country),
      website         = COALESCE((v_sub.payload->>'website')::text, website),
      opening_hours   = COALESCE((v_sub.payload->>'opening_hours')::text, opening_hours),
      contact         = COALESCE((v_sub.payload->>'contact')::text, contact)
    WHERE id = v_sub.store_id;

    UPDATE submissions SET status = 'applied' WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER submissions_maybe_apply
  AFTER UPDATE OF confirm_count ON submissions
  FOR EACH ROW EXECUTE FUNCTION maybe_apply_edit_submission();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- stores: public read only
CREATE POLICY "stores_public_read" ON stores FOR SELECT USING (true);

-- votes: public insert only (dedup via UNIQUE constraint)
CREATE POLICY "votes_public_insert" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "votes_public_read" ON votes FOR SELECT USING (true);

-- submissions: public insert + read
CREATE POLICY "submissions_public_insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "submissions_public_read" ON submissions FOR SELECT USING (true);
