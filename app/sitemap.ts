import type { MetadataRoute } from "next"

import { SITE_URL } from "@/data/site"
import { getPublishedSlugs, parseDate } from "@/utils/posts"


// sitemapa se od Nextu cachuje jako statická, dokud si o dynamiku neřekne -
// články jsou v D1, takže se musí generovat za requestu
export const dynamic = 'force-dynamic'

const ROUTES = [
    { path: '', priority: 1 },
    { path: '/offers', priority: 0.9 },
    { path: '/portfolio', priority: 0.8 },
    { path: '/about', priority: 0.8 },
    { path: '/blog', priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPublishedSlugs()

    return [
        ...ROUTES.map(({ path, priority }) => ({
            url: `${SITE_URL}${path}`,
            priority,
        })),
        ...posts.map(({ slug, updatedAt }) => ({
            url: `${SITE_URL}/blog/${slug}`,
            priority: 0.6,
            lastModified: parseDate(updatedAt) ?? undefined,
        })),
    ]
}
