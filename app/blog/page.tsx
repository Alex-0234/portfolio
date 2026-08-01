import Button from "@/components/button"
import SplitReveal from "@/components/splitReveal"
import { pageMetadata } from "@/utils/metadata"

export const metadata = pageMetadata({
    title: "Blog",
    description: "Tipy k tvorbě webů, poznámky z praxe a rozbory vlastních projektů.",
    path: "/blog",
})

const PLANNED = [
    'Jak vybrat mezi landing page a firemním webem',
    'Co všechno je „základní SEO" a proč na tom záleží',
    'Proč používám Cloudflare Pages místo klasického hostingu',
    'Mechatronika vs. programování — co mi jedno dalo pro to druhé',
]

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default function Blog() {
    return (
        <section className='flex w-full flex-col bg-dark font-jet text-light'>
            <header className='flex min-h-screen w-full flex-col justify-center gap-10 px-6 pt-32 pb-16'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
                    <p className={microClasses}>[ poznámky z praxe ]</p>

                    <h1 className='-my-[0.2em] uppercase font-black leading-[1.4] tracking-[-0.042em] text-[clamp(2.75rem,11vw,9rem)]'>
                        <SplitReveal as='span' on='mount' split='chars' stagger={0.02} className='block'>
                            Blog
                        </SplitReveal>
                    </h1>

                    <p className='max-w-2xl text-light/70 leading-relaxed'>
                        Zatím tu nic není, ale brzy tu najdete tipy k tvorbě webů, poznámky z praxe a rozbory
                        vlastních projektů.
                    </p>

                    <div>
                        <p className={`${microClasses} mb-4`}>Na čem pracuju</p>
                        <ul className='flex flex-col border-t border-light/10'>
                            {PLANNED.map((title) => (
                                <li key={title} className='flex items-center gap-4 border-b border-light/10 py-4 text-sm text-light/60'>
                                    <span aria-hidden className='text-light/30'>—</span>
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-wrap gap-4'>
                        <Button href='/offers' variant='solid'>Služby a ceník</Button>
                        <Button href='/portfolio'>Portfolio</Button>
                    </div>
                </div>
            </header>
        </section>
    )
}
