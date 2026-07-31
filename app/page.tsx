'use client'
import BlackToWhiteTextFrontToBack from "@/components/gsapJSX.tsx/black-to-white-text-front-back";

export default function Home() {

  return (
    <section className='flex flex-col justify-center items-center w-full h-fit bg-dark'>
      <div className='flex justify-center items-center w-full h-screen'>
        <h1 className='text-3xl'>Tvorba webovych aplikací - Pardubice a okolí</h1>
      </div>
      <BlackToWhiteTextFrontToBack />
      <div className='flex w-full h-screen bg-white'>
        
      </div>
      
    </section>
  );
}
