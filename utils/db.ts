import { getCloudflareContext } from "@opennextjs/cloudflare"

/**
 * Přístup k D1 bindingu. V produkci ho dodává worker, v `next dev` ho podstrčí
 * initOpenNextCloudflareForDev() z next.config.ts - proto je to jen tenký
 * wrapper a nikde se nic nepřipojuje ani nezavírá jako u klasické DB.
 *
 * Volá se to synchronně, což jde jen za requestu. Stránky, které tuhle funkci
 * používají, proto musí mít `export const dynamic = 'force-dynamic'`, jinak je
 * `next build` zkusí předrenderovat a binding tam ještě neexistuje.
 */
export function getDb(): D1Database {
    const db = getCloudflareContext().env.DB

    if (!db) {
        throw new Error(
            'D1 binding "DB" chybí. Zkontroluj d1_databases ve wrangler.jsonc a že běžíš přes `next dev` nebo worker.'
        )
    }

    return db
}
