'use client'

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

const FRONTEND_STACK = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis']
const BACKEND_STACK = ['Node.js', 'Express', 'MongoDB', 'REST API']

export default function About() {

    return (
        <section className='flex flex-col w-full h-auto bg-dark text-light'>
            <div className='flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl mx-auto min-h-screen px-6 py-32'>
                <div className='w-full max-w-sm aspect-square rounded-xl border border-light/10 bg-light/5 flex items-center justify-center shrink-0 order-2 lg:order-1'>
                    {/* TODO: profilová fotka */}
                    <span className='text-light/30 text-sm'>fotka</span>
                </div>
                <div className='flex flex-col gap-5 max-w-xl order-1 lg:order-2'>
                    <h1 className='text-3xl md:text-4xl'>Alex Liška - Freelance developer</h1>
                    <p className='text-light/70'>
                        Jsem freelance webový vývojář z Pardubic a okolí. Weby a webové aplikace stavím na míru —
                        od jednoduché prezentace po plnohodnotnou webovou aplikaci s vlastním backendem, databází
                        a administrací.
                    </p>
                    <p className='text-light/70'>
                        Ke kódování jsem se dostal jako samouk, souběžně studuji mechatroniku na TUL (a předtím
                        obor Technik informačních systémů). Ta kombinace — technické vzdělání a praxe s automatizací
                        a řídicími systémy — je vidět i na tom, jak k webu přistupuju: záleží mi na tom, aby fungoval
                        spolehlivě, ne jen aby vypadal dobře.
                    </p>
                    <p className='text-light/70'>
                        Nemám rád zbytečný žargon ani nekonečné revize. Domluvíme si rozsah, cenu a termín předem,
                        a Vy víte, co dostanete a kdy. Práci nad rámec zadání účtuju férově a hodinově — žádná
                        skrytá překvapení ve faktuře.
                    </p>
                </div>
            </div>

            <div className='w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div>
                    <h2 className='text-2xl mb-6'>Vzdělání</h2>
                    <ul className='flex flex-col gap-5'>
                        {EDUCATION.map((item) => (
                            <li key={item.title} className='border-l border-light/10 pl-4'>
                                <p className='text-light/50 text-sm'>{item.period}</p>
                                <p className='mt-1'>{item.title} <span className='text-light/50'>— {item.place}</span></p>
                                <p className='text-light/60 text-sm mt-1'>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-2xl mb-6'>Praxe</h2>
                    <ul className='flex flex-col gap-5'>
                        {EXPERIENCE.map((item) => (
                            <li key={`${item.title}-${item.period}`} className='border-l border-light/10 pl-4'>
                                <p className='text-light/50 text-sm'>{item.period}</p>
                                <p className='mt-1'>{item.title} <span className='text-light/50'>— {item.place}</span></p>
                                <p className='text-light/60 text-sm mt-1'>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className='w-full max-w-6xl mx-auto px-6 text-light/40 text-sm'>Kompletní životopis na vyžádání.</p>

            <div className='w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div>
                    <h2 className='text-xl mb-4'>Frontend technologie</h2>
                    <ul className='flex flex-wrap gap-2'>
                        {FRONTEND_STACK.map((tech) => (
                            <li key={tech} className='rounded-xl border border-light/10 px-3 py-1 text-sm text-light/70'>{tech}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl mb-4'>Backend technologie</h2>
                    <ul className='flex flex-wrap gap-2'>
                        {BACKEND_STACK.map((tech) => (
                            <li key={tech} className='rounded-xl border border-light/10 px-3 py-1 text-sm text-light/70'>{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='w-full max-w-6xl mx-auto px-6 pb-32'>
                <h2 className='text-2xl mb-6'>Proč se mnou</h2>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <li className='rounded-xl border border-light/10 p-6'>
                        <p className='font-medium'>Full-stack pod jednou střechou</p>
                        <p className='text-light/60 mt-1'>Nepotřebujete koordinovat tři různé dodavatele.</p>
                    </li>
                    <li className='rounded-xl border border-light/10 p-6'>
                        <p className='font-medium'>Pevná cena předem</p>
                        <p className='text-light/60 mt-1'>Žádná překvapení ve faktuře.</p>
                    </li>
                    <li className='rounded-xl border border-light/10 p-6'>
                        <p className='font-medium'>Smysl pro detail</p>
                        <p className='text-light/60 mt-1'>Technické vzdělání = spolehlivost, ne jen hezký vzhled.</p>
                    </li>
                    <li className='rounded-xl border border-light/10 p-6'>
                        <p className='font-medium'>Komunikace bez žargonu</p>
                        <p className='text-light/60 mt-1'>Vysvětlím, co a proč děláme. Rychlá odezva, jasné termíny.</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}
