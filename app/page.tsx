import Link from "next/link";
import BlackToWhiteTextFrontToBack from "@/components/gsapJSX.tsx/black-to-white-text-front-back";
import Hero from "@/components/gsapJSX.tsx/hero";

const REASONS = [
  { title: 'Full-stack pod jednou střechou', description: 'Nepotřebujete koordinovat tři různé dodavatele.' },
  { title: 'Pevná cena předem', description: 'Žádná překvapení ve faktuře.' },
  { title: 'Smysl pro detail', description: 'Technické vzdělání (mechatronika, informační systémy), ne jen hezký vzhled.' },
  { title: 'Rychlá odezva', description: 'Komunikace bez žargonu a jasné termíny.' },
]

export default function Home() {

  return (
    <section className='flex flex-col justify-center items-center w-full h-fit bg-dark font-jet'>
      <Hero />

      <BlackToWhiteTextFrontToBack />

      <div className='flex flex-col items-center gap-10 w-full min-h-svh bg-white text-dark px-6 py-16'>
        <div className='flex flex-col items-center gap-3 text-center max-w-2xl'>
          <h2 className='text-2xl md:text-3xl'>Proč se mnou</h2>
          <p className='text-dark/70'>
            Full-stack pod jednou střechou, pevná cena předem a komunikace bez žargonu.
          </p>
        </div>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
          {REASONS.map((reason) => (
            <li key={reason.title} className='rounded-xl border border-dark/10 p-6'>
              <p className='font-medium'>{reason.title}</p>
              <p className='text-dark/70 mt-1'>{reason.description}</p>
            </li>
          ))}
        </ul>
        <Link href='/about' className='underline underline-offset-4'>
          Přečíst si víc o mně →
        </Link>
      </div>
    </section>
  );
}
