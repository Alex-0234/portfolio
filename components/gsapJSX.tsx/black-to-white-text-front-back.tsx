'use client'

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


export default function BlackToWhiteTextFrontToBack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const svgRef = useRef<SVGTextElement>(null);
    
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=5000',
                scrub: true,
                pin: true,
                pinSpacing: true,
            }
        });

        timeline
        .to(textRef.current, {
            scale: 1.5,
            opacity: 1,
            duration: 2
        }, 0)
        .to(containerRef.current, {
            backgroundColor: 'var(--background)',
            duration: 2
        }, 1)
        .to(textRef.current, {
            color: 'var(--foreground)',
            duration: 1
        }, 1)
        .to(textRef.current, {
            y: () => window.innerHeight*2/3,
            duration: 1.5,
        },2)
        .to(containerRef.current, {
            backgroundColor: 'var(--foreground)',
            duration: 0.1
        }, 3)
        .fromTo(svgRef.current, {
            translateY: '1000px',
        },{
            translateY: '0',
            duration: 2,
        }, 4)
        .fromTo(svgRef.current, {
            fontSize: '1000rem',
            translateY: '1000px',
            z: -1
        },{
            fontSize: '2.5rem',
            z: 9,
            translateY: '0',
            duration: 3,
        }, 4)
        .to(textRef.current, {
            display: 'none'

        }, '-=1')
        


    },[])

    return (
        <div ref={containerRef} className='flex flex-col justify-center items-center w-full h-screen bg-dark z-2'>
            <p ref={textRef} className={`text-[2rem] opacity-0 scale-[0.2%] z-1`}>I am a developer with interest in responsive and interactive design.</p>
            <svg viewBox="0 0 800 120" className="fixed top-0 left-0 w-full h-full ">
                <text
                    ref={svgRef}
                    x={400}
                    y={60}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--background)"
                    className="text-[2.5rem] font-bold -z-1"
                >
                    Keep building.
                </text>
            </svg>
        </div>
    )
}