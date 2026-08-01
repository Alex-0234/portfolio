'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface navLink {
    name: string
    redirect: string
}

const NAVIGATION: navLink[] = [
    {name: 'Uvod', redirect:'/'},
    {name: 'O mne', redirect:'/about'},
    {name: 'Portfolio', redirect:'/portfolio'},
    {name: 'Sluzby', redirect:'/offers'},
    {name: 'Blog', redirect:'/blog'},
]

export default function Header() {
    const pathname = usePathname()

    return (
        <header className='flex justify-between items-center fixed top-0 w-full h-16 bg-transparent mix-blend-difference pl-4 pr-4 z-10 font-jet font-bold'>
            <Link href='/' aria-label='Domů' className='flex w-14 h-14 bg-white'></Link>
            <nav aria-label='Hlavní navigace'>
                <ul className='flex w-fit gap-8'>
                    {NAVIGATION.map((link) => {
                        const active = pathname === link.redirect
                        return (
                            <li
                                key={link.redirect}
                                className='flex cursor-pointer text-[1.2rem] text-white'
                                >
                                    <Link
                                        href={link.redirect}
                                        aria-current={active ? 'page' : undefined}
                                        className={active ? 'underline underline-offset-8' : 'hover:underline hover:underline-offset-8'}
                                    >
                                        {link.name}
                                    </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div aria-hidden className='flex w-14 h-14 bg-white'></div>
        </header>
    )
}
