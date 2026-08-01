'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { LINKS, TYPE_LABEL, formatDateRange, type PortfolioPiece } from "@/data/portfolio"

interface ProjectModalProps {
    project: PortfolioPiece
    onClose: () => void
}

const labelClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)

    const drag = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
    const offset = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
            previouslyFocused?.focus?.()
        }
    }, [onClose])

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        gsap.from(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power1.out' })
        gsap.from(panelRef.current, { opacity: 0, y: 24, duration: 0.4, ease: 'power3.out' })
    }, [])

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse') return
        drag.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: offset.current.x,
            originY: offset.current.y,
        }
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!drag.current) return
        offset.current = {
            x: drag.current.originX + (e.clientX - drag.current.startX),
            y: drag.current.originY + (e.clientY - drag.current.startY),
        }
        gsap.set(panelRef.current, offset.current)
    }

    const onPointerUp = () => {
        drag.current = null
    }

    return (
        <div
            ref={backdropRef}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm'
            onClick={onClose}
        >
            <div
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label={project.name}
                className='relative flex w-full max-w-3xl max-h-[88vh] flex-col overflow-hidden border border-light/15 bg-dark font-jet text-light'
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    className='shrink-0 flex items-center justify-between gap-4 border-b border-light/10 px-4 py-3 sm:px-5 xl:cursor-grab xl:active:cursor-grabbing'
                >
                    <span className={labelClasses}>
                        [ prj/{String(project.number).padStart(2, '0')} · {TYPE_LABEL[project.type]} ]
                    </span>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        onPointerDown={(e) => e.stopPropagation()}
                        aria-label='Zavřít detail projektu'
                        className='flex h-8 w-8 shrink-0 items-center justify-center border border-light/15 text-light/60 hover:border-light/40 hover:text-light transition-colors cursor-pointer'
                    >
                        ✕
                    </button>
                </div>

                <div data-lenis-prevent className='flex-1 min-h-0 overflow-y-auto flex flex-col gap-6 px-4 py-5 sm:px-8 sm:py-6'>

                    <div className='relative aspect-video w-full overflow-hidden border border-light/10 bg-light/3'>
                        {project.video ? (
                            <video src={project.video} controls playsInline className='h-full w-full object-cover' />
                        ) : project.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={project.image} alt={project.name} className='h-full w-full object-cover' />
                        ) : (
                            <div className='flex h-full w-full items-center justify-center'>
                                <span className={labelClasses}>[ náhled brzy ]</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <p className={labelClasses}>{formatDateRange(project)}</p>
                        <h2 className='mt-2 text-2xl sm:text-3xl uppercase font-bold tracking-tight'>{project.name}</h2>
                    </div>

                    <p className='text-sm leading-relaxed text-light/60'>
                        {project.description || '[ popis brzy ]'}
                    </p>
                </div>

                <div className='shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-light/15 p-4 sm:px-8 sm:py-5'>
                    {LINKS.map(({ key, label }) => {
                        const href = project.links[key]

                        if (!href) {
                            return (
                                <span
                                    key={key}
                                    aria-disabled='true'
                                    className='flex cursor-default items-center justify-center gap-2 border border-light/10 px-4 py-3 text-xs uppercase tracking-[0.15em] text-light/25'
                                >
                                    {label} <span aria-hidden>—</span>
                                </span>
                            )
                        }

                        return (
                            <a
                                key={key}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                onPointerDown={(e) => e.stopPropagation()}
                                className='flex items-center justify-center gap-2 border border-light/20 px-4 py-3 text-xs uppercase tracking-[0.15em] text-light/70 no-underline transition-colors hover:border-light hover:text-light'
                            >
                                {label} <span aria-hidden>↗</span>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
