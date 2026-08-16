-- Optional: run on JustBookMe Supabase once that project is dedicated.
-- After this, set JUSTBOOKME_BOOK_URL=https://justbookme.ca/api/public/book
-- (Still requires matching services + onboarding_completed on those rows.)

INSERT INTO businesses (name, slug, timezone, default_language, plan, onboarding_completed)
VALUES
  ('Sahib Pointe-Claire', 'sahib-pointe-claire', 'America/Montreal', 'en', 'trial', true),
  ('Sahib Dorval', 'sahib-dorval', 'America/Montreal', 'en', 'trial', true)
ON CONFLICT (slug) DO UPDATE
SET onboarding_completed = true;
