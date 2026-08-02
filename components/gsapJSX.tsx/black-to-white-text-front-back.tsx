'use client'
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { lenisSnap } from "@/utils/lenisSnap";

const STEPS = [
    'Napíšete mi, co potřebujete.',
    'Domluvíme rozsah, cenu a termín.',
    'Postavím to na míru.',
    'Předám vám hotový web.',
]

const UNITS_PER_STEP = 2

export default function BlackToWhiteTextFrontToBack() {
    const runwayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const svgRef = useRef<SVGTextElement>(null);

    useGSAP(() => {
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: runwayRef.current,
                start: 'top top',
                end: '+=6500',
                scrub: true,
                refreshPriority: 1,
                snap: lenisSnap({
                    snapTo: 'labelsDirectional',
                    duration: {min: 0.2, max: 0.5},
                    delay: 0.1,
                    ease: 'power1.inOut'
                })
            }
        });

        STEPS.forEach((_, i) => {
            const at = i * UNITS_PER_STEP

            tl1.fromTo(stepRefs.current[i], {
                opacity: 0,
                scale: 0.6,
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                immediateRender: false,
            }, at)
                .addLabel(`step-${i}`, at + 0.8)
                .to(stepRefs.current[i], {
                    y: () => -window.innerHeight * 2 / 3,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.in',
                }, at + 0.8)
                
        })

        const afterSteps = STEPS.length * UNITS_PER_STEP

        tl1.to(containerRef.current, {
            backgroundColor: 'var(--foreground)',
            duration: 0.1,
        }, afterSteps)

            .to(svgRef.current, {
                opacity: 1,
                duration: 0.01,
            }, afterSteps)
            .fromTo(svgRef.current, {
                fontSize: '1500rem',
                y: '100px',
            }, {
                fontSize: '2.5rem',
                duration: 6,
                ease: 'power3.out',
                immediateRender: false,
            }, afterSteps)
            .addLabel('svg-end', afterSteps + 6)

    }, [])

    return (
        <div ref={runwayRef} className='relative h-[calc(100lvh+6500px)] w-full bg-dark'>
        <div ref={containerRef} className='sticky top-0 flex w-full h-lvh flex-col items-center justify-center bg-dark'>
            {STEPS.map((step, i) => (
                <div
                    key={step}
                    ref={(el) => { stepRefs.current[i] = el }}
                    className='absolute inset-0 flex flex-col items-center justify-center gap-6 opacity-0'
                >
                    <span className='font-jet text-[0.9vw] tracking-[0.4em] text-light/50'>
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className='text-[3vw] font-bold uppercase leading-[1.3] text-light'>
                        {step}
                    </span>
                </div>
            ))}

            <svg viewBox='0 0 800 120' className='absolute top-0 left-0 h-full w-full font-jet pointer-events-none'>
                <text
                    ref={svgRef}
                    x={400}
                    y={60}
                    textAnchor='middle'
                    dominantBaseline='middle'
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
