'use client'

import { useRef } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                id: 'hero',
                trigger: heroRef.current,
                start: 'top top',
                end: '+=2000',
                scrub: true,
                pin: true,
                pinSpacing: true,
            }
        })

        gsap.fromTo(nameRef.current, {
            opacity: 0,
        },{
            opacity: 1,
            duration: 0.3
        });

        timeline
        .to(nameRef.current, {
            y: '-500px',
            duration: 2,
        },0)
        .to(headerRef.current, {
            opacity: 0,
            duration: 1
        },1)

   

    }, [])

    return (
        <div ref={heroRef} className='flex flex-col h-screen w-full relative justify-end items-center uppercase leading-none'>
            <p ref={nameRef} className='flex absolute top-0 left-auto text-[18em] pt-20 font-bold -tracking-[12px]'>Alex Liška</p>

            <h1 ref={headerRef} className='flex text-[2.5em] font-bold pb-30 -leading-[7px]'>Tvorba webových stránek v Pardubicích a okolí na míru.</h1>
        </div>

    )
}