'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"

import Button from "@/components/button"
import MenuButton from "@/components/menuButton"
import Wordmark from "@/components/wordmark"
import { EMAIL, GITHUB } from "@/data/site"

interface navLink {
    name: string
    redirect: string
}

const NAVIGATION: navLink[] = [
    {name: 'Úvod', redirect:'/'},
    {name: 'O mně', redirect:'/about'},
    {name: 'Portfolio', redirect:'/portfolio'},
    {name: 'Služby', redirect:'/offers'},
    {name: 'Blog', redirect:'/blog'},
]

const MENU_ID = 'site-menu'

export default function Header() {
    const pathname = usePathname()
    const lenis = useLenis()

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const menuBtnRef = useRef<HTMLButtonElement>(null)
    const wasOpen = useRef(false)

    // zavřít menu při přechodu na jinou stránku (i přes tlačítka zpět/vpřed)
    const [lastPath, setLastPath] = useState(pathname)
    if (lastPath !== pathname) {
        setLastPath(pathname)
        setIsOpen(false)
    }

    // escape + zamknutí scrollu, dokud je menu otevřené
    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }

        window.addEventListener('keydown', onKeyDown)
        lenis?.stop()

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            lenis?.start()
        }
    }, [isOpen, lenis])

    // fokus do menu při otevření, zpět na tlačítko při zavření
    useEffect(() => {
        if (isOpen) {
            wasOpen.current = true
            menuRef.current?.querySelector('a')?.focus()
        } else if (wasOpen.current) {
            menuBtnRef.current?.focus()
        }
    }, [isOpen])

    return (
        <>
            <header className='fixed top-0 z-30 flex h-16 w-full items-center justify-between gap-6 bg-transparent px-4 font-jet font-bold mix-blend-difference'>
                <Link
                    href='/'
                    aria-label='Domů — Alex Liška'
                    className='shrink-0 text-light transition-opacity duration-300 hover:opacity-70'
                >
                    <Wordmark className='h-3 w-auto sm:h-3.5' />
                </Link>

                <nav aria-label='Hlavní navigace' className='hidden md:block'>
                    <ul className='flex w-fit gap-6 lg:gap-8'>
                        {NAVIGATION.map((link) => {
                            const active = pathname === link.redirect
                            return (
                                <li
                                    key={link.redirect}
                                    className='flex cursor-pointer text-[0.7rem] uppercase tracking-[0.15em] text-light'
                                    >
                                        <Link
                                            href={link.redirect}
                                            aria-current={active ? 'page' : undefined}
                                            className={active ? 'underline underline-offset-6' : 'hover:underline hover:underline-offset-6'}
                                        >
                                            {link.name}
                                        </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className='flex shrink-0 items-center gap-3'>
                    <Button href='/offers' size='sm' className='hidden sm:inline-flex'>Služby</Button>
                    <MenuButton
                        btnRef={menuBtnRef}
                        onClick={() => setIsOpen(!isOpen)}
                        expanded={isOpen}
                        controls={MENU_ID}
                        className='md:hidden'
                    />
                </div>
            </header>

            {/* mobilní menu — panel vyjíždí zpod headeru, backdrop pod ním zavírá kliknutím */}
            <div
                ref={menuRef}
                id={MENU_ID}
                inert={!isOpen}
                aria-label='Menu'
                className='fixed top-0 z-20 flex w-full flex-col justify-between gap-10 border-b border-light/15 bg-dark px-6 pt-24 pb-10 font-jet md:hidden'
                style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
                }}
            >
                <nav aria-label='Hlavní navigace'>
                    <ul className='flex flex-col'>
                        {NAVIGATION.map((link, index) => {
                            const active = pathname === link.redirect
                            return (
                                <li key={link.redirect} className='border-b border-light/10'>
                                    <Link
                                        href={link.redirect}
                                        aria-current={active ? 'page' : undefined}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-baseline gap-4 py-4 text-[clamp(2rem,11vw,3.25rem)] leading-none font-black uppercase tracking-[-0.03em] transition-colors duration-300 ${active ? 'text-light' : 'text-light/60 hover:text-light'}`}
                                    >
                                        <span className='text-xs font-bold tracking-[0.2em] text-light/40'>
                                            0{index + 1}
                                        </span>
                                        {link.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className='flex flex-col gap-4'>
                    <Button href='/offers' variant='solid' className='w-full justify-center'>
                        Služby a ceník
                    </Button>
                    <div className='flex items-center justify-between text-xs uppercase tracking-[0.2em] text-light/50'>
                        <a href={`mailto:${EMAIL}`} className='transition-colors hover:text-light'>
                            {EMAIL}
                        </a>
                        <a
                            href={GITHUB}
                            target='_blank'
                            rel='noreferrer'
                            className='transition-colors hover:text-light'
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    aria-hidden
                    onClick={() => setIsOpen(false)}
                    className='fixed inset-0 z-10 cursor-pointer bg-dark/40 md:hidden'
                    style={{ backdropFilter: 'blur(2px)' }}
                />
            )}
        </>
    )
}
