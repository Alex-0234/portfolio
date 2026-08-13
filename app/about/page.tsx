import Button from "@/components/button"
import Footer from "@/components/footer"
import SplitReveal from "@/components/splitReveal"
import { pageMetadata } from "@/utils/metadata"

export const metadata = pageMetadata({
    title: "O mně",
    description: "Full-stack vývojář s technickým vzděláním (mechatronika, informační systémy). Poznejte, kdo stojí za Vaším projektem.",
    path: "/about",
})

const EDUCATION = [
    { period: '2025 – nyní', title: 'Vývoj webových aplikací', place: 'samouk', description: 'Stavím reálné projekty s Reactem, Node.js a MongoDB.' },
    { period: '2024 – nyní', title: 'Mechatronika', place: 'TUL', description: 'Robotika, automatizace a řídicí systémy.' },
    { period: '2020 – 2024', title: 'Technik informačních systémů', place: 'SOŠ Kolín', description: 'Základy IT, elektronika, mikrokontroléry, zabezpečovací technika.' },
]

const EXPERIENCE = [
    { period: '06.2024 – 08.2024', title: 'Údržba výrobní linky', place: 'Kiekert', description: 'Stavba a demontáž výrobních linek.' },
    { period: '06.2023 – 08.2023', title: 'Údržba a sklad', place: 'Kiekert', description: 'Správa skladu a podpora linky.' },
    { period: '05.2022', title: 'Výroba rozvaděčů', place: 'Manag', description: 'Dvoutýdenní stáž přímo ve výrobě.' },
    { period: '05.2021', title: 'Úvod do výroby', place: 'Manag', description: 'První praktický kontakt s průmyslovou výrobou.' },
]

