import Button from "@/components/button"
import Footer from "@/components/footer"
import PricingPackages from "@/components/pricingPackages"
import SplitReveal from "@/components/splitReveal"
import { PACKAGES } from "@/data/pricing"
import { SITE_URL } from "@/data/site"
import { pageMetadata } from "@/utils/metadata"
import { formatPrice } from "@/utils/price"

export const metadata = pageMetadata({
    title: "Služby a ceník",
    description: "Malý web, firemní web, webová aplikace nebo správa webu — ceny od, kalkulačka a poptávkový formulář.",
    path: "/offers",
})

const PROCESS = [
    { title: 'Poptávka a konzultace', description: 'Napíšete mi přes formulář nebo e-mail, co potřebujete, a probereme rozsah, cíle i rozpočet.' },
    { title: 'Návrh a nacenění', description: 'Dostanete konkrétní nabídku s pevnou cenou a termínem — u webových aplikací až po úvodní analýze rozsahu.' },
    { title: 'Předání podkladů', description: 'Pošlete texty, fotky a přístupy. Teprve tímhle krokem začíná běžet termín.' },
    { title: 'Vývoj', description: 'Stavím web, průběžně vidíte progres.' },
    { title: 'Předání a zaškolení', description: 'Dostanete přístupy, administraci a případně zaškolení.' },
    { title: 'Podpora', description: 'Volitelně navazuje balíček Správa a údržba.' },
]

const FAQ = [
    {
        q: 'Jak dlouho trvá tvorba webu?',
        a: 'Podle rozsahu — malý web 1–2 týdny, firemní web 2–4 týdny, webová aplikace 4–8 týdnů. Termín běží od dodání podkladů, ne od objednávky: nejčastější příčinou zpoždění nebývá vývoj, ale čekání na texty a fotky.',
    },
    {
        q: 'Kdo píše texty a dodává fotky?',
        a: 'Standardně Vy — texty a fotografie nejsou v ceně balíčku. Pokud na to nemáte čas nebo chuť, copywriting je volitelný doplněk u každého balíčku.',
    },
    { q: 'Co když přesně nevím, co potřebuju?', a: 'Není problém, na to je úvodní konzultace — společně to vyladíme.' },
    {
        q: 'Poskytujete hosting?',
        a: 'Hosting frontendu je v ceně balíčku Správa a údržba, takže za provoz webu už nedostanete druhou fakturu. Bez správy hosting předávám na Váš účet. Administrace (CMS) a backend aplikace potřebují server navíc — ten je doplňkem správy a v úrovni Aplikace je rovnou zahrnutý.',
    },
    {
        q: 'Kdo platí doménu a komu bude patřit?',
        a: 'Doména se registruje na Vás, jste jejím držitelem od začátku a platíte ji přímo registrátorovi — obvykle pár set korun ročně. Není to schované v mé faktuře schválně: doménu, kterou drží dodavatel, Vám nikdo nevrátí, když se spolupráce rozejde. Ve správě Vám hlídám datum expirace, protože propadlá doména dnes končí v aukci.',
    },
    { q: 'Jak probíhá platba?', a: 'Záloha 50 % předem, zbytek po předání. Práce nad rámec zadání se účtuje hodinově.' },
    {
        q: 'Budu moct web upravovat sám?',
        a: 'Podle toho, jestli si přiberete administraci (CMS) jako doplněk. S ní si novinky, reference a texty upravujete sami a zaškolím Vás. Bez ní obsah nasazuji já — u webů, které se mění párkrát do roka, to vychází levněji než platit administraci, kterou nikdo neotevře.',
    },
    {
        q: 'Proč není administrace rovnou v ceně?',
        a: 'Protože ji velká část malých firem nikdy nepoužije. Je to nejdražší část webu na výrobu i na následnou podporu, takže mi přijde férovější nechat rozhodnutí na Vás, než ji naúčtovat všem.',
    },
    {
        q: 'Kolik mám kol připomínek?',
        a: 'Dvě kola připomínek jsou v ceně u všech balíčků. Další úpravy se účtují hodinově (~600 Kč/h). Uvádím to schválně konkrétním číslem — „revize v ceně" bez čísla je věta, na které se spolupráce často pokazí.',
    },
    { q: 'Co po předání, když najdu chybu?', a: 'Chyba proti dohodnutému zadání se opravuje zdarma i po vyčerpání kol připomínek. Nové požadavky nad rámec zadání řešíme ve správě nebo hodinově.' },
    {
        q: 'Za jak dlouho odpovíte na poptávku?',
        a: 'Do 24 hodin v pracovní dny.',
    },
]

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

