'use client'

interface Package {
    name: string
    price: string
    tagline: string
    timeline: string
    includes: string[]
    addons: string[]
}

const PACKAGES: Package[] = [
    {
        name: 'Landing Page',
        price: 'od 10 000 Kč',
        tagline: 'jedna stránka, cca 5 sekcí',
        timeline: '1–2 týdny',
        includes: [
            'design + vývoj (až ~5 sekcí), plně responzivní',
            'základní on-page SEO (title, meta, nadpisy, sitemapa, OG tagy)',
            'kontaktní formulář',
            'nasazení na Cloudflare Pages + nastavení domény',
            'základní animace (Lenis + pár GSAP přechodů)',
            '2 kola revizí',
        ],
        addons: [
            'vlastní hostovaný CMS (Strapi) — 8 000 Kč',
            'cloudový CMS (Sanity apod.) — 2 800 Kč',
            'druhá jazyková verze — 3 000 Kč',
            'animace / motion na míru — 3 500 Kč',
            'pokročilé SEO — 2 500 Kč',
            'nastavení analytiky (GA4 + cíle) — 1 500 Kč',
            'copywriting — 3 000 Kč',
            'odstranění odkazu „web od…“ — 1 500 Kč',
        ],
    },
    {
        name: 'Firemní web',
        price: 'od 25 000 Kč',
        tagline: 'vícestránkový web pro Vaši firmu',
        timeline: '2–4 týdny',
        includes: [
            'vše z balíčku Landing Page',
            'až 5 podstránek (Úvod, O nás, Služby, Reference, Kontakt)',
            'administrace (CMS) pro novinky a reference',
            'formulář s backendem (databáze / e-mail)',
            'nastavení analytiky a Search Console',
            'prémiové animace (GSAP + Lenis)',
            'předání administrace + zaškolení',
            '2 kola revizí',
        ],
        addons: [
            'stránka navíc — 2 500 Kč / stránka (max. 5)',
            'další jazyk — 5 000 Kč',
            'jednoduchý katalog produktů — 15 000 Kč',
            'integrace rezervačního systému — 10 000 Kč',
            'pokročilé SEO a schema — 4 000 Kč',
            'audit přístupnosti (WCAG) — 3 500 Kč',
            'copywriting — 4 500 Kč',
            'integrace newsletteru — 2 500 Kč',
            'integrace třetích stran (mapy/chat/sociální sítě) — 4 000 Kč',
            'odstranění odkazu „web od…“ — 3 000 Kč',
        ],
    },
    {
        name: 'Webová aplikace (MVP)',
        price: 'od 45 000 Kč',
        tagline: 'full-stack, React + Node + MongoDB',
        timeline: '4–8 týdnů',
        includes: [
            'autentizace (přihlášení / registrace)',
            'databáze + základní CRUD / business logika',
            'backend / API na míru',
            'administrační rozhraní nebo dashboard',
            'responzivní UI + nasazení se základním CI/CD',
            '2 kola revizí',
        ],
        addons: [
            'platební integrace — 20 000 Kč',
            'role a oprávnění — 8 000 Kč',
            'e-mailové/push notifikace — 6 000 Kč',
            'reporty, analytika a export dat — 10 000 Kč',
            'integrace API třetích stran — 12 000 Kč',
            'real-time funkce — 15 000 Kč',
            'podpora PWA — 7 000 Kč',
            'sada automatizovaných testů — 8 000 Kč',
        ],
    },
]

const MAINTENANCE_TIERS = [
    { name: 'Základ', price: '600 Kč / měs.', description: 'hosting frontendu, aktualizace závislostí, bezpečnostní záplaty, kontrola dostupnosti, monitoring domény, zálohy' },
    { name: 'Standard', price: '1 500 Kč / měs.', description: 'vše ze Základu + 1–2 h měsíčních úprav' },
    { name: 'Aplikace', price: '3 200 Kč / měs.', description: 'vše ze Základu + monitoring chyb, prioritní podpora, 3–4 h měsíčních úprav' },
]

const PROCESS = [
    { title: 'Poptávka', description: 'Napíšete mi přes formulář nebo e-mail, co potřebujete.' },
    { title: 'Úvodní konzultace', description: 'Probereme rozsah, cíle a rozpočet.' },
    { title: 'Návrh a nacenění', description: 'Dostanete konkrétní nabídku s pevnou cenou a termínem.' },
    { title: 'Vývoj', description: 'Stavím web, průběžně vidíte progres.' },
    { title: 'Předání a zaškolení', description: 'Dostanete přístupy, administraci a případně zaškolení.' },
    { title: 'Podpora', description: 'Volitelně navazuje balíček Správa a údržba.' },
]

