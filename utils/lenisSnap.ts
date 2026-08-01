import type { ScrollTrigger } from "gsap/ScrollTrigger"

import { getLenis } from "@/components/lenisWrapper"

type SnapVars = ScrollTrigger.SnapVars

let failsafe: ReturnType<typeof setTimeout> | null = null

const wake = () => {
    if (failsafe) {
        clearTimeout(failsafe)
        failsafe = null
    }
    getLenis()?.start()
}

const sleep = () => {
    getLenis()?.stop()
    if (failsafe) clearTimeout(failsafe)
    failsafe = setTimeout(wake, 2000)
}

export const lenisSnap = (vars: SnapVars): SnapVars => ({
    ...vars,
    onStart: sleep,
    onInterrupt: wake,
    onComplete: wake,
})
