'use client'

import Link from "next/link"

interface ButtonProps {
    href: string
    children: string
    /** solid reads as the primary action, outline as the secondary one */
    variant?: 'solid' | 'outline'
    className?: string
}

export default function Button({
    href,
    children,
    variant = 'outline',
    className = '',
}: ButtonProps) {
    const solid = variant === 'solid'

    return (
        <Link
            href={href}
            className={`group relative inline-flex items-center gap-3 overflow-hidden border border-light px-8 py-4 font-jet text-[clamp(0.7rem,0.85vw,0.95rem)] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${solid ? 'bg-light text-dark hover:text-light' : 'text-light hover:text-dark'} ${className}`}
        >
            {/* the fill wipes upward on hover - same direction the split text
                reveals itself, so the whole page shares one motion vocabulary */}
            <span
                aria-hidden
                className={`absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${solid ? 'bg-dark' : 'bg-light'}`}
            />
            <span className='relative'>{children}</span>
            <span className='relative transition-transform duration-300 group-hover:translate-x-1'>→</span>
        </Link>
    )
}
