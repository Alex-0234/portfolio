'use client'

import { useEffect, useState } from "react"

const formatter = new Intl.DateTimeFormat('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Prague',
})

export default function LocalClock() {
    const [time, setTime] = useState<string | null>(null)

    useEffect(() => {
        const tick = () => setTime(formatter.format(new Date()))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    return <span className='tabular-nums'>{time ?? '--:--:--'}</span>
}
