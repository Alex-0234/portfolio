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
    { number: 1, name: 'Todo-tracker', type: 'personal', startYear: 2026, startMonth: 7, endYear: 2026, endMonth: 5, description: '', links: {} },
    { number: 2, name: 'create-lazy-init', type: 'personal', startYear: 2026, startMonth: 4, endYear: 2026, endMonth: 5, description: 'CLI nástroj pro rychlé zakládání rozpracovaných projektů.', links: {} },
    { number: 3, name: 'cali-ascension', type: 'personal', startYear: 2026, startMonth: 1, endYear: 2026, endMonth: 3, description: 'Gamifikovaná aplikace pro sledování tréninků se zaměřením na kalisteniku. Pomáhá s plynulým postupem ke složitějším cvikům.', links: { web: 'https://cali-ascension.vercel.app/', github: 'https://github.com/Alex-0234/cali-ascension' }, large: true },
    { number: 4, name: 'portfolio-old', type: 'personal', startYear: 2025, startMonth: 10, endYear: 2025, endMonth: 11, description: '', links: {} },
    { number: 5, name: 'Design System', type: 'freelance', startYear: 2025, startMonth: 6, endYear: 2025, endMonth: 9, description: '', links: {} },
    { number: 6, name: 'Side Project', type: 'freelance', startYear: 2025, startMonth: 6, description: '', links: {} },
    { number: 7, name: 'E-commerce Build', type: 'freelance', startYear: 2025, startMonth: 3, endYear: 2025, endMonth: 4, description: '', links: {} },
    { number: 8, name: 'Portfolio', type: 'personal', startYear: 2025, startMonth: 1, endYear: 2025, endMonth: 2, description: '', links: {} },
    { number: 9, name: 'Generative Art', type: 'personal', startYear: 2024, startMonth: 10, description: '', links: {}, large: true },
    { number: 10, name: 'Booking Platform', type: 'freelance', startYear: 2024, startMonth: 6, endYear: 2024, endMonth: 8, description: '', links: {} },
]

const formatMonthYear = (year: number, month: number) => `${String(month).padStart(2, '0')}/${year}`

export const formatDateRange = (project: PortfolioPiece) => {
    const start = formatMonthYear(project.startYear, project.startMonth)
    if (!project.endYear || !project.endMonth) return `${start} – Present`
    return `${start} – ${formatMonthYear(project.endYear, project.endMonth)}`
}