const offer = (name: string, description: string, price: number, monthly: boolean) => ({
    '@type': 'Offer',
    name,
    priceCurrency: 'CZK',
    priceSpecification: monthly
        ? {
            '@type': 'UnitPriceSpecification',
            price,
            priceCurrency: 'CZK',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        }
        : {
            '@type': 'PriceSpecification',
            minPrice: price,
            priceCurrency: 'CZK',
        },
    itemOffered: {
        '@type': 'Service',
        name,
        description,
        provider: { '@id': `${SITE_URL}/#sluzby` },
    },
})

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/offers#cenik`,
    name: 'Služby a ceník',
    url: `${SITE_URL}/offers`,
    provider: { '@id': `${SITE_URL}/#sluzby` },
    itemListElement: PACKAGES.flatMap((pkg) =>
        pkg.tiers
            ? pkg.tiers.map((tier) =>
                offer(`${pkg.name} — ${tier.name}`, tier.description, tier.price, pkg.monthly ?? false))
            : pkg.price
                /* strukturovaná data musí sedět na cenu, která je na stránce vidět,
                   jinak to Google hlásí jako nesoulad */
                ? [offer(pkg.name, pkg.tagline, pkg.intro?.price ?? pkg.price, pkg.monthly ?? false)]
                : []
    ),
}

export default function Offers() {
    return (
        <>
        <main className='relative z-1 flex w-full flex-col bg-dark font-jet text-light'>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <header className='flex min-h-svh w-full flex-col justify-center gap-10 px-6 pt-32 pb-16'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
                    <p className={microClasses}>[ pevný rozsah · ceny od · žádná překvapení ]</p>

                    <h1 className='-my-[0.2em] uppercase font-black leading-[1.4] tracking-[-0.042em] text-[clamp(2.75rem,11vw,9rem)]'>
                        <SplitReveal as='span' on='mount' split='chars' stagger={0.02} className='block'>
                            Spolupráce
                        </SplitReveal>
                        <SplitReveal as='span' on='mount' split='chars' stagger={0.02} delay={0.15} className='-mt-[0.5em] block ml-[8%] sm:ml-[22%]'>
                            se mnou
                        </SplitReveal>
                    </h1>

                    <div className='flex flex-col gap-4 max-w-2xl'>
                        <SplitReveal on='mount' delay={0.4} className='text-light/70 leading-relaxed'>
                            Stavím weby a webové aplikace na míru — od jednoduché prezentace po aplikaci s vlastním
                            backendem, databází a administrací. Rozsah, cenu i termín si domluvíme předem, takže víte,
                            co dostanete a kdy.
                        </SplitReveal>
                        <p className='text-sm text-light/50'>
                            Základní ceny — finální cena závisí na tom, jaké funkce skutečně potřebujete.
                        </p>
                        <p className='text-sm text-confirm'>Aktuálně přijímám nové projekty</p>
                    </div>

                    <div className='flex flex-wrap gap-4'>
                        <Button href='#balicky' variant='solid'>Sestavit nabídku</Button>
                        <Button href='/portfolio'>Prohlédnout portfolio</Button>
                    </div>
                </div>

                <ul className='mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 border-t border-light/10 sm:grid-cols-2 lg:grid-cols-4'>
                    {PACKAGES.map((pkg) => (
                        <li key={pkg.id} className='border-b border-light/10 lg:border-b-0 lg:border-r lg:last:border-r-0'>
                            <a href={`#${pkg.id}`} className='flex flex-col gap-1 px-4 py-5 transition-colors hover:bg-light/5'>
                                <span className={microClasses}>{pkg.number}</span>
                                <span className='text-sm uppercase tracking-wide'>{pkg.name}</span>
                                <span className='text-sm text-light/50 tabular-nums'>
                                    {pkg.scope} {formatPrice(pkg.tiers ? pkg.tiers[0].price : pkg.price ?? 0)}
                                    {pkg.monthly && ' / měs.'}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </header>

            <div id='balicky' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ balíčky ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Co pro Vás postavím
                    </SplitReveal>
                    <p className='max-w-xl text-sm text-light/50'>
                        Otevřete si kalkulačku, naklikejte doplňky, které potřebujete, a rovnou odešlete poptávku
                        i s konfigurací.
                    </p>
                </div>

                <PricingPackages />
            </div>

            <div className='mx-auto w-full max-w-6xl px-6 py-24'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ postup ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Jak probíhá spolupráce
                    </SplitReveal>
                </div>

                <ol className='grid grid-cols-1 gap-px bg-light/10 sm:grid-cols-2 lg:grid-cols-3'>
                    {PROCESS.map((step, index) => (
                        <li key={step.title} className='flex flex-col gap-2 bg-dark p-6'>
                            <span className={microClasses}>{String(index + 1).padStart(2, '0')}</span>
                            <p className='uppercase tracking-wide'>{step.title}</p>
                            <p className='text-sm text-light/50'>{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <div className='mx-auto w-full max-w-3xl px-6 py-24'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ časté dotazy ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Na co se ptáte
                    </SplitReveal>
                </div>

                <div className='flex flex-col'>
                    {FAQ.map((item) => (
                        <details key={item.q} className='group border-b border-light/10'>
                            <summary className='flex cursor-pointer items-center justify-between gap-4 py-5 list-none [&::-webkit-details-marker]:hidden'>
                                <span className='text-sm sm:text-base'>{item.q}</span>
                                <span aria-hidden className='shrink-0 text-light/50 transition-transform duration-300 group-open:rotate-45'>+</span>
                            </summary>
                            <p className='pb-5 text-sm text-light/50 leading-relaxed'>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </main>
        <Footer bg_color='light' />
        </>
    )
}
