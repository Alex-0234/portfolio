import { getDb } from "@/utils/db"

export interface PostSummary {
    slug: string
    title: string
    description: string | null
    coverImageUrl: string | null
    coverImageAlt: string | null
    coverImageWidth: number | null
    coverImageHeight: number | null
    publishedAt: string | null
    tags: string[]
}

export interface Post extends PostSummary {
    content: string
    updatedAt: string | null
}

// GROUP_CONCAT vrací tagy slepené do jednoho stringu - tímhle se rozdělí zpátky.
// Pomlčka by kolidovala s názvy tagů, proto dvojitá roura.
const TAG_SEPARATOR = '||'

interface PostRow {
    slug: string
    title: string
    description: string | null
    cover_image_url: string | null
    cover_image_alt: string | null
    cover_image_width: number | null
    cover_image_height: number | null
    published_at: string | null
    updated_at: string | null
    content: string
    tags: string | null
}

const SELECT_POSTS = `
    SELECT
        p.slug,
        p.title,
        p.description,
        p.cover_image_url,
        p.cover_image_alt,
        p.cover_image_width,
        p.cover_image_height,
        p.published_at,
        p.updated_at,
        p.content,
        GROUP_CONCAT(t.name, '${TAG_SEPARATOR}') AS tags
    FROM posts p
    LEFT JOIN post_tags pt ON pt.post_id = p.id
    LEFT JOIN tags t ON t.id = pt.tag_id
    WHERE p.status = 'published'
`

const toPost = (row: PostRow): Post => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    coverImageWidth: row.cover_image_width,
    coverImageHeight: row.cover_image_height,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    content: row.content,
    tags: row.tags ? row.tags.split(TAG_SEPARATOR) : [],
})

/** Výpis pro /blog - bez těla článku, aby se netahal celý markdown zbytečně. */
export async function getPublishedPosts(): Promise<PostSummary[]> {
    const { results } = await getDb()
        .prepare(`${SELECT_POSTS} GROUP BY p.id ORDER BY p.published_at DESC`)
        .all<PostRow>()

    return results.map(toPost)
}

/** Detail článku. Draft se tváří jako neexistující, takže vrací null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const row = await getDb()
        .prepare(`${SELECT_POSTS} AND p.slug = ?1 GROUP BY p.id`)
        .bind(slug)
        .first<PostRow>()

    return row ? toPost(row) : null
}

/** Jen slug + updated_at pro sitemapu. */
export async function getPublishedSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
    const { results } = await getDb()
        .prepare(
            `SELECT slug, updated_at FROM posts
             WHERE status = 'published'
             ORDER BY published_at DESC`
        )
        .all<{ slug: string; updated_at: string | null }>()

    return results.map((row) => ({ slug: row.slug, updatedAt: row.updated_at }))
}

/**
 * D1 ukládá DATETIME jako text. `datetime('now')` dává "YYYY-MM-DD HH:MM:SS"
 * v UTC, což Safari neumí naparsovat - proto se to převádí na ISO tvar.
 */
export function parseDate(value: string | null): Date | null {
    if (!value) return null

    const iso = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`
    const date = new Date(iso)

    return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value: string | null): string | null {
    const date = parseDate(value)

    return date
        ? new Intl.DateTimeFormat('cs-CZ', { dateStyle: 'long', timeZone: 'Europe/Prague' }).format(date)
        : null
}

/**
 * Jestli má smysl vedle data vydání ukazovat i datum aktualizace.
 *
 * Porovnávají se schválně až vykreslené řetězce, ne časy - u čerstvě vydaného
 * článku sedí published_at a updated_at na stejnou minutu a "Publikováno 5.
 * srpna / Aktualizováno 5. srpna" čtenáři neřekne nic.
 *
 * Že updated_at neskáče po každém `npm run posts`, hlídá otisk obsahu z
 * migrace 0005 - bez něj by tahle podmínka byla k ničemu.
 */
export function hasMeaningfulUpdate(publishedAt: string | null, updatedAt: string | null): boolean {
    const published = parseDate(publishedAt)
    const updated = parseDate(updatedAt)

    if (!published || !updated || updated <= published) return false

    return formatDate(publishedAt) !== formatDate(updatedAt)
}
