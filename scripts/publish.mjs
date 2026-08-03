#!/usr/bin/env node

/**
 * Nahraje články z content/posts/*.md do D1.
 *
 * Důvod, proč to není prostě `wrangler d1 execute --command`: markdown je plný
 * apostrofů a uvozovek, které by se musely ručně escapovat do SQL. Tady se
 * vygeneruje .sql soubor s korektně escapovanými literály a ten se pustí
 * najednou. Články tak zůstávají v gitu vedle kódu, ne jen v databázi.
 *
 *   node scripts/publish.mjs                          # vše, lokálně
 *   node scripts/publish.mjs --remote                 # vše, do produkce
 *   node scripts/publish.mjs content/posts/foo.md     # jeden článek
 *   node scripts/publish.mjs --remote --dry-run       # jen vypíše SQL
 */

import { readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { join, resolve, basename, extname } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'

const DB_NAME = 'portfolio-blog'
const POSTS_DIR = 'content/posts'
const STATUSES = ['draft', 'published']

// --- parsování frontmatteru -------------------------------------------------

const unquote = (value) =>
    (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
        ? value.slice(1, -1)
        : value

/**
 * Záměrně jen podmnožina YAML - `klíč: hodnota` a `tags: [a, b]`. Na tohle
 * nemá smysl tahat gray-matter, ale znamená to, že vnořené struktury
 * frontmatter neumí.
 */
function parseFrontmatter(raw, file) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)

    if (!match) {
        throw new Error(`${file}: chybí frontmatter ohraničený řádky s ---`)
    }

    const [, head, body] = match
    const data = {}

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

const parseTags = (value) => {
    if (!value) return []

    const inner = value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1) : value

    return [...new Set(inner.split(',').map((tag) => unquote(tag.trim())).filter(Boolean))]
}

const parseDimension = (value, key, file) => {
    if (value === undefined || value === '') return null

    const number = Number(value)

    if (!Number.isInteger(number) || number <= 0) {
        throw new Error(`${file}: "${key}" musí být celé kladné číslo, ne "${value}"`)
    }

    return number
}

// --- skládání SQL -----------------------------------------------------------

/** Escapování řetězce do SQL literálu - v SQLite se apostrof zdvojuje. */
const sql = (value) =>
    value === null || value === undefined || value === ''
        ? 'NULL'
        : `'${String(value).replace(/'/g, "''")}'`

const num = (value) => (value === null || value === undefined ? 'NULL' : String(value))

function readPost(file) {
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf-8'), file)

    // slug se dá vynechat - vezme se z názvu souboru
    const slug = data.slug || basename(file, extname(file))
    const status = data.status || 'draft'

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

    return {
        file,
        slug,
        status,
        title: data.title,
        description: data.description || null,
        coverImageUrl,
        coverImageAlt: data.cover_image_alt || null,
        coverImageWidth,
        coverImageHeight,
        publishedAt: data.published_at || null,
        tags: parseTags(data.tags),
        content: body,
    }
}

