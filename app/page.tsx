import type { Metadata } from "next";
import Link from "next/link";
import BlackToWhiteTextFrontToBack from "@/components/gsapJSX.tsx/black-to-white-text-front-back";
import Hero from "@/components/gsapJSX.tsx/hero";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

const REASONS = [
  { title: 'Rychlost si ověříte sami', description: 'Vložte adresu do PageSpeed Insights od Googlu — uvidíte, jak rychle se web načte, jak reaguje a jestli obsah neposkakuje. Nemusíte věřit mně.' },
  { title: 'Text vidí i vyhledávač', description: 'Animovaný text zůstává v odeslaném HTML čitelný. Google nečeká na JavaScript, takže mu neuteče půlka stránky.' },
  { title: 'Řeknu vám, když to nemá smysl', description: 'Někdy stačí jedna stránka a firemní profil na Googlu. Nebudu vám stavět aplikaci, kterou nevyužijete.' },
  { title: 'Průběžně to vidíte živě', description: 'Web běží na odkazu od prvního týdne. Nemusíte čekat na předání, abyste zjistili, že jste to mysleli jinak.' },
]

export default function Home() {

  return (
    <>
    <main className='relative z-1 flex flex-col justify-center items-center w-full h-fit bg-dark font-jet'>
      <Hero />

      <BlackToWhiteTextFrontToBack />

      <div className='flex flex-col items-center gap-10 w-full min-h-svh bg-white text-dark px-6 py-16'>
        <div className='flex flex-col items-center gap-3 text-center max-w-2xl'>
          <h2 className='text-2xl md:text-3xl'>Proč se mnou</h2>
          <p className='text-dark/70'>
            Rychlost, kterou si změříte. Průběh, který vidíte živě. A rovná řeč, i když mi zrovna nevydělá.
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
    </main>
    <Footer bg_color='dark' />
    </>
  );
}
