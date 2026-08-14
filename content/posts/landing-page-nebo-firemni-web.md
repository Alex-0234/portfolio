---
title: Landing page, nebo firemní web? Rozhoduje počet URL adres
description: Proč je rozdíl mezi jednostránkovým a vícestránkovým webem hlavně v adresách, co všechno jde nastavit zvlášť pro každou z nich a kdy jsou podstránky naopak přítěž.
tags: [weby, seo]
status: published
published_at: 2026-08-02T15:07:49.000Z
updated_at: 2026-08-06T02:50:41.000Z
---

## Rozdíl není ve vzhledu, ale v počtu adres

Landing page a firemní web se dají postavit ve stejném designu, se stejnými sekcemi
i stejným rozpočtem na fotky. Rozdíl, který rozhoduje o tom, jak se web chová ve
vyhledávání a co se z něj dozvíte, je jinde: **kolik má web samostatných URL adres**.

Landing page je jedna adresa. Firemní web jich má typicky pět až deset:
`/`, `/o-nas`, `/sluzby`, `/reference`, `/blog`, `/kontakt`. Všechno ostatní, o čem
se u téhle volby mluví (SEO potenciál, cena, možnost růstu), je jenom důsledek
tohohle jednoho čísla.

Tenhle článek je hlavně o tom, proč to tak je. A taky o tom, kdy se vyplatí adres
přidat a kdy je to naopak práce navíc, která ničemu nepomůže.

## Co pro Google znamená „stránka"

Google neindexuje weby, ale jednotlivé stránky. Do indexu se ukládá dokument, který
odpovídá jedné URL adrese, a do výsledků vyhledávání se pak vrací zase konkrétní
adresa, ne web jako celek. Když si vygooglíte svoji firmu, uvidíte odkaz na jednu
adresu, a tu si Google vybral podle toho, která nejlíp odpovídá dotazu.

To zní jako detail, ale má to jeden nepříjemný důsledek pro jednostránkové weby:

> Kotva není adresa. `/#sluzby` a `/#kontakt` jsou pro Google pořád ta samá jediná
> stránka `/`.

