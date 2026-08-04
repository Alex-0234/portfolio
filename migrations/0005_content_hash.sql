-- `npm run posts` doteď přepsal řádek při každém spuštění, i když se v .md
-- souboru nezměnilo vůbec nic. Trigger z 0002 pak poslušně posunul updated_at,
-- takže opětovné nahrání beze změny vypadalo navenek jako přepsaný článek.
-- Datum aktualizace se tím stalo bezcenným - a Google umělé osvěžování dat
-- explicitně nedoporučuje.
--
-- Řešení: publish.mjs spočítá z markdownu otisk (sha256 nad titulkem, popiskem,
-- obsahem, coverem, statusem a seřazenými tagy) a uloží ho sem. Upsert pak má
-- `WHERE posts.content_hash IS NOT excluded.content_hash`, takže se řádek při
-- shodě otisků vůbec nepřepíše.
--
-- Trigger z 0002 se schválně nemění. Když se UPDATE neprovede, AFTER UPDATE
-- trigger se nespustí - datum tedy zůstane stát samo od sebe a ruční zásahy
-- přes `db:console:local` se chovají pořád stejně jako dřív.
ALTER TABLE posts ADD COLUMN content_hash TEXT;

-- Články vložené před touhle migrací mají content_hash na NULL, takže je první
-- `npm run posts` po migraci jednou bumpne. Tomu se nedá vyhnout, sha256 se v
-- SQLite spočítat nedá. Od druhého spuštění dál už datum sedí.