function buildSql(post) {
    const { slug, tags } = post
    const lines = []

    // Úmyslně ON CONFLICT DO UPDATE, ne INSERT OR REPLACE - to by řádek smazalo
    // a vložilo znovu s novým id, což by přes ON DELETE CASCADE sundalo i
    // navázané tagy.
    //
    // updated_at se nenastavuje vůbec, aby ho doplnil trigger. published_at se
    // přes COALESCE drží původní, takže reedit článku nezmění datum vydání.
    lines.push(
        `INSERT INTO posts (slug, title, description, content, cover_image_url, cover_image_alt, cover_image_width, cover_image_height, status, published_at)`,
        `VALUES (${sql(slug)}, ${sql(post.title)}, ${sql(post.description)}, ${sql(post.content)}, ${sql(post.coverImageUrl)}, ${sql(post.coverImageAlt)}, ${num(post.coverImageWidth)}, ${num(post.coverImageHeight)}, ${sql(post.status)}, ${sql(post.publishedAt)})`,
        `ON CONFLICT(slug) DO UPDATE SET`,
        `  title = excluded.title,`,
        `  description = excluded.description,`,
        `  content = excluded.content,`,
        `  cover_image_url = excluded.cover_image_url,`,
        `  cover_image_alt = excluded.cover_image_alt,`,
        `  cover_image_width = excluded.cover_image_width,`,
        `  cover_image_height = excluded.cover_image_height,`,
        `  status = excluded.status,`,
        `  published_at = COALESCE(excluded.published_at, posts.published_at);`
    )

    if (tags.length === 0) {
        lines.push(`DELETE FROM post_tags WHERE post_id = (SELECT id FROM posts WHERE slug = ${sql(slug)});`)
        return lines.join('\n')
    }

    const names = tags.map(sql).join(', ')

    lines.push(
        `INSERT OR IGNORE INTO tags (name) VALUES ${tags.map((tag) => `(${sql(tag)})`).join(', ')};`,
        // tagy odebrané z frontmatteru se musí odpojit, jinak by na článku
        // zůstaly viset navždy
        `DELETE FROM post_tags`,
        ` WHERE post_id = (SELECT id FROM posts WHERE slug = ${sql(slug)})`,
        `   AND tag_id NOT IN (SELECT id FROM tags WHERE name IN (${names}));`,
        `INSERT OR IGNORE INTO post_tags (post_id, tag_id)`,
        `SELECT p.id, t.id FROM posts p JOIN tags t ON t.name IN (${names})`,
        ` WHERE p.slug = ${sql(slug)};`
    )

    return lines.join('\n')
}

// --- CLI --------------------------------------------------------------------

const args = process.argv.slice(2)
const remote = args.includes('--remote')
const dryRun = args.includes('--dry-run')
const explicit = args.filter((arg) => !arg.startsWith('--'))

function collectFiles() {
    if (explicit.length > 0) {
        for (const file of explicit) {
            if (!existsSync(file)) throw new Error(`soubor neexistuje: ${file}`)
        }
        return explicit
    }

    if (!existsSync(POSTS_DIR)) {
        throw new Error(`složka ${POSTS_DIR} neexistuje — vytvoř ji a dej do ní .md soubory`)
    }

    return readdirSync(POSTS_DIR)
        .filter((name) => name.endsWith('.md'))
        .map((name) => join(POSTS_DIR, name))
}

function main() {
    const posts = collectFiles().map(readPost)

    if (posts.length === 0) {
        console.log('Žádné .md soubory k nahrání.')
        return
    }

    // dva soubory se stejným slugem by se navzájem přepsaly a jeden článek by
    // tiše zmizel - radši spadnout hned
    const seen = new Map()
    for (const post of posts) {
        if (seen.has(post.slug)) {
            throw new Error(`slug "${post.slug}" je ve dvou souborech: ${seen.get(post.slug)} a ${post.file}`)
        }
        seen.set(post.slug, post.file)
    }

    const statements = posts.map(buildSql).join('\n\n')

    for (const post of posts) {
        const tags = post.tags.length > 0 ? ` [${post.tags.join(', ')}]` : ''
        console.log(`  ${post.status === 'published' ? '●' : '○'} ${post.slug}${tags}`)
    }

    if (dryRun) {
        console.log(`\n--- SQL (dry run, nic se nespouští) ---\n${statements}`)
        return
    }

    const target = remote ? '--remote' : '--local'
    const tmpFile = resolve(tmpdir(), `d1-publish-${Date.now()}.sql`)
    writeFileSync(tmpFile, statements, 'utf-8')

    console.log(`\nNahrávám ${posts.length} článk${posts.length === 1 ? ' ' : 'y '}do D1 (${remote ? 'produkce' : 'lokálně'})...`)

    try {
        const result = spawnSync(
            'npx',
            ['wrangler', 'd1', 'execute', DB_NAME, target, '--yes', `--file=${tmpFile}`],
            { stdio: 'inherit', shell: process.platform === 'win32' }
        )

        if (result.status !== 0) process.exitCode = result.status ?? 1
    } finally {
        unlinkSync(tmpFile)
    }
}

try {
    main()
} catch (error) {
    console.error(`\nChyba: ${error.message}`)
    process.exitCode = 1
}
