import type { MetadataRoute } from "next"

import { SITE_URL } from "@/data/site"
import { getPublishedSlugs, parseDate } from "@/utils/posts"


export const dynamic = 'force-dynamic'

const ROUTES = [
    { path: '', priority: 1, lastModified: '2026-08-03' },
    { path: '/offers', priority: 0.9, lastModified: '2026-08-03' },
    { path: '/portfolio', priority: 0.8, lastModified: '2026-08-03' },
    { path: '/about', priority: 0.8, lastModified: '2026-08-03' },
    { path: '/blog', priority: 0.5, lastModified: '2026-08-03' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPublishedSlugs()

    return [
        ...ROUTES.map(({ path, priority, lastModified }) => ({
            url: `${SITE_URL}${path}`,
            priority,
            lastModified,
        })),
        ...posts.map(({ slug, updatedAt }) => ({
            url: `${SITE_URL}/blog/${slug}`,
            priority: 0.6,
            lastModified: parseDate(updatedAt) ?? undefined,
        })),
    ]
}
