import Link from "next/link"

import { SITE_NAME } from "@/data/site"

// Skeleton pro detail článku. Statická kostra (zpětný odkaz, jméno) sedí na
// page.tsx, zbytek je placeholder - titulek ani perex dopředu neznáme. Cover
// drží aspect-video, ať prohlížeč rezervuje výšku a obrázek po načtení nic
// neposune. Stejné pozadí i rozestupy (pt-32, max-w-3xl) => bez layout shiftu.
const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/80'
const shimmer = 'animate-pulse bg-light/10 motion-reduce:animate-none'

export default function BlogPostLoading() {
    return (
        <main aria-busy className='flex w-full flex-col'>
            <article className='flex w-full flex-col bg-dark font-jet text-light'>
                <header className='flex w-full flex-col gap-8 px-6 pt-32 pb-12'>
                    <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
                        <Link href='/blog' className={`${microClasses} transition-colors hover:text-light`}>
                            ← zpět na blog
                        </Link>

                        <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                            <span className={`${microClasses} text-light`}>{SITE_NAME}</span>
                            <span className={`h-3 w-32 ${shimmer}`} />
                            <span className={`h-4 w-14 ${shimmer}`} />
                        </div>

                        {/* titulek: dva řádky ve výšce clamp(2rem,6vw,4rem) */}
                        <div className='flex flex-col gap-3'>
                            <span className={`h-[clamp(2rem,6vw,4rem)] w-full ${shimmer}`} />
                            <span className={`h-[clamp(2rem,6vw,4rem)] w-3/5 ${shimmer}`} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className={`h-4 w-full max-w-xl ${shimmer}`} />
                            <span className={`h-4 w-2/3 max-w-md ${shimmer}`} />
                        </div>
                    </div>
                </header>

                {/* rezervace místa pro cover ve stejném rámci jako reálný obrázek */}
                <div className='mx-auto w-full max-w-3xl px-6 pb-12'>
                    <div className={`aspect-video w-full border border-light/10 ${shimmer}`} />
                </div>

                {/* tělo článku: pár řádků textu */}
                <div className='mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 pb-16'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-4 ${shimmer} ${i % 4 === 3 ? 'w-2/5' : 'w-full'}`}
                        />
                    ))}
                </div>
            </article>
        </main>
    )
}
