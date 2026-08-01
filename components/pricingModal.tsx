'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import ContactForm from "@/components/contactForm"
import { availableAddons, basePrice, type Addon, type Package } from "@/data/pricing"
import { formatPrice } from "@/utils/price"

interface PricingModalProps {
    pkg: Package
    onClose: () => void
}

const labelClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default function PricingModal({ pkg, onClose }: PricingModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const [tierId, setTierId] = useState(pkg.tiers?.[0]?.id)
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
            previouslyFocused?.focus?.()
        }
    }, [onClose])

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        gsap.from(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power1.out' })
        gsap.from(panelRef.current, { opacity: 0, y: 24, duration: 0.4, ease: 'power3.out' })
    }, [])

    const toggleAddon = (addon: Addon) => {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(addon.id)) {
                next.delete(addon.id)
            } else {
                next.add(addon.id)
                addon.excludes?.forEach((id) => next.delete(id))
            }
            return next
        })
    }

    const stepQuantity = (addon: Addon, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [addon.id]: Math.min(addon.max ?? 99, Math.max(0, (prev[addon.id] ?? 0) + delta)),
        }))
    }

    const addons = availableAddons(pkg, tierId)
    const base = basePrice(pkg, tierId)
    const extras = addons.reduce((sum, addon) => (
        addon.type === 'quantity'
            ? sum + (quantities[addon.id] ?? 0) * addon.price
            : sum + (selected.has(addon.id) ? addon.price : 0)
    ), 0)
    const total = base + extras
    const monthSuffix = pkg.monthly ? ' / měs.' : ''

    const includedNotes = pkg.addons
        .filter((addon) => tierId && addon.includedIn?.includes(tierId) && addon.note)
        .map((addon) => addon.note as string)

    const configuration = [
        pkg.name,
        pkg.tiers
            ? `Úroveň: ${pkg.tiers.find((tier) => tier.id === tierId)?.name} — ${formatPrice(base)}${monthSuffix}`
            : `Cena od: ${formatPrice(base)}`,
        ...addons.flatMap((addon) => {
            if (addon.type === 'quantity') {
                const qty = quantities[addon.id] ?? 0
                return qty > 0 ? [`+ ${addon.name} × ${qty} — ${formatPrice(qty * addon.price)}`] : []
            }
            return selected.has(addon.id) ? [`+ ${addon.name} — ${formatPrice(addon.price)}`] : []
        }),
        `Odhadovaná cena: ${formatPrice(total)}${monthSuffix}`,
    ].join('\n')

    return (
        <div
            ref={backdropRef}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm'
            onClick={onClose}
        >
            <div
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label={`Konfigurátor — ${pkg.name}`}
                className='relative flex w-full max-w-3xl max-h-[88vh] flex-col overflow-hidden border border-light/15 bg-dark font-jet text-light'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='shrink-0 flex items-center justify-between gap-4 border-b border-light/10 px-5 py-3'>
                    <span className={labelClasses}>[ svc/{pkg.number} · {pkg.scope} ]</span>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        aria-label='Zavřít konfigurátor'
                        className='flex h-8 w-8 items-center justify-center border border-light/15 text-light/60 hover:border-light/40 hover:text-light transition-colors cursor-pointer'
                    >
                        ✕
                    </button>
                </div>

                <div data-lenis-prevent className='flex-1 min-h-0 overflow-y-auto flex flex-col gap-8 px-5 py-6 sm:px-8'>
                    <div>
                        <h2 className='text-2xl uppercase font-bold tracking-tight'>{pkg.name}</h2>
                        <p className='mt-1 text-sm text-light/50'>{pkg.tagline}</p>
                        <p className='mt-1 text-sm text-light/50'>odhad · {pkg.timeline}</p>
                    </div>

                    {pkg.tiers && (
                        <section>
                            <p className={labelClasses}>Vyberte si úroveň</p>
                            <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3'>
                                {pkg.tiers.map((tier) => {
                                    const active = tier.id === tierId
                                    return (
                                        <button
                                            key={tier.id}
                                            type='button'
                                            aria-pressed={active}
                                            onClick={() => setTierId(tier.id)}
                                            className={`flex flex-col gap-2 border p-4 text-left transition-colors cursor-pointer ${
                                                active
                                                    ? 'border-light bg-light text-dark'
                                                    : 'border-light/15 text-light/60 hover:border-light/40'
                                            }`}
                                        >
                                            <span className='text-sm uppercase tracking-wide font-bold'>{tier.name}</span>
                                            <span className='text-lg tabular-nums'>{formatPrice(tier.price)}</span>
                                            <span className={`text-xs ${active ? 'text-dark/70' : 'text-light/50'}`}>
                                                {tier.description}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    <section>
                        <p className={labelClasses}>Co je součástí</p>
                        <ul className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2'>
                            {pkg.includes.map((item) => (
                                <li key={item} className='flex gap-2 text-sm text-light/60'>
                                    <span aria-hidden className='shrink-0 text-confirm'>✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {addons.length > 0 && (
                        <section>
                            <p className={labelClasses}>Volitelné doplňky</p>
                            <div className='mt-4 flex flex-col gap-2'>
                                {addons.map((addon) => {
                                    const qty = quantities[addon.id] ?? 0
                                    const active = addon.type === 'quantity' ? qty > 0 : selected.has(addon.id)
                                    const priceTag = `+${formatPrice(addon.price)}${addon.unit ? ` ${addon.unit}` : ''}${monthSuffix}`

                                    if (addon.type === 'quantity') {
                                        return (
                                            <div
                                                key={addon.id}
                                                className={`flex items-center justify-between gap-4 border px-4 py-3 transition-colors ${
                                                    active ? 'border-light/50 bg-light/5' : 'border-light/15'
                                                }`}
                                            >
                                                <span className='text-sm text-light/70'>
                                                    {addon.name}{' '}
                                                    <span className='text-light/50 tabular-nums whitespace-nowrap'>{priceTag}</span>
                                                </span>
                                                <span className='flex shrink-0 items-center gap-3'>
                                                    <button
                                                        type='button'
                                                        aria-label={`Odebrat: ${addon.name}`}
                                                        disabled={qty === 0}
                                                        onClick={() => stepQuantity(addon, -1)}
                                                        className='h-7 w-7 border border-light/15 text-light/70 cursor-pointer hover:enabled:border-light/40 disabled:opacity-30 disabled:cursor-default transition-colors'
                                                    >−</button>
                                                    <span className='w-4 text-center tabular-nums'>{qty}</span>
                                                    <button
                                                        type='button'
                                                        aria-label={`Přidat: ${addon.name}`}
                                                        disabled={qty >= (addon.max ?? 99)}
                                                        onClick={() => stepQuantity(addon, 1)}
                                                        className='h-7 w-7 border border-light/15 text-light/70 cursor-pointer hover:enabled:border-light/40 disabled:opacity-30 disabled:cursor-default transition-colors'
                                                    >+</button>
                                                </span>
                                            </div>
                                        )
                                    }

                                    return (
                                        <button
                                            key={addon.id}
                                            type='button'
                                            aria-pressed={active}
                                            onClick={() => toggleAddon(addon)}
                                            className={`flex items-center justify-between gap-4 border px-4 py-3 text-left transition-colors cursor-pointer ${
                                                active
                                                    ? 'border-light/50 bg-light/5 text-light'
                                                    : 'border-light/15 text-light/70 hover:border-light/40'
                                            }`}
                                        >
                                            <span className='flex gap-2 text-sm'>
                                                <span aria-hidden className={active ? 'text-confirm' : 'text-light/30'}>
                                                    {active ? '✓' : '+'}
                                                </span>
                                                {addon.name}
                                            </span>
                                            <span className='shrink-0 text-sm text-light/50 tabular-nums whitespace-nowrap'>
                                                {priceTag}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>

                            {includedNotes.map((note) => (
                                <p key={note} className='mt-3 text-xs text-light/50'>{note}</p>
                            ))}
                        </section>
                    )}

                    <section className='flex flex-col gap-2 border-t border-light/10 pt-6 text-xs text-light/50'>
                        <p>Odráží vybrané doplňky — plně individuální zadání může finální cenu upravit.</p>
                        <p>Práce nad rámec dohodnutého zadání se účtuje hodinově (~600 Kč/h) · záloha 30–50 % předem.</p>
                        <p>
                            Doména a placené služby třetích stran (rezervační systém, platební brána…) nejsou součástí
                            ceny. Vlastní hostovaný CMS/backend potřebuje vlastní server.
                        </p>
                    </section>

                    <section ref={formRef} className='border-t border-light/10 pt-6'>
                        <p className={labelClasses}>Poptávka</p>
                        <ContactForm
                            className='mt-4'
                            subject={`Poptávka z webu — ${pkg.name}`}
                            configuration={configuration}
                        />
                    </section>
                </div>

                <div className='shrink-0 flex flex-wrap items-center justify-between gap-4 border-t border-light/15 bg-dark px-5 py-4 sm:px-8'>
                    <div>
                        <p className={labelClasses}>Odhadovaná celková cena</p>
                        <p className='mt-1 text-2xl font-bold tabular-nums'>
                            {formatPrice(total)}
                            {pkg.monthly && <span className='text-sm font-normal text-light/50'> / měs.</span>}
                        </p>
                    </div>
                    <button
                        type='button'
                        onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className='border border-light/20 px-5 py-3 text-xs uppercase tracking-[0.15em] text-light/70 hover:border-light hover:text-light transition-colors cursor-pointer'
                    >
                        Poptat konfiguraci ↓
                    </button>
                </div>
            </div>
        </div>
    )
}
