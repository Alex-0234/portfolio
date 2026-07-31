'use client'
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


export default function BlackToWhiteTextFrontToBack({text}: {text: string}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const svgRef = useRef<SVGTextElement>(null);
    
    useGSAP(() => {

        const timeline = gsap.timeline({
            scrollTrigger: {
                id: 'black-to-white',
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
            color: 'var(--foreground)',
            opacity: 1,
            scale: 1.5,
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
            fontSize: '1000rem',
            z: -1
        },{
            fontSize: '2.5rem',
            z: 9,
            duration: 3,
        }, 4)
        .to(textRef.current, {
            display: 'none'

        }, '-=1')
        


    },[])

    return (
        <div ref={containerRef} className='flex flex-col justify-center items-center w-full h-screen bg-dark'>
            <p ref={textRef} className={`text-[2rem] opacity-0 scale-[0.2%] color-white z-2`}>Vývojář se zájmem o responzivní a interaktivní design.</p>
            <svg viewBox="0 0 800 120" className="fixed top-0 left-0 w-full h-full font-jet">
                <text
                    ref={svgRef}
                    x={400}
                    y={60}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--background)"
                    className="text-[2.5rem] font-bold"
                >
                    {'KEEP BUILDING'}
                </text>
            </svg>
        </div>
    )
}