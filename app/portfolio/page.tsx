'use client'

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"

type PortfolioType = 'personal' | 'freelance' | 'work'

interface PortfolioPiece {
    number: number
    name: string
    type: PortfolioType
    startYear: number
    startMonth: number
    endYear?: number
    endMonth?: number
    color?: string
    description: string
    href: string
    video: string
    large?: boolean
}

const TYPE_LABEL: Record<PortfolioType, string> = {
    personal: 'Personal',
    freelance: 'Freelance',
    work: 'Work',
}

const portfolio: PortfolioPiece[] = [
    { number: 1, name: 'Todo-tracker', type: 'personal', startYear: 2026, startMonth: 7, endYear: 2026, endMonth: 5, description: '', href: '', video: '' },
    { number: 2, name: 'create-lazy-init', type: 'personal', startYear: 2026, startMonth: 4, endYear: 2026, endMonth: 5, description: '', href: '', video: '' },
    { number: 3, name: 'cali-ascension', type: 'personal', startYear: 2026, startMonth: 1, endYear: 2026, endMonth: 3, description: 'Gamifikovany tracker pro kalisteniku', href: 'https://cali-ascension.vercel.app/', video: '', large: true },
    { number: 4, name: 'portfolio-old', type: 'personal', startYear: 2025, startMonth: 10, endYear: 2025, endMonth: 11, description: '', href: '', video: '' },
    { number: 5, name: 'Design System', type: 'freelance', startYear: 2025, startMonth: 6, endYear: 2025, endMonth: 9, description: '', href: '', video: '' },
    { number: 6, name: 'Side Project', type: 'freelance', startYear: 2025, startMonth: 6, description: '', href: '', video: '' },
    { number: 7, name: 'E-commerce Build', type: 'freelance', startYear: 2025, startMonth: 3, endYear: 2025, endMonth: 4, description: '', href: '', video: '' },
    { number: 8, name: 'Portfolio', type: 'personal', startYear: 2025, startMonth: 1, endYear: 2025, endMonth: 2, description: '', href: '', video: '' },
    { number: 9, name: 'Generative Art', type: 'personal', startYear: 2024, startMonth: 10, description: '', href: '', video: '', large: true },
    { number: 10, name: 'Booking Platform', type: 'freelance', startYear: 2024, startMonth: 6, endYear: 2024, endMonth: 8, description: '', href: '', video: '' },
]

const formatMonthYear = (year: number, month: number) => `${String(month).padStart(2, '0')}/${year}`

const formatDateRange = (project: PortfolioPiece) => {
    const start = formatMonthYear(project.startYear, project.startMonth)
    if (!project.endYear || !project.endMonth) return `${start} – Present`
    return `${start} – ${formatMonthYear(project.endYear, project.endMonth)}`
}

const FILTERS: Array<PortfolioType | 'all'> = ['all', 'personal', 'freelance', 'work']

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeType, setActiveType] = useState<PortfolioType | 'all'>('all')
    const [selected, setSelected] = useState<PortfolioPiece | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

    useGSAP(() => {
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
    }, [])

    const openProject = (project: PortfolioPiece) => {
        setDragOffset({ x: 0, y: 0 })
        setSelected(project)
    }

    useEffect(() => {
        if (!selected) return
        document.body.style.overflow = 'hidden'
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [selected])

    const onDragPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragState.current = { startX: e.clientX, startY: e.clientY, originX: dragOffset.x, originY: dragOffset.y }
        e.currentTarget.setPointerCapture(e.pointerId)
    }
    const onDragPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState.current) return
        setDragOffset({
            x: dragState.current.originX + (e.clientX - dragState.current.startX),
            y: dragState.current.originY + (e.clientY - dragState.current.startY),
        })
    }
    const onDragPointerUp = () => {
        dragState.current = null
    }

    const cardBg = (project: PortfolioPiece) =>
        project.color ?? 'color-mix(in srgb, var(--foreground) 5%, transparent)'

    return (
        <section
            ref={sectionRef}
            style={{ containerType: 'size' }}
            className='relative w-full h-screen overflow-hidden bg-dark pt-16 pb-24'
        >
            <div
                ref={trackRef}
                className='grid h-full w-max grid-flow-col-dense grid-rows-9 gap-2 p-2'
                style={{ gridAutoColumns: 'calc(1600cqh / 40)' }}
            >
                {portfolio.map((project) => {
                    const dimmed = activeType !== 'all' && project.type !== activeType
                    return (
                        <button
                            key={project.number}
                            onClick={() => openProject(project)}
                            className='relative flex shrink-0 flex-col justify-between border border-light/10 p-3 rounded-md text-left transition-[opacity,border-color] duration-300 hover:border-light/30 cursor-pointer'
                            style={{
                                gridRow: project.large ? 'span 3' : undefined,
                                backgroundColor: cardBg(project),
                                opacity: dimmed ? 0.25 : 1,
                            }}
                        >
                            <div className='flex w-full items-start justify-between text-xs text-light/50'>
                                <span>{String(project.number).padStart(2, '0')}</span>
                                <span>{TYPE_LABEL[project.type]}</span>
                            </div>
                            <div>
                                <p className='text-light text-[1rem] leading-tight'>{project.name}</p>
                                <p className='text-light/50 text-xs mt-1'>{formatDateRange(project)}</p>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1 rounded-full border border-light/10 bg-dark/90 p-1 backdrop-blur'>
                {FILTERS.map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${
                            activeType === type ? 'bg-light text-dark' : 'text-light/60 hover:text-light'
                        }`}
                    >
                        {type === 'all' ? 'All' : TYPE_LABEL[type]}
                    </button>
                ))}
            </div>

            {selected && (
                <div
                    className='fixed inset-0 z-50'
                    onClick={() => setSelected(null)}
                >
                    <div
                        className='absolute top-1/2 left-1/2 w-full max-w-lg cursor-grab rounded-2xl border border-light/10 bg-dark p-6 shadow-2xl active:cursor-grabbing'
                        style={{ transform: `translate(-50%, -50%) translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={onDragPointerDown}
                        onPointerMove={onDragPointerMove}
                        onPointerUp={onDragPointerUp}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            onPointerDown={(e) => e.stopPropagation()}
                            className='absolute top-4 right-4 text-light/60 hover:text-light'
                            aria-label='Close'
                        >
                            ✕
                        </button>
                        <p className='text-light/50 text-xs'>
                            {String(selected.startMonth).padStart(2, '0')}/{selected.startYear} — {TYPE_LABEL[selected.type]}
                        </p>
                        <h2 className='text-light text-2xl mt-1'>{selected.name}</h2>
                        {selected.description && (
                            <p className='text-light/70 mt-4'>{selected.description}</p>
                        )}
                        {selected.video && (
                            <video src={selected.video} controls className='mt-4 w-full rounded-lg' />
                        )}
                        {selected.href && (
                            <a
                                href={selected.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                onPointerDown={(e) => e.stopPropagation()}
                                className='mt-4 inline-block text-light underline'
                            >
                                View project →
                            </a>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
