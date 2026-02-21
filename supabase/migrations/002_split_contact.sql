-- ─── Split contact into phone + email ────────────────────────────────────────

ALTER TABLE stores
  ADD COLUMN phone text,
  ADD COLUMN email text;

-- Migrate existing contact data: split on ' / ', ' | ', ',', ';'
-- Parts containing '@' go to email, everything else to phone
UPDATE stores
SET
  phone = NULLIF(TRIM(
    COALESCE(
      (SELECT STRING_AGG(part, ' | ')
       FROM UNNEST(REGEXP_SPLIT_TO_ARRAY(contact, '\s*[/|,;]\s*')) AS part
       WHERE part <> '' AND part NOT LIKE '%@%'),
      ''
    )
  ), ''),
  email = NULLIF(TRIM(
    COALESCE(
      (SELECT STRING_AGG(part, ' | ')
       FROM UNNEST(REGEXP_SPLIT_TO_ARRAY(contact, '\s*[/|,;]\s*')) AS part
       WHERE part <> '' AND part LIKE '%@%'),
      ''
    )
  ), '')
WHERE contact IS NOT NULL;

ALTER TABLE stores DROP COLUMN contact;

-- Update the auto-apply edit trigger to use new columns
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
      phone           = COALESCE((v_sub.payload->>'phone')::text, phone),
      email           = COALESCE((v_sub.payload->>'email')::text, email)
    WHERE id = v_sub.store_id;

    UPDATE submissions SET status = 'applied' WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
