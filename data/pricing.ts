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

/** Časově omezená sleva s důvodem — drží ceník nedotčený, až zaváděcí cena skončí,
 *  stačí smazat `intro` a nikomu nevysvětluješ zdražení. */
export interface Intro {
    price: number
    note: string
}

export interface Package {
    id: string
    number: string
    name: string
    tagline: string
    timeline: string
    price?: number
    intro?: Intro
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
        name: 'Malý web',
        tagline: 'landing page nebo web do 3 stránek',
        timeline: '1–2 týdny od podkladů',
        price: 12000,
        scope: 'cena od',
        highlights: ['až 3 stránky', 'on-page SEO', 'nasazení + doména'],
        includes: [
            'design + vývoj, plně responzivní (úvodní stránka cca 5 sekcí)',
            'až 3 stránky celkem (např. Úvod, Služby, Kontakt)',
            'základní on-page SEO (title, meta, nadpisy, sitemapa, OG tagy)',
            'kontaktní formulář',
            'nasazení na Cloudflare Pages + nastavení vlastní domény',
            'základní animace (plynulý scroll přes Lenis + pár GSAP přechodů)',
            'obsah nasazuji já — administrace není součástí, lze přidat jako doplněk',
            'odkaz na autora v patičce („web od…") — odstranění za příplatek',
            'texty a fotografie dodáváte Vy — copywriting je volitelný doplněk',
            '2 kola připomínek v ceně, další úpravy hodinově',
        ],
        addons: [
            { id: 'extra_page', name: 'stránka navíc', price: 2000, type: 'quantity', max: 3, unit: '/ stránka' },
            { id: 'cms_hosted', name: 'administrace (vlastní hostovaný CMS — Strapi)', price: 8000, excludes: ['cms_cloud'] },
            { id: 'cms_cloud', name: 'administrace (cloudový CMS — Sanity apod.)', price: 2800, excludes: ['cms_hosted'] },
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
        timeline: '2–4 týdny od podkladů',
        price: 25000,
        intro: {
            price: 16000,
            note: 'Zaváděcí cena pro první 3 zakázky — výměnou za referenci, souhlas se zveřejněním v portfoliu a krátký citát. Platí do naplnění tří míst.',
        },
        scope: 'cena od',
        highlights: ['až 5 podstránek', 'formulář s backendem', 'analytika + Search Console'],
        includes: [
            'vše z balíčku Malý web',
            'až 5 podstránek (Úvod, O nás, Služby, Reference, Kontakt)',
            'formulář s backendem (databáze / zasílání e-mailem)',
            'nastavení analytiky a Search Console',
            'prémiové animace (GSAP + Lenis)',
            'obsah nasazuji já — administraci si přidáte jako doplněk, pokud ji chcete',
            'předání přístupů + zaškolení',
            'texty a fotografie dodáváte Vy — copywriting je volitelný doplněk',
            '2 kola připomínek v ceně, další úpravy hodinově',
        ],
        addons: [
            { id: 'cms_hosted', name: 'administrace (vlastní hostovaný CMS — Strapi)', price: 9000, excludes: ['cms_cloud'] },
            { id: 'cms_cloud', name: 'administrace (cloudový CMS — Sanity apod.)', price: 4000, excludes: ['cms_hosted'] },
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
        tagline: 'full-stack MVP na Next.js — cena po úvodní analýze',
        timeline: '4–8 týdnů od podkladů',
        price: 45000,
        scope: 'cena od',
        highlights: ['autentizace', 'API + databáze', 'admin dashboard'],
        includes: [
            'úvodní analýza rozsahu — teprve z ní vzejde pevná cena a termín',
            'autentizace (přihlášení / registrace)',
            'databáze + základní CRUD a business logika',
            'backend / API na míru (Next.js route handlers, případně samostatný Node backend)',
            'administrační rozhraní nebo dashboard',
            'responzivní UI + nasazení se základním CI/CD',
            'texty a fotografie dodáváte Vy — copywriting je volitelný doplněk',
            '2 kola připomínek v ceně, další úpravy hodinově',
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
        tagline: 'web zůstává v provozu, aktuální a zálohovaný',
        timeline: 'průběžně',
        monthly: true,
        scope: 'měsíčně',
        highlights: ['hosting frontendu v ceně', 'aktualizace a zálohy', 'opravy chyb zdarma'],
        tiers: [
            {
                id: 'basic',
                name: 'Základ',
                price: 600,
                description: 'hosting frontendu, aktualizace a záplaty, monitoring dostupnosti, zálohy — a opravy chyb v mé práci zdarma',
            },
            {
                id: 'standard',
                name: 'Standard',
                price: 1200,
                description: 'vše ze Základu + odpověď do 24 h v pracovní dny, drobné úpravy obsahu a měsíční report',
            },
            {
                id: 'app',
                name: 'Aplikace',
                price: 2400,
                description: 'pro weby s backendem — vše ze Standardu + správa serveru, monitoring chyb a prioritní fronta',
            },
        ],
        includes: [
            'hosting frontendu v ceně (Cloudflare Pages) — žádná další faktura za provoz webu',
            'aktualizace závislostí a bezpečnostní záplaty',
            'monitoring dostupnosti (uptime) — když web spadne, řeším to já, nemusíte si toho všimnout Vy',
            'zálohy včetně ověřeného obnovení — web zpět v provozu do 24 h',
            'opravy chyb v mém vlastním kódu zdarma po celou dobu správy',
            'hlídání expirace domény — registraci platíte přímo registrátorovi a doména zůstává psaná na Vás',
            'úpravy textů cookie lišty a GDPR podle změn legislativy',
            'pro weby postavené mnou (jiné po dohodě)',
        ],
        addons: [
            { id: 'cms_hosting', name: 'hosting CMS / backend serveru', price: 700 },
            {
                id: 'server_care',
                name: 'správa serveru (aktualizace, restarty, zálohy databáze)',
                price: 700,
                includedIn: ['app'],
                note: 'Správa serveru je v úrovni Aplikace už zahrnutá — aplikace se bez udržovaného backendu neobejde.',
            },
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
