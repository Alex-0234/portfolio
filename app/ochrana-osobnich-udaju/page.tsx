import Footer from "@/components/footer"
import SplitReveal from "@/components/splitReveal"
import { ADDRESS, EMAIL, ICO, SITE_NAME } from "@/data/site"
import { pageMetadata } from "@/utils/metadata"

export const metadata = pageMetadata({
    title: "Ochrana osobních údajů",
    description: "Jaké osobní údaje sbírá poptávkový formulář, proč, komu se předávají a jak dlouho se uchovávají.",
    path: "/ochrana-osobnich-udaju",
})

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

interface Section {
    id: string
    number: string
    heading: string
    paragraphs?: string[]
    list?: string[]
    listIntro?: string
}

const SECTIONS: Section[] = [
    {
        id: 'spravce',
        number: '01',
        heading: 'Kdo údaje zpracovává',
        paragraphs: [
            `Správcem osobních údajů je ${SITE_NAME}, IČO ${ICO}, se sídlem v obci ${ADDRESS.locality}, ${ADDRESS.region}. Podnikám jako fyzická osoba zapsaná v živnostenském rejstříku.`,
            `Nejmenoval jsem pověřence pro ochranu osobních údajů — pro rozsah zpracování, které tady popisuju, to zákon nevyžaduje. S čímkoli kolem svých údajů se obracejte přímo na ${EMAIL}.`,
        ],
    },
    {
        id: 'jake-udaje',
        number: '02',
        heading: 'Jaké údaje sbírám a proč',
        listIntro: 'Jediné místo na tomhle webu, kde se osobní údaje sbírají, je poptávkový formulář. Vyplňujete do něj:',
        list: [
            'jméno — abych věděl, komu odpovídám',
            'e-mailovou adresu — abych měl kam odpovědět',
            'text zprávy — cokoli do něj sami napíšete',
            'konfiguraci nabídky, pokud formulář odešlete z kalkulačky (vybraný balíček a doplňky)',
        ],
        paragraphs: [
            'Právním základem je jednání o smlouvě na Vaši žádost podle čl. 6 odst. 1 písm. b) GDPR. Údaje používám výhradně k tomu, abych Vám odpověděl a případně připravil nabídku. Nepoužívám je k rozesílání newsletterů ani je nikomu neprodávám.',
            'Vyplnění formuláře je dobrovolné. Pokud mi nechcete nechávat kontakt tímhle způsobem, napište mi rovnou e-mailem.',
        ],
    },
    {
        id: 'zpracovatele',
        number: '03',
        heading: 'Komu se údaje dostanou',
        listIntro: 'Neprodávám ani nepředávám údaje třetím stranám pro jejich vlastní účely. Na technickém provozu se ale podílejí tyto služby:',
        list: [
            'Formspree — doručuje odeslané formuláře na můj e-mail. Provozovatel sídlí v USA, takže dochází k předání údajů mimo EU.',
            'Cloudflare — hostuje tenhle web a zpracovává provozní logy (mimo jiné IP adresu) kvůli bezpečnosti a dostupnosti. Právním základem je oprávněný zájem podle čl. 6 odst. 1 písm. f) GDPR.',
            'Poskytovatel mé e-mailové schránky — jakmile mi zpráva dorazí, leží v ní jako každý jiný e-mail.',
        ],
    },
    {
        id: 'doba',
        number: '04',
        heading: 'Jak dlouho si je nechávám',
        paragraphs: [
            'Poptávky, ze kterých nevznikne spolupráce, mažu nejpozději do dvou let od poslední komunikace.',
            'Pokud ze zprávy vznikne zakázka, uchovávám údaje po dobu spolupráce a dál po zákonem stanovenou dobu pro účetní a daňové doklady.',
        ],
    },
    {
        id: 'cookies',
        number: '05',
        heading: 'Cookies a analytika',
        paragraphs: [
            'Tenhle web nepoužívá analytické ani marketingové cookies. Neběží na něm Google Analytics ani jiný nástroj, který by měřil Vaše chování na stránkách, a nikoho neprofiluju. Proto tu nenajdete ani cookie lištu — nemá k čemu žádat souhlas.',
            'Mám ověřenou Google Search Console, ta ale na webu nic neměří. Je to nástroj, který mi ukazuje, jak si stránky vedou ve výsledcích vyhledávání Google — tedy data, která Google nasbíral u sebe, ne u mě. Nevkládá do stránky žádný skript, nenastavuje Vám cookies a vidím z ní jen souhrnná čísla typu „tento odkaz se zobrazil stokrát", nikdy nic o konkrétním návštěvníkovi. Doména je pro ni ověřená přes DNS záznam, takže se samotného webu vůbec nedotýká.',
            'Pokud se to někdy změní a začnu měřit návštěvnost, změní se s tím i tenhle text a souhlasová lišta se objeví dřív, než se cokoli začne sbírat.',
        ],
    },
    {
        id: 'prava',
        number: '06',
        heading: 'Jaká máte práva',
        listIntro: 'V rozsahu, v jakém Vaše údaje zpracovávám, máte právo:',
        list: [
            'vědět, jaké údaje o Vás mám, a dostat jejich kopii',
            'nechat si je opravit, pokud nesedí',
            'nechat si je vymazat, pokud pro jejich zpracování nemám další zákonný důvod',
            'omezit zpracování nebo proti němu vznést námitku',
            'dostat je ve strojově čitelném formátu a přenést je jinam',
            'podat stížnost u Úřadu pro ochranu osobních údajů (uoou.gov.cz)',
        ],
        paragraphs: [
            `Stačí napsat na ${EMAIL}. Ozvu se nejpozději do měsíce a v drtivé většině případů výrazně dřív.`,
        ],
    },
]

export default function PrivacyPolicy() {
    return (
        <>
            <main className='relative z-1 flex w-full flex-col bg-dark font-jet text-light'>
                <header className='mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-40 pb-16'>
                    <p className={microClasses}>[ právní ]</p>

                    <SplitReveal
                        as='h1'
                        on='mount'
                        split='chars'
                        stagger={0.02}
                        className='text-3xl uppercase font-black leading-[1.15] tracking-[-0.03em] sm:text-5xl'
                    >
                        Ochrana osobních údajů
                    </SplitReveal>

                    <p className='max-w-2xl leading-relaxed text-light/70'>
                        Krátce a bez právničiny: na tomhle webu sbírám osobní údaje na jediném místě — v poptávkovém
                        formuláři. Tahle stránka popisuje, co s nimi dělám.
                    </p>
                </header>

                <div className='mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 pb-32'>
                    {SECTIONS.map((section) => (
                        <section key={section.id} id={section.id} className='flex flex-col gap-4 scroll-mt-24'>
                            <p className={microClasses}>{section.number}</p>

                            <h2 className='text-xl uppercase font-bold tracking-tight sm:text-2xl'>
                                {section.heading}
                            </h2>

                            {section.listIntro && (
                                <p className='leading-relaxed text-light/60'>{section.listIntro}</p>
                            )}

                            {section.list && (
                                <ul className='flex flex-col gap-2'>
                                    {section.list.map((item) => (
                                        <li key={item} className='flex gap-3 leading-relaxed text-light/60'>
                                            <span aria-hidden className='shrink-0 text-light/30'>—</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.paragraphs?.map((paragraph) => (
                                <p key={paragraph} className='leading-relaxed text-light/60'>{paragraph}</p>
                            ))}
                        </section>
                    ))}
                </div>
            </main>
            <Footer bg_color='light' />
        </>
    )
}
