---
title: Doména, hosting a přístupy: komu to vlastně patří
description: Nejlevnější pojistka, jakou u webu máte, je vědět, na koho je psaná doména a kdo má přístup k hostingu. Jak si to ověřit a co dělat, když to nesedí.
tags: [weby, doména]
status: draft
published_at:
updated_at:
---

## Otázka, která přijde vždycky pozdě

V článku o [tvorbě webu v Pardubicích](/blog/tvorba-webu-pardubice) mám mezi otázkami na dodavatele hned dvě, které se týkají vlastnictví: komu bude patřit doména a jestli dostanete přístup ke zdrojovému kódu a hostingu. Obě znějí formálně a obě se v praxi řeší až ve chvíli, kdy je pozdě — když se spolupráce rozejde, dodavatel přestane odpovídat nebo firma zjistí, že se svým webem nemůže nic dělat.

Přitom je to nejlevnější pojistka, jakou u webu máte. Zabere půl hodiny a dá se udělat kdykoliv.

## Doména

### Držitel není registrátor

U českých domén je potřeba rozlišit tři role a většina nedorozumění vzniká z toho, že se míchají:

| Role | Kdo to je | Co znamená |
| --- | --- | --- |
| **Držitel** | Vy | Ten, komu doména patří a kdo o ní rozhoduje |
| **Registrátor** | Firma jako Wedos, Forpsi, Webglobe | Zprostředkovatel registrace u správce domény |
| **Technický správce** | Váš dodavatel | Ten, kdo doméně nastavuje DNS záznamy |

