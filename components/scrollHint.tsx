'use client'

import { useState } from 'react'
import { useLenis } from 'lenis/react'

// jakmile je do konce stránky míň než tolik obrazovek, nápověda odjede.
// vztažené k výšce okna, ať to sedí i na patičce - ta je na mobilu vysoká
// 100svh-4rem (~0,93 svh) a na desktopu 0,7-0,93 svh, takže celá obrazovka
// nápovědu schová přesně ve chvíli, kdy se patička začne odhalovat
const HIDE_WITHIN_SCREENS = 1

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
