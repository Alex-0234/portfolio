'use client'

import { useState } from 'react'
import { useLenis } from 'lenis/react'

// jakmile je do konce stránky míň než tolik obrazovek, nápověda odjede.
// vztažené k výšce okna, ať to sedí i na patičce, která je vysoká ~0,7-0,9 svh
const HIDE_WITHIN_SCREENS = 0.8

export default function ScrollHint() {
    const [hidden, setHidden] = useState(false)

    // stejná hodnota nevyvolá re-render, takže to může běžet při každém scrollu
    useLenis(({ scroll, limit }) => {
        setHidden(limit - scroll < window.innerHeight * HIDE_WITHIN_SCREENS)
    })

    return (
        <div
            aria-hidden
            className={`pointer-events-none fixed bottom-10 z-5 flex w-full justify-center transition-opacity duration-500 ${
                hidden ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <span className='font-jet text-white mix-blend-difference'>↓ scroluj ↓</span>
        </div>
    )
}
