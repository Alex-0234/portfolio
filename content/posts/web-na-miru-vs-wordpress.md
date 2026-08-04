---
title: Web na míru, nebo WordPress?
description: Rozhodovací kritéria místo ideologie — co říkají data o bezpečnosti a výkonu, kde má WordPress navrch a kdy se vyplatí kód na míru.
tags: [weby, wordpress]
status: draft
---

## Špatně položená otázka

„Je lepší WordPress, nebo web na míru?" nemá univerzální odpověď, protože se ptá na technologii, zatímco rozhoduje něco jiného: **kdo bude web spravovat a jak často se bude měnit obsah.** Odpovězte si nejdřív na tohle a volba technologie z toho většinou vypadne sama.

Píšu to jako člověk, který weby staví na míru v Next.js a Reactu. Nemá ale smysl tvářit se, že WordPress je špatná volba — pro velkou část zadání je to volba správná. Tenhle článek se snaží ukázat, kde přesně ta hranice leží.

## Co se vlastně srovnává

**WordPress** je hotový redakční systém. Nainstalujete ho, vyberete šablonu a chybějící funkce doplníte pluginy. Obsah si pak spravujete sami přes administraci.

**Web na míru** je kód napsaný pro jeden konkrétní web. Nic, co na něm není potřeba, tam není. Za to platíte tím, že každá funkce musí vzniknout — nedá se doinstalovat.

Jeden rozdíl je potřeba zmínit hned, protože ho většina srovnání zamlčuje: **„WordPress" není jedna věc.** Rozdíl mezi WordPressem na nejlevnějším sdíleném hostingu s koupenou šablonou a třiceti pluginy a WordPressem postaveným profesionálně je větší než rozdíl mezi tím druhým a webem na míru. Většina čísel, která za chvíli uvidíte, popisuje průměr celé té množiny — ne strop, kterého WordPress umí dosáhnout.

## Čísla, která stojí za to znát

### Rozšíření

