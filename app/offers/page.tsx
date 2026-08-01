import Button from "@/components/button"
import ContactForm from "@/components/contactForm"
import PricingPackages from "@/components/pricingPackages"
import SplitReveal from "@/components/splitReveal"
import { PACKAGES } from "@/data/pricing"
import { pageMetadata } from "@/utils/metadata"
import { formatPrice } from "@/utils/price"

export const metadata = pageMetadata({
    title: "Služby a ceník",
    description: "Landing page, firemní web, webová aplikace nebo správa webu — pevné ceny od, kalkulačka a poptávkový formulář.",
    path: "/offers",
})

const PROCESS = [
    { title: 'Poptávka', description: 'Napíšete mi přes formulář nebo e-mail, co potřebujete.' },
    { title: 'Úvodní konzultace', description: 'Probereme rozsah, cíle a rozpočet.' },
    { title: 'Návrh a nacenění', description: 'Dostanete konkrétní nabídku s pevnou cenou a termínem.' },
    { title: 'Vývoj', description: 'Stavím web, průběžně vidíte progres.' },
    { title: 'Předání a zaškolení', description: 'Dostanete přístupy, administraci a případně zaškolení.' },
    { title: 'Podpora', description: 'Volitelně navazuje balíček Správa a údržba.' },
]

const FAQ = [
    { q: 'Jak dlouho trvá tvorba webu?', a: 'Podle rozsahu — landing page 1–2 týdny, firemní web 2–4 týdny, webová aplikace 4–8 týdnů.' },
    { q: 'Co když přesně nevím, co potřebuju?', a: 'Není problém, na to je úvodní konzultace — společně to vyladíme.' },
    { q: 'Poskytujete hosting?', a: 'Ano, v rámci balíčku Správa a údržba. Bez něj hosting předávám na Váš účet.' },
    { q: 'Jak probíhá platba?', a: 'Záloha 30–50 % předem, zbytek po předání. Práce nad rámec zadání se účtuje hodinově.' },
    { q: 'Budu moct web upravovat sám?', a: 'U firemního webu ano — novinky a reference jdou upravovat přes administraci, na kterou Vás zaškolím.' },
    { q: 'Co po předání, když najdu chybu?', a: 'Opravy v rámci dohodnutého rozsahu jsou součástí revizí, cokoliv navíc řešíme ve správě nebo hodinově.' },
]

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default function Offers() {
    return (
        <section className='flex w-full flex-col bg-dark font-jet text-light'>
            {/* úvod - stránka se otevírá jedním tvrzením, detaily čekají níž a v kalkulačce */}
            <header className='flex min-h-screen w-full flex-col justify-center gap-10 px-6 pt-32 pb-16'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
                    <p className={microClasses}>[ pevný rozsah · ceny od · žádná překvapení ]</p>

                    <h1 className='-my-[0.2em] uppercase font-black leading-[1.4] tracking-[-0.042em] text-[clamp(2.75rem,11vw,9rem)]'>
                        <SplitReveal as='span' on='mount' split='chars' stagger={0.02} className='block'>
                            Spolupráce
                        </SplitReveal>
                        <SplitReveal as='span' on='mount' split='chars' stagger={0.02} delay={0.15} className='-mt-[0.5em] block ml-[8%] sm:ml-[22%]'>
                            se mnou
                        </SplitReveal>
                    </h1>

                    <div className='flex flex-col gap-4 max-w-2xl'>
                        <SplitReveal on='mount' delay={0.4} className='text-light/70 leading-relaxed'>
                            Stavím weby a webové aplikace na míru — od jednoduché prezentace po aplikaci s vlastním
                            backendem, databází a administrací. Rozsah, cenu i termín si domluvíme předem, takže víte,
                            co dostanete a kdy.
                        </SplitReveal>
                        <p className='text-sm text-light/50'>
                            Základní ceny — finální cena závisí na tom, jaké funkce skutečně potřebujete.
                        </p>
                        <p className='text-sm text-confirm'>Aktuálně přijímám nové projekty</p>
                    </div>

                    <div className='flex flex-wrap gap-4'>
                        <Button href='#balicky' variant='solid'>Sestavit nabídku</Button>
                        <Button href='/portfolio'>Prohlédnout portfolio</Button>
                    </div>
                </div>

                {/* rychlý přehled - z úvodu je vidět celý ceník, aniž by musel scrollovat */}
                <ul className='mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 border-t border-light/10 sm:grid-cols-2 lg:grid-cols-4'>
                    {PACKAGES.map((pkg) => (
                        <li key={pkg.id} className='border-b border-light/10 lg:border-b-0 lg:border-r lg:last:border-r-0'>
                            <a href={`#${pkg.id}`} className='flex flex-col gap-1 px-4 py-5 transition-colors hover:bg-light/5'>
                                <span className={microClasses}>{pkg.number}</span>
                                <span className='text-sm uppercase tracking-wide'>{pkg.name}</span>
                                <span className='text-sm text-light/50 tabular-nums'>
                                    {pkg.scope} {formatPrice(pkg.tiers ? pkg.tiers[0].price : pkg.price ?? 0)}
                                    {pkg.monthly && ' / měs.'}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </header>

            <div id='balicky' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ balíčky ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Co pro Vás postavím
                    </SplitReveal>
                    <p className='max-w-xl text-sm text-light/50'>
                        Otevřete si kalkulačku, naklikejte doplňky, které potřebujete, a rovnou odešlete poptávku
                        i s konfigurací.
                    </p>
                </div>

                <PricingPackages />
            </div>

            <div className='mx-auto w-full max-w-6xl px-6 py-24'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ postup ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Jak probíhá spolupráce
                    </SplitReveal>
                </div>

                <ol className='grid grid-cols-1 gap-px bg-light/10 sm:grid-cols-2 lg:grid-cols-3'>
                    {PROCESS.map((step, index) => (
                        <li key={step.title} className='flex flex-col gap-2 bg-dark p-6'>
                            <span className={microClasses}>{String(index + 1).padStart(2, '0')}</span>
                            <p className='uppercase tracking-wide'>{step.title}</p>
                            <p className='text-sm text-light/50'>{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <div className='mx-auto w-full max-w-3xl px-6 py-24'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ časté dotazy ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Na co se ptáte
                    </SplitReveal>
                </div>

                <div className='flex flex-col'>
                    {FAQ.map((item) => (
                        // native details drží accordion funkční i bez javascriptu
                        <details key={item.q} className='group border-b border-light/10'>
                            <summary className='flex cursor-pointer items-center justify-between gap-4 py-5 list-none [&::-webkit-details-marker]:hidden'>
                                <span className='text-sm sm:text-base'>{item.q}</span>
                                <span aria-hidden className='shrink-0 text-light/50 transition-transform duration-300 group-open:rotate-45'>+</span>
                            </summary>
                            <p className='pb-5 text-sm text-light/50 leading-relaxed'>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>

            <div id='poptavka' className='mx-auto w-full max-w-3xl px-6 pb-40 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ poptávka ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Pojďme spolupracovat
                    </SplitReveal>
                    <p className='text-sm text-light/50'>
                        Nejste si jistí, co potřebujete? Napište mi a probereme to.
                    </p>
                </div>

                <ContactForm />
            </div>
        </section>
    )
}
