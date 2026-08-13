'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { formatDateRange, type PortfolioPiece } from "@/data/portfolio"

const WIDTH = 320
const HEIGHT = 270
/* musí odsadit víc, než je půlka štítku 'zobrazit' (30px na výšku), jinak
   náhled leze rohem pod kurzor */
const CURSOR_GAP = 36

export default function ProjectPreview({ project }: { project: PortfolioPiece | null }) {
    const boxRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const moveX = gsap.quickTo(boxRef.current, 'x', { duration: 0.25, ease: 'power3' })
        const moveY = gsap.quickTo(boxRef.current, 'y', { duration: 0.25, ease: 'power3' })

        const onMove = (e: PointerEvent) => {
            const flip = e.clientX + WIDTH + CURSOR_GAP * 2 > window.innerWidth
            moveX(flip ? e.clientX - WIDTH - CURSOR_GAP : e.clientX + CURSOR_GAP)
            moveY(Math.max(CURSOR_GAP, Math.min(e.clientY + CURSOR_GAP, window.innerHeight - HEIGHT)))
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        return () => window.removeEventListener('pointermove', onMove)
    }, [])

    useGSAP(() => {
        gsap.to(boxRef.current, {
            opacity: project ? 1 : 0,
            duration: project ? 0.2 : 0,
            ease: 'power2.out',
        })
    }, [project])

    return (
        <div
            ref={boxRef}
            aria-hidden
            style={{ width: WIDTH }}
            className='pointer-events-none fixed left-0 top-0 z-40 border border-light/15 bg-dark font-jet opacity-0'
        >
            {project && (
                <>
                    <div className='relative aspect-video w-full overflow-hidden border-b border-light/10 bg-light/3'>
                        {project.video ? (
                            <video
                                key={project.number}
                                src={project.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className='h-full w-full object-cover'
                            />
                        ) : project.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={project.image} alt='' className='h-full w-full object-cover' />
                        ) : (
                            <div className='flex h-full w-full items-center justify-center'>
                                <span className='text-xs uppercase tracking-[0.2em] text-light/30'>[ náhled brzy ]</span>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-1 p-3'>
                        <p className='text-xs uppercase tracking-[0.2em] text-light/50'>{formatDateRange(project)}</p>
                        <p className='text-sm uppercase text-light'>{project.name}</p>
                        <p className='line-clamp-2 text-xs leading-relaxed text-light/50'>
                            {project.description || '[ popis brzy ]'}
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}
