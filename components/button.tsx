'use client'

import Link from "next/link"

interface BaseProps {
    children: string
    variant?: 'solid' | 'outline'
    className?: string
}

interface LinkProps extends BaseProps {
    href: string
    onClick?: never
    type?: never
    disabled?: never
}

interface ActionProps extends BaseProps {
    href?: never
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
}

export default function Button({
    href,
    children,
    variant = 'outline',
    className = '',
    onClick,
    type = 'button',
    disabled,
}: LinkProps | ActionProps) {
    const solid = variant === 'solid'

    const classes = `group relative inline-flex items-center gap-3 overflow-hidden border border-light px-8 py-4 font-jet text-[clamp(0.7rem,0.85vw,0.95rem)] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${solid ? 'bg-light text-dark hover:text-light' : 'text-light hover:text-dark'} ${className}`

    const content = (
        <>
            <span
                aria-hidden
                className={`absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${solid ? 'bg-dark' : 'bg-light'}`}
            />
            <span className='relative'>{children}</span>
            <span className='relative transition-transform duration-300 group-hover:translate-x-1'>→</span>
        </>
    )

    if (href === undefined) {
        return (
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${classes} cursor-pointer disabled:cursor-default disabled:opacity-50`}
            >
                {content}
            </button>
        )
    }

    return (
        <Link href={href} className={classes}>
            {content}
        </Link>
    )
}
