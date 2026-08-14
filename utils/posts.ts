import { readFileSync, readdirSync } from "node:fs"
import { basename, extname, join } from "node:path"

/**
 * Články žijí v content/posts/*.md a čtou se při buildu, ne za requestu.
 * Stránky blogu jsou díky tomu předrenderované a chodí z edge jako statika -
 * žádné D1, žádný cold start workeru.
 *
 * Tenhle modul se proto nesmí dostat do klientského bundlu ani do workeru za
 * běhu. Drží to `generateStaticParams` + `dynamicParams = false` v /blog/[slug].
 */

const POSTS_DIR = join(process.cwd(), 'content', 'posts')

const STATUSES = ['draft', 'published'] as const
type Status = (typeof STATUSES)[number]

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

const unquote = (value: string) =>
    (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
        ? value.slice(1, -1)
        : value

/**
 * Záměrně jen podmnožina YAML - `klíč: hodnota` a `tags: [a, b]`, stejně jako
 * to uměl publikační skript. Vnořené struktury frontmatter nepodporuje.
 */
function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)

    if (!match) {
        throw new Error(`${file}: chybí frontmatter ohraničený řádky s ---`)
    }

    const [, head, body] = match
    const data: Record<string, string> = {}

    for (const line of head.split(/\r?\n/)) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue

        const separator = trimmed.indexOf(':')
        if (separator === -1) {
            throw new Error(`${file}: řádek frontmatteru bez dvojtečky — "${trimmed}"`)
        }

        data[trimmed.slice(0, separator).trim()] = unquote(trimmed.slice(separator + 1).trim())
    }

    return { data, body: body.trim() }
}

const parseTags = (value: string | undefined): string[] => {
    if (!value) return []

    const inner = value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1) : value

    return [...new Set(inner.split(',').map((tag) => unquote(tag.trim())).filter(Boolean))]
}

const parseDimension = (value: string | undefined, key: string, file: string): number | null => {
    if (value === undefined || value === '') return null

    const number = Number(value)

    if (!Number.isInteger(number) || number <= 0) {
        throw new Error(`${file}: "${key}" musí být celé kladné číslo, ne "${value}"`)
    }

    return number
}

interface ParsedPost extends Post {
    status: Status
}

function readPost(file: string): ParsedPost {
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf-8'), file)

    // slug se dá vynechat - vezme se z názvu souboru
    const slug = data.slug || basename(file, extname(file))
    const status = (data.status || 'draft') as Status

    if (!data.title) throw new Error(`${file}: chybí "title"`)
    if (!body) throw new Error(`${file}: článek nemá žádný obsah pod frontmatterem`)
    if (!STATUSES.includes(status)) {
        throw new Error(`${file}: status musí být ${STATUSES.join(' nebo ')}, ne "${status}"`)
    }

    const coverImageUrl = data.cover_image_url || null
    const coverImageWidth = parseDimension(data.cover_image_width, 'cover_image_width', file)
    const coverImageHeight = parseDimension(data.cover_image_height, 'cover_image_height', file)

    if ((coverImageWidth === null) !== (coverImageHeight === null)) {
        throw new Error(`${file}: cover_image_width a cover_image_height musí být uvedené obě, nebo ani jedna`)
    }

    if (!coverImageUrl && (coverImageWidth || data.cover_image_alt)) {
        throw new Error(`${file}: cover_image_alt/width/height nedávají smysl bez cover_image_url`)
    }

    // dřív je dopisovaly triggery v D1, teď si je článek nese sám
    const publishedAt = data.published_at || null
    if (status === 'published' && !publishedAt) {
        throw new Error(`${file}: publikovaný článek musí mít "published_at"`)
    }

    return {
        slug,
        status,
        title: data.title,
        description: data.description || null,
        coverImageUrl,
        coverImageAlt: data.cover_image_alt || null,
        coverImageWidth,
        coverImageHeight,
        publishedAt,
        updatedAt: data.updated_at || publishedAt,
        tags: parseTags(data.tags),
        content: body,
    }
}

/** Přečte se jednou za build, ne při každém volání. */
let cache: ParsedPost[] | null = null

function allPosts(): ParsedPost[] {
    if (cache) return cache

    cache = readdirSync(POSTS_DIR)
        .filter((file) => extname(file) === '.md')
        .map((file) => readPost(join(POSTS_DIR, file)))
        // stejné řazení, jaké dřív dělalo ORDER BY published_at DESC.
        // Porovnává se skutečný čas, ne text - jinak by se "…T11:30+02:00"
        // seřadilo podle číslic, a ne podle toho, že je to reálně 09:30 UTC
        .sort((a, b) => (parseDate(b.publishedAt)?.getTime() ?? 0) - (parseDate(a.publishedAt)?.getTime() ?? 0))

    return cache
}

/** Rozepsané články se ven nepropisují - stejný filtr jako `status = 'published'`. */
const published = (): ParsedPost[] => allPosts().filter((post) => post.status === 'published')

const toSummary = (post: ParsedPost): PostSummary => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
    coverImageWidth: post.coverImageWidth,
    coverImageHeight: post.coverImageHeight,
    publishedAt: post.publishedAt,
    tags: post.tags,
})

/** Výpis pro /blog - bez těla článku, aby se netahal celý markdown zbytečně. */
export async function getPublishedPosts(): Promise<PostSummary[]> {
    return published().map(toSummary)
}

/** Detail článku. Draft se tváří jako neexistující, takže vrací null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const post = published().find((item) => item.slug === slug)
    if (!post) return null

    return { ...toSummary(post), content: post.content, updatedAt: post.updatedAt }
}

/** Jen slug + updated_at pro sitemapu. */
export async function getPublishedSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
    return published().map(({ slug, updatedAt }) => ({ slug, updatedAt }))
}

/**
 * Data z frontmatteru jsou v ISO tvaru, ale historicky mohla přijít i jako
 * "YYYY-MM-DD HH:MM:SS" z D1 - Safari to bez úprav nenaparsuje.
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
 * Dřív hlídal zbytečné skoky otisk obsahu z migrace 0005. Teď je updated_at
 * ruční - měň ho jen tehdy, když se v článku opravdu něco změnilo.
 */
export function hasMeaningfulUpdate(publishedAt: string | null, updatedAt: string | null): boolean {
    const published = parseDate(publishedAt)
    const updated = parseDate(updatedAt)

    if (!published || !updated || updated <= published) return false

    return formatDate(publishedAt) !== formatDate(updatedAt)
}
