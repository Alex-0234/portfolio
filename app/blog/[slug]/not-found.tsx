import Button from "@/components/button"

export default function PostNotFound() {
    return (
        <section className='flex min-h-svh w-full flex-col justify-center gap-8 bg-dark px-6 pt-32 pb-16 font-jet text-light'>
            <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
                <p className='font-jet text-xs uppercase tracking-[0.2em] text-light/50'>[ 404 ]</p>

                <h1 className='uppercase font-black leading-[1.15] tracking-[-0.03em] text-[clamp(2rem,6vw,4rem)]'>
                    Článek neexistuje
                </h1>

                <p className='max-w-xl text-light/70 leading-relaxed'>
                    Tenhle odkaz nikam nevede — článek byl smazaný nebo ještě není zveřejněný.
                </p>

                <div className='flex flex-wrap gap-4'>
                    <Button href='/blog' variant='solid'>Zpět na blog</Button>
                    <Button href='/'>Domů</Button>
                </div>
            </div>
        </section>
    )
}
