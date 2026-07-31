'use client'

import Link from "next/link"
import { useState } from "react"

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
    const [activeLink, setActiveLink] = useState('/')

    return (
        <header className='flex justify-between items-center fixed top-0 w-full h-16 bg-transparent mix-blend-difference pl-4 pr-4 z-10 backdrop-blur-xl'>
            <div className='flex w-14 h-14 bg-white'></div>
            <nav>
                <ul className='flex w-fit gap-8'>
                    {NAVIGATION.map((link, index) => {
                        return (
                            <li 
                                key={`${index}-${link}`} 
                                className={`flex cursor-pointer text-[1.2rem] text-white`}
                                >
                                    <Link href={link.redirect}>{link.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className='flex w-14 h-14 bg-white'>

            </div>
        </header>
    )
}