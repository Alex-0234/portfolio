import Link from "next/link"

import Button from "@/components/button"
import SplitReveal from "@/components/splitReveal"
import { pageMetadata } from "@/utils/metadata"
import { formatDate, getPublishedPosts, parseDate } from "@/utils/posts"

// stránka čte D1 přes binding, který za buildu neexistuje - bez tohohle by ji
// `next build` zkusil předrenderovat a spadlo by to
export const dynamic = 'force-dynamic'

export const metadata = pageMetadata({
    title: "Blog",
    description: "Tipy k tvorbě webů, poznámky z praxe a rozbory vlastních projektů.",
    path: "/blog",
})

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/50'

export default async function Blog() {
    const posts = await getPublishedPosts()

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
                        Tipy k tvorbě webů, poznámky z praxe a rozbory vlastních projektů.
                    </p>

                    {posts.length === 0 ? (
                        <p className='max-w-2xl text-light/50 leading-relaxed'>
                            Zatím tu nic není — první článek se chystá.
                        </p>
                    ) : (
                        <ul className='flex flex-col border-t border-light/10'>
                            {posts.map((post) => (
                                <li key={post.slug} className='border-b border-light/10'>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='group flex flex-col gap-2 py-6 transition-colors hover:text-light'
                                    >
                                        <div className='flex flex-wrap items-center gap-3'>
                                            {post.publishedAt && (
                                                <time
                                                    dateTime={parseDate(post.publishedAt)?.toISOString()}
                                                    className={microClasses}
                                                >
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            )}
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className='border border-light/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-light/40'
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h2 className='flex items-center gap-3 text-lg text-light/80 transition-colors group-hover:text-light sm:text-xl'>
                                            {post.title}
                                            <span
                                                aria-hidden
                                                className='text-light/30 transition-transform duration-300 group-hover:translate-x-1'
                                            >
                                                →
                                            </span>
                                        </h2>

                                        {post.description && (
                                            <p className='max-w-2xl text-sm text-light/50 leading-relaxed'>
                                                {post.description}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className='flex flex-wrap gap-4'>
                        <Button href='/offers' variant='solid'>Služby a ceník</Button>
                        <Button href='/portfolio'>Portfolio</Button>
                    </div>
                </div>
            </header>
        </section>
    )
}
