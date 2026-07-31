'use client'
import Link from "next/link";
import BlackToWhiteTextFrontToBack from "@/components/gsapJSX.tsx/black-to-white-text-front-back";
import Hero from "@/components/gsapJSX.tsx/hero";


export default function Home() {

  return (
    <section className='flex flex-col justify-center items-center w-full h-fit bg-dark font-jet'>
      <Hero />

      <BlackToWhiteTextFrontToBack text='' />

      <div className='flex flex-col items-center gap-10 w-full h-screen bg-white text-dark px-6 py-16'>
        <div className='flex flex-col items-center gap-3 text-center max-w-2xl'>
          <h2 className='text-2xl md:text-3xl'>Proč se mnou</h2>
          <p className='text-dark/60'>
            Full-stack pod jednou střechou, pevná cena předem a komunikace bez žargonu.
          </p>
        </div>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
          <li className='rounded-xl border border-dark/10 p-6'>
            <p className='font-medium'>Full-stack pod jednou střechou</p>
            <p className='text-dark/60 mt-1'>Nepotřebujete koordinovat tři různé dodavatele.</p>
          </li>
          <li className='rounded-xl border border-dark/10 p-6'>
            <p className='font-medium'>Pevná cena předem</p>
            <p className='text-dark/60 mt-1'>Žádná překvapení ve faktuře.</p>
          </li>
          <li className='rounded-xl border border-dark/10 p-6'>
            <p className='font-medium'>Smysl pro detail</p>
            <p className='text-dark/60 mt-1'>Technické vzdělání (mechatronika, informační systémy), ne jen hezký vzhled.</p>
          </li>
          <li className='rounded-xl border border-dark/10 p-6'>
            <p className='font-medium'>Rychlá odezva</p>
            <p className='text-dark/60 mt-1'>Komunikace bez žargonu a jasné termíny.</p>
          </li>
        </ul>
        <Link href='/about' className='underline underline-offset-4'>
          Přečíst si víc o mně →
        </Link>
      </div>
    </section>
  );
}
