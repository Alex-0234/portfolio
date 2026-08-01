'use client'

import type { RefObject } from 'react'

interface MenuButtonProps {
    onClick: () => void
    expanded: boolean
    controls: string
    btnRef?: RefObject<HTMLButtonElement | null>
    className?: string
}

export default function MenuButton({ onClick, expanded, controls, btnRef, className = '' }: MenuButtonProps) {
    return (
        <button
            ref={btnRef}
            type='button'
            onClick={onClick}
            aria-expanded={expanded}
            aria-controls={controls}
            aria-label={expanded ? 'Zavřít menu' : 'Otevřít menu'}
            className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center border border-light/30 transition-colors duration-300 hover:border-light ${className}`}
        >
            <span
                aria-hidden
                className='absolute h-px w-5 bg-light transition-transform duration-300 ease-out'
                style={{ transform: expanded ? 'rotate(45deg)' : 'translateY(-3px)' }}
            />
            <span
                aria-hidden
                className='absolute h-px w-5 bg-light transition-transform duration-300 ease-out'
                style={{ transform: expanded ? 'rotate(-45deg)' : 'translateY(3px)' }}
            />
        </button>
    )
}
