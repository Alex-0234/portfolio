-- Jediný fixture pro lokální vývoj: `npm run db:seed:local`.
--
-- Skutečné články sem nepatří - ty žijí v content/posts/*.md a nahrává je
-- `npm run posts:local`. Kdyby byl článek na obou místech, seed by přepsal
-- novější verzi z markdownu.
--
-- Tenhle draft je tu jen proto, aby šlo ověřit, že se rozepsané články na web
-- nepropisují. Není to migrace, proto leží mimo migrations/.

INSERT OR REPLACE INTO posts (slug, title, description, content, status, published_at, updated_at)
VALUES (
  'rozepsany-clanek',
  'Rozepsaný článek',
  'Tenhle se na webu zobrazit nesmí — slouží k ověření, že draft filtr funguje.',
  'Draft, který nikdy neprojde přes status filtr.',
  'draft',
  NULL,
  datetime('now')
);
