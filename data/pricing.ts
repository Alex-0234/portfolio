/** Ceník - jeden zdroj pravdy pro karty na stránce Služby i pro kalkulačku v modalu. */

export interface Addon {
    id: string
    name: string
    price: number
    type?: 'toggle' | 'quantity'
    max?: number
    unit?: string
    excludes?: string[]
    includedIn?: string[]
    note?: string
}

export interface Tier {
    id: string
    name: string
    price: number
    description: string
}

export interface Package {
    id: string
    number: string
    name: string
    tagline: string
    timeline: string
    price?: number
    tiers?: Tier[]
    monthly?: boolean
    scope: string
    highlights: string[]
    includes: string[]
    addons: Addon[]
}

export const PACKAGES: Package[] = [
    {
        id: 'landing',
        number: '01',
        name: 'Landing page',
        tagline: 'jedna stránka, cca 5 sekcí',
        timeline: '1–2 týdny',
        price: 10000,
        scope: 'cena od',
        highlights: ['jedna stránka', 'on-page SEO', 'nasazení + doména'],
        includes: [
            'design + vývoj (až ~5 sekcí), plně responzivní',
            'základní on-page SEO (title, meta, nadpisy, sitemapa, OG tagy)',
            'kontaktní formulář',
            'nasazení na Cloudflare Pages + nastavení vlastní domény',
            'základní animace (plynulý scroll přes Lenis + pár GSAP přechodů)',
            'odkaz na autora v patičce („web od…") — odstranění za příplatek',
            '2 kola revizí',
        ],
        addons: [
            { id: 'cms_hosted', name: 'vlastní hostovaný CMS (Strapi)', price: 8000, excludes: ['cms_cloud'] },
            { id: 'cms_cloud', name: 'cloudový CMS (Sanity apod.)', price: 2800, excludes: ['cms_hosted'] },
            { id: 'lang', name: 'druhá jazyková verze', price: 3000 },
            { id: 'motion', name: 'animace / motion na míru', price: 3500 },
            { id: 'seo', name: 'pokročilé SEO', price: 2500 },
            { id: 'analytics', name: 'nastavení analytiky (GA4 + cíle)', price: 1500 },
            { id: 'copy', name: 'copywriting', price: 3000 },
            { id: 'nolink', name: 'odstranění odkazu „web od…"', price: 1500 },
        ],
    },
    {
        id: 'business',
        number: '02',
        name: 'Firemní web',
        tagline: 'vícestránkový web pro Vaši firmu',
        timeline: '2–4 týdny',
        price: 25000,
        scope: 'cena od',
        highlights: ['až 5 podstránek', 'administrace (CMS)', 'formulář s backendem'],
        includes: [
            'vše z balíčku Landing page',
            'až 5 podstránek (Úvod, O nás, Služby, Reference, Kontakt)',
            'administrace (CMS) pro novinky a reference',
            'CMS backend běží na vlastním serveru — hosting v ceně doplňku správy, nebo si ho zajistíte sami',
            'ostatní obsah je pevně v kódu — změny nad tento rámec jsou vícepráce',
            'formulář s backendem (databáze / zasílání e-mailem)',
            'nastavení analytiky a Search Console',
            'prémiové animace (GSAP + Lenis)',
            'předání administrace + zaškolení v úpravě obsahu',
            '2 kola revizí',
        ],
        addons: [
            { id: 'extra_page', name: 'stránka navíc', price: 2500, type: 'quantity', max: 5, unit: '/ stránka' },
            { id: 'lang', name: 'další jazyk', price: 5000 },
            { id: 'catalog', name: 'jednoduchý katalog produktů', price: 15000 },
            { id: 'booking', name: 'integrace rezervačního systému', price: 10000 },
            { id: 'seo', name: 'pokročilé SEO a schema', price: 4000 },
            { id: 'a11y', name: 'audit přístupnosti (WCAG)', price: 3500 },
            { id: 'copy', name: 'copywriting', price: 4500 },
            { id: 'newsletter', name: 'integrace newsletteru', price: 2500 },
            { id: 'thirdparty', name: 'integrace třetích stran (mapy/chat/sítě)', price: 4000 },
            { id: 'nolink', name: 'odstranění odkazu „web od…"', price: 3000 },
        ],
    },
    {
        id: 'mvp',
        number: '03',
        name: 'Webová aplikace',
        tagline: 'full-stack MVP — React + Node + MongoDB',
        timeline: '4–8 týdnů',
        price: 45000,
        scope: 'cena od',
        highlights: ['autentizace', 'API + databáze', 'admin dashboard'],
        includes: [
            'autentizace (přihlášení / registrace)',
            'databáze + základní CRUD a business logika',
            'backend / API na míru',
            'administrační rozhraní nebo dashboard',
            'responzivní UI + nasazení se základním CI/CD',
            '2 kola revizí',
        ],
        addons: [
            { id: 'payments', name: 'platební integrace', price: 20000 },
            { id: 'roles', name: 'role a oprávnění', price: 8000 },
            { id: 'notifications', name: 'e-mailové / push notifikace', price: 6000 },
            { id: 'reports', name: 'reporty, analytika a export dat', price: 10000 },
            { id: 'api', name: 'integrace API třetích stran', price: 12000 },
            { id: 'realtime', name: 'real-time funkce', price: 15000 },
            { id: 'pwa', name: 'podpora PWA', price: 7000 },
            { id: 'tests', name: 'sada automatizovaných testů', price: 8000 },
        ],
    },
    {
        id: 'maintenance',
        number: '04',
        name: 'Správa a údržba',
        tagline: 'základní péče, web zůstává v pořádku',
        timeline: 'průběžně',
        monthly: true,
        scope: 'měsíčně',
        highlights: ['hosting frontendu', 'aktualizace a záplaty', 'monitoring + zálohy'],
        tiers: [
            { id: 'basic', name: 'Základ', price: 600, description: 'hosting, aktualizace, záplaty, monitoring, zálohy' },
            { id: 'standard', name: 'Standard', price: 1500, description: 'vše ze Základu + 1–2 h měsíčních úprav' },
            { id: 'app', name: 'Aplikace', price: 3200, description: 'vše ze Základu + monitoring chyb, prioritní podpora, 3–4 h úprav' },
        ],
        includes: [
            'hosting frontendu v ceně (Cloudflare Pages)',
            'aktualizace závislostí a bezpečnostní záplaty',
            'monitoring dostupnosti (uptime)',
            'monitoring domény',
            'zálohy',
            'pro weby postavené mnou (jiné po dohodě)',
        ],
        addons: [
            { id: 'cms_hosting', name: 'hosting CMS / backend serveru', price: 500 },
            {
                id: 'priority',
                name: 'prioritní podpora',
                price: 400,
                includedIn: ['app'],
                note: 'Prioritní podpora je v úrovni Aplikace už zahrnutá.',
            },
            { id: 'extra_hour', name: 'hodina úprav navíc', price: 600, type: 'quantity', max: 4, unit: '/ hod.' },
        ],
    },
]

export const basePrice = (pkg: Package, tierId?: string) =>
    pkg.tiers ? (pkg.tiers.find((tier) => tier.id === tierId) ?? pkg.tiers[0]).price : pkg.price ?? 0

export const availableAddons = (pkg: Package, tierId?: string) =>
    pkg.addons.filter((addon) => !(tierId && addon.includedIn?.includes(tierId)))