const STACK = [
    { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST API'] },
]

const USP = [
    { title: 'Full-stack pod jednou střechou', description: 'Nepotřebujete koordinovat tři různé dodavatele.' },
    { title: 'Pevná cena předem', description: 'Žádná překvapení ve faktuře.' },
    { title: 'Smysl pro detail', description: 'Technické vzdělání = spolehlivost, ne jen hezký vzhled.' },
    { title: 'Komunikace bez žargonu', description: 'Vysvětlím, co a proč děláme. Rychlá odezva, jasné termíny.' },
]

const INDEX = [
    { number: '01', name: 'Přístup', note: 'jak pracuju', href: '#pristup' },
    { number: '02', name: 'Vzdělání a praxe', note: 'odkud jdu', href: '#cesta' },
    { number: '03', name: 'Technologie', note: 'v čem stavím', href: '#stack' },
    { number: '04', name: 'Proč se mnou', note: 'co z toho máte', href: '#proc' },
]

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default function About() {
    return (
        <>
        <main className='relative z-1 flex w-full flex-col bg-dark font-jet text-light'>
            <header className='flex min-h-svh w-full flex-col justify-center gap-10 px-6 pt-32 pb-16'>
                <div className='mx-auto w-full max-w-6xl'>
                    <div className='flex flex-col gap-8 lg:max-w-2xl'>
                        <p className={microClasses}>[ pardubice a okolí · full-stack · od backendu po scroll ]</p>

                        {/* leading-[1.4] dělá masce místo na háčky a čárky, -mt na druhém
                            řádku vrátí řádkům původní těsný odstup a -my celému nadpisu
                            původní výšku */}
                        <h1 className='-my-[0.2em] uppercase font-black leading-[1.4] tracking-[-0.042em] text-[clamp(2.75rem,11vw,9rem)]'>
                            <SplitReveal as='span' on='mount' split='chars' stagger={0.02} className='block'>
                                Alex
                            </SplitReveal>
                            <SplitReveal as='span' on='mount' split='chars' stagger={0.02} delay={0.15} className='-mt-[0.5em] block ml-[12%] sm:ml-[30%]'>
                                Liška
                            </SplitReveal>
                        </h1>

                        <div className='flex flex-col gap-4'>
                            <SplitReveal on='mount' delay={0.4} className='text-light/70 leading-relaxed'>
                                Jsem freelance webový vývojář z Pardubic a okolí. Weby a webové aplikace stavím na míru — od
                                jednoduché prezentace po plnohodnotnou webovou aplikaci s vlastním backendem, databází a administrací.
                            </SplitReveal>
                            <p className='text-sm text-confirm'>Aktuálně přijímám nové projekty</p>
                        </div>

                        <div className='flex flex-wrap gap-4'>
                            <Button href='/offers' variant='solid'>Služby a ceník</Button>
                            <Button href='/portfolio'>Portfolio</Button>
                        </div>
                    </div>
                </div>

                <ul className='mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 border-t border-light/10 sm:grid-cols-2 lg:grid-cols-4'>
                    {INDEX.map((item) => (
                        <li key={item.number} className='border-b border-light/10 lg:border-b-0 lg:border-r lg:last:border-r-0'>
                            <a href={item.href} className='flex flex-col gap-1 px-4 py-5 transition-colors hover:bg-light/5'>
                                <span className={microClasses}>{item.number}</span>
                                <span className='text-sm uppercase tracking-wide'>{item.name}</span>
                                <span className='text-sm text-light/50'>{item.note}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </header>

            <div id='pristup' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ přístup ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Jak k tomu přistupuju
                    </SplitReveal>
                </div>

                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    <p className='text-light/60 leading-relaxed'>
                        Ke kódování jsem se dostal jako samouk, souběžně studuji mechatroniku na TUL (a předtím obor
                        Technik informačních systémů). Ta kombinace — technické vzdělání a praxe s automatizací a řídicími
                        systémy — je vidět i na tom, jak k webu přistupuju: záleží mi na tom, aby fungoval spolehlivě,
                        ne jen aby vypadal dobře.
                    </p>
                    <p className='text-light/60 leading-relaxed'>
                        Nemám rád zbytečný žargon ani nekonečné revize. Domluvíme si rozsah, cenu a termín předem,
                        a Vy víte, co dostanete a kdy. Práci nad rámec zadání účtuju férově a hodinově — žádná skrytá
                        překvapení ve faktuře.
                    </p>
                </div>
            </div>

            <div id='cesta' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ vzdělání a praxe ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Odkud jdu
                    </SplitReveal>
                </div>

                <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
                    {[{ label: 'Vzdělání', items: EDUCATION }, { label: 'Praxe', items: EXPERIENCE }].map((group) => (
                        <div key={group.label}>
                            <h3 className={`${microClasses} mb-4`}>{group.label}</h3>
                            <ul className='flex flex-col'>
                                {group.items.map((item) => (
                                    <li key={`${item.title}-${item.period}`} className='flex flex-col gap-1 border-t border-light/10 py-5'>
                                        <span className={microClasses}>{item.period}</span>
                                        <p className='uppercase tracking-wide'>
                                            {item.title} <span className='text-light/50'>— {item.place}</span>
                                        </p>
                                        <p className='text-sm text-light/50'>{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className='mt-8 text-sm text-light/50'>Kompletní životopis na vyžádání.</p>
            </div>

            <div id='stack' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ technologie ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        V čem stavím
                    </SplitReveal>
                </div>

                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {STACK.map((group) => (
                        <div key={group.label} className='flex flex-col gap-4 border-t border-light/10 pt-6'>
                            <h3 className={microClasses}>{group.label}</h3>
                            <ul className='flex flex-wrap gap-2'>
                                {group.items.map((tech) => (
                                    <li key={tech} className='border border-light/15 px-3 py-1 text-xs text-light/60'>
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div id='proc' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-16'>
                <div className='mb-10 flex flex-col gap-3'>
                    <p className={microClasses}>[ proč se mnou ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Co z toho máte
                    </SplitReveal>
                </div>

                <ul className='grid grid-cols-1 gap-px bg-light/10 sm:grid-cols-2'>
                    {USP.map((item, index) => (
                        <li key={item.title} className='flex flex-col gap-2 bg-dark p-6'>
                            <span className={microClasses}>{String(index + 1).padStart(2, '0')}</span>
                            <p className='uppercase tracking-wide'>{item.title}</p>
                            <p className='text-sm text-light/50'>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mx-auto w-full max-w-6xl px-6 pb-40'>
                <div className='flex flex-col gap-6 border border-light/10 bg-light/2 p-8 sm:p-12'>
                    <p className={microClasses}>[ pojďme na to ]</p>
                    <SplitReveal as='h2' split='chars' stagger={0.02} className='text-2xl md:text-4xl uppercase font-bold leading-[1.4] tracking-tight'>
                        Postavíme něco spolu
                    </SplitReveal>
                    <p className='max-w-xl text-sm text-light/50'>
                        Napište mi, co potřebujete. Rozsah, cenu i termín si domluvíme předem.
                    </p>
                    <div className='flex flex-wrap gap-4'>
                        <Button href='/offers#poptavka' variant='solid'>Napsat mi</Button>
                        <Button href='/offers'>Služby a ceník</Button>
                    </div>
                </div>
            </div>
        </main>
        <Footer bg_color='light'  />
        </>
    )
}
