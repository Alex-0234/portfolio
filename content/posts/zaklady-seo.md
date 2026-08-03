---
title: Základy SEO, bez kterých se web dnes neobejde
description: SEO faktory seřazené podle priority – od toho, bez čeho weby doslova nefungují, až po pokročilá vylepšení.
tags: [seo, weby]
status: published
---

## Než začneme: co znamená "priorita" v SEO

SEO se často podává jako seznam sta věcí, které je potřeba udělat. Jenže ty věci nemají zdaleka stejnou váhu. Některé jsou podmínka, bez které se stránka do vyhledávání vůbec nedostane. Jiné jsou doladění, které se projeví až ve chvíli, kdy máte všechno ostatní hotové.

Google tomu prvnímu říká *Search Essentials*. Jsou to pravidla, bez kterých se stránka do výsledků nedostane bez ohledu na to, jak dobrý má obsah. Rychlost, texty i zpětné odkazy na tom teprve staví. [Zdroj: Google Search Central](https://developers.google.com/search/docs/essentials)

Seřadil jsem to tak, jak to sám procházím u nového klienta: od "bez tohohle vás Google prostě nenajde" až po "tímhle získáte náskok před konkurencí".

## Priorita 1 — Aby vás Google vůbec našel

Základ základů. Pokud nefunguje tahle vrstva, na ničem dalším nezáleží. Google váš web buď nenajde, nebo ho nezaindexuje.

- **robots.txt** — nesmí omylem blokovat části webu, které chcete mít ve vyhledávání.
- **Meta robots / noindex** — ověřte, že žádná důležitá stránka nemá omylem `noindex`. Klasika je testovací verze webu, ze které se značka zapomene odstranit při ostrém nasazení.
- **XML sitemap** — seznam adres, který Googlu předáte přes Search Console.
- **Jedna URL = jeden obsah** — žádné duplicitní verze téže stránky bez canonical tagu.

To poslední zní jako detail, ale u starších webů na něj narážím pravidelně. Stačí, aby stejná stránka byla dostupná s `www` i bez něj, a Google najednou řeší, kterou z nich má ukázat.

> Pokud stránka není v indexu, nezachrání ji žádné jiné SEO opatření. Nejdřív si v Google Search Console ověřte, že vás Google vůbec vidí. Teprve potom řešte cokoliv dalšího.

## Priorita 2 — HTTPS a technické zdraví

- **HTTPS** — dnes už není volitelné. Na některých doménách (třeba `.dev`) si ho prohlížeče vynucují samy a Google ho dlouhodobě bere jako signál důvěryhodnosti.
- **Mobile-first indexing** — Google hodnotí primárně mobilní verzi stránky, ne desktopovou. Pokud web není responzivní, přicházíte rovnou o základ.
- **Core Web Vitals** — tři metriky, kterými Google měří, jak se stránka chová pod rukama:
  - **LCP** (Largest Contentful Paint) — jak rychle se načte hlavní obsah,
  - **INP** (Interaction to Next Paint) — jak rychle stránka odpoví na klik nebo ťuknutí,
  - **CLS** (Cumulative Layout Shift) — jestli obsah při načítání "neposkakuje".

CLS je z té trojice nejvíc vidět. Je to ten moment, kdy chcete kliknout na odkaz, doloží se obrázek nad ním a vy místo toho trefíte něco úplně jiného.

## Priorita 3 — On-page základy

Věci, které uděláte jednou na stránku a pak fungují dlouhodobě:

| Prvek | K čemu slouží |
| --- | --- |
| `<title>` | Nejsilnější on-page signál a zároveň text v náhledu na Googlu |
| `meta description` | SEO neovlivňuje přímo, ale hodně ovlivňuje proklikovost |
| Nadpisová hierarchie (H1–H6) | Pomáhá Googlu i čtenáři pochopit strukturu stránky |
| Čisté URL | `/sluzby/tvorba-webu` je lepší než `/index.php?id=42` |
| Alt text u obrázků | Přístupnost a viditelnost v Google Images |
| Interní prolinkování | Rozvádí "sílu" mezi stránkami a pomáhá crawlerům |

Každá stránka by měla mít **unikátní** title i description. Ne zkopírovanou šablonu ze stránky vedle, kde se mění jen jedno slovo.

## Priorita 4 — Obsah, který odpovídá na skutečnou otázku

Tady se dnešní SEO nejvíc liší od toho, co fungovalo před pár lety. Google čím dál víc hodnotí, jestli obsah **opravdu odpoví** na to, co člověk hledal. Ne jestli obsahuje správný počet klíčových slov.

Pro tuhle stránku věci používá Google zkratku **E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness, tedy zkušenost, odbornost, autorita a důvěryhodnost. Pro malou firmu nebo freelancera to prakticky znamená tři věci:

- pište o tom, čemu skutečně rozumíte, klidně i z vlastní zkušenosti z projektů,
- podepište se pod obsah, protože anonymní stránky bez autora mají zpravidla nižší důvěryhodnost,
- odpovězte na otázku pořádně, ne odbytě ve dvou větách.

Zní to samozřejmě. Přesto je většina firemních blogů psaná tak, aby se něco publikovalo, ne aby to někomu pomohlo. Rozdíl je poznat na první pohled.

## Priorita 5 — Autorita a zpětné odkazy

Zpětné odkazy, tedy odkazy z jiných webů na ten váš, zůstávají silným signálem důvěryhodnosti. Kvalita ale drtivě vyhrává nad množstvím. Jeden odkaz z relevantního a důvěryhodného webu má větší váhu než desítky odkazů z náhodných katalogů.

Pro freelancera nebo malou firmu to v praxi znamená:

- profil na Google Business Profile, což je obzvlášť důležité při lokálním cílení,
- reference a případové studie, na které se dá odkázat,
- spolupráci s lokálními weby a partnery, kteří vás zmíní a prolinkují.

## Priorita 6 — Nadstavba

Tohle už nejsou základy, ale vyplatí se o nich vědět:

- **Structured data / Schema.org (JSON-LD)** — pomáhá Googlu zobrazit rozšířené výsledky, tedy hvězdičky, ceny nebo rozbalené otázky přímo ve vyhledávání.
- **GEO (Generative Engine Optimization)** — nová disciplína okolo toho, aby vás citovaly AI vyhledávače a AI přehledy, ne jen klasický Google. Zatím se teprve formuje, ale ignorovat se to už nedá.

## Shrnutí — kudy začít

1. Ověřte crawlability a indexaci v Search Console
2. HTTPS, mobile-first a Core Web Vitals
3. Title, description, nadpisy a čisté URL na každé stránce
4. Obsah, který skutečně odpoví na otázku
5. Zpětné odkazy a lokální autorita
6. Structured data a GEO jako nadstavba

Pořadí není náhodné. Nemá smysl řešit strukturovaná data na webu, který Google zatím nemá v indexu.

Pokud chcete vědět, jak si na tom stojí konkrétně váš web, mrkněte na [služby a ceník](/offers).
