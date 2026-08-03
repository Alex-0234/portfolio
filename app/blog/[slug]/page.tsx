import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import Button from "@/components/button"
import SplitReveal from "@/components/splitReveal"
import { SITE_NAME, SITE_URL } from "@/data/site"
import { renderMarkdown } from "@/utils/markdown"
import { formatDate, getPostBySlug, parseDate } from "@/utils/posts"

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ slug: string }>
}

const microClasses = 'font-jet text-xs uppercase tracking-[0.2em] text-light/80'

const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return { title: 'Článek nenalezen', robots: { index: false, follow: false } }
    }

    const path = `/blog/${post.slug}`
    const description = post.description ?? undefined
    const images = [post.coverImageUrl ?? '/opengraph-image']

    return {
        title: post.title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: 'article',
            locale: 'cs_CZ',
            siteName: SITE_NAME,
            title: `${post.title} | ${SITE_NAME}`,
            description,
            url: path,
            images,
            publishedTime: parseDate(post.publishedAt)?.toISOString(),
            modifiedTime: parseDate(post.updatedAt)?.toISOString(),
            authors: [SITE_NAME],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | ${SITE_NAME}`,
            description,
            images,
        },
    }
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    // draft i neexistující slug končí stejně - o rozpracovaných článcích se ven
    // nic prozrazovat nemá
    if (!post) notFound()

    const html = renderMarkdown(post.content)

    const url = `${SITE_URL}/blog/${post.slug}`
    const publishedAt = parseDate(post.publishedAt)?.toISOString()

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${url}#article`,
                mainEntityOfPage: { '@type': 'WebPage', '@id': url },
                url,
                headline: post.title,
                description: post.description ?? undefined,
                inLanguage: 'cs-CZ',
                datePublished: publishedAt,
                dateModified: publishedAt ? parseDate(post.updatedAt)?.toISOString() : undefined,
                author: { '@id': `${SITE_URL}/#alex` },
                publisher: { '@id': `${SITE_URL}/#alex` },
                image: absolute(post.coverImageUrl ?? '/opengraph-image'),
                keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Domů', item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
                    { '@type': 'ListItem', position: 3, name: post.title },
                ],
            },
        ],
    }

    return (
        <article className='flex w-full flex-col bg-dark font-jet text-light'>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <header className='flex w-full flex-col gap-8 px-6 pt-32 pb-12'>
                <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
                    <Link href='/blog' className={`${microClasses} transition-colors hover:text-light`}>
                        ← zpět na blog
                    </Link>

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
                                className='border border-light/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-light/80'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className='uppercase font-black leading-[1.15] tracking-[-0.03em] text-[clamp(2rem,6vw,4rem)]'>
                        <SplitReveal as='span' on='mount' split='words' stagger={0.04} className='block'>
                            {post.title}
                        </SplitReveal>
                    </h1>

                    {post.description && (
                        <p className='text-light/70 leading-relaxed'>{post.description}</p>
                    )}
                </div>
            </header>

            {post.coverImageUrl && (
                <div className='mx-auto w-full max-w-3xl px-6 pb-12'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt ?? post.title}
                        width={post.coverImageWidth ?? undefined}
                        height={post.coverImageHeight ?? undefined}
                        className='h-auto w-full border border-light/10'
                        fetchPriority='high'
                    />
                </div>
            )}

            <div
                className='post-body mx-auto w-full max-w-3xl px-6 pb-16'
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <footer className='mx-auto flex w-full max-w-3xl flex-wrap gap-4 px-6 pb-24'>
                <Button href='/offers' variant='solid'>Služby a ceník</Button>
                <Button href='/blog'>Další články</Button>
            </footer>
        </article>
    )
}
