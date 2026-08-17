---
title: Proč je váš web pomalý
description: Ve většině případů za to můžou obrázky, ne hosting. Kolik dnes váží průměrná stránka, které metriky Google sleduje a co se dá spravit bez přestavby webu.
tags: [weby, rychlost, seo]
status: draft
published_at:
updated_at:
---

## Nejdřív dvě čísla

Když se řekne pomalý web, většina lidí si vybaví levný hosting. V praxi je viník skoro vždycky jinde.

Podle Web Almanacu 2025, který analyzuje reálná data z milionů webů, má medián domovské stránky na desktopu **2 412 kB**. Rozložení té váhy vypadá takhle:

| Typ obsahu | Velikost | Podíl |
| --- | --- | --- |
| Obrázky | 1 058 kB | 36,9 % |
| JavaScript | 697 kB | 24,4 % |
| Fonty | 139 kB | 4,9 % |
| CSS | 82 kB | 2,9 % |
| HTML | 22 kB | 0,8 % |

[Zdroj: Web Almanac 2025, Page Weight](https://almanac.httparchive.org/en/2025/page-weight)

Za deset let vzrostla váha mediánové mobilní stránky o **202,8 %**. A na devadesátém percentilu, tedy u desetiny nejtěžších webů, se dostáváme na **9 179 kB** — devět megabajtů za jednu stránku.

Druhé číslo: **obrázek je hlavním prvkem stránky u 76 % mobilních a 85,3 % desktopových webů.** [Zdroj: Web Almanac 2025, Performance](https://almanac.httparchive.org/en/2025/performance)

Dohromady to znamená jediné. Obrázky jsou největší část toho, co se stahuje, a zároveň to, na co se čeká. Hosting je až druhá věc.

## Co Google vlastně měří

V [Základech SEO](/blog/zaklady-seo) zmiňuju Core Web Vitals jako součást technického zdraví. Tady je konkrétní vysvětlení, protože bez něj se nedá nic opravit.

- **LCP (Largest Contentful Paint)** — za jak dlouho se vykreslí největší prvek na obrazovce, obvykle hlavní obrázek nebo nadpis. Dobrá hodnota je **do 2,5 s**.
- **INP (Interaction to Next Paint)** — jak rychle stránka reaguje na kliknutí nebo ťuknutí. Dobrá hodnota je **do 200 ms**.
- **CLS (Cumulative Layout Shift)** — jestli obsah při načítání neposkakuje. Dobrá hodnota je **do 0,1**.

Jak na tom weby jsou: všechny tři metriky splňuje **48 % mobilních a 56 % desktopových webů**. Nejhůř dopadá LCP — dobrou hodnotu má jen **62 %** mobilních webů, zatímco INP zvládá 77 % a CLS 81 %.

Čtěte to tak, že **problém není v reakcích ani v poskakování, ale v čekání na první vykreslení.** A to nás vrací k obrázkům.

## Čtyři chyby, které dělají většinu problému

### 1. Nezmenšené fotky

Nejčastější případ z praxe: fotka z telefonu má 4 000 pixelů na šířku a 5 MB, na webu se zobrazuje v šířce 800 pixelů. Prohlížeč stáhne celých 5 MB a pak je zmenší.

Řešení je vygenerovat několik velikostí a nechat prohlížeč vybrat tu správnou podle displeje. Není to nic exotického, dělá se to atributem `srcset` a moderní frameworky to zvládají automaticky.

### 2. Zastaralé formáty

U hlavních obrázků stránky je pořád **57 %** ve formátu JPG a **26 %** v PNG. WebP má jen **11 %** a AVIF se drží pod dvěma procenty. [Zdroj: Web Almanac 2025, Performance](https://almanac.httparchive.org/en/2025/performance)

Přitom WebP i AVIF podporují dnes všechny běžné prohlížeče a při srovnatelné kvalitě jsou výrazně menší. Převod existujících obrázků je jednorázová práce s okamžitým efektem.

### 3. Odložené načítání hlavního obrázku

Tohle je moje oblíbená, protože vzniká ze snahy web zrychlit. Atribut `loading="lazy"` říká prohlížeči, ať obrázek načte až ve chvíli, kdy na něj člověk doroluje. U fotek dole na stránce je to správně. U hlavního obrázku v hlavičce je to **přesně naopak** — prohlížeč ho odloží, přestože je to ten prvek, na kterém se měří LCP.

A děje se to často: **16 až 17 % stránek odkládá načtení svého hlavního obrázku.** Toto číslo se od roku 2024 nezlepšilo.

Pravidlo je jednoduché: co je vidět bez rolování, se nikdy neodkládá. Co je pod ohybem, se odložit má. Zhruba **68 %** obrázků na webu přitom nemá nastavený žádný atribut a nechává to na náhodě.

### 4. Chybějící rozměry obrázků

Když u obrázku není uvedená šířka a výška, prohlížeč neví, kolik místa si má rezervovat. Vykreslí text, doloží obrázek a text odskočí dolů. To je přesně ta situace, kdy chcete kliknout na odkaz a trefíte něco jiného — a měří se jako CLS.

Oprava je triviální: uvést u každého obrázku rozměry nebo poměr stran.

## Co ještě zdržuje

**Fonty.** Samotná velikost není problém, 139 kB je v mediánu. Problém je, že se text nevykreslí, dokud se font nestáhne. Řešením je omezit počet řezů, načíst je předem a nastavit `font-display: swap`, aby se text ukázal hned a jen přeblikl.

**Skripty třetích stran.** Chatovací widget, mapa, vložené video, remarketingové pixely, cookie lišta — každý z nich přidává požadavky na cizí servery, které neovlivníte. Bývá to největší jednotlivá položka v JavaScriptu, který na webu běží. Souvisí to i s tím, jestli tam ty skripty vůbec musí být, což rozebírám v článku [Cookie lišta, kterou většina webů nepotřebuje](/blog/cookies-gdpr-analytika).

**Vložená videa.** Přehrávač YouTube stáhne stovky kilobajtů, i když na video nikdo neklikne. Náhledový obrázek s odkazem, který přehrávač načte až po kliknutí, ušetří většinu.

**Server a hosting.** Ano, taky. Ale až tady, ne na prvním místě. Statický web ze sítě edge serverů odpoví z principu rychleji než PHP, které pro každý požadavek generuje stránku znovu.

## Jak to změřit

Než začnete cokoliv opravovat, změřte to. Tři nástroje stačí:

1. **PageSpeed Insights** — konkrétní stránka, konkrétní doporučení. Sledujte hlavně sekci s reálnými daty od uživatelů, ne jen laboratorní skóre.
2. **Search Console, sekce Core Web Vitals** — ukáže, jak si vede celý web podle skutečných návštěvníků.
3. **Vlastní telefon na mobilních datech.** Nejpodceňovanější test. Otevřete web venku na horším signálu a počítejte vteřiny.

> Laboratorní skóre v PageSpeed Insights je vodítko, ne cíl. Google hodnotí data od skutečných uživatelů. Web se skóre 85, který se reálným lidem načte za 1,8 vteřiny, je na tom líp než web se skóre 100 na papíře.

## Co se dá spravit bez přestavby

Většina věcí z tohohle článku nevyžaduje nový web:

- převod obrázků do WebP a jejich zmenšení,
- doplnění rozměrů obrázků,
- oprava odloženého načítání u hlavního obrázku,
- odstranění skriptů, které nikdo nepoužívá,
- náhrada vloženého videa náhledem,
- omezení počtu řezů fontu.

Když se ale ukáže, že problém je ve stavbě samotné — deset pluginů, které nejdou odebrat, nebo šablona tahající knihovny, které web nepoužívá — pak už je otázka na místě. Kdy má přestavba smysl a jak ji udělat bez ztráty pozic, píšu v článku [Redesign webu bez ztráty pozic](/blog/redesign-webu-bez-ztraty-pozic).

## Shrnutí

1. Obrázky tvoří skoro **37 %** váhy průměrné stránky a jsou hlavním prvkem u 76 % mobilních webů.
2. Všechny tři Core Web Vitals splňuje jen **48 % mobilních webů**, nejhůř dopadá LCP.
3. Nejčastější chyby: nezmenšené fotky, staré formáty, odložený hlavní obrázek, chybějící rozměry.
4. Fonty, cizí skripty a vložená videa jsou druhá vrstva problému.
5. Měřte na reálných datech a na vlastním telefonu, ne jen podle skóre.
6. Většina oprav nevyžaduje nový web.

Jestli chcete vědět, kde konkrétně váš web ztrácí čas, mrkněte na [služby a ceník](/offers) — projdu si ho a napíšu, co má největší efekt za nejmíň práce.