WordPress k srpnu 2026 pohání **41,2 % všech webů** a **59,1 % webů, u kterých se dá redakční systém rozpoznat**. [Zdroj: W3Techs](https://w3techs.com/technologies/details/cm-wordpress)

To je samo o sobě argument pro WordPress, ale ne z technických důvodů. Znamená to, že seženete dodavatele na každém rohu, existuje plugin skoro na cokoliv a když se s dodavatelem rozejdete, najdete náhradu během týdne. Tomu se říká nízké riziko dodavatele a je to výhoda, kterou by si žádný freelancer neměl dovolit přejít mlčením — u webu na míru je totiž tohle riziko vyšší.

### Bezpečnost

V roce 2025 přibylo v ekosystému WordPressu **11 334 nových zranitelností**, o 42 % víc než rok předtím. Zajímavější je ale jejich rozložení:

- **91 %** jich bylo v pluginech,
- **9 %** v šablonách,
- v jádru WordPressu jen **6**, všechny s nízkou prioritou.

K tomu dvě čísla, která mění pohled na údržbu: **46 %** zranitelností nemělo v okamžiku zveřejnění opravu a medián doby do masového zneužití u aktivně cílených děr byl **5 hodin**. [Zdroj: Patchstack, State of WordPress Security in 2026](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/)

Poctivé čtení těch čísel zní takhle: **jádro WordPressu je udržované dobře. Rizikem je to, co si na něj přišroubujete.** Každý plugin je kus cizího kódu s vlastním tempem aktualizací a vlastní mírou toho, jak vážně bere jeho autor bezpečnost. Deset pluginů znamená deset takových závazků.

> Mimochodem, kontraintuitivní zjištění z téže zprávy: u placených pluginů byla trojnásobně vyšší pravděpodobnost prokazatelně zneužité zranitelnosti než u těch zdarma. „Koupené, takže bezpečnější" neplatí.

Web na míru tuhle celou kategorii rizika většinou nemá — ne proto, že by byl kouzelně bezpečný, ale proto, že nemá plugin ekosystém a není součástí seznamu, který útočníci plošně skenují. Vlastní kód může mít díru taky. Jen jich je řádově míň a nikdo je nezveřejňuje v databázi, ze které se dá automatizovaně útočit.

### Výkon

Podle dat z Core Web Vitals Technology Report (Chrome UX Report + HTTP Archive, duben 2026) projde hodnocením Core Web Vitals:

| Platforma | Podíl webů s dobrým CWV |
| --- | --- |
| Duda | 85 % |
| Wix | 80 % |
| Shopify | 79 % |
| Astro | 67 % |
| Drupal | 64 % |
| Joomla | 58 % |
| WordPress | 49 % |

[Zdroj: Search Engine Journal nad daty HTTP Archive](https://www.searchenginejournal.com/core-web-vitals-wordpress-and-astro/575818/)

Tady je potřeba být opatrný, protože se to dá snadno přečíst špatně. Ta tabulka **neříká, že WordPress neumí být rychlý.** Říká, že průměrný WordPress na internetu rychlý není. Wix a Duda skórují líp mimo jiné proto, že si samy řídí hosting a nepustí vás k tomu, abyste si nainstalovali libovolný plugin. Měří se tu tedy stejnou měrou volnost proti mantinelům, jako technologie samotná.

Prakticky z toho plyne jediné: u WordPressu je dobrý výkon **výsledek práce**, ne výchozí stav. U webu na míru je to naopak — musíte se snažit, aby byl pomalý. Co Core Web Vitals vlastně měří, rozebírám v [Základech SEO](/blog/zaklady-seo).

## Kdy zvolit WordPress

- **Obsah se mění často a spravuje si ho klient.** Novinky, akce, články, fotky z realizací. Tohle je přesně to, na co WordPress vznikl.
- **Potřebujete e-shop bez velkého rozpočtu.** WooCommerce je slušný odrazový můstek.
- **Rozpočet je hlavní omezení.** Za peníze, za které dostanete slušný WordPress, web na míru nevznikne.
- **Chcete mít jistotu, že seženete náhradu.** Viz riziko dodavatele výš.
- **Funkci, kterou potřebujete, už někdo napsal.** Rezervace, členské sekce, kalkulačky — nemá smysl platit vývoj něčeho, co existuje.

## Kdy zvolit web na míru

- **Rychlost je součást produktu.** Web, který stojí na výkonu a hodnocení ve vyhledávání, nemá důvod tahat s sebou vrstvy, které nepoužívá.
- **Máte netriviální logiku nebo integrace.** Jakmile potřebujete něco, co existující plugin neumí, začne se WordPress ohýbat — a ohnutý WordPress je dražší než napsaný kód.
- **Obsah se skoro nemění.** Prezentace, která se aktualizuje dvakrát ročně, nepotřebuje redakční systém. Potřebuje jen dobře napsanou stránku.
- **Záleží na designu do detailu.** Šablona vás vždycky někam zatlačí.
- **Chcete klid na několik let.** Bez pluginů odpadá měsíční kolotoč aktualizací a hlídání, jestli něco po aktualizaci nespadlo.

## Kolik to reálně stojí

Srovnávat se dá jen celková cena za dobu životnosti, ne vstupní investice. Vypadá to zhruba takhle:

| | WordPress | Web na míru |
| --- | --- | --- |
| Vstupní cena | nižší | vyšší |
| Hosting | nutný (PHP + databáze) | často levný nebo zdarma |
| Placené pluginy | roční poplatky | žádné |
| Údržba | pravidelná a nutná | minimální |
| Riziko při zanedbání | vysoké | nízké |
| Náklady na změny | nízké (obsah), vysoké (funkce) | opačně |

Poslední řádek je ta podstatná věc. WordPress je levný na obsah a drahý na funkce. Web na míru přesně naopak.

U mě konkrétně startuje landing page na **10 000 Kč**, firemní web na **25 000 Kč** a správa na **600 Kč měsíčně** — detaily jsou ve [službách a ceníku](/offers).

## Třetí možnost, na kterou se zapomíná

Volba není binární. **Headless** přístup znamená, že obsah spravujete v redakčním systému, ale web samotný je napsaný na míru. Redakční systém pak slouží jen jako sklad textů a obrázků, které si frontend vytáhne.

Dostanete tím obojí: klient si edituje obsah sám a web přitom není zatížený tím, co k němu redakční systém běžně přidává. Cenově to vychází jako web na míru plus přibližně **2 800 Kč** za cloudové CMS, případně **8 000 Kč** za vlastní hostované.

Pro většinu firemních webů, kde se mění reference a novinky, ale zbytek stojí, je tohle podle mě nejrozumnější kompromis.

## Jak se rozhodnout ve třech otázkách

1. **Jak často se bude obsah měnit a kdo ho bude měnit?** Často a klient sám → WordPress nebo headless. Zřídka → web na míru.
2. **Existuje na to, co potřebujete, hotové řešení?** Ano → nemá smysl to psát znovu. Ne → na míru vyjde levněji než ohýbání WordPressu.
3. **Kdo se o web bude starat za rok?** Nikdo → volte to, co údržbu nevyžaduje. Máte dodavatele nebo správu → WordPress je v pohodě.

Ideologie v tom není. WordPress není zastaralý a weby na míru nejsou samoúčelné — jsou to dva nástroje s jinou křivkou nákladů. Chyba nastává jenom tehdy, když se vybírá podle toho, co umí dodavatel, místo podle toho, co potřebuje zadání.

Jestli si nejste jistí, do které kategorie vaše zadání spadá, mrkněte na [služby a ceník](/offers) nebo mi napište — poradím i tehdy, když z toho vyjde, že WordPress vám poslouží líp.
