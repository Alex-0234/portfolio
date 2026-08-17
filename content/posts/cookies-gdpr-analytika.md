---
title: Cookie lišta, kterou většina webů nepotřebuje
description: Od roku 2022 platí u cookies souhlas předem. Co to znamená v praxi, jaké nedostatky na lištách nachází ÚOOÚ a proč se dá analytika často vyřešit tak, že lišta není potřeba vůbec.
tags: [cookies, gdpr, weby]
status: draft
published_at:
updated_at:
---

## Co se změnilo a odkdy

Od **1. ledna 2022** platí v Česku u cookies režim **opt-in**. Novela zákona o elektronických komunikacích (zákon č. 127/2005 Sb.) otočila dosavadní praxi: dřív stačilo návštěvníka informovat a dát mu možnost odmítnout, dnes se musí ukládání cookies aktivovat až po jeho **předchozím prokazatelném souhlasu**. [Zdroj: ÚOOÚ](https://uoou.gov.cz/novinky/vse/cookies-od-zacatku-roku-2022-pouze-se-souhlasem)

Od té doby má cookie lištu skoro každý český web. Velká část z nich ji přitom nepotřebuje — a velká část těch, které ji potřebují, ji má udělanou špatně.

## Kdy souhlas potřeba není

Klíčová je výjimka v **§ 89 odst. 3** zákona o elektronických komunikacích. Souhlas se nevyžaduje u cookies, které jsou nezbytné pro přenos zprávy nebo pro poskytnutí služby, kterou si uživatel výslovně vyžádal. Těm se říká **technické cookies**. [Zdroj: ÚOOÚ, Cookies a GDPR](https://uoou.gov.cz/cookies-a-gdpr)

Do téhle kategorie spadá třeba:

- přihlášení a udržení relace,
- obsah nákupního košíku,
- ochrana proti odesílání formuláře robotem,
- zapamatování zvoleného jazyka nebo měny,
- uložení toho, že už jste lištu jednou odklikli.

Souhlas naopak potřebují cookies **netechnické**: analytika, remarketing, reklamní pixely, A/B testování, vložená videa a mapy, které si samy ukládají data.

> Z toho plyne věc, kterou většina návodů zamlčuje: **web, který nepoužívá žádné netechnické cookies, cookie lištu vůbec nepotřebuje.** Není na co se ptát. Lišta na takovém webu jenom otravuje a mimochodem sama o sobě zhoršuje uživatelský dojem i metriku CLS.

Tenhle web je přesně ten případ. Neběží na něm žádná analytika, žádný pixel, žádné vložené přehrávače. Proto tu na vás žádná lišta nevyskočila.

## Jak lišty vypadají v praxi

ÚOOÚ po zavedení nových pravidel monitoroval, jak si weby vedou, a zveřejnil seznam **devíti nejčastějších nedostatků**. Stojí za to ho projít celý, protože skoro každý český web trefí aspoň tři:

1. používání netechnických cookies bez souhlasu,
2. nepřiměřeně dlouhá doba platnosti cookies,
3. chybějící možnost odmítnutí v první vrstvě lišty,
4. špatná kategorizace cookies,
5. chybějící informace o konkrétních použitých cookies,
6. rozdílná viditelnost tlačítka pro souhlas a pro odmítnutí,
7. nesprávné zařazení cookies mezi technické,
8. informace o cookies v cizím jazyce,
9. lišta, která znemožňuje nebo ztěžuje čtení stránky.

[Zdroj: ÚOOÚ, Cookies lišty vykazují řadu nedostatků](https://uoou.gov.cz/cs/cookies-listy-vykazuji-radu-nedostatku)

Body 3 a 6 jsou nejčastější a nejsnáz opravitelné. **Tlačítko „Odmítnout" musí být hned v první vrstvě lišty, vedle tlačítka pro souhlas, a nesmí být vizuálně potlačené.** Ne schované pod „Nastavení", ne o dvě velikosti menší, ne šedé vedle zeleného. Souhlas, který dá člověk jen proto, že odmítnutí nenašel, není svobodný, a tím pádem to není souhlas.

## Co za to reálně hrozí

Sankční strop podle GDPR je 20 milionů EUR nebo 4 % celosvětového obratu, což je číslo, kterým se dobře straší a které pro malou firmu nemá žádnou vypovídací hodnotu. Zajímavější je, co ÚOOÚ skutečně ukládá.

Za rok 2023 udělil úřad v souvislosti se zpracováním osobních údajů přes cookies pokuty v celkové výši **4 443 000 Kč**, z toho **1 640 000 Kč** nabylo právní moci. Nejvyšší pravomocná pokuta byla **898 000 Kč** a dostala ji firma z oboru elektronických komunikací za to, že návštěvníkům ukládala cookies zpracovávající osobní údaje k marketingovým účelům bez souhlasu. [Zdroj: ÚOOÚ](https://uoou.gov.cz/udeleny-pokuty-ve-vysi-temer-45-mil-kc)

Předseda úřadu k tomu tehdy uvedl, že pokuty chápe především jako motivační a varovný nástroj a že provozovatelé měli dost času se přizpůsobit.

Malé firmě tedy nehrozí milionová pokuta hned zítra. Hrozí jí spíš to, že se dostane do kontroly a bude řešit něco, co se dalo vyřešit za hodinu při stavbě webu.

## Jak z toho ven prakticky

Rozhodovací postup je jednoduchý:

| Situace | Co potřebujete |
| --- | --- |
| Jen prezentační web bez analytiky a pixelů | Žádnou lištu. Stačí informace o cookies v zásadách. |
| Chci vědět, kolik lidí chodí na web | Analytiku bez cookies — lišta není potřeba |
| Google Analytics, Meta Pixel, remarketing | Plnohodnotnou lištu se souhlasem předem |
| E-shop s košíkem, bez marketingu | Technické cookies bez souhlasu, lišta jen informativní |

### Analytika, která lištu nevyžaduje

Prostřední řádek je ten, který lidi překvapí nejvíc. Existují analytické nástroje, které neukládají cookies a nesbírají osobní údaje — z těch známějších Plausible nebo Umami. Ukážou vám návštěvnost, zdroje, nejčtenější stránky i konverze.

Co neukážou: chování konkrétního člověka napříč návštěvami a napojení na reklamní systémy. Pokud netočíte placenou reklamu, o kterou vás to připraví, je to výborný obchod — dostanete čísla, o která vám jde, a odpadne vám celá právní agenda kolem souhlasů.

Má to i praktický vedlejší efekt. Souhlas s analytikou dá jen část návštěvníků, takže data z Google Analytics jsou stejně neúplná. Bezcookiová analytika měří všechny.

### Když lištu opravdu potřebujete

- Nic se nespustí dřív, než člověk klikne. Ani analytika, ani pixel.
- „Přijmout vše" a „Odmítnout vše" ve stejné vrstvě, stejně velké, stejně výrazné.
- Odmítnutí musí jít jedním kliknutím, stejně jako souhlas.
- Souhlas si zaznamenejte, ať ho umíte doložit.
- Vypište, jaké konkrétní cookies používáte a na jak dlouho.
- Lišta nesmí překrýt obsah tak, aby se web nedal číst.

## Shrnutí

1. Od 1. 1. 2022 platí opt-in — cookies se aktivují až po souhlasu.
2. **Technické cookies souhlas nevyžadují**, ostatní ano.
3. Web bez analytiky a marketingových skriptů **žádnou lištu nepotřebuje**.
4. ÚOOÚ nejčastěji vytýká chybějící nebo potlačené tlačítko pro odmítnutí.
5. Pokuty za cookies reálně padají, i když se pohybují ve statisících, ne v milionech eur.
6. Analytika bez cookies je pro většinu malých webů lepší volba než lišta.

Jestli chcete vědět, co váš web ve skutečnosti ukládá a jestli k tomu potřebuje souhlas, mrkněte na [služby a ceník](/offers). U webů, které stavím, řeším tohle rovnou při stavbě — souvisí to i s rychlostí, kterou rozebírám v článku [Proč je váš web pomalý](/blog/proc-je-web-pomaly).
