-- Blog schema. Spouští se přes `npm run db:migrate:local` / `npm run db:migrate`.
-- D1 je SQLite, takže DATETIME se reálně ukládá jako TEXT v ISO formátu.

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,        -- používá se v /blog/[slug]
  title TEXT NOT NULL,
  description TEXT,                 -- meta description / náhled na kartě
  content TEXT NOT NULL,            -- markdown
  cover_image_url TEXT,             -- ukazuje na objekt v R2
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at DATETIME,
  updated_at DATETIME
);

-- výpis /blog filtruje na status a řadí podle published_at, tenhle index
-- pokrývá obojí naráz
CREATE INDEX IF NOT EXISTS idx_posts_status_published
  ON posts (status, published_at DESC);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- opačný směr než PRIMARY KEY - pro dotaz "všechny články s tímhle tagem"
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags (tag_id);
