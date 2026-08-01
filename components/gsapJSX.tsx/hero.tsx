'use client'

import { useRef } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/splitReveal";
import Button from "@/components/button";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const confirmRef = useRef<HTMLParagraphElement>(null);
    const introCtaRef = useRef<HTMLDivElement>(null);
    const aboutCtaRef = useRef<HTMLDivElement>(null);
    const underheaderTl = useRef<gsap.core.Timeline>(null);
    const underunderheaderTl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=3500',
                scrub: true,
                pin: true,
                pinSpacing: true,
            }
        })

        // on startup
        gsap.fromTo(nameRef.current, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.3
        });

        timeline
            .to(nameRef.current, {
                top: '-200%', 
                duration: 1.5,
            }, 0)
            .to(headerRef.current, {
                top: '10%',
                duration: 1.5,
            }, 0)
            .to(confirmRef.current, {
                top: '75%',
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

    }, [])

    return (
        <div ref={heroRef} className='relative flex h-screen w-full flex-col items-center justify-end uppercase leading-none'>
            <p ref={nameRef} className='absolute top-0 flex pt-28 text-[16vw] font-black tracking-[-0.042em]'>Alex Liška</p>

            <SplitReveal
                as='h1'
                ref={headerRef}
                on='mount'
                stagger={0.02}
                duration={0.8}
                ease='power3.out'
                split='chars'
                className='absolute top-[50%] text-[2.5vw] font-bold text-nowrap leading-[1.4]'
            >
                Tvorba webových stránek v Pardubicích a okolí na míru.
            </SplitReveal>

            <p ref={confirmRef} className='absolute top-[62%] text-[1vw] text-confirm'>
                Aktuálně přijímám nové projekty a klienty
            </p>

            <div ref={introCtaRef} className='absolute top-[70%] flex gap-4'>
                <Button href='/portfolio' variant='solid'>Portfolio</Button>
                <Button href='/offers'>Služby</Button>
            </div>

            <SplitReveal
                as='h2'
                split='chars'
                className='absolute top-[25%] w-[60vw] text-[1.5vw] font-bold leading-[1.4]'
                onReady={(tl) => { underheaderTl.current = tl }}
            >
                Jmenuju se Alex a weby stavím na míru — žádné šablony a žádná překvapení ve faktuře. Záleží mi na detailech, od architektury backendu až po to, jak se stránka chová při scrollování.
            </SplitReveal>

            <SplitReveal
                as='h3'
                split='chars'
                className='absolute top-[50%] w-[60vw] text-[1.2vw] font-bold leading-[1.4]'
                onReady={(tl) => { underunderheaderTl.current = tl }}
            >
                Full-stack vývoj webů a webových aplikací na míru.
            </SplitReveal>

            <div ref={aboutCtaRef} className='absolute top-[62%]'>
                <Button href='/about'>Víc o mně</Button>
            </div>
        </div>
    )
}
