'use client'
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { lenisSnap } from "@/utils/lenisSnap";

const STEPS = [
    {
        title: 'Napíšete mi, co potřebujete.',
        detail: 'Stačí pár vět o tom, co od webu čekáte. Ozvu se do 24 hodin.',
    },
    {
        title: 'Domluvíme rozsah, cenu a termín.',
        detail: 'Pevnou cenu i termín znáte předem. Žádné překvapení na faktuře.',
    },
    {
        title: 'Postavím to na míru.',
        detail: 'Next.js, React a Tailwind. Žádné šablony ani WordPress — každý řádek psaný pro vás.',
    },
    {
        title: 'Vyladím rychlost a SEO.',
        detail: 'Obrázky převedu do WebP a AVIF, aby se stránky načetly okamžitě. Firemní profil na Googlu nastavím v ceně.',
    },
    {
        title: 'Předám vám hotový web.',
        detail: 'Údržba včetně hostingu 600 Kč měsíčně. Doménu, redakční systém i serverovou část rozepíšu v nabídce předem.',
    },
]
const PX_PER_UNIT = 320

const STEP_IN = 1.8       // fade + scale in
const STEP_HOLD = 0.8     // fully visible and still — the snap label sits in here
const STEP_OUT = 2        // drift up and fade out
const STEP_OVERLAP = 0.8  // how far the next step's entrance reaches into this one's exit

const UNITS_PER_STEP = STEP_IN + STEP_HOLD + STEP_OUT - STEP_OVERLAP

// Where the last step has fully cleared the screen.
const STEPS_END = (STEPS.length - 1) * UNITS_PER_STEP + STEP_IN + STEP_HOLD + STEP_OUT

const SVG_ZOOM = 11

const TOTAL_UNITS = STEPS_END + SVG_ZOOM

// The scroll the timeline consumes, and the pinned scroll left over after it finishes.
const SCROLL_PX = Math.round(TOTAL_UNITS * PX_PER_UNIT)
const HOLD_PX = 800

const START_ZOOM = 2050

export default function BlackToWhiteTextFrontToBack() {
    const runwayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const svgRef = useRef<SVGTextElement>(null);

    useGSAP(() => {
        const startFontRem = () => START_ZOOM * window.innerHeight / window.innerWidth

        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: runwayRef.current,
                start: 'top top',
                end: `+=${SCROLL_PX}`,
                scrub: true,
                refreshPriority: 1,
                invalidateOnRefresh: true,
                snap: lenisSnap({
                    snapTo: 'labels',
                    duration: {min: 0.2, max: 0.5},
                    delay: 1,
                    ease: 'power1.inOut'
                })
            }
        });

        STEPS.forEach((_, i) => {
            const at = i * UNITS_PER_STEP

            /* autoAlpha místo opacity: kroky leží přes sebe na absolute inset-0,
               takže neviditelné musí zmizet i z hit-testu - jinak výběr textu
               vždycky spadne na poslední krok v DOM */
            tl1.fromTo(stepRefs.current[i], {
                autoAlpha: 0,
                scale: 0.6,
            }, {
                autoAlpha: 1,
                scale: 1,
                duration: STEP_IN,
                ease: 'power2.out',
                immediateRender: false,
            }, at)
                // Centred in the hold, so snapping lands on a fully visible, still frame.
                .addLabel(`step-${i}`, at + STEP_IN + STEP_HOLD / 2)
                .to(stepRefs.current[i], {
                    y: () => -window.innerHeight * 2 / 3,
                    autoAlpha: 0,
                    duration: STEP_OUT,
                    ease: 'power2.in',
                }, at + STEP_IN + STEP_HOLD)

        })

        const afterSteps = STEPS_END

        tl1.to(containerRef.current, {
            backgroundColor: 'var(--foreground)',
            duration: 0.1,
        }, afterSteps)

            .to(svgRef.current, {
                opacity: 1,
                duration: 0.01,
            }, afterSteps)
            .fromTo(svgRef.current, {
                fontSize: () => `${startFontRem()}rem`,
            }, {
                fontSize: '2.5rem',
                duration: SVG_ZOOM,
                ease: 'power3.out',
                immediateRender: false,
            }, afterSteps)
            .addLabel('svg-end', afterSteps + SVG_ZOOM)

    }, [])

    return (
        <div
            ref={runwayRef}
            className='relative w-full bg-dark'
            style={{ height: `calc(100lvh + ${SCROLL_PX + HOLD_PX}px)` }}
        >
        <div ref={containerRef} className='sticky top-0 flex w-full h-lvh flex-col items-center justify-center bg-dark'>
            {STEPS.map((step, i) => (
                <div
                    key={step.title}
                    ref={(el) => { stepRefs.current[i] = el }}
                    className='invisible absolute inset-0 flex flex-col items-center justify-center gap-6 opacity-0'
                >
                    <span className='font-jet text-[0.9vw] tracking-[0.4em] text-light/50'>
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className='flex flex-col items-center gap-4 px-8 text-center'>
                        <span className='text-[3vw] font-bold uppercase leading-[1.3] text-light'>
                            {step.title}
                        </span>
                        <span className='max-w-[60ch] text-pretty text-[1.05vw] leading-[1.7] text-light/60'>
                            {step.detail}
                        </span>
                    </div>
                </div>
            ))}

            <svg viewBox='0 0 800 120' className='absolute top-0 left-0 h-full w-full font-jet pointer-events-none'>
                <text
                    ref={svgRef}
                    x={400}
                    y={60}
                    dy='0.05em'
                    textAnchor='middle'
                    fill='var(--background)'
                    className='text-[2.5vw] font-bold opacity-0 pointer-events-none'
                >
                    HOTOVO!
                </text>
            </svg>
        </div>
        </div>
    )
}
