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
    const [selected, setSelected] = useState<PortfolioPiece | null>(null)
    const [hovered, setHovered] = useState<PortfolioPiece | null>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1280px)', () => {
            const track = trackRef.current
            const section = sectionRef.current
            if (!track || !section) return

            const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

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

    const openProject = (project: PortfolioPiece) => {
        setHovered(null)
        setSelected(project)
    }

    const cardBg = (project: PortfolioPiece) =>
        project.color ?? 'color-mix(in srgb, var(--foreground) 5%, transparent)'

    return (
        <>
            <section
                ref={sectionRef}
                className='relative w-full bg-dark pt-28 pb-24 font-jet xl:h-screen xl:overflow-hidden xl:pt-16 xl:@container-size'
            >
                {/* TODO - fix this showing in first project */}
                <div className='mx-6 mb-6 flex flex-col gap-2 xl:absolute xl:top-20 xl:left-6 xl:z-20 xl:mb-0'>
                    <h1 className='text-xs uppercase tracking-[0.2em] text-light/50'>
                        <span aria-hidden>[ </span>Vybrané práce<span aria-hidden> ]</span>
                    </h1>
                </div>

                <div className='mx-6 mb-6 flex w-fit flex-wrap gap-1 border border-light/10 bg-dark/90 p-1 xl:absolute xl:top-20 xl:right-6 xl:z-20 xl:mx-0 xl:mb-0'>
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

                <div
                    ref={trackRef}
                    className='mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:mx-0 xl:h-full xl:w-max xl:max-w-none xl:grid-flow-col-dense xl:grid-cols-none xl:grid-rows-9 xl:gap-2 xl:p-2 xl:px-2 xl:auto-cols-[calc(1600cqh/40)]'
                >
                    {PORTFOLIO.map((project) => {
                        const dimmed = activeType !== 'all' && project.type !== activeType
                        return (
                            <button
                                key={project.number}
                                onClick={() => openProject(project)}
                                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(project)}
                                onPointerLeave={() => setHovered(null)}
                                className={`relative flex min-h-40 shrink-1 cursor-pointer flex-col justify-between border border-light/10 p-4 text-left transition-[opacity,border-color] duration-300 hover:border-light/30 xl:min-h-0 xl:p-3 ${
                                    project.large ? 'xl:row-span-3' : ''
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
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={project.image} alt={project.name} className='h-full w-full object-cover' />
                                )}

                                <div className='mt-8 xl:mt-0'>
                                    <p className='text-light text-[1rem] leading-tight'>{project.name}</p>
                                    <p className='text-light/50 text-xs mt-1'>{formatDateRange(project)}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </section>

            <ProjectPreview project={selected ? null : hovered} />

            {selected && (
                <ProjectModal project={selected} onClose={() => setSelected(null)} />
            )}
        </>
    )
}
