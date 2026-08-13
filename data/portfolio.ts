
export type PortfolioType = 'personal' | 'freelance' | 'work'

export interface ProjectLinks {
    github?: string
    npm?: string
    web?: string
}

export interface PortfolioPiece {
    number: number
    name: string
    type: PortfolioType
    startYear: number
    startMonth: number
    endYear?: number
    endMonth?: number
    color?: string
    description: string
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

export const LINKS: { key: keyof ProjectLinks; label: string }[] = [
    { key: 'github', label: 'GitHub' },
    { key: 'npm', label: 'npm' },
    { key: 'web', label: 'Web' },
]

export const PORTFOLIO: PortfolioPiece[] = [
    { number: 1, name: 'create-lazy-init', type: 'personal', startYear: 2026, startMonth: 6, description: 'CLI nástroj pro rychlou inicializaci projektů.', video: '/videos/cli-terminal.webm', links: { github: 'https://github.com/Alex-0234/create-lazy-init', npm: 'https://www.npmjs.com/package/create-lazy-init' } },
    { number: 2, name: 'cali-ascension', type: 'personal', startYear: 2026, startMonth: 2,  description: 'Gamifikovaná aplikace pro sledování tréninků se zaměřením na kalisteniku. Pomáhá s plynulým postupem ke složitějším cvikům.', video: '/videos/cali-ascension.webm', links: { web: 'https://cali-ascension.vercel.app/', github: 'https://github.com/Alex-0234/cali-ascension' }, image: '/images/cali-512x512.png', large: true },
    { number: 3, name: 'portfolio-old', type: 'personal', startYear: 2026, startMonth: 7, endYear: 2026, endMonth: 8, description: 'Tohle je můj starý portfólio web. Vytvořený jako domácí úkol, později upravený pro freelance práci. A nyní je nahrazen novým vícestránkovým portfóliem!', video: '/videos/portfolio-old.mp4', links: { github: 'https://github.com/Alex-0234/portfolio-old', web: 'https://portfolio-old.alexliska.workers.dev/'} },
    { number: 4, name: 'portfolio', type: 'personal', startYear: 2026, startMonth: 8, description: 'Toto je můj aktuální portfólio web. Je to vícestránkový portfólio pro škálovatelnost a zvýšenou viditelnost ve vyhledávači Google.', video: '/videos/portfolio.webm', links: {} },
    { number: 5, name: 'eshop-koncept', type: 'freelance', startYear: 2026, startMonth: 8, description: 'Koncept poměrně malého eshopu. Aktuálně na něm pracuju. Zatím jsem strávil 3 hodiny stavbou a to spíše na věcech v pozadí.', video: '/videos/eshop-koncept.mp4', links: {web: 'https://eshop-concept.alexliska.workers.dev/', github: 'https://github.com/Alex-0234/eshop-concept'} },

]

const formatMonthYear = (year: number, month: number) => `${String(month).padStart(2, '0')}/${year}`

export const formatDateRange = (project: PortfolioPiece) => {
    const start = formatMonthYear(project.startYear, project.startMonth)
    if (!project.endYear || !project.endMonth) return `${start} – Present`
    return `${start} – ${formatMonthYear(project.endYear, project.endMonth)}`
}
