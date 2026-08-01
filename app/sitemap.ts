import type { MetadataRoute } from "next"

import { SITE_URL } from "@/data/site"

const ROUTES = [
    { path: '', priority: 1 },
    { path: '/offers', priority: 0.9 },
    { path: '/portfolio', priority: 0.8 },
    { path: '/about', priority: 0.8 },
    { path: '/blog', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return ROUTES.map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority,
    }))
}
