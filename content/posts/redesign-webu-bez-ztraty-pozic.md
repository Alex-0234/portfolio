---
title: Redesign webu bez ztráty pozic
description: Nový web umí přes noc smazat roky práce ve vyhledávání. Kdy má redesign smysl, co se při něm nejčastěji rozbije a jak převést staré adresy tak, aby o tom Google věděl.
tags: [weby, seo]
status: draft
published_at:
updated_at:
---

## Nejdřív otázka, jestli vůbec

Redesign se často řeší jako otázka vkusu — web se majiteli přestal líbit. To je legitimní důvod, ale sám o sobě špatný, protože z něj nevyplývá, co se má vlastně změnit.

Trh je v Česku nasycený. Vlastní web mělo v roce 2025 **82,8 %** firem od deseti zaměstnanců výš a to číslo se drží prakticky beze změny od roku 2015. [Zdroj: ČSÚ](https://csu.gov.cz/ict-v-podnicich) Většina projektů, které dnes vznikají, tedy nejsou nové weby. Jsou to náhrady něčeho, co už roky běží — a co za tu dobu nasbíralo pozice ve vyhledávání, odkazy a adresy uložené v záložkách.

Rozumné důvody pro redesign vypadají takhle:

- web není použitelný na mobilu, kde dnes chodí většina návštěvnosti,
- nejde na něm bez vývojáře změnit ani telefonní číslo,
- neprochází Core Web Vitals a je to znát,
- běží na technologii, která už nedostává bezpečnostní aktualizace,
- neodpovídá tomu, co firma dnes dělá,
- nepřináší poptávky, přestože návštěvnost má.

Ten poslední bod si zaslouží upozornění: **pokud web nepřináší poptávky, redesign to nemusí vyřešit.** Někdy je problém v tom, že chodí špatné publikum, nebo v tom, že se na webu nedá najít cena a kontakt. To se dá spravit i bez přestavby.

## Co se při přestavbě nejčastěji rozbije

Google popisuje přesun webu se změnou adres jako standardní operaci, kterou zvládne, pokud dostane správné signály. Zároveň vyjmenovává typické chyby, kvůli kterým se to nepovede. [Zdroj: Google Search Central](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

| Chyba | Následek |
| --- | --- |
| Staré adresy vracejí 404 | Ztratíte pozice i odkazy, které na ně vedly |
| Vše se přesměruje na homepage | Google to vyhodnotí jako měkkou 404, ne jako přesun |
| Na novém webu zůstal `noindex` z testování | Web zmizí z vyhledávání celý |
| robots.txt z vývojové verze | Google nesmí ani crawlovat |
| Nezaktualizovaná sitemapa | Google se dozví o změnách později |
| Řetězce přesměrování | Signály se rozmělňují, Google doporučuje nejvýš tři skoky |

První a druhá položka spolu souvisejí a jsou zdaleka nejčastější. Přesměrovat všechno na úvodní stránku je pohodlné a vypadá to, že je hotovo — ale pro člověka, který přišel na konkrétní stránku o konkrétní službě, to znamená, že nenašel nic.

> Dobrá zpráva na začátek: Google výslovně uvádí, že **trvalá přesměrování (301 a 308) nezpůsobují ztrátu PageRanku**. Pokud se migrace udělá pořádně, není důvod, aby web o pozice přišel.

## Jak to udělat, aby se nic neztratilo

### 1. Sepište, co dnes existuje

Než se cokoliv smaže, potřebujete kompletní seznam současných adres. Vytáhněte ho z několika zdrojů zároveň, protože žádný sám o sobě není úplný:

- sitemapa současného webu,
- Search Console — sestava výkonu za posledních 12 měsíců,
- analytika, pokud běží,
- seznam stránek s odkazy z jiných webů.

Ke každé adrese si poznamenejte návštěvnost a odkazy. Podle toho poznáte, co je potřeba zachovat za každou cenu a co se dá klidně zrušit.

### 2. Rozhodněte o každé adrese

Ke každé staré adrese patří přesně jedna z těchto tří možností:

- **zůstává stejná** — nejlepší varianta, žádné přesměrování není potřeba,
- **mění se** — musí vést 301 na nejbližší odpovídající novou stránku,
- **zaniká bez náhrady** — vrátí 410, ať Google ví, že to není chyba.

Nejlepší migrace je ta, při které se adresy nemění vůbec. Pokud staré URL nejsou vyloženě nesmyslné, stojí za zvážení je zachovat i za cenu toho, že nejsou tak hezké, jak by mohly být.

### 3. Nasaďte přesměrování a řekněte to Googlu

- Přesměrování **na straně serveru**, ne javascriptem.
- Trvalá, tedy 301 nebo 308.
- Bez řetězců — stará adresa vede rovnou na finální novou, ne přes dvě mezizastávky.
- Odešlete novou sitemapu v Search Console.
- Při změně domény použijte nástroj **Change of Address**. U přechodu z HTTP na HTTPS se nepoužívá.
- Přesměrování nechte běžet **aspoň rok**. Google výslovně doporučuje tuhle dobu, aby se stihly přenést všechny signály.

### 4. Sledujte, co se děje

Google uvádí, že u malého až středního webu trvá přesun většiny stránek **několik týdnů**. Není to hodina a není důvod panikařit z výkyvu druhý den.

První měsíc sledujte v Search Console hlavně chyby procházení a indexaci nových adres. Pokles návštěvnosti v prvních týdnech je normální, propad, který se po měsíci nezvedá, už ne.

## Co si ohlídat mimo SEO

**Analytika a měřicí kódy.** Při přestavbě z webu často zmizí analytika, protože ji nikdo nepřenesl. Zjistí se to za dva měsíce, když někdo chce data. Pokud řešíte, co vlastně měřit a jestli k tomu potřebujete souhlas, píšu o tom v článku [Cookie lišta, kterou většina webů nepotřebuje](/blog/cookies-gdpr-analytika).

**Formuláře.** Otestujte, že opravdu chodí e-maily, a to na reálnou adresu, ne na testovací. Tichý formulář je nejdražší chyba na novém webu, protože o ní nevíte.

**Přístupy.** Redesign je ideální moment, kdy si zkontrolovat, na koho je psaná doména a kdo má přístup k hostingu. Rozebírám to v článku [Doména, hosting a přístupy](/blog/domena-hosting-pristupy).

**Obsah, který se nesmí ztratit.** Reference, případové studie a články často „nestihnou" migraci a zůstanou na starém webu. Přitom právě na ně obvykle vedou odkazy zvenčí.

## Kdy je levnější spravit než přestavět

Ne každý problém potřebuje nový web. Pokud současný web běží na rozumné technologii a jenom vypadá staře, často stačí:

- nový vizuál nad stávající strukturou,
- optimalizace rychlosti, o které píšu v článku [Proč je váš web pomalý](/blog/proc-je-web-pomaly),
- doplnění chybějících stránek,
- přepis textů.

Přestavba dává smysl, když je problém ve stavbě samotné — technologie bez podpory, nemožnost editovat obsah, struktura, která neodpovídá tomu, co firma dělá. Jak se rozhodnout mezi technologiemi, rozebírám v článku [Web na míru, nebo WordPress?](/blog/web-na-miru-vs-wordpress).

## Shrnutí

1. Nejdřív si ujasněte, **co má nový web řešit**. „Nelíbí se mi" není zadání.
2. Před smazáním čehokoliv **sepište všechny současné adresy** i s návštěvností a odkazy.
3. Ke každé adrese patří rozhodnutí: zůstává, 301, nebo 410.
4. Přesměrovávejte na straně serveru, trvale, bez řetězců, **nikdy všechno na homepage**.
5. Odešlete novou sitemapu, u změny domény použijte Change of Address, přesměrování nechte rok.
6. Zkontrolujte analytiku, formuláře a přístupy — na ty se zapomíná nejčastěji.

Jestli plánujete přestavbu a chcete si ověřit, že se při ní nic neztratí, mrkněte na [služby a ceník](/offers).