Všechno za znakem `#` (takzvaný fragment) totiž vyhledávače při zpracování zahazují.
Fragment slouží prohlížeči k odrolování na správné místo, ale nový dokument z něj
nevznikne. Google to má ve své dokumentaci napsané natvrdo: *„nepoužívejte fragmenty
k načítání odlišného obsahu stránky"*.
[Zdroj: Google Search Central, JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Menu s odkazy `#sluzby`, `#reference` a `#kontakt` tedy navenek vypadá jako
vícestránkový web, ale z pohledu vyhledávače je to pořád jedna stránka s jedním
titulkem a jedním obsahem. Občas Google u delších stránek nabídne ve výsledcích
proklik přímo na sekci, ale je to jen způsob zobrazení. Samostatný záznam v indexu
z toho nevznikne.

## Co se dá nastavit zvlášť pro každou adresu

Tady je jádro celé věci. Každá URL adresa má vlastní sadu nastavení, a když máte
adresu jednu, máte i jednu sadu:

| Prvek | Landing page | Firemní web | Proč na tom záleží |
| --- | --- | --- | --- |
| `<title>` | jeden pro celý web | jeden pro každou stránku | Nejsilnější on-page signál a zároveň modrý nadpis ve výsledcích vyhledávání |
| `meta description` | jedna | vlastní na každé stránce | Neovlivňuje pořadí, ale rozhoduje o tom, jestli na výsledek někdo klikne |
| `H1` | jeden | vlastní na každé stránce | Říká člověku i vyhledávači, o čem přesně tahle stránka je |
| Obsah a klíčová slova | vše na jedné hromadě | rozdělený podle témat | Text může jít do hloubky, aniž by ostatní sekce ředil |
| `canonical` | jeden | vlastní | Určuje, která adresa je ta „oficiální" |
| Náhled při sdílení (OG) | jeden pro celý web | vlastní obrázek i titulek | Sdílený odkaz na konkrétní službu vypadá jako odkaz na tu službu |
| Záznam v `sitemap.xml` | jeden | jeden na stránku | Co není v mapě webu, Google objevuje pomaleji |
| Řádek v Search Console | jeden | jeden na stránku | Bez tohohle nezjistíte, co ve skutečnosti funguje |
| Cíl interních odkazů | nemá kam vést | každá stránka může odkazovat na relevantní | Prolinkování rozvádí sílu webu a drží návštěvníka v pohybu |

Nejlíp je to vidět na titulku. Řekněme, že děláte kadeřnictví a chcete být vidět na
dotaz „kadeřnictví Pardubice" i na „svatební účesy Pardubice". Na jednostránkovém
webu máte přesně jeden titulek, do kterého se musí vejít obojí. Vznikne z toho
kompromis typu *„Kadeřnictví a svatební účesy Pardubice | Salon XY"*, který není
úplně přesnou odpovědí ani na jeden z těch dvou dotazů. Se dvěma stránkami máte dva
titulky, každý přesně na jednu věc, a každý může mít pod sebou tři odstavce textu,
fotky a ceník, které se týkají jenom jí.

Co přesně má titulek a description obsahovat a co dalšího patří mezi on-page základy,
rozebírám v [Základech SEO](/blog/zaklady-seo). Pro tenhle článek z toho stačí jediné
pravidlo: unikátní title i description patří na **každou** stránku, ne zkopírovaná
šablona, ve které se mění jedno slovo. S jedinou adresou máte na obojí jeden pokus.

A pak je tu druhá strana, na kterou se u SEO často zapomíná: kam ten člověk vlastně
dopadne. Když někdo hledá svatební účesy a klikne na výsledek, měl by přistát rovnou
u svatebních účesů. Ne na začátku jednostránkového webu, kde se musí proscrollovat
přes hero sekci, představení salonu a ceník běžného stříhání, aby zjistil, jestli to
vůbec děláte.

## Proč to Google nepovažuje za podvod

Kolem tohohle koluje asi nejvíc mýtů ze všech. Nebude Google web trestat za to, že má
deset stránek o skoro stejné věci?

Nebude. Rozdělit obsah na samostatné stránky je běžná struktura webu, na které stojí
celý internet. Google si na to nestěžuje, protože indexování po stránkách je přesně
to, jak jeho vyhledávání funguje.

Nefunguje ani strašák „penalizace za duplicitní obsah". Google se k tomu vyjádřil už
před lety a od té doby to opakuje pořád dokola: duplicitní obsah není trest, ale
filtr. Když najde víc stránek s tímtéž textem, jednu z nich si vybere jako hlavní a
zbytek do výsledků prostě nepustí.
[Zdroj: Google Search Central Blog](https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty)

Hranice, kterou už překročit jde, je jinde a je popsaná ve spam pravidlech Google.
Týkají se jí dvě položky:

- **Doorway abuse.** Stránky vytvořené proto, aby se umístily na podobné dotazy, a
  které návštěvníka jenom protáhnou dál na skutečný cíl. Klasika jsou desítky stránek
  ve stylu „tvorba webů Pardubice", „tvorba webů Hradec Králové", „tvorba webů
  Chrudim", které se liší jenom názvem města.
- **Scaled content abuse.** Hromadné generování stránek primárně kvůli pořadí ve
  vyhledávání, ne kvůli návštěvníkovi.

[Zdroj: Google Search Essentials, spam pravidla](https://developers.google.com/search/docs/essentials/spam-policies)

Rozdíl mezi legitimní strukturou a doorway stránkou je přitom docela intuitivní:
**má ta stránka vlastní důvod existovat?** Pokud na ní člověk najde informace, které
jinde na webu nejsou, je to normální podstránka. Pokud je to jen jinak nadepsaná kopie
s prohozeným názvem města, je to přesně to, co Google popisuje.

## Kdy se podstránky vyplatí

Vícestránková struktura dává smysl ve chvíli, kdy platí aspoň něco z tohohle:

- **Máte víc služeb, které lidé hledají jinými slovy.** Každý dotaz si zaslouží
  vlastní stránku s vlastním titulkem.
- **Chcete provoz z organického vyhledávání dlouhodobě.** Víc stránek znamená víc
  dveří, kterými k vám člověk může vejít.
- **Rozhodování o vaší službě trvá.** U dražších věcí si lidé potřebují přečíst
  reference, projít ceník a zjistit, kdo jste. To se do jedné obrazovky nevejde.
- **Plánujete blog nebo aktuality.** Každý článek je nová adresa, která může
  přivádět lidi sama o sobě.
- **Chcete posílat konkrétní odkazy.** Do e-mailu, na fakturu nebo do nabídky se
  odkaz na `/sluzby/rezervacni-system` píše líp než „mrkněte na náš web a odscrollujte
  ke třetí sekci".

HubSpot k tomu má často citovaný údaj ze studie na 4 000 firmách: firmy s 31 až 40
landing pages generovaly **7× víc leadů** než firmy s jednou až pěti, a firmy s víc
než 40 stránkami dokonce 12×.
[Zdroj: HubSpot](https://blog.hubspot.com/marketing/landing-page-stats)

Tohle číslo ale berte s rezervou, kterou u něj málokdo uvádí. Je to korelace, ne
příčina. Firmy se čtyřiceti landing pages jsou zpravidla i firmy, které mají
marketingové oddělení, rozpočet a někoho, kdo ty stránky píše. Nezískaly leady tím,
že by stránky vyrobily, ale tím, že měly co na ně dát. Což nás dostává přesně
k druhé polovině článku.

## Kdy jsou podstránky zbytečné

Nejčastější chyba u malých firemních webů není málo stránek. Je to
**pět stránek, na kterých není co číst**.

Vypadá to takhle: v menu je šest položek, kliknete na „O nás" a najdete tam dva
odstavce o tom, že firma vznikla v roce 2015 a klade důraz na kvalitu. Kliknete na
„Reference" a je tam prázdná mřížka se třemi logy. Web působí větší, než ve
skutečnosti je, a návštěvník to pozná do deseti vteřin.

Z hlediska SEO je to ještě horší, protože takové stránky nic nepřinesou. Ahrefs
prošel zhruba 14 miliard stránek a zjistil, že **96,55 % z nich nedostane z Googlu
žádný provoz**.
[Zdroj: Ahrefs](https://ahrefs.com/blog/search-traffic-study/)

Prázdná podstránka nespadne do zbývajících tří a půl procenta jenom proto, že
existuje. Naopak přinese tři konkrétní problémy:

1. **Kanibalizace.** Dvě stránky o skoro stejném tématu si konkurují navzájem.
   Google si stejně vybere jednu, ale vy jste mezi ně mezitím rozdělili interní
   odkazy i pozornost, takže ani jedna není tak silná, jak mohla být.
2. **Zředěný dojem.** Deset vět rozházených po třech stránkách působí hůř než těch
   samých deset vět na jedné, kde na sebe navazují.
3. **Práce navíc napořád.** Každá stránka je něco, co časem zastará, co je potřeba
   aktualizovat a co může přestat dávat smysl.

Landing page dává smysl hlavně tehdy, když:

- prodáváte jednu službu jednomu typu zákazníka,
- provoz vám chodí z reklamy, Instagramu nebo z ruky předaných vizitek, ne
  z vyhledávání,
- nemáte v plánu pravidelně přidávat obsah,
- chcete jeden jasný cíl a nechcete lidem nabízet odbočky.

Ta poslední věc je vlastně přednost, ne kompromis. Landing page nemá menu, kterým se
dá odejít jinam. Jediná cesta vede k formuláři. Unbounce analyzoval 41 000 landing
pages a **medián konverzního poměru vyšel na 6,6 %**, s rozptylem od 3,8 % u SaaS po
12,3 % u eventů.
[Zdroj: Unbounce Conversion Benchmark Report](https://unbounce.com/average-conversion-rates-landing-pages/)

Jsou to čísla ze stránek, na které chodí placený provoz, takže se nedají přenést
jedna ku jedné na firemní web. Ukazují ale dobře, v čem je landing page silná: v tom,
že si návštěvník nemá kam uhnout.

## Test, jestli téma unese vlastní stránku

Než přidáte podstránku, projděte si tyhle tři otázky. Pokud aspoň na jednu odpovíte
„ne", pravděpodobně jde spíš o sekci na existující stránce než o novou adresu.

1. **Hledá tohle někdo jinými slovy než zbytek webu?** Pokud by člověk na obě stránky
   došel stejným dotazem, patří to na jednu.
2. **Napíšu o tom aspoň 300 až 500 slov, která se nikde jinde neopakují?** Ne vatu,
   ale konkrétní postup, ceny, příklady, časté dotazy.
3. **Odkázal bych na tu stránku odjinud?** Z jiné podstránky, z e-mailu, z nabídky.
   Když by se na ni dalo dostat jenom přes menu, nikdo ji nenajde.

Nejde o to, mít málo stránek. Jde o to, aby každá měla svůj vlastní důvod existovat.

> Rozhodujte se podle toho, kolik různých otázek má návštěvník v hlavě, a na kolik
> z nich máte skutečnou odpověď. Podstránka bez odpovědi je jenom prázdná položka
> v menu.

## Co ještě přinese víc adres: konečně uvidíte, co funguje

Tenhle argument se v porovnáních skoro neobjevuje, a přitom je z dlouhodobého
hlediska možná nejcennější.

Jednostránkový web je v Google Search Console i v analytice jeden jediný řádek.
Zjistíte z něj, že na web přišlo za měsíc 200 lidí, ale ne kvůli čemu. Nevíte, jestli
je zajímal ceník, konkrétní služba nebo reference, protože všechno je to jedna adresa.

Vícestránkový web vám dá rozpad po stránkách. V Search Console uvidíte, na jaké dotazy
se zobrazuje která stránka, kolik má prokliků a na jaké pozici se drží. Z toho se dá
odvodit, o čem má smysl napsat víc, která služba táhne a která stránka existuje
zbytečně. Web tím přestává být jednorázová zakázka a stává se z něj něco, co se dá
postupně vylepšovat na základě dat, ne dojmů.

## Nemusí to být buď, anebo

V praxi se ty dvě věci často kombinují. Běžná a docela funkční sestava vypadá takhle:
firemní web jako základ pro organické vyhledávání, plus samostatné landing pages pro
konkrétní kampaně, které nejsou v menu.

Jedna poznámka k tomu ale patří. Pokud kampaňová landing page říká skoro totéž co
vaše stránka služby, je lepší ji nechat mimo index (`noindex`) a mimo `sitemap.xml`.
Nedostanete se tím do konfliktu s vlastní stránkou o téže službě a Google nebude
řešit, kterou z těch dvou má ukazovat. Pro placený provoz to nic nemění, reklama
funguje bez ohledu na to, jestli je stránka v indexu.

Když začínáte landing page a čekáte, že web poroste, vyplatí se dvě věci promyslet
dopředu:

- **Strukturu adres.** Ať už dnes máte jednu stránku, mějte představu, co bude na
  `/sluzby` a co na `/o-nas`. Přidat stránku do promyšlené struktury je levné.
- **Přesměrování.** Když se web později přestavuje a adresy se mění, staré musí vést
  na nové přes 301 přesměrování. Bez toho zahodíte všechno, co se za tu dobu
  nasbíralo, a začínáte ve vyhledávání od nuly.

## Rychlé srovnání

| Kritérium | Landing page | Firemní web |
| --- | --- | --- |
| Počet URL adres | 1 | typicky 5–10 |
| Počet cílů | 1 | více |
| Vlastní title a H1 na téma | jeden pro vše | pro každou stránku |
| SEO potenciál | nízký (jeden vstup) | vysoký (víc vstupů) |
| Vhodné pro placený provoz | výborně | průměrně |
| Měřitelnost v Search Console | omezená | po stránkách |
| Nároky na obsah | nízké | vysoké |
| Údržba | minimální | průběžná |
| Cena | nižší | vyšší |

## Shrnutí

Landing page není „menší web". Je to jiný nástroj. Jedna adresa znamená jeden titulek,
jeden H1 a jednu cestu k jednomu cíli, což je slabina ve vyhledávání a přednost
v konverzi.

Firemní web dává každému tématu vlastní adresu, vlastní metadata a vlastní prostor,
a Google to nejenže netrestá, ale přímo s tím počítá. Podmínka je jediná a nedá se
obejít: na každé stránce musí být co číst. Jinak přidáváte položky do menu, ne
návštěvníky.

Prakticky bych to shrnul takhle. Jedna služba, provoz z reklamy, žádný plán obsahu →
landing page. Víc služeb, ambice na organické vyhledávání a ochota web občas
doplňovat → firemní web. A pokud si nejste jistí, začněte menším rozsahem
s promyšlenou strukturou adres. Dostavět se dá, přijít o pozice kvůli špatné
přestavbě taky.

Konkrétní rozsah a ceny obojího najdete ve [službách a ceníku](/offers).
