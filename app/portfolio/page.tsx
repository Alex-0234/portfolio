'use client'

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"

import ProjectModal from "@/components/projectModal"
import ProjectPreview from "@/components/projectPreview"
import { PORTFOLIO, TYPE_LABEL, formatDateRange, type PortfolioPiece, type PortfolioType } from "@/data/portfolio"

const FILTERS: Array<PortfolioType | 'all'> = ['all', 'personal', 'freelance', 'work']

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const [activeType, setActiveType] = useState<PortfolioType | 'all'>('all')
    /* zásobník otevřených oken - poslední je navrchu */
    const [open, setOpen] = useState<PortfolioPiece[]>([])
    const [hovered, setHovered] = useState<PortfolioPiece | null>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1280px)', () => {
            const track = trackRef.current
            const section = sectionRef.current
            if (!track || !section) return

            const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

            /* karty jsou široké na třetinu obrazovky, takže se pár projektů vejde
               bez posunu - pin by pak jen zablokoval stránku bez efektu. Jakmile
               projektů přibude a track přeteče, horizontální scroll naskočí sám.
               Práh je 1px, ne 0 - track vychází přesně na šířku kontejneru a
               rozdíl v desetinách pixelu není důvod stránku pinovat. */
            if (getScrollDistance() < 1) return

            gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => '+=' + getScrollDistance(),
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                }
            })
        })
    }, [])

    /* už otevřený projekt se neduplikuje, jen se vytáhne navrch */
    const openProject = (project: PortfolioPiece) => {
        setHovered(null)
        setOpen((prev) => [...prev.filter((p) => p.number !== project.number), project])
    }

    const closeProject = (number: number) =>
        setOpen((prev) => prev.filter((p) => p.number !== number))

    const focusProject = (number: number) =>
        setOpen((prev) => {
            /* už je navrchu - vrátíme stejné pole, ať se zbytečně nepřekresluje */
            if (prev[prev.length - 1]?.number === number) return prev
            const target = prev.find((p) => p.number === number)
            if (!target) return prev
            return [...prev.filter((p) => p.number !== number), target]
        })

    const cardBg = (project: PortfolioPiece) =>
        project.color ?? 'color-mix(in srgb, var(--foreground) 5%, transparent)'

    return (
        <>
            <main
                ref={sectionRef}
                className='relative z-1 w-full bg-dark pt-28 pb-24 font-jet xl:h-screen xl:overflow-hidden xl:pt-32 xl:@container-size'
            >
                {/* na xl leží lišta v pásu, který nad gridem drží xl:pt-32 - proto
                    se s kartami nepřekrývá, i když je vytržená z toku */}
                <header className='mb-8 flex flex-col gap-5 px-6 xl:absolute xl:inset-x-0 xl:top-16 xl:z-20 xl:mb-0 xl:h-16 xl:flex-row xl:items-center xl:justify-between xl:gap-6'>
                    <h1 className='text-3xl font-bold uppercase leading-none tracking-[-0.02em] text-light sm:text-4xl xl:text-base xl:tracking-[0.2em]'>
                        Vybrané práce
                    </h1>

                    <div className='flex w-fit flex-wrap gap-1 border border-light/10 bg-dark/90 p-1'>
                        {FILTERS.map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`cursor-pointer px-4 py-2 text-sm capitalize transition-colors ${
                                    activeType === type ? 'bg-light text-dark' : 'text-light/60 hover:text-light'
                                }`}
                            >
                                {type === 'all' ? 'All' : TYPE_LABEL[type]}
                            </button>
                        ))}
                    </div>
                </header>

                <div
                    ref={trackRef}
                    /* na xl leží karty ve dvou řádcích a jsou široké na třetinu
                       obrazovky - tři se vejdou do záběru, zbytek odjede scrollem */
                    className='mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 xl:mx-0 xl:h-full xl:w-max xl:max-w-none xl:grid-flow-col-dense xl:grid-cols-none xl:grid-rows-2 xl:gap-3 xl:p-3 xl:auto-cols-[calc((100cqw-3rem)/3)]'
                >
                    {PORTFOLIO.map((project) => {
                        const dimmed = activeType !== 'all' && project.type !== activeType
                        return (
                            <button
                                key={project.number}
                                onClick={() => openProject(project)}
                                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(project)}
                                onPointerLeave={() => setHovered(null)}
                                data-cursor='view'
                                data-cursor-label='zobrazit'
                                className={`relative flex min-h-56 cursor-pointer flex-col justify-between gap-4 overflow-hidden border border-light/10 p-5 text-left transition-[opacity,border-color] duration-300 hover:border-light/30 xl:min-h-0 ${
                                    project.large ? 'xl:row-span-2' : ''
                                }`}
                                style={{
                                    backgroundColor: cardBg(project),
                                    opacity: dimmed ? 0.25 : 1,
                                }}
                            >
                                <div className='flex w-full items-start justify-between text-xs text-light/50'>
                                    <span>{String(project.number).padStart(2, '0')}</span>
                                    <span>{TYPE_LABEL[project.type]}</span>
                                </div>
                                {project.image && project.large && (
                                    /* min-h-0 kvůli flexu - bez něj obrázek nejde zmenšit
                                       pod svoji vlastní výšku a vytlačí text z karty */
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={project.image} alt={project.name} className='min-h-0 w-full flex-1 object-cover' />
                                )}

                                <div>
                                    <p className='text-light text-lg leading-tight xl:text-xl'>{project.name}</p>
                                    <p className='text-light/70 text-sm mt-2 leading-snug'>{project.subtitle}</p>
                                    <p className='text-light/40 text-xs mt-2'>{formatDateRange(project)}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </main>

            <ProjectPreview project={hovered} />

            {open.map((project, i) => (
                <ProjectModal
                    key={project.number}
                    project={project}
                    index={i}
                    isTop={i === open.length - 1}
                    onClose={() => closeProject(project.number)}
                    onFocus={() => focusProject(project.number)}
                />
            ))}
        </>
    )
}
