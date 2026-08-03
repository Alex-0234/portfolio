import type { Metadata } from "next"

import Button from "@/components/button"
import Footer from "@/components/footer"

export const metadata: Metadata = {
    title: 'Stránka nenalezena',
}

export default function NotFound() {
    return (
        <>
            <section className='flex min-h-svh w-full flex-col justify-center gap-8 bg-dark px-6 pt-32 pb-16 font-jet text-light'>
                <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
                    <p className='font-jet text-xs uppercase tracking-[0.2em] text-light/50'>[ 404 ]</p>

                    <h1 className='uppercase font-black leading-[1.15] tracking-[-0.03em] text-[clamp(2rem,6vw,4rem)]'>
                        Tady nic není
                    </h1>

                    <p className='max-w-xl text-light/70 leading-relaxed'>
                        Stránka, kterou hledáte, neexistuje nebo se přesunula. Zkuste to od začátku —
                        nebo mi rovnou napište, co jste hledali.
                    </p>

                    <div className='flex flex-wrap gap-4'>
                        <Button href='/' variant='solid'>Domů</Button>
                        <Button href='/offers'>Služby a ceník</Button>
                        <Button href='/blog'>Blog</Button>
                    </div>
                </div>
            </section>
            <Footer bg_color='dark' />
        </>
    )
}
