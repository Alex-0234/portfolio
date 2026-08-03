-- Cover obrázek doteď nesl jen URL. To má dva důsledky:
--
-- 1) Bez rozměrů si prohlížeč nemá jak rezervovat místo, takže se článek po
--    doskočení obrázku přeskládá. Layout shift (CLS) je jeden z Core Web
--    Vitals, takže to není jen kosmetika.
-- 2) Bez altu z obrázku nemá nic ani vyhledávání, ani čtečka obrazovky.
--
-- Všechny tři sloupce jsou volitelné - článek bez coveru je nechá na NULL a
-- šablona si poradí (alt spadne zpátky na název článku).
ALTER TABLE posts ADD COLUMN cover_image_alt TEXT;
ALTER TABLE posts ADD COLUMN cover_image_width INTEGER;
ALTER TABLE posts ADD COLUMN cover_image_height INTEGER;
