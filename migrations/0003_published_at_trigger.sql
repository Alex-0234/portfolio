-- Publikování přes `UPDATE posts SET status = 'published'` nechávalo
-- published_at na NULL. Článek pak neměl na webu datum a ORDER BY published_at
-- DESC ho hodilo na konec výpisu, i když byl nejnovější.

-- Datum se doplní jen když ještě žádné není. Odpublikování (published ->
-- draft) ho schválně nemaže - když článek vrátíš zpátky, drží si původní
-- datum vydání místo toho, aby vyskočil nahoru jako nový.
CREATE TRIGGER IF NOT EXISTS posts_set_published_at
AFTER UPDATE OF status ON posts
FOR EACH ROW
WHEN NEW.status = 'published' AND NEW.published_at IS NULL
BEGIN
  UPDATE posts SET published_at = datetime('now') WHERE id = NEW.id;
END;

-- článek vložený rovnou jako published dostane datum taky
CREATE TRIGGER IF NOT EXISTS posts_insert_published_at
AFTER INSERT ON posts
FOR EACH ROW
WHEN NEW.status = 'published' AND NEW.published_at IS NULL
BEGIN
  UPDATE posts SET published_at = datetime('now') WHERE id = NEW.id;
END;

-- Jednorázová oprava řádků, které vznikly ještě před triggerem. Týká se jen
-- rozbraného stavu "published bez data" - draftů se to nedotkne.
UPDATE posts
SET published_at = COALESCE(updated_at, datetime('now'))
WHERE status = 'published' AND published_at IS NULL;
