'use client'

import { useRef } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/splitReveal";
import Button from "@/components/button";
import LocalClock from "@/components/localClock";
import { lenisSnap } from "@/utils/lenisSnap";

const GAP = 6
const GAP_SM = 5
const INTRO_TOP = 50
const INTRO_TOP_SM = 44
const SCROLLED_TOP = 10
const SCROLLED_TOP_SM = 4
const NARROW = '(max-width: 767px)'

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const confirmRef = useRef<HTMLParagraphElement>(null);
    const introCtaRef = useRef<HTMLDivElement>(null);
    const aboutCtaRef = useRef<HTMLDivElement>(null);
    const midStackRef = useRef<HTMLDivElement>(null);
    const underheaderTl = useRef<gsap.core.Timeline>(null);
    const underunderheaderTl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {

        const narrow = () => window.matchMedia(NARROW).matches

        const viewport = () => heroRef.current?.offsetHeight ?? window.innerHeight

        const heightOf = (el: HTMLElement | null) =>
            el ? (el.offsetHeight / viewport()) * 100 : 0

        const shift = (from: number, to: number) => ((to - from) / 100) * viewport()

        const stackFrom = (top: number, elements: (HTMLElement | null)[]) => {
            const gap = narrow() ? GAP_SM : GAP
            let cursor = top
            return elements.map((el) => {
                const position = cursor
                cursor += heightOf(el) + gap
                return position
            })
        }

        const intro = () => stackFrom(narrow() ? INTRO_TOP_SM : INTRO_TOP, [headerRef.current, confirmRef.current, introCtaRef.current])

        const scrolled = () => stackFrom(narrow() ? SCROLLED_TOP_SM : SCROLLED_TOP, [headerRef.current, midStackRef.current, aboutCtaRef.current, confirmRef.current])

        const applyLayout = () => {
            const [titleTop, confirmTop, ctaTop] = intro()
            const [, midTop, aboutTop] = scrolled()

            gsap.set(headerRef.current, { top: `${titleTop}%`, y: 0 })
            gsap.set(confirmRef.current, { top: `${confirmTop}%`, y: 0 })
            gsap.set(introCtaRef.current, { top: `${ctaTop}%` })
            gsap.set(midStackRef.current, { top: `${midTop}%` })
            gsap.set(aboutCtaRef.current, { top: `${aboutTop}%` })
        }
        applyLayout()

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=2500',
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onRefreshInit: applyLayout,
                refreshPriority: 2,
                snap: lenisSnap({
                    snapTo: 'labelsDirectional',
                    duration: {min: 0.2, max: 0.5},
                    delay: 0.1,
                    ease: 'power1.inOut'
                })
            }
        })

        timeline
            .addLabel('start', 'start')
            .to(nameRef.current, {
                y: () => -2 * viewport(),
                duration: 1.5,
            }, 0)
            .to(headerRef.current, {
                y: () => shift(intro()[0], scrolled()[0]),
                duration: 1.5,
            }, 0)
            .to(confirmRef.current, {
                y: () => shift(intro()[1], scrolled()[3]),
                duration: 1.5,
            }, 0)
            .to(introCtaRef.current, {
                opacity: 0,
                y: -30,
                duration: 0.8,
            }, 0)

        if (underheaderTl.current) {
            timeline.add(underheaderTl.current, 2)
            underheaderTl.current.paused(false)
        }
        if (underunderheaderTl.current) {
            timeline.add(underunderheaderTl.current, 3)
            underunderheaderTl.current.paused(false)
        }

        timeline.fromTo(aboutCtaRef.current, {
            opacity: 0,
            y: 30,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
        }, 4)
        .addLabel('end', 'end')

    }, [])

    return (
        <div ref={heroRef} className='relative flex h-svh w-full flex-col items-center justify-end uppercase leading-none bg-dark'>
            <div aria-hidden className='raster pointer-events-none absolute inset-0' />
            <div aria-hidden className='grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay' />

            <p ref={nameRef} className='fade-in absolute top-0 flex pt-28 text-[16vw] font-black tracking-[-0.042em] will-change-transform'>Alex Liška</p>

            <SplitReveal
                as='h1'
                ref={headerRef}
                on='mount'
                stagger={0.02}
                duration={0.8}
                ease='power3.out'
                split='chars'
                disableBelow={768}
                className='absolute top-[50%] w-[88vw] text-center text-[max(1.25rem,2.5vw)] font-bold leading-[1.4] will-change-transform md:w-auto md:text-nowrap'
            >
                Tvorba webových stránek v Pardubicích a okolí na míru.
            </SplitReveal>

            <p ref={confirmRef} className='absolute top-[62%] flex max-w-[90vw] items-center justify-center gap-[0.9em] text-center text-[max(0.7rem,1vw)] text-confirm will-change-transform'>

                <span aria-hidden className='relative flex h-[0.5em] w-[0.5em] shrink-0'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-confirm opacity-60 [animation-duration:2.5s] motion-reduce:hidden' />
                    <span className='relative inline-flex h-full w-full rounded-full bg-confirm' />
                </span>
                Aktuálně přijímám nové projekty a klienty
            </p>

            <div ref={introCtaRef} className='absolute top-[70%] flex gap-4'>
                <Button href='/portfolio' variant='solid'>Portfolio</Button>
                <Button href='/offers'>Služby</Button>
            </div>

            <div
                ref={midStackRef}
                className='absolute top-[22%] flex w-[86vw] flex-col gap-[5svh] select-none sm:w-[72vw] md:w-[60vw] md:gap-[6svh]'
            >
                <SplitReveal
                    as='h2'
                    disableBelow={768}
                    className='text-[max(0.9375rem,1.5vw)] font-bold leading-[1.4] will-change-[opacity,transform]'
                    onReady={(tl) => { underheaderTl.current = tl }}
                >
                    Jmenuju se Alex a weby stavím na míru — žádné šablony a žádná překvapení ve faktuře. Záleží mi na detailech, od architektury backendu až po to, jak se stránka chová při scrollování.
                </SplitReveal>

                <SplitReveal
                    as='h3'
                    split='chars'
                    disableBelow={768}
                    className='text-[max(0.8125rem,1.2vw)] font-bold leading-[1.4] will-change-[opacity,transform]'
                    onReady={(tl) => { underunderheaderTl.current = tl }}
                >
                    Full-stack vývoj webů a webových aplikací na míru.
                </SplitReveal>
            </div>

            <div ref={aboutCtaRef} className='absolute top-[48%]'>
                <Button href='/about'>Víc o mně</Button>
            </div>

            <div className='pointer-events-none absolute bottom-16 flex w-full justify-between px-4 font-jet text-[clamp(0.6rem,0.75vw,0.8rem)] tracking-widest text-light/50 md:bottom-10 md:px-6 md:tracking-[0.2em]'>
                <span>[ pardubice, cz ]</span>
                <span>[ místní čas <LocalClock /> ]</span>
            </div>
        </div>
    )
}
