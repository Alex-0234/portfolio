import type { Metadata } from "next"

import { SITE_NAME } from "@/data/site"

interface PageMeta {
    title: string
    description: string
    path: string
}

/**
 * Obrázek z app/opengraph-image.tsx se doplňuje jen do metadat, která si
 * openGraph nepřepisují sama - proto se sem musí uvést ručně.
 */
const IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME }

/**
 * Next slučuje metadata po polích - jakmile stránka nastaví vlastní openGraph
 * nebo twitter, nahradí ten z layoutu celý a nic se nedědí. Proto se tady
 * skládají všechny tři varianty pohromadě z jednoho popisu.
 */
export const pageMetadata = ({ title, description, path }: PageMeta): Metadata => ({
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
        type: 'website',
        locale: 'cs_CZ',
        siteName: SITE_NAME,
        title: `${title} | ${SITE_NAME}`,
        description,
        url: path,
        images: [IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${title} | ${SITE_NAME}`,
        description,
        images: [IMAGE],
    },
})