Správcem národní domény .cz je sdružení CZ.NIC. Registrovaných domén .cz je dnes přes **1,5 milionu**. [Zdroj: CZ.NIC, statistiky](https://stats.nic.cz/dashboard/cs)

Podstatné je, že **držitel je jediná role, na které opravdu záleží.** Registrátora lze změnit, technického správce taky. Držitel je ten, kdo doménu vlastní — a pokud jste to vy, nikdo vám ji nemůže vzít.

Problém nastává, když je jako držitel zapsaný dodavatel. Bývá to nedbalost, ne zlý úmysl: dodavatel doménu registroval na sebe, protože to bylo o pět minut rychlejší. Důsledek je ale stejný, ať byl úmysl jakýkoliv — bez jeho součinnosti s doménou nic neuděláte.

### Jak si to ověřit

Otevřete si [whois na stránkách CZ.NIC](https://www.nic.cz/whois/) a zadejte svoji doménu. Uvidíte držitele, registrátora a datum expirace.

Co má sedět:

- **Držitel je vaše firma nebo vy**, ne dodavatel a ne jeho firma.
- **Kontaktní e-mail je váš** a chodí na něj pošta. Sem přijde upozornění na expiraci.
- **Datum expirace** znáte a máte ho v kalendáři.

Pokud držitel nesedí, napište dodavateli a požádejte o změnu držitele. Je to standardní úkon, který zvládne každý registrátor. Dělejte to ve chvíli, kdy spolupráce funguje, ne až když skřípe.

### Co se stane, když doména propadne

Tohle se za poslední dva roky zásadně změnilo a spousta lidí o tom neví.

Dřív se nezaplacená doména po nějaké době uvolnila k volné registraci a šlo ji získat zpátky za běžnou cenu, pokud vás někdo nepředběhl. Od května 2024 provozuje CZ.NIC **aukce domén** — zrušené a zaniklé domény se místo uvolnění dostávají na seznam k dražbě.

Seznam domén se zveřejňuje 15 dní před aukcí, aukce probíhají denně od poledne do devíti večer a vyvolávací cena přednostního práva na registraci je **100 Kč**. Dražit může občan ČR nebo státu EU s ověřenou elektronickou identitou (MojeID nebo EU eID). Pokud přihazování běží v posledních minutách, aukce se automaticky prodlužuje. [Zdroj: CZ.NIC](https://www.nic.cz/page/4435/ziskat-vysnenou-domenu-muze-ted-kazdy-startuji-aukce-domen-cz/)

> Prakticky to znamená, že zapomenutá platba za doménu už není nepříjemnost za pár set korun. Vaše doména se může objevit v dražbě, kde o ni soutěžíte s kýmkoliv — a u zavedené domény s historií a odkazy to je ta nejdražší věc, kterou umíte ztratit.

Zaplacenou doménu tedy hlídejte. Nejjednodušší pojistka je zapnout u registrátora automatické obnovení a mít u domény kontaktní e-mail, který někdo skutečně čte.

### Když je spor

Kdyby došlo na nejhorší a doménu drží někdo, kdo na ni nemá právo, existuje pro domény .cz mimosoudní cesta. Od 1. března 2015 se spory řeší podle **Pravidel alternativního řešení sporů**, která jsou součástí registračních pravidel, a rozhoduje o nich Rozhodčí soud. [Zdroj: CZ.NIC](https://www.nic.cz/page/314/pravidla-a-postupy/)

Je to rychlejší a levnější než běžný soud. Pořád je to ale řízení, do kterého se nechcete dostat kvůli tomu, že jste si na začátku neohlídali jeden řádek ve whois.

## Hosting a kód

U hostingu je logika stejná jako u domény: **účet má být váš, s vaším přístupem.** Že ho spravuje dodavatel, je v pořádku. Že k němu nemáte přístup vy, v pořádku není.

Minimum, které chcete mít:

- přístup do administrace hostingu,
- přístup k databázi, pokud web nějakou má,
- přístup k e-mailovým schránkám na doméně,
- **zdrojový kód**, ideálně v gitovém repozitáři, ke kterému máte účet,
- přístup do Search Console a analytiky, pokud běží.

E-maily jsou položka, na kterou se zapomíná nejčastěji a bolí nejvíc. Firemní schránky bývají navázané na doménu a při přechodu k jinému dodavateli se s nimi musí zacházet opatrně — špatně přepnutý MX záznam znamená ztracenou poštu, ne jen nefunkční web.

U zdrojového kódu bývá největší nedorozumění. Někteří dodavatelé považují kód za svoje know-how a nevydávají ho. Je to legitimní obchodní model, pokud je to řečeno předem a promítnuté v ceně. Není to legitimní, když se to zjistí až na konci.

## Co si zapsat, dokud to funguje

Udělejte si jeden dokument. Ne v hlavě, ne v e-mailu — dokument, který najde i váš kolega:

| Položka | Co si zapsat |
| --- | --- |
| Doména | Registrátor, držitel, datum expirace, kdo platí |
| Hosting | Poskytovatel, typ služby, přihlašovací údaje, cena a splatnost |
| E-maily | Kde běží, kolik schránek, kdo je spravuje |
| Kód | Kde je repozitář, kdo k němu má přístup |
| CMS | Adresa administrace, účty a jejich oprávnění |
| Analytika | Který nástroj, kdo je vlastníkem účtu |
| Certifikát | Kdo ho obnovuje a jestli automaticky |

Hesla do dokumentu nepatří — patří do správce hesel, ke kterému má přístup víc než jeden člověk ve firmě.

## Jak to řeším já

Píšu to sem proto, že tohle je přesně ta část nabídky, kterou by měl umět zodpovědět každý dodavatel:

- **Doména se registruje na vás**, jste držitel od začátku.
- **Hosting frontendu** běží u webů, které stavím, na Cloudflare Pages a je součástí balíčku správy.
- **Zdrojový kód dostanete.** Není to know-how, které bych si držel.
- Když spolupráce skončí, dostanete přístupy a nic vás nedrží.

Co konkrétně balíček správy obsahuje — aktualizace, monitoring dostupnosti i domény, zálohy — je rozepsané ve [službách a ceníku](/offers). Monitoring domény je tam schválně: hlídání data expirace je otravná drobnost, na kterou se nejlíp zapomíná.

## Shrnutí

1. **Držitel domény musí být vaše firma**, ne dodavatel. Ověříte to ve whois za minutu.
2. Registrátora i technického správce lze změnit. Držitele bez jeho součinnosti ne.
3. Propadlá doména dnes končí **v aukci**, ne ve volné registraci. Zapněte automatické obnovení.
4. K hostingu, databázi, e-mailům a kódu musíte mít přístup, i když je spravuje někdo jiný.
5. Sepište si přehled přístupů, dokud spolupráce funguje.
6. Spory o domény .cz řeší mimosoudní ADR, ale je lepší se do nich nedostat.

Jestli si nejste jistí, jak na tom váš web stojí, ověření držitele domény a přístupů zabere půl hodiny — napište mi přes [služby a ceník](/offers) a projdeme to.
