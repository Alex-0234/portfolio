
export type PortfolioType = 'personal' | 'freelance' | 'work'

export interface ProjectLinks {
    github?: string
    npm?: string
    web?: string
}

/** „Pro koho, co bylo zadání, co z toho vzešlo" — struktura, ze které si laik
 *  odnese víc než z názvu repozitáře. */
export interface Brief {
    client: string
    task: string
    result: string
}

export interface PortfolioPiece {
    number: number
    name: string
    /** česky a bez žargonu — na kartě to nese význam, který název repozitáře neunese */
    subtitle: string
    type: PortfolioType
    startYear: number
    startMonth: number
    endYear?: number
    endMonth?: number
    color?: string
    description: string
    brief?: Brief
    image?: string
    video?: string
    links: ProjectLinks
    large?: boolean
}

export const TYPE_LABEL: Record<PortfolioType, string> = {
    personal: 'Personal',
    freelance: 'Freelance',
    work: 'Work',
}

export const BRIEF_LABELS: { key: keyof Brief; label: string }[] = [
    { key: 'client', label: 'Pro koho' },
    { key: 'task', label: 'Zadání' },
    { key: 'result', label: 'Výsledek' },
]

export const LINKS: { key: keyof ProjectLinks; label: string }[] = [
    { key: 'github', label: 'GitHub' },
    { key: 'npm', label: 'npm' },
    { key: 'web', label: 'Web' },
]

export const PORTFOLIO: PortfolioPiece[] = [
    {
        number: 1,
        name: 'cali-ascension',
        subtitle: 'Webová aplikace pro sledování tréninku',
        type: 'personal',
        startYear: 2026,
        startMonth: 2,
        description:
            'Gamifikovaná aplikace pro sledování tréninků se zaměřením na kalisteniku. Pomáhá s plynulým postupem ke složitějším cvikům.',
        brief: {
            client: 'Vlastní projekt — pro lidi, kteří cvičí kalisteniku a chtějí postupovat systematicky, ne náhodně.',
            task: 'Ukázat cestu ke složitějším cvikům tak, aby bylo na první pohled vidět, co už člověk zvládne a co je logicky další krok.',
            result: 'Nasazená a veřejně dostupná aplikace. Nejde o statickou prezentaci, ale o web, který si drží stav uživatele a počítá s jeho postupem v čase.',
        },
        video: '/videos/cali-ascension.webm',
        links: { web: 'https://cali-ascension.vercel.app/', github: 'https://github.com/Alex-0234/cali-ascension' },
        image: '/images/cali-512x512.png',
        large: true,
    },
    {
        number: 2,
        name: 'create-lazy-init',
        subtitle: 'Nástroj pro vývojáře, zveřejněný na npm',
        type: 'personal',
        startYear: 2026,
        startMonth: 6,
        description: 'CLI nástroj pro rychlou inicializaci projektů.',
        brief: {
            client: 'Vlastní open-source nástroj pro ostatní vývojáře.',
            task: 'Nahradit opakované ruční nastavování každého nového projektu jedním příkazem.',
            result: 'Balíček veřejně publikovaný na npm, odkud si ho může stáhnout kdokoliv. Pro klienta je podstatné hlavně to, že se stejná úspora času promítá do každé zakázky, kterou začínám.',
        },
        video: '/videos/cli-terminal.webm',
        links: {
            github: 'https://github.com/Alex-0234/create-lazy-init',
            npm: 'https://www.npmjs.com/package/create-lazy-init',
        },
    },
    {
        number: 3,
        name: 'Tento web',
        subtitle: 'Vícestránkové portfolio s ceníkem a blogem',
        type: 'personal',
        startYear: 2026,
        startMonth: 8,
        description:
            'Vícestránkový web postavený na stejném stacku, který nabízím klientům — Next.js, TypeScript, Tailwind, nasazení na Cloudflare.',
        brief: {
            client: 'Vlastní web — zároveň ukázka toho, co stavím.',
            task: 'Nahradit jednu statickou stránku webem, který se dá rozšiřovat a má šanci se dostat výš ve vyhledávání.',
            result: 'Web s blogem, ceníkem a konfigurátorem nabídky, ve kterém si zájemce naklikne rozsah a rovnou odešle poptávku. Rychlost a technické SEO řeším tady stejně jako u zakázek.',
        },
        video: '/videos/portfolio.webm',
        links: {},
    },
    {
        number: 4,
        name: 'eshop-koncept',
        subtitle: 'Koncept e-shopu — rozpracováno',
        type: 'freelance',
        startYear: 2026,
        startMonth: 8,
        description:
            'Koncept menšího e-shopu, na kterém průběžně pracuju. Zatím jsou hotové hlavně věci v pozadí, ne finální vzhled.',
        brief: {
            client: 'Interní koncept, zatím bez zadavatele.',
            task: 'Ověřit si, kde má e-shop na míru smysl proti hotové platformě — tedy tam, kde standardní řešení nestačí (konfigurátory, ceny podle rozměru, B2B ceníky).',
            result: 'Rozpracováno. Zveřejňuju to takhle otevřeně schválně, ať je jasné, co je hotová práce a co teprve vzniká.',
        },
        video: '/videos/eshop-koncept.mp4',
        links: {
            web: 'https://eshop-concept.alexliska.workers.dev/',
            github: 'https://github.com/Alex-0234/eshop-concept',
        },
    },
]

const formatMonthYear = (year: number, month: number) => `${String(month).padStart(2, '0')}/${year}`

export const formatDateRange = (project: PortfolioPiece) => {
    const start = formatMonthYear(project.startYear, project.startMonth)
    if (!project.endYear || !project.endMonth) return `${start} – Present`
    return `${start} – ${formatMonthYear(project.endYear, project.endMonth)}`
}
