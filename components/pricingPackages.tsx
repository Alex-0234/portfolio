'use client'

import { useState } from "react"

import PricingModal from "@/components/pricingModal"
import { PACKAGES, type Package } from "@/data/pricing"
import { formatPrice } from "@/utils/price"

export default function PricingPackages() {
    const [openPackage, setOpenPackage] = useState<Package | null>(null)

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {PACKAGES.map((pkg) => (
                    <article
                        key={pkg.id}
                        id={pkg.id}
                        className='group flex flex-col border border-light/10 bg-light/2 transition-colors duration-300 hover:border-light/30 scroll-mt-24'
                    >
                        <div className='flex items-center justify-between border-b border-light/10 px-5 py-3 font-jet text-xs uppercase tracking-[0.2em] text-light/50'>
                            <span>[ svc/{pkg.number} ]</span>
                            <span>{pkg.timeline}</span>
                        </div>

                        <div className='flex flex-1 flex-col p-6'>
                            <h3 className='text-xl md:text-2xl uppercase font-bold tracking-tight'>{pkg.name}</h3>
                            <p className='mt-1 text-sm text-light/50'>{pkg.tagline}</p>

                            <ul className='mt-5 flex flex-wrap gap-2'>
                                {pkg.highlights.map((item) => (
                                    <li key={item} className='border border-light/15 px-3 py-1 text-xs text-light/60'>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className='mt-auto flex flex-wrap items-end justify-between gap-4 pt-8'>
                                <div>
                                    <p className='font-jet text-xs uppercase tracking-[0.2em] text-light/50'>{pkg.scope}</p>
                                    <p className='mt-1 text-3xl font-bold tabular-nums'>
                                        {formatPrice(pkg.tiers ? pkg.tiers[0].price : pkg.price ?? 0)}
                                        {pkg.monthly && <span className='text-sm font-normal text-light/50'> / měs.</span>}
                                    </p>
                                </div>

                                <button
                                    type='button'
                                    onClick={() => setOpenPackage(pkg)}
                                    className='border border-light/20 px-5 py-3 font-jet text-xs uppercase tracking-[0.15em] text-light/70 hover:border-light hover:text-light transition-colors cursor-pointer'
                                >
                                    Sestavit nabídku →
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {openPackage && (
                <PricingModal pkg={openPackage} onClose={() => setOpenPackage(null)} />
            )}
        </>
    )
}