const FAQ = [
    { q: 'Jak dlouho trvá tvorba webu?', a: 'Podle rozsahu — landing page 1–2 týdny, firemní web 2–4 týdny, webová aplikace 4–8 týdnů.' },
    { q: 'Co když přesně nevím, co potřebuju?', a: 'Není problém, na to je úvodní konzultace — společně to vyladíme.' },
    { q: 'Poskytujete hosting?', a: 'Ano, v rámci balíčku Správa a údržba. Bez něj hosting předávám na Váš účet.' },
    { q: 'Jak probíhá platba?', a: 'Záloha 30–50 % předem, zbytek po předání. Práce nad rámec zadání se účtuje hodinově.' },
    { q: 'Budu moct web upravovat sám?', a: 'U firemního webu ano — obsah jde upravovat přes administraci, na kterou Vás zaškolím.' },
]

export default function Offers() {
    return (
        <section className='flex flex-col w-full h-auto bg-dark text-light'>
            <div className='flex flex-col items-center text-center gap-4 w-full max-w-3xl mx-auto px-6 pt-32 pb-16'>
                <span className='text-light/40 text-sm'>[ pevný rozsah · ceny od · žádná překvapení ]</span>
                <h1 className='text-3xl md:text-4xl'>Spolupráce se mnou</h1>
                <p className='text-light/70'>
                    Základní ceny — finální cena závisí na tom, jaké funkce skutečně potřebujete.
                    Nejste si jistí, co potřebujete? Napište mi e-mail.
                </p>
            </div>

            <div className='w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
                {PACKAGES.map((pkg) => (
                    <div key={pkg.name} className='flex flex-col rounded-xl border border-light/10 p-6'>
                        <h2 className='text-xl'>{pkg.name}</h2>
                        <p className='text-light/50 text-sm mt-1'>{pkg.tagline}</p>
                        <p className='text-2xl mt-4'>{pkg.price}</p>
                        <p className='text-light/50 text-sm'>{pkg.timeline}</p>

                        <p className='text-light/70 text-sm mt-6 mb-2 font-medium'>Co je součástí</p>
                        <ul className='flex flex-col gap-1.5'>
                            {pkg.includes.map((item) => (
                                <li key={item} className='text-light/60 text-sm'>• {item}</li>
                            ))}
                        </ul>

                        <p className='text-light/70 text-sm mt-6 mb-2 font-medium'>Volitelné doplňky</p>
                        <ul className='flex flex-col gap-1.5'>
                            {pkg.addons.map((item) => (
                                <li key={item} className='text-light/60 text-sm'>• {item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className='w-full max-w-6xl mx-auto px-6 py-16'>
                <h2 className='text-2xl mb-2'>Správa a údržba</h2>
                <p className='text-light/60 mb-6'>Základní péče, web zůstává v pořádku. Pro weby postavené mnou (jiné po dohodě).</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {MAINTENANCE_TIERS.map((tier) => (
                        <div key={tier.name} className='rounded-xl border border-light/10 p-6'>
                            <h3 className='text-lg'>{tier.name}</h3>
                            <p className='text-xl mt-2'>{tier.price}</p>
                            <p className='text-light/60 text-sm mt-2'>{tier.description}</p>
                        </div>
                    ))}
                </div>
                <p className='text-light/40 text-sm mt-6'>
                    Práce nad rámec dohodnutého zadání se účtuje hodinově (~600 Kč/h) · záloha 30–50 % předem.
                    Doména a placené služby třetích stran nejsou součástí ceny.
                </p>
            </div>

            <div className='w-full max-w-6xl mx-auto px-6 py-16'>
                <h2 className='text-2xl mb-8'>Jak probíhá spolupráce</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {PROCESS.map((step, index) => (
                        <div key={step.title} className='rounded-xl border border-light/10 p-6'>
                            <span className='text-light/30 text-sm'>{String(index + 1).padStart(2, '0')}</span>
                            <p className='font-medium mt-2'>{step.title}</p>
                            <p className='text-light/60 text-sm mt-1'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full max-w-3xl mx-auto px-6 py-16'>
                <h2 className='text-2xl mb-8'>Časté dotazy</h2>
                <div className='flex flex-col gap-6'>
                    {FAQ.map((item) => (
                        <div key={item.q} className='border-b border-light/10 pb-6'>
                            <p className='font-medium'>{item.q}</p>
                            <p className='text-light/60 mt-2'>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full max-w-3xl mx-auto px-6 pb-32'>
                <div className='rounded-xl border border-light/10 p-8'>
                    <h2 className='text-2xl mb-6'>Poptávka</h2>
                    <form className='flex flex-col gap-4'>
                        <input
                            type='text'
                            placeholder='Jméno'
                            className='rounded-xl border border-light/10 bg-transparent px-4 py-3 placeholder:text-light/30'
                        />
                        <input
                            type='email'
                            placeholder='E-mail'
                            className='rounded-xl border border-light/10 bg-transparent px-4 py-3 placeholder:text-light/30'
                        />
                        <textarea
                            placeholder='co budeme stavět?'
                            rows={4}
                            className='rounded-xl border border-light/10 bg-transparent px-4 py-3 placeholder:text-light/30 resize-none'
                        />
                        <button
                            type='submit'
                            className='rounded-xl bg-light text-dark px-6 py-3 font-medium hover:opacity-90 transition-opacity'
                        >
                            Odeslat
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
