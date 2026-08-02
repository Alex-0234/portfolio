-- updated_at se dřív musel psát ručně do každého UPDATE, což se dřív nebo
-- později zapomene. Tyhle dva triggery to dopisují samy.

-- Podmínka `NEW.updated_at IS OLD.updated_at` znamená "UPDATE se updated_at
-- nesnažil změnit sám". Když si datum nastavíš ručně (třeba při importu
-- starých článků), trigger ho nepřepíše. `IS` místo `=` kvůli NULLům -
-- `NULL = NULL` je v SQL NULL, takže by porovnání nikdy neprošlo.
CREATE TRIGGER IF NOT EXISTS posts_set_updated_at
AFTER UPDATE ON posts
FOR EACH ROW
WHEN NEW.updated_at IS OLD.updated_at
BEGIN
  UPDATE posts SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- INSERT bez updated_at (typicky ruční vložení článku) dostane datum taky
CREATE TRIGGER IF NOT EXISTS posts_insert_updated_at
AFTER INSERT ON posts
FOR EACH ROW
WHEN NEW.updated_at IS NULL
BEGIN
  UPDATE posts SET updated_at = datetime('now') WHERE id = NEW.id;
END;
