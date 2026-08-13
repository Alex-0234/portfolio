import Button from "@/components/button"

// Skeleton pro /blog. Statická kostra (popisek, nadpis, perex, CTA) je 1:1
// shodná s page.tsx, takže se při swapu nehne - placeholdery drží jen výpis
// článků, který se tahá z D1. Stejné pozadí, stejné rozestupy (pt-32, max-w-6xl,
// min-h-svh) => žádný layout shift.
const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/80'

// políčka „pulzují", při prefers-reduced-motion zůstanou statická
const shimmer = 'animate-pulse bg-light/10 motion-reduce:animate-none'

export default function BlogLoading() {
    return (
        <main
            aria-busy
            className='relative z-1 flex w-full flex-col bg-dark font-jet text-light'
        >
            <header className='flex min-h-svh w-full flex-col justify-center gap-10 px-6 pt-32 pb-16'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
                    <p className={microClasses}>[ poznámky z praxe ]</p>

                    <h1 className='-my-[0.2em] uppercase font-black leading-[1.4] tracking-[-0.042em] text-[clamp(2.75rem,11vw,9rem)]'>
                        Blog
                    </h1>

                    <p className='max-w-2xl text-light/70 leading-relaxed'>
                        Tipy k tvorbě webů, poznámky z praxe a rozbory vlastních projektů.
                    </p>

                    <ul className='flex flex-col border-t border-light/10'>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <li key={i} className='border-b border-light/10'>
                                <div className='flex flex-col gap-3 py-6'>
                                    <div className='flex flex-wrap items-center gap-3'>
                                        <span className={`h-3 w-28 ${shimmer}`} />
                                        <span className={`h-4 w-16 ${shimmer}`} />
                                    </div>
                                    <span className={`h-6 w-2/3 max-w-md ${shimmer}`} />
                                    <span className={`h-4 w-full max-w-2xl ${shimmer}`} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='flex flex-wrap gap-4'>
                        <Button href='/offers' variant='solid'>Služby a ceník</Button>
                        <Button href='/portfolio'>Portfolio</Button>
                    </div>
                </div>
            </header>
        </main>
    )
}
